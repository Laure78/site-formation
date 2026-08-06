import { LINKS } from '@/lib/internal-links';
import type { DepartementPageData } from '@/lib/departement-pages/types';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';

export const DEPARTEMENT_PARIS_75: DepartementPageData = {
  code: '75',
  nom: 'Paris',
  article: null,
  prepositionLocative: 'à',
  path: '/formation-ia-btp-paris',
  slug: 'paris',
  accroche:
    "Formation IA pour le BTP en présentiel à Paris : devis, DCE et comptes rendus sur vos documents réels, dans vos locaux ou en salle inter. Le bassin parisien intra-muros impose des contraintes spécifiques — site occupé, copropriétés, accès chantiers et exigences patrimoniales — que la session traite avec vos pièces concrètes.",
  villes: [
    'Paris 1er–4e (centre & Louvre)',
    'Paris 11e–12e (Bastille, Nation)',
    'Paris 13e–14e (Montparnasse, Olympiades)',
    'Paris 15e–16e (Beaugrenelle, Trocadéro)',
    'Paris 18e–20e (Montmartre, Belleville)',
  ],
  tempsTrajetGuyancourt:
    "Depuis Guyancourt (78), Paris est accessible en transport ou véhicule selon le créneau — comptez typiquement 45 à 75 minutes selon l'arrondissement et le trafic (temps indicatifs). Centre, est et ouest se cadrent au devis ; la petite et grande couronne se traitent aussi via la page formation IA BTP Île-de-France.",
  tissuLocal:
    "Paris concentre maîtres d'œuvre, architectes et entreprises de construction ou de rénovation sous fortes contraintes : copropriétés, chantiers en site occupé, accès difficiles, interlocuteurs ABF sur certains secteurs. Les équipes y passent un temps considérable sur l'écrit contractuel, les autorisations et la coordination multi-intervenants. La densité des opérations et la pression sur les délais rendent la production documentaire (devis, CR, mémoires) critique au quotidien. La formation s'appuie sur ces réalités parisiennes, sans modèle générique hors sol — présentiel uniquement, documents réels.",
  casUsageLocaux: [
    "Analyser rapidement un DCE de marché parisien (CCTP, règlement de consultation) et structurer un mémoire technique convaincant — avec relecture métier obligatoire avant envoi.",
    "Produire des comptes rendus de chantier clairs malgré la complexité des interventions en site occupé et le nombre d'intervenants sur une même adresse.",
  ],
  faqLocale: [
    {
      q: 'Intervenez-vous dans Paris intra-muros ?',
      a: 'Oui. Les sessions ont lieu en présentiel à Paris, dans vos locaux (intra) ou en salle inter — présentiel uniquement · Île-de-France uniquement. Arrondissements centre, est et ouest se traitent de la même façon.',
    },
    {
      q: 'Comment se passe une session intra à Paris ?',
      a: 'Une demi-journée de 4 h sur vos documents réels, en petit groupe, avec des prompts adaptés à vos marchés parisiens (copropriété, site occupé, AO publics locaux). Les contraintes d’accès chantier et de coordination multi-intervenants sont prises en compte dans les exercices.',
    },
    {
      q: 'La formation est-elle finançable pour une entreprise parisienne ?',
      a: 'Elle peut être prise en charge par Constructys ou votre OPCO selon votre statut et les conditions en vigueur — financement OPCO possible selon éligibilité ; le barème n’est pas spécifique à Paris.',
    },
  ],
  metierPertinent: {
    href: LINKS.formationChargeAffairesBtp,
    label: "Formation IA chargé d'affaires BTP",
    description: 'Offres, chiffrage et relation client — utile sur les marchés parisiens.',
  },
  metaTitle: buildIdfDeptPageTitle('Paris', '75'),
  metaDescription: buildDeptMetaDescription('Paris', '75', 'Paris intra-muros'),
  keywords: [
    'formation IA pour le BTP Paris',
    'formation ChatGPT Paris',
    'Qualiopi Paris',
    'formation IA bâtiment Paris',
  ],
};
