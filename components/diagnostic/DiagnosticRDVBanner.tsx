'use client';

import { useSearchParams } from 'next/navigation';
import { Award } from 'lucide-react';

export function DiagnosticRDVBanner() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source');
  const message = searchParams.get('message');

  if (source !== 'diagnostic') return null;

  return (
    <div className="mb-8 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
          <Award size={24} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="font-display font-bold text-slate-900">
            Bienvenue après votre diagnostic IA BTP
          </h2>
          <p className="mt-2 text-slate-700">
            {message
              ? decodeURIComponent(message.replace(/\+/g, ' '))
              : 'Planifiez un diagnostic IA personnalisé avec Laure Olivié.'}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Choisissez un créneau pour échanger 30 minutes et construire ensemble votre projet de formation IA.
          </p>
        </div>
      </div>
    </div>
  );
}
