/**
 * Landing `/formation-ia-construction` — métadonnées, FAQ, prompts, JSON-LD.
 */
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { FINANCEMENT_FORMULATION_PRUDENTE, FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import {
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { buildFormationFicheCourseJsonLd } from '@/lib/schema-formation-course-jsonld';
import { MODALITE_FORMATIONS_STANDARD, TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';

export const FORMATION_IA_CONSTRUCTION_PATH = '/formation-ia-construction' as const;

export const FORMATION_IA_CONSTRUCTION_SEO = {
  title: 'Formation IA Construction IDF | Laure Olivié',
  description:
    "Formation IA construction en présentiel Île-de-France : DCE, chiffrage, appels d'offres. Qualiopi, finançable Constructys. Réservez votre visio découverte.",
  h1: 'Formation IA pour les Entreprises de Construction en Île-de-France',
} as const;

export const CONSTRUCTION_PROBLEM_POINTS = [
  'Analyse DCE et CCTP : 1 à 2 jours par marché pour les équipes études',
  'Mémoires techniques et dossiers de candidature : charge récurrente sur plusieurs lots',
  'Comptes rendus de réunion MOA/MOE et synthèses de coordination',
  'Chiffrage et DPGF : ressaisies manuelles entre outils et tableurs',
  'Courriers formels, relances et reporting direction travaux',
] as const;

export const CONSTRUCTION_SOLUTION_POINTS = [
  {
    title: 'Lecture accélérée des DCE',
    body: "Extraction des exigences clés, clauses sensibles et interfaces lots — pour cadrer la réunion de lancement sans relire 80 pages à la main.",
  },
  {
    title: 'Mémoires techniques et candidatures',
    body: "Structuration des parties communes (moyens humains, QSE, références) et adaptation par lot — brouillon validé en interne avant envoi.",
  },
  {
    title: 'Chiffrage et devis groupe',
    body: "Templates de DPGF, relances fournisseurs et synthèses de chiffrage pour les directions travaux et les BET.",
  },
  {
    title: 'Coordination chantier et reporting',
    body: "CR de réunion, synthèses d'avancement, courriers MOA/MOE — format homogène, relecture humaine obligatoire.",
  },
] as const;

export const METHODE_ETAPES_CONSTRUCTION = [
  {
    title: 'Cadrer le contexte métier',
    body: "Type de marché, lot, MOA/MOE, phase études ou exécution : l'IA part de votre vocabulaire construction, pas d'un modèle générique.",
  },
  {
    title: 'Structurer avec un prompt documentaire',
    body: "DCE, mémoire technique, DPGF ou CR : le prompt cadré produit un brouillon exploitable pour votre équipe études ou travaux.",
  },
  {
    title: 'Relire, valider, diffuser',
    body: "3 à 5 minutes de relecture par un expert métier avant diffusion. La responsabilité technique et contractuelle reste humaine.",
  },
] as const;

export const PROMPT_DCE_CONSTRUCTION = `Tu es chargé d'études dans une entreprise générale de construction en Île-de-France.

Marché : [intitulé du marché]
Lot : [numéro et intitulé du lot]
Voici un extrait du CCTP / CCAP (max 3 000 mots) :
[Collez le texte]

Produis une synthèse opérationnelle en 5 blocs :
1. Exigences techniques majeures (5 max)
2. Interfaces lots et coordination
3. Points de vigilance planning et pénalités
4. Documents à produire en phase études / exécution
5. Questions à poser en réunion de lancement MOA/MOE

Format puces. Indique [À VÉRIFIER] sur tout point incertain.`;

export const PROMPT_MEMOIRE_TECHNIQUE_CONSTRUCTION = `Tu es responsable mémoire technique pour [entreprise générale / BET], marché [intitulé].

Contexte :
- Effectif mobilisable : [X personnes]
- Références similaires : [2 à 3 chantiers]
- Spécificités lot : [gros œuvre / TCE / second œuvre]

Rédige les sections suivantes du mémoire technique :
1. Présentation de l'entreprise et organigramme projet
2. Moyens humains et matériels affectés au lot
3. Méthodologie d'exécution (3 étapes clés)
4. Démarche QSE et gestion des interfaces

Ton professionnel, vocabulaire construction. 400 mots max par section.`;

export const PROMPT_CHIFFRAGE_CONSTRUCTION = `Tu es métreur / chargé d'affaires pour une entreprise de construction.

Lot à chiffrer : [intitulé]
Base : [extrait BPU / DPGF ou liste de postes]
Contraintes : [délais, accès chantier, sous-traitance]

Produis :
1. Structure DPGF commentée (postes, unités, quantités indicatives)
2. Points à valider en interne avant chiffrage définitif (5 max)
3. Questions à poser au maître d'œuvre ou au BET

Ne invente pas de prix unitaires — indique [PRIX À SAISIR] pour chaque poste.`;

export const CONSTRUCTION_TEMOIGNAGES = [
  {
    quote:
      "L'analyse DCE en 20 minutes au lieu d'une demi-journée a changé notre capacité à répondre aux marchés groupés. L'équipe études garde la main sur le chiffrage final.",
    author: 'Directeur technique, entreprise générale TCE — Hauts-de-Seine',
  },
  {
    quote:
      "Les mémoires techniques structurés par l'IA nous font gagner un jour par candidature. Le financement Constructys s'est déroulé sans friction.",
    author: 'Responsable affaires, groupe construction — Paris',
  },
  {
    quote:
      "Formation adaptée au vocabulaire MOE/BET — pas de jargon tech. Nos chargés d'études sont repartis avec des prompts directement utilisables sur les dossiers en cours.",
    author: 'Responsable formation, BET structure — Île-de-France',
  },
] as const;

export const CONSTRUCTION_FAQ = [
  {
    q: "L'IA va-t-elle remplacer les métiers de la construction ?",
    a: "Non. L'IA accélère la rédaction, la structuration et la synthèse documentaire (DCE, mémoires techniques, CR, DPGF). Le jugement technique, la décision chantier, la relation MOA/MOE et la signature des documents restent à la charge de vos équipes — c'est le fil rouge de la formation.",
  },
  {
    q: 'Comment financer avec Constructys ?',
    a: `${FINANCEMENT_FORMULATION_PRUDENTE} ${FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT} OFC prépare le dossier eGestion ; la demande doit être déposée au minimum 15 jours avant la session. Détails sur le <a href="${LINKS.financement}">guide financement Constructys</a>.`,
  },
  {
    q: 'Quelle durée/format ?',
    a: `Session catalogue de 4 heures en présentiel — intra dans vos locaux ou inter en salle en Île-de-France. ${MODALITE_FORMATIONS_STANDARD} Contenu adapté aux équipes études, direction travaux et fonctions support des entreprises de construction.`,
  },
  {
    q: 'Cette formation convient-elle aux ETI et entreprises générales ?',
    a: "Oui. Le programme cible les structures de 20 à 500 salariés : entreprises générales, lots TCE, BET, bureaux d'études et directions travaux. Les exercices portent sur vos documents réels (DCE, mémoires, DPGF).",
  },
  {
    q: 'Faut-il déjà maîtriser ChatGPT ou Claude ?',
    a: "Non. La formation part de zéro. En 30 minutes, les participants comprennent le principe et testent sur leurs dossiers construction.",
  },
  {
    q: 'Peut-on former plusieurs profils dans la même session intra ?',
    a: "Oui en intra entreprise : direction travaux, chargés d'affaires, études, QSE et assistants de direction peuvent être dans le même groupe — les exercices sont adaptés par profil.",
  },
] as const;

export function buildFormationIaConstructionCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = FORMATION_IA_CONSTRUCTION_PATH;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: 'Formation IA pour les entreprises de construction',
      description: FORMATION_IA_CONSTRUCTION_SEO.description,
      path,
      educationalLevel: 'Professionnel',
      organizationId: `${base}/#organization`,
      instructorName: SCHEMA_PERSON_LAURE.name,
      teaches: [
        "Analyse DCE et CCTP avec l'IA",
        'Rédaction de mémoires techniques construction',
        'Chiffrage et structuration DPGF',
        'Comptes rendus et coordination MOA/MOE',
        'Prompts adaptés aux entreprises générales et BET',
      ],
    }),
    provider: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certification Qualiopi',
        credentialCategory: 'certification',
      },
    },
    instructor: {
      '@type': 'Person',
      name: SCHEMA_PERSON_LAURE.name,
      jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
      url: `${base}/a-propos`,
      sameAs: SCHEMA_LINKEDIN_PROFILE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: String(TARIF_FORFAIT_DEBUTANT_HT),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: buildSiteCalendlyCtaUrl('formation-ia-construction-schema-offer'),
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole:
        'Entreprise de construction, entreprise générale, maître d\'œuvre, BET, direction travaux',
    },
  };
}

export function buildFormationIaConstructionBreadcrumbJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: `${base}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Formations',
        item: `${base}${LINKS.formations}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Formation IA Construction',
        item: `${base}${FORMATION_IA_CONSTRUCTION_PATH}`,
      },
    ],
  };
}
