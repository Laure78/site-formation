import Link from 'next/link';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { Section } from '@/components/ui/Section';
import { ACCUEIL_EN_BREF } from '@/lib/geo-pages-copy';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Bloc GEO — réponse directe sous le hero (activité, public, zone). */
export function AccueilEnBrefSection() {
  return (
    <Section tone="white" className="!py-4 md:!py-5" aria-labelledby="accueil-en-bref-title">
      <h2 id="accueil-en-bref-title" className="sr-only">
        En bref
      </h2>
      <ShortAnswerBlock>
        <span className="citation-sentence">{ACCUEIL_EN_BREF}</span>
      </ShortAnswerBlock>
      <p className="mt-4 text-sm leading-relaxed text-ofc-ink-muted">
        <Link href={LINKS.formations} className={`${OFC_LINK} font-medium`}>
          Voir le catalogue des formations IA BTP
        </Link>
        {' · '}
        <Link href={LINKS.formationAO} className={`${OFC_LINK} font-medium`}>
          Programme appels d’offres et DCE (7 h)
        </Link>
        {' · '}
        <Link href={LINKS.formationIaIntraEntrepriseBtp} className={`${OFC_LINK} font-medium`}>
          Former mon équipe en intra-entreprise
        </Link>
        {' · '}
        <Link href={LINKS.formationIaConstruction} className={`${OFC_LINK} font-medium`}>
          Formations IA pour la construction
        </Link>
      </p>
    </Section>
  );
}
