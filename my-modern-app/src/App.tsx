import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { detectPreferredLang, isLang, LANG_CODES, localizePath } from './i18n/locale';
import CookieConsent from './components/ui/CookieConsent';
import { SiteContentProvider } from './lib/siteContent';
import Home from './pages/Home';

// Every page except the home page is loaded on demand to keep the first load small.
const About = lazy(() => import('./pages/About'));
const TestSystems = lazy(() => import('./pages/TestSystems'));
const Expertise = lazy(() => import('./pages/Expertise'));
const Quality = lazy(() => import('./pages/Quality'));
const News = lazy(() => import('./pages/News'));
const NewsArticle = lazy(() => import('./pages/NewsArticle'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminApp = lazy(() => import('./admin/AdminApp'));

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center" aria-busy="true">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
  </div>
);

/** "/", old links without a language (/about, /news/x) and ?lang=en → same page in the preferred language. */
const LanguageRedirect = () => {
  const { pathname, search, hash } = useLocation();
  const params = new URLSearchParams(search);
  const requested = params.get('lang');
  params.delete('lang');
  const lang = isLang(requested) ? requested : detectPreferredLang();
  const query = params.toString();
  return <Navigate replace to={`${localizePath(lang, pathname)}${query ? `?${query}` : ''}${hash}`} />;
};

// Public pages, mounted under /pt and /en (keep in sync with PUBLIC_PAGES in src/config/pages.ts)
const pageRoutes = (
  <>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="test-systems" element={<TestSystems />} />
    <Route path="expertise" element={<Expertise />} />
    <Route path="quality" element={<Quality />} />
    <Route path="news" element={<News />} />
    <Route path="news/:slug" element={<NewsArticle />} />
    <Route path="careers" element={<Careers />} />
    <Route path="contact" element={<Contact />} />
    <Route path="privacy" element={<Legal doc="privacy" />} />
    <Route path="terms" element={<Legal doc="terms" />} />
    <Route path="cookies" element={<Legal doc="cookies" />} />
    <Route path="*" element={<NotFound />} />
  </>
);

/** Routes and providers shared by the browser (BrowserRouter) and the prerender (StaticRouter). */
function App() {
  return (
    <LanguageProvider>
      <SiteContentProvider>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/admin/*" element={<AdminApp />} />
            {LANG_CODES.map((lang) => (
              <Route key={lang} path={`/${lang}`}>
                {pageRoutes}
              </Route>
            ))}
            <Route path="*" element={<LanguageRedirect />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </SiteContentProvider>
    </LanguageProvider>
  );
}

export default App;
