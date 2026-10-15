import { useEffect, useState } from 'react';
import Link from '../../i18n/Link';
import { AnimatePresence, m } from 'framer-motion';
import { commonDict } from '../../i18n/common';
import { useT } from '../../i18n/LanguageContext';
import { closeCookieSettings, hasOptionalCookies, initAnalyticsFromStoredConsent, saveConsent, useConsent } from '../../lib/consent';
import { useHydrated } from '../../lib/ssr';

/**
 * Consent banner shown only when optional (analytics) cookies are configured.
 * "Necessary only" is as prominent as "Accept all", and nothing optional loads before a choice.
 */
const CookieConsent = () => {
  const t = useT(commonDict);
  const { consent, isSettingsOpen } = useConsent();
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  // Stored consent is only known in the browser: never part of the prerendered HTML
  const hydrated = useHydrated();

  useEffect(() => {
    initAnalyticsFromStoredConsent();
  }, []);

  useEffect(() => {
    if (isSettingsOpen) {
      setCustomizing(true);
      setAnalytics(Boolean(consent?.analytics));
    }
  }, [isSettingsOpen, consent]);

  if (!hasOptionalCookies || !hydrated) return null;
  const visible = !consent || isSettingsOpen;

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-200">
            <div className="flex items-start justify-between gap-4">
              <h2 id="cookie-title" className="text-lg font-bold font-montserrat">{t.cookies.title}</h2>
              {isSettingsOpen && consent && (
                <button type="button" onClick={closeCookieSettings} aria-label={t.common.close} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {t.cookies.text}{' '}
              <Link to="/cookies" className="text-primary underline underline-offset-2 hover:text-primary-dark">
                {t.cookies.policyLink}
              </Link>
              .
            </p>

            {customizing && (
              <div className="mt-4 space-y-3">
                <div className="flex items-start justify-between gap-4 rounded-lg bg-gray-50 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">{t.cookies.necessary}</p>
                    <p className="text-sm text-gray-600">{t.cookies.necessaryDesc}</p>
                  </div>
                  <input type="checkbox" checked disabled className="mt-1 h-5 w-5 rounded text-primary" aria-label={t.cookies.necessary} />
                </div>
                <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg bg-gray-50 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">{t.cookies.analytics}</p>
                    <p className="text-sm text-gray-600">{t.cookies.analyticsDesc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded text-primary focus:ring-primary"
                  />
                </label>
              </div>
            )}

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              {customizing ? (
                <button type="button" onClick={() => saveConsent(analytics)} className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                  {t.cookies.save}
                </button>
              ) : (
                <button type="button" onClick={() => setCustomizing(true)} className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100">
                  {t.cookies.customize}
                </button>
              )}
              <button type="button" onClick={() => saveConsent(false)} className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700">
                {t.cookies.rejectAll}
              </button>
              <button type="button" onClick={() => saveConsent(true)} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light">
                {t.cookies.acceptAll}
              </button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
