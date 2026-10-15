import { useSyncExternalStore } from 'react';

/**
 * Cookie consent + optional Google Analytics 4.
 *
 * The site itself only stores strictly necessary/functional data (language preference, and the
 * admin session for logged-in managers). Analytics is only loaded when VITE_GA_MEASUREMENT_ID is set
 * AND the visitor explicitly accepts analytics cookies. Without a measurement ID no banner is shown.
 */

export const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
export const hasOptionalCookies = Boolean(GA_ID);

export interface ConsentState {
  analytics: boolean;
  decidedAt: string;
}

const STORAGE_KEY = 'bp-cookie-consent';
const CONSENT_VERSION = 1;
const listeners = new Set<() => void>();
let settingsOpen = false;

const read = (): ConsentState | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState & { v?: number };
    return parsed.v === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
};

let current: ConsentState | null = typeof window !== 'undefined' ? read() : null;
const emit = () => listeners.forEach((l) => l());

export function saveConsent(analytics: boolean) {
  current = { analytics, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, v: CONSENT_VERSION }));
  } catch {
    // storage blocked: consent applies to this visit only
  }
  settingsOpen = false;
  if (analytics) loadAnalytics();
  else disableAnalytics();
  emit();
}

export function openCookieSettings() {
  settingsOpen = true;
  emit();
}

export function closeCookieSettings() {
  settingsOpen = false;
  emit();
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function useConsent() {
  const consent = useSyncExternalStore(subscribe, () => current, () => null);
  const isSettingsOpen = useSyncExternalStore(subscribe, () => settingsOpen, () => false);
  return { consent, isSettingsOpen };
}

// ---------------------------------------------------------------------------
// Google Analytics 4 (only after consent)
// ---------------------------------------------------------------------------

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let analyticsLoaded = false;

function loadAnalytics() {
  if (!GA_ID || analyticsLoaded) return;
  analyticsLoaded = true;
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);
}

function disableAnalytics() {
  if (!GA_ID) return;
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
  // Remove first-party GA cookies set before consent was withdrawn.
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (name.startsWith('_ga')) {
      const domain = window.location.hostname.replace(/^www\./, '');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${domain}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  });
}

export function initAnalyticsFromStoredConsent() {
  if (current?.analytics) loadAnalytics();
}

/** Conversion events (no-op unless analytics was accepted). */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (analyticsLoaded && window.gtag) window.gtag('event', name, params);
}
