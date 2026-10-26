import { useCallback, useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CtaBanner from '../components/ui/CtaBanner';
import DetailModal from '../components/ui/DetailModal';
import SectionHeading from '../components/ui/SectionHeading';
import { ArrowIcon } from '../components/news/NewsCard';
import { commonDict } from '../i18n/common';
import { useT } from '../i18n/LanguageContext';
import { expertiseDict } from '../i18n/pages/expertise';
import { useSeo } from '../lib/seo';
import { useMedia } from '../lib/siteContent';
import type { MediaKey } from '../config/media';

const AREA_META: { id: string; image: MediaKey; icon: string; technologies: string[]; caseImages: MediaKey[] }[] = [
  {
    id: 'software-development',
    image: 'expertise.software',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    technologies: ['LabVIEW', 'TestStand', 'Python', 'C#', '.NET', 'SQL', 'REST APIs', 'MQTT', 'OPC UA'],
    caseImages: ['expertise.software.case.1', 'expertise.software.case.2'],
  },
  {
    id: 'hardware-development',
    image: 'expertise.hardware',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    technologies: ['Altium Designer', 'PSpice', 'EAGLE', 'High Voltage Systems', 'Mixed Signal Design', 'EMC/EMI'],
    caseImages: ['expertise.hardware.case.1', 'expertise.hardware.case.2'],
  },
  {
    id: 'real-time-control',
    image: 'expertise.realtime',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    technologies: ['LabVIEW Real-Time', 'LabVIEW FPGA', 'CompactRIO', 'PXI', 'EtherCAT', 'NI Linux Real-Time'],
    caseImages: ['expertise.realtime.case.1', 'expertise.realtime.case.2'],
  },
  {
    id: 'robotics-automation',
    image: 'expertise.robotics',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    technologies: ['ABB Robotics', 'KUKA', 'Universal Robots', 'Machine Vision', 'PLC', 'Safety PLCs', 'Industrial IoT'],
    caseImages: ['expertise.robotics.case.1', 'expertise.robotics.case.2'],
  },
  {
    id: 'data-acquisition',
    image: 'expertise.daq',
    icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
    technologies: ['NI DAQ', 'HBM', 'DSP', 'FFT', 'Wavelets', 'Time-Series Analysis', 'MATLAB'],
    caseImages: ['expertise.daq.case.1', 'expertise.daq.case.2'],
  },
  {
    id: 'vision-systems',
    image: 'expertise.vision',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    technologies: ['Machine Vision', 'Deep Learning', 'COGNEX', 'NI Vision', 'OpenCV', 'Image Processing', 'Structured Light'],
    caseImages: ['expertise.vision.case.1', 'expertise.vision.case.2'],
  },
];

const PARTNERS: { name: string; logo: MediaKey }[] = [
  { name: 'ITEC', logo: 'expertise.partners.itec' },
  { name: 'IMESIF', logo: 'expertise.partners.imesif' },
  { name: 'Siroco', logo: 'expertise.partners.siroco' },
  { name: 'Zeugma', logo: 'expertise.partners.zeugma' },
];

const Icon = ({ d }: { d: string }) => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-6 w-6 text-secondary flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const Expertise = () => {
  const t = useT(expertiseDict);
  const tc = useT(commonDict);
  const media = useMedia();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<number | null>(null);
  useSeo({ title: t.title, description: t.seoDescription });

  // Deep links such as /expertise#data-acquisition open the matching area
  useEffect(() => {
    const index = AREA_META.findIndex((a) => `#${a.id}` === hash);
    if (index >= 0) setActive(index);
  }, [hash]);

  const close = useCallback(() => {
    setActive(null);
    if (hash) navigate({ hash: '' }, { replace: true });
  }, [hash, navigate]);

  const area = active !== null ? t.areas[active] : null;
  const meta = active !== null ? AREA_META[active] : null;

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.areas.map((item, index) => (
              <m.article
                key={AREA_META[index].id}
                id={AREA_META[index].id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl ring-1 ring-gray-100 overflow-hidden transition-all hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={media(AREA_META[index].image)} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex items-end">
                    <div className="p-6 flex items-center">
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary text-white rounded-full mr-3">
                        <Icon d={AREA_META[index].icon} />
                      </div>
                      <h2 className="text-xl font-bold text-white">{item.title}</h2>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className="inline-flex items-center text-primary font-semibold after:absolute after:inset-0"
                  >
                    {t.learnMore}
                    <span className="sr-only">: {item.title}</span>
                    <ArrowIcon />
                  </button>
                </div>
              </m.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {area && meta && (
          <DetailModal title={area.title} image={media(meta.image)} icon={<Icon d={meta.icon} />} onClose={close}>
            <p className="text-lg text-gray-700">{area.details}</p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">{t.keyCapabilities}</h3>
                <ul className="space-y-2">
                  {area.keyPoints.map((point) => (
                    <li key={point} className="flex items-start text-gray-700">
                      <CheckIcon />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">{t.technologies}</h3>
                <ul className="flex flex-wrap gap-2">
                  {meta.technologies.map((tech) => (
                    <li key={tech} className="px-3 py-1.5 bg-primary/5 text-primary-dark ring-1 ring-primary/10 rounded-full text-sm font-medium">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 className="mt-10 text-xl font-bold text-primary mb-6">{t.caseStudies}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {area.caseStudies.map((study, i) => (
                <div key={study.title} className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
                  <div className="h-48 overflow-hidden bg-white">
                    <img src={media(meta.caseImages[i])} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2">{study.title}</h4>
                    <p className="text-gray-600 text-sm">{study.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </DetailModal>
        )}
      </AnimatePresence>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.partners.title} subtitle={t.partners.subtitle} />
          <ul className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {PARTNERS.map((partner) => (
              <li key={partner.name} className="bp-keep-light w-56 h-28 bg-white ring-1 ring-gray-200 shadow-sm flex items-center justify-center p-4 rounded-xl transition hover:shadow-md">
                <img src={media(partner.logo)} alt={partner.name} loading="lazy" className="max-w-full max-h-full object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner title={t.cta.title} text={t.cta.text} action={{ label: tc.common.contactUs, to: '/contact' }} />
    </Layout>
  );
};

export default Expertise;
