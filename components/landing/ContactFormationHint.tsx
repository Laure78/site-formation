'use client';

import { useSearchParams } from 'next/navigation';

/** Bandeau optionnel « formation évoquée » depuis `?formation=` (contact). */
export function ContactFormationHint() {
  const formationHint = useSearchParams().get('formation');
  if (!formationHint) return null;

  return (
    <p className="rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-sm text-slate-700">
      <span className="font-medium">Formation évoquée :</span> {formationHint}
    </p>
  );
}
