/**
 * Règles commerciales de livraison — catalogue IA BTP (NIV-01 à NIV-09 / fiches métier).
 * Présentiel IDF · groupe · intra & inter. Pas de distanciel / accompagnement individuel / hors IDF.
 * NIV-10 (outils de chantier / création avec l’IA) : présentiel Île-de-France uniquement, comme le reste du catalogue.
 * L’inscription d’une personne à une session collective interentreprises est autorisée.
 */
import { IDF_DEPARTEMENTS_LISTE, IDF_ZONE_INTERVENTION, PREUVES } from '@/lib/constants';
import { FORMATIONS_COUNT } from '@/data/formations';

/** Email commercial public — alias de CONTACT (voir `lib/constants.ts`). */
export { CONTACT as BUSINESS_CONTACT } from '@/lib/constants';

export const BUSINESS_DELIVERY = {
  mode: 'Présentiel uniquement',
  location: 'Île-de-France',
  audience: 'Formation en groupe',
  formats: ['Intra-entreprise', 'Inter-entreprises'] as const,
  /** Titre / accroche courte. */
  headline: 'Formations IA BTP en présentiel uniquement en Île-de-France',
  /** Phrase complète de cadrage commercial (catalogue IA BTP). */
  body:
    'Sessions en groupe, en intra-entreprise ou en inter-entreprises. Vous pouvez vous inscrire à une session collective interentreprises. Aucun accompagnement individuel n’est proposé. Le catalogue IA BTP est en présentiel, en Île-de-France.',
  /** Ligne compacte hero / bandeaux. */
  compact: 'Présentiel uniquement • Île-de-France • Groupe • Intra & inter',
  /** Variante avec séparateurs middle dots (UI dense). */
  compactDots: 'Présentiel uniquement · Île-de-France · Formation en groupe · Intra & inter',
  /** Phrase longue (fiches, FAQ). */
  standard:
    'Présentiel uniquement en Île-de-France — en intra-entreprise dans les locaux de l’entreprise ou en inter-entreprises selon les dates programmées et les places disponibles.',
  /** Effectif sans minimum inventé. */
  effectifGroupe:
    'Formation en groupe — effectif selon la formation et le format choisi.',
  /** Zone détaillée. */
  zone: IDF_ZONE_INTERVENTION,
  departementsListe: IDF_DEPARTEMENTS_LISTE,
} as const;

/** Stats satisfaction — délègue à PREUVES / indicateurs. */
export const trainingStats = {
  satisfaction: PREUVES.satisfaction,
  respondents: PREUVES.repondants,
  period: PREUVES.periode,
} as const;

/** Catalogue — nombre réel (source `data/formations.ts`). */
export const catalogStats = {
  trainingCount: FORMATIONS_COUNT,
} as const;

/** FAQ cadrage commercial (réponses plain text / HTML simple). */
export const BUSINESS_DELIVERY_FAQ = [
  {
    q: 'Intervenez-vous partout en France ?',
    a: 'Non. Le catalogue IA BTP est réalisé exclusivement en présentiel en Île-de-France.',
  },
  {
    q: 'Proposez-vous des formations à distance ?',
    a: 'Non. Le catalogue IA BTP est en présentiel, en Île-de-France.',
  },
  {
    q: 'Puis-je suivre une formation individuellement ?',
    a: 'Vous pouvez vous inscrire à une session collective interentreprises. Aucun accompagnement individuel n’est proposé. Les sessions interentreprises sont proposées selon les dates programmées et les places disponibles.',
  },
  {
    q: 'Dans quels départements intervenez-vous ?',
    a: `Paris (75), Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94) et Val-d’Oise (95).`,
  },
] as const;

/** Départements IDF pour filtres formulaires. */
export const IDF_DEPARTEMENT_OPTIONS = [
  { value: '75', label: '75 — Paris' },
  { value: '77', label: '77 — Seine-et-Marne' },
  { value: '78', label: '78 — Yvelines' },
  { value: '91', label: '91 — Essonne' },
  { value: '92', label: '92 — Hauts-de-Seine' },
  { value: '93', label: '93 — Seine-Saint-Denis' },
  { value: '94', label: '94 — Val-de-Marne' },
  { value: '95', label: '95 — Val-d’Oise' },
  { value: 'hors-idf', label: 'Hors Île-de-France' },
] as const;

export const FORMATION_FORMAT_OPTIONS = [
  { value: 'intra', label: 'Intra-entreprise' },
  { value: 'inter', label: 'Inter-entreprises' },
  { value: 'indetermine', label: 'Je ne sais pas encore' },
] as const;

export const HORS_IDF_MESSAGE =
  'Le catalogue IA BTP est en présentiel, en Île-de-France.' as const;
