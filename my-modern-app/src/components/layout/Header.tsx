import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { commonDict } from '../../i18n/common';
import { LANGUAGES, useLanguage, useT } from '../../i18n/LanguageContext';
import Link from '../../i18n/Link';
import { htmlLang, rememberLang, stripLang, switchLangPath } from '../../i18n/locale';
import { useHydrated } from '../../lib/ssr';
import { toggleTheme, useIsDark } from '../../lib/theme';

/** Sun/moon switch. Both icons are rendered; CSS shows the right one, so it never flashes. */
const ThemeToggle = () => {
  const t = useT(commonDict);
  const dark = useIsDark();
  const label = dark ? t.header.themeToLight : t.header.themeToDark;
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="group relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-600 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <svg className="absolute h-5 w-5 transition-all duration-500 rotate-0 scale-100 opacity-100 dark:-rotate-90 dark:scale-0 dark:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
      <svg className="absolute h-5 w-5 transition-all duration-500 rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="4" strokeWidth={2} />
        <path strokeLinecap="round" strokeWidth={2} d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
      </svg>
    </button>
  );
};

/** Links to the same page in each language (crawlable, keeps query string and #hash). */
const LanguageSwitcher = ({ size = 'md' }: { size?: 'md' | 'lg' }) => {
  const { lang } = useLanguage();
  const { pathname, search, hash } = useLocation();
  const t = useT(commonDict);
  // Query and #hash are unknown at build time: add them after hydration so the markup matches
  const suffix = useHydrated() ? `${search}${hash}` : '';
  return (
    <div role="group" aria-label={t.header.language} className="flex items-center rounded-full bg-gray-100 p-1">
      {LANGUAGES.map((option) => {
        const active = option.code === lang;
        return (
          <RouterLink
            key={option.code}
            to={`${switchLangPath(pathname, option.code)}${suffix}`}
            onClick={() => rememberLang(option.code)}
            aria-current={active ? 'true' : undefined}
            hrefLang={htmlLang(option.code)}
            lang={option.code}
            title={option.label}
            className={`flex items-center gap-1.5 rounded-full font-montserrat font-semibold uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              size === 'lg' ? 'px-4 py-2 text-sm' : 'px-2.5 py-1 text-xs'
            } ${active ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
          >
            <img src={option.flag} alt="" aria-hidden="true" className="h-4 w-4 rounded-full object-cover" />
            <span>{option.code}</span>
            <span className="sr-only">{option.label}</span>
          </RouterLink>
        );
      })}
    </div>
  );
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const t = useT(commonDict);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu on navigation and lock page scroll while it is open
  useEffect(() => setMobileMenuOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/test-systems', label: t.nav.testSystems },
    { path: '/expertise', label: t.nav.expertise },
    { path: '/quality', label: t.nav.quality },
    { path: '/news', label: t.nav.news },
    { path: '/careers', label: t.nav.careers },
    { path: '/contact', label: t.nav.contact },
  ];

  const currentPath = stripLang(location.pathname);
  const isActive = (path: string) => currentPath === path || (path !== '/' && currentPath.startsWith(`${path}/`));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        {t.header.skipToContent}
      </a>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center" aria-label={t.header.homeLink}>
          <m.img
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src="/img/Logo_Bridgepoint_Header.png"
            alt="BridgePoint Test Systems"
            width={211}
            height={90}
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-12' : 'h-14'}`}
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden xl:flex items-center gap-4">
          <nav aria-label="Main" className="flex items-center">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <div key={item.path} className="relative px-0.5">
                  <Link
                    to={item.path}
                    aria-current={active ? 'page' : undefined}
                    className={`font-montserrat text-sm font-medium px-3.5 py-2 rounded-full transition-colors relative z-10 whitespace-nowrap ${
                      active ? 'text-white' : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {active && <span className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/25" aria-hidden="true" />}
                </div>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="xl:hidden flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="relative z-50 p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? t.header.closeMenu : t.header.openMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-800 block transition-all transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-800 block transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-800 block transition-all transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 bg-white z-40 xl:hidden overflow-y-auto"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="min-h-full flex flex-col pt-28 pb-10 px-6">
              <nav aria-label="Mobile" className="flex flex-col">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      aria-current={active ? 'page' : undefined}
                      className={`text-lg font-montserrat font-medium py-4 border-b flex items-center justify-between ${
                        active ? 'text-primary border-primary' : 'text-gray-700 border-gray-200'
                      }`}
                    >
                      {item.label}
                      <svg className="h-5 w-5 opacity-50" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-8">
                <LanguageSwitcher size="lg" />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
