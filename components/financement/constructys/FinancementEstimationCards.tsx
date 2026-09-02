import {
  CONSTRUCTYS_DUREE_SESSION_H,
  FINANCEMENT_ESTIMATION_DISCLAIMER,
  formatMontantHt,
  getFinancementEstimationExemples,
} from '@/lib/financement-constructys-page-config';

export function FinancementEstimationCards() {
  const exemples = getFinancementEstimationExemples();
  const exemplePrincipal = exemples.filter((e) => e.participants === 6);

  return (
    <section aria-labelledby="estimation-title" className="scroll-mt-24">
      <h2
        id="estimation-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Quel montant peut être pris en charge ?
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64748B]">
        Exemples pour une session intra-entreprise de {CONSTRUCTYS_DUREE_SESSION_H} h (tarif OFC
        facturé). Calcul retenu : minimum entre plafond horaire × durée × stagiaires, plafond
        journalier de groupe et coût pédagogique facturé.
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {exemplePrincipal.map((ex) => (
          <article
            key={ex.id}
            className="flex flex-col rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
          >
            <h3 className="font-display text-lg font-bold text-[#0F172A]">{ex.tranche}</h3>
            <p className="mt-1 text-sm text-[#64748B]">{ex.participants} participants · intra</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-2 border-b border-[#F1F5F9] pb-2">
                <dt className="text-[#64748B]">Plafond horaire / stagiaire</dt>
                <dd className="font-semibold text-[#0F172A]">{ex.plafondHoraireHt} € HT/h</dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-[#F1F5F9] pb-2">
                <dt className="text-[#64748B]">Plafond journalier / groupe intra</dt>
                <dd className="font-semibold text-[#0F172A]">{ex.plafondGroupeJourHt} € HT</dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-[#F1F5F9] pb-2">
                <dt className="text-[#64748B]">Tarif OFC facturé</dt>
                <dd className="font-semibold text-[#0F172A]">{formatMontantHt(ex.tarifFactureHt)}</dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-[#F1F5F9] pb-2">
                <dt className="text-[#377CF3]">Participation estimée</dt>
                <dd className="font-bold text-[#377CF3]">
                  {formatMontantHt(ex.priseEnChargeHt)}
                </dd>
              </div>
              <div className="flex justify-between gap-2 pt-1">
                <dt className="text-[#64748B]">Reste à charge possible</dt>
                <dd className="font-semibold text-[#0F172A]">
                  {formatMontantHt(ex.resteAChargeHt)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-[#F8FAFC] px-4 py-3 text-sm text-[#475569]">
        <strong>12 participants (TPE, intra) :</strong> le plafond journalier de groupe (
        {exemples.find((e) => e.id === 'tpe-12')?.plafondGroupeJourHt} € HT) limite la prise en
        charge à {formatMontantHt(exemples.find((e) => e.id === 'tpe-12')?.priseEnChargeHt ?? 0)},
        et non le seul calcul horaire × effectif.
      </p>
      <p className="mt-3 text-sm italic text-[#64748B]">{FINANCEMENT_ESTIMATION_DISCLAIMER}</p>
    </section>
  );
}
