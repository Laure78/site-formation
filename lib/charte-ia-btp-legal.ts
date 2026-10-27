/**
 * Charte IA BTP — statut de relecture juridique de la page web.
 * Les références dans le PDF OFC ne sont pas reprises comme vérifiées sur cette page.
 */

/** Tant que true : noindex + encart « relecture juridique en cours » sur le guide. */
export const CHARTE_IA_BTP_LEGAL_REVIEW_PENDING = true as const;

/** Points repris ou inspirés du PDF — à contrôler avec un juriste / DPO avant validation. */
export const CHARTE_IA_BTP_CLAIMS_TO_VERIFY = [
  'Calendrier d’application du règlement (UE) 2024/1689 et versions consolidées citées dans le PDF (dont modification de l’article 4 en 2026).',
  'Qualification « haut risque » (articles 6, annexes I et III) et échéances transitoires pour chaque système déployé.',
  'Articulation charte / règlement intérieur (L. 1321-5, L. 1321-4) et formalités de publicité applicables.',
  'Information-consultation CSE (L. 2312-8) selon effectif, projet et seuils en vigueur à la date de déploiement.',
  'Licéité et proportionnalité des contrôles (L. 1121-1, L. 1222-4, L. 2312-38 selon cas).',
  'Bases RGPD, AIPD, DPO, contrats fournisseurs et transferts hors EEE pour chaque outil retenu.',
  'Interdiction ou exceptions autour de l’inférence d’émotions (article 5 du règlement IA) dans vos usages.',
  'Obligations article 50 (transparence contenus synthétiques) pour vos cas d’usage client ou communication.',
  'Mention FFB / CAPEB / OPPBTP : le modèle OFC n’est pas un document homologué par ces organisations.',
] as const;
