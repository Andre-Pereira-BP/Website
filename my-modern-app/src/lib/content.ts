import { BUCKETS, getSupabase, isSupabaseConfigured } from './supabase';
import type {
  ApplicationStatus,
  ContactMessage,
  JobApplication,
  JobPosting,
  MessageStatus,
  NewsArticle,
} from './types';
import type { Lang } from '../i18n/LanguageContext';

// Bundled content is only downloaded when Supabase is not configured
const loadFallback = () => import('../data/fallbackContent');

const byDateDesc = <T,>(key: keyof T) => (a: T, b: T) => String(b[key]).localeCompare(String(a[key]));

// ---------------------------------------------------------------------------
// Public reads
// ---------------------------------------------------------------------------

export async function listPublishedNews(limit?: number): Promise<NewsArticle[]> {
  if (!isSupabaseConfigured) {
    const { fallbackNews } = await loadFallback();
    const items = fallbackNews.filter((n) => n.is_published).sort(byDateDesc<NewsArticle>('published_at'));
    return limit ? items.slice(0, limit) : items;
  }
  let query = (await getSupabase())
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data as NewsArticle[];
}

export async function getPublishedNewsBySlug(slug: string): Promise<NewsArticle | null> {
  if (!isSupabaseConfigured) {
    const { fallbackNews } = await loadFallback();
    return fallbackNews.find((n) => n.slug === slug && n.is_published) ?? null;
  }
  const { data, error } = await (await getSupabase()).from('news').select('*').eq('slug', slug).eq('is_published', true).maybeSingle();
  if (error) throw error;
  return data as NewsArticle | null;
}

export async function listPublishedJobs(): Promise<JobPosting[]> {
  if (!isSupabaseConfigured) {
    const { fallbackJobs } = await loadFallback();
    return fallbackJobs.filter((j) => j.is_published).sort(byDateDesc<JobPosting>('posted_at'));
  }
  const { data, error } = await (await getSupabase())
    .from('jobs')
    .select('*')
    .eq('is_published', true)
    .order('posted_at', { ascending: false });
  if (error) throw error;
  return data as JobPosting[];
}

// ---------------------------------------------------------------------------
// Public writes (forms)
// ---------------------------------------------------------------------------

export const CV_MAX_BYTES = 10 * 1024 * 1024;
export const CV_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
export const CV_EXTENSIONS = ['.pdf', '.doc', '.docx'];

const safeFileName = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .slice(-80);

export interface ApplicationInput {
  jobId: string | null;
  jobTitle: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedInUrl: string;
  coverLetter: string;
  cv: File;
  language: Lang;
}

export async function submitApplication(input: ApplicationInput) {
  const client = (await getSupabase());
  const path = `${new Date().toISOString().slice(0, 7)}/${crypto.randomUUID()}-${safeFileName(input.cv.name)}`;
  const upload = await client.storage
    .from(BUCKETS.applications)
    .upload(path, input.cv, { contentType: input.cv.type || undefined, upsert: false });
  if (upload.error) throw upload.error;

  const { error } = await client.from('job_applications').insert({
    job_id: input.jobId,
    job_title: input.jobTitle,
    first_name: input.firstName.trim(),
    last_name: input.lastName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim() || null,
    linkedin_url: input.linkedInUrl.trim() || null,
    cover_letter: input.coverLetter.trim() || null,
    cv_path: path,
    privacy_consent: true,
    language: input.language,
  });
  if (error) throw error;
}

export interface ContactInput {
  name: string;
  email: string;
  company: string;
  phone: string;
  department: string;
  message: string;
  language: Lang;
}

export async function submitContactMessage(input: ContactInput) {
  const client = (await getSupabase());
  const { error } = await client.from('contact_messages').insert({
    name: input.name.trim(),
    email: input.email.trim(),
    company: input.company.trim() || null,
    phone: input.phone.trim() || null,
    department: input.department,
    message: input.message.trim(),
    privacy_consent: true,
    language: input.language,
  });
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Admin (requires an authenticated user listed in public.admin_users; enforced by RLS)
// ---------------------------------------------------------------------------

export type NewsInput = Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>;
export type JobInput = Omit<JobPosting, 'id' | 'created_at' | 'updated_at'>;

export async function adminListNews(): Promise<NewsArticle[]> {
  const { data, error } = await (await getSupabase())
    .from('news')
    .select('*')
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as NewsArticle[];
}

export async function adminGetNews(id: string): Promise<NewsArticle | null> {
  const { data, error } = await (await getSupabase()).from('news').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as NewsArticle | null;
}

export async function adminSaveNews(input: NewsInput, id?: string): Promise<NewsArticle> {
  const client = (await getSupabase());
  const query = id ? client.from('news').update(input).eq('id', id) : client.from('news').insert(input);
  const { data, error } = await query.select().single();
  if (error) throw error;
  return data as NewsArticle;
}

export async function adminDeleteNews(article: NewsArticle) {
  const { error } = await (await getSupabase()).from('news').delete().eq('id', article.id);
  if (error) throw error;
  await removeOwnedNewsImage(article.image_url);
}

export async function adminSetNewsPublished(id: string, isPublished: boolean) {
  const { error } = await (await getSupabase()).from('news').update({ is_published: isPublished }).eq('id', id);
  if (error) throw error;
}

export async function adminListJobs(): Promise<JobPosting[]> {
  const { data, error } = await (await getSupabase()).from('jobs').select('*').order('posted_at', { ascending: false });
  if (error) throw error;
  return data as JobPosting[];
}

export async function adminGetJob(id: string): Promise<JobPosting | null> {
  const { data, error } = await (await getSupabase()).from('jobs').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as JobPosting | null;
}

export async function adminSaveJob(input: JobInput, id?: string): Promise<JobPosting> {
  const client = (await getSupabase());
  const query = id ? client.from('jobs').update(input).eq('id', id) : client.from('jobs').insert(input);
  const { data, error } = await query.select().single();
  if (error) throw error;
  return data as JobPosting;
}

export async function adminDeleteJob(id: string) {
  const { error } = await (await getSupabase()).from('jobs').delete().eq('id', id);
  if (error) throw error;
}

export async function adminSetJobPublished(id: string, isPublished: boolean) {
  const { error } = await (await getSupabase()).from('jobs').update({ is_published: isPublished }).eq('id', id);
  if (error) throw error;
}

export async function adminListApplications(): Promise<JobApplication[]> {
  const { data, error } = await (await getSupabase())
    .from('job_applications')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as JobApplication[];
}

export async function adminUpdateApplication(id: string, patch: { status?: ApplicationStatus; notes?: string | null }) {
  const { error } = await (await getSupabase()).from('job_applications').update(patch).eq('id', id);
  if (error) throw error;
}

export async function adminDeleteApplication(application: JobApplication) {
  const client = (await getSupabase());
  const removal = await client.storage.from(BUCKETS.applications).remove([application.cv_path]);
  if (removal.error) throw removal.error;
  const { error } = await client.from('job_applications').delete().eq('id', application.id);
  if (error) throw error;
}

export async function adminGetCvUrl(path: string): Promise<string> {
  const { data, error } = await (await getSupabase()).storage.from(BUCKETS.applications).createSignedUrl(path, 60 * 5, {
    download: true,
  });
  if (error) throw error;
  return data.signedUrl;
}

export async function adminListMessages(): Promise<ContactMessage[]> {
  const { data, error } = await (await getSupabase())
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as ContactMessage[];
}

export async function adminUpdateMessage(id: string, status: MessageStatus) {
  const { error } = await (await getSupabase()).from('contact_messages').update({ status }).eq('id', id);
  if (error) throw error;
}

export async function adminDeleteMessage(id: string) {
  const { error } = await (await getSupabase()).from('contact_messages').delete().eq('id', id);
  if (error) throw error;
}

export interface DashboardCounts {
  newsPublished: number;
  newsDrafts: number;
  jobsOpen: number;
  applicationsNew: number;
  messagesNew: number;
}

export async function adminDashboardCounts(): Promise<DashboardCounts> {
  const client = (await getSupabase());
  const count = async (table: string, column: string, value: unknown) => {
    const { count: total, error } = await client.from(table).select('id', { count: 'exact', head: true }).eq(column, value);
    if (error) throw error;
    return total ?? 0;
  };
  const [newsPublished, newsDrafts, jobsOpen, applicationsNew, messagesNew] = await Promise.all([
    count('news', 'is_published', true),
    count('news', 'is_published', false),
    count('jobs', 'is_published', true),
    count('job_applications', 'status', 'new'),
    count('contact_messages', 'status', 'new'),
  ]);
  return { newsPublished, newsDrafts, jobsOpen, applicationsNew, messagesNew };
}

// ---------------------------------------------------------------------------
// News images
// ---------------------------------------------------------------------------

const MAX_IMAGE_WIDTH = 1600;

/** Resizes to at most 1600px wide and re-encodes as WebP in the browser before uploading. */
async function compressImage(file: File): Promise<Blob> {
  if (file.type === 'image/gif') return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_WIDTH / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.82));
  return blob ?? file;
}

export async function uploadNewsImage(file: File): Promise<string> {
  const client = (await getSupabase());
  const blob = await compressImage(file);
  const ext = blob.type === 'image/webp' ? 'webp' : file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error } = await client.storage.from(BUCKETS.newsImages).upload(path, blob, {
    contentType: blob.type || file.type,
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw error;
  return client.storage.from(BUCKETS.newsImages).getPublicUrl(path).data.publicUrl;
}

/** Deletes an image from the news bucket if the URL points to it (bundled /img/... files are left alone). */
export async function removeOwnedNewsImage(url: string | null | undefined) {
  if (!url || !isSupabaseConfigured) return;
  const marker = `/storage/v1/object/public/${BUCKETS.newsImages}/`;
  const index = url.indexOf(marker);
  if (index === -1) return;
  const path = decodeURIComponent(url.slice(index + marker.length));
  await (await getSupabase()).storage.from(BUCKETS.newsImages).remove([path]);
}

export { isSupabaseConfigured };
