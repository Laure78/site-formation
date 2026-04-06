import Link from 'next/link';
import Image from 'next/image';
import { Award } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seo';
import { PHOTOS } from '@/lib/photos';

const AUTHOR_PHOTO = PHOTOS.interventionClaude;

export function AuthorBlock({ className }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8 ${className ?? ''}`}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-200 ring-2 ring-white shadow-md">
          <Image
            src={AUTHOR_PHOTO.src}
            alt={AUTHOR_PHOTO.alt}
            width={64}
            height={64}
            className="h-full w-full object-cover object-top"
            sizes="64px"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold text-slate-900">
            {SITE_CONFIG.name}
          </h3>
          <p className="mt-1 font-medium text-[var(--accent)]">
            Formatrice en IA générative
          </p>
          <p className="mt-2 text-slate-600">
            Spécialiste de l&apos;intégration de l&apos;intelligence artificielle dans les entreprises du BTP.
            Formatrice LinkedIn Learning.
          </p>
          <Link
            href="/auteur/laure-olivie"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            <Award size={16} strokeWidth={1.5} />
            En savoir plus sur l&apos;auteure
          </Link>
        </div>
      </div>
    </div>
  );
}
