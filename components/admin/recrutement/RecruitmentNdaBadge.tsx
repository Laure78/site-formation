import { RECRUITMENT_NDA_STATUS, type RecruitmentNdaStatus } from '@/lib/recruitment/constants';

export function RecruitmentNdaBadge({ status }: { status: RecruitmentNdaStatus | null }) {
  if (!status) {
    return <span className="text-slate-500">—</span>;
  }
  const label = RECRUITMENT_NDA_STATUS[status] ?? status;
  const tone =
    status === 'non' || status === 'non_renseigne'
      ? 'bg-slate-100 text-slate-700'
      : status === 'en_cours' || status === 'oui_a_verifier'
        ? 'bg-amber-50 text-amber-900'
        : 'bg-emerald-50 text-emerald-900';

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${tone}`}>{label}</span>
  );
}
