import { ProcessStep } from '@/components/ui/ProcessStep';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ACCUEIL_METHODE_PEDAGOGIQUE_ETAPES } from '@/lib/accueil-config';

export function AccueilMethodePedagogiqueSection() {
  return (
    <Section tone="white" aria-labelledby="accueil-methode-title">
      <SectionHeader
        align="center"
        titleId="accueil-methode-title"
        eyebrow="Méthode pédagogique"
        title="Pratique, contrôlée, réutilisable"
        description="Anonymisation des documents sensibles lorsque nécessaire et validation humaine des productions avant usage ou envoi."
        className="mx-auto max-w-2xl"
      />
      <ol className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ACCUEIL_METHODE_PEDAGOGIQUE_ETAPES.map((etape) => (
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
