import type { NextConfig } from "next";
import { FORMATION_IA_ALL_SLUGS } from "./lib/seo-formation-ia-hub-data";

const formationIaLegacyRedirects = () =>
  FORMATION_IA_ALL_SLUGS.map((slug) => ({
    source: `/formation-ia-${slug}`,
    destination: `/formation-ia/${slug}`,
    permanent: true as const,
  }));

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/llms.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      ...formationIaLegacyRedirects(),
      {
        source: '/formations/ia-btp-ile-de-france',
        destination: '/formation-ia-btp-ile-de-france',
        permanent: true,
      },
      { source: '/cours', destination: '/formations', permanent: true },
      {
        source: '/clients-partenaires',
        destination: '/a-propos',
        permanent: true,
      },
      { source: '/tarifs', destination: '/financement-constructys-formation-ia-btp', permanent: true },
      {
        source: '/financement-constructys',
        destination: '/financement-constructys-formation-ia-btp',
        permanent: true,
      },
      {
        source: '/formation-ia-btp-paris-2026',
        destination: '/formations/ia-btp-paris',
        permanent: true,
      },
      {
        source: '/formation-ia-btp-paris',
        destination: '/formations/ia-btp-paris',
        permanent: true,
      },
      { source: '/merci-devis', destination: '/contact', permanent: true },
      { source: '/formation-ia-btp', destination: '/formations', permanent: false },
      {
        source: '/documents/checklist-10-prompts-chatgpt-btp',
        destination: '/checklist-prompts-btp',
        permanent: true,
      },
      {
        source: '/documents/checklist-10-prompts-chatgpt-btp.html',
        destination: '/checklist-prompts-btp',
        permanent: true,
      },
      {
        source: '/formations/ia-productivite-chantier',
        destination: '/formations',
        permanent: true,
      },
      {
        source: '/formations/ia-niveau2-assistant-ao-dce-memoire',
        destination: '/formations/ia-appels-offre-btp#parcours-lms',
        permanent: true,
      },
      // Ancienne URL Elementor (WordPress) + ancienne route site — canonique : /formation-ia-artisans-btp
      {
        source: '/elementor-2487',
        destination: '/formation-ia-artisans-btp',
        permanent: true,
      },
      {
        source: '/elementor-2487/',
        destination: '/formation-ia-artisans-btp',
        permanent: true,
      },
      {
        source: '/chatgpt-artisans-btp',
        destination: '/formation-ia-artisans-btp',
        permanent: true,
      },
      {
        source: '/chatgpt-artisans-btp/',
        destination: '/formation-ia-artisans-btp',
        permanent: true,
      },
      // Anciennes URLs WordPress (Hello World, catégorie par défaut) — consolidation SEO
      { source: '/hello-world', destination: '/', permanent: true },
      { source: '/hello-world/', destination: '/', permanent: true },
      {
        source: '/2024/08/06/hello-world',
        destination: '/',
        permanent: true,
      },
      {
        source: '/2024/08/06/hello-world/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/uncategorized',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/uncategorized/',
        destination: '/blog',
        permanent: true,
      },
      // Blog : fusion « Devis 15 min » + « ChatGPT devis » électricien → article unique
      {
        source: '/blog/devis-en-15-min-le-guide-electricien',
        destination: '/blog/chatgpt-devis-electricien-btp',
        permanent: true,
      },
      {
        source: '/blog/devis-en-15-min-le-guide-electricien/',
        destination: '/blog/chatgpt-devis-electricien-btp',
        permanent: true,
      },
      {
        source: '/blog/comment-utiliser-chatgpt-pour-vos-devis-electricien',
        destination: '/blog/chatgpt-devis-electricien-btp',
        permanent: true,
      },
      {
        source: '/blog/comment-utiliser-chatgpt-pour-vos-devis-electricien/',
        destination: '/blog/chatgpt-devis-electricien-btp',
        permanent: true,
      },
      // Articles supprimés — redirection vers le blog
      { source: '/blog/ia-btp-lyon', destination: '/blog', statusCode: 301 },
      { source: '/blog/chatgpt-btp-bordeaux', destination: '/blog', statusCode: 301 },

      // Articles formateurs supprimés — redirection vers /communaute-formateurs
      { source: '/blog/comment-trouver-premiers-clients-formateur', destination: '/communaute-formateurs', statusCode: 301 },
      { source: '/blog/9-actions-developper-activite-formation', destination: '/communaute-formateurs', statusCode: 301 },
      { source: '/blog/prospection-formation-methodes-qui-marchent', destination: '/communaute-formateurs', statusCode: 301 },

      // Articles renommés (lsr-*) — redirection vers nouveau slug
      { source: '/blog/lsr-analyse-dce-notebooklm-claude-btp', destination: '/blog/analyse-dce-notebooklm-claude-btp', statusCode: 301 },
      { source: '/blog/lsr-go-no-go-rentabilite-appels-offres-btp', destination: '/blog/go-no-go-rentabilite-appels-offres-btp', statusCode: 301 },
      { source: '/blog/lsr-memoire-technique-claude-projet-btp', destination: '/blog/memoire-technique-claude-projet-btp', statusCode: 301 },
      { source: '/blog/lsr-chiffrage-cctp-bpu-appels-offres-btp', destination: '/blog/chiffrage-cctp-bpu-appels-offres-btp', statusCode: 301 },
    ];
  },
};

export default nextConfig;
