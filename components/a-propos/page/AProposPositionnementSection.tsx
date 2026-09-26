import { A_PROPOS_POSITIONNEMENT } from '@/lib/a-propos-page-config';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

export function AProposPositionnementSection() {
  const [parcours, pratique] = A_PROPOS_POSITIONNEMENT;

  return (
    <section
      aria-labelledby="positionnement-title"
      className="rounded-2xl border border-ofc-border bg-white p-5 shadow-sm sm:p-7 lg:p-8"
    >
      <h2 id="positionnement-title" className={OFC_TYPE_H2}>
        L’IA appliquée aux réalités du BTP
        <span
          className="mt-3 block h-1 w-14 max-w-[4rem] rounded-full bg-[#377CF3]"
          aria-hidden
        />
      </h2>

      <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-8 lg:items-start">
        <p className="text-[0.9375rem] leading-[1.65] text-ofc-ink-muted sm:text-base">{parcours}</p>
        <p className="rounded-xl border border-ofc-border bg-[#F8FAFC]/90 p-4 text-[0.9375rem] leading-[1.65] text-ofc-ink-muted sm:p-5 sm:text-base lg:border-l-[3px] lg:border-l-[#377CF3] lg:pl-5">
          {pratique}
        </p>
      </div>
    </section>
  );
}
