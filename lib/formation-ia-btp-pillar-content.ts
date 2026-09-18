import { LINKS } from '@/lib/internal-links';
import { FORMATION_IA_BTP_DEPT_LANDING_PATHS } from '@/lib/formation-ia-btp-departements-config';

/** Canonique pilier SEO « formation IA BTP » / « formation IA bâtiment ». */
export const FORMATION_IA_BTP_PILLAR_PATH = '/formation-ia-btp' as const;

export const FORMATION_IA_BTP_PILLAR_TITLE =
  'Formation IA BTP : IA appliquée au bâtiment | Laure Olivié';

export const FORMATION_IA_BTP_PILLAR_DESCRIPTION =
  'Formation IA pour le BTP et le bâtiment : devis, DCE, CCTP, appels d\'offres et chantier. Laure Olivié, Qualiopi, présentiel Île-de-France. Financement OPCO possible selon éligibilité.';

export const FORMATION_IA_BTP_PILLAR_H1 =
  'Formation IA BTP : maîtriser l\'intelligence artificielle dans le bâtiment';

export const FORMATION_IA_BTP_EN_BREF =
  'Laure Olivié, formatrice IA spécialisée BTP, dispense via OFC Création d\'Entreprise des formations professionnelles en présentiel (Île-de-France) pour dirigeants, conducteurs de travaux et équipes du bâtiment : Claude AI et ChatGPT sur vos devis, DCE, CCTP, mémoires techniques et comptes rendus de chantier — avec relecture humaine et validation terrain.';

export const FORMATION_IA_BTP_DEFINITION =
  'Une formation IA BTP est une session professionnelle de 4 heures en présentiel, certifiée Qualiopi, où les équipes du bâtiment et des travaux publics apprennent à utiliser Claude AI (outil principal) et ChatGPT (usages administratifs et comparaison) sur leurs documents réels : devis, DCE, CCTP, comptes rendus de chantier et courriers. L\'objectif est un gain de temps mesurable sur l\'administratif, avec relecture humaine et validation terrain — jamais une promesse de financement garanti.';

/** Formation IA bâtiment — même périmètre métier, vocabulaire entreprises du bâtiment. */
export const FORMATION_IA_BATIMENT_DEFINITION =
  'Une formation IA bâtiment s\'adresse aux TPE, PME, artisans et équipes de second œuvre ou gros œuvre qui veulent utiliser l\'intelligence artificielle sur leurs processus documentaires (devis, CR, courriers, AO privés ou publics) sans formation généraliste « marketing » ou développement. Les sessions OFC sont calibrées sur le vocabulaire chantier, les lots, les CCTP et la responsabilité technique du bâtiment.';

export type FormationIaBtpCasUsage = {
  question: string;
  reponse: string;
  exemple?: string;
  href?: string;
  hrefLabel?: string;
};

/** Blocs extractibles — réponses directes aux questions métier (GEO). */
export const FORMATION_IA_BTP_CAS_USAGE: readonly FormationIaBtpCasUsage[] = [
  {
    question: 'Comment utiliser l\'intelligence artificielle dans une entreprise du bâtiment ?',
    reponse:
      'On part de vos documents existants (modèles de devis, emails types, derniers CR, extrait de CCTP) : l\'IA structure, reformule et propose des brouillons ; vos équipes chiffrent, signent et décident. En formation, vous construisez des prompts et assistants réutilisables par métier (conducteur de travaux, chargé d\'affaires, assistante).',
    exemple:
      'Exemple BTP : à partir de notes de réunion chantier, générer un CR structuré avec réserves et planning de levée — puis validation par le conducteur avant envoi MOE.',
  },
  {
    question: 'Comment utiliser l\'IA pour analyser un DCE ou un CCTP ?',
    reponse:
      'L\'IA extrait les exigences par lot, signale les clauses sensibles (pénalités, délais, variantes interdites) et prépare une check-list de conformité pour le mémoire technique. Elle ne remplace pas la lecture contractuelle finale ni le chiffrage.',
    href: LINKS.iaAnalyseDce,
    hrefLabel: 'Guide — analyser un DCE avec l\'IA',
  },
  {
    question: 'Comment utiliser l\'IA pour les appels d\'offres BTP ?',
    reponse:
      'Workflow type : synthèse DCE → plan de mémoire technique → rédaction des parties répétitives (moyens humains, QSE, références) → relecture et personnalisation par lot. La formation NIV-02 approfondit DCE, CCAP et mémoire technique sur dossier fil rouge.',
    href: LINKS.formationIaAppelsOffresBtp,
    hrefLabel: 'Formation IA appels d\'offres BTP',
  },
  {
    question: 'Comment utiliser ChatGPT ou Claude dans le BTP ?',
    reponse:
      'ChatGPT convient bien aux emails, devis courts et formats administratifs ; Claude AI est privilégié pour les longs PDF (CCTP, DCE) et les projets avec contexte entreprise. Les deux exigent des consignes de confidentialité (pas de données personnelles ni de secrets d\'affaires non anonymisés).',
    href: LINKS.claudeAiBtp,
    hrefLabel: 'Guide Claude AI pour le BTP',
  },
  {
    question: 'Quelle différence entre une formation IA généraliste et une formation IA spécialisée BTP ?',
    reponse:
      'Une formation généraliste traite l\'IA en abstract (productivité bureau, marketing). Une formation IA spécialisée BTP travaille sur DPGF, lots, sous-traitance, PPSPS, DOE, marchés publics et cas réels de chantier — avec un formateur qui connaît la conduite de travaux et les AO.',
  },
  {
    question: 'Quelle formation IA pour un conducteur de travaux ?',
    reponse:
      'Priorité : comptes rendus, réserves, emails MOE/MOA, synthèse CCTP chantier, préparation réunions de coordination. Le parcours NIV-01 pose les bases ; NIV-03 approfondit la conduite de travaux ; la page métier regroupe les cas d\'usage terrain.',
    href: LINKS.formationIaConducteurDeTravaux,
    hrefLabel: 'Formation IA conducteur de travaux',
  },
] as const;

export const FORMATION_IA_BTP_METIERS = [
  { href: LINKS.formationConducteurTravaux, label: 'Conducteur de travaux' },
  { href: LINKS.formationChargeAffairesBtp, label: "Chargé d'affaires" },
  { href: LINKS.formationIaDirigeantBtp, label: 'Dirigeant de PME BTP' },
  { href: LINKS.formationIaDirigeantPmeBtp, label: 'Chef de TPE du bâtiment' },
  { href: LINKS.formationIaAssistanteBtp, label: 'Assistant(e) administrative' },
  { href: LINKS.formationIaAssistanteGestionBtp, label: 'Assistant(e) de gestion' },
] as const;

const DEPT_LABELS: Record<string, string> = {
  '/formation-ia-btp-paris': 'Paris (75)',
  '/formation-ia-btp-seine-et-marne-77': 'Seine-et-Marne (77)',
  '/formation-ia-btp-yvelines-78': 'Yvelines (78)',
  '/formation-ia-btp-essonne-91': 'Essonne (91)',
  '/formation-ia-btp-hauts-de-seine-92': 'Hauts-de-Seine (92)',
  '/formation-ia-btp-seine-saint-denis-93': 'Seine-Saint-Denis (93)',
  '/formation-ia-btp-val-de-marne-94': 'Val-de-Marne (94)',
  '/formation-ia-btp-val-doise-95': 'Val-d\'Oise (95)',
};

export const FORMATION_IA_BTP_GEO_LINKS = [
  { href: LINKS.formationIleDeFrance, label: 'Formation IA BTP — Île-de-France (pilier géo)' },
  ...FORMATION_IA_BTP_DEPT_LANDING_PATHS.map((path) => ({
    href: path,
    label: DEPT_LABELS[path] ?? path,
  })),
];
