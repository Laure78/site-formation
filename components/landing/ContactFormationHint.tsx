'use client';

/** Bandeau optionnel « formation évoquée » depuis `?formation=` (contact). */
export function ContactFormationHint({ formationHint }: { formationHint?: string | null }) {
  if (!formationHint) return null;

  return (
    <p className="rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-sm text-slate-700">
      <span className="font-medium">Formation évoquée :</span> {formationHint}
    </p>
  );
}
