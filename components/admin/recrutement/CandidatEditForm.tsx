'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { upsertRecruitmentCandidatAction } from '@/app/admin/recrutement/actions';
import {
  RECRUITMENT_FORMATION_OPTIONS,
  RECRUITMENT_LEGAL_STATUS,
  RECRUITMENT_MODALITY,
  RECRUITMENT_SOURCES,
  RECRUITMENT_STATUS,
} from '@/lib/recruitment/constants';
import {
  INTERVIEW_SLOT_TIMES,
  interviewAtToDateYmd,
  interviewAtToSlotTime,
} from '@/lib/recruitment/interview-slots';
import type { RecruitmentCandidatRow } from '@/lib/recruitment/types';

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900';

export function CandidatEditForm({ candidat }: { candidat: RecruitmentCandidatRow }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const interviewDate =
    interviewAtToDateYmd(candidat.interview_at) ??
    '';
  const interviewTime = interviewAtToSlotTime(candidat.interview_at) ?? '';

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await upsertRecruitmentCandidatAction(candidat.id, fd);
          if (!res.ok) alert(res.error);
          else router.refresh();
        });
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          Prénom
          <input name="first_name" required defaultValue={candidat.first_name} className={inputClass} />
        </label>
        <label className="text-sm">
          Nom
          <input name="last_name" required defaultValue={candidat.last_name} className={inputClass} />
        </label>
        <label className="text-sm">
          Email
          <input name="email" type="email" required defaultValue={candidat.email} className={inputClass} />
        </label>
        <label className="text-sm">
          Téléphone
          <input name="phone" defaultValue={candidat.phone ?? ''} className={inputClass} />
        </label>
        <label className="text-sm">
          Ville
          <input name="city" defaultValue={candidat.city ?? ''} className={inputClass} />
        </label>
        <label className="text-sm">
          Statut juridique
          <select name="legal_status" defaultValue={candidat.legal_status ?? ''} className={inputClass}>
            <option value="">—</option>
            {Object.entries(RECRUITMENT_LEGAL_STATUS).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          SIRET
          <input name="siret" defaultValue={candidat.siret ?? ''} className={inputClass} />
        </label>
        <label className="text-sm">
          NDA éventuel
          <input name="nda" defaultValue={candidat.nda ?? ''} className={inputClass} />
        </label>
        <label className="text-sm">
          Source
          <select name="source" defaultValue={candidat.source ?? ''} className={inputClass}>
            <option value="">—</option>
            {Object.entries(RECRUITMENT_SOURCES).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Statut pipeline
          <select name="status" defaultValue={candidat.status} className={inputClass}>
            {Object.entries(RECRUITMENT_STATUS).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Étape
          <select name="stage" defaultValue={String(candidat.stage)} className={inputClass}>
            <option value="1">1 — Entretien présentation</option>
            <option value="2">2 — Cas pratique visio</option>
          </select>
        </label>
        <label className="text-sm">
          Date entretien
          <input
            name="interview_date"
            type="date"
            defaultValue={interviewDate}
            className={inputClass}
          />
        </label>
        <label className="text-sm">
          Créneau
          <select name="interview_time" defaultValue={interviewTime} className={inputClass}>
            <option value="">—</option>
            {INTERVIEW_SLOT_TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm sm:col-span-2">
          Modalité
          <select
            name="interview_modality"
            defaultValue={candidat.interview_modality ?? ''}
            className={inputClass}
          >
            <option value="">—</option>
            {Object.entries(RECRUITMENT_MODALITY).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="rounded-xl border border-slate-200 p-4">
        <legend className="px-1 text-sm font-semibold text-slate-800">Formations envisagées</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {RECRUITMENT_FORMATION_OPTIONS.map(({ id, label }) => (
            <label key={id} className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="formations"
                value={id}
                defaultChecked={candidat.formations.includes(id)}
                className="mt-1"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block text-sm">
        Parcours BTP
        <textarea
          name="btp_background"
          rows={3}
          defaultValue={candidat.btp_background ?? ''}
          className={inputClass}
        />
      </label>
      <label className="block text-sm">
        Usage de l&apos;IA
        <textarea name="ai_usage" rows={3} defaultValue={candidat.ai_usage ?? ''} className={inputClass} />
      </label>
      <label className="block text-sm">
        Disponibilités (2027, mobilité IDF, contraintes)
        <textarea
          name="availability_notes"
          rows={2}
          defaultValue={candidat.availability_notes ?? ''}
          className={inputClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm sm:col-span-3">
          Lien Zoom
          <input name="zoom_link" defaultValue={candidat.zoom_link ?? ''} className={inputClass} />
        </label>
        <label className="text-sm">
          ID Zoom
          <input name="zoom_id" defaultValue={candidat.zoom_id ?? ''} className={inputClass} />
        </label>
        <label className="text-sm">
          Code Zoom
          <input name="zoom_passcode" defaultValue={candidat.zoom_passcode ?? ''} className={inputClass} />
        </label>
        <label className="text-sm">
          Dernier contact
          <input
            name="last_contact_at"
            type="datetime-local"
            defaultValue={toDatetimeLocal(candidat.last_contact_at)}
            className={inputClass}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? 'Enregistrement…' : 'Enregistrer'}
      </button>
    </form>
  );
}

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
