import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ContextualLinkCard } from '@/lib/contextual-internal-links';
import { OFC_CARD_MUTED } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

const chipClass =
  'inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition duration-200 hover:border-[#377CF3] hover:bg-[#EFF6FF] hover:text-[#377CF3]';

type ContextualLinksSectionProps = {
  title?: string;
  subtitle?: string;
  links: ContextualLinkCard[];
  /** `cards` — grille descriptive ; `chips` — pills compacts */
  variant?: 'cards' | 'chips';
  id?: string;
  /** Fond blanc ou gris OFC */
  tone?: 'white' | 'muted';
  className?: string;
};

function LinkItem({ href, title, description }: ContextualLinkCard) {
  const isExternal = href.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${OFC_CARD_MUTED} flex h-full flex-col p-5`}
      >
        <span className="font-medium text-slate-900">{title}</span>
        {description ? (
          <span className="mt-2 text-base font-normal text-slate-600">{description}</span>
        ) : null}
      </a>
    );
  }

  return (
    <Link href={href} className={`${OFC_CARD_MUTED} flex h-full flex-col p-5`}>
      <span className="font-medium text-slate-900">{title}</span>
      {description ? (
        <span className="mt-2 text-base font-normal text-slate-600">{description}</span>
      ) : null}
    </Link>
  );
}

/**
 * Bloc de maillage interne contextuel — cartes ou chips selon la page.
 */
export function ContextualLinksSection({
  title = 'Continuer votre navigation',
  subtitle,
  links,
  variant = 'cards',
  id,
  tone = 'white',
  className = '',
}: ContextualLinksSectionProps) {
  if (links.length === 0) return null;

  const sectionClass = tone === 'muted' ? OFC_SEC.muted : OFC_SEC.white;

  if (variant === 'chips') {
    return (
      <section id={id} className={`${sectionClass} scroll-mt-24 ${className}`}>
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-display text-xl font-semibold text-slate-900 md:text-2xl">{title}</h2>
          {subtitle ? <p className="mt-2 text-sm text-slate-600 md:text-base">{subtitle}</p> : null}
          <ul className="mt-6 flex flex-wrap gap-3">
            {links.map(({ href, title: label }) => (
              <li key={`${href}-${label}`}>
                {href.startsWith('http') ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className={chipClass}>
                    {label}
                    <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
                  </a>
                ) : (
                  <Link href={href} className={chipClass}>
                    {label}
                    <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`${sectionClass} scroll-mt-28 ${className}`}>
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
        {subtitle ? (
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">{subtitle}</p>
        ) : null}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {links.map((item) => (
            <li key={`${item.href}-${item.title}`}>
              <LinkItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
