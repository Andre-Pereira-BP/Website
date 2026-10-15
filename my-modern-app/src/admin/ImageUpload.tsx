import { DragEvent, useRef, useState } from 'react';
import { uploadNewsImage } from '../lib/content';
import { Button, describeError, Spinner } from './ui';

const MAX_SOURCE_BYTES = 15 * 1024 * 1024;

/** Drag & drop image picker: compresses to WebP in the browser and uploads to Supabase Storage. */
const ImageUpload = ({
  value,
  onChange,
  onUploaded,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  onUploaded?: (url: string) => void;
}) => {
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError('');
    if (!file.type.startsWith('image/')) return setError('Escolha um ficheiro de imagem (JPG, PNG, WebP ou GIF).');
    if (file.size > MAX_SOURCE_BYTES) return setError('A imagem é demasiado grande (máximo 15 MB).');
    setUploading(true);
    try {
      const url = await uploadNewsImage(file);
      onUploaded?.(url);
      onChange(url);
    } catch (err) {
      setError(describeError(err));
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative overflow-hidden rounded-xl border-2 border-dashed transition-colors ${dragging ? 'border-primary bg-primary/5' : 'border-gray-300 bg-gray-50'}`}
      >
        {value ? (
          <div className="group relative aspect-[16/9]">
            <img src={value} alt="Pré-visualização da imagem" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
              <Button size="sm" variant="secondary" onClick={() => input.current?.click()}>Substituir</Button>
              <Button size="sm" variant="danger" onClick={() => onChange(null)}>Remover</Button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => input.current?.click()} className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 p-6 text-center">
            <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold text-primary">Carregar imagem</span>
            <span className="text-xs text-gray-500">ou arraste para aqui · JPG, PNG, WebP · recomendado 1600×900</span>
          </button>
        )}
        {uploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80 text-primary">
            <Spinner />
            <span className="text-sm font-semibold">A otimizar e carregar…</span>
          </div>
        )}
      </div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <p className="mt-2 text-xs text-gray-500">A imagem é redimensionada e convertida para WebP automaticamente, para carregar depressa.</p>
    </div>
  );
};

export default ImageUpload;
