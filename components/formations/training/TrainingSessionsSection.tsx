import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import {
  formatSessionDateFr,
  getCataloguePublicSessionsForSlug,
  type CataloguePublicSession,
} from '@/lib/catalogue-public-sessions';
import { trainingDevisHref } from '@/lib/training-page-helpers';

type Props = {
  formationTitle: string;
  formationSlug: string;
};

function SessionRow({ session, formationTitle }: { session: CataloguePublicSession; formationTitle: string }) {
  const contactHref = `${LINKS.contact}?objet=inscription&formation=${encodeURIComponent(formationTitle)}&message=${encodeURIComponent(`Inscription session du ${formatSessionDateFr(session.sessionEndsOn)}`)}`;

  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-semibold text-slate-900">{formatSessionDateFr(session.sessionEndsOn)}</p>
        <p className="mt-1 text-sm text-slate-600">
          Présentiel · Île-de-France · Inter-entreprises
        </p>
      </div>
      <Link href={contactHref} className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 shrink-0 items-center justify-center px-5 py-2.5 text-sm`}>
        S&apos;inscrire
      </Link>
    </li>
  );
}

/**
 * Sessions inter — dates issues du LMS (`courses.session_ends_on`) lorsqu’elles sont publiées.
 */
export async function TrainingSessionsSection({ formationTitle, formationSlug }: Props) {
  const sessions = await getCataloguePublicSessionsForSlug(formationSlug);
  const contactHref = `${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}&message=${encodeURIComponent('Demande de dates inter-entreprises')}`;
  const devisHref = trainingDevisHref(formationTitle);

  return (
    <>
      <TrainingSection
        id={TRAINING_ANCHOR.sessions}
        title="Sessions et inscription"
        description="Dates en présentiel en Île-de-France — inscription après confirmation des places."
        tone="white"
        icon={CalendarDays}
      >
        {sessions.length > 0 ? (
          <ul className="space-y-3">
            {sessions.map((s) => (
              <SessionRow key={s.courseId} session={s} formationTitle={formationTitle} />
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
            <p className="text-base text-slate-700">
              Contactez-nous pour connaître les prochaines dates ou organiser une formation dans
              votre entreprise.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href={contactHref} className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 px-5 py-2.5 text-sm`}>
                Demander une date
              </Link>
              <Link href={LINKS.prendreRdv} className="text-sm font-semibold text-[#377CF3] hover:underline">
                Échanger sur mon besoin
              </Link>
            </div>
          </div>
        )}
      </TrainingSection>

      <div className="border-b border-slate-200 bg-slate-50 px-4 py-6 md:py-8">
        <div className="mx-auto flex max-w-[78rem] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-lg font-semibold text-slate-900">Sessions et inscription</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a href={`#${TRAINING_ANCHOR.sessions}`} className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm`}>
              Consulter les dates
            </a>
            <Link href={devisHref} className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm`}>
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
