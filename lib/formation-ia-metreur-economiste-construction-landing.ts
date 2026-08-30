/**
 * Landing `/formation-ia-metreur-economiste-construction` — métadonnées, FAQ, prompts, JSON-LD.
 */
import { getCatalogueSessionsRangeDescription } from '@/lib/formation-catalogue-visibility';
import { LINKS } from '@/lib/internal-links';
import {
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { buildFormationFicheCourseJsonLd } from '@/lib/schema-formation-course-jsonld';
import { TARIF_FORFAIT_AVANCE_HT } from '@/lib/tarifs-sessions';
import type { FAQItem } from '@/lib/faq';

export const FORMATION_IA_METREUR_ECONOMISTE_CONSTRUCTION_PATH =
  '/formation-ia-metreur-economiste-construction' as const;

export const METREUR_ECONOMISTE_SEO = {
  title: 'Formation IA métreur économiste BTP IDF',
  description:
    'Formation IA métreur économiste BTP : DPGF, DQE, métrés et BPU. Gagnez du temps sur le quantitatif. Présentiel IDF, Qualiopi, financement OPCO possible.',
  h1: 'Formation IA pour métreurs et économistes de la construction — Île-de-France',
  openGraphTitle: 'Formation IA métreur économiste BTP — DPGF, DQE, métrés',
} as const;

export const METREUR_ECONOMISTE_EN_BREF = [
  'Session en présentiel uniquement en Île-de-France : ChatGPT et Claude pour structurer métrés, quantitatifs, minutes de métré, contrôles DPGF/DQE et vérification de bordereaux BPU — sans remplacer votre responsabilité chiffrage.',
  'L’IA accélère la mise en forme, la relecture croisée et la détection d’incohérences ; vous validez unités, ratios et sous-détail de prix avant diffusion.',
  'Organisme certifié Qualiopi — financement OPCO possible selon éligibilité ; visio découverte gratuite pour cadrer votre besoin.',
] as const;

export const METREUR_ECONOMISTE_METHODE_ETAPES = [
  {
    title: '1. Capturer le métré et la minute de métré',
    body: 'Notes terrain, relevés, croquis, exports Excel partiels : l’IA part de votre matière brute pour produire un brouillon de quantitatif structuré (postes, unités, hypothèses à confirmer).',
    promptKey: 'metre',
  },
  {
    title: '2. Croiser DPGF, CCTP et extrait quantitatif',
    body: 'Aligner descriptif (CCTP), décomposition DPGF et lignes quantitatives : repérer oublis, doublons et postes sensibles avant chiffrage ou contrôle MOE.',
    promptKey: 'dpgf',
  },
  {
    title: '3. Vérifier BPU et sous-détail de prix',
    body: 'Contrôler cohérence libellés, unités, ratios matière/main-d’œuvre et sous-détail de prix par rapport au bordereau BPU et aux hypothèses entreprise.',
    promptKey: 'bpu',
  },
  {
    title: '4. Synthèse DQE et ratio de contrôle',
    body: 'Produire une note de synthèse pour réunion interne ou MOE : écarts, ratios repère, points à arbitrer — toujours sous validation humaine.',
    promptKey: 'dqe',
  },
] as const;

export const PROMPT_METRE_QUANTITATIF = `Tu es métreur / économiste de la construction en France.

Voici ma minute de métré et mes notes brutes (lots, pièces, surfaces, longueurs, ouvertures à déduire) :
[Collez vos notes — sans données nominatives client]

Produis un brouillon de quantitatif avec :
1. Tableau : poste | unité | quantité provisoire | hypothèse / source
2. Liste des points à relever sur place (max 8)
3. Alertes unités incohérentes ou doublons possibles

Marque [À CONFIRMER SUR RELEVÉ] sur toute quantité non sourcée. Ne pas inventer de prix.`;

export const PROMPT_DPGF_CCTP = `Tu es économiste de la construction. Marché : [intitulé lot / opération].

Extrait CCTP (ou résumé) :
[Collez le texte — max 2 500 mots]

Extrait DPGF / décomposition :
[Collez le tableau ou liste de postes]

Compare et liste :
1. Postes DPGF sans exigence CCTP apparente
2. Exigences CCTP sans poste DPGF
3. 5 questions à poser au MOE / bureau d'études
Format puces. Indique [À VÉRIFIER] si incertain.`;

export const PROMPT_BPU_SOUS_DETAIL = `Tu es économiste BTP. Je contrôle un bordereau BPU avant chiffrage.

BPU (extrait) :
[Collez postes, unités, PU HT si connus]

Sous-détail de prix proposé (matière, MO, matériel) :
[Collez votre brouillon]

Vérifie :
1. Cohérence unités BPU vs sous-détail
2. Ratios matière/MO atypiques vs postes similaires (signale sans affirmer)
3. Libellés à harmoniser
4. 3 risques d'erreur de bordereau

Ne recalcule pas les PU à ma place — signale seulement.`;

export const PROMPT_DQE_RATIO = `Tu es métreur-économiste. Opération : [type — bâtiment / TP].

DQE / quantitatif consolidé (extrait) :
[Collez tableau postes / quantités / PU si disponibles]

Produis une synthèse de contrôle interne :
1. Top 5 postes en poids (% du total si PU fournis, sinon en quantité)
2. Ratios repère à contrôler (ex. m²/m³, ml/m²) — [HYPOTHÈSE] si données insuffisantes
3. Écarts ou incohérences entre postes voisins
4. Check-list validation avant envoi MOE

Ton factuel. Aucun engagement contractuel.`;

export const METREUR_ECONOMISTE_FAQ: readonly FAQItem[] = [
  {
    q: 'L’IA peut-elle faire le métré ou chiffrer à ma place ?',
    a: 'Non. L’IA structure des minutes de métré, des quantitatifs et des tableaux de contrôle — les quantités définitives, les unités et les prix restent sous votre responsabilité après relevé et validation métier.',
  },
  {
    q: 'Quels documents métier sont concernés en session ?',
    a: 'DPGF, DQE, BPU, quantitatifs, sous-détail de prix, extrait CCTP, notes de ratio et synthèses de vérification de bordereaux — sur vos cas anonymisés en présentiel en Île-de-France.',
  },
  {
    q: 'Faut-il déjà utiliser ChatGPT ou Claude ?',
    a: 'Non. La formation part de zéro, sans code. Vous repartez avec des prompts réutilisables sur vos dossiers réels (AO, études, contrôles internes).',
  },
  {
    q: 'La formation se déroule-t-elle en visio ?',
    a: 'Non — présentiel uniquement en Île-de-France (intra-entreprise, dans vos locaux). La visio découverte sert uniquement au cadrage commercial, pas à la session certifiante.',
  },
  {
    q: 'Financement OPCO / Constructys possible ?',
    a: `Financement OPCO possible selon éligibilité (organisme certifié Qualiopi). Détails et plafonds sur la page <a href="${LINKS.financement}">financement Constructys formation IA BTP</a>.`,
  },
];

export function getMetreurEconomisteRelated(at: Date = new Date()) {
  return [
    {
      href: LINKS.formationIaEtudesPrixChiffrageBtp,
      title: 'Formation IA études de prix et chiffrage BTP',
      description: 'Landing thématique — DPGF, métrés, BPU, quantitatifs.',
    },
    {
      href: LINKS.formationAO,
      title: 'Formation NIV-02 — IA appels d’offres BTP',
      description: 'DCE, mémoire technique, Claude AI Pro — catalogue Qualiopi.',
    },
    {
      href: LINKS.iaAnalyseDce,
      title: 'Analyser un DCE avec l’IA',
      description: 'Méthode CCTP, CCAP, RC — tâche transactionnelle.',
    },
    {
      href: LINKS.formationIleDeFrance,
      title: 'Formation IA BTP Île-de-France',
      description: 'Pilier géo — présentiel, 8 départements IDF.',
    },
    {
      href: LINKS.formations,
      title: 'Catalogue formations IA BTP',
      description: getCatalogueSessionsRangeDescription(at),
    },
  ] as const;
}

/** @deprecated Préférer getMetreurEconomisteRelated() */
export const METREUR_ECONOMISTE_RELATED = getMetreurEconomisteRelated();

const PROMPTS_BY_KEY: Record<string, string> = {
  metre: PROMPT_METRE_QUANTITATIF,
  dpgf: PROMPT_DPGF_CCTP,
  bpu: PROMPT_BPU_SOUS_DETAIL,
  dqe: PROMPT_DQE_RATIO,
};

export function getMetreurEconomistePrompt(promptKey: string): string {
  return PROMPTS_BY_KEY[promptKey] ?? '';
}

export function buildMetreurEconomisteConstructionCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = FORMATION_IA_METREUR_ECONOMISTE_CONSTRUCTION_PATH;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: 'Formation IA pour métreurs et économistes de la construction',
      description: METREUR_ECONOMISTE_SEO.description,
      path,
      educationalLevel: 'Advanced',
      organizationId: `${base}/#organization`,
      instructorName: SCHEMA_PERSON_LAURE.name,
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
      price: String(TARIF_FORFAIT_AVANCE_HT),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${base}${LINKS.prendreRdv}`,
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'Métreur et économiste de la construction',
    },
  };
}
