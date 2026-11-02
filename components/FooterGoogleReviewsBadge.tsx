import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { GoogleGLogo } from '@/components/avis-clients/GoogleGLogo';
import { SCHEMA_GOOGLE_REVIEWS_VIEW_URL } from '@/lib/schema-constants';

/** Pastille Avis Google — footer maquette (sans note inventée). */
export function FooterGoogleReviewsBadge() {
  return (
    <ExternalLinkAnchor
      href={SCHEMA_GOOGLE_REVIEWS_VIEW_URL}
      title="Consulter les avis Google sur la fiche OFC Création d’Entreprise"
      className="inline-flex max-w-full items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm transition hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <GoogleGLogo size={20} className="shrink-0" />
      <span className="min-w-0 text-left">
        <span className="block text-xs font-semibold leading-tight text-[#101936]">Avis Google</span>
        <span className="block text-[11px] leading-snug text-[#101936]/75">Consulter nos avis</span>
      </span>
    </ExternalLinkAnchor>
  );
}
