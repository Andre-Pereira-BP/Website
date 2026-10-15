import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminDeleteJob, adminListJobs, adminSaveJob, adminSetJobPublished, JobInput } from '../../lib/content';
import { JobPosting } from '../../lib/types';
import { useAsync } from '../../lib/useAsync';
import { Badge, Button, Card, ConfirmDialog, describeError, EmptyState, ErrorBox, formatDay, PageHeader, Spinner, today, useToast } from '../ui';

export const JOB_TYPE_LABELS: Record<JobPosting['type'], string> = {
  'full-time': 'Tempo inteiro',
  'part-time': 'Tempo parcial',
  contract: 'Prestação de serviços',
  internship: 'Estágio',
};

const JobsList = () => {
  const { data, loading, error, reload } = useAsync(() => adminListJobs());
  const [toDelete, setToDelete] = useState<JobPosting | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const run = async (jobId: string, action: () => Promise<unknown>, success: string) => {
    setBusy(jobId);
    try {
      await action();
      toast('success', success);
      reload();
    } catch (err) {
      toast('error', describeError(err));
    } finally {
      setBusy(null);
    }
  };

  const duplicate = (job: JobPosting) => {
    const { id: _id, created_at: _c, updated_at: _u, ...rest } = job;
    const copy: JobInput = { ...rest, title_pt: `${rest.title_pt} (cópia)`, title_en: rest.title_en ? `${rest.title_en} (copy)` : '', is_published: false, posted_at: today() };
    run(job.id, async () => {
      const created = await adminSaveJob(copy);
      navigate(`/admin/jobs/${created.id}`);
    }, 'Vaga duplicada como rascunho.');
  };

  return (
    <>
      <PageHeader
        title="Vagas"
        description="Adicione, edite ou remova vagas da página “Junte-se a Nós”. Despublique uma vaga quando o recrutamento terminar."
        actions={<Button onClick={() => navigate('/admin/jobs/new')}>＋ Nova vaga</Button>}
      />
      <Card>
        {error ? (
          <div className="p-4"><ErrorBox error={error} onRetry={reload} /></div>
        ) : loading ? (
          <div className="p-12 text-center text-primary"><Spinner /></div>
        ) : !data?.length ? (
          <EmptyState title="Ainda não há vagas" action={<Button onClick={() => navigate('/admin/jobs/new')}>Criar a primeira vaga</Button>} />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Vaga</th>
                  <th className="px-4 py-3">Local</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Publicada a</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3"><span className="sr-only">Ações</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/60">
                    <td className="px-4 py-3">
                      <Link to={`/admin/jobs/${job.id}`} className="font-semibold text-gray-900 hover:text-primary">{job.title_pt || job.title_en}</Link>
                      <p className="text-xs text-gray-500">{job.department_pt || job.department_en}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {job.location}
                      {job.is_remote && <span className="ml-1 text-xs text-emerald-700">· remoto</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{JOB_TYPE_LABELS[job.type]}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{formatDay(job.posted_at)}</td>
                    <td className="px-4 py-3">{job.is_published ? <Badge tone="green">Publicada</Badge> : <Badge>Rascunho</Badge>}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5 whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="secondary"
                          loading={busy === job.id && !toDelete}
                          onClick={() => run(job.id, () => adminSetJobPublished(job.id, !job.is_published), job.is_published ? 'Vaga despublicada.' : 'Vaga publicada.')}
                        >
                          {job.is_published ? 'Despublicar' : 'Publicar'}
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => navigate(`/admin/jobs/${job.id}`)}>Editar</Button>
                        <Button size="sm" variant="ghost" onClick={() => duplicate(job)}>Duplicar</Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => setToDelete(job)}>Eliminar</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <ConfirmDialog
        open={Boolean(toDelete)}
        danger
        title="Eliminar vaga?"
        text={
          <>
            A vaga <strong>{toDelete?.title_pt || toDelete?.title_en}</strong> será eliminada. As candidaturas já recebidas mantêm-se (ficam sem vaga associada).
          </>
        }
        confirmLabel="Eliminar"
        loading={Boolean(toDelete && busy === toDelete.id)}
        onConfirm={() => toDelete && run(toDelete.id, () => adminDeleteJob(toDelete.id), 'Vaga eliminada.').then(() => setToDelete(null))}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
};

export default JobsList;
