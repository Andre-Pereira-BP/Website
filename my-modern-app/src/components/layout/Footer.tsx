import Link from '../../i18n/Link';
import { m } from 'framer-motion';
import { COMPANY, OFFICES } from '../../config/company';
import { commonDict } from '../../i18n/common';
import { useMedia } from '../../lib/siteContent';
import { useT } from '../../i18n/LanguageContext';
import { hasOptionalCookies, openCookieSettings } from '../../lib/consent';
import GridPattern from '../ui/GridPattern';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  const t = useT(commonDict);
  const media = useMedia();
  const hq = OFFICES[0];

  const navColumns = [
    {
      title: t.footer.company,
      links: [
        { label: t.footer.links.about, path: '/about' },
        { label: t.footer.links.expertise, path: '/expertise' },
        { label: t.footer.links.testSystems, path: '/test-systems' },
        { label: t.footer.links.quality, path: '/quality' },
        { label: t.footer.links.news, path: '/news' },
        { label: t.footer.links.careers, path: '/careers' },
      ],
    },
    {
      title: t.footer.contact,
      links: [
        { label: t.footer.links.sales, path: '/contact#sales' },
        { label: t.footer.links.engineering, path: '/contact#engineering' },
        { label: t.footer.links.support, path: '/contact#support' },
        { label: t.footer.links.linkedin, path: COMPANY.linkedIn, external: true },
      ],
    },
  ];

  const linkClass = 'text-gray-200 hover:text-white transition-colors inline-flex items-center group';
  const bullet = <span className="mr-2 w-0 group-hover:w-2 transition-all bg-secondary h-0.5 opacity-0 group-hover:opacity-100"></span>;

  return (
    <footer className="bg-primary-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <GridPattern className="opacity-10" />
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8">
          <m.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
          >
            <img src="/img/logo_bp_bw.png" alt="BridgePoint" width={251} height={100} className="h-12 md:h-14 w-auto mb-6" loading="lazy" />
            <p className="text-sm text-gray-200 mb-6 leading-relaxed max-w-sm">{t.footer.about}</p>
            <h2 className="text-sm font-bold mb-3 uppercase tracking-wider text-white">{t.footer.certifications}</h2>
            <div className="flex items-center gap-4">
              <img src={media('footer.certs.pmelider')} alt="PME Líder 2024" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src={media('footer.certs.iso9001')} alt="ISO 9001" className="h-16 md:h-20 w-auto" loading="lazy" />
            </div>
          </m.div>

          {navColumns.map((column, colIndex) => (
            <m.nav
              key={column.title}
              aria-label={column.title}
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (colIndex + 1) }}
              variants={fadeInUp}
            >
              <h2 className="text-base font-bold mb-4 uppercase tracking-wider text-white">{column.title}</h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.path}>
                    {'external' in link && link.external ? (
                      <a href={link.path} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {bullet}
                        {link.label}
                        <span className="sr-only"> {t.common.opensInNewTab}</span>
                      </a>
                    ) : (
                      <Link to={link.path} className={linkClass}>
                        {bullet}
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </m.nav>
          ))}

          <m.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-base font-bold mb-4 uppercase tracking-wider text-white">{t.footer.headquarters}</h2>
            <address className="not-italic text-sm text-gray-200 leading-relaxed">
              {hq.address.map((line) => (
                <p key={line} className="mb-1">{line}</p>
              ))}
              <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="mt-4 flex items-center hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.generalEmail}`} className="mt-2 flex items-center hover:text-white transition-colors break-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {COMPANY.generalEmail}
              </a>
            </address>
            <a
              href={COMPANY.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn ${t.common.opensInNewTab}`}
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-primary transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </m.div>
        </div>
      </div>

      <div className="bg-black/20 py-5 relative z-10">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-3 text-sm text-gray-300">
          <p className="text-center lg:text-left" suppressHydrationWarning>
            © {new Date().getFullYear()} {COMPANY.legalName} {t.footer.rights}
            {COMPANY.nipc && (
              <span className="block sm:inline sm:ml-2">
                {t.footer.nipc}: {COMPANY.nipc}
              </span>
            )}
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <li><Link to="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link></li>
            <li><Link to="/cookies" className="hover:text-white transition-colors">{t.footer.cookies}</Link></li>
            {hasOptionalCookies && (
              <li>
                <button type="button" onClick={openCookieSettings} className="hover:text-white transition-colors">
                  {t.footer.cookieSettings}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
