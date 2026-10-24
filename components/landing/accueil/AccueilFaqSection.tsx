import { HomeFaqDetailsList } from '@/components/landing/HomeFaqDetailsList';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FAQ_ITEMS_HOME } from '@/lib/faq';

/** FAQ accueil — grande typographie, accordéons propres. */
export function AccueilFaqSection() {
  return (
    <Section
      id="accueil-faq"
      tone="white"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-faq-heading"
      innerClassName="max-w-3xl"
    >
      <SectionHeader
        align="center"
        titleId="accueil-faq-heading"
        eyebrow="FAQ"
        title="Des questions ? C’est normal."
        description="Formation, parcours, lieu et financement."
        className="mx-auto"
      />
      <div className="mt-10">
        <HomeFaqDetailsList items={FAQ_ITEMS_HOME} />
      </div>
    </Section>
  );
}
