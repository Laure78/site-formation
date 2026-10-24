import Link from 'next/link';
import { CATALOGUE_2027_INFOS_PRATIQUES } from '@/data/catalogue-2027';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Encadré « Qui paie ? » — près du catalogue / section équipe. */
export function FormationsCatalogueFinancementEncadre() {
  return (
    <aside
      id="catalogue-financement"
      className="mt-8 scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)] rounded-xl bg-[#F2F2F2] px-5 py-7 sm:px-8"
      aria-labelledby="catalogue-financement-title"
    >
      <h3 id="catalogue-financement-title" className="font-display text-lg font-bold text-ofc-ink md:text-xl">
        Qui paie ?
      </h3>
      <ul className="mt-3 max-w-3xl space-y-2 text-sm leading-relaxed text-ofc-ink-muted">
        <li>
          <strong className="font-semibold text-ofc-ink">Inter-entreprises</strong> — tarif par
          participant affiché sur chaque fiche (120 € HT pour le niveau 1 · 310 € HT pour les autres
          sessions catalogue, sauf variantes indiquées).
        </li>
        <li>
          <strong className="font-semibold text-ofc-ink">Intra-entreprise</strong> —{' '}
          {CATALOGUE_2027_INFOS_PRATIQUES.intraTarif}
        </li>
        <li>
          <strong className="font-semibold text-ofc-ink">Financement</strong> — prise en charge
          OPCO/Constructys selon éligibilité, plafonds et accord du financeur.{' '}
          {CATALOGUE_2027_INFOS_PRATIQUES.financement}
        </li>
      </ul>
      <p className="mt-5">
        <Link href={LINKS.financement} className={`${OFC_LINK} text-sm font-semibold`}>
          Comprendre le financement Constructys et OPCO
        </Link>
      </p>
    </aside>
  );
}
