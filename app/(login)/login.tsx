'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Users, AlertCircle, Heart, Globe, BookOpen } from 'lucide-react';
import { signUpAction } from './actions';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const error = searchParams.get('error');
  const success = searchParams.get('success');
  
  // Add client-side validation state
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'missing-credentials':
        return 'Bitte geben Sie E-Mail und Passwort ein.';
      case 'invalid-credentials':
        return 'Ungültige E-Mail oder Passwort. Bitte versuchen Sie es erneut.';
      case 'exists':
        return 'Es existiert bereits ein Konto mit dieser E-Mail-Adresse. Bitte melden Sie sich an.';
      case 'server-error':
        return 'Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-blue-100/20" />
      <div className="absolute inset-0 bg-[url('/coverimage.png')] bg-center bg-no-repeat bg-cover opacity-5" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo and Project Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 mb-4 shadow-lg"
          >
            <Globe className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Building Bridges
          </h1>
          <p className="text-sm text-gray-600">
            Empowering Girls and FLINTA* of Colour
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="pt-8 pb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {mode === 'signup' ? 'Konto erstellen' : 'Willkommen zurück'}
              </h2>
              <p className="text-gray-600">
                {mode === 'signup'
                  ? 'Werden Sie Teil unserer Community und starten Sie Ihre Reise'
                  : 'Melden Sie sich an, um auf Ihr Konto zuzugreifen'}
              </p>
            </div>

            <form
              className="space-y-6"
              action={mode === 'signin' ? undefined : signUpAction}
              onSubmit={async (e) => {
                if (mode !== 'signin') return; // handled by action for signup
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const email = (form.querySelector('#email') as HTMLInputElement)?.value;
                const password = (form.querySelector('#password') as HTMLInputElement)?.value;
                const rawCallback = (form.querySelector('input[name="redirect"]') as HTMLInputElement)?.value || '/dashboard';
                // allow only internal paths to prevent open redirects; block protocol-relative (//)
                const isInternal = rawCallback.startsWith('/') && !rawCallback.startsWith('//');
                const callbackUrl = isInternal ? rawCallback : '/dashboard';
                const result = await nextAuthSignIn('credentials', {
                  redirect: false,
                  email,
                  password,
                  callbackUrl,
                });
                if (result?.ok) {
                  window.location.href = result.url || callbackUrl;
                } else {
                  window.location.href = '/sign-in?error=invalid-credentials';
                }
              }}
            >
              <input type="hidden" name="redirect" value={redirect || ''} />
              <input type="hidden" name="priceId" value={priceId || ''} />
              <input type="hidden" name="inviteId" value={inviteId || ''} />
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center"
                >
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  {getErrorMessage(error)}
                </motion.div>
              )}
              {!error && mode === 'signin' && success === '1' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm"
                >
                  Konto erstellt. Bitte melden Sie sich an.
                </motion.div>
              )}
              
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">E-Mail-Adresse</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={50}
                  className={`mt-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg ${
                    validationErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="ihre.email@beispiel.de"
                  onChange={() => {
                    if (validationErrors.email) {
                      setValidationErrors(prev => ({ ...prev, email: undefined }));
                    }
                  }}
                />
                {validationErrors.email && (
                  <div className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.email}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">Passwort</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={
                    mode === 'signin' ? 'current-password' : 'new-password'
                  }
                  required
                  minLength={mode === 'signup' ? 8 : undefined}
                  maxLength={100}
                  className={`mt-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-lg ${
                    validationErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="••••••••"
                  onChange={() => {
                    if (validationErrors.password) {
                      setValidationErrors(prev => ({ ...prev, password: undefined }));
                    }
                  }}
                />
                {validationErrors.password && (
                  <div className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.password}
                  </div>
                )}
                {mode === 'signup' && (
                  <p className="mt-2 text-xs text-gray-500">
                    Passwort muss mindestens 8 Zeichen lang sein
                  </p>
                )}
              </div>

              {/* Role selection removed; server defaults sign-ups to STUDENT */}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg py-3 font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {mode === 'signin' ? 'Anmelden' : 'Konto erstellen'}
              </Button>
            </form>

            <div className="mt-4 text-center">
              {mode === 'signin' && (
                <Link href="/reset-password" className="text-sm text-gray-600 hover:text-gray-800">
                  Passwort vergessen?
                </Link>
              )}
            </div>

            <div className="mt-8 text-center">
              <Link
                href={mode === 'signup' ? '/sign-in' : '/sign-up'}
                className="text-purple-600 hover:text-purple-700 transition-colors duration-200 font-medium"
              >
                {mode === 'signup'
                  ? 'Bereits ein Konto? Anmelden'
                  : 'Noch kein Konto? Registrieren'}
              </Link>
            </div>

            {/* Project Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1 text-purple-500" />
                  <span>Empowerment</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1 text-blue-500" />
                  <span>Mentoring</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1 text-green-500" />
                  <span>Community</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
