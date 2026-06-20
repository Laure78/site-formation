/**
 * Landings « formation IA pour le BTP » par métier — contenu + métadonnées + FAQ + teaches (Course JSON-LD).
 */
import { CSFE_NOM_LIBRE } from '@/lib/csfe';
import { SITE_CONFIG } from '@/lib/seo';
import { createPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import type { FormationIaMetierBtpConfig } from '@/lib/formation-ia-metier-btp-types';

export type { FormationIaMetierBtpConfig } from '@/lib/formation-ia-metier-btp-types';

const OFC = "OFC Création d'Entreprise";

export function formationIaMetierBtpMetadata(config: FormationIaMetierBtpConfig): Metadata {
  return createPageMetadata({
    title: config.metaTitle,
    description: config.metaDescription,
    path: config.path,
    keywords: config.keywords,
    appendAuthorSuffix: false,
    openGraphType: 'article',
    article: {
      publishedTime: '2026-04-16',
      modifiedTime: '2026-04-16',
      author: SITE_CONFIG.name,
      section: 'Formation IA pour les pro du BTP par métier',
    },
    image: config.ogImage ?? {
      url: '/images/laure-olivie-formatrice.png',
      width: 1200,
      height: 630,
      alt: `Formation IA appliquée au bâtiment ${config.metierNomTitre} — Qualiopi, Laure Olivié`,
    },
  });
}

/** Étancheur — angle CSFE + DTU 43 + vocabulaire produits (Soprema, Siplast, Axter cités sans préférence) */
export const FORMATION_IA_METIER_ETANCHEUR: FormationIaMetierBtpConfig = {
  id: 'etancheur',
  path: '/formation-ia-etancheur-btp',
  h1: 'Formation IA étancheur BTP — ChatGPT, CSFE & Qualiopi',
  metaTitle: 'Formation IA étancheur BTP — ChatGPT étanchéité, IA bardage, CSFE',
  metaDescription:
    'Formation IA étancheur BTP : ChatGPT pour l’étanchéité bitumineuse (SEL, SBS), membranes EPDM, relevés, bardage. Laure Olivié a formé la CSFE. Mémoires, DTU 43, AO. Qualiopi, Constructys.',
  keywords: [
    'formation IA étancheur BTP',
    'ChatGPT étanchéité',
    'IA bardage',
    'formation IA CSFE',
    'DTU 43',
    'mémoire technique étanchéité',
    'Qualiopi étancheur',
    'Constructys BTP',
  ],
  metierNom: 'étancheurs',
  metierNomTitre: 'étancheur',
  normeRef: 'le DTU 43',
  essentielItems: [
    'DTU 43, étanchéité bitumineuse (SEL, SBS), membranes EPDM, relevés et bardage — mémoires, CCTP et PPSPS.',
    'Partenariat CSFE : Laure Olivié a formé les équipes du réseau étanchéité — cas d’usage alignés sur le terrain.',
    'Session 4 h Qualiopi : brouillons encadrés, relecture humaine — l’IA ne tranche pas la conformité normative.',
    'Financement Constructys selon éligibilité — présentiel Île-de-France, validation chef de travaux ou dirigeant.',
  ],
  problemParagraphs: [
    `Les entreprises d’étanchéité jonglent entre chantier et bureau : mémoires techniques qui citent le ${'`'}DTU 43${'`'} et les avis techniques (CSTB, systèmes), plans de prévention (PPSPS) alignés sur les interfaces avec le gros œuvre et le second œuvre, comptes rendus après intempéries, relances et courriers pour les réserves. Le vocabulaire métier est dense : étanchéité bitumineuse (feutres SEL, SBS), membranes synthétiques type EPDM, relevés, platines, chéneaux, points singuliers — chaque dossier doit rester précis.`,
    `Chaque pièce mobilise des prescriptions lourdes : CCTP étanchéité, notices fabricants (Soprema, Siplast, Axter sont des marques couramment rencontrées sur les chantiers — sans ordre de préférence), plans de détail. Sans méthode, l’équipe recopie ou éparpille les brouillons dans des fils de mails.`,
    `Les marchés publics et bardage / second œuvre exigent des écrits clairs : une IA mal cadrée produit du texte « lisse » mais faux sur un détail de nappe ou de fixation. La formation Qualiopi apprend à poser le cadre : sources, relecture humaine, texte jamais envoyé sans validation.`,
    `Le temps perdu le soir sur Word se traduit par moins de réponses aux appels d’offres. Les sessions ${OFC} visent à récupérer plusieurs heures par semaine sur la structuration et la reformulation, sans compromettre le référentiel technique.`,
  ],
  solutionIntro: `La formation « L’IA au service du bâtiment » (et modules du catalogue) s’adapte aux cas étanchéité et toiture-terrasse : vous importez vos contraintes réelles (végétalisée, infrastructure, bardage) et vous apprenez à produire des brouillons exploitables — tableaux de risques, listes de contrôles, plans de mémoire — avec validation par le chef de travaux ou le dirigeant.`,
  prompts: [
    {
      title: 'Analyse CCTP — exigences étanchéité (lot courants / points singuliers)',
      body: `Voici un extrait de CCTP étanchéité (texte) : [COLLEZ L’EXTRAIT].
Liste les exigences par sous-partie : performances, interfaces avec autres corps, essais, relevés, platines, chéneaux, essais d’étanchéité. Sous chaque point ambigu, propose 2–3 questions à poser au maître d’œuvre. Rappel : ne pas conclure sur la conformité — validation sur fascicule DTU 43.x et avis techniques.`,
    },
    {
      title: 'Devis et méthode — toiture-terrasse (ordre de grandeur)',
      body: `Tu es chef de projet étanchéité en France. Données : surface [X] m², relevés [H] cm, périmètre [P] ml, type de système [bitume SBS/APP, EPDM, résine — préciser], points singuliers [liste].
Propose UNIQUEMENT un ordre de grandeur des postes (m², ml, taux de chutes indicatif 10–15 %), un tableau des vérifications à faire sur plan, et les lignes à compléter avec nos prix internes. Rappelle : croiser CCTP, DTU 43.x et notices fabricants (ex. gammes du type Soprema, Siplast, Axter selon le marché — sans recommander une marque).`,
    },
    {
      title: 'Mémoire technique — appel d’offres bardage / étanchéité associée',
      body: `Marché public : lot bardage ou enveloppe avec interface étanchéité. Critères notés : [LISTE]. Mon entreprise : [taille, moyens, références anonymisées].
Propose un plan de mémoire technique (titres + 2 bullets par titre) : méthode d’exécution, coordination avec l’étanchéité, sécurité, délais, environnement. Reformuler sans copier le CCAP. Prévoir une section interfaces relevés / platines si le CCTP l’exige.`,
    },
    {
      title: 'Compte rendu de visite étanchéité (humide / réserves)',
      body: `Rédige un compte rendu professionnel à partir de ces notes brutes : [NOTES].
Structure : contexte chantier, observations par zone, réserves factuelles, demandes de précisions MOE, prochaines étapes. Ton sec. Ne pas inventer de références normatives : [à compléter] si besoin.`,
    },
    {
      title: 'PPSPS — structure (lot étanchéité / hauteur)',
      body: `Périmètre : [TYPE DE CHANTIER, durée, effectifs]. Propose une structure de PPSPS (titres) adaptée au lot étanchéité : produits, feu, hauteur, coordination. Je compléterai avec les données réelles et l’OPPBTP.`,
    },
  ],
  csfePartnership: true,
  testimonialQuote: `Le partenariat entre la ${CSFE_NOM_LIBRE} et ${OFC} vise à rendre accessibles des usages d’IA utiles au quotidien des étanchéistes — sans jamais se substituer aux référentiels techniques et à la validation sur le terrain. La priorité reste la sécurité des ouvrages et la lisibilité des dossiers pour nos adhérents.`,
  testimonialAttribution: `${CSFE_NOM_LIBRE} — message de cadre partenarial pédagogique (OFC partenaire formation)`,
  faq: [
    {
      q: 'ChatGPT connaît-il la DTU 43 et le vocabulaire étanchéité (SEL, SBS, EPDM) ?',
      a: `Non de façon fiable pour trancher seul : il peut proposer une structure ou un plan de lecture, mais il hallucine sur les paragraphes, versions et exceptions. Travaillez avec le fascicule officiel, les avis techniques CSTB et les notices des systèmes (bitumineux SEL/SBS, membranes EPDM, etc.). L’IA sert à structurer vos brouillons — la conformité reste votre responsabilité.`,
    },
    {
      q: 'Comment utiliser ChatGPT pour l’étanchéité et l’IA bardage sur un même dossier ?',
      a: `En séparant les lots dans vos prompts : interfaces entre bardage et étanchéité (relevés, platines, solins), planning de coordination et questions MOE. L’IA aide à lister les points à clarifier ; elle ne remplace pas la lecture du CCTP ni le choix des systèmes validés par avis.`,
    },
    {
      q: 'Laure Olivié a-t-elle formé la CSFE (Chambre syndicale française de l’étanchéité) ?',
      a: `Oui : des sessions de formation IA ont été dispensées pour les équipes et le réseau ${CSFE_NOM_LIBRE}, ce qui renforce la cohérence des exemples avec les enjeux des étanchéistes — le dispositif reste certifié Qualiopi et les validations techniques en entreprise.`,
    },
    {
      q: 'Mes données chantier (plans, relevés) sont-elles sécurisées avec ChatGPT ?',
      a: `Évitez les plans nominatifs complets et les montants dans un outil grand public sans cadre entreprise. Utilisez des extraits anonymisés, ChatGPT Team / offres sans entraînement, ou des solutions européennes — c’est détaillé en formation ${OFC}.`,
    },
    {
      q: 'En quoi le partenariat CSFE et la formation IA CSFE sur cette page sont-ils liés ?',
      a: `Le partenariat permet d’aligner les cas d’usage sur la réalité des adhérents (documentation, marchés publics, étanchéité bitumineuse et synthétique). La formation proposée ici est la même offre Qualiopi ${OFC}, avec un angle métier étancheur — pas un cours « CSFE » distinct, mais un contenu cohérent avec le réseau professionnel.`,
    },
    {
      q: 'Soprema, Siplast ou Axter : l’IA peut-elle choisir la bonne gamme ?',
      a: `Non : les choix de systèmes et de gammes relèvent du bureau d’études, des avis techniques et de votre entreprise. L’IA peut aider à structurer un comparatif de critères ou des questions à poser au fabricant — jamais à substituer la notice ou l’avis CSTB.`,
    },
  ],
  courseName: 'Formation IA étancheur BTP — partenariat CSFE, Qualiopi',
  courseDescription: `${OFC} : formation IA et ChatGPT pour étancheurs — mémoires techniques, DTU 43, bardage, relevés, CCTP. Interventions auprès de ${CSFE_NOM_LIBRE}. Session 4 h, Qualiopi, financement possible selon éligibilité. Île-de-France et France.`,
  courseTeaches: [
    'ChatGPT pour étancheurs BTP',
    'Méthodes IA et DTU 43 (relecture humaine)',
    'Mémoires techniques, CCTP étanchéité et interfaces bardage',
    'Comptes rendus et PPSPS (structuration)',
    'Avis techniques CSTB — usage assisté',
    'Qualiopi — confidentialité des données chantier',
  ],
  ogImage: {
    url: '/images/formation-ia-etancheur-btp-og.png',
    width: 1200,
    height: 630,
    alt: 'Étanchéité sur toiture-terrasse — formation IA pour le BTP Laure Olivié',
  },
  coverImage: {
    url: '/images/formation-ia-etancheur-btp-og.png',
    width: 1200,
    height: 630,
    alt: 'Technicien en étanchéité sur toiture-terrasse — contexte formation IA pour les pro du BTP',
  },
  showAuthorBio: true,
  authorBioClosingLine:
    'Basée en Île-de-France, elle intervient notamment auprès des équipes étanchéité et du réseau CSFE (partenariat).',
  relatedMetierLinks: [
    {
      href: '/formation-ia-couvreur-btp',
      title: 'Formation IA couvreur zingueur',
      description: 'Toiture, zinguerie et interfaces avec l’étanchéité.',
    },
    {
      href: '/formation-ia-macon-btp',
      title: 'Formation IA maçon BTP',
      description: 'Gros œuvre, dalles et relevés avant systèmes d’étanchéité.',
    },
    {
      href: '/formation-ia-charpentier-btp',
      title: 'Formation IA charpentier BTP',
      description: 'Structure bois et coordination avec l’enveloppe.',
    },
  ],
  liensUtilesIntro:
    'Métiers proches (couverture, gros œuvre, charpente), catalogue Qualiopi, Claude AI BTP, financement, blog.',
};

/** Électricien — NF C 15-100, tableautage, marques Schneider / Legrand / Hager (sans préférence) */
export const FORMATION_IA_METIER_ELECTRICIEN: FormationIaMetierBtpConfig = {
  id: 'electricien',
  path: '/formation-ia-electricien-btp',
  h1: 'Formation IA électricien BTP — ChatGPT, NF C 15-100 & Qualiopi',
  metaTitle: 'Formation IA électricien BTP — ChatGPT, tableau, CONSUEL',
  metaDescription:
    'Formation IA électricien BTP : devis tableau, calcul de puissance, rapport CONSUEL, mémoire AO installation électrique. NF C 15-100, DPE, domotique. Qualiopi, Constructys.',
  keywords: [
    'formation IA électricien BTP',
    'ChatGPT électricien',
    'NF C 15-100 IA',
    'devis tableau électrique',
    'rapport CONSUEL',
    'mémoire technique électricité BTP',
    'Qualiopi électricien',
  ],
  metierNom: 'électriciens',
  metierNomTitre: 'électricien',
  normeRef: 'la NF C 15-100',
  problemParagraphs: [
    `Les entreprises d’électricité jonglent entre tableautage, câblage, VMC et domotique : chaque dossier mobilise le tableau électrique, les disjoncteurs, les différentiels, parfois la rénovation énergétique et le DPE en contexte. La norme ${'`'}NF C 15-100${'`'} impose rigueur et traçabilité ; les notices des fabricants (Schneider Electric, Legrand, Hager — marques fréquentes sur le marché, citées sans ordre de préférence) complètent le CCTP.`,
    `Le temps part aussi en rédaction : comptes rendus après visite technique électrique, relances SAV pour un défaut de réglage ou une mise aux normes incomplète, courriers pour le CONSUEL ou synthèses avant passage du contrôle. Sans méthode, on reformule tard le soir les mêmes paragraphes.`,
    `Les appels d’offres sur l’installation électrique (second œuvre, tertiaire, logement) demandent des mémoires clairs sur la méthode, le câblage et la coordination — l’IA mal utilisée invente des références ou des sections de câbles : la formation Qualiopi encadre prompts, relecture et confidentialité.`,
    `L’objectif des sessions ${OFC} est de gagner plusieurs heures par semaine sur la structure des documents (devis, rapports, mémoires), pas de remplacer le calcul de puissance, le choix des protections ou la validation par une personne compétente.`,
  ],
  solutionIntro: `Les sessions combinent démonstration et ateliers sur vos cas (anonymisés). Vous apprenez à produire des brouillons pour devis de tableau électrique, listes de grandeurs pour dimensionnement, structure de rapport CONSUEL ou de dossier de conformité — toujours avec validation métier. Cas d’usage fréquents : rédiger un compte rendu après visite technique à partir de notes brutes ; envoyer une relance client SAV (ton ferme, rappel des mesures, prochaines étapes) sans copier-coller un modèle obsolète.`,
  prompts: [
    {
      title: 'Devis — rénovation / création de tableau électrique (postes)',
      body: `Tu es électricien qualifié en France. À partir de : type de local [résidentiel / tertiaire], nombre de rangées [N], circuits [éclairage, prises, VMC, domotique], niveau de rénovation [partielle / complète].
Propose la STRUCTURE détaillée d’un devis (intitulés de postes, pas les prix) : tableau, disjoncteurs, différentiels, répartition des circuits, points à clarifier avec le client. Rappelle de croiser la NF C 15-100 et les fiches techniques des matériels (gammes type Schneider, Legrand, Hager selon votre choix d’entreprise — sans recommander une marque). Ne pas inventer de sections de câbles ni de calibres définitifs : indiquer [à dimensionner par le BE].`,
    },
    {
      title: 'Calcul de puissance — liste des entrées et vérifications (sans chiffrer à votre place)',
      body: `Contexte : [DÉCRIRE INSTALLATION : usages, puissances souscrites ou à estimer, présence triphasé oui/non].
Sans donner de verdict définitif, liste les grandeurs à renseigner pour un calcul de puissance et un choix de protections (courants, simultanéité, sources, selectivity). Format tableau : donnée / source habituelle / risque si omis. Terminer par : quels outils ou documents internes utiliser pour le calcul final (logiciel, NF C 15-100).`,
    },
    {
      title: 'Rapport / dossier type CONSUEL — structure de brouillon',
      body: `Je prépare un dossier pour instruction type CONSUEL (extrait anonymisé). Données : [LISTE : schéma, plans, photos, mesures].
Propose un plan de rapport (titres + sous-parties) : identification de l’installation, tableautage, principes de protection, mesures essentielles, réserves éventuelles. Rappel : toute valeur et toute conformité sont validées sur place et par le référentiel — l’IA ne signe pas le dossier.`,
    },
    {
      title: 'Mémoire technique — appel d’offres installation électrique',
      body: `Critères du CCAP / CCTP notés : [LISTE]. Notre entreprise : [TAILLE, qualifications, références anonymisées].
Rédige un plan de mémoire technique (titres + 2 bullets par titre) : méthode de câblage et tableautage, coordination avec autres lots, sécurité, planning, ressources. Pas de copier-coller du règlement de consultation. Vocabulaire : tableau, câblage, NF C 15-100, essais.`,
    },
    {
      title: 'Compte rendu après visite technique électrique',
      body: `Notes de visite brutes : [NOTES : constats, mesures, photos mentionnées].
Rédige un CR professionnel : contexte, observations par zone ou par tableau, écarts éventuels par rapport au descriptif, recommandations en termes généraux, suite proposée (devis séparé, intervention, etc.). Ton factuel, sans attribuer de faute sans preuve. Ne pas inventer de références normatives : [à compléter] si besoin.`,
    },
    {
      title: 'Relance client — SAV électrique (délai, clarté, ton)',
      body: `Situation : [PROBLÈME SIGNALÉ], historique : [COURT], action déjà faite : [LISTE].
Rédige un mail de relance pour client [particulier / pro] : rappel du contexte, ce qui a été fait, ce qui reste à planifier, délai de réponse souhaité. Ton courtois mais ferme. Ajouter une phrase de rappel sur la nécessité d’accès ou de validation selon NF C 15-100 pour toute modification.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote:
    '« Les premiers jets de mémoire et les CR de visite sortent beaucoup plus vite — le dimensionnement et le CONSUEL, ça reste notre validation. »',
  testimonialAttribution: 'Gérant PME électricité — petite couronne (retour OFC, anonymisé)',
  faq: [
    {
      q: 'ChatGPT peut-il appliquer la NF C 15-100 à la place de mon équipe ?',
      a: `Non : la norme et les calculs de courants, sections et protections relèvent de votre qualification et de vos outils. L’IA peut structurer des listes de contrôle, des questions à trancher et des brouillons de courriers — jamais remplacer la lecture des fascicules et la signature du dossier.`,
    },
    {
      q: 'Comment utiliser l’IA pour un rapport CONSUEL ou un dossier de conformité ?',
      a: `Pour organiser les pièces, titrer les sections et reformuler vos constats à partir de notes — pas pour inventer des mesures ou des conclusions réglementaires. Vous validez chaque donnée avant envoi.`,
    },
    {
      q: 'Schneider, Legrand ou Hager : l’IA choisit-elle la bonne gamme ?',
      a: `Non : ce sont des marques courantes ; le choix dépend du marché, des agréments et de votre politique d’achats. L’IA peut aider à comparer des critères génériques ou à rédiger des questions au distributeur — pas à substituer la notice ou le bureau d’études.`,
    },
    {
      q: 'Mes données clients et plans de tableau sont-elles protégées dans ChatGPT ?',
      a: `Évitez les plans nominatifs complets dans un outil grand public sans cadre entreprise. Anonymisez, utilisez des extraits, ou des offres professionnelles sans entraînement — c’est enseigné en formation ${OFC}.`,
    },
    {
      q: 'La formation IA électricien BTP est-elle financement possible selon éligibilité ?',
      a: `Oui selon éligibilité et dossier : ${OFC} est certifié Qualiopi ; le financement OPCO Constructys suit les règles en vigueur pour les entreprises du BTP.`,
    },
    {
      q: 'Quelle différence avec la formation « IA au service du bâtiment » (BTP-01) ?',
      a: `BTP-01 pose les bases ; cette page métier aligne exemples et prompts sur le tableau, le câblage, le CONSUEL et les AO installation électrique. Les deux se complètent.`,
    },
  ],
  courseName: 'Formation IA électricien BTP — NF C 15-100, Qualiopi',
  courseDescription: `${OFC} : formation IA et ChatGPT pour électriciens du BTP — devis tableautage, puissance, rapports, mémoires AO, CR et SAV. Référence NF C 15-100. Session 4 h, Qualiopi, financement possible selon éligibilité.`,
  courseTeaches: [
    'ChatGPT pour électriciens BTP',
    'Devis et descriptifs tableautage (relecture humaine)',
    'NF C 15-100 — usage documentaire assisté',
    'Dossiers type CONSUEL / conformité (structure)',
    'Mémoires techniques installation électrique',
    'Qualiopi — confidentialité des données',
  ],
  ogImage: {
    url: '/images/formation-ia-electricien-btp.png',
    width: 1024,
    height: 682,
    alt: 'Formation IA appliquée au bâtiment — électriciens, session avec Laure Olivié',
  },
  coverImage: {
    url: '/images/formation-ia-electricien-btp.png',
    width: 1024,
    height: 682,
    alt: 'Électriciens en formation — tableau et installation BTP',
  },
  showAuthorBio: true,
  authorBioClosingLine:
    'Basée en Île-de-France, elle accompagne notamment les équipes installation électrique et les directions d’entreprise du BTP.',
  relatedMetierLinks: [
    {
      href: '/formation-ia-plombier-btp',
      title: 'Formation IA plombier BTP',
      description: 'Devis sanitaire, DTU 60, SAV — même démarche IA encadrée Qualiopi.',
    },
    {
      href: '/formation-ia-dirigeant-btp',
      title: 'Formation IA dirigeant BTP',
      description: 'ROI, pilotage projet IA et déploiement équipes pour décideurs PME bâtiment.',
    },
    {
      href: '/formation-ia-assistante-administrative-btp',
      title: 'Formation IA assistante administrative BTP',
      description: 'Courriers, relances et productivité administrative au service des chantiers.',
    },
  ],
  liensUtilesIntro:
    'Formations par métier proches, catalogue Qualiopi et ressources pour aller plus loin sur l’IA dans le BTP.',
};

export {
  FORMATION_IA_METIER_ASSISTANTE,
  FORMATION_IA_METIER_CARRELEUR,
  FORMATION_IA_METIER_CHARPENTIER,
  FORMATION_IA_METIER_COUVREUR,
  FORMATION_IA_METIER_MACON,
  FORMATION_IA_METIER_MENUISIER,
  FORMATION_IA_METIER_PEINTRE,
  FORMATION_IA_METIER_PLAQUISTE,
} from './formation-ia-metier-eight-rich';

/** Page dynamique : `app/formation-ia-[metier]-btp` — slugs additionnels dans `lib/formation-ia-metier-dynamic-registry`. */

/** Plombier chauffagiste — PER, cuivre, DTU 60.11, MaPrimeRénov’ / CEE (2026) */
export const FORMATION_IA_METIER_PLOMBIER: FormationIaMetierBtpConfig = {
  id: 'plombier',
  path: '/formation-ia-plombier-btp',
  h1: 'Formation IA plombier chauffagiste — ChatGPT, DTU 60.11 & Qualiopi',
  metaTitle: 'Formation IA plombier chauffagiste — BTP, Qualiopi',
  metaDescription:
    'Formation IA plombier chauffagiste : devis salle de bain, chaudière, évacuation, PER, cuivre, VMC double flux, PAC. Aides MaPrimeRénov’, CEE — brouillons encadrés. Qualiopi, Constructys.',
  keywords: [
    'formation IA plombier chauffagiste',
    'formation IA plombier BTP',
    'ChatGPT plomberie chauffage',
    'DTU 60.11',
    'MaPrimeRénov IA',
    'certificats économie énergie CEE',
    'devis sanitaire IA',
    'Qualiopi plombier',
  ],
  metierNom: 'plombiers chauffagistes',
  metierNomTitre: 'plombier',
  normeRef: 'le DTU 60.11 et prescriptions sanitaires',
  essentielItems: [
    'DTU 60.11, PER ou cuivre, évacuations, VMC double flux, chaudières et PAC — devis et rapports de dépannage.',
    'Dossiers 2026 MaPrimeRénov’ et CEE : l’IA structure brouillons et listes de pièces, pas l’éligibilité ni les montants.',
    'Session 4 h Qualiopi : prompts, relecture humaine, confidentialité — validation technique sur le terrain.',
    'Financement Constructys selon éligibilité — présentiel Île-de-France, ateliers sur vos cas anonymisés.',
  ],
  problemParagraphs: [
    `Les entreprises de plomberie-chauffage enchaînent salle de bains, réseaux PER ou cuivre, évacuations, raccordements VMC double flux, chaudières à condensation et pompes à chaleur. Chaque dossier mobilise le ${'`'}DTU 60.11${'`'} (et fascicules associés), des notices fabricants et parfois des exigences DPE ou de rénovation énergétique — sans compter les courriers pour les aides et attestations.`,
    `En 2026, les dossiers clients mêlent devis détaillés, relances SAV, comptes rendus de dépannage et demandes de précisions sur ${'`'}MaPrimeRénov’${'`'}, primes CEE ou éligibilité : l’IA peut aider à structurer des brouillons et des listes de pièces à fournir, jamais à substituer le conseiller financement, le décret en vigueur ou votre responsabilité sur la conformité.`,
    `Sans méthode, on réécrit tard le soir les mêmes paragraphes sur diamètres d’évacuation, pentes ou matériaux — l’IA mal cadrée invente des références ou des montants d’aides. La formation Qualiopi encadre : prompts, relecture humaine, règles de confidentialité.`,
    `L’objectif des sessions ${OFC} est de gagner du temps sur la mise en forme (devis, rapports, mails) tout en gardant la validation technique sur le terrain et dans les tableaux de vos logiciels.`,
  ],
  solutionIntro: `Les sessions combinent démonstration et ateliers sur vos cas (anonymisés). Vous apprenez à produire des brouillons pour devis salle de bain, projets chaudière / PAC, rapports de dépannage et synthèses d’évacuation — toujours avec validation métier. Spécificité 2026 : l’expertise documentaire assistée pour les dossiers liés aux aides MaPrimeRénov’ et aux opérations relevant des certificats d’économie d’énergie (CEE) : l’IA aide à lister les formulations types, pièces jointes et questions à poser à un interlocuteur habilité — pas à garantir une éligibilité ou un montant.`,
  prompts: [
    {
      title: 'Devis — rénovation salle de bain complète (postes)',
      body: `Tu es plombier chauffagiste en France. Données : surface [X] m², remplacement baignoire/douche, meuble, robinetterie, évacuation existante [PER / cuivre / à préciser], présence VMC [simple flux / double flux / à créer].
Propose la STRUCTURE détaillée d’un devis (intitulés de postes, pas les prix) : dépose, alimentation, évacuation, étanchéité, raccordements, essais. Rappelle de croiser le DTU 60.11 et les fiches fabricants. Ne pas inventer de diamètres définitifs : [à dimensionner].`,
    },
    {
      title: 'Devis — remplacement chaudière / PAC, mentions crédit d’impôt et aides (cadre)',
      body: `Contexte : [type de logement], équipement cible [chaudière condensation / PAC air-eau], travaux associés [liste].
Rédige la STRUCTURE d’un devis (sections + libellés) avec emplacements pour : description technique, options, délais, garanties. Ajoute un encadré « informations réglementaires et aides » avec formulations génériques invitant le client à vérifier auprès de l’administration ou de son conseiller MaPrimeRénov’ / opérateur CEE, sans chiffrer de prime ni d’éligibilité. Rappel : les montants et conditions 2026 sont hors périmètre du modèle.`,
    },
    {
      title: 'Rapport de dépannage (intervention)',
      body: `Notes brutes : [NOTES : symptômes, constats, mesures, pièces changées].
Rédige un rapport professionnel : contexte, diagnostic, interventions réalisées, pièces, essais, recommandations, suites éventuelles (devis séparé). Ton factuel. Ne pas attribuer de faute sans élément. Si une norme est citée sans référence : [à compléter].`,
    },
    {
      title: 'Calcul / dimensionnement — évacuation (liste des entrées à vérifier)',
      body: `Sans donner un dimensionnement définitif, à partir de : [débit équipements, longueurs, pentes], liste les grandeurs à renseigner pour un calcul d’évacuation (diamètres, pentes, ventilations de colonnes, matériaux PER / PVC / cuivre selon usage). Format tableau : donnée / source habituelle / risque si omis. Terminer par : validation par logiciel ou méthode interne + DTU 60.11.`,
    },
    {
      title: 'Mail client — MaPrimeRénov’ / CEE : pièces et prochaines étapes (sans promesse)',
      body: `Situation : [type de travaux], stade du dossier : [en cours / demande de complément].
Rédige un mail clair listant les pièces souvent demandées (déclarations, attestations, fiches techniques) et les prochaines étapes, avec formulation prudente : aucune garantie d’éligibilité. Rappeler de vérifier les barèmes et textes officiels en vigueur. Ton professionnel.`,
    },
    {
      title: 'Synthèse — VMC double flux et interface avec le sanitaire (questions MOE)',
      body: `CCTP ou mail MOE (extrait anonymisé) : [TEXTE].
Liste les points d’interface plomberie / VMC double flux (prises d’air, condensats, pénétrations) et 4–6 questions à poser au maître d’œuvre si le texte est incomplet. Ne pas conclure sur la conformité : renvoi DTU 60.11 et notices.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote:
    '« Les premiers jets de devis salle de bain et les rapports de dépannage sont plus homogènes — on relit avant envoi, surtout sur les aides et le CEE. »',
  testimonialAttribution: 'Plombier-chauffagiste — IDF (retour OFC, anonymisé)',
  faq: [
    {
      q: 'L’IA peut-elle calculer une évacuation ou un dimensionnement à la place du DTU 60.11 ?',
      a: `Non : le dimensionnement définitif et la conformité relèvent de votre qualification, de vos outils et de la lecture des fascicules. L’IA peut lister les entrées à vérifier et structurer un tableau de brouillon — à valider par une personne compétente.`,
    },
    {
      q: 'Comment utiliser ChatGPT pour MaPrimeRénov’ et les CEE sans se tromper ?',
      a: `Pour organiser des listes de pièces, reformuler des courriers ou préparer des questions à votre financeur ou délégataire — jamais pour afficher des montants ou éligibilités sans vérification sur les textes officiels et portails à jour. Les règles évoluent : la formation ${OFC} insiste sur la prudence et la relecture.`,
    },
    {
      q: 'PER vs cuivre, VMC double flux, PAC : l’IA choisit-elle les matériaux ?',
      a: `Non : ce sont des choix techniques et contractuels. L’IA peut aider à structurer un comparatif de critères ou des questions au fournisseur — pas à remplacer la notice ou le bureau d’études.`,
    },
    {
      q: 'Mes données clients et plans de salle de bain sont-elles protégées dans ChatGPT ?',
      a: `Évitez les plans nominatifs complets dans un outil grand public sans cadre entreprise. Anonymisez, utilisez des extraits, ou des offres professionnelles sans entraînement — c’est enseigné en formation.`,
    },
    {
      q: 'La formation IA plombier BTP est-elle financement possible selon éligibilité ?',
      a: `Oui selon éligibilité : ${OFC} est certifié Qualiopi ; le financement OPCO Constructys suit les règles en vigueur pour les entreprises du BTP.`,
    },
    {
      q: 'Quelle différence avec la formation « IA au service du bâtiment » (BTP-01) ?',
      a: `BTP-01 pose les bases ; cette page métier aligne exemples et prompts sur le sanitaire, le chauffage, l’évacuation et les dossiers aides (MaPrimeRénov’, CEE) pour un vocabulaire plombier-chauffagiste.`,
    },
  ],
  courseName: 'Formation IA plombier chauffagiste BTP — Qualiopi',
  courseDescription: `${OFC} : formation IA et ChatGPT pour plombiers chauffagistes — devis, PER, cuivre, DTU 60.11, évacuation, VMC, chaudière, PAC. Aides MaPrimeRénov’ et CEE : structuration documentaire. Session 4 h, Qualiopi, financement possible selon éligibilité.`,
  courseTeaches: [
    'ChatGPT pour plombiers chauffagistes BTP',
    'Devis sanitaire et chauffage (relecture humaine)',
    'DTU 60.11 — usage documentaire assisté',
    'Évacuation, VMC, chaudière, PAC — formulations et check-lists',
    'MaPrimeRénov’ et CEE — brouillons prudents, pas de conseil fiscal',
    'Qualiopi — confidentialité des données',
  ],
  ogImage: {
    url: '/images/formation-ia-intra-entreprise-batiment.webp',
    width: 1024,
    height: 571,
    alt: 'Formation IA pour le BTP — plombiers chauffagistes, session avec Laure Olivié',
  },
  coverImage: {
    url: '/images/formation-ia-intra-entreprise-batiment.webp',
    width: 1024,
    height: 571,
    alt: 'Atelier formation IA pour les pro du BTP en entreprise — plomberie et chauffage',
  },
  showAuthorBio: true,
  authorBioClosingLine:
    'Basée en Île-de-France, elle accompagne notamment les équipes plomberie-chauffage et les entreprises du second œuvre.',
  relatedMetierLinks: [
    {
      href: '/formation-ia-electricien-btp',
      title: 'Formation IA électricien BTP',
      description: 'Tableaux, NF C 15-100, CONSUEL — même approche IA encadrée Qualiopi.',
    },
    {
      href: '/formation-ia-carreleur-btp',
      title: 'Formation IA carreleur',
      description: 'Pièces d’eau, interfaces après réseaux — coordination lots.',
    },
    {
      href: '/formation-ia-dirigeant-btp',
      title: 'Formation IA dirigeant BTP',
      description: 'ROI, pilotage projet IA et déploiement équipes pour décideurs PME bâtiment.',
    },
  ],
  liensUtilesIntro:
    'Formations par métier proches, catalogue Qualiopi et ressources pour aller plus loin sur l’IA dans le BTP.',
};
