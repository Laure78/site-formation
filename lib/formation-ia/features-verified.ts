/**
 * Fonctionnalités Claude / ChatGPT retenues pour les programmes —
 * descriptions calées sur les centres d’aide officiels (vérifiées avant publication).
 *
 * Sources :
 * - https://support.claude.com/ (Projects, Artifacts, Connectors, Cowork, Skills)
 * - https://help.openai.com/ (Projects, Data analysis, Deep research, Canvas, image)
 *
 * Ne pas annoncer une fonctionnalité absente de ce registre.
 */
import type { IaFonctionnaliteId, IaOutil } from '@/lib/formation-ia/types';

export type IaFonctionnaliteVerifiee = {
  id: IaFonctionnaliteId;
  label: string;
  outil: IaOutil;
  /** Description courte, factuelle. */
  description: string;
  prerequisTechniques: string;
  /** Formules / limites d’accès — ne jamais écrire « gratuit pour tous ». */
  accesEtAbonnement: string;
  /** Solution pédagogique si la fonction n’est pas disponible en session. */
  remplacementPedagogique: string;
  sourceUrl: string;
  sourceLabel: string;
};

export const IA_FONCTIONNALITES_VERIFIEES: Record<
  IaFonctionnaliteId,
  IaFonctionnaliteVerifiee
> = {
  'prompts-fichiers': {
    id: 'prompts-fichiers',
    label: 'Conversation avec fichiers et consignes',
    outil: 'claude-et-chatgpt',
    description:
      'Déposer un document anonymisé, formuler un objectif et un format de sortie, puis itérer sur la réponse.',
    prerequisTechniques: 'Compte Claude ou ChatGPT ; navigateur ; fichiers anonymisés.',
    accesEtAbonnement:
      'Disponible sur les formules courantes ; volumes et modèles varient selon l’abonnement.',
    remplacementPedagogique:
      'Coller un extrait anonymisé dans le prompt et travailler sur une trame papier fournie.',
    sourceUrl: 'https://support.claude.com/',
    sourceLabel: 'Claude Help Center — fichiers et conversations',
  },
  'claude-projects': {
    id: 'claude-projects',
    label: 'Projets Claude',
    outil: 'claude',
    description:
      'Espace de travail avec instructions permanentes et base documentaire réutilisée d’une conversation à l’autre.',
    prerequisTechniques: 'Compte Claude ; documents de projet anonymisés.',
    accesEtAbonnement:
      'Projets disponibles sur les formules Claude ; capacité élargie (mode RAG) sur plans payants lorsque la base approche la limite de contexte.',
    remplacementPedagogique:
      'Conserver un fichier d’instructions + pièces jointes dans une conversation unique pour la session.',
    sourceUrl:
      'https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects',
    sourceLabel: 'Claude Help Center — Projects',
  },
  'claude-skills': {
    id: 'claude-skills',
    label: 'Skills Claude',
    outil: 'claude',
    description:
      'Procédures réutilisables (SKILL.md + ressources) chargées quand la tâche correspond.',
    prerequisTechniques:
      'Compte Claude avec Skills activés ; lecture du SKILL.md avant activation d’un skill tiers.',
    accesEtAbonnement:
      'Skills Anthropic, partenaires, organisation ou personnalisés — disponibilité selon formule et paramètres du compte.',
    remplacementPedagogique:
      'Prompt-procédure versionné (checklist + format de sortie) collé en tête de conversation.',
    sourceUrl: 'https://claude.com/docs/skills/overview',
    sourceLabel: 'Documentation Claude — Skills',
  },
  'claude-artifacts': {
    id: 'claude-artifacts',
    label: 'Artifacts Claude',
    outil: 'claude',
    description:
      'Livrables éditables à côté du chat (documents, tableaux, supports) pour itérer sans perdre le fil.',
    prerequisTechniques: 'Compte Claude avec Artifacts activés.',
    accesEtAbonnement:
      'Artifacts disponibles sur Free, Pro, Max, Team et Enterprise (paramétrage Enterprise possible).',
    remplacementPedagogique:
      'Exporter la réponse vers un fichier Word / Excel local et itérer par copier-coller.',
    sourceUrl:
      'https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them',
    sourceLabel: 'Claude Help Center — Artifacts',
  },
  'claude-connectors': {
    id: 'claude-connectors',
    label: 'Connecteurs Claude',
    outil: 'claude',
    description:
      'Relier Claude à des applications externes (fichiers, agenda, messagerie…) via le répertoire Connectors / MCP.',
    prerequisTechniques:
      'Autorisations d’accès de l’entreprise ; validation du connecteur ; données hors périmètre sensible.',
    accesEtAbonnement:
      'Selon formule et politiques Team/Enterprise ; chaque utilisateur connecte ses propres apps.',
    remplacementPedagogique:
      'Télécharger manuellement les pièces depuis le drive et les déposer dans un Projet Claude.',
    sourceUrl: 'https://claude.com/docs/connectors/getting-started',
    sourceLabel: 'Documentation Claude — Connectors',
  },
  'claude-cowork': {
    id: 'claude-cowork',
    label: 'Claude Cowork',
    outil: 'claude',
    description:
      'Collaboration sur des tâches documentaires plus longues, avec supervision humaine des étapes.',
    prerequisTechniques: 'Accès Cowork selon formule ; pièces anonymisées ; validation avant diffusion.',
    accesEtAbonnement:
      'Fonctionnalité présentée dans le centre d’aide Claude (collection Cowork) — accès selon offre souscrite.',
    remplacementPedagogique:
      'Enchaînement guidé de prompts dans un Projet, avec points de contrôle formateur entre chaque étape.',
    sourceUrl: 'https://support.claude.com/',
    sourceLabel: 'Claude Help Center — Claude Cowork',
  },
  'chatgpt-projects': {
    id: 'chatgpt-projects',
    label: 'Projets ChatGPT',
    outil: 'chatgpt',
    description:
      'Espace regroupant chats, fichiers et instructions pour un travail long (dossier, affaire, chantier).',
    prerequisTechniques: 'Compte ChatGPT ; fichiers de référence anonymisés.',
    accesEtAbonnement:
      'Projets disponibles pour les formules Free et payantes ; partage d’équipe selon offres Business / Enterprise / Edu.',
    remplacementPedagogique:
      'Une conversation dédiée avec instructions en tête + fichiers joints pour la durée de l’exercice.',
    sourceUrl: 'https://help.openai.com/en/articles/10169521-chatgpt-projects',
    sourceLabel: 'OpenAI Help — Projects in ChatGPT',
  },
  'chatgpt-data-analysis': {
    id: 'chatgpt-data-analysis',
    label: 'Analyse de données ChatGPT',
    outil: 'chatgpt',
    description:
      'Analyser tableurs / CSV déposés, produire tableaux et graphiques, exécuter des calculs dans un environnement Python isolé.',
    prerequisTechniques:
      'Fichier structuré (colonnes claires) ; relecture du code et des hypothèses avant usage métier.',
    accesEtAbonnement:
      'Disponible selon modèle et formule ; limites d’upload variables. L’environnement Python n’accède pas au web.',
    remplacementPedagogique:
      'Calculs guidés dans Excel / Numbers + synthèse textuelle demandée à l’IA sans exécution de code.',
    sourceUrl: 'https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt',
    sourceLabel: 'OpenAI Help — Data analysis',
  },
  'chatgpt-deep-research': {
    id: 'chatgpt-deep-research',
    label: 'Deep research ChatGPT',
    outil: 'chatgpt',
    description:
      'Recherche multi-sources avec plan validable et rapport cité — utile pour cadrer une veille, pas pour remplacer une expertise réglementaire.',
    prerequisTechniques:
      'Formule donnant accès à Deep research ; sources autorisées ; vérification des citations.',
    accesEtAbonnement:
      'Accès selon abonnement payant ; les apps connectées dépendent des autorisations du compte.',
    remplacementPedagogique:
      'Recherche guidée manuelle + synthèse structurée demandée à ChatGPT ou Claude à partir de sources fournies.',
    sourceUrl: 'https://help.openai.com/en/articles/10500283-deep',
    sourceLabel: 'OpenAI Help — Deep research',
  },
  'chatgpt-canvas': {
    id: 'chatgpt-canvas',
    label: 'Canvas ChatGPT',
    outil: 'chatgpt',
    description:
      'Espace de travail dédié pour rédiger, réviser et affiner un document long à côté du chat.',
    prerequisTechniques: 'Compte ChatGPT avec Canvas disponible sur le modèle utilisé.',
    accesEtAbonnement: 'Selon formule et modèle ; toujours vérifier le résultat avant envoi.',
    remplacementPedagogique:
      'Rédaction dans un traitement de texte + passes de révision par prompts successifs.',
    sourceUrl: 'https://help.openai.com/en/articles/9260256',
    sourceLabel: 'OpenAI Help — Capabilities (Canvas)',
  },
  'chatgpt-image-analysis': {
    id: 'chatgpt-image-analysis',
    label: 'Analyse d’images ChatGPT',
    outil: 'chatgpt',
    description:
      'Décrire une photo (chantier, désordre, plan) pour formuler observations et questions — sans constater une conformité.',
    prerequisTechniques:
      'Image sans donnée personnelle identifiable ; distinguer observation, hypothèse et constat confirmé.',
    accesEtAbonnement: 'Selon modèle multimodal et formule souscrite.',
    remplacementPedagogique:
      'Description orale / écrite de la photo par le participant, puis structuration assistée par l’IA textuelle.',
    sourceUrl: 'https://help.openai.com/en/articles/9260256',
    sourceLabel: 'OpenAI Help — Capabilities overview',
  },
};

export function getIaFonctionnalite(
  id: IaFonctionnaliteId,
): IaFonctionnaliteVerifiee {
  return IA_FONCTIONNALITES_VERIFIEES[id];
}

export function labelOutil(outil: IaOutil): string {
  if (outil === 'claude') return 'Claude';
  if (outil === 'chatgpt') return 'ChatGPT';
  return 'Claude ou ChatGPT';
}
