import {
  Calculator,
  ClipboardList,
  FileSearch,
  Mail,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AccueilSectionPhoto } from '@/components/landing/accueil/AccueilSectionPhoto';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAccueilCartesProblemesMetier } from '@/lib/accueil-config';
import { PHOTOS } from '@/lib/photos';

const ICONS: Record<string, LucideIcon> = {
  devis: Calculator,
  chantier: ClipboardList,
  ao: FileSearch,
  admin: Mail,
};

/** Entrée par problème métier — 4 grandes cartes modules. */
export function AccueilProblemesMetierSection() {
  const cartes = getAccueilCartesProblemesMetier();
  const photo = PHOTOS.accueilIaChantierLaptopPlansBtp2026;

  return (
    <Section tone="canvas" aria-labelledby="accueil-problemes-metier">
      <SectionHeader
        align="center"
        titleId="accueil-problemes-metier"
        eyebrow="Usages métier"
        title="Sur quoi voulez-vous gagner du temps ?"
        description="Quatre domaines où l’IA accélère le quotidien des équipes BTP — comme des modules d’application concrets."
        className="mx-auto"
      />
      <AccueilSectionPhoto
        photo={photo}
        className="mx-auto mt-10 max-w-4xl"
        caption="Sur chantier : croiser plans, notes et outils IA pour accélérer CR, suivi et synthèse — avec validation métier."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {cartes.map((carte) => (
          <FeatureCard
            key={carte.id}
            href={carte.href}
            title={carte.titre}
            description={carte.description}
            points={carte.points}
            icon={ICONS[carte.id]}
          />
        ))}
      </div>
    </Section>
  );
}
