import { headers } from 'next/headers';
import { SectionBreadcrumbLayout } from '@/components/seo/SectionBreadcrumbLayout';

/** JSON-LD BreadcrumbList (`BreadcrumbJsonLd`) + fil d’Ariane visuel selon l’URL (`x-pathname`). */
export default async function RessourcesLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get('x-pathname') ?? '/ressources';
  return (
    <SectionBreadcrumbLayout zone="ressources" pathname={pathname}>
      {children}
    </SectionBreadcrumbLayout>
  );
}
