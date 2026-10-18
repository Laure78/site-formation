import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

export function AccueilIntraFinancementSection() {
  return (
    <Section tone="white" id="accueil-intra-financement" aria-labelledby="accueil-intra-title">
      <SectionHeader
        titleId="accueil-intra-title"
        title="Une formation IA adaptée à votre entreprise BTP"
        description="Session intra-entreprise en présentiel en Île-de-France — programme ajusté aux fonctions présentes et au niveau initial de chacun."
        className="max-w-2xl"
      />
      <ul className="mt-6 max-w-2xl list-inside list-disc space-y-2 text-left text-sm leading-relaxed text-ofc-ink-muted">
        <li>Présentiel en Île-de-France (75 à 95)</li>
        <li>Objectifs adaptés aux fonctions des participants</li>
        <li>Exercices sur des documents autorisés et préparés (anonymisation si besoin)</li>
        <li>Progression selon le niveau initial de l’équipe</li>
      </ul>
      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href={`${LINKS.formationIaIntraEntrepriseBtp}?src=accueil-intra`}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center px-6 py-3`}
        >
          Échanger sur les besoins de mon équipe
        </Link>
        <Link href={LINKS.financement} className={`${OFC_LINK} text-sm font-semibold`}>
          Étudier les modalités de financement
        </Link>
      </div>
      <p className="mt-4 max-w-2xl text-left text-xs leading-relaxed text-ofc-ink-muted">
        Prise en charge possible selon éligibilité et accord du financeur (OPCO, notamment
        Constructys). La certification Qualiopi ne garantit pas le financement.
      </p>
    </Section>
  );
}
