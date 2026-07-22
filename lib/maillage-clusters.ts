/**
 * Maillage interne par clusters (liens CONTEXTUELS — pas footer).
 * Chaque page d’un cluster reçoit 3–5 liens via `getClusterRelatedLinks(path)`.
 */
import { LINKS } from '@/lib/internal-links';

export type RelatedLinkItem = {
  href: string;
  /** Ancre descriptive riche en mots-clés (jamais « cliquez ici »). */
  label: string;
  description?: string;
};

export type MaillageClusterId = 'geo' | 'metiers' | 'catalogue' | 'claude' | 'marche-public';

type ClusterPageConfig = {
  cluster: MaillageClusterId;
  /** Titre de section (varié par type de page). */
  title: string;
  subtitle?: string;
  links: RelatedLinkItem[];
};

/** Adjacence IDF — voisins pour satellites géo. */
const GEO_NEIGHBORS: Record<string, string[]> = {
  'seine-et-marne-77': ['seine-saint-denis-93', 'val-de-marne-94'],
  'yvelines-78': ['essonne-91', 'hauts-de-seine-92'],
  'essonne-91': ['yvelines-78', 'val-de-marne-94'],
  'hauts-de-seine-92': ['paris', 'yvelines-78'],
  'seine-saint-denis-93': ['paris', 'val-de-marne-94'],
  'val-de-marne-94': ['paris', 'seine-saint-denis-93'],
  'val-doise-95': ['yvelines-78', 'hauts-de-seine-92'],
  paris: ['hauts-de-seine-92', 'seine-saint-denis-93', 'val-de-marne-94'],
};

const GEO_DEPT: Record<string, { href: string; short: string; long: string }> = {
  'seine-et-marne-77': {
    href: LINKS.formationIaBtpSeineEtMarne77,
    short: 'Seine-et-Marne (77)',
    long: 'Formation IA BTP en Seine-et-Marne (77)',
  },
  'yvelines-78': {
    href: LINKS.formationIaBtpYvelines78,
    short: 'Yvelines (78)',
    long: 'Formation IA pour le BTP dans les Yvelines (78)',
  },
  'essonne-91': {
    href: LINKS.formationIaBtpEssonne91,
    short: 'Essonne (91)',
    long: 'Formation IA BTP en Essonne (91)',
  },
  'hauts-de-seine-92': {
    href: LINKS.formationIaBtpHautsDeSeine92,
    short: 'Hauts-de-Seine (92)',
    long: 'Formation IA BTP dans les Hauts-de-Seine (92)',
  },
  'seine-saint-denis-93': {
    href: LINKS.formationIaBtpSeineSaintDenis93,
    short: 'Seine-Saint-Denis (93)',
    long: 'Formation IA BTP en Seine-Saint-Denis (93)',
  },
  'val-de-marne-94': {
    href: LINKS.formationIaBtpValDeMarne94,
    short: 'Val-de-Marne (94)',
    long: 'Formation IA BTP dans le Val-de-Marne (94)',
  },
  'val-doise-95': {
    href: LINKS.formationIaBtpValDoise95,
    short: "Val-d'Oise (95)",
    long: "Formation IA BTP dans le Val-d'Oise (95)",
  },
  paris: {
    href: LINKS.formationIaBtpParis,
    short: 'Paris (75)',
    long: 'Formation IA BTP à Paris (75)',
  },
};

/** Métier suggéré par département (1 lien satellite métier). */
const GEO_METIER_BY_DEPT: Record<string, RelatedLinkItem> = {
  'seine-et-marne-77': {
    href: LINKS.formationConducteurTravaux,
    label: 'Formation IA conducteur de travaux BTP',
    description: 'CR chantier, CCTP et pilotage — cas terrain franciliens.',
  },
  'yvelines-78': {
    href: LINKS.formationIaMaconBtp,
    label: 'Formation IA maçon & maçonnerie — gros œuvre',
    description: 'DTU 20.1, métré, devis — sessions présentiel IDF.',
  },
  'essonne-91': {
    href: LINKS.formationElectricienBtp,
    label: 'Formation IA électricien BTP',
    description: 'Devis tableautage, NF C 15-100, mémoires — Qualiopi.',
  },
  'hauts-de-seine-92': {
    href: LINKS.formationChargeAffairesBtp,
    label: "Formation IA chargé d'affaires BTP",
    description: 'Appels d’offres, DCE et suivi commercial.',
  },
  'seine-saint-denis-93': {
    href: LINKS.formationIaEtancheur,
    label: 'Formation IA étancheur BTP (partenariat CSFE)',
    description: 'Mémoires, DTU 43, CCTP étanchéité.',
  },
  'val-de-marne-94': {
    href: LINKS.formationPlombierBtp,
    label: 'Formation IA plombier chauffagiste',
    description: 'Devis sanitaire, DTU 60, dossiers aides.',
  },
  'val-doise-95': {
    href: LINKS.formationIaCharpentierMenuisierBtp,
    label: 'Formation IA charpentier & menuisier bois',
    description: 'DTU 31.1/31.2, agencement — angle UMB-FFB.',
  },
  paris: {
    href: LINKS.formationIaDirigeantBtp,
    label: 'Formation IA dirigeant PME BTP',
    description: 'ROI et déploiement IA pour décideurs du bâtiment.',
  },
};

function geoSlugFromPath(path: string): string | null {
  if (path === LINKS.formationIaBtpParis || path === '/formation-ia-btp-paris') return 'paris';
  const m = path.match(/\/formation-ia-btp-(.+)$/);
  return m ? m[1] : null;
}

function buildGeoSatelliteLinks(slug: string): RelatedLinkItem[] {
  const neighbors = (GEO_NEIGHBORS[slug] ?? []).slice(0, slug === 'paris' ? 3 : 2);
  const pillarAnchors = [
    'Formation IA BTP Île-de-France — vue régionale',
    'Sessions IA bâtiment en Île-de-France (présentiel)',
    'Programme formation IA pour le BTP en IDF',
  ];
  const pillarLabel = pillarAnchors[slug.length % pillarAnchors.length]!;
  const links: RelatedLinkItem[] = [
    {
      href: LINKS.formationIleDeFrance,
      label: pillarLabel,
      description: 'Pilier géo : formats intra/inter, 8 départements, financement.',
    },
  ];
  for (const n of neighbors) {
    const d = GEO_DEPT[n];
    if (!d) continue;
    links.push({
      href: d.href,
      label: d.long,
      description: `Page locale ${d.short} — intra dans vos locaux.`,
    });
  }
  const metier = GEO_METIER_BY_DEPT[slug];
  if (metier) links.push(metier);
  return dedupeLinks(links).slice(0, 5);
}

function buildGeoPillarLinks(): RelatedLinkItem[] {
  const order = [
    'paris',
    'seine-et-marne-77',
    'yvelines-78',
    'essonne-91',
    'hauts-de-seine-92',
    'seine-saint-denis-93',
    'val-de-marne-94',
    'val-doise-95',
  ] as const;
  return order.map((slug, i) => {
    const d = GEO_DEPT[slug]!;
    const labels = [
      d.long,
      `Formation IA appliquée au bâtiment — ${d.short}`,
      `Sessions ChatGPT BTP ${d.short}`,
    ];
    return {
      href: d.href,
      label: labels[i % labels.length]!,
      description: `Landing locale ${d.short}.`,
    };
  });
}

/** Satellites métier prioritaires du cluster (hub `/formation-ia`). */
type MetierClusterEntry = {
  path: string;
  close: [string, string];
  catalogue: RelatedLinkItem;
  blog: RelatedLinkItem;
  hubAnchor: string;
};

const METIER_CLUSTER: Record<string, MetierClusterEntry> = {
  [LINKS.formationElectricienBtp]: {
    path: LINKS.formationElectricienBtp,
    close: [LINKS.formationPlombierBtp, LINKS.formationChargeAffairesBtp],
    catalogue: {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'Catalogue NIV-01 — IA au service du bâtiment & TP',
      description: 'Session 4 h devis, CR, emails — Qualiopi.',
    },
    blog: {
      href: '/blog/ia-et-electricien-5-gains-de-temps-concrets',
      label: 'IA et électricien : 5 gains de temps concrets',
      description: 'Article blog — usages ChatGPT sur le lot électricité.',
    },
    hubAnchor: 'Hub formation IA BTP — tous les métiers',
  },
  [LINKS.formationPlombierBtp]: {
    path: LINKS.formationPlombierBtp,
    close: [LINKS.formationElectricienBtp, LINKS.formationIaMaconBtp],
    catalogue: {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'Formation IA niveau 1 bâtiment & travaux publics',
      description: 'Bases ChatGPT pour plomberie-chauffage et second œuvre.',
    },
    blog: {
      href: '/blog/ia-et-plombier-5-gains-de-temps-concrets',
      label: 'IA et plombier : 5 gains de temps sur le devis et le SAV',
    },
    hubAnchor: 'Parcourir les formations IA par métier BTP',
  },
  [LINKS.formationConducteurTravaux]: {
    path: LINKS.formationConducteurTravaux,
    close: [LINKS.formationChargeAffairesBtp, LINKS.formationIaMaconBtp],
    catalogue: {
      href: LINKS.formationConduiteTravauxSuiviChantier,
      label: 'Fiche catalogue NIV-03 — conduite de travaux & suivi chantier',
      description: 'Skills Claude, CCTP, CR, réception.',
    },
    blog: {
      href: LINKS.blogGuideSkillIaConducteurTravaux,
      label: 'Guide skill IA conducteur de travaux BTP',
    },
    hubAnchor: 'Hub métiers — formation IA pour le BTP',
  },
  [LINKS.formationChargeAffairesBtp]: {
    path: LINKS.formationChargeAffairesBtp,
    close: [LINKS.formationConducteurTravaux, LINKS.formationIaDirigeantBtp],
    catalogue: {
      href: LINKS.formationAO,
      label: 'Catalogue NIV-02 — IA appliquée aux appels d’offres BTP',
      description: 'DCE, mémoire technique, Claude Cowork.',
    },
    blog: {
      href: '/blog/ia-memoire-technique-appel-offres-guide-2026',
      label: 'Mémoire technique et IA : guide appels d’offres 2026',
    },
    hubAnchor: 'Toutes les pages métier formation IA BTP',
  },
  [LINKS.formationIaDirigeantBtp]: {
    path: LINKS.formationIaDirigeantBtp,
    close: [LINKS.formationChargeAffairesBtp, LINKS.chatgptArtisans],
    catalogue: {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'Session catalogue — L’IA au service du bâtiment (NIV-01)',
    },
    blog: {
      href: LINKS.blogFormationIaBtpGuide2026,
      label: 'Guide complet formation IA BTP 2026',
    },
    hubAnchor: 'Hub formation IA — métiers du bâtiment',
  },
  [LINKS.formationIaEtancheur]: {
    path: LINKS.formationIaEtancheur,
    close: [LINKS.formationIaCouvreurBtp, LINKS.formationIaMaconBtp],
    catalogue: {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'Programme Qualiopi IA bâtiment & TP (niveau 1)',
    },
    blog: {
      href: '/blog/ia-et-couvreur-5-gains-de-temps-concrets',
      label: 'IA et couvreur : gains de temps (interfaces étanchéité)',
    },
    hubAnchor: 'Hub IA BTP — métiers enveloppe et structure',
  },
  [LINKS.formationIaAssistanteBtp]: {
    path: LINKS.formationIaAssistanteBtp,
    close: [LINKS.formationIaAssistanteGestionBtp, LINKS.formationChargeAffairesBtp],
    catalogue: {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'Formation IA catalogue — administratif et chantier',
    },
    blog: {
      href: '/blog/automatiser-emails-clients-btp-ia',
      label: 'Automatiser les emails clients BTP avec l’IA',
    },
    hubAnchor: 'Hub formation IA pour les fonctions support BTP',
  },
  [LINKS.formationIaAssistanteGestionBtp]: {
    path: LINKS.formationIaAssistanteGestionBtp,
    close: [LINKS.formationIaAssistanteBtp, LINKS.formationChargeAffairesBtp],
    catalogue: {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'Session catalogue — IA pour le bureau et le chantier',
    },
    blog: {
      href: '/blog/automatiser-emails-clients-btp-ia',
      label: 'Emails, relances et facturation BTP assistés par l’IA',
    },
    hubAnchor: 'Hub métiers — formation IA back-office BTP',
  },
  [LINKS.formationIaCharpentierMenuisierBtp]: {
    path: LINKS.formationIaCharpentierMenuisierBtp,
    close: [LINKS.formationIaMaconBtp, LINKS.formationIaCouvreurBtp],
    catalogue: {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'NIV-01 — formation IA appliquée au bâtiment',
    },
    blog: {
      href: '/blog/ia-et-charpentier-5-gains-de-temps-concrets',
      label: 'IA et charpentier : 5 gains de temps concrets',
    },
    hubAnchor: 'Hub métiers du bois et du bâtiment — formation IA',
  },
  [LINKS.formationIaMaconBtp]: {
    path: LINKS.formationIaMaconBtp,
    close: [LINKS.formationIaCharpentierMenuisierBtp, LINKS.formationConducteurTravaux],
    catalogue: {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'Fiche NIV-01 — IA pour gros œuvre et second œuvre',
    },
    blog: {
      href: '/blog/ia-et-macon-5-gains-de-temps-concrets',
      label: 'IA et maçon : 5 gains de temps sur devis et CR',
    },
    hubAnchor: 'Formation IA BTP — hub par métier',
  },
  [LINKS.chatgptArtisans]: {
    path: LINKS.chatgptArtisans,
    close: [LINKS.formationIaDirigeantBtp, LINKS.formationIaDirigeantPmeBtp],
    catalogue: {
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'Catalogue — formation IA pour TPE & PME du bâtiment',
    },
    blog: {
      href: '/blog/5-cas-usage-chatgpt-artisans-btp',
      label: '5 cas d’usage ChatGPT pour entreprises du BTP',
    },
    hubAnchor: 'Hub formation IA — métiers et lots BTP',
  },
};

const METIER_LABELS: Record<string, string> = {
  [LINKS.formationElectricienBtp]: 'Formation IA électricien BTP',
  [LINKS.formationPlombierBtp]: 'Formation IA plombier chauffagiste',
  [LINKS.formationConducteurTravaux]: 'Formation IA conducteur de travaux',
  [LINKS.formationChargeAffairesBtp]: "Formation IA chargé d'affaires BTP",
  [LINKS.formationIaDirigeantBtp]: 'Formation IA dirigeant PME BTP',
  [LINKS.formationIaEtancheur]: 'Formation IA étancheur BTP',
  [LINKS.formationIaAssistanteBtp]: 'Formation IA assistante administrative BTP',
  [LINKS.formationIaAssistanteGestionBtp]: 'Formation IA assistante de gestion BTP',
  [LINKS.formationIaCharpentierMenuisierBtp]: 'Formation IA charpentier & menuisier bois',
  [LINKS.formationIaMaconBtp]: 'Formation IA maçon & maçonnerie',
  [LINKS.formationIaCouvreurBtp]: 'Formation IA couvreur zingueur',
  [LINKS.chatgptArtisans]: 'Formation IA TPE & PME du bâtiment',
  [LINKS.formationIaDirigeantPmeBtp]: 'Formation IA dirigeant opérationnel PME BTP',
};

function buildMetierSatelliteLinks(path: string): RelatedLinkItem[] | null {
  // Alias historique CDT
  const resolved =
    path === '/formation-ia-conducteur-travaux' ? LINKS.formationConducteurTravaux : path;
  const entry = METIER_CLUSTER[resolved];
  if (!entry) return null;
  const [c1, c2] = entry.close;
  return dedupeLinks([
    {
      href: LINKS.formationIaHub,
      label: entry.hubAnchor,
      description: 'Point d’entrée métiers & zones IDF.',
    },
    {
      href: c1,
      label: METIER_LABELS[c1] ?? c1,
      description: 'Métier proche — même méthode Qualiopi.',
    },
    {
      href: c2,
      label: METIER_LABELS[c2] ?? c2,
      description: 'Autre métier du cluster formation IA BTP.',
    },
    entry.catalogue,
    entry.blog,
  ]).slice(0, 5);
}

function buildMetierHubLinks(): RelatedLinkItem[] {
  const keys = [
    LINKS.formationConducteurTravaux,
    LINKS.formationChargeAffairesBtp,
    LINKS.formationElectricienBtp,
    LINKS.formationPlombierBtp,
    LINKS.formationIaDirigeantBtp,
    LINKS.formationIaEtancheur,
    LINKS.formationIaAssistanteBtp,
    LINKS.formationIaCharpentierMenuisierBtp,
    LINKS.formationIaMaconBtp,
  ] as const;
  return keys.slice(0, 5).map((href, i) => ({
    href,
    label: METIER_LABELS[href] ?? href,
    description: i === 0 ? 'Satellite prioritaire du hub métiers.' : 'Page métier formation IA BTP.',
  }));
}

type CatalogueCluster = {
  path: string;
  metier: RelatedLinkItem;
  geo: RelatedLinkItem;
  blog: RelatedLinkItem;
  catalogueAnchor: string;
};

const CATALOGUE_CLUSTER: CatalogueCluster[] = [
  {
    path: LINKS.formationIaBtpNiveau1BatimentTp,
    catalogueAnchor: 'Retour au catalogue des formations IA BTP',
    metier: {
      href: LINKS.formationConducteurTravaux,
      label: 'Page métier — conducteur de travaux & IA',
    },
    geo: {
      href: LINKS.formationIleDeFrance,
      label: 'Formation IA BTP en Île-de-France',
    },
    blog: {
      href: LINKS.blogFormationIaBtpGuide2026,
      label: 'Guide formation IA BTP 2026 (blog)',
    },
  },
  {
    path: LINKS.formationAO,
    catalogueAnchor: 'Catalogue Qualiopi — toutes les sessions IA BTP',
    metier: {
      href: LINKS.formationChargeAffairesBtp,
      label: "Formation IA chargé d'affaires — appels d’offres",
    },
    geo: {
      href: LINKS.formationIaBtpParis,
      label: 'Formation IA BTP à Paris (75)',
    },
    blog: {
      href: '/blog/ia-memoire-technique-appel-offres-guide-2026',
      label: 'Guide mémoire technique & appels d’offres IA',
    },
  },
  {
    path: LINKS.formationConduiteTravauxSuiviChantier,
    catalogueAnchor: 'Voir le catalogue complet des formations IA',
    metier: {
      href: LINKS.formationConducteurTravaux,
      label: 'Landing SEO — formation IA conducteur de travaux',
    },
    geo: {
      href: LINKS.formationIaBtpYvelines78,
      label: 'Formation IA BTP Yvelines (78) — Guyancourt',
    },
    blog: {
      href: '/blog/compte-rendu-chantier-ia-automatiser-gagner-temps',
      label: 'Compte-rendu de chantier et IA — gagner du temps',
    },
  },
  {
    path: LINKS.formationMaitriserClaudeAiBtp,
    catalogueAnchor: 'Catalogue formations — NIV-01 à NIV-06',
    metier: {
      href: LINKS.formationConducteurTravaux,
      label: 'Usages Claude pour conducteurs de travaux',
    },
    geo: {
      href: LINKS.formationIleDeFrance,
      label: 'Sessions Claude & ChatGPT en Île-de-France',
    },
    blog: {
      href: '/blog/cours-gratuits-claude-ai-conducteur-travaux-pme-btp',
      label: 'Cours Claude AI pour conducteurs de travaux (blog)',
    },
  },
  {
    path: LINKS.formationIaMaitriseOeuvre,
    catalogueAnchor: 'Retour au catalogue OFC — formations IA BTP',
    metier: {
      href: LINKS.formationChargeAffairesBtp,
      label: "IA pour chargé d'affaires et maîtrise d’œuvre",
    },
    geo: {
      href: LINKS.formationIaBtpParis,
      label: 'Formation IA bâtiment à Paris',
    },
    blog: {
      href: LINKS.guideMaitriseOeuvreIa,
      label: 'Guide Maître d’Œuvre × IA (ressources)',
    },
  },
  {
    path: LINKS.formationClaudeIaBtpFiche,
    catalogueAnchor: 'Comparer les 6 parcours du catalogue IA BTP',
    metier: {
      href: LINKS.formationConducteurTravaux,
      label: 'Formation IA chantier — conducteur de travaux',
    },
    geo: {
      href: LINKS.formationIleDeFrance,
      label: 'Formation IA pour le BTP en Île-de-France',
    },
    blog: {
      href: '/blog/cours-gratuits-claude-ai-conducteur-travaux-pme-btp',
      label: 'Cours Claude AI pour conducteurs de travaux (blog)',
    },
  },
];

function buildCatalogueSatelliteLinks(path: string): RelatedLinkItem[] | null {
  const entry = CATALOGUE_CLUSTER.find((c) => c.path === path);
  if (!entry) return null;
  const links: RelatedLinkItem[] = [
    {
      href: LINKS.formations,
      label: entry.catalogueAnchor,
      description: 'Pilier catalogue — comparatif et tarifs.',
    },
    entry.metier,
    entry.geo,
    entry.blog,
  ];
  // Fiches Claude du catalogue : aussi vers le pilier outil
  if (path === LINKS.formationMaitriserClaudeAiBtp || path === LINKS.formationClaudeIaBtpFiche) {
    links.push({
      href: LINKS.claudeAiBtp,
      label:
        path === LINKS.formationMaitriserClaudeAiBtp
          ? 'Guide Claude AI BTP — Chat, Cowork, Code'
          : 'Pilier Claude AI pour le BTP (méthode & usages)',
      description: 'Différencier les intentions : guide vs sessions catalogue.',
    });
  }
  return dedupeLinks(links).slice(0, 5);
}

function buildCataloguePillarLinks(): RelatedLinkItem[] {
  const labels = [
    'NIV-01 — L’IA au service du bâtiment & TP',
    'NIV-02 — IA appliquée aux appels d’offres BTP',
    'NIV-03 — Conduite de travaux & suivi chantier',
    'NIV-04 — Maîtriser Claude AI pour le BTP',
    'NIV-05 — IA pour la maîtrise d’œuvre',
    'NIV-06 — Skills Claude IA BTP (fiche catalogue)',
  ];
  return CATALOGUE_CLUSTER.map((c, i) => ({
    href: c.path,
    label: labels[i] ?? c.path,
    description: 'Fiche programme Qualiopi du catalogue.',
  }));
}

const CLAUDE_PAGES = [
  LINKS.claudeAiBtp,
  LINKS.formationClaudeAiBtp,
  LINKS.formationClaudeAiBatiment,
  LINKS.formationClaudeAiTravauxPublics,
  LINKS.formationMaitriserClaudeAiBtp,
  LINKS.formationClaudeIaBtpFiche,
] as const;

function buildClaudeLinks(path: string): RelatedLinkItem[] {
  const guideAnchors = [
    'Guide Claude AI BTP — interfaces Chat, Cowork, Code',
    'Pilier Claude AI pour le BTP (méthode & usages)',
    'Claude AI & BTP — guide pratique Laure Olivié',
  ];
  const links: RelatedLinkItem[] = [];
  if (path !== LINKS.claudeAiBtp) {
    links.push({
      href: LINKS.claudeAiBtp,
      label: guideAnchors[path.length % guideAnchors.length]!,
      description: 'Pilier outil — différencier Chat, Cowork et Claude Code.',
    });
  } else {
    links.push(
      {
        href: LINKS.formationClaudeAiBtp,
        label: 'Formation Claude AI BTP — landing programme',
      },
      {
        href: LINKS.formationMaitriserClaudeAiBtp,
        label: 'Fiche catalogue — maîtriser Claude AI pour le BTP (NIV-04)',
      },
      {
        href: LINKS.formationClaudeIaBtpFiche,
        label: 'Skills Claude IA BTP — fiche NIV-06',
      },
      {
        href: LINKS.formationClaudeAiBatiment,
        label: 'Formation Claude AI bâtiment (second œuvre)',
      },
      {
        href: LINKS.formationClaudeAiTravauxPublics,
        label: 'Formation Claude AI travaux publics',
      },
    );
    return dedupeLinks(links).slice(0, 5);
  }
  // Satellites Claude : guide + autres landings/fiches + catalogue (intentions différenciées)
  const labelMap: Record<string, string> = {
    [LINKS.formationClaudeAiBtp]: 'Landing formation Claude AI pour le BTP',
    [LINKS.formationClaudeAiBatiment]: 'Claude AI appliqué au bâtiment',
    [LINKS.formationClaudeAiTravauxPublics]: 'Claude AI pour les travaux publics',
    [LINKS.formationMaitriserClaudeAiBtp]: 'Maîtriser Claude AI BTP — session catalogue',
    [LINKS.formationClaudeIaBtpFiche]: 'Formation Skills Claude IA BTP',
  };
  const others = CLAUDE_PAGES.filter((p) => p !== path && p !== LINKS.claudeAiBtp);
  for (const href of others) {
    links.push({ href, label: labelMap[href] ?? href });
  }
  links.push({
    href: LINKS.formations,
    label: 'Catalogue des formations IA (ChatGPT & Claude)',
  });
  links.push({
    href: LINKS.blogCoursGratuitsClaudeAiPmeBtp,
    label: 'Cours Claude AI pour conducteurs de travaux (blog)',
  });
  return dedupeLinks(links).slice(0, 5);
}

function dedupeLinks(links: RelatedLinkItem[]): RelatedLinkItem[] {
  const seen = new Set<string>();
  const out: RelatedLinkItem[] = [];
  for (const l of links) {
    const key = l.href.replace(/\/$/, '') || '/';
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(l);
  }
  return out;
}

/** Cluster commande publique — pilier + lots (RelatedLinks : liens hors ceux déjà inline). */
function buildMarchePublicClusterLinks(path: string): RelatedLinkItem[] | null {
  const pillar = LINKS.formationIaMarchePublicTravaux;
  const lotEtancheite = LINKS.formationIaMarchePublicEtancheite;
  if (path !== pillar && path !== lotEtancheite) return null;

  const pool: RelatedLinkItem[] = [
    {
      href: LINKS.formationChargeAffairesBtp,
      label: "Formation IA chargé d'affaires BTP",
      description: 'Quotidien AO / suivi commercial — complément métier.',
    },
    {
      href: LINKS.iaAnalyseDce,
      label: 'Analyser un DCE avec l’IA',
      description: 'Méthode transactionnelle CCTP, CCAP, RC.',
    },
    {
      href: LINKS.iaMemoireTechnique,
      label: 'Rédiger un mémoire technique avec l’IA',
      description: 'Structure et relecture — hors fiche catalogue.',
    },
    {
      href: LINKS.formationIleDeFrance,
      label: 'Formation IA BTP en Île-de-France',
      description: 'Hub géo — présentiel Paris et départements 77–95.',
    },
    {
      href: LINKS.blogIaMemoireTechniqueAppelOffresGuide2026,
      label: 'Guide mémoire technique & appels d’offres 2026',
      description: 'Article blog — méthode en 5 étapes.',
    },
  ];

  if (path === pillar) {
    return dedupeLinks(pool).slice(0, 5);
  }

  // Lot : compléter si besoin (pilier / AO / métier exclus via excludeHrefs page)
  return dedupeLinks([
    {
      href: LINKS.formationIaCouvreurBtp,
      label: 'Formation IA couvreur BTP',
      description: 'Interfaces couverture / étanchéité — angle quotidien.',
    },
    ...pool,
  ]).slice(0, 5);
}

/**
 * Retourne le bloc de maillage cluster pour une URL, ou `null` si hors cluster.
 */
export function getClusterRelatedLinks(path: string): ClusterPageConfig | null {
  const normalized = path.replace(/\/$/, '') || '/';

  // --- Géo ---
  if (normalized === LINKS.formationIleDeFrance) {
    return {
      cluster: 'geo',
      title: 'Formations IA BTP par département en Île-de-France',
      subtitle: 'Pilier géo : accédez aux landings locales (Paris et départements franciliens).',
      links: buildGeoPillarLinks(),
    };
  }
  const geoSlug = geoSlugFromPath(normalized);
  if (geoSlug && GEO_DEPT[geoSlug]) {
    return {
      cluster: 'geo',
      title: 'Continuer dans le cluster Île-de-France',
      subtitle: 'Pilier régional, départements voisins et une page métier adaptée à votre bassin.',
      links: buildGeoSatelliteLinks(geoSlug),
    };
  }

  // --- Métiers ---
  if (normalized === LINKS.formationIaHub) {
    return {
      cluster: 'metiers',
      title: 'Formations IA par métier du BTP',
      subtitle: 'Hub métiers : pages satellites Qualiopi (électricité, chantier, direction…).',
      links: buildMetierHubLinks(),
    };
  }
  const metierLinks = buildMetierSatelliteLinks(normalized);
  if (metierLinks) {
    return {
      cluster: 'metiers',
      title: 'Maillage métiers — formation IA BTP',
      subtitle: 'Hub métiers, métiers proches, fiche catalogue et article de blog du même thème.',
      links: metierLinks,
    };
  }
  // Fallback satellites métier hors table dédiée
  if (
    /^\/formation-ia-.+-btp$/.test(normalized) ||
    normalized === LINKS.formationIaEtancheur ||
    normalized === LINKS.chatgptArtisans ||
    normalized === LINKS.formateurIaBtp
  ) {
    return {
      cluster: 'metiers',
      title: 'Maillage métiers — formation IA BTP',
      subtitle: 'Hub métiers, pages proches et catalogue Qualiopi.',
      links: dedupeLinks([
        {
          href: LINKS.formationIaHub,
          label: 'Hub formation IA BTP — métiers & Île-de-France',
        },
        {
          href: LINKS.formationConducteurTravaux,
          label: 'Formation IA conducteur de travaux BTP',
        },
        {
          href: LINKS.formationChargeAffairesBtp,
          label: "Formation IA chargé d'affaires BTP",
        },
        {
          href: LINKS.formationIaBtpNiveau1BatimentTp,
          label: 'Catalogue NIV-01 — IA au service du bâtiment',
        },
        {
          href: LINKS.blogFormationIaBtpGuide2026,
          label: 'Guide formation IA BTP 2026 (blog)',
        },
      ]).slice(0, 5),
    };
  }

  // --- Catalogue ---
  if (normalized === LINKS.formations) {
    return {
      cluster: 'catalogue',
      title: 'Parcours du catalogue Qualiopi',
      subtitle: 'Six fiches programme — NIV-01 à NIV-05 (aperçu) et Skills Claude.',
      links: buildCataloguePillarLinks(),
    };
  }
  const catLinks = buildCatalogueSatelliteLinks(normalized);
  if (catLinks) {
    return {
      cluster: 'catalogue',
      title: 'Autour de cette formation catalogue',
      subtitle: 'Catalogue, page métier, zone IDF et lecture blog complémentaire.',
      links: catLinks,
    };
  }

  // --- Claude ---
  if (CLAUDE_PAGES.includes(normalized as (typeof CLAUDE_PAGES)[number])) {
    return {
      cluster: 'claude',
      title:
        normalized === LINKS.claudeAiBtp
          ? 'Formations et landings Claude AI BTP'
          : 'Cluster Claude AI — guide et formations',
      subtitle:
        normalized === LINKS.claudeAiBtp
          ? 'Différenciez les intentions : guide, landings et fiches catalogue Claude.'
          : 'Toutes les pages Claude renvoient vers le guide pilier /claude-ai-btp.',
      links: buildClaudeLinks(normalized),
    };
  }

  // --- Marché public de travaux ---
  const marchePublicLinks = buildMarchePublicClusterLinks(normalized);
  if (marchePublicLinks) {
    return {
      cluster: 'marche-public',
      title: 'Cluster marché public de travaux',
      subtitle: 'Pilier commande publique, lots, fiche NIV-02 et méthodes DCE / mémoire.',
      links: marchePublicLinks,
    };
  }

  return null;
}

/** Hrefs déjà utilisés sur la page — à exclure des autres blocs de liens. */
export function getClusterRelatedHrefs(path: string): string[] {
  return getClusterRelatedLinks(path)?.links.map((l) => l.href) ?? [];
}
