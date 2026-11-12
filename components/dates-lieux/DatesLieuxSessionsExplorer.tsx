'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Clock,
  Coins,
  MapPin,
  RotateCcw,
} from 'lucide-react';
import { formatSessionDateFr } from '@/lib/session-date-format';
import { libelleTarifParticipantCatalogue } from '@/lib/tarifs-catalogue-participant';
import { IDF_DEPARTEMENT_OPTIONS } from '@/lib/business-delivery';
import { DATES_LIEUX_NIVEAU_FILTER_OPTIONS } from '@/lib/dates-lieux/niveau';
import type {
  DatesLieuxListItem,
  DatesLieuxOnDemandRow,
  DatesLieuxSessionRow,
} from '@/lib/dates-lieux/types';
import { isOnDemandRow } from '@/lib/dates-lieux/types';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { DatesLieuxSessionDialog } from '@/components/dates-lieux/DatesLieuxSessionDialog';
import { getDatesLieuxFormationIcon } from '@/lib/dates-lieux/formation-card-icon';

type Props = {
  confirmed: DatesLieuxSessionRow[];
  onDemand: DatesLieuxOnDemandRow[];
  formationOptions: { slug: string; title: string }[];
};

const MONTHS = [
  { value: '', label: 'Tous les mois' },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date(2026, i, 1)),
  })),
];

function locationLabel(row: DatesLieuxSessionRow): string {
  if (row.city && row.departmentCode) return `${row.city} (${row.departmentCode})`;
  if (row.city) return row.city;
  if (row.departmentCode) return `Île-de-France — ${row.departmentCode}`;
  return 'Île-de-France';
}

function matchMonth(sessionDate: string, month: string): boolean {
  if (!month) return true;
  return sessionDate.slice(5, 7) === month;
}

export function DatesLieuxSessionsExplorer({ confirmed, onDemand, formationOptions }: Props) {
  const [formationSlug, setFormationSlug] = useState('');
  const [niveau, setNiveau] = useState('');
  const [department, setDepartment] = useState('');
  const [month, setMonth] = useState('');

  const listItems: DatesLieuxListItem[] = useMemo(() => {
    if (confirmed.length === 0) return onDemand;
    return confirmed;
  }, [confirmed, onDemand]);

  const filtered = useMemo(() => {
    return listItems.filter((item) => {
      if (formationSlug && item.formationSlug !== formationSlug) return false;
      if (niveau && String(item.niveau) !== niveau) return false;

      if (isOnDemandRow(item)) {
        if (department || month) return false;
        return true;
      }

      if (department) {
        const code = item.departmentCode;
        if (department === 'hors-idf') return false;
        if (!code || code !== department) return false;
      }
      if (!matchMonth(item.sessionDate, month)) return false;
      return true;
    });
  }, [listItems, formationSlug, niveau, department, month]);

  const reset = () => {
    setFormationSlug('');
    setNiveau('');
    setDepartment('');
    setMonth('');
  };

  const selectClass =
    'w-full min-h-11 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/25';

  return (
    <section id="prochaines-sessions" className="scroll-mt-24" aria-labelledby="dates-lieux-sessions-h2">
      <div className="mx-auto max-w-[80rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 id="dates-lieux-sessions-h2" className="font-display text-2xl font-bold text-[#101936] md:text-3xl">
          Les prochaines sessions
        </h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          Sessions inter-entreprises en présentiel en Île-de-France. Tri par date croissante — sessions passées et
          annulées exclues.
        </p>

        <div
          className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5"
          role="search"
          aria-label="Filtrer les sessions"
        >
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700">Formation</span>
              <select
                className={selectClass}
                value={formationSlug}
                onChange={(e) => setFormationSlug(e.target.value)}
              >
                <option value="">Toutes les formations</option>
                {formationOptions.map((f) => (
                  <option key={f.slug} value={f.slug}>
                    {f.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700">Niveau</span>
              <select className={selectClass} value={niveau} onChange={(e) => setNiveau(e.target.value)}>
                <option value="">Tous niveaux</option>
                {DATES_LIEUX_NIVEAU_FILTER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700">Département</span>
              <select className={selectClass} value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="">Toute l&apos;Île-de-France</option>
                {IDF_DEPARTEMENT_OPTIONS.filter((d) => d.value !== 'hors-idf').map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-700">Mois</span>
              <select className={selectClass} value={month} onChange={(e) => setMonth(e.target.value)}>
                {MONTHS.map((m) => (
                  <option key={m.value || 'all'} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="button"
            onClick={reset}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#377CF3] hover:underline"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Réinitialiser
          </button>
        </div>

        <ul className="mt-8 space-y-4">
          {filtered.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-slate-700">
              Aucune session ne correspond à ces filtres. Élargissez les critères ou{' '}
              <a href="#proposer-date" className="font-semibold text-[#377CF3] underline">
                proposez une date
              </a>
              .
            </li>
          ) : (
            filtered.map((item) => {
              const Icon = getDatesLieuxFormationIcon(item.formationCode);
              return (
              <li
                key={isOnDemandRow(item) ? `od-${item.formationSlug}` : item.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-5 sm:p-5"
              >
                <span
                  className="mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#377CF3] sm:mx-0"
                  aria-hidden
                >
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                    <Link
                      href={item.formationHref}
                      className="font-display text-lg font-bold leading-snug text-[#101936] hover:text-[#377CF3]"
                    >
                      {item.formationTitle}
                    </Link>
                    <span
                      className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        item.niveau === 1
                          ? 'bg-sky-100 text-sky-800'
                          : item.niveau === 2
                            ? 'bg-[#377CF3]/10 text-[#1e40af]'
                            : 'bg-violet-100 text-violet-800'
                      }`}
                    >
                      {item.niveau === 1 ? 'Débutant' : item.niveau === 2 ? 'Avancé' : item.niveauLabel}
                    </span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
                    <li className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                      {item.dureeLabel}
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                      <Coins className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                      {libelleTarifParticipantCatalogue(item.tarifParticipantHt)}
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                      {isOnDemandRow(item)
                        ? 'Date à confirmer'
                        : formatSessionDateFr(item.sessionDate)}
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
                      {isOnDemandRow(item) ? 'Paris / Île-de-France' : locationLabel(item)}
                    </li>
                  </ul>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                  {isOnDemandRow(item) ? (
                    <DatesLieuxSessionDialog
                      mode="propose"
                      formationTitle={item.formationTitle}
                      formationHref={item.formationHref}
                      triggerClassName={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] border-2 border-[#377CF3] px-5 py-2.5 text-sm font-semibold text-[#377CF3] sm:w-auto`}
                      triggerLabel="Proposer une date"
                      showArrow
                    />
                  ) : item.isFull ? (
                    <DatesLieuxSessionDialog
                      mode="waitlist"
                      formationTitle={item.formationTitle}
                      formationHref={item.formationHref}
                      sessionDateLabel={formatSessionDateFr(item.sessionDate)}
                      triggerClassName={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] px-5 py-2.5 text-sm font-semibold sm:min-w-[11rem] sm:w-auto`}
                      triggerLabel="Être informé"
                      showArrow
                    />
                  ) : (
                    <DatesLieuxSessionDialog
                      mode="inscription"
                      formationTitle={item.formationTitle}
                      formationHref={item.formationHref}
                      sessionDateLabel={formatSessionDateFr(item.sessionDate)}
                      triggerClassName={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[8px] px-5 py-2.5 text-sm font-semibold sm:min-w-[11rem] sm:w-auto`}
                      triggerLabel="Demander une inscription"
                      showArrow
                    />
                  )}
                </div>
              </li>
            );
            })
          )}
        </ul>

        {confirmed.length === 0 ? (
          <p className="mt-6 text-sm text-slate-600">
            Aucune session inter confirmée n&apos;est publiée pour le moment : les formations ci-dessus restent
            disponibles sur demande (inter ou intra en Île-de-France).
          </p>
        ) : null}
      </div>
    </section>
  );
}
