/**
 * Huit landings métier « riches » — vocabulaire, 5 cas d’usage, 5 prompts, 6 FAQ, maillage.
 */
import type { FAQItem } from '@/lib/faq';
import type { FormationIaMetierBtpConfig } from '@/lib/formation-ia-metier-btp-types';
import { LINKS } from '@/lib/internal-links';

const OFC = "OFC Création d'Entreprise";

const COVER = {
  url: '/images/formation-ia-intra-entreprise-batiment.webp',
  width: 1024,
  height: 571,
  alt: 'Session en entreprise du bâtiment — Laure Olivié, OFC Qualiopi',
} as const;

function faqStandard(metierLabel: string): FAQItem[] {
  return [
    {
      q: 'Mes données chantier sont-elles protégées dans ChatGPT ?',
      a: `Évitez les plans nominatifs complets dans un outil grand public sans cadre entreprise. Anonymisez, utilisez des extraits ou des offres professionnelles sans entraînement — c’est un point clé des sessions ${OFC}.`,
    },
    {
      q: 'La formation est-elle financement possible selon éligibilité (Constructys) ?',
      a: `Oui selon éligibilité : ${OFC} est certifié Qualiopi ; le financement OPCO Constructys suit les règles en vigueur pour les entreprises du BTP.`,
    },
    {
      q: 'Quelle différence avec la formation catalogue BTP-01 ?',
      a: `BTP-01 pose les bases communes ; cette page métier aligne exemples et prompts sur le vocabulaire ${metierLabel} pour des exercices plus immédiats sur votre quotidien.`,
    },
  ];
}

export const FORMATION_IA_METIER_MACON: FormationIaMetierBtpConfig = {
  id: 'macon',
  path: '/formation-ia-macon-btp',
  h1: 'Formation IA maçon — devis, métrés et DTU 20.1',
  metaTitle: 'Formation IA maçon BTP : devis, DTU 20.1',
  skipIdfTitleOverride: true,
  metaDescription:
    'Formation IA pour le BTP — maçons : devis, métrés et DTU 20.1 (pas le lot gros œuvre). Présentiel Île-de-France, Qualiopi. Prenez un rendez-vous découverte.',
  keywords: [
    'formation IA maçon BTP',
    'formation IA maçonnerie',
    'ChatGPT maçonnerie',
    'DTU 20.1',
    'métré béton parpaing',
    'ferraillage IA',
    'DPGF maçonnerie',
    'CCTP lot 2',
    'mémoire technique maçonnerie',
    'Qualiopi maçon',
  ],
  metierNom: 'maçons et entreprises de maçonnerie',
  metierNomTitre: 'maçon',
  normeRef: 'le DTU 20.1',
  essentielItems: [
    'Métier maçon : devis, métrés béton/parpaing, ferraillage et DTU 20.1 — pas le pilotage DCE / planning multi-lots.',
    'Session 4 h — organisme certifié Qualiopi : devis maçonnerie, métré assisté ([à valider par le métré]), CR de coulage — relecture humaine obligatoire.',
    'L’IA structure brouillons et tableaux ; elle ne remplace ni le métré ni la conformité normative.',
    'Financement Constructys selon éligibilité — présentiel Île-de-France uniquement, ateliers sur vos dossiers anonymisés.',
  ],
  problemParagraphs: [
    `Les maçons et entreprises de maçonnerie enchaînent élévations, parpaing, béton, coffrage et ferraillage : chaque devis et chaque métré doit coller au ${'`'}DTU 20.1${'`'} et aux cotes relevées — sans confondre avec le lot gros œuvre (DCE, planning, coordination des lots).`,
    `Le temps part aussi en rédaction : structure de devis maçonnerie, métré béton/parpaing à croiser avec les plans, comptes rendus de coulage, relances fournisseur béton. Sans méthode, on reformule tard le soir les mêmes postes de coffrage et de ferraillage.`,
    `Sur les marchés, une IA mal cadrée invente des volumes, des dosages ou des références DTU. La formation Qualiopi pose le cadre — prompts, sources, mention [à valider par le métré], relecture et confidentialité — sans remplacer le géomètre-métré ni le fascicule.`,
    `L’objectif des sessions ${OFC} est de gagner plusieurs heures par semaine sur la structure des documents (devis, CR, mémoires, mails), pas de chiffrer définitivement un ouvrage ni de valider un ferraillage à la place d’une personne compétente.`,
  ],
  solutionIntro: `Les sessions combinent démonstration et ateliers sur vos cas (anonymisés). Vous apprenez à produire des brouillons pour devis maçonnerie, métré assisté (toujours avec [à valider par le métré]), CR de coulage et relances fournisseur béton — avec validation métier et croisement du DTU 20.1.`,
  prompts: [
    {
      title: 'Structure de devis maçonnerie (postes, sans prix)',
      body: `Tu es maçon / conducteur de travaux gros œuvre en France. Données : [TYPE OUVRAGE — fondations / élévation / dalle / reprises], matériaux [béton / parpaing / mixte], accès chantier [LISTE].
Propose la STRUCTURE détaillée d’un devis maçonnerie (intitulés de postes, pas les prix) : préparation, coffrage, ferraillage, béton, maçonnerie, reprises, évacuations de déblais, protections. Rappelle de croiser le CCTP lot 2, le DPGF et le DTU 20.1. Ne pas inventer de quantités : [à valider par le métré].`,
    },
    {
      title: 'Métré assisté — béton / parpaing (avec validation métré)',
      body: `Contexte : [DESCRIPTION OUVRAGE], cotes indicatives : [LISTE ou « plans joints »].
Propose une STRUCTURE de métré (postes et sous-postes) : volumes béton, surfaces / ml de maçonnerie parpaing, coffrage, ferraillage (en kg ou cadres — selon vos usages), reprises. Format tableau : poste / unité / quantité provisoire / remarque. Chaque quantité chiffrée doit porter la mention [à valider par le métré]. Ne pas conclure un chiffrage définitif.`,
    },
    {
      title: 'Compte rendu de coulage béton',
      body: `Notes brutes de coulage : [NOTES — ouvrage, formule béton, volume livré, heure, météo, contrôles, anomalies].
Rédige un CR professionnel : identification de l’ouvrage, conditions, déroulé du coulage, contrôles effectués, réserves ou écarts, suites (cure, décoffrage, prochaines étapes). Ton factuel. Ne pas inventer de résultats d’essais : [à compléter] si besoin.`,
    },
    {
      title: 'Relance fournisseur béton (délai, ton, clarté)',
      body: `Situation : [COMMANDE / formule / volume / créneau promis], impact chantier : [PLANNING GROS ŒUVRE], historique : [RELANCE DÉJÀ FAITE oui/non].
Rédige un mail de relance au fournisseur béton : rappel de la commande, créneau attendu, impact sur le coffrage / ferraillage / coulage, demande de confirmation écrite. Ton ferme et professionnel. Pas d’engagement contractuel hors faits fournis.`,
    },
    {
      title: 'Mémoire technique — gros œuvre (plan)',
      body: `Critères du CCAP / CCTP lot 2 notés : [LISTE]. Notre entreprise : [TAILLE, moyens, références anonymisées].
Rédige un plan de mémoire technique (titres + 2 bullets par titre) : méthode d’exécution (coffrage, ferraillage, bétonnage), planning gros œuvre, moyens, coordination lots, sécurité, environnement. Pas de copier-coller du règlement de consultation. Vocabulaire : DTU 20.1, DPGF, métré, ferraillage.`,
    },
    {
      title: 'Analyse CCTP — lot maçonnerie / lot 2',
      body: `Voici un extrait de CCTP maçonnerie (lot 2) : [COLLEZ L’EXTRAIT].
Liste les exigences par sous-partie : performances béton, coffrage, ferraillage, maçonnerie, contrôles, documents à fournir, interfaces. Sous chaque point ambigu, propose 2–3 questions à poser au maître d’œuvre. Rappel : ne pas conclure sur la conformité — validation sur le fascicule DTU 20.1 et les pièces marché (DPGF, plans).`,
    },
  ],
  csfePartnership: false,
  testimonialQuote:
    '« Les devis, les CR de coulage et les plans de mémoire sortent plus vite — le métré et le ferraillage, ça reste notre validation. »',
  testimonialAttribution: 'Gérant PME maçonnerie gros œuvre — Essonne (retour OFC, anonymisé)',
  faq: [
    {
      q: 'ChatGPT peut-il appliquer le DTU 20.1 à la place de mon équipe ?',
      a: `Non : le fascicule, les dosages, le ferraillage et la conformité relèvent de votre qualification et de vos outils. L’IA peut structurer une lecture de CCTP lot 2, des listes de contrôle et des brouillons — jamais remplacer la validation technique.`,
    },
    {
      q: 'Comment utiliser l’IA pour un métré béton ou parpaing ?',
      a: `Pour proposer une structure de postes et reformuler vos notes — chaque quantité doit rester marquée [à valider par le métré]. L’IA ne remplace ni le relevé ni le logiciel de métré.`,
    },
    {
      q: 'L’IA peut-elle rédiger un mémoire technique gros œuvre complet pour un AO ?',
      a: `Elle peut fournir un plan et un brouillon à partir de vos moyens et du CCTP — la relecture, la cohérence avec le DPGF / l’offre de prix et la signature restent humaines.`,
    },
    {
      q: 'Mes plans de coffrage et quantitatifs sont-ils protégés dans ChatGPT ?',
      a: `Évitez les plans nominatifs complets dans un outil grand public sans cadre entreprise. Anonymisez, utilisez des extraits, ou des offres professionnelles sans entraînement — c’est enseigné en formation ${OFC}.`,
    },
    {
      q: 'La formation IA maçon BTP est-elle financement possible selon éligibilité ?',
      a: `Oui selon éligibilité et dossier : ${OFC} est certifié Qualiopi ; le financement OPCO Constructys suit les règles en vigueur pour les entreprises du BTP.`,
    },
    {
      q: 'Quelle différence avec la formation IA gros œuvre ?',
      a: `Cette page vise le métier maçon (devis, métrés, DTU 20.1). La formation IA pour entreprises de gros œuvre cible le lot : DCE, planning et coordination des lots. Un encadré en tête de page permet de basculer.`,
    },
  ],
  courseName: 'Formation IA maçon BTP — devis, métrés, DTU 20.1',
  courseDescription: `${OFC} : formation IA et ChatGPT pour maçons — devis, métrés, DTU 20.1, ferraillage, CR de coulage. Session 4 h — organisme certifié Qualiopi, financement possible selon éligibilité.`,
  courseTeaches: [
    'ChatGPT pour maçons et maçonnerie BTP',
    'DTU 20.1 — usage documentaire assisté',
    'Devis et métré assisté ([à valider par le métré])',
    'CR de coulage et relances fournisseur béton',
    'Mémoires techniques maçonnerie / CCTP lot 2',
    'Qualiopi — confidentialité des données chantier',
  ],
  ogImage: { ...COVER, alt: 'Formation IA pour le BTP — maçonnerie et gros œuvre' },
  coverImage: { ...COVER, alt: 'Session formation IA pour équipes gros œuvre' },
  showAuthorBio: true,
  authorBioClosingLine:
    'Basée en Île-de-France, elle accompagne notamment les maçons et entreprises de maçonnerie sur devis, métrés et DTU 20.1.',
  relatedMetierLinks: [
    {
      href: LINKS.formationIaCharpentierMenuisierBtp,
      title: 'Formation IA charpentier & menuisier bois',
      description: 'Structure bois et interfaces après appuis gros œuvre — angle UMB-FFB.',
    },
    {
      href: LINKS.formationIaCouvreurBtp,
      title: 'Formation IA couvreur zingueur',
      description: 'Couverture et zinguerie après élévations — même démarche Qualiopi.',
    },
    {
      href: LINKS.formationConducteurTravaux,
      title: 'Formation IA conducteur de travaux',
      description: 'Pilotage chantier, CR et coordination multi-lots.',
    },
  ],
  liensUtilesIntro:
    'Métiers proches, catalogue Qualiopi, Claude AI BTP, financement Constructys et articles.',
  sisterEncart: {
    currentAudience:
      'Cette page s’adresse aux maçons et entreprises de maçonnerie (devis, métrés, DTU 20.1).',
    href: LINKS.formationIaGrosOeuvreBtp,
    linkLabel: 'Formation IA pour entreprises de gros œuvre (DCE, planning, coordination des lots)',
  },
};

export const FORMATION_IA_METIER_COUVREUR: FormationIaMetierBtpConfig = {
  id: 'couvreur',
  path: '/formation-ia-couvreur-btp',
  h1: 'Formation IA couvreur zingueur — DTU 40, toiture & Qualiopi',
  metaTitle: 'Formation IA couvreur zingueur — toiture, zinguerie',
  metaDescription:
    'Formation IA couvreur-zingueur BTP : métrés toiture, devis et mémoires plus clairs, sous relecture métier. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  keywords: [
    'formation IA couvreur zingueur',
    'formation IA couvreur BTP',
    'ChatGPT zinguerie',
    'DTU 40',
    'devis toiture IA',
    'Qualiopi couvreur',
  ],
  metierNom: 'couvreurs-zingueurs',
  metierNomTitre: 'couvreur',
  normeRef: 'le DTU 40',
  problemParagraphs: [
    `Les entreprises de couverture-zinguerie jonglent entre pentes, noues, solins et évacuations : le ${'`'}DTU 40${'`'} et les avis techniques des systèmes structurent les devis et les mémoires, sans compter les relevés sur batiments complexes.`,
    `La tôlerie, le zinc joint debout et les éléments de rive demandent précision dans les libellés ; recopier des brouillons à la main retarde les réponses clients et les AO.`,
    `L’été comme l’hiver, le rythme chantier ne pardonne pas : l’IA mal utilisée peut inventer une nuance de pose ou une référence produit — la formation Qualiopi encadre prompts et validation.`,
    `L’objectif est de gagner du temps sur la mise en forme (métrés, CR, courriers) tout en gardant la responsabilité sur l’étanchéité et les prescriptions fabricants.`,
  ],
  solutionIntro: `Sessions pratiques sur vos cas : métrés toiture multi-pans, descriptifs de zinguerie, réponses courtes aux MOE — toujours avec relecture par un professionnel couverture.`,
  casUsageConcrets: [
    'Préparer un devis détaillé (structure des postes) pour réfection de couverture à partir de relevés et photos.',
    'Rédiger un compte rendu de visite après intempérie ou expertise toiture (zones, constats, suites).',
    'Esquisser un plan de mémoire technique pour AO lot couverture / zinguerie.',
    'Lister les questions à poser au MOE quand le CCTP est flou sur l’évacuation ou les relevés.',
    'Produire un mail client pour expliquer une option technique (ventilation sous-toiture, solin) sans jargon excessif.',
  ],
  prompts: [
    {
      title: 'Métré toiture — brouillon de postes (ardoise / tuile / bac)',
      body: `Données : [FORME TOITURE, pans, longueurs de gouttières, points singuliers].
Propose la STRUCTURE des postes (sans prix) : dépose, écran sous-toiture, isolation si mentionnée, pose, zinguerie, finitions. Rappelle DTU 40 et notices — pas de quantités inventées.`,
    },
    {
      title: 'Zinguerie — descriptif pour devis (chemins de noue, solins)',
      body: `Contexte : [COURT]. Rédige un descriptif technique structuré pour chiffrage interne : repérage des linéaires, interfaces, points de vigilance. [À compléter] pour cotes exactes.`,
    },
    {
      title: 'CR visite — fuite / réserve toiture',
      body: `Notes : [NOTES]. Compte rendu factuel : zones, hypothèses, recommandations générales, demandes de précisions. Pas de diagnostic définitif sans contre-visite si besoin.`,
    },
    {
      title: 'Mémoire technique — lot couverture marché public',
      body: `Critères : [LISTE]. Entreprise : [MOYENS, références anonymisées]. Plan de mémoire (titres + bullets) : méthode, sécurité, délais, environnement.`,
    },
    {
      title: 'Mail MOE — demande de précision sur relevés ou étanchéité',
      body: `Élément flou : [SUJET]. Rédige un mail court et professionnel listant des questions ciblées. Ton ferme et cordial.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote:
    '« Les structures de devis toiture et les mails aux clients sont plus homogènes — on garde la main sur les cotes. »',
  testimonialAttribution: 'Chef d’entreprise couverture — 94 (anonymisé)',
  faq: [
    {
      q: 'L’IA peut-elle remplacer un relevé de toiture ?',
      a: `Non : les mesures et le diagnostic restent terrain. L’IA aide à présenter et structurer les informations que vous collectez.`,
    },
    {
      q: 'ChatGPT connaît-il toutes les nuances du DTU 40 ?',
      a: `Il peut résumer ou proposer un plan de lecture, mais il se trompe sur les détails. Toujours se référer aux fascicules et avis techniques à jour.`,
    },
    {
      q: 'Comment éviter les erreurs sur les systèmes couverture / zinguerie ?',
      a: `Ne jamais valider une sortie brute : croiser avec les notices des fabricants et le savoir-faire interne.`,
    },
    ...faqStandard('couvreur'),
  ],
  courseName: 'Formation IA couvreur zingueur BTP — Qualiopi',
  courseDescription: `${OFC} : formation IA pour couvreurs-zingueurs — DTU 40, métrés, zinguerie, mémoires. Session 4 h — organisme certifié Qualiopi, Constructys selon dossier.`,
  courseTeaches: [
    'ChatGPT pour couvreurs et zingueurs BTP',
    'DTU 40 — aide à la rédaction',
    'Métrés et descriptifs toiture',
    'Qualiopi — confidentialité',
  ],
  ogImage: { ...COVER, alt: 'Formation IA pour les pros du BTP — couverture et zinguerie' },
  coverImage: { ...COVER, alt: 'Équipe couverture — contexte formation IA' },
  showAuthorBio: true,
  authorBioClosingLine:
    'Elle forme les équipes toiture, zinguerie et second œuvre sur des usages IA responsables.',
  relatedMetierLinks: [
    { href: '/formation-ia-macon-btp', title: 'Formation IA maçon BTP', description: 'Gros œuvre et interfaces avant couverture.' },
    { href: '/formation-ia-etancheur', title: 'Formation IA étancheur BTP', description: 'Étanchéité, toiture-terrasse, complément toiture.' },
    { href: '/formation-ia-charpentier-btp', title: 'Formation IA charpentier BTP', description: 'Charpente bois et coordination avec la couverture.' },
  ],
  liensUtilesIntro:
    'Métiers proches, catalogue, Claude AI BTP, financement et blog.',
};

export const FORMATION_IA_METIER_PEINTRE: FormationIaMetierBtpConfig = {
  id: 'peintre',
  path: '/formation-ia-peintre-btp',
  h1: 'Formation IA peintre bâtiment — finitions, DTU 59 & Qualiopi',
  metaTitle: 'Formation IA peintre bâtiment — devis, supports, DTU 59',
  metaDescription:
    'Formation IA peintre BTP en présentiel IDF : devis par pièce, DTU 59 et mémoires techniques. Qualiopi, Constructys selon éligibilité. Prenez RDV découverte.',
  keywords: [
    'formation IA peintre bâtiment',
    'formation IA peintre BTP',
    'ChatGPT peinture bâtiment',
    'DTU 59',
    'devis peinture IA',
    'Qualiopi peintre',
  ],
  metierNom: 'peintres',
  metierNomTitre: 'peintre',
  normeRef: 'le DTU 59',
  problemParagraphs: [
    `Les peintres en bâtiment gèrent supports, sous-couches, finitions et teintes : le ${'`'}DTU 59${'`'} et les fiches produits encadrent les prescriptions, tandis que les clients demandent des devis clairs par pièce ou par lot.`,
    `La préparation des supports (humidité, rebouchage, ponçage) et les contraintes d’accès retardent la rédaction des devis et des CR de visite.`,
    `Sans méthode, l’IA génère des textes plausibles mais faux sur un cycle de séchage ou un produit incompatible — d’où l’importance du cadre Qualiopi.`,
    `L’objectif est de gagner du temps sur la structure des documents et les explications clients, pas de remplacer le geste métier.`,
  ],
  solutionIntro: `Ateliers sur devis par pièce, fiches entretien client, réponses courtes aux MOE — avec validation des gammes et des temps de séchage par votre équipe.`,
  casUsageConcrets: [
    'Monter un devis peinture intérieure détaillé par pièce (murs, plafonds, boiseries) à partir de cotes et de choix de finition.',
    'Rédiger une fiche « entretien des peintures » pour remise au client après travaux.',
    'Préparer un compte rendu de visite technique (supports, humidité, recommandations générales).',
    'Structurer une réponse à un appel d’offres court (lot peinture) avec plan de méthode.',
    'Répondre à un mail client sur une tache, une retouche ou un délai entre couches — ton professionnel.',
  ],
  prompts: [
    {
      title: 'Devis peinture — pièce par pièce (structure)',
      body: `Données : [LISTE PIÈCES, surfaces, état des supports, finitions souhaitées].
Propose la STRUCTURE du devis (postes, pas les prix) : préparation, primaires, couches, finitions, protections. Renvoi DTU 59 et fiches produits.`,
    },
    {
      title: 'CR visite — humidité et supports',
      body: `Notes : [NOTES]. Compte rendu : constats, zones à traiter, recommandations générales, suites (devis séparé si besoin).`,
    },
    {
      title: 'Réponse AO — lot peinture (plan)',
      body: `Critères : [LISTE]. Plan de mémoire (titres + bullets) : méthode, délais, sécurité, déchets, environnement.`,
    },
    {
      title: 'Mail client — choix de teinte ou type de finition',
      body: `Demande client : [TEXTE]. Rédige une réponse pédagogique sans garantir un rendu : renvoi à nuancier et échantillons.`,
    },
    {
      title: 'Synthèse — litige finition (ton neutre)',
      body: `Éléments : [FAITS]. Proposition de mail factuel pour désamorcer et proposer une visite — sans reconnaissance de faute sans preuve.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote: '« Les devis par pièce et les mails clients sortent plus vite — on valide les produits nous-mêmes. »',
  testimonialAttribution: 'Peintre en bâtiment — 78 (anonymisé)',
  faq: [
    {
      q: 'L’IA peut-elle choisir les produits ou les cycles de séchage ?',
      a: `Non : les fiches produits et le DTU 59 priment. L’IA aide à structurer le texte, pas à valider la compatibilité chimique.`,
    },
    {
      q: 'Comment éviter les erreurs sur les supports (humidité, moisissures) ?',
      a: `Toujours partir des constats terrain et des mesures réelles — l’IA ne remplace pas le diagnostic visite.`,
    },
    {
      q: 'ChatGPT peut-il rédiger mes fiches de données sécurité (FDS) ?',
      a: `Pour un rappel de structure oui — pour les obligations réglementaires, sourcez les documents fabricants officiels.`,
    },
    ...faqStandard('peintre'),
  ],
  courseName: 'Formation IA peintre bâtiment BTP — Qualiopi',
  courseDescription: `${OFC} : formation IA pour peintres — DTU 59, devis, finitions, mémoires. Session 4 h — organisme certifié Qualiopi, Constructys.`,
  courseTeaches: ['ChatGPT pour peintres BTP', 'DTU 59', 'Devis et supports', 'Qualiopi'],
  ogImage: { ...COVER, alt: 'Formation IA appliquée au bâtiment — peinture bâtiment' },
  coverImage: { ...COVER, alt: 'Peinture bâtiment — formation IA' },
  showAuthorBio: true,
  authorBioClosingLine: 'Elle accompagne les peintres et les entreprises de second œuvre sur des usages IA encadrés.',
  relatedMetierLinks: [
    {
      href: LINKS.formationIaPlatrerieBtp,
      title: 'Formation IA plâtrerie',
      description: 'Cloisons et préparation avant peinture.',
    },
    {
      href: LINKS.formationIaCarreleurBtp,
      title: 'Formation IA entreprise de carrelage',
      description: 'Sol et murs — coordination finitions.',
    },
    {
      href: LINKS.formationIaIsolationBtp,
      title: 'Formation IA entreprise d’isolation',
      description: 'Dossiers et fiches produits — second œuvre thermique.',
    },
  ],
  liensUtilesIntro: 'Métiers de finition proches, catalogue Qualiopi, financement, ressources IA BTP.',
};

export const FORMATION_IA_METIER_PLAQUISTE: FormationIaMetierBtpConfig = {
  id: 'plaquiste',
  path: '/formation-ia-plaquiste-btp',
  h1: 'Formation IA plâtrerie — cloisons, doublages et plafonds',
  metaTitle: 'IA plâtrerie : cloisons et coordination',
  skipIdfTitleOverride: true,
  metaDescription:
    'Formation IA plâtrerie : cloisons, doublages, plafonds et interfaces de lots sous validation métier. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  keywords: [
    'formation IA plâtrerie',
    'formation IA plaquiste plâtrier',
    'formation IA plaquiste BTP',
    'ChatGPT plaque de plâtre',
    'IA cloisons doublages',
    'DTU 25',
    'formation IA pour le BTP',
  ],
  metierNom: 'entreprises de plâtrerie et plaquistes',
  metierNomTitre: 'plâtrerie',
  normeRef: 'le DTU 25',
  essentielItems: [
    'Angle plâtrerie entreprise : organiser les ouvrages (cloisons, doublages, plafonds), suivre les interfaces entre lots et les modifications — pas inventer des quantités ni des performances acoustiques.',
    'Public : dirigeants, chargés d’affaires et équipes. Présentiel Île-de-France, Qualiopi. Financement OPCO possible selon éligibilité.',
    'Ateliers sur NIV-01 (catalogue) ; l’IA ne valide ni l’acoustique ni la conformité DTU 25.',
  ],
  problemParagraphs: [
    `Les entreprises de plâtrerie pilotent cloisons, doublages, plafonds et habillages : le ${'`'}DTU 25${'`'} et les prescriptions de chantier structurent les devis, mais le vrai volume documentaire vient de l’organisation des ouvrages et des interfaces (électricité, plomberie, peinture, menuiseries).`,
    `Chaque modification de cloison ou de réservation génère des mails, des CR et des mises à jour de planning — sans méthode, l’équipe resaisit le soir.`,
    `L’IA sans cadre peut inventer des types de plaques, des performances acoustiques ou des linéaires : la formation impose données fournies, questions ouvertes et validation métier.`,
    `L’objectif : accélérer l’organisation documentaire et le suivi des changements, pas remplacer le métré ni le contrôle chantier.`,
  ],
  solutionIntro: `Vous travaillez sur listes d’ouvrages, interfaces de lots et suivi des modifications — avec des prompts adaptés au vocabulaire plâtrerie / plaque, sans performance inventée.`,
  casUsageConcrets: [
    'Organiser les ouvrages plâtrerie par zone ou niveau (cloisons, doublages, plafonds, habillages) à partir d’une liste de pièces ou d’un extrait de plans — sans inventer de linéaires ni de hauteurs.',
    'Cartographier les interfaces entre lots (réservations électricité / plomberie, passages, trémies) et préparer les questions aux autres corps d’état.',
    'Suivre les modifications de cloison ou de plafond : journal « demande / impact / statut / source » à partir des mails et CR fournis — pour garder une trace avant chiffrage ou avenant.',
  ],
  exemplePedagogique: {
    titre: 'Réorganisation documentaire d’un étage de bureaux (fictif)',
    contexte:
      'Brief fictif : étage open space, liste fournie — 6 cloisons type A (hauteur indiquée 2,70 m), 2 doublages, 1 plafond suspendu zone réunion. Mail MOE : « déplacer la cloison entre open space et salle réunion de 80 cm vers le nord ; conserver le plafond réunion ». Aucun métré définitif ni performance acoustique fournis.',
    livrableIa: `Tableau d’ouvrages (brouillon) :

Confirmé (présent dans le brief) :
| Ouvrage | Donnée | Source |
| Cloisons type A | 6 unités, H = 2,70 m | Liste fournie |
| Doublages | 2 | Liste fournie |
| Plafond suspendu | Zone réunion | Liste fournie |
| Modification | Déplacer cloison open space / réunion de 80 cm vers le nord | Mail MOE |
| Contrainte | Conserver le plafond réunion | Mail MOE |

À vérifier (absent) :
| Point | Action |
| Linéaires après déplacement | Relevé / plan à jour |
| Type de plaque et ossature | CCTP / notice |
| Performance acoustique | Ne pas inventer — demander la prescription |
| Impact sur réservations élec. / plomberie | Coordination lots |
| Quantités de joints / bandes | Chiffrage métier |`,
    donneesNecessaires: [
      'Liste d’ouvrages ou extrait de plans (anonymisé)',
      'Hauteurs et typologies déjà validées en interne',
      'Mails / CR de modification avec auteur et date',
      'Extrait CCTP si exigences spécifiques (sans conclure à la conformité)',
    ],
    controleHumain:
      'Le chargé d’affaires ou le conducteur valide l’impact sur quantités, planning et avenant ; aucune performance acoustique ou conformité DTU 25 n’est affirmée par l’IA.',
  },
  prompts: [
    {
      title: 'Organisation des ouvrages — cloisons / doublages / plafonds',
      body: `Données fournies uniquement : [LISTE PIÈCES OU ZONES, TYPES, HAUTEURS SI CONNUES].
Produis un tableau ouvrage | zone | type | données confirmées | manques.
Interdits : inventer linéaires, surfaces, performances acoustiques ou types de plaques absents.`,
    },
    {
      title: 'Interfaces entre lots — questions de coordination',
      body: `Contexte plâtrerie : [ZONES]. Autres lots concernés : [ÉLEC / PLOMB / PEINTURE / …].
Liste les interfaces probables et 5 questions max par lot, factuelles. Pas de solution technique inventée.`,
    },
    {
      title: 'Suivi des modifications — journal',
      body: `Mails / notes : [COLLER].
Tableau : date | demande | impact ouvrages | statut (à chiffrer / validé / refusé) | source.
Ne pas inventer d’avenant ni de quantités.`,
    },
    {
      title: 'Mail coordination — réservation ou trémie',
      body: `Problème : [SUJET]. Mail court, questions ciblées, ton professionnel. Pas d’engagement hors devis.`,
    },
    {
      title: 'Extrait CCTP — exigences documentaires (questions)',
      body: `Extrait : [TEXTE]. Liste exigences mentionnées + questions si ambiguïté. Pas de conclusion de conformité au DTU 25.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote:
    '« Les tableaux d’ouvrages et le suivi des déplacements de cloisons sont plus clairs — on vérifie toujours les linéaires sur plan. »',
  testimonialAttribution: 'Entreprise de plâtrerie — 93 (anonymisé)',
  faq: [
    {
      q: 'L’IA peut-elle calculer les surfaces de plaque à la place du métré ?',
      a: `Non : elle structure un tableau à partir de vos cotes fournies — relevé et chiffrage restent métier.`,
    },
    {
      q: 'Peut-elle valider l’acoustique d’une cloison ?',
      a: `Non. Elle peut lister des questions et renvoyer aux prescriptions / avis techniques — jamais d’affirmation de performance sans pièce justificative.`,
    },
    {
      q: 'Pourquoi cette page parle de plâtrerie et de plaquiste ?',
      a: `Une seule URL couvre l’intention « formation IA plâtrerie » et le métier plaquiste / plâtrier : cloisons, doublages, plafonds. Pour le carrelage ou l’isolation, voir les pages dédiées.`,
    },
    {
      q: 'DTU 25 : ChatGPT suffit pour trancher ?',
      a: `Non : l’IA peut proposer un plan de lecture ; la conformité relève du fascicule et de votre équipe.`,
    },
    ...faqStandard('plâtrerie'),
  ],
  courseName: 'Formation IA plâtrerie & plaquiste BTP — Qualiopi',
  courseDescription: `${OFC} : formation IA pour la plâtrerie — organisation des ouvrages, interfaces, suivi des modifications. Session catalogue — organisme certifié Qualiopi.`,
  courseTeaches: [
    'ChatGPT pour plâtrerie BTP',
    'Organisation cloisons / doublages / plafonds',
    'Suivi des modifications',
    'Qualiopi',
  ],
  ogImage: { ...COVER, alt: 'Formation IA pour le BTP — plâtrerie et cloisons' },
  coverImage: { ...COVER, alt: 'Plâtrerie — formation IA entreprise' },
  showAuthorBio: true,
  authorBioClosingLine:
    'Elle forme les entreprises de plâtrerie et les équipes plaque sur des usages IA documentaires, sous validation métier.',
  relatedMetierLinks: [
    {
      href: LINKS.formationIaIsolationBtp,
      title: 'Formation IA entreprise d’isolation',
      description: 'Fiches produits, dossiers chantier — sans validation thermique par l’IA.',
    },
    {
      href: LINKS.formationIaPeintreBatiment,
      title: 'Formation IA peintre bâtiment',
      description: 'Finitions après plâtrerie.',
    },
    {
      href: LINKS.formationElectricienBtp,
      title: 'Formation IA électricien BTP',
      description: 'Réservations et passages de lots.',
    },
  ],
  liensUtilesIntro: 'Métiers de finition proches, catalogue Qualiopi, financement, ressources IA BTP.',
  sisterEncart: {
    currentAudience: 'une entreprise de plâtrerie / plaquiste',
    href: LINKS.formationIaCarreleurBtp,
    linkLabel: 'la page formation IA entreprise de carrelage',
  },
};

/**
 * Config historique — la page `/formation-ia-menuisier-btp` rend désormais
 * `lib/formation-ia-menuisier-btp-landing.ts` (intérieur / extérieur / agencement).
 * Conservée pour exports et éventuels consommateurs du registre métier.
 */
export const FORMATION_IA_METIER_MENUISIER: FormationIaMetierBtpConfig = {
  id: 'menuisier',
  path: '/formation-ia-menuisier-btp',
  h1: 'Formation IA pour les entreprises de menuiserie et d’agencement',
  metaTitle: 'IA menuiserie : intérieur, extérieur, agencement',
  skipIdfTitleOverride: true,
  metaDescription:
    'Formation IA menuiserie et agencement : devis, relevés, CCTP et suivi pose sous validation métier. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  keywords: [
    'formation IA entreprise de menuiserie',
    'formation IA menuiserie intérieure',
    'formation IA menuiserie extérieure',
    'formation IA entreprise d’agencement',
    'IA devis menuiserie agencement',
    'formation IA pour le BTP',
  ],
  metierNom: 'entreprises de menuiserie et d’agencement',
  metierNomTitre: 'menuiserie',
  normeRef: 'les NF DTU 36.2 et 36.5',
  essentielItems: [
    'Menuiserie intérieure, extérieure et agencement — une page, trois sections documentaires distinctes.',
    'Présentiel Île-de-France, Qualiopi. Distinct de la charpente / ossature.',
    'L’IA ne valide ni mesures, ni plans de fabrication, ni performances.',
  ],
  problemParagraphs: [
    `Les entreprises de menuiserie et d’agencement jonglent entre relevés, devis, finitions, fournisseurs et suivi pose — détail des cas d’usage sur la landing dédiée.`,
  ],
  solutionIntro: `La page publique détaille intérieur, extérieur, agencement et la gestion commune (AO, fournisseurs, assistants).`,
  casUsageConcrets: [
    'Structurer devis et relevés à partir des données fournies.',
    'Comparer offres fournisseurs sans inventer de performances.',
    'Suivre fabrication, pose et réserves sous validation métier.',
  ],
  prompts: [
    {
      title: 'Voir la landing menuiserie & agencement',
      body: `Les prompts opérationnels sont sur la page /formation-ia-menuisier-btp (landing dédiée).`,
    },
  ],
  csfePartnership: false,
  testimonialQuote:
    '« On structure devis intérieur, relevés fenêtres et briefs dressing sans mélanger avec la charpente. »',
  testimonialAttribution: 'Entreprise de menuiserie-agencement — IDF (anonymisé)',
  faq: [
    {
      q: 'L’IA peut-elle valider mes cotes ou performances ?',
      a: `Non : relevé et validation restent métier. Voir la FAQ complète sur la landing.`,
    },
    ...faqStandard('menuiserie'),
  ],
  courseName: 'Formation IA menuiserie & agencement BTP — Qualiopi',
  courseDescription: `${OFC} : formation IA pour menuiserie intérieure, extérieure et agencement — devis, relevés, suivi. Qualiopi.`,
  courseTeaches: [
    'ChatGPT / Claude pour menuiserie et agencement',
    'Devis et relevés',
    'Suivi pose et réserves',
    'Qualiopi',
  ],
  ogImage: { ...COVER, alt: 'Formation IA pour le BTP — menuiserie et agencement' },
  coverImage: { ...COVER, alt: 'Menuiserie et agencement — formation IA entreprise' },
  showAuthorBio: true,
  authorBioClosingLine:
    'Elle forme les entreprises de menuiserie et d’agencement sur des usages IA documentaires, distincts de la charpente.',
  relatedMetierLinks: [
    {
      href: LINKS.formationIaCharpentierBtp,
      title: 'Formation IA charpentier BTP',
      description: 'Charpente et ossature — intention distincte.',
    },
    {
      href: LINKS.formationIaMetallerieSerrurerieBtp,
      title: 'Formation IA métallerie & serrurerie',
      description: 'Ouvrages métalliques et suivi pose.',
    },
    {
      href: LINKS.formationIaCarreleurBtp,
      title: 'Formation IA entreprise de carrelage',
      description: 'Finitions sols / murs — coordination second œuvre.',
    },
  ],
  liensUtilesIntro: 'Métiers proches, catalogue, financement, ressources IA BTP.',
  sisterEncart: {
    currentAudience: 'une entreprise de menuiserie ou d’agencement',
    href: LINKS.formationIaCharpentierBtp,
    linkLabel: 'la page formation IA charpentier (ossature / charpente)',
  },
};

export const FORMATION_IA_METIER_CARRELEUR: FormationIaMetierBtpConfig = {
  id: 'carreleur',
  path: '/formation-ia-carreleur-btp',
  h1: 'Formation IA pour les entreprises de carrelage',
  metaTitle: 'IA carrelage : devis, relevés et réserves',
  skipIdfTitleOverride: true,
  metaDescription:
    'Formation IA entreprise de carrelage : relevés, postes de préparation, devis et réserves sous validation. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  keywords: [
    'formation IA entreprise de carrelage',
    'formation IA carreleur',
    'formation IA carreleur BTP',
    'ChatGPT carrelage',
    'IA devis carrelage',
    'DTU 52',
    'formation IA pour le BTP',
  ],
  metierNom: 'entreprises de carrelage et carreleurs',
  metierNomTitre: 'carrelage',
  normeRef: 'le DTU 52',
  essentielItems: [
    'Angle entreprise de carrelage : structurer relevés fournis, postes de préparation, calepinage déjà établi, listes de fournitures, devis et réserves — sans inventer quantités ni taux de chute.',
    'Public : dirigeants, chargés d’affaires et équipes. Présentiel Île-de-France, Qualiopi. Financement OPCO possible selon éligibilité.',
    'Ateliers sur NIV-01 (catalogue) ; l’IA ne tranche pas la conformité DTU 52 ni les compatibilités colle / support.',
  ],
  problemParagraphs: [
    `Les entreprises de carrelage enchaînent relevés, préparations de support, calepinages validés, commandes de fournitures et réceptions : le ${'`'}DTU 52${'`'} et les notices fabricants encadrent la pose, mais le volume documentaire (devis, réserves, mails lots) pèse sur le bureau.`,
    `Quand le calepinage est déjà établi et les cotes fournies, l’enjeu n’est pas de « inventer » un métré : c’est de structurer postes de préparation, fournitures et réserves sans oublis.`,
    `L’IA sans cadre invente chutes, temps de prise ou compatibilités produit : la formation impose données validées, séparateur confirmé / à vérifier, et validation métier.`,
    `L’objectif : accélérer devis et documents de chantier, pas remplacer le geste de pose ni le contrôle support.`,
  ],
  solutionIntro: `Ateliers sur relevés fournis, postes de préparation, listes de fournitures et rédaction de réserves — calepinage déjà établi côté entreprise, relecture humaine systématique.`,
  casUsageConcrets: [
    'Transformer un relevé fourni (surfaces, formats, zones) en structure de postes de préparation (supports, ragréage si indiqué, protections) — sans inventer de quantités ni de taux de chute.',
    'Préparer les lignes de devis et la liste de fournitures à partir d’un calepinage déjà établi en interne (formats, zones, plinthes) — uniquement les données validées.',
    'Rédiger des réserves factuelles après visite support ou réception (constats, photos à prévoir, demandes aux autres lots) — sans conclure à la conformité technique.',
  ],
  exemplePedagogique: {
    titre: 'Devis documentaire — salle de bain (fictif, calepinage fourni)',
    contexte:
      'Dossier fictif : SDB 6,2 m² au sol (mesure fournie), faïence murale 14 m² (mesure fournie), format sol 60×60, faïence 30×60, calepinage validé en interne (joints droits). Brief : « Prévoir préparation support sol + plinthes assorties. » Aucun taux de chute ni notice colle fournis.',
    livrableIa: `Brouillon documentaire :

Confirmé :
| Élément | Valeur | Source |
| Surface sol | 6,2 m² | Relevé fourni |
| Faïence murale | 14 m² | Relevé fourni |
| Format sol | 60×60 | Brief / calepinage |
| Format mur | 30×60 | Brief / calepinage |
| Calepinage | Joints droits, validé interne | Entreprise |
| Demandes | Préparation support sol + plinthes | Brief client |

À vérifier :
| Point | Action |
| Nature et état du support | Visite / CR |
| Produits colle / joint (réf.) | Notice fabricant — ne pas inventer |
| Quantité de chutes | Calcul métier — interdit à l’IA |
| Étanchéité sous carrelage (si pièce d’eau) | Lot / CCTP — hors affirmation IA |
| Prix unitaires | Grille interne |`,
    donneesNecessaires: [
      'Relevé ou surfaces déjà mesurées',
      'Calepinage validé (ou indication « non fourni »)',
      'Formats et zones (sol / mur / plinthes)',
      'Notes de visite support si disponibles',
    ],
    controleHumain:
      'Le chargé d’affaires complète chutes, produits et prix ; aucune conformité DTU 52 ni compatibilité colle / support n’est affirmée par l’IA.',
  },
  prompts: [
    {
      title: 'Postes de préparation — à partir du relevé fourni',
      body: `Relevé / données validées : [COLLER].
Liste les postes de préparation possibles UNIQUEMENT si évoqués ou logiquement à questionner (support, protection, plinthes…).
Format : poste | données confirmées | à vérifier. Pas de quantités ni taux de chute inventés.`,
    },
    {
      title: 'Devis + fournitures — calepinage déjà établi',
      body: `Calepinage / formats / zones : [COLLER].
Structure devis (désignations) + liste fournitures à confirmer (carreaux, plinthes, profilés…).
Interdits : inventer chutes, PU, références produit absentes.`,
    },
    {
      title: 'Réserves — visite support ou réception',
      body: `Notes terrain : [NOTES].
CR : constats factuels, réserves, demandes aux autres lots, suites. Pas de conclusion de conformité.`,
    },
    {
      title: 'Questions lots — pentes / cloisons / niveaux',
      body: `Contexte : [TEXTE]. Liste de questions au plombier, plaquiste ou MOE. Ton professionnel.`,
    },
    {
      title: 'Extrait CCTP carrelage — exigences (questions)',
      body: `Extrait : [TEXTE]. Exigences citées + questions. Pas de conclusion de conformité au DTU 52.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote:
    '« On part du relevé et du calepinage déjà faits : l’IA aide à poser les postes et les réserves, pas à inventer les chutes. »',
  testimonialAttribution: 'Entreprise de carrelage — petite couronne (anonymisé)',
  faq: [
    {
      q: 'L’IA peut-elle calculer mes découpes ou mes chutes ?',
      a: `Non. Elle structure postes et listes à partir de vos données ; chutes et calepinage définitif restent métier.`,
    },
    {
      q: 'Faut-il coller tout le calepinage dans l’outil ?',
      a: `Préférez un extrait anonymisé (formats, zones, surfaces). Le calepinage graphique reste votre document de référence.`,
    },
    {
      q: 'DTU 52 : ChatGPT peut-il trancher sur une pose en pièce d’eau ?',
      a: `Non pour une décision technique : plan de lecture et questions uniquement ; validation sur fascicule et chantier.`,
    },
    {
      q: 'Lien avec plâtrerie ou isolation ?',
      a: `Pages distinctes : la plâtrerie (cloisons / doublages) est reliée en tête de page ; l’isolation (fiches produits et dossiers) est dans les métiers proches en bas de page — pas les mêmes usages documentaires.`,
    },
    ...faqStandard('carrelage'),
  ],
  courseName: 'Formation IA entreprise de carrelage — Qualiopi',
  courseDescription: `${OFC} : formation IA pour entreprises de carrelage — relevés, préparation, devis, réserves. Session catalogue — organisme certifié Qualiopi.`,
  courseTeaches: [
    'ChatGPT pour entreprises de carrelage',
    'Postes de préparation et devis',
    'Réserves et réception support',
    'Qualiopi',
  ],
  ogImage: { ...COVER, alt: 'Formation IA appliquée au bâtiment — carrelage' },
  coverImage: { ...COVER, alt: 'Entreprise de carrelage — formation IA' },
  showAuthorBio: true,
  authorBioClosingLine:
    'Elle forme les entreprises de carrelage sur des usages IA documentaires, sans substitution au contrôle chantier.',
  relatedMetierLinks: [
    {
      href: LINKS.formationIaIsolationBtp,
      title: 'Formation IA entreprise d’isolation',
      description: 'Fiches produits et dossiers chantier.',
    },
    {
      href: LINKS.formationPlombierBtp,
      title: 'Formation IA plombier BTP',
      description: 'Pièces d’eau et interfaces avant carrelage.',
    },
    {
      href: LINKS.formationIaPeintreBatiment,
      title: 'Formation IA peintre bâtiment',
      description: 'Finitions et reprises après pose.',
    },
  ],
  liensUtilesIntro: 'Métiers de finition proches, catalogue Qualiopi, financement, ressources IA BTP.',
  sisterEncart: {
    currentAudience: 'une entreprise de carrelage',
    href: LINKS.formationIaPlatrerieBtp,
    linkLabel: 'la page formation IA plâtrerie',
  },
};

export const FORMATION_IA_METIER_CHARPENTIER: FormationIaMetierBtpConfig = {
  id: 'charpentier',
  path: '/formation-ia-charpentier-btp',
  h1: 'Formation IA charpentier — bois, DTU 31 & Qualiopi',
  metaTitle: 'Formation IA charpentier — ossatures, coupes, DTU 31',
  metaDescription:
    'Formation IA charpentier BTP : nomenclatures, DTU 31 et mémoires plus rapides, sous contrôle métier. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  keywords: [
    'formation IA charpentier',
    'formation IA charpentier BTP',
    'ChatGPT charpente bois',
    'DTU 31',
    'mémoire technique charpente IA',
    'Qualiopi charpentier',
  ],
  metierNom: 'charpentiers',
  metierNomTitre: 'charpentier',
  normeRef: 'le DTU 31',
  problemParagraphs: [
    `Les charpentiers et monteurs bois enchaînent coupes, assemblages, levages et interfaces avec couverture et gros œuvre : le ${'`'}DTU 31${'`'}, les essences, traitements et plans de phasage nourrissent les mémoires et les réponses techniques.`,
    `Les dossiers « structure bois » demandent des libellés précis (sections, portées, fixations) : recopier sans méthode fait perdre des heures sur le bureau.`,
    `L’IA mal cadrée peut confondre sections ou types de connecteurs — d’où le cadre Qualiopi : brouillons + validation humaine.`,
    `L’objectif : gagner du temps sur la structure des écrits et des synthèses de réunion, sans remplacer le calcul de structure ni la lecture des plans.`,
  ],
  solutionIntro: `Vous travaillez sur nomenclatures, CR de réunion et plans de mémoire — avec des prompts adaptés au vocabulaire ossature, levage et coordination lots.`,
  casUsageConcrets: [
    'Proposer une structure de nomenclature bois (poteaux, pannes, fermettes) à partir de notes ou de listes fournisseur.',
    'Rédiger un compte rendu de réunion avec le couvreur ou le maçon sur interfaces et délais.',
    'Préparer une liste de questions au MOE si le CCTP bois est incomplet sur les charges ou les appuis.',
    'Monter un plan de mémoire technique pour une ossature ou une charpente traditionnelle (méthode, moyens, sécurité).',
    'Synthétiser un mail client sur un report de levage ou une réserve constatée — ton factuel.',
  ],
  prompts: [
    {
      title: 'Nomenclature charpente — structure de tableau (sans calcul RDM)',
      body: `Données : [LISTE ÉLÉMENTS ou extrait de nomenclature].
Propose STRUCTURE de tableau (colonnes + lignes types) pour reprise interne. Rappel : pas de dimensionnement structurel sans logiciel / BE.`,
    },
    {
      title: 'CR — coordination charpente / couverture',
      body: `Notes : [NOTES]. Compte rendu : décisions, interfaces, délais, points à vérifier sur plan.`,
    },
    {
      title: 'Questions MOE — CCTP structure bois',
      body: `Extrait : [TEXTE]. Liste de précisions à demander (charges, appuis, traitements). Pas de conclusion technique définitive.`,
    },
    {
      title: 'Mémoire technique — lot charpente (plan)',
      body: `Critères : [LISTE]. Plan (titres + bullets) : méthode, moyens, calendrier, coordination, sécurité.`,
    },
    {
      title: 'Mail client — report ou réserve levage',
      body: `Faits : [LISTE]. Mail neutre : constats, causes possibles à qualifier, prochaines étapes — sans reconnaissance hors contrat.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote: '« Les plans de mémoire et les CR avec la couverture sont plus clairs depuis qu’on structure les prompts. »',
  testimonialAttribution: 'Charpentier — 91 (anonymisé)',
  faq: [
    {
      q: 'L’IA peut-elle dimensionner les sections de bois ou les portées ?',
      a: `Non : le dimensionnement relève du bureau d’études et des outils habilités. L’IA aide à structurer des listes et des questions.`,
    },
    {
      q: 'Comment éviter les erreurs sur les traitements et essences ?',
      a: `Toujours partir des notices et du CCTP — l’IA ne substitue pas la fiche produit ni l’avis technique.`,
    },
    {
      q: 'DTU 31 : puis-je copier des paragraphes depuis ChatGPT ?',
      a: `Non sans vérification : le fascicule fait foi ; l’IA peut proposer un sommaire ou des formulations à valider.`,
    },
    ...faqStandard('charpentier'),
  ],
  courseName: 'Formation IA charpentier BTP — Qualiopi',
  courseDescription: `${OFC} : formation IA pour charpentiers — DTU 31, mémoires, coordination. Session 4 h — organisme certifié Qualiopi, Constructys.`,
  courseTeaches: ['ChatGPT pour charpentiers BTP', 'DTU 31', 'Mémoires et nomenclatures', 'Qualiopi'],
  ogImage: { ...COVER, alt: 'Formation IA pour le BTP — charpente bois' },
  coverImage: { ...COVER, alt: 'Charpentier — formation IA' },
  showAuthorBio: true,
  authorBioClosingLine: 'Elle accompagne les équipes charpente et ossature bois sur une IA utile au bureau et au chantier.',
  relatedMetierLinks: [
    { href: LINKS.formationIaCouvreurBtp, title: 'Formation IA couvreur zingueur', description: 'Interface toiture après structure.' },
    { href: LINKS.formationIaMaconBtp, title: 'Formation IA maçon BTP', description: 'Appuis, plots et reprises gros œuvre.' },
    {
      href: LINKS.formationIaMetallerieSerrurerieBtp,
      title: 'Formation IA métallerie & serrurerie',
      description: 'Ouvrages métalliques — coordination second œuvre.',
    },
  ],
  liensUtilesIntro: 'Métiers proches, catalogue, Claude AI BTP, financement, blog.',
  sisterEncart: {
    currentAudience: 'une entreprise de charpente / ossature',
    href: LINKS.formationIaMenuisierBtp,
    linkLabel: 'la page formation IA menuiserie & agencement',
  },
};

export const FORMATION_IA_METIER_ASSISTANTE: FormationIaMetierBtpConfig = {
  id: 'assistante',
  path: '/formation-ia-assistante-btp',
  h1: 'Formation IA assistante administrative BTP — courriers, suivi & Qualiopi',
  metaTitle: 'Formation IA assistante administrative BTP — relances, dossiers',
  metaDescription:
    'Formation IA assistante administrative BTP : courriers, relances, facturation, suivi chantier, classement, coordination. Qualiopi, Constructys.',
  keywords: [
    'formation IA assistante administrative BTP',
    'formation IA secrétariat BTP',
    'ChatGPT assistant administratif chantier',
    'relances factures BTP IA',
    'Qualiopi assistante administrative',
  ],
  metierNom: 'assistantes administratives',
  metierNomTitre: 'assistante administrative',
  normeRef: 'la chaîne documentaire et la facturation',
  problemParagraphs: [
    `Dans les PME du bâtiment, les fonctions support enchaînent factures, relances, courriers fournisseurs, dossiers administratifs chantier et mails aux équipes : tout doit rester traçable sans noyer les conducteurs sous la paperasse.`,
    `Les demandes se multiplient (compléments AO, attestations, planning de livraisons) pendant que les délais chantier restent tendus — sans méthode, la rédaction mange le soir et le week-end.`,
    `L’IA mal utilisée peut inventer des mentions légales ou des formulations contractuelles : la formation encadre anonymisation, relecture et séparation « brouillon / envoi officiel ».`,
    `L’objectif : gagner du temps sur la structure des textes et des tableaux de suivi, en gardant la validation sur les obligations légales et la politique interne.`,
  ],
  solutionIntro: `Vous apprenez à produire des brouillons de courriers, de plans de relance et de synthèses de dossiers à partir de notes — avec validation direction ou expert-comptable selon le sujet.`,
  casUsageConcrets: [
    'Structurer un plan de relance clients / fournisseurs (jalons, tons, canaux) à partir d’une liste d’impayés ou de retards.',
    'Transformer des notes de réunion chantier en compte rendu propre pour direction ou client.',
    'Préparer une check-list de pièces pour un dossier administratif (AO, assurance, demande de complément).',
    'Rédiger un mail type pour demander une date ferme de livraison ou une preuve de dépôt.',
    'Mettre en forme un tableau de suivi chantiers (jalons, facturation, points bloquants) à partir de données saisies par vos soins.',
  ],
  prompts: [
    {
      title: 'Plan de relance — impayés et retards (structure)',
      body: `Données : [TABLEAU clients, montants, dates, relances déjà faites].
Propose un plan (jalons j0, j+10…) et des intitulés de mails par étape — sans engagement juridique automatique. Rappel : validation interne avant envoi.`,
    },
    {
      title: 'CR réunion — notes brutes vers compte rendu',
      body: `Notes : [NOTES]. Compte rendu : participants, décisions, actions, responsables, prochaine date.`,
    },
    {
      title: 'Mail fournisseur — retard de livraison',
      body: `Contexte : [COMMANDE, date promise, impact chantier]. Mail ferme et cordial, demande de date ferme et justificatif.`,
    },
    {
      title: 'Check-list — dossier administratif chantier',
      body: `Type de dossier : [AO / assurance / autre]. Liste des pièces souvent demandées et cases à cocher — à adapter à votre entreprise.`,
    },
    {
      title: 'Synthèse hebdo — suivi multi-chantiers (tableau)',
      body: `Données saisies : [LISTE chantiers, statuts, facturation]. Propose un tableau lisible + 5 alertes à traiter en priorité — chiffres fournis par vous uniquement.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote: '« Les relances et les comptes rendus partent plus vite — on relit toujours avant signature ou envoi client. »',
  testimonialAttribution: 'Assistante administrative — PME BTP IDF (anonymisé)',
  faq: [
    {
      q: 'ChatGPT peut-il rédiger mes factures conformes (mentions légales, TVA) ?',
      a: `Pour un rappel de structure oui — pour les obligations exactes et la conformité, validez avec votre logiciel certifié ou votre expert-comptable.`,
    },
    {
      q: 'Comment gérer les données personnelles et les plans dans les prompts ?',
      a: `Anonymisez, utilisez des extraits, et des offres professionnelles adaptées — c’est un point central des sessions ${OFC}.`,
    },
    {
      q: 'La formation est-elle adaptée si je ne suis pas sur le terrain ?',
      a: `Oui : les exemples ciblent l’administratif de chantier et de bureau d’entreprise BTP (courriers, suivi, coordination).`,
    },
    ...faqStandard('assistante administrative'),
  ],
  courseName: 'Formation IA assistante administrative BTP — Qualiopi',
  courseDescription: `${OFC} : formation IA pour assistantes administratives du BTP — courriers, relances, suivi, dossiers. Session 4 h — organisme certifié Qualiopi, Constructys.`,
  courseTeaches: [
    'ChatGPT pour assistantes administratives BTP',
    'Courriers et relances (relecture humaine)',
    'Suivi chantier et tableaux',
    'Qualiopi — confidentialité',
  ],
  ogImage: { ...COVER, alt: 'Formation IA pour les pros du BTP — assistante administrative' },
  coverImage: { ...COVER, alt: 'Administratif BTP — formation IA' },
  showAuthorBio: true,
  authorBioClosingLine: 'Elle forme les fonctions support des entreprises du bâtiment sur une IA utile au quotidien, sans remplacer la validation métier.',
  relatedMetierLinks: [
    { href: '/formation-ia-charge-affaires-btp', title: 'Formation IA chargé d’affaires BTP', description: 'Appels d’offres et suivi commercial.' },
    { href: LINKS.formationConducteurTravaux, title: 'Guide IA conducteur de travaux BTP', description: 'Pilotage de chantier et documentation.' },
    { href: '/formation-ia-dirigeant-pme-btp', title: 'Formation IA dirigeant BTP', description: 'Pilotage et déploiement IA en entreprise.' },
  ],
  liensUtilesIntro: 'Métiers proches, catalogue Qualiopi, Claude AI BTP, financement, blog.',
};

