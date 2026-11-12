/**
 * FAQ métier — fiche NIV-05 (contenu SEO docs/seo-moe-amo/02).
 */
import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';

export const FAQ_MOE_NIV05: FAQItem[] = [
  {
    q: 'Quelle formation IA pour un cabinet de maîtrise d’œuvre en Île-de-France ?',
    a: 'Une session de 4 h en présentiel, en inter à Paris 12e ou en intra dans vos locaux en Île-de-France, construite sur vos trames MOE/MOEX (CCTP, DCE, CR, OS, réserves). Organisme certifié Qualiopi — Laure Olivié, OFC Création d’Entreprise.',
  },
  {
    q: 'L’IA peut-elle contrôler une situation de travaux ?',
    a: 'Elle peut repérer des écarts (avancement, avenants oubliés, retenue de garantie) et rédiger la demande de correction. Les calculs restent vérifiés dans Excel et la validation reste celle du maître d’œuvre.',
  },
  {
    q: 'Claude ou ChatGPT pour un maître d’œuvre ?',
    a: 'Les deux fonctionnent. La formation s’appuie de préférence sur Claude pour ses Projets et ses Skills, très adaptés aux trames répétitives d’une opération.',
  },
  {
    q: 'L’IA lit-elle les plans AutoCAD ?',
    a: 'Pas les fichiers DWG. Elle exploite des plans exportés en PDF ou DXF pour contrôler cartouches, indices et listes de plans.',
  },
  {
    q: 'Mes pièces de marché sont-elles en sécurité ?',
    a: 'La formation traite la confidentialité en premier : paramétrage de l’espace Team, données à anonymiser, règles d’usage écrites pour l’équipe.',
  },
  {
    q: 'Comment financer la formation ?',
    a: 'Prise en charge OPCO selon éligibilité (Atlas pour les sociétés d’ingénierie). L’entreprise règle la formation puis se fait rembourser ; non éligible au CPF.',
  },
  {
    q: 'Faut-il être à l’aise en informatique ?',
    a: 'Non. Il suffit de savoir utiliser Word, Excel et sa messagerie.',
  },
];

/** Bloc « Qui forme ? » — satisfaction via indicateurs (pas de chiffre en dur). */
export function formationMoeQuiFormeHtml(): string {
  return `Laure Olivié, fondatrice de l’organisme de formation OFC Création d’Entreprise (certifié Qualiopi, actions de formation), 7 ans dans le BTP comme ex-dirigeante d’ALIA BTP (travaux publics, Île-de-France), instructrice LinkedIn Learning (IA BTP). Satisfaction : ${formatNoteSatisfactionAffichageComplet()} — voir <a href="${LINKS.indicateursResultats}">nos indicateurs</a>.`;
}
