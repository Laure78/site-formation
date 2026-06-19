/**
 * Recadrage « portrait tête » pour avatars Laure (header, articles de blog).
 * `laure-avatar-bleu-2026.png` = moitié bleue à gauche + portrait à droite :
 * le focus horizontal à 78 % masque le bloc bleu dans les cadres ronds.
 */
export const AUTHOR_HEADSHOT_OBJECT_POSITION = 'object-[78%_24%]' as const;

export const AUTHOR_HEADSHOT_IMAGE_CLASS =
  `h-full w-full object-cover ${AUTHOR_HEADSHOT_OBJECT_POSITION}`;
