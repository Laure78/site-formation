import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';

export type DeptInternalLink = {
  href: string;
  label: string;
  description: string;
};

export type DeptLocalSeoContent = {
  deptCode: string;
  departementNom: string;
  intro: string;
  villesEtTrajets: string;
  tissuBtpLocal: string;
  casUsage: [string, string];
  faq: FAQItem[];
  internalLinks: [DeptInternalLink, DeptInternalLink, DeptInternalLink];
};

/** Contenus locaux uniques — audit SEO départements IDF (ne pas recopier entre départements). */
export const DEPT_LOCAL_SEO_CONTENT: Record<string, DeptLocalSeoContent> = {
  '75': {
    deptCode: '75',
    departementNom: 'Paris',
    intro:
      "La formation IA bâtiment et construction de Laure Olivié (OFC Création d'Entreprise) se déroule en présentiel à Paris, dans vos locaux (intra) ou en salle (inter). Cible : entreprises et chantiers parisiens intra-muros — DCE de marchés parisiens, mémoires techniques, comptes rendus de chantier en site occupé.",
    villesEtTrajets:
      "Tout Paris intra-muros, des 20 arrondissements aux franges (porte de la Chapelle, rive gauche, secteur Bercy). Depuis Guyancourt (78), Paris est accessible en transport ou véhicule selon le créneau — temps indicatifs, selon le trafic. La petite et grande couronne sont couvertes via la page formation IA BTP Île-de-France.",
    tissuBtpLocal:
      "Paris concentre maîtres d'œuvre, architectes et entreprises de construction / rénovation sous fortes contraintes : copropriétés, chantiers en site occupé, accès difficiles, exigences patrimoniales (ABF). Les équipes y passent un temps considérable sur l'écrit contractuel et les autorisations.",
    casUsage: [
      "Analyser rapidement un DCE de marché parisien (CCTP, règlement) et structurer un mémoire technique convaincant — avec relecture métier obligatoire.",
      "Produire des comptes rendus de chantier clairs malgré la complexité des interventions en site occupé.",
    ],
    faq: [
      {
        q: 'Intervenez-vous dans Paris intra-muros ?',
        a: 'Oui. Les sessions ont lieu en présentiel à Paris, dans vos locaux ou en salle inter — présentiel uniquement · Île-de-France uniquement.',
      },
      {
        q: 'Comment se passe une session intra à Paris ?',
        a: 'Une demi-journée de 4 h sur vos documents réels, en petit groupe, avec des prompts adaptés à vos marchés.',
      },
      {
        q: 'La formation est-elle finançable pour une entreprise parisienne ?',
        a: 'Elle peut être prise en charge par Constructys ou votre OPCO selon votre statut et les conditions en vigueur.',
      },
    ],
    internalLinks: [
      {
        href: LINKS.formationAO,
        label: "IA appliquée aux appels d'offres BTP",
        description: 'DCE, mémoire technique, analyse marchés',
      },
      {
        href: LINKS.formationChargeAffairesBtp,
        label: "Chargé d'affaires BTP",
        description: 'Offres, chiffrage et relation client',
      },
      {
        href: LINKS.formationIleDeFrance,
        label: 'Formation IA Île-de-France',
        description: '8 départements, intra et inter',
      },
    ],
  },
  '77': {
    deptCode: '77',
    departementNom: 'Seine-et-Marne',
    intro:
      "Formation IA pour le BTP en présentiel en Seine-et-Marne (77), intra dans vos locaux ou inter en salle. Le 77 est le plus vaste département francilien : la formation est pensée pour des équipes parfois dispersées sur de grandes distances de chantier.",
    villesEtTrajets:
      "Melun (préfecture), Meaux, Chelles, le secteur de Marne-la-Vallée, Fontainebleau, Provins. Depuis Guyancourt, comptez environ une heure à une heure et quart selon la destination et le trafic — temps indicatifs.",
    tissuBtpLocal:
      "Territoire mixte — péri-urbain dense à l'ouest (Marne-la-Vallée, Chelles) et plus rural à l'est. Forte présence du pavillonnaire, de la rénovation et des travaux publics / VRD liés à l'étalement et aux infrastructures.",
    casUsage: [
      "Accélérer la rédaction de devis de maison individuelle et de rénovation (notes terrain → devis structuré, vous validez).",
      "Centraliser les comptes rendus de chantiers éloignés à partir de notes vocales, pour ne plus perdre l'info entre deux sites.",
    ],
    faq: [
      {
        q: "Vous déplacez-vous jusqu'à Melun ou Meaux ?",
        a: 'Oui, en intra dans vos locaux partout en Seine-et-Marne. Pour optimiser, une session inter regroupant plusieurs entreprises proches est aussi possible.',
      },
      {
        q: 'Le 77 étant étendu, y a-t-il des frais de déplacement ?',
        a: 'Les modalités sont précisées au devis, après le RDV découverte — sans surprise.',
      },
      {
        q: 'Combien de participants par session ?',
        a: "Jusqu'à 12 pour le niveau 1, effectifs réduits pour les niveaux 2.",
      },
    ],
    internalLinks: [
      {
        href: LINKS.formationIaBtpNiveau1BatimentTp,
        label: "L'IA au service du bâtiment & TP",
        description: 'Programme NIV-01 — bases 4 h',
      },
      {
        href: LINKS.iaDevis,
        label: 'IA devis bâtiment',
        description: 'Chiffrage et notes terrain',
      },
      {
        href: LINKS.formationIleDeFrance,
        label: 'Formation IA Île-de-France',
        description: '8 départements, intra et inter',
      },
    ],
  },
  '78': {
    deptCode: '78',
    departementNom: 'Yvelines',
    intro:
      "Laure Olivié est basée à Guyancourt, au cœur des Yvelines (78) : c'est le département où l'intervention est la plus rapide. Formation IA pour le BTP en présentiel, intra dans vos locaux ou inter en salle, sur vos documents réels.",
    villesEtTrajets:
      "Versailles (préfecture), Saint-Quentin-en-Yvelines, Guyancourt, Poissy, Mantes-la-Jolie, Sartrouville, Trappes. La plupart des sites yvelinois sont à moins de 30 minutes de Guyancourt — selon le trafic.",
    tissuBtpLocal:
      "Les Yvelines combinent un tissu dense de PME du bâtiment, des sièges d'entreprises et des zones d'activité importantes (Saint-Quentin-en-Yvelines). Beaucoup de structures y cumulent chantier et bureau avec peu de bande passante administrative.",
    casUsage: [
      "Industrialiser l'administratif récurrent (devis, relances, courriers) pour les PME qui n'ont pas de fonction support dédiée.",
      "Préparer et suivre un chantier avec l'IA, de l'analyse du CCTP au suivi des réserves.",
    ],
    faq: [
      {
        q: 'Vous êtes bien basée dans le 78 ?',
        a: "Oui, à Guyancourt (78280). C'est le département où les délais d'intervention sont les plus courts.",
      },
      {
        q: 'Peut-on faire une session intra à Versailles ou à Saint-Quentin-en-Yvelines ?',
        a: 'Oui, directement dans vos locaux, sur une demi-journée de 4 h.',
      },
      {
        q: 'Sous quel délai peut-on organiser une session ?',
        a: 'On le cale ensemble au RDV découverte selon vos disponibilités.',
      },
    ],
    internalLinks: [
      {
        href: LINKS.formationMaitriserClaudeAiBtp,
        label: 'Maîtriser Claude AI pour le BTP',
        description: 'Projets, Skills, Cowork et Claude Code',
      },
      {
        href: LINKS.formationConducteurTravaux,
        label: 'Conducteur de travaux',
        description: 'CR, CCTP et suivi chantier',
      },
      {
        href: LINKS.formationIleDeFrance,
        label: 'Formation IA Île-de-France',
        description: '8 départements, intra et inter',
      },
    ],
  },
  '91': {
    deptCode: '91',
    departementNom: 'Essonne',
    intro:
      "Formation IA pour le BTP en présentiel en Essonne (91), intra ou inter. Le sud francilien mêle pôles d'innovation (plateau de Saclay) et zones pavillonnaires : la formation s'adapte aux deux réalités.",
    villesEtTrajets:
      "Évry-Courcouronnes (préfecture), Massy, Palaiseau, le plateau de Saclay, Longjumeau, Morangis, Corbeil-Essonnes. Depuis Guyancourt, le nord de l'Essonne (Massy, Saclay) est à une trentaine de minutes selon le trafic.",
    tissuBtpLocal:
      "L'Essonne porte des opérations d'envergure autour de Saclay et des grands axes, avec une part importante de marchés publics et de chantiers tertiaires, à côté d'un tissu pavillonnaire actif.",
    casUsage: [
      "Répondre plus vite et mieux aux appels d'offres publics (analyse DCE, mémoire technique structuré).",
      'Standardiser les dossiers de chantier (DOE, PV, situations) sur les opérations à enjeux.',
    ],
    faq: [
      {
        q: 'Intervenez-vous sur le plateau de Saclay et à Massy ?',
        a: 'Oui, en intra dans vos locaux, comme partout en Essonne.',
      },
      {
        q: 'La formation aide-t-elle vraiment sur les marchés publics ?',
        a: "Oui : analyse de DCE, structuration de mémoire technique et décision go/no-go — l'IA prépare, vos équipes valident.",
      },
      {
        q: 'Quel niveau choisir pour démarrer ?',
        a: 'Le niveau 1 pour les bases, le niveau 2 (appels d\'offres) si la priorité est la réponse aux marchés.',
      },
    ],
    internalLinks: [
      {
        href: LINKS.formationAO,
        label: "IA appliquée aux appels d'offres BTP",
        description: 'DCE, mémoire technique, marchés publics',
      },
      {
        href: LINKS.formationChargeAffairesBtp,
        label: "Chargé d'affaires BTP",
        description: 'Offres et chiffrage',
      },
      {
        href: LINKS.formationIleDeFrance,
        label: 'Formation IA Île-de-France',
        description: '8 départements, intra et inter',
      },
    ],
  },
  '92': {
    deptCode: '92',
    departementNom: 'Hauts-de-Seine',
    intro:
      "Formation IA pour le BTP en présentiel dans les Hauts-de-Seine (92), intra ou inter. Département de donneurs d'ordre et de tertiaire : la formation cible la productivité sur l'écrit contractuel et la conduite de travaux.",
    villesEtTrajets:
      "Nanterre (préfecture), La Défense, Boulogne-Billancourt, Courbevoie, Issy-les-Moulineaux, Clichy, Levallois-Perret. Depuis Guyancourt, Nanterre / La Défense sont à environ 40 minutes à une heure selon le trafic.",
    tissuBtpLocal:
      "Le 92 concentre sièges sociaux, opérations tertiaires et rénovation lourde, avec de nombreuses entreprises générales et maîtres d'œuvre intervenant sur des marchés exigeants et très formalisés.",
    casUsage: [
      "Traiter des appels d'offres tertiaires denses : extraire les exigences du CCTP, sécuriser la conformité de l'offre.",
      'Fiabiliser les comptes rendus et courriers de maîtrise d\'œuvre sur des chantiers à forte coordination.',
    ],
    faq: [
      {
        q: 'Faites-vous des sessions à La Défense ou Boulogne-Billancourt ?',
        a: 'Oui, en intra dans vos locaux, partout dans les Hauts-de-Seine.',
      },
      {
        q: 'La formation convient-elle à un maître d\'œuvre ?',
        a: 'Oui — un parcours dédié existe pour les MOE/MOEX (DCE, CR, OS, suivi des réserves).',
      },
      {
        q: 'Peut-on former une équipe tertiaire support (admin, com) ?',
        a: 'Oui, les fonctions support font partie des publics visés.',
      },
    ],
    internalLinks: [
      {
        href: LINKS.formationIaMaitriseOeuvre,
        label: "L'IA au service des maîtres d'œuvre",
        description: 'DCE, CR chantier, réserves',
      },
      {
        href: LINKS.formationAO,
        label: "IA appliquée aux appels d'offres BTP",
        description: 'Marchés tertiaires et mémoires',
      },
      {
        href: LINKS.formationIleDeFrance,
        label: 'Formation IA Île-de-France',
        description: '8 départements, intra et inter',
      },
    ],
  },
  '93': {
    deptCode: '93',
    departementNom: 'Seine-Saint-Denis',
    intro:
      "Formation IA pour le BTP en présentiel en Seine-Saint-Denis (93), intra ou inter. Territoire de grands chantiers et de marchés publics : la formation met l'accent sur la réponse aux marchés et la production documentaire de chantier.",
    villesEtTrajets:
      "Bobigny (préfecture), Saint-Denis, Montreuil, Aubervilliers, Pantin, Saint-Ouen, Aulnay-sous-Bois. Depuis Guyancourt, comptez environ une heure selon la destination et le trafic.",
    tissuBtpLocal:
      "Le 93 porte des opérations d'envergure (héritage des grands équipements, dynamique Grand Paris Express), avec une forte présence du gros œuvre, des travaux publics et des marchés publics structurants.",
    casUsage: [
      'Décortiquer un DCE de marché public volumineux et structurer une réponse complète en moins de temps.',
      "Générer les comptes rendus et rapports d'avancement de chantiers à forte cadence à partir de notes terrain.",
    ],
    faq: [
      {
        q: 'Vous déplacez-vous à Saint-Denis ou Montreuil ?',
        a: 'Oui, en intra dans vos locaux, partout en Seine-Saint-Denis.',
      },
      {
        q: 'La formation est-elle utile pour les marchés publics du Grand Paris ?',
        a: 'Oui : analyse de DCE/CCTP et structuration de mémoire technique sont au cœur du niveau 2.',
      },
      {
        q: 'Les sessions sont-elles adaptées aux équipes gros œuvre / TP ?',
        a: "Oui, les contenus s'appuient sur vos documents réels, quel que soit le corps d'état.",
      },
    ],
    internalLinks: [
      {
        href: LINKS.formationAO,
        label: "IA appliquée aux appels d'offres BTP",
        description: 'Marchés publics, DCE et mémoires',
      },
      {
        href: '/formation-ia-macon-btp',
        label: 'Formation IA maçon BTP',
        description: 'Gros œuvre et marchés structurants',
      },
      {
        href: LINKS.formationIleDeFrance,
        label: 'Formation IA Île-de-France',
        description: '8 départements, intra et inter',
      },
    ],
  },
  '94': {
    deptCode: '94',
    departementNom: 'Val-de-Marne',
    intro:
      "Formation IA pour le BTP en présentiel dans le Val-de-Marne (94), intra ou inter. Le sud-est francilien est traversé par les nouvelles lignes du Grand Paris Express : beaucoup d'opérations à coordonner.",
    villesEtTrajets:
      "Créteil (préfecture), Vitry-sur-Seine, Ivry-sur-Seine, Nogent-sur-Marne, Vincennes, Maisons-Alfort, Champigny-sur-Marne. Depuis Guyancourt, Créteil est à environ une heure selon le trafic.",
    tissuBtpLocal:
      "Le 94 mêle résidentiel dense, tertiaire et opérations liées aux infrastructures (extensions Grand Paris Express), avec un tissu actif de PME du bâtiment et de la conduite de travaux.",
    casUsage: [
      "Piloter le suivi de chantier avec l'IA : CR, suivi des observations, relances entreprises.",
      'Préparer la réception et le suivi des réserves de façon structurée et traçable.',
    ],
    faq: [
      {
        q: 'Intervenez-vous à Créteil et alentours ?',
        a: 'Oui, en intra dans vos locaux, partout dans le Val-de-Marne.',
      },
      {
        q: "La formation aide-t-elle un conducteur de travaux au quotidien ?",
        a: 'Oui — un parcours dédié couvre la conduite de travaux, du CCTP à la réception.',
      },
      {
        q: 'Faut-il des prérequis techniques ?',
        a: 'Non, les outils s\'utilisent en français courant ; on part de vos documents.',
      },
    ],
    internalLinks: [
      {
        href: LINKS.formationConduiteTravauxSuiviChantier,
        label: 'IA conduite de travaux & suivi chantier',
        description: 'CCTP, CR, réception',
      },
      {
        href: LINKS.formationConducteurTravaux,
        label: 'Conducteur de travaux',
        description: 'Suivi quotidien et réserves',
      },
      {
        href: LINKS.formationIleDeFrance,
        label: 'Formation IA Île-de-France',
        description: '8 départements, intra et inter',
      },
    ],
  },
  '95': {
    deptCode: '95',
    departementNom: "Val-d'Oise",
    intro:
      "Formation IA pour le BTP en présentiel dans le Val-d'Oise (95), intra ou inter. Entre Cergy-Pontoise et le pôle aéroportuaire de Roissy, le nord-ouest francilien a ses propres logiques de chantier et de logistique.",
    villesEtTrajets:
      "Cergy (préfecture), Pontoise, Argenteuil, Sarcelles, le secteur de Roissy, Goussainville. Depuis Guyancourt, Cergy-Pontoise est à environ 45 minutes à une heure selon le trafic.",
    tissuBtpLocal:
      "Le 95 associe un tissu de PME du bâtiment, des opérations résidentielles autour de Cergy-Pontoise et une forte composante logistique / aéroportuaire au nord, souvent synonyme de chantiers dispersés.",
    casUsage: [
      "Réduire le temps passé sur les devis et l'administratif pour les PME sans support dédié.",
      "Coordonner l'information de chantiers éloignés (Cergy ↔ Roissy) via des CR générés depuis des notes vocales.",
    ],
    faq: [
      {
        q: 'Vous déplacez-vous à Cergy-Pontoise ou vers Roissy ?',
        a: "Oui, en intra dans vos locaux, partout dans le Val-d'Oise.",
      },
      {
        q: 'Une PME sans service administratif peut-elle en tirer parti ?',
        a: "C'est précisément la cible : automatiser le récurrent pour libérer du temps bureau.",
      },
      {
        q: 'La formation est-elle finançable ?',
        a: 'Possible via Constructys ou votre OPCO, selon votre statut et les conditions en vigueur.',
      },
    ],
    internalLinks: [
      {
        href: LINKS.formationIaBtpNiveau1BatimentTp,
        label: "L'IA au service du bâtiment & TP",
        description: 'Programme NIV-01 — bases 4 h',
      },
      {
        href: LINKS.iaDevis,
        label: 'IA devis bâtiment',
        description: 'Devis et administratif PME',
      },
      {
        href: LINKS.formationIleDeFrance,
        label: 'Formation IA Île-de-France',
        description: '8 départements, intra et inter',
      },
    ],
  },
};

export const IDF_CHAPEAU_LOCAL = {
  intro:
    "Laure Olivié forme les équipes BTP à l'IA en présentiel dans toute l'Île-de-France — Paris (75), Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Val-d'Oise (95). Intra dans vos locaux ou inter en salle — présentiel uniquement · Île-de-France uniquement.",
  positionnement:
    "Basée à Guyancourt (78), au centre de la région, elle intervient sur l'ensemble du territoire francilien sur vos documents réels : devis, comptes rendus, DCE, mémoires techniques, administratif chantier — toujours avec validation métier de vos équipes.",
  faq: [
    {
      q: "Couvrez-vous toute l'Île-de-France ?",
      a: 'Oui, les 8 départements franciliens, en présentiel uniquement.',
    },
    {
      q: 'Faites-vous du distanciel ou des interventions en région ?',
      a: "Non : présentiel uniquement · Île-de-France uniquement.",
    },
    {
      q: 'Où êtes-vous basée ?',
      a: "À Guyancourt (78), ce qui permet d'intervenir rapidement sur l'ensemble de la région.",
    },
  ] satisfies FAQItem[],
  internalLinks: [
    { href: LINKS.formations, label: 'Catalogue formations', description: 'NIV-01 à NIV-05, Qualiopi' },
    { href: '/formation-ia', label: 'Hub formations par métier', description: 'Conducteur, dirigeant, corps d\'état…' },
    { href: LINKS.financement, label: 'Financement Constructys', description: 'OPCO, dossier et convention' },
  ] as [DeptInternalLink, DeptInternalLink, DeptInternalLink],
  departements: [
    { href: LINKS.formationIaBtpParis, label: '75 Paris' },
    { href: LINKS.formationIaBtpSeineEtMarne77, label: '77 Seine-et-Marne' },
    { href: LINKS.formationIaBtpYvelines78, label: '78 Yvelines' },
    { href: LINKS.formationIaBtpEssonne91, label: '91 Essonne' },
    { href: LINKS.formationIaBtpHautsDeSeine92, label: '92 Hauts-de-Seine' },
    { href: LINKS.formationIaBtpSeineSaintDenis93, label: '93 Seine-Saint-Denis' },
    { href: LINKS.formationIaBtpValDeMarne94, label: '94 Val-de-Marne' },
    { href: LINKS.formationIaBtpValDoise95, label: "95 Val-d'Oise" },
  ],
};

export function getDeptLocalSeoContent(deptCode: string): DeptLocalSeoContent | undefined {
  return DEPT_LOCAL_SEO_CONTENT[deptCode];
}
