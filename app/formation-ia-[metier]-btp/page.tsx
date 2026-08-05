import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FormationIaMetierDynamicTemplate } from '@/components/formation-ia-metier/FormationIaMetierDynamicTemplate';
import {
  FORMATION_IA_METIER_DYNAMIC_REGISTRY,
  getFormationIaMetierDynamicConfig,
} from '@/lib/formation-ia-metier-dynamic-registry';
import { createPageMetadata } from '@/lib/seo';

export const revalidate = 3600;
type Props = {
  params: Promise<{ metier: string }>;
};

export function generateStaticParams() {
  return Object.keys(FORMATION_IA_METIER_DYNAMIC_REGISTRY).map((metier) => ({ metier }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { metier } = await params;
  const config = getFormationIaMetierDynamicConfig(metier);
  if (!config) {
    return { title: 'Formation IA pour le BTP par métier' };
  }

  return createPageMetadata({
    title: config.seoTitle,
    description: config.seoDescription,
    path: config.path,
    keywords: config.keywords,
    appendAuthorSuffix: false,
    openGraphType: 'website',
    image: config.ogImage,
  });
}

export default async function FormationIaMetierBtpDynamicPage({ params }: Props) {
  const { metier } = await params;
  const config = getFormationIaMetierDynamicConfig(metier);
  if (!config) {
    notFound();
  }

  return <FormationIaMetierDynamicTemplate config={config} />;
}
