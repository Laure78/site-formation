const ETAPES = [
  {
    titre: 'Positionnement',
    texte: 'Identification du métier, du niveau et des modules adaptés — avant inscription.',
  },
  {
    titre: 'Modules progressifs',
    texte: 'Chaque étape travaille une compétence, avec exercice professionnel et livrable.',
  },
  {
    titre: 'Cas pratique commun',
    texte: 'Un fil rouge relie les modules du parcours pour ancrer les acquis.',
  },
  {
    titre: 'Évaluation des acquis',
    texte: 'Intégrée à la durée annoncée — sans heures d’accompagnement implicites.',
  },
] as const;

export function FormationsDeroulementParcours() {
  return (
    <section className="mt-16 border-t border-[#E2E8F0] pt-14" aria-labelledby="deroulement-parcours-title">
      <h2 id="deroulement-parcours-title" className="ofc-type-h2 text-ofc-ink">
        Déroulement d’un parcours
      </h2>
      <p className="mt-3 max-w-2xl text-ofc-ink-muted">
        Un parcours regroupe des modules dans un ordre pédagogique. Les journées peuvent être espacées
        dans le temps.
      </p>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ETAPES.map((e, i) => (
          <li key={e.titre} className="border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
              Étape {i + 1}
            </p>
            <h3 className="mt-2 font-semibold text-ofc-ink">{e.titre}</h3>
            <p className="mt-2 text-sm text-ofc-ink-muted">{e.texte}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
