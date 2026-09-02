import { A_PROPOS_POSITIONNEMENT } from '@/lib/a-propos-page-config';

export function AProposPositionnementSection() {
  return (
    <section aria-labelledby="positionnement-title">
      <h2
        id="positionnement-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        L’IA appliquée aux réalités du BTP
      </h2>
      <div className="mt-5 space-y-4 text-base leading-relaxed text-[#475569]">
        {A_PROPOS_POSITIONNEMENT.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </section>
  );
}
