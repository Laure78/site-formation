import type { FAQItem } from '@/lib/faq';
import { FAQ_IA_BTP_METIERS_CHANTIER_SEO } from '@/lib/faq';

/** FAQ — page pilier /formation-ia-btp (alignée JSON-LD FAQPage) */
export const FAQ_FORMATION_IA_BTP_PILLAR: FAQItem[] = [
  ...FAQ_IA_BTP_METIERS_CHANTIER_SEO,
  {
    q: 'Faut-il être bon en informatique pour suivre cette formation ?',
    a:
      "Non. La formation IA pour le BTP ne nécessite aucune compétence informatique particulière. ChatGPT et les outils présentés fonctionnent en français naturel — vous écrivez comme à un collègue. Savoir naviguer sur internet et utiliser un ordinateur ou une tablette suffit.",
  },
  {
    q: 'Quelle est la durée des sessions au catalogue ?',
    a:
      'Chaque programme du catalogue (NIV-01 et NIV-02) est proposé en session de 4 heures, en présentiel en Île-de-France (inter ou intra). Le niveau 1 cible bâtiment et travaux publics ; le niveau 2, les appels d\'offre — voir le <a href="/formations">catalogue formations IA appliquées au bâtiment</a>.',
  },
  {
    q: 'Comment est financée la formation avec Constructys ?',
    a:
      'Constructys peut prendre en charge une partie ou la totalité des coûts pédagogiques selon éligibilité pour les entreprises éligibles du BTP, dans la limite des barèmes (plafond pédagogique 24 € HT/h/stagiaire). La demande se dépose via eGestion au moins 15 jours avant le début. OFC est certifié Qualiopi — guide : <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA appliquée au bâtiment</a>.',
  },
  {
    q: 'La formation peut-elle se faire dans nos locaux ?',
    a:
      'Oui. En intra-entreprise, la session se déroule dans vos locaux en Île-de-France, sur vos documents réels. Les sessions inter du catalogue ont lieu en présentiel sur des lieux en Île-de-France — détail sur <a href="/formation-ia-btp-ile-de-france">formation IA pour le BTP Île-de-France</a>.',
  },
  {
    q: "L'IA va-t-elle remplacer les conducteurs de travaux ou les équipes terrain ?",
    a:
      "Non. L'IA ne remplace pas l'expertise technique, le geste professionnel, la relation client ou le jugement terrain. Elle prend en charge les tâches rédactionnelles et de mise en forme : vous gardez la validation et la responsabilité.",
  },
];
