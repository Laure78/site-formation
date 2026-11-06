import Link from 'next/link';
import { BarChart3, Leaf, Target } from 'lucide-react';
import { buildFormationsCataloguePageHref } from '@/lib/catalogue-filter-url';
import {
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV10_14H_HT,
} from '@/lib/tarifs-catalogue-participant';
import { formatNumberFr } from '@/lib/format-number-fr';

const CARDS = [
  {
    id: 'debutant',
    titre: 'Débutant',
    duree: '4 h',
    tarif: `${formatNumberFr(TARIF_PARTICIPANT_NIV01_HT)} € HT / participant`,
    lien: 'Découvrir l’IA',
    href: buildFormationsCataloguePageHref({ niveau: 1 }),
    Icon: Leaf,
  },
  {
    id: 'avance',
    titre: 'Avancé',
    duree: '4 h',
    tarif: `${formatNumberFr(TARIF_PARTICIPANT_NIV02_HT)} € HT / participant`,
    lien: 'Appliquer l’IA à son métier',
    href: buildFormationsCataloguePageHref({ niveau: 2 }),
    Icon: BarChart3,
  },
  {
    id: 'approfondi',
    titre: 'Approfondi',
    duree: '14 h',
    tarif: `${formatNumberFr(TARIF_PARTICIPANT_NIV10_14H_HT)} € HT / participant`,
    lien: 'Créer son application métier',
    href: buildFormationsCataloguePageHref({ niveau: 3 }),
    Icon: Target,
  },
] as const;

export function FormationsCatalogueFormatsBar() {
  return (
    <section aria-labelledby="formats-niveau-title" className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]">
      <h2 id="formats-niveau-title" className="font-display text-2xl font-bold text-[#101936] md:text-3xl">
        Choisissez votre niveau
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
        Trois formats catalogue — filtrez les programmes correspondants ci-dessous.
      </p>
      <ul className="mt-8 grid list-none gap-5 md:grid-cols-3">
        {CARDS.map(({ id, titre, duree, tarif, lien, href, Icon }) => (
          <li key={id}>
            <Link
              href={href}
              className="group flex h-full min-h-[12rem] flex-col rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-[box-shadow,transform] duration-200 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] motion-reduce:hover:translate-y-0"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#101936]">
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-[#377CF3]">{titre}</p>
              <p className="mt-2 font-display text-lg font-bold text-[#101936]">{duree}</p>
              <p className="mt-1 text-sm font-semibold tabular-nums text-slate-700">{tarif}</p>
              <span className="mt-auto pt-6 text-sm font-semibold text-[#377CF3] underline-offset-4 group-hover:underline">
                {lien}
                <span className="sr-only"> — filtrer le catalogue</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
