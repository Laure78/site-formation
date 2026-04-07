/**
 * Hub SEO local IDF : pages /formation-ia/[slug]
 * Métiers (lots) + villes — mots-clés formation IA, ChatGPT, Claude AI, BTP
 */

export type FormationIaKind = 'metier' | 'ville';

export interface FormationIaRawMetier {
  slug: string;
  label: string;
  categorie: string;
  /** Exemple concret ChatGPT / Claude — une phrase unique */
  exemple: string;
}

export interface FormationIaRawVille {
  slug: string;
  label: string;
  dept: string;
  deptName: string;
}

/** Lots / métiers — alignés sur les URLs demandées (sans préfixe formation-ia-) */
export const FORMATION_IA_METIERS: FormationIaRawMetier[] = [
  { slug: 'maconnerie-gros-oeuvre', label: 'maçonnerie et gros œuvre', categorie: 'Gros œuvre / structure', exemple: 'Un chef de chantier maçonnerie structure avec ChatGPT un compte rendu de réunion lot GO ; avec Claude AI une synthèse de CCTP pour préparer la réponse technique.' },
  { slug: 'etancheite', label: 'étanchéité et étanchéité toiture-terrasse', categorie: 'Second œuvre — enveloppe', exemple: 'Un étancheur formalise les PPSPS et les consignes de sécurité avec des modèles générés par Claude AI, puis relit les courriers assurance avec ChatGPT.' },
  { slug: 'couverture-zinguerie', label: 'couverture et zinguerie', categorie: 'Second œuvre — enveloppe', exemple: 'Un couvreur utilise ChatGPT pour structurer ses devis détaillés ; Claude AI pour comparer deux variantes de descriptif de lame ou de sous-toiture.' },
  { slug: 'peinture-batiment', label: 'peinture et revêtements muraux', categorie: 'Second œuvre — aménagements intérieurs', exemple: 'Un peintre en bâtiment gagne du temps sur les devis multi-pièces et les métrés narratifs grâce à ChatGPT et Claude AI pour les variantes matériaux.' },
  { slug: 'carrelage-faience', label: 'carrelage et faïence', categorie: 'Second œuvre — aménagements intérieurs', exemple: 'Un carreleur prépare des descriptifs de pose et de joints pour les marchés publics avec Claude AI, et relit les emails chantier avec ChatGPT.' },
  { slug: 'electricite', label: 'électricité courants forts et faibles', categorie: 'Lots techniques — électricité', exemple: 'Un électricien accélère les mémoires techniques et les tableaux de synthèse DCE avec Claude AI ; ChatGPT pour les réponses aux demandes d\'information.' },
  { slug: 'plomberie-sanitaire', label: 'plomberie et sanitaire', categorie: 'Lots techniques — CVC / fluides', exemple: 'Un plombier chauffagiste structure les devis et les pièces écrites pour les réseaux avec ChatGPT ; Claude AI pour les synthèses de réunions de coordination.' },
  { slug: 'chauffage-climatisation-cvc', label: 'chauffage, ventilation, climatisation (CVC)', categorie: 'Lots techniques — CVC / fluides', exemple: 'Un installateur CVC utilise Claude AI pour des synthèses de notices techniques et ChatGPT pour les courriers de mise en demeure ou de relance.' },
  { slug: 'menuiserie', label: 'menuiseries intérieures et extérieures', categorie: 'Second œuvre', exemple: 'Un menuisier prépare des variantes de devis bois / PVC / alu et des emails clients avec ChatGPT et Claude AI pour les textes longs.' },
  { slug: 'charpente', label: 'charpente bois et métallique', categorie: 'Gros œuvre / structure', exemple: 'Un charpentier formalise les méthodes et les notes de calcul narratives pour les dossiers avec l\'aide de Claude AI et de ChatGPT.' },
  { slug: 'metallerie-serrurerie', label: 'métallerie et serrurerie', categorie: 'Second œuvre', exemple: 'Un métallier produit des descriptifs de portes techniques et d\'ouvrages sur mesure avec ChatGPT en itérant sur les versions avec Claude AI.' },
  { slug: 'platrerie-cloisons-faux-plafonds', label: 'plâtrerie, cloisons et faux plafonds', categorie: 'Second œuvre — aménagements intérieurs', exemple: 'Un plaquiste accélère les métrés narratifs et les devis par niveau avec ChatGPT ; Claude AI pour les synthèses de réunions de coordination.' },
  { slug: 'sols-souples-parquet', label: 'sols souples, parquet et stratifiés', categorie: 'Second œuvre — aménagements intérieurs', exemple: 'Un poseur de sols génère des devis par pièce et des listes de variantes avec ChatGPT et Claude AI pour les comparatifs.' },
  { slug: 'ravalement-facade-ite', label: 'ravalement de façade et ITE', categorie: 'Second œuvre — enveloppe', exemple: 'Une entreprise de ravalement utilise Claude AI pour des synthèses de diagnostics et ChatGPT pour les courriers aux copropriétés.' },
  { slug: 'renovation-interieure', label: 'rénovation intérieure', categorie: 'Rénovation', exemple: 'Un coordinateur de rénovation structure les plannings narratifs et les comptes rendus avec ChatGPT et Claude AI.' },
  { slug: 'entreprise-generale-batiment', label: 'entreprise générale et TCE', categorie: 'Rénovation / organisation', exemple: 'Un dirigeant TCE utilise Claude AI pour les synthèses multi-lots et ChatGPT pour les relances clients et fournisseurs.' },
  { slug: 'vrd-pavage', label: 'VRD, réseaux et pavage', categorie: 'VRD / espaces extérieurs', exemple: 'Une équipe VRD accélère les comptes rendus de récolement et les courriers réseaux avec ChatGPT ; Claude AI pour les synthèses de dossiers techniques.' },
  { slug: 'demolition-desamiantage', label: 'démolition et désamiantage', categorie: 'Gros œuvre', exemple: 'Un responsable désamiantage formalise les procédures et les rapports avec Claude AI et relit les courriers réglementaires avec ChatGPT.' },
  { slug: 'ascenseurs-monte-charges', label: 'ascenseurs et monte-charges', categorie: 'Lots spéciaux', exemple: 'Un monteur utilise ChatGPT pour les comptes rendus d\'intervention et Claude AI pour les synthèses de réunions avec le maître d\'ouvrage.' },
  { slug: 'securite-incendie-ssi', label: 'sécurité incendie et SSI', categorie: 'Lots techniques — électricité', exemple: 'Un installateur SSI structure les mémoires techniques et les tableaux de conformité avec Claude AI et ChatGPT.' },
  { slug: 'photovoltaique-irve', label: 'photovoltaïque et bornes IRVE', categorie: 'Lots techniques — électricité', exemple: 'Un électricien PV utilise Claude AI pour les synthèses de dimensionnement et ChatGPT pour les devis et emails clients.' },
  { slug: 'travaux-publics-genie-civil', label: 'travaux publics et génie civil', categorie: 'Travaux publics', exemple: 'Un conducteur de travaux TP utilise ChatGPT pour les comptes rendus de chantier et Claude AI pour les synthèses de DCE et de CCTP.' },
  { slug: 'renovation-energetique', label: 'rénovation énergétique et performance', categorie: 'Rénovation', exemple: 'Un coordinateur réno énergétique utilise Claude AI pour les synthèses d\'audits et ChatGPT pour les devis et courriers aides à la vente.' },
  { slug: 'espaces-verts-paysagisme', label: 'espaces verts et paysagisme', categorie: 'VRD / espaces extérieurs', exemple: 'Un paysagiste génère des devis par massif et des descriptions d\'entretien avec ChatGPT ; Claude AI pour les mémoires techniques paysagers.' },
  { slug: 'domotique-gtb', label: 'domotique et GTB/GTC', categorie: 'Lots techniques — électricité', exemple: 'Un intégrateur domotique utilise Claude AI pour les synthèses de schémas fonctionnels et ChatGPT pour les réponses aux consultations.' },
  { slug: 'bardage-facades', label: 'bardage et façades', categorie: 'Second œuvre — enveloppe', exemple: 'Une équipe bardage utilise ChatGPT pour les descriptifs de lames et sous-couches et Claude AI pour les comparatifs fournisseurs.' },
  { slug: 'terrassement', label: 'terrassement et mouvement de terres', categorie: 'Travaux publics / gros œuvre', exemple: 'Un conducteur de terrassement formalise les rapports journaliers et les synthèses de réunions avec ChatGPT et Claude AI.' },
  { slug: 'beton-fondations', label: 'béton armé et fondations', categorie: 'Gros œuvre / structure', exemple: 'Un chef de projet béton utilise Claude AI pour les synthèses de plans de phasage et ChatGPT pour les courriers de coordination.' },
];

/** Villes IDF — slug préfixé btp- pour distinguer des métiers */
export const FORMATION_IA_VILLES: FormationIaRawVille[] = [
  { slug: 'btp-paris', label: 'Paris', dept: '75', deptName: 'Paris' },
  { slug: 'btp-versailles', label: 'Versailles', dept: '78', deptName: 'Yvelines' },
  { slug: 'btp-creteil', label: 'Créteil', dept: '94', deptName: 'Val-de-Marne' },
  { slug: 'btp-nanterre', label: 'Nanterre', dept: '92', deptName: 'Hauts-de-Seine' },
  { slug: 'btp-saint-denis', label: 'Saint-Denis', dept: '93', deptName: 'Seine-Saint-Denis' },
  { slug: 'btp-boulogne-billancourt', label: 'Boulogne-Billancourt', dept: '92', deptName: 'Hauts-de-Seine' },
  { slug: 'btp-montreuil', label: 'Montreuil', dept: '93', deptName: 'Seine-Saint-Denis' },
  { slug: 'btp-argenteuil', label: 'Argenteuil', dept: '95', deptName: "Val-d'Oise" },
  { slug: 'btp-evry-courcouronnes', label: 'Évry-Courcouronnes', dept: '91', deptName: 'Essonne' },
  { slug: 'btp-cergy-pontoise', label: 'Cergy-Pontoise', dept: '95', deptName: "Val-d'Oise" },
  { slug: 'btp-melun', label: 'Melun', dept: '77', deptName: 'Seine-et-Marne' },
  { slug: 'btp-pantin', label: 'Pantin', dept: '93', deptName: 'Seine-Saint-Denis' },
  { slug: 'btp-meaux', label: 'Meaux', dept: '77', deptName: 'Seine-et-Marne' },
  { slug: 'btp-chelles', label: 'Chelles', dept: '77', deptName: 'Seine-et-Marne' },
  { slug: 'btp-massy', label: 'Massy', dept: '91', deptName: 'Essonne' },
  { slug: 'btp-colombes', label: 'Colombes', dept: '92', deptName: 'Hauts-de-Seine' },
  { slug: 'btp-courbevoie-la-defense', label: 'Courbevoie et La Défense', dept: '92', deptName: 'Hauts-de-Seine' },
  { slug: 'btp-aubervilliers', label: 'Aubervilliers', dept: '93', deptName: 'Seine-Saint-Denis' },
  { slug: 'btp-vitry-sur-seine', label: 'Vitry-sur-Seine', dept: '94', deptName: 'Val-de-Marne' },
  { slug: 'btp-champigny-sur-marne', label: 'Champigny-sur-Marne', dept: '94', deptName: 'Val-de-Marne' },
  { slug: 'btp-saint-maur-des-fosses', label: 'Saint-Maur-des-Fossés', dept: '94', deptName: 'Val-de-Marne' },
  { slug: 'btp-aulnay-sous-bois', label: 'Aulnay-sous-Bois', dept: '93', deptName: 'Seine-Saint-Denis' },
  { slug: 'btp-issy-les-moulineaux', label: 'Issy-les-Moulineaux', dept: '92', deptName: 'Hauts-de-Seine' },
  { slug: 'btp-noisy-le-grand', label: 'Noisy-le-Grand', dept: '93', deptName: 'Seine-Saint-Denis' },
  { slug: 'btp-pontault-combault', label: 'Pontault-Combault', dept: '77', deptName: 'Seine-et-Marne' },
  { slug: 'btp-savigny-le-temple', label: 'Savigny-le-Temple', dept: '77', deptName: 'Seine-et-Marne' },
  { slug: 'btp-saint-quentin-en-yvelines', label: 'Saint-Quentin-en-Yvelines', dept: '78', deptName: 'Yvelines' },
  { slug: 'btp-palaiseau', label: 'Palaiseau', dept: '91', deptName: 'Essonne' },
  { slug: 'btp-longjumeau', label: 'Longjumeau', dept: '91', deptName: 'Essonne' },
  { slug: 'btp-villiers-le-bel', label: 'Villiers-le-Bel', dept: '95', deptName: "Val-d'Oise" },
  { slug: 'btp-poissy', label: 'Poissy', dept: '78', deptName: 'Yvelines' },
  { slug: 'btp-mantes-la-jolie', label: 'Mantes-la-Jolie', dept: '78', deptName: 'Yvelines' },
  { slug: 'btp-sarcelles', label: 'Sarcelles', dept: '95', deptName: "Val-d'Oise" },
];

export const FORMATION_IA_ALL_SLUGS = [
  ...FORMATION_IA_METIERS.map((m) => m.slug),
  ...FORMATION_IA_VILLES.map((v) => v.slug),
];

export function getFormationIaEntry(slug: string): { kind: FormationIaKind; metier?: FormationIaRawMetier; ville?: FormationIaRawVille } | null {
  const metier = FORMATION_IA_METIERS.find((m) => m.slug === slug);
  if (metier) return { kind: 'metier', metier };
  const ville = FORMATION_IA_VILLES.find((v) => v.slug === slug);
  if (ville) return { kind: 'ville', ville };
  return null;
}
