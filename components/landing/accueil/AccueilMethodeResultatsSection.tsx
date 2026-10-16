import { ProcessStep } from '@/components/ui/ProcessStep';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ACCUEIL_PARCOURS_FORMATION_ETAPES } from '@/lib/accueil-config';

/**
 * Méthode pédagogique — sans liens vers les fiches formation
 * (déjà listées dans AccueilOffreCatalogueSection : pas de doublon d’URL).
 */
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
    </Section>
  );
}
