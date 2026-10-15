// Writes dist/sitemap.xml at the end of each build. Called by scripts/prerender.mjs with the same
// route list that was prerendered: every public page and published news article in PT and EN,
// each with <xhtml:link> alternates pointing to both language versions and to x-default.
import { writeFileSync } from 'node:fs';

const escapeXml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);

/**
 * @param {string} file
 * @param {{ loc: string, lastmod: string, changefreq: string, priority: string, alternates: { hreflang: string, href: string }[] }[]} routes
 */
export function writeSitemap(file, routes) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (r) => `  <url>
    <loc>${escapeXml(r.loc)}</loc>
${r.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(a.hreflang)}" href="${escapeXml(a.href)}" />`).join('\n')}
    <lastmod>${escapeXml(r.lastmod)}</lastmod>
    <changefreq>${escapeXml(r.changefreq)}</changefreq>
    <priority>${escapeXml(r.priority)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  writeFileSync(file, xml);
  return routes.length;
}
