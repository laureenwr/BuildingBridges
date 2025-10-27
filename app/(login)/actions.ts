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
  verificationTokens,
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

// Sign-in is handled by NextAuth credentials provider in lib/auth.ts
// The login form uses nextAuthSignIn('credentials') directly

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
    try {
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

      redirect('/sign-in');
    } catch (error) {
      // Check if this is a Next.js redirect error and rethrow it
      if (error && typeof error === 'object' && 'digest' in error &&
          typeof error.digest === 'string' && error.digest.startsWith('NEXT_REDIRECT')) {
        throw error;
      }

      console.error('Delete account error:', error);
      return { error: 'An error occurred while deleting your account.' };
    }
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
  const confirmPassword = formData.get('confirmPassword') as string;

  try {
    if (!token && email) {
      // Step 1: Request password reset - Generate and store token
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      // Always return the same message for security (don't reveal if email exists)
      if (existingUser.length === 0) {
        console.log(`Password reset requested for non-existent email: ${email}`);
        return {
          error: '',
          success: 'Falls ein Konto mit dieser E-Mail-Adresse existiert, erhalten Sie einen Link zum Zurücksetzen des Passworts.'
        };
      }

      // Generate a secure random token
      const resetToken = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

      // Store the token in verification_tokens table
      await db.insert(verificationTokens).values({
        identifier: email,
        token: resetToken,
        expires: expiresAt,
      });

      // TODO: Send email with reset link
      // await sendPasswordResetEmail(email, resetToken);
      // For now, just log the token (in production, this should be sent via email)
      console.log(`Password reset token for ${email}: ${resetToken}`);
      console.log(`Reset link: ${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`);

      return {
        error: '',
        success: 'Falls ein Konto mit dieser E-Mail-Adresse existiert, erhalten Sie einen Link zum Zurücksetzen des Passworts.'
      };
    } else if (token && newPassword) {
      // Step 2: Reset password with token
      if (!confirmPassword || newPassword !== confirmPassword) {
        return {
          error: 'Die Passwörter stimmen nicht überein.',
          success: ''
        };
      }

      // Validate password strength
      if (newPassword.length < 8) {
        return {
          error: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
          success: ''
        };
      }

      if (!/[A-Z]/.test(newPassword)) {
        return {
          error: 'Das Passwort muss mindestens einen Großbuchstaben enthalten.',
          success: ''
        };
      }

      if (!/[0-9]/.test(newPassword)) {
        return {
          error: 'Das Passwort muss mindestens eine Zahl enthalten.',
          success: ''
        };
      }

      // Verify the token exists and is not expired
      const [verificationToken] = await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, token))
        .limit(1);

      if (!verificationToken) {
        return {
          error: 'Ungültiger oder abgelaufener Token. Bitte fordern Sie einen neuen Link an.',
          success: ''
        };
      }

      if (verificationToken.expires < new Date()) {
        // Clean up expired token
        await db
          .delete(verificationTokens)
          .where(eq(verificationTokens.token, token));

        return {
          error: 'Der Token ist abgelaufen. Bitte fordern Sie einen neuen Link an.',
          success: ''
        };
      }

      // Update the user's password
      const passwordHash = await hashPassword(newPassword);
      await db
        .update(users)
        .set({ passwordHash })
        .where(eq(users.email, verificationToken.identifier));

      // Delete the used token
      await db
        .delete(verificationTokens)
        .where(eq(verificationTokens.token, token));

      console.log(`Password reset successful for email: ${verificationToken.identifier}`);

      return {
        error: '',
        success: 'Passwort wurde erfolgreich zurückgesetzt. Sie können sich jetzt mit Ihrem neuen Passwort anmelden.'
      };
    }

    return {
      error: 'Ungültige Anfrage',
      success: ''
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      error: 'Fehler beim Zurücksetzen des Passworts. Bitte versuchen Sie es erneut.',
      success: ''
    };
  }
}

// Sign-in action removed - NextAuth handles authentication via credentials provider

export async function signUpAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = 'STUDENT';

  // Validate required fields
  if (!email || !password) {
    redirect('/sign-up?error=missing-credentials');
  }

  try {
    // Check for existing user
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      redirect('/sign-up?error=exists');
    }

    // Validate password strength
    if (password.length < 8) {
      redirect('/sign-up?error=password-too-short');
    }

    if (!/[A-Z]/.test(password)) {
      redirect('/sign-up?error=password-no-uppercase');
    }

    if (!/[0-9]/.test(password)) {
      redirect('/sign-up?error=password-no-number');
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
    }

    // Do not auto-login; redirect to sign-in with success message
    redirect('/sign-in?success=1');
  } catch (error) {
    // Check if this is a Next.js redirect error and rethrow it
    if (error && typeof error === 'object' && 'digest' in error &&
        typeof error.digest === 'string' && error.digest.startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    console.error('Sign up error:', error);
    redirect('/sign-up?error=server-error');
  }
}
