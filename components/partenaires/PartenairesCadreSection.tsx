import { PARTENAIRES_CADRE_TEXT, PARTENAIRES_CADRE_TITLE } from '@/lib/partenaires-references-config';

export function PartenairesCadreSection() {
  return (
    <aside
      id="cadre-references"
      className="scroll-mt-24 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-5 sm:px-6"
      aria-labelledby="cadre-references-title"
    >
      <h2
        id="cadre-references-title"
        className="font-display text-lg font-bold text-[#0F172A] sm:text-xl"
      >
        {PARTENAIRES_CADRE_TITLE}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#475569] sm:text-base">{PARTENAIRES_CADRE_TEXT}</p>
    </aside>
  );
}
