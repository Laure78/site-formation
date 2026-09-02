/**
 * Configuration centralisée — diagnostic IA BTP
 * Questions, tâches, coefficients, correspondances formations.
 */
import { LINKS } from '@/lib/internal-links';
import type {
  DiagnosticConstructysId,
  DiagnosticDataUsageId,
  DiagnosticFrequencyId,
  DiagnosticMaturityId,
  DiagnosticOrganisationId,
  DiagnosticRoleId,
  DiagnosticTaskId,
  DiagnosticTimeWeeklyId,
} from '@/lib/diagnostic-ia-btp/types';

export const DIAGNOSTIC_MANDATORY_STEPS = 7;
export const DIAGNOSTIC_TOTAL_STEPS = 9;
export const MAX_TASK_SELECTIONS = 3;

export const DIAGNOSTIC_ROLES: readonly {
  id: DiagnosticRoleId;
  label: string;
}[] = [
  { id: 'dirigeant', label: 'Dirigeant / gérant' },
  { id: 'artisan_tpe', label: 'Artisan / TPE' },
  { id: 'charge_affaires', label: "Chargé d'affaires" },
  { id: 'etudes_prix', label: 'Études de prix / bureau d\'études' },
  { id: 'conducteur_travaux', label: 'Conducteur de travaux' },
  { id: 'chef_chantier', label: 'Chef de chantier' },
  { id: 'assistant_travaux', label: 'Assistant(e) travaux' },
  { id: 'assistant_admin', label: 'Assistant(e) administratif(ve)' },
  { id: 'moe_moex_opc', label: 'MOE / MOEX / OPC' },
  { id: 'resp_commercial', label: 'Responsable commercial' },
  { id: 'resp_admin_fin', label: 'Responsable administratif / financier' },
  { id: 'referent_ia', label: 'Référent IA / digital' },
  { id: 'autre', label: 'Autre' },
];

export const DIAGNOSTIC_TASK_CATEGORIES: readonly {
  id: string;
  label: string;
  tasks: readonly { id: DiagnosticTaskId; label: string }[];
}[] = [
  {
    id: 'devis',
    label: 'Devis et chiffrage',
    tasks: [
      { id: 'devis_preparer', label: 'Préparer les devis' },
      { id: 'devis_designations', label: 'Rédiger les désignations d\'ouvrages' },
      { id: 'devis_quantitatifs', label: 'Préparer les quantitatifs' },
      { id: 'devis_variantes', label: 'Comparer des variantes' },
      { id: 'devis_prix', label: 'Analyser les prix' },
    ],
  },
  {
    id: 'ao',
    label: 'Appels d\'offres',
    tasks: [
      { id: 'ao_rc', label: 'Lire un RC' },
      { id: 'ao_cctp', label: 'Analyser un CCTP' },
      { id: 'ao_ccap', label: 'Analyser un CCAP' },
      { id: 'ao_dpgf', label: 'Analyser une DPGF' },
      { id: 'ao_comparer_dce', label: 'Comparer les pièces du DCE' },
      { id: 'ao_contraintes', label: 'Vérifier les contraintes du marché' },
      { id: 'ao_go_nogo', label: 'Préparer un Go / No Go' },
      { id: 'ao_memoire_technique', label: 'Rédiger un mémoire technique' },
    ],
  },
  {
    id: 'chantier',
    label: 'Chantier',
    tasks: [
      { id: 'chantier_cr', label: 'Préparer les comptes rendus' },
      { id: 'chantier_reunions', label: 'Préparer les réunions chantier' },
      { id: 'chantier_cctp', label: 'Analyser un CCTP chantier' },
      { id: 'chantier_ppsps', label: 'Préparer un PPSPS' },
      { id: 'chantier_planning', label: 'Préparer les plannings' },
      { id: 'chantier_reserves', label: 'Suivre les réserves' },
      { id: 'chantier_doe', label: 'Préparer les DOE' },
      { id: 'chantier_courriers', label: 'Préparer les courriers chantier' },
      { id: 'chantier_avenants', label: 'Gérer les avenants' },
      { id: 'chantier_situations', label: 'Gérer les situations de travaux' },
    ],
  },
  {
    id: 'admin',
    label: 'Administratif',
    tasks: [
      { id: 'admin_emails', label: 'Rédiger des emails' },
      { id: 'admin_courriers', label: 'Rédiger des courriers' },
      { id: 'admin_classement', label: 'Classer des documents' },
      { id: 'admin_cr', label: 'Faire des comptes rendus' },
      { id: 'admin_excel', label: 'Préparer des tableaux Excel' },
      { id: 'admin_recherche', label: 'Rechercher des informations dans des documents' },
    ],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    tasks: [
      { id: 'com_prospecter', label: 'Prospecter' },
      { id: 'com_emails', label: 'Préparer des emails commerciaux' },
      { id: 'com_relance_prospects', label: 'Relancer les prospects' },
      { id: 'com_relance_devis', label: 'Relancer les devis' },
      { id: 'com_linkedin', label: 'Préparer des publications LinkedIn' },
      { id: 'com_site_web', label: 'Préparer des contenus pour le site web' },
    ],
  },
  {
    id: 'gestion',
    label: 'Gestion',
    tasks: [
      { id: 'gest_tresorerie', label: 'Suivre la trésorerie' },
      { id: 'gest_marges', label: 'Analyser les marges' },
      { id: 'gest_tableaux_bord', label: 'Préparer des tableaux de bord' },
      { id: 'gest_consolidation', label: 'Consolider des données' },
      { id: 'gest_reporting', label: 'Préparer des reportings' },
    ],
  },
  {
    id: 'rh',
    label: 'RH',
    tasks: [
      { id: 'rh_fiches_poste', label: 'Rédiger des fiches de poste' },
      { id: 'rh_procedures', label: 'Préparer des procédures' },
      { id: 'rh_documents', label: 'Préparer des documents RH' },
      { id: 'rh_candidatures', label: 'Analyser des candidatures' },
    ],
  },
];

/** Potentiel IA indicatif par tâche (0–1) — estimation interne, jamais promesse contractuelle. */
export const TASK_POTENTIAL: Record<DiagnosticTaskId, number> = {
  ao_rc: 0.7,
  ao_cctp: 0.65,
  ao_ccap: 0.65,
  ao_dpgf: 0.5,
  ao_comparer_dce: 0.7,
  ao_contraintes: 0.6,
  ao_go_nogo: 0.65,
  ao_memoire_technique: 0.65,
  chantier_cr: 0.7,
  chantier_reunions: 0.55,
  chantier_cctp: 0.65,
  chantier_ppsps: 0.45,
  chantier_planning: 0.4,
  chantier_reserves: 0.55,
  chantier_doe: 0.45,
  chantier_courriers: 0.65,
  chantier_avenants: 0.5,
  chantier_situations: 0.5,
  devis_preparer: 0.55,
  devis_designations: 0.6,
  devis_quantitatifs: 0.55,
  devis_variantes: 0.5,
  devis_prix: 0.5,
  admin_emails: 0.6,
  admin_courriers: 0.65,
  admin_classement: 0.45,
  admin_cr: 0.65,
  admin_excel: 0.5,
  admin_recherche: 0.55,
  com_prospecter: 0.55,
  com_emails: 0.6,
  com_relance_prospects: 0.6,
  com_relance_devis: 0.6,
  com_linkedin: 0.5,
  com_site_web: 0.5,
  gest_tresorerie: 0.45,
  gest_marges: 0.5,
  gest_tableaux_bord: 0.55,
  gest_consolidation: 0.5,
  gest_reporting: 0.55,
  rh_fiches_poste: 0.5,
  rh_procedures: 0.45,
  rh_documents: 0.5,
  rh_candidatures: 0.55,
};

/** Tâches mises en avant selon le métier (tri d'affichage, pas de restriction). */
export const ROLE_TASK_PRIORITY: Record<DiagnosticRoleId, DiagnosticTaskId[]> = {
  dirigeant: [
    'devis_preparer', 'gest_tresorerie', 'admin_emails', 'com_relance_devis', 'gest_marges', 'rh_candidatures',
  ],
  artisan_tpe: [
    'devis_preparer', 'devis_designations', 'admin_emails', 'com_relance_devis', 'com_prospecter',
  ],
  charge_affaires: [
    'ao_rc', 'ao_cctp', 'ao_dpgf', 'ao_memoire_technique', 'ao_go_nogo', 'devis_preparer',
  ],
  etudes_prix: [
    'ao_comparer_dce', 'ao_cctp', 'ao_dpgf', 'devis_quantitatifs', 'devis_variantes', 'devis_prix',
  ],
  conducteur_travaux: [
    'chantier_cctp', 'chantier_cr', 'chantier_ppsps', 'chantier_planning', 'chantier_situations',
    'chantier_reserves', 'chantier_doe', 'chantier_courriers',
  ],
  chef_chantier: [
    'chantier_cr', 'chantier_ppsps', 'chantier_reserves', 'chantier_reunions', 'chantier_courriers',
  ],
  assistant_travaux: [
    'chantier_cr', 'chantier_doe', 'chantier_reserves', 'chantier_courriers', 'chantier_situations', 'admin_classement',
  ],
  assistant_admin: [
    'admin_emails', 'admin_courriers', 'admin_classement', 'admin_excel', 'com_relance_devis',
  ],
  moe_moex_opc: [
    'chantier_cr', 'chantier_planning', 'chantier_reserves', 'ao_cctp', 'ao_comparer_dce', 'admin_recherche',
  ],
  resp_commercial: [
    'com_prospecter', 'com_emails', 'com_relance_prospects', 'com_relance_devis', 'com_linkedin',
  ],
  resp_admin_fin: [
    'gest_tresorerie', 'gest_marges', 'gest_reporting', 'admin_excel', 'gest_consolidation',
  ],
  referent_ia: [
    'admin_excel', 'gest_tableaux_bord', 'admin_recherche', 'gest_consolidation',
  ],
  autre: [],
};

export const TIME_WEEKLY_OPTIONS: readonly {
  id: DiagnosticTimeWeeklyId;
  label: string;
  hours: number;
}[] = [
  { id: 'moins_2h', label: 'Moins de 2 h', hours: 1 },
  { id: '2_5h', label: '2 à 5 h', hours: 3.5 },
  { id: '5_10h', label: '5 à 10 h', hours: 7.5 },
  { id: '10_20h', label: '10 à 20 h', hours: 15 },
  { id: 'plus_20h', label: 'Plus de 20 h', hours: 25 },
];

export const FREQUENCY_OPTIONS: readonly {
  id: DiagnosticFrequencyId;
  label: string;
  multiplier: number;
}[] = [
  { id: 'plusieurs_jour', label: 'Plusieurs fois par jour', multiplier: 1.3 },
  { id: 'tous_jours', label: 'Tous les jours', multiplier: 1.2 },
  { id: 'plusieurs_semaine', label: 'Plusieurs fois par semaine', multiplier: 1.0 },
  { id: 'chaque_semaine', label: 'Chaque semaine', multiplier: 0.9 },
  { id: 'quelques_mois', label: 'Quelques fois par mois', multiplier: 0.6 },
];

export const MATURITY_OPTIONS: readonly {
  id: DiagnosticMaturityId;
  label: string;
  score: number;
}[] = [
  { id: '0', label: 'Je n\'utilise pas encore l\'IA', score: 5 },
  { id: '1', label: 'J\'ai déjà testé ChatGPT, Claude ou Gemini', score: 15 },
  { id: '2', label: 'J\'utilise l\'IA occasionnellement', score: 30 },
  { id: '3', label: 'J\'utilise l\'IA chaque semaine', score: 45 },
  { id: '4', label: 'J\'ai des prompts ou modèles réutilisables', score: 60 },
  { id: '5', label: 'Nous utilisons des assistants IA ou espaces de travail spécialisés', score: 75 },
  { id: '6', label: 'Nous automatisons déjà certains processus', score: 90 },
  { id: '7', label: 'Nous voulons créer nos propres applications métier', score: 100 },
];

export const ORGANISATION_OPTIONS: readonly {
  id: DiagnosticOrganisationId;
  label: string;
  score: number;
}[] = [
  { id: 'papier', label: 'Principalement papier', score: 10 },
  { id: 'emails_locaux', label: 'Emails + dossiers locaux', score: 25 },
  { id: 'bureautique', label: 'Word / Excel / PDF structurés', score: 40 },
  { id: 'ged_cloud', label: 'Google Drive / SharePoint / GED', score: 55 },
  { id: 'erp', label: 'ERP ou logiciel métier', score: 70 },
  { id: 'erp_cloud', label: 'ERP + outils cloud', score: 85 },
  { id: 'erp_cloud_auto', label: 'ERP + outils cloud + automatisations', score: 100 },
];

export const DATA_USAGE_OPTIONS: readonly {
  id: DiagnosticDataUsageId;
  label: string;
  securityScore: number;
  needsSecurityAdvice: boolean;
}[] = [
  { id: 'non', label: 'Non', securityScore: 85, needsSecurityAdvice: false },
  { id: 'public', label: 'Oui, uniquement avec des contenus publics', securityScore: 80, needsSecurityAdvice: false },
  { id: 'interne', label: 'Oui, avec des documents internes non sensibles', securityScore: 60, needsSecurityAdvice: false },
  { id: 'devis_clients', label: 'Oui, avec des devis ou documents clients', securityScore: 45, needsSecurityAdvice: true },
  { id: 'dce_contractuel', label: 'Oui, avec des DCE ou documents contractuels', securityScore: 35, needsSecurityAdvice: true },
  { id: 'rh_confidentiel', label: 'Oui, avec des données RH ou confidentielles', securityScore: 25, needsSecurityAdvice: true },
];

export const COMPANY_SIZE_OPTIONS: readonly {
  id: import('@/lib/diagnostic-ia-btp/types').DiagnosticCompanySizeId;
  label: string;
}[] = [
  { id: 'independant', label: 'Indépendant' },
  { id: '1_10', label: '1 à 10' },
  { id: '11_49', label: '11 à 49' },
  { id: '50_299', label: '50 à 299' },
  { id: '300_plus', label: '300 et plus' },
];

export const CONSTRUCTYS_OPTIONS: readonly {
  id: DiagnosticConstructysId;
  label: string;
}[] = [
  { id: 'oui', label: 'Oui' },
  { id: 'non', label: 'Non' },
  { id: 'inconnu', label: 'Je ne sais pas' },
];

export const CONSTRUCTYS_FINANCEMENT_NOTE =
  'Une prise en charge partielle peut être possible selon votre entreprise, le dispositif mobilisé et les conditions de financement en vigueur. Validation nécessaire avant inscription.';

export const SECURITY_RECOMMENDATION_TEXT =
  'Vous utilisez déjà l\'IA avec des documents métier. Avant d\'automatiser davantage, définissez des règles de confidentialité, de validation humaine et de gestion des données.';

export const TIME_GAIN_DISCLAIMER =
  'Estimation indicative calculée à partir du temps déclaré et du potentiel d\'assistance IA des tâches sélectionnées. Le gain réel dépend de vos processus, de vos outils et du niveau d\'adoption.';

/** Coefficient de prudence — jamais 100 % d'automatisation. */
export const GAIN_PRUDENCE_COEFFICIENT = 0.4;

/** Clusters de priorités pour regrouper les tâches sélectionnées. */
export const PRIORITY_CLUSTERS: readonly {
  id: string;
  title: string;
  subtitle: string;
  taskIds: readonly DiagnosticTaskId[];
  baseWeight: number;
}[] = [
  {
    id: 'dce',
    title: 'Analyser vos DCE',
    subtitle: 'RC · CCTP · CCAP · DPGF · comparaison des pièces',
    taskIds: ['ao_rc', 'ao_cctp', 'ao_ccap', 'ao_dpgf', 'ao_comparer_dce', 'ao_contraintes', 'ao_go_nogo'],
    baseWeight: 1.15,
  },
  {
    id: 'memoire',
    title: 'Structurer vos mémoires techniques',
    subtitle: 'Appels d\'offres · critères RC · sections clés',
    taskIds: ['ao_memoire_technique'],
    baseWeight: 1.1,
  },
  {
    id: 'cr_chantier',
    title: 'Produire vos comptes rendus chantier',
    subtitle: 'CR · réunions · suivi d\'actions',
    taskIds: ['chantier_cr', 'chantier_reunions', 'admin_cr'],
    baseWeight: 1.1,
  },
  {
    id: 'courriers_relances',
    title: 'Automatiser vos relances et courriers',
    subtitle: 'Emails · courriers · relances clients',
    taskIds: ['admin_emails', 'admin_courriers', 'chantier_courriers', 'com_relance_devis', 'com_relance_prospects', 'com_emails'],
    baseWeight: 1.0,
  },
  {
    id: 'devis_chiffrage',
    title: 'Accélérer devis et chiffrage',
    subtitle: 'Devis · quantitatifs · désignations · variantes',
    taskIds: ['devis_preparer', 'devis_designations', 'devis_quantitatifs', 'devis_variantes', 'devis_prix'],
    baseWeight: 1.05,
  },
  {
    id: 'pilotage_chantier',
    title: 'Piloter le chantier au quotidien',
    subtitle: 'PPSPS · planning · réserves · DOE · situations',
    taskIds: ['chantier_ppsps', 'chantier_planning', 'chantier_reserves', 'chantier_doe', 'chantier_situations', 'chantier_avenants', 'chantier_cctp'],
    baseWeight: 1.0,
  },
  {
    id: 'gestion_pilotage',
    title: 'Structurer gestion et pilotage',
    subtitle: 'Tableaux de bord · reporting · marges · trésorerie',
    taskIds: ['gest_tresorerie', 'gest_marges', 'gest_tableaux_bord', 'gest_consolidation', 'gest_reporting', 'admin_excel'],
    baseWeight: 0.95,
  },
  {
    id: 'commercial',
    title: 'Développer votre activité commerciale',
    subtitle: 'Prospection · LinkedIn · contenus · relances',
    taskIds: ['com_prospecter', 'com_linkedin', 'com_site_web'],
    baseWeight: 0.9,
  },
  {
    id: 'documentaire',
    title: 'Organiser votre documentaire',
    subtitle: 'Classement · recherche · consolidation',
    taskIds: ['admin_classement', 'admin_recherche'],
    baseWeight: 0.85,
  },
];

export type TrainingMappingKey =
  | 'fondamentaux'
  | 'appels_offres'
  | 'conduite_travaux'
  | 'maitrise_oeuvre'
  | 'claude_avance'
  | 'app_metier_1'
  | 'app_metier_2'
  | 'app_metier_3';

export const TRAINING_MAPPINGS: Record<
  TrainingMappingKey,
  { href: string; title: string; code?: string }
> = {
  fondamentaux: {
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    title: 'Formation IA BTP : devis, emails et productivité',
    code: 'NIV-01',
  },
  appels_offres: {
    href: LINKS.formationAO,
    title: "Formation IA appels d'offres BTP : DCE, chiffrage et mémoire technique",
    code: 'NIV-02',
  },
  conduite_travaux: {
    href: LINKS.formationConduiteTravauxSuiviChantier,
    title: 'Formation IA conducteur de travaux : suivi chantier, CR et DOE',
    code: 'NIV-03',
  },
  claude_avance: {
    href: LINKS.formationMaitriserClaudeAiBtp,
    title: 'Maîtriser Claude pour le BTP : Projects, Cowork et Skills',
    code: 'NIV-04',
  },
  maitrise_oeuvre: {
    href: LINKS.formationIaMaitriseOeuvre,
    title: "Formation IA maîtrise d'œuvre : CR, OS et réception chantier",
    code: 'NIV-05',
  },
  app_metier_1: {
    href: LINKS.formationApplicationMetierBtpNiveau1,
    title: 'Créer sa première application métier BTP avec l\'IA',
    code: 'NIV-06',
  },
  app_metier_2: {
    href: LINKS.formationApplicationMetierBtpNiveau2,
    title: 'Développer une application métier BTP connectée',
    code: 'NIV-07',
  },
  app_metier_3: {
    href: LINKS.formationApplicationMetierBtpNiveau3,
    title: 'Développer une application métier BTP avancée avec l\'IA',
    code: 'NIV-08',
  },
};

export const GLOBAL_PRIORITY_THRESHOLDS = {
  tres_elevee: 75,
  elevee: 55,
  moderee: 35,
} as const;

export function getTaskLabel(taskId: DiagnosticTaskId): string {
  for (const cat of DIAGNOSTIC_TASK_CATEGORIES) {
    const task = cat.tasks.find((t) => t.id === taskId);
    if (task) return task.label;
  }
  return taskId;
}

export function getRoleLabel(roleId: DiagnosticRoleId): string {
  return DIAGNOSTIC_ROLES.find((r) => r.id === roleId)?.label ?? roleId;
}

export function sortCategoriesForRole(roleId: DiagnosticRoleId | undefined) {
  const priority = roleId ? ROLE_TASK_PRIORITY[roleId] ?? [] : [];
  const prioritySet = new Set(priority);

  return [...DIAGNOSTIC_TASK_CATEGORIES].sort((a, b) => {
    const aScore = a.tasks.reduce((s, t) => s + (prioritySet.has(t.id) ? 1 : 0), 0);
    const bScore = b.tasks.reduce((s, t) => s + (prioritySet.has(t.id) ? 1 : 0), 0);
    return bScore - aScore;
  });
}

export function sortTasksInCategory(
  category: (typeof DIAGNOSTIC_TASK_CATEGORIES)[number],
  roleId: DiagnosticRoleId | undefined,
) {
  const priority = roleId ? ROLE_TASK_PRIORITY[roleId] ?? [] : [];
  const order = new Map(priority.map((id, i) => [id, i]));
  return [...category.tasks].sort((a, b) => {
    const ai = order.get(a.id) ?? 999;
    const bi = order.get(b.id) ?? 999;
    return ai - bi;
  });
}
