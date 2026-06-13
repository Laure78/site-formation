'use client';

import { RevealGroup } from '@/components/motion/Reveal';
import { LINKEDIN_LEARNING_A_PROPOS_EMBEDS } from '@/lib/linkedin-learning-a-propos-embeds';

export function AProposLinkedInEmbeds() {
  return (
    <RevealGroup className="mt-8 grid gap-6 md:grid-cols-2" staggerMs={65}>
      {LINKEDIN_LEARNING_A_PROPOS_EMBEDS.map((course) => (
        <div
          key={course.courseHref}
          className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#BFDBFE] hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <div className="aspect-video w-full bg-[#0F172A]">
            <iframe title={course.iframeTitle} src={course.embedSrc} className="h-full w-full" allowFullScreen />
          </div>
          <p className="border-t border-[#E2E8F0] px-4 py-3 text-sm font-medium text-[#0F172A]">{course.courseLabel}</p>
        </div>
      ))}
    </RevealGroup>
  );
}
