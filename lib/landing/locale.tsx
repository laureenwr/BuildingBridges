'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { setStoredLanguage } from '@/lib/i18n/language';

export type LandingLocale = 'en' | 'de';

export function LandingLocaleProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useLandingLocale() {
  const { lang } = useLanguage();
  const { t: i18nT, i18n } = useTranslation('common');
  const locale: LandingLocale = lang === 'de' ? 'de' : 'en';

  useEffect(() => {
    void i18n.changeLanguage(locale);
  }, [i18n, locale]);

  return {
    locale,
    setLocale: (l: LandingLocale) => setStoredLanguage(l),
    t: (en: string, de: string) => (locale === 'de' ? de : en),
    tk: (key: string, fallback?: string) => i18nT(key, { defaultValue: fallback ?? key }),
  };
}
