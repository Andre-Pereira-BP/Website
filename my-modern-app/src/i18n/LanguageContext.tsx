import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { detectPreferredLang, htmlLang, Lang, langFromPath } from './locale';

export type { Lang } from './locale';

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: 'pt', label: 'Português', flag: '/img/icons/pt.png' },
  { code: 'en', label: 'English', flag: '/img/icons/gb.png' },
];

interface LanguageContextValue {
  lang: Lang;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Public pages take the language from the URL prefix (/pt/..., /en/...). Unprefixed routes
 * (the admin area and the redirect to a language) fall back to the visitor's preference.
 * Must be rendered inside the router.
 */
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const urlLang = langFromPath(pathname);
  const lang = useMemo(() => urlLang ?? detectPreferredLang(), [urlLang]);

  useEffect(() => {
    document.documentElement.lang = htmlLang(lang);
  }, [lang]);

  const value = useMemo(() => ({ lang }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};

/** Picks the dictionary for the active language. `pt` must mirror the shape of `en`. */
export const useT = <T,>(dict: { en: T; pt: T }): T => {
  const { lang } = useLanguage();
  return dict[lang];
};

/** Locale string for Intl formatting. */
export const localeFor = (lang: Lang) => (lang === 'pt' ? 'pt-PT' : 'en-GB');

export const formatDate = (iso: string, lang: Lang) => {
  const date = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
  return date.toLocaleDateString(localeFor(lang), { year: 'numeric', month: 'long', day: 'numeric' });
};
