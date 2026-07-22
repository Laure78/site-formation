import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  MAILLAGE_RETOUR_RESSOURCES,
  type MaillageLink,
  type MaillageRessourceConfig,
} from '@/lib/maillage-ressources';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export type MaillageRessourceProps = {
  /** Lien montant vers le pilier formation du thème. */
  pilier: MaillageLink;
  /** Pages sœurs (1–2 recommandés). Alias accepté : `sœurs`. */
  soeurs?: readonly MaillageLink[];
  /** @deprecated Préférer `soeurs` ; conservé pour l’API demandée « sœurs ». */
  sœurs?: readonly MaillageLink[];
  /** Articles blog (thème AO : 1 lien). */
  blog?: readonly MaillageLink[];
  /** Chemin de la page courante — exclus des sœurs / blog. */
  currentPath?: string;
  /** Hrefs déjà présents ailleurs sur la page. */
  excludeHrefs?: readonly string[];
  className?: string;
  id?: string;
  /** Conteneur large (guides) vs étroit (tutos). */
  layout?: 'wide' | 'narrow';
};

function normalizeHref(href: string): string {
  return href.replace(/\/$/, '') || '/';
}

/**
 * Section « Pour aller plus loin » — maillage cluster /ressources.
 * À placer avant le CTA Calendly final. Liens internes via next/link uniquement.
 */
export function MaillageRessource({
  pilier,
  soeurs,
  sœurs,
  blog = [],
  currentPath,
  excludeHrefs = [],
  className = '',
  id = 'pour-aller-plus-loin',
  layout = 'wide',
}: MaillageRessourceProps) {
  const lateral = soeurs ?? sœurs ?? [];
  const current = currentPath ? normalizeHref(currentPath) : '';
  const excluded = new Set([
    ...excludeHrefs.map(normalizeHref),
    ...(current ? [current] : []),
  ]);

  const seen = new Set<string>();
  const pushUnique = (list: MaillageLink[], item: MaillageLink) => {
    const key = normalizeHref(item.href);
    if (excluded.has(key) || seen.has(key)) return;
    seen.add(key);
    list.push(item);
  };

  const items: MaillageLink[] = [];
  pushUnique(items, pilier);
  for (const s of lateral.slice(0, 2)) pushUnique(items, s);
  for (const b of blog.slice(0, 1)) pushUnique(items, b);
  pushUnique(items, MAILLAGE_RETOUR_RESSOURCES);

  if (items.length === 0) return null;

  const maxW = layout === 'narrow' ? 'max-w-4xl' : 'max-w-7xl';

  return (
    <section
      id={id}
      className={`border-t border-slate-200 bg-[#F8FAFC] py-12 md:py-14 ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={`mx-auto ${maxW} px-4`}>
        <h2 id={`${id}-title`} className="font-display text-2xl font-bold text-slate-900">
          Pour aller plus loin
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          Enchaînez vers la formation du thème, une ressource sœur, puis le hub gratuit.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${OFC_LINK} inline-flex items-start gap-2 text-sm font-semibold md:text-base`}
              >
                <span className="flex-1">{item.label}</span>
                <ArrowUpRight
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]"
                  aria-hidden
                  strokeWidth={1.75}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Raccourci : config cluster + composant. */
export function MaillageRessourceFromConfig({
  config,
  currentPath,
  excludeHrefs,
  layout,
  className,
}: {
  config: MaillageRessourceConfig;
  currentPath?: string;
  excludeHrefs?: readonly string[];
  layout?: 'wide' | 'narrow';
  className?: string;
}) {
  return (
    <MaillageRessource
      pilier={config.pilier}
      soeurs={config.soeurs}
      blog={config.blog}
      currentPath={currentPath}
      excludeHrefs={excludeHrefs}
      layout={layout}
      className={className}
    />
  );
}
