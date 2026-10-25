import type { FAQItem } from '@/lib/faq';
import { getBarometre2026 } from '@/lib/barometre-2026';

const { meta } = getBarometre2026();

export const BAROMETRE_IA_BTP_FAQ: readonly FAQItem[] = [
  {
    q: 'Qu’est-ce que le baromètre IA BTP Île-de-France ?',
    a: 'C’est une publication annuelle d’OFC Création d’Entreprise qui agrège, de façon anonyme, les réponses au questionnaire de positionnement adressé aux participants avant les formations IA BTP en Île-de-France.',
  },
  {
    q: 'Combien de répondants pour l’édition 2026 ?',
    a: `L’édition 2026 repose sur ${meta.n} répondants (${meta.periodLabel}), entreprises du BTP basées en Île-de-France.`,
  },
  {
    q: 'Comment les données sont-elles collectées ?',
    a: meta.collectionMethod,
  },
  {
    q: 'Les chiffres remplacent-ils une étude nationale ?',
    a: 'Non : il s’agit d’un baromètre interne OFC, utile pour comparer les profils des équipes formées en Île-de-France. Il ne prétend pas représenter l’ensemble du secteur français.',
  },
  {
    q: 'Puis-je citer ces chiffres ?',
    a: 'Oui, avec la source « Baromètre IA BTP Île-de-France 2026 — OFC Création d’Entreprise (Laure Olivié) » et le lien vers cette page. Chaque tableau indique l’effectif (n) utilisé.',
  },
];
