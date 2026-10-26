import type { SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Supabase is optional at runtime: without the env vars the public site falls back to the
 * bundled content in `src/data/fallbackContent.ts` and the admin area explains how to configure it.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

let clientPromise: Promise<SupabaseClient> | null = null;

/** The client library is loaded on demand so it never delays the first paint. */
export function getSupabase(): Promise<SupabaseClient> {
  if (!isSupabaseConfigured) {
    return Promise.reject(new Error('Supabase não está configurado (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).'));
  }
  // The build-time prerender (Node) only reads public content: no session to keep there.
  const inBrowser = typeof window !== 'undefined';
  clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(url!, anonKey!, {
      auth: { persistSession: inBrowser, autoRefreshToken: inBrowser, detectSessionInUrl: inBrowser },
    })
  );
  return clientPromise;
}

/**
 * Public read through the REST API with a plain fetch: used on every page, so it avoids
 * downloading the client library just to read a table.
 */
export async function restSelect<T>(table: string, select: string): Promise<T[]> {
  if (!isSupabaseConfigured) throw new Error('Supabase não está configurado.');
  const res = await fetch(`${url}/rest/v1/${table}?select=${encodeURIComponent(select)}`, {
    headers: { apikey: anonKey!, Authorization: `Bearer ${anonKey}` },
  });
  if (!res.ok) throw new Error(`${table}: HTTP ${res.status} ${await res.text().catch(() => '')}`.trim());
  return (await res.json()) as T[];
}

export const BUCKETS = {
  newsImages: 'news-images',
  applications: 'job-applications',
  siteFiles: 'site-files',
} as const;
