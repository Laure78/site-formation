import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/Footer';
import { DeferredLayoutWidgets } from '@/components/layout/DeferredLayoutWidgets';
import { SITE_CONFIG, OG_SITE_NAME, GOOGLE_SITE_VERIFICATION } from '@/lib/seo';
import { PHOTOS, SITE_FAVICON_CACHE_BUST } from '@/lib/photos';
import { clampMetaDescription } from '@/lib/meta-description';
import { GlobalSitelinksJsonLd } from '@/components/schema/GlobalSitelinksJsonLd';
import { GlobalSiteJsonLd } from '@/components/schema/GlobalSiteJsonLd';
import { GlobalBreadcrumbs } from '@/components/layout/GlobalBreadcrumbs';
import { SiteSearchProvider } from '@/components/search/SiteSearchProvider';

const Header = dynamic(
  () => import('@/components/Header').then((mod) => ({ default: mod.Header })),
);

const SitelinksHub = dynamic(
  () =>
    import('@/components/layout/SitelinksHub').then((mod) => ({
      default: mod.SitelinksHub,
    })),
);

const FormationCalendlyInlineGate = dynamic(
  () =>
    import('@/components/FormationCalendlyInlineGate').then((mod) => ({
      default: mod.FormationCalendlyInlineGate,
    })),
);

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

const llmsTxtSchema = {
  '@context': 'https://schema.org',
  '@type': 'DigitalDocument',
  name: 'Fichier llms.txt (assistants IA)',
  url: `${baseUrl}/llms.txt`,
  encodingFormat: 'text/plain',
  inLanguage: 'fr',
  isPartOf: {
    '@type': 'WebSite',
    url: baseUrl,
    name: SITE_CONFIG.name,
  },
};

/** Métadonnées globales — auteurs / publisher alignés sur l'entité Person (JSON-LD via `<GlobalSiteJsonLd />`). */
export async function generateMetadata(): Promise<Metadata> {
  const siteDescription = clampMetaDescription(SITE_CONFIG.description);
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      /** Pages : `buildTitle()` → `{ absolute }` pour éviter double suffixe et « · | » orphelin. */
      template: '%s | Laure Olivié',
      default: "Laure Olivié — Formatrice IA pour les pros du BTP | OFC Création d'Entreprise",
    },
    description: siteDescription,
    authors: [{ name: SITE_CONFIG.name, url: `${baseUrl}/a-propos` }],
    creator: SITE_CONFIG.name,
    publisher: 'OFC Création d\'Entreprise',
    formatDetection: { telephone: true, email: true, address: false },
    category: 'education',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: baseUrl,
      siteName: OG_SITE_NAME,
      title: 'Formation IA appliquée au bâtiment Île-de-France — Laure Olivié (Qualiopi)',
      description: siteDescription,
      images: [
        {
          url: `${baseUrl}${PHOTOS.heroAccueilFormationIABtpEchange2026.src}`,
          width: PHOTOS.heroAccueilFormationIABtpEchange2026.width,
          height: PHOTOS.heroAccueilFormationIABtpEchange2026.height,
          alt: PHOTOS.heroAccueilFormationIABtpEchange2026.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Formation IA pour le BTP — Laure Olivié (Qualiopi · Constructys)',
      description: siteDescription,
      images: [`${baseUrl}${PHOTOS.heroAccueilFormationIABtpEchange2026.src}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    verification: {
      ...(GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : {}),
    },
    alternates: {
      canonical: baseUrl,
      languages: { 'fr-FR': baseUrl },
    },
    // Favicons = logo Header (`SITE_HEADER_LOGO_SRC` / avatar).
    // `?v=` force le rechargement navigateur (les /favicon.ico sans query restent
    // souvent en cache des semaines). `app/favicon.ico` + `app/icon.png` +
    // `app/apple-icon.png` restent la source App Router (hash Next auto).
    icons: {
      icon: [
        { url: `/favicon.ico?v=${SITE_FAVICON_CACHE_BUST}`, sizes: 'any' },
        {
          url: `/favicon-32.png?v=${SITE_FAVICON_CACHE_BUST}`,
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: `/icon-192.png?v=${SITE_FAVICON_CACHE_BUST}`,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: `/icon-512.png?v=${SITE_FAVICON_CACHE_BUST}`,
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      shortcut: [{ url: `/favicon.ico?v=${SITE_FAVICON_CACHE_BUST}` }],
      apple: [
        {
          url: `/apple-touch-icon.png?v=${SITE_FAVICON_CACHE_BUST}`,
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: SITE_CONFIG.name,
    },
    other: {
      'geo.region': 'FR-IDF',
      'geo.placename': 'Guyancourt',
      'geo.position': `${SITE_CONFIG.geo.latitude};${SITE_CONFIG.geo.longitude}`,
      ICBM: `${SITE_CONFIG.geo.latitude}, ${SITE_CONFIG.geo.longitude}`,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Organization + Person — SITE / PROOF via `lib/schema-site-proof.ts` */}
        <GlobalSiteJsonLd />
      </head>
      <body className="flex min-h-screen min-w-0 flex-col overflow-x-clip bg-white font-sans text-slate-900 antialiased">
        <GlobalSitelinksJsonLd />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(llmsTxtSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
        >
          Aller au contenu principal
        </a>
        <SiteSearchProvider>
          <Header />
        </SiteSearchProvider>
        <main className="min-w-0 w-full flex-1" id="main-content">
          <GlobalBreadcrumbs />
          {children}
          <FormationCalendlyInlineGate />
        </main>
        <SitelinksHub />
        <Footer />
        <DeferredLayoutWidgets />
      </body>
    </html>
  );
}
