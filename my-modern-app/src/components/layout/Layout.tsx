import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Link from '../../i18n/Link';
import { stripLang } from '../../i18n/locale';
import { m } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../ui/BackToTop';
import { commonDict } from '../../i18n/common';
import { useT } from '../../i18n/LanguageContext';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const Layout = ({ children, title, subtitle }: LayoutProps) => {
  const { pathname, hash } = useLocation();
  const page = stripLang(pathname); // switching language keeps the scroll position
  const t = useT(commonDict);

  // Scroll to the top when the page changes (unless a #anchor is targeted)...
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // ...and to the #anchor when there is one
  useEffect(() => {
    if (!hash) return;
    const timer = window.setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [page, hash]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-grow pt-20 focus:outline-none">
        {title && (
          <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" aria-hidden="true"></div>
            <m.div
              className="container mx-auto px-4 pt-10 pb-10 md:pt-14 md:pb-12 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
                <ol className="flex items-center gap-2">
                  <li>
                    <Link to="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-gray-700">{title}</li>
                </ol>
              </nav>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 font-montserrat">{title}</h1>
              <div className="h-1 w-20 bg-primary mt-4 rounded-full" aria-hidden="true"></div>
              {subtitle && <p className="mt-5 max-w-3xl text-lg text-gray-600">{subtitle}</p>}
            </m.div>
          </div>
        )}

        {children}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
