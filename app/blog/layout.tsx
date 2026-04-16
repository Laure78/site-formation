import { headers } from 'next/headers';
import { SectionBreadcrumbLayout } from '@/components/seo/SectionBreadcrumbLayout';

/** JSON-LD BreadcrumbList (`BreadcrumbJsonLd`) + fil d’Ariane visuel selon l’URL (`x-pathname`). */
export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get('x-pathname') ?? '/blog';
  return (
    <SectionBreadcrumbLayout zone="blog" pathname={pathname}>
      {children}
    </SectionBreadcrumbLayout>
  );
}
