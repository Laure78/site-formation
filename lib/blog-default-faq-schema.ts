import { getFAQSchema } from '@/lib/seo';

/** FAQ générique BTP — utilisée sur les articles sans section FAQ dédiée */
const DEFAULT_BLOG_FAQ_ITEMS = [
  {
    q: 'Comment financer une formation IA BTP avec Constructys ?',
    a: "Les formations IA BTP de Laure Olivié sont certifiées Qualiopi et finançables à 100% par Constructys (OPCO BTP). Pour les entreprises de moins de 11 salariés, Constructys prend en charge jusqu'à 24 €HT/heure/stagiaire. La demande de financement doit être déposée sur eGestion (services.constructys.fr) au minimum 15 jours avant la formation.",
  },
  {
    q: 'Quelle formation IA pour un conducteur de travaux ?',
    a: "Le conducteur de travaux peut utiliser l'IA pour rédiger des comptes rendus de chantier, analyser les DCE et CCTP, automatiser ses emails et relances, et préparer des mémoires techniques. La formation IA BTP de Laure Olivié (4h, intra ou inter) couvre ces cas d'usage avec des prompts ChatGPT adaptés au vocabulaire chantier.",
  },
  {
    q: "ChatGPT peut-il aider à rédiger un mémoire technique pour un appel d'offres BTP ?",
    a: "Oui. ChatGPT et Claude AI permettent de structurer et rédiger un mémoire technique en partant du CCTP et des documents du DCE. La méthode enseignée par Laure Olivié permet de produire un mémoire technique de qualité 3 à 5 fois plus rapidement, tout en conservant la validation métier de l'équipe BTP.",
  },
  {
    q: 'Combien de temps dure la formation IA BTP ?',
    a: "Les formations IA BTP de Laure Olivié durent 4 heures en format inter-entreprises ou intra-entreprise. Des modules combinés (2×4h) sont disponibles pour approfondir les appels d'offres ou le chiffrage. Les formations sont réalisables en présentiel sur votre site ou dans les locaux des partenaires (FFB, CSFE).",
  },
  {
    q: "L'IA va-t-elle remplacer les métiers du bâtiment ?",
    a: "Non. L'IA ne remplace pas le geste technique ni l'expertise métier BTP. Elle automatise les tâches administratives et rédactionnelles : devis, emails, mémoires techniques, comptes rendus. Les professionnels du bâtiment formés à l'IA gagnent 3 à 5 heures par semaine sur l'administratif sans perdre leur valeur ajoutée métier.",
  },
  {
    q: 'Faut-il être informaticien pour utiliser ChatGPT dans le BTP ?',
    a: "Non. ChatGPT et Claude AI fonctionnent en français naturel, sans code. Les formations de Laure Olivié sont conçues pour des professionnels BTP sans compétence technique : équipes terrain, conducteurs de travaux, assistantes administratives, dirigeants de PME. La prise en main se fait en moins d'une heure.",
  },
  {
    q: "Laure Olivié intervient-elle en dehors de l'Île-de-France ?",
    a: "Oui. Bien que basée à Guyancourt (78), Laure Olivié intervient dans toute la France pour des formations intra-entreprise. Elle a notamment animé des sessions à Bordeaux, Lyon, et dans les DOM-TOM pour des clients comme Lefebvre Dalloz. Les formations peuvent aussi être réalisées en visioconférence.",
  },
] as const;

export function getDefaultBlogFaqSchema() {
  return getFAQSchema(DEFAULT_BLOG_FAQ_ITEMS);
}
