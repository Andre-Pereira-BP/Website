import Link from '../../i18n/Link';
import { m } from 'framer-motion';
import { formatDate, useLanguage, useT } from '../../i18n/LanguageContext';
import { newsDict } from '../../i18n/pages/news';
import { localized, NewsArticle, NewsCategory } from '../../lib/types';

export const categoryColor: Record<NewsCategory, string> = {
  company: 'bg-primary',
  technology: 'bg-violet-600',
  events: 'bg-emerald-600',
  projects: 'bg-orange-600',
};

export const NEWS_PLACEHOLDER = '/img/news/office.webp';

export const CategoryBadge = ({ category, className = '' }: { category: NewsCategory; className?: string }) => {
  const t = useT(newsDict);
  return (
    <span className={`${categoryColor[category]} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${className}`}>
      {t.categories[category]}
    </span>
  );
};

export const ArrowIcon = ({ className = 'h-5 w-5 ml-1' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const NewsCard = ({ article }: { article: NewsArticle }) => {
  const { lang } = useLanguage();
  const t = useT(newsDict);
  const title = localized(article, 'title', lang);
  const summary = localized(article, 'summary', lang);

  return (
    <m.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col ring-1 ring-gray-100"
    >
      <div className="h-52 overflow-hidden relative bg-gray-100">
        <img
          src={article.image_url || NEWS_PLACEHOLDER}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <CategoryBadge category={article.category} className="absolute top-4 left-4" />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <time dateTime={article.published_at} className="text-gray-500 text-sm mb-2">
          {formatDate(article.published_at, lang)}
        </time>
        <h3 className="text-xl font-bold mb-3 font-montserrat leading-snug">
          <Link to={`/news/${article.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:text-primary transition-colors">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{summary}</p>
        <span className="mt-auto inline-flex items-center text-primary font-medium" aria-hidden="true">
          {t.readMore}
          <ArrowIcon />
        </span>
      </div>
    </m.article>
  );
};

export default NewsCard;
