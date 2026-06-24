import Link from 'next/link';
import {
  getLaureOlivieFormationPortraitParagraph,
  LAURE_OLIVIE_CLIENT_REFERENCES_SHORT,
} from '@/lib/laure-olivie-profile';
import { LINKS } from '@/lib/internal-links';

type Props = {
  id?: string;
  className?: string;
  /** Phrase métier en tête (optionnelle) — ex. cas d'usage piscine, étanchéité… */
  contextLine?: string;
  showReferences?: boolean;
  showFullParcoursLink?: boolean;
};

/**
 * Bloc « Qui est Laure Olivié ? » — pages formation & landings métier.
 * Texte centralisé dans `lib/laure-olivie-profile.ts`.
 */
export function LaureOlivieFormationPortrait({
  id = 'a-propos',
  className = '',
  contextLine,
  showReferences = true,
  showFullParcoursLink = true,
}: Props) {
  return (
    <section id={id} className={`scroll-mt-24 mt-14 ${className}`.trim()}>
      <h2 className="font-display text-2xl font-bold text-slate-900">Qui est Laure Olivié ?</h2>
      <p className="mt-4 text-slate-600 leading-relaxed">
        {getLaureOlivieFormationPortraitParagraph(contextLine)}
      </p>
      {showReferences ? (
        <p className="mt-4 text-slate-600 leading-relaxed">
          <strong>Références :</strong> {LAURE_OLIVIE_CLIENT_REFERENCES_SHORT}.
        </p>
      ) : null}
      {showFullParcoursLink ? (
        <p className="mt-4">
          <Link
            href={LINKS.aPropos}
            className="text-sm font-semibold text-[#377CF3] underline-offset-2 hover:underline"
          >
            Parcours complet, certifications et clients →
          </Link>
        </p>
      ) : null}
    </section>
  );
}
