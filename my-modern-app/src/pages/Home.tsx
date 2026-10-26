import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from '../i18n/Link';
import Layout from '../components/layout/Layout';
import CtaBanner from '../components/ui/CtaBanner';
import SectionHeading from '../components/ui/SectionHeading';
import NewsCard, { ArrowIcon } from '../components/news/NewsCard';
import { commonDict } from '../i18n/common';
import { useT } from '../i18n/LanguageContext';
import { homeDict } from '../i18n/pages/home';
import { listPublishedNews } from '../lib/content';
import { useAsync } from '../lib/useAsync';
import { useSeo } from '../lib/seo';
import { useMedia } from '../lib/siteContent';
import type { MediaKey } from '../config/media';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const HERO_SLIDES: { image: MediaKey; link: string }[] = [
  { image: 'home.hero.1', link: '/test-systems' },
  { image: 'home.hero.2', link: '/expertise' },
  { image: 'home.hero.3', link: '/expertise#data-acquisition' },
];

const SERVICE_META: { icon: string; image: MediaKey; link: string }[] = [
  { icon: 'M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM19 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3 16.5V12l2-5h11l3 5h2v4.5M3 12h18', image: 'home.services.1', link: '/test-systems' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', image: 'home.services.2', link: '/expertise' },
  { icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z', image: 'home.services.3', link: '/expertise' },
];

const CUSTOMERS: { name: string; logo: MediaKey }[] = [
  { name: 'Benteler', logo: 'home.customers.benteler' },
  { name: 'BorgWarner', logo: 'home.customers.borgwarner' },
  { name: 'Embraer', logo: 'home.customers.embraer' },
  { name: 'Exército Português', logo: 'home.customers.exercito' },
  { name: 'Hanon Systems', logo: 'home.customers.hanon' },
  { name: 'INCM', logo: 'home.customers.incm' },
  { name: 'JDEUS', logo: 'home.customers.jdeus' },
  { name: 'KEMET', logo: 'home.customers.kemet' },
  { name: 'LNEC', logo: 'home.customers.lnec' },
  { name: 'Infraestruturas de Portugal', logo: 'home.customers.ip' },
  { name: 'IPQ', logo: 'home.customers.ipq' },
  { name: 'ISQ', logo: 'home.customers.isq' },
  { name: 'Siemens', logo: 'home.customers.siemens' },
  { name: 'TE Connectivity', logo: 'home.customers.te' },
  { name: 'Vishay', logo: 'home.customers.vishay' },
  { name: 'Visteon', logo: 'home.customers.visteon' },
];

const CERTIFICATIONS: { image: MediaKey; alt: string }[] = [
  { image: 'home.certs.iso9001', alt: 'ISO 9001' },
  { image: 'home.certs.ni', alt: 'NI Alliance Partner' },
  { image: 'home.certs.labview', alt: 'Certified LabVIEW' },
  { image: 'home.certs.top5', alt: 'Top 5% 2022' },
  { image: 'home.certs.pmelider', alt: 'PME Líder 2024' },
];

/** Continuous, pausable logo strip (duplicated list for a seamless loop). */
const CustomersMarquee = () => {
  const media = useMedia();
  const items = [...CUSTOMERS, ...CUSTOMERS];
  return (
    <div className="bp-marquee group relative overflow-hidden py-4" aria-label="Customers">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-gray-50 to-transparent" aria-hidden="true"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-gray-50 to-transparent" aria-hidden="true"></div>
      <ul className="bp-marquee__track flex w-max gap-6 group-hover:[animation-play-state:paused]">
        {items.map((customer, i) => (
          <li
            key={`${customer.name}-${i}`}
            aria-hidden={i >= CUSTOMERS.length ? 'true' : undefined}
            className="bp-keep-light flex h-28 w-52 flex-shrink-0 items-center justify-center rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100"
          >
            <img
              src={media(customer.logo)}
              alt={i >= CUSTOMERS.length ? '' : customer.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain grayscale opacity-80 transition duration-300 hover:grayscale-0 hover:opacity-100"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

/** Plays only while visible; nothing is downloaded until the section approaches the viewport. */
const LazyVideo = ({ label, fallback }: { label: string; fallback: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === 'none') video.preload = 'auto';
          if (!reduceMotion) video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <video
      ref={ref}
      className="w-full h-full object-cover"
      controls
      muted
      loop
      playsInline
      preload="none"
      poster="/img/videos/bp_siroco_poster.webp"
      aria-label={label}
    >
      <source src="/img/videos/bp_siroco_720.mp4" type="video/mp4" />
      {fallback}
    </video>
  );
};

const Home = () => {
  const t = useT(homeDict);
  const tc = useT(commonDict);
  const reduceMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const news = useAsync(() => listPublishedNews(3), [], 'news:latest:3');
  const media = useMedia();

  useSeo({ description: t.seo.description });

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(timer);
  }, [paused, reduceMotion, currentSlide]);

  const goTo = (index: number) => setCurrentSlide((index + HERO_SLIDES.length) % HERO_SLIDES.length);
  const slide = t.hero.slides[currentSlide];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[640px] md:h-[720px] overflow-hidden bg-gray-900" aria-roledescription="carousel">
        <AnimatePresence initial={false}>
          <m.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={media(HERO_SLIDES[currentSlide].image)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20"></div>
          </m.div>
        </AnimatePresence>

        <div className="container mx-auto px-4 h-full flex items-center pb-24 md:pb-10 relative z-20">
          <div className="max-w-2xl text-white" aria-live={paused ? 'polite' : 'off'}>
            <m.p
              key={`sub-${currentSlide}`}
              className="inline-flex items-center gap-3 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.18em] sm:tracking-[0.25em] text-secondary mb-4 font-montserrat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="h-0.5 w-6 sm:w-10 bg-secondary" aria-hidden="true"></span>
              {t.hero.subtitle}
            </m.p>
            <m.h1
              key={`title-${currentSlide}`}
              className="text-[2rem] sm:text-4xl md:text-6xl font-bold mb-5 text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {slide.title}
            </m.h1>
            <m.p
              key={`desc-${currentSlide}`}
              className="text-lg md:text-xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {slide.description}
            </m.p>
            <m.div
              key={`cta-${currentSlide}`}
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                to={HERO_SLIDES[currentSlide].link}
                className="bg-primary hover:bg-primary-light text-white px-8 py-3.5 rounded-full inline-flex items-center transition-colors font-semibold shadow-lg shadow-primary/30"
              >
                {slide.button}
                <ArrowIcon className="h-5 w-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="hidden sm:inline-flex px-8 py-3.5 rounded-full items-center font-semibold text-white ring-1 ring-white/60 hover:bg-white hover:text-primary transition-colors"
              >
                {tc.common.contactUs}
              </Link>
            </m.div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-20 left-0 right-0 z-30">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {HERO_SLIDES.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`${t.hero.goTo} ${index + 1}`}
                  aria-current={index === currentSlide}
                  className={`h-2.5 rounded-full transition-all ${index === currentSlide ? 'w-10 bg-white bp-keep-light' : 'w-2.5 bg-white/50 hover:bg-white/80'}`}
                />
              ))}
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? t.hero.play : t.hero.pause}
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-full text-white/80 ring-1 ring-white/40 hover:bg-white/10"
              >
                {paused ? (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6 4l10 6-10 6V4z" /></svg>
                ) : (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5 4h3v12H5zM12 4h3v12h-3z" /></svg>
                )}
              </button>
            </div>
            <div className="hidden sm:flex gap-3">
              <button
                type="button"
                onClick={() => goTo(currentSlide - 1)}
                className="bg-white/10 hover:bg-white/25 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors ring-1 ring-white/30"
                aria-label={t.hero.prev}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(currentSlide + 1)}
                className="bg-white/10 hover:bg-white/25 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors ring-1 ring-white/30"
                aria-label={t.hero.next}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="relative z-30 -mt-12">
        <div className="container mx-auto px-4">
          <dl className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl bg-white shadow-xl ring-1 ring-gray-100 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 overflow-hidden">
            {t.facts.map((fact, i) => (
              <m.div
                key={fact.label}
                className={`p-6 md:p-8 text-center flex flex-col-reverse ${i % 2 === 1 ? 'border-l border-gray-100 lg:border-l-0' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <dt className="mt-1 text-sm md:text-base text-gray-600">{fact.label}</dt>
                <dd className="text-2xl md:text-4xl font-bold text-primary font-montserrat">{fact.value}</dd>
              </m.div>
            ))}
          </dl>
        </div>
      </section>

      {/* About */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <m.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
                {t.about.titleStart} <span className="text-primary">2011</span>
              </h2>
              <p className="text-gray-600 mb-6 text-lg">{t.about.p1}</p>
              <p className="text-gray-600 mb-8 text-lg">{t.about.p2}</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-light transition-colors font-semibold">
                  {t.about.aboutUs}
                </Link>
                <Link to="/expertise" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:border-primary hover:text-primary transition-colors font-semibold">
                  {t.about.expertise}
                </Link>
              </div>
            </m.div>
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img src={media('home.about')} alt={t.about.imageAlt} loading="lazy" className="w-full h-auto" />
              </div>
              <div className="hidden md:block absolute top-1/2 -right-6 -bottom-6 left-1/2 bg-primary/10 rounded-2xl -z-10" aria-hidden="true"></div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.services.title} subtitle={t.services.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => {
              const meta = SERVICE_META[index];
              return (
                <m.article
                  key={service.title}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl ring-1 ring-gray-100 flex flex-col"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={fadeInUp}
                >
                  <div className="h-48 overflow-hidden">
                    <img src={media(meta.image)} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 flex items-center font-montserrat">
                      <span className="mr-3 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={meta.icon} /></svg>
                      </span>
                      {service.title}
                    </h3>
                    <p className="mb-4 text-gray-600">{service.description}</p>
                    <ul className="space-y-1.5 mb-6">
                      {service.items.map((item) => (
                        <li key={item} className="font-medium flex items-center text-gray-700">
                          <svg className="h-4 w-4 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link to={meta.link} className="mt-auto text-primary font-semibold inline-flex items-center hover:text-primary-dark transition-colors">
                      {tc.common.learnMore}
                      <span className="sr-only">: {service.title}</span>
                      <ArrowIcon />
                    </Link>
                  </div>
                </m.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.video.title} subtitle={t.video.subtitle} />
          <m.div
            className="max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-200 aspect-video bg-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <LazyVideo label={t.video.label} fallback={t.video.fallback} />
          </m.div>
        </div>
      </section>

      {/* Customers */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.customers.title} subtitle={t.customers.subtitle} />
        </div>
        <CustomersMarquee />
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.certifications.title} subtitle={t.certifications.subtitle} />
          <m.ul
            className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.alt} className="bp-keep-light w-32 h-32 md:w-36 md:h-36 bg-white flex items-center justify-center p-4 rounded-xl shadow-md ring-1 ring-gray-100 transition-transform hover:-translate-y-1">
                <img src={media(cert.image)} alt={cert.alt} loading="lazy" className="max-w-full max-h-full object-contain" />
              </li>
            ))}
          </m.ul>
          <div className="mt-10 text-center">
            <Link to="/quality" className="inline-flex items-center text-primary font-semibold hover:text-primary-dark">
              {tc.common.learnMore}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner centered title={t.cta.title} text={t.cta.text} action={{ label: t.cta.button, to: '/contact' }} />

      {/* Latest news */}
      {(news.loading || (news.data && news.data.length > 0)) && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat">{t.news.title}</h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-secondary" aria-hidden="true"></div>
              </div>
              <Link to="/news" className="text-primary font-semibold inline-flex items-center hover:text-primary-dark transition-colors">
                {t.news.viewAll}
                <ArrowIcon />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.loading
                ? [0, 1, 2].map((i) => <div key={i} className="h-96 rounded-2xl bg-gray-200 animate-pulse" />)
                : news.data!.map((article, index) => (
                    <m.div
                      key={article.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      variants={fadeInUp}
                    >
                      <NewsCard article={article} />
                    </m.div>
                  ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Home;
