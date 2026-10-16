/**
 * Charte IA BTP — article blog + modèle Word téléchargeable.
 * Source unique pour le maillage interne.
 */
import { LINKS } from '@/lib/internal-links';

export const CHARTE_IA_BTP_DOC_FILENAME = 'modele-charte-ia-entreprise-btp.doc' as const;

export const CHARTE_IA_BTP_DOC_HREF = `/ressources/${CHARTE_IA_BTP_DOC_FILENAME}` as const;

export const CHARTE_IA_BTP_BLOG_SLUG = 'charte-ia-btp' as const;

export const CHARTE_IA_BTP_BLOG_HREF = `${LINKS.blog}/${CHARTE_IA_BTP_BLOG_SLUG}` as const;

export const CHARTE_IA_BTP_DOWNLOAD_LABEL =
  'Télécharger le modèle de charte IA BTP (.doc)' as const;

/** Date de vérification des sources officielles (article + modèle). */
export const CHARTE_IA_BTP_SOURCES_VERIFIED_AT = '2026-10-16' as const;
