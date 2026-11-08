/**
 * Contenu éditorial des fiches catalogue Qualiopi — séparé de la présentation
 * (`TrainingPageTemplate` / facade `CatalogueFormationPageTemplate`).
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import type { TrainingParcoursKind } from '@/lib/training-page-helpers';
import { LINKS } from '@/lib/internal-links';
import { formatPrixHt, getFormationByCode, libelleDureeFormation } from '@/data/formations';
import {
  libelleTarifParticipantCatalogue,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV09_HT,
  TARIF_SESSION_INTRA_NIV11_HT,
  TARIF_SESSION_INTRA_NIV12_HT,
} from '@/lib/tarifs-catalogue-participant';
import {
  DEV_WEB_IA_LIVRABLES,
  DEV_WEB_IA_EFFECTIF_LABEL,
  DEV_WEB_IA_OBJECTIFS,
  DEV_WEB_IA_PARCOURS_14H_SECTION,
} from '@/lib/formation-developpement-web-ia-content';
import { getDevWebIaCatalogueProgramModules14h } from '@/lib/dev-web-ia-programme-catalogue';
import {
  ASSISTANTS_IA_MODULES,
  ASSISTANTS_IA_OBJECTIFS,
  ASSISTANTS_IA_PEDAGOGIE,
  ASSISTANTS_IA_PREREQUIS_ITEMS,
  ASSISTANTS_IA_PROPOSITION_VALEUR,
} from '@/lib/formation-assistants-ia-personnalises-btp-content';
import { mapProgrammeBlocsToCatalogueModules } from '@/lib/catalogue-programme-bloc-mapper';
import {
  SITE_FORMATION_LOCATION_LABEL,
  SITE_FORMATION_MODALITE_ENCART,
  SITE_INTER_LIEU,
  SITE_INTER_LIEU_PREFIX,
  siteExperienceBtpLong,
} from '@/lib/site-config';
import { formationNiveauOfficielLabel } from '@/lib/formation-niveaux-officiels';
import { NIV03_PEDAGOGICAL_METHODS, NIV03_PROGRAMME_BLOCS } from '@/lib/catalogue-formation-programmes-niv03';
import { NIV04_PROGRAMME_BLOCS } from '@/lib/catalogue-formation-programmes-niv04';
import { NIV05_PROGRAMME_BLOCS } from '@/lib/catalogue-formation-programmes-niv05';
import { NIV11_PROGRAMME_BLOCS } from '@/lib/catalogue-formation-programmes-niv11';
import { NIV12_PROGRAMME_BLOCS } from '@/lib/catalogue-formation-programmes-niv12';
import { MENTIONS_TVA_REGIMES_COURT } from '@/lib/tarifs-sessions';

export type CataloguePainPoint = { title: string; texte: string };

export type CatalogueProgramLink = {
  /** Texte avant le lien (ex. « Pour les bases IA ») */
  prefix: string;
  href: string;
  label: string;
};

export type CataloguePrerequisiteBlock = {
  title: string;
  items: readonly string[];
};

export type CatalogueProgramModule = {
  title: string;
  points: readonly string[];
  /** Mise en pratique métier (encadré sous la liste). */
  practice?: string;
  /** Compétence travaillée — affichée en tête du module si renseignée. */
  competence?: string;
  /** Livrable module — sinon extrait d’une puce « Livrable : … ». */
  deliverable?: string;
};

export type CatalogueNavItem = {
  href: string;
  label: string;
};

export type CatalogueFormationPageContent = {
  programmeRef: FormationCatalogueCode;
  parcoursKind: TrainingParcoursKind;
  levelBadgeLabel: string;
  /** Sous-titre hero (public ou prérequis courts). */
  heroPublicLine?: string;
  heroFacts: readonly string[];
  /** Mini-cartes hero (durée, niveau, format…) — sinon dérivées des données formation. */
  heroFactCards?: readonly { label: string; value: string }[];
  /** Part de pratique affichée (ex. « 70 % »). */
  practiceShare?: string;
  /** Format court (ex. « Présentiel »). */
  formatLabel?: string;
  /** Lieu / zone (ex. « Île-de-France »). */
  locationLabel?: string;
  quickFactsLevel: string;
  /** Navigation interne sticky (ancres). */
  navItems?: readonly CatalogueNavItem[];
  painPointsTitle: string;
  painPoints: readonly CataloguePainPoint[];
  /** Ancre de la section problèmes (défaut : `#pour-qui`). */
  painPointsSectionId?: string;
  outcomes: readonly string[];
  outcomesDescription: string;
  /** Encadré pédagogique (ex. rôle IA vs professionnel). */
  pedagogicalNote?: string;
  /** Titre section limites IA (défaut : « Ce que l’IA aide — ce que vous validez »). */
  iaLimitsTitle?: string;
  practicalCase?: {
    title: string;
    paragraphs: readonly string[];
    steps: readonly string[];
    note?: string;
  };
  workflow?: readonly string[];
  iaLimits?: readonly { iaAide: string; validation: string }[];
  deliverablesIntro?: string;
  deliverables: readonly string[];
  deliverablesTitle?: string;
  publicPrerequisites?: readonly CataloguePrerequisiteBlock[];
  intraExtraBullets?: readonly string[];
  interExtraBullets?: readonly string[];
  programIntro: string;
  /** Modules programme — source unique pour l’accordéon. */
  programModules?: readonly CatalogueProgramModule[];
  /** Encadré « méthodes » au-dessus de l’accordéon programme (optionnel). */
  programmeMethodsBullets?: readonly string[];
  programLinks?: readonly CatalogueProgramLink[];
  instructorTitle?: string;
  instructorBody?: string;
  instructorExtraLinks?: readonly { href: string; label: string }[];
  finalCta: {
    title: string;
    description: string;
    secondaryLabel?: string;
    primaryLabel?: string;
    /** CTA visio — défaut `/prendre-rdv`. */
    primaryHref?: string;
    /** @deprecated Préférer `primaryHref` (visio) et `secondaryHref` (devis). */
    devisHref?: string;
    secondaryHref?: string;
    /** Note discrète sous les CTA (ex. « Rendez-vous découverte · 30 min »). */
    note?: string;
  };
  pdfHref?: string;
  /** Titre bloc objectifs (défaut : « Après cette formation, vous saurez… »). */
  objectivesTitle?: string;
  /** Titre section programme (défaut : « Programme — {durée session} »). */
  programmeHeading?: string;
  /** Libellés prix du bloc tarif (onglets Inter / Intra) quand le tarif n’est pas « par participant ». */
  priceLabelOverride?: { inter: string; intra: string };
  /** Remplace la bandeau TrainingQuickFacts par défaut (tarifs 7 h / 14 h, etc.). */
  quickFactsOverride?: readonly { label: string; value: string }[];
  /** Passerelle vers NIV-10 — masquer sur la fiche BeWork elle-même. */
  showBeworkPasserelle?: boolean;
  /** Lien retour vers la landing SEO associée (maillage fiche ↔ landing). */
  seoLandingLink?: { href: string; label: string };
  /** Afficher la barre de réassurance sous le hero (défaut true). */
  showTrustBar?: boolean;
  /** Masquer l’encadré « En bref » sous le hero (GEO conservé dans les métadonnées / SEO). */
  hideHeroEnBref?: boolean;
};

const DEFAULT_FINAL_CTA = {
  title: 'Vous souhaitez former votre équipe à l’IA ?',
  description:
    'Cadrage métier, niveau et cas pratiques avant la session pour adapter le programme.',
  primaryLabel: 'Prendre RDV',
  primaryHref: LINKS.prendreRdv,
  secondaryLabel: 'Demander un devis',
  secondaryHref: LINKS.contact,
  note: 'Rendez-vous découverte · 30 min',
} as const;

const NIV_01_FORMATION = getFormationByCode('NIV-01')!;

const NIV_01: CatalogueFormationPageContent = {
  programmeRef: 'NIV-01',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau 1 · Débutant · Formation IA BTP',
  heroPublicLine:
    'Dirigeants, conducteurs de travaux, chargés d’affaires, bureaux d’études et fonctions support du BTP.',
  heroFacts: [
    libelleDureeFormation(NIV_01_FORMATION),
    '70 % de pratique',
    `${NIV_01_FORMATION.effectifMin} à ${NIV_01_FORMATION.effectifMax} participants`,
    SITE_FORMATION_MODALITE_ENCART,
  ],
  practiceShare: '70 %',
  formatLabel: 'Présentiel',
  locationLabel: SITE_FORMATION_LOCATION_LABEL,
  quickFactsLevel: formationNiveauOfficielLabel(1),
  painPointsTitle: 'Cette formation est faite pour vous si…',
  painPoints: [
    { title: 'Devis', texte: 'Gagner du temps pour rédiger et structurer vos devis.' },
    { title: 'Comptes rendus', texte: 'Transformer vos notes en comptes rendus structurés.' },
    { title: 'Documents de chantier', texte: 'Préparer DOE, PV et suivis de réserves.' },
    { title: 'Emails', texte: 'Rédiger et reformuler vos communications professionnelles.' },
  ],
  outcomes: [
    'Expliquer le fonctionnement, les limites et le cadre d’usage de l’IA générative (littératie IA — art. 4 du règlement européen sur l’IA, RGPD)',
    'Formuler une demande précise à ChatGPT ou Claude avec la méthode CRAFT (Contexte – Rôle – Action – Format – Ton)',
    'Préparer et structurer une première version de devis ou de désignation d’ouvrage, soumise au contrôle du professionnel',
    'Rédiger un compte rendu, une trame de DOE ou de PV à partir de notes, avec relecture humaine',
    'Créer des emails et contenus professionnels, et anonymiser ses documents avant tout usage de l’IA',
  ],
  outcomesDescription:
    'Structurer devis, CR et emails avec l’IA — le professionnel valide prix, métrés et conformité.',
  pedagogicalNote: 'L’IA prépare et structure. Le professionnel contrôle et valide.',
  practicalCase: {
    title: 'Comment se déroule la formation ?',
    paragraphs: [
      'Les exercices peuvent être réalisés à partir de vos devis, comptes rendus, DOE, PV ou emails. Les documents doivent être anonymisés avant leur utilisation dans un outil d’intelligence artificielle.',
    ],
    steps: [
      'Vous apportez un document ou un cas métier.',
      'Vous apprenez à construire la méthode et le prompt.',
      'Vous repartez avec une méthode réutilisable.',
    ],
  },
  deliverables: [
    'Bibliothèque de prompts BTP',
    'Trames de devis, comptes rendus, DOE et PV',
    'Checklist de validation humaine',
    'Certificat de réalisation',
  ],
  programIntro: '4 h (9h–13h) · 70 % pratique · ChatGPT et Claude.',
  programModules: [
    {
      title: 'MODULE 1 — Comprendre l’IA : littératie, outils et bonnes pratiques (60 min)',
      points: [
        'Panorama des outils',
        'ChatGPT et Claude : fonctionnement, versions gratuites et payantes',
        'Ce que l’IA fait bien dans une entreprise du BTP… et ce qu’elle ne fait pas',
        'Méthode de prompt CRAFT',
        'Contexte, Rôle, Action, Format, Ton',
        'Exercices guidés sur des cas métier apportés par les participants',
        'Littératie IA et conformité',
        'Obligation de maîtrise de l’IA (art. 4 du règlement UE 2024/1689)',
        'Erreurs fréquentes, réponses inventées et relecture systématique',
        'Confidentialité des données',
        'RGPD, anonymisation des documents, paramètres de confidentialité',
        'Repères pour une charte d’usage de l’IA dans l’entreprise',
        'Livrable : Fiche mémo CRAFT + checklist d’anonymisation + repères de charte d’usage IA',
      ],
    },
    {
      title: 'MODULE 2 — Devis et chiffrage (60 min)',
      points: [
        'Structurer une désignation d’ouvrage',
        'Descriptif clair par lot, unités et prestations',
        'Reformuler un devis existant pour le rendre plus lisible',
        'Préparer des variantes',
        'Options, plus-values et moins-values',
        'Présentation commerciale du devis au client',
        'Contrôler avant envoi',
        'Checklist de contrôle du devis',
        'Prix, quantités, métrés et références DTU : vérification par le professionnel — l’IA ne chiffre pas',
        'Livrable : Trame de devis + checklist de contrôle avant envoi',
      ],
    },
    {
      title: 'MODULE 3 — Documents de chantier (60 min)',
      points: [
        'Compte rendu de chantier',
        'À partir de notes ou d’une dictée : présents, décisions, actions qui / quoi / quand',
        'Reprise des points non soldés',
        'DOE et PV de réception',
        'Trame de DOE et liste des pièces à réunir',
        'Trame de PV de réception',
        'Réserves et suivi',
        'Tableau de suivi de levée des réserves',
        'Emails de suivi et de relance des entreprises',
        'Livrable : Trames de CR, DOE, PV et suivi des réserves',
      ],
    },
    {
      title: 'MODULE 4 — Communication professionnelle et bilan (60 min)',
      points: [
        'Emails et relances',
        'Emails commerciaux, relances clients et fournisseurs',
        'Adapter le ton au destinataire (client, MOE, fournisseur)',
        'Valoriser ses chantiers',
        'Fiche de présentation d’une réalisation',
        'Contenus pour les réseaux sociaux et calendrier éditorial simple',
        'Bilan de session (15 min)',
        'Auto-positionnement de sortie et plan d’action individuel',
        'Questionnaire de satisfaction et remise des attestations',
        'Livrable : Bibliothèque de prompts BTP + plan d’action individuel',
      ],
    },
  ],
  workflow: [
    'Cadrer l’objectif et le format.',
    'Fournir des sources anonymisées.',
    'Analyser et produire une première version.',
    'Évaluer, corriger, valider avant usage.',
  ],
  iaLimits: [
    { iaAide: 'Structurer un devis ou un CR', validation: 'Prix, métrés et décisions' },
    { iaAide: 'Reformuler un message', validation: 'Faits, destinataires et envoi' },
    { iaAide: 'Proposer une checklist', validation: 'Contrôle sur les pièces d’origine' },
    { iaAide: 'Comparer des formulations', validation: 'Choix final du professionnel' },
  ],
  programLinks: [
    {
      prefix: 'Pour analyser un DCE et structurer un mémoire technique, voir la',
      href: LINKS.formationAO,
      label: 'formation IA appels d’offres BTP',
    },
    {
      prefix: 'Pour approfondir Claude (Projets, Skills, Cowork), voir la',
      href: LINKS.formationMaitriserClaudeAiBtp,
      label: 'formation Maîtriser Claude AI pour le BTP',
    },
  ],
  finalCta: {
    title: 'Vous souhaitez former votre équipe à l’IA ?',
    description:
      'Les besoins et cas d’usage de votre entreprise sont étudiés avant la session, pour adapter le programme à votre équipe.',
    primaryLabel: 'Prendre RDV',
    primaryHref: LINKS.prendreRdv,
    secondaryLabel: 'Demander un devis',
    secondaryHref: LINKS.contact,
    note: 'Rendez-vous découverte · 30 min',
  },
  pdfHref: LINKS.pdfProgrammeIaBtpNiveau1BatimentTp,
};

const NIV_02: CatalogueFormationPageContent = {
  programmeRef: 'NIV-02',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'NUM-02 · Appels d’offres · 4 heures',
  heroPublicLine:
    'Bases de l’IA générative requises. Abonnement professionnel à l’outil utilisé pendant la session (non inclus dans le tarif).',
  heroFacts: [
    '4 heures',
    '75 % de pratique',
    SITE_FORMATION_MODALITE_ENCART,
    formationNiveauOfficielLabel(2),
    'Dossier fil rouge BTP',
  ],
  quickFactsLevel: formationNiveauOfficielLabel(2),
  practiceShare: '75 %',
  formatLabel: 'Présentiel',
  locationLabel: SITE_FORMATION_LOCATION_LABEL,
  pedagogicalNote: 'L’IA assiste l’analyse. Le chiffrage et les engagements restent à valider par le professionnel.',
  painPointsTitle: 'Vos réponses aux appels d’offres mobilisent trop de temps ?',
  painPoints: [
    {
      title: 'Pièces dispersées',
      texte: 'Les informations utiles sont réparties entre RC, CCTP, CCAP, DPGF et annexes.',
    },
    {
      title: 'Écarts CCTP / DPGF',
      texte: 'Des incohérences entre pièces créent un risque d’oubli ou de mauvaise interprétation.',
    },
    {
      title: 'Contrôle du chiffrage',
      texte: 'Sans checklist, une prestation ou une exigence peut passer à côté.',
    },
    {
      title: 'Mémoire technique',
      texte: 'Le plan est difficile à aligner sur les critères et pondérations du RC.',
    },
  ],
  outcomes: [
    'Organiser les pièces d’un DCE avant analyse',
    'Extraire les exigences importantes avec leurs sources',
    'Comparer le RC, le CCTP, le CCAP et la DPGF',
    'Créer une checklist des points à vérifier avant le chiffrage',
    'Structurer un mémoire technique selon les critères du RC',
    'Réutiliser une méthode de travail sur les prochains dossiers',
  ],
  outcomesDescription:
    'Méthode pour analyser un DCE, préparer le chiffrage et structurer un mémoire — contrôle humain avant dépôt.',
  practicalCase: {
    title: 'Comment se déroule la formation ?',
    paragraphs: [
      'Fil rouge : DCE, devis ou trame de mémoire (entreprise ou dossier pédagogique anonymisé). Documents anonymisés ; pas de pièces sensibles sans cadre adapté.',
    ],
    steps: [
      'Vous apportez un dossier fil rouge anonymisé.',
      'Vous construisez la méthode d’analyse et les prompts.',
      'Vous repartez avec une méthode réutilisable.',
    ],
    note: 'Les documents doivent être anonymisés. Les informations sensibles, personnelles ou couvertes par une obligation de confidentialité ne doivent pas être déposées dans un outil IA sans cadre adapté.',
  },
  workflow: [
    'Organiser les pièces.',
    'Extraire les exigences.',
    'Croiser les documents.',
    'Préparer les points de chiffrage.',
    'Structurer le mémoire technique.',
    'Contrôler l’offre avant dépôt.',
  ],
  iaLimits: [
    { iaAide: 'Synthétiser une pièce', validation: 'L’interprétation contractuelle' },
    { iaAide: 'Extraire des exigences', validation: 'Les prestations du lot' },
    { iaAide: 'Comparer deux documents', validation: 'Les quantités et métrés' },
    { iaAide: 'Préparer une checklist', validation: 'Les prix et marges' },
    { iaAide: 'Structurer un mémoire technique', validation: 'Les moyens et engagements remis' },
  ],
  deliverablesIntro: 'Une bibliothèque de trames et d’assistants à personnaliser — selon l’avancement du groupe.',
  deliverables: [
    'Grille de lecture du DCE',
    'Tableau de comparaison CCTP–DPGF',
    'Checklist des points de chiffrage',
    'Trame de questions à adresser à la MOE',
    'Structure de mémoire technique',
    'Checklist avant dépôt',
    'Bibliothèque de prompts',
    'Méthode de validation humaine',
  ],
  publicPrerequisites: [
    {
      title: 'Prérequis pédagogiques',
      items: [
        'Connaître le fonctionnement général d’un appel d’offres',
        'Avoir les bases d’une IA générative (ou le niveau 1)',
      ],
    },
    {
      title: 'Prérequis techniques',
      items: [
        'Ordinateur et accès aux outils utilisés',
        'Abonnement professionnel à l’outil de session',
        'Documents du fil rouge, anonymisés',
      ],
    },
  ],
  intraExtraBullets: ['Dossier fil rouge de l’entreprise'],
  interExtraBullets: ['Dossier pédagogique commun'],
  programIntro: '4 h · 75 % pratique · fil rouge appels d’offres.',
  programModules: [
    {
      title: 'Accueil et cadrage — 10 min',
      points: [
        'Vérification des prérequis',
        'Présentation du dossier fil rouge',
        'Objectifs et règles de confidentialité',
      ],
    },
    {
      title: 'Module 1 — Préparer l’analyse du DCE — 45 min',
      competence: 'Organiser les pièces et cadrer l’analyse du DCE',
      points: [
        'Rôle du RC, du CCAP, du CCTP, de la DPGF et du BPU',
        'Organisation des fichiers dans un Projet Claude (ou conversation dédiée ChatGPT)',
        'Cycle Cadrer → sources anonymisées → analyser → produire → contrôler dans les PDF',
        'Méthode de prompt avec citations des pièces sources',
        'Limites de l’analyse automatisée — alternative si Projet indisponible',
      ],
      practice:
        'Exercice pratique : classer le fil rouge et rédiger une consigne avec obligation de citation des pièces sources.',
    },
    {
      title: 'Module 2 — Analyser et croiser les pièces — 55 min',
      competence: 'Extraire et croiser les exigences avec références',
      points: [
        'Extraction des exigences avec références (Claude / Artifacts)',
        'Identification des délais, pénalités et documents attendus',
        'Comparaison CCTP / DPGF : contradictions, informations manquantes',
        'Liste de points à vérifier et retour aux documents sources (échantillon contrôlé)',
      ],
      practice:
        'Exercice pratique : tableau d’écarts CCTP/DPGF — critère : références exactes, faits vs hypothèses.',
    },
    {
      title: 'Module 3 — Préparer le chiffrage — 45 min',
      competence: 'Préparer une checklist de chiffrage contrôlée',
      points: [
        'Checklist des prestations, unités et quantités à partir des pièces',
        'Comparaison avec un ancien devis (analyse tabulaire ChatGPT si accessible)',
        'Identification des écarts apparents et questions à la maîtrise d’œuvre',
        'L’IA ne calcule pas le prix définitif — quantités, métrés, déboursés, marges et prix sont contrôlés par l’entreprise',
      ],
      practice:
        'Exercice pratique : checklist chiffrage — critère : échantillon recalculé manuellement par le professionnel.',
    },
    {
      title: 'Module 4 — Structurer le mémoire technique — 1 h 10',
      competence: 'Structurer un mémoire aligné sur les critères du RC',
      points: [
        'Lecture des critères et pondérations du RC',
        'Création du plan (Canvas ChatGPT ou Artifacts Claude)',
        'Sélection des preuves réelles de l’entreprise',
        'Rédaction guidée d’une section + grille d’audit avant dépôt',
        'Contrôle des affirmations et engagements — décision finale humaine',
      ],
      practice:
        'Exercice pratique : plan de mémoire + brouillon d’une section avec grille d’audit avant dépôt.',
    },
    {
      title: 'Bilan, plan d’action et clôture — 15 min',
      points: [
        'Checklist finale avant dépôt',
        'Plan d’action individuel',
        'Évaluation des acquis (livrables) distincte du questionnaire de satisfaction',
        'Ressources remises',
      ],
    },
  ],
  programLinks: [
    {
      prefix: 'Avant la session, vous pouvez télécharger le',
      href: LINKS.guideRepondreAoBtpOfc2026,
      label: 'guide AO BTP — méthode en 5 étapes (PDF gratuit)',
    },
    {
      prefix: 'Pour les bases IA avant ce niveau, voir la',
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'formation IA BTP niveau 1',
    },
    {
      prefix: 'Pour approfondir Claude sur vos dossiers AO :',
      href: LINKS.formationMaitriserClaudeAiBtp,
      label: 'formation Maîtriser Claude AI pour le BTP',
    },
    {
      prefix: 'Pour le cadre marchés publics :',
      href: LINKS.formationIaMarchePublicTravaux,
      label: 'formation IA marché public de travaux',
    },
  ],
  instructorTitle: 'Une formation conçue par une spécialiste de l’IA appliquée au BTP',
  instructorBody:
    'Laure Olivié, organisme certifié Qualiopi (OFC Création d’Entreprise). Expérience du bâtiment et des travaux publics, spécialisation IA appliquée aux métiers du BTP. Références : FFB Grand Paris, CSFE, CNAM Entreprise, Le Moniteur Formations.',
  instructorExtraLinks: [{ href: LINKS.qualiopi, label: 'Certification Qualiopi' }],
  finalCta: DEFAULT_FINAL_CTA,
  pdfHref: LINKS.pdfProgrammeIaBtpNiveau2AppelsOffre,
  seoLandingLink: {
    href: LINKS.formationIaAppelsOffresBtp,
    label: 'Pourquoi se former à l’IA pour les appels d’offres ?',
  },
};

const NIV_03: CatalogueFormationPageContent = {
  programmeRef: 'NIV-03',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau 2 · Perfectionnement',
  heroPublicLine:
    'Conducteurs de travaux, chefs de chantier, responsables travaux et assistant(e)s travaux.',
  heroFacts: [
    '4 heures',
    '70 % de pratique',
    `${getFormationByCode('NIV-03')!.effectifMin} à ${getFormationByCode('NIV-03')!.effectifMax} participants`,
    SITE_FORMATION_MODALITE_ENCART,
    'Bibliothèque 20+ skills Claude BTP',
  ],
  quickFactsLevel: formationNiveauOfficielLabel(2),
  practiceShare: '70 %',
  formatLabel: 'Présentiel',
  locationLabel: SITE_FORMATION_LOCATION_LABEL,
  pedagogicalNote: 'L’IA prépare et structure. Le professionnel contrôle et valide.',
  painPointsTitle: 'Vous perdez du temps sur le pilotage chantier ?',
  painPoints: [
    {
      title: 'CCTP & DPGF',
      texte: 'Analyser les pièces techniques et préparer le démarrage sans repartir de zéro à chaque affaire.',
    },
    {
      title: 'Sécurité',
      texte: 'PPSPS, DUERP et SOGED : structurer les documents réglementaires sans y passer des heures.',
    },
    {
      title: 'Suivi quotidien',
      texte: 'Comptes rendus, relances entreprises, approvisionnements et sous-traitants (DC4).',
    },
    {
      title: 'Réception & DOE',
      texte: 'Situations, PV de réserves, DOE et courriers de clôture — avec relecture humaine.',
    },
  ],
  outcomes: [
    'Comprendre le fonctionnement des skills Claude et accéder à la bibliothèque BTP OFC',
    'Préparer et démarrer un chantier avec l’IA : CCTP, DPGF, DICT, OS, planning',
    'Sécuriser le chantier (PPSPS, DUERP, SOGED) et piloter le quotidien (CR, suivi, ST, métré, budget)',
    'Gérer l’administratif jusqu’à la réception : situations, réserves, DOE, litiges',
  ],
  outcomesDescription:
    'Formation IA appliquée à la conduite de travaux : industrialiser l’analyse CCTP/DPGF, la sécurité chantier, les comptes rendus et le DOE avec des skills Claude — validation humaine avant tout envoi.',
  practicalCase: {
    title: 'Comment se déroule la formation ?',
    paragraphs: [
      'Les exercices s’appuient sur vos CCTP, DPGF, modèles de CR, courriers ST ou dossiers de réception — anonymisés avant utilisation dans Claude.',
      'Un fil rouge chronologique : du démarrage à la réception sur un chantier type bâtiment.',
    ],
    steps: [
      'Vous apportez des pièces de chantier anonymisées.',
      'Vous activez et testez les skills sur le fil rouge.',
      'Vous repartez avec des skills personnalisés.',
    ],
    note: 'Un compte Claude Pro est recommandé par participant (environ 18 € HT/mois, à souscrire par l’entreprise) — non inclus dans le tarif.',
  },
  deliverables: [
    'Accès à la bibliothèque 20+ skills Claude BTP (par phase de chantier)',
    'Skills opérationnels testés sur le fil rouge (CCTP, PPSPS, CR, DOE…)',
    'Fiches méthode et supports de prompts par module',
    'Certificat de réalisation',
    'Échange visio J+30 pour ancrer les usages',
  ],
  publicPrerequisites: [
    {
      title: 'Prérequis pédagogiques',
      items: [
        'Savoir utiliser un ordinateur et rédiger en français',
        'Niveau 1 ou pratique déjà d’une IA générative',
      ],
    },
    {
      title: 'Prérequis techniques',
      items: [
        'Ordinateur portable, connexion internet, compte Claude Pro recommandé',
        'Documents de chantier anonymisés (CCTP, CR, modèles ST…)',
      ],
    },
  ],
  intraExtraBullets: ['Suivi visio J+30 inclus'],
  programIntro:
    '4 h · 70 % pratique sur vos documents chantier (installation, suivi, gestion). Réception : module TRA-05 du parcours Conducteur de travaux.',
  programmeMethodsBullets: [...NIV03_PEDAGOGICAL_METHODS],
  programModules: mapProgrammeBlocsToCatalogueModules(NIV03_PROGRAMME_BLOCS),
  programLinks: [
    {
      prefix: 'Pour les bases IA, voir la',
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'formation IA BTP niveau 1',
    },
    {
      prefix: 'Pour approfondir Claude (Skills, Cowork), voir la',
      href: LINKS.formationMaitriserClaudeAiBtp,
      label: 'formation Maîtriser Claude AI pour le BTP',
    },
    {
      prefix: 'Pour enchaîner plusieurs modules métier, voir le',
      href: LINKS.parcoursConducteurDeTravaux,
      label: 'parcours Conducteur de travaux',
    },
  ],
  finalCta: {
    ...DEFAULT_FINAL_CTA,
    title: 'Vous souhaitez former vos conducteurs de travaux à l’IA ?',
    description:
      'Organisez une session pour vos équipes travaux : devis, effectif et financement OPCO possible selon éligibilité.',
  },
  pdfHref: LINKS.pdfProgrammeConduiteTravauxNiv03,
  seoLandingLink: {
    href: LINKS.formationIaConducteurDeTravaux,
    label: 'Pourquoi se former à l’IA pour les conducteurs de travaux ?',
  },
};

const NIV_04: CatalogueFormationPageContent = {
  programmeRef: 'NIV-04',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau 2 · Avancé',
  heroPublicLine:
    'Référents IA, dirigeants, responsables digitaux, chargés d’affaires et conducteurs de travaux souhaitant industrialiser l’usage de Claude dans l’entreprise.',
  heroFacts: [
    '4 heures',
    '70 % de pratique',
    'Projets, Cowork, connecteurs, Claude Code',
    SITE_FORMATION_MODALITE_ENCART,
  ],
  quickFactsLevel: formationNiveauOfficielLabel(2),
  practiceShare: '70 %',
  formatLabel: 'Présentiel',
  locationLabel: SITE_FORMATION_LOCATION_LABEL,
  pedagogicalNote: 'L’IA prépare et structure. Le professionnel contrôle et valide.',
  painPointsTitle: 'Vous voulez structurer Claude dans l’entreprise ?',
  painPoints: [
    {
      title: 'Projets éparpillés',
      texte: 'Chaque affaire repart sans instructions ni base documentaire partagée.',
    },
    {
      title: 'Production documentaire',
      texte: 'CR, mémoires et dossiers chronophages sans méthode industrialisée.',
    },
    {
      title: 'Outils déconnectés',
      texte: 'Messagerie, drive et agenda non reliés à vos workflows Claude.',
    },
    {
      title: 'Automatisations fragiles',
      texte: 'Scripts et lots documentaires difficiles à fiabiliser et réutiliser.',
    },
  ],
  outcomes: [
    'Structurer l’usage de Claude avec Projets et une bibliothèque de skills BTP',
    'Déléguer la production documentaire à Cowork en autonomie supervisée',
    'Connecter Claude à la messagerie, au drive et à l’agenda en sécurisant les données',
    'Automatiser des tâches répétitives avec Claude Code',
    'Fiabiliser skills, connecteurs et automatisations avec validation humaine',
  ],
  outcomesDescription:
    'Industrialiser Projets, skills, Cowork et connecteurs Claude sur vos cas BTP — relecture humaine systématique.',
  deliverables: [
    'Projet « chantier type » structuré',
    'Dossier produit avec Cowork',
    'Connecteur configuré avec workflow sécurisé',
    'Automatisation Claude Code testée',
    'Plan d’action individuel à 30 jours',
    'Certificat de réalisation',
  ],
  publicPrerequisites: [
    {
      title: 'Prérequis pédagogiques',
      items: [
        'Utilisation régulière de Claude déjà acquise',
        'Niveau 1 ou équivalent sur les bases IA BTP',
      ],
    },
    {
      title: 'Prérequis techniques',
      items: [
        'Abonnement Claude Pro actif avec « Exécution de code »',
        'Pièces de chantier anonymisées (CCTP, modèles, dossiers)',
      ],
    },
  ],
  programIntro:
    '4 h (demi-journée) · 4 modules : Projets, Cowork, connecteurs, Claude Code · 70 % pratique.',
  programModules: mapProgrammeBlocsToCatalogueModules(NIV04_PROGRAMME_BLOCS),
  pdfHref: LINKS.pdfProgrammeMaitriserClaudeBtpNiv04,
  programLinks: [
    {
      prefix: 'Pour les appels d’offres, voir la',
      href: LINKS.formationAO,
      label: 'formation IA appels d’offres BTP',
    },
    {
      prefix: 'Pour le pilotage chantier, voir la',
      href: LINKS.formationConduiteTravauxSuiviChantier,
      label: 'formation conduite de travaux',
    },
  ],
  finalCta: DEFAULT_FINAL_CTA,
};

const NIV_05: CatalogueFormationPageContent = {
  programmeRef: 'NIV-05',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau 2 — Avancé',
  heroPublicLine:
    'Maîtres d’œuvre de conception et d’exécution, architectes, économistes, BET, OPC, conducteurs de travaux MOE et assistants gestion travaux.',
  heroFacts: [
    '4 heures',
    '70 % de pratique',
    '5 modules — conception à réception',
    '6 à 12 participants en inter',
    SITE_FORMATION_MODALITE_ENCART,
    'Intra et inter-entreprises',
  ],
  quickFactsLevel: formationNiveauOfficielLabel(2),
  practiceShare: '70 %',
  formatLabel: 'Présentiel',
  locationLabel: SITE_FORMATION_LOCATION_LABEL,
  pedagogicalNote: 'L’IA prépare et structure. Le professionnel contrôle et valide.',
  painPointsTitle: 'Entre conception et chantier, la MOE noie sous les pièces ?',
  painPoints: [
    {
      title: 'CCTP et DPGF',
      texte: 'Descriptifs, métrés et bordereaux à structurer et recouper à chaque consultation.',
    },
    {
      title: 'DCE et offres',
      texte: 'Pièces à croiser, écarts entre entreprises et demandes de clarification à formuler.',
    },
    {
      title: 'Comptes rendus',
      texte: 'Notes, dictées et photos à transformer en CR exploitables et tableaux d’actions.',
    },
    {
      title: 'OS, réserves, réception',
      texte: 'Actes contractuels, listes de réserves et suivi GPA à tenir à jour sans perte de temps.',
    },
  ],
  outcomes: [
    'Construire des prompts et un cadre d’usage IA adaptés aux missions MOE',
    'Préparer des CCTP, descriptifs et trames de DPGF avec contrôles professionnels',
    'Analyser un DCE, comparer les offres et produire une synthèse sourcée',
    'Rédiger des comptes rendus et des plannings courts à partir de notes ou dictées',
    'Préparer ordres de service, tableaux de réserves et pièces de réception',
  ],
  outcomesDescription:
    'CCTP, DPGF, DCE, CR, OS et réserves — ChatGPT et Claude, de la conception au suivi de chantier.',
  practicalCase: {
    title: 'Comment se déroule la formation ?',
    paragraphs: [
      'Ateliers sur vos dossiers MOE (CCTP types, DCE, DPGF, CR, OS, réserves) — anonymisés si besoin. Chaque module se termine par un livrable réutilisable ; les évaluations sont intégrées aux exercices pratiques.',
    ],
    steps: [
      'Vous apportez un dossier fil rouge ou des pièces types du cabinet.',
      'Vous progressez des CCTP et DPGF jusqu’aux réserves et à la réception.',
      'Vous repartez avec prompts, modèles et tableaux prêts à l’emploi.',
    ],
  },
  deliverables: [
    'Prompt réutilisable pour une mission MOE',
    'Extrait de CCTP + trame de DPGF',
    'Synthèse DCE + tableau comparatif des offres',
    'Gabarit de compte rendu + tableau des actions',
    'Liste de réserves + tableau de suivi des levées',
    'Certificat de réalisation',
  ],
  publicPrerequisites: [
    {
      title: 'Prérequis pédagogiques',
      items: ['Aisance avec les outils numériques — aucun prérequis IA'],
    },
    {
      title: 'Prérequis techniques',
      items: [
        'Abonnement ChatGPT Plus ou Claude Pro (ou offre Team) actif sur chaque poste — non inclus',
        'CCTP types, DCE, DPGF, CR, OS et listes de réserves réels (anonymisés)',
      ],
    },
  ],
  iaLimits: [
    { iaAide: 'Trames de CCTP, DPGF et descriptifs par lot', validation: 'Vérifier références normatives et quantités' },
    { iaAide: 'Synthèse DCE et tableau comparatif d’offres', validation: 'Recouper chaque point avec les pièces sources' },
    { iaAide: 'CR, plannings courts et courriers de suivi', validation: 'Valider faits et engagements avant envoi' },
    { iaAide: 'Projets d’OS, réserves et pièces de réception', validation: 'Contrôler habilitations et clauses contractuelles' },
  ],
  programIntro:
    '4 h · 70 % pratique · 5 modules (30 + 55 + 45 + 50 + 60 min) · ateliers sur vos dossiers MOE (anonymisés si besoin).',
  programModules: mapProgrammeBlocsToCatalogueModules(NIV05_PROGRAMME_BLOCS),
  pdfHref: LINKS.pdfProgrammeIaMaitriseOeuvre,
  programLinks: [
    {
      prefix: 'Pour le pilotage chantier côté entreprise, voir la',
      href: LINKS.formationConduiteTravauxSuiviChantier,
      label: 'formation conduite de travaux',
    },
    {
      prefix: 'Côté maîtrise d’ouvrage, voir la',
      href: LINKS.formationIaAssistanceMaitriseOuvrage,
      label: 'formation IA et assistance à maîtrise d’ouvrage',
    },
    {
      prefix: 'Guide gratuit —',
      href: LINKS.guideMaitriseOeuvreIa,
      label: 'maîtrise d’œuvre et intelligence artificielle',
    },
  ],

  finalCta: {
    ...DEFAULT_FINAL_CTA,
    title: 'Vous souhaitez former votre équipe MOE à l’IA ?',
    description:
      'Réservez une visio découverte ou demandez un devis pour une session intra ou inter — réponse sous 48 h ouvrées.',
  },
};

const NIV_10: CatalogueFormationPageContent = {
  programmeRef: 'NIV-10',
  parcoursKind: 'creation-ia',
  levelBadgeLabel: 'Niveau 3 — Approfondi',
  heroPublicLine:
    'Dirigeants, conducteurs de travaux, chargés d’affaires et fonctions support du BTP — sans prérequis en programmation.',
  heroFacts: [
    '14 heures — 2 jours',
    '9h00 – 12h30 · 13h30 – 17h00',
    'Présentiel Île-de-France uniquement',
    DEV_WEB_IA_EFFECTIF_LABEL,
    '70 % pratique · 30 % méthodologie',
  ],
  quickFactsLevel: formationNiveauOfficielLabel(3),
  practiceShare: '70 %',
  formatLabel: 'Présentiel',
  locationLabel: SITE_FORMATION_LOCATION_LABEL,
  pedagogicalNote:
    'L’IA génère une première version. Vous validez le périmètre, les tests et la responsabilité du projet.',
  painPointsTitle: 'Pourquoi vos idées d’outils BTP restent au stade de projet ?',
  painPoints: [],
  outcomes: DEV_WEB_IA_OBJECTIFS,
  outcomesDescription:
    'Objectifs pédagogiques observables — le déroulé détaillé figure dans la section programme (14 h).',
  deliverablesIntro:
    'À l’issue de la session, vous repartez avec une première version fonctionnelle, une méthode et une feuille de route.',
  deliverables: DEV_WEB_IA_LIVRABLES,
  iaLimitsTitle: 'IA et responsabilité : qui valide quoi ?',
  iaLimits: [
    { iaAide: 'Générer une première version à partir d’un besoin cadré', validation: 'Valider le périmètre et les fonctionnalités' },
    { iaAide: 'Proposer la structure des données et des écrans', validation: 'Contrôler la conformité à vos processus' },
    { iaAide: 'Proposer des corrections et améliorations', validation: 'Tester et décider des changements' },
    { iaAide: 'Structurer des instructions (prompts)', validation: 'Contrôler le résultat à chaque étape' },
    { iaAide: 'Aider à préparer des exports', validation: 'Valider le format avec le destinataire' },
    { iaAide: 'Aider à sauvegarder et documenter', validation: 'Garder la responsabilité du projet' },
  ],
  interExtraBullets: [`Session inter — 14 heures — 2 jours, ${DEV_WEB_IA_EFFECTIF_LABEL}`],
  intraExtraBullets: ['Session intra en présentiel dans vos locaux en Île-de-France'],
  programIntro: `${DEV_WEB_IA_PARCOURS_14H_SECTION.intro} · 70 % pratique.`,
  programModules: getDevWebIaCatalogueProgramModules14h(),
  pdfHref: LINKS.pdfProgrammeDeveloppementWebIaSansCoder14h,
  instructorTitle: 'Qui conçoit et encadre la formation ?',
  instructorBody:
    'Laure Olivié, fondatrice de la marque et formatrice (organisme certifié Qualiopi — OFC Création d’Entreprise), 7 ans d’expérience dans le BTP, ancienne dirigeante d’une entreprise de travaux publics en Île-de-France. Elle a elle-même créé ses outils de gestion avec l’IA. Méthode progressive, petits groupes, 70 % de pratique.',
  showBeworkPasserelle: false,
  hideHeroEnBref: true,
  finalCta: DEFAULT_FINAL_CTA,
};

const NIV_09: CatalogueFormationPageContent = {
  programmeRef: 'NIV-09',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau Avancé · 4 heures · Présentiel',
  heroPublicLine: undefined,
  heroFacts: [
    libelleDureeFormation(getFormationByCode('NIV-09')!),
    'Environ 70 % de pratique',
    `Jusqu'à ${getFormationByCode('NIV-09')!.effectifMax} participants`,
    SITE_INTER_LIEU_PREFIX,
  ],
  practiceShare: '70 %',
  formatLabel: 'Présentiel',
  locationLabel: SITE_FORMATION_LOCATION_LABEL,
  quickFactsLevel: formationNiveauOfficielLabel(2),
  pedagogicalNote: 'L’IA prépare et structure. Le professionnel contrôle et valide avant tout envoi.',
  painPointsTitle: '',
  painPoints: [],
  outcomes: [...ASSISTANTS_IA_OBJECTIFS],
  outcomesDescription:
    'À l’issue de la demi-journée, vous savez concevoir, tester et préparer le déploiement d’assistants IA sur ChatGPT et Claude — sans développer d’application.',
  deliverables: [],
  publicPrerequisites: [{ title: 'Prérequis techniques et pédagogiques', items: ASSISTANTS_IA_PREREQUIS_ITEMS }],
  programIntro: ASSISTANTS_IA_PROPOSITION_VALEUR,
  programmeMethodsBullets: [...ASSISTANTS_IA_PEDAGOGIE],
  programModules: ASSISTANTS_IA_MODULES.map((m) => ({
    title: `${m.heading.replace(/^Module \d+ — /, '')} (${m.duree})`,
    points: [...m.points],
    practice: m.atelier,
  })),
  pdfHref: LINKS.pdfProgrammeAssistantsIaPersonnalisesBtp,
  interExtraBullets: [
    'Inter-entreprises : sessions collectives en Île-de-France',
    `${libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV09_HT)}, sous réserve de validation fiscale (${MENTIONS_TVA_REGIMES_COURT})`,
  ],
  intraExtraBullets: [
    'Intra-entreprise : dans vos locaux en Île-de-France',
    'Tarif sur devis',
  ],
  iaLimits: [
    { iaAide: 'Rédiger brouillons (devis, CR, courriers, synthèses DCE)', validation: 'Relire et valider avant envoi client ou marché' },
    { iaAide: 'Structurer consignes, skills et projets', validation: 'Contrôler confidentialité et périmètre des documents déposés' },
    { iaAide: 'Proposer des formulations et mises en forme', validation: 'Adapter au contexte chantier et à la charte entreprise' },
    { iaAide: 'Partager assistants et skills en équipe', validation: 'Désigner un référent et tracer les mises à jour' },
  ],
  programLinks: [
    {
      prefix: 'Pour les bases IA, voir la',
      href: LINKS.formationIaBtpNiveau1BatimentTp,
      label: 'formation IA BTP niveau 1',
    },
    {
      prefix: 'Pour industrialiser Claude en entreprise, voir la',
      href: LINKS.formationMaitriserClaudeAiBtp,
      label: 'formation Maîtriser Claude AI pour le BTP',
    },
  ],
  instructorTitle: 'Laure Olivié — formatrice IA spécialisée BTP',
  instructorBody:
    `${siteExperienceBtpLong()}, ancienne dirigeante d’ALIA BTP (travaux publics). Formatrice certifiée Qualiopi, instructrice LinkedIn Learning. Elle conçoit et anime cette session en présentiel en Île-de-France.`,
  hideHeroEnBref: true,
  finalCta: {
    ...DEFAULT_FINAL_CTA,
    title: 'Construisons votre assistant sur mesure',
    description:
      `${SITE_INTER_LIEU} ou format intra en Île-de-France. Prise en charge OPCO possible selon éligibilité — places limitées à 12 participants.`,
    secondaryLabel: 'Télécharger le programme',
    secondaryHref: LINKS.pdfProgrammeAssistantsIaPersonnalisesBtp,
    note: undefined,
  },
};

const NIV_11: CatalogueFormationPageContent = {
  programmeRef: 'NIV-11',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau 2 · Perfectionnement',
  heroPublicLine:
    'AMO, conduite d’opération, programmation et maîtrise d’ouvrage déléguée — ingénieurs, chefs de projet et chargés d’opération.',
  heroFacts: [
    '4 heures',
    '70 % de pratique',
    '4 modules AMO opérationnels',
    'Intra en Île-de-France',
  ],
  quickFactsLevel: formationNiveauOfficielLabel(2),
  practiceShare: '70 %',
  formatLabel: 'Présentiel',
  locationLabel: SITE_FORMATION_LOCATION_LABEL,
  pedagogicalNote: 'L’IA prépare et structure. Le professionnel contrôle et valide.',
  painPointsTitle: 'L’AMO croule sous les pièces à relire ?',
  painPoints: [
    {
      title: 'Consultations',
      texte: 'Programme, RC, CCTP, CCAP et DPGF à relire et croiser avant le lancement.',
    },
    {
      title: 'Analyse des offres',
      texte: 'Mémoires techniques et offres de prix à comparer, rapport d’analyse à justifier.',
    },
    {
      title: 'Pilotage des intervenants',
      texte: 'Livrables MOE, avis du contrôleur technique, observations du CSPS à suivre.',
    },
    {
      title: 'Reporting MOA',
      texte: 'CR de comité de pilotage, tableau de bord et notes d’alerte à produire vite.',
    },
  ],
  outcomes: [
    'Protéger les données des consultations et appliquer une charte IA',
    'Choisir ChatGPT ou Claude et utiliser Projets, Skills et connecteurs pour l’AMO',
    'Préparer un rapport d’analyse des offres sourcé (MOE, entreprises, CT, CSPS)',
    'Contrôler les livrables MOE et suivre les avis du CT et du CSPS',
    'Rédiger CR de pilotage et notes d’alerte au maître d’ouvrage',
  ],
  outcomesDescription:
    'Consultations, analyse des offres et pilotage des intervenants pour l’AMO — ChatGPT et Claude, validation humaine.',
  practicalCase: {
    title: 'Comment se déroule la formation ?',
    paragraphs: [
      'Ateliers sur vos consultations et dossiers d’opération — anonymisés si besoin. Chaque participant construit un assistant « Consultations » puis un assistant « Pilotage », enrichis d’un Skill par cas d’usage.',
    ],
    steps: [
      'Vous apportez une consultation ou une opération fil rouge.',
      'Vous construisez vos assistants module par module.',
      'Vous repartez avec un plan d’action à 30 jours.',
    ],
  },
  deliverables: [
    'Modèle de charte IA + check-list « avant d’envoyer un document à l’IA »',
    'Mémo « ChatGPT ou Claude pour l’AMO » + modèle de prompt CRAFT',
    'Assistant « Consultations » + grille d’analyse et trame de rapport d’analyse des offres',
    'Assistant « Pilotage » + gabarit de CR de pilotage et note d’alerte MOA',
    'Base de Skills AMO + accès 1 an à l’espace apprenant',
    'Certificat de réalisation',
  ],
  publicPrerequisites: [
    {
      title: 'Prérequis pédagogiques',
      items: ['Aisance avec les outils numériques — aucun prérequis IA'],
    },
    {
      title: 'Prérequis techniques',
      items: [
        'Abonnement ChatGPT Plus ou Claude Pro (ou offre Team) actif sur chaque poste — non inclus',
        'Connecteurs Microsoft 365 validés par l’administrateur informatique, si utilisés',
        'Consultations et dossiers d’opération réels (anonymisés)',
      ],
    },
  ],
  iaLimits: [
    { iaAide: 'Relire et croiser les pièces d’une consultation', validation: 'Vérifier chaque incohérence sur les pièces sources' },
    { iaAide: 'Pré-rédiger le rapport d’analyse des offres', validation: 'Noter, classer et proposer — décision du maître d’ouvrage' },
    { iaAide: 'Synthétiser avis CT et observations CSPS', validation: 'Contrôler les références et les suites à donner' },
    { iaAide: 'Rédiger CR de pilotage et notes d’alerte', validation: 'Relire et valider avant diffusion' },
  ],
  intraExtraBullets: [
    '1 200 € HT la session de 4 h, jusqu’à 10 participants — exonération de TVA, art. 261-4-4°-a du CGI',
    'Demi-journée dans vos locaux en Île-de-France, sur vos consultations',
  ],
  interExtraBullets: [
    `${libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV02_HT)}, sous réserve d’une session inter ouverte`,
  ],
  priceLabelOverride: {
    inter: libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV02_HT),
    intra: `${formatPrixHt(TARIF_SESSION_INTRA_NIV11_HT)} € HT / session de 4 h`,
  },
  hideHeroEnBref: true,
  programIntro: '4 h · 70 % pratique · ateliers sur vos consultations et opérations (anonymisées si besoin).',
  programModules: mapProgrammeBlocsToCatalogueModules(NIV11_PROGRAMME_BLOCS),
  pdfHref: LINKS.pdfProgrammeIaAssistanceMaitriseOuvrage,
  programLinks: [
    {
      prefix: 'Côté maîtrise d’œuvre, voir la',
      href: LINKS.formationIaMaitriseOeuvre,
      label: 'formation IA et maîtrise d’œuvre',
    },
  ],
  finalCta: {
    ...DEFAULT_FINAL_CTA,
    title: 'Vous souhaitez former votre équipe AMO à l’IA ?',
    description:
      'Demandez un devis pour une session intra sur vos consultations — réponse sous 48 h ouvrées.',
  },
};

const NIV_12: CatalogueFormationPageContent = {
  programmeRef: 'NIV-12',
  parcoursKind: 'usages-ia-btp',
  levelBadgeLabel: 'Niveau 2 · Perfectionnement',
  heroPublicLine:
    'Maîtres d’œuvre de conception et d’exécution, architectes, économistes, BET et OPC.',
  heroFacts: [
    '4 heures',
    '70 % de pratique',
    '7 séquences sur vos dossiers',
    'Intra en Île-de-France',
  ],
  quickFactsLevel: formationNiveauOfficielLabel(2),
  practiceShare: '70 %',
  formatLabel: 'Présentiel',
  locationLabel: SITE_FORMATION_LOCATION_LABEL,
  pedagogicalNote: 'L’IA prépare et structure. Le professionnel contrôle et valide.',
  painPointsTitle: 'Votre cabinet passe trop de temps sur les pièces écrites ?',
  painPoints: [
    { title: 'CCTP et descriptifs', texte: 'Rédaction répétitive à partir des mêmes CCTP types et contrats cadres.' },
    { title: 'DPGF et offres', texte: 'Métrés, DPGF et comparatifs d’offres à reprendre à chaque consultation.' },
    { title: 'CR et rapports', texte: 'Notes de chantier, dictées et photos à transformer en CR propres.' },
    { title: 'Plannings et emails', texte: 'Phasages courts et réponses récurrentes aux entreprises et au client.' },
  ],
  outcomes: [
    'Organiser un projet IA par client ou par opération, en protégeant les données du cabinet',
    'Rédiger CCTP, descriptif et notice de sécurité incendie à partir de vos références',
    'Produire métré, DPGF et comparatif des offres, et constituer une base de prix',
    'Produire CR de chantier et rapport photo à partir de notes ou d’une dictée',
    'Construire un planning court et une bibliothèque de réponses aux emails récurrents',
  ],
  outcomesDescription:
    'CCTP, DPGF, CR et plannings pour la maîtrise d’œuvre — ChatGPT ou Claude, quantités et prix contrôlés par le maître d’œuvre.',
  practicalCase: {
    title: 'Comment se déroule la formation ?',
    paragraphs: [
      'Ateliers sur les documents réels du cabinet (CCTP types, plans, DPGF, CR, notes de chantier) — anonymisés si besoin. Chaque séquence produit un livrable réutilisable dès le lendemain.',
    ],
    steps: [
      'Vous apportez vos pièces types et un dossier en cours.',
      'Vous produisez un livrable par séquence.',
      'Vous repartez avec un plan d’action à 30 jours.',
    ],
  },
  deliverables: [
    'Règles d’usage de l’IA du cabinet',
    'Projet IA client / opération prêt à l’emploi',
    'Trame de CCTP + descriptif de travaux',
    'DPGF, tableau comparatif des offres et base de prix',
    'Gabarit de CR + rapport photo, planning type Excel, bibliothèque de réponses',
    'Certificat de réalisation',
  ],
  publicPrerequisites: [
    {
      title: 'Prérequis pédagogiques',
      items: ['Aisance avec les outils numériques — aucun prérequis IA'],
    },
    {
      title: 'Prérequis techniques',
      items: [
        'Abonnement ChatGPT Plus ou Claude Pro (ou offre Team) actif sur chaque poste — non inclus',
        'CCTP types, plans, DPGF, CR et notes de chantier réels (anonymisés)',
      ],
    },
  ],
  iaLimits: [
    { iaAide: 'Rédiger une trame de CCTP ou de descriptif', validation: 'Vérifier les références normatives et réglementaires sur les textes' },
    { iaAide: 'Produire un métré et un DPGF depuis les plans', validation: 'Contrôler quantités et prix avant tout usage' },
    { iaAide: 'Comparer les DPGF chiffrés des entreprises', validation: 'Vérifier écarts et oublis sur les offres d’origine' },
    { iaAide: 'Mettre en forme CR, plannings et emails', validation: 'Relire et valider avant diffusion' },
  ],
  intraExtraBullets: [
    `${formatPrixHt(TARIF_SESSION_INTRA_NIV12_HT)} € HT la session de 4 h, jusqu’à 10 participants — exonération de TVA, art. 261-4-4°-a du CGI`,
    'Demi-journée dans vos locaux en Île-de-France, sur les dossiers du cabinet',
  ],
  interExtraBullets: ['Session inter sur demande — contactez-nous pour connaître les prochaines dates'],
  priceLabelOverride: {
    inter: 'Session inter sur demande',
    intra: `${formatPrixHt(TARIF_SESSION_INTRA_NIV12_HT)} € HT / session de 4 h`,
  },
  programIntro: '4 h · 70 % pratique · ateliers sur les dossiers du cabinet (anonymisés si besoin).',
  programModules: mapProgrammeBlocsToCatalogueModules(NIV12_PROGRAMME_BLOCS),
  pdfHref: LINKS.pdfProgrammeIaMaitriseOeuvreCctpDpgf,
  programLinks: [
    {
      prefix: 'Pour l’exécution (DCE, OS, réserves et réception), voir la',
      href: LINKS.formationIaMaitriseOeuvre,
      label: 'formation IA et maîtrise d’œuvre (4 h)',
    },
    {
      prefix: 'Côté maîtrise d’ouvrage, voir la',
      href: LINKS.formationIaAssistanceMaitriseOuvrage,
      label: 'formation IA et assistance à maîtrise d’ouvrage',
    },
  ],
  finalCta: {
    ...DEFAULT_FINAL_CTA,
    title: 'Vous souhaitez former votre cabinet de maîtrise d’œuvre à l’IA ?',
    description:
      'Demandez un devis pour une session intra sur vos dossiers — réponse sous 48 h ouvrées.',
  },
};

const BY_REF: Partial<Record<FormationCatalogueCode, CatalogueFormationPageContent>> = {
  'NIV-01': NIV_01,
  'NIV-02': NIV_02,
  'NIV-03': NIV_03,
  'NIV-04': NIV_04,
  'NIV-05': NIV_05,
  'NIV-11': NIV_11,
  'NIV-12': NIV_12,
  'NIV-09': NIV_09,
  'NIV-10': NIV_10,
};

export function getCatalogueFormationPageContent(
  ref: FormationCatalogueCode,
): CatalogueFormationPageContent {
  const content = BY_REF[ref];
  if (!content) {
    throw new Error(`Contenu fiche catalogue manquant pour ${ref} — étendre catalogue-formation-page-content.ts`);
  }
  return content;
}

export function hasCatalogueFormationPageTemplate(ref: FormationCatalogueCode): boolean {
  return ref in BY_REF;
}
