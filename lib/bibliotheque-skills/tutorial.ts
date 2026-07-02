/** Tutoriel d'installation — skills Claude (.skill et .md). */

export const SKILL_INSTALL_TUTORIAL = {
  kicker: 'Mode d\'emploi',
  title: 'Comment installer un skill Claude',
  intro:
    'Télécharge le .skill (import direct) ou le .md (lecture / copier-coller). Même contenu, deux usages.',
  steps: [
    {
      n: 1,
      title: 'Télécharger',
      text: 'Choisis un skill ci-dessous. Clique sur .skill pour l\'importer, ou sur .md pour lire les consignes.',
    },
    {
      n: 2,
      title: 'Importer dans Claude',
      text: 'Claude.ai : Paramètres → Skills → Importer le fichier .skill. Claude Code : npx skill-import mon-skill.skill',
    },
    {
      n: 3,
      title: 'Utiliser',
      text: 'Décris ta tâche en langage naturel (« analyse ce DCE », « rédige le CR »…). Claude suit les instructions du skill.',
    },
  ],
  formats: [
    { ext: '.skill', label: 'Import Claude.ai / Claude Code' },
    { ext: '.md', label: 'Lecture ou copier-coller' },
  ],
  disclaimer: 'Brouillon IA à relire avant envoi client — ne remplace pas un avis métier ou juridique.',
} as const;
