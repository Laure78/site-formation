import { TESTIMONIALS_MOE } from '@/lib/testimonials-moe';
import { TrainingSection } from '@/components/formations/training/TrainingSection';

/**
 * Avis cabinets MOE — masqué si le tableau est vide (Qualiopi / vérité éditoriale).
 */
export function FormationMoeCabinetTestimonialsSection() {
  if (TESTIMONIALS_MOE.length === 0) return null;

  return (
    <TrainingSection
      id="avis-cabinets-moe"
      title="Avis de cabinets de maîtrise d’œuvre"
      description="Retours terrain après formation — organisations citées avec accord écrit."
      tone="muted"
    >
      <ul className="space-y-6">
        {TESTIMONIALS_MOE.map((item) => (
          <li
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
          >
            <blockquote className="text-base leading-relaxed text-slate-800">
              «&nbsp;{item.quote}&nbsp;»
            </blockquote>
            <p className="mt-3 text-sm font-semibold text-slate-900">{item.organization}</p>
            {item.role ? <p className="text-sm text-slate-600">{item.role}</p> : null}
          </li>
        ))}
      </ul>
    </TrainingSection>
  );
}