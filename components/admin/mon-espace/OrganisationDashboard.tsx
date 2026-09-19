import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  CheckSquare,
  ClipboardList,
  FileText,
  FolderOpen,
  Mail,
  Receipt,
  Star,
  Users,
} from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import type { OrganisationDashboardData } from '@/lib/admin/mon-espace/organisation-dashboard';
import {
  DAY_HEADER_TONES,
  OrgCard,
  OrgCardHeader,
  OrgEmpty,
  OrgStatCard,
  OrgTag,
} from '@/components/admin/mon-espace/ui';

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateFr(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y!, (m ?? 1) - 1, d ?? 1).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });
}

function ChecklistRow({
  children,
  done,
  right,
}: {
  children: ReactNode;
  done?: boolean;
  right?: ReactNode;
}) {
  return (
    <li className="flex items-start gap-2.5 rounded-xl px-2 py-2 hover:bg-slate-50/80">
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
          done
            ? 'border-[#377CF3] bg-[#377CF3] text-white'
            : 'border-slate-300 bg-white'
        }`}
        aria-hidden
      >
        {done ? (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.5L5 9L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <span
        className={`min-w-0 flex-1 text-sm leading-snug ${
          done ? 'text-slate-400 line-through' : 'text-slate-800'
        }`}
      >
        {children}
      </span>
      {right}
    </li>
  );
}

const ADMIN_FOLLOWUPS = [
  {
    label: 'Suivi administratif',
    href: LINKS.adminMonEspaceSuivi,
    icon: FolderOpen,
    hint: 'Checklist sessions',
  },
  {
    label: 'Dossiers apprenants',
    href: '/admin/apprenants',
    icon: Users,
    hint: 'Inscriptions',
  },
  {
    label: 'Satisfaction',
    href: '/admin/qualite',
    icon: ClipboardList,
    hint: 'Qualiopi',
  },
  {
    label: 'Émargement',
    href: '/admin/qualite/emargement',
    icon: FileText,
    hint: 'Présences',
  },
  {
    label: 'Formations',
    href: '/admin/formations',
    icon: Receipt,
    hint: 'Dates session',
  },
  {
    label: 'Relances',
    href: '/admin/prospects',
    icon: Mail,
    hint: 'Pipeline',
  },
] as const;

const DEFAULT_QUICK_LINKS = [
  { label: 'Formations LMS', href: '/admin/formations' },
  { label: 'Apprenants', href: '/admin/apprenants' },
  { label: 'Disponibilités', href: '/admin/disponibilites' },
  { label: 'Qualiopi', href: '/admin/qualite' },
  { label: 'Progression', href: '/admin/progression' },
  { label: 'Catalogue', href: LINKS.formations },
] as const;

export function OrganisationDashboard({ data }: { data: OrganisationDashboardData }) {
  const echeancesCount =
    data.todayDeadlines.length +
    data.todayAppointments.length +
    data.todayFormations.length;

  return (
    <div className="space-y-6 md:space-y-7">
      {/* KPI — lecture en 5 secondes */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <OrgStatCard
          label="À faire aujourd’hui"
          value={data.todayTasks.length}
          icon={<CheckSquare size={18} strokeWidth={1.75} />}
          tone="sky"
        />
        <OrgStatCard
          label="Formations à venir"
          value={data.upcomingFormations.length}
          icon={<BookOpen size={18} strokeWidth={1.75} />}
          tone="emerald"
        />
        <OrgStatCard
          label="Rendez-vous du jour"
          value={data.todayAppointments.length}
          icon={<CalendarDays size={18} strokeWidth={1.75} />}
          tone="amber"
        />
        <OrgStatCard
          label="Échéances / priorités"
          value={echeancesCount + data.priorities.length}
          icon={<AlertCircle size={18} strokeWidth={1.75} />}
          tone="violet"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        {/* Aujourd’hui */}
        <OrgCard>
          <OrgCardHeader
            title="Aujourd’hui"
            description="Ce qu’il faut traiter maintenant."
            actionHref={LINKS.adminMonEspaceAgenda}
            actionLabel="Agenda"
            icon={
              <CalendarDays size={18} className="text-[#377CF3]" strokeWidth={1.75} />
            }
          />
          <div className="space-y-5">
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Tâches
              </p>
              {data.todayTasks.length === 0 ? (
                <OrgEmpty>Rien de planifié.</OrgEmpty>
              ) : (
                <ul>
                  {data.todayTasks.map((t) => (
                    <ChecklistRow
                      key={t.id}
                      right={
                        t.emphasis ? <OrgTag tone="rose">Priorité</OrgTag> : null
                      }
                    >
                      {t.title}
                    </ChecklistRow>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Rendez-vous
              </p>
              {data.todayAppointments.length === 0 ? (
                <OrgEmpty>Aucun RDV.</OrgEmpty>
              ) : (
                <ul className="space-y-1.5">
                  {data.todayAppointments.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-center gap-3 rounded-xl bg-amber-50/60 px-3 py-2.5 text-sm"
                    >
                      <span className="font-semibold tabular-nums text-amber-900">
                        {formatTime(a.start_at)}
                      </span>
                      <span className="min-w-0 truncate text-slate-800">
                        {a.client_name}
                      </span>
                      {a.type_rdv ? (
                        <OrgTag tone="amber">{a.type_rdv}</OrgTag>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Formations
              </p>
              {data.todayFormations.length === 0 ? (
                <OrgEmpty>Aucune session aujourd’hui.</OrgEmpty>
              ) : (
                <ul className="space-y-1.5">
                  {data.todayFormations.map((f) => (
                    <li key={f.id}>
                      <Link
                        href={`/admin/formations/${f.id}`}
                        className="flex items-center gap-2 rounded-xl bg-sky-50/70 px-3 py-2.5 text-sm font-medium text-sky-900 hover:bg-sky-50"
                      >
                        <BookOpen size={14} className="shrink-0 text-sky-500" />
                        <span className="truncate">{f.title}</span>
                        <OrgTag tone="sky">Session</OrgTag>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </OrgCard>

        {/* Priorités + échéances */}
        <div className="space-y-5">
          <OrgCard>
            <OrgCardHeader
              title="Mes priorités"
              actionHref={LINKS.adminMonEspaceTaches}
              actionLabel="Tâches"
            />
            {data.priorities.length === 0 ? (
              <OrgEmpty>Aucune priorité marquée.</OrgEmpty>
            ) : (
              <ul className="space-y-2">
                {data.priorities.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-start gap-2.5 rounded-xl border border-rose-100/80 bg-rose-50/40 px-3 py-2.5"
                  >
                    <AlertCircle
                      size={15}
                      className="mt-0.5 shrink-0 text-rose-500"
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-rose-900">
                        {t.title}
                      </span>
                      {t.due_date ? (
                        <span className="text-xs text-rose-600/80">
                          {formatDateFr(t.due_date)}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </OrgCard>

          <OrgCard>
            <OrgCardHeader title="Échéances du jour" />
            {data.todayDeadlines.length === 0 &&
            data.todayAppointments.length === 0 &&
            data.todayFormations.length === 0 ? (
              <OrgEmpty>Rien à échéance.</OrgEmpty>
            ) : (
              <ul className="space-y-2 text-sm text-slate-700">
                {data.todayDeadlines.map((t) => (
                  <li key={`dl-${t.id}`} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                    {t.title}
                  </li>
                ))}
                {data.todayAppointments.map((a) => (
                  <li key={`dl-a-${a.id}`} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    RDV {formatTime(a.start_at)} — {a.client_name}
                  </li>
                ))}
                {data.todayFormations.map((f) => (
                  <li key={`dl-f-${f.id}`} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    {f.title}
                  </li>
                ))}
              </ul>
            )}
          </OrgCard>
        </div>
      </div>

      {/* Semaine */}
      <OrgCard padding="lg">
        <OrgCardHeader
          title="Planning de la semaine"
          description="Lundi → vendredi"
          actionHref={LINKS.adminMonEspaceAgenda}
          actionLabel="Ouvrir l’agenda"
        />
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {data.weekDays.map((day, i) => (
            <div
              key={day.key}
              className={`overflow-hidden rounded-2xl border border-slate-100 bg-white ${
                day.isToday ? 'ring-2 ring-[#377CF3]/25' : ''
              }`}
            >
              <div
                className={`px-3 py-2 ${DAY_HEADER_TONES[i % DAY_HEADER_TONES.length]}`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
                  {day.label}
                </p>
                <p className="font-display text-lg font-bold">{day.dayNumber}</p>
              </div>
              <ul className="space-y-1.5 p-2.5 text-xs text-slate-600">
                {day.appointments.slice(0, 2).map((a) => (
                  <li
                    key={a.id}
                    className="truncate rounded-lg bg-violet-50/80 px-2 py-1.5 font-medium text-violet-900"
                  >
                    {formatTime(a.start_at)} {a.client_name}
                  </li>
                ))}
                {day.tasks.slice(0, 2).map((t) => (
                  <li key={t.id} className="flex items-start gap-1.5 px-1 py-0.5">
                    <span className="mt-0.5 h-3 w-3 shrink-0 rounded border border-slate-300" />
                    <span className="truncate">{t.title}</span>
                  </li>
                ))}
                {day.appointments.length === 0 && day.tasks.length === 0 ? (
                  <li className="px-1 py-2 text-center text-slate-300">—</li>
                ) : null}
              </ul>
            </div>
          ))}
        </div>
      </OrgCard>

      <div className="grid gap-5 xl:grid-cols-2">
        <OrgCard>
          <OrgCardHeader
            title="Prochaines formations"
            actionHref="/admin/formations"
            actionLabel="Toutes"
          />
          {data.upcomingFormations.length === 0 ? (
            <OrgEmpty>Aucune date de session renseignée.</OrgEmpty>
          ) : (
            <ul className="space-y-2">
              {data.upcomingFormations.slice(0, 6).map((f) => (
                <li key={f.id}>
                  <Link
                    href={`/admin/formations/${f.id}`}
                    className="flex items-center justify-between gap-3 rounded-xl px-2 py-2.5 text-sm hover:bg-sky-50/50"
                  >
                    <span className="min-w-0 truncate font-medium text-slate-900">
                      {f.title}
                    </span>
                    <OrgTag tone="sky">{formatDateFr(f.session_ends_on)}</OrgTag>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </OrgCard>

        <OrgCard>
          <OrgCardHeader
            title="Relances & administratif"
            description="Actions récurrentes"
            actionHref={LINKS.adminMonEspaceSuivi}
            actionLabel="Suivi"
          />
          <ul className="grid gap-2 sm:grid-cols-2">
            {ADMIN_FOLLOWUPS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl border border-slate-100/80 bg-slate-50/40 px-3 py-3 transition hover:border-sky-100 hover:bg-white"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#377CF3] shadow-sm">
                      <Icon size={16} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-900">
                        {item.label}
                      </span>
                      <span className="text-xs text-slate-400">{item.hint}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </OrgCard>
      </div>

      <OrgCard padding="sm">
        <OrgCardHeader
          title="Accès rapides"
          actionHref={LINKS.adminMonEspaceFavoris}
          actionLabel="Favoris"
        />
        <div className="flex flex-wrap gap-2">
          {(data.favorites.length > 0
            ? data.favorites.map((f) => ({ label: f.label, href: f.href }))
            : DEFAULT_QUICK_LINKS
          ).map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm text-slate-600 ring-1 ring-slate-200/80 hover:text-[#377CF3] hover:ring-[#377CF3]/40"
            >
              <Star size={11} className="text-slate-300" aria-hidden />
              {link.label}
            </Link>
          ))}
        </div>
      </OrgCard>
    </div>
  );
}
