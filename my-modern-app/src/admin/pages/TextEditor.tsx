import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Lang, localizePath } from '../../i18n/locale';
import { adminGetSiteContent, adminSaveSiteContent } from '../../lib/content';
import { buildOverrides, findTextPage, flattenOverrides, listTextFields, TextField, TextPage } from '../siteTexts';
import { useUnsavedChanges } from '../useUnsavedChanges';
import { Badge, Button, Card, ConfirmDialog, describeError, ErrorBox, PageHeader, Spinner, TextArea, TextInput, useToast } from '../ui';

type Flat = Record<Lang, Record<string, string>>;

const EMPTY: Flat = { pt: {}, en: {} };
const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'pt', label: 'Português', flag: '/img/icons/pt.png' },
  { code: 'en', label: 'English', flag: '/img/icons/gb.png' },
];

const sameFlat = (a: Flat, b: Flat) =>
  LANGS.every(({ code }) => {
    const ka = Object.keys(a[code]);
    return ka.length === Object.keys(b[code]).length && ka.every((k) => a[code][k] === b[code][k]);
  });

const countChanges = (a: Flat, b: Flat) => {
  let total = 0;
  for (const { code } of LANGS) {
    const keys = new Set([...Object.keys(a[code]), ...Object.keys(b[code])]);
    keys.forEach((k) => a[code][k] !== b[code][k] && total++);
  }
  return total;
};

const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const LangInput = ({
  field,
  lang,
  value,
  onChange,
}: {
  field: TextField;
  lang: (typeof LANGS)[number];
  value: string | undefined;
  onChange: (lang: Lang, key: string, value: string) => void;
}) => {
  const original = field.original[lang.code];
  const edited = value !== undefined;
  const current = value ?? original;
  const empty = edited && !current.trim();
  const long = Math.max(current.length, original.length) > 40 || current.includes('\n');
  const id = `f-${field.key}-${lang.code}`;
  const ring = empty ? '!border-red-400 !bg-red-50/50' : edited ? '!border-amber-400 !bg-amber-50/50' : '';

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-gray-500 md:sr-only">
        <img src={lang.flag} alt="" className="h-3.5 w-3.5 rounded-full object-cover" />
        {lang.label}
      </label>
      {long ? (
        <TextArea
          id={id}
          lang={lang.code}
          value={current}
          rows={Math.min(10, Math.max(2, Math.ceil(current.length / 45) + current.split('\n').length - 1))}
          onChange={(e) => onChange(lang.code, field.key, e.target.value)}
          className={ring}
        />
      ) : (
        <TextInput id={id} lang={lang.code} value={current} onChange={(e) => onChange(lang.code, field.key, e.target.value)} className={ring} />
      )}
      {empty && <p className="mt-1 text-xs text-red-600">Campo vazio: ao guardar, o site volta a mostrar o texto original.</p>}
      {edited && (
        <div className="mt-1 flex items-start justify-between gap-3 text-xs text-gray-500">
          <p className="min-w-0 truncate" title={original}>
            Original: <span className="italic">{original}</span>
          </p>
          <button type="button" onClick={() => onChange(lang.code, field.key, original)} className="flex-shrink-0 font-semibold text-primary hover:underline">
            Repor
          </button>
        </div>
      )}
    </div>
  );
};

const FieldRow = memo(function FieldRow({
  field,
  pt,
  en,
  onChange,
}: {
  field: TextField;
  pt: string | undefined;
  en: string | undefined;
  onChange: (lang: Lang, key: string, value: string) => void;
}) {
  const edited = pt !== undefined || en !== undefined;
  return (
    <div className="grid grid-cols-1 gap-3 border-t border-gray-100 px-6 py-4 first:border-t-0 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)] md:gap-5">
      <div className="flex items-start gap-2 md:pt-2">
        <span className="text-sm font-semibold text-gray-800">{field.label}</span>
        {edited && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" title="Alterado" />}
      </div>
      <LangInput field={field} lang={LANGS[0]} value={pt} onChange={onChange} />
      <LangInput field={field} lang={LANGS[1]} value={en} onChange={onChange} />
    </div>
  );
});

const Editor = ({ page }: { page: TextPage }) => {
  const toast = useToast();
  const fields = useMemo(() => listTextFields(page.dict), [page]);
  const [saved, setSaved] = useState<Flat | null>(null);
  const [draft, setDraft] = useState<Flat>(EMPTY);
  const [loadError, setLoadError] = useState<unknown>(null);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState('');
  const [onlyEdited, setOnlyEdited] = useState(false);
  const [confirmResetAll, setConfirmResetAll] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;
    setLoadError(null);
    adminGetSiteContent(page.id)
      .then((row) => {
        if (!active) return;
        const flat = flattenOverrides(row?.content, fields);
        setSaved(flat);
        setDraft(flat);
      })
      .catch((err) => active && setLoadError(err));
    return () => {
      active = false;
    };
  }, [page.id, fields, nonce]);

  const dirty = saved !== null && !sameFlat(draft, saved);
  const changes = saved ? countChanges(draft, saved) : 0;
  useUnsavedChanges(dirty);

  const onChange = useCallback(
    (lang: Lang, key: string, value: string) => {
      const field = fields.find((f) => f.key === key);
      if (!field) return;
      setDraft((d) => {
        const next = { ...d[lang] };
        if (value === field.original[lang]) delete next[key];
        else next[key] = value;
        return { ...d, [lang]: next };
      });
    },
    [fields]
  );

  const save = async () => {
    setSaving(true);
    try {
      const content = buildOverrides(draft, fields);
      await adminSaveSiteContent(page.id, content);
      const clean = flattenOverrides(content, fields);
      setSaved(clean);
      setDraft(clean);
      toast('success', 'Textos guardados. Já aparecem no site (recarregue a página do site para ver).');
    } catch (err) {
      toast('error', describeError(err));
    } finally {
      setSaving(false);
    }
  };

  const editedCount = Object.keys(draft.pt).length + Object.keys(draft.en).length;

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return fields.filter((f) => {
      if (onlyEdited && draft.pt[f.key] === undefined && draft.en[f.key] === undefined) return false;
      if (!q) return true;
      return [f.label, f.sectionLabel, f.original.pt, f.original.en, draft.pt[f.key] ?? '', draft.en[f.key] ?? ''].some((text) => normalize(text).includes(q));
    });
  }, [fields, query, onlyEdited, draft]);

  const sections = useMemo(() => {
    const map = new Map<string, { label: string; fields: TextField[] }>();
    for (const f of visible) {
      if (!map.has(f.section)) map.set(f.section, { label: f.sectionLabel, fields: [] });
      map.get(f.section)!.fields.push(f);
    }
    return [...map.entries()];
  }, [visible]);

  if (loadError) return <ErrorBox error={loadError} onRetry={() => setNonce((n) => n + 1)} />;
  if (!saved) {
    return (
      <div className="flex justify-center py-20 text-primary">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      <Link to="/admin/content" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-primary">
        ← Textos do site
      </Link>
      <PageHeader
        title={page.label}
        description={page.description}
        actions={
          <>
            {LANGS.map(({ code }) => (
              <a
                key={code}
                href={localizePath(code, page.path)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
              >
                Ver no site ({code.toUpperCase()}) ↗
              </a>
            ))}
          </>
        }
      />

      {/* Toolbar: stays visible while scrolling the fields */}
      <div className="sticky top-16 z-20 -mx-4 mb-6 border-b border-gray-200 bg-gray-50/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:top-0 lg:-mx-10 lg:px-10">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="relative flex-1 xl:min-w-[16rem]">
            <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>
            <TextInput type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Procurar texto…" aria-label="Procurar texto" className="pl-9" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-300">
              <input type="checkbox" checked={onlyEdited} onChange={(e) => setOnlyEdited(e.target.checked)} className="rounded border-gray-300 text-primary focus:ring-primary" />
              Só alterados {editedCount > 0 && <Badge tone="amber">{editedCount}</Badge>}
            </label>
            {editedCount > 0 && (
              <Button variant="ghost" onClick={() => setConfirmResetAll(true)}>
                Repor todos
              </Button>
            )}
            <Button variant="secondary" onClick={() => setDraft(saved)} disabled={!dirty || saving}>
              Descartar
            </Button>
            <Button onClick={save} loading={saving} disabled={!dirty}>
              {dirty ? `Guardar ${changes} ${changes === 1 ? 'alteração' : 'alterações'}` : 'Guardado'}
            </Button>
          </div>
        </div>
      </div>

      {sections.length === 0 ? (
        <Card className="p-10 text-center text-gray-500">{onlyEdited && !query ? 'Ainda não há textos alterados nesta página.' : 'Nenhum texto corresponde à pesquisa.'}</Card>
      ) : (
        <div className="space-y-6">
          {sections.map(([id, section]) => (
            <Card key={id} className="overflow-hidden">
              <div className="grid grid-cols-1 items-center gap-5 border-b border-gray-200 bg-gray-50/70 px-6 py-3 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)]">
                <h2 className="font-bold text-gray-900">{section.label}</h2>
                {LANGS.map((lang) => (
                  <span key={lang.code} className="hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 md:flex">
                    <img src={lang.flag} alt="" className="h-4 w-4 rounded-full object-cover" />
                    {lang.label}
                  </span>
                ))}
              </div>
              {section.fields.map((field) => (
                <FieldRow key={field.key} field={field} pt={draft.pt[field.key]} en={draft.en[field.key]} onChange={onChange} />
              ))}
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirmResetAll}
        title="Repor todos os textos originais?"
        text="Todos os textos alterados desta página voltam ao original, nos dois idiomas. Só fica definitivo quando carregar em Guardar."
        confirmLabel="Repor todos"
        onConfirm={() => {
          setDraft(EMPTY);
          setConfirmResetAll(false);
        }}
        onCancel={() => setConfirmResetAll(false)}
      />
    </>
  );
};

/** /admin/content/:pageId — edit the texts of one page, side by side in both languages. */
const TextEditor = () => {
  const { pageId } = useParams();
  const page = findTextPage(pageId);
  if (!page) return <Navigate to="/admin/content" replace />;
  return <Editor key={page.id} page={page} />;
};

export default TextEditor;
