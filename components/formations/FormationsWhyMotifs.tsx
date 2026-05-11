import { BookOpen, Trophy, Wallet } from 'lucide-react';
import { TARIF_SESSION_AVANCE_HT, TARIF_SESSION_DEBUTANT_HT } from '@/lib/tarifs-sessions';

export function FormationsWhyMotifs() {
  return (
    <section className="mt-16 rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-10">
      <h2 className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
        Pourquoi un catalogue de 2 formations spécialisées ?
      </h2>
      <p className="mt-4 max-w-3xl text-[#334155] leading-relaxed">
        L&apos;IA générative ne se travaille pas de la même manière selon que vous structurez une
        journée terrain, rédigez un mémoire technique ou analysez un DCE. Plutôt qu&apos;une
        formation généraliste, le catalogue OFC propose{' '}
        <strong>deux parcours Qualiopi</strong> — niveau 1 (bases bâtiment &amp; travaux publics) et
        niveau 2 (appels d&apos;offre BTP) — avec programmes PDF téléchargeables sur chaque fiche.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition duration-200 hover:border-[#377CF3] hover:shadow-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
            <BookOpen className="h-8 w-8 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-6 font-display text-lg font-semibold text-[#0F172A]">
            Niveau 1 — débutant
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
            Démarrer avec l&apos;IA : niveau 1 (bâtiment &amp; travaux publics)
          </p>
          <p className="mt-4 text-base font-bold text-[#10B981]">
            {TARIF_SESSION_DEBUTANT_HT} € HT / session (max 12 pers.)
          </p>
        </div>
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition duration-200 hover:border-[#377CF3] hover:shadow-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7]">
            <Trophy className="h-8 w-8 text-[#F59E0B]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-6 font-display text-lg font-semibold text-[#0F172A]">
            Niveau 2 — avancé
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
            Passer aux marchés : niveau 2 (appels d&apos;offre BTP)
          </p>
          <p className="mt-4 text-base font-bold text-[#F97316]">
            {TARIF_SESSION_AVANCE_HT} € HT / session (max 12 pers.)
          </p>
        </div>
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition duration-200 hover:border-[#377CF3] hover:shadow-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
            <Wallet className="h-8 w-8 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-6 font-display text-lg font-semibold text-[#0F172A]">
            100 % finançable Constructys
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
