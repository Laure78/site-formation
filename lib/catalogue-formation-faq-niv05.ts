/**
 * FAQ métier — fiche NIV-05 (contenu SEO docs/seo-moe-amo/02).
 */
import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import { dureeCatalogueParCode } from '@/lib/catalogue-duree-copy';

export const FAQ_MOE_NIV05: FAQItem[] = [
  {
    q: 'Cette formation IA convient-elle à un MOEX ?',
    a: 'Oui : les modules couvrent la phase DET (comptes rendus, ordres de service, situations, visas et courriers aux entreprises) avec le même principe qu’en conception — l’IA prépare, le MOEX valide et signe. En session, vous travaillez sur vos trames MOEX et dossiers anonymisés, en présentiel en Île-de-France.',
  },
  {
    q: 'L’IA peut-elle viser un plan d’exécution à ma place ?',
    a: 'Non : elle ne remplace pas le visa du maître d’œuvre. Elle peut aider à lister les points à contrôler, préparer une grille de lecture ou un brouillon de visa à partir des pièces déposées — la décision, le tampon et la signature restent un acte humain, après recoupement avec les plans et le CCTP.',
  },
  {
    q: 'Quelle différence avec la formation IA pour AMO ?',
    a: 'La formation maîtrise d’œuvre produit et suit les livrables MOE/MOEX (CCTP, OS, CR, réserves) ; la formation AMO analyse les consultations et rend compte au maître d’ouvrage. <a href="' +
      LINKS.formationIaAssistanceMaitriseOuvrage +
      '">Voir la formation IA et assistance à maîtrise d’ouvrage</a> pour le côté pilotage MOA.',
  },
  {
    q: 'Faut-il choisir ChatGPT ou Claude quand on est maître d’œuvre ?',
    a: 'Les deux conviennent ; le choix dépend de vos usages. Claude est souvent privilégié pour les Projets, les Skills et les trames répétitives par opération ; ChatGPT pour la rédaction rapide et certains connecteurs. La formation compare les deux sur vos cas MOE/MOEX et vous aide à fixer une charte d’usage avec relecture systématique.',
  },
  {
    q: 'Quelle formation IA pour un cabinet de maîtrise d’œuvre en Île-de-France ?',
    a: `Une session de ${dureeCatalogueParCode('NIV-05')} en présentiel, en inter à Paris 12e ou en intra dans vos locaux en Île-de-France, construite sur vos trames MOE/MOEX (CCTP, DCE, CR, OS, réserves). Organisme certifié Qualiopi — Laure Olivié, OFC Création d’Entreprise.`,
  },
  {
    q: 'L’IA peut-elle contrôler une situation de travaux ?',
    a: 'Elle peut repérer des écarts (avancement, avenants oubliés, retenue de garantie) et rédiger la demande de correction. Les calculs restent vérifiés dans Excel et la validation reste celle du maître d’œuvre.',
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
