import { m } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

const SectionHeading = ({ title, subtitle, eyebrow, className = 'mb-12' }: SectionHeadingProps) => (
  <m.div
    className={`text-center ${className}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {eyebrow && (
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3 font-montserrat">{eyebrow}</p>
    )}
    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">{title}</h2>
    <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-secondary" aria-hidden="true"></div>
    {subtitle && <p className="text-gray-600 max-w-2xl mx-auto text-lg">{subtitle}</p>}
  </m.div>
);

export default SectionHeading;
