import Link from 'next/link';
import { BookOpen, Cpu, HardHat, Landmark, Trophy } from 'lucide-react';
import { CataloguePriceBadge } from '@/components/formations/CataloguePriceBadge';
import {
  CATALOGUE_FORMATIONS_COUNT,
  FORMATIONS_CATALOGUE,
  formationCatalogueLinkLabel,
  isCatalogueNiveau1,
} from '@/lib/formations-catalogue-display';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';

export function FormationsWhyMotifs() {
  return (
    <section className="mt-16 rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-10">
      <h2 className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
        Pourquoi un catalogue de {CATALOGUE_FORMATIONS_COUNT} formations pour le BTP et la construction ?
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#334155] md:text-[17px]">
        L&apos;IA générative ne se travaille pas de la même manière selon que vous structurez une
        journée terrain, rédigez un mémoire technique, analysez un DCE, pilotez un chantier ou
        industrialisez Claude en entreprise. Pour les entreprises de construction comme pour le bâtiment et les
        TP, plutôt qu&apos;une formation généraliste, le catalogue OFC propose{' '}
        <strong>{CATALOGUE_FORMATIONS_COUNT} parcours Qualiopi</strong> — un niveau 1 et{' '}
        {CATALOGUE_FORMATIONS_COUNT - 1} formations niveau 2 — avec
        programmes PDF téléchargeables sur chaque fiche.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FORMATIONS_CATALOGUE.map((entry) => {
          const Icon =
            entry.ref === 'NIV-01'
              ? BookOpen
              : entry.ref === 'NIV-02'
                ? Trophy
                : entry.ref === 'NIV-03'
                  ? HardHat
                  : entry.ref === 'NIV-05'
                    ? Landmark
                    : Cpu;
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
                {entry.ref === 'NIV-01'
                  ? 'Démarrer avec l\u2019IA : bâtiment & travaux publics'
                  : entry.ref === 'NIV-02'
                    ? 'DCE, mémoire technique, Cowork & Skills'
                    : entry.ref === 'NIV-03'
                      ? 'CCTP, CR, PPSPS, réception — skills Claude chantier'
                      : entry.ref === 'NIV-05'
                        ? 'DCE, CR chantier, OS, courriers MOE et réserves'
                        : 'Projets, Cowork, connecteurs, Claude Code — matin 9h–13h'}
              </p>
              <CataloguePriceBadge
                level={entry.level}
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
