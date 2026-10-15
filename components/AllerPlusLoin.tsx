'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CTA_RDV_HREF, CtaRdv } from '@/components/CtaRdv';
import { isCalendlyBookingHref } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export interface AllerPlusLoinLink {
  href: string;
  label: string;
  /** Origin GA4 si lien RDV — sinon déduit de l’href interne RDV. */
  origin?: string;
}

const DEFAULT_LINKS: AllerPlusLoinLink[] = [
  { href: LINKS.formations, label: 'Formation IA appliquée au bâtiment' },
  { href: LINKS.chatgptArtisans, label: 'ChatGPT pour entreprises BTP' },
  { href: LINKS.iaDevis, label: 'IA devis bâtiment' },
  { href: LINKS.blog, label: 'Articles et guides' },
  {
    href: CTA_RDV_HREF,
    label: 'Réservez votre visio découverte gratuite',
    origin: 'aller-plus-loin',
  },
  { href: LINKS.financement, label: 'Financement Constructys' },
];

function isRdvHref(href: string): boolean {
  return isCalendlyBookingHref(href) || href === '/#rdv' || href === '#rdv';
}

interface AllerPlusLoinProps {
  links?: AllerPlusLoinLink[];
  variant?: 'default' | 'compact' | 'chips';
}

const chipClass =
  'inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition duration-200 hover:border-[#377CF3] hover:bg-[#EFF6FF] hover:text-[#377CF3]';

function AllerPlusLoinItem({
  href,
  label,
  origin,
  className,
  icon,
}: AllerPlusLoinLink & {
  className: string;
  icon: React.ReactNode;
}) {
  if (isRdvHref(href)) {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`.trim()}>
        <CtaRdv origin={origin ?? 'aller-plus-loin'} variant="inline" />
        {icon}
      </span>
    );
  }

  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
      {icon}
    </Link>
  );
}

export function AllerPlusLoin({ links = DEFAULT_LINKS, variant = 'default' }: AllerPlusLoinProps) {
  const linkList = links.length > 0 ? links : DEFAULT_LINKS;

  if (variant === 'chips') {
    return (
      <section className="mt-12 border-t border-[#E2E8F0] pt-12">
        <h2 className="font-display text-xl font-semibold text-[#0F172A]">Aller plus loin</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {linkList.map(({ href, label, origin }) => (
            <li key={`${href}-${label}`}>
              <AllerPlusLoinItem
                href={href}
                label={label}
                origin={origin}
                className={chipClass}
                icon={<ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      className={
        variant === 'compact' ? 'mt-12 pt-8' : 'mt-16 border-t border-slate-200 pt-12'
      }
    >
      <h2 className="font-display text-xl font-semibold text-slate-900">Aller plus loin</h2>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {linkList.map(({ href, label, origin }) => (
          <li key={`${href}-${label}`}>
            <AllerPlusLoinItem
              href={href}
              label={label}
              origin={origin}
              className={`inline-flex items-center gap-2 ${OFC_LINK}`}
              icon={<ArrowRight size={16} strokeWidth={1.5} className="shrink-0" />}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
