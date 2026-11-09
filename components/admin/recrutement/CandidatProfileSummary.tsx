import { RecruitmentNdaBadge } from '@/components/admin/recrutement/RecruitmentNdaBadge';
import { RecruitmentTriageBadge } from '@/components/admin/recrutement/RecruitmentTriageBadge';
import {
  RECRUITMENT_BTP_EXPERIENCE,
  type RecruitmentBtpExperienceStatus,
  type RecruitmentNdaStatus,
  type RecruitmentTriageStatus,
} from '@/lib/recruitment/constants';
import type { RecruitmentCandidatRow } from '@/lib/recruitment/types';

export function CandidatProfileSummary({ candidat }: { candidat: RecruitmentCandidatRow }) {
  const btpLabel = candidat.btp_experience_status
    ? RECRUITMENT_BTP_EXPERIENCE[candidat.btp_experience_status as RecruitmentBtpExperienceStatus]
    : null;

  return (
    <dl className="grid gap-3 text-sm sm:grid-cols-2">
      <div>
        <dt className="font-medium text-slate-500">Métier / fonction</dt>
        <dd className="text-slate-900">{candidat.current_role ?? '—'}</dd>
      </div>
      <div>
        <dt className="font-medium text-slate-500">Statut vivier</dt>
        <dd>
          <RecruitmentTriageBadge status={candidat.triage_status as RecruitmentTriageStatus | null} />
        </dd>
      </div>
      <div>
        <dt className="font-medium text-slate-500">NDA</dt>
        <dd className="flex flex-wrap items-center gap-2">
          <RecruitmentNdaBadge status={candidat.nda_status as RecruitmentNdaStatus | null} />
          {candidat.nda ? <span className="text-slate-600">n° {candidat.nda}</span> : null}
        </dd>
      </div>
      <div>
        <dt className="font-medium text-slate-500">Disponibilité</dt>
        <dd className="text-slate-900">
          {candidat.availability_summary ?? '—'}
          {candidat.notice_period ? (
            <span className="block text-xs text-slate-500">Préavis : {candidat.notice_period}</span>
          ) : null}
        </dd>
      </div>
      {btpLabel ? (
        <div className="sm:col-span-2">
          <dt className="font-medium text-slate-500">Expérience BTP</dt>
          <dd className="text-slate-900">{btpLabel}</dd>
        </div>
      ) : null}
      {candidat.to_verify ? (
        <div className="sm:col-span-2">
          <dt className="font-medium text-slate-500">À vérifier</dt>
          <dd className="text-slate-700">{candidat.to_verify}</dd>
        </div>
      ) : null}
    </dl>
  );
}
