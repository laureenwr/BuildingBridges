'use client';

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n/client';
import { getStoredLanguage } from '@/lib/i18n/language';

export function AppI18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const applyLanguage = (lang: 'en' | 'de') => {
      void i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    };

    const stored = getStoredLanguage();
    if (stored) applyLanguage(stored);

    const onLanguageEvent = (event: Event) => {
      const custom = event as CustomEvent<'en' | 'de'>;
      if (custom.detail === 'en' || custom.detail === 'de') {
        applyLanguage(custom.detail);
        return;
      }
      const fallback = getStoredLanguage();
      if (fallback) applyLanguage(fallback);
    };

    const onStorage = () => {
      const fallback = getStoredLanguage();
      if (fallback) applyLanguage(fallback);
    };

    window.addEventListener('bb-lang-change', onLanguageEvent as EventListener);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('bb-lang-change', onLanguageEvent as EventListener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
