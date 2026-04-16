import { headers } from 'next/headers';
import { SectionBreadcrumbLayout } from '@/components/seo/SectionBreadcrumbLayout';

export default async function EtudesDeCasLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get('x-pathname') ?? '/etudes-de-cas/ffb-csfe';
  return (
    <SectionBreadcrumbLayout zone="etudes-de-cas" pathname={pathname}>
      {children}
    </SectionBreadcrumbLayout>
  );
}
