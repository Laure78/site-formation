/** Contexte atelier — exercice guidé, fil des 2 jours, 5 situations de test (NIV-14). */

export function Niv14AtelierContext() {
  return (
    <div className="mx-auto max-w-[80rem] space-y-10 px-4 sm:px-6 lg:px-8">
      <section
        className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 md:p-8"
        aria-labelledby="niv14-exercice-guide-title"
      >
        <h2 id="niv14-exercice-guide-title" className="font-display text-lg font-semibold text-[#101936]">
          Exercice guidé — un formulaire alimente un tableau de suivi
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
          En atelier commun, vous reliez un formulaire de demande à un tableau : une ligne est créée à
          chaque soumission. Vous testez le flux avant d’appliquer la même méthode à un cas métier de
          votre choix — relances de devis, comptes rendus de chantier ou demandes d’intervention.
        </p>
      </section>

      <section aria-labelledby="niv14-jours-synthese-title">
        <h2 id="niv14-jours-synthese-title" className="ofc-type-h2 text-[#101936]">
          Les deux journées en pratique
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-[#377CF3]">Jour 1</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Choisir une tâche selon sa fréquence, le temps qu’elle prend et la clarté de ses étapes.
              Préparer les accès de test, relier deux outils dans Make, puis ajouter une étape IA et une
              validation humaine.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-[#377CF3]">Jour 2</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Construire votre scénario BTP, le tester sur cinq situations, configurer une alerte,
              documenter la reprise et comparer le temps de traitement avant et après — relecture
              comprise. La mesure est réalisée par chaque participant sur son propre cas.
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="niv14-cinq-tests-title">
        <h2 id="niv14-cinq-tests-title" className="font-display text-base font-semibold text-[#101936]">
          Cinq situations testées en atelier
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Vous repartez avec une automatisation testée — pas seulement un scénario brouillon.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {[
            'Cas standard',
            'Doublon',
            'Donnée manquante',
            'Sortie IA invalide',
            'Connecteur indisponible',
          ].map((label) => (
            <li
              key={label}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-800"
            >
              {label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}