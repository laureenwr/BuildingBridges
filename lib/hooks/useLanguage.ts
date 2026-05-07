'use client';

import { useEffect, useState } from 'react';

export type AppLanguage = 'en' | 'de';

export function useLanguage(defaultLang: AppLanguage = 'en') {
  const [lang, setLang] = useState<AppLanguage>(defaultLang);

  useEffect(() => {
    const loadLanguage = () => {
      try {
        const saved = localStorage.getItem('bb_lang_v1');
        if (saved === 'en' || saved === 'de') {
          setLang(saved);
          return;
        }
      } catch {
        /* ignore */
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
