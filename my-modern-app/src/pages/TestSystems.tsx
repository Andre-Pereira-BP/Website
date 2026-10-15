import { useCallback, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import CtaBanner from '../components/ui/CtaBanner';
import DetailModal from '../components/ui/DetailModal';
import { ArrowIcon } from '../components/news/NewsCard';
import { commonDict } from '../i18n/common';
import { useT } from '../i18n/LanguageContext';
import { testSystemsDict } from '../i18n/pages/testSystems';
import { useSeo } from '../lib/seo';

const SYSTEM_META = [
  {
    id: 'development',
    image: '/img/general/prod_dev.webp',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    examples: ['/img/general/hvac.webp', '/img/general/ev_chargers-crop.webp', '/img/general/tech_car-scaled.webp'],
  },
  {
    id: 'production',
    image: '/img/general/prod.webp',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    examples: ['/img/general/prod.webp', '/img/general/fabrica.webp', '/img/general/chip.webp'],
  },
  {
    id: 'quality',
    image: '/img/general/cientist.webp',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    examples: ['/img/general/cientist.webp', '/img/general/flow.webp', '/img/general/tech_touch.webp'],
  },
];

const Icon = ({ d }: { d: string }) => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
);

const TestSystems = () => {
  const t = useT(testSystemsDict);
  const tc = useT(commonDict);
  const [selected, setSelected] = useState<number | null>(null);
  const close = useCallback(() => setSelected(null), []);
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

      <section className="pb-20 pt-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.systems.map((system, index) => {
              const meta = SYSTEM_META[index];
              return (
                <m.article
                  key={meta.id}
                  id={meta.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl ring-1 ring-gray-100 overflow-hidden h-full flex flex-col transition-all hover:-translate-y-1"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img src={meta.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-white">
                        <Icon d={meta.icon} />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h2 className="text-xl font-bold mb-3 font-montserrat">{system.title}</h2>
                    <p className="text-gray-600 mb-6 flex-grow">{system.description}</p>
                    <button
                      type="button"
                      onClick={() => setSelected(index)}
                      className="mt-auto self-start inline-flex items-center text-primary font-semibold hover:text-primary-dark"
                    >
                      {t.viewExamples}
                      <span className="sr-only">: {system.title}</span>
                      <ArrowIcon />
                    </button>
                  </div>
                </m.article>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected !== null && (
          <DetailModal
            title={t.systems[selected].title}
            image={SYSTEM_META[selected].image}
            icon={<Icon d={SYSTEM_META[selected].icon} />}
            onClose={close}
          >
            <p className="text-gray-700 text-lg mb-8">{t.systems[selected].description}</p>
            <h3 className="text-xl font-bold mb-4 text-primary">{t.examplesTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.systems[selected].examples.map((example, i) => (
                <div key={example.title} className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
                  <div className="h-40 overflow-hidden">
                    <img src={SYSTEM_META[selected].examples[i]} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2">{example.title}</h4>
                    <p className="text-gray-600 text-sm">{example.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </DetailModal>
        )}
      </AnimatePresence>

      <CtaBanner title={t.cta.title} text={t.cta.text} action={{ label: tc.common.contactUs, to: '/contact' }} />
    </Layout>
  );
};

export default TestSystems;
