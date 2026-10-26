import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { m } from 'framer-motion';
import Layout from '../components/layout/Layout';
import CtaBanner, { LinkedInIcon } from '../components/ui/CtaBanner';
import SectionHeading from '../components/ui/SectionHeading';
import GridPattern from '../components/ui/GridPattern';
import ApplicationForm from '../components/careers/ApplicationForm';
import { ArrowIcon } from '../components/news/NewsCard';
import { COMPANY } from '../config/company';
import { commonDict } from '../i18n/common';
import { formatDate, Lang, useLanguage, useT } from '../i18n/LanguageContext';
import { careersDict, CareersDict } from '../i18n/pages/careers';
import { listPublishedJobs } from '../lib/content';
import { JobPosting, JobType, localized } from '../lib/types';
import { useAsync } from '../lib/useAsync';
import { useSeo } from '../lib/seo';
import { useMedia } from '../lib/siteContent';
import type { MediaKey } from '../config/media';
import { useHydrated } from '../lib/ssr';

const TYPE_STYLES: Record<JobType, string> = {
  'full-time': 'bg-blue-100 text-blue-800',
  'part-time': 'bg-amber-100 text-amber-800',
  contract: 'bg-violet-100 text-violet-800',
  internship: 'bg-emerald-100 text-emerald-800',
};

const WHY_ICONS = [
  'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65M12 14.5V10m0 4.5v4.5m-1.5-8l3-3-3-3',
];

const TESTIMONIAL_IMAGES: MediaKey[] = ['careers.testimonials.1', 'careers.testimonials.2', 'careers.testimonials.3'];

const daysAgo = (iso: string, t: CareersDict) => {
  const diff = Math.floor((Date.now() - new Date(`${iso}T12:00:00`).getTime()) / 86_400_000);
  if (diff <= 0) return t.job.today;
  if (diff === 1) return t.job.yesterday;
  return t.job.daysAgo(diff);
};

const PinIcon = () => (
  <svg className="h-4 w-4 mr-1.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="h-4 w-4 mr-1.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CheckList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start text-gray-700">
        <svg className="h-5 w-5 mr-2 text-secondary flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const JobCard = ({ job, lang, onOpen, onApply }: { job: JobPosting; lang: Lang; onOpen: () => void; onApply: () => void }) => {
  const t = useT(careersDict);
  const title = localized(job, 'title', lang);
  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl ring-1 ring-gray-100 overflow-hidden h-full flex flex-col transition-all hover:-translate-y-1">
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${TYPE_STYLES[job.type]}`}>{t.jobTypes[job.type]}</span>
          <time dateTime={job.posted_at} className="text-xs text-gray-500">{daysAgo(job.posted_at, t)}</time>
        </div>
        <h3 className="text-xl font-bold mb-3 font-montserrat">{title}</h3>
        <p className="mb-2 flex items-center text-gray-600 text-sm">
          <PinIcon />
          {job.location}
          {job.is_remote && <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">{t.job.remote}</span>}
        </p>
        <p className="mb-4 flex items-center text-gray-600 text-sm">
          <BuildingIcon />
          {localized(job, 'department', lang)}
        </p>
        <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">{localized(job, 'description', lang)}</p>
        <div className="mt-auto flex justify-between items-center gap-3">
          <button type="button" onClick={onOpen} className="inline-flex items-center text-primary font-semibold hover:text-primary-dark">
            {t.job.viewDetails}
            <span className="sr-only">: {title}</span>
            <ArrowIcon />
          </button>
          <button type="button" onClick={onApply} className="px-4 py-2 text-sm font-semibold rounded-full text-white bg-primary hover:bg-primary-light">
            {t.job.apply}
            <span className="sr-only">: {title}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

const JobDetail = ({ job, lang, onClose, onApply }: { job: JobPosting; lang: Lang; onClose: () => void; onApply: () => void }) => {
  const t = useT(careersDict);
  const benefits = localized(job, 'benefits', lang);
  return (
    <m.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 md:p-10 relative overflow-hidden">
        <GridPattern />
        <div className="relative">
          <button type="button" onClick={onClose} className="mb-6 inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t.job.back}
          </button>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${TYPE_STYLES[job.type]}`}>{t.jobTypes[job.type]}</span>
          <h2 className="mt-3 text-2xl md:text-4xl font-bold font-montserrat text-white">{localized(job, 'title', lang)}</h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-white/85 text-sm">
            <span className="inline-flex items-center gap-1.5"><svg className="h-4 w-4 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{job.location}{job.is_remote ? ` · ${t.job.remote}` : ''}</span>
            <span className="inline-flex items-center gap-1.5"><svg className="h-4 w-4 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>{localized(job, 'department', lang)}</span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {t.job.posted} {formatDate(job.posted_at, lang)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10">
        <p className="text-lg text-gray-700">{localized(job, 'description', lang)}</p>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <section>
            <h3 className="text-xl font-bold mb-4 text-primary">{t.job.responsibilities}</h3>
            <CheckList items={localized(job, 'responsibilities', lang)} />
          </section>
          <section>
            <h3 className="text-xl font-bold mb-4 text-primary">{t.job.requirements}</h3>
            <CheckList items={localized(job, 'requirements', lang)} />
          </section>
        </div>
        {benefits.length > 0 && (
          <section className="mt-10">
            <h3 className="text-xl font-bold mb-4 text-primary">{t.job.benefits}</h3>
            <CheckList items={benefits} />
          </section>
        )}

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
          <button type="button" onClick={onApply} className="px-8 py-3 rounded-full font-semibold text-white bg-primary hover:bg-primary-light">
            {t.job.applyNow}
          </button>
          {job.linkedin_url && (
            <a
              href={job.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 inline-flex items-center justify-center gap-2"
            >
              {t.job.applyLinkedIn}
              <LinkedInIcon />
            </a>
          )}
        </div>
      </div>
    </m.article>
  );
};

const Careers = () => {
  const t = useT(careersDict);
  const tc = useT(commonDict);
  const media = useMedia();
  const { lang } = useLanguage();
  const [params, setParams] = useSearchParams();
  const { data: jobs, loading, error, reload } = useAsync(() => listPublishedJobs(), [], 'jobs');
  const [department, setDepartment] = useState('all');
  const [location, setLocation] = useState('all');
  const [type, setType] = useState<JobType | 'all'>('all');
  const [query, setQuery] = useState('');
  const listScroll = useRef(0);
  useSeo({ title: t.title, description: t.seoDescription });

  // View state lives in the URL so job links can be shared: ?job=<id>, &apply=1, ?apply=spontaneous.
  // The prerendered page is the list, so the query is only applied once hydrated.
  const hydrated = useHydrated();
  const jobId = hydrated ? params.get('job') : null;
  const applying = hydrated ? params.get('apply') : null;
  const selectedJob = jobs?.find((j) => j.id === jobId) ?? null;
  const view: 'list' | 'detail' | 'apply' = applying ? 'apply' : selectedJob ? 'detail' : 'list';

  useEffect(() => {
    if (view === 'list') window.scrollTo(0, listScroll.current);
    else window.scrollTo(0, 0);
  }, [view, jobId]);

  const go = (next: Record<string, string>) => {
    if (view === 'list') listScroll.current = window.scrollY;
    setParams(next);
  };

  const departments = useMemo(() => {
    const map = new Map<string, number>();
    (jobs ?? []).forEach((j) => {
      const name = localized(j, 'department', lang);
      map.set(name, (map.get(name) ?? 0) + 1);
    });
    return [...map.entries()];
  }, [jobs, lang]);
  const locations = useMemo(() => [...new Set((jobs ?? []).map((j) => j.location))], [jobs]);
  const types = useMemo(() => [...new Set((jobs ?? []).map((j) => j.type))], [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (jobs ?? []).filter((job) => {
      if (department !== 'all' && localized(job, 'department', lang) !== department) return false;
      if (location !== 'all' && job.location !== location) return false;
      if (type !== 'all' && job.type !== type) return false;
      if (!q) return true;
      return [job.title_pt, job.title_en, job.description_pt, job.description_en, job.department_pt, job.department_en, job.location]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [jobs, department, location, type, query, lang]);

  const selectClass = 'form-input py-2.5';

  if (jobId && loading) {
    return (
      <Layout title={t.title}>
        <div className="container mx-auto px-4 py-14 max-w-5xl" aria-busy="true">
          <div className="h-96 rounded-2xl bg-gray-200 animate-pulse" />
          <span className="sr-only">{tc.common.loading}</span>
        </div>
      </Layout>
    );
  }

  if (view !== 'list') {
    return (
      <Layout title={t.title}>
        <section className="py-10 md:py-14 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            {view === 'apply' ? (
              <ApplicationForm key={jobId ?? 'spontaneous'} job={applying === 'spontaneous' ? null : selectedJob} onClose={() => setParams({})} />
            ) : (
              selectedJob && <JobDetail job={selectedJob} lang={lang} onClose={() => setParams({})} onApply={() => go({ job: selectedJob.id, apply: '1' })} />
            )}
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white">
        <GridPattern />
        <img src={media('careers.banner')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-luminosity" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl">
            <m.p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary mb-4 font-montserrat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {t.title}
            </m.p>
            <m.h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {t.hero.title}
            </m.h1>
            <m.p className="text-xl text-white/90 mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {t.hero.text}
            </m.p>
            <m.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <a href="#openings" className="px-7 py-3.5 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors">
                {t.hero.viewOpenings}
              </a>
              <button type="button" onClick={() => go({ apply: 'spontaneous' })} className="px-7 py-3.5 font-bold rounded-full ring-1 ring-white/70 hover:bg-white/10 transition-colors">
                {t.hero.spontaneous}
              </button>
            </m.div>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.why.title} subtitle={t.why.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.why.items.map((item, index) => (
              <m.div
                key={item.title}
                className="bg-gray-50 rounded-2xl p-6 text-center ring-1 ring-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={WHY_ICONS[index]} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 font-montserrat">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.openings.title} subtitle={t.openings.subtitle} />

          <div className="mb-10 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="job-search" className="form-label">{t.openings.searchLabel}</label>
                <input id="job-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.openings.search} className="form-input py-2.5" />
              </div>
              <div>
                <label htmlFor="job-department" className="form-label">{t.openings.department}</label>
                <select id="job-department" value={department} onChange={(e) => setDepartment(e.target.value)} className={selectClass}>
                  <option value="all">{t.openings.allDepartments}</option>
                  {departments.map(([name, count]) => (
                    <option key={name} value={name}>
                      {name} ({count})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="job-location" className="form-label">{t.openings.location}</label>
                <select id="job-location" value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass}>
                  <option value="all">{t.openings.allLocations}</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="job-type" className="form-label">{t.openings.jobType}</label>
                <select id="job-type" value={type} onChange={(e) => setType(e.target.value as JobType | 'all')} className={selectClass}>
                  <option value="all">{t.openings.allTypes}</option>
                  {types.map((jt) => (
                    <option key={jt} value={jt}>{t.jobTypes[jt]}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-hidden="true">
              {[1, 2, 3].map((i) => <div key={i} className="h-72 rounded-2xl bg-gray-200 animate-pulse" />)}
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <p className="text-gray-600 mb-4">{tc.common.errorLoading}</p>
              <button type="button" onClick={reload} className="px-5 py-2 rounded-full bg-primary text-white font-semibold">{tc.common.retry}</button>
            </div>
          ) : filtered.length > 0 ? (
            <>
              <p className="sr-only" aria-live="polite">{t.openings.results(filtered.length)}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((job, index) => (
                  <m.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  >
                    <JobCard job={job} lang={lang} onOpen={() => go({ job: job.id })} onApply={() => go({ job: job.id, apply: '1' })} />
                  </m.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-2xl shadow-sm" aria-live="polite">
              <svg className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">{jobs?.length ? t.openings.emptyTitle : t.openings.noOpeningsTitle}</h3>
              <p className="text-gray-500 mb-6 max-w-xl mx-auto">{t.openings.emptyText}</p>
              <button type="button" onClick={() => go({ apply: 'spontaneous' })} className="px-5 py-2.5 text-sm font-semibold rounded-full text-white bg-primary hover:bg-primary-light">
                {t.hero.spontaneous}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.testimonials.title} subtitle={t.testimonials.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.testimonials.items.map((item, index) => (
              <m.figure
                key={item.name}
                className="bg-gray-50 rounded-2xl p-8 ring-1 ring-gray-100 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <svg className="h-8 w-8 text-primary/30 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <blockquote className="text-gray-700 italic flex-grow">“{item.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center">
                  <img src={media(TESTIMONIAL_IMAGES[index])} alt="" loading="lazy" className="w-12 h-12 rounded-full object-cover mr-4 bg-gray-200" />
                  <div>
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.role}</p>
                  </div>
                </figcaption>
              </m.figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={t.cta.title}
        text={t.cta.text}
        action={{ label: tc.common.followLinkedIn, to: COMPANY.linkedIn, external: true, icon: <LinkedInIcon /> }}
      />
    </Layout>
  );
};

export default Careers;
