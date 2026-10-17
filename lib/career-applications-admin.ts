import { createClient } from '@/lib/supabase/server';
import {
  CONSULTANT_EXPERTISE_LABELS,
  SPONTANEOUS_TYPE_LABELS,
  type ConsultantExpertiseValue,
  type SpontaneousTypeValue,
} from '@/lib/career-form-validation';

export type CareerApplicationRow = {
  id: string;
  kind: 'consultant' | 'spontaneous';
  application_type: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  expertise_domain: string | null;
  desired_role: string | null;
  presentation: string;
  mobility_idf: string | null;
  formation_slugs: string | null;
  availability: string | null;
  linkedin_or_portfolio: string | null;
  cv_storage_path: string | null;
  cv_original_name: string | null;
  source_page: string;
  created_at: string;
};

export function formatCareerKindLabel(kind: CareerApplicationRow['kind']): string {
  return kind === 'consultant' ? 'Consultant-formateur' : 'Candidature spontanée';
}

export function formatCareerSubtype(row: CareerApplicationRow): string {
  if (row.kind === 'consultant' && row.expertise_domain) {
    const key = row.expertise_domain as ConsultantExpertiseValue;
    return CONSULTANT_EXPERTISE_LABELS[key] ?? row.expertise_domain;
  }
  if (row.kind === 'spontaneous' && row.application_type) {
    const key = row.application_type as SpontaneousTypeValue;
    return SPONTANEOUS_TYPE_LABELS[key] ?? row.application_type;
  }
  return '—';
}

export async function listCareerApplications(limit = 100): Promise<CareerApplicationRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('career_applications')
    .select(
      'id, kind, application_type, first_name, last_name, email, phone, expertise_domain, desired_role, presentation, mobility_idf, formation_slugs, availability, linkedin_or_portfolio, cv_storage_path, cv_original_name, source_page, created_at',
    )
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[listCareerApplications]', error.message);
    return [];
  }
  return (data ?? []) as CareerApplicationRow[];
}
