/**
 * Configuration Media Machine
 */

import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';

export const MEDIA_CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr',
  brandName: 'Laure Olivié',
  niche: 'formation IA BTP',
  targetKeywords: [
    'formation IA BTP',
    'IA pour le BTP',
    'ChatGPT entreprises BTP',
    'intelligence artificielle bâtiment',
    'formation ChatGPT BTP',
    'IA TPE PME travaux publics',
    'automatisation BTP',
  ],
  internalLinks: {
    formations: { path: '/formations', anchors: ['formation IA BTP', 'formations IA bâtiment'] },
    chatgptArtisans: {
      path: '/formation-ia-artisans-btp',
      anchors: ['ChatGPT pour entreprises BTP', 'IA bâtiment et travaux publics'],
    },
    iaDevis: { path: '/ia-devis-batiment', anchors: ['IA devis bâtiment', 'automatiser devis BTP'] },
    prendreRdv: {
      path: buildSiteCalendlyCtaUrl('media-machine-prendre-rdv'),
      anchors: ['réserver formation', 'prendre rendez-vous', 'devis formation'],
    },
    blog: { path: '/blog', anchors: ['ressources IA BTP', 'articles formation'] },
    financement: { path: '/financement-constructys-formation-ia-btp', anchors: ['financement Constructys', 'tarifs formation'] },
  },
  ctaPhrases: [
    'Découvrez notre formation IA BTP — Financement possible selon éligibilité.',
    'Réservez un échange de 30 minutes gratuit pour une formation sur-mesure.',
    'Formation certifiée Qualiopi. Gagnez 3 à 5h par semaine sur vos devis et emails.',
  ],
} as const;
