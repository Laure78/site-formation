import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { StickyBlogMetierRdvBar } from '@/components/StickyBlogMetierRdvBar';
import { StickyMobileCalendlyCta } from '@/components/StickyMobileCalendlyCta';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { CalendlyScriptLoader } from '@/components/CalendlyScriptLoader';
import { FormationCalendlyInlineGate } from '@/components/FormationCalendlyInlineGate';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { CalendlyClickTracker } from '@/components/analytics/CalendlyClickTracker';
import { SITE_CONFIG } from '@/lib/seo';
import { PHOTOS } from '@/lib/photos';
import { OG_SITE_NAME } from '@/utils/metadata';
import { clampMetaDescription } from '@/lib/meta-description';
import { GlobalSitelinksJsonLd } from '@/components/schema/GlobalSitelinksJsonLd';
import { OrganizationSchema } from '@/components/schema/OrganizationSchema';
import { PersonSchema } from '@/components/schema/PersonSchema';
import { SitelinksHub } from '@/components/layout/SitelinksHub';
import { GlobalBreadcrumbs } from '@/components/layout/GlobalBreadcrumbs';
import { SiteSearchProvider } from '@/components/search/SiteSearchProvider';

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['600', '700'],
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

/** Métadonnées globales — auteurs / publisher alignés sur l'entité Person (JSON-LD via `<PersonSchema />`). */
export async function generateMetadata(): Promise<Metadata> {
  const siteDescription = clampMetaDescription(SITE_CONFIG.description);
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      template: '%s | Laure Olivié',
      default: "Laure Olivié — Formatrice IA pour les pros du BTP | OFC Création d'Entreprise",
    },
    description: siteDescription,
    authors: [{ name: SITE_CONFIG.name, url: `${baseUrl}/a-propos` }],
    creator: SITE_CONFIG.name,
    publisher: 'OFC Création d\'Entreprise',
    formatDetection: { email: false, telephone: false },
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
      // À compléter si vous avez des codes Google Search Console, Bing, etc.
      // google: 'votre-code',
      // yandex: 'votre-code',
    },
    alternates: {
      canonical: baseUrl,
      languages: { 'fr-FR': baseUrl },
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      shortcut: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
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
        <PersonSchema />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-white text-slate-900">
        <OrganizationSchema />
        <GlobalSitelinksJsonLd />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(llmsTxtSchema) }}
        />
        <GoogleAnalytics />
        <CalendlyScriptLoader />
        <CalendlyClickTracker />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
        >
          Aller au contenu principal
        </a>
        <SiteSearchProvider>
        <SiteSearchProvider>
        <Navbar />
        <main className="flex-1" id="main-content">
          <GlobalBreadcrumbs />
          {children}
          <FormationCalendlyInlineGate />
        </main>
        <SitelinksHub />
        <Footer />
        <ScrollToTopButton />
        <StickyMobileCalendlyCta />
        <StickyBlogMetierRdvBar />
        </SiteSearchProvider>
        </SiteSearchProvider>
      </body>
    </html>
  );
}
