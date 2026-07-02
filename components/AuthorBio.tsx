'use client';

import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { CTACalendly } from '@/components/CTACalendly';
import {
  SCHEMA_CONTACT,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { AUTHOR_HEADSHOT_OBJECT_POSITION } from '@/lib/author-headshot';
import { getLaureOlivieAuthorBioBody } from '@/lib/laure-olivie-profile';

const LINKEDIN_LEARNING_INSTRUCTOR =
  'https://www.linkedin.com/learning/instructors/laure-olivie' as const;

const MALT_PROFILE_URL = 'https://www.malt.fr/profile/laureoli' as const;

function buildAuthorBioPersonSchema(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const siren = SCHEMA_CONTACT.siretDigits.slice(0, 9);
  const portraitUrl = `${base}${PHOTOS.siteAvatar.src}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SCHEMA_PERSON_LAURE.name,
    jobTitle:
      "Formatrice IA pour le BTP, fondatrice et présidente d'OFC Création d'Entreprise",
    url: `${base}${LINKS.aPropos}`,
    image: portraitUrl,
    sameAs: [
      SCHEMA_LINKEDIN_PROFILE_URL,
      LINKEDIN_LEARNING_INSTRUCTOR,
      MALT_PROFILE_URL,
      `https://annuaire-entreprises.data.gouv.fr/entreprise/${siren}`,
    ],
    worksFor: {
      '@type': 'Organization',
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
    },
    alumniOf: 'ALIA BTP (2017-2024)',
    knowsAbout: ['Formation IA pour les pros du BTP', 'ChatGPT', 'Claude AI', 'Construction', 'BTP'],
  };
}

export type AuthorBioProps = {
  className?: string;
  /** Évite un id JSON-LD en doublon si plusieurs blocs sur la même vue. */
  schemaScriptId?: string;
};

/**
 * Bio auteure — bas d’article (E-E-A-T / GEO) + JSON-LD `Person`.
 */
export default function AuthorBio({
  className,
  schemaScriptId = 'author-bio-schema',
}: AuthorBioProps) {
  const pathname = usePathname();
  const calendlyPage =
    pathname == null || pathname === '/'
      ? 'site'
      : pathname.replace(/^\/+|\/+$/g, '').replace(/\//g, '-');

  const schema = buildAuthorBioPersonSchema();

  return (
    <aside
      className={`mt-12 rounded-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] p-6 ${className ?? ''}`}
      aria-labelledby="author-bio-heading"
    >
      <Script
        id={schemaScriptId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="flex flex-col items-start gap-6 sm:flex-row">
        <Image
          src={PHOTOS.siteAvatar.src}
          alt={PHOTOS.siteAvatar.alt}
          width={120}
          height={120}
          className={`h-[120px] w-[120px] shrink-0 rounded-full border-2 border-white object-cover ${AUTHOR_HEADSHOT_OBJECT_POSITION} shadow-md`}
          sizes="120px"
        />
        <div className="min-w-0 flex-1">
          <h3
            id="author-bio-heading"
            className="mb-2 text-lg font-semibold text-slate-900"
          >
            À propos de l&apos;auteure
          </h3>
          <p className="mb-4 leading-relaxed text-slate-700">
            <strong>{SCHEMA_PERSON_LAURE.name}</strong> {getLaureOlivieAuthorBioBody()}{' '}
            <strong>Instructrice officielle LinkedIn Learning.</strong>
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <CTACalendly
              page={calendlyPage}
              ctaPosition="footer"
              ctaId="author-bio"
              utmSource="site"
              utmMedium="cta"
              utmCampaign="author-bio"
              className="inline-block rounded-lg bg-[#377CF3] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#2563EB]"
              unstyled
            >
              Réservez votre visio découverte gratuite
            </CTACalendly>
            <Link
              href={LINKS.aPropos}
              className="text-[#377CF3] underline hover:no-underline"
            >
              Voir le parcours complet →
            </Link>
            <a
              href={SCHEMA_LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[#377CF3] underline hover:no-underline"
            >
              <ExternalLink size={14} strokeWidth={1.5} aria-hidden />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
