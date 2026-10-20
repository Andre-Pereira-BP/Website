import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Link from '../i18n/Link';
import { m } from 'framer-motion';
import Layout from '../components/layout/Layout';
import NewsCard, { CategoryBadge, NEWS_PLACEHOLDER } from '../components/news/NewsCard';
import { commonDict } from '../i18n/common';
import { formatDate, useLanguage, useT } from '../i18n/LanguageContext';
import { newsDict } from '../i18n/pages/news';
import { getPublishedNewsBySlug, listPublishedNews } from '../lib/content';
import { RichText, toPlainText } from '../lib/richText';
import { localized } from '../lib/types';
import { useAsync } from '../lib/useAsync';
import { pageUrl, useSeo } from '../lib/seo';

const BackLink = ({ label }: { label: string }) => (
  <Link to="/news" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark">
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    {label}
  </Link>
);

const NewsArticlePage = () => {
  const { slug = '' } = useParams();
  const { lang } = useLanguage();
  const t = useT(newsDict);
  const tc = useT(commonDict);
  const [copied, setCopied] = useState(false);
  const article = useAsync(() => getPublishedNewsBySlug(slug), [slug], `news:${slug}`);
  const related = useAsync(() => listPublishedNews(4), [], 'news:latest:4');

  const data = article.data;
  const title = data ? localized(data, 'title', lang) : undefined;
  const summary = data ? localized(data, 'summary', lang) : undefined;
  const content = data ? localized(data, 'content', lang) : '';

  useSeo({
    title: data ? title : article.loading ? undefined : t.notFoundTitle,
    description: summary || (content ? toPlainText(content) : undefined),
    image: data?.image_url || undefined,
    type: data ? 'article' : 'website',
    noindex: !article.loading && !data,
  });

  const url = pageUrl(lang, `/news/${slug}`);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard unavailable: ignore
    }
  };

  if (article.loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 max-w-4xl" aria-busy="true">
          <div className="h-80 rounded-2xl bg-gray-200 animate-pulse mb-8"></div>
          <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <span className="sr-only">{tc.common.loading}</span>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center max-w-xl">
          <h1 className="text-3xl font-bold mb-4">{article.error ? tc.common.errorLoading : t.notFoundTitle}</h1>
          {!article.error && <p className="text-gray-600 mb-8">{t.notFoundText}</p>}
          <BackLink label={t.backToNews} />
        </div>
      </Layout>
    );
  }

  const others = (related.data ?? []).filter((a) => a.id !== data.id).slice(0, 3);

  return (
    <Layout>
      <article>
        <header className="relative h-[420px] md:h-[520px] overflow-hidden bg-gray-900">
          <img src={data.image_url || NEWS_PLACEHOLDER} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10"></div>
          <div className="container mx-auto px-4 h-full relative flex flex-col justify-end pb-10 md:pb-14 max-w-4xl">
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
                <ol className="flex items-center gap-2">
                  <li><Link to="/" className="hover:text-white">{tc.nav.home}</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link to="/news" className="hover:text-white">{tc.nav.news}</Link></li>
                </ol>
              </nav>
              <CategoryBadge category={data.category} />
              <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight font-montserrat">{title}</h1>
              <time dateTime={data.published_at} className="mt-4 block text-white/80">
                {formatDate(data.published_at, lang)}
              </time>
            </m.div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          {summary && <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium mb-10 border-l-4 border-secondary pl-6">{summary}</p>}

          <RichText
            content={content}
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-montserrat prose-a:text-primary prose-li:marker:text-secondary"
          />

          {data.source_url && (
            <p className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500">
              {t.source}:{' '}
              <a href={data.source_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                {data.source_url}
              </a>
            </p>
          )}

          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <BackLink label={t.backToNews} />
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{t.share}</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.shareLinkedIn} ${tc.common.opensInNewTab}`}
                className="h-10 w-10 rounded-full bg-[#0a66c2] text-white flex items-center justify-center hover:opacity-90"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
              <button
                type="button"
                onClick={copyLink}
                className="h-10 px-4 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 inline-flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span aria-live="polite">{copied ? t.copied : t.copyLink}</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-8">{t.related}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {others.map((item) => (
                <NewsCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default NewsArticlePage;
