import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import Layout from '../components/layout/Layout';
import CtaBanner from '../components/ui/CtaBanner';
import SectionHeading from '../components/ui/SectionHeading';
import Timeline from '../components/ui/Timeline';
import { commonDict } from '../i18n/common';
import { useLanguage, useT } from '../i18n/LanguageContext';
import { qualityDict } from '../i18n/pages/quality';
import { useSeo } from '../lib/seo';
import { useMedia, useMediaFile } from '../lib/siteContent';
import { formatBytes, MediaKey } from '../config/media';
import type { Lang } from '../i18n/locale';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CERT_IMAGES: MediaKey[] = ['quality.certs.iso9001', 'quality.certs.ni', 'quality.certs.pmelider', 'quality.certs.top5'];

const METRIC_ICONS = [
  'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
];

const PILLAR_ICONS = [
  'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
];

// Quality documents: one file per language, replaceable in the admin area ("Imagens e ficheiros").
// The originals are in public/docs/quality.
const QUALITY_DOCS: { icon: string; files: Record<Lang, MediaKey> }[] = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    files: { pt: 'quality.docs.policy.pt', en: 'quality.docs.policy.en' },
  },
  {
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    files: { pt: 'quality.docs.manual.pt', en: 'quality.docs.manual.en' },
  },
  {
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    files: { pt: 'quality.docs.suppliers.pt', en: 'quality.docs.suppliers.en' },
  },
];

const Icon = ({ d, className = 'h-6 w-6' }: { d: string; className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
);

const Quality = () => {
  const t = useT(qualityDict);
  const { lang } = useLanguage();
  const tc = useT(commonDict);
  const media = useMedia();
  const mediaFile = useMediaFile();
  const [expanded, setExpanded] = useState<number | null>(null);
  useSeo({ title: t.title, description: t.seoDescription });

  return (
    <Layout title={t.title} subtitle={t.subtitle}>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <m.p
            className="max-w-3xl mx-auto text-center text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t.intro}
          </m.p>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.metrics.title} subtitle={t.metrics.subtitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.metrics.items.map((item, index) => (
              <m.div
                key={item.description}
                className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 p-6 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Icon d={METRIC_ICONS[index]} />
                </div>
                <p className="text-4xl font-bold mb-2 text-primary font-montserrat">{item.metric}</p>
                <p className="text-gray-600">{item.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.pillars.title} subtitle={t.pillars.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.pillars.items.map((pillar, index) => (
              <m.div
                key={pillar.title}
                className="bg-gray-50 rounded-2xl p-6 md:p-8 ring-1 ring-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                variants={fadeInUp}
              >
                <div className="flex items-center mb-4">
                  <div className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Icon d={PILLAR_ICONS[index]} />
                  </div>
                  <h3 className="text-xl font-bold font-montserrat">{pillar.title}</h3>
                </div>
                <p className="text-gray-600 md:pl-[3.75rem]">{pillar.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.certifications.title} subtitle={t.certifications.subtitle} />
          <div className="space-y-5 max-w-5xl mx-auto">
            {t.certifications.items.map((cert, index) => {
              const open = expanded === index;
              const panelId = `cert-panel-${index}`;
              return (
                <m.div
                  key={cert.name}
                  className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  variants={fadeInUp}
                >
                  <button
                    type="button"
                    className="w-full p-6 flex flex-col md:flex-row items-center text-left gap-6"
                    onClick={() => setExpanded(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <div className="bp-keep-light w-28 h-28 bg-white flex items-center justify-center p-3 rounded-xl ring-1 ring-gray-100 flex-shrink-0">
                      <img src={media(CERT_IMAGES[index])} alt="" loading="lazy" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-xl font-bold font-montserrat">{cert.name}</h3>
                        <span className="text-primary flex-shrink-0">
                          <span className="sr-only">{t.certifications.toggle}</span>
                          <svg className={`h-6 w-6 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{cert.description}</p>
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <m.div
                        id={panelId}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-4 border-t border-gray-100">
                          <h4 className="text-lg font-bold mb-3 text-primary">{t.certifications.keyAchievements}</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {cert.achievements.map((achievement) => (
                              <li key={achievement} className="flex items-start">
                                <svg className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality documents */}
      <section id="documents" className="py-20 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.documents.title} subtitle={t.documents.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {t.documents.items.map((doc, index) => {
              // One file per document, in the site's language (falls back to the other language)
              const { files } = QUALITY_DOCS[index];
              const own = mediaFile(files[lang]);
              const file = own ?? mediaFile(files[lang === 'pt' ? 'en' : 'pt']);
              const fallback = !own;
              if (!file) return null;
              return (
                <m.article
                  key={doc.title}
                  className="flex flex-col rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  variants={fadeInUp}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon d={QUALITY_DOCS[index].icon} />
                  </div>
                  <h3 className="text-xl font-bold font-montserrat">{doc.title}</h3>
                  <p className="mt-2 mb-6 flex-grow text-gray-600">{doc.description}</p>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3 ring-1 ring-gray-100 transition-colors hover:bg-primary hover:ring-primary"
                  >
                    <span className="flex items-center gap-3">
                      <span className="rounded-md bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">PDF</span>
                      <span className="font-semibold text-gray-800 group-hover:text-white">{t.documents.download}</span>
                      <span className="text-xs text-gray-500 group-hover:text-white/80">
                        {[file.bytes ? formatBytes(file.bytes) : '', fallback ? t.documents.onlyIn : ''].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                    <svg className="h-5 w-5 text-primary group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="sr-only">: {doc.title} (PDF)</span>
                  </a>
                </m.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.journey.title} subtitle={t.journey.subtitle} />
          <Timeline items={t.journey.items} />
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <m.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} variants={fadeInUp}>
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img src={media('quality.approach')} alt={t.approach.imageAlt} loading="lazy" className="w-full h-auto" />
              </div>
              <div className="hidden md:block absolute top-1/2 -right-6 -bottom-6 left-1/2 bg-primary/10 rounded-2xl -z-10" aria-hidden="true"></div>
            </m.div>
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
                {t.approach.titleStart} <span className="text-primary">{t.approach.titleHighlight}</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">{t.approach.p1}</p>
              <p className="text-lg text-gray-600 mb-8">{t.approach.p2}</p>
              <ul className="space-y-3">
                {t.approach.points.map((point) => (
                  <li key={point} className="flex items-start">
                    <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </m.div>
          </div>
        </div>
      </section>

      <CtaBanner title={t.cta.title} text={t.cta.text} action={{ label: tc.common.contactUs, to: '/contact' }} />
    </Layout>
  );
};

export default Quality;
