/** Modes d’affichage agenda — V1 = semaine ; mois/jour préparés. */
export type AgendaViewMode = 'week' | 'month' | 'day';

export type AgendaEventCategory =
  | 'formation'
  | 'administratif'
  | 'prospection'
  | 'contenu'
  | 'personnel'
  | 'autre';

export const AGENDA_CATEGORIES: {
  id: AgendaEventCategory;
  label: string;
  /** Classes Tailwind discrètes (fond + texte + bordure) */
  chipClass: string;
  barClass: string;
}[] = [
  {
    id: 'formation',
    label: 'Formation',
    chipClass: 'bg-sky-50 text-sky-800 border-sky-200',
    barClass: 'bg-sky-400',
  },
  {
    id: 'administratif',
    label: 'Administratif',
    chipClass: 'bg-slate-50 text-slate-700 border-slate-200',
    barClass: 'bg-slate-400',
  },
  {
    id: 'prospection',
    label: 'Prospection',
    chipClass: 'bg-amber-50 text-amber-900 border-amber-200',
    barClass: 'bg-amber-400',
  },
  {
    id: 'contenu',
    label: 'Contenu',
    chipClass: 'bg-violet-50 text-violet-800 border-violet-200',
    barClass: 'bg-violet-400',
  },
  {
    id: 'personnel',
    label: 'Personnel',
    chipClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    barClass: 'bg-emerald-400',
  },
  {
    id: 'autre',
    label: 'Autre',
    chipClass: 'bg-rose-50 text-rose-800 border-rose-200',
    barClass: 'bg-rose-300',
  },
];

export function getCategoryMeta(category: AgendaEventCategory) {
  return AGENDA_CATEGORIES.find((c) => c.id === category) ?? AGENDA_CATEGORIES[5]!;
}

export type WorkspaceEvent = {
  id: string;
  owner_id: string;
  title: string;
  start_at: string;
  end_at: string;
  description: string | null;
  category: AgendaEventCategory;
  created_at: string;
  updated_at: string;
};

export type AgendaTaskItem = {
  id: string;
  title: string;
  due_date: string;
  done: boolean;
};

export type AgendaDayBucket = {
  /** YYYY-MM-DD (local) */
  dateKey: string;
  date: Date;
  weekdayLabel: string;
  dayNumber: number;
  isToday: boolean;
  events: WorkspaceEvent[];
  tasks: AgendaTaskItem[];
};

/** Payload sérialisable pour composants client (sans objet Date). */
export type AgendaDayBucketClient = Omit<AgendaDayBucket, 'date'>;
