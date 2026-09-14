import Link from 'next/link';
import { TrainingCard } from '@/components/ui/TrainingCard';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAccueilFormationsPrioritaires } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Quatre formations prioritaires — cartes premium. */
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
        eyebrow="Catalogue"
        title="Choisissez votre formation IA BTP"
        description="Des parcours concrets, calibrés pour les équipes du bâtiment et des travaux publics."
        className="mx-auto"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {formations.map((f, index) => (
          <TrainingCard
            key={f.href}
            href={f.href}
            titre={f.titre}
            benefice={f.benefice}
            niveau={f.niveau}
            duree={f.duree}
            featured={index === 0}
          />
        ))}
      </div>
      <p className="mt-12 text-center">
        <Link href={LINKS.formations} className={`${OFC_LINK} text-base font-semibold`}>
          Voir toutes les formations →
        </Link>
      </p>
    </Section>
  );
}
