-- =============================================================================
-- BridgePoint website — Supabase schema
-- Run once in Supabase → SQL Editor (safe to re-run: it is idempotent).
--
-- Security model (Row Level Security):
--   • Visitors (anon) can READ published news and jobs, and can only INSERT contact
--     messages / job applications (they can never read them back).
--   • Only authenticated users listed in public.admin_users can create, edit or delete
--     content and read messages, applications and CVs.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- Admins
-- -----------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins read admin list" on public.admin_users;
create policy "admins read admin list" on public.admin_users
  for select to authenticated using (public.is_admin());

-- -----------------------------------------------------------------------------
-- updated_at helper
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- News
-- -----------------------------------------------------------------------------
create table if not exists public.news (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 100),
  category     text not null default 'company' check (category in ('company', 'technology', 'events', 'projects')),
  title_pt     text not null default '' check (char_length(title_pt) <= 200),
  title_en     text not null default '' check (char_length(title_en) <= 200),
  summary_pt   text not null default '' check (char_length(summary_pt) <= 400),
  summary_en   text not null default '' check (char_length(summary_en) <= 400),
  content_pt   text not null default '',
  content_en   text not null default '',
  image_url    text,
  source_url   text,
  published_at date not null default current_date,
  is_published boolean not null default false,
  is_featured  boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint news_has_title check (title_pt <> '' or title_en <> '')
);

create index if not exists news_published_idx on public.news (is_published, published_at desc);

drop trigger if exists news_updated_at on public.news;
create trigger news_updated_at before update on public.news
  for each row execute function public.set_updated_at();

alter table public.news enable row level security;

drop policy if exists "read published news" on public.news;
create policy "read published news" on public.news
  for select to anon, authenticated using (is_published or public.is_admin());

drop policy if exists "admins insert news" on public.news;
create policy "admins insert news" on public.news
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admins update news" on public.news;
create policy "admins update news" on public.news
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete news" on public.news;
create policy "admins delete news" on public.news
  for delete to authenticated using (public.is_admin());

-- -----------------------------------------------------------------------------
-- Jobs
-- -----------------------------------------------------------------------------
create table if not exists public.jobs (
  id                  uuid primary key default gen_random_uuid(),
  type                text not null default 'full-time' check (type in ('full-time', 'part-time', 'contract', 'internship')),
  location            text not null check (char_length(location) between 1 and 120),
  is_remote           boolean not null default false,
  title_pt            text not null default '' check (char_length(title_pt) <= 150),
  title_en            text not null default '' check (char_length(title_en) <= 150),
  department_pt       text not null default '',
  department_en       text not null default '',
  description_pt      text not null default '',
  description_en      text not null default '',
  responsibilities_pt text[] not null default '{}',
  responsibilities_en text[] not null default '{}',
  requirements_pt     text[] not null default '{}',
  requirements_en     text[] not null default '{}',
  benefits_pt         text[] not null default '{}',
  benefits_en         text[] not null default '{}',
  linkedin_url        text,
  posted_at           date not null default current_date,
  is_published        boolean not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  constraint jobs_has_title check (title_pt <> '' or title_en <> '')
);

create index if not exists jobs_published_idx on public.jobs (is_published, posted_at desc);

drop trigger if exists jobs_updated_at on public.jobs;
create trigger jobs_updated_at before update on public.jobs
  for each row execute function public.set_updated_at();

alter table public.jobs enable row level security;

drop policy if exists "read published jobs" on public.jobs;
create policy "read published jobs" on public.jobs
  for select to anon, authenticated using (is_published or public.is_admin());

drop policy if exists "admins insert jobs" on public.jobs;
create policy "admins insert jobs" on public.jobs
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admins update jobs" on public.jobs;
create policy "admins update jobs" on public.jobs
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete jobs" on public.jobs;
create policy "admins delete jobs" on public.jobs
  for delete to authenticated using (public.is_admin());

-- -----------------------------------------------------------------------------
-- Job applications (write-only for visitors)
-- -----------------------------------------------------------------------------
create table if not exists public.job_applications (
  id              uuid primary key default gen_random_uuid(),
  job_id          uuid references public.jobs (id) on delete set null,
  job_title       text check (char_length(job_title) <= 200),
  first_name      text not null check (char_length(first_name) between 1 and 100),
  last_name       text not null check (char_length(last_name) between 1 and 100),
  email           text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone           text check (char_length(phone) <= 40),
  linkedin_url    text check (char_length(linkedin_url) <= 300),
  cover_letter    text check (char_length(cover_letter) <= 5000),
  cv_path         text not null check (char_length(cv_path) <= 300),
  privacy_consent boolean not null check (privacy_consent),
  language        text check (language in ('pt', 'en')),
  status          text not null default 'new' check (status in ('new', 'reviewing', 'contacted', 'rejected', 'hired')),
  notes           text,
  created_at      timestamptz not null default now()
);

create index if not exists job_applications_created_idx on public.job_applications (created_at desc);

alter table public.job_applications enable row level security;

drop policy if exists "anyone can apply" on public.job_applications;
create policy "anyone can apply" on public.job_applications
  for insert to anon, authenticated with check (status = 'new' and notes is null);

drop policy if exists "admins read applications" on public.job_applications;
create policy "admins read applications" on public.job_applications
  for select to authenticated using (public.is_admin());

drop policy if exists "admins update applications" on public.job_applications;
create policy "admins update applications" on public.job_applications
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete applications" on public.job_applications;
create policy "admins delete applications" on public.job_applications
  for delete to authenticated using (public.is_admin());

-- -----------------------------------------------------------------------------
-- Contact messages (write-only for visitors)
-- -----------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id              uuid primary key default gen_random_uuid(),
  name            text not null check (char_length(name) between 1 and 120),
  email           text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company         text check (char_length(company) <= 150),
  phone           text check (char_length(phone) <= 40),
  department      text not null default 'general' check (department in ('sales', 'engineering', 'support', 'general')),
  message         text not null check (char_length(message) between 10 and 5000),
  privacy_consent boolean not null check (privacy_consent),
  language        text check (language in ('pt', 'en')),
  status          text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at      timestamptz not null default now()
);

create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

drop policy if exists "anyone can send a message" on public.contact_messages;
create policy "anyone can send a message" on public.contact_messages
  for insert to anon, authenticated with check (status = 'new');

drop policy if exists "admins read messages" on public.contact_messages;
create policy "admins read messages" on public.contact_messages
  for select to authenticated using (public.is_admin());

drop policy if exists "admins update messages" on public.contact_messages;
create policy "admins update messages" on public.contact_messages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete messages" on public.contact_messages;
create policy "admins delete messages" on public.contact_messages
  for delete to authenticated using (public.is_admin());

-- -----------------------------------------------------------------------------
-- Storage buckets
--   news-images       public  (images shown on the website, max 5 MB)
--   job-applications  private (CVs, max 10 MB, PDF/DOC/DOCX only)
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('news-images', 'news-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'job-applications', 'job-applications', false, 10485760,
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admins manage news images" on storage.objects;
create policy "admins manage news images" on storage.objects
  for all to authenticated
  using (bucket_id = 'news-images' and public.is_admin())
  with check (bucket_id = 'news-images' and public.is_admin());

-- Anti-spam: CVs only with the path the website uses (YYYY-MM/<uuid>-<name>), and at most 20
-- uploads every 10 minutes for the whole site (see "Anti-spam limits" below).
create or replace function public.cv_uploads_allowed()
returns boolean
language sql
stable
security definer
set search_path = public, storage
as $$
  select count(*) < 20 from storage.objects
  where bucket_id = 'job-applications' and created_at > now() - interval '10 minutes';
$$;

revoke all on function public.cv_uploads_allowed() from public;
grant execute on function public.cv_uploads_allowed() to anon, authenticated;

drop policy if exists "anyone can upload a CV" on storage.objects;
create policy "anyone can upload a CV" on storage.objects
  for insert to anon, authenticated
  with check (
    bucket_id = 'job-applications'
    and name ~ '^[0-9]{4}-[0-9]{2}/[0-9a-f-]{36}-[A-Za-z0-9._-]{1,80}$'
    and public.cv_uploads_allowed()
  );

drop policy if exists "admins read CVs" on storage.objects;
create policy "admins read CVs" on storage.objects
  for select to authenticated
  using (bucket_id = 'job-applications' and public.is_admin());

drop policy if exists "admins delete CVs" on storage.objects;
create policy "admins delete CVs" on storage.objects
  for delete to authenticated
  using (bucket_id = 'job-applications' and public.is_admin());

-- -----------------------------------------------------------------------------
-- Editable website content (admin → "Textos do site" / "Imagens e ficheiros")
--   site_content  one row per page dictionary (id = 'home', 'about', ...). `content` holds only
--                 the texts that differ from the originals in the code: { "pt": {...}, "en": {...} }.
--                 The site merges them field by field, so the page structure never changes.
--   site_media    replaced images / documents, one row per slot key (see src/config/media.ts).
--   site-files    public bucket with the uploaded files (images and PDFs, max 20 MB).
-- -----------------------------------------------------------------------------
create table if not exists public.site_content (
  id         text primary key check (id ~ '^[a-zA-Z][a-zA-Z0-9_-]*$' and char_length(id) <= 60),
  content    jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object'),
  updated_at timestamptz not null default now()
);

drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at before update on public.site_content
  for each row execute function public.set_updated_at();

alter table public.site_content enable row level security;

drop policy if exists "read site content" on public.site_content;
create policy "read site content" on public.site_content
  for select to anon, authenticated using (true);

drop policy if exists "admins manage site content" on public.site_content;
create policy "admins manage site content" on public.site_content
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.site_media (
  key        text primary key check (key ~ '^[a-zA-Z0-9._-]+$' and char_length(key) <= 100),
  url        text not null check (url ~ '^https://' and char_length(url) <= 1000),
  path       text check (char_length(path) <= 300),
  name       text check (char_length(name) <= 200),
  bytes      bigint check (bytes >= 0),
  updated_at timestamptz not null default now()
);

drop trigger if exists site_media_updated_at on public.site_media;
create trigger site_media_updated_at before update on public.site_media
  for each row execute function public.set_updated_at();

alter table public.site_media enable row level security;

drop policy if exists "read site media" on public.site_media;
create policy "read site media" on public.site_media
  for select to anon, authenticated using (true);

drop policy if exists "admins manage site media" on public.site_media;
create policy "admins manage site media" on public.site_media
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-files', 'site-files', true, 20971520, array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admins manage site files" on storage.objects;
create policy "admins manage site files" on storage.objects
  for all to authenticated
  using (bucket_id = 'site-files' and public.is_admin())
  with check (bucket_id = 'site-files' and public.is_admin());

-- -----------------------------------------------------------------------------
-- Anti-spam limits for the public forms. The website already has a hidden honeypot field and
-- a minimum fill time; these limits also stop bots that call the API directly.
--   contact messages: 3 per email per hour, 20 per 10 minutes for the whole site
--   job applications: 3 per email per day,  20 per 10 minutes for the whole site
-- -----------------------------------------------------------------------------
create or replace function public.limit_contact_messages()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.contact_messages
      where lower(email) = lower(new.email) and created_at > now() - interval '1 hour') >= 3
     or (select count(*) from public.contact_messages where created_at > now() - interval '10 minutes') >= 20 then
    raise exception 'Too many messages, please try again later.' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

drop trigger if exists contact_messages_rate_limit on public.contact_messages;
create trigger contact_messages_rate_limit before insert on public.contact_messages
  for each row execute function public.limit_contact_messages();

create or replace function public.limit_job_applications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.job_applications
      where lower(email) = lower(new.email) and created_at > now() - interval '1 day') >= 3
     or (select count(*) from public.job_applications where created_at > now() - interval '10 minutes') >= 20 then
    raise exception 'Too many applications, please try again later.' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

drop trigger if exists job_applications_rate_limit on public.job_applications;
create trigger job_applications_rate_limit before insert on public.job_applications
  for each row execute function public.limit_job_applications();

-- -----------------------------------------------------------------------------
-- After creating the manager's user in Authentication → Users, grant admin rights:
--
--   insert into public.admin_users (user_id, email)
--   select id, email from auth.users where email = 'nome@bridgepoint.pt'
--   on conflict do nothing;
-- -----------------------------------------------------------------------------

-- -----------------------------------------------------------------------------
-- Table privileges. Newer Supabase projects no longer grant these automatically;
-- without them every request fails with "permission denied for table". RLS above
-- still decides which rows each role can see or change.
-- -----------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
grant select on public.news, public.jobs to anon, authenticated;
grant insert, update, delete on public.news, public.jobs to authenticated;
grant insert on public.job_applications, public.contact_messages to anon, authenticated;
grant select, update, delete on public.job_applications, public.contact_messages to authenticated;
grant select on public.admin_users to authenticated;
grant select on public.site_content, public.site_media to anon, authenticated;
grant insert, update, delete on public.site_content, public.site_media to authenticated;
