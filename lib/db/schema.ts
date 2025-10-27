import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  uuid,
  pgEnum,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import type { AdapterAccount } from "@auth/core/adapters";

export const roleEnum = pgEnum("user_role", ["ADMIN", "STUDENT", "MENTOR"]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: roleEnum('role').default('STUDENT').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: [account.provider, account.providerAccountId],
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").notNull().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: [vt.identifier, vt.token],
  })
);

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  role: varchar('role', { length: 50 }).notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  invitedBy: integer('invited_by')
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp('invited_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
});

export const onboardingData = pgTable('onboarding_data', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  challenges: text('challenges').notNull(),
  goals: text('goals').notNull(),
  interests: text('interests').notNull(),
  // Extended fields for AI matching
  background: text('background'), // Educational/professional background
  skills: text('skills'), // Comma-separated skills
  availability: text('availability'), // Time commitment
  preferredMentorshipStyle: text('preferred_mentorship_style'), // 1-on-1, group, etc.
  specificNeeds: text('specific_needs'), // Specific help needed
  languages: text('languages'), // Languages spoken
  location: varchar('location', { length: 200 }), // City/region
  // Digital storytelling
  digitalStory: text('digital_story'), // AI-generated narrative from user's responses
  storyGeneratedAt: timestamp('story_generated_at'), // When the story was generated
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Mentoring matches
export const mentoringMatchStatusEnum = pgEnum('mentoring_match_status', ['PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED']);

export const mentoringMatches = pgTable('mentoring_matches', {
  id: serial('id').primaryKey(),
  menteeId: integer('mentee_id')
    .notNull()
    .references(() => users.id),
  mentorId: integer('mentor_id')
    .notNull()
    .references(() => users.id),
  matchScore: integer('match_score'), // AI-generated match score (0-100)
  matchReason: text('match_reason'), // AI-generated explanation
  status: mentoringMatchStatusEnum('status').default('PENDING').notNull(),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// AI-generated recommendations
export const recommendationTypeEnum = pgEnum('recommendation_type', ['WORKSHOP', 'SCHOLARSHIP', 'RESOURCE', 'EVENT']);

export const aiRecommendations = pgTable('ai_recommendations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  type: recommendationTypeEnum('type').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  url: text('url'),
  reason: text('reason'), // AI-generated reason for recommendation
  relevanceScore: integer('relevance_score'), // 0-100
  isViewed: boolean('is_viewed').default(false),
  isDismissed: boolean('is_dismissed').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Workshops
export const workshopStatusEnum = pgEnum('workshop_status', ['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export const enrollmentStatusEnum = pgEnum('enrollment_status', ['ENROLLED', 'CANCELLED', 'WAITLIST']);

export const workshops = pgTable('workshops', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  description: text('description'),
  startsAt: timestamp('starts_at'),
  endsAt: timestamp('ends_at'),
  location: varchar('location', { length: 200 }), // Room/Location
  room: varchar('room', { length: 100 }), // Specific room number/name
  capacity: integer('capacity'),
  status: workshopStatusEnum('status').notNull().default('DRAFT'),
  isPublic: boolean('is_public').notNull().default(false), // Display on public website
  imageUrl: text('image_url'), // Workshop thumbnail/image
  createdBy: integer('created_by').references(() => users.id),
  meetingUrl: text('meeting_url'),
  materialsUrl: text('materials_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const workshopMentors = pgTable('workshop_mentors', {
  workshopId: integer('workshop_id').references(() => workshops.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
}, (t) => ({
  pk: [t.workshopId, t.userId],
}));

export const workshopEnrollments = pgTable('workshop_enrollments', {
  id: serial('id').primaryKey(),
  workshopId: integer('workshop_id').references(() => workshops.id, { onDelete: 'cascade' }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  status: enrollmentStatusEnum('status').notNull().default('ENROLLED'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const workshopFiles = pgTable('workshop_files', {
  id: serial('id').primaryKey(),
  workshopId: integer('workshop_id').references(() => workshops.id, { onDelete: 'cascade' }).notNull(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileUrl: text('file_url').notNull(),
  fileSize: integer('file_size'), // in bytes
  fileType: varchar('file_type', { length: 100 }), // MIME type
  uploadedBy: integer('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const workshopsRelations = relations(workshops, ({ many, one }) => ({
  mentors: many(workshopMentors),
  enrollments: many(workshopEnrollments),
  files: many(workshopFiles),
  creator: one(users, {
    fields: [workshops.createdBy],
    references: [users.id],
  }),
}));

export const workshopFilesRelations = relations(workshopFiles, ({ one }) => ({
  workshop: one(workshops, { fields: [workshopFiles.workshopId], references: [workshops.id] }),
  uploader: one(users, { fields: [workshopFiles.uploadedBy], references: [users.id] }),
}));

export const workshopMentorsRelations = relations(workshopMentors, ({ one }) => ({
  workshop: one(workshops, { fields: [workshopMentors.workshopId], references: [workshops.id] }),
  user: one(users, { fields: [workshopMentors.userId], references: [users.id] }),
}));

export const workshopEnrollmentsRelations = relations(workshopEnrollments, ({ one }) => ({
  workshop: one(workshops, { fields: [workshopEnrollments.workshopId], references: [workshops.id] }),
  user: one(users, { fields: [workshopEnrollments.userId], references: [users.id] }),
}));

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type OnboardingData = typeof onboardingData.$inferSelect;
export type NewOnboardingData = typeof onboardingData.$inferInsert;
export type MentoringMatch = typeof mentoringMatches.$inferSelect;
export type NewMentoringMatch = typeof mentoringMatches.$inferInsert;
export type AIRecommendation = typeof aiRecommendations.$inferSelect;
export type NewAIRecommendation = typeof aiRecommendations.$inferInsert;
export type TeamDataWithMembers = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripeProductId: string | null;
  planName: string | null;
  subscriptionStatus: string | null;
  teamMembers: {
    id: number;
    role: string;
    userId: number;
    teamId: number;
    joinedAt: Date;
    user: {
      id: number;
      name: string | null;
      email: string;
    };
  }[];
};

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}
