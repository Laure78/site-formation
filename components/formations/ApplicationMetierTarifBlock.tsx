type Props = {
  duree: string;
  className?: string;
  /** @deprecated Ignoré — parcours désormais sur devis. */
  tarifKey?: string;
};

/** Bloc tarif parcours applications métier — sur devis (HT / participant). */
export function ApplicationMetierTarifBlock({ duree, className = '' }: Props) {
  return (
    <div
      className={`rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent-soft)]/50 px-5 py-5 ${className}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
        Tarif — session {duree}
      </p>
      <p className="mt-2 font-display text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
        Sur devis
      </p>
      <p className="mt-1 text-sm font-medium text-slate-700">tarif HT / participant</p>
      <p className="mt-3 text-sm text-slate-600">
        Devis personnalisé selon l&apos;effectif et le niveau du parcours.
      </p>
    </div>
  );
}
