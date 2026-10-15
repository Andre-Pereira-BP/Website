import { useMemo, useState } from 'react';
import Link from '../i18n/Link';
import { m } from 'framer-motion';
import Layout from '../components/layout/Layout';
import CtaBanner, { LinkedInIcon } from '../components/ui/CtaBanner';
import NewsCard, { ArrowIcon, CategoryBadge, NEWS_PLACEHOLDER } from '../components/news/NewsCard';
import { COMPANY } from '../config/company';
import { commonDict } from '../i18n/common';
import { formatDate, useLanguage, useT } from '../i18n/LanguageContext';
import { newsDict } from '../i18n/pages/news';
import { listPublishedNews } from '../lib/content';
import { localized, NEWS_CATEGORIES, NewsArticle, NewsCategory } from '../lib/types';
import { useAsync } from '../lib/useAsync';
import { useSeo } from '../lib/seo';

const FeaturedNews = ({ article }: { article: NewsArticle }) => {
  const { lang } = useLanguage();
  const t = useT(newsDict);
  return (
    <m.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2"
    >
      <div className="h-64 lg:h-auto lg:min-h-[340px] overflow-hidden relative bg-gray-100">
        <img
          src={article.image_url || NEWS_PLACEHOLDER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{t.featured}</span>
          <CategoryBadge category={article.category} />
        </div>
      </div>
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <time dateTime={article.published_at} className="text-gray-500 text-sm mb-3">
          {formatDate(article.published_at, lang)}
        </time>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 font-montserrat leading-tight">
          <Link to={`/news/${article.slug}`} className="after:absolute after:inset-0 group-hover:text-primary transition-colors">
            {localized(article, 'title', lang)}
          </Link>
        </h2>
        <p className="text-gray-600 mb-6 text-lg">{localized(article, 'summary', lang)}</p>
        <span className="inline-flex items-center text-primary font-semibold" aria-hidden="true">
          {t.readFull}
          <ArrowIcon />
        </span>
      </div>
    </m.article>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-hidden="true">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="h-52 bg-gray-200 animate-pulse"></div>
        <div className="p-6 space-y-3">
          <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

const News = () => {
  const t = useT(newsDict);
  const tc = useT(commonDict);
  const { lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<NewsCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: articles, loading, error, reload } = useAsync(() => listPublishedNews(), [], 'news:all');
  useSeo({ title: t.title, description: t.seoDescription });

  const featured = useMemo(() => (articles ? articles.find((a) => a.is_featured) ?? articles[0] : undefined), [articles]);

  const filtered = useMemo(() => {
    if (!articles) return [];
    const query = searchQuery.trim().toLowerCase();
    const isBrowsing = activeFilter === 'all' && !query;
    return articles.filter((article) => {
      if (isBrowsing && featured && article.id === featured.id) return false;
      if (activeFilter !== 'all' && article.category !== activeFilter) return false;
      if (!query) return true;
      return [article.title_pt, article.title_en, article.summary_pt, article.summary_en, article.content_pt, article.content_en]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });
  }, [articles, activeFilter, searchQuery, featured]);

  const showFeatured = featured && activeFilter === 'all' && !searchQuery.trim();

  return (
    <Layout title={t.title} subtitle={t.subtitle}>
      {showFeatured && (
        <section className="pt-12">
          <div className="container mx-auto px-4">
            <FeaturedNews article={featured} />
          </div>
        </section>
      )}

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div role="group" aria-label={t.filterLabel} className="flex flex-wrap gap-2">
              {(['all', ...NEWS_CATEGORIES] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveFilter(value)}
                  aria-pressed={activeFilter === value}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    activeFilter === value ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t.categories[value]}
                </button>
              ))}
            </div>
            <div className="w-full md:w-72 relative">
              <label htmlFor="news-search" className="sr-only">{t.searchLabel}</label>
              <input
                id="news-search"
                type="search"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <svg className="absolute left-3.5 top-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-gray-600 mb-4">{tc.common.errorLoading}</p>
              <button type="button" onClick={reload} className="px-5 py-2 rounded-full bg-primary text-white font-semibold">
                {tc.common.retry}
              </button>
            </div>
          ) : filtered.length > 0 ? (
            <>
              <p className="sr-only" aria-live="polite">{t.results(filtered.length)}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((article, index) => (
                  <m.div
                    key={`${article.id}-${lang}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                  >
                    <NewsCard article={article} />
                  </m.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl" aria-live="polite">
              <svg className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-700 mb-2">{t.emptyTitle}</h2>
              <p className="text-gray-500">{t.emptyText}</p>
            </div>
          )}
        </div>
      </section>

      <CtaBanner
        title={t.followTitle}
        text={t.followText}
        action={{ label: tc.common.followLinkedIn, to: COMPANY.linkedIn, external: true, icon: <LinkedInIcon /> }}
      />
    </Layout>
  );
};

export default News;
