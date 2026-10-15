import Link from '../i18n/Link';
import Layout from '../components/layout/Layout';
import { commonDict } from '../i18n/common';
import { useT } from '../i18n/LanguageContext';
import { useSeo } from '../lib/seo';

const NotFound = () => {
  const t = useT(commonDict);
  useSeo({ title: t.notFound.title, noindex: true });

  return (
    <Layout>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white" aria-hidden="true"></div>
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-8xl md:text-9xl font-bold font-montserrat text-primary/15 select-none" aria-hidden="true">404</p>
          <h1 className="-mt-6 text-3xl md:text-4xl font-bold font-montserrat">{t.notFound.title}</h1>
          <p className="mt-4 text-lg text-gray-600">{t.notFound.text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/" className="px-7 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-light">
              {t.notFound.home}
            </Link>
            <Link to="/contact" className="px-7 py-3 rounded-full ring-1 ring-gray-300 font-semibold text-gray-700 hover:bg-gray-50">
              {t.notFound.contact}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
