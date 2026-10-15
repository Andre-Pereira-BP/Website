import type { Lang } from '../i18n/LanguageContext';

export const NEWS_CATEGORIES = ['company', 'technology', 'events', 'projects'] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export interface NewsArticle {
  id: string;
  slug: string;
  category: NewsCategory;
  title_pt: string;
  title_en: string;
  summary_pt: string;
  summary_en: string;
  content_pt: string;
  content_en: string;
  image_url: string | null;
  source_url: string | null;
  published_at: string; // YYYY-MM-DD
  is_published: boolean;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export const JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship'] as const;
export type JobType = (typeof JOB_TYPES)[number];

export interface JobPosting {
  id: string;
  type: JobType;
  location: string;
  is_remote: boolean;
  title_pt: string;
  title_en: string;
  department_pt: string;
  department_en: string;
  description_pt: string;
  description_en: string;
  responsibilities_pt: string[];
  responsibilities_en: string[];
  requirements_pt: string[];
  requirements_en: string[];
  benefits_pt: string[];
  benefits_en: string[];
  linkedin_url: string | null;
  posted_at: string; // YYYY-MM-DD
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export const APPLICATION_STATUSES = ['new', 'reviewing', 'contacted', 'rejected', 'hired'] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export interface JobApplication {
  id: string;
  job_id: string | null;
  job_title: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  linkedin_url: string | null;
  cover_letter: string | null;
  cv_path: string;
  privacy_consent: boolean;
  language: Lang | null;
  status: ApplicationStatus;
  notes: string | null;
  created_at: string;
}

export const MESSAGE_STATUSES = ['new', 'read', 'archived'] as const;
export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  department: string;
  message: string;
  privacy_consent: boolean;
  language: Lang | null;
  status: MessageStatus;
  created_at: string;
}

type LocalizedKey<T> = {
  [K in keyof T]: K extends `${infer Base}_pt` ? (`${Base}_en` extends keyof T ? Base : never) : never;
}[keyof T];

/** Reads `field_pt` / `field_en`, falling back to the other language when empty. */
export function localized<T extends object, B extends LocalizedKey<T> & string>(row: T, base: B, lang: Lang) {
  const record = row as Record<string, unknown>;
  const primary = record[`${base}_${lang}`];
  const fallback = record[`${base}_${lang === 'pt' ? 'en' : 'pt'}`];
  const isEmpty = (v: unknown) => v == null || v === '' || (Array.isArray(v) && v.length === 0);
  return (isEmpty(primary) ? fallback : primary) as T[`${B}_pt` & keyof T];
}
