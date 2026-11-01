import { LINKS } from '@/lib/internal-links';
import type { DepartementPageData } from '@/lib/departement-pages/types';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';
import { SITE_INTER_LIEU_COURT, siteAdresseLigne, siteSiegeCourt } from '@/lib/site-config';

export const DEPARTEMENT_YVELINES_78: DepartementPageData = {
  code: '78',
  nom: 'Yvelines',
  article: 'les',
  prepositionLocative: 'dans les',
  path: '/formation-ia-btp-yvelines-78',
  slug: 'yvelines-78',
  accroche:
    "Laure Olivié (OFC Création d'Entreprise, siège à Paris 75012) intervient dans les Yvelines (78) en présentiel — intra-entreprise (dans vos locaux) ou inter — sur vos devis, CCTP et comptes rendus réels : Versailles, SQY, Mantes et périphérie Poissy.",
  villes: [
    'Versailles',
    'Saint-Quentin-en-Yvelines',
    'Guyancourt',
    'Mantes-la-Jolie',
    'Poissy',
    'Saint-Germain-en-Laye',
    'Rambouillet',
  ],
  tempsTrajetGuyancourt: `Sessions inter à ${SITE_INTER_LIEU_COURT} (siège ${siteAdresseLigne()}). Les intra dans les Yvelines (Versailles, SQY, Vélizy, Poissy, Mantes, Rambouillet) se planifient au devis — temps indicatifs selon trafic.`,
  tissuLocal:
    "Les Yvelines combinent un tissu dense de PME du bâtiment et du second œuvre, des sièges et des zones d'activité importantes (Saint-Quentin-en-Yvelines), avec des bassins plus périurbains vers Rambouillet ou Mantes. Versailles, Poissy et Saint-Germain-en-Laye concentrent aussi des opérations de rénovation et de second œuvre sous forte exigence documentaire. Beaucoup de structures cumulent chantier et bureau avec peu de bande passante administrative. Les marchés y sont exigeants sur la documentation (mémoires, CR, AO) et les délais. Objectif terrain : un gain mesurable sur l'admin en 4 h, pas une transformation de trois ans — méthode courte, présentiel, documents réels.",
  casUsageLocaux: [
    "Industrialiser l'administratif récurrent (devis, relances, courriers) pour les PME qui n'ont pas de fonction support dédiée.",
    "Préparer et suivre un chantier avec l'IA, de l'analyse du CCTP au suivi des réserves — prompts CR et grilles de relecture partagés en équipe.",
  ],
  faqLocale: [
    {
      q: 'Où se déroulent les sessions inter dans les Yvelines ?',
      a: `À ${SITE_INTER_LIEU_COURT} (${siteAdresseLigne()}). Les sessions intra se organisent dans vos locaux dans tout le département — délais souvent courts sans nuitée.`,
    },
    {
      q: 'Peut-on faire une session intra à Versailles ou à Saint-Quentin-en-Yvelines ?',
      a: 'Oui, directement en intra (dans vos locaux) ou inter, sur une demi-journée de 4 h, sur vos documents réels. Poissy, Mantes et Rambouillet se planifient de la même façon.',
    },
    {
      q: 'Sous quel délai peut-on organiser une session ?',
      a: `Agendas intra souvent calés sous 3 à 6 semaines dans les Yvelines. Date urgente ? Indiquez-le lors de l'échange découverte Calendly — on regarde les créneaux disponibles au plus près de ${siteSiegeCourt()}.`,
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
    `formation IA ${SITE_INTER_LIEU_COURT}`,
  ],
};
