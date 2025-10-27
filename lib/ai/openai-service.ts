import OpenAI from 'openai';
import type { OnboardingData, User } from '../db/schema';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface MentorMatchResult {
  mentorId: number;
  matchScore: number;
  reason: string;
}

export interface RecommendationResult {
  type: 'WORKSHOP' | 'SCHOLARSHIP' | 'RESOURCE' | 'EVENT';
  title: string;
  description: string;
  url?: string;
  reason: string;
  relevanceScore: number;
}

/**
 * Generate mentor matches using AI
 */
export async function generateMentorMatches(
  menteeData: OnboardingData & { mentee: User },
  availableMentors: (User & { onboardingData?: OnboardingData | null })[]
): Promise<MentorMatchResult[]> {
  try {
    const prompt = `
You are an AI matching system for a mentoring program called "Building Bridges" that empowers FLINTA* (Frauen, Lesben, Inter, Nicht-binäre, Trans* and Agender) people of colour.

MENTEE PROFILE:
- Goals: ${menteeData.goals}
- Challenges: ${menteeData.challenges}
- Interests: ${menteeData.interests}
- Background: ${menteeData.background || 'Not specified'}
- Skills: ${menteeData.skills || 'Not specified'}
- Availability: ${menteeData.availability || 'Not specified'}
- Preferred Style: ${menteeData.preferredMentorshipStyle || 'Not specified'}
- Specific Needs: ${menteeData.specificNeeds || 'Not specified'}
- Languages: ${menteeData.languages || 'Not specified'}
- Location: ${menteeData.location || 'Not specified'}

AVAILABLE MENTORS:
${availableMentors.map((mentor, idx) => `
Mentor ${idx + 1} (ID: ${mentor.id}):
- Name: ${mentor.name || 'Anonymous'}
- Goals: ${mentor.onboardingData?.goals || 'Not specified'}
- Interests: ${mentor.onboardingData?.interests || 'Not specified'}
- Background: ${mentor.onboardingData?.background || 'Not specified'}
- Skills: ${mentor.onboardingData?.skills || 'Not specified'}
- Availability: ${mentor.onboardingData?.availability || 'Not specified'}
- Languages: ${mentor.onboardingData?.languages || 'Not specified'}
- Location: ${mentor.onboardingData?.location || 'Not specified'}
`).join('\n')}

Please analyze the mentee's profile and recommend the top 3-5 best mentor matches. For each match, provide:
1. The mentor ID
2. A match score (0-100)
3. A detailed reason explaining why this is a good match

Return your response as a JSON array with this structure:
[
  {
    "mentorId": number,
    "matchScore": number,
    "reason": "Detailed explanation..."
  }
]

Consider factors like:
- Shared interests and goals
- Complementary skills and experience
- Language compatibility
- Location proximity (if relevant)
- Availability alignment
- Cultural and identity considerations
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert mentoring match coordinator with deep understanding of intersectional feminism, empowerment, and culturally sensitive mentoring.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(content);
    return parsed.matches || parsed;
  } catch (error) {
    console.error('Error generating mentor matches:', error);
    throw error;
  }
}

/**
 * Generate personalized recommendations (workshops, scholarships, resources)
 */
export async function generateRecommendations(
  userData: OnboardingData & { user: User },
  knowledgeBase: {
    workshops: any[];
    scholarships: any[];
    resources: any[];
  }
): Promise<RecommendationResult[]> {
  try {
    const prompt = `
You are an AI recommendation system for "Building Bridges", a program empowering FLINTA* people of colour.

USER PROFILE:
- Goals: ${userData.goals}
- Challenges: ${userData.challenges}
- Interests: ${userData.interests}
- Background: ${userData.background || 'Not specified'}
- Skills: ${userData.skills || 'Not specified'}
- Specific Needs: ${userData.specificNeeds || 'Not specified'}

AVAILABLE RESOURCES:

WORKSHOPS:
${knowledgeBase.workshops.map((w, idx) => `
${idx + 1}. ${w.title}
   Description: ${w.description || 'No description'}
   Topics: ${w.topics || 'General'}
`).join('\n')}

SCHOLARSHIPS:
${knowledgeBase.scholarships.map((s, idx) => `
${idx + 1}. ${s.title}
   Description: ${s.description || 'No description'}
   Eligibility: ${s.eligibility || 'Check details'}
   URL: ${s.url || 'N/A'}
`).join('\n')}

RESOURCES:
${knowledgeBase.resources.map((r, idx) => `
${idx + 1}. ${r.title}
   Description: ${r.description || 'No description'}
   Type: ${r.type || 'General'}
   URL: ${r.url || 'N/A'}
`).join('\n')}

Based on the user's profile, recommend the top 5-10 most relevant opportunities. For each recommendation, provide:
1. Type (WORKSHOP, SCHOLARSHIP, RESOURCE, or EVENT)
2. Title
3. Description
4. URL (if available)
5. Reason for recommendation
6. Relevance score (0-100)

Return as JSON array:
[
  {
    "type": "WORKSHOP",
    "title": "...",
    "description": "...",
    "url": "...",
    "reason": "...",
    "relevanceScore": 85
  }
]

Prioritize recommendations that:
- Directly address the user's challenges
- Align with their goals and interests
- Match their skill level
- Support their specific needs
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert advisor for FLINTA* people of colour, with deep knowledge of educational opportunities, career development, and empowerment resources.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(content);
    return parsed.recommendations || parsed;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
}

/**
 * Generate a personalized mentoring plan
 */
export async function generateMentoringPlan(
  menteeData: OnboardingData,
  mentorData: OnboardingData
): Promise<string> {
  try {
    const prompt = `
Create a personalized mentoring plan for this mentee-mentor pair:

MENTEE:
- Goals: ${menteeData.goals}
- Challenges: ${menteeData.challenges}
- Interests: ${menteeData.interests}
- Background: ${menteeData.background || 'Not specified'}

MENTOR:
- Background: ${mentorData.background || 'Not specified'}
- Skills: ${mentorData.skills || 'Not specified'}
- Goals: ${mentorData.goals}

Create a 3-6 month mentoring plan with:
1. Initial goals and milestones
2. Suggested topics for sessions
3. Recommended resources
4. Success metrics

Format as clear, actionable Markdown.
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an experienced mentoring program coordinator.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating mentoring plan:', error);
    throw error;
  }
}

/**
 * Generate a digital story from user's onboarding data
 * This creates a compelling narrative that captures the user's journey, aspirations, and identity
 */
export async function generateDigitalStory(
  userData: OnboardingData & { user: User }
): Promise<string> {
  try {
    const prompt = `
You are creating a digital story for a participant in "Building Bridges", an empowerment program for FLINTA* (Frauen, Lesben, Inter, Nicht-binäre, Trans* and Agender) people of colour.

Based on the following information, craft a compelling, authentic, and empowering narrative that:
- Honors their journey and experiences
- Highlights their strengths and aspirations
- Acknowledges their challenges while emphasizing resilience
- Connects their goals to their broader life story
- Uses respectful, empowering language
- Is written in first-person perspective (as if the user is telling their own story)
- Is approximately 300-400 words
- Is in German (since the user interface is in German)

USER INFORMATION:
- Name: ${userData.user.name || 'A Building Bridges participant'}
- Goals: ${userData.goals}
- Challenges: ${userData.challenges}
- Interests: ${userData.interests}
- Background: ${userData.background || 'Not specified'}
- Skills: ${userData.skills || 'Not specified'}
- Specific Needs: ${userData.specificNeeds || 'Not specified'}
- Languages: ${userData.languages || 'Not specified'}
- Location: ${userData.location || 'Not specified'}

IMPORTANT GUIDELINES:
1. Start with a hook that captures their essence
2. Weave in their background, interests, and skills naturally
3. Frame challenges as part of their growth journey, not limitations
4. Connect their goals to their values and aspirations
5. End with a forward-looking, empowering statement
6. Use inclusive, culturally sensitive language
7. Avoid stereotypes or assumptions
8. Keep the tone authentic, warm, and empowering
9. Make it personal but professional - suitable for sharing with mentors or in applications

Return ONLY the story text, without any preamble or explanatory text.
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an empathetic storyteller and narrative coach who specializes in helping people articulate their journeys with authenticity and power. You understand intersectionality, cultural sensitivity, and the importance of centering the voices of marginalized communities.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8, // Higher temperature for more creative, varied stories
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating digital story:', error);
    throw error;
  }
}
