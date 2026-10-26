import { m } from 'framer-motion';
import Layout from '../components/layout/Layout';
import CtaBanner from '../components/ui/CtaBanner';
import SectionHeading from '../components/ui/SectionHeading';
import Timeline from '../components/ui/Timeline';
import { COMPANY } from '../config/company';
import { useT } from '../i18n/LanguageContext';
import { aboutDict } from '../i18n/pages/about';
import { useSeo } from '../lib/seo';
import { useMedia } from '../lib/siteContent';
import type { MediaKey } from '../config/media';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const VALUE_ICONS = [
  'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
];

const TEAM_IMAGES: MediaKey[] = ['about.team.1', 'about.team.2', 'about.team.3'];
// Line icons: gear (engineering), arrow up-right (new challenges), check badge (success)
const MISSION_ICONS = [
  'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
  'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
];

const About = () => {
  const t = useT(aboutDict);
  const media = useMedia();
  useSeo({ title: t.title, description: t.seoDescription });

  return (
    <Layout title={t.title} subtitle={t.subtitle}>
      {/* Introduction */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
                {t.intro.titleStart} <span className="text-primary">{COMPANY.foundedYear}</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">{t.intro.p1}</p>
              <p className="text-lg text-gray-600 mb-6">{t.intro.p2}</p>
              <p className="text-lg text-gray-600">{t.intro.p3}</p>
            </m.div>
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUp}
              className="relative"
            >
              <img src={media('about.intro')} alt={t.intro.imageAlt} loading="lazy" className="rounded-2xl shadow-2xl w-full h-auto relative z-10" />
              <div className="hidden md:block absolute -bottom-6 -right-6 w-full h-full bg-primary/10 rounded-2xl -z-10" aria-hidden="true"></div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.mission.title} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {t.mission.items.map((item, i) => (
              <m.div
                key={item}
                className="p-8 bg-white rounded-2xl shadow-md ring-1 ring-gray-100 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                variants={fadeInUp}
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={MISSION_ICONS[i]} /></svg>
                </span>
                <p className="mt-4 text-xl font-bold font-montserrat text-gray-900">{item}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.values.title} subtitle={t.values.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.items.map((value, index) => (
              <m.div
                key={value.title}
                className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={VALUE_ICONS[index]} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center font-montserrat">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.team.title} subtitle={t.team.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.team.members.map((member, index) => (
              <m.div
                key={member.name}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden ring-1 ring-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeInUp}
              >
                <div className="h-64 overflow-hidden">
                  <img src={media(TEAM_IMAGES[index])} alt={member.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-montserrat">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.journey.title} subtitle={t.journey.subtitle} />
          <Timeline items={t.journey.items} />
        </div>
      </section>

      <CtaBanner title={t.cta.title} text={t.cta.text} action={{ label: t.cta.button, to: '/careers' }} />
    </Layout>
  );
};

export default About;
