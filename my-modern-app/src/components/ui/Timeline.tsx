import { m } from 'framer-motion';

export interface TimelineItem {
  year: number | string;
  title: string;
  description: string;
}

/** Vertical timeline: single column on mobile, alternating sides from md upwards. */
const Timeline = ({ items }: { items: TimelineItem[] }) => (
  <ol className="relative max-w-5xl mx-auto">
    <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10" aria-hidden="true"></div>
    {items.map((item, index) => {
      const right = index % 2 === 1;
      return (
        <m.li
          key={`${item.year}-${item.title}`}
          className="relative mb-10 last:mb-0 pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.05 * index }}
        >
          <span
            className="absolute left-4 md:left-1/2 top-6 h-4 w-4 -translate-x-1/2 rounded-full bg-primary ring-4 ring-primary/20"
            aria-hidden="true"
          ></span>
          <div className={right ? 'md:col-start-2' : 'md:col-start-1'}>
            <div className={`rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100 transition-shadow hover:shadow-xl ${right ? '' : 'md:text-right'}`}>
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-sm font-bold mb-3">{item.year}</span>
              <h3 className="text-xl font-bold mb-2 font-montserrat">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        </m.li>
      );
    })}
  </ol>
);

export default Timeline;
