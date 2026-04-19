import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKEDIN_PROFILE_URL, SITE_CONFIG } from '@/lib/seo';
import { formatProfessionalsTrainedCount } from '@/lib/constants';
import { PHOTOS } from '@/lib/photos';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const JOB_TITLE_MICRO = 'formatrice IA et ChatGPT spécialisée BTP';

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');
const personProfileUrl = `${baseUrl}/a-propos`;
const authorImageAbsoluteUrl = `${baseUrl}${PHOTOS.linkedinGraz.src}`;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Laure Olivié',
  jobTitle: 'Formatrice IA et ChatGPT spécialisée BTP',
  url: personProfileUrl,
  image: authorImageAbsoluteUrl,
  sameAs: [
    LINKEDIN_PROFILE_URL,
    'https://www.linkedin.com/learning/instructors/laure-olivie',
  ],
  worksFor: {
    '@type': 'Organization',
    name: SITE_CONFIG.legalName,
    url: `${baseUrl}/a-propos`,
  },
};

type Props = {
  className?: string;
};

/**
 * Bio auteure — bas d’article blog (équivalent bloc single.php WordPress).
 * Microdata schema.org/Person + JSON-LD alignés.
 */
export function ArticleAuthor({ className }: Props) {
  return (
    <aside
      className={`ofc-author-bio my-[60px] flex flex-col items-center gap-8 rounded-lg border-l-4 border-[#377CF3] bg-[#F2F2F2] px-6 py-10 text-center md:flex-row md:items-start md:gap-[30px] md:px-10 md:text-left ${poppins.className} ${className ?? ''}`}
      itemScope
      itemType="https://schema.org/Person"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <meta itemProp="url" content={personProfileUrl} />
      <div className="relative mx-auto h-[120px] w-[120px] shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md md:mx-0">
        <Image
          src={PHOTOS.linkedinGraz.src}
          alt="Laure Olivié — Formatrice IA BTP"
          width={120}
          height={120}
          className="h-full w-full object-cover object-top"
          itemProp="image"
          sizes="120px"
        />
      </div>
      <div className="author-info min-w-0 flex-1 md:text-left">
        <h3 className="m-0 mb-4 font-display text-xl font-semibold text-[#377CF3]">
          À propos de l&apos;auteure
        </h3>
        <p className="mb-5 text-[15px] leading-[1.7] text-slate-800">
          <strong itemProp="name">Laure Olivié</strong> est{' '}
          <span itemProp="jobTitle">{JOB_TITLE_MICRO}</span>. Elle a formé plus de{' '}
          <strong>{formatProfessionalsTrainedCount()} professionnels du bâtiment</strong> (FFB, CSFE,
          CAPEB, CNAM, Lefebvre Dalloz). Son organisme{' '}
          <Link
            href="/a-propos"
            className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
          >
            {SITE_CONFIG.legalName}
          </Link>{' '}
          est certifié Qualiopi et finançable Constructys.
        </p>
        <p className="mb-5">
          <a
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-calendly
            className="cta-calendly-inline inline-block rounded-lg bg-[#377CF3] px-6 py-3 text-center text-sm font-semibold text-white !text-white shadow-sm transition hover:bg-[#2a62c8] hover:shadow-md md:text-base motion-safe:hover:-translate-y-0.5"
          >
            Réservez votre visio découverte gratuite
          </a>
        </p>
        <div className="author-social">
          <a
            href={LINKEDIN_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold text-[#377CF3] hover:underline"
          >
            <span className="inline-flex items-center gap-1.5">
              <ExternalLink size={14} strokeWidth={1.5} aria-hidden />
              LinkedIn
            </span>
          </a>
        </div>
      </div>
    </aside>
  );
}
