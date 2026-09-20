import type { SupabaseClient } from '@supabase/supabase-js';
import type { DirectoryCompanyRow, DirectoryRow } from './directories-types';

export async function listDirectories(
  supabase: SupabaseClient
): Promise<DirectoryRow[]> {
  const { data, error } = await supabase
    .from('prospecting_directories')
    .select('*')
    .order('year', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as DirectoryRow[];
}

export async function getDirectory(
  supabase: SupabaseClient,
  id: string
): Promise<DirectoryRow | null> {
  const { data, error } = await supabase
    .from('prospecting_directories')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as DirectoryRow | null;
}

export type DirectoryCompanyFilters = {
  q?: string;
  departement?: string;
  specialty?: string;
  workforce?: string;
  hasEmail?: boolean;
  hasPhone?: boolean;
  hasManager?: boolean;
  crmStatus?: 'none' | 'in_crm';
};

export async function listDirectoryCompanies(
  supabase: SupabaseClient,
  directoryId: string,
  filters: DirectoryCompanyFilters = {}
): Promise<DirectoryCompanyRow[]> {
  let query = supabase
    .from('prospecting_directory_companies')
    .select('*')
    .eq('directory_id', directoryId)
    .order('company_name', { ascending: true })
    .limit(2000);

  if (filters.departement) query = query.eq('departement', filters.departement);
  if (filters.workforce) query = query.eq('workforce_category', filters.workforce);
  if (filters.hasEmail) query = query.not('email', 'is', null);
  if (filters.hasPhone) query = query.not('phone', 'is', null);
  if (filters.hasManager) query = query.not('manager_name', 'is', null);
  if (filters.crmStatus === 'none') query = query.is('prospect_id', null);
  if (filters.crmStatus === 'in_crm') query = query.not('prospect_id', 'is', null);
  if (filters.specialty) {
    query = query.contains('specialties', [filters.specialty]);
  }

  const { data, error } = await query;
  if (error) throw error;

  let rows = (data ?? []) as DirectoryCompanyRow[];
  const q = filters.q?.trim().toLowerCase();
  if (q) {
    rows = rows.filter((r) =>
      [r.company_name, r.city, r.email, r.manager_name, r.phone]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }
  return rows;
}

export async function getDirectoryCompany(
  supabase: SupabaseClient,
  id: string
): Promise<DirectoryCompanyRow | null> {
  const { data, error } = await supabase
    .from('prospecting_directory_companies')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as DirectoryCompanyRow | null;
}

export function directoryStats(companies: DirectoryCompanyRow[]) {
  return {
    total: companies.length,
    withEmail: companies.filter((c) => c.email).length,
    withPhone: companies.filter((c) => c.phone).length,
    withManager: companies.filter((c) => c.manager_name).length,
    inCrm: companies.filter((c) => c.prospect_id).length,
  };
}
