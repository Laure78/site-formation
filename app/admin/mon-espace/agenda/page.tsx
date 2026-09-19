import { CalendarDays } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';
import {
  parseDateKey,
  startOfWeekMonday,
  toDateKey,
} from '@/lib/mon-espace/agenda-dates';
import { getOrganisationWeekAgenda } from '@/lib/admin/mon-espace/agenda-week';
import { MonEspaceSubnav } from '@/components/admin/mon-espace/MonEspaceSubnav';
import { OrganisationAgendaWeekBoard } from '@/components/admin/mon-espace/agenda/OrganisationAgendaWeekBoard';
import { OrgPageHeader } from '@/components/admin/mon-espace/ui';

export default async function OrganisationAgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ semaine?: string }>;
}) {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspaceAgenda}`);
    }
    redirect('/admin?organisation=denied');
  }

  const params = await searchParams;
  let anchor = new Date();
  if (params.semaine && /^\d{4}-\d{2}-\d{2}$/.test(params.semaine)) {
    anchor = parseDateKey(params.semaine);
  }

  const supabase = await createClient();
  let migrationMissing = false;
  let weekStartKey = toDateKey(startOfWeekMonday(anchor));
  let days: Awaited<ReturnType<typeof getOrganisationWeekAgenda>>['days'] = [];
  let showWeekend = false;

  try {
    const agenda = await getOrganisationWeekAgenda(supabase, access.userId, anchor);
    weekStartKey = agenda.weekStartKey;
    days = agenda.days;
    showWeekend = agenda.showWeekend;
  } catch {
    migrationMissing = true;
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-9">
      <OrgPageHeader
        title="Agenda"
        description="Planning de la semaine : formations, RDV, tâches et événements."
        icon={
          <CalendarDays className="text-[#377CF3]" size={26} strokeWidth={1.75} />
        }
      />

      <MonEspaceSubnav pathname={LINKS.adminMonEspaceAgenda} />

      {migrationMissing ? (
        <div
          className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="status"
        >
          Table événements absente ou incomplète. Appliquez{' '}
          <code className="rounded bg-amber-100 px-1 font-mono text-xs">
            049_workspace_events.sql
          </code>{' '}
          puis{' '}
          <code className="rounded bg-amber-100 px-1 font-mono text-xs">
            050_workspace_events_categories.sql
          </code>{' '}
          dans le SQL Editor Supabase, puis rechargez.
        </div>
      ) : (
        <div className="mt-7 max-w-[1400px]">
          <OrganisationAgendaWeekBoard
            weekStartKey={weekStartKey}
            days={days}
            showWeekend={showWeekend}
          />
        </div>
      )}
    </div>
  );
}
