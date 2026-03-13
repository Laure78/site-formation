/**
 * Bloc « short answer » pour GEO — réponse directe en haut de page.
 * Optimisé pour ChatGPT, Perplexity, Google AI Overviews.
 */
export function ShortAnswerBlock({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-5 md:p-6"
      aria-label="En bref"
    >
      <p className="text-lg font-medium leading-relaxed text-slate-800 md:text-xl">
        {children}
      </p>
    </section>
  );
}
