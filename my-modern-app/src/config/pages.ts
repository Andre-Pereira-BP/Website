// Public pages (routes in App.tsx). Each one is prerendered at build time and listed in the
// sitemap in every language; published news articles are added to both automatically.

export interface PublicPage {
  path: string;
  priority: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
}

export const PUBLIC_PAGES: PublicPage[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/test-systems', priority: '0.9', changefreq: 'monthly' },
  { path: '/expertise', priority: '0.9', changefreq: 'monthly' },
  { path: '/quality', priority: '0.7', changefreq: 'monthly' },
  { path: '/news', priority: '0.8', changefreq: 'weekly' },
  { path: '/careers', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms', priority: '0.2', changefreq: 'yearly' },
  { path: '/cookies', priority: '0.2', changefreq: 'yearly' },
];

export const NEWS_ARTICLE_PAGE = { priority: '0.6', changefreq: 'monthly' } as const;
