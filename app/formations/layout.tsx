import { headers } from 'next/headers';
import { SectionBreadcrumbLayout } from '@/components/seo/SectionBreadcrumbLayout';

export default async function FormationsLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get('x-pathname') ?? '/formations';
  return (
    <SectionBreadcrumbLayout zone="formations" pathname={pathname}>
      {children}
    </SectionBreadcrumbLayout>
  );
}
