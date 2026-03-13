import type { Metadata, Viewport } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';
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

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-display',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Formation IA BTP — Gagnez 3 à 5h/semaine | Laure Olivié | Île-de-France',
    template: '%s | Laure Olivié',
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.legalName,
  formatDetection: { email: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'Formation IA BTP — Laure Olivié | Île-de-France · Yvelines · Qualiopi',
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/images/laure-olivie-formatrice.png',
        width: 1200,
        height: 630,
        alt: 'Laure Olivié - Formatrice IA pour le BTP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formation IA BTP — Laure Olivié | Île-de-France · Yvelines',
    description: SITE_CONFIG.description,
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
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
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
    <html lang="fr">
      <head>
        {/* Données structurées Schema.org JSON-LD — Rich Results Google */}
        {jsonLdScripts.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${dmSans.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col bg-white text-slate-900`}
      >
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
