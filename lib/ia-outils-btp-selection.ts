/**
 * Sélection d’outils d’IA — usages BTP, éditeurs et liens internes.
 * Distinction explicite : outils enseignés au catalogue vs informationnel.
 */
import { LINKS } from '@/lib/internal-links';

export type IaOutilBtpCatalogueRow = {
  id: string;
  tool: string;
  editor: string;
  /** Page officielle produit ou éditeur (vérification éditoriale). */
  editorDocUrl: string;
  usageBtp: string;
  limits: string;
  resourceHref: string;
  resourceLabel: string;
  /** Présent dans un programme Qualiopi OFC (catalogue). */
  taughtInFormation: boolean;
  formationHref?: string;
  formationLabel?: string;
};

/** Tableau principal — page `/outils-ia-btp`. */
export const IA_OUTILS_BTP_CATALOGUE: readonly IaOutilBtpCatalogueRow[] = [
  {
    id: 'chatgpt',
    tool: 'ChatGPT',
    editor: 'OpenAI',
    editorDocUrl: 'https://openai.com/chatgpt',
    usageBtp:
      'Structurer un devis, rédiger un compte rendu de chantier ou accélérer un courrier client à partir de notes.',
    limits:
      'Contexte limité selon l’offre ; données sensibles : paramètres compte et politique entreprise à valider.',
    resourceHref: LINKS.formationChatgptBtp,
    resourceLabel: 'Formation ChatGPT BTP',
    taughtInFormation: true,
    formationHref: LINKS.formationIaBtpNiveau1BatimentTp,
    formationLabel: 'NIV-01 — bases IA bâtiment & TP',
  },
  {
    id: 'claude',
    tool: 'Claude',
    editor: 'Anthropic',
    editorDocUrl: 'https://www.anthropic.com/claude',
    usageBtp:
      'Synthétiser un CCTP, préparer un plan de mémoire technique ou organiser un dossier DCE multi-pièces.',
    limits:
      'Fonctions Projects, Skills ou Cowork selon abonnement ; relecture métier obligatoire sur clauses et prix.',
    resourceHref: LINKS.claudeAiBtp,
    resourceLabel: 'Guide Claude AI BTP',
    taughtInFormation: true,
    formationHref: LINKS.formationMaitriserClaudeAiBtp,
    formationLabel: 'NIV-04 — Maîtriser Claude AI pour le BTP',
  },
  {
    id: 'gemini',
    tool: 'Gemini',
    editor: 'Google',
    editorDocUrl: 'https://gemini.google/',
    usageBtp:
      'Esquisser une veille réglementaire ou reformuler une note interne (hors dossiers contractuels sensibles).',
    limits: 'Non enseigné au catalogue OFC ; conditions Google Workspace / compte personnel à vérifier.',
    resourceHref: LINKS.blogComparatifChatgptClaudeGeminiBtp,
    resourceLabel: 'Article comparatif IA BTP',
    taughtInFormation: false,
  },
  {
    id: 'copilot',
    tool: 'Microsoft Copilot',
    editor: 'Microsoft',
    editorDocUrl: 'https://www.microsoft.com/fr-fr/copilot',
    usageBtp:
      'Aider à rédiger dans Word ou Outlook lorsque Microsoft 365 Copilot est déployé dans l’entreprise.',
    limits: 'Licence et périmètre M365 requis ; non pratiqué en session OFC.',
    resourceHref: LINKS.outilsIaBtp,
    resourceLabel: 'Cette page — sélection d’outils',
    taughtInFormation: false,
  },
  {
    id: 'perplexity',
    tool: 'Perplexity',
    editor: 'Perplexity AI',
    editorDocUrl: 'https://www.perplexity.ai/',
    usageBtp:
      'Repérer des sources pour une veille BTP (normes, retours d’expérience) avec liens cités — pas pour signer un devis.',
    limits: 'Les réponses ne remplacent pas le DCE ni l’avis du bureau d’études ; non enseigné au catalogue.',
    resourceHref: LINKS.blogComparatifChatgptClaudeGeminiBtp,
    resourceLabel: 'Comparatif et choix d’outil',
    taughtInFormation: false,
  },
  {
    id: 'mistral-le-chat',
    tool: 'Le Chat',
    editor: 'Mistral AI',
    editorDocUrl: 'https://mistral.ai/',
    usageBtp:
      'Rédiger en français une trame de courrier ou une liste de points pour réunion de chantier (brouillon).',
    limits: 'Offres et modèles évolutifs ; non enseigné en formation OFC.',
    resourceHref: LINKS.ressources,
    resourceLabel: 'Hub ressources IA BTP',
    taughtInFormation: false,
  },
] as const;

export type IaOutilCasMetier = {
  id: string;
  question: string;
  directAnswer: string;
  professional: string;
  inputDocs: string;
  iaTask: string;
  deliverable: string;
  humanCheck: string;
  toolLabel: string;
  editorLabel: string;
  resourceHref: string;
  resourceLabel: string;
  formationHref?: string;
  formationLabel?: string;
};

/** Cas métier développés — GEO / lisibilité isolée. */
export const IA_OUTILS_BTP_CAS_METIER: readonly IaOutilCasMetier[] = [
  {
    id: 'cctp-claude',
    question: 'Comment utiliser Claude pour préparer une synthèse de CCTP ?',
    directAnswer:
      'Claude, l’assistant d’IA développé par Anthropic, aide à extraire et regrouper les exigences par lot ou thème à partir du CCTP et des pièces associées — vous validez chaque point sur le document source.',
    professional: 'Chargé d’affaires ou conducteur de travaux en phase étude / réponse.',
    inputDocs: 'CCTP, extraits CCAP ou RC, liste de lots concernés.',
    iaTask:
      'Demander une synthèse thématique (exigences, délais, références à recouper) avec renvoi aux articles ou paragraphes.',
    deliverable: 'Tableau ou note de synthèse prête pour réunion Go/No Go ou plan de mémoire.',
    humanCheck:
      'Recouper chaque exigence avec le PDF d’origine, repérer les omissions et les contradictions entre pièces.',
    toolLabel: 'Claude',
    editorLabel: 'Anthropic',
    resourceHref: LINKS.tutoAnalyseDce,
    resourceLabel: 'Tutoriel PDF — analyse DCE',
    formationHref: LINKS.formationAO,
    formationLabel: 'Formation IA appels d’offres BTP (NIV-02)',
  },
  {
    id: 'cr-chatgpt',
    question: 'Comment utiliser ChatGPT pour un compte rendu de chantier ?',
    directAnswer:
      'ChatGPT, l’assistant d’IA d’OpenAI, structure vos notes de réunion ou de visite en compte rendu (présents, décisions, actions) — le chef de chantier ou le conducteur relit avant diffusion.',
    professional: 'Chef de chantier, conducteur de travaux ou encadrement.',
    inputDocs: 'Notes vocales transcrites, listes à puces, photos légendées (sans données personnelles inutiles).',
    iaTask:
      'Transformer les notes en CR avec sections standard (ordre du jour, décisions, qui / quoi / quand, prochaine réunion).',
    deliverable: 'Compte rendu prêt à envoyer aux participants et au MOA/MOE.',
    humanCheck:
      'Exactitude des engagements, des délais et des réserves ; conformité au modèle interne de l’entreprise.',
    toolLabel: 'ChatGPT',
    editorLabel: 'OpenAI',
    resourceHref: LINKS.iaCompteRenduChantier,
    resourceLabel: 'Méthode — comptes rendus de chantier avec l’IA',
    formationHref: LINKS.formationConduiteTravauxSuiviChantier,
    formationLabel: 'Formation conduite de travaux & suivi chantier (NIV-03)',
  },
  {
    id: 'relance-admin',
    question: 'Comment utiliser ChatGPT ou Claude pour une relance client ?',
    directAnswer:
      'Les deux assistants servent à produire une première version de courrier ou d’e-mail de relance à partir du contexte que vous fournissez — l’assistante de gestion ou le dirigeant ajuste le ton et les montants.',
    professional: 'Assistante administrative, responsable ADV ou dirigeant de PME BTP.',
    inputDocs: 'Facture ou devis concerné, historique des échanges, délai souhaité.',
    iaTask:
      'Rédiger un message ferme mais professionnel, rappelant la créance et la prochaine étape (règlement, plan de paiement).',
    deliverable: 'Brouillon de mail ou courrier prêt à personnaliser.',
    humanCheck:
      'Montants, références de commande, mentions légales et accord avec la politique commerciale de l’entreprise.',
    toolLabel: 'ChatGPT ou Claude',
    editorLabel: 'OpenAI / Anthropic',
    resourceHref: LINKS.formationIaAssistanteBtp,
    resourceLabel: 'Formation IA assistante administrative BTP',
    formationHref: LINKS.parcoursAssistantDeGestionBtp,
    formationLabel: 'Parcours Administration & travaux',
  },
] as const;

/** Cartes compactes accueil — outils enseignés + lien hub. */
export const ACCUEIL_OUTILS_IA_HIGHLIGHTS = [
  {
    tool: 'ChatGPT',
    editor: 'OpenAI',
    usage: 'Devis, comptes rendus, courriers — session NIV-01.',
    href: LINKS.formationChatgptBtp,
    cta: 'Formation ChatGPT BTP',
  },
  {
    tool: 'Claude',
    editor: 'Anthropic',
    usage: 'DCE, CCTP, skills chantier — NIV-01 à NIV-04 selon programme.',
    href: LINKS.claudeAiBtp,
    cta: 'Guide Claude AI BTP',
  },
] as const;

export const ACCUEIL_OUTILS_IA_USAGES = [
  { label: 'Analyser un DCE (CCTP, CCAP)', href: LINKS.iaAnalyseDce },
  { label: 'Compte rendu de chantier', href: LINKS.iaCompteRenduChantier },
  { label: 'Mémoire technique & appels d’offres', href: LINKS.iaMemoireTechnique },
  { label: 'Devis et chiffrage bâtiment', href: LINKS.iaDevis },
] as const;

/** Libellé formation — aligné sur `catalogue-formation-page-content` (NIV-01 : ChatGPT + Claude). */
export const IA_OUTILS_FORMATION_OFC_COPY =
  'Au catalogue Qualiopi OFC : NIV-01 — ChatGPT et Claude (devis, CR, emails) ; NIV-02 — appels d’offres et DCE (Claude et ChatGPT selon les ateliers) ; NIV-03 — conduite de travaux (Claude, skills chantier) ; NIV-04 — Claude AI (Projects, Skills, Cowork). Les autres outils du tableau sont présentés à titre informatif, sans session dédiée.';
