import type { LucideIcon } from 'lucide-react';
import { ClipboardList, FileSearch, FileSpreadsheet } from 'lucide-react';
import { ProcessStep } from '@/components/ui/ProcessStep';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SimpleFeatureCard } from '@/components/ui/FeatureCard';
import {
  ACCUEIL_METHODE_EXEMPLES,
  ACCUEIL_PARCOURS_FORMATION_ETAPES,
} from '@/lib/accueil-config';

const ICONS_BY_ID: Record<(typeof ACCUEIL_METHODE_EXEMPLES)[number]['id'], LucideIcon> = {
  dce: FileSearch,
  cr: ClipboardList,
  devis: FileSpreadsheet,
};

/** Méthode + exemples — fusion usages / cas d’usage / différenciation. */
export function AccueilMethodeResultatsSection() {
  return (
    <Section tone="white" aria-labelledby="accueil-methode-resultats">
      <SectionHeader
        align="center"
        titleId="accueil-methode-resultats"
        eyebrow="Méthode"
        title="Vos documents réels, une méthode réutilisable"
        description="Trois étapes communes à nos formations IA BTP — avec validation humaine de chaque production."
        className="mx-auto max-w-2xl"
      />

      <ol className="mt-12 grid list-none gap-5 md:grid-cols-3">
        {ACCUEIL_PARCOURS_FORMATION_ETAPES.map((etape) => (
          <ProcessStep
            key={etape.n}
            number={etape.n}
            title={etape.titre}
            description={etape.detail}
          />
        ))}
      </ol>

      <div className="mt-14">
        <h3 className="text-center font-display text-xl font-bold text-ofc-ink md:text-2xl">
          Trois exemples concrets
        </h3>
        <ul className="mt-8 grid list-none gap-5 md:grid-cols-3">
          {ACCUEIL_METHODE_EXEMPLES.map((item) => (
            <li key={item.id} className="min-w-0">
              <SimpleFeatureCard
                href={item.href}
                title={item.titre}
                phrase={item.phrase}
                icon={ICONS_BY_ID[item.id]}
                ariaLabel={item.ariaLabel}
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
