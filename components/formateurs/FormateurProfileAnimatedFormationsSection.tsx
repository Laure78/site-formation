import Link from 'next/link';
import {
  getFormateurAnimatedFormationLinks,
  getFormateurFormationsSectionAnchor,
  type FormateurProfile,
} from '@/lib/formateurs';
import { cn } from '@/lib/cn';
import { OFC_LINK, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';

type Props = {
  formateur: FormateurProfile;
  /** Titre H2 — défaut « Formations animées ». */
  heading?: string;
  tone?: 'white' | 'muted';
};

/** Rubrique formations — intitulés et liens catalogue (même source que le hub /formateurs). */
export function FormateurProfileAnimatedFormationsSection({
  formateur,
  heading = 'Formations animées',
  tone = 'muted',
}: Props) {
  const links = getFormateurAnimatedFormationLinks(formateur);
  if (links.length === 0) return null;

  const sectionId = getFormateurFormationsSectionAnchor(formateur.id);
  const headingId = `${formateur.id}-profile-formations-heading`;

  return (
    <section
      id={sectionId}
      className={cn(
        ofcSectionClasses({ tone, size: 'compact', divide: true }),
        sectionId && 'scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]',
      )}
      aria-labelledby={headingId}
    >
      <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
        <h2 id={headingId} className={OFC_TYPE_H2}>
          {heading}
        </h2>
        <ul className="mt-6 space-y-3">
          {links.map((item) => (
            <li key={item.key}>
              <Link href={item.href} className={`${OFC_LINK} text-base font-semibold text-pretty`}>
                {item.titre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}