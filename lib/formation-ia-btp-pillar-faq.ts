import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';

/** FAQ — page pilier /formation-ia-btp (6 Q/R — alignée JSON-LD FAQPage) */
export const FAQ_FORMATION_IA_BTP_PILLAR: FAQItem[] = [
  {
    q: 'Qu\'est-ce qu\'une formation IA BTP ?',
    a:
      'Une session professionnelle de 4 h en présentiel, certifiée Qualiopi, pour apprendre à utiliser Claude AI et ChatGPT sur vos documents BTP : devis, DCE, comptes rendus, courriers. Travail sur vos cas réels, relecture humaine obligatoire. Voir le <a href="/formations">catalogue des 5 formations</a>.',
  },
  {
    q: 'Faut-il être bon en informatique pour suivre cette formation ?',
    a:
      'Non. Savoir naviguer sur internet et utiliser un ordinateur ou une tablette suffit. Les outils fonctionnent en français naturel — vous écrivez comme à un collègue. Aucun prérequis technique pour le niveau 1 du catalogue.',
  },
  {
    q: 'Où se déroulent les sessions ?',
    a:
      'Sessions inter en salle ou intra dans vos locaux — présentiel uniquement · Île-de-France uniquement. Détail par département sur <a href="/formation-ia-btp-ile-de-france">formation IA BTP Île-de-France</a>.',
  },
  {
    q: 'Comment financer avec Constructys ou mon OPCO ?',
    a:
      'Les formations Qualiopi OFC peuvent faire l\'objet d\'une prise en charge Constructys ou OPCO selon votre statut, branche et barèmes en vigueur — jamais garantie à 100 %. Guide : <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA BTP</a>.',
  },
  {
    q: 'Quelle formation choisir : devis, appels d\'offres ou chantier ?',
    a:
      'NIV-01 pour débuter (devis, emails, CR) ; NIV-02 pour les appels d\'offres et mémoires techniques ; NIV-03 pour la conduite de travaux ; NIV-04 pour Claude AI. Comparatif sur <a href="/formations">le catalogue formations</a> ou la page <a href="' +
      LINKS.formationConducteurTravaux +
      '">IA conducteur de travaux</a>.',
  },
  {
    q: 'L\'IA va-t-elle remplacer les conducteurs de travaux ou les équipes terrain ?',
    a:
      'Non. L\'IA accélère la rédaction et la mise en forme (CR, emails, brouillons de mémoire). Le jugement technique, la signature des documents et la responsabilité chantier restent humains.',
  },
];
