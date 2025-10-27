'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitOnboarding } from '@/lib/actions/onboarding';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: 'Willkommen bei Building Bridges!',
    description: 'Lass uns dein Profil erstellen, um die perfekte Mentoring-Beziehung für dich zu finden.',
  },
  {
    id: 2,
    title: 'Deine Ziele',
    description: 'Was möchtest du mit einem Mentoring erreichen?',
  },
  {
    id: 3,
    title: 'Deine Herausforderungen',
    description: 'Wo stehst du gerade und was sind deine größten Herausforderungen?',
  },
  {
    id: 4,
    title: 'Deine Interessen',
    description: 'Was begeistert dich? Welche Themen interessieren dich?',
  },
  {
    id: 5,
    title: 'Über dich',
    description: 'Erzähl uns mehr über deinen Hintergrund.',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    challenges: '',
    goals: '',
    interests: '',
    background: '',
    skills: '',
    availability: '',
    preferredMentorshipStyle: '',
    specificNeeds: '',
    languages: '',
    location: '',
  });

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      setError(null);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    try {
      const result = await submitOnboarding(formDataObj);

      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
      } else {
        // Success! Redirect to mentoring page
        startTransition(() => {
          router.push('/dashboard/mentoring');
        });
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten');
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 2:
        return formData.goals.length >= 10;
      case 3:
        return formData.challenges.length >= 10;
      case 4:
        return formData.interests.length >= 10;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Schritt {currentStep} von {STEPS.length}
            </span>
            <span className="text-sm font-medium text-purple-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              {STEPS[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-base">
              {STEPS[currentStep - 1].description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-lg mb-3">Was dich erwartet:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>KI-gestützte Mentor*innen-Matching basierend auf deinem Profil</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Personalisierte Workshop-Empfehlungen</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Stipendien und Ressourcen speziell für dich</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>Community-Zugang und Networking-Möglichkeiten</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  Nimm dir Zeit, um die Fragen so ausführlich wie möglich zu beantworten.
                  Je mehr wir über dich wissen, desto besser können wir dich unterstützen!
                </p>
              </div>
            )}

            {/* Step 2: Goals */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goals" className="text-base font-medium">
                    Was sind deine Ziele? <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Was möchtest du in den nächsten 6-12 Monaten erreichen?
                  </p>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    placeholder="z.B. Ich möchte meine Karriere im Tech-Bereich weiterentwickeln, mehr Selbstvertrauen im Beruf gewinnen, ein Netzwerk aufbauen..."
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Mindestens 10 Zeichen ({formData.goals.length}/10)
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Challenges */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="challenges" className="text-base font-medium">
                    Was sind deine größten Herausforderungen? <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Welche Hindernisse möchtest du überwinden?
                  </p>
                  <Textarea
                    id="challenges"
                    value={formData.challenges}
                    onChange={(e) => handleInputChange('challenges', e.target.value)}
                    placeholder="z.B. Ich finde es schwierig, mich in männerdominierten Bereichen zu behaupten, habe Schwierigkeiten mit Work-Life-Balance, suche nach Karriereorientierung..."
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Mindestens 10 Zeichen ({formData.challenges.length}/10)
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Interests */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="interests" className="text-base font-medium">
                    Was interessiert dich? <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Welche Themen, Bereiche oder Aktivitäten begeistern dich?
                  </p>
                  <Textarea
                    id="interests"
                    value={formData.interests}
                    onChange={(e) => handleInputChange('interests', e.target.value)}
                    placeholder="z.B. Technologie, soziale Gerechtigkeit, Unternehmertum, Kunst, Bildung, Community-Arbeit..."
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Mindestens 10 Zeichen ({formData.interests.length}/10)
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Additional Info */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="background" className="text-base font-medium">
                    Dein Hintergrund
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Bildungsweg, beruflicher Werdegang, bisherige Erfahrungen
                  </p>
                  <Textarea
                    id="background"
                    value={formData.background}
                    onChange={(e) => handleInputChange('background', e.target.value)}
                    placeholder="z.B. Studiere Informatik im 3. Semester, habe einen Bachelor in BWL, arbeite seit 2 Jahren im Marketing..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="skills" className="text-base font-medium">
                    Deine Fähigkeiten
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Kommagetrennt (z.B. Python, Projektmanagement, Design)
                  </p>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    placeholder="z.B. Python, Projektmanagement, Grafik Design, Social Media"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="languages" className="text-base font-medium">
                      Sprachen
                    </Label>
                    <Input
                      id="languages"
                      value={formData.languages}
                      onChange={(e) => handleInputChange('languages', e.target.value)}
                      placeholder="z.B. Deutsch, Englisch, Spanisch"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-base font-medium">
                      Standort
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="z.B. Berlin, München, Remote"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="availability" className="text-base font-medium">
                    Verfügbarkeit
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Wie viel Zeit kannst du für Mentoring aufbringen?
                  </p>
                  <Input
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    placeholder="z.B. 2 Stunden pro Woche, einmal im Monat, flexibel"
                  />
                </div>

                <div>
                  <Label htmlFor="preferredMentorshipStyle" className="text-base font-medium">
                    Bevorzugter Mentoring-Stil
                  </Label>
                  <Input
                    id="preferredMentorshipStyle"
                    value={formData.preferredMentorshipStyle}
                    onChange={(e) => handleInputChange('preferredMentorshipStyle', e.target.value)}
                    placeholder="z.B. 1-zu-1, Gruppenmentoring, flexibel"
                  />
                </div>

                <div>
                  <Label htmlFor="specificNeeds" className="text-base font-medium">
                    Spezifische Bedürfnisse
                  </Label>
                  <Textarea
                    id="specificNeeds"
                    value={formData.specificNeeds}
                    onChange={(e) => handleInputChange('specificNeeds', e.target.value)}
                    placeholder="Gibt es etwas Spezifisches, das wir wissen sollten?"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </Button>
          )}

          <Button
            onClick={currentStep === STEPS.length ? handleSubmit : handleNext}
            disabled={!canProceed() || isSubmitting}
            className={`ml-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center gap-2 ${
              currentStep === 1 ? '' : ''
            }`}
          >
            {isSubmitting ? (
              'Speichern...'
            ) : currentStep === STEPS.length ? (
              <>
                Abschließen
                <Sparkles className="h-4 w-4" />
              </>
            ) : (
              <>
                Weiter
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
