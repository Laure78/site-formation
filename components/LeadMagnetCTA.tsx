import Link from 'next/link';
import { Sparkles } from 'lucide-react';

type Props = {
  title?: string;
  description?: string;
  href?: string;
};

/**
 * Encart CTA vers le lead magnet Skill IA — articles blog / pages longues.
 */
export function LeadMagnetCTA({
  title = 'Créez votre 1er Skill IA en 30 min',
  description = 'Tutoriel + 5 cas d’usage BTP + template prêt à copier-coller.',
  href = '/ressources/skill-ia-conducteur-travaux',
}: Props) {
  return (
    <aside
      className="my-10 rounded-2xl border-2 border-[#377CF3] bg-[#D4E3FC]/50 p-6 md:p-8"
      aria-labelledby="lead-magnet-skill-ia-title"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#377CF3]">
            <Sparkles size={18} strokeWidth={1.75} aria-hidden />
            Guide gratuit
          </p>
          <h3 id="lead-magnet-skill-ia-title" className="mt-2 font-display text-xl font-bold text-slate-900">
            {title}
          </h3>
          <p className="mt-2 text-slate-700">{description}</p>
        </div>
        <Link
          href={href}
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#377CF3] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#2d66d6]"
        >
          Télécharger le guide
        </Link>
      </div>
    </aside>
  );
}
