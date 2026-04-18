import type { FormationIaMetierDynamicConfig } from '@/lib/formation-ia-metier-dynamic-types';

const ORGA = "OFC Création d'Entreprise";

/**
 * Contenu — électricien (page test).
 * Cible éditoriale : ~1 800 – 2 200 mots.
 */
export const FORMATION_IA_METIER_DYNAMIC_ELECTRICIEN: FormationIaMetierDynamicConfig = {
  slug: 'electricien',
  path: '/formation-ia-electricien-btp',
  seoTitle: 'Formation IA Électricien BTP Île-de-France',
  seoDescription:
    'Devis TGBT, sections de câbles et conformité NFC 15-100 accélérés sans sacrifier la relecture métier. Formation Qualiopi finançable Constructys.',
  keywords: [
    'formation IA électricien',
    'ChatGPT NFC 15-100',
    'devis tableau électrique IA',
    'formation électricien BTP Île-de-France',
    'Qualiopi électricien',
    'Constructys formation IA',
    'appel d’offres électricité BTP',
  ],
  breadcrumbMetierLabel: 'Formation IA Électricien',
  h1MetierPluriel: 'électriciens',
  metierPlurielLower: 'électriciens',
  heroIntro:
    'Sessions certifiées Qualiopi, finançables Constructys selon dossier — intervention prioritaire en Île-de-France.',
  probleme: {
    titreH2: 'Le problème : pourquoi les électriciens perdent du temps',
    paragraphes: [
      `Dans une entreprise d’électricité, le cœur du métier reste le chantier : tirer des câbles, poser des tableaux, qualifier une installation, tenir les essais. Pourtant une part croissante du temps part au bureau ou le soir : chiffrer un renforcement de tableau général basse tension (TGBT), détailler un devis pour un local tertiaire avec plusieurs rangées de disjoncteurs, relire une consultation pour un lot électricité CVC sur un marché public. Chaque dossier mobilise la NFC 15-100, les notices d’équipement, parfois un avis technique ou une prescription du maître d’œuvre — et imposer à l’équipe de tout « recopier à la main » dans Word revient à immobiliser des compétences rares sur du formatage plutôt que sur la valeur technique.`,
      `Les douleurs les plus fréquentes sont les mêmes sur l’Île-de-France : calculs de section et choix de protections à documentner proprement pour le client ou pour le contrôle, dossiers de mise aux normes avec historiques de rénovations partielles, réponses à des emails d’archi ou de MOA qui demandent une synthèse « compréhensible » sans qu’on ait deux heures devant soi. Ajoutez les relances de devis, les comptes rendus après intervention, les fichiers Excel de suivi : la semaine dépasse vite quarante-cinq heures si on ne cadre pas l’usage des outils — et l’IA généraliste sans méthode produit des textes plausibles mais faux sur un détail de génération ou de courant admissible.`,
      `La norme n’est pas « dans ChatGPT » : la NFC 15-100 impose des règles, des tables et des vérifications que l’artisan doit valider. Ce que vise ${ORGA}, c’est de réduire le temps passé sur la structure du document, la reformulation et la relecture des brouillons, tout en gardant la responsabilité du conformité et de la signature sur les plans et les fiches. La formation repose sur des prompts prêts à l’emploi, des garde-fous de confidentialité (pas de données nominatives inutiles, anonymisation des chantiers sensibles) et des itérations courtes pour que l’équipe gagne plusieurs heures par semaine sur l’administratif sans se faire piéger par une « réponse magique » hors cadre.`,
    ],
  },
  solution: {
    titreH2: 'La solution : l’IA adaptée aux électriciens du BTP',
    intro: `Une approche pragmatique consiste à traiter l’IA comme un assistant de brouillon : elle structure, propose des listes de points de contrôle et reformule vos notes brutes ; vous gardez le dernier mot sur les valeurs techniques, les sélections de matériel et les mentions réglementaires. En salle, on travaille avec vos cas (devis type, extrait de CCTP, mail client) pour ancrer les bons réflexes. Voici des familles de cas d’usage directement reliées au quotidien d’une équipe d’électriciens installateurs ou d’entreprises mixtes génie électrique / courants faibles :`,
    casUsage: [
      `Devis et chiffrage assisté — à partir d’un descriptif de locaux (surface, répartition des tableaux, niveau de rénovation), l’IA aide à sortir un plan de postes cohérent (tableau principal, sous-répartition, différentiels, identification des circuits sensibles) à compléter avec vos barèmes internes et votre base prix. Le gain : moins de page blanche au démarrage, un chiffrage plus homogène entre commerciaux et chefs de projet.`,
      `Vérification et structuration NFC 15-100 — pour une problématique (protections, sections, schéma unifilaire à valider sur le principe), l’IA peut produire une liste de questions à trancher, des rappels de méthode et des formulations pour le compte rendu, sans se substituer à la lecture de la norme ni au calcul définitif des courants de court-circuit confié à vos outils ou à votre bureau d’études.`,
      `Réponses aux appels d’offres (lot électricité) — sur un extrait de CCTP ou un bordereau de prix, l’IA aide à extraire exigences, interfaces avec les autres lots et risques d’ambiguïté ; vous préparez un plan de mémoire technique ou une arborescence de réponses sans partir d’un document vierge lorsque le délai est court.`,
      `Comptes rendus d’intervention et suivi client — notes vocales ou bullet points bruts après passage sur site : l’IA rédige une version structurée (constats, mesures, actions, suites à prévoir) pour facturation et traçabilité, avec relecture humaine systématique avant envoi.`,
    ],
  },
  methode: {
    titreH2: 'Méthode pas à pas avec prompts ChatGPT',
    intro:
      'Chaque étape correspond à une session type en formation : vous adaptez les variables entre crochets, vous testez sur de faux chantiers puis sur vos modèles internes. Les résultats attendus sont des livrables plus lisibles — pas la conformité « automatique ».',
    etapes: [
      {
        title: 'Cartographier le besoin et les données admissibles',
        prompt: `Tu es un chef de projet électricien en France. Le chantier suivant doit rester anonyme (pas de noms ni d’adresse précise). À partir de : [TYPE DE LOCAL], [NIVEAU DE RÉNOVATION], [NOMBRE DE TABLEAUX], résume en 8 puces ce qu’il faut clarifier avec le client avant d’établir un devis détaillé (charges, usages, contraintes de sélectivité, contrôle d’accès éventuel). Termine par une phrase : quels documents internes je dois avoir sous la main avant de chiffrer.`,
        resultat:
          'Une check-list actionnable pour ne rien oublier en amont du chiffrage et limiter les allers-retours client.',
      },
      {
        title: 'Brouillon de devis — tableau TGBT en local commercial',
        prompt: `Rédige un devis (structure détaillée des postes, pas les prix) pour l’installation d’un tableau électrique TGBT dans un local commercial de 200 m², 3 rangées, différentiel 30 mA en tête d’installation, répartition éclairage / prises / climatisation selon les usages tertiaires. Indique pour chaque section ce qui devra être vérifié selon la NFC 15-100 (sans inventer de valeurs chiffrées). Précise les réserves à ajouter sur la place de découpe, d’étiquetage et de repérage des circuits.`,
        resultat:
          'Une ossature de devis alignée sur un chantier réel, prête à être injectée dans votre outil de chiffrage ou votre modèle interne.',
      },
      {
        title: 'Synthèse « conformité » sans automatiser la norme',
        prompt: `Voici un cas : [DÉCRIRE COURT CIRCUIT / PROTECTION / CÂBLE]. Sans donner de verdict définitif, liste les paramètres à contrôler (courants, influences mutuelles, conditions de pose) et les références documentaires à consulter (NFC 15-100, guides fabricants). Format : tableau 3 colonnes — point de contrôle / pourquoi c’est sensible / quoi ouvrir comme doc.`,
        resultat:
          'Un plan de relecture métier plutôt qu’une « réponse normative » unique, pour partager avec le bureau d’études ou le BE interne.',
      },
      {
        title: 'Réponse marché public — lot courants forts',
        prompt: `Extrait de CCTP (coller un passage anonymisé) : [TEXTE]. Rédige un plan de mémoire technique en 2 pages max (titres + bullets) pour une entreprise d’électricité de PME : moyens, méthodo de câblage, coordination avec le gros œuvre, sécurité et planning indicatif. Ne pas recopier le CCAP. Ajoute une liste de questions à poser au maître d’œuvre si le texte est ambigu.`,
        resultat:
          'Un canevas de réponse pour gagner un temps précieux quand le délai de réponse est tendu.',
      },
      {
        title: 'Mail client après intervention urgente',
        prompt: `Transforme ces notes de terrain en mail professionnel clair (200 mots max) : [NOTES]. Objectif : expliquer ce qui a été fait, ce qui reste optionnel, ce qui nécessite une proposition séparée. Ton ferme et courtois. Ajouter une phrase de rappel sur la nécessité de validation des protections et des essais selon la documentation en vigueur.`,
        resultat:
          'Un message prêt à être relu et signé par le responsable, au lieu d’un brouillon confus tapé sur mobile.',
      },
    ],
  },
  resultats: {
    titreH2: 'Résultats concrets et témoignages',
    intro: `Les équipes qui appliquent la méthode OFC (prompts cadrés, relecture humaine, interdiction d’envoyer un courant faible « sortie brute » vers un client exigeant) observent en général un gain net sur l’administratif et la préparation des réponses, mesurable en heures par semaine sur le poste bureau — le chantier reste prioritaire. Le tableau ci-dessous illustre des ordres de grandeur fréquemment observés lors des ateliers de suivi ; ils ne constituent pas un engagement contractuel et dépendent de l’organisation interne et du volume de dossiers.`,
    tableau: [
      {
        critere: 'Rédaction d’un devis TGBT / second œuvre tertiaire',
        avant: '2 h à 4 h (repartir de zéro ou d’un vieux modèle Word)',
        apres: '30 min à 1 h 30 pour une première version structurée + validation métier',
      },
      {
        critere: 'Compte rendu après intervention ou réunion de coordination',
        avant: '45 min à 1 h 30 en moyenne le soir',
        apres: '15 min à 40 min avec brouillon assisté puis relecture',
      },
      {
        critere: 'Préparation d’une trame de réponse à AO (lot élec.)',
        avant: 'Journée partagée sur plusieurs rôles',
        apres: 'Répartition plus courte grâce au plan de mémoire et à l’extraction d’exigences',
      },
    ],
    temoignages: [
      {
        citation:
          '« On a sorti un premier jet de mémoire technique en demi-journée au lieu d’une journée pleine. Le fond technique vient toujours de nous — l’IA nous évite la page blanche. »',
        attribution: 'Gérant d’entreprise d’électricité — Val-de-Marne (retour anonymisé, formation OFC)',
      },
      {
        citation:
          '« Je ne fais plus mes comptes rendus d’intervention à partir de zéro sur Word tard le soir : je dicte les points, je restructure avec un prompt, je relis deux fois avant d’envoyer. »',
        attribution: 'Chef d’équipe installation — Seine-Saint-Denis (formation OFC, anonymisé)',
      },
    ],
  },
  faq: [
    {
      q: 'ChatGPT connaît-il la norme NFC 15-100 comme un bureau d’études ?',
      a: "Non : il ne remplace ni la norme imprimée, ni votre logiciel de calcul, ni le regard d’un professionnel habilité. Les modèles généralistes peuvent résumer des principes ou proposer une structure de dossier, mais ils hallucinent sur des articles, des courants ou des exceptions. Oui, en revanche, l’IA aide à organiser vos notes, à préparer des questions de clarification et à reformuler vos comptes rendus une fois les valeurs validées par vos équipes.",
    },
    {
      q: 'L’IA peut-elle calculer une section de câble à votre place ?',
      a: "Elle ne doit pas être la source d’un calcul de section soumis à signature : utilisez vos méthodes d’ingénierie, vos tableaux et vos logiciels agréés. L’IA peut en revanche lister les grandeurs à renseigner, rappeler les grandeurs typiques à vérifier et vous aider à présenter le résultat dans un tableau ou un courrier client — toujours après validation par une personne compétente.",
    },
    {
      q: 'Comment éviter d’exposer des données sensibles (clients, plans) ?',
      a: 'Ne téléversez pas de plans complets identifiables ni de données personnelles dans un outil grand public sans cadre juridique. Anonymisez les chantiers dans les exemples de prompts, utilisez des intitulés génériques et préférez les offres professionnelles avec options de non-rétention pour l’entraînement lorsque c’est possible. Ces règles font partie intégrante des modules OFC.',
    },
    {
      q: 'La formation est-elle éligible OPCO Constructys et certifiée Qualiopi ?',
      a: `${ORGA} est certifiée Qualiopi ; les parcours sont éligibles aux financements selon les règles du plan de développement des compétences et les plafonds en vigueur chez Constructys. Le montage du dossier et les délais eGestion sont expliqués lors de la visio découverte et dans la documentation remise aux entreprises.`,
    },
    {
      q: 'Intervenez-vous uniquement en Île-de-France ?',
      a: 'Les sessions inter entreprises et la majorité des rendez-vous de cadrage sont pensés pour l’Île-de-France ; des formations intra peuvent être organisées dans vos locaux sur devis selon calendrier et effectifs. Précisez votre périmètre en prenant rendez-vous.',
    },
    {
      q: 'Les débutants sans culture digitale peuvent-ils suivre la formation ?',
      a: "Oui : l’objectif est opérationnel — création de prompts, relecture critique des sorties, bonnes pratiques de confidentialité. Aucun prérequis de code ; il suffit de venir avec vos exemples de tâches administratives ou de réponses marchés.",
    },
    {
      q: 'Quelle différence entre ce module « par métier » et le catalogue BTP-01 ?',
      a: 'Le catalogue « L’IA au service du bâtiment » donne une base commune ; la page métier électricien met l’accent sur les cas de devis, tableaux, NFC 15-100 et AO lot électricité pour aligner vocabulaire et exercices sur vos journées réelles. Les deux se complètent dans une stratégie de montée en compétence.',
    },
  ],
  courseName:
    'Formation IA pour électriciens BTP — Île-de-France (ChatGPT, devis, NFC 15-100)',
  courseDescription: `${ORGA} : formation IA et ChatGPT appliquée aux électriciens du bâtiment — devis, TGBT, réponses marchés, comptes rendus, garde-fous conformité NFC 15-100. Session 4 h, Qualiopi, financement possible selon dossier Constructys.`,
  courseTeaches: [
    'Structuration de devis et brouillons techniques pour électriciens BTP',
    'Utilisation responsable de ChatGPT avec la NFC 15-100 comme référence métier',
    'Préparation de mémoires techniques et listes de contrôle pour marchés publics',
    'Comptes rendus et courriers clients avec relecture humaine systématique',
    'Règles de confidentialité et anonymisation des données chantier',
  ],
  bioPhotoAlt:
    "Laure Olivié, formatrice IA BTP pour électriciens — sessions Qualiopi, OFC Création d'Entreprise",
  bio: {
    titreH2: 'Qui est Laure Olivié ?',
    paragraphes: [
      `Laure Olivié est formatrice en intelligence artificielle appliquée au BTP au sein de ${ORGA}. Elle accompagne artisans, PME et équipes support pour intégrer ChatGPT et outils d’IA générative dans des usages concrets : devis, courriers, comptes rendus, dossiers marchés — avec une exigence de relecture et de conformité adaptée au secteur réglementé. Avant de se consacrer à 100 % à la formation, elle a plus de dix ans d’expérience sur le terrain des travaux publics et de la conduite de chantier, ce qui nourrit ses exemples et sa méthode « zéro théorie inutile ».`,
      `L’organisme est certifié Qualiopi (NDA 11788515078) ; les sessions peuvent être financées via l’OPCO Constructys dans les conditions habituelles de prise en charge. Partenaires et références : réseaux professionnels du bâtiment, interventions auprès de fédérations et organismes de formation — toujours avec le même objectif : des gains de temps mesurables et une utilisation responsable de l’IA.`,
    ],
  },
  ogImage: {
    url: '/images/formation-ia-electricien-btp.png',
    width: 1024,
    height: 682,
    alt: 'Formation IA BTP — électriciens en salle avec Laure Olivié',
  },
};

export const FORMATION_IA_METIER_DYNAMIC_REGISTRY: Record<
  string,
  FormationIaMetierDynamicConfig
> = {
  electricien: FORMATION_IA_METIER_DYNAMIC_ELECTRICIEN,
};

export function getFormationIaMetierDynamicConfig(slug: string) {
  return FORMATION_IA_METIER_DYNAMIC_REGISTRY[slug] ?? null;
}
