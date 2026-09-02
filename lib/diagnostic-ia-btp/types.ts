/** Types — diagnostic IA BTP */

export type DiagnosticRoleId =
  | 'dirigeant'
  | 'artisan_tpe'
  | 'charge_affaires'
  | 'etudes_prix'
  | 'conducteur_travaux'
  | 'chef_chantier'
  | 'assistant_travaux'
  | 'assistant_admin'
  | 'moe_moex_opc'
  | 'resp_commercial'
  | 'resp_admin_fin'
  | 'referent_ia'
  | 'autre';

export type DiagnosticTaskId =
  | 'devis_preparer'
  | 'devis_designations'
  | 'devis_quantitatifs'
  | 'devis_variantes'
  | 'devis_prix'
  | 'ao_rc'
  | 'ao_cctp'
  | 'ao_ccap'
  | 'ao_dpgf'
  | 'ao_comparer_dce'
  | 'ao_contraintes'
  | 'ao_go_nogo'
  | 'ao_memoire_technique'
  | 'chantier_cr'
  | 'chantier_reunions'
  | 'chantier_cctp'
  | 'chantier_ppsps'
  | 'chantier_planning'
  | 'chantier_reserves'
  | 'chantier_doe'
  | 'chantier_courriers'
  | 'chantier_avenants'
  | 'chantier_situations'
  | 'admin_emails'
  | 'admin_courriers'
  | 'admin_classement'
  | 'admin_cr'
  | 'admin_excel'
  | 'admin_recherche'
  | 'com_prospecter'
  | 'com_emails'
  | 'com_relance_prospects'
  | 'com_relance_devis'
  | 'com_linkedin'
  | 'com_site_web'
  | 'gest_tresorerie'
  | 'gest_marges'
  | 'gest_tableaux_bord'
  | 'gest_consolidation'
  | 'gest_reporting'
  | 'rh_fiches_poste'
  | 'rh_procedures'
  | 'rh_documents'
  | 'rh_candidatures';

export type DiagnosticTimeWeeklyId =
  | 'moins_2h'
  | '2_5h'
  | '5_10h'
  | '10_20h'
  | 'plus_20h';

export type DiagnosticFrequencyId =
  | 'plusieurs_jour'
  | 'tous_jours'
  | 'plusieurs_semaine'
  | 'chaque_semaine'
  | 'quelques_mois';

export type DiagnosticMaturityId = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';

export type DiagnosticOrganisationId =
  | 'papier'
  | 'emails_locaux'
  | 'bureautique'
  | 'ged_cloud'
  | 'erp'
  | 'erp_cloud'
  | 'erp_cloud_auto';

export type DiagnosticDataUsageId =
  | 'non'
  | 'public'
  | 'interne'
  | 'devis_clients'
  | 'dce_contractuel'
  | 'rh_confidentiel';

export type DiagnosticCompanySizeId =
  | 'independant'
  | '1_10'
  | '11_49'
  | '50_299'
  | '300_plus';

export type DiagnosticConstructysId = 'oui' | 'non' | 'inconnu';

export type DiagnosticAnswers = {
  role?: DiagnosticRoleId;
  tasks?: DiagnosticTaskId[];
  timeWeekly?: DiagnosticTimeWeeklyId;
  frequency?: DiagnosticFrequencyId;
  maturity?: DiagnosticMaturityId;
  organisation?: DiagnosticOrganisationId;
  dataUsage?: DiagnosticDataUsageId;
  companySize?: DiagnosticCompanySizeId;
  constructys?: DiagnosticConstructysId;
};

export type ScoreLevel = 'debutant' | 'intermediaire' | 'avance' | 'expert';

export type GlobalPriorityLevel = 'faible' | 'moderee' | 'elevee' | 'tres_elevee';

export type PriorityPotentialLabel = 'moyen' | 'eleve' | 'tres_eleve';

export type DiagnosticPriority = {
  rank: number;
  title: string;
  subtitle: string;
  potential: PriorityPotentialLabel;
  why: string;
  taskIds: DiagnosticTaskId[];
};

export type DiagnosticTrainingRecommendation = {
  href: string;
  title: string;
  why: string;
  code?: string;
};

export type DiagnosticTimeGainEstimate = {
  weeklyMin: number;
  weeklyMax: number;
  annualMin: number;
  annualMax: number;
  disclaimer: string;
};

export type DiagnosticScores = {
  maturity: number;
  maturityLabel: ScoreLevel;
  gainPotential: number;
  organisation: number;
  organisationLabel: ScoreLevel;
  automation: number;
  security: number;
  securityLabel: string;
  globalPriority: GlobalPriorityLevel;
  globalPriorityLabel: string;
};

export type DiagnosticResult = {
  scores: DiagnosticScores;
  priorities: DiagnosticPriority[];
  timeGain: DiagnosticTimeGainEstimate;
  securityRecommendation: string | null;
  constructysNote: string | null;
  training: DiagnosticTrainingRecommendation;
};
