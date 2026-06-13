/**
 * Maillage interne contextuel — groupes de liens par type de page (UX + SEO).
 * Toutes les URLs proviennent de `lib/internal-links.ts`.
 */
import type { FormationIaMetierBtpConfig } from '@/lib/formation-ia-metier-btp-types';
import { LINKS, type InternalLinkPath } from '@/lib/internal-links';

export type ContextualLinkCard = {
  href: InternalLinkPath | string;
  title: string;
  description?: string;
};

function dedupeContextualLinks(links: ContextualLinkCard[]): ContextualLinkCard[] {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

/** Pages département « formation IA BTP » (GeoFormationPage + landings longues). */
export const GEO_DEPARTMENT_LINKS: (ContextualLinkCard & { slug: string })[] = [
  {
    slug: 'yvelines-78',
    href: LINKS.formationIaBtpYvelines78,
    title: 'Yvelines (78)',
    description: 'Versailles, Guyancourt, Saint-Quentin-en-Yvelines — intra et inter.',
  },
  {
    slug: 'essonne-91',
    href: LINKS.formationIaBtpEssonne91,
    title: 'Essonne (91)',
    description: 'Massy, Évry, Palaiseau — sessions sur vos documents réels.',
  },
  {
    slug: 'hauts-de-seine-92',
    href: LINKS.formationIaBtpHautsDeSeine92,
    title: 'Hauts-de-Seine (92)',
    description: 'Nanterre, Boulogne, La Défense — PME bâtiment et TP.',
  },
  {
    slug: 'val-doise-95',
    href: LINKS.formationIaBtpValDoise95,
    title: "Val-d'Oise (95)",
    description: 'Cergy, Argenteuil, Pontoise — déplacements depuis Guyancourt.',
  },
  {
    slug: 'paris-75',
    href: LINKS.formationIaBtpParis75,
    title: 'Paris (75)',
    description: 'Paris intra-muros et petite couronne — présentiel intra.',
  },
];

/** Autres départements IDF (landings longues uniquement). */
export const GEO_DEPARTMENT_EXTENDED: (ContextualLinkCard & { slug: string })[] = [
  ...GEO_DEPARTMENT_LINKS,
  {
    slug: 'seine-et-marne-77',
    href: LINKS.formationIaBtpSeineEtMarne77,
    title: 'Seine-et-Marne (77)',
    description: 'Meaux, Melun, Marne-la-Vallée — marchés publics locaux.',
  },
  {
    slug: 'seine-saint-denis-93',
    href: LINKS.formationIaBtpSeineSaintDenis93,
    title: 'Seine-Saint-Denis (93)',
    description: 'Saint-Denis, Montreuil, Bobigny — rénovation urbaine.',
  },
  {
    slug: 'val-de-marne-94',
    href: LINKS.formationIaBtpValDeMarne94,
    title: 'Val-de-Marne (94)',
    description: 'Créteil, Vitry, Ivry — PME et grands comptes.',
  },
];

export function getGeoSisterDepartmentLinks(
  currentSlug: string,
  limit = 4,
  pool: readonly (ContextualLinkCard & { slug: string })[] = GEO_DEPARTMENT_LINKS
): ContextualLinkCard[] {
  return pool.filter((item) => item.slug !== currentSlug).slice(0, limit);
}

/** Liens transverses catalogue NIV-01 / NIV-02. */
export const FORMATION_CATALOGUE_CORE: ContextualLinkCard[] = [
  {
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    title: 'NIV-01 — IA bâtiment & travaux publics',
    description: 'Devis, CR chantier, emails — session 4 h Qualiopi.',
  },
  {
    href: LINKS.formationAO,
    title: "NIV-02 — Appels d'offres BTP",
    description: 'DCE, mémoire technique, analyse CCTP avec Claude AI.',
  },
  {
    href: LINKS.financement,
    title: 'Financement Constructys',
    description: 'OPCO, plafonds pédagogiques, dossier et convention.',
  },
  {
    href: LINKS.formations,
    title: 'Catalogue complet',
    description: 'Comparatif des 2 sessions, tarifs et modalités.',
  },
];

export const FORMATION_NIV01_RELATED: ContextualLinkCard[] = [
  {
    href: LINKS.formationAO,
    title: "Passer au NIV-02 — Appels d'offres",
    description: 'Mémoire technique, DCE et réponses marchés publics.',
  },
  {
    href: LINKS.formationConducteurTravaux,
    title: 'Formation IA conducteur de travaux',
    description: 'CR, PPSPS, relances — cas d’usage terrain.',
  },
  {
    href: LINKS.formationIleDeFrance,
    title: 'Formation IA Île-de-France',
    description: 'Interventions intra dans vos locaux franciliens.',
  },
  {
    href: LINKS.blogFormationIaBtpGuide2026,
    title: 'Guide formation IA BTP 2026',
    description: 'Article pilier — choisir sa session et financer.',
  },
];

export const FORMATION_NIV02_RELATED: ContextualLinkCard[] = [
  {
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    title: 'Revenir au NIV-01 — Bâtiment & TP',
    description: 'Devis, administratif et productivité au quotidien.',
  },
  {
    href: LINKS.formationIaCctpAnalyseDceBtp,
    title: 'Formation analyse CCTP & DCE',
    description: 'Approfondir la lecture des pièces marché.',
  },
  {
    href: LINKS.blogIaAnalyseCctpMethode,
    title: 'Méthode IA analyse CCTP',
    description: 'Article — prompts et workflow sur pièces DCE.',
  },
  {
    href: LINKS.financement,
    title: 'Financement Constructys',
    description: 'Éligibilité OPCO et montants selon votre situation.',
  },
];

export const CONDUCTEUR_TRAVAUX_RELATED: ContextualLinkCard[] = [
  {
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    title: 'Programme catalogue NIV-01',
    description: 'Session 4 h — devis, CR, administratif chantier.',
  },
  {
    href: LINKS.guideConducteurTravauxIaBtp,
    title: 'Guide PDF conducteur de travaux',
    description: '6 tutos Claude AI — ressource gratuite OFC.',
  },
  {
    href: LINKS.blogCommentIaGagne5hConducteursTravaux,
    title: 'Gagner 5 h/semaine avec l’IA',
    description: 'Méthode terrain pour conducteurs de travaux BTP.',
  },
  {
    href: LINKS.formationIleDeFrance,
    title: 'Formation IA Île-de-France',
    description: 'Intra dans vos locaux — Guyancourt → IDF.',
  },
];

export const GEO_PAGE_UTILITY_LINKS: ContextualLinkCard[] = [
  ...FORMATION_CATALOGUE_CORE.slice(0, 3),
  {
    href: LINKS.aPropos,
    title: 'Laure Olivié — formatrice',
    description: 'Parcours terrain, Qualiopi, références FFB.',
  },
];

/** Hub global (SitelinksHub) — parcours utilisateur prioritaires. */
export const SITE_NAV_HUB_ITEMS: ContextualLinkCard[] = [
  {
    href: LINKS.formations,
    title: 'Formations',
    description: 'Catalogue Qualiopi — NIV-01 et NIV-02',
  },
  {
    href: LINKS.financement,
    title: 'Financement',
    description: 'Constructys, OPCO, dossier',
  },
  {
    href: LINKS.formationConducteurTravaux,
    title: 'Conducteur de travaux',
    description: 'CR, PPSPS, DCE — cas terrain',
  },
  {
    href: LINKS.blog,
    title: 'Blog & guides',
    description: 'Articles IA BTP, bonnes pratiques',
  },
  {
    href: LINKS.formationIleDeFrance,
    title: 'Île-de-France',
    description: 'Sessions par département francilien',
  },
  {
    href: LINKS.prendreRdv,
    title: 'Prendre RDV',
    description: 'Visio découverte gratuite — 30 min',
  },
];

/** Liens catalogue + ressources — landings métier BTP. */
export function getMetierLandingCoreLinks(
  config: Pick<FormationIaMetierBtpConfig, 'csfePartnership'>
): ContextualLinkCard[] {
  const links: ContextualLinkCard[] = [];

  if (config.csfePartnership) {
    links.push({
      href: LINKS.etudesCas,
      title: 'Étude de cas FFB & CSFE',
      description: 'Retour d’expérience étanchéité et formation IA.',
    });
  }

  links.push(
    ...FORMATION_CATALOGUE_CORE,
    {
      href: LINKS.claudeAiBtp,
      title: 'Claude AI & BTP',
      description: 'Interfaces, prompts et usages professionnels (Anthropic).',
    },
    {
      href: LINKS.aPropos,
      title: 'Laure Olivié — formatrice',
      description: 'Parcours terrain, Qualiopi, références FFB.',
    },
    {
      href: LINKS.blog,
      title: 'Blog IA & BTP',
      description: 'Articles complémentaires et guides pratiques.',
    }
  );

  return dedupeContextualLinks(links);
}

/** Métiers proches — depuis la config landing (ancres descriptives). */
export function getMetierRelatedLinks(
  config: Pick<FormationIaMetierBtpConfig, 'relatedMetierLinks'>
): ContextualLinkCard[] {
  return (config.relatedMetierLinks ?? []).map(({ href, title, description }) => ({
    href,
    title,
    description,
  }));
}

/** Footer — accès rapide aux landings métier les plus consultées. */
export const FOOTER_METIER_LINKS: ContextualLinkCard[] = [
  { href: LINKS.formationConducteurTravaux, title: 'Conducteur de travaux' },
  { href: LINKS.formationChargeAffairesBtp, title: "Chargé d'affaires" },
  { href: LINKS.formationElectricienBtp, title: 'Électricien' },
  { href: LINKS.formationPlombierBtp, title: 'Plombier' },
  { href: LINKS.chatgptArtisans, title: 'Artisans & TPE' },
  { href: LINKS.formationIaDirigeantBtp, title: 'Dirigeant PME' },
  { href: LINKS.formationIaEtancheur, title: 'Étancheur' },
  { href: LINKS.formationIaAssistanteBtp, title: 'Assistante administrative' },
];

/** Footer — pages locales par département IDF. */
export const FOOTER_GEO_LINKS: ContextualLinkCard[] = [
  ...GEO_DEPARTMENT_LINKS.map(({ href, title }) => ({ href, title })),
  { href: LINKS.formationIleDeFrance, title: 'Toute l’Île-de-France' },
];
