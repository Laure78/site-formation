import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getLiensConnexesMetier } from '@/lib/liens-connexes';
import { OFC_CARD_MUTED } from '@/lib/ofc-interaction-classes';

type LiensConnexesProps = {
  /** Chemin canonique de la page métier courante. */
  currentPath: string;
  /** URLs déjà présentes ailleurs sur la page — pas de doublon. */
  excludeHrefs?: readonly string[];
  title?: string;
  className?: string;
};

/**
 * Bas de page métier — 3 liens : catalogue `/formations`, une tâche `/ia-*`, un département IDF.
 */
export function LiensConnexes({
  currentPath,
  excludeHrefs = [],
  title = 'Liens connexes',
  className = '',
}: LiensConnexesProps) {
  const links = getLiensConnexesMetier(currentPath, excludeHrefs);
  if (links.length === 0) return null;

  return (
    <nav
      aria-label={title}
      className={`mt-12 border-t border-slate-200 pt-10 ${className}`.trim()}
    >
      <h2 className="font-display text-xl font-semibold text-slate-900 md:text-2xl">{title}</h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={`${OFC_CARD_MUTED} flex h-full flex-col p-5`}>
              <span className="inline-flex items-start gap-2 font-semibold text-slate-900">
                <span className="flex-1">{item.label}</span>
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#377CF3]"
                  aria-hidden
                />
              </span>
              <span className="mt-2 text-sm font-normal leading-relaxed text-slate-600">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
