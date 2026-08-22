import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TutoPage } from '@/components/ressources/TutoPage';
import { TUTOS, getTutoBySlug, type TutoData } from '@/lib/tutos';
import { createPageMetadata, buildTitle, SITE_CONFIG } from '@/lib/seo';

const SITE_BASE = SITE_CONFIG.url.replace(/\/$/, '');

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return TUTOS.map((t) => ({ slug: t.slug }));
}

function ogImageFor(tuto: TutoData) {
  if (tuto.heroImage) {
    return {
      url: tuto.heroImage.src,
      width: tuto.heroImage.width,
      height: tuto.heroImage.height,
      alt: tuto.heroImage.alt,
    };
  }
  return {
    url: `${SITE_BASE}/og/ressources-${tuto.slug}.png`,
    width: 1200,
    height: 630,
    alt: tuto.ogImageAlt,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tuto = getTutoBySlug(slug);
  if (!tuto) {
    return {
      title: { absolute: buildTitle('Tuto introuvable') },
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    title: tuto.metaTitle,
    description: tuto.metaDescription,
    path: `/ressources/${tuto.slug}`,
    openGraphType: 'article',
    article: {
      publishedTime: tuto.publishedAt,
      modifiedTime: tuto.updatedAt,
      author: SITE_CONFIG.name,
      section: 'Ressources IA BTP',
    },
    image: ogImageFor(tuto),
    appendAuthorSuffix: false,
  });
}

export default async function RessourceTutoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tuto = getTutoBySlug(slug);
  if (!tuto) {
    notFound();
  }
  return <TutoPage tuto={tuto} />;
}
