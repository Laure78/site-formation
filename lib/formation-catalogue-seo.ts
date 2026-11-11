/**
 * SEO & GEO — fiches catalogue NIV-01 à NIV-06.
 * Titres orientés métier (pas « niveau 1 / 2 » en H1), blocs « En bref » citables par les IA.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import {
  formatAnneesExperienceBTP,
  formatNoteSatisfactionAffichageComplet,
  indicateursResultats,
} from '@/lib/data/indicateurs-resultats';
import { getFormationByCode } from '@/data/formations';
import { dureeCatalogueParCode } from '@/lib/catalogue-duree-copy';
import { SITE_INTER_LIEU } from '@/lib/site-config';
import { SESSION_DUREE_LIBELLE } from '@/lib/tarifs-sessions';
import { formatOrganismeQualiopiCourt } from '@/lib/marque-identite';
import { libelleTarifParticipantCatalogue, TARIF_PARTICIPANT_NIV02_HT } from '@/lib/tarifs-catalogue-participant';

export type FormationIaLimitRow = {
  iaAide: string;
  validationHumaine: string;
};

export type FormationCatalogueSeoConfig = {
  /** Title balise `<title>` — max ~65 car. */
  metaTitle: string;
  /** H1 page catalogue. */
  h1: string;
  /** Sous-titre hero. */
  subtitle: string;
  /** Meta description — max ~160 car., contient une expression clé formation IA BTP. */
  metaDescription: string;
  /** Bloc « En bref » — réponse factuelle pour moteurs génératifs. */
  enBref: string;
  /** Public cible — liste précise. */
  publicTargets: readonly string[];
  /** Tableau « Ce que l'IA peut / ne peut pas faire ». */
  iaLimits: readonly FormationIaLimitRow[];
};

const QUALIOPI_MENTION = `${formatOrganismeQualiopiCourt()}, présentiel Île-de-France`;

export const FORMATION_CATALOGUE_SEO: Record<FormationCatalogueCode, FormationCatalogueSeoConfig> = {
  'NIV-01': {
    metaTitle: 'Formation IA BTP : devis et chantier',
    h1: 'Formation IA BTP : gagnez du temps sur vos devis et documents de chantier',
    subtitle:
      'Apprenez à utiliser ChatGPT et Claude pour préparer vos devis, emails, comptes rendus, DOE et contenus professionnels. Formation pratique sur vos propres documents BTP.',
    metaDescription:
      'Formation IA pour le BTP en 4 h : devis, emails, comptes rendus et DOE avec ChatGPT et Claude. Présentiel IDF, Qualiopi, financement OPCO selon éligibilité.',
    enBref: `Formation IA BTP de niveau débutant (${SESSION_DUREE_LIBELLE}, présentiel Île-de-France) : ChatGPT et Claude pour préparer devis, emails, comptes rendus, DOE et PV. L’IA assiste ; le professionnel valide prix, métrés et références techniques. ${QUALIOPI_MENTION}.`,
    publicTargets: [
      'Dirigeants et équipes de TPE/PME du bâtiment et des travaux publics',
      'Conducteurs de travaux et chefs de chantier',
      'Chargés d\'affaires et techniciens bureau d\'études',
      'Assistantes administratives et fonctions support du BTP',
    ],
    iaLimits: [
      { iaAide: 'Structurer un premier devis', validationHumaine: 'Valider prix, quantités et conformité DTU' },
      { iaAide: 'Rédiger un compte rendu ou un email', validationHumaine: 'Confirmer les faits et engagements' },
      { iaAide: 'Préparer une trame de DOE ou PV', validationHumaine: 'Contrôler les pièces et signatures' },
      { iaAide: 'Proposer des posts réseaux sociaux', validationHumaine: 'Valider le ton et les informations publiées' },
    ],
  },
  'NIV-02': {
    metaTitle: 'Programme IA DCE & mémoire technique (4 h)',
    h1: 'Programme Niveau 2 : analyser un DCE et préparer son mémoire technique (4 h)',
    subtitle:
      'Apprenez à extraire les exigences d’un DCE, préparer les points de contrôle du chiffrage et structurer un mémoire technique avec l’aide de l’IA. Atelier pratique sur un dossier réel de l’entreprise.',
    metaDescription:
      "Programme IA DCE & mémoire technique (4 h) : méthode DCE, chiffrage et mémoire technique avec l'IA. Présentiel Île-de-France, Qualiopi, OPCO selon éligibilité.",
    enBref: `La formation IA appels d’offres BTP (NIV-02, ${dureeCatalogueParCode('NIV-02')}, ${libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV02_HT)} en inter) construit une méthode guidée pour analyser un DCE (RC, CCTP, CCAP, DPGF), préparer une checklist de chiffrage et structurer un mémoire technique avec ChatGPT ou Claude. Présentiel Île-de-France, dossier fil rouge — ${QUALIOPI_MENTION}. L’IA assiste l’analyse ; le chiffrage et les engagements restent à valider par le professionnel.`,
    publicTargets: [
      'Dirigeants de PME du BTP',
      'Responsables d’affaires et chargés d’études',
      'Conducteurs de travaux et responsables appels d’offres',
      'Professionnels répondant déjà à des consultations',
    ],
    iaLimits: [
      { iaAide: 'Synthétiser une pièce et extraire des exigences', validationHumaine: 'Valider l’interprétation contractuelle' },
      { iaAide: 'Comparer CCTP et DPGF', validationHumaine: 'Confirmer prestations, quantités et métrés' },
      { iaAide: 'Préparer une checklist de chiffrage', validationHumaine: 'Valider prix, marges et périmètre' },
      { iaAide: 'Structurer un mémoire technique', validationHumaine: 'Vérifier moyens et engagements remis' },
    ],
  },
  'NIV-03': {
    metaTitle: 'Programme IA suivi de chantier (4 h)',
    h1: 'Programme Niveau 2 : suivi de chantier, CR et DOE avec l’IA (4 h)',
    subtitle:
      'Analysez vos CCTP, produisez vos comptes rendus et organisez le suivi du chantier jusqu\'à la réception avec ChatGPT et Claude.',
    metaDescription:
      "Programme IA suivi de chantier (4 h) : CR, CCTP, PPSPS et DOE assistés par l'IA sur vos dossiers BTP. Présentiel IDF, Qualiopi, OPCO selon éligibilité.",
    enBref: `La formation IA pour conducteurs de travaux apprend à utiliser ChatGPT et Claude pour analyser un CCTP, préparer un compte rendu, suivre les actions, gérer les réserves et structurer un DOE. Session ${dureeCatalogueParCode('NIV-03')} en présentiel — ${QUALIOPI_MENTION}.`,
    publicTargets: [
      'Conducteurs de travaux',
      'Assistants travaux',
      'Chargés d\'affaires',
      'Responsables travaux',
      'Chefs de chantier amenés à produire des documents',
    ],
    iaLimits: [
      { iaAide: 'Structurer un compte rendu', validationHumaine: 'Valider les faits et responsabilités' },
      { iaAide: 'Extraire les clauses d\'un CCTP', validationHumaine: 'Confirmer l\'interprétation contractuelle' },
      { iaAide: 'Préparer une trame de PPSPS', validationHumaine: 'Valider les mesures de prévention' },
      { iaAide: 'Classer les réserves', validationHumaine: 'Contrôler leur levée sur le terrain' },
    ],
  },
  'NIV-04': {
    metaTitle: 'Formation Claude AI BTP | Projects & Cowork',
    h1: 'Formation Claude AI BTP : Projects, Cowork et Skills',
    subtitle:
      'Exploitez l’écosystème Claude (Projects, Cowork, Skills, connecteurs) sur vos documents BTP — formation avancée distincte du parcours applications métier.',
    metaDescription:
      'Formation Claude AI BTP : Projects, Cowork, Skills et connecteurs sur vos dossiers chantier. 4 h présentiel IDF, Qualiopi, financement OPCO selon éligibilité.',
    enBref: `La Formation Claude AI BTP apprend à structurer des Projets Claude, créer des Skills métier, déléguer la production documentaire à Cowork et connecter Claude à la messagerie et au drive. ${dureeCatalogueParCode('NIV-04')} en présentiel — ${QUALIOPI_MENTION}. Distincte du parcours applications métier BTP.`,
    publicTargets: [
      'Référents IA et responsables digitaux',
      'Dirigeants souhaitant industrialiser l\'usage de Claude',
      'Chargés d\'affaires et conducteurs de travaux avancés',
    ],
    iaLimits: [
      { iaAide: 'Créer des Skills réutilisables', validationHumaine: 'Valider les instructions et les sorties métier' },
      { iaAide: 'Automatiser la production de CR ou dossiers', validationHumaine: 'Relire avant envoi ou remise client' },
      { iaAide: 'Connecter Claude à ses outils', validationHumaine: 'Contrôler la confidentialité des données' },
      { iaAide: 'Générer des documents en lot', validationHumaine: 'Vérifier chaque livrable avant diffusion' },
    ],
  },
  'NIV-05': {
    metaTitle: 'Formation IA Maître d’œuvre Île-de-France',
    h1: 'Formation IA pour maîtres d’œuvre en Île-de-France — de la consultation à la réception',
    subtitle:
      'Lettres de commande, avenants, OS, situations, dépouillement, visites et réception : Claude ou ChatGPT sur vos trames, en intra et en présentiel en Île-de-France.',
    metaDescription:
      'Formation IA pour maîtres d’œuvre et MOEX : avenants, OS, situations, dépouillement, réception. Présentiel en Île-de-France, Qualiopi, OPCO selon éligibilité.',
    enBref:
      'La formation « L’IA au service des maîtres d’œuvre » apprend aux équipes de maîtrise d’œuvre (MOE, MOEX, OPC, bureaux d’études) à utiliser Claude AI ou ChatGPT sur leurs vraies tâches : lettres de commande, avenants, OS, agréments de sous-traitants, contrôle des situations, dépouillement des offres, visites de chantier et réception. Elle est dispensée par Laure Olivié (OFC Création d’Entreprise, certifié Qualiopi) en présentiel, en intra dans vos locaux en Île-de-France, en deux niveaux.',
    publicTargets: [
      'Maîtres d’œuvre de conception et d’exécution (MOE / MOEX)',
      'Architectes et économistes de la construction',
      'BET, OPC et collaborateurs de cabinets de maîtrise d’œuvre',
      'Conducteurs de travaux MOE et assistants gestion travaux',
    ],
    iaLimits: [
      { iaAide: 'Structurer un CCTP ou une trame de DPGF', validationHumaine: 'Vérifier références, quantités et unités' },
      { iaAide: 'Synthétiser un DCE et comparer des offres', validationHumaine: 'Recouper chaque point avec les pièces sources' },
      { iaAide: 'Rédiger un CR à partir de notes ou dictée', validationHumaine: 'Valider faits, décisions et responsabilités' },
      { iaAide: 'Préparer OS, réserves et documents de réception', validationHumaine: 'Contrôler habilitations et stipulations contractuelles' },
    ],
  },
  'NIV-06': {
    metaTitle: 'Application métier BTP niveau 1 : prototype IA',
    h1: 'Créer sa première application métier BTP avec l’IA',
    subtitle:
      'Transformer un problème métier en prototype fonctionnel avec le développement assisté par l’intelligence artificielle — sans compétence préalable en programmation.',
    metaDescription:
      'Formation IA pour le BTP : créer sa première application métier avec le développement assisté par l’IA. 4 h, prototype, Qualiopi, présentiel IDF.',
    enBref: `La formation niveau 1 applications métier BTP apprend à cadrer un besoin métier, rédiger un cahier des charges simple et construire un prototype fonctionnel avec le développement assisté par l’IA. Session 4 h en présentiel — ${QUALIOPI_MENTION}. Chaque participant repart avec un prototype ou le socle de son application — pas une application professionnelle complète.`,
    publicTargets: [
      'Dirigeants PME BTP et responsables méthodes',
      'Conducteurs de travaux et chargés d’affaires porteurs d’un projet d’outil',
      'Responsables administratifs et profils métier avec processus à digitaliser',
    ],
    iaLimits: [
      { iaAide: 'Proposer une structure d’interface et de données', validationHumaine: 'Valider l’ergonomie et les règles métier' },
      { iaAide: 'Générer un premier prototype', validationHumaine: 'Tester avec des données réelles anonymisées' },
      { iaAide: 'Itérer sur les fonctionnalités', validationHumaine: 'Confirmer les calculs et les statuts' },
      { iaAide: 'Préparer une publication basique', validationHumaine: 'Faire valider sécurité et hébergement si besoin' },
    ],
  },
  'NIV-07': {
    metaTitle: 'Application métier BTP niveau 2 : connectée',
    h1: 'Développer une application métier BTP connectée',
    subtitle:
      'Base de données, utilisateurs, workflows et services externes — faire évoluer un prototype vers une application métier connectée.',
    metaDescription:
      'Formation IA appliquée au bâtiment : application métier connectée (BDD, API, automatisations). 4 h présentiel, Qualiopi, financement selon éligibilité.',
    enBref: `La formation niveau 2 applications métier BTP enseigne la structuration d’une base de données, la gestion des accès, les workflows métier et la connexion à des services externes. Session 4 h en présentiel — ${QUALIOPI_MENTION}. Les cas d’usage (CRM, devis, trésorerie…) sont des exemples, pas des modules obligatoires.`,
    publicTargets: [
      'Participants ayant suivi le niveau 1 ou disposant d’un prototype',
      'Dirigeants et responsables digitaux PME BTP',
      'Conducteurs de travaux et chargés d’affaires avec outil en cours',
    ],
    iaLimits: [
      { iaAide: 'Proposer un schéma de base de données', validationHumaine: 'Valider les relations et les statuts métier' },
      { iaAide: 'Automatiser des notifications ou documents', validationHumaine: 'Contrôler le contenu avant envoi' },
      { iaAide: 'Connecter un service externe', validationHumaine: 'Vérifier la confidentialité des données' },
      { iaAide: 'Générer un PDF ou un rapport', validationHumaine: 'Relire avant remise client' },
    ],
  },
  'NIV-08': {
    metaTitle: 'Application métier BTP niveau 3 : IA intégrée',
    h1: 'Développer une application métier BTP avancée avec l’IA',
    subtitle:
      'Intégrer l’intelligence artificielle dans une application métier : analyse documentaire, workflows IA et déploiement.',
    metaDescription:
      'Formation IA pour les pros du BTP : intégrer l’IA dans une application métier (documents, workflows). 4 h, Qualiopi, présentiel IDF.',
    enBref: `La formation niveau 3 applications métier BTP enseigne l’intégration de l’IA dans une application (analyse, extraction, classification, génération) avec validation humaine. Session 4 h en présentiel — ${QUALIOPI_MENTION}. L’assistant DCE est un exemple parmi d’autres cas d’usage avancés.`,
    publicTargets: [
      'Participants autonomes sur une application simple (niveau 2 ou équivalent)',
      'Dirigeants et référents digitaux PME BTP',
      'Profils métier avancés porteurs d’un outil à industrialiser',
    ],
    iaLimits: [
      { iaAide: 'Analyser et extraire des documents métier', validationHumaine: 'Valider interprétation et engagements' },
      { iaAide: 'Classer et structurer des informations', validationHumaine: 'Contrôler les erreurs d’extraction' },
      { iaAide: 'Générer des brouillons (mémoire, synthèse)', validationHumaine: 'Relecture experte obligatoire' },
      { iaAide: 'Automatiser un workflow IA', validationHumaine: 'Point de contrôle humain sur les résultats sensibles' },
    ],
  },
  'NIV-12': {
    metaTitle: 'Formation IA MOE : CCTP, DPGF et plannings',
    h1: 'Formation IA maîtrise d’œuvre : CCTP, DPGF, CR et plannings',
    subtitle:
      'CCTP, descriptif, métré et DPGF, analyse des offres, CR de chantier, planning court et emails avec ChatGPT ou Claude.',
    metaDescription:
      'Formation IA pour le BTP côté maîtrise d’œuvre : CCTP, DPGF, comparatif des offres, CR et plannings sur vos dossiers. 4 h intra, Qualiopi.',
    enBref: `La formation IA pour la maîtrise d'œuvre de conception apprend à rédiger CCTP et descriptifs, produire métré et DPGF, comparer les offres des entreprises, rédiger CR et plannings courts avec ChatGPT ou Claude. 4 h en intra — ${QUALIOPI_MENTION}.`,
    publicTargets: [
      'Maîtres d’œuvre de conception et d’exécution',
      'Architectes et économistes de la construction',
      'BET et OPC',
      'Collaborateurs de cabinets de maîtrise d’œuvre',
    ],
    iaLimits: [
      { iaAide: 'Rédiger une trame de CCTP ou de descriptif', validationHumaine: 'Vérifier les références sur les textes' },
      { iaAide: 'Produire un métré et un DPGF', validationHumaine: 'Contrôler quantités et prix' },
      { iaAide: 'Comparer les DPGF des entreprises', validationHumaine: 'Vérifier écarts et oublis sur les offres' },
      { iaAide: 'Mettre en forme CR, plannings et emails', validationHumaine: 'Relire et valider avant diffusion' },
    ],
  },
  'NIV-11': {
    metaTitle: 'Formation IA Assistant Maîtrise d’ouvrage (AMO) | IDF',
    h1: 'Formation IA pour assistants à maîtrise d’ouvrage (AMO) en Île-de-France',
    subtitle:
      'Programme, consultation MOE, revue des études, analyse des offres et reporting au maître d’ouvrage avec Claude ou ChatGPT.',
    metaDescription:
      'Formation IA pour AMO et chargés d’opération : programme, consultation MOE, revue des études, reporting MOA. Présentiel en Île-de-France, Qualiopi.',
    enBref:
      'Cette formation apprend aux AMO, chargés d’opération et équipes de maîtrise d’ouvrage à utiliser Claude AI ou ChatGPT pour préparer un programme, consulter une maîtrise d’œuvre, relire les études, analyser les offres et produire le reporting au maître d’ouvrage. Elle est dispensée par Laure Olivié (OFC Création d’Entreprise, certifié Qualiopi), en intra et en présentiel en Île-de-France, et construite sur vos propres trames.',
    publicTargets: [
      'Assistants à maîtrise d’ouvrage (AMO)',
      'Conducteurs d’opération et programmistes',
      'Maîtrise d’ouvrage déléguée',
      'Chefs de projet et chargés d’opération',
    ],
    iaLimits: [
      { iaAide: 'Relire et croiser les pièces d’une consultation', validationHumaine: 'Vérifier chaque incohérence sur les pièces sources' },
      { iaAide: 'Pré-rédiger le rapport d’analyse des offres', validationHumaine: 'Noter et classer — décision du maître d’ouvrage' },
      { iaAide: 'Synthétiser avis CT et observations CSPS', validationHumaine: 'Contrôler références et suites à donner' },
      { iaAide: 'Rédiger CR de pilotage et notes d’alerte', validationHumaine: 'Relire et valider avant diffusion' },
    ],
  },
  'NIV-09': {
    metaTitle: 'Créer ses assistants IA BTP | Formation 4 h',
    h1: 'Créer ses assistants IA pour son entreprise du bâtiment',
    subtitle: 'ChatGPT & Claude : fonctionnalités clés et assistants métier',
    metaDescription:
      'Formation de 4 h pour concevoir vos assistants IA BTP avec ChatGPT et Claude. Devis, chantier, appels d’offres. Présentiel inter ou intra en Île-de-France.',
    enBref: `Formation NIV-09 (4 h, présentiel, niveau avancé) : concevoir et tester des assistants IA avec ChatGPT et Claude — projets, skills, modèles entreprise. ${SITE_INTER_LIEU}, inter et intra en Île-de-France. Environ 70 % de pratique, bibliothèque de skills BTP, accès plateforme 1 an. Abonnement ChatGPT Plus ou Claude Pro (ou compte entreprise) requis — un des deux suffit. ${QUALIOPI_MENTION}.`,
    publicTargets: [
      'Dirigeants et professionnels du BTP',
      'Conducteurs de travaux et chargés d’affaires',
      'Assistant(e)s administratifs et travaux, fonctions support',
    ],
    iaLimits: [
      { iaAide: 'Configurer assistants et skills métier', validationHumaine: 'Valider instructions et sorties avant usage' },
      { iaAide: 'Déposer modèles et documents entreprise', validationHumaine: 'Contrôler confidentialité et anonymisation' },
      { iaAide: 'Automatiser tâches récurrentes (devis, CR, courriers)', validationHumaine: 'Relire chaque livrable avant envoi' },
      { iaAide: 'Partager assistants avec l’équipe', validationHumaine: 'Définir droits, référents et mises à jour' },
    ],
  },
  'NIV-13': {
    metaTitle: 'Agent IA autonome BTP : Make (7 h)',
    h1: 'Créer son premier agent IA autonome pour le BTP',
    subtitle:
      'Apprenez à créer un agent IA qui travaille automatiquement pour vous. Suivi des devis, relances clients, actions chantier et échéances : automatisez une tâche professionnelle avec Make, sans programmation.',
    metaDescription:
      'Formation agents IA BTP (7 h) : créer un agent Make AI Agents pour devis, relances ou échéances chantier. Présentiel IDF, Qualiopi, OPCO selon éligibilité.',
    enBref: `Formation IA pour le BTP (NIV-13, 7 h, présentiel Île-de-France) : comprendre les agents autonomes, configurer un scénario Make AI Agents sur un cas dirigeant ou conducteur de travaux, avec validation humaine avant tout envoi. ${QUALIOPI_MENTION}. Tarif catalogue aligné sur une journée 7 h inter.`,
    publicTargets: [
      'Dirigeants de PME du bâtiment et des travaux publics',
      'Conducteurs de travaux',
    ],
    iaLimits: [
      { iaAide: 'Déclencher un scénario sur un événement (email, date, fichier)', validationHumaine: 'Configurer les filtres et le périmètre' },
      { iaAide: 'Préparer brouillons de relances ou de rappels', validationHumaine: 'Relire et valider avant envoi' },
      { iaAide: 'Synthétiser l’état d’un suivi (devis, actions)', validationHumaine: 'Contrôler les données sources' },
      { iaAide: 'Proposer la prochaine action', validationHumaine: 'Décider et engager l’entreprise' },
    ],
  },
  'NIV-10': {
    metaTitle: 'Créer des applications métier BTP avec l’IA',
    h1: 'Créez votre outil métier BTP sur mesure avec l’IA',
    subtitle:
      'Concevez une application adaptée à votre entreprise, sans savoir coder.',
    metaDescription:
      'Formation IA pour le BTP : créer une application métier sur mesure avec l’IA, sans coder. 14 heures — 2 jours, présentiel Île-de-France, Qualiopi.',
    enBref:
      'Formation IA pour le BTP : concevoir, construire et tester une application métier avec l’IA générative, sans compétence en programmation. 14 heures — 2 jours, 6 à 12 participants, présentiel Île-de-France uniquement. Qualiopi — Laure Olivié.',
    publicTargets: [
      'Dirigeants de TPE et PME du BTP',
      'Conducteurs de travaux et chargés d’affaires',
      'Assistant(e)s travaux et fonctions support du bâtiment',
      'Indépendants du second œuvre',
    ],
    iaLimits: [
      { iaAide: 'Générer une première version à partir d’un besoin cadré', validationHumaine: 'Valider le périmètre et les fonctionnalités' },
      { iaAide: 'Proposer la structure des données et des écrans', validationHumaine: 'Contrôler la conformité à vos processus' },
      { iaAide: 'Proposer des corrections et améliorations', validationHumaine: 'Tester et décider des changements' },
      { iaAide: 'Structurer des instructions (prompts)', validationHumaine: 'Contrôler le résultat à chaque étape' },
      { iaAide: 'Aider à préparer des exports', validationHumaine: 'Valider le format avec le destinataire (ex. gestionnaire de paie)' },
      { iaAide: 'Aider à sauvegarder et documenter', validationHumaine: 'Garder la responsabilité du projet' },
    ],
  },
};

export function getFormationCatalogueSeo(ref: FormationCatalogueCode): FormationCatalogueSeoConfig {
  const config = { ...FORMATION_CATALOGUE_SEO[ref] };
  const formation = getFormationByCode(ref);
  if (!formation || ref === 'NIV-01') return config;

  const duree = formation.duree;
  if (duree !== '4 h') {
    config.metaTitle = config.metaTitle.replace(/\(4 h\)/g, `(${duree})`);
    config.h1 = config.h1.replace(/\(4 h\)/g, `(${duree})`);
    config.metaDescription = config.metaDescription.replace(/\b4 h\b/g, duree);
    config.enBref = config.enBref.replaceAll(SESSION_DUREE_LIBELLE, duree);
  }
  return config;
}

/** Bloc autorité E-E-A-T — harmonisé sur toutes les fiches catalogue. */
export function getFormationCatalogueAutoriteParagraph(programmeUpdatedAt: string): string {
  return `Laure Olivié, formatrice IA générative spécialisée BTP (${formatAnneesExperienceBTP()}), dispense cette formation via ${formatOrganismeQualiopiCourt()}. Satisfaction ${formatNoteSatisfactionAffichageComplet()} (${indicateursResultats.periodeReference}). Programme mis à jour le ${programmeUpdatedAt}. Références : FFB Grand Paris, FFB Île-de-France, CSFE, CNAM Entreprise, Le Moniteur Formations.`;
}
