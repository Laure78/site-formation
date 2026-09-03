/** Programme NIV-02 — 4 h exactes, accordéon HTML natif. */
const MODULES = [
  {
    title: 'Accueil et cadrage — 15 min',
    points: [
      'Vérification des prérequis',
      'Présentation du dossier fil rouge',
      'Objectifs et règles de confidentialité',
    ],
  },
  {
    title: 'Module 1 — Préparer l’analyse du DCE — 45 min',
    points: [
      'Rôle du RC, du CCAP, du CCTP, de la DPGF et du BPU',
      'Organisation des fichiers',
      'Méthode de prompt avec citations des pièces sources',
      'Limites de l’analyse automatisée',
    ],
  },
  {
    title: 'Module 2 — Analyser et croiser les pièces — 1 h',
    points: [
      'Extraction des exigences',
      'Identification des délais, pénalités et documents attendus',
      'Comparaison du CCTP et de la DPGF',
      'Liste de points à vérifier et retour aux documents sources',
    ],
  },
  {
    title: 'Module 3 — Préparer le chiffrage — 45 min',
    points: [
      'Checklist des prestations',
      'Comparaison avec un ancien devis',
      'Identification des écarts apparents',
      'Questions à adresser à la maîtrise d’œuvre',
      'L’IA ne calcule pas le prix définitif — quantités, métrés, déboursés, marges et prix sont contrôlés par l’entreprise',
    ],
  },
  {
    title: 'Module 4 — Structurer le mémoire technique — 1 h',
    points: [
      'Lecture des critères et pondérations du RC',
      'Création du plan',
      'Sélection des preuves réelles de l’entreprise',
      'Rédaction guidée d’une section',
      'Contrôle des affirmations et engagements',
    ],
  },
  {
    title: 'Bilan — 15 min',
    points: [
      'Checklist finale',
      'Plan d’action',
      'Évaluation',
      'Ressources remises',
    ],
  },
] as const;

export function ProgrammeAccordionAppelsOffre() {
  return (
    <div className="mt-5 space-y-2">
      {MODULES.map((mod, index) => (
        <details
          key={mod.title}
          className="group rounded-xl border border-slate-200 bg-white open:shadow-sm"
          open={index === 0}
        >
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 px-4 py-3 text-left marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#377CF3] text-sm font-bold text-white">
              {index + 1}
            </span>
            <span className="flex-1 font-display text-base font-semibold text-slate-900">{mod.title}</span>
            <span className="text-sm text-slate-500 group-open:hidden" aria-hidden>
              +
            </span>
            <span className="hidden text-sm text-slate-500 group-open:inline" aria-hidden>
              −
            </span>
          </summary>
          <ul className="list-disc space-y-2 border-t border-slate-100 px-4 py-4 pl-16 text-base text-slate-700">
            {mod.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
