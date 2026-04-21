type Props = {
  badge: string;
  title: string;
  stats: string;
};

export function CaseStudyCard({ badge, title, stats }: Props) {
  return (
    <article className="rounded-[20px] border border-[#E2E8F0] bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#BFDBFE] hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)]">
      <span className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
        {badge}
      </span>
      <h3 className="mt-4 text-2xl font-bold text-[#0F172A]">{title}</h3>
      <p className="mt-3 text-base font-medium text-[#334155]">{stats}</p>
    </article>
  );
}
