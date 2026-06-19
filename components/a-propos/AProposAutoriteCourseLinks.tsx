'use client';

import { ArrowUpRight } from 'lucide-react';
import { RevealGroup } from '@/components/motion/Reveal';
import { LINKEDIN_LEARNING_A_PROPOS_EMBEDS } from '@/lib/linkedin-learning-a-propos-embeds';

export function AProposAutoriteCourseLinks() {
  return (
    <RevealGroup as="ul" itemAs="li" className="mt-8 grid gap-3 sm:grid-cols-2" staggerMs={50}>
      {LINKEDIN_LEARNING_A_PROPOS_EMBEDS.map((course) => (
        <a
          key={course.courseHref}
          href={course.courseHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-[#377CF3] transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:bg-[#EFF6FF] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          {course.courseLabel}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      ))}
    </RevealGroup>
  );
}
