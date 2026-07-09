import { getFAQSchema } from '@/lib/seo';
import { FINANCEMENT_FORMULATION_PRUDENTE, FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT } from '@/lib/financement-copy';

/** FAQ générique BTP — utilisée sur les articles sans section FAQ dédiée */
const DEFAULT_BLOG_FAQ_ITEMS = [
  {
    q: 'Comment financer une formation IA appliquée au bâtiment avec Constructys ?',
    a: `Les formations IA pour les pros du BTP de Laure Olivié sont certifiées Qualiopi. ${FINANCEMENT_FORMULATION_PRUDENTE} ${FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT} La demande de financement doit être déposée sur eGestion (services.constructys.fr) au minimum 15 jours avant la formation.`,
  },
  {
    q: 'Quelle formation IA pour un conducteur de travaux ?',
    a: "Le conducteur de travaux peut utiliser l'IA pour rédiger des comptes rendus de chantier, analyser les DCE et CCTP, automatiser ses emails et relances, et préparer des mémoires techniques. La formation IA pour le BTP de Laure Olivié (4h, intra ou inter) couvre ces cas d'usage avec des prompts ChatGPT adaptés au vocabulaire chantier.",
  },
  {
    q: "ChatGPT peut-il aider à rédiger un mémoire technique pour un appel d'offres BTP ?",
    a: "Oui. ChatGPT et Claude AI permettent de structurer et rédiger un mémoire technique en partant du CCTP et des documents du DCE. La méthode enseignée par Laure Olivié permet de produire un mémoire technique de qualité 3 à 5 fois plus rapidement, tout en conservant la validation métier de l'équipe BTP.",
  },
  {
    q: 'Combien de temps dure la formation IA pour les pros du BTP ?',
    a: "Les formations IA appliquées au bâtiment de Laure Olivié durent 4 heures en format inter-entreprises ou intra-entreprise. Des modules combinés (2×4h) sont disponibles pour approfondir les appels d'offres ou le chiffrage. Les formations sont réalisables en présentiel sur votre site ou dans les locaux des partenaires (FFB, CSFE).",
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
    q: "Laure Olivié intervient-elle en dehors de l'Île-de-France ou en distanciel ?",
    a: "Non pour les sessions OFC : présentiel uniquement · Île-de-France uniquement (Paris et départements 77 à 95), en inter ou intra. L'échange préalable de cadrage (30 min) peut se faire en visio.",
  },
] as const;

export function getDefaultBlogFaqSchema() {
  return getFAQSchema(DEFAULT_BLOG_FAQ_ITEMS);
}
