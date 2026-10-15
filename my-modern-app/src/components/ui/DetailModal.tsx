import { ReactNode, useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { commonDict } from '../../i18n/common';
import { useT } from '../../i18n/LanguageContext';

interface DetailModalProps {
  title: string;
  image: string;
  icon: ReactNode;
  onClose: () => void;
  children: ReactNode;
}

/** Accessible full-screen detail dialog (Escape/backdrop closes it, focus moves in and is restored). */
const DetailModal = ({ title, image, icon, onClose, children }: DetailModalProps) => {
  const t = useT(commonDict);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] overflow-y-auto bg-black/70 backdrop-blur-sm flex items-start md:items-center justify-center p-4"
      onClick={onClose}
    >
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="bg-white rounded-2xl overflow-hidden max-w-5xl w-full max-h-[92vh] overflow-y-auto focus:outline-none my-4"
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 md:h-80 overflow-hidden">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
            <div className="p-6 md:p-8 flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary text-white rounded-full">{icon}</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.common.close}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 md:p-8">
          {children}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
              {t.common.close}
            </button>
          </div>
        </div>
      </m.div>
    </m.div>
  );
};

export default DetailModal;
