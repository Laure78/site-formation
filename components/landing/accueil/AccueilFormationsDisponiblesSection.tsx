import Link from 'next/link';
import { AccueilFormationsNiveauCardLink } from '@/components/landing/accueil/AccueilFormationsNiveauCardLink';
import { TrainingCard } from '@/components/ui/TrainingCard';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAccueilFormationsPrioritaires } from '@/lib/accueil-config';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Niveaux pédagogiques + aperçu catalogue — section unique sur l’accueil. */
export function AccueilFormationsDisponiblesSection() {
  const formations = getAccueilFormationsPrioritaires();

  return (
    <Section
      id="accueil-formations"
      tone="white"
      className="scroll-mt-24"
      aria-labelledby="accueil-formations-title"
    >
      <SectionHeader
        titleId="accueil-formations-title"
        title="Choisir son niveau et sa formation"
        description="Trois niveaux, puis un aperçu du catalogue. Durées et prérequis sur chaque fiche."
        className="max-w-2xl"
      />

      <ul className="mt-8 grid list-none gap-3 sm:grid-cols-3">
        {FORMATIONS_NIVEAUX_IA.map((n) => (
          <li key={n.niveau}>
            <AccueilFormationsNiveauCardLink niveau={n} />
          </li>
        ))}
      </ul>

      <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2">
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

      <p className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href={LINKS.formations}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 px-6 py-3 text-sm font-semibold`}
        >
          Voir toutes les formations
        </Link>
        <Link href={LINKS.formationsOrientation} className={`${OFC_LINK} text-sm font-semibold`}>
          Questionnaire : quelle formation choisir ?
        </Link>
      </p>
    </Section>
  );
}
