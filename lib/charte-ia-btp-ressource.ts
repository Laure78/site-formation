/**
 * Charte IA BTP — guide ressource + modèle PDF téléchargeable.
 * Source unique pour le maillage interne.
 */
import { LINKS } from '@/lib/internal-links';

export const CHARTE_IA_BTP_PAGE_PATH = '/ressources/charte-ia-btp' as const;

export const CHARTE_IA_BTP_PDF_FILENAME = 'charte-ia-pme-batiment.pdf' as const;

/** Nom de fichier proposé au téléchargement (document OFC). */
export const CHARTE_IA_BTP_PDF_DOWNLOAD_AS = 'Charte_IA_PME_Batiment.pdf' as const;

export const CHARTE_IA_BTP_PDF_HREF = `/ressources/pdf/${CHARTE_IA_BTP_PDF_FILENAME}` as const;

/** Slug historique blog — redirection vers le guide ressource. */
export const CHARTE_IA_BTP_BLOG_SLUG = 'charte-ia-btp' as const;

export const CHARTE_IA_BTP_PAGE_HREF = CHARTE_IA_BTP_PAGE_PATH;

/** @deprecated Préférer CHARTE_IA_BTP_PAGE_HREF */
export const CHARTE_IA_BTP_BLOG_HREF = CHARTE_IA_BTP_PAGE_PATH;

export const CHARTE_IA_BTP_DOWNLOAD_LABEL = 'Télécharger la charte IA' as const;

export const CHARTE_IA_BTP_CONSULT_PDF_LABEL = 'Consulter le PDF' as const;

/** Nombre de pages du fichier `public/ressources/pdf/charte-ia-pme-batiment.pdf` (contrôle manuel). */
export const CHARTE_IA_BTP_PDF_PAGE_COUNT = 19 as const;

/** Taille en octets du fichier public — mettre à jour si le PDF est remplacé. */
export const CHARTE_IA_BTP_PDF_BYTE_SIZE = 129_595 as const;

/** Dernière mise à jour éditoriale de la page web (≠ validation juridique). */
export const CHARTE_IA_BTP_CONTENT_UPDATED_AT = '2026-10-26' as const;

/** @deprecated Utiliser CHARTE_IA_BTP_CONTENT_UPDATED_AT */
export const CHARTE_IA_BTP_SOURCES_VERIFIED_AT = CHARTE_IA_BTP_CONTENT_UPDATED_AT;

/** @deprecated Ancien modèle Word — conservé pour liens historiques internes. */
export const CHARTE_IA_BTP_DOC_FILENAME = 'modele-charte-ia-entreprise-btp.doc' as const;

export const CHARTE_IA_BTP_DOC_HREF = `/ressources/${CHARTE_IA_BTP_DOC_FILENAME}` as const;

/** Chemin canonique complet (sitemap, JSON-LD). */
export function getCharteIaBtpCanonicalUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}${LINKS.charteIaBtp}`;
}
