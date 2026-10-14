'use client';

import { useState, useTransition, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/app/(login)/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/hooks/useLanguage';

type ResetPasswordState = {
  error: string;
  success: string;
};

function resetCopy(isDe: boolean) {
  return {
    requestTitle: isDe ? 'Passwort zurücksetzen' : 'Reset password',
    resetTitle: isDe ? 'Neues Passwort eingeben' : 'Enter a new password',
    emailLabel: isDe ? 'E-Mail-Adresse' : 'Email address',
    emailPlaceholder: isDe ? 'Ihre E-Mail-Adresse eingeben' : 'Enter your email address',
    sendLink: isDe ? 'Link zum Zurücksetzen senden' : 'Send reset link',
    sending: isDe ? 'Wird gesendet...' : 'Sending...',
    backToSignIn: isDe ? 'Zurück zur Anmeldung' : 'Back to sign in',
    newPassword: isDe ? 'Neues Passwort' : 'New password',
    newPasswordPlaceholder: isDe ? 'Neues Passwort eingeben' : 'Enter a new password',
    passwordHint: isDe
      ? 'Passwort muss mindestens 8 Zeichen, einen Großbuchstaben und eine Zahl enthalten'
      : 'Password must be at least 8 characters and include one uppercase letter and one number',
    confirmPassword: isDe ? 'Passwort bestätigen' : 'Confirm password',
    confirmPlaceholder: isDe ? 'Passwort bestätigen' : 'Confirm password',
    updatePassword: isDe ? 'Passwort aktualisieren' : 'Update password',
    updating: isDe ? 'Wird aktualisiert...' : 'Updating...',
  };
}

function resetMessage(isDe: boolean, code: string) {
  switch (code) {
    case 'reset-email-sent':
      return isDe
        ? 'Falls ein Konto mit dieser E-Mail-Adresse existiert, erhalten Sie einen Link zum Zurücksetzen des Passworts.'
        : 'If an account exists for this email address, you will receive a password reset link.';
    case 'password-updated':
      return isDe
        ? 'Passwort wurde erfolgreich zurückgesetzt. Sie können sich jetzt mit Ihrem neuen Passwort anmelden.'
        : 'Your password was reset. You can now sign in with your new password.';
    case 'passwords-mismatch':
      return isDe ? 'Die Passwörter stimmen nicht überein.' : 'The passwords do not match.';
    case 'password-too-short':
      return isDe
        ? 'Das Passwort muss mindestens 8 Zeichen lang sein.'
        : 'Your password must be at least 8 characters long.';
    case 'password-no-uppercase':
      return isDe
        ? 'Das Passwort muss mindestens einen Großbuchstaben enthalten.'
        : 'Your password must include at least one uppercase letter.';
    case 'password-no-number':
      return isDe
        ? 'Das Passwort muss mindestens eine Zahl enthalten.'
        : 'Your password must include at least one number.';
    case 'invalid-token':
      return isDe
        ? 'Ungültiger oder abgelaufener Token. Bitte fordern Sie einen neuen Link an.'
        : 'This reset link is invalid or has expired. Please request a new one.';
    case 'expired-token':
      return isDe
        ? 'Der Token ist abgelaufen. Bitte fordern Sie einen neuen Link an.'
        : 'This reset link has expired. Please request a new one.';
    case 'invalid-request':
      return isDe ? 'Ungültige Anfrage' : 'Invalid request.';
    case 'server-error':
      return isDe
        ? 'Fehler beim Zurücksetzen des Passworts. Bitte versuchen Sie es erneut.'
        : 'Something went wrong while resetting your password. Please try again.';
    default:
      return code;
  }
}

export default function ResetPasswordPage() {
  const { isDe } = useLanguage();
  const t = resetCopy(isDe);
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
            success: result.success,
          });

          if (step === 'reset') {
            setTimeout(() => {
              startTransition(() => {
                router.push('/sign-in');
              });
            }, 3000);
          }
        } else {
          setFormState({
            error: result.error || 'server-error',
            success: '',
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setFormState({
          error: 'server-error',
          success: '',
        });
        console.error('Password reset error:', error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {step === 'request' ? t.requestTitle : t.resetTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formState.success ? (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {resetMessage(isDe, formState.success)}
            </div>
          ) : null}

          {formState.error ? (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {resetMessage(isDe, formState.error)}
            </div>
          ) : null}

          <form onSubmit={handleSubmit}>
            {step === 'request' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.emailLabel}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting || isPending}>
                  {isSubmitting ? t.sending : t.sendLink}
                </Button>
                <div className="text-center mt-4">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => startTransition(() => router.push('/sign-in'))}
                  >
                    {t.backToSignIn}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <input type="hidden" name="token" value={token} />
                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t.newPassword}</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    minLength={8}
                    placeholder={t.newPasswordPlaceholder}
                  />
                  <p className="text-xs text-gray-500">{t.passwordHint}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    placeholder={t.confirmPlaceholder}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting || isPending}>
                  {isSubmitting ? t.updating : t.updatePassword}
                </Button>
                <div className="text-center mt-4">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => startTransition(() => router.push('/sign-in'))}
                  >
                    {t.backToSignIn}
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
