'use client';

import { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

type Props = {
  text: string;
  className?: string;
};

/** Bouton copier pour blocs de prompts (page pilier Claude, etc.) */
export function CopyPromptButton({ text, className = '' }: Props) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          /* ignore */
        }
      }}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 ${className}`}
      aria-label={copied ? 'Texte copié' : 'Copier le texte dans le presse-papiers'}
    >
      {copied ? (
        <>
          <Check size={14} className="text-emerald-600" aria-hidden />
          Copié
        </>
      ) : (
        <>
          <Clipboard size={14} aria-hidden />
          Copier
        </>
      )}
    </button>
  );
}
