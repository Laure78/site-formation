import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';
import { listSessionActivity } from '@/lib/training-ops/activity';
import {
  CHECKLIST_STATUS_LABELS,
  DOCUMENT_CATEGORY_LABELS,
  MODALITY_LABELS,
  SESSION_STATUS_LABELS,
  SESSION_STATUS_TONES,
  SESSION_TABS,
} from '@/lib/training-ops/constants';
import {
  buildSessionProgress,
  refreshSessionChecklist,
} from '@/lib/training-ops/checklist';
import { listSessionParticipants } from '@/lib/training-ops/participants';
import { getTrainingSession } from '@/lib/training-ops/sessions';
import { listTrainingCompanies } from '@/lib/training-ops/companies';
import { createAdminClient } from '@/lib/supabase/admin';
import type { SessionTabId } from '@/lib/training-ops/types';
import {
  addAttendanceAction,
  addParticipantAction,
  closeSessionAction,
  duplicateSessionAction,
  generateCertificatesAction,
  generateConvocationsAction,
  removeParticipantAction,
  restoreSupportAction,
  saveTrainerReportAction,
  updateSessionFieldsAction,
  updateSessionStatusAction,
  updateSupportAction,
} from '../actions';

const TONE: Record<string, string> = {
  slate: 'bg-slate-100 text-slate-700',
  amber: 'bg-amber-100 text-amber-800',
  blue: 'bg-blue-100 text-blue-800',
  emerald: 'bg-emerald-100 text-emerald-800',
  violet: 'bg-violet-100 text-violet-800',
  red: 'bg-red-100 text-red-800',
};

const PROGRESS_TONE: Record<string, string> = {
  a_faire: 'border-slate-200 bg-slate-50 text-slate-700',
  en_attente: 'border-amber-200 bg-amber-50 text-amber-900',
  incomplet: 'border-orange-200 bg-orange-50 text-orange-900',
  complet: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  non_applicable: 'border-slate-100 bg-white text-slate-400',
};

export default async function SessionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const tab = (typeof sp.tab === 'string' ? sp.tab : 'overview') as SessionTabId;

  let session: Awaited<ReturnType<typeof getTrainingSession>> = null;
  try {
    session = await getTrainingSession(id);
  } catch {
    session = null;
  }
  if (!session) notFound();

  const program = session.program as {
    title: string;
    catalogue_code: string | null;
    default_duration_hours: number | null;
  };
  const company = session.company as { name: string } | null;

  await refreshSessionChecklist(id).catch(() => null);
  const progress = await buildSessionProgress(id).catch(() => []);
  const participants = await listSessionParticipants(id).catch(() => []);
  const activity = await listSessionActivity(id).catch(() => []);
  const companies = await listTrainingCompanies().catch(() => []);

  const supabase = createAdminClient();
  const [
    { data: resources },
    { data: documents },
    { data: sheets },
    { data: certificates },
    { data: report },
    { data: checklist },
    { data: trainers },
  ] = await Promise.all([
    supabase
      .from('training_session_resources')
      .select('*')
      .eq('session_id', id)
      .order('sort_order'),
    supabase
      .from('training_session_documents')
      .select('*')
      .eq('session_id', id)
      .order('created_at', { ascending: false }),
    supabase
      .from('training_attendance_sheets')
      .select('*, rows:training_attendance_rows(id)')
      .eq('session_id', id)
      .order('sheet_date'),
    supabase
      .from('training_session_certificates')
      .select('*, participant:training_session_participants(person:training_people(first_name, last_name))')
      .eq('session_id', id),
    supabase.from('training_trainer_reports').select('*').eq('session_id', id).maybeSingle(),
    supabase
      .from('training_session_checklist_items')
      .select('*, definition:training_checklist_definitions(label, phase, sort_order, item_key)')
      .eq('session_id', id),
    supabase
      .from('profiles')
      .select('id, full_name, email, role')
      .in('role', ['admin', 'formateur']),
  ]);

  const checklistSorted = [...(checklist ?? [])].sort((a, b) => {
    const da = Array.isArray(a.definition) ? a.definition[0] : a.definition;
    const db = Array.isArray(b.definition) ? b.definition[0] : b.definition;
    return (da?.sort_order ?? 0) - (db?.sort_order ?? 0);
  });

  const primaryCta =
    session.status === 'brouillon' || session.status === 'a_preparer'
      ? { href: `?tab=participants`, label: 'Continuer la préparation' }
      : session.status === 'terminee'
        ? { href: `?tab=suivi`, label: 'Préparer la clôture' }
        : null;

  return (
    <div className="p-4 md:p-8">
      <Link href={LINKS.adminSessions} className="text-sm font-medium text-[#377CF3]">
        ← Sessions de formation
      </Link>

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#377CF3]">{session.reference}</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-slate-900">{session.name}</h1>
          <p className="mt-1 text-sm text-slate-600">
            {program?.catalogue_code} — {program?.title}
            {company ? ` · ${company.name}` : ''}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
              TONE[SESSION_STATUS_TONES[session.status as keyof typeof SESSION_STATUS_TONES]] ??
              TONE.slate
            }`}
          >
            {SESSION_STATUS_LABELS[session.status as keyof typeof SESSION_STATUS_LABELS]}
          </span>
          {primaryCta ? (
            <Link
              href={primaryCta.href}
              className="inline-flex min-h-10 items-center rounded-xl bg-[#377CF3] px-4 text-sm font-semibold text-white"
            >
              {primaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>

      <dl className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-xs font-semibold uppercase text-slate-500">Dates</dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">
            {session.starts_on ?? '—'}
            {session.ends_on && session.ends_on !== session.starts_on
              ? ` → ${session.ends_on}`
              : ''}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase text-slate-500">Durée</dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">
            {session.duration_hours ? `${session.duration_hours} h` : '—'}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase text-slate-500">Modalité</dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">
            {MODALITY_LABELS[session.modality as keyof typeof MODALITY_LABELS]}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase text-slate-500">Participants</dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">{participants.length}</dd>
        </div>
      </dl>

      <nav className="mt-6 flex gap-1 overflow-x-auto border-b border-slate-200 pb-px">
        {SESSION_TABS.map((t) => {
          const active = tab === t.id;
          return (
            <Link
              key={t.id}
              href={`?tab=${t.id}`}
              className={`shrink-0 rounded-t-lg px-3 py-2 text-sm font-medium ${
                active
                  ? 'border border-b-white border-slate-200 bg-white text-[#377CF3]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-b-2xl rounded-tr-2xl border border-t-0 border-slate-200 bg-white p-4 md:p-6">
        {tab === 'overview' ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-900">Progression</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {progress.map((b) => (
                  <div
                    key={b.key}
                    className={`rounded-xl border px-4 py-3 ${PROGRESS_TONE[b.status] ?? PROGRESS_TONE.a_faire}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide">
                      {CHECKLIST_STATUS_LABELS[b.status]}
                    </p>
                    <p className="mt-1 font-semibold">{b.label}</p>
                    <p className="text-sm opacity-80">{b.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <form action={updateSessionStatusAction} className="flex flex-wrap items-end gap-3">
              <input type="hidden" name="sessionId" value={id} />
              <label className="text-sm">
                <span className="font-medium text-slate-700">Changer le statut</span>
                <select
                  name="status"
                  defaultValue={session.status}
                  className="mt-1 block rounded-lg border border-slate-200 px-3 py-2"
                >
                  {Object.entries(SESSION_STATUS_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                Mettre à jour
              </button>
            </form>
            <form action={duplicateSessionAction} className="flex flex-wrap gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <input type="hidden" name="sessionId" value={id} />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="keepCompany" value="1" defaultChecked /> Client
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="keepTrainer" value="1" defaultChecked /> Formateur
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="keepSupports" value="1" /> Supports personnalisés
              </label>
              <button type="submit" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold">
                Dupliquer cette session
              </button>
            </form>
          </div>
        ) : null}

        {tab === 'participants' ? (
          <div className="space-y-6">
            <form action={addParticipantAction} className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3">
              <input type="hidden" name="sessionId" value={id} />
              <input type="hidden" name="companyId" value={session.company_id ?? ''} />
              <input name="firstName" required placeholder="Prénom *" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <input name="lastName" required placeholder="Nom *" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <input name="email" required type="email" placeholder="Email *" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <input name="phone" placeholder="Téléphone" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <input name="jobTitle" placeholder="Fonction" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <input name="department" placeholder="Service" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <button type="submit" className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white sm:col-span-3">
                Ajouter un participant
              </button>
            </form>
            <div className="flex flex-wrap gap-2">
              <form action={generateConvocationsAction}>
                <input type="hidden" name="sessionId" value={id} />
                <button type="submit" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold">
                  Générer les convocations
                </button>
              </form>
              <form action={generateCertificatesAction}>
                <input type="hidden" name="sessionId" value={id} />
                <button type="submit" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold">
                  Générer toutes les attestations
                </button>
              </form>
            </div>
            <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
              {participants.map((p) => {
                const person = p.person as {
                  first_name: string;
                  last_name: string;
                  email: string;
                };
                return (
                  <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-900">
                        {person.first_name} {person.last_name}
                      </p>
                      <p className="text-sm text-slate-500">{person.email}</p>
                    </div>
                    <form action={removeParticipantAction}>
                      <input type="hidden" name="sessionId" value={id} />
                      <input type="hidden" name="participantId" value={p.id} />
                      <button type="submit" className="text-sm font-medium text-red-600">
                        Retirer
                      </button>
                    </form>
                  </li>
                );
              })}
              {participants.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-slate-500">Aucun participant</li>
              ) : null}
            </ul>
          </div>
        ) : null}

        {tab === 'planning' ? (
          <form action={updateSessionFieldsAction} className="grid max-w-2xl gap-3 sm:grid-cols-2">
            <input type="hidden" name="sessionId" value={id} />
            <label className="block text-sm sm:col-span-2">
              Nom
              <input name="name" defaultValue={session.name} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="block text-sm">
              Début
              <input name="startsOn" type="date" defaultValue={session.starts_on ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="block text-sm">
              Fin
              <input name="endsOn" type="date" defaultValue={session.ends_on ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="block text-sm sm:col-span-2">
              Horaires
              <input name="scheduleText" defaultValue={session.schedule_text ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="block text-sm">
              Durée (h)
              <input name="durationHours" type="number" step="0.5" defaultValue={session.duration_hours ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="block text-sm">
              Jours
              <input name="daysCount" type="number" step="0.5" defaultValue={session.days_count ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="block text-sm">
              Modalité
              <select name="modality" defaultValue={session.modality} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
                {Object.entries(MODALITY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Client
              <select name="companyId" defaultValue={session.company_id ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
                <option value="">—</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm sm:col-span-2">
              Formateur
              <select name="primaryTrainerId" defaultValue={session.primary_trainer_id ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
                <option value="">—</option>
                {(trainers ?? []).map((t) => (
                  <option key={t.id} value={t.id}>{t.full_name || t.email}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm sm:col-span-2">
              Adresse
              <input name="locationAddress" defaultValue={session.location_address ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="block text-sm">
              Ville
              <input name="locationCity" defaultValue={session.location_city ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="block text-sm">
              Visio
              <input name="meetingUrl" defaultValue={session.meeting_url ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="block text-sm">
              Max participants
              <input name="maxParticipants" type="number" defaultValue={session.max_participants ?? ''} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <input type="hidden" name="companyContactName" value={session.company_contact_name ?? ''} />
            <input type="hidden" name="companyContactEmail" value={session.company_contact_email ?? ''} />
            <input type="hidden" name="companyContactPhone" value={session.company_contact_phone ?? ''} />
            <label className="block text-sm sm:col-span-2">
              Notes internes
              <textarea name="internalNotes" defaultValue={session.internal_notes ?? ''} rows={3} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <button type="submit" className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white sm:col-span-2">
              Enregistrer
            </button>
          </form>
        ) : null}

        {tab === 'supports' ? (
          <ul className="space-y-4">
            {(resources ?? []).map((r) => (
              <li key={r.id} className="rounded-xl border border-slate-200 p-4">
                <form action={updateSupportAction} className="grid gap-2 sm:grid-cols-2">
                  <input type="hidden" name="sessionId" value={id} />
                  <input type="hidden" name="resourceId" value={r.id} />
                  <input name="title" defaultValue={r.title} className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2" />
                  <input name="externalUrl" defaultValue={r.external_url ?? ''} placeholder="URL" className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2" />
                  <textarea name="description" defaultValue={r.description ?? ''} rows={2} className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2" />
                  <p className="text-xs text-slate-500 sm:col-span-2">
                    Version {r.version_label}
                    {r.customized ? ' · personnalisé session' : ' · modèle'}
                  </p>
                  <button type="submit" className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
                    Enregistrer
                  </button>
                </form>
                {r.source_program_resource_id ? (
                  <form action={restoreSupportAction} className="mt-2">
                    <input type="hidden" name="sessionId" value={id} />
                    <input type="hidden" name="resourceId" value={r.id} />
                    <button type="submit" className="text-sm font-medium text-[#377CF3]">
                      Restaurer la version originale
                    </button>
                  </form>
                ) : null}
              </li>
            ))}
            {(resources ?? []).length === 0 ? (
              <p className="text-sm text-slate-500">
                Aucun support. Ajoutez des supports modèle sur le programme, ou créez-en ici plus tard.
              </p>
            ) : null}
          </ul>
        ) : null}

        {tab === 'documents' ? (
          <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
            {(documents ?? []).map((d) => (
              <li key={d.id} className="flex justify-between gap-3 px-4 py-3 text-sm">
                <div>
                  <p className="font-medium text-slate-900">{d.title}</p>
                  <p className="text-slate-500">
                    {DOCUMENT_CATEGORY_LABELS[d.category as keyof typeof DOCUMENT_CATEGORY_LABELS] ??
                      d.category}{' '}
                    · {d.status}
                  </p>
                </div>
              </li>
            ))}
            {(documents ?? []).length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-slate-500">Aucun document</li>
            ) : null}
          </ul>
        ) : null}

        {tab === 'emargements' ? (
          <div className="space-y-4">
            <form action={addAttendanceAction} className="flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <input type="hidden" name="sessionId" value={id} />
              <input name="sheetDate" type="date" required defaultValue={session.starts_on ?? ''} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <input name="label" required placeholder="Ex. Jour 1 matin" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <button type="submit" className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white">
                Ajouter une feuille
              </button>
            </form>
            <ul className="space-y-2">
              {(sheets ?? []).map((s) => (
                <li key={s.id} className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
                  <strong>{s.label}</strong> — {s.sheet_date}
                  <span className="ml-2 text-slate-500">
                    ({Array.isArray(s.rows) ? s.rows.length : 0} lignes)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {tab === 'evaluations' ? (
          <p className="text-sm text-slate-600">
            Architecture prête (évaluations à chaud créées à l’inscription). Suivi détaillé avant / froid
            dans une prochaine itération.
          </p>
        ) : null}

        {tab === 'bilan' ? (
          <form action={saveTrainerReportAction} className="grid max-w-2xl gap-3">
            <input type="hidden" name="sessionId" value={id} />
            {(
              [
                ['deroulement', 'Déroulement'],
                ['participation_groupe', 'Participation du groupe'],
                ['objectifs_atteints', 'Objectifs atteints'],
                ['difficultes', 'Difficultés'],
                ['adaptations', 'Adaptations'],
                ['points_ameliorer', 'Points à améliorer'],
                ['observations', 'Observations'],
                ['recommandations', 'Recommandations'],
                ['commentaires', 'Commentaires'],
              ] as const
            ).map(([name, label]) => (
              <label key={name} className="block text-sm">
                {label}
                <textarea
                  name={name}
                  rows={2}
                  defaultValue={(report as Record<string, string | null> | null)?.[name] ?? ''}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
            ))}
            <div className="flex flex-wrap gap-2">
              <button type="submit" name="validate" value="0" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold">
                Enregistrer brouillon
              </button>
              <button type="submit" name="validate" value="1" className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white">
                Valider le bilan
              </button>
            </div>
            {report?.validated_at ? (
              <p className="text-sm text-emerald-700">Validé le {report.validated_at}</p>
            ) : null}
          </form>
        ) : null}

        {tab === 'attestations' ? (
          <div className="space-y-4">
            <form action={generateCertificatesAction}>
              <input type="hidden" name="sessionId" value={id} />
              <button type="submit" className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white">
                Générer toutes les attestations
              </button>
            </form>
            <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
              {(certificates ?? []).map((c) => {
                const part = c.participant as {
                  person: { first_name: string; last_name: string } | { first_name: string; last_name: string }[];
                } | null;
                const person = Array.isArray(part?.person) ? part?.person[0] : part?.person;
                return (
                  <li key={c.id} className="flex justify-between px-4 py-3 text-sm">
                    <span>
                      {person ? `${person.first_name} ${person.last_name}` : 'Participant'}
                    </span>
                    <span className="font-medium">{c.status}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {tab === 'suivi' ? (
          <div className="space-y-6">
            <ul className="space-y-2">
              {checklistSorted.map((item) => {
                const def = Array.isArray(item.definition) ? item.definition[0] : item.definition;
                return (
                  <li
                    key={item.id}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                      PROGRESS_TONE[item.status] ?? PROGRESS_TONE.a_faire
                    }`}
                  >
                    <span>
                      <span className="text-xs uppercase opacity-70">{def?.phase}</span>
                      <br />
                      {def?.label}
                    </span>
                    <span className="font-semibold">
                      {CHECKLIST_STATUS_LABELS[item.status as keyof typeof CHECKLIST_STATUS_LABELS]}
                    </span>
                  </li>
                );
              })}
            </ul>
            <form action={closeSessionAction} className="space-y-3 rounded-xl border border-slate-200 p-4">
              <input type="hidden" name="sessionId" value={id} />
              <button type="submit" className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white">
                Clôturer la session
              </button>
              <div className="border-t border-slate-100 pt-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="force" value="1" /> Forcer la clôture
                </label>
                <input
                  name="forceReason"
                  placeholder="Justification si forçage"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
            </form>
          </div>
        ) : null}

        {tab === 'historique' ? (
          <ul className="space-y-2">
            {activity.map((a) => (
              <li key={a.id} className="rounded-xl border border-slate-100 px-4 py-3 text-sm">
                <span className="text-slate-500">
                  {new Date(a.created_at).toLocaleString('fr-FR')}
                </span>
                {' — '}
                <span className="font-medium text-slate-900">{a.action}</span>
              </li>
            ))}
            {activity.length === 0 ? (
              <li className="text-sm text-slate-500">Aucune activité</li>
            ) : null}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
