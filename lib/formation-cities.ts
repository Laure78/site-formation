/**
 * Configuration des pages formation IA BTP par ville (Île-de-France).
 * Pages hors IDF (Lyon, Bordeaux, Lille) retirées — redirection 301 vers /formation-ia-btp-ile-de-france.
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
  morangis: {
    ville: 'Morangis',
    path: '/formations/ia-btp-morangis',
    regionLabel: 'Essonne (91)',
    customHeroRefLine: 'Essonne (91) · Île-de-France · Présentiel · Qualiopi',
    customHeroIntro: [
      'Morangis et le bassin de la vallée de l’Orge concentrent des professionnels du BTP, des PME du second œuvre et des activités de services au bâtiment : la même pression sur les délais que partout ailleurs en Île-de-France — avec l’avantage d’être à proximité des zones d’emploi de Massy, Saclay et des axes vers Paris.',
      'La formation repose sur vos documents réels (devis, emails, extraits de dossiers) et le financement OPCO Constructys dans les conditions habituelles pour les entreprises du BTP.',
    ],
    zones: [
      { num: '91', nom: 'Morangis', contenu: 'Entreprises du bâtiment et périphérie immédiate • intra possible sur site' },
      { num: '91', nom: 'Les Ulis', contenu: 'Ville nouvelle voisine • sessions inter ou regroupement d’équipes' },
      { num: '91', nom: 'Longjumeau', contenu: 'TPE et PME du bâtiment — déplacements courts depuis Guyancourt (78)' },
      { num: '91', nom: 'Massy', contenu: 'Pôle tertiaire et entreprises locales • créneaux adaptés aux agendas chargés' },
      { num: '91', nom: 'Savigny-sur-Orge', contenu: 'Second œuvre et rénovation • même programme catalogue Qualiopi' },
    ],
    departements: ['Essonne (91)', 'Hauts-de-Seine (92)', "Val-de-Marne (94)"],
    areaServed: ['Morangis', 'Essonne', 'Les Ulis', 'Longjumeau', 'Massy', 'Île-de-France'],
  },
  longjumeau: {
    ville: 'Longjumeau',
    path: '/formations/ia-btp-longjumeau',
    regionLabel: 'Essonne (91)',
    customHeroRefLine: 'Essonne (91) · Île-de-France · Présentiel · Qualiopi',
    customHeroIntro: [
      'Longjumeau relie le sud de l’agglomération parisienne aux bassins d’emploi de l’Essonne : entreprises du gros œuvre, second œuvre et fonctions support qui enchaînent chantier, devis et dossiers administratifs.',
      'Objectif de la session : gagner plusieurs heures par semaine sur la rédaction et la structuration — sans remplacer votre expertise métier — avec des prompts et trames réutilisables le lendemain.',
    ],
    zones: [
      { num: '91', nom: 'Longjumeau', contenu: 'Centre-ville et zones d’activités • formation intra en entreprise' },
      { num: '91', nom: 'Morangis', contenu: 'Zone industrielle et artisans • regroupement d’équipes possible' },
      { num: '91', nom: 'Les Ulis', contenu: 'Voisinage direct • inter selon calendrier' },
      { num: '91', nom: 'Montlhéry', contenu: 'Professionnels du BTP et PME sur la RD20 / accès A6' },
      { num: '91', nom: 'Yerres', contenu: 'Entreprises locales et sous-traitants BTP' },
    ],
    departements: ['Essonne (91)', 'Hauts-de-Seine (92)', "Val-de-Marne (94)"],
    areaServed: ['Longjumeau', 'Essonne', 'Morangis', 'Les Ulis', 'Montlhéry', 'Île-de-France'],
  },
};

export const ILE_DE_FRANCE = {
  ville: 'Île-de-France',
  path: '/formation-ia-btp-ile-de-france',
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

export const MORANGIS = FORMATION_CITIES.morangis;
export const LONGJUMEAU = FORMATION_CITIES.longjumeau;
