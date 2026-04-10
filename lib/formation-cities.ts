/**
 * Configuration des pages formation IA BTP par ville
 * Cluster SEO local : Lyon, Bordeaux, Lille
 */

export interface ZoneIntervention {
  num: string;
  nom: string;
  contenu: string;
}

export interface CityFormationConfig {
  ville: string;
  path: string;
  zones: ZoneIntervention[];
  departements: string[];
  regionLabel: string;
  areaServed: string[];
  /** Remplace la ligne au-dessus du H1 (SEO / cohérence locale) */
  customHeroRefLine?: string;
  /** H1 complet — si absent, titre générique « Formation IA … à {ville} » */
  customHeroTitle?: string;
  /** Sous-titre sous le H1 */
  customHeroSubtitle?: string;
  /** Paragraphes d’intro hero (remplacent le texte par défaut) */
  customHeroIntro?: string[];
  /** Badges sous l’intro (sinon valeurs par défaut du composant) */
  heroBadges?: string[];
}

export const FORMATION_CITIES: Record<string, CityFormationConfig> = {
  lyon: {
    ville: 'Lyon',
    path: '/formations/ia-btp-lyon',
    regionLabel: 'Auvergne-Rhône-Alpes',
    zones: [
      { num: '69', nom: 'Lyon', contenu: 'Tous arrondissements • Sessions en présentiel • Métropole de Lyon' },
      { num: '69', nom: 'Villeurbanne', contenu: 'Deuxième ville de la métropole • Formation intra-entreprise' },
      { num: '69', nom: 'Vénissieux', contenu: 'Artisans et PME du bâtiment • Devis, appels d\'offres, administratif' },
      { num: '69', nom: 'Saint-Priest', contenu: 'Formations sur mesure • Financement Constructys 100%' },
      { num: '69', nom: 'Bron', contenu: 'Intervention dans vos locaux ou en salle' },
      { num: '69', nom: 'Vaulx-en-Velin', contenu: 'Sessions adaptées aux entreprises du BTP' },
      { num: '69', nom: 'Caluire-et-Cuire', contenu: 'Formation IA générative • ChatGPT pour le bâtiment' },
    ],
    departements: ['Rhône (69)', 'Ain (01)', 'Isère (38)', 'Loire (42)'],
    areaServed: ['Lyon', 'Auvergne-Rhône-Alpes', 'Rhône', 'Ain', 'Isère', 'Loire'],
  },
  bordeaux: {
    ville: 'Bordeaux',
    path: '/formations/ia-btp-bordeaux',
    regionLabel: 'Nouvelle-Aquitaine',
    zones: [
      { num: '33', nom: 'Bordeaux', contenu: 'Tous quartiers • Sessions en présentiel • Métropole bordelaise' },
      { num: '33', nom: 'Mérignac', contenu: 'Deuxième ville de l\'agglomération • Formation intra-entreprise' },
      { num: '33', nom: 'Pessac', contenu: 'Artisans et PME du bâtiment • Automatisation devis et emails' },
      { num: '33', nom: 'Talence', contenu: 'Formations sur mesure • Financement OPCO Constructys' },
      { num: '33', nom: 'Bègles', contenu: 'Intervention dans vos locaux ou en salle' },
      { num: '33', nom: 'Bruges', contenu: 'ChatGPT pour les entreprises du BTP' },
      { num: '33', nom: 'Le Bouscat', contenu: 'Formation IA générative • Gestion administrative BTP' },
    ],
    departements: ['Gironde (33)', 'Charente (16)', 'Dordogne (24)', 'Landes (40)'],
    areaServed: ['Bordeaux', 'Nouvelle-Aquitaine', 'Gironde', 'Charente', 'Dordogne', 'Landes'],
  },
  lille: {
    ville: 'Lille',
    path: '/formations/ia-btp-lille',
    regionLabel: 'Hauts-de-France',
    zones: [
      { num: '59', nom: 'Lille', contenu: 'Métropole Lilloise • Sessions en présentiel' },
      { num: '59', nom: 'Roubaix', contenu: 'Formation intra-entreprise • Devis et appels d\'offres avec l\'IA' },
      { num: '59', nom: 'Tourcoing', contenu: 'Artisans et PME du bâtiment • Automatisation administrative' },
      { num: '59', nom: 'Villeneuve-d\'Ascq', contenu: 'Formations sur mesure • Financement Constructys 100%' },
      { num: '59', nom: 'Marcq-en-Barœul', contenu: 'Intervention dans vos locaux ou en salle' },
      { num: '59', nom: 'Wasquehal', contenu: 'ChatGPT pour les entreprises du BTP' },
      { num: '59', nom: 'Armentières', contenu: 'Formation IA générative • Gains de temps garantis' },
    ],
    departements: ['Nord (59)', 'Pas-de-Calais (62)', 'Somme (80)'],
    areaServed: ['Lille', 'Hauts-de-France', 'Nord', 'Pas-de-Calais', 'Somme'],
  },
};

export const ILE_DE_FRANCE = {
  ville: 'Île-de-France',
  path: '/formations/ia-btp-ile-de-france',
  regionLabel: 'Yvelines',
  customHeroRefLine: 'OFC Création d’Entreprise · Île-de-France · Présentiel · Qualiopi',
  customHeroTitle:
    'Formation IA BTP en Île-de-France : gagnez du temps sur vos chantiers et vos dossiers',
  customHeroSubtitle:
    'Devis, emails, appels d’offres et organisation chantier — méthode terrain, sans jargon inutile',
  customHeroIntro: [
    'Vous perdez encore du temps sur vos devis, vos emails clients, vos mémoires techniques ou l’organisation de chantier ? L’intelligence artificielle permet aujourd’hui aux entreprises du BTP de gagner plusieurs heures par semaine sur l’administratif et les dossiers — à condition de savoir l’utiliser concrètement, sur des cas réels.',
    'Les sessions sont animées en présentiel : inter en Île-de-France ou intra dans vos locaux. Objectif : repartir avec des prompts, trames et habitudes directement utilisables au bureau comme sur le terrain.',
  ],
  heroBadges: [
    'Présentiel inter & intra IDF',
    'Cas réels BTP',
    'Qualiopi · OPCO Constructys',
  ],
  zones: [
    { num: '78', nom: 'Yvelines', contenu: 'Guyancourt, Versailles, Saint-Quentin • Siège basé à Guyancourt' },
    { num: '75', nom: 'Paris', contenu: 'Tous arrondissements • Sessions en présentiel' },
    { num: '92', nom: 'Hauts-de-Seine', contenu: 'Nanterre, Boulogne, Courbevoie, Levallois, Issy' },
    { num: '93', nom: 'Seine-Saint-Denis', contenu: 'Bobigny, Saint-Denis, Montreuil, Aubervilliers' },
    { num: '94', nom: 'Val-de-Marne', contenu: 'Créteil, Vitry, Champigny, Saint-Maur' },
    { num: '77', nom: 'Seine-et-Marne', contenu: 'Meaux, Chelles, Melun, Pontault-Combault' },
    { num: '91', nom: 'Essonne', contenu: 'Évry, Corbeil, Massy, Palaiseau' },
    { num: '95', nom: "Val-d'Oise", contenu: 'Argenteuil, Sarcelles, Cergy, Pontoise' },
  ],
  departements: ['Yvelines (78)', 'Paris (75)', 'Hauts-de-Seine (92)', 'Seine-Saint-Denis (93)', 'Val-de-Marne (94)', 'Seine-et-Marne (77)', 'Essonne (91)', "Val-d'Oise (95)"],
  areaServed: ['Île-de-France', 'Guyancourt', 'Yvelines', 'Paris', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne', 'Seine-et-Marne', 'Essonne', "Val-d'Oise"],
};

export const LYON = FORMATION_CITIES.lyon;
export const BORDEAUX = FORMATION_CITIES.bordeaux;
export const LILLE = FORMATION_CITIES.lille;
