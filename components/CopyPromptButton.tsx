'use client';

import { useId, useState } from 'react';
import { Clipboard, Check, AlertCircle } from 'lucide-react';

type Props = {
  text: string;
  className?: string;
  /** Libellé du bouton au repos (défaut : « Copier »). */
  label?: string;
};

type CopyStatus = 'idle' | 'success' | 'error';

/** Bouton copier pour blocs de prompts (page pilier Claude, etc.) */
export function CopyPromptButton({ text, className = '', label = 'Copier' }: Props) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const statusId = useId();

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setStatus('success');
            window.setTimeout(() => setStatus('idle'), 2000);
          } catch {
            setStatus('error');
            window.setTimeout(() => setStatus('idle'), 3000);
          }
        }}
        className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 ${className}`}
        aria-label={
          status === 'success'
            ? 'Prompt copié dans le presse-papiers'
            : status === 'error'
              ? 'Échec de la copie du prompt'
              : `${label} dans le presse-papiers`
        }
        aria-describedby={status !== 'idle' ? statusId : undefined}
      >
        {status === 'success' ? (
          <>
            <Check size={14} className="text-emerald-600" aria-hidden />
            Copié
          </>
        ) : status === 'error' ? (
          <>
            <AlertCircle size={14} className="text-red-600" aria-hidden />
            Échec
          </>
        ) : (
          <>
            <Clipboard size={14} aria-hidden />
            {label}
          </>
        )}
      </button>
      <span id={statusId} className="sr-only" aria-live="polite" role="status">
        {status === 'success'
          ? 'Prompt copié avec succès.'
          : status === 'error'
            ? 'Impossible de copier. Sélectionnez le texte manuellement.'
            : ''}
      </span>
    </span>
  );
}
