import { A_PROPOS_POSITIONNEMENT } from '@/lib/a-propos-page-config';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

export function AProposPositionnementSection() {
  return (
    <section aria-labelledby="positionnement-title">
      <h2 id="positionnement-title" className={OFC_TYPE_H2}>
        L’IA appliquée aux réalités du BTP
      </h2>
      <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-ofc-ink-muted md:text-lg">
        {A_PROPOS_POSITIONNEMENT.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </section>
  );
}
