'use client';

import { Sparkles } from 'lucide-react';
import { PillarFaqAccordion } from '@/components/pillar/PillarFaqAccordion';

type Item = { q: string; a: string };

export function ClaudeBtpFaqSections({
  faqItems,
  relatedQuestions,
}: {
  faqItems: readonly Item[];
  relatedQuestions: readonly Item[];
}) {
  return (
    <>
      <PillarFaqAccordion
        headingId="faq-claude"
        title="Questions fréquentes"
        items={faqItems}
        variant="primary"
      />
      <PillarFaqAccordion
        headingId="faq-connexes"
        title="Questions connexes"
        items={relatedQuestions}
        variant="related"
        Icon={Sparkles}
      />
    </>
  );
}
