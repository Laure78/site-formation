/**
 * Sections GEO explicites — fiches catalogue NIV-01 à NIV-06.
 * Réponses factuelles pour moteurs IA ; alignées sur le contenu visible.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { getFormationByCode, libelleDureeFormation } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';
import { MODALITE_PEDAGOGIQUE_CATALOGUE } from '@/lib/infos-pratiques-catalogue';
import { getFormationCatalogueByRef } from '@/lib/formations-catalogue-display';

export type FormationGeoMaillageLink = {
  href: string;
  label: string;
};

export type FormationCatalogueGeoExtended = {
  queApprendre: string;
  documentsBtp: readonly string[];
  outilsIa: readonly string[];
  dureeReponse: string;
  livrables: readonly string[];
  debutants: string;
  propresDossiers: string;
  iaRemplacePro: string;
  deroulement: string;
  /** ≥ 3 liens vers le hub catalogue et pages pilier du cluster. */
  clusterMaillage: readonly FormationGeoMaillageLink[];
};

const COMMON_DEROULEMENT = `${MODALITE_PEDAGOGIQUE_CATALOGUE}. Alternance démonstrations courtes et ateliers pratiques sur les documents des participants (anonymisés si besoin). Émargement, feuille de présence et certificat de réalisation.`;

const COMMON_PROPRES_DOSSIERS =
  'Oui, lorsque le format le permet : chaque participant travaille de préférence sur ses propres documents professionnels, anonymisés si nécessaire (DCE, CCTP, devis, CR, etc.).';

const COMMON_IA_NON =
  'Non. L’IA assiste l’analyse, la structuration et la rédaction — toute sortie doit être relue et validée par le professionnel avant remise ou diffusion.';

const CLUSTER_BASE: FormationGeoMaillageLink[] = [
  { href: LINKS.formations, label: 'Catalogue des formations IA pour le BTP' },
  { href: LINKS.financement, label: 'Financement Constructys formation IA BTP' },
];

export const FORMATION_CATALOGUE_GEO_EXTENDED: Record<
  FormationCatalogueCode,
  FormationCatalogueGeoExtended
> = {
  'NIV-01': {
    queApprendre:
      'Utiliser ChatGPT et Claude pour rédiger des devis, emails, comptes rendus, trames de DOE et contenus professionnels — avec méthode de prompt et contrôle des résultats.',
    documentsBtp: ['Devis et désignations', 'Comptes rendus de chantier', 'DOE et PV de réception', 'Emails clients et fournisseurs'],
    outilsIa: ['ChatGPT', 'Claude AI'],
    dureeReponse:
      '4 heures en présentiel en Île-de-France. Intra-entreprise : 4 à 12 participants dans les locaux de l’entreprise. Interentreprises selon calendrier, sous réserve d’un nombre minimum d’inscrits.',
    livrables: [
      'Bibliothèque de prompts BTP',
      'Trames de devis, comptes rendus, DOE et PV',
      'Checklist de validation humaine',
      'Certificat de réalisation',
    ],
    debutants:
      'Oui — aucun prérequis IA. Savoir utiliser un ordinateur et le français écrit suffit. Idéal comme première formation IA BTP.',
    propresDossiers: COMMON_PROPRES_DOSSIERS,
    iaRemplacePro: COMMON_IA_NON,
    deroulement: COMMON_DEROULEMENT,
    clusterMaillage: [
      ...CLUSTER_BASE,
      { href: LINKS.chatgptArtisans, label: 'ChatGPT pour entreprises BTP' },
      { href: LINKS.formationIaBtpIdfZones, label: 'Formation IA BTP Île-de-France' },
    ],
  },
  'NIV-02': {
    queApprendre:
      'Organiser un DCE, extraire les exigences, croiser les pièces, préparer une checklist de chiffrage et structurer un mémoire technique avec une méthode guidée réutilisable.',
    documentsBtp: ['DCE (RC, CCTP, CCAP, DPGF, BPU)', 'Ancien devis', 'Trame de mémoire technique', 'Checklist avant dépôt'],
    outilsIa: ['Claude AI Pro', 'Claude Cowork'],
    dureeReponse: '',
    livrables: [
      'Grille de lecture du DCE',
      'Checklist des points de chiffrage',
      'Structure de mémoire technique',
      'Bibliothèque de prompts et méthode de validation',
    ],
    debutants:
      'Non : bases d’une IA générative et connaissance générale des appels d’offres requises. Abonnement professionnel à l’outil de session obligatoire.',
    propresDossiers:
      'Oui en intra : un dossier fil rouge collectif (DCE, ancien devis, trame MT) sélectionné avec l’entreprise. En interentreprises : dossiers pédagogiques anonymisés possibles.',
    iaRemplacePro:
      'Non. L’IA n’assure ni chiffrage définitif, ni conformité de l’offre, ni interprétation juridique. Le professionnel valide prix, quantités, moyens et engagements.',
    deroulement: `${MODALITE_PEDAGOGIQUE_CATALOGUE}. 75 % pratique sur un dossier fil rouge. Accueil, quatre modules et bilan — total 4 heures.`,
    clusterMaillage: [
      ...CLUSTER_BASE,
      { href: LINKS.iaAnalyseDce, label: 'Analyser un DCE avec l’IA' },
      { href: LINKS.iaMemoireTechnique, label: 'Mémoire technique BTP avec l’IA' },
      { href: LINKS.formationIaMarchePublicTravaux, label: 'Formation IA marchés publics travaux' },
    ],
  },
  'NIV-03': {
    queApprendre:
      'Piloter un chantier avec l’IA : analyser un CCTP, produire des CR, suivre actions et réserves, préparer PPSPS et structurer un DOE.',
    documentsBtp: ['CCTP et DPGF', 'Comptes rendus de chantier', 'PPSPS et documents sécurité', 'PV de réserves et DOE'],
    outilsIa: ['Claude AI (Skills)', 'ChatGPT'],
    dureeReponse: '',
    livrables: ['Bibliothèque de skills BTP (mise à disposition)', 'CR et checklists sur vos dossiers', 'Méthode de suivi documentaire'],
    debutants:
      'Bases IA recommandées (niveau 1 ou pratique régulière). Compte Claude Pro recommandé pour les skills.',
    propresDossiers: COMMON_PROPRES_DOSSIERS,
    iaRemplacePro: COMMON_IA_NON,
    deroulement: `${MODALITE_PEDAGOGIQUE_CATALOGUE}. 70 % pratique — 4 modules phasés chantier (installation → sécurité → gestion → administratif).`,
    clusterMaillage: [
      ...CLUSTER_BASE,
      { href: LINKS.formationConducteurTravaux, label: 'Formation IA conducteur de travaux BTP' },
      { href: LINKS.iaCompteRenduChantier, label: 'Compte rendu de chantier avec l’IA' },
      { href: LINKS.promptsIaConducteurTravaux, label: '20 prompts IA conducteur de travaux' },
    ],
  },
  'NIV-04': {
    queApprendre:
      'Structurer des Projets Claude, créer des Skills métier, déléguer la production documentaire à Cowork et connecter Claude à vos outils (messagerie, drive).',
    documentsBtp: ['Dossiers chantier complets', 'CR, mémoires, courriers', 'Modèles entreprise', 'Bibliothèque de skills'],
    outilsIa: ['Claude AI Pro', 'Claude Cowork', 'Claude Code', 'Connecteurs (Gmail, Drive)'],
    dureeReponse: '',
    livrables: ['Projet Claude structuré', 'Skills BTP opérationnels', 'Dossier produit avec Cowork'],
    debutants:
      'Non — formation avancée. Utilisation régulière de Claude et abonnement Claude Pro requis.',
    propresDossiers:
      'Oui — pièces de chantier, CCTP, CCAP et modèles internes apportés par chaque participant.',
    iaRemplacePro: COMMON_IA_NON,
    deroulement: `${MODALITE_PEDAGOGIQUE_CATALOGUE}. 70 % pratique — fil rouge PME BTP du Projet au connecteur fiabilisé.`,
    clusterMaillage: [
      ...CLUSTER_BASE,
      { href: LINKS.parcoursApplicationsMetierBtp, label: 'Parcours applications métier BTP avec l’IA' },
      { href: LINKS.formationPmeBtp, label: 'Déployer l’IA dans une PME du BTP' },
      { href: LINKS.guideClaudeBtpOfc, label: 'Guide Claude BTP — Projects et Skills' },
    ],
  },
  'NIV-05': {
    queApprendre:
      'Analyser un DCE MOE, rédiger des CR en quelques minutes, produire OS et courriers, suivre réserves et réception côté maîtrise d’œuvre.',
    documentsBtp: ['DCE et bordereaux MOE', 'Comptes rendus de chantier', 'Ordres de service', 'Courriers MOE et réserves'],
    outilsIa: ['Claude AI', 'ChatGPT'],
    dureeReponse: '',
    livrables: ['Bibliothèque de prompts MOE', 'CR et courriers sur vos dossiers', 'Méthode suivi réserves / GPA'],
    debutants:
      'Oui pour l’IA — aisance numérique suffisante. Abonnements Claude Pro et ChatGPT Plus recommandés.',
    propresDossiers:
      'Oui — dossiers techniques, OS, CR et DCE réels apportés par les participants MOE/MOEX.',
    iaRemplacePro: COMMON_IA_NON,
    deroulement: `${MODALITE_PEDAGOGIQUE_CATALOGUE}. 70 % pratique sur cas réels MOE — distinct de la formation conducteur de travaux (côté entreprise).`,
    clusterMaillage: [
      ...CLUSTER_BASE,
      { href: LINKS.guideMaitriseOeuvreIa, label: 'Guide maîtrise d’œuvre × IA' },
      { href: LINKS.formationIaMaitriseOeuvre, label: 'Formation IA maîtrise d’œuvre' },
      { href: LINKS.iaCompteRenduChantier, label: 'Compte rendu de chantier avec l’IA' },
    ],
  },
  'NIV-06': {
    queApprendre:
      'Cadrer un besoin métier, utiliser le développement assisté par l’IA pour construire un prototype fonctionnel (suivi, CR, tableau documentaire) et tester en sécurisant les données.',
    documentsBtp: [
      'Exports situations de travaux',
      'Notes et CR chantier',
      'Tableaux DICT / PPSPS / attestations',
      'Données fournisseurs anonymisées',
    ],
    outilsIa: ['Développement assisté par l’IA', 'Environnement de développement IA'],
    dureeReponse: '',
    livrables: [
      'Prototype fonctionnel ou socle d’application métier',
      'Cahier des charges et méthode de cadrage',
      'Checklist de contrôle',
    ],
    debutants:
      'Aucune compétence en programmation pour le niveau 1. Une pratique courante de l’IA générative est recommandée.',
    propresDossiers:
      'Oui — jeu de données professionnelles anonymisées recommandé pour l’atelier de construction.',
    iaRemplacePro:
      'Non. Le développement assisté par l’IA aide à produire un prototype ; architecture, sécurité et maintenance peuvent nécessiter un développeur ou un DSI.',
    deroulement: `${MODALITE_PEDAGOGIQUE_CATALOGUE}. 70 % pratique sur le poste du participant — session 7 h (niveau 1 du parcours applications métier).`,
    clusterMaillage: [
      ...CLUSTER_BASE,
      { href: LINKS.parcoursApplicationsMetierBtp, label: 'Parcours applications métier BTP avec l’IA' },
      { href: LINKS.formationApplicationMetierBtpNiveau2, label: 'Application métier BTP connectée — niveau 2' },
      { href: LINKS.formationMaitriserClaudeAiBtp, label: 'Maîtriser Claude pour le BTP' },
      { href: LINKS.formationIaBtpNiveau1BatimentTp, label: 'Découvrir l’IA générative dans le BTP' },
    ],
  },
  'NIV-07': {
    queApprendre:
      'Structurer une base de données, gérer utilisateurs et rôles, connecter des API, automatiser des workflows métier BTP et produire des documents (devis, CR, PDF).',
    documentsBtp: [
      'Modèles de devis et fiches chantier',
      'Exports tableaux de suivi',
      'Templates CR et rapports',
      'Données clients / affaires anonymisées',
    ],
    outilsIa: ['Développement assisté par l’IA', 'API et services externes', 'Base de données'],
    dureeReponse: '',
    livrables: [
      'Application connectée avec stockage de données',
      'Authentification et gestion des rôles',
      'Automatisations et génération documentaire',
    ],
    debutants:
      'Non — avoir suivi le niveau 1 ou maîtriser des compétences équivalentes (prototype, cahier des charges, interface).',
    propresDossiers:
      'Oui — prototype ou socle existant recommandé ; données anonymisées pour les tests de connexion et d’automatisation.',
    iaRemplacePro:
      'Non. L’objectif est une application connectée fonctionnelle ; la sécurité avancée et la mise en production peuvent nécessiter un développeur ou un DSI.',
    deroulement: `${MODALITE_PEDAGOGIQUE_CATALOGUE}. 70 % pratique — session 7 h (niveau 2 du parcours applications métier).`,
    clusterMaillage: [
      ...CLUSTER_BASE,
      { href: LINKS.parcoursApplicationsMetierBtp, label: 'Parcours applications métier BTP avec l’IA' },
      { href: LINKS.formationApplicationMetierBtpNiveau1, label: 'Créer sa première application métier BTP' },
      { href: LINKS.formationApplicationMetierBtpNiveau3, label: 'Application métier BTP avancée — niveau 3' },
    ],
  },
  'NIV-08': {
    queApprendre:
      'Intégrer l’IA dans une application métier : analyse documentaire, workflows IA, automatisation de processus BTP, sécurité des données et déploiement.',
    documentsBtp: [
      'DCE et pièces marché',
      'Bibliothèque entreprise',
      'Documents chantier et administratifs',
      'Modèles mémoire technique et CR',
    ],
    outilsIa: ['Intelligence artificielle intégrée', 'Analyse documentaire', 'Workflows IA', 'Automatisations'],
    dureeReponse: '',
    livrables: [
      'Fonctions IA intégrées (analyse, extraction, génération)',
      'Workflow document → analyse → validation humaine',
      'Plan de déploiement et maintenance',
    ],
    debutants:
      'Non — autonomie sur une application simple et compétences niveau 2 (données, utilisateurs, API) ou expérience équivalente.',
    propresDossiers:
      'Oui — documents métier anonymisés pour tester l’analyse documentaire et les workflows IA.',
    iaRemplacePro:
      'Non. La validation finale des documents et décisions métier reste sous la responsabilité de l’utilisateur — l’IA assiste, ne remplace pas le métier.',
    deroulement: `${MODALITE_PEDAGOGIQUE_CATALOGUE}. 70 % pratique — session 7 h (niveau 3 du parcours applications métier).`,
    clusterMaillage: [
      ...CLUSTER_BASE,
      { href: LINKS.parcoursApplicationsMetierBtp, label: 'Parcours applications métier BTP avec l’IA' },
      { href: LINKS.formationApplicationMetierBtpNiveau2, label: 'Application métier BTP connectée — niveau 2' },
      { href: LINKS.formationMaitriserClaudeAiBtp, label: 'Maîtriser Claude pour le BTP' },
    ],
  },
};

/** Injecte la durée depuis `data/formations.ts`. */
export function getFormationCatalogueGeoExtended(
  ref: FormationCatalogueCode,
): FormationCatalogueGeoExtended {
  const base = FORMATION_CATALOGUE_GEO_EXTENDED[ref];
  const formation = getFormationByCode(ref)!;
  const entry = getFormationCatalogueByRef(ref);
  const duree = libelleDureeFormation(formation);
  const effectif = entry?.effectif ?? '';
  return {
    ...base,
    dureeReponse: `${duree} en présentiel intra-entreprise (${effectif}). Tarif au forfait session — financement OPCO selon éligibilité.`,
  };
}
