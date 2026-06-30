'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export interface AllerPlusLoinLink {
  href: string;
  label: string;
}

const DEFAULT_LINKS: AllerPlusLoinLink[] = [
  { href: LINKS.formations, label: 'Formation IA appliquée au bâtiment' },
  { href: LINKS.chatgptArtisans, label: 'ChatGPT pour entreprises BTP' },
  { href: LINKS.iaDevis, label: 'IA devis bâtiment' },
  { href: LINKS.blog, label: 'Articles et guides' },
  { href: buildSiteCalendlyCtaUrl('aller-plus-loin'), label: 'Prendre rendez-vous' },
  { href: LINKS.financement, label: 'Financement Constructys' },
];

interface AllerPlusLoinProps {
  /** Liens personnalisés (optionnel). Par défaut : Formation IA pour le BTP, IA métier, Prendre RDV */
  links?: AllerPlusLoinLink[];
  /** Variante compacte sans bordure */
  variant?: 'default' | 'compact' | 'chips';
}

const chipClass =
  'inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition duration-200 hover:border-[#377CF3] hover:bg-[#EFF6FF] hover:text-[#377CF3]';

export function AllerPlusLoin({ links = DEFAULT_LINKS, variant = 'default' }: AllerPlusLoinProps) {
  const linkList = links.length > 0 ? links : DEFAULT_LINKS;

  if (variant === 'chips') {
    return (
      <section className="mt-12 border-t border-[#E2E8F0] pt-12">
        <h2 className="font-display text-xl font-semibold text-[#0F172A]">Aller plus loin</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {linkList.map(({ href, label }) => (
            <li key={href}>
              {href.startsWith('http') ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={chipClass}
                >
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
      </section>
    );
  }

  return (
    <section
      className={
        variant === 'compact'
          ? 'mt-12 pt-8'
          : 'mt-16 border-t border-slate-200 pt-12'
      }
    >
      <h2 className="font-display text-xl font-semibold text-slate-900">
        Aller plus loin
      </h2>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {linkList.map(({ href, label }) => (
          <li key={href}>
            {href.startsWith('http') ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${OFC_LINK}`}
              >
                {label}
                <ArrowRight size={16} strokeWidth={1.5} className="shrink-0" />
              </a>
            ) : (
              <Link
                href={href}
                className={`inline-flex items-center gap-2 ${OFC_LINK}`}
              >
                {label}
                <ArrowRight size={16} strokeWidth={1.5} className="shrink-0" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
