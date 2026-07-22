import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  getClusterRelatedLinks,
  type RelatedLinkItem,
} from '@/lib/maillage-clusters';
import { OFC_CARD_MUTED } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

type RelatedLinksProps = {
  /** Chemin canonique de la page courante (ex. `/formation-ia-btp-yvelines-78`). */
  path: string;
  /** Surcharge optionnelle du titre de section. */
  title?: string;
  subtitle?: string;
  /** Liens fournis manuellement (sinon lookup cluster). */
  links?: RelatedLinkItem[];
  id?: string;
  tone?: 'white' | 'muted' | 'transparent';
  className?: string;
  /** Hrefs déjà présents ailleurs sur la page — exclus pour éviter le doublon. */
  excludeHrefs?: string[];
};

/**
 * Bloc de maillage CONTEXTUEL (3–5 liens) — clusters géo / métiers / catalogue / Claude.
 * À placer en bas de contenu, avant les CTA Calendly — jamais dans le footer global.
 */
export function RelatedLinks({
  path,
  title,
  subtitle,
  links: linksProp,
  id = 'related-links-cluster',
  tone = 'muted',
  className = '',
  excludeHrefs = [],
}: RelatedLinksProps) {
  const cluster = linksProp
    ? { title: title ?? 'Pour aller plus loin', subtitle, links: linksProp }
    : getClusterRelatedLinks(path);

  if (!cluster || cluster.links.length === 0) return null;

  const exclude = new Set(excludeHrefs.map((h) => h.replace(/\/$/, '') || '/'));
  const links = cluster.links.filter((l) => !exclude.has(l.href.replace(/\/$/, '') || '/'));
  if (links.length < 3) return null;

  const sectionTone =
    tone === 'transparent'
      ? 'bg-transparent py-0'
      : tone === 'muted'
        ? OFC_SEC.muted
        : OFC_SEC.white;

  return (
    <section id={id} className={`${sectionTone} scroll-mt-24 ${className}`} aria-labelledby={`${id}-title`}>
      <div className={tone === 'transparent' ? '' : 'mx-auto max-w-4xl px-4'}>
        <h2 id={`${id}-title`} className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
          {title ?? cluster.title}
        </h2>
        {(subtitle ?? cluster.subtitle) ? (
          <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
            {subtitle ?? cluster.subtitle}
          </p>
        ) : null}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {links.map((item) => (
            <li key={`${item.href}-${item.label}`}>
              <Link href={item.href} className={`${OFC_CARD_MUTED} flex h-full flex-col p-5`}>
                <span className="inline-flex items-start gap-2 font-semibold text-slate-900">
                  <span className="flex-1">{item.label}</span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#377CF3]"
                    aria-hidden
                  />
                </span>
                {item.description ? (
                  <span className="mt-2 text-sm font-normal leading-relaxed text-slate-600">
                    {item.description}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
