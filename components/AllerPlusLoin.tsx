'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

export interface AllerPlusLoinLink {
  href: string;
  label: string;
}

const DEFAULT_LINKS: AllerPlusLoinLink[] = [
  { href: '/formations', label: 'Formation IA BTP' },
  { href: '/chatgpt-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
  { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
  { href: '/blog', label: 'Articles et guides' },
  { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
  { href: '/financement-constructys', label: 'Financement Constructys' },
];

interface AllerPlusLoinProps {
  /** Liens personnalisés (optionnel). Par défaut : Formation IA BTP, IA métier, Prendre RDV */
  links?: AllerPlusLoinLink[];
  /** Variante compacte sans bordure */
  variant?: 'default' | 'compact';
}

export function AllerPlusLoin({ links = DEFAULT_LINKS, variant = 'default' }: AllerPlusLoinProps) {
  const linkList = links.length > 0 ? links : DEFAULT_LINKS;

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
                className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
              >
                {label}
                <ArrowRight size={16} strokeWidth={1.5} className="shrink-0" />
              </a>
            ) : (
              <Link
                href={href}
                className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
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
