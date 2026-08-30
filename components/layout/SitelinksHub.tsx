import Link from 'next/link';
import {
  Calendar,
  Coins,
  GraduationCap,
  MapPin,
  HardHat,
  BookOpen,
} from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { getSiteNavHubItems } from '@/lib/contextual-internal-links';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import type { LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  [LINKS.formations]: GraduationCap,
  [LINKS.financement]: Coins,
  [LINKS.formationConducteurTravaux]: HardHat,
  [LINKS.blog]: BookOpen,
  [LINKS.formationIleDeFrance]: MapPin,
  [LINKS.prendreRdv]: Calendar,
};

/**
 * Maillage interne vers les sections clés — présent sur toutes les pages (avant le footer).
 */
export function SitelinksHub() {
  const items = getSiteNavHubItems().map(({ href, title, description }) => ({
    href,
    title,
    line: description ?? '',
    Icon: ICONS[href] ?? GraduationCap,
  }));

  return (
    <section aria-labelledby="nav-hub" className={OFC_SEC.mutedCompact}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="nav-hub" className="sr-only">
          Navigation principale du site
        </h2>
        <p className="mb-6 text-center text-sm text-slate-600 md:text-base">
          Pages les plus consultées — catalogue, financement, métiers et prise de contact.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
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
              <p className="mt-1 text-xs leading-snug text-slate-600">{line}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
