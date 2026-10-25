import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { RevealShell } from '@/components/motion/RevealShell';
import { MOTION_REVEAL } from '@/lib/motion-config';

export function AccueilIntraFinancementSection() {
  return (
    <Section tone="white" id="accueil-intra-financement" aria-labelledby="accueil-intra-title">
      <RevealShell>
        <SectionHeader
          titleId="accueil-intra-title"
          title="Former votre équipe BTP à l’IA"
          description="Intra-entreprise en présentiel (75–95) — programme calé sur vos fonctions, votre niveau et vos documents (DCE, devis, CR…)."
          className="max-w-2xl"
        />
      </RevealShell>
      <RevealShell delay={MOTION_REVEAL.contentDelayMs}>
        <ul className="mt-6 max-w-2xl list-inside list-disc space-y-1.5 text-left text-sm leading-relaxed text-ofc-ink-muted">
          <li>Objectifs et cas pratiques adaptés au groupe</li>
          <li>Documents autorisés, anonymisés si besoin</li>
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
      </RevealShell>
    </Section>
  );
}
