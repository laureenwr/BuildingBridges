# Digital Storytelling Feature

## Overview

The Digital Storytelling feature transforms user onboarding data into compelling, personalized narratives. These AI-generated stories capture the user's journey, aspirations, and identity in an authentic, empowering way.

## Purpose

- **Empowerment**: Help users articulate their journey with confidence and clarity
- **Better Matching**: Provide mentors with deeper context about mentees beyond raw data
- **Application Support**: Create narratives suitable for scholarship applications, introductions, etc.
- **Identity Affirmation**: Honor each person's unique story and experience

## How It Works

### 1. Data Collection
User completes the onboarding questionnaire with:
- Goals
- Challenges
- Interests
- Background
- Skills
- Languages
- Location
- Specific needs

### 2. Story Generation
The `generateDigitalStory()` function uses OpenAI's GPT-4 to:
- Transform responses into a cohesive first-person narrative
- Write in German (matching the UI language)
- Create ~300-400 words
- Use empowering, culturally sensitive language
- Frame challenges as growth opportunities
- Connect goals to broader aspirations

### 3. Storage
Stories are saved to the `onboarding_data` table:
- `digitalStory`: The generated narrative text
- `storyGeneratedAt`: Timestamp of generation

## API Reference

### Server Actions

#### `generateUserDigitalStory()`
Generates a new digital story for the authenticated user.

**Returns:**
```typescript
{
  success: true,
  story: string
} | {
  error: string
}
```

**Example Usage:**
```typescript
import { generateUserDigitalStory } from '@/lib/actions/onboarding';

const result = await generateUserDigitalStory();
if (result.success) {
  console.log(result.story);
}
```

#### `getUserDigitalStory()`
Retrieves the user's existing digital story.

**Returns:**
```typescript
{
  digitalStory: string | null,
  storyGeneratedAt: Date | null
} | null
```

### AI Service

#### `generateDigitalStory(userData)`
Low-level function that calls OpenAI API.

**Parameters:**
```typescript
userData: OnboardingData & { user: User }
```

**Returns:**
```typescript
Promise<string>
```

## Database Schema

```sql
ALTER TABLE onboarding_data
ADD COLUMN digital_story TEXT,
ADD COLUMN story_generated_at TIMESTAMP;
```

## Integration Points

### Potential Use Cases

1. **Post-Onboarding Display**
   - Show the story after completing onboarding
   - Allow users to regenerate if desired

2. **Mentor Matching**
   - Display story to potential mentors
   - Use as part of match introduction

3. **Profile Page**
   - Include in user profile
   - Option to edit or regenerate

4. **Application Exports**
   - Provide story as template for applications
   - Export to PDF or document format

## Example Story Output

```
Ich heiße [Name] und meine Reise hat mich von [Background] bis hierher geführt.
Was mich antreibt ist [Goals], und ich brenne besonders für [Interests].

Meine größten Herausforderungen – [Challenges] – haben mich gelehrt, dass Wachstum
oft außerhalb der Komfortzone stattfindet. Mit meinen Fähigkeiten in [Skills] und
meiner Mehrsprachigkeit ([Languages]) bringe ich eine einzigartige Perspektive mit.

Ich suche nach [Specific Needs] und freue mich darauf, durch Building Bridges...
```

## Technical Considerations

### API Costs
- Each story generation costs ~$0.01-0.03 (depending on GPT-4 pricing)
- Consider caching stories and only regenerating on request
- Current implementation: generates once, stores in DB

### Privacy & Security
- Stories contain personal information
- Ensure proper authentication before retrieval
- Consider GDPR compliance for data storage
- Allow users to delete or regenerate

### Error Handling
- API failures return error messages
- Gracefully handle missing data
- Validate authentication before generation

## Future Enhancements

- [ ] Allow users to edit generated stories
- [ ] Multiple story versions (different tones/lengths)
- [ ] Export to different formats (PDF, DOCX)
- [ ] Multi-language support beyond German
- [ ] Voice narration of stories
- [ ] Visual storytelling with images/graphics
- [ ] Story templates for specific use cases

## Testing

To test the feature:

1. Ensure OPENAI_API_KEY is set in `.env`
2. Complete user onboarding
3. Call `generateUserDigitalStory()`
4. Verify story is saved to database
5. Retrieve with `getUserDigitalStory()`

## Example Integration in UI

```typescript
// In a React component
'use client';

import { useState } from 'react';
import { generateUserDigitalStory, getUserDigitalStory } from '@/lib/actions/onboarding';

export function DigitalStoryGenerator() {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateUserDigitalStory();
    if (result.success) {
      setStory(result.story);
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generiere Geschichte...' : 'Meine Geschichte erstellen'}
      </button>
      {story && <div className="prose">{story}</div>}
    </div>
  );
}
```

## Questions & Support

For questions or issues with the digital storytelling feature, please contact the development team.
