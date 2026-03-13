/**
 * Système de maillage interne — Anchors optimisés
 */

import { MEDIA_CONFIG } from './config';

export interface InternalLink {
  path: string;
  anchor: string;
}

export function getInternalLinksForArticle(clusterId: string): InternalLink[] {
  const links: InternalLink[] = [];

  // Toujours inclure formation, RDV et tarifs (pages de conversion)
  links.push({
    path: MEDIA_CONFIG.internalLinks.formations.path,
    anchor: MEDIA_CONFIG.internalLinks.formations.anchors[0],
  });
  links.push({
    path: MEDIA_CONFIG.internalLinks.prendreRdv.path,
    anchor: MEDIA_CONFIG.internalLinks.prendreRdv.anchors[Math.floor(Math.random() * 3)],
  });
  links.push({
    path: MEDIA_CONFIG.internalLinks.tarifs.path,
    anchor: MEDIA_CONFIG.internalLinks.tarifs.anchors[0],
  });

  // Selon le cluster, ajouter des liens ciblés
  if (clusterId.includes('artisans')) {
    links.push({
      path: MEDIA_CONFIG.internalLinks.chatgptArtisans.path,
      anchor: MEDIA_CONFIG.internalLinks.chatgptArtisans.anchors[0],
    });
  }
  if (clusterId.includes('devis') || clusterId.includes('productivite')) {
    links.push({
      path: MEDIA_CONFIG.internalLinks.iaDevis.path,
      anchor: MEDIA_CONFIG.internalLinks.iaDevis.anchors[0],
    });
  }

  links.push({
    path: MEDIA_CONFIG.internalLinks.blog.path,
    anchor: MEDIA_CONFIG.internalLinks.blog.anchors[0],
  });

  return links;
}

export function getRandomCTA(): string {
  return MEDIA_CONFIG.ctaPhrases[
    Math.floor(Math.random() * MEDIA_CONFIG.ctaPhrases.length)
  ];
}
