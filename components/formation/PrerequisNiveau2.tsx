import { PREREQUIS_NIVEAU_2 } from '@/lib/tarifs-sessions';

type Props = {
  /** Mentions complémentaires (documents à préparer, Cowork, etc.) */
  extras?: readonly string[];
  /** Titre de section (défaut : Prérequis) */
  heading?: string;
  /** Si true, rend une section H2 autonome (ex. avant objectifs pédagogiques) */
  asSection?: boolean;
  className?: string;
};

/**
 * Bloc prérequis commun aux fiches catalogue niveau 2.
 */
export function PrerequisNiveau2({
  extras,
  heading = 'Prérequis',
  asSection = false,
  className,
}: Props) {
  const list = (
    <ul className={`mt-2 list-disc space-y-1.5 pl-5 text-slate-700 ${className ?? ''}`}>
      {PREREQUIS_NIVEAU_2.map((line) => (
        <li key={line}>{line}</li>
      ))}
      {extras?.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );

  if (asSection) {
    return (
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">{heading}</h2>
        {list}
      </section>
    );
  }

  return (
    <span className="min-w-0 flex-1">
      <strong>Prérequis :</strong>
      {list}
    </span>
  );
}
