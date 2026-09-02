import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  A_PROPOS_LINKEDIN_COURSES,
} from '@/lib/a-propos-page-config';
import { LINKEDIN_LEARNING_INSTRUCTOR_HREF } from '@/lib/linkedin-learning-a-propos-embeds';

export function AProposLinkedInSection() {
  return (
    <section aria-labelledby="linkedin-title">
      <h2
        id="linkedin-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        LinkedIn Learning
      </h2>
      <p className="mt-3 text-sm text-[#64748B]">
        Instructrice LinkedIn Learning — {A_PROPOS_LINKEDIN_COURSES.length} cours publiés en
        français, complémentaires aux sessions OFC en présentiel.
      </p>
      <ul className="mt-6 space-y-4">
        {A_PROPOS_LINKEDIN_COURSES.map((course) => (
          <li
            key={course.title}
            className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
          >
            <h3 className="font-semibold text-[#0F172A]">{course.title}</h3>
            <p className="mt-1 text-sm text-[#64748B]">
              {course.duration} · {course.topics}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">
        <ExternalLinkAnchor
          href={LINKEDIN_LEARNING_INSTRUCTOR_HREF}
          className="font-medium text-[#377CF3] underline"
        >
          Profil instructrice LinkedIn Learning — Laure Olivié
        </ExternalLinkAnchor>
      </p>
    </section>
  );
}
