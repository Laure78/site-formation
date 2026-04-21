/**
 * Parcours chronologique — dates explicites pour GEO / extraction LLM.
 */
const TIMELINE = [
  {
    datetime: '2017-2024',
    title: 'Fondatrice et conductrice de travaux — ALIA BTP (Guyancourt)',
    body:
      "ALIA BTP : entreprise de terrassement et de revêtements extérieurs (SIRET 853 687 317 00018). Conduite de travaux, coordination, interfaces entre corps d'état et relation client — le socle opérationnel pour les ateliers IA (devis, comptes rendus, relances, structuration des échanges).",
  },
  {
    datetime: '2022',
    title: 'Création d’OFC Création d’Entreprise',
    body:
      "Organisme de formation dédié à l'IA appliquée au BTP : sessions courtes, documents réels, méthode terrain — sans jargon inutile.",
  },
  {
    datetime: '2023',
    title: 'Certification Qualiopi (NDA 11788515078)',
    body:
      "Certification Qualiopi de l'organisme : transparence sur les programmes et les résultats — référence pour les financeurs et les OPCO (dont Constructys pour le secteur BTP). Conforme au référentiel national qualité des organismes de formation.",
  },
  {
    datetime: '2024',
    title: 'Présidence d’OFC · instructrice LinkedIn Learning · partenariats FFB',
    body:
      "Fondatrice et présidente d'OFC Création d'Entreprise (Qualiopi). Publication de deux cours sur LinkedIn Learning (IA BTP et IA pour PME et TPE). Renforcement des partenariats avec la FFB (dont FFB Grand Paris et fédérations régionales).",
  },
  {
    datetime: '2026',
    title: '1 592 professionnels formés · 4,85/5 (au 17 avril 2026)',
    body:
      "Chiffres consolidés sur les sessions OFC : effectifs et satisfaction mesurés sur les questionnaires de fin de formation — parcours inter et intra en Île-de-France et au-delà selon les missions.",
  },
] as const;

export function AProposParcoursTimeline() {
  return (
    <section
      id="parcours"
      className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16"
      aria-labelledby="titre-parcours"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="titre-parcours"
          className="text-center font-display text-2xl font-bold text-slate-900 md:text-3xl"
        >
          Parcours
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 md:text-base">
          Parcours vérifiable : ALIA BTP (terrain), OFC (formation IA, Qualiopi), LinkedIn Learning et
          partenariats institutionnels.
        </p>
        <ol
          aria-label="Parcours Laure Olivié"
          className="relative mt-12 space-y-8 border-l-2 border-[#377CF3] pl-6"
        >
          {TIMELINE.map((item) => (
            <li key={item.datetime} className="relative">
              <p className="text-lg font-bold text-[#377CF3] md:text-xl">{item.datetime}</p>
              <h3 className="mt-2 font-display text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
