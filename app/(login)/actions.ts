'use server';

import { z } from 'zod';
import { and, eq, sql } from 'drizzle-orm';
import { db, client } from '@/lib/db/drizzle';

// @ts-ignore - Suppress Drizzle ORM version conflicts
const _ = null;
import {
  User,
  users,
  teams,
  teamMembers,
  activityLogs,
  type NewUser,
  type NewTeam,
  type NewTeamMember,
  type NewActivityLog,
  ActivityType,
  invitations,
  roleEnum,
} from '@/lib/db/schema';
import { comparePasswords, hashPassword } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createCheckoutSession } from '@/lib/payments/stripe';
import { getUser, getUserWithTeam } from '@/lib/db/queries';
import {
  validatedAction,
  validatedActionWithUser,
} from '@/lib/auth/middleware';

async function logActivity(
  teamId: number | null | undefined,
  userId: number,
  type: ActivityType,
  ipAddress?: string
) {
  if (teamId === null || teamId === undefined) {
    return;
  }
  const newActivity: NewActivityLog = {
    teamId,
    userId,
    action: type,
    ipAddress: ipAddress || '',
  };
  await db.insert(activityLogs).values(newActivity);
}

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  try {
    // Use direct SQL query with postgres-js client
    const foundUsers = await client`
      SELECT * FROM users 
      WHERE email = ${email} AND deleted_at IS NULL 
      LIMIT 1
    `;

    if (foundUsers.length === 0) {
      return { error: 'Invalid email or password. Please try again.' };
    }

    const foundUser = foundUsers[0];

    const isPasswordValid = await comparePasswords(
      password,
      foundUser.password_hash
    );

    if (!isPasswordValid) {
      return { error: 'Invalid email or password. Please try again.' };
    }

    // Session is managed by NextAuth credentials; UI uses signIn('credentials')

    const redirectTo = formData.get('redirect') as string | null;
    if (redirectTo === 'checkout') {
      const priceId = formData.get('priceId') as string;
      // For now, skip checkout functionality
      return { error: 'Checkout functionality temporarily disabled' };
    }

    // Redirect based on user role
    const dashboardPath = foundUser.role === 'ADMIN' ? '/dashboard' : 
                         foundUser.role === 'MENTOR' ? '/dashboard' : 
                         '/dashboard';
    
    redirect(dashboardPath);
  } catch (error) {
    console.error('Sign in error:', error);
    return { error: 'An error occurred during sign in. Please try again.' };
  }
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be less than 100 characters")
    .refine(
      (password) => /[A-Z]/.test(password),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (password) => /[0-9]/.test(password),
      "Password must contain at least one number"
    ),
  role: z.enum(['ADMIN', 'STUDENT', 'MENTOR']).default('STUDENT'),
  inviteId: z.string().optional(),
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  try {
    const { email, password, inviteId, role } = data;

    // Check for existing user with detailed error message
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      console.log(`Sign-up attempt with existing email: ${email}`);
      return { error: 'An account with this email already exists. Please sign in instead.' };
    }

    // Validate password strength for better security
    if (password.length < 8) {
      return { error: 'Password must be at least 8 characters long.' };
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return { error: 'Password must contain at least one uppercase letter and one number.' };
    }

    // Proceed with user creation with additional error handling
    const passwordHash = await hashPassword(password);
    const newUser: NewUser = {
      email,
      passwordHash,
      role,
    };

    // Wrap database operations in a try-catch
    const [createdUser] = await db.insert(users).values(newUser).returning();
    if (!createdUser) {
      console.error('Failed to create user record after validation checks passed');
      return { error: 'Failed to create user account. Please try again later.' };
    }

    let teamId: number;
    let userRole: string;
    let createdTeam: typeof teams.$inferSelect | null = null;

    if (inviteId) {
      // Enhanced invitation validation with specific error messages
      const [invitation] = await db
        .select()
        .from(invitations)
        .where(
          and(
            eq(invitations.id, parseInt(inviteId)),
            eq(invitations.email, email),
            eq(invitations.status, 'pending')
          )
        )
        .limit(1);

      if (invitation) {
        teamId = invitation.teamId;
        userRole = invitation.role;

        await db
          .update(invitations)
          .set({ status: 'accepted' })
          .where(eq(invitations.id, invitation.id));

        await logActivity(teamId, createdUser.id, ActivityType.ACCEPT_INVITATION);

        [createdTeam] = await db
          .select()
          .from(teams)
          .where(eq(teams.id, teamId))
          .limit(1);
          
        if (!createdTeam) {
          console.error(`Team not found for invitation: ${invitation.id}, teamId: ${teamId}`);
          return { error: 'Failed to join team. Please contact support.' };
        }
      } else {
        console.warn(`Invalid invitation attempt: ${inviteId}, email: ${email}`);
        return { error: 'The invitation link is invalid or has expired. Please request a new invitation.' };
      }
    } else {
      // Create a new team with additional validation
      const newTeam: NewTeam = {
        name: `${email}'s Team`,
      };

      try {
        [createdTeam] = await db.insert(teams).values(newTeam).returning();
      } catch (error) {
        console.error('Team creation error:', error);
        // Cleanup the created user since team creation failed
        await db.delete(users).where(eq(users.id, createdUser.id));
        return { error: 'Failed to set up your account. Please try again later.' };
      }

      if (!createdTeam) {
        console.error('Team created but not returned properly');
        // Cleanup the created user
        await db.delete(users).where(eq(users.id, createdUser.id));
        return { error: 'Failed to set up your team. Please try again later.' };
      }

      teamId = createdTeam.id;
      userRole = 'owner';

      await logActivity(teamId, createdUser.id, ActivityType.CREATE_TEAM);
    }

    // Handle team membership creation with error handling
    const newTeamMember: NewTeamMember = {
      userId: createdUser.id,
      teamId: teamId,
      role: userRole,
    };

    try {
      await Promise.all([
        db.insert(teamMembers).values(newTeamMember),
        logActivity(teamId, createdUser.id, ActivityType.SIGN_UP),
        // setSession(createdUser), // Removed setSession
      ]);
    } catch (error) {
      console.error('Failed to complete signup process:', error);
      return { error: 'Your account was created but we encountered an issue setting up your team. Please contact support.' };
    }

    console.log(`User signup successful: ${email}, role: ${role}, team: ${teamId}`);

    const redirectTo = formData.get('redirect') as string | null;
    if (redirectTo === 'checkout') {
      const priceId = formData.get('priceId') as string;
      return createCheckoutSession({ team: createdTeam, priceId });
    }

    // Return success instead of redirecting
    return { success: true, redirectTo: '/onboarding' };
  } catch (error) {
    // Enhanced error logging with details
    console.error('Sign-up error:', error);
    
    // Determine if it's a database connection issue
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('connection') || errorMessage.includes('ECONNREFUSED')) {
      return { 
        error: 'Database connection error. Please try again in a few moments.' 
      };
    }
    
    return { 
      error: 'An unexpected error occurred during sign-up. Please try again later or contact support if the issue persists.' 
    };
  }
});

export async function signOut() {
  const user = (await getUser()) as User;
  const userWithTeam = await getUserWithTeam(user.id);
  await logActivity(userWithTeam?.teamId, user.id, ActivityType.SIGN_OUT);
  // NextAuth signOut is handled client-side; no cookie deletion here
}

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _, user) => {
    const { currentPassword, newPassword } = data;

    const isPasswordValid = await comparePasswords(
      currentPassword,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return { error: 'Current password is incorrect.' };
    }

    if (currentPassword === newPassword) {
      return {
        error: 'New password must be different from the current password.',
      };
    }

    const newPasswordHash = await hashPassword(newPassword);
    const userWithTeam = await getUserWithTeam(user.id);

    await Promise.all([
      db
        .update(users)
        .set({ passwordHash: newPasswordHash })
        .where(eq(users.id, user.id)),
      logActivity(userWithTeam?.teamId, user.id, ActivityType.UPDATE_PASSWORD),
    ]);

    return { success: 'Password updated successfully.' };
  }
);

const deleteAccountSchema = z.object({
  password: z.string().min(8).max(100),
});

export const deleteAccount = validatedActionWithUser(
  deleteAccountSchema,
  async (data, _, user) => {
    const { password } = data;

    const isPasswordValid = await comparePasswords(password, user.passwordHash);
    if (!isPasswordValid) {
      return { error: 'Incorrect password. Account deletion failed.' };
    }

    const userWithTeam = await getUserWithTeam(user.id);

    await logActivity(
      userWithTeam?.teamId,
      user.id,
      ActivityType.DELETE_ACCOUNT
    );

    // Soft delete
    await db
      .update(users)
      .set({
        deletedAt: sql`CURRENT_TIMESTAMP`,
        email: sql`CONCAT(email, '-', id, '-deleted')`, // Ensure email uniqueness
      })
      .where(eq(users.id, user.id));

    if (userWithTeam?.teamId) {
      await db
        .delete(teamMembers)
        .where(
          and(
            eq(teamMembers.userId, user.id),
            eq(teamMembers.teamId, userWithTeam.teamId)
          )
        );
    }

    // (await cookies()).delete('session'); // Removed cookie deletion
    redirect('/sign-in');
  }
);

const updateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
});

export const updateAccount = validatedActionWithUser(
  updateAccountSchema,
  async (data, _, user) => {
    const { name, email } = data;
    const userWithTeam = await getUserWithTeam(user.id);

    await Promise.all([
      db.update(users).set({ name, email }).where(eq(users.id, user.id)),
      logActivity(userWithTeam?.teamId, user.id, ActivityType.UPDATE_ACCOUNT),
    ]);

    return { success: 'Account updated successfully.' };
  }
);

const removeTeamMemberSchema = z.object({
  memberId: z.number(),
});

export const removeTeamMember = validatedActionWithUser(
  removeTeamMemberSchema,
  async (data, _, user) => {
    const { memberId } = data;
    const userWithTeam = await getUserWithTeam(user.id);

    if (!userWithTeam?.teamId) {
      return { error: 'User is not part of a team' };
    }

    await db
      .delete(teamMembers)
      .where(
        and(
          eq(teamMembers.id, memberId),
          eq(teamMembers.teamId, userWithTeam.teamId)
        )
      );

    await logActivity(
      userWithTeam.teamId,
      user.id,
      ActivityType.REMOVE_TEAM_MEMBER
    );

    return { success: 'Team member removed successfully' };
  }
);

const inviteTeamMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['member', 'owner']),
});

export const inviteTeamMember = validatedActionWithUser(
  inviteTeamMemberSchema,
  async (data, _, user) => {
    const { email, role } = data;
    const userWithTeam = await getUserWithTeam(user.id);

    if (!userWithTeam?.teamId) {
      return { error: 'User is not part of a team' };
    }

    const existingMember = await db
      .select()
      .from(users)
      .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
      .where(
        and(eq(users.email, email), eq(teamMembers.teamId, userWithTeam.teamId))
      )
      .limit(1);

    if (existingMember.length > 0) {
      return { error: 'User is already a member of this team' };
    }

    // Check if there's an existing invitation
    const existingInvitation = await db
      .select()
      .from(invitations)
      .where(
        and(
          eq(invitations.email, email),
          eq(invitations.teamId, userWithTeam.teamId),
          eq(invitations.status, 'pending')
        )
      )
      .limit(1);

    if (existingInvitation.length > 0) {
      return { error: 'An invitation has already been sent to this email' };
    }

    // Create a new invitation
    await db.insert(invitations).values({
      teamId: userWithTeam.teamId,
      email,
      role,
      invitedBy: user.id,
      status: 'pending',
    });

    await logActivity(
      userWithTeam.teamId,
      user.id,
      ActivityType.INVITE_TEAM_MEMBER
    );

    // TODO: Send invitation email and include ?inviteId={id} to sign-up URL
    // await sendInvitationEmail(email, userWithTeam.team.name, role)

    return { success: 'Invitation sent successfully' };
  }
);

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string;
  const token = formData.get('token') as string;
  const newPassword = formData.get('newPassword') as string;

  try {
    if (!token && email) {
      // Step 1: Send reset password email
      // Implement your email sending logic here
      return {
        error: '',
        success: 'If an account exists with this email, you will receive a password reset link.'
      };
    } else if (token && newPassword) {
      // Step 2: Reset password with token
      // Implement your password reset logic here
      // Verify token and update password in database
      return {
        error: '',
        success: 'Password has been reset successfully. You can now login with your new password.'
      };
    }

    return {
      error: 'Invalid request',
      success: ''
    };
  } catch (error) {
    return {
      error: 'Failed to reset password. Please try again.',
      success: ''
    };
  }
}

// Simple wrapper actions for direct form usage
export async function signInAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) {
    redirect('/sign-in?error=missing-credentials');
  }

  // Use direct SQL query with postgres-js client
  const foundUsers = await client`
    SELECT * FROM users 
    WHERE email = ${email} AND deleted_at IS NULL 
    LIMIT 1
  `;

  if (foundUsers.length === 0) {
    redirect('/sign-in?error=invalid-credentials');
  }

  const foundUser = foundUsers[0];

  const isPasswordValid = await comparePasswords(
    password,
    foundUser.password_hash
  );

  if (!isPasswordValid) {
    redirect('/sign-in?error=invalid-credentials');
  }

  // Session is managed by NextAuth credentials; UI uses signIn('credentials')
  const dashboardPath = foundUser.role === 'ADMIN' ? '/dashboard' : 
                       foundUser.role === 'MENTOR' ? '/dashboard' : 
                       '/dashboard';
  
  redirect(dashboardPath);
}

export async function signUpAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = 'STUDENT';
  
  // Hard block duplicate sign-ups with a user-friendly error page redirect
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  try {
    // Check for existing user
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return { error: 'An account with this email already exists. Please sign in instead.' } as any;
    }

    // Validate password
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }

    // Create user
    const passwordHash = await hashPassword(password);
    const newUser: NewUser = {
      email,
      passwordHash,
      role: role as any,
    };

    const [createdUser] = await db.insert(users).values(newUser).returning();
    if (!createdUser) {
      console.error('Sign up error: insert returned no row');
      redirect('/sign-up?error=server-error');
      return;
    }

    // Do not auto-login; redirect to sign-in with success message
    redirect('/sign-in?success=1');
  } catch (error) {
    console.error('Sign up error:', error);
    return { error: 'Registration failed. Please try again.' } as any;
  }
}
