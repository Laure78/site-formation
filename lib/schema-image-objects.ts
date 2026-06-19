/**
 * Schémas ImageObject (JSON-LD) — visuels stratégiques accueil et à propos.
 * @see https://schema.org/ImageObject
 */
import { SITE_CONFIG } from '@/lib/seo';
import { PHOTOS } from '@/lib/photos';
import { SCHEMA_ORGANIZATION_OFC, SCHEMA_HEADER_PERSON_IMAGE_PATH } from '@/lib/schema-constants';

const year = new Date().getFullYear();
const base = SITE_CONFIG.url.replace(/\/$/, '');

/** Créateur — champ attendu pour les métadonnées d'image (Google / ImageObject). */
const imageCreatorOrg = {
  '@type': 'Organization' as const,
  name: SCHEMA_ORGANIZATION_OFC.name,
  url: base,
};

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
        creator: imageCreatorOrg,
        author: { '@type': 'Person', name: 'Laure Olivié' },
      },
      {
        '@type': 'ImageObject',
        '@id': `${base}/#image-portrait-header-laure`,
        url: `${base}${SCHEMA_HEADER_PERSON_IMAGE_PATH}`,
        name: PHOTOS.siteAvatar.alt,
        description:
          "Miniature bleue OFC — portrait Laure Olivié, formatrice IA appliquée au bâtiment certifiée Qualiopi.",
        contentUrl: `${base}${SCHEMA_HEADER_PERSON_IMAGE_PATH}`,
        license: `${base}/mentions-legales`,
        acquireLicensePage: `${base}/contact`,
        creditText: "OFC Création d'Entreprise",
        copyrightNotice: `© ${year} OFC Création d'Entreprise`,
        creator: imageCreatorOrg,
        author: { '@type': 'Person', name: 'Laure Olivié' },
      },
    ],
  };
}

export function buildAProposImageObjectJsonLd() {
  const p = PHOTOS.aProposHero2026;
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${base}/#image-portrait-pro-laure`,
    url: `${base}${p.src}`,
    name: p.alt,
    description: p.description ?? p.alt,
    contentUrl: `${base}${p.src}`,
    license: `${base}/mentions-legales`,
    acquireLicensePage: `${base}/contact`,
    creditText: "OFC Création d'Entreprise",
    copyrightNotice: `© ${year} OFC Création d'Entreprise`,
    creator: imageCreatorOrg,
    author: { '@type': 'Person', name: 'Laure Olivié' },
  };
}
