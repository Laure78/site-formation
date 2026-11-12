const FEATURES = [
  {
    name: 'Projets',
    role: 'Un espace avec vos documents et des consignes permanentes',
    example: 'Un projet par opération : programme, CCTP, DPGF, planning, CR précédents',
    highlight: true,
  },
  {
    name: 'Skills',
    role: 'Une méthode enregistrée une fois et appliquée automatiquement',
    example: "« CR de chantier au format de l'agence »",
    highlight: false,
  },
  {
    name: 'Connecteurs',
    role: 'Un accès à vos outils : Outlook, Gmail, Google Drive, SharePoint',
    example: "Retrouver le dernier mail d'une entreprise sur un lot",
    highlight: false,
  },
  {
    name: 'Fichiers',
    role: 'Lecture de PDF, Word, Excel et production de documents',
    example: 'Tableau comparatif des offres en Excel',
    highlight: false,
  },
  {
    name: 'Tâches planifiées',
    role: 'Une consigne qui se lance seule à intervalle régulier',
    example: 'Chaque lundi, la liste des actions en retard',
    highlight: false,
  },
  {
    name: 'Agents et Claude Code',
    role: 'Des traitements en plusieurs étapes sur de nombreux fichiers',
    example: "Classer les pièces d'un DOE et repérer les manquants",
    highlight: false,
  },
] as const;

export function ClaudeMoeFeatureCards() {
  return (
  <ul className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Fonctionnalités Claude">
      {FEATURES.map((f) => (
        <li
          key={f.name}
          className={
            f.highlight
              ? 'rounded-2xl bg-[#377CF3] p-5 text-white shadow-sm'
              : 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'
          }
        >
          <p className="font-display text-base font-bold">{f.name}</p>
          <p className={`mt-2 text-sm leading-relaxed ${f.highlight ? 'text-white/90' : 'text-[#555F6D]'}`}>
            {f.role}
          </p>
          <p className={`mt-2 text-xs leading-relaxed ${f.highlight ? 'text-white/80' : 'text-slate-500'}`}>
            Ex. : {f.example}
          </p>
        </li>
      ))}
    </ul>
  );
}
