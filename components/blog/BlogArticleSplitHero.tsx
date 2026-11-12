import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type Props = {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  /** Lien PDF absolu ou relatif — absent = pas de bouton téléchargement. */
  pdfHref?: string;
  pdfHint?: string;
  sommaireAnchor?: string;
};

/**
 * En-tête article : introduction à gauche, visuel métier à droite (desktop).
 */
export function BlogArticleSplitHero({
  imageSrc,
  imageAlt,
  children,
  pdfHref,
  pdfHint = 'PDF · 10 pages',
  sommaireAnchor = 'quelles-taches-administratives-du-btp-peut-on-simplifier-avec-lia',
}: Props) {
  return (
    <div className="not-prose mt-2 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
      <div className="flex flex-col gap-4">
        <div className="space-y-4 text-base leading-relaxed text-slate-700">{children}</div>
        <div className="flex flex-wrap gap-3">
          {pdfHref ? (
            <a
              href={pdfHref}
              download
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold`}
            >
              <Download size={18} strokeWidth={1.75} aria-hidden />
              Télécharger le guide PDF
            </a>
          ) : null}
          <Link
            href={`#${sommaireAnchor}`}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm font-semibold`}
          >
            Voir les 7 tâches
          </Link>
        </div>
        {pdfHref ? (
          <p className="text-xs text-slate-500">{pdfHint}</p>
        ) : null}
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}
