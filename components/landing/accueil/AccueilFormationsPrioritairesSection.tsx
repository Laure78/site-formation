import Link from 'next/link';
import { TrainingCard } from '@/components/ui/TrainingCard';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAccueilFormationsPrioritaires } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/** Formations à la une — extrait du catalogue (NIV-01 à NIV-04). */
export function AccueilFormationsPrioritairesSection() {
  const formations = getAccueilFormationsPrioritaires();

  return (
    <Section
      id="offre-formations"
      tone="white"
      className="scroll-mt-24"
      aria-labelledby="accueil-formations-prioritaires"
    >
      <SectionHeader
        align="center"
        titleId="accueil-formations-prioritaires"
        eyebrow="Formations à la une"
        title="Programmes IA les plus demandés"
        description="Un aperçu du catalogue — durées, niveaux et programmes complets sur chaque fiche."
        className="mx-auto max-w-2xl"
      />
      <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
        {formations.map((f, index) => (
          <TrainingCard
            key={f.href}
            href={f.href}
            titre={f.titre}
            benefice={f.benefice}
            niveau={f.niveau}
            duree={f.duree}
            publicCible={f.publicCible}
            format={f.format}
            featured={index === 0}
            ctaLabel="Voir le programme"
            className="h-full"
          />
        ))}
      </div>
      <p className="mt-12 text-center">
        <Link
          href={LINKS.formations}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-8 py-3 text-base font-semibold`}
        >
          Voir toutes les formations
        </Link>
      </p>
    </Section>
  );
}
