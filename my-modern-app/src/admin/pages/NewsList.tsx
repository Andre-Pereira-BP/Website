import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminDeleteNews, adminListNews, adminSetNewsPublished } from '../../lib/content';
import { NewsArticle } from '../../lib/types';
import { useAsync } from '../../lib/useAsync';
import { Badge, Button, Card, ConfirmDialog, describeError, EmptyState, ErrorBox, formatDay, PageHeader, Spinner, TextInput, useToast } from '../ui';

export const CATEGORY_LABELS: Record<NewsArticle['category'], string> = {
  company: 'Empresa',
  technology: 'Tecnologia',
  events: 'Eventos',
  projects: 'Projetos',
};

const NewsList = () => {
  const { data, loading, error, reload } = useAsync(() => adminListNews());
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [toDelete, setToDelete] = useState<NewsArticle | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data ?? []).filter((n) => {
      if (status === 'published' && !n.is_published) return false;
      if (status === 'draft' && n.is_published) return false;
      return !q || `${n.title_pt} ${n.title_en} ${n.slug}`.toLowerCase().includes(q);
    });
  }, [data, query, status]);

  const togglePublished = async (article: NewsArticle) => {
    setBusy(article.id);
    try {
      await adminSetNewsPublished(article.id, !article.is_published);
      toast('success', article.is_published ? 'Notícia passada a rascunho.' : 'Notícia publicada.');
      reload();
    } catch (err) {
      toast('error', describeError(err));
    } finally {
      setBusy(null);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setBusy(toDelete.id);
    try {
      await adminDeleteNews(toDelete);
      toast('success', 'Notícia eliminada.');
      setToDelete(null);
      reload();
    } catch (err) {
      toast('error', describeError(err));
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <PageHeader
        title="Notícias"
        description="Crie, edite, publique ou remova notícias. As alterações ficam visíveis no website de imediato."
        actions={<Button onClick={() => navigate('/admin/news/new')}>＋ Nova notícia</Button>}
      />

      <Card>
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            {(
              [
                ['all', 'Todas'],
                ['published', 'Publicadas'],
                ['draft', 'Rascunhos'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatus(value)}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold ${status === value ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <TextInput type="search" placeholder="Pesquisar…" value={query} onChange={(e) => setQuery(e.target.value)} className="sm:w-64" aria-label="Pesquisar notícias" />
        </div>

        {error ? (
          <div className="p-4"><ErrorBox error={error} onRetry={reload} /></div>
        ) : loading ? (
          <div className="p-12 text-center text-primary"><Spinner /></div>
        ) : items.length === 0 ? (
          <EmptyState
            title={data?.length ? 'Nenhuma notícia corresponde à pesquisa' : 'Ainda não há notícias'}
            action={!data?.length && <Button onClick={() => navigate('/admin/news/new')}>Criar a primeira notícia</Button>}
          />
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((n) => (
              <li key={n.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <Link to={`/admin/news/${n.id}`} className="flex min-w-0 flex-1 items-center gap-4">
                  <img src={n.image_url || '/img/news/office.webp'} alt="" className="h-16 w-24 flex-shrink-0 rounded-lg object-cover bg-gray-100" loading="lazy" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900 hover:text-primary">{n.title_pt || n.title_en}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      {n.is_published ? <Badge tone="green">Publicada</Badge> : <Badge tone="gray">Rascunho</Badge>}
                      {n.is_featured && <Badge tone="amber">Destaque</Badge>}
                      <Badge tone="blue">{CATEGORY_LABELS[n.category]}</Badge>
                      <span>{formatDay(n.published_at)}</span>
                      {(!n.title_en || !n.content_en) && <Badge tone="red">Falta EN</Badge>}
                      {(!n.title_pt || !n.content_pt) && <Badge tone="red">Falta PT</Badge>}
                    </div>
                  </div>
                </Link>
                <div className="flex flex-shrink-0 items-center gap-2">
                  {n.is_published && (
                    <a href={`/pt/news/${n.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-100">
                      Ver ↗
                    </a>
                  )}
                  <Button size="sm" variant="secondary" loading={busy === n.id && !toDelete} onClick={() => togglePublished(n)}>
                    {n.is_published ? 'Despublicar' : 'Publicar'}
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => navigate(`/admin/news/${n.id}`)}>Editar</Button>
                  <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => setToDelete(n)} aria-label={`Eliminar ${n.title_pt}`}>
                    Eliminar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <ConfirmDialog
        open={Boolean(toDelete)}
        danger
        title="Eliminar notícia?"
        text={
          <>
            A notícia <strong>{toDelete?.title_pt || toDelete?.title_en}</strong> será eliminada permanentemente, incluindo a imagem carregada. Se apenas a quiser esconder, use “Despublicar”.
          </>
        }
        confirmLabel="Eliminar"
        loading={Boolean(toDelete && busy === toDelete.id)}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
};

export default NewsList;
