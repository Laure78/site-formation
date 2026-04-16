import { headers } from 'next/headers';
import { SectionBreadcrumbLayout } from '@/components/seo/SectionBreadcrumbLayout';

export default async function RessourcesLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get('x-pathname') ?? '/ressources/ia-btp';
  return (
    <SectionBreadcrumbLayout zone="ressources" pathname={pathname}>
      {children}
    </SectionBreadcrumbLayout>
  );
}
