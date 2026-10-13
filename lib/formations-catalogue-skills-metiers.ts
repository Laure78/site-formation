/**
 * Exemples pédagogiques Skills métiers — section catalogue `/formations`.
 * Pas de fichiers téléchargeables ni de noms d’entreprises clientes.
 */

export type SkillMetierExemple = {
  readonly title: string;
  readonly description: string;
};

export type SkillMetierGroupe = {
  readonly id: string;
  readonly title: string;
  readonly examples: readonly SkillMetierExemple[];
};

export const SKILLS_METIERS_INTRO =
  'Vous répétez les mêmes consignes à chaque document ? Apprenez à les transformer en Skills réutilisables, adaptés aux méthodes de votre entreprise.' as const;

export const SKILLS_METIERS_GROUPES: readonly SkillMetierGroupe[] = [
  {
    id: 'etudes-chiffrage',
    title: 'Études et chiffrage',
    examples: [
      {
        title: 'Analyse CCTP',
        description:
          'Extraire les exigences, citer les articles et repérer les points à clarifier.',
      },
      {
        title: 'Devis',
        description:
          'Structurer les prestations à partir du métré et de votre grille de prix.',
      },
      {
        title: 'Synthèse documentaire',
        description: 'Résumer les pièces avec leurs pages sources.',
      },
    ],
  },
  {
    id: 'conduite-travaux',
    title: 'Conduite de travaux',
    examples: [
      {
        title: 'Comptes rendus',
        description: 'Identifier les actions, responsables et échéances.',
      },
      {
        title: 'Suivi des visas',
        description: 'Suivre les validations et préparer les relances.',
      },
      {
        title: 'PIC',
        description: 'Préparer un projet de plan et les points à valider.',
      },
      {
        title: 'PPSPS',
        description:
          'Adapter une trame aux informations du chantier, avec contrôle du responsable compétent.',
      },
    ],
  },
  {
    id: 'administration',
    title: 'Administration et relation client',
    examples: [
      {
        title: 'Courriers travaux',
        description: 'Préparer des réponses, demandes et rapports.',
      },
      {
        title: 'Relances clients',
        description: 'Rédiger des projets de relance à partir des factures.',
      },
      {
        title: 'Sous-traitance',
        description: 'Organiser les pièces et suivre leur renouvellement.',
      },
      {
        title: 'Suivi administratif',
        description:
          'Structurer les tableaux de formations, habilitations, EPI et matériels.',
      },
    ],
  },
  {
    id: 'communication',
    title: 'Communication et transmission',
    examples: [
      {
        title: 'Communication',
        description: 'Préparer des publications et réponses aux avis.',
      },
      {
        title: 'Supports internes',
        description: 'Préparer un accueil sécurité ou une fiche de procédure.',
      },
      {
        title: 'Dossiers d’expertise',
        description:
          'Organiser une chronologie sourcée et les points à soumettre au conseil juridique.',
      },
    ],
  },
] as const;

export const SKILLS_METIERS_BENEFICES = {
  title: 'Vos méthodes deviennent réutilisables',
  text: 'Définissez une fois les consignes, les sources, les contrôles et le format attendu. Adaptez vos Skills à vos documents et à votre charte graphique. Vérifiez chaque production avant utilisation.',
} as const;

/** Ancre carte catalogue NIV-04 (création de Skills) — évite un 2ᵉ lien vers la fiche. */
export const SKILLS_METIERS_CTA_FORMATION_ANCHOR = '#formation-card-NIV-04' as const;
