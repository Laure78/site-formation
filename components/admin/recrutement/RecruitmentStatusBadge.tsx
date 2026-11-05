import {
  RECRUITMENT_STATUS,
  recruitmentStatusTone,
  type RecruitmentStatus,
} from '@/lib/recruitment/constants';

const TONE_CLASS = {
  green: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  orange: 'bg-amber-100 text-amber-900 ring-amber-200',
  red: 'bg-red-100 text-red-800 ring-red-200',
  gray: 'bg-slate-100 text-slate-700 ring-slate-200',
} as const;

export function RecruitmentStatusBadge({ status }: { status: RecruitmentStatus }) {
  const tone = recruitmentStatusTone(status);
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${TONE_CLASS[tone]}`}
    >
      {RECRUITMENT_STATUS[status]}
    </span>
  );
}
