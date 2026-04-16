/**
 * Landings « formation IA BTP » par métier — contenu + métadonnées + FAQ + teaches (Course JSON-LD).
 */
import type { FAQItem } from '@/lib/faq';
import { CSFE_NOM_LIBRE } from '@/lib/csfe';
import { SITE_CONFIG } from '@/lib/seo';
import { createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export type FormationIaMetierBtpConfig = {
  /** ex. etancheur — pour IDs JSON-LD */
  id: string;
  path: `/formation-ia-${string}-btp`;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  metierNom: string;
  metierNomTitre: string;
  /** Référence normative affichée (DTU, NF C, etc.) */
  normeRef: string;
  problemParagraphs: string[];
  solutionIntro: string;
  prompts: { title: string; body: string }[];
  /** Bloc partenariat CSFE (uniquement étancheur) */
  csfePartnership: boolean;
  testimonialQuote: string;
  testimonialAttribution: string;
  faq: FAQItem[];
  courseName: string;
  courseDescription: string;
  courseTeaches: string[];
  /** Image OG optionnelle */
  ogImage?: { url: string; width: number; height: number; alt: string };
};

const OFC = "OFC Création d'Entreprise";

export function formationIaMetierBtpMetadata(config: FormationIaMetierBtpConfig): Metadata {
  return createPageMetadata({
    title: config.metaTitle,
    description: config.metaDescription,
    path: config.path,
    keywords: config.keywords,
    appendAuthorSuffix: false,
    openGraphType: 'article',
    article: {
      publishedTime: '2026-04-16',
      modifiedTime: '2026-04-16',
      author: SITE_CONFIG.name,
      section: 'Formation IA BTP par métier',
    },
    image: config.ogImage ?? {
      url: '/images/laure-olivie-formatrice.png',
      width: 1200,
      height: 630,
      alt: `Formation IA BTP ${config.metierNomTitre} — Qualiopi, Laure Olivié`,
    },
  });
}

function faqNormeTriple(opts: {
  normeRef: string;
  metierNom: string;
  docTypes: string;
}): FAQItem[] {
  const { normeRef, metierNom, docTypes } = opts;
  return [
    {
      q: `ChatGPT connaît-il ${normeRef} ?`,
      a: `Non de façon fiable : les modèles généralistes peuvent résumer des principes ou proposer une structure, mais ils hallucinent sur les paragraphes, les versions et les exceptions. Il faut toujours croiser avec le texte officiel, les avis techniques du CSTB et les notices fabricants. L’IA sert à structurer vos notes et brouillons — la conformité reste votre responsabilité en tant que professionnel ${metierNom}.`,
    },
    {
      q: `Comment l’IA aide pour les avis techniques et ${docTypes} ?`,
      a: `Elle peut : lister des questions à poser au MOE, reformuler une synthèse de risques, préparer un plan de mémoire technique ou un sommaire de PPSPS à partir de vos bullet points — jamais remplacer la lecture des pièces. Pour les dossiers sensibles, on travaille sur extraits anonymisés et poste professionnel adapté (confidentialité).`,
    },
    {
      q: `Mes données chantier (${metierNom}) sont-elles sécurisées avec ChatGPT ?`,
      a: `Les offres grand public peuvent réutiliser les contenus pour l’entraînement : évitez d’y coller des données nominatives, des plans complets identifiables ou des montants de marché. Préférez ChatGPT Team / Enterprise avec option « no training », ou des solutions françaises — c’est un point systématique des sessions ${OFC}.`,
    },
  ];
}

/** Étancheur — angle CSFE + DTU 43 */
export const FORMATION_IA_METIER_ETANCHEUR: FormationIaMetierBtpConfig = {
  id: 'etancheur',
  path: '/formation-ia-etancheur-btp',
  h1: 'Formation IA pour étancheurs — Partenariat CSFE, Qualiopi',
  metaTitle: 'Formation IA étancheur BTP — CSFE & Qualiopi | Laure Olivié',
  metaDescription:
    'Formation IA & ChatGPT pour étancheurs BTP : DTU 43, avis techniques, mémoires, PPSPS, CR chantier. Partenaire CSFE. Qualiopi, finançable Constructys. Île-de-France.',
  keywords: [
    'formation IA étancheur',
    'ChatGPT étanchéité',
    'DTU 43 IA',
    'CSFE formation IA',
    'mémoire technique étanchéité',
    'Qualiopi étancheur',
    'Constructys BTP',
  ],
  metierNom: 'étancheurs',
  metierNomTitre: 'étancheur',
  normeRef: 'le DTU 43',
  problemParagraphs: [
    `Les entreprises d’étanchéité jonglent entre chantier et bureau : mémoires techniques qui citent le ${'`'}DTU 43${'`'} et les avis techniques (CSTB, systèmes), plans de prévention (PPSPS) alignés sur les interfaces avec le gros œuvre et le second œuvre, comptes rendus de réunion ou de contrôle après intempéries, relances et courriers pour les réserves.`,
    `Chaque dossier mobilise des pièces lourdes : CCTP étanchéité, prescriptions sur relevés, points singuliers (solin, lanterneau, équipements techniques), parfois plusieurs langues ou versions de notice. Sans méthode, l’équipe recopie, reformule à la main ou éparpille les brouillons dans des fils de mails.`,
    `Les marchés publics et les donneurs d’ordre exigeants demandent des écrits clairs et traçables : une IA mal utilisée produit du texte « lisse » mais faux sur un détail de nappe ou de protection mécanique ; une formation encadrée Qualiopi apprend à poser le cadre : sources, relecture humaine, interdiction de soumettre un texte non validé.`,
    `Enfin, le temps perdu sur Word et Excel le soir se traduit par moins de réponses aux appels d’offres et plus de stress sur les délais. L’objectif des sessions ${OFC} est de récupérer plusieurs heures par semaine sur la structuration et la reformulation, sans compromettre le référentiel technique.`,
  ],
  solutionIntro: `La formation « L’IA au service du bâtiment » (et modules du catalogue) s’adapte aux cas étanchéité : vous importez vos contraintes réelles (toiture-terrasse, végétalisée, infrastructure) et vous apprenez à produire des brouillons exploitables — tableaux de risques, listes de contrôles, plans de mémoire — avec validation systématique par le chef de travaux ou le dirigeant.`,
  prompts: [
    {
      title: 'Chiffrage indicatif toiture-terrasse (métré + couches)',
      body: `Tu es chef de projet étanchéité en France. À partir des données suivantes, propose UNIQUEMENT un ordre de grandeur et une liste de postes à vérifier (pas d’engagement contractuel) :
- Surface horizontale : [X] m², relevés [H] cm en moyenne, périmètre [P] ml
- Système : [bitume / synthétique / résine — préciser]
- Points singuliers : [liste : acrotères, équipements, passages]
Calcule surfaces avec taux de chutes indicatif [10–15 %] selon complexité, linéaires de joints/solins à prévoir en ordre de grandeur, et un tableau matière/MO à compléter avec nos prix internes. Rappelle : vérifier DTU 43.x, notices fabricant et CCTP.`,
    },
    {
      title: 'Compte rendu de visite étanchéité (humide / réserves)',
      body: `Rédige un compte rendu professionnel de visite d’étanchéité à partir de ces notes brutes : [NOTES].
Structure : contexte chantier, observations par zone (avec références plan si fourni), réserves formulées de façon factuelle, demandes de précisions MOE, prochaines étapes et délais. Ton sec, sans attribution de faute. Ne pas inventer de références normatives : insérer [à compléter] si une norme est mentionnée sans numéro.`,
    },
    {
      title: 'Analyse CCTP — extraction exigences étanchéité',
      body: `Voici un extrait de CCTP étanchéité (texte) : [COLLEZ L’EXTRAIT].
Liste les exigences par lot/sous-partie : performances attendues, interfaces avec autres corps, essais, remises de plans/DOE. Sous chaque point, propose 2–3 questions de clarification à poser au maître d’œuvre si la rédaction est ambiguë. Rappel : ne pas conclure sur la conformité : je valide sur le document complet et le DTU applicable.`,
    },
    {
      title: 'Plan de section pour mémoire technique (méthode)',
      body: `Je réponds à un marché public étanchéité. Critères notés : [LISTE]. Mon entreprise : [TAILLE, savoir-faire, références anonymisées].
Propose un plan de mémoire (titres + 2 bullets par titre) qui répond aux critères, avec renvois types « moyens humains / méthode / sécurité / environnement ». Pas de copier-coller de texte du CCAP : reformuler.`,
    },
    {
      title: 'PPSPS — aide à la structuration (brouillon)',
      body: `À partir du périmètre suivant : [TYPE DE CHANTIER, durée, effectifs], propose une structure de PPSPS (titres et sous-parties) adaptée au lot étanchéité : risques spécifiques (feu, produits, hauteur), coordination avec autres lots, plan de reprise des étanchéités. Je compléterai avec les données réelles et la validation de l’OPPBTP.`,
    },
  ],
  csfePartnership: true,
  testimonialQuote: `Le partenariat entre la ${CSFE_NOM_LIBRE} et ${OFC} vise à rendre accessibles des usages d’IA utiles au quotidien des étanchéistes — sans jamais se substituer aux référentiels techniques et à la validation sur le terrain. La priorité reste la sécurité des ouvrages et la lisibilité des dossiers pour nos adhérents.`,
  testimonialAttribution: `${CSFE_NOM_LIBRE} — message de cadre partenarial pédagogique (OFC partenaire formation)`,
  faq: [
    {
      q: 'ChatGPT connaît-il la DTU 43 ?',
      a: `Non de façon fiable : il peut résumer des principes ou proposer un plan de lecture, mais il invente parfois des références ou des versions. Il faut toujours travailler avec le fascicule officiel, les avis techniques CSTB et les notices des systèmes. L’IA sert à structurer vos brouillons et listes de contrôle — la conformité reste votre responsabilité.`,
    },
    {
      q: 'Comment l’IA aide pour les avis techniques ?',
      a: `Elle peut : extraire des questions à poser au bureau d’études, classer des risques par priorité, reformuler une synthèse pour un courrier — à partir d’extraits que vous fournissez. Elle ne substitue pas l’examen du dossier technique ni la décision sur le système à proposer.`,
    },
    {
      q: 'Mes données chantier étanchéité sont-elles sécurisées ?',
      a: `Avec un outil grand public sans cadre entreprise, il faut éviter d’y coller des plans complets nominatifs, des adresses précises ou des montants de marché. Utilisez des extraits anonymisés, des comptes professionnels (Team/Enterprise sans entraînement) ou des offres françaises — c’est détaillé en formation ${OFC}.`,
    },
    {
      q: 'En quoi le partenariat CSFE change-t-il la formation ?',
      a: `Il permet d’aligner les exemples sur les enjeux des étanchéistes (interfaces, marchés publics, documentation) et de valoriser un cadre professionnel reconnu — le programme reste certifié Qualiopi et les validations techniques restent en entreprise.`,
    },
  ],
  courseName: 'Formation IA pour étancheurs BTP — partenariat CSFE, Qualiopi',
  courseDescription: `${OFC} : formation IA et ChatGPT pour étancheurs — mémoires techniques, DTU 43, avis techniques, PPSPS, comptes rendus. Partenaire ${CSFE_NOM_LIBRE}. Session 4 h, Qualiopi, financement OPCO Constructys selon dossier. Île-de-France et France.`,
  courseTeaches: [
    'ChatGPT pour étancheurs BTP',
    'Méthodes IA et DTU 43 (relecture humaine)',
    'Mémoires techniques et CCTP étanchéité',
    'Comptes rendus et PPSPS (structuration)',
    'Avis techniques CSTB — usage assisté',
    'Qualiopi — confidentialité des données chantier',
  ],
};

function metierTemplate(
  id: FormationIaMetierBtpConfig['id'],
  opts: Omit<
    FormationIaMetierBtpConfig,
    | 'id'
    | 'path'
    | 'h1'
    | 'metaTitle'
    | 'metaDescription'
    | 'keywords'
    | 'metierNom'
    | 'metierNomTitre'
    | 'normeRef'
    | 'problemParagraphs'
    | 'solutionIntro'
    | 'prompts'
    | 'csfePartnership'
    | 'testimonialQuote'
    | 'testimonialAttribution'
    | 'faq'
    | 'courseName'
    | 'courseDescription'
    | 'courseTeaches'
    | 'ogImage'
  > & {
    path: FormationIaMetierBtpConfig['path'];
    h1: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    metierNom: string;
    metierNomTitre: string;
    normeRef: string;
    normeLabelCourt: string;
    problemFocus: string;
    docTypes: string;
    promptTitles: [string, string, string, string, string];
    testimonialQuote: string;
    testimonialAttribution: string;
    courseTeaches: string[];
    ogImage?: FormationIaMetierBtpConfig['ogImage'];
  }
): FormationIaMetierBtpConfig {
  const path = opts.path;
  const [p1, p2, p3, p4, p5] = opts.promptTitles;
  return {
    id,
    path,
    h1: opts.h1,
    metaTitle: opts.metaTitle,
    metaDescription: opts.metaDescription,
    keywords: opts.keywords,
    metierNom: opts.metierNom,
    metierNomTitre: opts.metierNomTitre,
    normeRef: opts.normeRef,
    problemParagraphs: [
      `Les ${opts.metierNom} en BTP savent que le terrain ne pardonne pas une erreur de lecture : pourtant une part croissante du temps part en documentation — devis détaillés, courriers, comptes rendus, réponses marchés, relecture de ${opts.problemFocus}.`,
      `Les prescriptions techniques (${opts.normeLabelCourt}, notices fabricants, avis CSTB selon les matériaux) exigent précision et traçabilité. Recopier à la main ou jongler entre modèles Word obsolètes coûte des heures chaque semaine.`,
      `Sur les chantiers d’Île-de-France, les délais courts et la concurrence poussent à produire vite des écrits propres ; sans cadre, l’IA devient source d’erreurs sur un détail de norme. La formation Qualiopi encadre : prompts, relecture humaine, règles de confidentialité.`,
      `L’objectif n’est pas d’« automatiser la technique » mais de gagner du temps sur la mise en forme, la structuration et les itérations — pour libérer du temps sur le chantier et la relation client.`,
    ],
    solutionIntro: `Les sessions ${OFC} combinent démonstration et ateliers sur vos cas (anonymisés) : devis, mails, synthèses, plans de réponses. Références normatives citées à titre de rappel — validation métier obligatoire avant envoi.`,
    prompts: [
      {
        title: p1,
        body: `Tu es ${opts.metierNomTitre} qualifié en France. À partir des données : [DÉCRIRE CHANTIER / LOT / COTES], propose un tableau de quantités indicatif et les postes à vérifier au plan. Rappelle les points à contrôler selon ${opts.normeLabelCourt} sans inventer de paragraphes : indiquer [à vérifier fascicule] si besoin. Prix : nos tarifs internes uniquement.`,
      },
      {
        title: p2,
        body: `Notes de réunion brutes : [NOTES]. Rédige un compte rendu structuré (décisions, porteurs, délais, réserves) pour le lot ${opts.metierNomTitre}. Ton factuel. Ne pas attribuer de faute sans élément du texte.`,
      },
      {
        title: p3,
        body: `Extrait CCTP : [TEXTE]. Liste les exigences techniques et les questions à poser au MOE si ambiguïté. Croiser avec ${opts.normeLabelCourt} : ne pas conclure sur la conformité.`,
      },
      {
        title: p4,
        body: `Marché public — critères : [LISTE]. Plan de mémoire technique (titres + bullets) pour une entreprise de ${opts.metierNom} : moyens, méthode, sécurité, délais. Pas de copier-coller du CCAP.`,
      },
      {
        title: p5,
        body: `Client demande une explication sur [SUJET TECHNIQUE]. Rédige une réponse professionnelle de 200 mots maximum, avec rappel que les prescriptions définitives sont dans le CCTP et les documents normatifs. Vocabulaire ${opts.metierNomTitre} BTP.`,
      },
    ],
    csfePartnership: false,
    testimonialQuote: opts.testimonialQuote,
    testimonialAttribution: opts.testimonialAttribution,
    faq: faqNormeTriple({
      normeRef: opts.normeRef,
      metierNom: opts.metierNomTitre,
      docTypes: docTypesForMetier(id),
    }),
    courseName: opts.h1.replace(/ — .*/, '') + ' — Qualiopi',
    courseDescription: `${OFC} : formation IA et ChatGPT pour ${opts.metierNom} du BTP (${opts.normeLabelCourt}). Sessions 4 h, Qualiopi, financement OPCO Constructys selon dossier. Île-de-France.`,
    courseTeaches: opts.courseTeaches,
    ogImage: opts.ogImage,
  };
}

function docTypesForMetier(id: string): string {
  switch (id) {
    case 'electricien':
      return 'les schémas et notices NFC';
    case 'plombier':
      return 'les notices sanitaires et DTU eau';
    default:
      return 'les mémoires techniques et CCTP';
  }
}

export const FORMATION_IA_METIER_COUVREUR: FormationIaMetierBtpConfig = metierTemplate('couvreur', {
  path: '/formation-ia-couvreur-btp',
  h1: 'Formation IA pour couvreurs — DTU 40, Qualiopi',
  metaTitle: 'Formation IA couvreur BTP — DTU 40 & Qualiopi | Laure Olivié',
  metaDescription:
    'Formation IA pour couvreurs : métrés toiture, zinguerie, devis ardoise/zinc. Prompts ChatGPT BTP. Qualiopi, Constructys. Île-de-France.',
  keywords: ['formation IA couvreur', 'ChatGPT couverture', 'DTU 40', 'devis toiture IA', 'Qualiopi couvreur'],
  metierNom: 'couvreurs',
  metierNomTitre: 'couvreur',
  normeRef: 'le DTU 40',
  normeLabelCourt: 'DTU 40 et fascicules couverture',
  problemFocus: 'plans de calepinage, métrés de pans, devis ardoise ou zinc',
  promptTitles: [
    'Métré toiture multi-pans (brouillon)',
    'CR visite couverture / zinguerie',
    'Lecture CCTP couverture — questions MOE',
    'Mémoire technique — plan méthodo',
    'Mail client — explication technique',
  ],
  testimonialQuote:
    '« On a divisé par deux le temps sur les gros devis tôlerie-zinc — surtout quand il faut expliquer les relevés au client. »',
  testimonialAttribution: 'Chef d’entreprise couverture — Île-de-France (retour de formation OFC, anonymisé)',
  courseTeaches: [
    'ChatGPT pour couvreurs BTP',
    'Métrés et devis couverture (relecture humaine)',
    'DTU 40 — usage documentaire assisté',
    'Mémoires techniques toiture',
    'Qualiopi — données chantier',
  ],
});

export const FORMATION_IA_METIER_ELECTRICIEN: FormationIaMetierBtpConfig = metierTemplate('electricien', {
  path: '/formation-ia-electricien-btp',
  h1: 'Formation IA pour électriciens — NFC 15-100, Qualiopi',
  metaTitle: 'Formation IA électricien BTP — NFC 15-100 | Laure Olivié',
  metaDescription:
    'Formation IA pour électriciens BTP : devis, DOE, CR intervention, relances. NF C 15-100 en référence. Qualiopi, Constructys.',
  keywords: ['formation IA électricien', 'ChatGPT NF C 15-100', 'devis électricité IA', 'Qualiopi électricien'],
  metierNom: 'électriciens',
  metierNomTitre: 'électricien',
  normeRef: 'la NFC 15-100',
  normeLabelCourt: 'NFC 15-100',
  problemFocus: 'devis détaillés, DOE, fiches de mesures, comptes rendus de mise en service',
  promptTitles: [
    'Devis tableau / rénovation (structure)',
    'CR intervention et essais',
    'Synthèse notice pour client final',
    'Relance facture / litige courtois',
    'Liste contrôle avant réception',
  ],
  testimonialQuote:
    '« Les premiers jets de DOE et de comptes rendus sortent beaucoup plus propres — je relis toujours, mais je ne repars plus de zéro. »',
  testimonialAttribution: 'Électricien installateur — Grand Paris (formation OFC, anonymisé)',
  courseTeaches: [
    'ChatGPT pour électriciens BTP',
    'Devis et DOE (validation humaine)',
    'NF C 15-100 — rappels assistés',
    'Comptes rendus d’intervention',
    'Qualiopi — confidentialité',
  ],
  ogImage: {
    url: '/images/formation-ia-electricien-btp.png',
    width: 1024,
    height: 682,
    alt: 'Formation IA BTP — électriciens en salle avec Laure Olivié',
  },
});

export const FORMATION_IA_METIER_PLOMBIER: FormationIaMetierBtpConfig = metierTemplate('plombier', {
  path: '/formation-ia-plombier-btp',
  h1: 'Formation IA pour plombiers — DTU 60, Qualiopi',
  metaTitle: 'Formation IA plombier BTP — DTU 60 & Qualiopi | Laure Olivié',
  metaDescription:
    'Formation IA pour plombiers chauffagistes : devis sanitaire, notices, planning interventions. DTU 60. Qualiopi, finançable Constructys.',
  keywords: ['formation IA plombier', 'ChatGPT plomberie', 'DTU 60', 'devis sanitaire IA'],
  metierNom: 'plombiers',
  metierNomTitre: 'plombier',
  normeRef: 'le DTU 60',
  normeLabelCourt: 'DTU 60 et prescriptions sanitaires',
  problemFocus: 'devis détaillés, périodes de garantie, dossiers SAV et réception',
  promptTitles: [
    'Devis salle de bains / réseaux',
    'CR intervention fuite / mise aux normes',
    'Lecture CCTP plomberie',
    'Mail client — explication réglementaire',
    'Planning équipe (semis de tâches)',
  ],
  testimonialQuote: '« Moins de temps sur les mails techniques le soir — plus pour les chantiers urgents. »',
  testimonialAttribution: 'Artisan plombier — 92 (retour anonymisé)',
  courseTeaches: [
    'ChatGPT pour plombiers BTP',
    'Devis sanitaire et chauffage',
    'DTU 60 — usage assisté',
    'SAV et réception documentaire',
    'Qualiopi',
  ],
});

export const FORMATION_IA_METIER_MACON: FormationIaMetierBtpConfig = metierTemplate('macon', {
  path: '/formation-ia-macon-btp',
  h1: 'Formation IA pour maçons — DTU 20, Qualiopi',
  metaTitle: 'Formation IA maçon BTP — DTU 20 & Qualiopi | Laure Olivié',
  metaDescription:
    'Formation IA pour maçons : gros œuvre, métrés, méthodes, réponses marchés. DTU 20. Qualiopi, Constructys.',
  keywords: ['formation IA maçon', 'ChatGPT gros œuvre', 'DTU 20', 'mémoire technique maçonnerie'],
  metierNom: 'maçons',
  metierNomTitre: 'maçon',
  normeRef: 'le DTU 20',
  normeLabelCourt: 'DTU 20',
  problemFocus: 'métrés structure, phases, planning de grue, réponses techniques marchés publics',
  promptTitles: [
    'Métré gros œuvre (ordre de grandeur)',
    'Méthodologie génie civil (brouillon)',
    'CR réunion avec réserves',
    'Plan mémoire technique',
    'Courrier synthèse chantier',
  ],
  testimonialQuote: '« Les synthèses de réunion et les plans de mémoire partent plus vite — le fond reste notre savoir-faire. »',
  testimonialAttribution: 'Conducteur de travaux gros œuvre — IDF (anonymisé)',
  courseTeaches: ['ChatGPT pour maçons BTP', 'DTU 20 — aide à la rédaction', 'Mémoires techniques', 'Qualiopi'],
});

export const FORMATION_IA_METIER_PEINTRE: FormationIaMetierBtpConfig = metierTemplate('peintre', {
  path: '/formation-ia-peintre-btp',
  h1: 'Formation IA pour peintres — DTU 59, Qualiopi',
  metaTitle: 'Formation IA peintre BTP — DTU 59 & Qualiopi | Laure Olivié',
  metaDescription:
    'Formation IA pour peintres en bâtiment : supports, finitions, devis, mémoires. DTU 59. Qualiopi, Constructys.',
  keywords: ['formation IA peintre', 'ChatGPT peinture bâtiment', 'DTU 59', 'devis peinture IA'],
  metierNom: 'peintres',
  metierNomTitre: 'peintre',
  normeRef: 'le DTU 59',
  normeLabelCourt: 'DTU 59',
  problemFocus: 'devis par pièce, gammes produits, comptes rendus de préparation des supports',
  promptTitles: [
    'Devis peinture intérieure détaillé',
    'CR visite préparation support',
    'Fiche conseil client entretien',
    'Réponse appel d’offres courte',
    'Mail litige finition',
  ],
  testimonialQuote: '« Les devis détaillés par pièce sont beaucoup moins longs à monter. »',
  testimonialAttribution: 'Peintre en bâtiment — 78 (anonymisé)',
  courseTeaches: ['ChatGPT pour peintres BTP', 'DTU 59', 'Devis et finitions', 'Qualiopi'],
});

export const FORMATION_IA_METIER_MENUISIER: FormationIaMetierBtpConfig = metierTemplate('menuisier', {
  path: '/formation-ia-menuisier-btp',
  h1: 'Formation IA pour menuisiers — DTU 36, Qualiopi',
  metaTitle: 'Formation IA menuisier BTP — DTU 36 | Laure Olivié',
  metaDescription:
    'Formation IA pour menuisiers : pose, menuiseries extérieures, devis, notices. DTU 36. Qualiopi, Constructys.',
  keywords: ['formation IA menuisier', 'ChatGPT menuiserie', 'DTU 36', 'devis fenêtres'],
  metierNom: 'menuisiers',
  metierNomTitre: 'menuisier',
  normeRef: 'le DTU 36',
  normeLabelCourt: 'DTU 36',
  problemFocus: 'prises de cotes, devis fournisseurs, pose en rénovation, SAV',
  promptTitles: [
    'Devis menuiseries + pose',
    'Fiche relevé cotes (check-list)',
    'CR pose / réserve',
    'Mail fournisseur délai',
    'Synthèse garanties',
  ],
  testimonialQuote: '« Les tableaux de comparatif fournisseurs et les mails clients sont plus clairs depuis la formation. »',
  testimonialAttribution: 'Menuisier poseur — IDF (anonymisé)',
  courseTeaches: ['ChatGPT pour menuisiers BTP', 'DTU 36', 'Devis menuiserie', 'Qualiopi'],
});

export const FORMATION_IA_METIER_CHARPENTIER: FormationIaMetierBtpConfig = metierTemplate('charpentier', {
  path: '/formation-ia-charpentier-btp',
  h1: 'Formation IA pour charpentiers — DTU 31, Qualiopi',
  metaTitle: 'Formation IA charpentier BTP — DTU 31 | Laure Olivié',
  metaDescription:
    'Formation IA pour charpentiers : coupes, structures bois, devis, méthodes. DTU 31. Qualiopi, Constructys.',
  keywords: ['formation IA charpentier', 'ChatGPT charpente', 'DTU 31', 'devis bois'],
  metierNom: 'charpentiers',
  metierNomTitre: 'charpentier',
  normeRef: 'le DTU 31',
  normeLabelCourt: 'DTU 31',
  problemFocus: 'métrés volume bois, nomenclatures, plans de phasage, dossiers technique bois',
  promptTitles: [
    'Nomenclature charpente (brouillon)',
    'CR réunion structure',
    'Mémoire technique ossature',
    'Mail MOE — réserves',
    'Synthèse essences et traitements',
  ],
  testimonialQuote: '« L’aide sur les structures de mémoire et les CR de réunion libère du temps sur le chantier. »',
  testimonialAttribution: 'Charpentier — 91 (anonymisé)',
  courseTeaches: ['ChatGPT pour charpentiers BTP', 'DTU 31', 'Mémoires techniques bois', 'Qualiopi'],
});

export const FORMATION_IA_METIER_CARRELEUR: FormationIaMetierBtpConfig = metierTemplate('carreleur', {
  path: '/formation-ia-carreleur-btp',
  h1: 'Formation IA pour carreleurs — DTU 52, Qualiopi',
  metaTitle: 'Formation IA carreleur BTP — DTU 52 | Laure Olivié',
  metaDescription:
    'Formation IA pour carreleurs : métrés, poses collées, délais, devis. DTU 52. Qualiopi, finançable Constructys.',
  keywords: ['formation IA carreleur', 'ChatGPT carrelage', 'DTU 52', 'devis pose'],
  metierNom: 'carreleurs',
  metierNomTitre: 'carreleur',
  normeRef: 'le DTU 52',
  normeLabelCourt: 'DTU 52',
  problemFocus: 'métrés avec découpes, joints, dossiers « grands formats » et réception',
  promptTitles: [
    'Métré carrelage avec découpes',
    'CR réception de chape',
    'Planning pose (jalons)',
    'Mail client choix de joint',
    'Réponse technique CCTP sol',
  ],
  testimonialQuote: '« Les brouillons de métré et les mails aux clients sont plus rapides à produire. »',
  testimonialAttribution: 'Carreleur — petite couronne (anonymisé)',
  courseTeaches: ['ChatGPT pour carreleurs BTP', 'DTU 52', 'Métrés et devis', 'Qualiopi'],
});

export const FORMATION_IA_METIER_PLAQUISTE: FormationIaMetierBtpConfig = metierTemplate('plaquiste', {
  path: '/formation-ia-plaquiste-btp',
  h1: 'Formation IA pour plaquistes — DTU 25, Qualiopi',
  metaTitle: 'Formation IA plaquiste BTP — DTU 25 | Laure Olivié',
  metaDescription:
    'Formation IA pour plaquistes : cloisons, doublages, devis, plans de coupe. DTU 25. Qualiopi, Constructys.',
  keywords: ['formation IA plaquiste', 'ChatGPT plaque de plâtre', 'DTU 25', 'devis cloisons'],
  metierNom: 'plaquistes',
  metierNomTitre: 'plaquiste',
  normeRef: 'le DTU 25',
  normeLabelCourt: 'DTU 25',
  problemFocus: 'métrés linéaires cloisons, détails acoustiques, plans de découpe',
  promptTitles: [
    'Métré cloisons / doublages',
    'CR coordination avec autres lots',
    'Devis détaillé par pièce',
    'Mail demande de précision MOE',
    'Liste contrôle avant peinture',
  ],
  testimonialQuote: '« Les quantitatifs et les mails de coordination avec l’électricien sortent plus structurés. »',
  testimonialAttribution: 'Plaquiste — 93 (anonymisé)',
  courseTeaches: ['ChatGPT pour plaquistes BTP', 'DTU 25', 'Devis cloisons', 'Qualiopi'],
});
