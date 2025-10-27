'use client';

import { useState, useTransition, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/app/(login)/actions';
import { useRouter, useSearchParams } from 'next/navigation';

type ResetPasswordState = {
  error: string;
  success: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [token, setToken] = useState<string>('');
  const [formState, setFormState] = useState<ResetPasswordState>({
    error: '',
    success: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for token in URL parameters
  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
      setStep('reset');
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormState({ error: '', success: '' });
    
    const formData = new FormData(e.currentTarget);
    
    resetPassword(formData)
      .then((result) => {
        setIsSubmitting(false);
        
        if (result.success) {
          setFormState({ 
            error: '', 
            success: result.success // Use the success message directly from the response
          });
          
          // If we're in reset step, redirect to sign-in after successful password reset
          if (step === 'reset') {
            setTimeout(() => {
              startTransition(() => {
                router.push('/sign-in');
              });
            }, 3000); // Redirect after 3 seconds to allow user to see success message
          }
        } else {
          setFormState({ 
            error: result.error || 'An error occurred. Please try again.',
            success: '' 
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setFormState({ 
          error: 'An unexpected error occurred. Please try again.',
          success: '' 
        });
        console.error('Password reset error:', error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {step === 'request' ? 'Passwort zurücksetzen' : 'Neues Passwort eingeben'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formState.success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {formState.success}
            </div>
          )}
          
          {formState.error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {formState.error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {step === 'request' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail-Adresse</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Ihre E-Mail-Adresse eingeben"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Link zum Zurücksetzen senden'}
                </Button>
                <div className="text-center mt-4">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => startTransition(() => router.push('/sign-in'))}
                  >
                    Zurück zur Anmeldung
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <input type="hidden" name="token" value={token} />
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Neues Passwort</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    minLength={8}
                    placeholder="Neues Passwort eingeben"
                  />
                  <p className="text-xs text-gray-500">
                    Passwort muss mindestens 8 Zeichen, einen Großbuchstaben und eine Zahl enthalten
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    placeholder="Passwort bestätigen"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Wird aktualisiert...' : 'Passwort aktualisieren'}
                </Button>
                <div className="text-center mt-4">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => startTransition(() => router.push('/sign-in'))}
                  >
                    Zurück zur Anmeldung
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}