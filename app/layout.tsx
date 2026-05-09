import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';
import { StickyBlogMetierRdvBar } from '@/components/StickyBlogMetierRdvBar';
import { CalendlyFloatingButton } from '@/components/CalendlyFloatingButton';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { CalendlyScriptLoader } from '@/components/CalendlyScriptLoader';
import { FormationCalendlyInlineGate } from '@/components/FormationCalendlyInlineGate';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { CalendlyClickTracker } from '@/components/analytics/CalendlyClickTracker';
import { SITE_CONFIG } from '@/lib/seo';
import { OG_SITE_NAME, withOgDescriptionSuffix } from '@/utils/metadata';
import { GlobalSitelinksJsonLd } from '@/components/schema/GlobalSitelinksJsonLd';
import { OrganizationSchema } from '@/components/schema/OrganizationSchema';
import { PersonSchema } from '@/components/schema/PersonSchema';
import { SitelinksHub } from '@/components/layout/SitelinksHub';
import { AutoBreadcrumb } from '@/components/layout/AutoBreadcrumb';

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    template: '%s | Laure Olivié',
    default: "Laure Olivié — Formatrice IA BTP | OFC Création d'Entreprise",
  },
  description: withOgDescriptionSuffix(SITE_CONFIG.description),
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
    title: 'Formation IA BTP Île-de-France — Laure Olivié (Qualiopi)',
    description: withOgDescriptionSuffix(SITE_CONFIG.description),
    images: [
      {
        url: `${baseUrl}/images/hero-accueil-formation-ia-btp-echange-2026.png`,
        width: 1024,
        height: 682,
        alt: 'Laure Olivié, formatrice IA BTP, animation d\'une session « L\'IA au service du bâtiment »',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formation IA BTP — Laure Olivié (Qualiopi · Constructys)',
    description: withOgDescriptionSuffix(SITE_CONFIG.description),
    images: [`${baseUrl}/images/hero-accueil-formation-ia-btp-echange-2026.png`],
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
      <body className="font-sans antialiased min-h-screen flex flex-col bg-white text-slate-900">
        <OrganizationSchema />
        <PersonSchema />
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
        <Navbar />
        <main className="flex-1" id="main-content">
          <AutoBreadcrumb />
          {children}
          <FormationCalendlyInlineGate />
        </main>
        <SitelinksHub />
        <Footer />
        <ScrollToTopButton />
        <CalendlyFloatingButton />
        <StickyBlogMetierRdvBar />
        <ChatWidget />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
