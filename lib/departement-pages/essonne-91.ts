import { LINKS } from '@/lib/internal-links';
import type { DepartementPageData } from '@/lib/departement-pages/types';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';

export const DEPARTEMENT_ESSONNE_91: DepartementPageData = {
  code: '91',
  nom: 'Essonne',
  article: "l'",
  prepositionLocative: 'en',
  path: '/formation-ia-btp-essonne-91',
  slug: 'essonne-91',
  accroche:
    "Formation IA pour le BTP en présentiel en Essonne (91), intra-entreprise, dans vos locaux, sur vos documents réels. Le sud francilien mêle pôles d'innovation (plateau de Saclay, Massy) et zones pavillonnaires : la session s'adapte aux marchés publics, au tertiaire et au tissu PME local.",
  villes: [
    'Évry-Courcouronnes',
    'Massy',
    'Palaiseau',
    'Corbeil-Essonnes',
    'Yerres',
    'Draveil',
    'Savigny-sur-Orge',
    'Longjumeau',
    'Morangis',
  ],
  tempsTrajetGuyancourt:
    "Depuis Guyancourt, le nord de l'Essonne (Massy, Saclay, Palaiseau) est à une trentaine de minutes selon le trafic ; Évry-Courcouronnes et Corbeil se planifient typiquement sous 45 à 60 minutes — temps indicatifs, confirmés au devis. Yerres, Draveil et Savigny-sur-Orge suivent le même schéma logistique.",
  tissuLocal:
    "L'Essonne porte des opérations d'envergure autour de Saclay et des grands axes (A6, Francilienne sud), avec une part importante de marchés publics, de chantiers tertiaires et d'un tissu pavillonnaire actif. Ingénierie, sous-traitance BTP et rénovation cohabitent avec le neuf — de Palaiseau à Évry-Courcouronnes en passant par Corbeil. Les équipes support et conducteurs manquent souvent d'une méthode partagée sur les prompts et la relecture, surtout quand les consultations publiques s'empilent. Une intra en Essonne aligne réflexes, garde-fous confidentialité et livrables utilisables dès le lendemain, sur vos modèles de mémoire et de CR — sans jargon tech inutile.",
  casUsageLocaux: [
    "Répondre plus vite et mieux aux appels d'offres publics : analyse DCE, structuration de mémoire technique, décision go/no-go — l'IA prépare, vos équipes valident.",
    'Standardiser les dossiers de chantier (DOE, PV, situations) sur les opérations à enjeux autour de Massy, Saclay ou Évry — traçabilité partagée en équipe.',
  ],
  faqLocale: [
    {
      q: 'Intervenez-vous sur le plateau de Saclay et à Massy ?',
      a: 'Oui, en intra dans vos locaux, comme partout en Essonne — présentiel uniquement. Palaiseau, Longjumeau et Morangis se planifient aussi en demi-journée depuis Guyancourt.',
    },
    {
      q: 'La formation aide-t-elle vraiment sur les marchés publics ?',
      a: "Oui : analyse de DCE, structuration de mémoire technique et go/no-go — l'IA prépare, vos équipes valident avant envoi. C’est le besoin le plus cité par les entreprises essonniennes qui répondent aux marchés des collectivités.",
    },
    {
      q: 'Quel niveau choisir pour démarrer ?',
      a: "Le niveau 1 pour les bases (devis, mails, CR) ; le niveau 2 (appels d'offres) si la priorité est la réponse aux marchés. Le choix se cadre en 30 minutes lors de l’échange découverte.",
    },
  ],
  metierPertinent: {
    href: LINKS.formationAO,
    label: "IA appliquée aux appels d'offres BTP",
    description: 'DCE, mémoire technique, marchés publics — fort enjeu en Essonne.',
  },
  metaTitle: buildIdfDeptPageTitle('Essonne', '91'),
  metaDescription: buildDeptMetaDescription('Essonne', '91', 'Évry-Courcouronnes, Massy et Palaiseau'),
  keywords: [
    'formation IA pour le BTP 91',
    'formation ChatGPT Essonne',
    'formation IA Massy',
    'formation IA Évry',
  ],
};
