'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface AllerPlusLoinLink {
  href: string;
  label: string;
}

const DEFAULT_LINKS: AllerPlusLoinLink[] = [
  { href: '/formations', label: 'Formation IA BTP' },
  { href: '/chatgpt-artisans-btp', label: 'IA pour votre métier dans le bâtiment' },
  { href: '/prendre-rdv', label: 'Prendre rendez-vous pour un diagnostic' },
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
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
            >
              {label}
              <ArrowRight size={16} strokeWidth={1.5} className="shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
