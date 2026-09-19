import { ClipboardCheck } from 'lucide-react';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';
import {
  getChecklistDefinitions,
  getOrganisationSuiviSessions,
  type SessionPilotageStatus,
} from '@/lib/admin/mon-espace/suivi-administratif';
import { MonEspaceSubnav } from '@/components/admin/mon-espace/MonEspaceSubnav';
import { SuiviFiltersBar } from '@/components/admin/mon-espace/suivi/SuiviFiltersBar';
import { SuiviSessionList } from '@/components/admin/mon-espace/suivi/SuiviSessionList';
import { SuiviConfigPanel } from '@/components/admin/mon-espace/suivi/SuiviConfigPanel';
import { OrgPageHeader } from '@/components/admin/mon-espace/ui';

const VALID_STATUS = new Set<SessionPilotageStatus>([
  'a_preparer',
  'en_attente',
  'termine',
  'en_retard',
]);

export default async function SuiviAdministratifPage({
  searchParams,
}: {
  searchParams: Promise<{
    statut?: string;
    formation?: string;
    du?: string;
    au?: string;
    sans_date?: string;
  }>;
}) {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspaceSuivi}`);
    }
    redirect('/admin?organisation=denied');
  }

  const params = await searchParams;
  const statusRaw = params.statut;
  const status =
    statusRaw && VALID_STATUS.has(statusRaw as SessionPilotageStatus)
      ? (statusRaw as SessionPilotageStatus)
      : 'all';

  const supabase = await createClient();

  let migrationMissing = false;
  let sessions: Awaited<ReturnType<typeof getOrganisationSuiviSessions>>['sessions'] =
    [];
  let counts: Awaited<ReturnType<typeof getOrganisationSuiviSessions>>['counts'] = {
    a_preparer: 0,
    en_attente: 0,
    termine: 0,
    en_retard: 0,
  };
  let allDefinitions: Awaited<ReturnType<typeof getChecklistDefinitions>> = [];
  let courseOptions: { id: string; title: string }[] = [];

  try {
    const [suivi, defs, coursesRes] = await Promise.all([
      getOrganisationSuiviSessions(supabase, {
        courseId: params.formation || undefined,
        status,
        dateFrom: params.du || undefined,
        dateTo: params.au || undefined,
        includeUndated: params.sans_date === '1',
      }),
      getChecklistDefinitions(supabase, { includeInactive: true }),
      supabase
        .from('courses')
        .select('id, title, session_ends_on')
        .order('title', { ascending: true }),
    ]);

    sessions = suivi.sessions;
    counts = suivi.counts;
    allDefinitions = defs;
    courseOptions = (coursesRes.data ?? []).map((c) => ({
      id: c.id as string,
      title: c.title as string,
    }));
  } catch {
    migrationMissing = true;
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-9">
      <OrgPageHeader
        title="Suivi administratif"
        description="Checklists par session — à préparer, en attente, terminé, en retard."
        icon={
          <ClipboardCheck
            className="shrink-0 text-[#377CF3]"
            size={26}
            strokeWidth={1.75}
            aria-hidden
          />
        }
      />

      <MonEspaceSubnav pathname={LINKS.adminMonEspaceSuivi} />

      {migrationMissing ? (
        <div
          className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="status"
        >
          Tables checklist absentes. Appliquez{' '}
          <code className="rounded bg-amber-100 px-1 font-mono text-xs">
            051_organisation_suivi_administratif.sql
          </code>{' '}
          dans le SQL Editor Supabase, puis rechargez.
        </div>
      ) : (
        <div className="mt-7 max-w-5xl space-y-7">
          <Suspense fallback={null}>
            <SuiviFiltersBar courses={courseOptions} counts={counts} />
          </Suspense>

          <SuiviSessionList sessions={sessions} />

          <SuiviConfigPanel definitions={allDefinitions} />

          <p className="text-xs text-slate-400">
            Sources : fiches formation, inscriptions, satisfaction. Émargement :{' '}
            <a href="/admin/qualite/emargement" className="text-[#377CF3] hover:underline">
              /admin/qualite/emargement
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
