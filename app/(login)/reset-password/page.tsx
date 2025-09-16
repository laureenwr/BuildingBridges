'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';

type ResetPasswordState = {
  error: string;
  success: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [formState, setFormState] = useState<ResetPasswordState>({
    error: '',
    success: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

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
          if ((result as any).resetUrl) {
            setResetUrl((result as any).resetUrl as string);
          }
          
          // If successful and we have a success message, show it
          // No redirectTo handling needed as the action doesn't return that property
          
          // If we're in reset step, redirect to login after successful password reset
          if (step === 'reset') {
            setTimeout(() => {
              startTransition(() => {
                router.push('/login');
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
            {step === 'request' ? 'Reset Your Password' : 'Enter New Password'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formState.success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {formState.success}
            </div>
          )}
          {resetUrl && step === 'request' && (
            <div className="mb-4 p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm">
              Kein E-Mail-Dienst konfiguriert. Verwenden Sie diesen Link, um fortzufahren:{' '}
              <a href={resetUrl} className="underline text-purple-700">{resetUrl}</a>
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Button>
                <div className="text-center mt-4">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => startTransition(() => router.push('/sign-in'))}
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token">Reset Token</Label>
                  <Input id="token" name="token" type="text" required placeholder="Paste reset token" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="Confirm new password"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update Password'}
                </Button>
                <div className="text-center mt-4">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => startTransition(() => router.push('/sign-in'))}
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
      <div className="mt-6 text-center">
        <Button variant="link" onClick={() => setStep(step === 'request' ? 'reset' : 'request')}>
          {step === 'request' ? 'I already have a reset token' : 'Request a reset link instead'}
        </Button>
      </div>
    </div>
  );
}