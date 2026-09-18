import { CTASection } from '@/components/ui/CTASection';

/** CTA final — respiration importante avant footer. */
export function AccueilCtaFinalSection() {
  return (
    <CTASection
      eyebrow="Formation IA pour le BTP"
      titleId="accueil-cta-final"
      origin="accueil-cta-final"
      title="Vous voulez identifier les usages IA les plus utiles pour votre entreprise ?"
      description="Présentez votre activité et vos principales tâches chronophages. Nous identifierons les usages IA les plus pertinents et le parcours de formation adapté."
      secondaryHref="#offre-formations"
      secondaryLabel="Voir les formations"
    />
  );
}
