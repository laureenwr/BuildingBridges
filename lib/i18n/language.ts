'use client';

export type AppLanguage = 'en' | 'de';
export const APP_LANG_STORAGE_KEY = 'bb_lang_v1';

export function getStoredLanguage(): AppLanguage | null {
  try {
    const value = localStorage.getItem(APP_LANG_STORAGE_KEY);
    return value === 'de' || value === 'en' ? value : null;
  } catch {
    return null;
  }
}

export function setStoredLanguage(lang: AppLanguage) {
  try {
    localStorage.setItem(APP_LANG_STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bb-lang-change', { detail: lang }));
  }
}
