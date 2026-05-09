import Link from 'next/link';
import { Download, Sparkles } from 'lucide-react';
import { SKILL_IA_LEAD_MAGNET } from '@/lib/lead-magnet-skill-ia';
import { LINKS } from '@/lib/internal-links';

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
  href = LINKS.skillIaConducteurTravaux,
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
        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-end">
          <a
            href={SKILL_IA_LEAD_MAGNET.pdfPublicPath}
            download={SKILL_IA_LEAD_MAGNET.fileName}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#2d66d6]"
          >
            <Download className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            Télécharger le PDF
          </a>
          <Link href={href} className="text-center text-xs font-medium text-[#377CF3] underline underline-offset-2 hover:text-[#2d66d6] sm:text-right">
            Page ressource & inscription
          </Link>
        </div>
      </div>
    </aside>
  );
}
