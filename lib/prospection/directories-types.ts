/** Constantes & helpers annuaires de sourcing. */

export const WORKFORCE_CATEGORIES = [
  { value: '1', label: '1 à 5', min: 1, max: 5 },
  { value: '2', label: '6 à 20', min: 6, max: 20 },
  { value: '3', label: '21 à 50', min: 21, max: 50 },
  { value: '4', label: '51 à 100', min: 51, max: 100 },
  { value: '5', label: '101 à 300', min: 101, max: 300 },
  { value: '6', label: 'Plus de 300', min: 301, max: null },
] as const;

export function workforceFromCategory(cat: string | null | undefined) {
  const found = WORKFORCE_CATEGORIES.find((c) => c.value === String(cat ?? '').trim());
  if (!found) return { min: null, max: null, label: null };
  return { min: found.min, max: found.max, label: found.label };
}

export const DIRECTORY_SPECIALTIES = [
  'Maçonnerie',
  'Gros œuvre',
  'Béton armé',
  'Ravalement',
  'Carrelage',
  'Plâtrerie',
  'Isolation',
  'Entreprise générale',
  'Autre',
] as const;

export const CHAMBER_KEYWORDS: { pattern: RegExp; specialty: string; chamber: string }[] = [
  { pattern: /\bCONSTRUCTION\b/i, specialty: 'Gros œuvre', chamber: 'Construction' },
  { pattern: /\bRAVALEMENT\b/i, specialty: 'Ravalement', chamber: 'Ravalement' },
  { pattern: /\bCARRELAGE\b/i, specialty: 'Carrelage', chamber: 'Carrelage' },
  { pattern: /\bPL[AÂ]TRE/i, specialty: 'Plâtrerie', chamber: 'Plâtre-Isolation' },
  { pattern: /\bISOLATION\b/i, specialty: 'Isolation', chamber: 'Plâtre-Isolation' },
  { pattern: /\bMA[CÇ]ONNERIE\b/i, specialty: 'Maçonnerie', chamber: 'Maçonnerie' },
  { pattern: /\bGÉNÉRALE\b/i, specialty: 'Entreprise générale', chamber: 'Entreprise générale' },
];

export type DirectoryRow = {
  id: string;
  name: string;
  organism: string | null;
  year: number | null;
  category: string | null;
  sector: string | null;
  geo_zone: string | null;
  directory_type: string | null;
  file_path: string;
  file_name: string;
  status: string;
  tags: string[] | null;
  description: string | null;
  page_count: number | null;
  companies_count: number;
  contacts_count: number;
  prospects_count: number;
  extracted_at: string | null;
  created_at: string;
};

export type DirectoryCompanyRow = {
  id: string;
  directory_id: string;
  company_name: string;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  departement: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  manager_name: string | null;
  manager_role: string | null;
  workforce_category: string | null;
  workforce_min: number | null;
  workforce_max: number | null;
  workforce_label: string | null;
  specialties: string[] | null;
  professional_chamber: string | null;
  quality_labels: string[] | null;
  qualibat_codes: string[] | null;
  tags: string[] | null;
  source_page: number | null;
  source_file: string | null;
  prospect_id: string | null;
  extracted_at: string;
};

export type ExtractedCompany = {
  company_name: string;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  departement: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  manager_name: string | null;
  manager_role: string | null;
  workforce_category: string | null;
  workforce_min: number | null;
  workforce_max: number | null;
  workforce_label: string | null;
  specialties: string[];
  professional_chamber: string | null;
  quality_labels: string[];
  qualibat_codes: string[];
  tags: string[];
  source_page: number | null;
  raw_block: string;
};
