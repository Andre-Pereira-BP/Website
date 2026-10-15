import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { COMPANY } from '../../config/company';
import { adminGetJob, adminSaveJob, JobInput } from '../../lib/content';
import { JOB_TYPES, JobPosting } from '../../lib/types';
import { useUnsavedChanges } from '../useUnsavedChanges';
import { JOB_TYPE_LABELS } from './JobsList';
import { Badge, Button, Card, describeError, ErrorBox, Field, LangTabs, PageHeader, Select, Spinner, TextArea, TextInput, today, Toggle, useToast } from '../ui';

const EMPTY: JobInput = {
  type: 'full-time',
  location: 'Évora, Portugal',
  is_remote: false,
  title_pt: '',
  title_en: '',
  department_pt: '',
  department_en: '',
  description_pt: '',
  description_en: '',
  responsibilities_pt: [],
  responsibilities_en: [],
  requirements_pt: [],
  requirements_en: [],
  benefits_pt: [],
  benefits_en: [],
  linkedin_url: null,
  posted_at: today(),
  is_published: false,
};

const LIST_FIELDS = ['responsibilities', 'requirements', 'benefits'] as const;
type ListField = (typeof LIST_FIELDS)[number];
const LIST_LABELS: Record<ListField, string> = { responsibilities: 'Responsabilidades', requirements: 'Requisitos', benefits: 'Benefícios' };

const LOCATION_SUGGESTIONS = ['Évora, Portugal', 'São João da Talha, Portugal', 'Monção, Portugal', 'Remoto / Portugal'];

const toInput = (job: JobPosting): JobInput => {
  const { id: _id, created_at: _c, updated_at: _u, ...rest } = job;
  return rest;
};

/** Lists are edited as one item per line. */
type Drafts = Record<`${ListField}_${'pt' | 'en'}`, string>;
const toDrafts = (job: JobInput): Drafts =>
  Object.fromEntries(
    LIST_FIELDS.flatMap((f) => (['pt', 'en'] as const).map((l) => [`${f}_${l}`, job[`${f}_${l}`].join('\n')]))
  ) as Drafts;
const parseLines = (text: string) =>
  text
    .split('\n')
    .map((l) => l.replace(/^\s*[-•*]\s*/, '').trim())
    .filter(Boolean);

const JobEditor = () => {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState<JobInput>(EMPTY);
  const [drafts, setDrafts] = useState<Drafts>(toDrafts(EMPTY));
  const [snapshot, setSnapshot] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [loadError, setLoadError] = useState<unknown>(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'pt' | 'en'>('pt');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const load = (job: JobInput) => {
    const d = toDrafts(job);
    setForm(job);
    setDrafts(d);
    setSnapshot(JSON.stringify([job, d]));
  };

  useEffect(() => {
    if (isNew) {
      setSnapshot(JSON.stringify([EMPTY, toDrafts(EMPTY)]));
      return;
    }
    adminGetJob(id!)
      .then((job) => {
        if (!job) throw new Error('Vaga não encontrada.');
        load(toInput(job));
      })
      .catch(setLoadError)
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const dirty = useMemo(() => JSON.stringify([form, drafts]) !== snapshot, [form, drafts, snapshot]);
  useUnsavedChanges(dirty);

  const set = <K extends keyof JobInput>(key: K, value: JobInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as string]) setErrors(({ [key as string]: _removed, ...rest }) => rest);
  };

  const incomplete = {
    pt: !form.title_pt.trim() || !form.description_pt.trim(),
    en: !form.title_en.trim() || !form.description_en.trim(),
  };

  const save = async (e?: FormEvent, publish?: boolean) => {
    e?.preventDefault();
    const next: Record<string, string> = {};
    if (!form.title_pt.trim() && !form.title_en.trim()) next.title = 'Indique o título em pelo menos um idioma.';
    if (!form.location.trim()) next.location = 'Indique a localização.';
    if (form.linkedin_url && !/^https?:\/\/\S+/.test(form.linkedin_url)) next.linkedin_url = 'O URL deve começar por https://';
    setErrors(next);
    if (Object.keys(next).length) {
      toast('error', 'Corrija os campos assinalados.');
      return;
    }
    const lists = Object.fromEntries(Object.entries(drafts).map(([k, v]) => [k, parseLines(v)])) as Pick<JobInput, keyof Drafts>;
    const payload: JobInput = {
      ...form,
      ...lists,
      title_pt: form.title_pt.trim(),
      title_en: form.title_en.trim(),
      department_pt: form.department_pt.trim(),
      department_en: form.department_en.trim(),
      description_pt: form.description_pt.trim(),
      description_en: form.description_en.trim(),
      location: form.location.trim(),
      linkedin_url: form.linkedin_url?.trim() || null,
      is_published: publish ?? form.is_published,
    };
    setSaving(true);
    try {
      const result = await adminSaveJob(payload, id);
      load(toInput(result));
      toast('success', result.is_published ? 'Vaga guardada e publicada.' : 'Rascunho guardado.');
      if (isNew) navigate(`/admin/jobs/${result.id}`, { replace: true });
    } catch (err) {
      toast('error', describeError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-primary"><Spinner /></div>;
  if (loadError) return <ErrorBox error={loadError} />;

  const l = tab;

  return (
    <form onSubmit={(e) => save(e)}>
      <PageHeader
        title={isNew ? 'Nova vaga' : 'Editar vaga'}
        description={isNew ? 'Preencha a informação em português e em inglês.' : form.title_pt || form.title_en}
        actions={
          <>
            <Link to="/admin/jobs" className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100">← Voltar</Link>
            {!isNew && form.is_published && (
              <a href={`/careers?job=${id}`} target="_blank" rel="noopener noreferrer" className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 ring-1 ring-gray-300 hover:bg-gray-50">
                Ver no site ↗
              </a>
            )}
            <Button type="submit" variant="secondary" loading={saving} disabled={!dirty && !isNew}>Guardar</Button>
            {!form.is_published && <Button onClick={() => save(undefined, true)} loading={saving}>Guardar e publicar</Button>}
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <LangTabs value={tab} onChange={setTab} incomplete={incomplete} />
            {dirty && <Badge tone="amber">Alterações por guardar</Badge>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={`Título (${l.toUpperCase()})`} htmlFor="title" required error={errors.title}>
              <TextInput id="title" value={form[`title_${l}`]} maxLength={120} onChange={(e) => set(`title_${l}`, e.target.value)} placeholder={l === 'pt' ? 'Ex.: Engenheiro(a) de Software' : 'e.g. Software Engineer'} />
            </Field>
            <Field label={`Departamento (${l.toUpperCase()})`} htmlFor="department">
              <TextInput id="department" value={form[`department_${l}`]} maxLength={80} onChange={(e) => set(`department_${l}`, e.target.value)} placeholder={l === 'pt' ? 'Ex.: Engenharia' : 'e.g. Engineering'} />
            </Field>
          </div>

          <Field label={`Descrição (${l.toUpperCase()})`} htmlFor="description" hint="Resumo da função, mostrado no cartão da vaga e no topo do detalhe.">
            <TextArea id="description" rows={4} value={form[`description_${l}`]} onChange={(e) => set(`description_${l}`, e.target.value)} />
          </Field>

          {LIST_FIELDS.map((field) => (
            <Field
              key={field}
              label={`${LIST_LABELS[field]} (${l.toUpperCase()})`}
              htmlFor={field}
              hint="Um item por linha."
              aside={<span className="text-xs text-gray-400">{parseLines(drafts[`${field}_${l}`]).length} itens</span>}
            >
              <TextArea id={field} rows={6} value={drafts[`${field}_${l}`]} onChange={(e) => setDrafts((d) => ({ ...d, [`${field}_${l}`]: e.target.value }))} />
            </Field>
          ))}
        </Card>

        <div className="space-y-6">
          <Card className="p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Publicação</h2>
            <Toggle checked={form.is_published} onChange={(v) => set('is_published', v)} label="Publicada" description="Visível na página de carreiras" />
            <Field label="Data de publicação" htmlFor="posted_at">
              <TextInput id="posted_at" type="date" value={form.posted_at} onChange={(e) => set('posted_at', e.target.value)} />
            </Field>
          </Card>

          <Card className="p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Detalhes</h2>
            <Field label="Tipo de contrato" htmlFor="type">
              <Select id="type" value={form.type} onChange={(e) => set('type', e.target.value as JobInput['type'])}>
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>{JOB_TYPE_LABELS[t]}</option>
                ))}
              </Select>
            </Field>
            <Field label="Localização" htmlFor="location" required error={errors.location}>
              <TextInput id="location" list="location-suggestions" value={form.location} onChange={(e) => set('location', e.target.value)} />
              <datalist id="location-suggestions">
                {LOCATION_SUGGESTIONS.map((loc) => <option key={loc} value={loc} />)}
              </datalist>
            </Field>
            <Toggle checked={form.is_remote} onChange={(v) => set('is_remote', v)} label="Permite trabalho remoto" />
            <Field label="Ligação LinkedIn (opcional)" htmlFor="linkedin_url" error={errors.linkedin_url} hint="Mostra o botão “Candidatar via LinkedIn”.">
              <TextInput id="linkedin_url" type="url" placeholder={COMPANY.linkedInJobs} value={form.linkedin_url ?? ''} onChange={(e) => set('linkedin_url', e.target.value || null)} />
            </Field>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default JobEditor;
