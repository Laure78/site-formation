import Link from 'next/link';
import { EvenementAoBtpPromoEncart } from '@/components/evenements/EvenementAoBtpPromoEncart';
import { ResourceCard } from '@/components/ui/ResourceCard';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ACCUEIL_RESSOURCES } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Ressources gratuites + encart événement compact (sous les blocs formation). */
export function AccueilRessourcesEvenementSection() {
  return (
    <Section tone="canvas" aria-labelledby="accueil-ressources-evenement-title">
      <SectionHeader
        titleId="accueil-ressources-evenement-title"
        eyebrow="Ressources"
        title="Guides et tutoriels IA BTP"
        description="Pour approfondir avant ou après une formation — contenus gratuits, en complément du présentiel."
        className="max-w-2xl"
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      <p className="mt-8">
        <Link href={LINKS.ressources} className={`${OFC_LINK} text-sm font-semibold`}>
          Voir toutes les ressources
        </Link>
      </p>

      <div className="mt-10 overflow-hidden rounded-ofc-card border border-ofc-border bg-white">
        <EvenementAoBtpPromoEncart placement="accueil" variant="compact" />
      </div>
    </Section>
  );
}
