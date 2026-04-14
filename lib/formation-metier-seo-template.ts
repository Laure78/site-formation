/**
 * Gabarit SEO pour pages métier `/formation-ia-[metier]-btp` (Next.js laureolivie.fr).
 * Copier les sections dans une nouvelle `page.tsx` et remplacer les placeholders.
 *
 * Balises :
 * - Meta title : "Formation IA [Métier] BTP Île-de-France — Laure Olivié" (≤ 60 car.)
 * - Meta description : bénéfice métier + Qualiopi + Constructys + CTA visio (≤ 155 car.)
 *
 * Structure H2 attendue :
 * 1. Sommaire (ancres) — Le problème | Ce que l'IA change | 3 prompts | Tableau gains | FAQ | Laure | Visio
 * 2. Le problème quotidien (≥ 300 mots, vocabulaire métier)
 * 3. Ce que l'IA change concrètement
 * 4. Trois prompts ChatGPT (blocs pré)
 * 5. Tableau gains (Tâche | Avant | Avec IA | Gain)
 * 6. FAQ × 5 (réponse directe en 1–2 phrases en tête)
 * 7. Pourquoi Laure Olivié (preuves)
 * 8. CTA × 3 : Réservez votre visio découverte gratuite (Calendly)
 *
 * Schémas : Course + FAQPage + BreadcrumbList (voir `getCourseSchema`, `getFAQSchema`, `getBreadcrumbSchema`).
 * Maillage : 3 liens internes distincts (`LINKS.formationIaBtp`, blog, autre page métier).
 */
export const FORMATION_METIER_TEMPLATE_PLACEHOLDERS = {
  metier: '[MÉTIER]',
  motClePrincipal: '[MOT-CLÉ]',
  slugUrl: 'formation-ia-[metier]-btp',
  gainHeures: '[X]',
} as const;
