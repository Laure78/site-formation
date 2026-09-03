/**
 * SEO & GEO — fiches catalogue NIV-01 à NIV-06.
 * Titres orientés métier (pas « niveau 1 / 2 » en H1), blocs « En bref » citables par les IA.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import {
  formatNoteSatisfactionAffichageComplet,
  formatVolumeProsFormesBtpLibelle,
  indicateursResultats,
} from '@/lib/data/indicateurs-resultats';
import { SESSION_DUREE_LIBELLE } from '@/lib/tarifs-sessions';

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

const QUALIOPI_MENTION =
  'OFC Création d\'Entreprise, organisme certifié Qualiopi, présentiel Île-de-France';

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
      'Artisans et dirigeants de TPE/PME du bâtiment et des travaux publics',
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
    metaTitle: 'Formation IA appels d\'offres BTP | DCE & MT',
    h1: 'Formation IA appels d\'offres BTP : DCE, chiffrage et mémoire technique',
    subtitle:
      'Analysez un DCE complet, préparez le chiffrage assisté et structurez votre mémoire technique — sur vos dossiers réels avec Claude Cowork.',
    metaDescription:
      'Formation IA appels d\'offres BTP : DCE, CCTP, chiffrage assisté et mémoire technique avec Claude. 4 h présentiel, Qualiopi, financement OPCO selon éligibilité.',
    enBref: `La formation IA appels d'offres BTP apprend à analyser un DCE (RC, CCTP, CCAP, DPGF), préparer une checklist de chiffrage, comparer un devis et structurer un mémoire technique avec Claude AI Pro et Cowork. ${SESSION_DUREE_LIBELLE} en présentiel — ${QUALIOPI_MENTION}. L'IA assiste l'analyse ; le chiffrage final reste à valider par le professionnel.`,
    publicTargets: [
      'Chargés d\'affaires et responsables appels d\'offres',
      'Conducteurs de travaux impliqués dans les réponses aux marchés',
      'Dirigeants PME BTP et artisans du second œuvre',
      'Assistants commerciaux et chargés d\'études',
    ],
    iaLimits: [
      { iaAide: 'Synthétiser un DCE et extraire les prestations', validationHumaine: 'Valider l\'interprétation contractuelle et le chiffrage' },
      { iaAide: 'Comparer CCTP et DPGF', validationHumaine: 'Confirmer les postes oubliés et les quantités' },
      { iaAide: 'Rédiger des désignations de devis', validationHumaine: 'Valider prix et périmètre des ouvrages' },
      { iaAide: 'Structurer un mémoire technique', validationHumaine: 'Vérifier références, moyens et engagements réels' },
    ],
  },
  'NIV-03': {
    metaTitle: 'Formation IA conducteur de travaux | Chantier',
    h1: 'Formation IA conducteur de travaux : suivi chantier, CR et DOE',
    subtitle:
      'Analysez vos CCTP, produisez vos comptes rendus et organisez le suivi du chantier jusqu\'à la réception avec ChatGPT et Claude.',
    metaDescription:
      'Formation IA pour les pros du BTP : CCTP, comptes rendus, PPSPS, réserves et DOE avec Claude. 4 h présentiel, Qualiopi, financement OPCO selon éligibilité.',
    enBref: `La formation IA pour conducteurs de travaux apprend à utiliser ChatGPT et Claude pour analyser un CCTP, préparer un compte rendu, suivre les actions, gérer les réserves et structurer un DOE. Session ${SESSION_DUREE_LIBELLE} en présentiel — ${QUALIOPI_MENTION}.`,
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
    metaTitle: 'Formation Claude BTP | Projects & Cowork',
    h1: 'Maîtriser Claude pour le BTP : Projects, Cowork et Skills',
    subtitle:
      'Exploitez l’écosystème Claude (Projects, Cowork, Skills, connecteurs) sur vos documents BTP — formation avancée distincte du parcours applications métier.',
    metaDescription:
      'Formation Claude BTP : Projects, Cowork, Skills et connecteurs sur vos dossiers chantier. 4 h présentiel IDF, Qualiopi, financement OPCO selon éligibilité.',
    enBref: `La formation Claude BTP apprend à structurer des Projets Claude, créer des Skills métier, déléguer la production documentaire à Cowork et connecter Claude à la messagerie et au drive. ${SESSION_DUREE_LIBELLE} en présentiel — ${QUALIOPI_MENTION}. Distincte du parcours applications métier BTP.`,
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
    metaTitle: 'Formation IA MOE BTP | CR & réception',
    h1: 'Formation IA maîtrise d\'œuvre : CR, OS et réception chantier',
    subtitle:
      'Analysez les DCE, rédigez vos comptes rendus en quelques minutes et pilotez réserves et réception avec ChatGPT et Claude.',
    metaDescription:
      'Formation IA appliquée au bâtiment pour maîtres d\'œuvre : DCE, CR chantier, OS et GPA. 4 h, ChatGPT et Claude, Qualiopi, financement OPCO selon éligibilité.',
    enBref: `La formation IA pour maîtres d'œuvre apprend à analyser un DCE, rédiger un compte rendu de chantier, produire ordres de service et courriers MOE, et organiser le suivi des réserves avec l'IA. ${SESSION_DUREE_LIBELLE} en présentiel — ${QUALIOPI_MENTION}.`,
    publicTargets: [
      'Maîtres d\'œuvre d\'exécution (MOEX)',
      'Conducteurs de travaux MOE',
      'OPC et BET',
      'Assistant(e)s de gestion travaux',
    ],
    iaLimits: [
      { iaAide: 'Rédiger un CR à partir de notes vocales', validationHumaine: 'Valider observations et décisions' },
      { iaAide: 'Analyser un DCE MOE', validationHumaine: 'Confirmer conformité et alertes contractuelles' },
      { iaAide: 'Préparer un OS ou courrier type', validationHumaine: 'Valider le fond juridique et technique' },
      { iaAide: 'Suivre les réserves et la GPA', validationHumaine: 'Contrôler les levées sur le terrain' },
    ],
  },
  'NIV-06': {
    metaTitle: 'Application métier BTP niveau 1 : prototype IA',
    h1: 'Créer sa première application métier BTP avec l’IA',
    subtitle:
      'Transformer un problème métier en prototype fonctionnel avec le développement assisté par l’intelligence artificielle — sans compétence préalable en programmation.',
    metaDescription:
      'Formation IA pour le BTP : créer sa première application métier avec le développement assisté par l’IA. 7 h, prototype, Qualiopi, présentiel IDF.',
    enBref: `La formation niveau 1 applications métier BTP apprend à cadrer un besoin métier, rédiger un cahier des charges simple et construire un prototype fonctionnel avec le développement assisté par l’IA. Session 7 h en présentiel — ${QUALIOPI_MENTION}. Chaque participant repart avec un prototype ou le socle de son application — pas une application professionnelle complète.`,
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
      'Formation IA appliquée au bâtiment : application métier connectée (BDD, API, automatisations). 7 h présentiel, Qualiopi, financement selon éligibilité.',
    enBref: `La formation niveau 2 applications métier BTP enseigne la structuration d’une base de données, la gestion des accès, les workflows métier et la connexion à des services externes. Session 7 h en présentiel — ${QUALIOPI_MENTION}. Les cas d’usage (CRM, devis, trésorerie…) sont des exemples, pas des modules obligatoires.`,
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
      'Formation IA pour les pros du BTP : intégrer l’IA dans une application métier (documents, workflows). 7 h, Qualiopi, présentiel IDF.',
    enBref: `La formation niveau 3 applications métier BTP enseigne l’intégration de l’IA dans une application (analyse, extraction, classification, génération) avec validation humaine. Session 7 h en présentiel — ${QUALIOPI_MENTION}. L’assistant DCE est un exemple parmi d’autres cas d’usage avancés.`,
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
};

export function getFormationCatalogueSeo(ref: FormationCatalogueCode): FormationCatalogueSeoConfig {
  return FORMATION_CATALOGUE_SEO[ref];
}

/** Bloc autorité E-E-A-T — harmonisé sur toutes les fiches catalogue. */
export function getFormationCatalogueAutoriteParagraph(programmeUpdatedAt: string): string {
  return `Laure Olivié, formatrice IA générative spécialisée BTP (+10 ans de terrain en travaux publics et conduite de chantier), dispense cette formation via OFC Création d'Entreprise (organisme certifié Qualiopi). ${formatVolumeProsFormesBtpLibelle()} — satisfaction ${formatNoteSatisfactionAffichageComplet()} (${indicateursResultats.periodeReference}). Programme mis à jour le ${programmeUpdatedAt}. Références : FFB Grand Paris, FFB Île-de-France, CSFE, CNAM Entreprise, Lefebvre Dalloz.`;
}
