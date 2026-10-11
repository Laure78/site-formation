/**
 * Landing `/formation-ia-bureau-etudes-btp` — bureaux d’études (analyse DCE / exigences).
 * Distincte du métreur (métrés/DPGF/BPU), du programme études de prix, et de la MOE.
 */
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

export const FORMATION_IA_BUREAU_ETUDES_BTP_PATH =
  '/formation-ia-bureau-etudes-btp' as const;

export const BUREAU_ETUDES_SEO = {
  title: "IA bureau d'études BTP : DCE et exigences",
  description:
    "Formation IA bureau d'études BTP : croiser DCE, tableaux d'exigences et clarifications sous validation. Formation IA pour le BTP. Présentiel IDF, Qualiopi.",
  h1: "Formation IA pour les bureaux d'études BTP",
  openGraphTitle: "Formation IA bureau d'études BTP — DCE et exigences",
} as const;

export const BUREAU_ETUDES_EN_BREF = [
  "Session en présentiel Île-de-France : ChatGPT et Claude pour croiser les pièces du DCE, structurer des tableaux d’exigences et préparer des demandes de clarification — sans remplacer le calcul technique ni le chiffrage définitif.",
  'Angle bureau d’études : lecture documentaire et hypothèses à valider. Les métrés / DPGF détaillés → page métreur ; le programme catalogue chiffrage → landing études de prix.',
  'Organisme certifié Qualiopi — financement OPCO possible selon éligibilité. Prolongement catalogue fréquent : NIV-02 (appels d’offres).',
] as const;

export const BUREAU_ETUDES_USE_CASES = [
  {
    title: 'Analyse croisée des pièces du DCE',
    body: 'RC, CCTP, CCAP, plans et DPGF : repérer exigences critiques, incohérences entre pièces et points à arbitrer avant chiffrage ou réponse.',
  },
  {
    title: 'Tableaux d’exigences',
    body: 'Transformer un CCTP volumineux en matrice exigence / source / lot / statut (à confirmer, OK, risque) — prêt pour revue interne.',
  },
  {
    title: 'Hypothèses de chiffrage',
    body: 'Lister les hypothèses implicites (interfaces, reprises, accès, phasage) à valider avec le terrain et le chargé d’affaires — jamais un prix « automatique ».',
  },
  {
    title: 'Demandes de clarification',
    body: 'Rédiger des questions factuelles au MOE / maître d’ouvrage : références de pièce, alternatives, délais de réponse — ton neutre et traçable.',
  },
  {
    title: 'Note de synthèse pour arbitrage interne',
    body: 'Produire une note go / no-go documentaire : risques, manques, hypothèses, actions — décision humaine obligatoire.',
  },
] as const;

export const BUREAU_ETUDES_PUBLIC = [
  'Chargés d’études et techniciens de bureau d’études BTP',
  'Responsables études de prix et pré-chiffrage',
  'Métreurs / économistes travaillant sur l’analyse documentaire (complément métrés)',
  'Chargés d’affaires impliqués dans la lecture DCE avant offre',
] as const;

export const BUREAU_ETUDES_PREREQUIS = [
  'Lire régulièrement des DCE, CCTP ou quantitatifs',
  'Connaître le vocabulaire des marchés (RC, CCTP, CCAP, DPGF)',
  'Aucun code requis — formuler une demande en français suffit',
] as const;

export const BUREAU_ETUDES_PROGRAMME = [
  {
    title: 'Cadre IA pour le bureau d’études',
    body: 'Limites des modèles, hallucinations, confidentialité des pièces de marché, distinction brouillon / livrable validé.',
  },
  {
    title: 'Croiser les pièces et structurer les exigences',
    body: 'Méthode de lecture assistée : extraction, tableau d’exigences, incohérences CCTP/DPGF/RC, listes de questions.',
  },
  {
    title: 'Hypothèses, clarifications et synthèse',
    body: 'Formuler hypothèses de chiffrage, demandes de clarification et notes d’arbitrage — avec points de contrôle humains obligatoires.',
  },
] as const;

/** Exemple pédagogique fictif — ne pas présenter comme un cas client réel. */
export const BUREAU_ETUDES_EXEMPLE_FICTIF = {
  titre: 'Exemple pédagogique fictif — lot second œuvre (réhabilitation)',
  contexte:
    'Dossier fictif pour atelier : réhabilitation de bureaux, lot cloisons / plâtrerie. Le RC impose une réponse sous 15 jours. Le CCTP mentionne une performance acoustique ; la DPGF ne détaille pas clairement les reprises de sols.',
  livrableIa:
    'Tableau d’exigences (acoustique, reprises, phasage), 6 questions de clarification au MOE, liste d’hypothèses de chiffrage marquées [À VALIDER].',
  controleHumain:
    'Le participant vérifie chaque ligne avec les pièces sources, complète les quantités et décide des hypothèses retenues avant tout chiffrage.',
} as const;

export const PROMPT_TABLEAU_EXIGENCES = `Tu assistes un bureau d'études BTP en France.

Contexte marché (fictif ou anonymisé) : [type d'opération / lot]
Extrait RC (critères, délais, pièces) :
[Coller]
Extrait CCTP (exigences techniques) :
[Coller — max 2 500 mots]
Extrait DPGF / quantitatif (si dispo) :
[Coller]

Produis un TABLEAU d'exigences avec colonnes :
exigence | pièce source (RC/CCTP/DPGF) | lot concerné | statut (OK / À CONFIRMER / RISQUE) | commentaire

Règles :
- Ne pas inventer d'exigences absentes du texte
- Marquer [À VÉRIFIER SUR PIÈCE COMPLÈTE] si extrait partiel
- Pas de prix, pas de calcul de dimensionnement`;

export const PROMPT_HYPOTHESES_CHIFFRAGE = `Tu assistes une étude de prix BTP.

À partir de ces notes et extraits (anonymisés) :
[Coller CCTP + hypothèses terrain]

Liste les HYPOTHÈSES DE CHIFFRAGE en 3 colonnes :
hypothèse | impact probable (faible/moyen/fort) | action (question MOE / relevé / arbitrage interne)

Interdits :
- inventer des quantités ou des PU
- présenter une hypothèse comme un fait contractuel
Ajoute en bas : « Toute hypothèse doit être validée avant chiffrage définitif. »`;

export const PROMPT_DEMANDES_CLARIFICATION = `Rédige des demandes de clarification pour le maître d'œuvre / maître d'ouvrage.

Marché : [intitulé]
Points ambigus :
[Lister 3 à 8 points — ex. interface lots, reprise de support, délai de réponse]

Pour chaque point :
1. Référence de pièce (CCTP art. X, plan Y, RC §Z) — si inconnue, écrire [RÉF. À COMPLÉTER]
2. Question factuelle, une phrase
3. Alternative ou conséquence si non répondue (sans menace)

Ton neutre, professionnel, prêt à coller dans un courrier ou un tableau de questions.`;

export const BUREAU_ETUDES_FAQ: readonly FAQItem[] = [
  {
    q: 'L’IA peut-elle chiffrer ou dimensionner à la place du bureau d’études ?',
    a: 'Non. Elle structure tableaux, hypothèses et questions. Les calculs techniques, les quantités définitives et la conformité restent sous validation humaine et outils métier.',
  },
  {
    q: 'Quelle différence avec la page métreur-économiste ?',
    a: 'La page métreur se centre sur métrés, DPGF/DQE et BPU. Ici : analyse documentaire du DCE, tableaux d’exigences et clarifications — en amont du métré détaillé.',
  },
  {
    q: 'Quelle différence avec le programme « études de prix et chiffrage » ?',
    a: 'Le programme études de prix (landing catalogue) travaille métrés, DPGF et contrôles de chiffrage en session structurée. Cette page métier vise le bureau d’études sur la lecture DCE et les exigences — les deux se complètent.',
  },
  {
    q: 'Quelle formation catalogue suivre ?',
    a: 'Prolongement fréquent : NIV-02 (appels d’offres) — lien en tête de page. Pour la maîtrise d’œuvre d’exécution, voir le maillage en bas de page.',
  },
  {
    q: 'Financement OPCO / Constructys ?',
    a: 'Financement OPCO possible selon éligibilité (organisme Qualiopi). Le guide Constructys est accessible depuis le maillage en bas de page.',
  },
  {
    q: 'Faut-il déjà utiliser ChatGPT ou Claude ?',
    a: 'Non. La session part de zéro, sans code. Vous repartez avec des prompts réutilisables sur vos DCE anonymisés.',
  },
] as const;

/**
 * Liens AllerPlusLoin — hors LiensConnexes (cluster : métreur, chargé d’affaires,
 * NIV-02, analyse DCE) et hors hero (études de prix).
 */
export const BUREAU_ETUDES_MAILLAGE = [
  {
    href: LINKS.formationIaMaitriseOeuvre,
    label: 'Formation IA pour la maîtrise d’œuvre',
  },
  {
    href: LINKS.guideRepondreAoBtpOfc2026,
    label: 'Guide répondre aux AO BTP (PDF 2026)',
  },
  {
    href: LINKS.iaMemoireTechnique,
    label: 'Méthode : mémoire technique BTP avec l’IA',
  },
  { href: LINKS.financement, label: 'Financement Constructys formation IA BTP' },
] as const;

export function buildBureauEtudesBtpCourseJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = FORMATION_IA_BUREAU_ETUDES_BTP_PATH;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: "Formation IA pour les bureaux d'études BTP",
      description: BUREAU_ETUDES_SEO.description,
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
      educationalRole: "Bureau d'études BTP",
    },
  };
}
