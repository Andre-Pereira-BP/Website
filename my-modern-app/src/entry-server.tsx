// Build-time entry used by scripts/prerender.mjs (bundled with `vite build --ssr`).
// Renders every public page in both languages to static HTML; the browser then hydrates it.
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import App from './App';
import { NEWS_ARTICLE_PAGE, PUBLIC_PAGES } from './config/pages';
import { DEFAULT_LANG, htmlLang, Lang, LANG_CODES, langFromPath, localizePath } from './i18n/locale';
import { listPublishedNews } from './lib/content';
import { headToHtml, pageUrl } from './lib/seo';
import { HeadCollector, HeadCollectorContext, PrerenderData, PrerenderDataContext } from './lib/ssr';

export { PRERENDER_DATA_ID } from './lib/ssr';

export interface SiteRoute {
  /** Path served by the site, e.g. /pt/news/my-article */
  url: string;
  /** Absolute URL, e.g. https://www.bridgepoint.pt/pt/news/my-article */
  loc: string;
  lastmod: string;
  priority: string;
  changefreq: string;
  alternates: { hreflang: string; href: string }[];
}

// Supabase errors are plain objects with a message, not Error instances
const describe = (err: unknown) =>
  err && typeof err === 'object' && 'message' in err ? String((err as { message: unknown }).message) : String(err);

const alternatesFor = (path: string) => [
  ...LANG_CODES.map((lang) => ({ hreflang: htmlLang(lang), href: pageUrl(lang, path) })),
  { hreflang: 'x-default', href: pageUrl(DEFAULT_LANG, path) },
];

/** Every public URL in every language: static pages plus published news articles. */
export async function listSiteRoutes(): Promise<{ routes: SiteRoute[]; warnings: string[] }> {
  const today = new Date().toISOString().slice(0, 10);
  const warnings: string[] = [];
  const pages: { path: string; lastmod: string; priority: string; changefreq: string }[] = PUBLIC_PAGES.map((page) => ({
    ...page,
    lastmod: today,
  }));

  try {
    for (const article of await listPublishedNews()) {
      pages.push({
        path: `/news/${article.slug}`,
        lastmod: String(article.updated_at || article.published_at).slice(0, 10),
        ...NEWS_ARTICLE_PAGE,
      });
    }
  } catch (err) {
    warnings.push(`Could not list news articles (${describe(err)}): articles not prerendered.`);
  }

  const routes = pages.flatMap((page) =>
    LANG_CODES.map((lang) => ({
      url: localizePath(lang, page.path),
      loc: pageUrl(lang, page.path),
      lastmod: page.lastmod,
      priority: page.priority,
      changefreq: page.changefreq,
      alternates: alternatesFor(page.path),
    }))
  );
  return { routes, warnings };
}

async function renderOnce(url: string, data: PrerenderData, collector: HeadCollector): Promise<string> {
  const errors: unknown[] = [];
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <PrerenderDataContext.Provider value={data}>
        <HeadCollectorContext.Provider value={collector}>
          <LazyMotion features={domAnimation} strict>
            <StaticRouter location={url}>
              <App />
            </StaticRouter>
          </LazyMotion>
        </HeadCollectorContext.Provider>
      </PrerenderDataContext.Provider>
    </StrictMode>,
    { onError: (error) => void errors.push(error) }
  );
  if (errors.length) throw errors[0];

  const decoder = new TextDecoder();
  let html = '';
  for await (const chunk of prelude as unknown as AsyncIterable<Uint8Array | string>) {
    html += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true });
  }
  return html + decoder.decode();
}

export interface RenderedPage {
  /** Markup for <div id="root"> */
  html: string;
  /** <title>, meta, canonical and hreflang tags */
  head: string;
  /** Value for <html lang> */
  htmlLang: string;
  /** Results of the page's data loaders, embedded for hydration */
  data: Record<string, unknown>;
  warnings: string[];
}

/**
 * Renders one page. Pages that load data (news, jobs) are rendered twice: the first pass collects
 * their loaders (see useAsync), which run before the final pass.
 */
export async function renderPage(url: string): Promise<RenderedPage> {
  const lang: Lang = langFromPath(url) ?? DEFAULT_LANG;
  const pending = new Map<string, () => Promise<unknown>>();
  const data: PrerenderData = { values: {}, pending };
  const attempted = new Set<string>();
  const warnings: string[] = [];

  for (;;) {
    const collector: HeadCollector = { head: null };
    const html = await renderOnce(url, data, collector);
    const loaders = [...pending].filter(([key]) => !attempted.has(key));
    pending.clear();

    if (loaders.length === 0) {
      if (!collector.head) warnings.push(`${url}: page did not call useSeo.`);
      return { html, head: collector.head ? headToHtml(collector.head) : '', htmlLang: htmlLang(lang), data: data.values, warnings };
    }

    await Promise.all(
      loaders.map(async ([key, load]) => {
        attempted.add(key);
        try {
          data.values[key] = await load();
        } catch (err) {
          warnings.push(`${url}: could not load "${key}" (${describe(err)}); it will load in the browser.`);
        }
      })
    );
  }
}
