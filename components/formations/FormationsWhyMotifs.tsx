import { BookOpen, HardHat, Trophy, Wallet } from 'lucide-react';
import { TARIF_SESSION_AVANCE_HT, TARIF_SESSION_DEBUTANT_HT } from '@/lib/tarifs-sessions';
import { LaunchPriceBadge } from '@/components/formations/LaunchPriceBadge';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';

export function FormationsWhyMotifs() {
  return (
    <section className="mt-16 rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-10">
      <h2 className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
        Pourquoi un catalogue de 3 formations spécialisées ?
      </h2>
      <p className="mt-4 max-w-3xl text-[#334155] leading-relaxed">
        L&apos;IA générative ne se travaille pas de la même manière selon que vous structurez une
        journée terrain, rédigez un mémoire technique, analysez un DCE ou pilotez un chantier au
        quotidien. Plutôt qu&apos;une formation généraliste, le catalogue OFC propose{' '}
        <strong>trois parcours Qualiopi</strong> — niveau 1 (bases bâtiment &amp; travaux publics),
        niveau 2 appels d&apos;offre (NIV-02) et conduite de travaux (NIV-03) — avec programmes PDF
        téléchargeables sur chaque fiche.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className={`${OFC_CARD} p-8`}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
            <BookOpen className="h-8 w-8 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-6 font-display text-lg font-semibold text-[#0F172A]">
            NIV-01 — débutant
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
            Démarrer avec l&apos;IA : bâtiment &amp; travaux publics
          </p>
          <p className="mt-4 text-base font-bold text-[#10B981]">
            {TARIF_SESSION_DEBUTANT_HT} € HT / session (max 12 pers.)
          </p>
        </div>
        <div className={`${OFC_CARD} p-8`}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7]">
            <Trophy className="h-8 w-8 text-[#F59E0B]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-6 font-display text-lg font-semibold text-[#0F172A]">
            NIV-02 — appels d&apos;offre
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
            DCE, mémoire technique, Cowork &amp; Skills
          </p>
          <p className="mt-4 text-base font-bold text-[#F97316]">
            {TARIF_SESSION_AVANCE_HT} € HT / session
          </p>
        </div>
        <div className={`${OFC_CARD} p-8`}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7]">
            <HardHat className="h-8 w-8 text-[#F97316]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-6 font-display text-lg font-semibold text-[#0F172A]">
            NIV-03 — conduite de travaux
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
            CCTP, CR, PPSPS, réception — skills Claude chantier
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-base font-bold text-[#F97316]">
            {TARIF_SESSION_AVANCE_HT} € HT / session
            <LaunchPriceBadge />
          </p>
        </div>
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
