/** Journée type entretiens (PDF planning 9–11 nov. 2026). */
export const RECRUITMENT_DEFAULT_PLANNING_DATE = '2026-11-09' as const;

export const RECRUITMENT_LEGAL_STATUS = {
  micro_entreprise: 'Micro-entreprise',
  societe: 'Société',
  autre: 'Autre',
} as const;

export type RecruitmentLegalStatus = keyof typeof RECRUITMENT_LEGAL_STATUS;

export const RECRUITMENT_SOURCES = {
  site: 'Site laureolivie.fr',
  malt: 'Malt',
  facebook: 'Facebook',
  indeed: 'Indeed',
  linkedin: 'LinkedIn',
  estp_alumni: 'ESTP Alumni',
} as const;

export type RecruitmentSource = keyof typeof RECRUITMENT_SOURCES;

export const RECRUITMENT_STATUS = {
  a_confirmer: 'À confirmer',
  confirme: 'Confirmé',
  retenu_etape_2: 'Retenu pour l’étape 2',
  retenu: 'Retenu',
  a_revoir: 'À revoir',
  non_retenu: 'Non retenu',
} as const;

export type RecruitmentStatus = keyof typeof RECRUITMENT_STATUS;

export const RECRUITMENT_MODALITY = {
  presentiel_paris: 'Présentiel — 61 rue de Lyon, 75012 Paris',
  visio_zoom: 'Visio Zoom',
} as const;

export type RecruitmentModality = keyof typeof RECRUITMENT_MODALITY;

/** Pastilles UI — vert / orange / rouge / gris uniquement. */
export function recruitmentStatusTone(
  status: RecruitmentStatus,
): 'green' | 'orange' | 'red' | 'gray' {
  switch (status) {
    case 'confirme':
    case 'retenu':
    case 'retenu_etape_2':
      return 'green';
    case 'a_confirmer':
    case 'a_revoir':
      return 'orange';
    case 'non_retenu':
      return 'red';
    default:
      return 'gray';
  }
}

export const RECRUITMENT_FORMATION_OPTIONS = [
  { id: 'niv-01', label: 'Les bases de l’IA N1' },
  { id: 'niv-03', label: 'IA et conduite de travaux' },
  { id: 'niv-02', label: 'IA et appels d’offres' },
  { id: 'niv-05', label: 'IA et maîtrise d’œuvre' },
  { id: 'niv-04', label: 'Maîtriser Claude AI' },
  { id: 'niv-10', label: 'Créer ses assistants IA' },
] as const;

export type RecruitmentFormationId = (typeof RECRUITMENT_FORMATION_OPTIONS)[number]['id'];

const FORMATION_LABEL_BY_ID = new Map(
  RECRUITMENT_FORMATION_OPTIONS.map((f) => [f.id, f.label] as const),
);

export function formatRecruitmentFormations(ids: string[] | null | undefined): string {
  if (!ids?.length) return '—';
  return ids.map((id) => FORMATION_LABEL_BY_ID.get(id as RecruitmentFormationId) ?? id).join(' · ');
}
