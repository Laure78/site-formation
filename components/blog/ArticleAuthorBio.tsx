import Image from 'next/image';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import { AUTHOR_HEADSHOT_OBJECT_POSITION } from '@/lib/author-headshot';
import { getLaureOlivieArticleAuthorBio } from '@/lib/laure-olivie-profile';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';

const PORTRAIT_SRC = PHOTOS.siteAvatar.src;

type ArticleAuthorBioProps = {
  className?: string;
};

/**
 * Encart auteur — bas d’article blog (E-E-A-T).
 */
export function ArticleAuthorBio({ className }: ArticleAuthorBioProps = {}) {
  return (
    <>
      <hr className="mt-12 border-slate-200" aria-hidden="true" />
      <aside
        className={`mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6${className ? ` ${className}` : ''}`}
        aria-labelledby="article-author-bio-name"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <Image
            src={PORTRAIT_SRC}
            alt={PHOTOS.siteAvatar.alt}
            width={80}
            height={80}
            className={`h-20 w-20 shrink-0 rounded-full border border-slate-200 object-cover ${AUTHOR_HEADSHOT_OBJECT_POSITION}`}
            sizes="80px"
          />
          <div className="min-w-0 flex-1">
            <p
              id="article-author-bio-name"
              className="text-lg font-semibold text-slate-900"
            >
              Laure Olivié
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              Formatrice IA pour les professionnels du BTP — OFC Création d&apos;Entreprise
              (Qualiopi)
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              {getLaureOlivieArticleAuthorBio()}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <Link
                href={LINKS.aPropos}
                className="font-medium text-[#377CF3] underline decoration-[#377CF3]/30 hover:decoration-[#377CF3]"
              >
                En savoir plus →
              </Link>
              <a
                href={SCHEMA_LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[#377CF3] underline decoration-[#377CF3]/30 hover:decoration-[#377CF3]"
                aria-label="Profil LinkedIn de Laure Olivié"
              >
                <Linkedin size={18} strokeWidth={1.5} aria-hidden />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
