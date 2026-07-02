/** Tutoriel d'installation — skills Claude (.skill et .md). */

export type TutorialStep = {
  id: string;
  title: string;
  items: string[];
};

export const SKILL_INSTALL_TUTORIAL = {
  kicker: 'Mode d\'emploi',
  title: 'Comment installer un skill Claude',
  intro:
    'Chaque skill est un dossier contenant un fichier SKILL.md (instructions métier BTP). Tu peux le télécharger en .md (fichier seul) ou en .skill (archive prête à importer). Les deux formats proviennent de la même source BeWork.',
  formats: [
    {
      ext: '.md',
      label: 'Fichier Markdown',
      hint: 'Idéal pour lire, modifier ou coller les consignes dans un projet. Renomme-le SKILL.md si tu crées un dossier skill à la main.',
    },
    {
      ext: '.skill',
      label: 'Archive Claude',
      hint: 'Fichier ZIP renommé en .skill — structure officielle Claude (dossier + SKILL.md + scripts éventuels). À importer dans Claude.ai, Claude Code ou Cursor.',
    },
  ],
  sections: [
    {
      id: 'claude-web',
      title: 'Claude.ai (navigateur)',
      items: [
        'Télécharge le fichier .skill du skill souhaité.',
        'Ouvre Claude.ai → Paramètres → Capacités → Skills (ou « Compétences »).',
        'Clique sur « Importer » / « Upload » et sélectionne le fichier .skill.',
        'Vérifie que le nom du skill correspond au dossier (ex. promotech-analyse-dce).',
        'Dans une conversation, décris ta tâche : Claude active le skill quand la description correspond.',
        'Relis toujours le livrable avant envoi client — l\'IA ne remplace pas ton jugement métier.',
      ],
    },
    {
      id: 'claude-code',
      title: 'Claude Code (terminal)',
      items: [
        'Télécharge le .skill ou le dossier décompressé.',
        'Option rapide : npx skill-import chemin/vers/mon-skill.skill',
        'Option manuelle : décompresse dans ~/.claude/skills/<nom-du-skill>/ avec SKILL.md à la racine.',
        'Le nom du dossier doit être identique au champ name dans le frontmatter YAML.',
        'Relance Claude Code si besoin — le skill est invoqué par son nom ou par une demande métier explicite.',
      ],
    },
    {
      id: 'cursor',
      title: 'Cursor (IDE)',
      items: [
        'Télécharge le .md ou décompresse le .skill.',
        'Crée un dossier .cursor/skills/<nom-du-skill>/ à la racine de ton projet (ou dans ~/.cursor/skills/ pour un usage global).',
        'Place le fichier sous le nom SKILL.md (casse exacte).',
        'Cursor charge le skill quand la tâche correspond à la description du frontmatter.',
        'Pour un skill avec scripts (ex. CR 3D MANAGER), conserve aussi le sous-dossier scripts/ fourni dans le .skill.',
      ],
    },
    {
      id: 'md-seul',
      title: 'Utiliser uniquement le .md',
      items: [
        'Télécharge le fichier .md et ouvre-le dans un éditeur de texte.',
        'Copie le corps (après le frontmatter ---) dans un prompt système ou une instruction projet.',
        'Adapte les mentions MOEX / promoteur à ton entreprise si tu n\'es pas sur le même périmètre.',
        'Pour une utilisation répétée, transforme-le en skill officiel (dossier + SKILL.md) — c\'est plus fiable qu\'un copier-coller.',
      ],
    },
  ] satisfies TutorialStep[],
  disclaimer:
    'Ces skills sont des aides à la rédaction. Ils ne se substituent pas à un BET, un architecte, un bureau de contrôle ni à un conseil juridique. Validation humaine obligatoire avant diffusion.',
} as const;
