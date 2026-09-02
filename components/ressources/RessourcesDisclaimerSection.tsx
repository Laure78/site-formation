export function RessourcesDisclaimerSection() {
  return (
    <section
      aria-labelledby="ressources-disclaimer-heading"
      className="border-t border-slate-200 bg-white py-10 md:py-12"
    >
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 md:p-8">
          <h2
            id="ressources-disclaimer-heading"
            className="font-display text-lg font-bold text-slate-900 md:text-xl"
          >
            L&apos;IA prépare. Le professionnel valide.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Les modèles et assistants facilitent la préparation des documents. Ils ne remplacent pas la vérification
            des pièces du marché, des textes applicables, des exigences du chantier ni la validation par le
            professionnel responsable.
          </p>
        </div>
      </div>
    </section>
  );
}
