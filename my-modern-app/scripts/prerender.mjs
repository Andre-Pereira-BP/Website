// Last step of `npm run build`: writes a static HTML file for every public page in both languages
// (including each published news article), so search engines and link previews (LinkedIn,
// WhatsApp, ...) get the real title, description, Open Graph and hreflang tags without running
// JavaScript. The browser then hydrates the page. Also writes dist/sitemap.xml.
//
// Output (served by public/.htaccess):  /pt/ → dist/pt/index.html
//                                       /pt/news → dist/pt/news.html
//                                       /pt/news/<slug> → dist/pt/news/<slug>.html
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { writeSitemap } from './generate-sitemap.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const server = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;
const ROOT_DIV = '<div id="root"></div>';
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');
if (!SEO_BLOCK.test(template) || !template.includes(ROOT_DIV)) {
  throw new Error('[prerender] dist/index.html is missing the <!--seo--> block or the empty root div.');
}

// JSON inside <script type="application/json">: only "<" needs escaping (no "</script>" breakout).
const embedJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const fileFor = (url) => (url.endsWith('/') ? `${url}index.html` : `${url}.html`);

const started = Date.now();
const { routes, warnings } = await server.listSiteRoutes();
const written = [];

for (const route of routes) {
  if (!/^\/[A-Za-z0-9/_-]*$/.test(route.url)) {
    warnings.push(`${route.url}: unsupported characters in the URL, not prerendered.`);
    continue;
  }
  const page = await server.renderPage(route.url);
  warnings.push(...page.warnings);

  const data = Object.keys(page.data).length
    ? `\n    <script id="${server.PRERENDER_DATA_ID}" type="application/json">${embedJson(page.data)}</script>`
    : '';
  // Function replacers: page content may contain "$" sequences
  const html = template
    .replace(/<html lang="[^"]*"/, () => `<html lang="${page.htmlLang}"`)
    .replace(SEO_BLOCK, () => page.head)
    .replace(ROOT_DIV, () => `<div id="root">${page.html}</div>${data}`);

  const file = resolve(dist, `.${fileFor(route.url)}`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  written.push(route);
}

const sitemapCount = writeSitemap(resolve(dist, 'sitemap.xml'), written);

console.log(`[prerender] ${written.length} pages written to dist/ in ${((Date.now() - started) / 1000).toFixed(1)}s`);
console.log(`[prerender] ${sitemapCount} URLs written to dist/sitemap.xml`);
for (const warning of warnings) console.warn(`[prerender] ⚠ ${warning}`);
