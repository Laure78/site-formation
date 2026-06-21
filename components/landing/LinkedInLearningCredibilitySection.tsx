'use client';

import { AProposLinkedInEmbeds } from '@/components/a-propos/AProposLinkedInEmbeds';
import { Reveal } from '@/components/motion/Reveal';

type LinkedInLearningCredibilitySectionProps = {
  className?: string;
  /** Identifiant ancre — ex. accueil-linkedin-learning */
  id?: string;
};

/**
 * Bloc crédibilité instructrice LinkedIn Learning — deux extraits vidéo côte à côte.
 * Réutilisé sur l’accueil (sous la présentation) et aligné sur la page À propos.
 */
export function LinkedInLearningCredibilitySection({
  className = '',
  id = 'formations-linkedin-learning',
}: LinkedInLearningCredibilitySectionProps) {
  return (
    <Reveal as="div" id={id} className={`scroll-mt-24 ${className}`.trim()}>
      <div className="rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
          Formations LinkedIn Learning
          <span className="mt-3 block h-1 w-12 rounded-full bg-[#377CF3]" aria-hidden />
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#475569] md:text-[16px]">
          Instructrice officielle LinkedIn Learning — cours publics vérifiables, complémentaires aux sessions OFC
          en présentiel en Île-de-France.
        </p>
        <AProposLinkedInEmbeds />
      </div>
    </Reveal>
  );
}
