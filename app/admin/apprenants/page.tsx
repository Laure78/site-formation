import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  AdminApprenantsActionsPanel,
  AdminApprenantsAdvancedToggle,
} from '@/components/admin/apprenants/AdminApprenantsActionsPanel';
import { ApprenantsListTable } from '@/components/admin/apprenants/ApprenantsListTable';
import { LmsAutomationSettingsCard } from '@/components/admin/apprenants/LmsAutomationSettingsCard';
import { getLmsAutomationSettings } from '@/lib/lms-automation-settings';
import {
  formatAdminShortDate,
  getApprenantAccessBadge,
  type ApprenantListRow,
} from '@/lib/admin/apprenants-dashboard';
import { ExportApprenantsButton } from './ExportApprenantsButton';
import { RenvoyerInvitationButton } from './RenvoyerInvitationButton';

export default async function AdminApprenantsPage() {
  const supabase = await createClient();
  const adminDb = createAdminClient();
  const [
    { data: profiles },
    { data: courses },
    { data: enrollments },
    { data: lastSessions },
    { data: invitations },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, first_name, last_name, full_name, email, created_at, account_status')
      .eq('role', 'apprenant')
      .order('created_at', { ascending: false }),
    supabase.from('courses').select('id, title').eq('published', true).order('title'),
    supabase.from('enrollments').select('user_id, course_id, progress_percent, courses(title)'),
    supabase.from('session_logs').select('user_id, started_at').order('started_at', { ascending: false }),
    adminDb
      .from('invitations')
      .select('id, email, first_name, last_name, formation_id, status, sent_count, expires_at, created_at')
      .in('status', ['pending', 'expired', 'accepted'])
      .order('created_at', { ascending: false })
      .limit(100),
  ]);

  const formationIds = [...new Set((invitations ?? []).map((i) => i.formation_id).filter(Boolean))] as string[];
  const { data: invitationCourses } =
    formationIds.length > 0
      ? await supabase.from('courses').select('id, title').in('id', formationIds)
      : { data: [] as { id: string; title: string }[] };
  const courseTitleById = Object.fromEntries((invitationCourses ?? []).map((c) => [c.id, c.title]));

  const lastActivityByUser: Record<string, string> = {};
  for (const s of lastSessions ?? []) {
    if (!lastActivityByUser[s.user_id]) lastActivityByUser[s.user_id] = s.started_at;
  }

  const enrollmentsByUser: Record<string, { title: string; progress: number }[]> = {};
  for (const e of enrollments ?? []) {
    const c = e.courses as { title?: string } | { title?: string }[] | null | undefined;
    const title = (Array.isArray(c) ? c[0]?.title : c?.title) ?? 'Formation';
    if (!enrollmentsByUser[e.user_id]) enrollmentsByUser[e.user_id] = [];
    enrollmentsByUser[e.user_id].push({ title, progress: e.progress_percent });
  }

  type PendingInvitationRow = NonNullable<typeof invitations>[number];
  const pendingInviteByEmail: Record<string, PendingInvitationRow> = {};
  for (const inv of invitations ?? []) {
    if (inv.status === 'accepted') continue;
    const key = inv.email.toLowerCase();
    if (!pendingInviteByEmail[key]) pendingInviteByEmail[key] = inv;
  }

  const pendingInvitations = (invitations ?? []).filter((inv) => inv.status !== 'accepted');

  const rows: ApprenantListRow[] = (profiles ?? []).map((p) => {
    const accountStatus = (p as { account_status?: string }).account_status;
    const name =
      [(p as { first_name?: string }).first_name, (p as { last_name?: string }).last_name]
        .filter(Boolean)
        .join(' ') ||
      (p as { full_name?: string }).full_name ||
      '—';
    const pending = p.email ? pendingInviteByEmail[p.email.toLowerCase()] : undefined;
    const formationTitle = pending?.formation_id
      ? courseTitleById[pending.formation_id] ?? '—'
      : '—';

    return {
      id: p.id,
      name,
      email: p.email ?? '—',
      createdLabel: formatAdminShortDate(p.created_at),
      enrollments: enrollmentsByUser[p.id] ?? [],
      lastActivityLabel: formatAdminShortDate(lastActivityByUser[p.id]),
      access: getApprenantAccessBadge(accountStatus),
      showResend: accountStatus === 'invited' && Boolean(pending),
      pendingInvitation:
        pending && accountStatus === 'invited'
          ? {
              ...pending,
              courses: { title: formationTitle },
            }
          : null,
    };
  });

  const total = profiles?.length ?? 0;
  const activeCount = (profiles ?? []).filter((p) => (p as { account_status?: string }).account_status === 'active').length;
  const invitedCount = (profiles ?? []).filter((p) => (p as { account_status?: string }).account_status === 'invited').length;
  const lmsAutomation = await getLmsAutomationSettings().catch(() => null);

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Apprenants</h1>
          <p className="mt-1 text-sm text-slate-600">Invitations, accès à la plateforme et progression LMS.</p>
        </div>
        <ExportApprenantsButton />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total" value={total} />
        <StatCard label="Comptes actifs" value={activeCount} tone="emerald" />
        <StatCard label="En attente" value={invitedCount} tone="amber" />
        <StatCard label="Invitations ouvertes" value={pendingInvitations.length} tone={pendingInvitations.length > 0 ? 'amber' : 'neutral'} />
      </div>

      <div className="mt-6">
        <AdminApprenantsActionsPanel courses={courses ?? []} />
      </div>

      <section className="mt-8" aria-labelledby="liste-apprenants">
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <h2 id="liste-apprenants" className="font-display text-lg font-semibold text-slate-900">
            Liste des apprenants
          </h2>
          <span className="text-sm text-slate-500">{total} profil{total > 1 ? 's' : ''}</span>
        </div>
        <ApprenantsListTable rows={rows} />
      </section>

      {pendingInvitations.length > 0 ? (
        <section
          className="mt-6 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3"
          aria-labelledby="invitations-relance"
        >
          <h2 id="invitations-relance" className="text-sm font-semibold text-amber-950">
            Invitations à renvoyer ({pendingInvitations.length})
          </h2>
          <p className="mt-1 text-xs text-amber-900/80">
            Compte créé, mot de passe pas encore défini — renvoyer l’email d’activation si besoin.
          </p>
          <ul className="mt-3 space-y-2">
            {pendingInvitations.slice(0, 5).map((inv) => {
              const title = inv.formation_id ? courseTitleById[inv.formation_id] ?? '—' : '—';
              const name = [inv.first_name, inv.last_name].filter(Boolean).join(' ') || inv.email;
              return (
                <li
                  key={inv.id}
                  className="flex flex-col gap-2 rounded-lg border border-amber-100 bg-white px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 text-sm">
                    <span className="font-medium text-slate-900">{name}</span>
                    <span className="block truncate text-slate-600">{inv.email}</span>
                    <span className="text-slate-500">{title}</span>
                  </div>
                  <RenvoyerInvitationButton
                    variant="primary"
                    invitation={{ ...inv, courses: { title } }}
                  />
                </li>
              );
            })}
          </ul>
          {pendingInvitations.length > 5 ? (
            <p className="mt-2 text-xs text-amber-900/80">
              + {pendingInvitations.length - 5} autre(s) — utilisez « Renvoyer » dans la liste pour les comptes au statut Invitation.
            </p>
          ) : null}
        </section>
      ) : null}

      {lmsAutomation ? (
        <div className="mt-8">
          <AdminApprenantsAdvancedToggle title="Automatisations LMS (paramètres avancés)">
            <LmsAutomationSettingsCard settings={lmsAutomation} />
          </AdminApprenantsAdvancedToggle>
        </div>
      ) : null}
    </div>
  );
}

function StatCard({
  label,
  value,
  tone = 'neutral',
}: {
  label: string;
  value: number;
  tone?: 'neutral' | 'emerald' | 'amber' | 'rose';
}) {
  const toneClass =
    tone === 'emerald'
      ? 'border-emerald-100 bg-emerald-50/50'
      : tone === 'amber'
        ? 'border-amber-100 bg-amber-50/50'
        : tone === 'rose'
          ? 'border-rose-100 bg-rose-50/50'
          : 'border-slate-200 bg-white';

  return (
    <div className={`rounded-xl border px-3 py-3 ${toneClass}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}