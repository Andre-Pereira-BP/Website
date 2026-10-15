import { createContext, useSyncExternalStore } from 'react';
import type { HeadTags } from './seo';

// Shared between the browser entry (main.tsx) and the build-time prerender (entry-server.tsx).

/**
 * Data loaded by `useAsync` loaders that have a cache key. At build time the prerender collects
 * the loaders in `pending`, runs them and renders again with the results in `values`; the values
 * are embedded in the page so the browser hydrates with exactly the same content.
 */
export interface PrerenderData {
  values: Record<string, unknown>;
  pending?: Map<string, () => Promise<unknown>>;
}

export const PrerenderDataContext = createContext<PrerenderData | null>(null);

/** Receives the page's <head> tags during the build-time render (see useSeo). */
export interface HeadCollector {
  head: HeadTags | null;
}

export const HeadCollectorContext = createContext<HeadCollector | null>(null);

export const PRERENDER_DATA_ID = 'bp-data';

/** Reads the data embedded by the prerender (a non-executable JSON block, allowed by the CSP). */
export function readPrerenderData(): PrerenderData | null {
  const el = document.getElementById(PRERENDER_DATA_ID);
  if (!el?.textContent) return null;
  try {
    return { values: JSON.parse(el.textContent) as Record<string, unknown> };
  } catch {
    return null;
  }
}

const noopSubscribe = () => () => {};

/**
 * False during the build-time render and while hydrating, true afterwards. Use it for content
 * that only exists in the browser (maps, banners that depend on localStorage) so the hydrated
 * markup matches the prerendered HTML.
 */
export const useHydrated = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
