import Link from 'next/link';
import { FormationsNiveauxCartesGrid } from '@/components/formations/catalogue-2027/FormationsNiveauxCartesGrid';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export function AccueilNiveauxOrientationSection() {
  return (
    <Section tone="white" aria-labelledby="accueil-niveaux-title">
      <SectionHeader
        align="center"
        titleId="accueil-niveaux-title"
        title="Trois niveaux pour progresser avec l’IA"
        description="Niveau de maîtrise de l’IA, distinct de votre métier ou de la thématique traitée en session."
        className="mx-auto max-w-2xl"
      />
      <FormationsNiveauxCartesGrid ctaLabel="Découvrir le niveau" className="mt-10" />
      <p className="mt-8 text-center">
        <Link href={LINKS.formationsOrientation} className={`${OFC_LINK} text-sm font-semibold`}>
          Questionnaire : quelle formation choisir ?
        </Link>
      </p>
    </Section>
  );
}
