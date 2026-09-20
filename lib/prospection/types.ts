import type { EmailType, ProspectionStatut, TypeStructure } from './constants';

export type ProspectRow = {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string | null;
  entreprise: string | null;
  fonction: string | null;
  linkedin_url: string | null;
  site_web: string | null;
  ville: string | null;
  departement: string | null;
  region: string | null;
  type_structure: TypeStructure | string | null;
  taille_entreprise: string | null;
  corps_metier: string | null;
  effectif_approx: string | null;
  besoins_identifies: string[] | null;
  formations_interessees: string[] | null;
  source_prospect: string | null;
  source_metadata: Record<string, unknown> | null;
  tags: string[] | null;
  prospect_type: string | null;
  department_name: string | null;
  relance_motif: string | null;
  next_action: string | null;
  next_action_type: string | null;
  next_action_at: string | null;
  notes_crm: string | null;
  statut: ProspectionStatut | string | null;
  dernier_contact_at: string | null;
  prochaine_relance_at: string | null;
  company_id: string | null;
  date_creation: string;
  date_modification: string | null;
  updated_at: string | null;
};

export type ProspectingEmailRow = {
  id: string;
  prospect_id: string;
  subject: string;
  body: string;
  email_type: EmailType | string;
  status: string;
  campaign_id: string | null;
  sent_at: string | null;
  response_text: string | null;
  response_at: string | null;
  created_at: string;
};

export type ProspectingActionRow = {
  id: string;
  prospect_id: string;
  action_type: string;
  title: string;
  details: string | null;
  due_at: string | null;
  completed_at: string | null;
  email_id: string | null;
  created_at: string;
};

export type ProspectingTemplateRow = {
  id: string;
  name: string;
  target_type: string | null;
  email_type: string;
  subject_template: string;
  body_template: string;
  created_at: string;
  updated_at: string;
};

export type ProspectFilters = {
  q?: string;
  statut?: string;
  typeStructure?: string;
  /** Groupe BTP / FFB / CCI… */
  typeGroup?: string;
  departement?: string;
  relance?: 'aujourdhui' | 'retard' | 'semaine' | 'plus_tard' | 'demain';
  sansAction?: boolean;
  sansContact?: boolean;
  page?: number;
  pageSize?: number;
};
