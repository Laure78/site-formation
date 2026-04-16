import { Breadcrumb } from '@/components/Breadcrumb';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import {
  getSectionBreadcrumbItems,
  type SectionBreadcrumbZone,
} from '@/lib/section-breadcrumbs';

type Props = {
  zone: SectionBreadcrumbZone;
  pathname: string;
  children: React.ReactNode;
};

/**
 * Fil d’Ariane JSON-LD (`BreadcrumbJsonLd`) + navigation HTML (`Breadcrumb` avec `omitJsonLd`).
 * Utilisé par les layouts `app/formations`, `app/blog`, `app/etudes-de-cas`, `app/ressources`.
 */
export function SectionBreadcrumbLayout({ zone, pathname, children }: Props) {
  const items = getSectionBreadcrumbItems(zone, pathname);
  if (items.length === 0) {
    return <>{children}</>;
  }
  return (
    <>
      <BreadcrumbJsonLd id={`schema-breadcrumb-${zone}`} items={items} />
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <Breadcrumb items={items} showVisual omitJsonLd className="mb-2" />
      </div>
      {children}
    </>
  );
}
