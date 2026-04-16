import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { AUTHOR_HEADSHOT_IMAGE_CLASS } from '@/lib/author-headshot';
import { ExternalLink } from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKEDIN_PROFILE_URL } from '@/lib/seo';
import { PHOTOS } from '@/lib/photos';
import { QualiopiWordmark } from '@/components/QualiopiLogo';
import { formatProfessionalsTrainedCount } from '@/lib/constants';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const AUTHOR_PHOTO = PHOTOS.siteAvatar;

const JOB_TITLE = 'Formatrice IA & ChatGPT — Spécialiste BTP';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Laure Olivié',
  jobTitle: JOB_TITLE,
  sameAs: [
    LINKEDIN_PROFILE_URL,
    'https://www.linkedin.com/learning/instructors/laure-olivie',
  ],
};

type Props = {
  className?: string;
};

export function ArticleAuthor({ className }: Props) {
  return (
    <aside
      className={`rounded-r-xl border-l-4 border-[#377CF3] bg-[#F2F2F2] p-6 md:p-8 ${poppins.className} ${className ?? ''}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md">
          <Image
            src={AUTHOR_PHOTO.src}
            alt={AUTHOR_PHOTO.alt}
            title="Laure Olivié — OFC Création d'Entreprise, formatrice IA BTP"
            fill
            className={AUTHOR_HEADSHOT_IMAGE_CLASS}
            sizes="96px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-slate-900">Laure Olivié</p>
          <p className="mt-1 text-sm font-medium text-[#377CF3]">{JOB_TITLE}</p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
            <p>
              Ancienne conductrice de travaux reconvertie en formatrice IA, Laure Olivié a formé
              plus de {formatProfessionalsTrainedCount()} professionnels du BTP à l&apos;utilisation de ChatGPT et
              Claude AI.
            </p>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Organisme certifié</span>
              <QualiopiWordmark />
              <span>, formations finançables par Constructys.</span>
            </p>
            <p>Instructrice officielle LinkedIn Learning.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#377CF3] hover:underline"
            >
              <ExternalLink size={16} strokeWidth={1.5} aria-hidden />
              LinkedIn
            </a>
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#377CF3] hover:underline"
            >
              <ExternalLink size={16} strokeWidth={1.5} aria-hidden />
              Réservez votre visio découverte
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
