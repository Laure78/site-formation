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

/**
 * Lots / métiers — alignés sur les URLs demandées (sans préfixe formation-ia-).
 * Neuf slugs retirés en avril 2026 (nettoyage SEO : doublons sémantiques avec les pages métiers
 * dédiées /formation-ia-*-btp). Les 301 hub → landing restent dans gscHubMergeRedirects.
 */
export const FORMATION_IA_METIERS: FormationIaRawMetier[] = [
  { slug: 'chauffage-climatisation-cvc', label: 'chauffage, ventilation, climatisation (CVC)', categorie: 'Lots techniques — CVC / fluides', exemple: 'Un installateur CVC utilise Claude AI pour des synthèses de notices techniques et ChatGPT pour les courriers de mise en demeure ou de relance.' },
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

/**
 * Villes hub `/formation-ia/btp-*` — liste vide depuis juil. 2026.
 * Paris / SQY / préfectures redirigées vers pages département ou fiche ville (cf. next.config.ts).
 * Maillage géo canonique : `FORMATION_IA_GEO_CANONICAL` dans `seo-formation-ia-hub-links.ts`.
 */
export const FORMATION_IA_VILLES: FormationIaRawVille[] = [];

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
