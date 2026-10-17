'use client';

import { useState } from 'react';
import { getCareerCvSignedUrlAction } from '@/app/admin/candidatures/actions';

export function CareerCvDownloadButton({
  storagePath,
  fileName,
}: {
  storagePath: string;
  fileName: string | null;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    const result = await getCareerCvSignedUrlAction(storagePath);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    window.open(result.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="text-sm font-medium text-[#377CF3] underline-offset-2 hover:underline disabled:opacity-60"
      >
        {loading ? 'Ouverture…' : fileName ?? 'Télécharger le CV'}
      </button>
      {error ? (
        <span className="text-xs text-red-600" role="alert">
          {error}
        </span>
      ) : null}
    </span>
  );
}
