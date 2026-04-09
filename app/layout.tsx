import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { StickyRDVCTA } from '@/components/StickyRDVCTA';
import {
  SITE_CONFIG,
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
  getPersonSchema,
  getMainCourseSchema,
} from '@/lib/seo';
import { getSchemaPersonOrganization } from '@/lib/schema-person-organization';
import { OG_SITE_NAME, withOgDescriptionSuffix } from '@/utils/metadata';

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
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default:
      'Formation IA BTP & ChatGPT entreprise | Devis, chantier, admin | Laure Olivié',
    template: '%s | Laure Olivié',
  },
  description: withOgDescriptionSuffix(SITE_CONFIG.description),
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.legalName,
  formatDetection: { email: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_CONFIG.url,
    siteName: OG_SITE_NAME,
    title:
      'Formation IA BTP & ChatGPT entreprise | Laure Olivié | Île-de-France · Yvelines · Qualiopi',
    description: withOgDescriptionSuffix(SITE_CONFIG.description),
    images: [
      {
        url: `${SITE_CONFIG.url}/images/laure-olivie-formatrice.png`,
        width: 1200,
        height: 630,
        alt: 'Laure Olivié - Formatrice IA pour le BTP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Formation IA BTP & ChatGPT entreprise | Laure Olivié | Île-de-France · Yvelines',
    description: withOgDescriptionSuffix(SITE_CONFIG.description),
    images: [`${SITE_CONFIG.url}/images/laure-olivie-formatrice.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    // À compléter si vous avez des codes Google Search Console, Bing, etc.
    // google: 'votre-code',
    // yandex: 'votre-code',
  },
  alternates: {
    canonical: SITE_CONFIG.url,
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
  const orgSchema = getOrganizationSchema();
  const localSchema = getLocalBusinessSchema();
  const webSchema = getWebSiteSchema();
  const personSchema = getPersonSchema();
  const mainCourseSchema = getMainCourseSchema();

  const jsonLdScripts = [
    orgSchema,
    localSchema,
    webSchema,
    personSchema,
    mainCourseSchema,
  ];

  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <Script
          id="schema-person-org"
          strategy="afterInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSchemaPersonOrganization()),
          }}
        />
        {/* Données structurées Schema.org JSON-LD — Rich Results Google */}
        {jsonLdScripts.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-white text-slate-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
        <StickyRDVCTA />
        <ChatWidget />
      </body>
    </html>
  );
}
