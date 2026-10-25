import Link from 'next/link';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { getFormationsCatalogueEnBref } from '@/lib/geo-pages-copy';
import { LINKS } from '@/lib/internal-links';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';

/** Réponse directe — choix par niveau, disponible vs parcours 2027. */
export function FormationsCatalogueEnBrefSection() {
  const parcoursVisible = isParcoursMetiers2027Visible();

  return (
    <section
      id="catalogue-en-bref"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="catalogue-en-bref-title"
    >
      <h2 id="catalogue-en-bref-title" className="sr-only">
        En bref
      </h2>
      <ShortAnswerBlock>
        <span className="citation-sentence">{getFormationsCatalogueEnBref()}</span>
      </ShortAnswerBlock>
      <nav
        className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#377CF3]"
        aria-label="Accès rapides au catalogue"
      >
        <Link href={LINKS.formationIaBtpNiveau1BatimentTp} className="underline hover:no-underline">
          Niveau 1 — bases IA (4 h)
        </Link>
        <Link href={LINKS.formationAO} className="underline hover:no-underline">
          Appels d’offres & DCE (7 h)
        </Link>
        <Link href={LINKS.formationConduiteTravauxSuiviChantier} className="underline hover:no-underline">
          Conduite de travaux (7 h)
        </Link>
        <Link href={LINKS.financement} className="underline hover:no-underline">
          Financement OPCO — modalités
        </Link>
        {parcoursVisible ? (
          <Link href={LINKS.formationsTrouverParcours} className="underline hover:no-underline">
            Parcours métiers 2027 (annoncés)
          </Link>
        ) : null}
      </nav>
    </section>
  );
}
