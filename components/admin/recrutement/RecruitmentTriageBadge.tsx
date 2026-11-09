import { RECRUITMENT_TRIAGE_STATUS, type RecruitmentTriageStatus } from '@/lib/recruitment/constants';

export function RecruitmentTriageBadge({ status }: { status: RecruitmentTriageStatus | null }) {
  if (!status) {
    return <span className="text-slate-500">—</span>;
  }
  const label = RECRUITMENT_TRIAGE_STATUS[status] ?? status;
  const tone =
    status === 'identifie' ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900';

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${tone}`}>{label}</span>
  );
}
