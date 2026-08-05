import { LINKS } from '@/lib/internal-links';
import type { DepartementPageData } from '@/lib/departement-pages/types';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';

export const DEPARTEMENT_YVELINES_78: DepartementPageData = {
  code: '78',
  nom: 'Yvelines',
  article: 'les',
  prepositionLocative: 'dans les',
  path: '/formation-ia-btp-yvelines-78',
  slug: 'yvelines-78',
  accroche:
    "Laure Olivié est basée à Guyancourt, au cœur des Yvelines (78) : c'est le département où l'intervention est la plus rapide. Formation IA pour le BTP en présentiel, intra dans vos locaux ou inter en salle, sur vos devis, CCTP et comptes rendus réels — Versailles, SQY, Mantes et périphérie Poissy.",
  villes: [
    'Versailles',
    'Saint-Quentin-en-Yvelines',
    'Guyancourt',
    'Mantes-la-Jolie',
    'Poissy',
    'Saint-Germain-en-Laye',
    'Rambouillet',
  ],
  tempsTrajetGuyancourt:
    "La plupart des sites yvelinois sont à moins de 30 minutes de Guyancourt selon le trafic (temps indicatifs). Versailles, SQY, Vélizy, Poissy et le corridor Mantes se calent facilement en demi-journée ; les zones plus périurbaines (Rambouillet) se planifient au devis. Saint-Germain-en-Laye suit le même schéma logistique.",
  tissuLocal:
    "Les Yvelines combinent un tissu dense de PME du bâtiment et du second œuvre, des sièges et des zones d'activité importantes (Saint-Quentin-en-Yvelines), avec des bassins plus périurbains vers Rambouillet ou Mantes. Versailles, Poissy et Saint-Germain-en-Laye concentrent aussi des opérations de rénovation et de second œuvre sous forte exigence documentaire. Beaucoup de structures cumulent chantier et bureau avec peu de bande passante administrative. Les marchés y sont exigeants sur la documentation (mémoires, CR, AO) et les délais. Objectif terrain : un gain mesurable sur l'admin en 4 h, pas une transformation de trois ans — méthode courte, présentiel, documents réels.",
  casUsageLocaux: [
    "Industrialiser l'administratif récurrent (devis, relances, courriers) pour les PME qui n'ont pas de fonction support dédiée.",
    "Préparer et suivre un chantier avec l'IA, de l'analyse du CCTP au suivi des réserves — prompts CR et grilles de relecture partagés en équipe.",
  ],
  faqLocale: [
    {
      q: 'Vous êtes bien basée dans le 78 ?',
      a: "Oui, à Guyancourt (78280). C'est le département où les délais d'intervention sont les plus courts pour une session intra — souvent sans nuitée ni journée bloquée.",
    },
    {
      q: 'Peut-on faire une session intra à Versailles ou à Saint-Quentin-en-Yvelines ?',
      a: 'Oui, directement dans vos locaux, sur une demi-journée de 4 h, sur vos documents réels. Poissy, Mantes et Rambouillet se planifient de la même façon.',
    },
    {
      q: 'Sous quel délai peut-on organiser une session ?',
      a: "Agendas intra souvent calés sous 3 à 6 semaines dans les Yvelines. Date urgente ? Indiquez-le lors de l'échange découverte Calendly — on regarde les créneaux disponibles au plus près de Guyancourt.",
    },
  ],
  metierPertinent: {
    href: LINKS.formationConducteurTravaux,
    label: 'Formation IA conducteur de travaux',
    description: 'CR, CCTP et suivi chantier — cœur de métier des équipes yvelinoises.',
  },
  metaTitle: buildIdfDeptPageTitle('Yvelines', '78'),
  metaDescription: buildDeptMetaDescription('Yvelines', '78', 'Versailles, SQY, Guyancourt'),
  keywords: [
    'formation IA appliquée au bâtiment Yvelines',
    'formation ChatGPT 78',
    'formation IA Versailles',
    'formation IA Guyancourt',
  ],
};
