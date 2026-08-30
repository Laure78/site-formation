import { CATALOGUE_POSITIONNEMENT } from '@/lib/formations-catalogue-architecture';

/**
 * Promesse commerciale du catalogue — section GEO en tête de page.
 */
export function FormationsCataloguePromiseSection() {
  const { promesseDocuments, promesseLivrables, differentiators } = CATALOGUE_POSITIONNEMENT;

  return (
    <section
      id="catalogue-positionnement"
      className="mt-6 rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-[#EFF6FF] to-white p-5 md:p-8"
      aria-labelledby="catalogue-positionnement-heading"
    >
      <h2 id="catalogue-positionnement-heading" className="font-display text-xl font-bold text-[#0F172A] md:text-2xl">
        {CATALOGUE_POSITIONNEMENT.h1}
      </h2>
      <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#334155] md:text-lg">{promesseDocuments}</p>
      <p className="mt-3 max-w-4xl text-base font-medium leading-relaxed text-[#0F172A]">{promesseLivrables}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {differentiators.map((item) => (
          <li
            key={item}
            className="rounded-full border border-[#BFDBFE] bg-white px-3 py-1.5 text-xs font-medium text-[#1E40AF] md:text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
