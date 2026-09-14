import Link from 'next/link';
import { ResourceCard } from '@/components/ui/ResourceCard';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ACCUEIL_RESSOURCES } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Trois ressources gratuites — cartes éditoriales. */
export function AccueilRessourcesSection() {
  return (
    <Section tone="canvas" aria-labelledby="accueil-ressources">
      <SectionHeader
        align="center"
        titleId="accueil-ressources"
        eyebrow="Ressources"
        title="Ressources IA gratuites pour les professionnels du BTP"
        description="Guides, méthodes et tutoriels pour démarrer concrètement."
        className="mx-auto"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {ACCUEIL_RESSOURCES.map((ressource) => (
          <ResourceCard
            key={ressource.href}
            href={ressource.href}
            titre={ressource.titre}
            phrase={ressource.phrase}
            category={ressource.category}
          />
        ))}
      </div>
      <p className="mt-12 text-center">
        <Link href={LINKS.ressources} className={`${OFC_LINK} text-base font-semibold`}>
          Voir toutes les ressources →
        </Link>
      </p>
    </Section>
  );
}
