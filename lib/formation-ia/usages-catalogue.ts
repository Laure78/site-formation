/**
 * Usages IA intégrés au déroulé des fiches catalogue Qualiopi (NIV-*).
 * Progression : initiation (NIV-01) → intermédiaire → avancé (NIV-04 / apps).
 * Pas les deux outils dans chaque module — choix selon l’objectif.
 */
import type { FormationCode } from '@/data/formations';
import type {
  FormationIaApplicationsBundle,
  FormationIaUsage,
} from '@/lib/formation-ia/types';

const u = (
  partial: Omit<FormationIaUsage, 'pratiqueParticipant'> & {
    pratiqueParticipant?: boolean;
  },
): FormationIaUsage => ({
  pratiqueParticipant: partial.pratiqueParticipant ?? true,
  ...partial,
});

const NIV01_USAGES: readonly FormationIaUsage[] = [
  u({
    id: 'niv01-cadrage-prompt',
    moduleLabel: 'Comprendre et utiliser l’IA',
    competenceMetier: 'Formuler une demande professionnelle claire à une IA',
    tacheIa:
      'Produire une première version structurée à partir d’un objectif, d’un format et d’un contexte métier',
    documentsOuDonnees: 'Contexte métier fictif + extrait anonymisé (email ou notes)',
    outil: 'claude-et-chatgpt',
    fonctionnaliteId: 'prompts-fichiers',
    travailParticipant:
      'Rédiger le prompt (rôle, tâche, format), comparer deux formulations, noter les écarts',
    livrable: 'Fiche méthode « Cadrer → produire → contrôler » personnalisée',
    controlesHumains:
      'Vérifier l’absence de données sensibles ; rejeter toute affirmation sans source',
    critereEvaluation:
      'Objectif et format explicites ; distinction faits / hypothèses ; checklist de relecture renseignée',
    niveau: 'initiation',
  }),
  u({
    id: 'niv01-devis-structure',
    moduleLabel: 'Devis et chiffrage',
    competenceMetier: 'Structurer une désignation d’ouvrage pour un devis',
    tacheIa:
      'Proposer une structure de devis et une checklist de contrôle à partir d’une description de travaux',
    documentsOuDonnees: 'Description anonymisée de lot / devis pédagogique',
    outil: 'chatgpt',
    fonctionnaliteId: 'prompts-fichiers',
    travailParticipant:
      'Générer la trame, corriger le vocabulaire métier, cocher la checklist de validation',
    livrable: 'Trame de devis contrôlée + checklist prix / quantités / unités',
    controlesHumains:
      'Prix, métrés, unités et références techniques : validation exclusive du professionnel',
    critereEvaluation:
      'Structure complète ; checklist applicable ; aucune validation de prix laissée à l’IA',
    niveau: 'initiation',
  }),
  u({
    id: 'niv01-cr-chantier',
    moduleLabel: 'Documents de chantier',
    competenceMetier: 'Transformer des notes en compte rendu de chantier',
    tacheIa:
      'Structurer notes brutes en CR (présents, décisions, actions, responsables, échéances)',
    documentsOuDonnees: 'Notes de réunion anonymisées (cas pédagogique)',
    outil: 'claude',
    fonctionnaliteId: 'prompts-fichiers',
    travailParticipant:
      'Produire le CR, remplir le tableau d’actions, corriger les formulations ambiguës',
    livrable: 'Compte rendu + tableau des actions à valider',
    controlesHumains:
      'Vérifier noms, dates, décisions et engagements avant diffusion',
    critereEvaluation:
      'Actions avec responsable et échéance ; pas de décision inventée ; relecture signée sur la grille',
    niveau: 'initiation',
  }),
  u({
    id: 'niv01-email-pro',
    moduleLabel: 'Communication professionnelle',
    competenceMetier: 'Rédiger et évaluer un message client ou partenaire',
    tacheIa:
      'Proposer deux variantes de courriel puis une grille de vérification avant envoi',
    documentsOuDonnees: 'Contexte relation client fictif (retard, demande de précision)',
    outil: 'chatgpt',
    fonctionnaliteId: 'prompts-fichiers',
    travailParticipant:
      'Choisir une variante, corriger le ton, appliquer la grille avant « envoi simulé »',
    livrable: 'Message argumenté + grille de vérification avant envoi',
    controlesHumains:
      'Validation humaine obligatoire ; aucun envoi réel depuis l’outil pendant la session',
    critereEvaluation:
      'Ton adapté ; faits exacts ; critères de vérification cochés',
    niveau: 'initiation',
  }),
];

const NIV02_USAGES: readonly FormationIaUsage[] = [
  u({
    id: 'niv02-extraction-exigences',
    moduleLabel: 'Analyse croisée du DCE',
    competenceMetier: 'Extraire les exigences d’un dossier d’appel d’offres avec leurs références',
    tacheIa:
      'Lister exigences RC / CCTP / CCAP avec renvoi aux articles et pièces',
    documentsOuDonnees: 'DCE fil rouge anonymisé (RC, CCTP, CCAP, DPGF)',
    outil: 'claude',
    fonctionnaliteId: 'claude-projects',
    travailParticipant:
      'Déposer les pièces dans un Projet, lancer l’extraction, contrôler 5 exigences au hasard dans les PDF',
    livrable: 'Tableau des exigences avec références sources',
    controlesHumains:
      'Chaque exigence critique est relue dans la pièce d’origine',
    critereEvaluation:
      'Références exactes ; pas d’exigence inventée ; écarts signalés comme hypothèses',
    niveau: 'intermediaire',
  }),
  u({
    id: 'niv02-audit-incoherences',
    moduleLabel: 'Contrôle CCTP / DPGF',
    competenceMetier: 'Repérer contradictions et informations manquantes entre pièces',
    tacheIa:
      'Produire un tableau d’écarts (unité, quantité, prestation, clause) avec propositions de clarification',
    documentsOuDonnees: 'CCTP + DPGF du même lot (dossier pédagogique)',
    outil: 'claude',
    fonctionnaliteId: 'claude-artifacts',
    travailParticipant:
      'Générer le tableau, prioriser les écarts, rédiger 3 questions au donneur d’ordre',
    livrable:
      'Tableau de contrôle du dossier : références, écarts, points à clarifier, corrections proposées',
    controlesHumains:
      'Vérification manuelle des lignes prioritaires ; aucune correction chiffrée sans métré validé',
    critereEvaluation:
      'Écarts sourcés ; distinction faits / hypothèses ; questions actionnables',
    niveau: 'intermediaire',
  }),
  u({
    id: 'niv02-memoire-technique',
    moduleLabel: 'Mémoire technique',
    competenceMetier: 'Auditer et structurer un mémoire technique selon les critères du RC',
    tacheIa:
      'Proposer un plan aligné sur les critères / pondérations et une grille d’auto-contrôle',
    documentsOuDonnees: 'RC + trame ou extrait de mémoire anonymisé',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-canvas',
    travailParticipant:
      'Construire le plan, remplir la grille d’audit, corriger deux sections critiques',
    livrable: 'Plan de mémoire + grille d’audit remplie',
    controlesHumains:
      'Engagements, moyens et références techniques validés par le professionnel',
    critereEvaluation:
      'Alignement critères RC ; grille complète ; corrections justifiées',
    niveau: 'intermediaire',
  }),
  u({
    id: 'niv02-checklist-chiffrage',
    moduleLabel: 'Préparation du chiffrage',
    competenceMetier: 'Préparer les points de contrôle avant chiffrage',
    tacheIa:
      'Générer une checklist quantités / unités / prestations à partir des pièces fournies',
    documentsOuDonnees: 'Extraits DPGF + CCTP',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-data-analysis',
    travailParticipant:
      'Importer un extrait tabulaire pédagogique, croiser avec le CCTP, cocher la checklist',
    livrable: 'Checklist chiffrage priorisée',
    controlesHumains:
      'Métrés et prix : jamais validés par l’IA ; recalcul manuel sur un échantillon',
    critereEvaluation:
      'Checklist utilisable ; échantillon contrôlé ; hypothèses explicites',
    niveau: 'intermediaire',
    demoFormateur: true,
  }),
];

const NIV03_USAGES: readonly FormationIaUsage[] = [
  u({
    id: 'niv03-analyse-cctp',
    moduleLabel: 'Installation & démarrage de chantier',
    competenceMetier: 'Analyser CCTP / DPGF pour préparer le démarrage',
    tacheIa:
      'Extraire ouvrages, contraintes, points d’arrêt et exigences ; proposer une trame de planning',
    documentsOuDonnees: 'CCTP / DPGF anonymisés du fil rouge chantier',
    outil: 'claude',
    fonctionnaliteId: 'claude-skills',
    travailParticipant:
      'Activer le skill adapté, contrôler les extractions, ajuster le planning prévisionnel',
    livrable: 'Synthèse démarrage + points d’arrêt à valider',
    controlesHumains:
      'Conformité DTU / pièces marché : retour aux sources ; pas de validation autonome',
    critereEvaluation:
      'Extractions sourcées ; planning cohérent ; écarts listés',
    niveau: 'intermediaire',
  }),
  u({
    id: 'niv03-cr-actions',
    moduleLabel: 'Gestion de chantier',
    competenceMetier: 'Structurer un compte rendu et un tableau d’actions',
    tacheIa:
      'Transformer notes ou dictée transcrite en CR + tableau (décision, action, responsable, échéance)',
    documentsOuDonnees: 'Notes de réunion de chantier anonymisées',
    outil: 'claude',
    fonctionnaliteId: 'claude-skills',
    travailParticipant:
      'Produire CR et tableau, marquer Levé / En cours / En attente, corriger les ambiguïtés',
    livrable: 'CR de chantier + tableau des actions',
    controlesHumains: 'Validation des décisions et destinataires avant diffusion',
    critereEvaluation:
      'Actions traçables ; pas d’invention ; statut des points non soldés renseigné',
    niveau: 'intermediaire',
  }),
  u({
    id: 'niv03-avancement-planning',
    moduleLabel: 'Gestion de chantier',
    competenceMetier: 'Comparer l’avancement déclaré au planning fourni',
    tacheIa:
      'Repérer écarts d’avancement et préparer les points à traiter en réunion de chantier',
    documentsOuDonnees: 'Planning + notes d’avancement pédagogiques',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-data-analysis',
    travailParticipant:
      'Analyser le tableau, lister les écarts, préparer l’ordre du jour de réunion',
    livrable: 'Ordre du jour + liste d’écarts sourcés',
    controlesHumains:
      'Constats terrain priorisés par le conducteur ; l’IA ne constate pas la conformité',
    critereEvaluation:
      'Écarts référencés ; questions de réunion claires ; hypothèses marquées',
    niveau: 'intermediaire',
  }),
  u({
    id: 'niv03-courrier-reception',
    moduleLabel: 'Administratif de suivi',
    competenceMetier: 'Rédiger courrier / rapport d’intervention et préparer la réception',
    tacheIa:
      'Produire brouillon de courrier, liste de réserves et trame de suivi DOE',
    documentsOuDonnees: 'Constats et listes de réserves anonymisés',
    outil: 'claude',
    fonctionnaliteId: 'claude-artifacts',
    travailParticipant:
      'Générer les documents, appliquer la grille juridique minimale, corriger avant « envoi simulé »',
    livrable: 'Courrier + liste de réserves + points DOE à compléter',
    controlesHumains:
      'Relecture humaine obligatoire ; contenus juridiques vérifiés dans les pièces applicables',
    critereEvaluation:
      'Formulations exactes ; réserves localisées ; aucune mise en demeure non validée',
    niveau: 'intermediaire',
  }),
];

const NIV04_USAGES: readonly FormationIaUsage[] = [
  u({
    id: 'niv04-projet-chantier',
    moduleLabel: 'Projets et skills',
    competenceMetier: 'Structurer un environnement Claude réutilisable pour une affaire',
    tacheIa:
      'Créer un Projet avec instructions permanentes et base documentaire (CCTP, chartes, modèles)',
    documentsOuDonnees: 'Pièces anonymisées d’une affaire type',
    outil: 'claude',
    fonctionnaliteId: 'claude-projects',
    travailParticipant:
      'Configurer le Projet, tester 2 requêtes métier, documenter les instructions',
    livrable: 'Projet « chantier type » opérationnel + fiche d’instructions',
    controlesHumains:
      'Revue du périmètre documentaire et des consignes de confidentialité',
    critereEvaluation:
      'Instructions claires ; base pertinente ; réponses contextualisées contrôlées',
    niveau: 'avance',
  }),
  u({
    id: 'niv04-skill-metier',
    moduleLabel: 'Projets et skills',
    competenceMetier: 'Industrialiser une procédure métier réutilisable',
    tacheIa: 'Créer ou adapter un skill BTP (procédure + format de sortie + contrôles)',
    documentsOuDonnees: 'Procédure interne simplifiée (CR, checklist AO…)',
    outil: 'claude',
    fonctionnaliteId: 'claude-skills',
    travailParticipant:
      'Rédiger / adapter le skill, le tester sur un cas, noter les échecs et correctifs',
    livrable: '2 skills BTP testés + journal de tests',
    controlesHumains: 'Lecture du SKILL.md ; validation du livrable sur pièces sources',
    critereEvaluation:
      'Skill déclenchable ; sortie conforme à la grille ; erreurs documentées',
    niveau: 'avance',
  }),
  u({
    id: 'niv04-cowork-dossier',
    moduleLabel: 'Cowork',
    competenceMetier: 'Produire un dossier documentaire sous supervision',
    tacheIa:
      'Enchaîner analyse → production → révision d’un livrable multi-pièces avec points de contrôle',
    documentsOuDonnees: 'Dossier chantier pédagogique',
    outil: 'claude',
    fonctionnaliteId: 'claude-cowork',
    travailParticipant:
      'Lancer la tâche, valider chaque jalon, corriger avant diffusion simulée',
    livrable: 'Dossier produit de bout en bout avec journal de validation',
    controlesHumains:
      'Arrêt obligatoire avant toute diffusion ; connecteurs désactivés si non autorisés',
    critereEvaluation:
      'Jalons validés ; sources citées ; décision finale humaine tracée',
    niveau: 'avance',
    demoFormateur: true,
  }),
  u({
    id: 'niv04-connecteur-securise',
    moduleLabel: 'Connecteurs',
    competenceMetier: 'Relier Claude aux outils avec un cadre de confidentialité',
    tacheIa:
      'Configurer un connecteur (démonstration) et décrire un workflow drive → analyse → validation',
    documentsOuDonnees: 'Jeu de fichiers pédagogiques hors données clients réelles',
    outil: 'claude',
    fonctionnaliteId: 'claude-connectors',
    travailParticipant:
      'Cartographier droits d’accès, données autorisées / interdites, étapes de validation',
    livrable: 'Workflow type sécurisé + matrice de données autorisées',
    controlesHumains:
      'Autorisations entreprise ; pas de DCE / offre réelle sans cadre adapté',
    critereEvaluation:
      'Matrice complète ; risques listés ; alternative sans connecteur documentée',
    niveau: 'avance',
    demoFormateur: true,
  }),
];

const NIV05_USAGES: readonly FormationIaUsage[] = [
  u({
    id: 'niv05-fiche-dce',
    moduleLabel: 'Analyse des offres et conformité',
    competenceMetier: 'Synthétiser un DCE pour la maîtrise d’œuvre',
    tacheIa:
      'Produire une fiche de synthèse (points clés) et signaler incohérences entre pièces',
    documentsOuDonnees: 'DCE pédagogique importé dans un Projet Claude',
    outil: 'claude',
    fonctionnaliteId: 'claude-projects',
    travailParticipant:
      'Générer la fiche, contrôler 5 points dans les pièces, lister les questions aux entreprises',
    livrable: 'Fiche-type d’analyse DCE + questions de clarification',
    controlesHumains:
      'Interprétation contractuelle et conformité : validation MOE / juridique',
    critereEvaluation:
      'Points sourcés ; incohérences justifiées ; pas de verdict de conformité autonome',
    niveau: 'intermediaire',
  }),
  u({
    id: 'niv05-cr-moe',
    moduleLabel: 'Comptes rendus de chantier',
    competenceMetier: 'Produire un CR MOE structuré rapidement',
    tacheIa:
      'Structurer transcription / notes en CR (avancement, réserves, décisions, échéances)',
    documentsOuDonnees: 'Notes ou transcription anonymisée + éventuelles photos pédagogiques',
    outil: 'claude-et-chatgpt',
    fonctionnaliteId: 'chatgpt-image-analysis',
    travailParticipant:
      'Produire le CR ; pour les photos : formuler observations et questions (sans constat définitif)',
    livrable: 'Gabarit CR MOE renseigné + légendes photo distinguant observation / hypothèse',
    controlesHumains:
      'Validation des décisions et destinataires ; photos sans donnée personnelle identifiable',
    critereEvaluation:
      'Structure complète ; distinction observation / hypothèse / constat confirmé',
    niveau: 'intermediaire',
  }),
  u({
    id: 'niv05-os-courrier',
    moduleLabel: 'Actes administratifs',
    competenceMetier: 'Rédiger OS et courriers types sous contrôle',
    tacheIa:
      'Produire un ordre de service ou courrier à partir d’un contexte chantier cadré',
    documentsOuDonnees: 'Contexte pédagogique + références CCAG / pièces marché fictives',
    outil: 'claude',
    fonctionnaliteId: 'claude-artifacts',
    travailParticipant:
      'Générer le brouillon, vérifier références et délais, corriger avant validation simulée',
    livrable: 'OS / courrier contrôlé + fiche de points juridiques à vérifier',
    controlesHumains:
      'Vérification dans les documents applicables ; pas de valeur juridique sans validation',
    critereEvaluation:
      'Références exactes ; délais cohérents ; corrections tracées',
    niveau: 'intermediaire',
  }),
  u({
    id: 'niv05-reserves-suivi',
    moduleLabel: 'Réserves, réception et suivi client',
    competenceMetier: 'Structurer le suivi des réserves et les réponses clients',
    tacheIa:
      'Transformer constats en fiches de réserve et préparer relances / réponses standardisées',
    documentsOuDonnees: 'Liste de réserves pédagogique',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-projects',
    travailParticipant:
      'Classer par lot, produire relances, appliquer grille avant envoi simulé',
    livrable: 'Tableau de suivi des réserves + modèles de réponse contrôlés',
    controlesHumains: 'Validation MOE / entreprise avant toute diffusion',
    critereEvaluation:
      'Classement exact ; ton professionnel ; grille avant envoi cochée',
    niveau: 'intermediaire',
  }),
];

const NIV06_USAGES: readonly FormationIaUsage[] = [
  u({
    id: 'niv06-cadrage-app',
    moduleLabel: 'Concevoir avec l’IA',
    competenceMetier: 'Cadrer un besoin d’outil métier BTP',
    tacheIa:
      'Transformer un besoin terrain en spécification courte (écrans, données, règles)',
    documentsOuDonnees: 'Description de process (relevé d’heures, suivi, checklist…)',
    outil: 'claude-et-chatgpt',
    fonctionnaliteId: 'prompts-fichiers',
    travailParticipant:
      'Rédiger le brief, faire produire une structure d’app, valider le périmètre',
    livrable: 'Brief + maquette fonctionnelle de première version',
    controlesHumains: 'Périmètre et règles métier validés par le participant',
    critereEvaluation:
      'Besoin clair ; hors-scope explicite ; critères d’acceptation listés',
    niveau: 'intermediaire',
  }),
  u({
    id: 'niv06-iteration-ia',
    moduleLabel: 'Itérer et tester',
    competenceMetier: 'Évaluer et corriger une première version générée',
    tacheIa:
      'Demander des corrections ciblées, produire une checklist de tests manuels',
    documentsOuDonnees: 'Version générée pendant la session',
    outil: 'claude',
    fonctionnaliteId: 'claude-artifacts',
    travailParticipant: 'Tester 5 scénarios, journaliser les bugs, relancer l’IA',
    livrable: 'Journal de tests + version corrigée',
    controlesHumains: 'Aucune mise en production sans tests manuels',
    critereEvaluation:
      'Scénarios couverts ; corrections vérifiées ; limites documentées',
    niveau: 'intermediaire',
  }),
];

const NIV07_USAGES: readonly FormationIaUsage[] = [
  u({
    id: 'niv07-donnees-connectees',
    moduleLabel: 'Connecter les données',
    competenceMetier: 'Relier l’outil à des données métier structurées',
    tacheIa:
      'Analyser un export (CSV) et définir les règles de contrôle avant intégration',
    documentsOuDonnees: 'Export pédagogique (heures, stocks, suivi)',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-data-analysis',
    travailParticipant:
      'Profiler les colonnes, repérer anomalies, documenter les règles de validation',
    livrable: 'Schéma de données + règles de contrôle',
    controlesHumains: 'Pas d’accès à des SI clients réels sans autorisation',
    critereEvaluation:
      'Anomalies sourcées ; règles testables ; hypothèses marquées',
    niveau: 'avance',
  }),
  u({
    id: 'niv07-spec-api',
    moduleLabel: 'Spécifier les échanges',
    competenceMetier: 'Préparer une spécification d’échange lisible pour un partenaire',
    tacheIa:
      'Rédiger une note d’interface (champs, erreurs, responsabilités) à partir du besoin',
    documentsOuDonnees: 'Cas pédagogique d’échange entre outils',
    outil: 'claude',
    fonctionnaliteId: 'claude-projects',
    travailParticipant: 'Produire la note, la faire relire par binôme, corriger',
    livrable: 'Note d’interface validée en session',
    controlesHumains: 'Décision d’architecture et sécurité : professionnel / TI',
    critereEvaluation:
      'Champs et erreurs explicites ; responsabilités claires',
    niveau: 'avance',
  }),
];

const NIV08_USAGES: readonly FormationIaUsage[] = [
  u({
    id: 'niv08-gouvernance',
    moduleLabel: 'Industrialiser',
    competenceMetier: 'Définir règles d’usage et de validation pour un outil IA métier',
    tacheIa:
      'Produire une procédure : qui peut déposer quoi, qui valide, quoi journaliser',
    documentsOuDonnees: 'Cas d’outil déjà construit en session',
    outil: 'claude',
    fonctionnaliteId: 'claude-skills',
    travailParticipant:
      'Rédiger la procédure, simuler un incident (donnée sensible), corriger',
    livrable: 'Procédure d’usage + checklist de mise en service',
    controlesHumains: 'Validation direction / référent avant déploiement réel',
    critereEvaluation:
      'Rôles clairs ; données interdites listées ; remédiation prévue',
    niveau: 'avance',
  }),
  u({
    id: 'niv08-diagnostic-orga',
    moduleLabel: 'Industrialiser',
    competenceMetier: 'Préparer un diagnostic organisationnel assisté',
    tacheIa:
      'Comparer options de déploiement avec hypothèses explicites et plan d’action priorisé',
    documentsOuDonnees: 'Contexte PME BTP pédagogique',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-deep-research',
    travailParticipant:
      'Cadre de comparaison, options, avantages / limites ; décision finale humaine',
    livrable:
      'Note d’aide à la décision : écarts, hypothèses, questions, actions proposées',
    controlesHumains:
      'Deep research = aide documentaire ; sources vérifiées ; décision au professionnel',
    critereEvaluation:
      'Hypothèses explicites ; options comparées ; sources citées ou fournies',
    niveau: 'avance',
    demoFormateur: true,
  }),
];

const NIV10_USAGES: readonly FormationIaUsage[] = [
  u({
    id: 'niv10-brief-outil',
    moduleLabel: 'Du besoin à la première version',
    competenceMetier: 'Traduire un besoin BTP en application guidée par l’IA',
    tacheIa:
      'Produire brief, structure de données et première version d’écrans',
    documentsOuDonnees: 'Besoin choisi par le participant (anonymisé)',
    outil: 'claude-et-chatgpt',
    fonctionnaliteId: 'prompts-fichiers',
    travailParticipant: 'Itérer brief → prototype → tests manuels',
    livrable: 'Première version fonctionnelle + feuille de route',
    controlesHumains: 'Périmètre, données et tests validés par le participant',
    critereEvaluation:
      'Prototype utilisable ; tests documentés ; hors-scope clair',
    niveau: 'intermediaire',
  }),
  u({
    id: 'niv10-controle-qualite',
    moduleLabel: 'Contrôler avant usage',
    competenceMetier: 'Évaluer, corriger et documenter un outil généré',
    tacheIa:
      'Construire une grille de contrôle (données, parcours, erreurs) et corriger',
    documentsOuDonnees: 'Prototype de session',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-canvas',
    travailParticipant: 'Remplir la grille, corriger, préparer la doc utilisateur courte',
    livrable: 'Grille de contrôle + notice utilisateur',
    controlesHumains: 'Pas de diffusion externe sans validation',
    critereEvaluation:
      'Grille complète ; corrections vérifiées ; notice compréhensible',
    niveau: 'intermediaire',
  }),
];

const BUNDLES: Partial<Record<FormationCode, FormationIaApplicationsBundle>> = {
  'NIV-01': {
    title: 'Applications de l’IA dans votre métier',
    intro:
      'Quatre exercices d’initiation intégrés aux modules. ChatGPT et Claude en assistance — jamais en substitut à votre expertise. Documents anonymisés uniquement.',
    showMethodCycle: true,
    usages: NIV01_USAGES,
  },
  'NIV-02': {
    title: 'Applications de l’IA — études, chiffrage et appels d’offres',
    intro:
      'Usages intégrés au dossier fil rouge : extraction, audit croisé, mémoire technique et checklist de chiffrage. L’IA assiste ; le professionnel valide.',
    showMethodCycle: true,
    usages: NIV02_USAGES,
  },
  'NIV-03': {
    title: 'Applications de l’IA — conduite de travaux',
    intro:
      'Skills Claude et analyses ciblées ChatGPT sur le fil rouge chantier : démarrage, CR, avancement, réception. Validation humaine avant toute diffusion.',
    showMethodCycle: true,
    usages: NIV03_USAGES,
  },
  'NIV-04': {
    title: 'Applications avancées Claude pour le BTP',
    intro:
      'Projets, Skills, Cowork et Connecteurs — avec prérequis d’abonnement et alternatives pédagogiques si une fonction n’est pas disponible en session.',
    showMethodCycle: true,
    usages: NIV04_USAGES,
  },
  'NIV-05': {
    title: 'Applications de l’IA — maîtrise d’œuvre',
    intro:
      'Analyse DCE, CR, actes administratifs et suivi des réserves. Les contrôles restent à la MOE ; l’IA ne délivre pas de conformité réglementaire.',
    showMethodCycle: true,
    usages: NIV05_USAGES,
  },
  'NIV-06': {
    title: 'Applications de l’IA — concevoir une application métier',
    intro:
      'L’IA guide le cadrage et l’itération. Vous validez le périmètre, les tests et la responsabilité du projet.',
    showMethodCycle: true,
    usages: NIV06_USAGES,
  },
  'NIV-07': {
    title: 'Applications de l’IA — connecter les données métier',
    intro:
      'Analyse de données et spécification d’échanges sur cas pédagogiques — sans accès non autorisé aux SI clients.',
    showMethodCycle: true,
    usages: NIV07_USAGES,
  },
  'NIV-08': {
    title: 'Applications de l’IA — industrialiser et gouverner',
    intro:
      'Procédures d’usage, diagnostic organisationnel assisté et décision humaine conservée.',
    showMethodCycle: true,
    usages: NIV08_USAGES,
  },
  'NIV-10': {
    title: 'Applications de l’IA — créer sans coder',
    intro:
      'Du brief à la première version contrôlée. L’IA propose ; vous testez et validez.',
    showMethodCycle: true,
    usages: NIV10_USAGES,
  },
};

export function getFormationIaApplications(
  code: FormationCode,
): FormationIaApplicationsBundle | null {
  return BUNDLES[code] ?? null;
}

export function listFormationIaApplicationCodes(): FormationCode[] {
  return Object.keys(BUNDLES) as FormationCode[];
}
