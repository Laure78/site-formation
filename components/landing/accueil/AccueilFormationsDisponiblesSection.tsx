import Link from 'next/link';
import { TrainingCard } from '@/components/ui/TrainingCard';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAccueilFormationsPrioritaires } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/** Aperçu catalogue — 4 programmes phares (NIV-01 à NIV-04), sans liste exhaustive. */
export function AccueilFormationsDisponiblesSection() {
  const formations = getAccueilFormationsPrioritaires();

  return (
    <Section
      id="accueil-formations"
      tone="canvas"
      className="scroll-mt-24"
      aria-labelledby="accueil-formations-title"
    >
      <SectionHeader
        titleId="accueil-formations-title"
        title="Formations IA disponibles"
        description="Trois niveaux — débutant (4 h), intermédiaire (7 h) et avancé (7 h ou 14 h). Aperçu du catalogue ; prérequis et programmes complets sur chaque fiche."
      />
      <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2">
        {formations.map((f) => (
          <TrainingCard
            key={f.href}
            href={f.href}
            titre={f.titre}
            benefice={f.benefice}
            niveau={f.niveau}
            duree={f.duree}
            publicCible={f.publicCible}
            format={f.format}
            ctaLabel="Voir le programme"
            titleAs="h3"
            className="h-full"
          />
        ))}
      </div>
      <p className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <Link href={LINKS.formations} className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 px-6 py-3 text-sm font-semibold`}>
          Voir toutes les formations
        </Link>
        <Link
          href={LINKS.parcoursMetiers}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 px-6 py-3 text-sm font-semibold`}
        >
          Choisir mon parcours métier
        </Link>
        <Link href={LINKS.formationsOrientation} className="text-sm font-semibold text-ofc-accent hover:underline">
          Questionnaire d’orientation
        </Link>
      </p>
    </Section>
  );
}
