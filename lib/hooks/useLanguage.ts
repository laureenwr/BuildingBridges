'use client';

import { useEffect, useState } from 'react';
import { getStoredLanguage } from '@/lib/i18n/language';

export type AppLanguage = 'en' | 'de';

export function useLanguage(defaultLang: AppLanguage = 'en') {
  const [lang, setLang] = useState<AppLanguage>(defaultLang);

  useEffect(() => {
    const loadLanguage = () => {
      const saved = getStoredLanguage();
      if (saved) {
        setLang(saved);
        return;
      }
      setLang(document.documentElement.lang === 'de' ? 'de' : 'en');
    };

    loadLanguage();

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<AppLanguage>;
      if (customEvent.detail === 'en' || customEvent.detail === 'de') {
        setLang(customEvent.detail);
      } else {
        loadLanguage();
      }
    };

    window.addEventListener('bb-lang-change', handleLanguageChange as EventListener);
    window.addEventListener('storage', loadLanguage);

    return () => {
      window.removeEventListener('bb-lang-change', handleLanguageChange as EventListener);
      window.removeEventListener('storage', loadLanguage);
    };
  }, []);

  return { lang, isDe: lang === 'de' };
}
