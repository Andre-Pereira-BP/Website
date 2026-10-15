import { lazy, Suspense, useMemo, useState } from 'react';
import { m } from 'framer-motion';
import Layout from '../components/layout/Layout';
import CtaBanner, { LinkedInIcon } from '../components/ui/CtaBanner';
import SectionHeading from '../components/ui/SectionHeading';
import ContactForm from '../components/contact/ContactForm';
import { COMPANY, DEPARTMENTS, directionsUrl, OFFICES, OfficeId } from '../config/company';
import { commonDict } from '../i18n/common';
import { useT } from '../i18n/LanguageContext';
import { contactDict } from '../i18n/pages/contact';
import { useSeo } from '../lib/seo';
import { useHydrated } from '../lib/ssr';

// Leaflet needs a browser: the map is loaded on demand and only rendered after hydration.
const OfficeMap = lazy(() => import('../components/ui/OfficeMap'));
const mapBoxClass = 'w-full h-[420px] md:h-[520px] rounded-2xl shadow-lg overflow-hidden ring-1 ring-gray-200 bg-gray-100';

const DEPARTMENT_ICONS: Record<string, string[]> = {
  sales: ['M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'],
  engineering: [
    'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  ],
  support: ['M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'],
  general: ['M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
};

const Contact = () => {
  const t = useT(contactDict);
  const tc = useT(commonDict);
  const [selectedOffice, setSelectedOffice] = useState<OfficeId | null>(null);
  const hydrated = useHydrated();
  useSeo({ title: t.title, description: t.seoDescription });

  const officeNames = useMemo(() => tc.offices, [tc]);

  const selectOffice = (id: OfficeId) => {
    setSelectedOffice(id);
    const map = document.getElementById('map-section');
    if (map && map.getBoundingClientRect().top > window.innerHeight * 0.5) {
      window.scrollTo({ top: map.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' });
    }
  };

  return (
    <Layout title={t.title} subtitle={t.subtitle}>
      {/* Departments */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title={t.departments.title} subtitle={t.departments.subtitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEPARTMENTS.map((dept, index) => (
              <m.div
                key={dept.id}
                id={dept.id}
                className="scroll-mt-28 bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    {DEPARTMENT_ICONS[dept.id].map((d) => (
                      <path key={d} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
                    ))}
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 font-montserrat">{tc.departments[dept.id]}</h3>
                <p>
                  <span className="sr-only">{t.departments.email}: </span>
                  <a href={`mailto:${dept.email}`} className="text-primary font-medium hover:underline break-all">{dept.email}</a>
                </p>
                <p className="mt-1">
                  <span className="sr-only">{t.departments.phone}: </span>
                  <a href={`tel:${dept.phone.replace(/\s/g, '')}`} className="text-gray-700 hover:text-primary">{dept.phone}</a>
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + offices */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <m.div
              className="lg:col-span-3 relative bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 p-6 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold font-montserrat">{t.form.title}</h2>
              <p className="mt-2 mb-8 text-gray-600">{t.form.subtitle}</p>
              <ContactForm />
            </m.div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold font-montserrat">{t.offices.title}</h2>
              <p className="mt-2 mb-6 text-gray-600">{t.offices.subtitle}</p>
              <ul className="space-y-4">
                {OFFICES.map((office) => {
                  const active = selectedOffice === office.id;
                  return (
                    <li key={office.id}>
                      <div className={`rounded-2xl bg-white p-5 shadow-md ring-2 transition-all ${active ? 'ring-primary' : 'ring-transparent hover:ring-gray-200'}`}>
                        <div className="flex items-start gap-4">
                          <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${active ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-lg font-bold font-montserrat">{tc.offices[office.id]}</h3>
                            <address className="not-italic text-sm text-gray-600 mt-1">
                              {office.address.map((line) => (
                                <span key={line} className="block">{line}</span>
                              ))}
                            </address>
                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                              <button type="button" onClick={() => selectOffice(office.id)} aria-pressed={active} className="text-primary hover:text-primary-dark">
                                {t.offices.showOnMap}
                              </button>
                              <a href={directionsUrl(office)} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                                {tc.common.getDirections} ↗
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <m.div
            id="map-section"
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {hydrated ? (
              <Suspense fallback={<div className={mapBoxClass} aria-hidden="true" />}>
                <OfficeMap
                  offices={OFFICES}
                  selectedId={selectedOffice}
                  onSelect={setSelectedOffice}
                  officeNames={officeNames}
                  directionsLabel={tc.common.getDirections}
                  ariaLabel={tc.map.label}
                />
              </Suspense>
            ) : (
              <div className={mapBoxClass} aria-hidden="true" />
            )}
          </m.div>
        </div>
      </section>

      <CtaBanner
        title={t.social.title}
        text={t.social.text}
        action={{ label: tc.common.followLinkedIn, to: COMPANY.linkedIn, external: true, icon: <LinkedInIcon /> }}
      />
    </Layout>
  );
};

export default Contact;
