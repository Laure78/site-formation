import { LINKS } from '@/lib/internal-links';
import type { DepartementPageData } from '@/lib/departement-pages/types';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';

export const DEPARTEMENT_SEINE_SAINT_DENIS_93: DepartementPageData = {
  code: '93',
  nom: 'Seine-Saint-Denis',
  article: 'la',
  prepositionLocative: 'en',
  path: '/formation-ia-btp-seine-saint-denis-93',
  slug: 'seine-saint-denis-93',
  accroche:
    "Formation IA pour le BTP en présentiel en Seine-Saint-Denis (93), intra ou inter. Territoire de grands chantiers et de marchés publics : la session met l'accent sur la réponse aux marchés, le gros œuvre / TP et la production documentaire de chantier à forte cadence — Bobigny, Saint-Denis, Montreuil, Aubervilliers.",
  villes: [
    'Bobigny',
    'Saint-Denis',
    'Montreuil',
    'Aubervilliers',
    'Pantin',
    'Drancy',
    'Noisy-le-Grand',
    'Saint-Ouen',
    'Aulnay-sous-Bois',
  ],
  tempsTrajetGuyancourt:
    "Depuis Guyancourt, comptez environ une heure selon la destination et le trafic (temps indicatifs) — Saint-Denis, Montreuil, Bobigny ou Noisy-le-Grand se cadrent au devis après l'échange découverte. Pantin, Drancy et Aulnay-sous-Bois suivent le même schéma.",
  tissuLocal:
    "Le 93 porte des opérations d'envergure (héritage des grands équipements, dynamique Grand Paris Express), avec une forte présence du gros œuvre, des travaux publics et des marchés publics structurants. Les entreprises de travaux et de second œuvre y sont très présentes ; la charge documentaire (DCE volumineux, CR d'avancement, situations) suit le rythme des chantiers. Axes A1, A3, Francilienne nord-est : les équipes naviguent entre sites et bureau, souvent avec des délais de réponse serrés sur les consultations. Les bailleurs, collectivités et grands donneurs d'ordre du département imposent une traçabilité écrite que peu de PME ont industrialisée. La formation s'appuie sur vos pièces réelles pour accélérer sans lâcher la validation métier — pas de modèle générique hors sol.",
  casUsageLocaux: [
    'Décortiquer un DCE de marché public volumineux et structurer une réponse complète en moins de temps — avec relecture avant dépôt.',
    "Générer les comptes rendus et rapports d'avancement de chantiers à forte cadence à partir de notes terrain — besoin fréquent sur le 93.",
  ],
  faqLocale: [
    {
      q: 'Vous déplacez-vous à Saint-Denis ou Montreuil ?',
      a: 'Oui, en intra dans vos locaux, partout en Seine-Saint-Denis — Bobigny, Aubervilliers, Pantin, Noisy-le-Grand inclus. La logistique depuis Guyancourt se cadre au devis après le RDV découverte.',
    },
    {
      q: 'La formation est-elle utile pour les marchés publics du Grand Paris ?',
      a: "Oui : analyse de DCE/CCTP et structuration de mémoire technique sont au cœur du niveau 2 catalogue. Sur le 93, c'est souvent le premier levier demandé par les équipes qui répondent aux consultations des collectivités et bailleurs.",
    },
    {
      q: 'Les sessions sont-elles adaptées aux équipes gros œuvre / TP ?',
      a: "Oui, les contenus s'appuient sur vos documents réels, quel que soit le corps d'état — situations de travaux, PV, notes de réunion de chantier. L'IA prépare, vos conducteurs valident.",
    },
  ],
  metierPertinent: {
    href: LINKS.formationIaMaconBtp,
    label: 'Formation IA maçon BTP',
    description: 'Gros œuvre et marchés structurants — enjeu fort en Seine-Saint-Denis.',
  },
  metaTitle: buildIdfDeptPageTitle('Seine-Saint-Denis', '93'),
  metaDescription: buildDeptMetaDescription(
    'Seine-Saint-Denis',
    '93',
    'Bobigny, Saint-Denis et Montreuil',
  ),
  keywords: [
    'formation IA appliquée au bâtiment 93',
    'formation ChatGPT Seine-Saint-Denis',
    'formation IA Saint-Denis',
    'formation IA Montreuil',
  ],
};
