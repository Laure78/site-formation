/**
 * Contenu page `/skills-claude-btp` — Skills Claude gratuits + méthode d’import.
 * Intention distincte : exemples téléchargeables + tuto d’usage (pas la fiche formation NIV-04).
 */

export const SKILLS_CLAUDE_BTP_META = {
  title: 'Skills Claude BTP : créer ses assistants métier | Laure Olivié',
  description:
    'Créez des Skills Claude pour vos tâches BTP : analyse de CCTP, comptes rendus et courriers. Découvrez des exemples et une méthode pratique.',
  h1: 'Skills Claude pour le BTP : créez vos assistants métier',
  eyebrow: 'Ressources gratuites · Skills Claude BTP',
} as const;

export const SKILLS_CLAUDE_BTP_INTRO = {
  definition:
    'Un Skill Claude BTP est un mode d’emploi réutilisable (fichier SKILL.md, souvent livré en .zip) que Claude charge pour exécuter une tâche métier précise — analyser un CCTP, extraire des actions d’un compte rendu, contrôler un devis — sans tout réécrire à chaque fois.',
  contexte:
    'Les cinq exemples ci-dessous sont issus d’une session « Créer des assistants IA avec Claude » animée le 9 octobre 2026 dans une entreprise de gros œuvre de l’Essonne (dirigeant, directeur technique, conducteurs de travaux, assistante, comptable, chargé d’études de prix).',
  auteur:
    'Laure Olivié — formatrice IA pour le BTP, OFC Création d’Entreprise (organisme certifié Qualiopi, actions de formation). Formations en présentiel en Île-de-France.',
} as const;

/** Distinctions vérifiées — doc Anthropic Skills / Projects. */
export const SKILLS_VS_PROMPT_PROJET = [
  {
    term: 'Prompt',
    text: 'Instruction ponctuelle dans une conversation. Utile pour une demande unique ; à reformuler à chaque nouvel échange.',
  },
  {
    term: 'Projet Claude',
    text: 'Espace de travail avec documents et consignes de fond, toujours chargés dans les chats de ce projet.',
  },
  {
    term: 'Skill Claude',
    text: 'Procédure réutilisable (consignes, éventuellement fichiers) que Claude active quand la demande correspond — utilisable dans plusieurs conversations.',
  },
] as const;

export const ANTHROPIC_SKILLS_DOCS = {
  overview: {
    href: 'https://claude.com/docs/skills/overview',
    label: 'Documentation Claude — Skills',
  },
  explained: {
    href: 'https://claude.com/resources/articles/skills-explained',
    label: 'Skills vs prompts, Projects et MCP (Anthropic)',
  },
} as const;

export type SkillClaudeBtpCard = {
  slug: string;
  title: string;
  metier: string;
  document: string;
  tache: string;
  resultat: string;
  verification: string;
};

export const SKILLS_CLAUDE_BTP_CARDS: readonly SkillClaudeBtpCard[] = [
  {
    slug: 'analyse-cctp-gros-oeuvre',
    title: 'analyse-cctp-gros-oeuvre',
    metier: "Chargé d'études, conducteur de travaux",
    document: 'CCTP (PDF ou Word) d’un lot gros œuvre',
    tache: 'Extraire exigences, risques et questions à poser à la MOE',
    resultat: 'Liste structurée avec renvois aux articles utiles',
    verification:
      'Contrôler les citations d’articles et compléter avec votre lecture métier avant envoi',
  },
  {
    slug: 'actions-compte-rendu-chantier',
    title: 'actions-compte-rendu-chantier',
    metier: 'Conducteur de travaux',
    document: 'Compte rendu de chantier (notes ou CR rédigé)',
    tache: 'Identifier les actions qui / quoi / quand',
    resultat: 'Tableau d’actions avec responsables et échéances proposés',
    verification:
      'Valider responsables et délais avec les participants avant diffusion',
  },
  {
    slug: 'controle-devis-oublis',
    title: 'controle-devis-oublis',
    metier: "Chargé d'études de prix, dirigeant",
    document: 'Devis ou DPGF avant envoi client',
    tache: 'Repérer les oublis et incohérences de structure',
    resultat: 'Liste de points de contrôle et questions à lever',
    verification:
      'Recalculer les montants et confirmer les postes manquants en interne — l’IA ne remplace pas le chiffrage',
  },
  {
    slug: 'courriers-relances-btp',
    title: 'courriers-relances-btp',
    metier: 'Assistante, comptable, conducteur',
    document: 'Éléments factuels (facture, relance, échange MOE / fournisseur)',
    tache: 'Rédiger un projet de courrier ou de relance',
    resultat: 'Brouillon prêt à adapter au ton de l’entreprise',
    verification:
      'Relire engagements, montants et destinataires avant envoi',
  },
  {
    slug: 'methodologie-execution-gros-oeuvre',
    title: 'methodologie-execution-gros-oeuvre',
    metier: 'Directeur technique',
    document: 'Notes chantier, CCTP ou trame existante',
    tache: 'Structurer une méthodologie d’exécution',
    resultat: 'Plan de méthodologie à compléter avec vos moyens réels',
    verification:
      'Faire valider par le responsable technique avant remise en mémoire ou AO',
  },
] as const;

export const SKILLS_CLAUDE_BTP_IMAGE = {
  src: '/images/creer-skill-claude-btp.webp',
  alt: 'Tuto Claude : créer un Skill — étapes Personnalisation, Compétences et import pour le BTP',
  width: 682,
  height: 1024,
  caption:
    'Infographie : créer, importer et tester un Skill Claude (session formation assistants IA BTP).',
} as const;

export const SKILLS_CLAUDE_BTP_INSTALL_STEPS = [
  {
    name: 'Se connecter à Claude',
    text: 'Ouvrez claude.ai avec votre compte. Dans la barre de gauche, ouvrez Personnalisation, puis Compétences (Skills).',
  },
  {
    name: 'Ajouter une compétence',
    text: 'Cliquez sur « + Ajouter une compétence », puis choisissez « Importer depuis un fichier ».',
  },
  {
    name: 'Sélectionner le fichier .zip',
    text: 'Choisissez le .zip du skill téléchargé sur cette page (un skill à la fois — pas le pack entier d’un coup).',
  },
  {
    name: 'Activer et tester',
    text: 'Activez la compétence, joignez votre document (CCTP, CR, devis, courrier…) et formulez la demande métier.',
  },
] as const;

export const SKILLS_CLAUDE_BTP_CONTROLES = [
  'Vérifier les sources citées (articles CCTP, pages, dates) sur le document d’origine.',
  'Contrôler montants, engagements et destinataires avant tout envoi client ou MOE.',
  'Compléter les zones métier de votre entreprise dans le skill avant un usage récurrent.',
  'Un Skill n’assure ni exactitude automatique ni confidentialité à lui seul : choisissez l’offre Claude adaptée et vos règles internes de données.',
] as const;

export const SKILLS_CLAUDE_BTP_PREPARER = [
  'Le document type à joindre (CCTP, CR, devis, facture…).',
  'Les consignes : rôle, étapes, format de sortie, ton, interdits.',
  'Les contrôles humains obligatoires avant diffusion.',
  'Les éléments de charte ou modèles internes à mentionner dans le skill.',
] as const;
