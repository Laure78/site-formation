/**
 * Architecture SEO/GEO — laureolivie.fr
 * Pillar pages, clusters, internal linking, schema
 */

export const PILLAR_PAGES = [
  {
    id: 'formation-ia-btp',
    path: '/formations',
    title: 'Formation IA BTP — Programmes et financement 100%',
    description: 'Formations IA certifiées Qualiopi pour le BTP. Devis, appels d\'offres, RH. 100% finançable OPCO Constructys. Paris, Île-de-France.',
    h1: 'Formation IA BTP : programmes et financement',
    keywords: ['formation IA BTP', 'formation ChatGPT BTP', 'formation intelligence artificielle bâtiment'],
  },
  {
    id: 'intelligence-artificielle-batiment',
    path: '/intelligence-artificielle-batiment',
    title: 'Intelligence artificielle bâtiment — Guide complet',
    description: 'L\'IA au service du bâtiment. ChatGPT, automatisation, gains de productivité pour artisans et entreprises BTP.',
    h1: 'L\'intelligence artificielle au service du bâtiment',
    keywords: ['intelligence artificielle bâtiment', 'IA BTP', 'IA construction'],
  },
  {
    id: 'chatgpt-artisans',
    path: '/chatgpt-artisans-btp',
    title: 'ChatGPT pour artisans du bâtiment — Guide pratique',
    description: 'Utiliser ChatGPT pour devis, emails, CR chantier. Artisans plombiers, électriciens, maçons. Formation 4h.',
    h1: 'ChatGPT pour artisans du bâtiment',
    keywords: ['ChatGPT artisans', 'ChatGPT plombier', 'ChatGPT bâtiment'],
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
  { id: 'ia-artisans', path: '/blog/ia-artisans', name: 'IA pour artisans', pillarId: 'chatgpt-artisans' },
  { id: 'ia-btp', path: '/blog/ia-btp', name: 'IA BTP', pillarId: 'intelligence-artificielle-batiment' },
  { id: 'chatgpt-btp', path: '/blog/chatgpt-btp', name: 'ChatGPT BTP', pillarId: 'chatgpt-artisans' },
  { id: 'automatisation-entreprises', path: '/blog/automatisation-entreprises', name: 'Automatisation entreprises', pillarId: 'ia-entreprises-btp' },
  { id: 'outils-ia', path: '/blog/outils-ia', name: 'Outils IA', pillarId: 'ia-entreprises-btp' },
] as const;

/** Mapping cluster → pillar path pour internal linking */
export function getPillarPathForCluster(clusterId: string): string {
  const cluster = BLOG_CLUSTERS.find((c) => c.id === clusterId);
  if (!cluster) return '/formation-ia-btp';
  const pillar = PILLAR_PAGES.find((p) => p.id === cluster.pillarId);
  return pillar?.path ?? '/formation-ia-btp';
}

/** Liens internes par défaut pour les articles */
export const DEFAULT_INTERNAL_LINKS = {
  formation: { path: '/formation-ia-btp', anchor: 'formation IA BTP' },
  prendreRdv: { path: '/prendre-rdv', anchor: 'prendre rendez-vous' },
  chatgptArtisans: { path: '/chatgpt-artisans-btp', anchor: 'ChatGPT pour artisans' },
  iaDevis: { path: '/ia-devis-batiment', anchor: 'IA devis bâtiment' },
} as const;

/** CTAs par bloc */
export const CTA_BLOCKS = [
  { label: 'Découvrir la formation IA BTP', href: '/formation-ia-btp', variant: 'primary' as const },
  { label: 'Prendre rendez-vous', href: '/prendre-rdv', variant: 'secondary' as const },
  { label: 'Télécharger le guide', href: '/ressources', variant: 'outline' as const },
] as const;
