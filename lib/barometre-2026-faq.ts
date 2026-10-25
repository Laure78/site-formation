import { getBarometre2026 } from '@/lib/barometre-2026';

const { meta } = getBarometre2026();

export const BAROMETRE_IA_BTP_FAQ = [
  {
    question: 'Qu’est-ce que le baromètre IA BTP Île-de-France ?',
    answer:
      'C’est une publication annuelle d’OFC Création d’Entreprise qui agrège, de façon anonyme, les réponses au questionnaire de positionnement adressé aux participants avant les formations IA BTP en Île-de-France.',
  },
  {
    question: 'Combien de répondants pour l’édition 2026 ?',
    answer: `L’édition 2026 repose sur ${meta.n} répondants (${meta.periodLabel}), entreprises du BTP basées en Île-de-France.`,
  },
  {
    question: 'Comment les données sont-elles collectées ?',
    answer: meta.collectionMethod,
  },
  {
    question: 'Les chiffres remplacent-ils une étude nationale ?',
    answer:
      'Non : il s’agit d’un baromètre interne OFC, utile pour comparer les profils des équipes formées en Île-de-France. Il ne prétend pas représenter l’ensemble du secteur français.',
  },
  {
    question: 'Puis-je citer ces chiffres ?',
    answer:
      'Oui, avec la source « Baromètre IA BTP Île-de-France 2026 — OFC Création d’Entreprise (Laure Olivié) » et le lien vers cette page. Chaque tableau indique l’effectif (n) utilisé.',
  },
] as const;
