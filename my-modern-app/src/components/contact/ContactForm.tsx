import { FormEvent, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { COMPANY, DEPARTMENTS, DepartmentId } from '../../config/company';
import { commonDict } from '../../i18n/common';
import { useLanguage, useT } from '../../i18n/LanguageContext';
import { contactDict } from '../../i18n/pages/contact';
import { isSupabaseConfigured, submitContactMessage } from '../../lib/content';
import { trackEvent } from '../../lib/consent';
import { ConsentText } from '../careers/ApplicationForm';

const EMPTY = { name: '', email: '', company: '', phone: '', department: 'sales' as DepartmentId, message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = () => {
  const t = useT(contactDict);
  const tc = useT(commonDict);
  const { lang } = useLanguage();
  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const startedAt = useRef(Date.now());

  const update = (field: keyof typeof EMPTY, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors(({ [field]: _removed, ...rest }) => rest);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = t.form.errors.name;
    if (!EMAIL_RE.test(values.email.trim())) next.email = t.form.errors.email;
    if (values.message.trim().length < 10) next.message = t.form.errors.message;
    if (!consent) next.consent = t.form.errors.consent;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) document.getElementById(`contact-${first}`)?.focus();
    return !first;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (honeypot || Date.now() - startedAt.current < 3000) {
      setStatus('sent');
      return;
    }
    if (!isSupabaseConfigured) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      await submitContactMessage({ ...values, language: lang });
      trackEvent('contact_form_submit', { department: values.department });
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-center justify-center text-center p-8" role="status">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/15 text-secondary">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold font-montserrat mb-3">{t.form.successTitle}</h3>
        <p className="text-gray-600 mb-8 max-w-md">{t.form.successText}</p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setConsent(false);
            startedAt.current = Date.now();
            setStatus('idle');
          }}
          className="px-6 py-2.5 rounded-full ring-1 ring-gray-300 font-semibold text-gray-700 hover:bg-gray-50"
        >
          {t.form.another}
        </button>
      </m.div>
    );
  }

  const inputClass = (field: string) => `form-input px-3 py-2.5 ${errors[field] ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`;
  const req = <span className="text-red-600" aria-hidden="true"> *</span>;
  const err = (field: string) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className="form-error">
        {errors[field]}
      </p>
    ) : null;
  const a11y = (field: string) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="form-label">{t.form.name}{req}</label>
          <input id="contact-name" autoComplete="name" maxLength={120} value={values.name} onChange={(e) => update('name', e.target.value)} className={inputClass('name')} {...a11y('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="contact-email" className="form-label">{t.form.email}{req}</label>
          <input id="contact-email" type="email" autoComplete="email" maxLength={254} value={values.email} onChange={(e) => update('email', e.target.value)} className={inputClass('email')} {...a11y('email')} />
          {err('email')}
        </div>
        <div>
          <label htmlFor="contact-company" className="form-label">{t.form.company}</label>
          <input id="contact-company" autoComplete="organization" maxLength={150} value={values.company} onChange={(e) => update('company', e.target.value)} className={inputClass('company')} />
        </div>
        <div>
          <label htmlFor="contact-phone" className="form-label">{t.form.phone}</label>
          <input id="contact-phone" type="tel" autoComplete="tel" maxLength={40} value={values.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass('phone')} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-department" className="form-label">{t.form.department}</label>
        <select id="contact-department" value={values.department} onChange={(e) => update('department', e.target.value)} className={inputClass('department')}>
          {DEPARTMENTS.map((d) => (
            <option key={d.id} value={d.id}>{tc.departments[d.id]}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="form-label">{t.form.message}{req}</label>
        <textarea
          id="contact-message"
          rows={5}
          maxLength={5000}
          placeholder={t.form.messagePlaceholder}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          className={inputClass('message')}
          {...a11y('message')}
        />
        {err('message')}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            id="contact-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent) setErrors(({ consent: _removed, ...rest }) => rest);
            }}
            className="mt-0.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
            {...a11y('consent')}
          />
          <span>
            <ConsentText template={t.form.consent} linkLabel={t.form.privacyLink} />
            {req}
          </span>
        </label>
        {err('consent')}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">
          {t.form.errors.submit.replace('{email}', COMPANY.generalEmail)}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-light disabled:opacity-60 inline-flex items-center justify-center gap-2"
      >
        {status === 'sending' && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true"></span>}
        {status === 'sending' ? t.form.sending : t.form.submit}
      </button>
    </form>
  );
};

export default ContactForm;
