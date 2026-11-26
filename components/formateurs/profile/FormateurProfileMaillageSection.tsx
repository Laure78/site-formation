import Link from 'next/link';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';

type LinkItem = { href: string; label: string };

type Props = {
  title?: string;
  links: readonly LinkItem[];
  tone?: 'white' | 'muted';
};

export function FormateurProfileMaillageSection({
  title = 'Pour aller plus loin',
  links,
  tone = 'muted',
}: Props) {
  return (
    <section className={ofcSectionClasses({ tone, size: 'compact' })}>
      <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
        <h2 className="font-display text-lg font-bold text-[#101936]">{title}</h2>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`${OFC_LINK} text-sm font-semibold`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}