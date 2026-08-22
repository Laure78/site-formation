import Image from 'next/image';
import Link from 'next/link';
import { CtaButton } from '@/components/CtaButton';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { AUTHOR_HEADSHOT_OBJECT_POSITION } from '@/lib/author-headshot';
import { SCHEMA_LINKEDIN_PROFILE_URL, SCHEMA_PERSON_LAURE } from '@/lib/schema-constants';

export type AuthorBioProps = {
  className?: string;
  /** Origin GA4 pour le CTA RDV. */
  origin?: string;
  /** Titre du bloc (accessibilité). */
  heading?: string;
};

const BIO_LINES = [
  'Plus de 10 ans de terrain BTP, dont une expérience comme conductrice de travaux.',
  'Instructrice officielle LinkedIn Learning — cours IA appliqués au bâtiment.',
  "OFC Création d'Entreprise, organisme certifié Qualiopi — formations en présentiel, Île-de-France uniquement.",
] as const;

/**
 * Bio auteure réutilisable — blog, pages métier, À propos (E-E-A-T / GEO).
 * JSON-LD Person global : `GlobalSiteJsonLd` dans `app/layout.tsx` (pas de doublon ici).
 */
export function AuthorBio({
  className,
  origin = 'author-bio',
  heading = "À propos de l'auteure",
}: AuthorBioProps) {
  return (
    <aside
      className={`mt-12 rounded-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] p-6${className ? ` ${className}` : ''}`}
      aria-labelledby="author-bio-heading"
    >
      <div className="flex flex-col items-start gap-6 sm:flex-row">
        <Image
          src={PHOTOS.siteAvatar.src}
          alt={PHOTOS.siteAvatar.alt}
          width={120}
          height={120}
          className={`h-[120px] w-[120px] shrink-0 rounded-full border-2 border-white object-cover ${AUTHOR_HEADSHOT_OBJECT_POSITION} shadow-md`}
          sizes="120px"
          quality={70}
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h2 id="author-bio-heading" className="text-lg font-semibold text-slate-900">
            {heading}
          </h2>
          <p className="mt-2 font-semibold text-slate-900">
            {SCHEMA_PERSON_LAURE.name}
            <span className="font-normal text-slate-600">
              {' '}
              — Formatrice IA pour les professionnels du BTP
            </span>
          </p>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-slate-700 md:text-[0.95rem]">
            {BIO_LINES.map((line) => (
              <li key={line.slice(0, 32)}>{line}</li>
            ))}
          </ul>
          <div className="mt-5">
            <CtaButton origin={origin} className="w-full sm:w-auto" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={LINKS.aPropos}
              className="font-medium text-[#377CF3] underline decoration-[#377CF3]/30 hover:decoration-[#377CF3]"
            >
              Parcours complet →
            </Link>
            <a
              href={SCHEMA_LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="me noopener"
              className="inline-flex items-center gap-1.5 font-medium text-slate-600 underline decoration-slate-300 hover:text-[#377CF3] hover:decoration-[#377CF3]/40"
            >
              <LinkedInIcon className="h-4 w-4 shrink-0" />
              Suivre Laure Olivié sur LinkedIn
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AuthorBio;
