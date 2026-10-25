import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';

const TRUST_ITEMS = [
  'Qualiopi',
  `${formatNoteSatisfactionSur5()} de satisfaction`,
  'Présentiel Île-de-France',
  'Formateurs issus du BTP',
] as const;

/** Bandeau de confiance sous le H1 — réassurance (sans bande logos). */
export function FormateursTrustStrip() {
  return (
    <p
      className="formateurs-trust-strip mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ofc-ink-muted sm:text-sm"
      aria-label="Garanties et preuves"
    >
      {TRUST_ITEMS.map((label, index) => (
        <span key={label} className="inline-flex items-center gap-2">
          {index > 0 ? (
            <span className="text-ofc-ink-subtle" aria-hidden>
              ·
            </span>
          ) : null}
          <span>{label}</span>
        </span>
      ))}
    </p>
  );
}
