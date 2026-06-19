import Link from 'next/link';
import { BookOpen, Cpu, HardHat, Landmark, Trophy, Wallet } from 'lucide-react';
import { CataloguePriceBadge } from '@/components/formations/CataloguePriceBadge';
import {
  CATALOGUE_FORMATIONS_COUNT,
  FORMATIONS_CATALOGUE,
  formationCatalogueLinkLabel,
  isCatalogueNiveau1,
} from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';

export function FormationsWhyMotifs() {
  return (
    <section className="mt-16 rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-10">
      <h2 className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
        Pourquoi un catalogue de {CATALOGUE_FORMATIONS_COUNT} formations spécialisées ?
      </h2>
      <p className="mt-4 max-w-3xl text-[#334155] leading-relaxed">
        L&apos;IA générative ne se travaille pas de la même manière selon que vous structurez une
        journée terrain, rédigez un mémoire technique, analysez un DCE, pilotez un chantier ou
        industrialisez Claude en entreprise. Plutôt qu&apos;une formation généraliste, le catalogue OFC
        propose <strong>{CATALOGUE_FORMATIONS_COUNT} parcours Qualiopi</strong> — un niveau 1 et{' '}
        {CATALOGUE_FORMATIONS_COUNT - 1} formations niveau 2 — avec
        programmes PDF téléchargeables sur chaque fiche.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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
            <div key={entry.ref} className={`${OFC_CARD} p-8`}>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                <Icon
                  className={`h-8 w-8 ${isDebutant ? 'text-[#377CF3]' : 'text-[#F97316]'}`}
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-[#0F172A]">
                <Link href={entry.href} className="hover:text-[#377CF3] hover:underline">
                  {formationCatalogueLinkLabel(entry)}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
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
                className="mt-4"
              />
            </div>
          );
        })}
        <div className={`${OFC_CARD} p-8`}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
            <Wallet className="h-8 w-8 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-6 font-display text-lg font-semibold text-[#0F172A]">
            Financement possible selon éligibilité
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
            Plafond pédagogique 24 € HT/h/stagiaire — demande à déposer 15 jours avant la session.
          </p>
          <p className="mt-4 text-sm font-bold text-[#377CF3]">Accompagnement complet dossier inclus</p>
        </div>
      </div>
    </section>
  );
}
