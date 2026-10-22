/**
 * Conteneurs de page — largeur et padding vertical harmonisés (hors `ofc-section`).
 * Évite les `py-16` isolés et les max-width divergents sur les gabarits legacy.
 *
 * @example
 * ```tsx
 * import { OFC_PAGE_ARTICLE, OFC_EDITORIAL } from '@/lib/ofc-page-classes';
 * <article className={`${OFC_PAGE_ARTICLE} ${OFC_EDITORIAL}`}>…</article>
 * ```
 */

/** Article long-form standard (~896 px) — pages métier legacy, légales, études de cas. */
export const OFC_PAGE_ARTICLE = 'ofc-page-article';

/** Colonne étroite (~672 px) — articles blog sans sommaire latéral. */
export const OFC_PAGE_ARTICLE_NARROW = 'ofc-page-article ofc-page-article--narrow';

/** Hub / sommaire latéral (~1152 px). */
export const OFC_PAGE_ARTICLE_WIDE = 'ofc-page-article ofc-page-article--wide';

export { OFC_EDITORIAL } from '@/lib/ofc-interaction-classes';

/** Section standalone — padding horizontal + vertical (guides PDF). */
export const OFC_BAND = 'ofc-band';
