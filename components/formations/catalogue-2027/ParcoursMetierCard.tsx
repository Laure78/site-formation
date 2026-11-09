import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Layers } from 'lucide-react';
import type { ParcoursComputed } from '@/data/catalogue-2027';
import { libelleDureeParcoursHeures } from '@/data/catalogue-2027';
import { libellePrixParcoursCompletInter } from '@/lib/catalogue-2027/parcours-affichage';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import {
  PARCOURS_METIERS_CARD_IMAGE,
  PARCOURS_METIERS_CARD_MENTION_COMPLET,
  PARCOURS_METIERS_CARD_MENTION_MODULES,
  PARCOURS_METIERS_CARD_SUBTITLE,
} from '@/lib/parcours-metiers-page-content';

export type ParcoursMetierCardProps = {
  parcours: ParcoursComputed;
  /** @deprecated Préférer les sous-titres dans `PARCOURS_METIERS_CARD_SUBTITLE`. */
  description?: string;
};

/**
 * Carte parcours métier — hub /parcours-metiers.
 */
export function ParcoursMetierCard({ parcours: p, description }: ParcoursMetierCardProps) {
  const image = PARCOURS_METIERS_CARD_IMAGE[p.id];
  const ficheHref = parcoursHref(p.id);
  const duree = libelleDureeParcoursHeures(p.dureeHeures);
  const subtitle = description ?? PARCOURS_METIERS_CARD_SUBTITLE[p.id];

  return (
    <article
      className="group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-sm ring-1 ring-slate-50 transition-shadow hover:shadow-md"
      aria-labelledby={`parcours-card-title-${p.id}`}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
        <h3
          id={`parcours-card-title-${p.id}`}
          className="font-display text-lg font-semibold text-balance text-[#101936]"
        >
          {p.titre}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{subtitle}</p>

        <dl className="mt-4 space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
            <dt className="sr-only">Modules</dt>
            <dd>
              <span className="font-medium text-[#101936]">{p.moduleCount}</span> modules
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
            <dt className="sr-only">Durée totale</dt>
            <dd>
              Durée totale : <span className="font-medium text-[#101936]">{duree}</span>
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">Tarif parcours complet inter</dt>
            <dd className="text-slate-600">
              Parcours complet (inter) :{' '}
              <span className="font-medium text-[#101936]">{libellePrixParcoursCompletInter(p)}</span>
            </dd>
          </div>
        </dl>

        <ul className="mt-3 space-y-1 text-xs leading-snug text-slate-500">
          <li>{PARCOURS_METIERS_CARD_MENTION_COMPLET}</li>
          <li>{PARCOURS_METIERS_CARD_MENTION_MODULES}</li>
        </ul>

        <div className="mt-auto pt-5">
          <Link
            href={ficheHref}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#377CF3] underline decoration-[#377CF3]/35 underline-offset-[3px] transition-colors hover:text-[#2f6bd4] hover:decoration-[#377CF3]"
          >
            Découvrir le parcours
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
