import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export type VoirAussiLink = {
  href: string;
  label: string;
};

export type VoirAussiProps = {
  /** Hub du cluster (page mère) */
  hubHref: string;
  hubLabel: string;
  /** Liens frères optionnels (département, IDF, métier voisin…) */
  links?: VoirAussiLink[];
  /** Chemin de la page courante — exclu de la liste */
  currentPath?: string;
  /** URLs déjà présentes ailleurs sur la page — pas de doublon */
  excludeHrefs?: readonly string[];
  title?: string;
  className?: string;
};

function normPath(path: string): string {
  if (!path || path === '/') return '/';
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  return withSlash.replace(/\/$/, '') || '/';
}

/**
 * Bloc « Voir aussi » — maillage contextuel en bas de page.
 * Garantit le hub + `/formations` (si le hub n’est pas déjà le catalogue), puis les liens frères.
 */
export function VoirAussi({
  hubHref,
  hubLabel,
  links = [],
  currentPath,
  excludeHrefs = [],
  title = 'Voir aussi',
  className = '',
}: VoirAussiProps) {
  const excluded = new Set<string>([
    ...excludeHrefs.map(normPath),
    ...(currentPath ? [normPath(currentPath)] : []),
  ]);

  const candidates: VoirAussiLink[] = [
    { href: hubHref, label: hubLabel },
    ...links,
  ];

  if (normPath(hubHref) !== normPath(LINKS.formations)) {
    candidates.push({
      href: LINKS.formations,
      label: 'Catalogue des formations IA pour le BTP',
    });
  }

  const seen = new Set<string>();
  const items = candidates.filter((item) => {
    const href = normPath(item.href);
    if (!href || excluded.has(href) || seen.has(href)) return false;
    seen.add(href);
    return true;
  });

  if (items.length === 0) return null;

  return (
    <nav
      aria-label={title}
      className={`mt-12 border-t border-slate-200 pt-10 ${className}`.trim()}
    >
      <h2 className="font-display text-xl font-semibold text-slate-900">{title}</h2>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {items.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={`inline-flex items-center gap-2 ${OFC_LINK}`}>
              {label}
              <ArrowRight size={16} strokeWidth={1.5} className="shrink-0" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
