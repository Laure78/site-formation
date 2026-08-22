import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Building2 } from 'lucide-react';
import {
  CataloguePriceBadge,
} from '@/components/formations/CataloguePriceBadge';
import { FormationProgrammePdfDownloadBanner } from '@/components/formations/FormationProgrammePdfDownloadBanner';
import { FormationProgrammePdfViewer } from '@/components/formations/FormationProgrammePdfViewer';
import { OfcPromoVideoEmbed } from '@/components/media/OfcPromoVideoEmbed';
import { getFormationCatalogueByRef } from '@/lib/formations-catalogue-display';

/**
 * Hero standard des fiches formation : 2 colonnes (contenu + photo + « En résumé »),
 * aligné sur la page « L'IA au service du bâtiment ».
 */
export function FormationCourseHero({
  refLine,
  title,
  subtitle,
  children,
  badges,
  ctas,
  footerLinks,
  image,
  summaryTitle = 'En résumé',
  summaryIcon: SummaryIcon = Building2,
  summaryItems,
  catalogueRef,
  heroVisual = 'promo-video',
}: {
  refLine: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  badges?: string[];
  ctas: React.ReactNode;
  footerLinks?: React.ReactNode;
  /** Colonne droite — si omis, vidéo promo par défaut (`heroVisual="catalogue"` pour l’affiche catalogue). */
  image?: React.ReactNode;
  /** Visuel hero par défaut : vidéo promo ; `catalogue` = affiche NIV si `catalogueRef` est renseigné. */
  heroVisual?: 'promo-video' | 'catalogue';
  summaryTitle?: string;
  summaryIcon?: LucideIcon;
  summaryItems: string[];
  /** Réf catalogue — affiche le tarif en évidence sous le titre (NIV-01 à NIV-05). */
  catalogueRef?: string;
}) {
  const catalogueEntry = catalogueRef ? getFormationCatalogueByRef(catalogueRef) : undefined;
  const resolvedImage =
    image ??
    (heroVisual === 'catalogue' && catalogueEntry ? (
      <FormationHeroPhoto
        src={catalogueEntry.visuel.src}
        alt={catalogueEntry.visuel.alt}
        width={catalogueEntry.visuel.width}
        height={catalogueEntry.visuel.height}
        title={
          'title' in catalogueEntry.visuel && typeof catalogueEntry.visuel.title === 'string'
            ? catalogueEntry.visuel.title
            : undefined
        }
        priority
      />
    ) : (
      <OfcPromoVideoEmbed variant="heroColumn" />
    ));
  return (
    <>
    <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1 lg:max-w-[min(100%,42rem)]">
            <Link
              href="/formations"
              className="text-sm text-[var(--accent)] hover:underline"
            >
              ← Retour au catalogue
            </Link>
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-slate-500">
              {refLine}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.65rem] lg:leading-tight">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 text-lg font-medium text-slate-700">{subtitle}</p>
            ) : null}
            {catalogueEntry ? (
              <div className="mt-5">
                <CataloguePriceBadge
                  level={catalogueEntry.level}
                  prixHT={catalogueEntry.prixHT}
                  variant="hero"
                />
              </div>
            ) : null}
            <div className="mt-6 max-w-xl text-slate-600 [&_strong]:font-semibold [&_a]:font-medium [&_a]:text-[var(--accent)] [&_a]:hover:underline">
              {children}
            </div>
            {badges && badges.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2 text-sm text-slate-700">
                {badges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1"
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{ctas}</div>
            {footerLinks ? (
              <div className="mt-4 flex flex-wrap gap-4 text-sm">{footerLinks}</div>
            ) : null}
            {catalogueRef ? (
              <p className="mt-4 text-sm">
                <a href="#informations-pratiques" className="font-medium text-[var(--accent)] hover:underline">
                  Informations réglementaires Qualiopi (indicateur 1)
                </a>
              </p>
            ) : null}
          </div>
          <div className="w-full shrink-0 lg:w-[400px]">
            {resolvedImage}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-[var(--accent)]">
                <SummaryIcon size={22} strokeWidth={1.5} aria-hidden />
                <h2 className="font-display text-lg font-bold text-slate-900">{summaryTitle}</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {summaryItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    {catalogueEntry ? (
      <>
        <FormationProgrammePdfDownloadBanner
          pdfHref={catalogueEntry.programmePdfHref}
          catalogueRef={catalogueEntry.ref}
          formationTitle={catalogueEntry.title}
        />
        <FormationProgrammePdfViewer
          pdfHref={catalogueEntry.programmePdfHref}
          catalogueRef={catalogueEntry.ref}
          formationTitle={catalogueEntry.title}
        />
      </>
    ) : null}
    </>
  );
}

/** Photo héro droite (ratio naturel, bords arrondis) — sans lien externe. */
export function FormationHeroPhoto({
  src,
  alt,
  width,
  height,
  priority,
  title,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  /** Info complémentaire au survol — ne pas dupliquer l'alt. */
  title?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        className="h-auto w-full object-cover"
        sizes="(max-width: 1024px) 100vw, 400px"
        priority={priority}
      
        quality={75}/>
    </div>
  );
}
