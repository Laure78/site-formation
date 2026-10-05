/** Illustration UI — notes chantier → IA → devis structuré (sans prix inventés). */
export function IaDevisHeroDemo() {
  return (
    <div
      className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-6"
      aria-label="Démonstration : de notes chantier à un devis structuré"
    >
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
        Notes chantier → IA → Devis structuré
      </p>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Entrée</p>
        <ul className="mt-2 space-y-1 text-sm leading-relaxed text-slate-700">
          <li>Rénovation salle de bain 8 m²</li>
          <li>Dépose existant</li>
          <li>Douche italienne</li>
          <li>Faïence</li>
          <li>Plomberie</li>
        </ul>
      </div>

      <div className="my-3 flex justify-center" aria-hidden>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]">
          ↓
        </span>
      </div>

      <div className="rounded-xl border border-[var(--accent)]/25 bg-[var(--accent-soft)]/60 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">Devis</p>
          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
            Prix : à compléter par l’entreprise
          </span>
        </div>
        <ol className="mt-3 space-y-1.5 text-sm text-slate-800">
          <li>01 — Dépose et évacuation</li>
          <li>02 — Préparation des supports</li>
          <li>03 — Réseaux plomberie</li>
          <li>04 — Étanchéité</li>
          <li>05 — Pose équipements</li>
          <li>06 — Finitions</li>
        </ol>
      </div>

      <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white px-3 py-2 text-center text-xs font-medium leading-snug text-slate-600">
        L’IA prépare.
        <br />
        Le professionnel valide.
      </p>
    </div>
  );
}
