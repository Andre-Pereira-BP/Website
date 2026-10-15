import { ReactNode } from 'react';
import Link from '../../i18n/Link';
import { m } from 'framer-motion';
import GridPattern from './GridPattern';

interface CtaBannerProps {
  title: string;
  text: string;
  action: { label: string; to: string; external?: boolean; icon?: ReactNode };
  centered?: boolean;
}

const buttonClass =
  'inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:scale-[1.03] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50';

const CtaBanner = ({ title, text, action, centered = false }: CtaBannerProps) => {
  const button = action.external ? (
    <a href={action.to} target="_blank" rel="noopener noreferrer" className={buttonClass}>
      {action.icon}
      {action.label}
    </a>
  ) : (
    <Link to={action.to} className={buttonClass}>
      {action.icon}
      {action.label}
    </Link>
  );

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
      <GridPattern />
      <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-primary-light/30 blur-3xl" aria-hidden="true"></div>
      <div className="container mx-auto px-4 relative z-10">
        <m.div
          className={centered ? 'max-w-3xl mx-auto text-center' : 'flex flex-col md:flex-row items-center justify-between gap-8'}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={centered ? '' : 'md:w-2/3 text-center md:text-left'}>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 font-montserrat text-white">{title}</h2>
            <p className={`text-white/90 text-lg ${centered ? 'mb-8' : 'max-w-2xl'}`}>{text}</p>
          </div>
          <div className="flex-shrink-0">{button}</div>
        </m.div>
      </div>
    </section>
  );
};

export const LinkedInIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default CtaBanner;
