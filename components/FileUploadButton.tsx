'use client';

import { useRef, useState } from 'react';

interface Props {
  accept: string;
  onUrl: (url: string) => void;
}

const UPLOAD_ERROR_HINT = 'Alternative : placez votre PDF dans /public/formations/appels-offres/ puis utilisez l\'URL : /formations/appels-offres/nom-du-fichier.pdf';

export function FileUploadButton({ accept, onUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.set('file', file);
      formData.set('folder', 'lessons');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erreur upload');
      if (data.url) onUrl(data.url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de l\'upload';
      setErrorMsg(`${msg}. ${UPLOAD_ERROR_HINT}`);
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="shrink-0 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
      >
        {loading ? 'Upload…' : 'Déposer'}
      </button>
    </>
  );
}
