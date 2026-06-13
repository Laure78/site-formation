import type { NextConfig } from "next";
import {
  gscHubMergeRedirects,
  gscRedirects2026April,
  GSC_HUB_MERGED_SLUGS,
} from "./lib/gsc-redirects-2026";
import { FORMATION_IA_ALL_SLUGS } from "./lib/seo-formation-ia-hub-data";

/** Anciennes URLs /formation-ia-{slug} → /formation-ia/{slug} (sauf slugs fusionnés GSC vers landing métier). */
const formationIaLegacyRedirects = () =>
  FORMATION_IA_ALL_SLUGS.filter((slug) => !GSC_HUB_MERGED_SLUGS.has(slug)).map((slug) => ({
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
      // Apex sans www → www (filet de sécurité pour assets exclus du middleware matcher)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'laureolivie.fr' }],
        destination: 'https://www.laureolivie.fr/:path*',
        permanent: true,
      },
      // --- Consolidation blog (juin 2026) — 2 doublons fusionnés vers leur article pilier (308) ---
      {
        source: '/blog/ia-devis-gain-temps-pme-btp',
        destination: '/blog/ia-devis-batiment-chiffrage-automatise',
        permanent: true,
      },
      {
        source: '/blog/memoire-technique-btp-ia-gagner-temps-appels-offres',
        destination: '/blog/ia-memoire-technique-appel-offres-guide-2026',
        permanent: true,
      },
      // --- Plan de canonisation (juin 2026) — 9 doublons → page maître (308) ---
      // Placées en tête pour primer sur les redirections génériques (legacy/GSC) spreadées plus bas.
      { source: '/offres', destination: '/formations', permanent: true },
      { source: '/formation-ia-et-chatgpt', destination: '/formations', permanent: true },
      {
        source: '/formation-ia-assistante-btp',
        destination: '/formation-ia-assistante-administrative-btp',
        permanent: true,
      },
      {
        source: '/formation-ia-appels-offres-btp',
        destination: '/formations/ia-appels-offre-btp',
        permanent: true,
      },
      {
        source: '/formation-ia-analyse-cctp',
        destination: '/formations/formation-ia-cctp-analyse-dce-btp',
        permanent: true,
      },
      {
        source: '/formation-ia-btp-yvelines',
        destination: '/formation-ia-btp-yvelines-78',
        permanent: true,
      },
      {
        source: '/financement-constructys-100-ia-btp',
        destination: '/financement-constructys-formation-ia-btp',
        permanent: true,
      },
      {
        source: '/ressources/guide-conducteur-travaux-ia-btp',
        destination: '/ressources/guide-conducteur-de-travaux',
        permanent: true,
      },
      { source: '/checklist-prompts-btp', destination: '/checklist-ia-btp', permanent: true },
      // Canonique métier : ancienne landing courte → URL formation-
      {
        source: '/ia-conducteur-travaux',
        destination: '/formation-ia-conducteur-de-travaux-btp',
        permanent: true,
      },
      {
        source: '/ia-conducteur-travaux/',
        destination: '/formation-ia-conducteur-de-travaux-btp',
        permanent: true,
      },
      {
        source: '/ressources/skill-ia-conducteur-travaux',
        destination: '/ressources/guide-conducteur-de-travaux',
        permanent: true,
      },
      {
        source: '/ressources/skill-ia-conducteur-travaux/',
        destination: '/ressources/guide-conducteur-de-travaux',
        permanent: true,
      },
      {
        source: '/ressources/skill-ia-conducteur-travaux/merci',
        destination: '/ressources/guide-conducteur-de-travaux/merci',
        permanent: true,
      },
      {
        source: '/ressources/skill-ia-conducteur-travaux/merci/',
        destination: '/ressources/guide-conducteur-de-travaux/merci',
        permanent: true,
      },
      // GSC avril 2026 — 28 URLs (blog parasites, géo, doublons hub & landings)
      ...gscRedirects2026April(),
      ...gscHubMergeRedirects(),
      ...formationIaLegacyRedirects(),
      {
        source: '/formations/ia-rh-btp',
        destination: '/formations',
        permanent: true,
      },
      {
        source: '/formations/ia-rh-btp/:path*',
        destination: '/formations',
        permanent: true,
      },
      {
        source: '/formations/ia-architecture-claude-dpgf',
        destination: '/formations',
        permanent: true,
      },
      {
        source: '/formations/ia-architecture-claude-dpgf/:path*',
        destination: '/formations',
        permanent: true,
      },
      {
        source: '/formations/ia-au-service-du-batiment',
        destination: '/formations/ia-batiment-travaux-publics',
        permanent: true,
      },
      {
        source: '/formations/ia-au-service-du-batiment/:path*',
        destination: '/formations/ia-batiment-travaux-publics',
        permanent: true,
      },
      {
        source: '/formations/ia-travaux-publics',
        destination: '/formations/ia-batiment-travaux-publics',
        permanent: true,
      },
      {
        source: '/formations/ia-travaux-publics/:path*',
        destination: '/formations/ia-batiment-travaux-publics',
        permanent: true,
      },
      {
        source: '/formations/sensibilisation-ia-assistants-personnalises',
        destination: '/formations',
        permanent: true,
      },
      {
        source: '/formations/sensibilisation-ia-assistants-personnalises/:path*',
        destination: '/formations',
        permanent: true,
      },
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
      { source: '/formation-ia-btp', destination: '/formations', permanent: true },
      {
        source: '/documents/checklist-10-prompts-chatgpt-btp',
        destination: '/checklist-ia-btp',
        permanent: true,
      },
      {
        source: '/documents/checklist-10-prompts-chatgpt-btp.html',
        destination: '/checklist-ia-btp',
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

      // Blog : filtres ?categorie= → URLs canoniques /blog/categorie/*
      {
        source: '/blog',
        has: [{ type: 'query', key: 'categorie', value: 'devis' }],
        destination: '/blog/categorie/devis-chiffrage',
        permanent: true,
      },
      {
        source: '/blog',
        has: [{ type: 'query', key: 'categorie', value: 'appels-offres' }],
        destination: '/blog/categorie/appels-offres',
        permanent: true,
      },
      {
        source: '/blog',
        has: [{ type: 'query', key: 'categorie', value: 'financement' }],
        destination: '/blog/categorie/financement-opco',
        permanent: true,
      },
      {
        source: '/blog',
        has: [{ type: 'query', key: 'categorie', value: 'chatgpt' }],
        destination: '/blog/categorie/chatgpt-bonnes-pratiques',
        permanent: true,
      },
      {
        source: '/blog',
        has: [{ type: 'query', key: 'categorie', value: 'metiers' }],
        destination: '/blog/categorie/ia-par-metier',
        permanent: true,
      },
      {
        source: '/blog',
        has: [{ type: 'query', key: 'categorie', value: 'rh' }],
        destination: '/blog/categorie/rh-recrutement',
        permanent: true,
      },
      {
        source: '/blog',
        has: [{ type: 'query', key: 'categorie', value: 'productivite' }],
        destination: '/blog/categorie/productivite-emails',
        permanent: true,
      },

      // Articles formateurs supprimés — redirection vers /communaute-formateurs
      { source: '/blog/comment-trouver-premiers-clients-formateur', destination: '/communaute-formateurs', statusCode: 301 },
      { source: '/blog/9-actions-developper-activite-formation', destination: '/communaute-formateurs', statusCode: 301 },
      { source: '/blog/prospection-formation-methodes-qui-marchent', destination: '/communaute-formateurs', statusCode: 301 },

      // Articles renommés (lsr-*) — redirection vers nouveau slug
      { source: '/blog/lsr-analyse-dce-notebooklm-claude-btp', destination: '/blog/analyse-dce-notebooklm-claude-btp', statusCode: 301 },
      { source: '/blog/lsr-go-no-go-rentabilite-appels-offres-btp', destination: '/blog/go-no-go-rentabilite-appels-offres-btp', statusCode: 301 },
      { source: '/blog/lsr-memoire-technique-claude-projet-btp', destination: '/blog/memoire-technique-claude-projet-btp', statusCode: 301 },
      { source: '/blog/lsr-chiffrage-cctp-bpu-appels-offres-btp', destination: '/blog/chiffrage-cctp-bpu-appels-offres-btp', statusCode: 301 },

      // Blog : fusion SEO (doublons sémantiques — audit avril 2026)
      {
        source: '/blog/analyse-cctp-btp',
        destination: '/blog/analyser-cctp-ia-methode-complete-20-minutes',
        permanent: true,
      },
      {
        source: '/blog/analyse-cctp-chatgpt-btp',
        destination: '/blog/analyser-cctp-ia-methode-complete-20-minutes',
        permanent: true,
      },
      {
        source: '/blog/ia-btp-analyse-dce',
        destination: '/blog/analyse-dce-notebooklm-claude-btp',
        permanent: true,
      },
      {
        source: '/blog/formation-ia-btp-guide-2026',
        destination: '/blog/formation-ia-btp-guide-complet-2026',
        permanent: true,
      },
      {
        source: '/blog/compte-rendu-chantier-ia-methode',
        destination: '/blog/compte-rendu-chantier-ia-automatiser-gagner-temps',
        permanent: true,
      },
      {
        source: '/blog/ia-btp-2026-tendances',
        destination: '/blog/adoption-ia-btp-2026-chiffres-freins-leviers',
        permanent: true,
      },

      // Nettoyage pages villes IDF non différenciées — Avril 2026
      // (Template générique, non indexé par Google — cf. audit SEO)
      { source: '/formation-ia/btp-argenteuil', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-aubervilliers', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-aulnay-sous-bois', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-boulogne-billancourt', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-champigny-sur-marne', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-chelles', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-colombes', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-courbevoie-la-defense', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-evry-courcouronnes', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-issy-les-moulineaux', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-longjumeau', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-mantes-la-jolie', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-massy', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-meaux', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-montreuil', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-noisy-le-grand', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-palaiseau', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-pantin', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-poissy', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-pontault-combault', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-saint-denis', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-saint-maur-des-fosses', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-sarcelles', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-savigny-le-temple', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-villiers-le-bel', destination: '/formation-ia-btp-ile-de-france', permanent: true },
      { source: '/formation-ia/btp-vitry-sur-seine', destination: '/formation-ia-btp-ile-de-france', permanent: true },

      // Anciennes URLs villes hub /formation-ia/btp-[ville] → fiche catalogue /formations/ia-btp-[ville]
      // (308 permanent). Uniquement les villes dont la page cible existe réellement.
      { source: '/formation-ia/btp-paris', destination: '/formations/ia-btp-paris', permanent: true },
      {
        source: '/formation-ia/btp-saint-quentin-en-yvelines',
        destination: '/formations/ia-btp-saint-quentin-en-yvelines',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
