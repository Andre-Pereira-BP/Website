import { DragEvent, FormEvent, useRef, useState } from 'react';
import Link from '../../i18n/Link';
import { m } from 'framer-motion';
import { COMPANY } from '../../config/company';
import { useLanguage, useT } from '../../i18n/LanguageContext';
import { careersDict } from '../../i18n/pages/careers';
import { CV_EXTENSIONS, CV_MAX_BYTES, CV_MIME_TYPES, isSupabaseConfigured, submitApplication } from '../../lib/content';
import { trackEvent } from '../../lib/consent';
import { JobPosting, localized } from '../../lib/types';

interface ApplicationFormProps {
  job: JobPosting | null;
  onClose: () => void;
}

type Field = 'firstName' | 'lastName' | 'email' | 'phone' | 'linkedInUrl' | 'coverLetter';
const EMPTY = { firstName: '', lastName: '', email: '', phone: '', linkedInUrl: '', coverLetter: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isAcceptedCv = (file: File) =>
  CV_MIME_TYPES.includes(file.type) || CV_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext));

/** Builds a sentence with a {privacy} placeholder replaced by a link. */
export const ConsentText = ({ template, linkLabel }: { template: string; linkLabel: string }) => {
  const [before, after] = template.split('{privacy}');
  return (
    <>
      {before}
      <Link to="/privacy" target="_blank" className="text-primary underline underline-offset-2">
        {linkLabel}
      </Link>
      {after}
    </>
  );
};

const ApplicationForm = ({ job, onClose }: ApplicationFormProps) => {
  const t = useT(careersDict);
  const { lang } = useLanguage();
  const [values, setValues] = useState(EMPTY);
  const [cv, setCv] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const startedAt = useRef(Date.now());
  const fileInput = useRef<HTMLInputElement>(null);
  const jobTitle = job ? localized(job, 'title', lang) : null;

  const update = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors(({ [field]: _removed, ...rest }) => rest);
  };

  const pickFile = (file: File | undefined) => {
    if (!file) return;
    const { cv: _removed, ...rest } = errors;
    if (!isAcceptedCv(file)) return setErrors({ ...rest, cv: t.form.errors.cvType });
    if (file.size > CV_MAX_BYTES) return setErrors({ ...rest, cv: t.form.errors.cvSize });
    setErrors(rest);
    setCv(file);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!values.firstName.trim()) next.firstName = t.form.errors.firstName;
    if (!values.lastName.trim()) next.lastName = t.form.errors.lastName;
    if (!values.email.trim()) next.email = t.form.errors.email;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = t.form.errors.emailInvalid;
    if (values.linkedInUrl.trim() && !/^https?:\/\/\S+\.\S+/.test(values.linkedInUrl.trim())) next.linkedInUrl = t.form.errors.linkedIn;
    if (!cv) next.cv = t.form.errors.cv;
    if (!consent) next.consent = t.form.errors.consent;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) document.getElementById(`apply-${first}`)?.focus();
    return !first;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || !cv) return;
    // Simple bot protection: hidden honeypot field and a minimum fill time
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
      await submitApplication({ ...values, cv, jobId: job?.id ?? null, jobTitle: job ? job.title_pt || job.title_en : null, language: lang });
      trackEvent('job_application_submit', { job: job?.title_en ?? 'spontaneous' });
      setStatus('sent');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 p-8 md:p-12 text-center" role="status">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/15 text-secondary">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-3">{t.form.successTitle}</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">{t.form.successText}</p>
        <button type="button" onClick={onClose} className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-light">
          {t.form.backToJobs}
        </button>
      </m.div>
    );
  }

  const inputClass = (field: string) =>
    `form-input mt-1 px-3 py-2.5 ${errors[field] ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`;
  const describedBy = (field: string) => (errors[field] ? `apply-${field}-error` : undefined);
  const req = <span className="text-red-600" aria-hidden="true"> *</span>;

  return (
    <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 overflow-hidden">
      <div className="relative p-6 md:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.form.cancel}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl md:text-3xl font-bold font-montserrat mb-6 pr-12">
          {job ? `${t.form.applyFor} ${jobTitle}` : t.form.spontaneousTitle}
        </h2>

        {!job && <p className="bg-primary/5 text-primary-dark ring-1 ring-primary/10 p-4 rounded-xl mb-8">{t.form.spontaneousInfo}</p>}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot (hidden from people and assistive tech) */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(
              [
                ['firstName', t.form.firstName, 'text', 'given-name', true],
                ['lastName', t.form.lastName, 'text', 'family-name', true],
                ['email', t.form.email, 'email', 'email', true],
                ['phone', t.form.phone, 'tel', 'tel', false],
              ] as const
            ).map(([field, label, type, autoComplete, required]) => (
              <div key={field}>
                <label htmlFor={`apply-${field}`} className="form-label">
                  {label}
                  {required && req}
                </label>
                <input
                  id={`apply-${field}`}
                  type={type}
                  autoComplete={autoComplete}
                  value={values[field]}
                  onChange={(e) => update(field, e.target.value)}
                  aria-invalid={Boolean(errors[field])}
                  aria-describedby={describedBy(field)}
                  aria-required={required}
                  maxLength={field === 'email' ? 254 : 100}
                  className={inputClass(field)}
                />
                {errors[field] && <p id={`apply-${field}-error`} className="form-error">{errors[field]}</p>}
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="apply-linkedInUrl" className="form-label">{t.form.linkedIn}</label>
            <input
              id="apply-linkedInUrl"
              type="url"
              value={values.linkedInUrl}
              onChange={(e) => update('linkedInUrl', e.target.value)}
              placeholder="https://www.linkedin.com/in/…"
              aria-invalid={Boolean(errors.linkedInUrl)}
              aria-describedby={describedBy('linkedInUrl')}
              maxLength={300}
              className={inputClass('linkedInUrl')}
            />
            {errors.linkedInUrl && <p id="apply-linkedInUrl-error" className="form-error">{errors.linkedInUrl}</p>}
          </div>

          <div>
            <label htmlFor="apply-coverLetter" className="form-label">{t.form.coverLetter}</label>
            <textarea
              id="apply-coverLetter"
              rows={6}
              value={values.coverLetter}
              onChange={(e) => update('coverLetter', e.target.value)}
              placeholder={t.form.coverPlaceholder}
              maxLength={5000}
              className={inputClass('coverLetter')}
            />
          </div>

          <div>
            <span id="apply-cv-label" className="form-label">
              {t.form.cv}
              {req}
            </span>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`mt-1 flex justify-center px-6 pt-6 pb-7 border-2 border-dashed rounded-xl transition-colors ${
                dragging ? 'border-primary bg-primary/5' : errors.cv ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <div className="space-y-2 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="flex flex-wrap justify-center gap-1 text-sm text-gray-600">
                  <button
                    id="apply-cv"
                    type="button"
                    onClick={() => fileInput.current?.click()}
                    aria-describedby={`apply-cv-hint${errors.cv ? ' apply-cv-error' : ''}`}
                    aria-labelledby="apply-cv-label apply-cv"
                    className="font-semibold text-primary hover:text-primary-dark"
                  >
                    {t.form.upload}
                  </button>
                  <span>{t.form.dragDrop}</span>
                </div>
                <p id="apply-cv-hint" className="text-xs text-gray-500">{t.form.fileHint}</p>
                <input
                  ref={fileInput}
                  type="file"
                  className="sr-only"
                  tabIndex={-1}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => {
                    pickFile(e.target.files?.[0]);
                    e.target.value = '';
                  }}
                />
                {cv && (
                  <p className="text-sm text-emerald-700 inline-flex items-center gap-2">
                    {t.form.selected} <strong className="break-all">{cv.name}</strong>
                    <button type="button" onClick={() => setCv(null)} className="text-gray-500 underline hover:text-red-600">
                      {t.form.remove}
                    </button>
                  </p>
                )}
              </div>
            </div>
            {errors.cv && <p id="apply-cv-error" className="form-error">{errors.cv}</p>}
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input
                id="apply-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (errors.consent) setErrors(({ consent: _removed, ...rest }) => rest);
                }}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={describedBy('consent')}
                className="mt-0.5 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>
                <ConsentText template={t.form.consent} linkLabel={t.form.privacyLink} />
                {req}
              </span>
            </label>
            {errors.consent && <p id="apply-consent-error" className="form-error">{errors.consent}</p>}
          </div>

          {status === 'error' && (
            <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">
              {t.form.errors.submit.replace('{email}', COMPANY.generalEmail)}
            </p>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200">
              {t.form.cancel}
            </button>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-light disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {status === 'sending' && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true"></span>}
              {status === 'sending' ? t.form.submitting : t.form.submit}
            </button>
          </div>
        </form>
      </div>
    </m.div>
  );
};

export default ApplicationForm;
