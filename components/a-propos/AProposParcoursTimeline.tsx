/**
 * Parcours chronologique — dates explicites pour GEO / extraction LLM.
 */
const TIMELINE = [
  {
    datetime: '2012',
    title: 'Début de carrière — terrain BTP et travaux publics',
    body:
      "Entrée dans la vie professionnelle sur les enjeux du bâtiment et des travaux publics : conduite de chantier, coordination, lecture de pièces et relation avec les équipes. Cette première décennie sur le terrain forge le vocabulaire et le réalisme qui structure aujourd'hui les ateliers IA.",
  },
  {
    datetime: '2017',
    title: 'Conductrice de travaux — ALIA BTP (Guyancourt, 78)',
    body:
      'Expérience en conduite de travaux et coordination pour ALIA BTP : devis, planning, interfaces entre corps d’état — le socle opérationnel pour illustrer les cas d’usage IA (comptes rendus, relances, structuration des échanges).',
  },
  {
    datetime: '2022',
    title: 'Fondation d’OFC Création d’Entreprise',
    body:
      "Création de l'organisme pour répondre à un besoin net des PME et artisans : une IA utile sur le chantier et dans l'administratif, sans jargon inutile — sessions courtes, documents réels, méthode terrain.",
  },
  {
    datetime: '2023',
    title: 'Certification Qualiopi (NDA 11788515078)',
    body:
      "Certification Qualiopi de l'organisme : exigence de transparence sur les programmes et les résultats — référence pour les financeurs et les OPCO, dont Constructys pour le secteur BTP.",
  },
  {
    datetime: '2024',
    title: 'Deux cours LinkedIn Learning · partenariats FFB',
    body:
      "Publication en tant qu'instructrice officielle sur LinkedIn Learning — deux parcours en français sur l'IA appliquée au BTP et aux TPE. Renforcement des partenariats avec la FFB (dont FFB Grand Paris) pour des publics artisans et encadrement.",
  },
  {
    datetime: '2026',
    title: '1 592 professionnels formés · note 4,85/5',
    body:
      "Chiffres consolidés sur les sessions OFC : satisfaction mesurée sur les feuilles d'évaluation, parcours inter et intra en Île-de-France et au-delà selon les missions.",
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
          Jalons datés — formation BTP, terrain, création d’OFC, Qualiopi, LinkedIn Learning et
          partenariats sectoriels.
        </p>
        <ol
          aria-label="Parcours Laure Olivié"
          className="relative mt-12 space-y-8 border-l-2 border-[#377CF3] pl-6"
        >
          {TIMELINE.map((item) => (
            <li key={item.datetime} className="relative">
              <time
                dateTime={item.datetime}
                className="text-lg font-bold text-[#377CF3] md:text-xl"
              >
                {item.datetime}
              </time>
              <h3 className="mt-2 font-display text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
