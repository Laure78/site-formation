import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { CtaVisio } from '@/components/CtaVisio';
import { SITE_SIEGE_LIEU_COURT } from '@/lib/site-config';
import {
  formatSessionDateFr,
  getCataloguePublicSessionsForSlug,
} from '@/lib/catalogue-public-sessions';

type Props = {
  formationSlug: string;
};

/**
 * Prochaine session inter MOE — Paris 12e ou fallback visio pour caler une date.
 */
export async function FormationMoeNextInterSessionBlock({ formationSlug }: Props) {
  const sessions = await getCataloguePublicSessionsForSlug(formationSlug);
  const next = sessions[0];

  return (
    <TrainingSection
      id="prochaine-session-moe"
      title="Prochaine session inter à Paris 12e"
      tone="white"
      icon={CalendarDays}
    >
      {next ? (
        <p className="text-base leading-relaxed text-slate-700">
          Prochaine date ouverte :{' '}
          <strong className="text-slate-900">{formatSessionDateFr(next.sessionEndsOn)}</strong> —{' '}
          {SITE_SIEGE_LIEU_COURT}, présentiel inter-entreprises. Inscription via la section
          «&nbsp;Sessions et inscription&nbsp;» ou{' '}
          <Link href="/contact" className="font-medium text-[#377CF3] underline hover:no-underline">
            demande de devis
          </Link>
          .
        </p>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6">
          <p className="text-base leading-relaxed text-slate-700">
            Session intra possible dès 6 participants — demandez une date.
          </p>
          <div className="mt-4">
            <CtaVisio src="fiche-moe-date" variant="primary" />
          </div>
        </div>
      )}
    </TrainingSection>
  );
}