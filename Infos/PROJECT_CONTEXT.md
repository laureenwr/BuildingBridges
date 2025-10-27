# Building Bridges - Project Context

## Project Overview

**Building Bridges** is an empowerment program for **FLINTA* (Frauen, Lesben, Inter, Nicht-binäre, Trans* and Agender) people of colour**. The project provides mentoring, workshops, resources, and community support to help participants achieve their educational and professional goals.

### Mission
To empower FLINTA* people of colour through:
- Personalized mentoring relationships
- Educational workshops and resources
- Scholarship opportunities
- Community building and networking
- Culturally sensitive support and guidance

### Key Principles
1. **Intersectionality**: Recognizing the interconnected nature of social categorizations
2. **Empowerment**: Building confidence, skills, and agency
3. **Community**: Creating safe, supportive spaces
4. **Accessibility**: Removing barriers to opportunity
5. **Cultural Sensitivity**: Honoring diverse backgrounds and experiences

## Project Team

### Leadership Team

**Claudia Calvano** - Verbundleitung und Leitung Teilprojekt 1
- Diplom-Psychologin, Kinder- und Jugendlichenpsychotherapeutin
- Freie Universität Berlin
- Focus: psychische Gesundheit von Kindern und Jugendlichen, marginalisierte Gruppen, diversitätssensiblem Empowerment
- Email: Claudia.calvano@fu-berlin.de

**Celiana Kiefer** - Teilprojektleitung Teilprojekt 2 "Ment2Power"
- M.A. Soziale Arbeit
- Stiftung SPI
- Expertise: Mädchen*arbeit und -politik, Empowerment, Rassismus, Feminismus, Intersektionalität, Queereness
- Positioniert als Schwarze Person, Queer, Arbeiterinnenkind
- Email: celiana.kiefer@lvs.stiftung-spi.de

**Nina Sedlak-Çınar** - Planung, Durchführung von Veranstaltungen
- BA Asienwissenschaften, Master Intercultural Education
- 15 Jahre Arbeit im Bildungsbereich
- Focus: Politische Bildungsarbeit, Antidiskriminierung, Empowerment, Talentscouting
- Email: nina.sedlak-cinar@lvs.stiftung-spi.de

**Esther Kipnis** - Studentische Hilfskraft Teilprojekt 1
- B.Sc. Psychologie (FU Berlin)
- Master of Science Psychologie mit Schwerpunkt Klinische Psychologie
- Email: e.kipnis@fu-berlin.de

### Organizations

**Stiftung SPI**
- Frankfurter Allee 35-37, 10247 Berlin
- Main operational partner

**Freie Universität Berlin**
- Habelschwerdter Allee 45, 14195 Berlin
- Research and academic partner

## Technical Architecture

### Stack
- **Framework**: Next.js 14 (App Router, React Server Components)
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle
- **Authentication**: next-auth with JWT
- **AI/ML**: OpenAI GPT-4 for matching, recommendations, digital storytelling
- **UI**: shadcn/ui, Tailwind CSS, Framer Motion
- **Deployment**: Vercel
- **Testing**: Playwright (E2E), Vitest (Unit)

### Key Features

#### 1. **Onboarding System**
Located at: `app/(login)/onboarding/page.tsx`
- Multi-step questionnaire
- Captures goals, challenges, interests, background, skills
- All fields in German for accessibility
- Server actions in `lib/actions/onboarding.ts`

#### 2. **AI-Powered Mentor Matching**
Service: `lib/ai/openai-service.ts`
- Uses GPT-4 to analyze mentee-mentor compatibility
- Considers: goals, interests, skills, languages, location, cultural fit
- Generates match scores (0-100) and explanations
- Stores in `mentoring_matches` table

#### 3. **Digital Storytelling** (NEW)
- Transforms onboarding data into compelling narratives
- 300-400 word first-person stories in German
- Empowering, culturally sensitive language
- Used for mentor introductions and applications
- See: `DIGITAL_STORYTELLING.md`

#### 4. **AI Recommendations**
- Personalized workshop recommendations
- Scholarship matching
- Resource suggestions
- Knowledge base in `lib/ai/knowledge-base.ts`

#### 5. **Workshop Management**
- Workshop creation and enrollment
- Mentor assignments
- Capacity tracking
- Database schema: `workshops`, `workshop_enrollments`, `workshop_mentors`

### Database Schema

Key tables:
- `users` - User accounts with roles (ADMIN, STUDENT, MENTOR)
- `onboarding_data` - User questionnaire responses + digital stories
- `mentoring_matches` - AI-generated mentor-mentee pairings
- `ai_recommendations` - Personalized suggestions
- `workshops` - Workshop catalog
- `workshop_enrollments` - User registrations

### Project Structure

```
app/
├── (login)/              # Auth pages
│   ├── login.tsx
│   ├── onboarding/
│   └── reset-password/
├── (dashboard)/          # Protected pages
│   └── mentoring/
├── team/                 # Team page
├── partners/             # Partners page
├── workshops/            # Workshop listings
└── page.tsx             # Home page

lib/
├── actions/             # Server actions
│   └── onboarding.ts
├── ai/                  # AI services
│   ├── openai-service.ts
│   └── knowledge-base.ts
├── auth/                # Authentication
├── db/                  # Database setup
│   └── schema.ts
└── content/            # Static content

components/
├── ui/                  # shadcn components
└── team/               # Team-specific components

e2e/                     # Playwright tests
```

## Content Guidelines

### Language
- **Primary Language**: German
- All user-facing content should be in German
- Use inclusive language (e.g., "Mentor*innen", "Teilnehmer*innen")
- Gender-inclusive forms with asterisk (*)

### Tone & Voice
- **Empowering**: Focus on strengths, not deficits
- **Welcoming**: Warm, approachable, supportive
- **Respectful**: Culturally sensitive, intersectional awareness
- **Professional**: Clear, organized, accessible

### Design Principles
- **Accessibility**: WCAG 2.1 AA compliance
- **Inclusive**: Diverse representation in visuals
- **Modern**: Clean, contemporary design
- **Warm Colors**: Purple and blue gradients (empowerment theme)

## Development Workflow

### Branch Strategy
- `main` - Production branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Commit Convention
```
feat(scope): description
fix(scope): description
docs(scope): description
test(scope): description
chore(scope): description
```

### Testing Requirements
- E2E tests for critical user flows (Playwright)
- Unit tests for utility functions (Vitest)
- Manual testing on Vercel preview deployments

### Deployment
- Automatic preview deploys on PR creation (Vercel)
- Production deploys on merge to `main`
- Environment variables managed in Vercel dashboard

## AI Integration

### OpenAI Configuration
- Model: `gpt-4-turbo-preview`
- Environment variable: `OPENAI_API_KEY`
- Services:
  - Mentor matching
  - Recommendations
  - Digital storytelling
  - Future: chatbot, content generation

### AI Service Patterns
```typescript
// All AI functions follow this pattern:
export async function generateSomething(userData: UserData): Promise<Result> {
  try {
    const prompt = `...structured prompt...`;
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [...],
      temperature: 0.7-0.8,
    });
    return parseResponse(response);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

## Environment Variables

Required:
```env
# Database
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=

# Auth
AUTH_SECRET=
NEXTAUTH_URL=

# OpenAI
OPENAI_API_KEY=

# Email (Optional)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=

# Vercel (Auto-populated)
VERCEL_URL=
```

## Key User Flows

### 1. New User Registration
1. Sign up at `/sign-up`
2. Complete onboarding questionnaire
3. AI generates digital story
4. AI matches with mentors
5. Receive personalized recommendations
6. Redirect to `/dashboard/mentoring`

### 2. Mentor Matching
1. System analyzes user's onboarding data
2. Fetches available mentors with completed profiles
3. Sends to OpenAI for matching
4. Receives top 3-5 matches with scores and reasons
5. Stores in database with PENDING status
6. User can accept/decline matches

### 3. Workshop Discovery
1. User browses workshops
2. AI recommends relevant workshops based on profile
3. User enrolls in workshops
4. Receives confirmation and materials

## Resources

### Scholarships in Knowledge Base
- Rosa Luxemburg Stiftung Studienwerk
- Heinrich Böll Stiftung
- Avicenna Studienwerk
- Deutschlandstipendium
- Studienstiftung des deutschen Volkes

### Organizations & Resources
- Bundeszentrale für politische Bildung
- IQ Netzwerk
- MiGAZIN
- Each One Teach One (EOTO)
- Neue deutsche Medienmacher*innen

## Common Tasks

### Adding a New Workshop Type
1. Update `workshops` table schema if needed
2. Add workshop data via admin panel or seed script
3. Update AI knowledge base in `lib/ai/knowledge-base.ts`
4. Test recommendation algorithm

### Adding a New AI Feature
1. Create function in `lib/ai/openai-service.ts`
2. Add server action in appropriate file
3. Update schema if storing results
4. Document in feature-specific MD file
5. Add E2E test

### Updating Team Information
1. Edit `app/team/team_infos.md`
2. Update `lib/content/team.ts` if needed
3. Verify display on `/team` page

## Links

- **Live Site**: [TBD - Vercel URL]
- **GitHub**: [Repository URL]
- **Stiftung SPI**: https://talentscouting-berlin.de/
- **FU Berlin**: https://www.fu-berlin.de/

## Support & Contact

For technical questions:
- Developer: Elias Jelinek
- Email: elias@fjelinek.de

For project questions:
- Claudia Calvano: Claudia.calvano@fu-berlin.de
- Celiana Kiefer: celiana.kiefer@lvs.stiftung-spi.de
