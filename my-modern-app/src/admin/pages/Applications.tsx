import { useEffect, useMemo, useState } from 'react';
import { adminDeleteApplication, adminGetCvUrl, adminListApplications, adminUpdateApplication } from '../../lib/content';
import { APPLICATION_STATUSES, ApplicationStatus, JobApplication } from '../../lib/types';
import { useAsync } from '../../lib/useAsync';
import { Badge, Button, Card, ConfirmDialog, describeError, EmptyState, ErrorBox, Field, formatDateTime, PageHeader, Select, Spinner, TextArea, TextInput, useToast } from '../ui';

const STATUS: Record<ApplicationStatus, { label: string; tone: 'green' | 'blue' | 'amber' | 'red' | 'violet' }> = {
  new: { label: 'Nova', tone: 'green' },
  reviewing: { label: 'Em análise', tone: 'blue' },
  contacted: { label: 'Contactado', tone: 'violet' },
  rejected: { label: 'Não selecionado', tone: 'red' },
  hired: { label: 'Contratado', tone: 'amber' },
};

const toCsv = (rows: JobApplication[]) => {
  const header = ['Data', 'Nome', 'Apelido', 'Email', 'Telefone', 'LinkedIn', 'Vaga', 'Estado'];
  const escape = (v: string | null) => `"${(v ?? '').replace(/"/g, '""')}"`;
  return [header.join(';'), ...rows.map((a) => [formatDateTime(a.created_at), a.first_name, a.last_name, a.email, a.phone, a.linkedin_url, a.job_title || 'Espontânea', STATUS[a.status].label].map(escape).join(';'))].join('\n');
};

const ApplicationDetail = ({ application, onChanged, onDelete }: { application: JobApplication; onChanged: () => void; onDelete: () => void }) => {
  const toast = useToast();
  const [notes, setNotes] = useState(application.notes ?? '');
  const [savingNotes, setSavingNotes] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => setNotes(application.notes ?? ''), [application.id, application.notes]);

  const update = async (patch: { status?: ApplicationStatus; notes?: string | null }, message: string) => {
    try {
      await adminUpdateApplication(application.id, patch);
      toast('success', message);
      onChanged();
    } catch (err) {
      toast('error', describeError(err));
    }
  };

  const downloadCv = async () => {
    setDownloading(true);
    try {
      window.open(await adminGetCvUrl(application.cv_path), '_blank', 'noopener');
      if (application.status === 'new') await update({ status: 'reviewing' }, 'Candidatura marcada como “Em análise”.');
    } catch (err) {
      toast('error', describeError(err));
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{application.first_name} {application.last_name}</h2>
          <p className="text-sm text-gray-500">{application.job_title || 'Candidatura espontânea'} · {formatDateTime(application.created_at)}</p>
        </div>
        <Badge tone={STATUS[application.status].tone}>{STATUS[application.status].label}</Badge>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-gray-500">Email</dt>
          <dd><a className="font-semibold text-primary hover:underline break-all" href={`mailto:${application.email}`}>{application.email}</a></dd>
        </div>
        <div>
          <dt className="text-gray-500">Telefone</dt>
          <dd className="font-semibold">{application.phone ? <a href={`tel:${application.phone}`} className="hover:text-primary">{application.phone}</a> : '—'}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-gray-500">LinkedIn</dt>
          <dd className="font-semibold break-all">
            {application.linkedin_url ? <a href={application.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{application.linkedin_url}</a> : '—'}
          </dd>
        </div>
      </dl>

      {application.cover_letter && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Carta de apresentação</h3>
          <p className="whitespace-pre-line rounded-xl bg-gray-50 p-4 text-sm text-gray-700 ring-1 ring-gray-100">{application.cover_letter}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={downloadCv} loading={downloading}>⬇ Descarregar CV</Button>
        <a href={`mailto:${application.email}?subject=${encodeURIComponent(`BridgePoint – ${application.job_title || 'Candidatura'}`)}`} className="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50">
          Responder por email
        </a>
      </div>

      <Field label="Estado" htmlFor="app-status">
        <Select id="app-status" value={application.status} onChange={(e) => update({ status: e.target.value as ApplicationStatus }, 'Estado atualizado.')}>
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS[s].label}</option>
          ))}
        </Select>
      </Field>

      <Field label="Notas internas" htmlFor="app-notes" hint="Visíveis apenas para administradores.">
        <TextArea id="app-notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </Field>
      <div className="flex justify-between gap-2">
        <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={onDelete}>Eliminar candidatura</Button>
        <Button
          variant="secondary"
          loading={savingNotes}
          disabled={notes === (application.notes ?? '')}
          onClick={async () => {
            setSavingNotes(true);
            await update({ notes: notes.trim() || null }, 'Notas guardadas.');
            setSavingNotes(false);
          }}
        >
          Guardar notas
        </Button>
      </div>
      <p className="text-xs text-gray-400">
        RGPD: conserve as candidaturas apenas durante o período indicado na Política de Privacidade (12 meses) e elimine-as depois.
      </p>
    </div>
  );
};

const Applications = () => {
  const { data, loading, error, reload } = useAsync(() => adminListApplications());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [query, setQuery] = useState('');
  const [toDelete, setToDelete] = useState<JobApplication | null>(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data ?? []).filter(
      (a) => (statusFilter === 'all' || a.status === statusFilter) && (!q || `${a.first_name} ${a.last_name} ${a.email} ${a.job_title ?? ''}`.toLowerCase().includes(q))
    );
  }, [data, statusFilter, query]);
  const selected = data?.find((a) => a.id === selectedId) ?? null;

  const exportCsv = () => {
    const blob = new Blob(['﻿' + toCsv(items)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), { href: url, download: `candidaturas-${new Date().toISOString().slice(0, 10)}.csv` });
    link.click();
    URL.revokeObjectURL(url);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await adminDeleteApplication(toDelete);
      toast('success', 'Candidatura e CV eliminados.');
      setToDelete(null);
      setSelectedId(null);
      reload();
    } catch (err) {
      toast('error', describeError(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Candidaturas"
        description="Candidaturas recebidas através do website. Os CVs ficam guardados de forma privada e só são acessíveis aqui."
        actions={data?.length ? <Button variant="secondary" onClick={exportCsv}>Exportar CSV</Button> : undefined}
      />

      {error ? (
        <ErrorBox error={error} onRetry={reload} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-2 overflow-hidden">
            <div className="space-y-3 border-b border-gray-100 p-4">
              <TextInput type="search" placeholder="Pesquisar nome, email ou vaga…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Pesquisar candidaturas" />
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'all')} aria-label="Filtrar por estado">
                <option value="all">Todos os estados</option>
                {APPLICATION_STATUSES.map((s) => (
                  <option key={s} value={s}>{STATUS[s].label}</option>
                ))}
              </Select>
            </div>
            {loading ? (
              <div className="p-12 text-center text-primary"><Spinner /></div>
            ) : items.length === 0 ? (
              <EmptyState title={data?.length ? 'Nenhuma candidatura corresponde ao filtro' : 'Ainda não há candidaturas'} />
            ) : (
              <ul className="max-h-[70vh] divide-y divide-gray-100 overflow-y-auto">
                {items.map((a) => (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(a.id)}
                      className={`w-full px-4 py-3 text-left transition-colors ${selectedId === a.id ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`truncate ${a.status === 'new' ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{a.first_name} {a.last_name}</span>
                        <Badge tone={STATUS[a.status].tone}>{STATUS[a.status].label}</Badge>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-gray-500">{a.job_title || 'Candidatura espontânea'} · {formatDateTime(a.created_at)}</p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card className="lg:col-span-3 p-6">
            {selected ? (
              <ApplicationDetail application={selected} onChanged={reload} onDelete={() => setToDelete(selected)} />
            ) : (
              <EmptyState title="Selecione uma candidatura" text="Os detalhes e o CV aparecem aqui." />
            )}
          </Card>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        danger
        title="Eliminar candidatura?"
        text={<>A candidatura de <strong>{toDelete?.first_name} {toDelete?.last_name}</strong> e o respetivo CV serão eliminados permanentemente.</>}
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
};

export default Applications;
