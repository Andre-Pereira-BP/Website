import {
  ComponentPropsWithRef,
  createContext,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, m } from 'framer-motion';

// ---------------------------------------------------------------------------
// Buttons
// ---------------------------------------------------------------------------

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-light shadow-sm',
  secondary: 'bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  ghost: 'text-gray-600 hover:bg-gray-100',
};

export const Button = ({
  variant = 'primary',
  loading = false,
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}: ComponentPropsWithRef<'button'> & { variant?: Variant; loading?: boolean; size?: 'sm' | 'md' }) => (
  <button
    type="button"
    {...props}
    disabled={disabled || loading}
    className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
      size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2.5 text-sm'
    } ${VARIANTS[variant]} ${className}`}
  >
    {loading && <Spinner className="h-4 w-4" />}
    {children}
  </button>
);

export const Spinner = ({ className = 'h-6 w-6' }: { className?: string }) => (
  <span className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent opacity-70 ${className}`} aria-hidden="true" />
);

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

export const PageHeader = ({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) => (
  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold font-montserrat text-gray-900">{title}</h1>
      {description && <p className="mt-1 text-gray-500">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 ${className}`}>{children}</div>
);

export const EmptyState = ({ title, text, action }: { title: string; text?: string; action?: ReactNode }) => (
  <div className="py-16 px-6 text-center">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    </div>
    <p className="font-semibold text-gray-800">{title}</p>
    {text && <p className="mt-1 text-sm text-gray-500">{text}</p>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export const ErrorBox = ({ error, onRetry }: { error: unknown; onRetry?: () => void }) => (
  <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200 flex items-center justify-between gap-4">
    <span>{describeError(error)}</span>
    {onRetry && (
      <Button size="sm" variant="secondary" onClick={onRetry}>
        Tentar novamente
      </Button>
    )}
  </div>
);

export const describeError = (error: unknown) => {
  const message = (error as { message?: string })?.message || String(error);
  if (/row-level security|permission denied|not authorized/i.test(message)) return 'Sem permissões para esta operação. Confirme que a sua conta está registada como administrador.';
  if (/duplicate key.*slug/i.test(message)) return 'Já existe uma notícia com este endereço (slug). Escolha outro.';
  if (/Failed to fetch|NetworkError/i.test(message)) return 'Sem ligação ao servidor. Verifique a sua ligação à internet.';
  return message;
};

export const Badge = ({ tone = 'gray', children }: { tone?: 'green' | 'gray' | 'blue' | 'amber' | 'red' | 'violet'; children: ReactNode }) => {
  const tones = {
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    gray: 'bg-gray-50 text-gray-600 ring-gray-500/20',
    blue: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    amber: 'bg-amber-50 text-amber-800 ring-amber-600/20',
    red: 'bg-red-50 text-red-700 ring-red-600/20',
    violet: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${tones[tone]}`}>{children}</span>;
};

// ---------------------------------------------------------------------------
// Form controls
// ---------------------------------------------------------------------------

export const Field = ({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  aside,
}: {
  label: string;
  htmlFor?: string;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  children: ReactNode;
  aside?: ReactNode;
}) => (
  <div>
    <div className="mb-1.5 flex items-center justify-between gap-2">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-800">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {aside}
    </div>
    {children}
    {hint && !error && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
    {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
  </div>
);

const controlClass = 'block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm';

export const TextInput = ({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`${controlClass} px-3 py-2 ${className}`} />
);

export const TextArea = ({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={`${controlClass} px-3 py-2 ${className}`} />
);

export const Select = ({ className = '', children, ...props }: InputHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) => (
  <select {...(props as object)} className={`${controlClass} px-3 py-2 ${className}`}>
    {children}
  </select>
);

export const CharCount = ({ value, max }: { value: string; max: number }) => (
  <span className={`text-xs ${value.length > max ? 'text-red-600 font-semibold' : 'text-gray-400'}`}>
    {value.length}/{max}
  </span>
);

export const Toggle = ({ checked, onChange, label, description }: { checked: boolean; onChange: (v: boolean) => void; label: string; description?: string }) => (
  <label className="flex cursor-pointer items-start justify-between gap-4">
    <span>
      <span className="block text-sm font-semibold text-gray-800">{label}</span>
      {description && <span className="block text-xs text-gray-500 mt-0.5">{description}</span>}
    </span>
    <span className="relative inline-flex flex-shrink-0">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-secondary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"></span>
      <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"></span>
    </span>
  </label>
);

/** PT / EN tabs with a dot showing which language still has empty required fields. */
export const LangTabs = ({
  value,
  onChange,
  incomplete,
}: {
  value: 'pt' | 'en';
  onChange: (v: 'pt' | 'en') => void;
  incomplete: { pt: boolean; en: boolean };
}) => (
  <div role="tablist" aria-label="Idioma do conteúdo" className="inline-flex rounded-lg bg-gray-100 p-1">
    {(['pt', 'en'] as const).map((code) => (
      <button
        key={code}
        type="button"
        role="tab"
        aria-selected={value === code}
        onClick={() => onChange(code)}
        className={`relative flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
          value === code ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        <img src={code === 'pt' ? '/img/icons/pt.png' : '/img/icons/gb.png'} alt="" className="h-4 w-4 rounded-full object-cover" />
        {code === 'pt' ? 'Português' : 'English'}
        {incomplete[code] && <span className="h-2 w-2 rounded-full bg-amber-500" title="Campos por preencher" />}
      </button>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Confirm dialog
// ---------------------------------------------------------------------------

export const ConfirmDialog = ({
  open,
  title,
  text,
  confirmLabel = 'Confirmar',
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  text: ReactNode;
  confirmLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const onCancelRef = useRef(onCancel);
  onCancelRef.current = onCancel;
  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancelRef.current();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <m.div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-900/50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onCancel}>
          <m.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${danger ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'}`}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <div>
                <h2 id="confirm-title" className="text-lg font-bold text-gray-900">{title}</h2>
                <div className="mt-2 text-sm text-gray-600">{text}</div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button ref={cancelRef} variant="secondary" onClick={onCancel} disabled={loading}>
                Cancelar
              </Button>
              <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm} loading={loading}>
                {confirmLabel}
              </Button>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

// ---------------------------------------------------------------------------
// Toasts
// ---------------------------------------------------------------------------

interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

const ToastContext = createContext<(type: Toast['type'], message: string) => void>(() => undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((type: Toast['type'], message: string) => {
    const id = Date.now() + Math.random();
    setToasts((list) => [...list, { id, type, message }]);
    window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), type === 'error' ? 7000 : 3500);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed bottom-4 right-4 z-[90] flex w-full max-w-sm flex-col gap-2" aria-live="polite">
        <AnimatePresence>
          {toasts.map((toast) => (
            <m.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40 }}
              className={`flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ring-1 ${
                toast.type === 'success' ? 'bg-white text-gray-800 ring-emerald-200' : 'bg-red-50 text-red-800 ring-red-200'
              }`}
            >
              <span className={toast.type === 'success' ? 'text-emerald-600' : 'text-red-600'} aria-hidden="true">
                {toast.type === 'success' ? '✓' : '!'}
              </span>
              {toast.message}
            </m.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export const formatDay = (iso: string) =>
  new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });

export const today = () => new Date().toISOString().slice(0, 10);

export const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');
