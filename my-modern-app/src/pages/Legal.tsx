import Link from '../i18n/Link';
import Layout from '../components/layout/Layout';
import { COMPANY, OFFICES, SITE_URL } from '../config/company';
import { formatDate, useLanguage, useT } from '../i18n/LanguageContext';
import { LAST_UPDATED, LegalBlock, LegalDocId, legalDocs, legalLabels } from '../i18n/pages/legal';
import { hasOptionalCookies, openCookieSettings } from '../lib/consent';
import { useSeo } from '../lib/seo';

const ROUTES: Record<LegalDocId, string> = { privacy: '/privacy', terms: '/terms', cookies: '/cookies' };

const Block = ({ block }: { block: LegalBlock }) => {
  if (typeof block === 'string') return <p>{block}</p>;
  if ('list' in block) {
    return (
      <ul>
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl ring-1 ring-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-900">
          <tr>
            {block.table.head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {block.table.rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell, i) => (
                <td key={i} className={`px-4 py-3 align-top text-gray-700 ${i === 0 ? 'font-medium whitespace-nowrap' : ''}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Legal = ({ doc }: { doc: LegalDocId }) => {
  const { lang } = useLanguage();
  const labels = useT(legalLabels);
  const docs = legalDocs[lang]({
    legalName: COMPANY.legalName,
    nipc: COMPANY.nipc,
    address: OFFICES[0].address.join(', '),
    email: COMPANY.privacyEmail,
    phone: COMPANY.phone,
    siteUrl: SITE_URL.replace(/^https?:\/\//, ''),
    analytics: hasOptionalCookies,
  });
  const content = docs[doc];
  useSeo({ title: content.title, description: content.description });

  return (
    <Layout title={content.title} subtitle={`${labels.updated}: ${formatDate(LAST_UPDATED, lang)}`}>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
          <article className="lg:col-span-3 prose prose-lg max-w-none prose-headings:font-montserrat prose-h2:text-2xl prose-a:text-primary">
            <p className="lead">{content.intro}</p>
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}
            {doc === 'cookies' && hasOptionalCookies && (
              <button type="button" onClick={openCookieSettings} className="not-prose mt-4 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-light">
                {labels.cookieSettings}
              </button>
            )}
          </article>
          <aside className="lg:col-span-1">
            <nav aria-label={labels.otherDocs} className="sticky top-28 rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">{labels.otherDocs}</h2>
              <ul className="space-y-2">
                {(Object.keys(ROUTES) as LegalDocId[]).map((id) => (
                  <li key={id}>
                    <Link
                      to={ROUTES[id]}
                      aria-current={id === doc ? 'page' : undefined}
                      className={`block rounded-lg px-3 py-2 font-medium transition-colors ${id === doc ? 'bg-primary text-white' : 'text-gray-700 hover:bg-white'}`}
                    >
                      {docs[id].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default Legal;
