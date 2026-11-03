export function Phase2Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <h2 className="font-display text-xl font-bold text-slate-900">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">{description}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#377CF3]">Phase 2 — à venir</p>
    </div>
  );
}
