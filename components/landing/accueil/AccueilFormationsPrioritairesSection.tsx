import Link from 'next/link';
import { TrainingCard } from '@/components/ui/TrainingCard';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAccueilFormationsPrioritaires } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Formations prioritaires — usages opérationnels BTP. */
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
        description="Des parcours concrets pour apprendre à utiliser l’IA sur vos documents et process métier."
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
            publicCible={f.publicCible}
            format={f.format}
            featured={index === 0}
          />
        ))}
      </div>
      <p className="mt-12 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-6">
        <Link href={LINKS.formationIaBtpPillar} className={`${OFC_LINK} text-base font-semibold`}>
          Qu&apos;est-ce qu&apos;une formation IA BTP ? →
        </Link>
        <Link href={LINKS.formations} className={`${OFC_LINK} text-base font-semibold`}>
          Voir le catalogue complet →
        </Link>
      </p>
    </Section>
  );
}
