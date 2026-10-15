import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminGetNews, adminSaveNews, NewsInput, removeOwnedNewsImage } from '../../lib/content';
import { RichText } from '../../lib/richText';
import { NEWS_CATEGORIES, NewsArticle } from '../../lib/types';
import ImageUpload from '../ImageUpload';
import { useUnsavedChanges } from '../useUnsavedChanges';
import { CATEGORY_LABELS } from './NewsList';
import {
  Badge,
  Button,
  Card,
  CharCount,
  describeError,
  ErrorBox,
  Field,
  LangTabs,
  PageHeader,
  Select,
  slugify,
  Spinner,
  TextArea,
  TextInput,
  today,
  Toggle,
  useToast,
} from '../ui';

const EMPTY: NewsInput = {
  slug: '',
  category: 'company',
  title_pt: '',
  title_en: '',
  summary_pt: '',
  summary_en: '',
  content_pt: '',
  content_en: '',
  image_url: null,
  source_url: null,
  published_at: today(),
  is_published: false,
  is_featured: false,
};

const toInput = (n: NewsArticle): NewsInput => {
  const { id: _id, created_at: _c, updated_at: _u, ...rest } = n;
  return rest;
};

const NewsEditor = () => {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState<NewsInput>(EMPTY);
  const [saved, setSaved] = useState<NewsInput>(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [loadError, setLoadError] = useState<unknown>(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'pt' | 'en'>('pt');
  const [preview, setPreview] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Images uploaded in this session that are not (yet) saved — cleaned up if abandoned
  const pendingUploads = useRef<Set<string>>(new Set());
  const savedImage = useRef<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    adminGetNews(id!)
      .then((n) => {
        if (!n) throw new Error('Notícia não encontrada.');
        const input = toInput(n);
        setForm(input);
        setSaved(input);
        savedImage.current = n.image_url;
      })
      .catch(setLoadError)
      .finally(() => setLoading(false));
  }, [id, isNew]);

  useEffect(
    () => () => {
      pendingUploads.current.forEach((url) => url !== savedImage.current && removeOwnedNewsImage(url));
    },
    []
  );

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved]);
  useUnsavedChanges(dirty);

  const set = <K extends keyof NewsInput>(key: K, value: NewsInput[K]) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (!slugTouched && (key === 'title_en' || key === 'title_pt')) next.slug = slugify(next.title_en || next.title_pt);
      return next;
    });
    if (errors[key as string]) setErrors(({ [key as string]: _removed, ...rest }) => rest);
  };

  const incomplete = {
    pt: !form.title_pt.trim() || !form.content_pt.trim(),
    en: !form.title_en.trim() || !form.content_en.trim(),
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.title_pt.trim() && !form.title_en.trim()) next.title = 'Indique o título em pelo menos um idioma.';
    if (!form.content_pt.trim() && !form.content_en.trim()) next.content = 'Escreva o conteúdo em pelo menos um idioma.';
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(form.slug)) next.slug = 'Use apenas letras minúsculas, números e hífenes (ex.: nova-parceria-2025).';
    if (form.source_url && !/^https?:\/\/\S+/.test(form.source_url)) next.source_url = 'O URL deve começar por http:// ou https://';
    if (form.summary_pt.length > 300 || form.summary_en.length > 300) next.summary = 'O resumo não deve ter mais de 300 caracteres.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const save = async (e?: FormEvent, publish?: boolean) => {
    e?.preventDefault();
    if (!validate()) {
      toast('error', 'Corrija os campos assinalados.');
      return;
    }
    setSaving(true);
    const payload: NewsInput = {
      ...form,
      title_pt: form.title_pt.trim(),
      title_en: form.title_en.trim(),
      summary_pt: form.summary_pt.trim(),
      summary_en: form.summary_en.trim(),
      source_url: form.source_url?.trim() || null,
      is_published: publish ?? form.is_published,
    };
    try {
      const result = await adminSaveNews(payload, id);
      // The previous image is no longer referenced: remove it from storage
      if (savedImage.current && savedImage.current !== result.image_url) await removeOwnedNewsImage(savedImage.current);
      savedImage.current = result.image_url;
      pendingUploads.current.delete(result.image_url ?? '');
      const input = toInput(result);
      setForm(input);
      setSaved(input);
      toast('success', result.is_published ? 'Notícia guardada e publicada.' : 'Rascunho guardado.');
      if (isNew) navigate(`/admin/news/${result.id}`, { replace: true });
    } catch (err) {
      toast('error', describeError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-primary"><Spinner /></div>;
  if (loadError) return <ErrorBox error={loadError} />;

  const title = tab === 'pt' ? form.title_pt : form.title_en;
  const summary = tab === 'pt' ? form.summary_pt : form.summary_en;
  const content = tab === 'pt' ? form.content_pt : form.content_en;

  return (
    <form onSubmit={(e) => save(e)}>
      <PageHeader
        title={isNew ? 'Nova notícia' : 'Editar notícia'}
        description={isNew ? 'Preencha o conteúdo em português e em inglês.' : form.title_pt || form.title_en}
        actions={
          <>
            <Link to="/admin/news" className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100">← Voltar</Link>
            {!isNew && form.is_published && (
              <a href={`/pt/news/${saved.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 ring-1 ring-gray-300 hover:bg-gray-50">
                Ver no site ↗
              </a>
            )}
            <Button type="submit" variant="secondary" loading={saving} disabled={!dirty && !isNew}>
              Guardar
            </Button>
            {!form.is_published && (
              <Button onClick={() => save(undefined, true)} loading={saving}>
                Guardar e publicar
              </Button>
            )}
          </>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <LangTabs value={tab} onChange={setTab} incomplete={incomplete} />
            {dirty && <Badge tone="amber">Alterações por guardar</Badge>}
          </div>

          <Field label={`Título (${tab.toUpperCase()})`} htmlFor="title" error={errors.title} required aside={<CharCount value={title} max={120} />}>
            <TextInput
              id="title"
              value={title}
              maxLength={160}
              onChange={(e) => set(tab === 'pt' ? 'title_pt' : 'title_en', e.target.value)}
              placeholder={tab === 'pt' ? 'Ex.: BridgePoint renova certificação ISO 9001' : 'e.g. BridgePoint renews ISO 9001 certification'}
            />
          </Field>

          <Field
            label={`Resumo (${tab.toUpperCase()})`}
            htmlFor="summary"
            error={errors.summary}
            hint="Aparece nos cartões de notícia e na pré-visualização em redes sociais e no Google."
            aside={<CharCount value={summary} max={300} />}
          >
            <TextArea id="summary" rows={3} value={summary} onChange={(e) => set(tab === 'pt' ? 'summary_pt' : 'summary_en', e.target.value)} />
          </Field>

          <Field
            label={`Conteúdo (${tab.toUpperCase()})`}
            htmlFor="content"
            error={errors.content}
            required
            aside={
              <button type="button" onClick={() => setPreview((p) => !p)} className="text-xs font-semibold text-primary hover:underline">
                {preview ? 'Editar' : 'Pré-visualizar'}
              </button>
            }
            hint={
              <>
                Linha em branco = novo parágrafo · <code>## </code>subtítulo · <code>- </code>item de lista · <code>**negrito**</code> · <code>[texto](https://…)</code> ligação
              </>
            }
          >
            {preview ? (
              <div className="min-h-[320px] rounded-lg ring-1 ring-gray-200 p-5 bg-white">
                <RichText content={content || 'Sem conteúdo.'} className="prose max-w-none" />
              </div>
            ) : (
              <TextArea id="content" rows={16} value={content} onChange={(e) => set(tab === 'pt' ? 'content_pt' : 'content_en', e.target.value)} className="font-mono text-[13px] leading-relaxed" />
            )}
          </Field>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Publicação</h2>
            <Toggle checked={form.is_published} onChange={(v) => set('is_published', v)} label="Publicada" description="Visível no website" />
            <Toggle checked={form.is_featured} onChange={(v) => set('is_featured', v)} label="Destaque" description="Aparece em grande no topo da página de notícias" />
            <Field label="Data" htmlFor="published_at">
              <TextInput id="published_at" type="date" value={form.published_at} onChange={(e) => set('published_at', e.target.value)} />
            </Field>
            <Field label="Categoria" htmlFor="category">
              <Select id="category" value={form.category} onChange={(e) => set('category', e.target.value as NewsInput['category'])}>
                {NEWS_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </Select>
            </Field>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="font-bold text-gray-900">Imagem</h2>
            <ImageUpload value={form.image_url} onChange={(url) => set('image_url', url)} onUploaded={(url) => pendingUploads.current.add(url)} />
          </Card>

          <Card className="p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Avançado</h2>
            <Field
              label="Endereço (slug)"
              htmlFor="slug"
              error={errors.slug}
              hint={
                <>
                  /news/<strong>{form.slug || '…'}</strong>
                  {!isNew && form.slug !== saved.slug && <span className="block text-amber-700">Atenção: alterar o endereço quebra ligações já partilhadas.</span>}
                </>
              }
            >
              <TextInput
                id="slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set('slug', slugify(e.target.value) + (e.target.value.endsWith('-') ? '-' : ''));
                }}
              />
            </Field>
            <Field label="Fonte (URL opcional)" htmlFor="source_url" error={errors.source_url}>
              <TextInput id="source_url" type="url" placeholder="https://…" value={form.source_url ?? ''} onChange={(e) => set('source_url', e.target.value || null)} />
            </Field>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default NewsEditor;
