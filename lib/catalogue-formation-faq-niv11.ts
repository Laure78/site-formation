/**
 * FAQ métier — fiche NIV-11 (contenu SEO docs/seo-moe-amo/03).
 */
import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';

export const FAQ_AMO_NIV11: FAQItem[] = [
  {
    q: 'Quelle différence avec la formation pour maîtres d’œuvre ?',
    a: `La <a href="${LINKS.formationIaMaitriseOeuvre}">formation MOE</a> porte sur la production (avenants, OS, situations, réception). Celle-ci porte sur la lecture, le contrôle et le reporting côté maître d’ouvrage.`,
  },
  {
    q: 'L’IA peut-elle vérifier qu’un APD respecte le programme ?',
    a: 'Elle peut lister les écarts apparents entre deux documents écrits. Elle ne remplace pas la revue technique de l’AMO.',
  },
  {
    q: 'Peut-on traiter des données confidentielles du maître d’ouvrage ?',
    a: 'Oui, avec un espace professionnel paramétré et des règles d’anonymisation, traitées dès le début de la formation.',
  },
  {
    q: 'Où se déroule la formation ?',
    a: 'Dans vos locaux, partout en Île-de-France (Paris et départements 77, 78, 91, 92, 93, 94, 95).',
  },
];
