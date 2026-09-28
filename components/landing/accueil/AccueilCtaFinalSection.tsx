import { CTASection } from '@/components/ui/CTASection';
import { LINKS } from '@/lib/internal-links';

/** CTA final — entreprise qui souhaite former son équipe. */
export function AccueilCtaFinalSection() {
  return (
    <CTASection
      eyebrow="Formation IA pour le BTP"
      titleId="accueil-cta-final"
      origin="accueil-cta-final"
      title="Vous souhaitez former votre équipe ?"
      description="Décrivez votre activité, vos profils et vos documents types. Nous cadrons ensemble le parcours adapté — intra ou inter, selon vos contraintes."
      secondaryHref={LINKS.formations}
      secondaryLabel="Voir toutes les formations"
    />
  );
}
