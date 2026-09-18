/**
 * Architecture SEO/GEO — laureolivie.fr
 * Pillar pages, clusters, internal linking, schema
 */

import { LINKS } from '@/lib/internal-links';

export const PILLAR_PAGES = [
  {
    id: 'formation-ia-btp',
    path: '/formation-ia-btp',
    title: 'Formation IA pour le BTP : IA bâtiment | Laure Olivié',
    description:
      'Formation IA pour le BTP et formation IA bâtiment : Claude et ChatGPT sur devis, DCE et chantier. Qualiopi, présentiel Île-de-France. Financement OPCO selon éligibilité.',
    h1: 'Formation IA pour le BTP : maîtriser l’intelligence artificielle dans le bâtiment',
    keywords: [
      'formation IA pour le BTP',
      'formation IA bâtiment',
      'formation IA appliquée au bâtiment',
      'formation ChatGPT BTP',
      'formation intelligence artificielle bâtiment',
    ],
  },
  {
    id: 'intelligence-artificielle-batiment',
    path: '/intelligence-artificielle-batiment',
    title: 'Intelligence artificielle bâtiment — Guide complet',
    description: 'L\'IA au service du bâtiment. ChatGPT, automatisation, gains de productivité pour les professionnels du BTP et les entreprises.',
    h1: 'L\'intelligence artificielle au service du bâtiment',
    keywords: ['intelligence artificielle bâtiment', 'IA pour le BTP', 'IA construction'],
  },
  {
    id: 'chatgpt-entreprises-btp',
    path: '/formations/ia-batiment-travaux-publics',
    title: 'ChatGPT pour entreprises du bâtiment — Guide pratique',
    description: 'Utiliser ChatGPT pour devis, emails, CR chantier. PME BTP, conducteurs de travaux. Formation 4h.',
    h1: 'ChatGPT pour entreprises du bâtiment',
    keywords: ['ChatGPT PME BTP', 'ChatGPT bâtiment', 'formation IA TPE PME'],
  },
  {
    id: 'ia-entreprises-btp',
    path: '/ia-pour-entreprises-btp',
    title: 'IA pour entreprises BTP — Automatisation et productivité',
    description: 'IA pour PME du BTP. Appels d\'offres, conducteurs de travaux, RH. Gains mesurés.',
    h1: 'IA pour les entreprises du BTP',
    keywords: ['IA entreprises BTP', 'IA PME bâtiment', 'automatisation BTP'],
  },
] as const;

export const BLOG_CLUSTERS = [
  { id: 'ia-artisans', path: '/blog/ia-artisans', name: 'IA pour entreprises BTP', pillarId: 'chatgpt-artisans' },
  { id: 'ia-btp', path: '/blog/ia-btp', name: 'IA pour le BTP', pillarId: 'intelligence-artificielle-batiment' },
  { id: 'chatgpt-btp', path: '/blog/chatgpt-btp', name: 'ChatGPT BTP', pillarId: 'chatgpt-artisans' },
  { id: 'automatisation-entreprises', path: '/blog/automatisation-entreprises', name: 'Automatisation entreprises', pillarId: 'ia-entreprises-btp' },
  { id: 'outils-ia', path: '/blog/outils-ia', name: 'Outils IA', pillarId: 'ia-entreprises-btp' },
] as const;

/** Mapping cluster → pillar path pour internal linking */
export function getPillarPathForCluster(clusterId: string): string {
  const cluster = BLOG_CLUSTERS.find((c) => c.id === clusterId);
  if (!cluster) return LINKS.formationIaBtpPillar;
  const pillar = PILLAR_PAGES.find((p) => p.id === cluster.pillarId);
  return pillar?.path ?? LINKS.formationIaBtpPillar;
}

/** Liens internes par défaut pour les articles (URLs canoniques) */
export const DEFAULT_INTERNAL_LINKS = {
  formation: { path: LINKS.formationIaBtpPillar, anchor: 'formation IA pour le BTP' },
  prendreRdv: { path: LINKS.prendreRdv, anchor: 'prendre rendez-vous' },
  chatgptArtisans: { path: LINKS.chatgptArtisans, anchor: 'ChatGPT pour entreprises BTP' },
  iaDevis: { path: '/ia-devis-batiment', anchor: 'IA devis bâtiment' },
} as const;

/** CTAs par bloc */
export const CTA_BLOCKS = [
  {
    label: 'Découvrir la formation IA pour les pros du BTP',
    href: LINKS.formationIaBtpPillar,
    variant: 'primary' as const,
  },
  { label: 'Échanger sur votre projet de formation', href: LINKS.prendreRdv, variant: 'secondary' as const },
  { label: 'Télécharger le guide', href: '/ressources', variant: 'outline' as const },
] as const;
