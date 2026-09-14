import { HomeFaqDetailsList } from '@/components/landing/HomeFaqDetailsList';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FAQ_ITEMS_HOME } from '@/lib/faq';

/** FAQ accueil — grande typographie, accordéons propres. */
export function AccueilFaqSection() {
  return (
    <Section tone="white" aria-labelledby="accueil-faq" innerClassName="max-w-3xl">
      <SectionHeader
        align="center"
        titleId="accueil-faq"
        eyebrow="FAQ"
        title="Des questions ? C’est normal."
        description="Réponses courtes sur le public visé, les prérequis, vos documents et le financement."
        className="mx-auto"
      />
      <div className="mt-10">
        <HomeFaqDetailsList items={FAQ_ITEMS_HOME} />
      </div>
    </Section>
  );
}
