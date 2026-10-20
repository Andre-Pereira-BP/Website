import { useSyncExternalStore } from 'react';

/**
 * Light/dark theme for the public site. The `dark` class on <html> is set before first paint by
 * public/theme-init.js; this module keeps it in sync when the visitor toggles it or, if they never
 * chose, when the operating system theme changes.
 */

const STORAGE_KEY = 'bp-theme';
const listeners = new Set<() => void>();

const isDark = () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
const emit = () => listeners.forEach((l) => l());

const readSaved = (): 'light' | 'dark' | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

function apply(dark: boolean, animate: boolean) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 400);
  }
  root.classList.toggle('dark', dark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0b1220' : '#013fa4');
  emit();
}

export function toggleTheme() {
  const next = !isDark();
  try {
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
  } catch {
    // preference simply won't persist
  }
  apply(next, true);
}

// Follow the operating system while the visitor has not chosen a theme
if (typeof window !== 'undefined' && window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!readSaved() && !location.pathname.startsWith('/admin')) apply(e.matches, true);
  });
}

/** The admin area is always light; restores the visitor's theme when leaving it. */
export function suspendTheme() {
  const wasDark = isDark();
  document.documentElement.classList.remove('dark');
  return () => {
    const saved = readSaved();
    const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark || wasDark) apply(dark, false);
  };
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

/** Current theme (false during the build-time prerender). */
export const useIsDark = () => useSyncExternalStore(subscribe, isDark, () => false);
