'use server';

import { db } from '@/lib/db';
import { onboardingData, users, mentoringMatches, aiRecommendations } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { generateMentorMatches, generateRecommendations, generateDigitalStory } from '@/lib/ai/openai-service';
import { getKnowledgeBase } from '@/lib/ai/knowledge-base';
import { z } from 'zod';

const onboardingSchema = z.object({
  challenges: z.string().min(10, 'Bitte beschreiben Sie Ihre Herausforderungen (mindestens 10 Zeichen)'),
  goals: z.string().min(10, 'Bitte beschreiben Sie Ihre Ziele (mindestens 10 Zeichen)'),
  interests: z.string().min(10, 'Bitte beschreiben Sie Ihre Interessen (mindestens 10 Zeichen)'),
  background: z.string().optional(),
  skills: z.string().optional(),
  availability: z.string().optional(),
  preferredMentorshipStyle: z.string().optional(),
  specificNeeds: z.string().optional(),
  languages: z.string().optional(),
  location: z.string().optional(),
});

/**
 * Submit onboarding questionnaire
 */
export async function submitOnboarding(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Nicht authentifiziert' };
    }

    const data = {
      challenges: formData.get('challenges') as string,
      goals: formData.get('goals') as string,
      interests: formData.get('interests') as string,
      background: formData.get('background') as string,
      skills: formData.get('skills') as string,
      availability: formData.get('availability') as string,
      preferredMentorshipStyle: formData.get('preferredMentorshipStyle') as string,
      specificNeeds: formData.get('specificNeeds') as string,
      languages: formData.get('languages') as string,
      location: formData.get('location') as string,
    };

    // Validate
    const validated = onboardingSchema.parse(data);

    // Check if user already has onboarding data
    const existing = await db
      .select()
      .from(onboardingData)
      .where(eq(onboardingData.userId, parseInt(session.user.id)))
      .limit(1);

    if (existing.length > 0) {
      // Update existing
      await db
        .update(onboardingData)
        .set({
          ...validated,
          completed: true,
          updatedAt: new Date(),
        })
        .where(eq(onboardingData.userId, parseInt(session.user.id)));
    } else {
      // Create new
      await db.insert(onboardingData).values({
        userId: parseInt(session.user.id),
        ...validated,
        completed: true,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting onboarding:', error);
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: 'Fehler beim Speichern der Daten' };
  }
}

/**
 * Get user's onboarding data
 */
export async function getOnboardingData() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return null;
    }

    const data = await db
      .select()
      .from(onboardingData)
      .where(eq(onboardingData.userId, parseInt(session.user.id)))
      .limit(1);

    return data[0] || null;
  } catch (error) {
    console.error('Error getting onboarding data:', error);
    return null;
  }
}

/**
 * Generate AI-powered mentor matches
 */
export async function generateMatches() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Nicht authentifiziert' };
    }

    const userId = parseInt(session.user.id);

    // Get user's onboarding data
    const [userData] = await db
      .select()
      .from(onboardingData)
      .where(eq(onboardingData.userId, userId))
      .limit(1);

    if (!userData) {
      return { error: 'Bitte vervollständigen Sie zuerst das Onboarding' };
    }

    // Get user info
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    // Get available mentors (users with MENTOR role)
    const mentors = await db
      .select()
      .from(users)
      .where(eq(users.role, 'MENTOR'))
      .limit(20);

    // Get onboarding data for mentors
    const mentorsWithData = await Promise.all(
      mentors.map(async (mentor) => {
        const [mentorData] = await db
          .select()
          .from(onboardingData)
          .where(eq(onboardingData.userId, mentor.id))
          .limit(1);

        return {
          ...mentor,
          onboardingData: mentorData || null,
        };
      })
    );

    // Generate matches using AI
    const matches = await generateMentorMatches(
      { ...userData, mentee: user },
      mentorsWithData
    );

    // Save matches to database
    for (const match of matches) {
      await db.insert(mentoringMatches).values({
        menteeId: userId,
        mentorId: match.mentorId,
        matchScore: match.matchScore,
        matchReason: match.reason,
        status: 'PENDING',
      });
    }

    return { success: true, matches };
  } catch (error) {
    console.error('Error generating matches:', error);
    return { error: 'Fehler beim Generieren der Matches' };
  }
}

/**
 * Generate AI-powered recommendations
 */
export async function generateUserRecommendations() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Nicht authentifiziert' };
    }

    const userId = parseInt(session.user.id);

    // Get user's onboarding data
    const [userData] = await db
      .select()
      .from(onboardingData)
      .where(eq(onboardingData.userId, userId))
      .limit(1);

    if (!userData) {
      return { error: 'Bitte vervollständigen Sie zuerst das Onboarding' };
    }

    // Get user info
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    // Get knowledge base
    const knowledgeBase = getKnowledgeBase();

    // Generate recommendations using AI
    const recommendations = await generateRecommendations(
      { ...userData, user },
      knowledgeBase
    );

    // Save recommendations to database
    for (const rec of recommendations) {
      await db.insert(aiRecommendations).values({
        userId,
        type: rec.type,
        title: rec.title,
        description: rec.description || '',
        url: rec.url,
        reason: rec.reason,
        relevanceScore: rec.relevanceScore,
      });
    }

    return { success: true, recommendations };
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return { error: 'Fehler beim Generieren der Empfehlungen' };
  }
}

/**
 * Get user's recommendations
 */
export async function getUserRecommendations() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    const recommendations = await db
      .select()
      .from(aiRecommendations)
      .where(
        and(
          eq(aiRecommendations.userId, parseInt(session.user.id)),
          eq(aiRecommendations.isDismissed, false)
        )
      )
      .orderBy(aiRecommendations.relevanceScore);

    return recommendations;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
}

/**
 * Get user's mentor matches
 */
export async function getUserMatches() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    const matches = await db
      .select()
      .from(mentoringMatches)
      .where(eq(mentoringMatches.menteeId, parseInt(session.user.id)))
      .orderBy(mentoringMatches.matchScore);

    return matches;
  } catch (error) {
    console.error('Error getting matches:', error);
    return [];
  }
}

/**
 * Generate a digital story from user's onboarding data
 * This creates a compelling narrative that captures their journey, aspirations, and identity
 */
export async function generateUserDigitalStory() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: 'Nicht authentifiziert' };
    }

    const userId = parseInt(session.user.id);

    // Get user's onboarding data
    const [userData] = await db
      .select()
      .from(onboardingData)
      .where(eq(onboardingData.userId, userId))
      .limit(1);

    if (!userData) {
      return { error: 'Bitte vervollständigen Sie zuerst das Onboarding' };
    }

    // Get user info
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return { error: 'Benutzer nicht gefunden' };
    }

    // Generate digital story using AI
    const story = await generateDigitalStory({
      ...userData,
      user,
    });

    // Save the story to the database
    await db
      .update(onboardingData)
      .set({
        digitalStory: story,
        storyGeneratedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(onboardingData.userId, userId));

    return { success: true, story };
  } catch (error) {
    console.error('Error generating digital story:', error);
    return { error: 'Fehler beim Generieren der Geschichte' };
  }
}

/**
 * Get user's digital story
 */
export async function getUserDigitalStory() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return null;
    }

    const [userData] = await db
      .select({
        digitalStory: onboardingData.digitalStory,
        storyGeneratedAt: onboardingData.storyGeneratedAt,
      })
      .from(onboardingData)
      .where(eq(onboardingData.userId, parseInt(session.user.id)))
      .limit(1);

    return userData || null;
  } catch (error) {
    console.error('Error getting digital story:', error);
    return null;
  }
}
