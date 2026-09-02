import {
  FINANCEMENT_ENTREPRISE_REALISE,
  FINANCEMENT_OFC_FOURNIT,
} from '@/lib/financement-constructys-page-config';

export function FinancementQuiFaitQuoiSection() {
  return (
    <section aria-labelledby="qui-fait-quoi-title" className="scroll-mt-24">
      <h2
        id="qui-fait-quoi-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Qui fait quoi ?
      </h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-5">
          <h3 className="font-display text-lg font-bold text-[#377CF3]">OFC fournit</h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#334155]">
            {FINANCEMENT_OFC_FOURNIT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h3 className="font-display text-lg font-bold text-[#0F172A]">L’entreprise réalise</h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#334155]">
            {FINANCEMENT_ENTREPRISE_REALISE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
