import { Quote } from 'lucide-react';

/**
 * Études de cas — cartes témoignages (texte source inchangé).
 */
export function ClaudeBtpCaseStudies() {
  return (
    <section className="scroll-mt-24" aria-labelledby="etudes-cas">
      <h2 id="etudes-cas" className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
        Retours terrain (extraits)
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3 md:items-stretch">
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#377CF3]" aria-hidden />
          <h3 className="pl-3 font-display text-lg font-bold text-[#0F172A]">FFB Grand Paris — mémoires techniques</h3>
          <Quote className="mt-4 h-8 w-8 text-[#CBD5E1]" aria-hidden />
          <p className="mt-3 flex-1 pl-1 text-sm italic leading-relaxed text-[#475569]">
            Session de 8 conducteurs de travaux (mars 2026). Après trois semaines de mise en pratique, le temps moyen de
            premier jet d&apos;un mémoire technique est passé d&apos;environ 2 jours à 3 h 30 sur des dossiers comparables,
            avec une qualité perçue équivalente ou supérieure par la MOA sur quatre dossiers remis.
          </p>
          <div className="mt-6 border-t border-[#F1F5F9] pt-4">
            <p className="text-center font-display text-sm font-bold text-[#1E40AF]">2 jours → 3 h 30</p>
          </div>
        </article>

        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#10B981]" aria-hidden />
          <h3 className="pl-3 font-display text-lg font-bold text-[#0F172A]">PME second œuvre — veille AO</h3>
          <Quote className="mt-4 h-8 w-8 text-[#CBD5E1]" aria-hidden />
          <p className="mt-3 flex-1 pl-1 text-sm italic leading-relaxed text-[#475569]">
            Équipe de 4 personnes : tâche Cowork planifiée chaque matin sur les alertes marchés publics — la veille manuelle
            est passée d&apos;environ 45 min à quelques minutes de contrôle, avec tableau de priorisation partagé.
          </p>
          <div className="mt-6 border-t border-[#F1F5F9] pt-4">
            <p className="text-center font-display text-sm font-bold text-[#047857]">45 min → quelques minutes</p>
          </div>
        </article>

        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#8B5CF6]" aria-hidden />
          <h3 className="pl-3 font-display text-lg font-bold text-[#0F172A]">CSFE — comptes rendus de chantier</h3>
          <Quote className="mt-4 h-8 w-8 text-[#CBD5E1]" aria-hidden />
          <p className="mt-3 flex-1 pl-1 text-sm italic leading-relaxed text-[#475569]">
            Standardisation du skill « CR chantier » : les notes dictées sont transformées en livrable homogène (tableau
            d&apos;actions, réserves, prochaine réunion) — temps de mise en forme divisé par plus de dix sur la série suivie
            en formation.
          </p>
          <div className="mt-6 border-t border-[#F1F5F9] pt-4">
            <p className="text-center font-display text-sm font-bold text-[#7C3AED]">Mise en forme ÷10+</p>
          </div>
        </article>
      </div>
    </section>
  );
}
