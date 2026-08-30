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
    dureeReponse: '',
    livrables: ['Modèles de prompts réutilisables', 'Premiers livrables sur vos documents', 'Checklist de validation humaine'],
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
      'Analyser un DCE complet, préparer le chiffrage assisté, structurer un mémoire technique et configurer des assistants IA réutilisables pour les appels d’offres.',
    documentsBtp: ['DCE (RC, CCTP, CCAP, DPGF, BPU)', 'Mémoires techniques', 'Devis et comparatifs', 'Checklists Go / No-Go'],
    outilsIa: ['Claude AI Pro', 'Claude Cowork'],
    dureeReponse: '',
    livrables: ['Grille d’analyse DCE', 'Structure de mémoire technique', 'Assistants IA appels d’offres configurés'],
    debutants:
      'Non en prérequis strict — bases IA ou niveau 1 recommandé. Abonnement Claude Pro requis pour Cowork.',
    propresDossiers:
      'Oui — chaque participant apporte un DCE complet récent et des mémoires techniques de son entreprise.',
    iaRemplacePro:
      'Non pour le chiffrage final ni les engagements contractuels. L’IA aide à structurer l’analyse ; le professionnel valide prix, quantités et conformité.',
    deroulement: `${MODALITE_PEDAGOGIQUE_CATALOGUE}. 75 % pratique sur DCE, devis et mémoires réels. Session en 4 modules + accueil et clôture.`,
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
      { href: LINKS.formationCursorBtp, label: 'Créer ses outils métier BTP avec Cursor' },
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
      'Cadrer un besoin métier, piloter Cursor (Plan, Agent), construire un premier outil interne (suivi, CR, tableau documentaire) et publier en sécurisant les données.',
    documentsBtp: [
      'Exports situations de travaux',
      'Notes et CR chantier',
      'Tableaux DICT / PPSPS / attestations',
      'Données fournisseurs anonymisées',
    ],
    outilsIa: ['Cursor', 'Git / GitHub'],
    dureeReponse: '',
    livrables: [
      'Environnement Cursor configuré',
      'Premier outil métier fonctionnel',
      'Checklist de contrôle et lexique web',
    ],
    debutants:
      'Non — prérequis IA : usage régulier d’un assistant IA ou formation d’initiation BTP. Compte Cursor et GitHub requis.',
    propresDossiers:
      'Oui — jeu de données professionnelles anonymisées recommandé pour l’atelier de construction.',
    iaRemplacePro:
      'Non. Cursor aide à produire un outil simple ; architecture, sécurité et maintenance peuvent nécessiter un développeur ou un DSI.',
    deroulement: `${MODALITE_PEDAGOGIQUE_CATALOGUE}. 70 % pratique sur le poste du participant — 4 modules (web, Cursor, atelier, publication).`,
    clusterMaillage: [
      ...CLUSTER_BASE,
      { href: LINKS.formationMaitriserClaudeAiBtp, label: 'Maîtriser Claude pour le BTP' },
      { href: LINKS.formationIaBtpNiveau1BatimentTp, label: 'Découvrir l’IA générative dans le BTP' },
      { href: LINKS.formationPmeBtp, label: 'Déployer l’IA dans une PME du BTP' },
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
