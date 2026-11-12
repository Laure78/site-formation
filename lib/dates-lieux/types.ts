import type { FormationNiveau } from '@/data/formations';

export type DatesLieuxSessionSource = 'training_ops' | 'course_lms';

/** Session inter publiable — données agrégées pour l’UI (aucune invention). */
export type DatesLieuxSessionRow = {
  id: string;
  source: DatesLieuxSessionSource;
  formationSlug: string;
  formationCode: string;
  formationTitle: string;
  formationHref: string;
  niveau: FormationNiveau;
  niveauLabel: string;
  dureeLabel: string;
  tarifParticipantHt: number;
  /** ISO date (jour de session) */
  sessionDate: string;
  scheduleText: string | null;
  city: string | null;
  departmentCode: string | null;
  address: string | null;
  maxParticipants: number | null;
  enrolledCount: number;
  isFull: boolean;
  trainingSessionId: string | null;
};

/** Formation catalogue sans date inter publiée — carte « à la demande ». */
export type DatesLieuxOnDemandRow = {
  kind: 'on_demand';
  formationSlug: string;
  formationCode: string;
  formationTitle: string;
  formationHref: string;
  niveau: FormationNiveau;
  niveauLabel: string;
  dureeLabel: string;
  tarifParticipantHt: number;
};

export type DatesLieuxListItem = DatesLieuxSessionRow | DatesLieuxOnDemandRow;

export function isOnDemandRow(item: DatesLieuxListItem): item is DatesLieuxOnDemandRow {
  return 'kind' in item && item.kind === 'on_demand';
}
