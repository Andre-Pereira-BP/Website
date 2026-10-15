import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../config/company';
import { useLanguage } from '../i18n/LanguageContext';
import { DEFAULT_LANG, htmlLang, Lang, LANG_CODES, localizePath, ogLocale, stripLang } from '../i18n/locale';
import { HeadCollectorContext } from './ssr';

interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

type MetaAttr = 'name' | 'property';

export interface HeadTags {
  title: string;
  meta: { attr: MetaAttr; key: string; content: string }[];
  links: { rel: 'canonical' | 'alternate'; href: string; hreflang?: string }[];
}

const DEFAULT_IMAGE = '/img/og-image.jpg';
const BRAND = 'BridgePoint Test Systems';

// Every meta tag buildHead can produce; tags a page doesn't set are removed on navigation.
const MANAGED_META: [MetaAttr, string][] = [
  ['name', 'description'],
  ['property', 'og:description'],
  ['name', 'twitter:description'],
  ['property', 'og:title'],
  ['name', 'twitter:title'],
  ['property', 'og:type'],
  ['property', 'og:url'],
  ['property', 'og:image'],
  ['property', 'og:image:width'],
  ['property', 'og:image:height'],
  ['name', 'twitter:image'],
  ['property', 'og:locale'],
  ['property', 'og:locale:alternate'],
  ['name', 'robots'],
];

export const absoluteUrl = (url: string) => (/^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`);

/** Public URL of a page in a language: ('pt', '/about') → https://www.bridgepoint.pt/pt/about */
export const pageUrl = (lang: Lang, path: string) => absoluteUrl(localizePath(lang, path));

/** <title>, description, Open Graph/Twitter, canonical and hreflang alternates for a page. */
export function buildHead(
  { title, description, image, type = 'website', noindex = false }: SeoOptions,
  pathname: string,
  lang: Lang
): HeadTags {
  const path = stripLang(pathname);
  const fullTitle = title ? `${title} | ${BRAND}` : `${BRAND} | We Test for Your Success`;
  const url = pageUrl(lang, path);
  const meta: HeadTags['meta'] = [];
  const add = (attr: MetaAttr, key: string, content: string) => meta.push({ attr, key, content });

  if (description) {
    add('name', 'description', description);
    add('property', 'og:description', description);
    add('name', 'twitter:description', description);
  }
  add('property', 'og:title', fullTitle);
  add('name', 'twitter:title', fullTitle);
  add('property', 'og:type', type);
  add('property', 'og:url', url);
  add('property', 'og:image', absoluteUrl(image || DEFAULT_IMAGE));
  if (!image) {
    add('property', 'og:image:width', '1200');
    add('property', 'og:image:height', '630');
  }
  add('name', 'twitter:image', absoluteUrl(image || DEFAULT_IMAGE));
  add('property', 'og:locale', ogLocale(lang));
  LANG_CODES.filter((l) => l !== lang).forEach((l) => add('property', 'og:locale:alternate', ogLocale(l)));
  add('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

  const links: HeadTags['links'] = noindex
    ? []
    : [
        { rel: 'canonical', href: url },
        ...LANG_CODES.map((l) => ({ rel: 'alternate' as const, hreflang: htmlLang(l), href: pageUrl(l, path) })),
        { rel: 'alternate', hreflang: 'x-default', href: pageUrl(DEFAULT_LANG, path) },
      ];

  return { title: fullTitle, meta, links };
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Serialises the tags for the prerendered HTML. */
export function headToHtml(head: HeadTags): string {
  return [
    `<title>${escapeHtml(head.title)}</title>`,
    ...head.meta.map((m) => `<meta ${m.attr}="${m.key}" content="${escapeHtml(m.content)}" />`),
    ...head.links.map(
      (l) => `<link rel="${l.rel}"${l.hreflang ? ` hreflang="${l.hreflang}"` : ''} href="${escapeHtml(l.href)}" />`
    ),
  ].join('\n    ');
}

function applyHead(head: HeadTags) {
  document.title = head.title;
  for (const [attr, key] of MANAGED_META) {
    const content = head.meta.find((m) => m.attr === attr && m.key === key)?.content;
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (content === undefined) {
      // Keep the previous description when a page has none yet (e.g. while an article loads)
      if (key !== 'description' && !key.endsWith(':description')) el?.remove();
      continue;
    }
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }
  document.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  for (const link of head.links) {
    const el = document.createElement('link');
    el.rel = link.rel;
    if (link.hreflang) el.hreflang = link.hreflang;
    el.href = link.href;
    document.head.appendChild(el);
  }
}

/** Sets <title>, description, canonical, hreflang and Open Graph/Twitter tags for the current page. */
export function useSeo({ title, description, image, type = 'website', noindex = false }: SeoOptions) {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const collector = useContext(HeadCollectorContext);

  // Build-time render: effects don't run, so hand the tags to the prerender directly.
  if (collector) collector.head = buildHead({ title, description, image, type, noindex }, pathname, lang);

  useEffect(() => {
    applyHead(buildHead({ title, description, image, type, noindex }, pathname, lang));
  }, [title, description, image, type, noindex, pathname, lang]);
}
