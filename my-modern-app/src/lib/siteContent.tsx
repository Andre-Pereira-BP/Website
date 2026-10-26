import { createContext, ReactNode, useCallback, useContext } from 'react';
import { isMediaKey, MEDIA_SLOTS, MediaKey } from '../config/media';
import type { Lang } from '../i18n/locale';
import { isSupabaseConfigured, restSelect } from './supabase';
import { useAsync } from './useAsync';

/**
 * Texts, images and documents edited in the admin area. They are stored apart from the code
 * (tables `site_content` and `site_media`) and applied on top of the originals:
 *   • texts are merged field by field over the page dictionaries, so the page structure, the
 *     number of items and anything that is not a string never change;
 *   • media replace the file of a slot listed in src/config/media.ts.
 * The data is loaded at build time (embedded in the prerendered HTML) and refreshed in the
 * browser, so edits show up on the live site without a new deploy.
 */

/** Sparse overrides of one dictionary: only the strings that differ from the original. */
export type TextOverrides = Partial<Record<Lang, Record<string, unknown>>>;

export interface MediaOverride {
  url: string;
  name: string | null;
  bytes: number | null;
}

export interface SiteContentData {
  texts: Record<string, TextOverrides>;
  media: Partial<Record<MediaKey, MediaOverride>>;
}

const EMPTY: SiteContentData = { texts: {}, media: {} };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

// Tables not created yet (schema.sql not run): same as "nothing edited". Other errors are thrown,
// so a failed refresh in the browser keeps the content that was already shown.
const tableMissing = (err: unknown) => err instanceof Error && /HTTP 404/.test(err.message);
const orEmpty = <T,>(promise: Promise<T[]>) => promise.catch((err) => (tableMissing(err) ? ([] as T[]) : Promise.reject(err)));

export async function loadSiteContent(): Promise<SiteContentData> {
  if (!isSupabaseConfigured) return EMPTY;
  const [texts, media] = await Promise.all([
    orEmpty(restSelect<{ id: string; content: unknown }>('site_content', 'id,content')),
    orEmpty(restSelect<{ key: string; url: string; name: string | null; bytes: number | null }>('site_media', 'key,url,name,bytes')),
  ]);
  const data: SiteContentData = { texts: {}, media: {} };
  for (const row of texts) if (isRecord(row.content)) data.texts[row.id] = row.content as TextOverrides;
  for (const row of media) if (isMediaKey(row.key) && row.url) data.media[row.key] = { url: row.url, name: row.name, bytes: row.bytes };
  return data;
}

// The build-time prerender renders ~40 pages: read the tables once per build, not once per page.
let buildCache: Promise<SiteContentData> | null = null;
const load = () => (typeof window === 'undefined' ? (buildCache ??= loadSiteContent()) : loadSiteContent());

const SiteContentContext = createContext<SiteContentData>(EMPTY);

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useAsync(load, [], 'site-content');
  return <SiteContentContext.Provider value={data ?? EMPTY}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => useContext(SiteContentContext);

/**
 * Returns `base` with the strings found in `overrides` at the same place. The shape always comes
 * from `base`: unknown keys, extra array items, empty strings and values of another type are ignored.
 */
export function applyTextOverrides<T>(base: T, overrides: unknown): T {
  if (overrides === undefined || overrides === null) return base;
  if (typeof base === 'string') return (typeof overrides === 'string' && overrides.trim() ? overrides : base) as T;
  if (Array.isArray(base)) {
    if (typeof overrides !== 'object') return base;
    const ov = overrides as Record<string, unknown>;
    return base.map((item, i) => applyTextOverrides(item, ov[i])) as T;
  }
  if (isRecord(base) && isRecord(overrides)) {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(base)) result[key] = applyTextOverrides(base[key], overrides[key]);
    return result as T;
  }
  return base;
}

/** `media('home.hero.1')` → URL of the uploaded image, or the original one. */
export function useMedia() {
  const { media } = useSiteContent();
  return useCallback((key: MediaKey) => media[key]?.url ?? MEDIA_SLOTS[key].src ?? '', [media]);
}

export interface MediaFile {
  url: string;
  bytes: number | null;
}

/** File currently published for a slot (uploaded or original), or null when there is none. */
export function useMediaFile() {
  const { media } = useSiteContent();
  return useCallback(
    (key: MediaKey): MediaFile | null => {
      const uploaded = media[key];
      if (uploaded) return { url: uploaded.url, bytes: uploaded.bytes };
      const slot: { src: string | null; bytes?: number } = MEDIA_SLOTS[key];
      return slot.src ? { url: slot.src, bytes: slot.bytes ?? null } : null;
    },
    [media]
  );
}
