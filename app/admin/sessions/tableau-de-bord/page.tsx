import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { createAdminClient } from '@/lib/supabase/admin';
import { SESSION_STATUS_LABELS } from '@/lib/training-ops/constants';
import { buildSessionProgress } from '@/lib/training-ops/checklist';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default async function SessionsDashboardPage() {
  const supabase = createAdminClient();
  const today = todayISO();
  const in7 = addDaysISO(7);
  const year = new Date().getFullYear();

  let loadError: string | null = null;
  let upcoming: { id: string; reference: string; name: string; starts_on: string | null; status: string }[] = [];
  let thisWeek: typeof upcoming = [];
  let inProgress: typeof upcoming = [];
  let toClose: typeof upcoming = [];
  let yearCount = 0;
  let participantCount = 0;
  let hoursSum = 0;
  const alerts: { sessionId: string; reference: string; message: string }[] = [];

  try {
    const { data: sessions } = await supabase
      .from('training_sessions')
      .select('id, reference, name, starts_on, ends_on, status, duration_hours, archived_at')
      .is('archived_at', null)
      .order('starts_on', { ascending: true });

    const all = sessions ?? [];
    upcoming = all.filter(
      (s) => s.starts_on && s.starts_on >= today && s.status !== 'cloturee' && s.status !== 'annulee'
    );
    thisWeek = all.filter(
      (s) => s.starts_on && s.starts_on >= today && s.starts_on <= in7
    );
    inProgress = all.filter((s) => s.status === 'en_cours');
    toClose = all.filter((s) => s.status === 'terminee');

    yearCount = all.filter(
      (s) => s.starts_on && s.starts_on.startsWith(String(year))
    ).length;
    hoursSum = all
      .filter((s) => s.status === 'cloturee' || s.status === 'terminee')
      .reduce((acc, s) => acc + Number(s.duration_hours ?? 0), 0);

    const { count } = await supabase
      .from('training_session_participants')
      .select('id', { count: 'exact', head: true })
      .neq('status', 'annule');
    participantCount = count ?? 0;

    for (const s of thisWeek.slice(0, 12)) {
      const progress = await buildSessionProgress(s.id);
      const parts = progress.find((p) => p.key === 'participants');
      const conv = progress.find((p) => p.key === 'convocations');
      if (parts?.status === 'a_faire') {
        alerts.push({
          sessionId: s.id,
          reference: s.reference,
          message: 'Formation dans les 7 jours — participants manquants',
        });
      }
      if (conv && conv.status !== 'complet' && s.starts_on === addDaysISO(1)) {
        alerts.push({
          sessionId: s.id,
          reference: s.reference,
          message: 'Formation demain — convocations non complètes',
        });
      }
    }

    for (const s of toClose.slice(0, 10)) {
      const progress = await buildSessionProgress(s.id);
      const att = progress.find((p) => p.key === 'emargements');
      const bilan = progress.find((p) => p.key === 'bilan');
      const cert = progress.find((p) => p.key === 'attestations');
      if (att?.status !== 'complet') {
        alerts.push({
          sessionId: s.id,
          reference: s.reference,
          message: 'Session terminée — émargement manquant',
        });
      }
      if (bilan?.status !== 'complet') {
        alerts.push({
          sessionId: s.id,
          reference: s.reference,
          message: 'Session terminée — bilan formateur en attente',
        });
      }
      if (cert?.status !== 'complet') {
        alerts.push({
          sessionId: s.id,
          reference: s.reference,
          message: `Attestations incomplètes (${cert?.detail ?? ''})`,
        });
      }
    }
  } catch (e) {
    loadError = e instanceof Error ? e.message : 'Erreur de chargement';
  }

  function SessionList({
    title,
    items,
  }: {
    title: string;
    items: typeof upcoming;
  }) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="font-display text-lg font-semibold text-slate-900">{title}</h2>
        <ul className="mt-3 space-y-2">
          {items.slice(0, 8).map((s) => (
            <li key={s.id}>
              <Link
                href={`${LINKS.adminSessions}/${s.id}`}
                className="text-sm font-medium text-[#377CF3] hover:underline"
              >
                {s.reference}
              </Link>
              <span className="text-sm text-slate-600">
                {' '}
                — {s.name} · {s.starts_on ?? '—'} ·{' '}
                {SESSION_STATUS_LABELS[s.status as keyof typeof SESSION_STATUS_LABELS] ??
                  s.status}
              </span>
            </li>
          ))}
          {items.length === 0 ? (
            <li className="text-sm text-slate-500">Aucune</li>
          ) : null}
        </ul>
      </section>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link href={LINKS.adminSessions} className="text-sm font-medium text-[#377CF3]">
            ← Sessions de formation
          </Link>
          <h1 className="mt-2 font-display text-2xl font-bold text-slate-900">
            Tableau de bord sessions
          </h1>
        </div>
        <Link
          href={LINKS.adminSessionsNouvelle}
          className="inline-flex min-h-11 items-center rounded-xl bg-[#377CF3] px-4 text-sm font-semibold text-white"
        >
          + Nouvelle session
        </Link>
      </div>

      {loadError ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {loadError}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: `Sessions ${year}`, value: yearCount },
          { label: 'Participants (actifs)', value: participantCount },
          { label: 'Heures réalisées', value: hoursSum },
          { label: 'À clôturer', value: toClose.length },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-2xl font-bold text-slate-900">{c.value}</p>
            <p className="text-sm text-slate-600">{c.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <h2 className="font-display text-lg font-semibold text-amber-950">Alertes</h2>
        <ul className="mt-3 space-y-2">
          {alerts.slice(0, 15).map((a, i) => (
            <li key={`${a.sessionId}-${i}`} className="text-sm text-amber-950">
              <Link
                href={`${LINKS.adminSessions}/${a.sessionId}`}
                className="font-semibold underline"
              >
                {a.reference}
              </Link>
              {' — '}
              {a.message}
            </li>
          ))}
          {alerts.length === 0 ? (
            <li className="text-sm text-amber-900/70">Aucune alerte</li>
          ) : null}
        </ul>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <SessionList title="Sessions à venir" items={upcoming} />
        <SessionList title="Cette semaine (7 jours)" items={thisWeek} />
        <SessionList title="En cours" items={inProgress} />
        <SessionList title="À clôturer" items={toClose} />
      </div>
    </div>
  );
}
