import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';

export type DeptLocalSeoContent = {
  deptCode: string;
  departementNom: string;
  intro: string;
  villesEtTrajets: string;
  tissuEtUsages: string;
  faq: FAQItem[];
  metierLink: { href: string; label: string; description: string };
};

function faqDeptLocal(
  nom: string,
  code: string,
  deplacement: string,
  intraGuyancourt: string,
  constructys: string,
): FAQItem[] {
  return [
    { q: `Vous vous déplacez dans tout le ${nom} (${code}) depuis Guyancourt ?`, a: deplacement },
    {
      q: `Peut-on organiser une session intra dans vos locaux à Guyancourt (78) pour une équipe du ${code} ?`,
      a: intraGuyancourt,
    },
    {
      q: `Le financement Constructys est-il ouvert aux entreprises du ${code} ?`,
      a: constructys,
    },
  ];
}

/** Contenus locaux uniques — 250 à 400 mots par département (hors FAQ). */
export const DEPT_LOCAL_SEO_CONTENT: Record<string, DeptLocalSeoContent> = {
  '75': {
    deptCode: '75',
    departementNom: 'Paris',
    intro:
      'Formation IA BTP à Paris (75) — présentiel intra/inter, depuis Guyancourt (78). OFC Création d\'Entreprise intervient dans tous les arrondissements : session réservée à votre entreprise dans vos locaux parisiens, ou inter en salle francilienne selon le calendrier. Organisme certifié Qualiopi, 4 h pratiques sur vos devis, CCTP et courriers chantier.',
    villesEtTrajets:
      'Les bassins les plus demandés : Paris 11e–12e (Bastille, Nation), Paris 15e–16e (Beaugrenelle, Trocadéro) et Paris 13e–14e (Montparnasse, Olympiades). Depuis Guyancourt, comptez environ 35 à 50 min en RER ou voiture selon l\'arrondissement et l\'heure de pointe. Pour une intra dans vos bureaux parisiens, nous cadrons l\'accès, le Wi-Fi et le nombre de postes lors de la visio découverte gratuite.',
    tissuEtUsages:
      'À Paris, le tissu BTP mêle PME de second œuvre, entreprises de rénovation en site occupé et lots techniques pour marchés tertiaires. Les maîtres d\'œuvre et conducteurs y jonglent entre délais MOA serrés et documentation lourde (mémoires, CR, réserves). En formation, deux usages IA reviennent souvent : structurer un compte rendu de réunion de chantier à partir de notes dictées, puis relire avant envoi MOE ; et accélérer la lecture d\'extraits de CCTP pour lister les points de vigilance avant chiffrage — toujours avec validation humaine avant tout envoi client ou marché.',
    faq: faqDeptLocal(
      'Paris',
      '75',
      'Oui. Intra dans vos locaux parisiens (tous arrondissements) ou inter en salle en Île-de-France. Départ Guyancourt (78) : 35 à 50 min vers le centre et l\'est parisien, parfois un peu plus vers le nord-est aux heures de pointe. Déplacement et repas précisés au devis avant convention.',
      'Oui, pour les équipes parisiennes qui préfèrent se regrouper hors de leurs bureaux de chantier : salle à Guyancourt (78), à 5 min de la gare, avec vidéoprojecteur et connexion stable. Idéal pour 4 à 8 participants du 75 qui veulent une matinée dédiée sans gêner l\'open space.',
      'Les règles Constructys sont nationales : une entreprise immatriculée à Paris (75) ou intervenant sur des chantiers parisiens peut être éligible selon son effectif et ses cotisations. Nous fournissons programme Qualiopi, convention et pièces pédagogiques pour votre dossier OPCO.',
    ),
    metierLink: {
      href: LINKS.formationConducteurTravaux,
      label: 'Conducteur de travaux',
      description: 'CR chantier, DCE et suivi — cas terrain parisiens',
    },
  },
  '77': {
    deptCode: '77',
    departementNom: 'Seine-et-Marne',
    intro:
      'Formation IA BTP en Seine-et-Marne (77) — présentiel intra/inter, depuis Guyancourt (78). Le département le plus vaste d\'Île-de-France concentre logements collectifs, équipements publics et zones logistiques : nos sessions 4 h s\'adaptent à vos documents réels (AO, CCTP, CR), en intra chez vous ou en salle selon calendrier.',
    villesEtTrajets:
      'Melun, Meaux et la Marne-la-Vallée (Bussy-Saint-Georges, Champs-sur-Marne) sont les pôles les plus sollicités. Depuis Guyancourt : environ 25 à 40 min vers l\'ouest du 77 (Sénart, Melun, Bussy) ; vers l\'est (Provins, Coulommiers, Fontainebleau), plutôt 50 à 70 min — nous privilégions alors une journée bloquée ou deux demi-journées. Chelles et Pontault-Combault restent accessibles en moins de 45 min.',
    tissuEtUsages:
      'En Seine-et-Marne, PME de gros œuvre, second œuvre et TP alimentent neuf, rénovation et marchés publics intercommunaux (Melun Val de Seine, Grand Paris Sud). Les géomètres-métreurs et chargés d\'affaires y traitent des DCE volumineux sur des opérations en plusieurs tranches. Usages IA typiques : extraire d\'un règlement de consultation les dates clés et pièces manquantes pour un GO/NO GO rapide ; et transformer des photos de CR MOE en tableau d\'actions avec échéances — relecture obligatoire par le conducteur avant diffusion interne.',
    faq: faqDeptLocal(
      'Seine-et-Marne',
      '77',
      'Oui, sur tout le 77. L\'ouest (Marne-la-Vallée, Sénart, Melun, Meaux) est couvert en 30 à 45 min depuis Guyancourt. L\'est du département mobilise plutôt une journée entière : nous le précisons au devis pour éviter les allers-retours inutiles.',
      'Oui. Nos locaux à Guyancourt accueillent les équipes du 77 qui souhaitent une matinée hors chantier : 4 h, 8 participants max, postes pour exercices sur vos PDF. Pratique pour les entreprises basées à Meaux ou Melun qui veulent centraliser direction, BE et conducteurs.',
      'Constructys finance selon les règles nationales, pas selon le département. Une PME du 77 adhérente à l\'OPCO bâtiment peut monter un dossier avec notre programme Qualiopi NIV-01 ou NIV-02 : devis, convention et attestations fournis.',
    ),
    metierLink: {
      href: LINKS.formationConducteurTravaux,
      label: 'Conducteur de travaux',
      description: 'Suivi chantier, CR et réserves en Seine-et-Marne',
    },
  },
  '78': {
    deptCode: '78',
    departementNom: 'Yvelines',
    intro:
      'Formation IA BTP en Yvelines (78) — présentiel intra/inter, depuis Guyancourt (78). C\'est notre département d\'ancrage : OFC Création d\'Entreprise y est implantée à Guyancourt, au cœur de Saint-Quentin-en-Yvelines. Sessions intra dans vos locaux (Versailles, Mantes, Poissy…) ou inter en salle à proximité immédiate.',
    villesEtTrajets:
      'Versailles, Saint-Quentin-en-Yvelines (Guyancourt, Montigny-le-Bretonneux), Mantes-la-Jolie et Poissy structurent la demande. Trajet indicatif depuis notre siège : 10 à 20 min vers SQY et Versailles sud, 25 à 35 min vers Poissy ou Rambouillet, 40 à 50 min vers Mantes sur la vallée de la Seine. Les entreprises du 78 bénéficient de la logistique la plus courte de notre zone d\'intervention.',
    tissuEtUsages:
      'Les Yvelines réunissent PME de rénovation haut de gamme autour de Versailles, entreprises de réseaux en zones d\'activités de SQY et acteurs du TP sur le corridor Mantes–Poissy. Corps d\'état dominants : électricité, plomberie-CVC, second œuvre et gros œuvre sur marchés publics et privés. En session, on travaille souvent : la mise en forme de devis à partir de métrés Excel et notes terrain ; et la synthèse hebdomadaire de plusieurs CR chantier en un mail structuré pour le MOA — sans jamais envoyer un document IA sans relecture du chef de chantier.',
    faq: faqDeptLocal(
      'Yvelines',
      '78',
      'Oui, tout le département. Guyancourt est au centre du 78 : la plupart des intra se font en moins de 40 min de route. Aucun surcoût caché : déplacement et repas sont indiqués sur le devis avant signature.',
      'Oui — c\'est même notre configuration la plus fluide. Salle de formation à Guyancourt, à deux pas du siège : idéal pour les équipes des Yvelines qui veulent une matinée 9h–13h sans perdre une demi-journée en route.',
      'Les entreprises des Yvelines (78) suivent les mêmes barèmes Constructys que le reste de la France. Avec notre certification Qualiopi, vous recevez les éléments pour constituer le dossier OPCO : programme, objectifs, durée 4 h, évaluation.',
    ),
    metierLink: {
      href: LINKS.formationConducteurTravaux,
      label: 'Conducteur de travaux',
      description: 'Méthode IA chantier — bassin Guyancourt / SQY',
    },
  },
  '91': {
    deptCode: '91',
    departementNom: 'Essonne',
    intro:
      'Formation IA BTP en Essonne (91) — présentiel intra/inter, depuis Guyancourt (78). Entre Massy, Évry-Courcouronnes et Corbeil, les PME du bâtiment cherchent à gagner du temps sur l\'administratif sans sacrifier la qualité des offres. Session Qualiopi 4 h, exercices sur vos documents réels.',
    villesEtTrajets:
      'Massy, Évry-Courcouronnes et Palaiseau concentrent ingénierie, sièges sociaux et sous-traitance BTP. Depuis Guyancourt : environ 30 à 40 min vers Massy ou Palaiseau (A12 / N118), 35 à 45 min vers Évry ou Corbeil-Essonnes. Yerres et Draveil restent à moins de 50 min. Nous confirmons le créneau et le point de rendez-vous lors de l\'échange préalable de 30 min.',
    tissuEtUsages:
      'L\'Essonne mêle PME industrielles, bureaux d\'études et entreprises de second œuvre sur rénovation tertiaire et logements. Les dirigeants de TPE y portent souvent à la fois le chiffrage et la relation client. Deux usages IA fréquents en formation : rédiger des relances fournisseurs et clients avec un ton homogène à partir de vos modèles ; et préparer un brouillon de mémoire technique en listant les exigences CCTP par lot — le chiffrage et la signature restent humains.',
    faq: faqDeptLocal(
      'Essonne',
      '91',
      'Oui. Intra dans vos locaux du 91 (Massy, Évry, Corbeil, Savigny-sur-Orge…) ou inter en salle francilienne. Comptez 30 à 45 min de route depuis Guyancourt selon le bassin ; nous regroupons les déplacements pour les entreprises de la même zone quand c\'est possible.',
      'Oui. Votre équipe du 91 peut se réunir dans nos locaux de Guyancourt (78) : matinée 4 h, connexion et vidéoprojecteur fournis. Solution pratique si vos bureaux sont encombrés ou si vous mélangez direction, admin et conducteurs sur un même créneau.',
      'Une entreprise de l\'Essonne (91) adhérente Constructys peut prétendre à une prise en charge selon les plafonds en vigueur. Le département ne change pas les règles : nous vous remettons convention Qualiopi et pièces pour le dépôt OPCO.',
    ),
    metierLink: {
      href: LINKS.formationIaDirigeantPmeBtp,
      label: 'Dirigeant PME BTP',
      description: 'Administratif, devis et pilotage — profil fréquent dans le 91',
    },
  },
  '92': {
    deptCode: '92',
    departementNom: 'Hauts-de-Seine',
    intro:
      'Formation IA BTP dans les Hauts-de-Seine (92) — présentiel intra/inter, depuis Guyancourt (78). De Nanterre à Boulogne-Billancourt, les entreprises du bâtiment côtoient grands marchés tertiaires et rénovation en site occupé. Formation 4 h Qualiopi, angle pratique sur vos dossiers AO et chantier.',
    villesEtTrajets:
      'Nanterre, Boulogne-Billancourt et Issy-les-Moulineaux sont les villes les plus demandées, avec Courbevoie et Levallois pour la proximité La Défense. Depuis Guyancourt : 25 à 40 min vers Nanterre ou Boulogne, parfois 45 min aux heures de pointe vers le boulevard périphérique ouest. Les intra se planifient en général en matinée pour limiter les embouteillages.',
    tissuEtUsages:
      'Les Hauts-de-Seine concentrent PME de rénovation tertiaire, entreprises de lots techniques et sous-traitants des grands groupes autour de La Défense. Les délais sont courts, les mémoires techniques exigeants. Usages IA travaillés en session : décortiquer un CCAP pour repérer les clauses à risque avant engagement ; et produire une trame de CR de chantier hebdomadaire à partir de vos notes — toujours relue par le conducteur avant envoi au MOE.',
    faq: faqDeptLocal(
      'Hauts-de-Seine',
      '92',
      'Oui, sur tout le 92. Départ Guyancourt : 25 à 45 min selon la commune (Nanterre, Boulogne, Issy, Colombes). Nous précisons l\'itinéraire et l\'horaire lors du cadrage pour éviter les créneaux aux heures de pointe quand c\'est possible.',
      'Oui. Session intra possible dans nos locaux à Guyancourt pour une équipe des Hauts-de-Seine : 4 h, jusqu\'à 8 participants. Alternative pratique aux bureaux parisiens bruyants ou aux open spaces sans salle de réunion.',
      'Constructys s\'applique aux entreprises des Hauts-de-Seine (92) selon les mêmes critères nationaux (adhésion OPCO, effectif, plafonds). Notre organisme Qualiopi fournit le cadre pédagogique attendu pour le dossier de financement.',
    ),
    metierLink: {
      href: LINKS.formationIaDirigeantPmeBtp,
      label: 'Dirigeant PME BTP',
      description: 'Mémoires techniques et pilotage — profil 92 / La Défense',
    },
  },
  '93': {
    deptCode: '93',
    departementNom: 'Seine-Saint-Denis',
    intro:
      'Formation IA BTP en Seine-Saint-Denis (93) — présentiel intra/inter, depuis Guyancourt (78). Saint-Denis, Montreuil et Aubervilliers concentrent rénovation urbaine, équipements publics et marchés de collectivités. Session 4 h sur vos devis, CCTP et courriers, certification Qualiopi.',
    villesEtTrajets:
      'Saint-Denis, Montreuil et Bobigny (chef-lieu) sont les principaux points d\'ancrage ; Pantin et Aubervilliers complètent la demande. Depuis Guyancourt : environ 40 à 55 min vers Saint-Denis ou Montreuil (A1, A3, Francilienne), 35 à 45 min vers Noisy-le-Grand. Nous adaptons l\'horaire de départ pour arriver avant 9h en intra.',
    tissuEtUsages:
      'En Seine-Saint-Denis, le BTP est porté par des PME de gros œuvre, de second œuvre et de réseaux sur opérations de rénovation et de construction en milieu urbain dense. Les marchés publics des intercommunalités imposent une documentation rigoureuse. En formation : accélérer la lecture d\'un DCE pour extraire les postes sensibles par lot ; et structurer le suivi des réserves après réception dans un tableau partagé — l\'IA propose, l\'équipe valide.',
    faq: faqDeptLocal(
      'Seine-Saint-Denis',
      '93',
      'Oui. Interventions intra dans tout le 93 : Saint-Denis, Montreuil, Aubervilliers, Drancy, etc. Trajet depuis Guyancourt : en général 40 à 55 min. Pour les chantiers en couronne nord-est, nous calons souvent une matinée complète plutôt qu\'une demi-journée isolée.',
      'Oui. Vous pouvez réserver une matinée dans nos locaux à Guyancourt (78) pour votre équipe du 93 : salle équipée, 4 h, exercices sur vos PDF. Utile quand le siège social est en Seine-Saint-Denis mais qu\'aucune salle de formation n\'est disponible sur site.',
      'Les entreprises du 93 peuvent mobiliser Constructys comme partout en France. Éligibilité selon votre OPCO : nous remettons programme, convention et attestations Qualiopi pour une entreprise immatriculée ou intervenant en Seine-Saint-Denis.',
    ),
    metierLink: {
      href: LINKS.formationConducteurTravaux,
      label: 'Conducteur de travaux',
      description: 'Rénovation urbaine, CR et marchés publics — 93',
    },
  },
  '94': {
    deptCode: '94',
    departementNom: 'Val-de-Marne',
    intro:
      'Formation IA BTP dans le Val-de-Marne (94) — présentiel intra/inter, depuis Guyancourt (78). Créteil, Vitry-sur-Seine et Vincennes forment un arc dense de PME du bâtiment entre rénovation et neuf. Formation Qualiopi 4 h, travail sur vos documents chantier et marchés.',
    villesEtTrajets:
      'Créteil (chef-lieu), Vitry-sur-Seine et Nogent-sur-Marne sont les agglomérations les plus citées ; Champigny-sur-Marne et Saint-Maur-des-Fossés complètent le maillage. Depuis Guyancourt : 35 à 50 min vers Créteil ou Vitry (A86, francilienne sud), 45 à 55 min vers Vincennes ou Nogent. Les créneaux matinaux limitent l\'impact du trafic sur le périphérique sud-est.',
    tissuEtUsages:
      'Le Val-de-Marne mêle rénovation de copropriétés, équipements publics et opérations mixtes public-privé. Dominantes : second œuvre, plomberie-CVC, électricité et entreprises générales de taille moyenne. Usages IA typiques en session : transformer des réserves de réception en plan d\'action daté pour la levée ; et rédiger des courriers de relance MOA ou copropriété à partir de vos modèles — relecture systématique avant envoi.',
    faq: faqDeptLocal(
      'Val-de-Marne',
      '94',
      'Oui, sur l\'ensemble du 94. Guyancourt → Créteil ou Vitry : comptez 35 à 50 min ; vers l\'est (Saint-Maur, Nogent) plutôt 45 à 55 min. Déplacement inclus au devis intra, repas et frais annoncés avant convention.',
      'Oui. Session possible dans nos locaux à Guyancourt pour une équipe du Val-de-Marne : 4 h le matin, jusqu\'à 8 personnes. Pratique pour les PME de Créteil ou Vitry qui n\'ont pas de salle dédiée dans leurs bureaux.',
      'Le financement Constructys concerne les entreprises du Val-de-Marne (94) selon les règles nationales OPCO. Nous vous aidons avec le cadre Qualiopi : programme détaillé, objectifs, convention — votre référent Constructys valide le montant pris en charge.',
    ),
    metierLink: {
      href: LINKS.formationConducteurTravaux,
      label: 'Conducteur de travaux',
      description: 'Réception, réserves et suivi — bassin Créteil / Vitry',
    },
  },
  '95': {
    deptCode: '95',
    departementNom: "Val-d'Oise",
    intro:
      'Formation IA BTP dans le Val-d\'Oise (95) — présentiel intra/inter, depuis Guyancourt (78). Cergy, Argenteuil et le bassin Roissy concentrent PME du bâtiment, tertiaire et logements. Session 4 h Qualiopi, présentiel uniquement, sur vos dossiers réels.',
    villesEtTrajets:
      'Cergy-Pontoise, Argenteuil et Sarcelles structurent les demandes ; Franconville et Ermont complètent la couronne nord. Depuis Guyancourt : 25 à 40 min vers Cergy ou Pontoise (A15), 35 à 50 min vers Argenteuil ou Garges-lès-Gonesse. Le nord du 95 reste accessible en moins d\'une heure, ce qui facilite les intra en matinée.',
    tissuEtUsages:
      'Le Val-d\'Oise combine logements neufs autour de Cergy, rénovation en grande couronne et activité liée à Roissy (entrepôts, bureaux, infrastructures). Corps d\'état fréquents : gros œuvre, couverture, réseaux et second œuvre. En formation, on voit souvent : la préparation de fiches méthodes et PPSPS à partir de modèles existants ; et l\'accélération de comptes rendus de chantier multi-lots pour les réunions hebdomadaires — toujours avec validation du conducteur.',
    faq: faqDeptLocal(
      "Val-d'Oise",
      '95',
      'Oui. Intra dans vos locaux du 95 (Cergy, Argenteuil, Sarcelles, Ermont…) ou inter en salle. Depuis Guyancourt : 25 à 50 min selon la commune. Le nord francilien est une zone que nous couvrons régulièrement sans supplément caché.',
      'Oui. Nos locaux à Guyancourt accueillent les équipes du Val-d\'Oise pour une matinée complète : 4 h, exercices sur vos documents. Solution appréciée des PME de Cergy qui veulent réunir bureau d\'études et terrain au même endroit.',
      'Constructys s\'applique aux entreprises du Val-d\'Oise (95) comme dans les autres départements. Qualiopi OFC : convention, programme et pièces pour votre dossier OPCO — le barème dépend de votre effectif et de vos cotisations, pas du code postal.',
    ),
    metierLink: {
      href: LINKS.formationIaConducteurEnginsTp,
      label: 'Conducteur d\'engins TP',
      description: 'Terrassement, voirie et logistique — nord francilien / Roissy',
    },
  },
};

export function getDeptLocalSeoContent(deptCode: string): DeptLocalSeoContent | undefined {
  return DEPT_LOCAL_SEO_CONTENT[deptCode];
}
