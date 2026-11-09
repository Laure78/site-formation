/**
 * Contenus marketing maquette (hero, bénéfices, format, CTA) — réf. fiche NIV-02.
 * Séparé du contenu Qualiopi (`catalogue-formation-page-content`).
 */
import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  CheckSquare,
  ClipboardList,
  FolderKanban,
  FolderOpen,
  FolderSearch,
  Laptop,
  Layers,
  Link2,
  Package,
  Puzzle,
  Shield,
  Sparkles,
  UsersRound,
  Zap,
} from 'lucide-react';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';

export type MaquetteBenefitCard = {
  icon: LucideIcon;
  titre: string;
  texte: string;
};

export type FormationMaquetteMarketingSlice = {
  heroBadge: string;
  keyFactsLevel: string;
  heroLead: string;
  heroDescription: string;
  benefitsTitle: string;
  benefits: readonly MaquetteBenefitCard[];
  formatTitle: string;
  formatDescription: string;
  finalCtaTitle: string;
  finalCtaDescription: string;
  ctaSrcPrefix: string;
  /** Libellés fixes pour cartes programme (NIV-02 uniquement). */
  programmeFixedLabels?: readonly string[];
  programmeTitleDefault: string;
  programmeFootnote4h?: string;
  programmeFootnote14h?: string;
  pedagogyLabels?: readonly string[];
};

const NIV02_PROGRAMME_LABELS = [
  'Comprendre le dossier de consultation',
  'Analyser et croiser les informations',
  'Préparer le chiffrage',
  'Construire un mémoire technique',
] as const;

const DEFAULT_PEDAGOGY = [
  'Cas pratiques BTP',
  'Documents métier',
  'Modèles réutilisables',
  'Validation humaine des propositions IA',
  'Méthodes terrain',
] as const;

function seoSubtitle(code: FormationCatalogueCode): string {
  return getFormationCatalogueSeo(code).subtitle;
}

export const FORMATION_MAQUETTE_MARKETING: Partial<
  Record<FormationCatalogueCode, FormationMaquetteMarketingSlice>
> = {
  'NIV-01': {
    heroBadge: 'Formation IA BTP · Niveau débutant',
    keyFactsLevel: 'Niveau débutant',
    heroLead: seoSubtitle('NIV-01'),
    heroDescription:
      'Comprendre l’IA générative et l’appliquer sur vos documents réels : devis, comptes rendus, DOE et communication professionnelle — avec relecture humaine systématique.',
    benefitsTitle: 'Ce que vous saurez faire en 4 h',
    benefits: [
      { icon: BarChart3, titre: 'Préparer un devis', texte: 'Gagner du temps pour rédiger et structurer vos devis.' },
      { icon: ClipboardList, titre: 'Rédiger un compte rendu', texte: 'Transformer vos notes en comptes rendus structurés.' },
      { icon: FolderOpen, titre: 'Structurer un DOE / PV', texte: 'Préparer DOE, PV et suivis de réserves.' },
      { icon: Sparkles, titre: 'Améliorer vos emails', texte: 'Rédiger et reformuler vos communications professionnelles.' },
    ],
    formatTitle: 'Un format court, concret et ancré dans le BTP',
    formatDescription:
      '70 % de pratique sur vos documents (devis, CR, DOE, emails) — l’IA prépare et structure, vous validez avant tout envoi.',
    finalCtaTitle: 'Vous souhaitez former votre équipe à l’IA ?',
    finalCtaDescription:
      'Les besoins et cas d’usage de votre entreprise sont étudiés avant la session, pour adapter le programme à votre équipe.',
    ctaSrcPrefix: 'formation-niv01-bases',
    programmeTitleDefault: 'Le programme de la formation (4 h)',
    programmeFootnote4h:
      'Durée totale : 4 h (accueil, 4 modules et bilan inclus)',
    pedagogyLabels: [...DEFAULT_PEDAGOGY],
  },
  'NIV-02': {
    heroBadge: 'Formation IA BTP · Niveau avancé',
    keyFactsLevel: 'Niveau avancé',
    heroLead: 'Analysez vos DCE, structurez vos réponses et produisez des mémoires techniques avec l’IA.',
    heroDescription:
      'Une formation opérationnelle pour gagner du temps, fiabiliser l’analyse des dossiers et préparer des réponses adaptées aux marchés publics et privés du BTP.',
    benefitsTitle: 'Une formation opérationnelle pour vos marchés',
    benefits: [
      { icon: BarChart3, titre: 'Analyser un DCE', texte: 'Identifier les exigences, contraintes, risques et points de vigilance.' },
      { icon: CheckSquare, titre: 'Structurer votre réponse', texte: 'Préparer un mémoire technique clair et adapté au dossier.' },
      { icon: Sparkles, titre: 'Gagner du temps', texte: "Utiliser l'IA pour accélérer les tâches documentaires répétitives." },
      { icon: Shield, titre: 'Sécuriser votre offre', texte: 'Croiser RC, CCTP, CCAP et DPGF, avec validation humaine.' },
    ],
    formatTitle: 'Un format court, concret et ancré dans le BTP',
    formatDescription:
      'Une formation pratique pour passer de l’analyse du DCE à la préparation d’une réponse structurée.',
    finalCtaTitle: 'Développez vos réponses aux appels d’offres avec l’IA',
    finalCtaDescription: 'Gagnez en efficacité, en qualité et en compétitivité sur vos marchés.',
    ctaSrcPrefix: 'formation-niv02-ao',
    programmeFixedLabels: NIV02_PROGRAMME_LABELS,
    programmeTitleDefault: 'Le programme de la formation (4 h)',
    programmeFootnote4h: 'Durée totale : 4 h (accueil, modules 1 à 4 et bilan inclus)',
    pedagogyLabels: [...DEFAULT_PEDAGOGY],
  },
  'NIV-03': {
    heroBadge: 'Formation IA BTP · Niveau avancé',
    keyFactsLevel: 'Niveau avancé',
    heroLead: 'Pilotez vos chantiers et simplifiez le suivi avec ChatGPT et Claude',
    heroDescription:
      'Comptes rendus, suivi d’avancement, gestion des réserves et préparation du DOE : une formation terrain pour structurer le pilotage documentaire de vos chantiers avec l’IA, sous votre contrôle.',
    benefitsTitle: 'Une formation concrète pour piloter vos chantiers avec l’IA',
    benefits: [
      { icon: ClipboardList, titre: 'Préparer le chantier', texte: 'CCTP, planning et DICT : analyser les pièces et structurer le démarrage.' },
      { icon: BarChart3, titre: "Suivre l'avancement", texte: 'Comptes rendus, suivi des actions et tableaux de bord pour piloter au quotidien.' },
      { icon: Shield, titre: 'Gérer les réserves', texte: 'Identification, qualification et levée des réserves avec relecture humaine.' },
      { icon: FolderOpen, titre: 'Préparer la réception', texte: 'Dossier de fin de chantier et DOE : constitution et relances documentaires.' },
    ],
    formatTitle: 'Un format court, concret et ancré dans le BTP',
    formatDescription:
      'Des cas pratiques issus de chantiers réels, sur vos documents (CCTP, comptes rendus, réserves, DOE) — l’IA prépare et structure, vous validez avant tout envoi.',
    finalCtaTitle: 'Pilotez vos chantiers plus efficacement avec l’IA',
    finalCtaDescription:
      'Des outils, des méthodes et des cas concrets pour industrialiser le suivi documentaire de vos chantiers.',
    ctaSrcPrefix: 'formation-niv03-chantier',
    programmeTitleDefault: 'Le programme de la formation (4 h)',
    programmeFootnote4h: 'Durée totale : 4 h (accueil, modules et bilan inclus)',
    pedagogyLabels: ['Cas pratiques', 'Documents métier', 'Modèles réutilisables', 'Méthodes applicables', 'Gain de temps'],
  },
  'NIV-04': {
    heroBadge: 'Formation IA BTP · Niveau avancé',
    keyFactsLevel: 'Niveau avancé',
    heroLead: 'Projects, Skills, Cowork et connecteurs au service de vos documents de chantier',
    heroDescription:
      'Exploitez Claude pour analyser et structurer vos pièces BTP (DCE, CCTP, CCAP, comptes rendus, DOE, dossiers chantier) : Projets, bibliothèque de skills, production supervisée et automatisations — sous votre contrôle avant diffusion.',
    benefitsTitle: 'Une formation concrète pour exploiter Claude dans vos projets BTP',
    benefits: [
      { icon: FolderKanban, titre: 'Projects Claude', texte: 'Un Projet par affaire ou chantier : instructions permanentes et base documentaire partagée.' },
      { icon: Puzzle, titre: 'Skills métier', texte: 'Assistants spécialisés BTP : création, tests et bibliothèque réutilisable par métier.' },
      { icon: UsersRound, titre: 'Cowork', texte: 'Production collaborative de dossiers chantier en autonomie supervisée, avec jalons de validation.' },
      { icon: Link2, titre: 'Connecteurs', texte: 'Relier Claude à la messagerie, au drive ou à l’agenda — workflow sécurisé sur vos sources.' },
    ],
    formatTitle: 'Un format court, concret et ancré dans le BTP',
    formatDescription:
      'Ateliers sur vos documents réels (anonymisés si besoin) — industrialiser Claude dans l’entreprise sans perdre le contrôle humain sur les engagements.',
    finalCtaTitle: 'Industrialisez Claude dans votre entreprise BTP',
    finalCtaDescription:
      'Projets, skills et connecteurs : une méthode pour déployer Claude sur vos dossiers métier.',
    ctaSrcPrefix: 'formation-niv04-claude',
    programmeTitleDefault: 'Le programme de la formation (4 h)',
    programmeFootnote4h: 'Durée totale : 4 h (accueil, modules et bilan inclus)',
    pedagogyLabels: [...DEFAULT_PEDAGOGY],
  },
  'NIV-05': {
    heroBadge: 'Formation IA BTP · Niveau avancé',
    keyFactsLevel: 'Niveau avancé',
    heroLead: seoSubtitle('NIV-05'),
    heroDescription:
      'Maîtres d’œuvre de conception et d’exécution : CCTP, DPGF, DCE, comptes rendus, ordres de service et réserves avec ChatGPT et Claude.',
    benefitsTitle: 'De la conception à la réception — l’IA au service de la MOE',
    benefits: [
      { icon: Layers, titre: 'CCTP et DPGF', texte: 'Descriptifs, métrés et bordereaux à structurer et recouper à chaque consultation.' },
      { icon: FolderSearch, titre: 'DCE et offres', texte: 'Pièces à croiser, écarts entre entreprises et demandes de clarification à formuler.' },
      { icon: ClipboardList, titre: 'Comptes rendus', texte: 'Notes, dictées et photos à transformer en CR exploitables et tableaux d’actions.' },
      { icon: Shield, titre: 'OS, réserves, réception', texte: 'Actes contractuels, listes de réserves et suivi GPA à tenir à jour sans perte de temps.' },
    ],
    formatTitle: 'Un format court, concret et ancré dans le BTP',
    formatDescription:
      'Cinq modules pour 4 heures de formation effective : de l’intégration de l’IA en MOE jusqu’aux réserves et à la réception, sur vos dossiers anonymisés si besoin.',
    finalCtaTitle: 'Vous souhaitez former votre équipe MOE à l’IA ?',
    finalCtaDescription:
      'Réservez une visio découverte ou demandez un devis pour une session intra ou inter — réponse sous 48 h ouvrées.',
    ctaSrcPrefix: 'formation-ia-maitrise-oeuvre',
    programmeTitleDefault: 'Programme — 5 modules (4 h · 240 min)',
    programmeFootnote4h: 'Durée totale : 4 h (5 modules, 240 min)',
    pedagogyLabels: [...DEFAULT_PEDAGOGY],
  },
  'NIV-09': {
    heroBadge: 'Formation IA BTP · Niveau avancé',
    keyFactsLevel: 'Niveau avancé',
    heroLead: 'Créez vos propres assistants IA pour les tâches quotidiennes de votre entreprise du BTP.',
    heroDescription:
      'ChatGPT et Claude : Projets, skills et modèles entreprise — demi-journée pratique pour concevoir, tester et préparer le déploiement d’assistants adaptés à vos documents.',
    benefitsTitle: 'Trois livrables concrets à l’issue de la session',
    benefits: [
      { icon: Laptop, titre: 'Un assistant métier personnalisé', texte: 'Configuré et testé sur un cas réel, avec protocole de relecture avant tout envoi.' },
      { icon: Layers, titre: 'Skills et modèles réutilisables', texte: 'Prompts, modèles et méthodes prêts à téléverser dans ChatGPT ou Claude.' },
      { icon: Shield, titre: 'Plan de déploiement', texte: 'Priorités sur 30 jours, confidentialité, partage en équipe et validation humaine.' },
      { icon: Zap, titre: 'Automatiser une tâche métier', texte: 'Appliquer l’assistant à devis, CR, courriers ou synthèses DCE selon votre priorité.' },
    ],
    formatTitle: 'Un format court, concret et ancré dans le BTP',
    formatDescription:
      '4 modules × 60 min de formation effective — 70 % de pratique sur vos documents (anonymisés si besoin).',
    finalCtaTitle: 'Construisons votre assistant sur mesure',
    finalCtaDescription:
      'Session en présentiel en Île-de-France — prise en charge OPCO possible selon éligibilité, 6 à 12 participants.',
    ctaSrcPrefix: 'formation-niv09-assistants',
    programmeTitleDefault: 'Programme détaillé — 4 modules (4 × 60 min)',
    programmeFootnote4h: 'Durée totale : 4 h (accueil, 4 modules et bilan inclus)',
    pedagogyLabels: [...DEFAULT_PEDAGOGY],
  },
  'NIV-10': {
    heroBadge: 'Formation IA BTP · Niveau approfondi',
    keyFactsLevel: 'Niveau approfondi',
    heroLead: seoSubtitle('NIV-10'),
    heroDescription:
      'Concevoir, construire et tester une première application métier BTP avec l’IA — sans compétence en programmation, sur un périmètre que vous définissez.',
    benefitsTitle: 'Pourquoi structurer votre premier outil métier avec l’IA',
    benefits: [
      { icon: Package, titre: 'Remplacer Excel métier', texte: 'Centraliser données chantier, devis ou suivi dans un outil dédié.' },
      { icon: BarChart3, titre: 'Tableau de bord affaires', texte: 'Indicateurs et relances sur vos processus commerciaux ou travaux.' },
      { icon: ClipboardList, titre: 'Planning d’interventions', texte: 'Organiser interventions et ressources sur un périmètre réaliste.' },
      { icon: Sparkles, titre: 'Feuille de route', texte: 'Repartir avec une V1 testable et une méthode pour poursuivre le projet.' },
    ],
    formatTitle: 'Deux journées pour une première version testable',
    formatDescription:
      '14 h sur 2 jours (2 × 7 h) — 70 % de pratique : cadrage du besoin, consignes IA, tests et corrections sur votre projet.',
    finalCtaTitle: 'Lancez votre première application métier BTP',
    finalCtaDescription:
      'Réservez une visio découverte pour cadrer votre besoin avant la session.',
    ctaSrcPrefix: 'formation-niv10-dev-web',
    programmeTitleDefault: 'Programme — 14 heures (2 jours · 2 × 7 h)',
    programmeFootnote14h: 'Durée totale : 14 h sur 2 jours (accueil, ateliers et bilan inclus)',
    pedagogyLabels: [...DEFAULT_PEDAGOGY],
  },
  'NIV-13': {
    heroBadge: 'Niveau 1 · Débutant',
    keyFactsLevel: 'Niveau débutant',
    heroLead:
      'Apprenez à créer un agent IA qui travaille automatiquement pour vous. Suivi des devis, relances clients, actions chantier et échéances : automatisez une tâche professionnelle avec Make, sans programmation.',
    heroDescription:
      'Une journée en présentiel en Île-de-France — deux parcours métier au choix (dirigeant ou conducteur de travaux), sur le même programme.',
    benefitsTitle: 'Pourquoi passer à un agent autonome (et pas seulement au prompting)',
    benefits: [
      {
        icon: Zap,
        titre: 'Tâches qui s’exécutent seules',
        texte: 'Déclenchement sur un email, une date ou un fichier — l’agent enchaîne les étapes que vous avez définies.',
      },
      {
        icon: Link2,
        titre: 'Outils du quotidien reliés',
        texte: 'Messagerie, tableur ou agenda : un flux unique au lieu de copier-coller entre applications.',
      },
      {
        icon: Shield,
        titre: 'Contrôles humains intégrés',
        texte: 'Pas d’envoi client ni d’engagement contractuel sans votre validation explicite.',
      },
      {
        icon: Puzzle,
        titre: 'Sans développeur',
        texte: 'Make AI Agents en interface visuelle — adapté aux dirigeants et conducteurs de travaux du BTP.',
      },
    ],
    formatTitle: 'Une journée de 7 heures, 70 % de pratique',
    formatDescription:
      'Inter-entreprises ou intra dans vos locaux en Île-de-France — un scénario opérationnel testé avant la fin de session.',
    finalCtaTitle: 'Automatisez une première tâche métier en toute sécurité',
    finalCtaDescription:
      'Recevez le programme détaillé ou demandez un devis pour une session intra adaptée à votre entreprise.',
    ctaSrcPrefix: 'formation-niv13-agents-ia',
    programmeTitleDefault: 'Programme — 6 modules (7 h)',
    programmeFootnote4h: 'Durée totale : 7 h (accueil, modules et bilan inclus)',
    pedagogyLabels: [
      'Scénarios Make guidés',
      'Cas dirigeant ou conducteur de travaux',
      '70 % de pratique',
      'Validation humaine systématique',
      'Plan de déploiement 30 jours',
    ],
  },
  'NIV-11': {
    heroBadge: 'Formation IA BTP · Niveau avancé',
    keyFactsLevel: 'Niveau avancé',
    heroLead: seoSubtitle('NIV-11'),
    heroDescription:
      'Analysez les consultations, préparez vos rapports d’analyse des offres et pilotez les intervenants avec ChatGPT et Claude.',
    benefitsTitle: 'Une formation concrète pour structurer vos missions AMO avec l’IA',
    benefits: [
      { icon: FolderSearch, titre: 'Analyser les consultations', texte: 'Recouper les pièces du DCE, identifier les incohérences et préparer une grille d’analyse.' },
      { icon: Layers, titre: 'Comparer les offres', texte: 'Structurer les éléments techniques et financiers et préparer un rapport d’analyse sourcé.' },
      { icon: UsersRound, titre: 'Piloter les intervenants', texte: 'Suivre les livrables MOE, les avis CT et CSPS, rédiger les comptes rendus et notes d’alerte.' },
      { icon: Shield, titre: 'Reporting MOA', texte: 'CR de comité de pilotage, tableau de bord et notes d’alerte — avec validation humaine.' },
    ],
    formatTitle: 'Un format court, ancré dans vos consultations et opérations',
    formatDescription:
      'Ateliers sur vos dossiers réels (anonymisés si besoin) — l’IA prépare et structure, vous contrôlez et validez avant toute décision au maître d’ouvrage.',
    finalCtaTitle: 'Structurez vos missions AMO avec l’IA',
    finalCtaDescription:
      'Assistants Consultations et Pilotage — une méthode réutilisable sur vos opérations.',
    ctaSrcPrefix: 'formation-niv11-amo',
    programmeTitleDefault: 'Le programme de la formation (4 h)',
    programmeFootnote4h: 'Durée totale : 4 h (accueil, modules et bilan inclus)',
    pedagogyLabels: [...DEFAULT_PEDAGOGY],
  },
};

export function getFormationMaquetteMarketingSlice(
  code: FormationCatalogueCode,
): FormationMaquetteMarketingSlice {
  const slice = FORMATION_MAQUETTE_MARKETING[code];
  if (!slice) {
    throw new Error(`Maquette marketing non définie pour ${code}`);
  }
  return slice;
}
