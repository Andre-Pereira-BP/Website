import { useMemo, useState } from 'react';
import { DEPARTMENTS } from '../../config/company';
import { adminDeleteMessage, adminListMessages, adminUpdateMessage } from '../../lib/content';
import { ContactMessage, MessageStatus } from '../../lib/types';
import { useAsync } from '../../lib/useAsync';
import { Badge, Button, Card, ConfirmDialog, describeError, EmptyState, ErrorBox, formatDateTime, PageHeader, Spinner, useToast } from '../ui';

const DEPARTMENT_LABELS: Record<string, string> = { sales: 'Comercial', engineering: 'Engenharia', support: 'Suporte Técnico', general: 'Geral' };
const STATUS_LABELS: Record<MessageStatus, string> = { new: 'Nova', read: 'Lida', archived: 'Arquivada' };

const Messages = () => {
  const { data, loading, error, reload } = useAsync(() => adminListMessages());
  const [filter, setFilter] = useState<'inbox' | 'archived'>('inbox');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const items = useMemo(() => (data ?? []).filter((m) => (filter === 'archived' ? m.status === 'archived' : m.status !== 'archived')), [data, filter]);
  const selected = data?.find((m) => m.id === selectedId) ?? null;

  const setStatus = async (message: ContactMessage, status: MessageStatus, notice?: string) => {
    try {
      await adminUpdateMessage(message.id, status);
      if (notice) toast('success', notice);
      reload();
    } catch (err) {
      toast('error', describeError(err));
    }
  };

  const open = (message: ContactMessage) => {
    setSelectedId(message.id);
    if (message.status === 'new') setStatus(message, 'read');
  };

  const deptEmail = (id: string) => DEPARTMENTS.find((d) => d.id === id)?.email;

  return (
    <>
      <PageHeader title="Mensagens" description="Pedidos recebidos através do formulário da página de Contactos." />
      {error ? (
        <ErrorBox error={error} onRetry={reload} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-2 overflow-hidden">
            <div className="border-b border-gray-100 p-4">
              <div className="inline-flex rounded-lg bg-gray-100 p-1">
                {(
                  [
                    ['inbox', 'Caixa de entrada'],
                    ['archived', 'Arquivadas'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFilter(value)}
                    className={`rounded-md px-3 py-1.5 text-sm font-semibold ${filter === value ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="p-12 text-center text-primary"><Spinner /></div>
            ) : items.length === 0 ? (
              <EmptyState title={filter === 'inbox' ? 'Sem mensagens' : 'Sem mensagens arquivadas'} />
            ) : (
              <ul className="max-h-[70vh] divide-y divide-gray-100 overflow-y-auto">
                {items.map((m) => (
                  <li key={m.id}>
                    <button type="button" onClick={() => open(m)} className={`w-full px-4 py-3 text-left transition-colors ${selectedId === m.id ? 'bg-primary/5' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`truncate ${m.status === 'new' ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>{m.name}</span>
                        <span className="flex-shrink-0 text-xs text-gray-400">{formatDateTime(m.created_at)}</span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2">
                        {m.status === 'new' && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-secondary" aria-label="Nova" />}
                        <p className="truncate text-xs text-gray-500">{DEPARTMENT_LABELS[m.department] ?? m.department} · {m.message}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="lg:col-span-3 p-6">
            {selected ? (
              <div className="space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
                    <p className="text-sm text-gray-500">{formatDateTime(selected.created_at)} · idioma {selected.language?.toUpperCase() ?? '—'}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge tone="blue">{DEPARTMENT_LABELS[selected.department] ?? selected.department}</Badge>
                    <Badge>{STATUS_LABELS[selected.status]}</Badge>
                  </div>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Email</dt>
                    <dd><a href={`mailto:${selected.email}`} className="font-semibold text-primary hover:underline break-all">{selected.email}</a></dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Empresa</dt>
                    <dd className="font-semibold">{selected.company || '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Telefone</dt>
                    <dd className="font-semibold">{selected.phone ? <a href={`tel:${selected.phone}`}>{selected.phone}</a> : '—'}</dd>
                  </div>
                </dl>
                <p className="whitespace-pre-line rounded-xl bg-gray-50 p-5 text-gray-800 ring-1 ring-gray-100">{selected.message}</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`mailto:${selected.email}?subject=${encodeURIComponent('Re: o seu contacto com a BridgePoint')}${deptEmail(selected.department) ? `&cc=${deptEmail(selected.department)}` : ''}`}
                    className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light"
                  >
                    ✉ Responder
                  </a>
                  {selected.status !== 'archived' ? (
                    <Button variant="secondary" onClick={() => setStatus(selected, 'archived', 'Mensagem arquivada.')}>Arquivar</Button>
                  ) : (
                    <Button variant="secondary" onClick={() => setStatus(selected, 'read', 'Mensagem reposta na caixa de entrada.')}>Repor</Button>
                  )}
                  {selected.status === 'read' && <Button variant="ghost" onClick={() => setStatus(selected, 'new')}>Marcar como não lida</Button>}
                  <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => setToDelete(selected)}>Eliminar</Button>
                </div>
              </div>
            ) : (
              <EmptyState title="Selecione uma mensagem" />
            )}
          </Card>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        danger
        title="Eliminar mensagem?"
        text={<>A mensagem de <strong>{toDelete?.name}</strong> será eliminada permanentemente.</>}
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={async () => {
          if (!toDelete) return;
          setDeleting(true);
          try {
            await adminDeleteMessage(toDelete.id);
            toast('success', 'Mensagem eliminada.');
            setToDelete(null);
            setSelectedId(null);
            reload();
          } catch (err) {
            toast('error', describeError(err));
          } finally {
            setDeleting(false);
          }
        }}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
};

export default Messages;
