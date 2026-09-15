import { MessageSquareQuote } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { SCHEMA_GOOGLE_REVIEW_SUBMIT_URL } from '@/lib/schema-constants';

type Props = {
  compact?: boolean;
  className?: string;
};

/**
 * CTA avis Google — plateforme LMS (toutes les formations).
 * URL unique : SCHEMA_GOOGLE_REVIEW_SUBMIT_URL
 */
export function AvisGoogleBanner({ compact = false, className = '' }: Props) {
  if (compact) {
    return (
      <div
        className={`rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 ${className}`.trim()}
      >
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">Avis Google :</span>{' '}
          <ExternalLinkAnchor
            href={SCHEMA_GOOGLE_REVIEW_SUBMIT_URL}
            title="Ouvre le formulaire d’avis Google dans un nouvel onglet"
            className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
          >
            Déposer un avis
          </ExternalLinkAnchor>
          <span className="text-slate-600"> — 1 minute pour partager votre retour</span>
        </p>
      </div>
    );
  }

  return (
    <aside
      className={`rounded-2xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm ${className}`.trim()}
      aria-labelledby="avis-google-lms-title"
    >
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
          <MessageSquareQuote size={22} strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h2 id="avis-google-lms-title" className="font-display text-base font-bold text-slate-900">
            Avis Google
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Votre retour aide d&apos;autres professionnels du BTP à découvrir la formation. Un avis
            Google prend moins d&apos;une minute.
          </p>
          <ExternalLinkAnchor
            href={SCHEMA_GOOGLE_REVIEW_SUBMIT_URL}
            title="Ouvre le formulaire d’avis Google dans un nouvel onglet"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2A6BD9]"
          >
            Déposer un avis Google
          </ExternalLinkAnchor>
        </div>
      </div>
    </aside>
  );
}
