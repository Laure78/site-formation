import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AccueilFormationsNiveauFilter } from '@/components/landing/accueil/AccueilFormationsNiveauFilter';
import { getAccueilFormationsParNiveau } from '@/lib/accueil-offre-catalogue';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/** Sélection de formations IA publiées — avant les parcours 2027 sur l’accueil. */
export function AccueilFormationsDisponiblesSection() {
  const groupes = getAccueilFormationsParNiveau();

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
        description="Sessions ouvertes aux inscriptions — présentiel en Île-de-France, sur vos documents métier."
      />
      <AccueilFormationsNiveauFilter groupes={groupes} />
      <p className="mt-10 text-center">
        <Link href={LINKS.formations} className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 px-6 py-3 text-sm font-semibold`}>
          Voir tout le catalogue
        </Link>
      </p>
    </Section>
  );
}
