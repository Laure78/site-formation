'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { assignInterviewSlotAction, clearInterviewSlotAction } from '@/app/admin/recrutement/actions';
import { RecruitmentStatusBadge } from '@/components/admin/recrutement/RecruitmentStatusBadge';
import { adminRecrutementCandidat } from '@/lib/internal-links';
import { RECRUITMENT_MODALITY, type RecruitmentStatus } from '@/lib/recruitment/constants';
import {
  formatSlotLabel,
  INTERVIEW_SLOT_TIMES,
  interviewAtToSlotTime,
  type InterviewSlotTime,
} from '@/lib/recruitment/interview-slots';
import { PlanningSlotBrief } from '@/components/admin/recrutement/PlanningInterviewBrief';
import type { RecruitmentCandidatRow } from '@/lib/recruitment/types';

export function PlanningDayView({
  dateYmd,
  candidats,
  unscheduled,
}: {
  dateYmd: string;
  candidats: RecruitmentCandidatRow[];
  unscheduled: RecruitmentCandidatRow[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const bySlot = new Map<InterviewSlotTime, RecruitmentCandidatRow>();
  for (const c of candidats) {
    const t = interviewAtToSlotTime(c.interview_at);
    if (t) bySlot.set(t, c);
  }

  const confirmes = candidats.filter((c) => c.status === 'confirme').length;
  const aConfirmer = candidats.filter((c) => c.status === 'a_confirmer').length;
  const libres = INTERVIEW_SLOT_TIMES.length - bySlot.size;

  const pdfBase = `/api/admin/recrutement/planning-pdf?date=${encodeURIComponent(dateYmd)}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Stat label="Confirmés" value={confirmes} />
        <Stat label="À confirmer" value={aConfirmer} />
        <Stat label="Créneaux libres" value={libres} />
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={`${pdfBase}&variant=interne`}
          className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d6ad8]"
        >
          PDF planning interne
        </a>
        <a
          href={`${pdfBase}&variant=anonyme`}
          className="rounded-lg border border-[#377CF3] px-4 py-2 text-sm font-semibold text-[#377CF3] hover:bg-blue-50"
        >
          PDF anonymisé candidats
        </a>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {INTERVIEW_SLOT_TIMES.map((slot) => {
          const c = bySlot.get(slot);
          return (
            <li
              key={slot}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-base font-bold text-slate-900">
                  {formatSlotLabel(slot)}
                </p>
                {!c ? (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    Libre
                  </span>
                ) : (
                  <RecruitmentStatusBadge status={c.status as RecruitmentStatus} />
                )}
              </div>

              {c ? (
                <div className="mt-3 space-y-1 text-sm text-slate-700">
                  <Link
                    href={adminRecrutementCandidat(c.id)}
                    className="font-medium text-[#377CF3] hover:underline"
                  >
                    {c.first_name} {c.last_name}
                    {c.is_example ? ' (Exemple)' : ''}
                  </Link>
                  <p>Tél. {c.phone ?? '—'}</p>
                  <p className="text-slate-500">
                    {c.interview_modality
                      ? RECRUITMENT_MODALITY[c.interview_modality]
                      : 'Modalité non renseignée'}
                  </p>
                  {!c.is_example ? <PlanningSlotBrief candidat={c} /> : null}
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => {
                      startTransition(async () => {
                        await clearInterviewSlotAction(c.id);
                        router.refresh();
                      });
                    }}
                    className="mt-2 text-xs font-medium text-slate-500 underline hover:text-slate-800"
                  >
                    Libérer le créneau
                  </button>
                </div>
              ) : (
                <AssignSlotPicker
                  disabled={pending}
                  unscheduled={unscheduled}
                  onAssign={(candidatId) => {
                    startTransition(async () => {
                      const res = await assignInterviewSlotAction(candidatId, dateYmd, slot);
                      if (!res.ok) alert(res.error);
                      else router.refresh();
                    });
                  }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="font-display text-2xl font-bold text-[#377CF3]">{value}</p>
    </div>
  );
}

function AssignSlotPicker({
  unscheduled,
  onAssign,
  disabled,
}: {
  unscheduled: RecruitmentCandidatRow[];
  onAssign: (id: string) => void;
  disabled: boolean;
}) {
  if (unscheduled.length === 0) {
    return <p className="mt-2 text-sm text-slate-500">Aucun candidat sans créneau.</p>;
  }
  return (
    <label className="mt-2 block text-sm">
      <span className="text-slate-500">Affecter</span>
      <select
        disabled={disabled}
        defaultValue=""
        className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5"
        onChange={(e) => {
          const id = e.target.value;
          if (id) onAssign(id);
          e.target.value = '';
        }}
      >
        <option value="">— Choisir —</option>
        {unscheduled.map((c) => (
          <option key={c.id} value={c.id}>
            {c.first_name} {c.last_name}
          </option>
        ))}
      </select>
    </label>
  );
}
