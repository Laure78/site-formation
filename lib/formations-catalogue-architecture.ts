/**
 * Architecture stratégique du catalogue — 3 gammes, thématiques métier, offres Qualiopi + entrées complémentaires.
 * Ne duplique pas les fiches catalogue : une URL Qualiopi = une carte principale.
 */
import type { FormationCode, FormationGamme, FormationTheme } from '@/data/formations';
import { formationHref, getFormationByCode } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';
import type { TarifDureeHeures } from '@/lib/tarifs-sessions';

export type { FormationGamme, FormationTheme };

export type CatalogueOfferKind = 'qualiopi' | 'landing' | 'sur-demande';

export type CatalogueOffer = {
  id: string;
  title: string;
  shortPromise: string;
  audience: string;
  durationLabel: string;
  useCases: readonly string[];
  href: string;
  kind: CatalogueOfferKind;
  catalogueRef?: FormationCode;
  gamme: FormationGamme;
  theme?: FormationTheme;
  /** Durée(s) pour affichage tarifaire — source `lib/tarifs-sessions.ts`. */
  tarifDurees?: readonly TarifDureeHeures[];
  /** Intention SEO principale — documentation interne / rapport. */
  seoIntent?: string;
};

export type CatalogueThemeGroup = {
  id: FormationTheme | 'decouvrir';
  title: string;
  description: string;
  offers: readonly CatalogueOffer[];
};

export type CatalogueGammeSection = {
  id: FormationGamme;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  themes: readonly CatalogueThemeGroup[];
};

const QUALIOPI_OFFERS: CatalogueOffer[] = (
  ['NIV-01', 'NIV-02', 'NIV-03', 'NIV-04', 'NIV-05', 'NIV-06'] as const
).map(
  (code) => {
    const f = getFormationByCode(code)!;
    return {
      id: code,
      title: f.titre,
      shortPromise: f.promesse,
      audience: f.public.split(',')[0]?.trim() ?? f.public,
      durationLabel: f.duree,
      useCases: f.casUsageCourts,
      href: formationHref(f),
      kind: 'qualiopi' as const,
      catalogueRef: code,
      gamme: f.gamme,
      theme: f.theme,
    };
  }
);

/** Entrées complémentaires — landings ou sur demande (pas de faux programme Qualiopi). */
const COMPLEMENTARY_OFFERS: readonly CatalogueOffer[] = [
  {
    id: 'sensibilisation-dirigeants',
    title: 'Sensibiliser dirigeants et équipes à l’IA dans le BTP',
    shortPromise:
      'Comprendre rapidement possibilités, limites, risques et conséquences organisationnelles — intervention courte en entreprise.',
    audience: 'CODIR, dirigeants, responsables, équipes métier',
    durationLabel: '2 h',
    useCases: ['Cadrage stratégique IA', 'Identification des usages prioritaires', 'Règles et gouvernance'],
    href: LINKS.formationIaDirigeantPmeBtp,
    kind: 'landing',
    gamme: 'decouvrir',
    seoIntent: 'formation IA dirigeant BTP',
  },
  {
    id: 'ia-responsable',
    title: 'IA responsable, confidentialité et bonnes pratiques BTP',
    shortPromise:
      'Données confidentielles, DCE, validation humaine et gouvernance — sans promesse juridique.',
    audience: 'Dirigeants, référents, équipes manipulant des documents sensibles',
    durationLabel: '3 à 4 h',
    useCases: ['Données clients et DCE', 'Hallucinations et contrôles', 'Règles internes'],
    href: LINKS.blogSecuriteDonneesChatgptBtp,
    kind: 'sur-demande',
    gamme: 'decouvrir',
    seoIntent: 'IA responsable BTP',
  },
  {
    id: 'etudes-prix',
    title: 'IA pour les études de prix et le chiffrage BTP',
    shortPromise:
      'Analyser CCTP et DPGF, repérer les incohérences et structurer une étude de prix — l’IA assiste, le métreur valide.',
    audience: 'Chargés d’études, métreurs, économistes, chargés d’affaires',
    durationLabel: 'Sur mesure',
    useCases: ['Analyser CCTP et DPGF', 'Checklist anti-oubli', 'Préparer les consultations'],
    href: LINKS.formationIaEtudesPrixChiffrageBtp,
    kind: 'landing',
    gamme: 'appliquer-metier',
    theme: 'appels-offres-etudes',
    seoIntent: 'formation IA études de prix BTP',
  },
  {
    id: 'qse-prevention',
    title: 'IA pour la sécurité et la prévention BTP',
    shortPromise:
      'Structurer PPSPS, fiches prévention et actions — la validation reste sous la responsabilité du professionnel.',
    audience: 'Responsables QSE, conducteurs, chefs de chantier',
    durationLabel: 'Sur demande',
    useCases: ['Préparer une trame PPSPS', 'Causeries et fiches prévention', 'Suivi des actions'],
    href: LINKS.prendreRdv,
    kind: 'sur-demande',
    gamme: 'appliquer-metier',
    theme: 'chantier-travaux',
    seoIntent: 'formation IA QSE BTP',
  },
  {
    id: 'administratif',
    title: 'IA pour l’administratif et l’assistance travaux',
    shortPromise:
      'Emails, courriers, relances, synthèses et suivi de dossiers — sur vos documents réels.',
    audience: 'Assistants travaux, administratifs, RAF, secrétaires techniques',
    durationLabel: 'Sur mesure',
    useCases: ['Rédiger emails et courriers', 'Classer et synthétiser', 'Suivre les dossiers chantier'],
    href: LINKS.formationIaResponsableAdministratifBtp,
    kind: 'landing',
    gamme: 'appliquer-metier',
    theme: 'administratif',
    seoIntent: 'formation IA administratif BTP',
  },
  {
    id: 'gestion-contractuelle',
    title: 'Gestion contractuelle et réclamations BTP avec l’IA',
    shortPromise:
      'Analyser CCAP, chronologie et preuves — structurer un projet de mémoire, sans avis juridique automatique.',
    audience: 'Dirigeants, responsables d’affaires, conducteurs, contract managers',
    durationLabel: 'Sur demande',
    useCases: ['Analyser CCAP et délais', 'Chronologie et constats', 'Structurer une réclamation'],
    href: LINKS.blogMemoireReclamationBtpIa,
    kind: 'sur-demande',
    gamme: 'appliquer-metier',
    theme: 'gestion-contractuelle',
    seoIntent: 'formation IA gestion contractuelle BTP',
  },
  {
    id: 'charge-affaires',
    title: 'IA pour les chargés d’affaires et le développement commercial BTP',
    shortPromise:
      'Qualifier un prospect, préparer une proposition et suivre un portefeuille — complément des parcours appels d’offres.',
    audience: 'Chargés d’affaires, dirigeants, commerciaux BTP',
    durationLabel: 'Sur mesure',
    useCases: ['Préparer un rendez-vous client', 'Analyser une affaire', 'Personnaliser les relances'],
    href: LINKS.formationChargeAffairesBtp,
    kind: 'landing',
    gamme: 'appliquer-metier',
    theme: 'commercial',
    seoIntent: 'formation IA chargé d’affaires BTP',
  },
  {
    id: 'deployer-pme',
    title: 'Déployer l’IA dans une PME du BTP',
    shortPromise:
      'Cartographier les tâches, définir les règles, prioriser les workflows et construire un plan d’action à 90 jours.',
    audience: 'Dirigeants, managers, responsables transformation, référents IA',
    durationLabel: '7 ou 14 h',
    tarifDurees: [7, 14],
    useCases: ['Cartographie des usages', 'Charte IA interne', 'Plan d’action 90 jours'],
    href: LINKS.formationPmeBtp,
    kind: 'landing',
    gamme: 'deployer',
    theme: 'strategie-adoption',
    seoIntent: 'formation IA entreprise bâtiment',
  },
  {
    id: 'assistants-metier',
    title: 'Créer ses assistants IA métier pour le BTP',
    shortPromise:
      'Transformer une utilisation ponctuelle en assistants documentaires structurés et réutilisables — sans développement.',
    audience: 'Chargés d’affaires, conducteurs, administratifs, référents IA',
    durationLabel: 'Sur demande',
    useCases: ['Assistant analyse DCE ou CCAP', 'Instructions et limites métier', 'Tests et documentation'],
    href: LINKS.prendreRdv,
    kind: 'sur-demande',
    gamme: 'deployer',
    theme: 'assistants-automatisation',
    seoIntent: 'formation assistants IA BTP',
  },
  {
    id: 'workflows-automation',
    title: 'Automatiser les workflows du BTP avec l’IA',
    shortPromise:
      'Faire communiquer vos outils existants (mail, drive, tableur) — processus semi-automatisé avec validation humaine.',
    audience: 'Dirigeants, référents digitaux, équipes administratives',
    durationLabel: '14 h',
    tarifDurees: [14],
    useCases: ['Chaîne email → extraction → tâche', 'Make ou Google Workspace', 'Contrôle avant archivage'],
    href: LINKS.prendreRdv,
    kind: 'sur-demande',
    gamme: 'deployer',
    theme: 'assistants-automatisation',
    seoIntent: 'automatisation IA entreprise BTP',
  },
  {
    id: 'referent-ia',
    title: 'Former un référent IA BTP',
    shortPromise:
      'Parcours transversal : distinguer assistant, workflow, automatisation et application métier — accompagner l’adoption.',
    audience: 'Référents IA, responsables digitaux, managers',
    durationLabel: '14 h et +',
    tarifDurees: [14],
    useCases: ['Cadrer les usages métier', 'Documenter les bonnes pratiques', 'Mesurer l’adoption'],
    href: LINKS.prendreRdv,
    kind: 'sur-demande',
    gamme: 'deployer',
    theme: 'strategie-adoption',
    seoIntent: 'formation référent IA BTP',
  },
];

export const CATALOGUE_ALL_OFFERS: readonly CatalogueOffer[] = [
  ...QUALIOPI_OFFERS,
  ...COMPLEMENTARY_OFFERS,
];

function offersForGamme(gamme: FormationGamme): CatalogueOffer[] {
  return CATALOGUE_ALL_OFFERS.filter((o) => o.gamme === gamme);
}

function groupByTheme(offers: CatalogueOffer[]): CatalogueThemeGroup[] {
  const themeMeta: Record<
    FormationTheme | 'decouvrir',
    { title: string; description: string }
  > = {
    decouvrir: {
      title: 'Premiers pas',
      description: 'Découverte, sensibilisation et bonnes pratiques.',
    },
    'appels-offres-etudes': {
      title: 'Appels d’offres & études',
      description: 'DCE, chiffrage, mémoire technique et études de prix.',
    },
    'chantier-travaux': {
      title: 'Chantier & travaux',
      description: 'Conduite de travaux, suivi documentaire et prévention.',
    },
    'maitrise-oeuvre': {
      title: 'Maîtrise d’œuvre',
      description: 'MOE/MOEX — coordination, contrôle et suivi côté maîtrise d’œuvre.',
    },
    administratif: {
      title: 'Administratif BTP',
      description: 'Assistance travaux, courriers, relances et dossiers.',
    },
    'gestion-contractuelle': {
      title: 'Gestion contractuelle',
      description: 'CCAP, chronologies, constats et réclamations.',
    },
    commercial: {
      title: 'Chargés d’affaires & commercial',
      description: 'Développement commercial et suivi de portefeuille.',
    },
    'transformation-ia': {
      title: 'Transformation IA',
      description: 'Déploiement, Claude, assistants, automatisation et référent.',
    },
    'strategie-adoption': {
      title: 'Stratégie & adoption',
      description: 'Feuille de route entreprise et parcours référent IA.',
    },
    'assistants-automatisation': {
      title: 'Assistants & automatisation',
      description: 'Assistants métier réutilisables et workflows entre outils existants.',
    },
    'outils-applications': {
      title: 'Outils & applications métier',
      description: 'Cursor pour applications internes · Claude pour l’écosystème avancé.',
    },
  };

  const buckets = new Map<string, CatalogueOffer[]>();

  for (const offer of offers) {
    const key = offer.gamme === 'decouvrir' && !offer.theme ? 'decouvrir' : offer.theme ?? 'decouvrir';
    const list = buckets.get(key) ?? [];
    list.push(offer);
    buckets.set(key, list);
  }

  return [...buckets.entries()].map(([id, themeOffers]) => {
    const meta = themeMeta[id as FormationTheme | 'decouvrir'];
    return {
      id: id as FormationTheme | 'decouvrir',
      title: meta.title,
      description: meta.description,
      offers: themeOffers,
    };
  });
}

function buildDeployerGammeThemes(): CatalogueThemeGroup[] {
  const qualiopiById = Object.fromEntries(QUALIOPI_OFFERS.map((o) => [o.id, o]));
  const complementaryDeployer = COMPLEMENTARY_OFFERS.filter((o) => o.gamme === 'deployer');

  const byTheme = (theme: FormationTheme) =>
    complementaryDeployer.filter((o) => o.theme === theme);

  return [
    {
      id: 'strategie-adoption',
      title: 'Stratégie & adoption',
      description: 'Définir une feuille de route IA et former un référent interne.',
      offers: byTheme('strategie-adoption'),
    },
    {
      id: 'assistants-automatisation',
      title: 'Assistants & automatisation',
      description:
        'Créer des assistants documentaires ou connecter vos outils — sans construire une application complète.',
      offers: byTheme('assistants-automatisation'),
    },
    {
      id: 'outils-applications',
      title: 'Outils & applications métier',
      description: 'Cursor pour vos applications internes · Claude pour Projects, Cowork et Skills.',
      offers: [qualiopiById['NIV-06'], qualiopiById['NIV-04']].filter(Boolean),
    },
  ];
}

/** Parcours de maturité IA — affichage catalogue gamme 03. */
export const CATALOGUE_MATURITE_STEPS = [
  { label: 'Découvrir l’IA', href: LINKS.formationIaBtpNiveau1BatimentTp },
  { label: 'Appliquer à son métier', href: LINKS.formations },
  { label: 'Créer un assistant', href: LINKS.prendreRdv },
  { label: 'Automatiser un processus', href: LINKS.prendreRdv },
  { label: 'Créer son outil métier', href: LINKS.formationCursorBtp },
  { label: 'Déployer & gouverner', href: LINKS.formationPmeBtp },
] as const;

export const CATALOGUE_GAMMES: readonly CatalogueGammeSection[] = [
  {
    id: 'decouvrir',
    number: '01',
    title: 'Découvrir',
    subtitle: 'Pour les entreprises et utilisateurs qui démarrent',
    description:
      'Comprendre l’IA générative, ses limites et ses premiers usages sur des tâches concrètes du BTP.',
    themes: groupByTheme(offersForGamme('decouvrir')),
  },
  {
    id: 'appliquer-metier',
    number: '02',
    title: 'Appliquer par métier',
    subtitle: 'Cœur du catalogue — besoins métier avant outil',
    description:
      'Formations centrées sur vos documents et processus : DCE, chantier, MOE, administratif, commercial.',
    themes: groupByTheme(offersForGamme('appliquer-metier')),
  },
  {
    id: 'deployer',
    number: '03',
    title: 'Déployer dans l’entreprise',
    subtitle: 'Assistants, automatisations, outils métier et stratégie IA',
    description:
      'Passer de l’usage ponctuel à des assistants, workflows, applications internes et gouvernance — parcours différenciés.',
    themes: buildDeployerGammeThemes(),
  },
];

/** Positionnement catalogue — blocs GEO citables. */
export const CATALOGUE_POSITIONNEMENT = {
  h1: 'Formations IA pour les professionnels du BTP',
  promesseDocuments:
    'Apprenez à utiliser l’IA sur vos vrais documents et vos vrais processus : DCE, CCTP, CCAP, devis, comptes rendus, études de prix, suivi de chantier et appels d’offres.',
  promesseLivrables:
    'Repartez avec des méthodes, des assistants et des workflows directement réutilisables dans votre entreprise.',
  differentiators: [
    'Spécialisation BTP et documents réels',
    'Cas pratiques et forte part de pratique',
    'Livrables et assistants réutilisables',
    'Workflows métier multi-outils',
    'Organisme certifié Qualiopi',
  ] as const,
};
