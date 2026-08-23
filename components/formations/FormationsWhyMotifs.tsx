import Link from 'next/link';
import { BookOpen, Cpu, HardHat, Landmark, Trophy } from 'lucide-react';
import { CataloguePriceBadge } from '@/components/formations/CataloguePriceBadge';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import {
  formationCatalogueLinkLabel,
  isCatalogueNiveau1,
} from '@/lib/formations-catalogue-display';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';

function iconForRef(ref: string) {
  if (ref === 'NIV-01') return BookOpen;
  if (ref === 'NIV-02') return Trophy;
  if (ref === 'NIV-03') return HardHat;
  if (ref === 'NIV-05') return Landmark;
  return Cpu;
}

export function FormationsWhyMotifs({
  formations,
  catalogueCount,
}: {
  formations: FormationCatalogueEntry[];
  catalogueCount: number;
}) {
  return (
    <section className="mt-16 rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-10">
      <h2 className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
        Pourquoi un catalogue de {catalogueCount} formations pour le BTP et la construction ?
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#334155] md:text-[17px]">
        L&apos;IA générative ne se travaille pas de la même manière selon que vous structurez une
        journée terrain, rédigez un mémoire technique, analysez un DCE, pilotez un chantier ou
        industrialisez Claude en entreprise. Pour les entreprises de construction comme pour le bâtiment et les
        TP, plutôt qu&apos;une formation généraliste, le catalogue OFC propose{' '}
        <strong>{catalogueCount} parcours catalogue — organisme certifié Qualiopi</strong> — un niveau 1 et{' '}
        {catalogueCount - 1} formations niveau 2 — avec
        programmes PDF téléchargeables sur chaque fiche.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {formations.map((entry) => {
          const Icon = iconForRef(entry.ref);
          const isDebutant = isCatalogueNiveau1(entry.ref);
          return (
            <div key={entry.ref} className={`${OFC_CARD} flex flex-col p-6 md:p-7`}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF6FF]">
                <Icon
                  className={`h-7 w-7 ${isDebutant ? 'text-[#377CF3]' : 'text-[#F97316]'}`}
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-[#0F172A] md:text-xl">
                <Link href={entry.href} className="hover:text-[#377CF3] hover:underline">
                  {formationCatalogueLinkLabel(entry)}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#475569] md:text-[0.9375rem]">
                {entry.pitch}
              </p>
              <CataloguePriceBadge
                level={entry.level}
                prixHT={entry.prixHT}
                variant="banner"
                className="mt-5"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
