'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type LandingLocale = 'en' | 'de';

type Ctx = {
  locale: LandingLocale;
  setLocale: (l: LandingLocale) => void;
  t: (en: string, de: string) => string;
};

const LandingLocaleContext = createContext<Ctx | null>(null);

const STORAGE_KEY = 'bb_lang_v1';

export function LandingLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LandingLocale>('en');

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === 'de' || v === 'en') {
        setLocaleState(v);
        document.documentElement.lang = v;
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((l: LandingLocale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l;
    }
  }, []);

  const t = useCallback(
    (en: string, de: string) => (locale === 'de' ? de : en),
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return (
    <LandingLocaleContext.Provider value={value}>{children}</LandingLocaleContext.Provider>
  );
}

export function useLandingLocale() {
  const ctx = useContext(LandingLocaleContext);
  if (!ctx) {
    return {
      locale: 'en' as const,
      setLocale: () => {},
      t: (en: string) => en,
    };
  }
  return ctx;
}
