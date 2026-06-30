'use client';

import dynamic from 'next/dynamic';
import { DeferUntilVisible } from '@/components/performance/DeferUntilVisible';
import { LinkedInLearningSectionPlaceholder } from '@/components/landing/LinkedInLearningSectionPlaceholder';

const LinkedInLearningCredibilitySection = dynamic(
  () =>
    import('@/components/landing/LinkedInLearningCredibilitySection').then((mod) => ({
      default: mod.LinkedInLearningCredibilitySection,
    })),
  {
    loading: () => (
      <LinkedInLearningSectionPlaceholder id="accueil-linkedin-learning" className="mt-16" />
    ),
  },
);

/** Bloc LinkedIn Learning — coquille SSR + iframes différées au scroll. */
export function HomeDeferredLinkedInLearning() {
  return (
    <DeferUntilVisible
      fallback={<LinkedInLearningSectionPlaceholder id="accueil-linkedin-learning" className="mt-16" />}
      minHeight="18rem"
    >
      <LinkedInLearningCredibilitySection id="accueil-linkedin-learning" className="mt-16" />
    </DeferUntilVisible>
  );
}
