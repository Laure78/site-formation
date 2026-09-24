import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Building2 } from 'lucide-react';
import { FormationProgrammePdfDownloadBanner } from '@/components/formations/FormationProgrammePdfDownloadBanner';
import { FormationProgrammePdfViewer } from '@/components/formations/FormationProgrammePdfViewer';
import { FormationHeroPhoto } from '@/components/formations/FormationHeroPhoto';
import { TrainingHero } from '@/components/formations/training/TrainingHero';
import { getFormationCatalogueByRef } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import {
  trainingCategoryBadge,
  type TrainingParcoursKind,
} from '@/lib/training-page-helpers';

export { FormationHeroPhoto } from '@/components/formations/FormationHeroPhoto';

/**
 * Bandeau + visionneuse PDF — sous le hero ou après le programme détaillé (#programme).
 */
export function FormationProgrammePdfSection({
  catalogueRef,
}: {
  catalogueRef: string;
}) {
  const catalogueEntry = getFormationCatalogueByRef(catalogueRef);
  if (!catalogueEntry?.programmePdfHref?.trim()) return null;
  return (
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
  );
}

function parcoursKindFromRef(ref?: string): TrainingParcoursKind {
  if (ref === 'NIV-06' || ref === 'NIV-07' || ref === 'NIV-08') return 'applications-metier';
  if (ref === 'NIV-10') return 'creation-ia';
  return 'usages-ia-btp';
}

/**
 * Hero standard des fiches formation — délègue à TrainingHero (grille commune).
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
  summaryIcon: _SummaryIcon = Building2,
  summaryItems,
  catalogueRef,
  programmePdfAfterHero = true,
  backLink,
}: {
  refLine: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  badges?: string[];
  ctas: React.ReactNode;
  footerLinks?: React.ReactNode;
  image?: React.ReactNode;
  summaryTitle?: string;
  summaryIcon?: LucideIcon;
  summaryItems: string[];
  catalogueRef?: string;
  programmePdfAfterHero?: boolean;
  backLink?: { href: string; label: string };
}) {
  void _SummaryIcon;
  const catalogueEntry = catalogueRef ? getFormationCatalogueByRef(catalogueRef) : undefined;
  const kind = parcoursKindFromRef(catalogueRef);
  const heroBadges = [
    { label: trainingCategoryBadge(kind), variant: 'category' as const },
    ...(catalogueEntry
      ? [
          {
            label: catalogueEntry.level === 'DÉBUTANT' ? 'Niveau 1' : 'Niveau 2',
            variant: 'level' as const,
          },
        ]
      : []),
    ...(badges ?? []).slice(0, 1).map((label) => ({
      label,
      variant: 'category' as const,
    })),
  ];

  const resolvedImage =
    image ??
    (catalogueEntry ? (
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
    ) : null);

  return (
    <>
      <TrainingHero
        title={title}
        subtitle={subtitle}
        lead={children}
        badges={heroBadges}
        metaLine={refLine}
        catalogueRef={catalogueRef}
        media={resolvedImage}
        summaryTitle={summaryTitle}
        summaryItems={summaryItems}
        backHref={backLink?.href ?? LINKS.formations}
        backLabel={backLink?.label ?? 'Catalogue des formations'}
      />
      <div className="border-b border-slate-100 bg-white px-4 pb-10">
        <div className="mx-auto flex max-w-[70rem] flex-col gap-3 sm:flex-row sm:flex-wrap">
          {ctas}
        </div>
        {footerLinks ? (
          <div className="mx-auto mt-4 flex max-w-[70rem] flex-wrap gap-4 text-sm">{footerLinks}</div>
        ) : null}
      </div>
      {catalogueRef && programmePdfAfterHero ? (
        <FormationProgrammePdfSection catalogueRef={catalogueRef} />
      ) : null}
    </>
  );
}

/** Photo héro — réexportée depuis FormationHeroPhoto. */
