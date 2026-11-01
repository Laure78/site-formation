import Link from 'next/link';
import { Building2, Coins, Users } from 'lucide-react';
import { CATALOGUE_2027_INFOS_PRATIQUES } from '@/data/catalogue-2027';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

const CARDS = [
  {
    Icon: Users,
    title: 'Inter-entreprises',
    body: 'Sessions collectives réunissant des professionnels de différentes entreprises. Tarif par participant selon la formation (affiché sur chaque fiche).',
  },
  {
    Icon: Building2,
    title: 'Intra-entreprise',
    body: `Formation organisée pour une entreprise, avec adaptation des objectifs, des exercices et des documents. ${CATALOGUE_2027_INFOS_PRATIQUES.intraTarif}`,
  },
  {
    Icon: Coins,
    title: 'Financement selon éligibilité',
    body: `${FINANCEMENT_FORMULATION_PRUDENTE} ${CATALOGUE_2027_INFOS_PRATIQUES.financement}`,
  },
] as const;

export function FormationsCatalogueFinancementEncadre() {
  return (
    <section
      id="catalogue-financement"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="catalogue-financement-title"
    >
      <h2 id="catalogue-financement-title" className="text-center font-display text-2xl font-bold text-[#101936] md:text-3xl">
        Financement et modalités
      </h2>
      <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-[#377CF3]" aria-hidden />

      <ul className="mt-8 grid list-none gap-5 md:grid-cols-3">
        {CARDS.map(({ Icon, title, body }) => (
          <li
            key={title}
            className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#377CF3]">
              <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-[#101936]">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{body}</p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center">
        <Link href={LINKS.financement} className={`${OFC_LINK} text-sm font-semibold text-[#377CF3]`}>
          En savoir plus sur le financement Constructys et OPCO
        </Link>
      </p>
    </section>
  );
}
