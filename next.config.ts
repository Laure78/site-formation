import type { NextConfig } from "next";
import { FORMATION_IA_ALL_SLUGS } from "./lib/seo-formation-ia-hub-data";

const formationIaLegacyRedirects = () =>
  FORMATION_IA_ALL_SLUGS.map((slug) => ({
    source: `/formation-ia-${slug}`,
    destination: `/formation-ia/${slug}`,
    permanent: true as const,
  }));

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
