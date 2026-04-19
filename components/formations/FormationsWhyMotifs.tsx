import { BookOpen, Trophy, Wallet } from 'lucide-react';

export function FormationsWhyMotifs() {
  return (
    <section className="mt-16 rounded-2xl border border-[#E2E8F0] bg-white p-5 md:p-10">
      <h2 className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
        Pourquoi un catalogue de 6 formations spécialisées ?
      </h2>
      <p className="mt-4 max-w-3xl text-[#334155] leading-relaxed">
        L&apos;IA générative ne se travaille pas de la même manière selon que vous chiffrez un
        appel d&apos;offre, animez un chantier, recrutez un compagnon ou produisez une DPGF. Plutôt
        qu&apos;une formation généraliste, OFC propose{' '}
        <strong>6 programmes ciblés métier</strong> — chacun avec ses prompts, ses cas
        d&apos;usage et ses livrables types issus de 10 ans de terrain BTP de la formatrice.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition duration-200 hover:border-[#377CF3] hover:shadow-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
            <BookOpen className="h-8 w-8 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-6 font-display text-lg font-semibold text-[#0F172A]">
            3 formations débutant
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
            Démarrer avec l&apos;IA : BTP-01 (bâtiment), BTP-04 (TP), BTP-05 (sensibilisation)
          </p>
          <p className="mt-4 text-base font-bold text-[#10B981]">100 € HT / participant</p>
        </div>
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition duration-200 hover:border-[#377CF3] hover:shadow-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7]">
            <Trophy className="h-8 w-8 text-[#F59E0B]" strokeWidth={1.75} aria-hidden />
          </div>
          <h3 className="mt-6 font-display text-lg font-semibold text-[#0F172A]">
            3 formations avancées
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
            Passer à la production : BTP-02 (appels d&apos;offre), BTP-03 (RH), BTP-06 (architecte)
          </p>
          <p className="mt-4 text-base font-bold text-[#F97316]">175 € HT / participant</p>
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
