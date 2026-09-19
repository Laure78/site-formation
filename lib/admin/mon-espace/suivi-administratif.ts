import type { SupabaseClient } from '@supabase/supabase-js';

export type ChecklistPhase = 'avant' | 'pendant' | 'apres';
export type ChecklistItemStatus = 'todo' | 'waiting' | 'done';

/** Statut de pilotage d’une session (agrégé). */
export type SessionPilotageStatus =
  | 'a_preparer'
  | 'en_attente'
  | 'termine'
  | 'en_retard';

export const PILOTAGE_STATUS_META: Record<
  SessionPilotageStatus,
  { label: string; tone: string; badge: string }
> = {
  a_preparer: {
    label: 'À préparer',
    tone: 'bg-sky-50 text-sky-800 border-sky-200',
    badge: 'bg-sky-100 text-sky-800',
  },
  en_attente: {
    label: 'En attente',
    tone: 'bg-amber-50 text-amber-900 border-amber-200',
    badge: 'bg-amber-100 text-amber-900',
  },
  termine: {
    label: 'Terminé',
    tone: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800',
  },
  en_retard: {
    label: 'En retard',
    tone: 'bg-rose-50 text-rose-800 border-rose-200',
    badge: 'bg-rose-100 text-rose-800',
  },
};

export type ChecklistDefinition = {
  id: string;
  item_key: string;
  label: string;
  description: string | null;
  phase: ChecklistPhase;
  sort_order: number;
  default_enabled: boolean;
  is_active: boolean;
  auto_source: 'satisfaction_surveys' | null;
};

export type ChecklistEntry = {
  id: string;
  course_id: string;
  definition_id: string;
  enabled: boolean;
  status: ChecklistItemStatus;
  note: string | null;
  due_date: string | null;
  completed_at: string | null;
  updated_at: string;
};

export type ChecklistItemView = {
  definition: ChecklistDefinition;
  entry: ChecklistEntry;
  /** Statut affiché (peut être dérivé automatiquement). */
  effectiveStatus: ChecklistItemStatus;
  autoDerived: boolean;
  autoHint: string | null;
};

export type SessionSuiviRow = {
  courseId: string;
  title: string;
  sessionEndsOn: string | null;
  sessionCancelled: boolean;
  published: boolean;
  participantCount: number;
  satisfactionCount: number;
  items: ChecklistItemView[];
  enabledCount: number;
  doneCount: number;
  waitingCount: number;
  todoCount: number;
  pilotageStatus: SessionPilotageStatus;
};

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function computePilotageStatus(params: {
  sessionEndsOn: string | null;
  sessionCancelled: boolean;
  enabledItems: { effectiveStatus: ChecklistItemStatus }[];
}): SessionPilotageStatus {
  if (params.sessionCancelled) return 'termine';

  const enabled = params.enabledItems;
  if (enabled.length === 0) return 'a_preparer';

  const allDone = enabled.every((i) => i.effectiveStatus === 'done');
  if (allDone) return 'termine';

  const today = toDateKey(new Date());
  const isPast =
    params.sessionEndsOn != null && params.sessionEndsOn < today;

  if (isPast) return 'en_retard';

  const hasWaiting = enabled.some((i) => i.effectiveStatus === 'waiting');
  if (hasWaiting) return 'en_attente';

  return 'a_preparer';
}

export async function getChecklistDefinitions(
  supabase: SupabaseClient,
  options: { includeInactive?: boolean } = {}
): Promise<ChecklistDefinition[]> {
  let query = supabase
    .from('admin_checklist_definitions')
    .select('*')
    .order('sort_order', { ascending: true });

  if (!options.includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as ChecklistDefinition[];
}

/**
 * Assure une entrée checklist par définition active pour ce cours
 * (respecte default_enabled à la création).
 */
export async function ensureCourseChecklistEntries(
  supabase: SupabaseClient,
  courseId: string,
  definitions: ChecklistDefinition[]
): Promise<ChecklistEntry[]> {
  if (definitions.length === 0) return [];

  const { data: existing, error: readError } = await supabase
    .from('course_checklist_entries')
    .select('*')
    .eq('course_id', courseId);

  if (readError) throw new Error(readError.message);

  const byDef = new Map(
    ((existing ?? []) as ChecklistEntry[]).map((e) => [e.definition_id, e])
  );

  const toInsert = definitions
    .filter((d) => !byDef.has(d.id))
    .map((d) => ({
      course_id: courseId,
      definition_id: d.id,
      enabled: d.default_enabled,
      status: 'todo' as const,
    }));

  if (toInsert.length > 0) {
    const { data: inserted, error: insertError } = await supabase
      .from('course_checklist_entries')
      .insert(toInsert)
      .select('*');

    if (insertError) throw new Error(insertError.message);
    for (const row of (inserted ?? []) as ChecklistEntry[]) {
      byDef.set(row.definition_id, row);
    }
  }

  return definitions
    .map((d) => byDef.get(d.id))
    .filter((e): e is ChecklistEntry => Boolean(e));
}

function buildItemViews(
  definitions: ChecklistDefinition[],
  entries: ChecklistEntry[],
  satisfactionCount: number
): ChecklistItemView[] {
  const entryByDef = new Map(entries.map((e) => [e.definition_id, e]));

  return definitions
    .map((definition) => {
      const entry = entryByDef.get(definition.id);
      if (!entry) return null;

      let effectiveStatus = entry.status;
      let autoDerived = false;
      let autoHint: string | null = null;

      if (definition.auto_source === 'satisfaction_surveys' && entry.enabled) {
        if (satisfactionCount > 0) {
          effectiveStatus = 'done';
          autoDerived = true;
          autoHint = `${satisfactionCount} réponse${satisfactionCount > 1 ? 's' : ''} en base`;
        } else if (entry.status === 'todo') {
          autoHint = 'Aucune réponse satisfaction en base — à compléter manuellement si besoin';
        }
      }

      return {
        definition,
        entry,
        effectiveStatus,
        autoDerived,
        autoHint,
      };
    })
    .filter((x): x is ChecklistItemView => Boolean(x));
}

export type SuiviFilters = {
  courseId?: string;
  status?: SessionPilotageStatus | 'all';
  dateFrom?: string;
  dateTo?: string;
  /** Inclure les formations sans date de session */
  includeUndated?: boolean;
};

export async function getOrganisationSuiviSessions(
  supabase: SupabaseClient,
  filters: SuiviFilters = {}
): Promise<{
  sessions: SessionSuiviRow[];
  definitions: ChecklistDefinition[];
  counts: Record<SessionPilotageStatus, number>;
}> {
  const definitions = await getChecklistDefinitions(supabase);

  let coursesQuery = supabase
    .from('courses')
    .select('id, title, published, session_ends_on, session_cancelled')
    .order('session_ends_on', { ascending: true, nullsFirst: false });

  if (filters.courseId) {
    coursesQuery = coursesQuery.eq('id', filters.courseId);
  }
  if (filters.dateFrom) {
    coursesQuery = coursesQuery.gte('session_ends_on', filters.dateFrom);
  }
  if (filters.dateTo) {
    coursesQuery = coursesQuery.lte('session_ends_on', filters.dateTo);
  }
  if (!filters.includeUndated && !filters.courseId) {
    // Par défaut : sessions datées (pilotage réel) ; annulées incluses pour clôture
    coursesQuery = coursesQuery.not('session_ends_on', 'is', null);
  }

  const { data: courses, error: coursesError } = await coursesQuery;
  if (coursesError) throw new Error(coursesError.message);

  const courseList = courses ?? [];
  const courseIds = courseList.map((c) => c.id as string);

  if (courseIds.length === 0) {
    return {
      sessions: [],
      definitions,
      counts: { a_preparer: 0, en_attente: 0, termine: 0, en_retard: 0 },
    };
  }

  const [enrollmentsRes, satisfactionRes] = await Promise.all([
    supabase
      .from('enrollments')
      .select('course_id, status')
      .in('course_id', courseIds),
    supabase
      .from('satisfaction_surveys')
      .select('course_id')
      .in('course_id', courseIds),
  ]);

  const participantByCourse = new Map<string, number>();
  for (const e of enrollmentsRes.data ?? []) {
    if ((e as { status?: string }).status === 'cancelled') continue;
    const id = e.course_id as string;
    participantByCourse.set(id, (participantByCourse.get(id) ?? 0) + 1);
  }

  const satisfactionByCourse = new Map<string, number>();
  for (const s of satisfactionRes.data ?? []) {
    const id = s.course_id as string;
    satisfactionByCourse.set(id, (satisfactionByCourse.get(id) ?? 0) + 1);
  }

  // Entrées checklist : lecture + ensure pour chaque cours
  const sessions: SessionSuiviRow[] = [];

  for (const course of courseList) {
    const courseId = course.id as string;
    const entries = await ensureCourseChecklistEntries(
      supabase,
      courseId,
      definitions
    );
    const satisfactionCount = satisfactionByCourse.get(courseId) ?? 0;
    const items = buildItemViews(definitions, entries, satisfactionCount);
    const enabledItems = items.filter((i) => i.entry.enabled);

    const doneCount = enabledItems.filter((i) => i.effectiveStatus === 'done').length;
    const waitingCount = enabledItems.filter(
      (i) => i.effectiveStatus === 'waiting'
    ).length;
    const todoCount = enabledItems.filter((i) => i.effectiveStatus === 'todo').length;

    const sessionEndsOn = (course.session_ends_on as string | null) ?? null;
    const sessionCancelled = Boolean(course.session_cancelled);

    const pilotageStatus = computePilotageStatus({
      sessionEndsOn,
      sessionCancelled,
      enabledItems,
    });

    sessions.push({
      courseId,
      title: course.title as string,
      sessionEndsOn,
      sessionCancelled,
      published: Boolean(course.published),
      participantCount: participantByCourse.get(courseId) ?? 0,
      satisfactionCount,
      items,
      enabledCount: enabledItems.length,
      doneCount,
      waitingCount,
      todoCount,
      pilotageStatus,
    });
  }

  const statusFilter = filters.status && filters.status !== 'all' ? filters.status : null;
  const filtered = statusFilter
    ? sessions.filter((s) => s.pilotageStatus === statusFilter)
    : sessions;

  const counts: Record<SessionPilotageStatus, number> = {
    a_preparer: 0,
    en_attente: 0,
    termine: 0,
    en_retard: 0,
  };
  for (const s of sessions) {
    counts[s.pilotageStatus] += 1;
  }

  // Tri : retard d’abord, puis date, puis titre
  const order: SessionPilotageStatus[] = [
    'en_retard',
    'a_preparer',
    'en_attente',
    'termine',
  ];
  filtered.sort((a, b) => {
    const oi = order.indexOf(a.pilotageStatus) - order.indexOf(b.pilotageStatus);
    if (oi !== 0) return oi;
    const da = a.sessionEndsOn ?? '9999';
    const db = b.sessionEndsOn ?? '9999';
    if (da !== db) return da.localeCompare(db);
    return a.title.localeCompare(b.title, 'fr');
  });

  return { sessions: filtered, definitions, counts };
}
