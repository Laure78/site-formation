/** Tutoriel d'installation — skills Claude (.skill). */

export const SKILL_INSTALL_TUTORIAL = {
  kicker: 'Mode d\'emploi',
  title: 'Comment installer un skill Claude',
  intro: 'Télécharge le fichier .skill et importe-le dans Claude — c\'est tout.',
  steps: [
    {
      n: 1,
      title: 'Télécharger',
      text: 'Choisis un skill ci-dessous et clique sur .skill.',
    },
    {
      n: 2,
      title: 'Importer',
      text: 'Claude.ai : Paramètres → Skills → Importer. Claude Code : npx skill-import mon-skill.skill',
    },
    {
      n: 3,
      title: 'Utiliser',
      text: 'Décris ta tâche (« analyse ce DCE », « rédige le CR »…). Claude suit les instructions du skill.',
    },
  ],
  disclaimer: 'Brouillon IA à relire avant envoi client — ne remplace pas un avis métier ou juridique.',
} as const;
