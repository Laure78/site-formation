/**
 * Schémas ImageObject (JSON-LD) — visuels stratégiques accueil et à propos.
 * @see https://schema.org/ImageObject
 */
import { SITE_CONFIG } from '@/lib/seo';
import { PHOTOS } from '@/lib/photos';
import { SCHEMA_ORGANIZATION_OFC, SCHEMA_HEADER_PERSON_IMAGE_PATH } from '@/lib/schema-constants';

const year = new Date().getFullYear();
const base = SITE_CONFIG.url.replace(/\/$/, '');

/** Légende factuelle — hero accueil (GEO Île-de-France, sans dupliquer l'alt). */
export const HOME_HERO_IMAGE_CAPTION =
  'Affiche formation IA bâtiment et formation IA travaux publics — Laure Olivié, 4 h présentiel Paris Île-de-France, OFC Qualiopi' as const;

export const HOME_HERO_IMAGE_CREDIT = 'Laure Olivié — OFC Création d\'Entreprise' as const;

/** @id canonique — aligné sur `buildHomeUnifiedGraphJsonLd` (`primaryImageOfPage`). */
export const HOME_HERO_IMAGE_OBJECT_ID = `${base}/#image-hero` as const;

/** Créateur — champ attendu pour les métadonnées d'image (Google / ImageObject). */
const imageCreatorOrg = {
  '@type': 'Organization' as const,
  name: SCHEMA_ORGANIZATION_OFC.name,
  url: base,
};

/** ImageObject hero accueil — nœud @graph (sans @context). */
export function buildHomeHeroImageObjectNode(): Record<string, unknown> {
  const hero = PHOTOS.heroAccueilFormationIABtpEchange2026;
  const contentUrl = `${base}${hero.src}`;

  return {
    '@type': 'ImageObject',
    '@id': HOME_HERO_IMAGE_OBJECT_ID,
    url: contentUrl,
    contentUrl,
    name: hero.alt,
    caption: HOME_HERO_IMAGE_CAPTION,
    description: hero.alt,
    creditText: HOME_HERO_IMAGE_CREDIT,
    license: `${base}/mentions-legales`,
    acquireLicensePage: `${base}/contact`,
    copyrightNotice: `© ${year} OFC Création d'Entreprise`,
    creator: imageCreatorOrg,
    author: { '@type': 'Person', name: 'Laure Olivié' },
    width: hero.width,
    height: hero.height,
    contentLocation: {
      '@type': 'Place',
      name: 'Île-de-France',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Île-de-France',
        addressCountry: 'FR',
      },
    },
  };
}

export function buildHomePageImageObjectsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...buildHomeHeroImageObjectNode(),
        '@id': `${base}/#image-hero-formation-ia-btp`,
      },
      {
        '@type': 'ImageObject',
        '@id': `${base}/#image-portrait-header-laure`,
        url: `${base}${SCHEMA_HEADER_PERSON_IMAGE_PATH}`,
        name: PHOTOS.siteAvatar.alt,
        description: PHOTOS.siteAvatar.alt,
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
    creditText: HOME_HERO_IMAGE_CREDIT,
    copyrightNotice: `© ${year} OFC Création d'Entreprise`,
    creator: imageCreatorOrg,
    author: { '@type': 'Person', name: 'Laure Olivié' },
  };
}

/** ImageObject — hero guide conducteur de travaux (lead magnet ressources). */
export function buildGuideConducteurTravauxImageObjectJsonLd() {
  const p = PHOTOS.guideConducteurTravauxHero2026;
  const contentUrl = `${base}${p.src}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${base}/ressources/guide-conducteur-de-travaux#image`,
    url: contentUrl,
    contentUrl,
    name: p.alt,
    caption:
      p.title ??
      'Guide PDF gratuit OFC : 6 skills Claude pour conducteurs de travaux (DCE, PPSPS, CR, DOE).',
    description: p.alt,
    creditText: HOME_HERO_IMAGE_CREDIT,
    license: `${base}/mentions-legales`,
    acquireLicensePage: `${base}/contact`,
    copyrightNotice: `© ${year} OFC Création d'Entreprise`,
    creator: imageCreatorOrg,
    author: { '@type': 'Person', name: 'Laure Olivié' },
    width: p.width,
    height: p.height,
  };
}

/** ImageObject — hero page financement Constructys. */
export function buildFinancementConstructysImageObjectJsonLd() {
  const p = PHOTOS.financementConstructysHero2026;
  const contentUrl = `${base}${p.src}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${base}/financement-constructys-formation-ia-btp#image`,
    url: contentUrl,
    contentUrl,
    name: p.alt,
    caption:
      p.title ??
      'Financement Constructys / OPCO possible selon éligibilité — formation IA pour le BTP, OFC Qualiopi.',
    description: p.alt,
    creditText: HOME_HERO_IMAGE_CREDIT,
    license: `${base}/mentions-legales`,
    acquireLicensePage: `${base}/contact`,
    copyrightNotice: `© ${year} OFC Création d'Entreprise`,
    creator: imageCreatorOrg,
    author: { '@type': 'Person', name: 'Laure Olivié' },
    width: p.width,
    height: p.height,
  };
}
