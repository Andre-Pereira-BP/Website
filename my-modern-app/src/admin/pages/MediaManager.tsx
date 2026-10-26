import { DragEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatBytes, MEDIA_GROUPS, MEDIA_KEYS, MEDIA_SLOTS, MediaGroupId, MediaKey, MediaSlot } from '../../config/media';
import { adminListMedia, adminReplaceMedia, adminResetMedia, MEDIA_DOCUMENT_MAX_BYTES, MEDIA_IMAGE_MAX_BYTES, SiteMediaRow } from '../../lib/content';
import { Badge, Button, ConfirmDialog, describeError, ErrorBox, PageHeader, Spinner, useToast } from '../ui';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const slotOf = (key: MediaKey): MediaSlot => MEDIA_SLOTS[key];

/** Reason the file cannot be used for this slot, or null. */
function validate(slot: MediaSlot, file: File): string | null {
  if (slot.kind === 'image') {
    if (!IMAGE_TYPES.includes(file.type)) return 'Escolha uma imagem JPG, PNG, WebP ou GIF.';
    if (file.size > MEDIA_IMAGE_MAX_BYTES) return 'A imagem é demasiado grande (máximo 15 MB).';
  } else {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) return 'Escolha um ficheiro PDF.';
    if (file.size > MEDIA_DOCUMENT_MAX_BYTES) return 'O ficheiro é demasiado grande (máximo 20 MB).';
  }
  return null;
}

const PdfIcon = () => (
  <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const MediaTile = ({
  mediaKey,
  row,
  busy,
  onFile,
  onReset,
}: {
  mediaKey: MediaKey;
  row: SiteMediaRow | undefined;
  busy: boolean;
  onFile: (key: MediaKey, file: File) => void;
  onReset: (row: SiteMediaRow) => void;
}) => {
  const slot = slotOf(mediaKey);
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const url = row?.url ?? slot.src;
  const isLogo = slot.maxWidth !== undefined && slot.maxWidth <= 600;
  const bytes = row ? row.bytes : slot.bytes;
  const fileName = row?.name ?? slot.src?.split('/').pop();

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(mediaKey, file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 transition ${dragging ? 'ring-2 ring-primary' : 'ring-gray-200'}`}
    >
      <div className={`relative aspect-[4/3] ${isLogo || slot.kind === 'document' ? 'bg-gray-50' : 'bg-gray-100'}`}>
        {slot.kind === 'document' ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
            {url ? (
              <>
                <PdfIcon />
                <span className="line-clamp-2 break-all text-xs font-medium text-gray-600">{fileName}</span>
                {bytes ? <span className="text-xs text-gray-400">{formatBytes(bytes)}</span> : null}
              </>
            ) : (
              <>
                <svg className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs text-gray-500">Ainda sem ficheiro. O site mostra a versão do outro idioma.</span>
              </>
            )}
          </div>
        ) : (
          url && <img src={url} alt="" loading="lazy" className={`h-full w-full ${isLogo ? 'object-contain p-6' : 'object-cover'}`} />
        )}
        {row && (
          <span className="absolute left-3 top-3">
            <Badge tone="amber">Substituída</Badge>
          </span>
        )}
        {busy && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/85 text-primary">
            <Spinner />
            <span className="text-sm font-semibold">{slot.kind === 'image' ? 'A otimizar e carregar…' : 'A carregar…'}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-semibold text-gray-900">{slot.label}</p>
        <p className="mt-0.5 text-xs text-gray-500">{slot.kind === 'image' ? `Recomendado: ${slot.hint}` : 'PDF, máximo 20 MB'}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={() => input.current?.click()} disabled={busy}>
            {url ? 'Substituir' : 'Carregar'}
          </Button>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50">
              Abrir
            </a>
          )}
          {row && (
            <Button size="sm" variant="ghost" onClick={() => onReset(row)} disabled={busy}>
              {slot.src ? 'Repor original' : 'Remover'}
            </Button>
          )}
        </div>
      </div>
      <input
        ref={input}
        type="file"
        accept={slot.kind === 'image' ? IMAGE_TYPES.join(',') : 'application/pdf,.pdf'}
        className="sr-only"
        tabIndex={-1}
        aria-label={`Escolher ficheiro para ${slot.label}`}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(mediaKey, file);
          e.target.value = '';
        }}
      />
    </div>
  );
};

/** /admin/media — replace the images and documents shown on the website. */
const MediaManager = () => {
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const groupParam = params.get('group');
  const group: MediaGroupId = MEDIA_GROUPS.some((g) => g.id === groupParam) ? (groupParam as MediaGroupId) : 'home';
  const [rows, setRows] = useState<Map<string, SiteMediaRow> | null>(null);
  const [loadError, setLoadError] = useState<unknown>(null);
  const [busy, setBusy] = useState<Set<MediaKey>>(new Set());
  const [resetting, setResetting] = useState<SiteMediaRow | null>(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    setLoadError(null);
    adminListMedia()
      .then((list) => setRows(new Map(list.map((r) => [r.key, r]))))
      .catch(setLoadError);
  }, [nonce]);

  const sections = useMemo(() => {
    const map = new Map<string, MediaKey[]>();
    for (const key of MEDIA_KEYS) {
      const slot = slotOf(key);
      if (slot.group !== group) continue;
      if (!map.has(slot.section)) map.set(slot.section, []);
      map.get(slot.section)!.push(key);
    }
    return [...map.entries()];
  }, [group]);

  const replacedIn = (id: MediaGroupId) => (rows ? MEDIA_KEYS.filter((k) => rows.has(k) && slotOf(k).group === id).length : 0);

  const setKeyBusy = (key: MediaKey, value: boolean) =>
    setBusy((current) => {
      const next = new Set(current);
      if (value) next.add(key);
      else next.delete(key);
      return next;
    });

  const handleFile = async (key: MediaKey, file: File) => {
    const slot = slotOf(key);
    const problem = validate(slot, file);
    if (problem) return toast('error', problem);
    setKeyBusy(key, true);
    try {
      const row = await adminReplaceMedia(key, file, rows?.get(key));
      setRows((current) => new Map(current).set(key, row));
      toast('success', `${slot.kind === 'image' ? 'Imagem substituída' : 'Documento atualizado'}: ${slot.label}. Já aparece no site.`);
    } catch (err) {
      toast('error', describeError(err));
    } finally {
      setKeyBusy(key, false);
    }
  };

  const confirmReset = async () => {
    if (!resetting) return;
    setResetLoading(true);
    try {
      await adminResetMedia(resetting);
      setRows((current) => {
        const next = new Map(current);
        next.delete(resetting.key);
        return next;
      });
      toast('success', 'Reposto o ficheiro original.');
      setResetting(null);
    } catch (err) {
      toast('error', describeError(err));
    } finally {
      setResetLoading(false);
    }
  };

  const resettingSlot = resetting ? slotOf(resetting.key as MediaKey) : null;

  return (
    <>
      <PageHeader
        title="Imagens e ficheiros"
        description="Substitua as imagens e os documentos do site. Cada imagem fica no mesmo sítio da página; pode sempre repor a original."
      />

      <div role="tablist" aria-label="Página" className="mb-6 flex flex-wrap gap-2">
        {MEDIA_GROUPS.map((g) => {
          const count = replacedIn(g.id);
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={group === g.id}
              onClick={() => setParams({ group: g.id }, { replace: true })}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                group === g.id ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:text-primary'
              }`}
            >
              {g.label}
              {count > 0 && <span className={`rounded-full px-1.5 text-xs ${group === g.id ? 'bg-white/25' : 'bg-amber-100 text-amber-800'}`}>{count}</span>}
            </button>
          );
        })}
      </div>

      {loadError ? (
        <ErrorBox error={loadError} onRetry={() => setNonce((n) => n + 1)} />
      ) : !rows ? (
        <div className="flex justify-center py-20 text-primary">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <div className="space-y-10">
          {sections.map(([section, keys]) => (
            <section key={section}>
              <h2 className="mb-4 text-lg font-bold text-gray-900">{section}</h2>
              {slotOf(keys[0]).kind === 'document' && (
                <p className="-mt-2 mb-4 text-sm text-gray-500">
                  Cada documento tem uma versão por idioma: o site mostra a versão do idioma escolhido pelo visitante e, se não existir, a do outro idioma.
                </p>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {keys.map((key) => (
                  <MediaTile key={key} mediaKey={key} row={rows.get(key)} busy={busy.has(key)} onFile={handleFile} onReset={setResetting} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={resetting !== null}
        title={resettingSlot?.src ? 'Repor o ficheiro original?' : 'Remover este documento?'}
        text={
          resettingSlot?.src
            ? `"${resettingSlot.label}" volta a mostrar o ficheiro original do site. O ficheiro carregado é apagado.`
            : `"${resettingSlot?.label}" deixa de estar disponível; o site passa a mostrar a versão do outro idioma.`
        }
        confirmLabel={resettingSlot?.src ? 'Repor original' : 'Remover'}
        danger={!resettingSlot?.src}
        loading={resetLoading}
        onConfirm={confirmReset}
        onCancel={() => setResetting(null)}
      />
    </>
  );
};

export default MediaManager;
