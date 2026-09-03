/** Programme NIV-01 — 4 modules, 4 h, accordéon HTML natif. */
const MODULES = [
  {
    title: 'Module 1 — Comprendre et utiliser l’IA',
    points: [
      'ChatGPT, Claude et principaux outils',
      'Méthode de prompt (rôle, tâche, contexte)',
      'Limites, erreurs fréquentes et relecture',
      'Confidentialité et anonymisation des documents',
    ],
  },
  {
    title: 'Module 2 — Devis et chiffrage',
    points: [
      'Structurer une désignation d’ouvrage',
      'Reformuler un devis et préparer des variantes',
      'Créer une checklist de contrôle',
      'Prix, quantités, métrés et références techniques : vérification par le professionnel',
    ],
  },
  {
    title: 'Module 3 — Documents de chantier',
    points: [
      'Comptes rendus',
      'DOE',
      'PV de réception',
      'Levée de réserves',
      'Emails de suivi',
    ],
  },
  {
    title: 'Module 4 — Communication professionnelle',
    points: [
      'Emails commerciaux',
      'Présentation d’une réalisation',
      'Contenus pour les réseaux sociaux',
      'Calendrier éditorial simple',
    ],
  },
] as const;

export function ProgrammeAccordionBatiment() {
  return (
    <div className="mt-8 space-y-3">
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
