'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  Loader2
} from 'lucide-react';
import {
  generateMatches,
  generateUserRecommendations,
  getUserRecommendations,
  getUserMatches,
  getOnboardingData
} from '@/lib/actions/onboarding';
import Link from 'next/link';

export default function MentoringPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasOnboarding, setHasOnboarding] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);

      // Check if user has completed onboarding
      const onboardingData = await getOnboardingData();
      setHasOnboarding(!!onboardingData);

      if (onboardingData) {
        // Load existing matches and recommendations
        const [matchesData, recommendationsData] = await Promise.all([
          getUserMatches(),
          getUserRecommendations(),
        ]);

        setMatches(matchesData);
        setRecommendations(recommendationsData);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Fehler beim Laden der Daten');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMatches = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateMatches();

      if (result.error) {
        setError(result.error);
      } else {
        // Reload data
        await loadData();
      }
    } catch (err) {
      setError('Fehler beim Generieren der Matches');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateRecommendations = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateUserRecommendations();

      if (result.error) {
        setError(result.error);
      } else {
        // Reload data
        await loadData();
      }
    } catch (err) {
      setError('Fehler beim Generieren der Empfehlungen');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  // If user hasn't completed onboarding, show prompt
  if (!hasOnboarding) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              Mein persönliches Mentoring-Programm
            </CardTitle>
            <CardDescription>
              Beantworte ein paar Fragen und lass unsere KI die perfekte Mentoring-Beziehung für dich finden!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-lg mb-3">Was dich erwartet:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <span>KI-gestützte Mentor*innen-Matches</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <span>Personalisierte Workshop-Empfehlungen</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <span>Stipendien und Ressourcen</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5" />
                    <span>Community-Zugang</span>
                  </li>
                </ul>
              </div>

              <Link href="/onboarding">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Jetzt starten
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-purple-600" />
          Mein persönliches Mentoring-Programm
        </h1>
        <p className="text-gray-600">
          KI-gestützte Empfehlungen basierend auf deinem Profil
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Mentor Matches</p>
                <p className="text-2xl font-bold">{matches.length}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Empfehlungen</p>
                <p className="text-2xl font-bold">{recommendations.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Workshops</p>
                <p className="text-2xl font-bold">
                  {recommendations.filter(r => r.type === 'WORKSHOP').length}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stipendien</p>
                <p className="text-2xl font-bold">
                  {recommendations.filter(r => r.type === 'SCHOLARSHIP').length}
                </p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button
          onClick={handleGenerateMatches}
          disabled={isGenerating}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4 mr-2" />
          )}
          Neue Mentor-Matches generieren
        </Button>

        <Button
          onClick={handleGenerateRecommendations}
          disabled={isGenerating}
          variant="outline"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <TrendingUp className="h-4 w-4 mr-2" />
          )}
          Neue Empfehlungen generieren
        </Button>
      </div>

      {/* Mentor Matches */}
      {matches.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-purple-600" />
            Deine Mentor-Matches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((match) => (
              <Card key={match.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        Mentor #{match.mentorId}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        Match Score: {match.matchScore}%
                      </Badge>
                    </div>
                    <Badge
                      variant={
                        match.status === 'ACTIVE' ? 'default' :
                        match.status === 'PENDING' ? 'secondary' :
                        'outline'
                      }
                    >
                      {match.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{match.matchReason}</p>
                  <Button className="w-full" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Kontakt aufnehmen
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Persönliche Empfehlungen
          </h2>

          <div className="space-y-6">
            {/* Workshops */}
            {recommendations.filter(r => r.type === 'WORKSHOP').length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Workshops
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations
                    .filter(r => r.type === 'WORKSHOP')
                    .map((rec) => (
                      <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-base">{rec.title}</CardTitle>
                          <Badge variant="secondary" className="w-fit">
                            {rec.relevanceScore}% relevant
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                          <p className="text-xs text-gray-500 mb-4">
                            <strong>Warum:</strong> {rec.reason}
                          </p>
                          {rec.url && (
                            <Button variant="outline" size="sm" className="w-full" asChild>
                              <a href={rec.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Mehr erfahren
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* Scholarships */}
            {recommendations.filter(r => r.type === 'SCHOLARSHIP').length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Stipendien
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations
                    .filter(r => r.type === 'SCHOLARSHIP')
                    .map((rec) => (
                      <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-base">{rec.title}</CardTitle>
                          <Badge variant="secondary" className="w-fit">
                            {rec.relevanceScore}% relevant
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                          <p className="text-xs text-gray-500 mb-4">
                            <strong>Warum:</strong> {rec.reason}
                          </p>
                          {rec.url && (
                            <Button variant="outline" size="sm" className="w-full" asChild>
                              <a href={rec.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Jetzt bewerben
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* Resources */}
            {recommendations.filter(r => r.type === 'RESOURCE').length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Ressourcen
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations
                    .filter(r => r.type === 'RESOURCE')
                    .map((rec) => (
                      <Card key={rec.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="text-base">{rec.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                          {rec.url && (
                            <Button variant="outline" size="sm" className="w-full" asChild>
                              <a href={rec.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Entdecken
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty States */}
      {matches.length === 0 && recommendations.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Noch keine Empfehlungen</h3>
            <p className="text-gray-600 mb-6">
              Klicke auf die Buttons oben, um KI-gestützte Matches und Empfehlungen zu generieren!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
