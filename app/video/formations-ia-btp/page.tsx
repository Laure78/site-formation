import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { OfcPromoVideoEmbed } from '@/components/media/OfcPromoVideoEmbed';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_PROMO_VIDEO_SEO,
  OFC_PROMO_VIDEO_WATCH_PATH,
  getOfcPromoVideoSectionHeading,
} from '@/lib/ofc-promo-video';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { buildPromoVideoObjectJsonLd } from '@/lib/schema-promo-video';

export const revalidate = 3600;

const PAGE_TITLE = 'Vidéo — Formation IA pour le BTP | Laure Olivié';
const PAGE_DESCRIPTION = OFC_PROMO_VIDEO_SEO.description;

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: OFC_PROMO_VIDEO_WATCH_PATH,
  appendAuthorSuffix: false,
  openGraphTitle: PAGE_TITLE,
  openGraphDescription: PAGE_DESCRIPTION,
  openGraphType: 'website',
  image: {
    url: OFC_PROMO_VIDEO_SEO.thumbnailPath,
    width: OFC_PROMO_VIDEO_SEO.thumbnailWidth,
    height: OFC_PROMO_VIDEO_SEO.thumbnailHeight,
    alt: OFC_PROMO_VIDEO_SEO.name,
  },
});

function getWatchPageJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const pageUrl = `${base}${OFC_PROMO_VIDEO_WATCH_PATH}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${base}/#website` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${base}${OFC_PROMO_VIDEO_SEO.thumbnailPath}`,
        },
        video: { '@id': `${pageUrl}#promo-formations-ia-btp` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: base },
          { '@type': 'ListItem', position: 2, name: 'Vidéo formations IA BTP', item: pageUrl },
        ],
      },
      buildPromoVideoObjectJsonLd({ pageUrl }),
    ],
  };
}

export default function VideoFormationsIaBtpPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <JsonLd id="schema-video-formations-ia-btp" schema={getWatchPageJsonLd()} />

      <header className="border-b border-slate-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <Link
            href={LINKS.home}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#377CF3] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Accueil
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">
          Vidéo · Formations IA BTP
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
          {getOfcPromoVideoSectionHeading()}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#475569]">{PAGE_DESCRIPTION}</p>

        <div className="mt-8">
          <OfcPromoVideoEmbed variant="heroColumn" showWatchPageLink={false} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={LINKS.formations}
            className="inline-flex items-center justify-center rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2A6BD9]"
          >
            Voir le catalogue formations
          </Link>
          <Link
            href={LINKS.prendreRdv}
            className="inline-flex items-center justify-center rounded-lg border border-[#377CF3] bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF]"
          >
            Prendre rendez-vous
          </Link>
        </div>
      </main>
    </div>
  );
}
