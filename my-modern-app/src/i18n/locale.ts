// Language helpers shared by the app, the build-time prerender and the sitemap.
// The language lives in the URL: every public page exists as /pt/... and /en/...;
// unprefixed URLs (/, /about, old links) redirect to the visitor's preferred language.

export type Lang = 'pt' | 'en';

export const LANG_CODES: readonly Lang[] = ['pt', 'en'];

/** Language for visitors whose browser is not Portuguese (also the hreflang x-default). */
export const DEFAULT_LANG: Lang = 'en';

export const isLang = (value: unknown): value is Lang => value === 'pt' || value === 'en';

/** Value for <html lang> and hreflang. */
export const htmlLang = (lang: Lang) => (lang === 'pt' ? 'pt-PT' : 'en');

/** Open Graph locale. */
export const ogLocale = (lang: Lang) => (lang === 'pt' ? 'pt_PT' : 'en_GB');

const PREFIX = /^\/(pt|en)(?=\/|$)/;

/** '/pt/about' → 'pt'; '/about' or '/admin' → null. */
export const langFromPath = (pathname: string): Lang | null => {
  const match = pathname.match(PREFIX);
  return match ? (match[1] as Lang) : null;
};

/** Path without the language prefix and trailing slash: '/pt/about/' → '/about', '/en' → '/'. */
export const stripLang = (pathname: string): string => {
  const path = pathname.replace(PREFIX, '').replace(/\/+$/, '');
  return path === '' ? '/' : path;
};

/**
 * Adds the language prefix to an internal absolute path ('/about' → '/pt/about', '/' → '/pt/').
 * Query strings and #hashes are kept. Paths that already carry a language, the admin area and
 * anything that is not an absolute internal path are returned unchanged.
 */
export const localizePath = (lang: Lang, path: string): string => {
  if (!path.startsWith('/') || path.startsWith('//') || langFromPath(path) || /^\/admin(?=[/?#]|$)/.test(path)) return path;
  const [, pathname, rest] = path.match(/^([^?#]*)(.*)$/)!;
  return pathname === '/' ? `/${lang}/${rest}` : `/${lang}${pathname.replace(/\/+$/, '')}${rest}`;
};

/** The same page in another language (used by the language switcher). */
export const switchLangPath = (pathname: string, lang: Lang) => localizePath(lang, stripLang(pathname));

// ---------------------------------------------------------------------------
// Visitor preference (only used to pick a language for unprefixed URLs)
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'bp-lang';

// localStorage may be unavailable (private mode, blocked storage, prerender): every access is guarded.
const readStoredLang = (): Lang | null => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isLang(value) ? value : null;
  } catch {
    return null;
  }
};

/** Remembers an explicit choice made with the language switcher. */
export const rememberLang = (lang: Lang) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore: preference simply won't persist
  }
};

/** Stored choice, otherwise the browser language (Portuguese → pt, anything else → en). */
export const detectPreferredLang = (): Lang => {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const stored = readStoredLang();
  if (stored) return stored;
  const browser = (navigator.languages?.[0] || navigator.language || '').toLowerCase();
  return browser.startsWith('pt') ? 'pt' : DEFAULT_LANG;
};
