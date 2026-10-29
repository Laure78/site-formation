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
import { phraseSessionCataloguePresentielIdf } from '@/lib/catalogue-duree-copy';
import { MODALITE_FORMATIONS_STANDARD, TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';
import { CONTACT, IDF_ZONE_INTERVENTION } from '@/lib/constants';

export const FORMATION_IA_CONSTRUCTION_PATH = '/formation-ia-construction' as const;

export const FORMATION_IA_CONSTRUCTION_SEO = {
  title: 'Formation IA construction en Île-de-France | Laure Olivié',
  description:
    'Formez vos équipes à l’IA appliquée à la construction : devis, DCE et comptes rendus de chantier. En présentiel en Île-de-France. Qualiopi.',
  h1: 'Formation IA pour les professionnels de la construction',
} as const;

/** Publics visés — alignés sur le positionnement OFC (sans label « artisans »). */
export const CONSTRUCTION_PUBLICS = [
  'Dirigeants et directions de PME du bâtiment et de la construction',
  'Conducteurs de travaux et chefs de chantier',
  'Chargés d’affaires et équipes études de prix',
  'Bureaux d’études, BET et fonctions support (QSE, achats, administratif)',
] as const;

/** Orientation vers les fiches catalogue existantes — durées et tarifs sur chaque programme. */
export const CONSTRUCTION_PROGRAMMES_ORIENTATION = [
  {
    label: 'Premiers usages sur devis, emails et CR de chantier',
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    programme: 'NIV-01 — L’IA au service du bâtiment et des travaux publics (4 h)',
  },
  {
    label: 'DCE, mémoire technique et appels d’offres',
    href: LINKS.formationAO,
    programme: 'NIV-02 — IA appliquée aux appels d’offres BTP (7 h)',
  },
  {
    label: 'Suivi de chantier, CR et coordination',
    href: LINKS.formationConduiteTravauxSuiviChantier,
    programme: 'NIV-03 — IA conduite de travaux et suivi chantier (7 h)',
  },
  {
    label: 'Chiffrage, DPGF et quantitatifs (métreurs, économistes)',
    href: LINKS.formationIaMetreurEconomisteConstruction,
    programme: 'Page métier + NIV-02 selon votre besoin',
  },
] as const;

export const CONSTRUCTION_CONTROLE_CONFIDENTIALITE = [
  {
    title: 'Relecture humaine',
    body: 'Tout brouillon IA (devis, synthèse DCE, mémoire technique, CR) est relu et validé par un professionnel habilité avant envoi ou engagement.',
  },
  {
    title: 'Sources et pièces contractuelles',
    body: 'Les exigences extraites d’un DCE doivent être recoupées avec le CCTP, le CCAP ou la DPGF d’origine — l’IA aide à structurer, pas à signer.',
  },
  {
    title: 'Confidentialité des documents',
    body: `Ne pas déposer de DCE nominatif ou de données personnelles dans un outil grand public sans cadre entreprise (compte pro, charte interne). Les sessions OFC s’appuient sur vos cas réels en présentiel en ${IDF_ZONE_INTERVENTION}.`,
  },
] as const;

export const CONSTRUCTION_ZONE_INTERVENTION = {
  zone: IDF_ZONE_INTERVENTION,
  siegeAdministratif: CONTACT.address,
  lieuxSessions:
    'Sessions intra dans vos locaux ou inter en salle — dates et lieux publiés sur les fiches lorsqu’une session inter est ouverte ; pas de liste de villes fictive.',
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

export const CONSTRUCTION_FAQ = [
  {
    q: 'Où se déroule la formation IA construction ?',
    a: `Uniquement en présentiel en ${IDF_ZONE_INTERVENTION} : format intra (dans vos locaux) ou inter en salle selon les sessions ouvertes. Siège administratif OFC : ${CONTACT.address}. Pour une vue régionale du catalogue BTP, voir aussi <a href="${LINKS.formationIleDeFrance}">formation IA BTP en Île-de-France</a>.`,
  },
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
    a: `${phraseSessionCataloguePresentielIdf()} — intra (dans vos locaux) ou inter. ${MODALITE_FORMATIONS_STANDARD} Contenu adapté aux équipes études, direction travaux et fonctions support des entreprises de construction.`,
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
      name: FORMATION_IA_CONSTRUCTION_SEO.h1,
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
