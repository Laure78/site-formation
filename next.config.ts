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
      {
        source: '/formations/claude-ia-chat-cowork-code-skills-btp',
        destination: '/formations/formation-claude-ia-btp',
        permanent: true,
      },
      {
        source: '/formations/claude-ia-chat-cowork-code-skills-btp/:path*',
        destination: '/formations/formation-claude-ia-btp/:path*',
        permanent: true,
      },
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
        destination: '/formation-ia-btp-paris-75',
        permanent: true,
      },
      {
        source: '/formation-ia-btp-paris',
        destination: '/formation-ia-btp-paris-75',
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
      { source: '/formation-ia/btp-paris', destination: '/formation-ia-btp-paris-75', permanent: true },
      {
        source: '/formation-ia/btp-saint-quentin-en-yvelines',
        destination: '/formations/ia-btp-saint-quentin-en-yvelines',
        permanent: true,
      },

      // --- Images renommées (SEO) — 301 vers nouveaux chemins /public ---
      {
        source: '/images/formation-ia-artisans-2026.png',
        destination: '/images/formation-ia-artisans-batiment-laure-olivie-2026.png',
        permanent: true,
      },
      {
        source: '/images/accueil-reference-partenaires-laure-ofc-2026.jpg',
        destination: '/images/formation-ia-dirigeant-pme-btp.webp',
        permanent: true,
      },
      {
        source: '/images/accueil-reference-partenaires-laure-ofc-2026.png',
        destination: '/images/formation-ia-dirigeant-pme-btp.webp',
        permanent: true,
      },
      {
        source: '/images/hero-accueil-formation-ia-btp-echange-2026.jpg',
        destination: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
        permanent: true,
      },
      {
        source: '/images/hero-accueil-formation-ia-btp-echange-2026.png',
        destination: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
        permanent: true,
      },
      {
        source: '/images/hero-formation-ia-btp-visio-2026.jpg',
        destination: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
        permanent: true,
      },
      {
        source: '/images/accueil-hero-formation-ia-btp-laure-olivie-2026.png',
        destination: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
        permanent: true,
      },
      {
        source: '/images/accueil-formation-ia-btp-salle-presentiel-2026.png',
        destination: '/images/formation-ia-btp-salle-laure-olivie.webp',
        permanent: true,
      },
      {
        source: '/images/accueil-ia-appliquee-chantier-btp-2026.png',
        destination: '/images/formation-ia-chantier-conducteur-travaux.webp',
        permanent: true,
      },
      {
        source: '/images/accueil-ia-devis-chiffrage-btp-2026.png',
        destination: '/images/formation-ia-devis-chiffrage-btp.webp',
        permanent: true,
      },
      {
        source: '/images/accueil-analyse-dce-appels-offres-btp-2026.png',
        destination: '/images/formation-ia-analyse-dce-btp.webp',
        permanent: true,
      },
      {
        source: '/images/accueil-compte-rendu-doe-pv-chantier-2026.png',
        destination: '/images/formation-ia-compte-rendu-chantier.webp',
        permanent: true,
      },
      {
        source: '/images/accueil-etude-cas-ffb-laure-intervention.jpg',
        destination: '/images/formation-ia-btp-ffb-salle.webp',
        permanent: true,
      },
      {
        source: '/images/bework-hero-relais-administratif-support.png',
        destination: '/images/bework-relais-administratif-chantier-support.webp',
        permanent: true,
      },
      {
        source: '/images/formation-niv-01-ia-batiment-travaux-publics-2026.png',
        destination: '/images/formation-ia-batiment-travaux-publics.webp',
        permanent: true,
      },
      {
        source: '/images/formation-niv-02-ia-appels-offre-btp-2026.png',
        destination: '/images/formation-ia-appels-offres-btp.webp',
        permanent: true,
      },
      {
        source: '/images/formation-niv-03-ia-conduite-travaux-2026.png',
        destination: '/images/formation-ia-conduite-travaux-btp.webp',
        permanent: true,
      },
      {
        source: '/images/formation-niv-04-maitriser-claude-ai-btp-2026.png',
        destination: '/images/formation-claude-ai-btp-catalogue.webp',
        permanent: true,
      },
      {
        source: '/images/formation-niv-05-ia-maitrise-oeuvre-2026.png',
        destination: '/images/formation-ia-maitrise-oeuvre-btp.webp',
        permanent: true,
      },
      {
        source: '/images/logo-qualiopi-actions-de-formation.png',
        destination: '/images/logo-qualiopi-certifopac-actions-formation.png',
        permanent: true,
      },
      {
        source: '/images/laure-portrait-laureolivie-fr-2026.jpg',
        destination: '/images/formatrice-ia-btp-laure-olivie.webp',
        permanent: true,
      },
      {
        source: '/images/ouvrier-plan-chantier.png',
        destination: '/images/formation-ia-conducteur-travaux-plans.webp',
        permanent: true,
      },
      {
        source: '/images/architecte-concentration.png',
        destination: '/images/formation-ia-analyse-plans-btp.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-btp-entreprise.png',
        destination: '/images/formation-ia-intra-entreprise-batiment.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/ffb-logo-officiel.png',
        destination: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/ffb-grand-paris-ile-de-france.png',
        destination: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/csfe-logo.png',
        destination: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/cnam-entreprises.png',
        destination: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/arfab.png',
        destination: '/images/partenaires/logo-arfab-partenaire-formation-btp.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/ifrb-78.jpg',
        destination: '/images/partenaires/logo-ifrb-77-formation-batiment.webp',
        permanent: true,
      },
      // --- WebP (accueil) — 301 depuis chemins SEO .png / .jpg intermédiaires ---
      {
        source: '/images/formation-ia-btp-laure-olivie-dashboard.png',
        destination: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-btp-atelier-salle-presentiel.png',
        destination: '/images/formation-ia-btp-salle-laure-olivie.webp',
        permanent: true,
      },
      {
        source: '/images/ia-chantier-conducteur-travaux-tablette.png',
        destination: '/images/formation-ia-chantier-conducteur-travaux.webp',
        permanent: true,
      },
      {
        source: '/images/ia-devis-chiffrage-batiment-automatisation.png',
        destination: '/images/formation-ia-devis-chiffrage-btp.webp',
        permanent: true,
      },
      {
        source: '/images/ia-analyse-dce-appels-offres-btp.png',
        destination: '/images/formation-ia-analyse-dce-btp.webp',
        permanent: true,
      },
      {
        source: '/images/ia-compte-rendu-doe-pv-chantier.png',
        destination: '/images/formation-ia-compte-rendu-chantier.webp',
        permanent: true,
      },
      {
        source: '/images/laure-olivie-dirigeant-pme-formation-btp.png',
        destination: '/images/formation-ia-dirigeant-pme-btp.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-btp-ffb-etude-cas-salle.jpg',
        destination: '/images/formation-ia-btp-ffb-salle.webp',
        permanent: true,
      },
      {
        source: '/images/bework-relais-administratif-chantier-support.png',
        destination: '/images/bework-relais-administratif-chantier-support.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-batiment-travaux-publics-catalogue.png',
        destination: '/images/formation-ia-batiment-travaux-publics.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-appels-offres-dce-btp.png',
        destination: '/images/formation-ia-appels-offres-btp.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-conduite-travaux-chantier.png',
        destination: '/images/formation-ia-conduite-travaux-btp.webp',
        permanent: true,
      },
      {
        source: '/images/formation-claude-ai-btp-maitrise-catalogue.png',
        destination: '/images/formation-claude-ai-btp-catalogue.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-maitrise-oeuvre-moex-btp.png',
        destination: '/images/formation-ia-maitrise-oeuvre-btp.webp',
        permanent: true,
      },
      {
        source: '/images/logo-qualiopi-certification-formation-actions.png',
        destination: '/images/logo-qualiopi-certifopac-actions-formation.png',
        permanent: true,
      },
      {
        source: '/images/laure-olivie-formatrice-ia-btp-portrait.jpg',
        destination: '/images/formatrice-ia-btp-laure-olivie.webp',
        permanent: true,
      },
      {
        source: '/images/conducteur-travaux-plans-chantier-btp.png',
        destination: '/images/formation-ia-conducteur-travaux-plans.webp',
        permanent: true,
      },
      {
        source: '/images/analyse-dce-plans-architecte-btp.png',
        destination: '/images/formation-ia-analyse-plans-btp.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-btp-intra-entreprise-presentiel.png',
        destination: '/images/formation-ia-intra-entreprise-batiment.webp',
        permanent: true,
      },
      {
        source: '/images/laure-avatar-bleu-2026.png',
        destination: '/images/laure-avatar-bleu-2026.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.png',
        destination: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/logo-ffb-grand-paris-formation-idf.png',
        destination: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/logo-csfe-partenaire-formation-btp.png',
        destination: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/logo-cnam-formation-continue-ia-btp.png',
        destination: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/logo-arfab-partenaire-formation-btp.png',
        destination: '/images/partenaires/logo-arfab-partenaire-formation-btp.webp',
        permanent: true,
      },
      {
        source: '/images/partenaires/logo-ifrb-77-formation-batiment.jpg',
        destination: '/images/partenaires/logo-ifrb-77-formation-batiment.webp',
        permanent: true,
      },
      {
        source: '/images/rencontres-artisans-ia-ffb-btp.png',
        destination: '/images/rencontres-artisans-ia-ffb-btp.jpg',
        permanent: true,
      },
      // --- 2e passe SEO/GEO accueil (juin 2026) — 301 depuis noms intermédiaires ---
      {
        source: '/images/formation-ia-btp-laure-olivie-dashboard.webp',
        destination: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-btp-atelier-salle-presentiel.webp',
        destination: '/images/formation-ia-btp-salle-laure-olivie.webp',
        permanent: true,
      },
      {
        source: '/images/ia-chantier-conducteur-travaux-tablette.webp',
        destination: '/images/formation-ia-chantier-conducteur-travaux.webp',
        permanent: true,
      },
      {
        source: '/images/ia-devis-chiffrage-batiment-automatisation.webp',
        destination: '/images/formation-ia-devis-chiffrage-btp.webp',
        permanent: true,
      },
      {
        source: '/images/ia-analyse-dce-appels-offres-btp.webp',
        destination: '/images/formation-ia-analyse-dce-btp.webp',
        permanent: true,
      },
      {
        source: '/images/ia-compte-rendu-doe-pv-chantier.webp',
        destination: '/images/formation-ia-compte-rendu-chantier.webp',
        permanent: true,
      },
      {
        source: '/images/laure-olivie-dirigeant-pme-formation-btp.webp',
        destination: '/images/formation-ia-dirigeant-pme-btp.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-btp-ffb-etude-cas-salle.webp',
        destination: '/images/formation-ia-btp-ffb-salle.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-batiment-travaux-publics-catalogue.webp',
        destination: '/images/formation-ia-batiment-travaux-publics.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-appels-offres-dce-btp.webp',
        destination: '/images/formation-ia-appels-offres-btp.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-conduite-travaux-chantier.webp',
        destination: '/images/formation-ia-conduite-travaux-btp.webp',
        permanent: true,
      },
      {
        source: '/images/formation-claude-ai-btp-maitrise-catalogue.webp',
        destination: '/images/formation-claude-ai-btp-catalogue.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-maitrise-oeuvre-moex-btp.webp',
        destination: '/images/formation-ia-maitrise-oeuvre-btp.webp',
        permanent: true,
      },
      {
        source: '/images/laure-olivie-formatrice-ia-btp-portrait.webp',
        destination: '/images/formatrice-ia-btp-laure-olivie.webp',
        permanent: true,
      },
      {
        source: '/images/conducteur-travaux-plans-chantier-btp.webp',
        destination: '/images/formation-ia-conducteur-travaux-plans.webp',
        permanent: true,
      },
      {
        source: '/images/analyse-dce-plans-architecte-btp.webp',
        destination: '/images/formation-ia-analyse-plans-btp.webp',
        permanent: true,
      },
      {
        source: '/images/formation-ia-btp-intra-entreprise-presentiel.webp',
        destination: '/images/formation-ia-intra-entreprise-batiment.webp',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
