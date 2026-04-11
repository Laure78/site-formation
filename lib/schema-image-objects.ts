/**
 * Schémas ImageObject (JSON-LD) — visuels stratégiques accueil et à propos.
 * @see https://schema.org/ImageObject
 */
import { SITE_CONFIG } from '@/lib/seo';
import { PHOTOS } from '@/lib/photos';

const year = new Date().getFullYear();
const base = SITE_CONFIG.url.replace(/\/$/, '');

export function buildHomePageImageObjectsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ImageObject',
        '@id': `${base}/#image-hero-formation-ia-btp`,
        url: `${base}${PHOTOS.heroAccueilFormationIABtpEchange2026.src}`,
        name: PHOTOS.heroAccueilFormationIABtpEchange2026.alt,
        description: PHOTOS.heroAccueilFormationIABtpEchange2026.alt,
        contentUrl: `${base}${PHOTOS.heroAccueilFormationIABtpEchange2026.src}`,
        license: `${base}/mentions-legales`,
        acquireLicensePage: `${base}/contact`,
        creditText: "OFC Création d'Entreprise",
        copyrightNotice: `© ${year} OFC Création d'Entreprise`,
        author: { '@type': 'Person', name: 'Laure Olivié' },
      },
      {
        '@type': 'ImageObject',
        '@id': `${base}/#image-portrait-header-laure`,
        url: `${base}/images/laure-portrait-header-2026.png`,
        name: "Laure Olivié, formatrice IA BTP certifiée Qualiopi — OFC Création d'Entreprise",
        description:
          "Portrait rond header — Laure Olivié, formatrice IA BTP certifiée Qualiopi, OFC Création d'Entreprise.",
        contentUrl: `${base}/images/laure-portrait-header-2026.png`,
        license: `${base}/mentions-legales`,
        acquireLicensePage: `${base}/contact`,
        creditText: "OFC Création d'Entreprise",
        copyrightNotice: `© ${year} OFC Création d'Entreprise`,
        author: { '@type': 'Person', name: 'Laure Olivié' },
      },
    ],
  };
}

export function buildAProposImageObjectJsonLd() {
  const p = PHOTOS.portraitPro2026;
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${base}/#image-portrait-pro-laure`,
    url: `${base}${p.src}`,
    name: p.alt,
    description: p.alt,
    contentUrl: `${base}${p.src}`,
    license: `${base}/mentions-legales`,
    acquireLicensePage: `${base}/contact`,
    creditText: "OFC Création d'Entreprise",
    copyrightNotice: `© ${year} OFC Création d'Entreprise`,
    author: { '@type': 'Person', name: 'Laure Olivié' },
  };
}
