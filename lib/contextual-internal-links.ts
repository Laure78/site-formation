/**
 * Maillage interne contextuel — groupes de liens par type de page (UX + SEO).
 * Toutes les URLs proviennent de `lib/internal-links.ts`.
 */
import { CATALOGUE_NIV_RANGE } from '@/data/formations';
import type { FormationIaMetierBtpConfig } from '@/lib/formation-ia-metier-btp-types';
import {
  CATALOGUE_FORMATIONS_COUNT,
  formationCatalogueLinkLabel,
  getFormationCatalogueByRef,
} from '@/lib/formations-catalogue-display';
import { LINKS, type InternalLinkPath } from '@/lib/internal-links';

const NIV01 = getFormationCatalogueByRef('NIV-01')!;
const NIV02 = getFormationCatalogueByRef('NIV-02')!;
const NIV03 = getFormationCatalogueByRef('NIV-03')!;
const NIV04 = getFormationCatalogueByRef('NIV-04')!;
const NIV05 = getFormationCatalogueByRef('NIV-05')!;

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
    description: 'Versailles, Guyancourt, Saint-Quentin-en-Yvelines — intra-entreprise, dans vos locaux.',
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
    slug: 'paris',
    href: LINKS.formationIaBtpParis,
    title: 'Paris (75)',
    description: 'Paris intra-muros et petite couronne — présentiel intra.',
  },
  {
    slug: 'seine-et-marne-77',
    href: LINKS.formationIaBtpSeineEtMarne77,
    title: 'Seine-et-Marne (77)',
    description: 'Melun, Meaux, Marne-la-Vallée — intra-entreprise, dans vos locaux.',
  },
];

/** Autres départements IDF (landings longues uniquement). */
export const GEO_DEPARTMENT_EXTENDED: (ContextualLinkCard & { slug: string })[] = [
  ...GEO_DEPARTMENT_LINKS,
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
    title: formationCatalogueLinkLabel(NIV01),
    description: 'Devis, CR chantier, emails — session 4 h Qualiopi.',
  },
  {
    href: LINKS.formationAO,
    title: formationCatalogueLinkLabel(NIV02),
    description: 'DCE, mémoire technique, analyse CCTP avec Claude AI.',
  },
  {
    href: LINKS.formationConduiteTravauxSuiviChantier,
    title: formationCatalogueLinkLabel(NIV03),
    description: 'Skills Claude, CCTP, PPSPS, CR, réception chantier — 8 participants max.',
  },
  {
    href: LINKS.formationMaitriserClaudeAiBtp,
    title: formationCatalogueLinkLabel(NIV04),
    description: 'Projets, Skills, Cowork, connecteurs, Claude Code — matin 9h–13h.',
  },
  {
    href: LINKS.formationIaMaitriseOeuvre,
    title: formationCatalogueLinkLabel(NIV05),
    description: 'DCE, CR chantier, OS, courriers MOE et réserves — 3 à 8 participants.',
  },
  {
    href: LINKS.financement,
    title: 'Financement Constructys',
    description: 'OPCO, plafonds pédagogiques, dossier et convention.',
  },
  {
    href: LINKS.formations,
    title: 'Catalogue complet',
    description: `Comparatif des ${CATALOGUE_FORMATIONS_COUNT} sessions, tarifs et modalités.`,
  },
];

export const FORMATION_NIV01_RELATED: ContextualLinkCard[] = [
  {
    href: LINKS.formationAO,
    title: `Passer au ${formationCatalogueLinkLabel(NIV02)}`,
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
    href: LINKS.formationIaMarchePublicTravaux,
    title: 'Formation IA marché public de travaux',
    description: 'Hub commande publique — RC, CCAG-Travaux, Go-NoGo, lots.',
  },
  {
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    title: `Revenir au ${formationCatalogueLinkLabel(NIV01)}`,
    description: 'Devis, administratif et productivité au quotidien.',
  },
  {
    href: LINKS.blogFormationIaCctpAnalyseDceBtp,
    title: 'Comment analyser un DCE/CCTP avec l’IA',
    description: 'Guide informationnel — méthode terrain en 4 étapes.',
  },
  {
    href: LINKS.formationMaitriserClaudeAiBtp,
    title: formationCatalogueLinkLabel(NIV04),
    description: 'Skills RC/DCE et chiffrage sécurisé avec Claude.',
  },
  {
    href: LINKS.financement,
    title: 'Financement Constructys',
    description: 'Éligibilité OPCO et montants selon votre situation.',
  },
];

export const CONDUCTEUR_TRAVAUX_RELATED: ContextualLinkCard[] = [
  {
    href: LINKS.formationConduiteTravauxSuiviChantier,
    title: 'Formation catalogue NIV-03 — conduite de travaux',
    description: 'Session certifiante : CCTP, PPSPS, CR, skills Claude — fiche programme.',
  },
  {
    href: LINKS.iaConducteurTravaux,
    title: 'Guide IA conducteur de travaux BTP',
    description: 'CR, coordination, PPSPS, analyse DCE — page métier canonique.',
  },
  {
    href: LINKS.guideConducteurTravauxIaBtp,
    title: 'Guide PDF conducteur de travaux',
    description: '6 tutos Claude AI — ressource gratuite OFC.',
  },
  {
    href: LINKS.blogCommentIaGagne5hConducteursTravaux,
    title: "Comment l'IA fait gagner 5 h par semaine aux conducteurs de travaux BTP",
    description: 'Méthode terrain pour conducteurs de travaux BTP.',
  },
  {
    href: LINKS.formationIleDeFrance,
    title: 'Formation IA Île-de-France',
    description: 'Intra dans vos locaux — Guyancourt → IDF.',
  },
];

export const GEO_PAGE_UTILITY_LINKS: ContextualLinkCard[] = [
  ...FORMATION_CATALOGUE_CORE.slice(0, 5),
  {
    href: LINKS.aPropos,
    title: 'Laure Olivié — formatrice',
    description: 'Parcours terrain, Qualiopi, références FFB.',
  },
];

export const FORMATION_NIV03_RELATED: ContextualLinkCard[] = [
  {
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    title: `Prérequis — ${formationCatalogueLinkLabel(NIV01)}`,
    description: 'Bases IA chantier et administratif avant le NIV-03.',
  },
  {
    href: LINKS.formationConducteurTravaux,
    title: 'Landing conducteur de travaux',
    description: 'Cas d’usage terrain et visio découverte.',
  },
  {
    href: LINKS.formationAO,
    title: formationCatalogueLinkLabel(NIV02),
    description: 'Mémoire technique et analyse DCE avec Cowork.',
  },
  {
    href: LINKS.formationMaitriserClaudeAiBtp,
    title: formationCatalogueLinkLabel(NIV04),
    description: 'Skills Claude AO, chantier et juridique — complément terrain.',
  },
  {
    href: LINKS.financement,
    title: 'Financement Constructys',
    description: 'OPCO, dossier et convention.',
  },
];

export const FORMATION_NIV04_RELATED: ContextualLinkCard[] = [
  {
    href: LINKS.formationAO,
    title: formationCatalogueLinkLabel(NIV02),
    description: 'DCE, mémoire technique, Cowork & Skills.',
  },
  {
    href: LINKS.formationConduiteTravauxSuiviChantier,
    title: formationCatalogueLinkLabel(NIV03),
    description: 'Skills Claude chantier, CCTP, CR, réception.',
  },
  {
    href: LINKS.claudeAiBtp,
    title: 'Guide Claude AI BTP',
    description: 'Interfaces, prompts, Cowork et Claude Code.',
  },
  {
    href: LINKS.financement,
    title: 'Financement Constructys',
    description: 'OPCO, dossier et convention.',
  },
];

/** Hub global (SitelinksHub) — parcours utilisateur prioritaires. */
export const SITE_NAV_HUB_ITEMS: ContextualLinkCard[] = [
  {
    href: LINKS.formations,
    title: 'Formations',
    description: `Catalogue Qualiopi — ${CATALOGUE_NIV_RANGE}`,
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
  config: Pick<FormationIaMetierBtpConfig, 'csfePartnership' | 'umbPartnership'>
): ContextualLinkCard[] {
  const links: ContextualLinkCard[] = [];

  if (config.csfePartnership) {
    links.push({
      href: LINKS.etudesCas,
      title: 'Étude de cas FFB & CSFE',
      description: 'Retour d’expérience étanchéité et formation IA.',
    });
  }

  if (config.umbPartnership) {
    links.push({
      href: LINKS.partenaires,
      title: 'Partenaires — UMB-FFB & FFB',
      description: 'Union des Métiers du Bois : formations IA avec OFC.',
    });
    links.push({
      href: LINKS.formationIleDeFrance,
      title: 'Formation IA BTP Île-de-France',
      description: 'Sessions présentiel IDF — catalogue et départements.',
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
