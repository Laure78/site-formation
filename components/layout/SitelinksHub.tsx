import Link from 'next/link';
import { Layers, Calendar, Coins, GraduationCap, User } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

const items = [
  {
    href: LINKS.formations,
    title: 'Formations',
    line: 'Catalogue Qualiopi',
    Icon: GraduationCap,
  },
  {
    href: LINKS.financement,
    title: 'Financement',
    line: 'Constructys 100 %',
    Icon: Coins,
  },
  {
    href: LINKS.ressources,
    title: 'Ressources',
    line: 'Blog, Claude AI, tutos PDF',
    Icon: Layers,
  },
  {
    href: LINKS.aPropos,
    title: 'À propos',
    line: 'Laure Olivié',
    Icon: User,
  },
  {
    href: LINKS.prendreRdv,
    title: 'Prendre RDV',
    line: 'Visio gratuite',
    Icon: Calendar,
  },
] as const;

/**
 * Maillage interne vers les sections clés — présent sur toutes les pages (avant le footer).
 */
export function SitelinksHub() {
  return (
    <section aria-labelledby="nav-hub" className={OFC_SEC.mutedCompact}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="nav-hub" className="sr-only">
          Navigation principale du site
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {items.map(({ href, title, line, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${OFC_CARD} group block p-4`}
            >
              <Icon
                className="h-5 w-5 text-[var(--accent)]"
                strokeWidth={1.75}
                aria-hidden
              />
              <span className="mt-3 block text-sm font-semibold text-slate-900 transition-colors duration-150 group-hover:text-[#377CF3]">
                {title}
              </span>
              <p className="mt-1 text-xs text-slate-600">{line}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
