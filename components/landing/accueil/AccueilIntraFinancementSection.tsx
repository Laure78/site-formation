import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export function AccueilIntraFinancementSection() {
  return (
    <Section tone="white" id="accueil-intra-financement" aria-labelledby="accueil-intra-title">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-ofc-card border border-ofc-border bg-ofc-surface/40 p-6 sm:p-8">
          <SectionHeader
            titleId="accueil-intra-title"
            title="Former mon équipe"
            description="Session intra-entreprise adaptée à vos besoins, au niveau des participants et à vos documents métier — présentiel en Île-de-France."
          />
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-ofc-ink-muted">
            <li>Programme ajusté à votre activité</li>
            <li>Exercices sur vos cas (anonymisés si nécessaire)</li>
            <li>Prise en compte des niveaux IA dans l’équipe</li>
          </ul>
          <Link
            href={LINKS.formationIaIntraEntrepriseBtp}
            className={`${OFC_CTA_PRIMARY} mt-6 inline-flex min-h-11 items-center px-6 py-3`}
          >
            Former mon équipe
          </Link>
        </div>
        <div className="rounded-ofc-card border border-ofc-border bg-white p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold text-ofc-ink">Financement</h3>
          <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">
            Prise en charge possible selon éligibilité et accord du financeur (OPCO, notamment
            Constructys pour le BTP). OFC Création d&apos;Entreprise est un organisme certifié
            Qualiopi — la certification ne garantit pas le financement.
          </p>
          <Link
            href={LINKS.financement}
            className={`${OFC_CTA_SECONDARY} mt-6 inline-flex min-h-11 items-center px-6 py-3`}
          >
            Comprendre le financement
          </Link>
        </div>
      </div>
    </Section>
  );
}
