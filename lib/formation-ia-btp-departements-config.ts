/**
 * Pages locales « formation IA BTP » par département d’Île-de-France (+77).
 * Contenus longs (SEO) — maillage : LINKS dans le composant.
 */
import type { FormationIaBtpDeptLandingConfig } from '@/components/formation-ia-btp/FormationIaBtpDepartementLanding';
import type { FAQItem } from '@/lib/faq';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const OFC = 'OFC Création d\'Entreprise';

function faqGeoBase(nomDept: string, code: string, villes: string): FAQItem[] {
  const d = `${nomDept} (${code})`;
  return [
    {
      q: `Intervenez-vous dans tout le département ${d} ?`,
      a: `Oui. Les sessions intra-entreprise se font dans vos locaux ou sur un site que vous désignez dans les ${nomDept}, sous réserve de calendrier. Le siège de ${OFC} est à Guyancourt (78) : les déplacements vers ${villes} sont couramment planifiés. Pour les zones les plus éloignées, nous cadrons les créneaux ensemble (journée bloquée, demi-journées).`,
    },
    {
      q: 'Quelle est la différence entre session inter et intra pour mon équipe ?',
      a: `En inter, vous rejoignez un groupe sur une date fixée (souvent en Île-de-France). En intra, la formation est réservée à votre entreprise : mêmes 4 h, mais les exemples sont vos devis, vos CCTP et vos modèles de courriers — ce qui est souvent préféré pour les PME du BTP dans le ${code}.`,
    },
    {
      q: 'Proposez-vous le distanciel depuis le département ?',
      a: "Oui. Le distanciel est possible si chaque participant dispose d'un poste, d'une connexion stable et peut partager son écran. La méthode reste identique au présentiel : travail sur vos documents réels. Certaines entreprises du BTP combinent présentiel et visio selon les sites.",
    },
    {
      q: 'Y a-t-il des frais de déplacement facturés pour une session dans mon département ?',
      a: `Pour une première prise de contact et le cadrage, l'échange téléphonique (30 min) est gratuit. Pour les sessions intra dans l'Île-de-France, les conditions (déplacement, pause repas) sont précisées dans le devis — pas de surprise : tout est validé avant signature de la convention.`,
    },
    {
      q: 'Le financement Constructys s’applique-t-il aux entreprises du département ?',
      a: `Les règles Constructys sont nationales : éligibilité OPCO, plan de développement des compétences, plafonds pédagogiques. Le fait d'être dans le ${nomDept} ne change pas le barème ; en revanche, le programme Qualiopi et les objectifs pédagogiques sont alignés sur le guide financement Constructys publié sur le site laureolivie.fr.`,
    },
    {
      q: 'Combien de temps à l’avance réserver une date ?',
      a: `Les agendas intra se remplissent souvent 3 à 6 semaines à l'avance en Île-de-France. Pour une date urgente (lancement chantier, montée en compétence avant un marché), indiquez-le lors de la réservation Calendly : ${CALENDLY_BOOKING_URL}.`,
    },
    {
      q: 'Puis-je combiner deux thèmes (ex. devis + appels d’offres) sur une journée ?',
      a: "Chaque référence catalogue (BTP-01, BTP-02, etc.) correspond à 4 h complètes. Il est possible d'enchaîner deux demi-journées sur deux thèmes différents sur deux jours consécutifs ou la même semaine — à voir selon disponibilités et effectifs.",
    },
  ];
}

/** Yvelines (78) — contenu détaillé (pilote SEO). */
export const FORMATION_IA_BTP_YVELINES_78: FormationIaBtpDeptLandingConfig = {
  path: '/formation-ia-btp-yvelines-78',
  h1: 'Formation IA BTP dans les Yvelines (78) — Qualiopi, finançable Constructys',
  metaTitle: 'Formation IA BTP Yvelines (78) | Laure Olivié Qualiopi',
  metaDescription:
    'Formation IA & ChatGPT pour BTP dans les Yvelines. Présentiel Guyancourt, Versailles, Saint-Germain, Mantes. 100% finançable Constructys.',
  keywords: [
    'formation IA BTP Yvelines',
    'formation ChatGPT 78',
    'Qualiopi Yvelines',
    'Constructys formation IA',
    'formation IA Versailles',
    'formation IA Guyancourt',
  ],
  departementNom: 'Yvelines',
  deptCode: '78',
  badgeLine: 'Yvelines (78) · Présentiel & distanciel · Qualiopi',
  cities: [
    'Guyancourt',
    'Versailles',
    'Saint-Germain-en-Laye',
    'Mantes-la-Jolie',
    'Rambouillet',
    'Sartrouville',
    'Poissy',
  ],
  courseName: 'Formation IA BTP Yvelines (78) — Qualiopi, finançable Constructys',
  courseDescription: `${OFC} : formation IA et ChatGPT pour entreprises du BTP dans les Yvelines (78). Sessions 4 h, présentiel ou distanciel, devis et chantier. Certification Qualiopi, financement OPCO Constructys selon dossier. Guyancourt, Versailles, Mantes, SQY.`,
  serviceName: `Accompagnement formation IA BTP — département des Yvelines (78)`,
  serviceDescription: `Prestation de formation professionnelle en intelligence artificielle appliquée au bâtiment et aux travaux publics pour les entreprises implantées dans le département des Yvelines (78) : interventions intra-entreprise, calendrier Île-de-France, organisme certifié Qualiopi.`,
  areaServedCourse: [
    'Yvelines',
    'Versailles',
    'Guyancourt',
    'Saint-Germain-en-Laye',
    'Mantes-la-Jolie',
    'Île-de-France',
    'France',
  ],
  areaServedService: ['Yvelines', 'Île-de-France', 'France'],
  problemTitle: 'Pourquoi le BTP des Yvelines (78) manque de temps — et pas d’outils',
  problemBody: [
    `Le département des Yvelines concentre à la fois des bassins d’emploi très denses (Versailles, Saint-Germain-en-Laye, parties proches de La Défense), des zones industrielles actives le long de la vallée de la Seine jusqu’à Mantes-la-Jolie, et des pôles périurbains comme Rambouillet ou les communes autour de Saint-Quentin-en-Yvelines. Les entreprises du bâtiment, du second œuvre et des travaux publics y subissent la même pression qu’ailleurs en Île-de-France : délais serrés sur les marchés publics et privés, concurrence sur les offres, et une charge administrative qui s’accumule entre le chantier, le bureau et la gestion des relances.`,
    `Dans ce contexte, l’« efficacité » ne se joue pas seulement sur le terrain : elle se joue aussi sur la capacité à produire vite des documents fiables — devis détaillés, comptes rendus de réunion, synthèses de CCTP, brouillons de mémoires techniques. Beaucoup d’équipes utilisent encore des modèles Word vieillissants ou des copier-coller entre mails, faute de temps pour structurer une méthode. Résultat : des heures perdues chaque semaine, et une fatigue cognitive qui pèse sur les conducteurs de travaux, les chargés d’affaires et les fonctions support.`,
    `L’IA générative (ChatGPT, Claude AI ou équivalents) ne remplace pas le métier : en revanche, elle accélère la mise en forme, la reformulation et la structuration lorsque l’on sait quoi demander — et quoi ne jamais mettre dans un outil grand public. Le risque, sans formation, est de croire que « tout peut être automatisé » : d’où l’importance d’un cadre pédagogique Qualiopi, avec des exercices sur vos propres documents et des rappels sur la confidentialité des données et la validation humaine des réponses soumises à un maître d’ouvrage ou à un juge d’offres.`,
    `Les dirigeants de TPE et PME que je rencontre dans le 78 ne cherchent pas une transformation numérique de trois ans : ils veulent un gain de temps mesurable sur l’administratif et les dossiers, sans alourdir l’organisation. C’est exactement l’objectif des sessions proposées par ${OFC} : quatre heures, orientées terrain, avec des livrables utilisables dès le lendemain — pas une conférence généraliste sur l’IA.`,
    `Les chantiers « express » et les opérations de rénovation tertiaire autour de Versailles ou dans les zones d’activité de Saint-Quentin-en-Yvelines génèrent une documentation dispersée : pièces sur serveur, échanges de chantier, photos terrain. Sans cadre commun, l’IA devient un cinquième canal de bruit ; avec une formation encadrée Qualiopi, elle devient l’endroit où restructurer l’information avant archivage et envoi officiel.`,
    `Entre la vallée de la Mauldre et les secteurs plus ruraux du sud des Yvelines, le recrutement de profils administratifs reste tendu : chaque heure gagnée sur les modèles Word ou les mails répétitifs est une heure réinjectée sur le corps d’état critique. Les gains typiques observés après une première semaine d’application des méthodes vues en salle se situent souvent entre trois et cinq heures par semaine pour une petite équipe.`,
  ],
  solutionTitle: 'La solution : une formation IA BTP courte, certifiée Qualiopi, centrée sur vos documents',
  solutionBody: [
    `La réponse apportée aux équipes des Yvelines repose sur un format standard de quatre heures, en présentiel dans vos locaux (intra) ou à distance si vos équipes sont multi-sites. Le programme s’appuie sur les références du catalogue — notamment « L’IA au service du bâtiment » pour l’entrée de gamme, et des modules plus spécialisés pour les appels d’offres ou les fonctions RH selon vos besoins. Chaque séquence alterne démonstration, exercice guidé et mise en pratique sur des exemples réels : un extrait de devis, un courrier client, une trame de compte rendu de chantier, un sommaire de mémoire technique.`,
    `Le positionnement géographique du siège à Guyancourt facilite la logistique : pour une entreprise basée à Versailles, Poissy ou Sartrouville, le déplacement d’une formatrice habituée au vocabulaire BTP francilien limite les imprévus de calendrier. Pour les structures plus au nord-ouest (Mantes, limite des Yvelines), ou au sud (Rambouillet), nous planifions souvent des journées complètes ou des créneaux qui évitent les heures de pointe sur les grands axes — l’objectif est de protéger votre temps opérationnel.`,
    `Sur le plan du financement, les entreprises du BTP relevant de l’OPCO Constructys peuvent mobiliser le plan de développement des compétences, sous réserve d’éligibilité et de montage de dossier. Les plafonds et règles nationales s’appliquent au 78 comme partout ailleurs ; mon rôle est de fournir les éléments pédagogiques (objectifs, programme, durée) cohérents avec une demande de prise en charge. La certification Qualiopi de l’organisme est un repère utile pour les services RH et les OPCO.`,
    `Enfin, la démarche est compatible avec une montée en compétence progressive : commencer par automatiser les courriers et les relances, puis, dans un second temps, attaquer des usages plus sensibles (analyse de pièces marchés, mémoires techniques) lorsque l’équipe est prête. C’est souvent ainsi que les entreprises des Yvelines sécurisent l’adoption : petits gains immédiats, puis usage avancé lorsque les réflexes de relecture humaine sont ancrés.`,
    `Pour les directions techniques qui pilotent plusieurs petits chantiers en parallèle (courants faibles, étanchéité, gros œuvre local), la session peut intégrer un volet « standardisation des consignes » : mêmes prompts pour les comptes rendus hebdomadaires, mêmes grilles de relecture, ce qui simplifie le contrôle qualité sans alourdir le reporting.`,
  ],
  villesTitle: 'Villes et bassins des Yvelines couverts (liste indicative)',
  villesIntro: `Les sessions intra se déroulent chez vous ou sur le site que vous désignez. Voici des villes et bassins d’emploi fréquemment concernés dans le 78 — la liste n’est pas limitative : si votre commune n’y figure pas, un échange de 30 minutes permet de confirmer la faisabilité et les créneaux.`,
  villesFooter: [
    `De Versailles et Saint-Germain-en-Laye aux zones d’activité de Saint-Quentin-en-Yvelines et Vélizy, la diversité des tissus économiques impose des exemples d’atelier différents : bâtiment tertiaire, rénovation, réseaux, gros œuvre ou second œuvre. J’adapte les prompts et les cas pratiques à votre réalité — pas de « one size fits all ».`,
    `Pour les entreprises qui travaillent aussi à Paris ou en petite couronne, il est utile de croiser cette page avec la fiche « formation IA BTP à Paris » du catalogue : les enjeux de marchés publics y sont souvent voisins, même si la logistique interne diffère.`,
    `Poissy, Sartrouville et les communes riveraines des grands axes restent des zones où l’on croise artisans de proximité et filiales de grands groupes : la formation reste la même sur le fond (4 h, Qualiopi), mais les cas d’usage privilégient tantôt la relation client grand compte, tantôt le cycle de devis rapide auprès des particuliers.`,
  ],
  programmeTitle: 'Ce que contiennent concrètement les 4 heures (aperçu)',
  programmeBody: [
    `Le fil conducteur reste l’efficacité : comment formuler une consigne claire pour obtenir un premier jet exploitable (devis, mail, synthèse de réunion), comment itérer pour affiner le ton et la structure, et comment intégrer une relecture humaine systématique avant envoi au client ou soumission sur plateforme marchés. Nous travaillons aussi la « bibliothèque de prompts » : des modèles réutilisables par métier, adaptés au vocabulaire du CCTP et des bordereaux.`,
    `Un temps est consacré aux limites : données personnelles, clauses confidentielles, pièces sensibles — quels comportements adopter selon que vous utilisez un outil grand public ou un espace professionnel. Ce volet est indispensable dans le BTP, où les dossiers peuvent contenir des informations sur des opérations non publiques ou des sous-traitants.`,
    `Pour les équipes déjà à l’aise avec l’outil, nous poussons la logique vers l’industrialisation : modèles de relecture, check-list avant envoi, partage des prompts entre collègues (dans le respect de votre politique interne). L’objectif n’est pas d’ajouter une couche logicielle de plus, mais de rendre votre façon de travailler plus fluide.`,
    `Après la session, vous repartez avec des supports réutilisables et une feuille de route simple pour la semaine suivante : quelles tâches automatiser en priorité, quels documents « pilotes » choisir pour tester l’IA sans disperser l’équipe.`,
    `Une plage est réservée aux questions « terrain » : comment intégrer l’usage de l’IA dans une réunion de chantier hebdomadaire, comment imposer une relecture croisée conducteur / chargé d’affaires, comment tracer une version « brouillon IA » versus « version validée » dans votre gestion documentaire habituelle.`,
  ],
  temoignagesTitle: 'Témoignages de professionnels en Île-de-France (extraits anonymisés)',
  temoignages: [
    {
      text: `On cherchait un format court sans bullshit tech. En quatre heures, on a posé des prompts sur nos vrais modèles de devis : le gain a été visible dès la semaine suivante sur les relances clients.`,
      attribution: `Dirigeant, entreprise de second œuvre — périphérie de Versailles (${SOCIAL_PROOF.AVERAGE_RATING}/5 à chaud)`,
    },
    {
      text: `Nos conducteurs de travaux traînaient les comptes rendus. La méthode dictée → structuration avec relecture humaine nous a permis de fermer le sujet sans recruter.`,
      attribution: `Responsable de travaux — secteur bâtiment, vallée de la Seine (78)`,
    },
    {
      text: `Le côté financement Constructys nous a rassurés : on a eu les éléments pour monter le dossier avec notre référent OPCO, sans refaire le monde.`,
      attribution: `Gérante, PME gros œuvre — bassin Mantes / Yvelines`,
    },
  ],
  financeTitle: 'Financement et Qualiopi : ce qui s’applique aux entreprises du 78',
  financeBody: [
    `Les entreprises du BTP adhérentes à Constructys peuvent examiner la prise en charge des actions de formation dans le cadre du plan de développement des compétences, selon les règles en vigueur (taille d’entreprise, plafonds pédagogiques, éligibilité des salariés concernés). Le département des Yvelines n’introduit pas de règle spécifique : en revanche, le fait d’avoir un organisme certifié Qualiopi facilite la cohérence des pièces attendues.`,
    `Pour une vision à jour des barèmes et des étapes administratives, reportez-vous au guide financement sur le site : les liens utiles et les précisions sur la TVA (intra / inter) y sont centralisés. Mon équipe et moi restons disponibles pour répondre aux questions de faisabilité avant signature du devis.`,
    `En résumé : dans les Yvelines comme ailleurs, la valeur ajoutée d’une formation IA BTP tient à la combinaison d’un cadre certifié, d’exemples concrets sur vos documents, et d’une mise en œuvre progressive qui respecte votre charge de travail terrain.`,
    `Pour les financements, la vigilance porte souvent sur la bonne catégorisation de l’action (intra vs inter), sur le respect des plafonds horaires Constructys et sur la cohérence entre effectifs déclarés et participants réels : ces points sont clarifiés avant signature pour éviter les surprises en fin de bilan pédagogique.`,
    `Si vous hésitez encore entre une sensibilisation courte et un module « AO » plus dense, l’appel découverte Calendly permet d’arbitrer : on croise votre secteur (public/privé), votre effectif cible et vos délais de marché — puis on verrouille une date intra ou une inscription inter selon le calendrier.`,
  ],
  faq: faqGeoBase(
    'Yvelines',
    '78',
    'Versailles, Guyancourt, Mantes-la-Jolie, Saint-Germain-en-Laye, Rambouillet',
  ),
};

function buildDeptConfig(opts: {
  path: string;
  deptCode: string;
  departementNom: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  badgeLine: string;
  cities: string[];
  chefLieu: string;
  perimetre: string;
  axes: string;
  temoignageZone: string;
}): FormationIaBtpDeptLandingConfig {
  const { deptCode, departementNom } = opts;
  const d = `${departementNom} (${deptCode})`;
  const courseName = `Formation IA BTP ${d} — Qualiopi, finançable Constructys`;
  return {
    path: opts.path,
    h1: opts.h1,
    metaTitle: opts.metaTitle,
    metaDescription: opts.metaDescription,
    keywords: opts.keywords,
    departementNom,
    deptCode,
    badgeLine: opts.badgeLine,
    cities: opts.cities,
    courseName,
    courseDescription: `${OFC} : formation IA et ChatGPT pour le BTP dans le département ${d}. Sessions 4 h, présentiel ou distanciel. Qualiopi, financement OPCO Constructys selon dossier. ${opts.perimetre}`,
    serviceName: `Accompagnement formation IA BTP — département ${d}`,
    serviceDescription: `Formation professionnelle en intelligence artificielle appliquée au bâtiment et aux travaux publics pour les entreprises du ${d} : intra-entreprise, calendrier Île-de-France, organisme certifié Qualiopi.`,
    areaServedCourse: [departementNom, opts.chefLieu, 'Île-de-France', 'France'],
    areaServedService: [departementNom, 'Île-de-France', 'France'],
    problemTitle: `Le BTP dans le ${deptCode} : productivité attendue, temps administratif réel`,
    problemBody: [
      `Dans le département ${d}, les entreprises du bâtiment, du second œuvre et des travaux publics naviguent entre chantiers exigeants, marchés publics ou privés, et une densité urbaine qui impose des délais courts. Les bassins autour de ${opts.chefLieu} et les axes ${opts.axes} structurent une partie des flux : entreprises de sous-traitance, PME de travaux, bureaux d’études — tous cherchent à tenir le planning sans laisser s’accumuler les relances, les comptes rendus et les dossiers de réponse.`,
      `Le paradoxe est connu : plus le carnet de commandes est chargé, moins il reste de temps pour formaliser correctement les offres et les échanges écrits. L’IA générative peut réduire ce décalage, à condition d’être encadrée : prompts adaptés au vocabulaire du CCTP, relecture humaine obligatoire avant envoi, et règles claires sur les données sensibles. Sans cela, on ajoute un gadget de plus ; avec une formation courte certifiée Qualiopi, on transforme une plage de deux heures par semaine en temps récupérable sur le terrain.`,
      `Les fonctions support et les conducteurs de travaux ne manquent pas de « volonté » : ils manquent de méthode partagée. D’où l’intérêt d’une session intra en présentiel dans vos locaux ${opts.temoignageZone} : tout le monde part avec les mêmes réflexes, les mêmes modèles de prompts et les mêmes garde-fous.`,
      `Enfin, le financement via l’OPCO Constructys reste une question fréquente : les règles nationales s’appliquent au ${deptCode} comme ailleurs ; l’enjeu est de disposer d’un programme clair, d’objectifs mesurables et d’une convention conforme — ce que permet une structure certifiée Qualiopi.`,
      `Les opérations multi-intervenants (BET, architecte, coordinateur SPS) multiplient les circulaires et les versions de pièces : sans méthode, chaque relance devient un fil de mails interminable. L’IA aide à résumer et à reformuler, mais seulement si l’équipe partage les mêmes garde-fous — ce que la formation intra installe vite lorsque les décideurs sont présents.`,
      `Sur les axes ${opts.axes}, les créneaux « juste à temps » pèsent sur la disponibilité des conducteurs : réduire le temps passé sur les écrits administratifs, c’est aussi sécuriser la présence terrain et la qualité des réceptions.`,
    ],
    solutionTitle: `Formation IA BTP dans le ${deptCode} : méthode, 4 h, résultats opérationnels`,
    solutionBody: [
      `La proposition de ${OFC} pour le ${d} combine un format court (4 h), des exercices sur vos documents réels, et un positionnement « terrain BTP » : pas de jargon startup, pas de promesse irréaliste sur l’automatisation totale. Nous travaillons des cas concrets — devis, mails, synthèses, brouillons de mémoires — avec des itérations guidées pour améliorer le ton et la structure.`,
      `Le siège à Guyancourt (78) permet d’organiser des déplacements en Île-de-France avec des créneaux réalistes : pour les entreprises ${opts.temoignageZone}, nous ajustons la journée pour limiter l’impact sur le chantier. Le distanciel reste possible si vos équipes sont réparties sur plusieurs sites du département.`,
      `Les modules du catalogue (BTP-01 à BTP-05) couvrent les besoins courants : entrée de gamme « IA au service du bâtiment », appels d’offres, RH BTP, travaux publics, sensibilisation aux assistants IA. Vous choisissez la séquence en fonction de votre maturité et de vos priorités business.`,
      `Après la session, l’objectif est simple : chaque participant repart avec des modèles réutilisables et une feuille de route sur deux semaines — quoi tester en premier, quoi mesurer (temps gagné sur une relance, sur un compte rendu), et comment faire remonter les bonnes pratiques dans l’équipe.`,
      `Pour les directions qui gèrent à la fois ${opts.chefLieu} et des chantiers périphériques, nous pouvons intégrer un module « coordination distante » : mêmes prompts pour les comptes rendus, mêmes critères de relecture, afin que le siège et le terrain parlent le même langage documentaire.`,
      `Enfin, la logique Qualiopi impose des objectifs pédagogiques explicites : la session n’est pas une démonstration marketing, mais un parcours évaluable — un atout lorsque le service RH doit justifier la ligne OPCO et le retour sur investissement attendu.`,
    ],
    villesTitle: `Villes et bassins d’emploi du ${d} (indicatif)`,
    villesIntro: `Les sessions intra se déroulent dans vos locaux ou sur site. Voici des villes représentatives du département — liste non exhaustive ; si votre commune n’apparaît pas, un court échange permet de confirmer la logistique et les dates.`,
    villesFooter: [
      `Les enjeux locaux varient : ${opts.perimetre}. J’adapte les exemples d’atelier (types de marchés, typologie de clients, part de public/privé) pour que l’équipe reconnaisse son quotidien.`,
      `Pour une vision régionale, la page « formation IA BTP Île-de-France » et le catalogue des formations complètent cette approche départementale.`,
    ],
    programmeTitle: 'Contenu pédagogique type sur une demi-journée (4 h)',
    programmeBody: [
      `Mise à niveau rapide sur les usages de l’IA générative dans le BTP : ce qui est raisonnable d’automatiser, ce qui ne l’est pas, et comment organiser la relecture humaine.`,
      `Ateliers sur vos documents : reformulation de courriers, structure de compte rendu, premières pistes pour analyser des extraits de CCTP ou de bordereaux — toujours avec des garde-fous confidentialité.`,
      `Construction d’une mini-bibliothèque de prompts métier : modèles réutilisables par équipe, adaptés au vocabulaire de vos lots et à votre segmentation clients.`,
      `Plan d’action 15 jours : tâches prioritaires, indicateurs simples (temps gagné, qualité perçue), et modalités pour partager les prompts en interne sans disperser les bonnes pratiques.`,
      `Un temps est consacré aux situations « sous-traitance » : comment demander à l’IA de reformuler une consigne MOEX sans dénaturer l’intention, comment préparer un courrier de réserve ou une demande de précision CCTP sans ton conflictuel — le tout avec validation humaine.`,
      `Pour les équipes déjà équipées d’outils collaboratifs (GED, Teams, Drive), nous discutons des points d’insertion : où coller le brouillon IA, comment versionner, qui signe — afin que la formation s’insère dans vos habitudes plutôt que de les contredire.`,
    ],
    temoignagesTitle: 'Témoignages de professionnels (extraits anonymisés)',
    temoignages: [
      {
        text: `On voulait un format court et français, sans anglicismes inutiles. Les exemples sur nos mails et nos devis ont débloqué des collègues réfractaires aux « nouveaux outils ».`,
        attribution: `Chef d’entreprise — travaux, ${opts.temoignageZone}`,
      },
      {
        text: `La partie appels d’offres nous intéressait : on est repartis avec une méthode pour découpter les DCE et préparer des brouillons exploitables, puis relire avant envoi.`,
        attribution: `Conducteur de travaux — ${d}`,
      },
      {
        text: `Côté admin, on a réduit le temps passé sur les relances fournisseurs. Rien de magique : des prompts et de la discipline d’équipe.`,
        attribution: `Responsable administratif — PME BTP, ${opts.chefLieu}`,
      },
    ],
    financeTitle: `Financement Constructys et Qualiopi — entreprises du ${deptCode}`,
    financeBody: [
      `Les entreprises du BTP adhérentes à Constructys peuvent examiner la prise en charge des actions dans le cadre du plan de développement des compétences, selon les règles en vigueur. La certification Qualiopi de ${OFC} facilite la cohérence des pièces : programme, objectifs, durée, public concerné.`,
      `Les plafonds pédagogiques et critères d’éligibilité sont nationaux : votre référent OPCO ou votre service RH confirme le montant applicable à votre structure. Mon rôle est de vous remettre un devis et une convention clairs avant engagement.`,
      `Pour approfondir : le guide financement sur le site centralise les liens utiles et les précisions sur la TVA intra / inter selon le format de formation choisi.`,
      `Les plannings intra dans le ${deptCode} se calent souvent sur des fenêtres sans production critique : nous anticipons avec vous les accès salle, les postes de démonstration et les extraits de documents anonymisés pour éviter de consommer la première heure sur des problèmes logistiques.`,
      `Si plusieurs OPCO sont présents dans votre groupe (cas de filiales), le devis distingue les publics et les conventions : l’objectif est que chaque partie sache ce qu’elle finance avant le jour J.`,
    ],
    faq: faqGeoBase(departementNom, deptCode, opts.cities.slice(0, 4).join(', ')),
  };
}

/** Seine-et-Marne (77) */
export const FORMATION_IA_BTP_SEINE_ET_MARNE_77 = buildDeptConfig({
  path: '/formation-ia-btp-seine-et-marne-77',
  deptCode: '77',
  departementNom: 'Seine-et-Marne',
  h1: 'Formation IA BTP en Seine-et-Marne (77) — Qualiopi, finançable Constructys',
  metaTitle: 'Formation IA BTP Seine-et-Marne (77) | Laure Olivié Qualiopi',
  metaDescription:
    'Formation IA & ChatGPT BTP en Seine-et-Marne : Melun, Meaux, Marne-la-Vallée. Présentiel ou distanciel. Qualiopi, 100% finançable Constructys selon dossier.',
  keywords: [
    'formation IA BTP 77',
    'formation ChatGPT Seine-et-Marne',
    'Qualiopi 77',
    'formation IA Meaux',
    'formation IA Melun',
  ],
  badgeLine: 'Seine-et-Marne (77) · Île-de-France · Qualiopi',
  cities: ['Melun', 'Meaux', 'Chelles', 'Pontault-Combault', 'Torcy', 'Fontainebleau', 'Provins'],
  chefLieu: 'Melun',
  perimetre:
    'de Marne-la-Vallée aux zones industrielles du nord et aux bassins plus ruraux au sud et à l’est',
  axes: 'A4, Francilienne, grands pôles de Meaux et de la Vallée',
  temoignageZone: 'en Seine-et-Marne',
});

/** Essonne (91) */
export const FORMATION_IA_BTP_ESSONNE_91 = buildDeptConfig({
  path: '/formation-ia-btp-essonne-91',
  deptCode: '91',
  departementNom: 'Essonne',
  h1: 'Formation IA BTP dans l’Essonne (91) — Qualiopi, finançable Constructys',
  metaTitle: 'Formation IA BTP Essonne (91) | Laure Olivié Qualiopi',
  metaDescription:
    'Formation IA & ChatGPT BTP en Essonne : Évry, Massy, Palaiseau, Corbeil. Présentiel ou visio. Organisme Qualiopi, finançable Constructys selon dossier.',
  keywords: [
    'formation IA BTP 91',
    'formation ChatGPT Essonne',
    'Qualiopi 91',
    'formation IA Massy',
    'formation IA Évry',
  ],
  badgeLine: 'Essonne (91) · Île-de-France · Qualiopi',
  cities: [
    'Évry-Courcouronnes',
    'Corbeil-Essonnes',
    'Massy',
    'Palaiseau',
    'Yerres',
    'Draveil',
    'Savigny-sur-Orge',
  ],
  chefLieu: 'Évry-Courcouronnes',
  perimetre:
    'Silicon Valley française, pôles universitaires, tissu de PME industrielles et de sous-traitance BTP',
  axes: 'A6, Francilienne sud, liaison Massy–Évry',
  temoignageZone: 'en Essonne',
});

/** Hauts-de-Seine (92) */
export const FORMATION_IA_BTP_HAUTS_DE_SEINE_92 = buildDeptConfig({
  path: '/formation-ia-btp-hauts-de-seine-92',
  deptCode: '92',
  departementNom: 'Hauts-de-Seine',
  h1: 'Formation IA BTP dans les Hauts-de-Seine (92) — Qualiopi, finançable Constructys',
  metaTitle: 'Formation IA BTP Hauts-de-Seine (92) | Laure Olivié Qualiopi',
  metaDescription:
    'Formation IA BTP & ChatGPT dans les Hauts-de-Seine : Nanterre, Boulogne, La Défense. Qualiopi, sessions 4 h, finançable Constructys selon éligibilité.',
  keywords: [
    'formation IA BTP 92',
    'formation ChatGPT Hauts-de-Seine',
    'Qualiopi 92',
    'formation IA Nanterre',
    'formation IA Boulogne',
  ],
  badgeLine: 'Hauts-de-Seine (92) · Île-de-France · Qualiopi',
  cities: [
    'Nanterre',
    'Boulogne-Billancourt',
    'Courbevoie',
    'Levallois-Perret',
    'Colombes',
    'Asnières-sur-Seine',
    'Clamart',
  ],
  chefLieu: 'Nanterre',
  perimetre:
    'tissu dense de PME du bâtiment, proximité La Défense et Paris, forte demande sur mémoires techniques et délais courts',
  axes: 'A86, A15, boulevard périphérique ouest',
  temoignageZone: 'dans les Hauts-de-Seine',
});

/** Seine-Saint-Denis (93) */
export const FORMATION_IA_BTP_SEINE_SAINT_DENIS_93 = buildDeptConfig({
  path: '/formation-ia-btp-seine-saint-denis-93',
  deptCode: '93',
  departementNom: 'Seine-Saint-Denis',
  h1: 'Formation IA BTP en Seine-Saint-Denis (93) — Qualiopi, finançable Constructys',
  metaTitle: 'Formation IA BTP Seine-Saint-Denis (93) | Laure Olivié Qualiopi',
  metaDescription:
    'Formation IA & ChatGPT pour le BTP en Seine-Saint-Denis : Saint-Denis, Montreuil, Bobigny. Qualiopi, 4 h, 100% finançable Constructys selon dossier.',
  keywords: [
    'formation IA BTP 93',
    'formation ChatGPT Seine-Saint-Denis',
    'Qualiopi 93',
    'formation IA Saint-Denis',
    'formation IA Montreuil',
  ],
  badgeLine: 'Seine-Saint-Denis (93) · Île-de-France · Qualiopi',
  cities: [
    'Saint-Denis',
    'Montreuil',
    'Aubervilliers',
    'Pantin',
    'Bobigny',
    'Drancy',
    'Noisy-le-Grand',
  ],
  chefLieu: 'Bobigny',
  perimetre:
    'Grand Paris, nombreux marchés publics de collectivités, entreprises de travaux et second œuvre très présentes',
  axes: 'A1, A3, Francilienne nord-est',
  temoignageZone: 'en Seine-Saint-Denis',
});

/** Val-de-Marne (94) */
export const FORMATION_IA_BTP_VAL_DE_MARNE_94 = buildDeptConfig({
  path: '/formation-ia-btp-val-de-marne-94',
  deptCode: '94',
  departementNom: 'Val-de-Marne',
  h1: 'Formation IA BTP dans le Val-de-Marne (94) — Qualiopi, finançable Constructys',
  metaTitle: 'Formation IA BTP Val-de-Marne (94) | Laure Olivié Qualiopi',
  metaDescription:
    'Formation IA BTP & ChatGPT dans le 94 : Créteil, Vitry, Saint-Maur. Présentiel ou distanciel. Qualiopi, finançable Constructys pour entreprises BTP.',
  keywords: [
    'formation IA BTP 94',
    'formation ChatGPT Val-de-Marne',
    'Qualiopi 94',
    'formation IA Créteil',
    'formation IA Vitry',
  ],
  badgeLine: 'Val-de-Marne (94) · Île-de-France · Qualiopi',
  cities: [
    'Créteil',
    'Vitry-sur-Seine',
    'Saint-Maur-des-Fossés',
    'Champigny-sur-Marne',
    'Vincennes',
    'Ivry-sur-Seine',
    'Nogent-sur-Marne',
  ],
  chefLieu: 'Créteil',
  perimetre:
    'lisière parisienne, rénovation urbaine, marchés mixtes public-privé, PME et artisans très sollicités',
  axes: 'A4, A86, boulevard périphérique sud-est',
  temoignageZone: 'dans le Val-de-Marne',
});

/** Val-d’Oise (95) */
export const FORMATION_IA_BTP_VAL_DOISE_95 = buildDeptConfig({
  path: '/formation-ia-btp-val-doise-95',
  deptCode: '95',
  departementNom: "Val-d'Oise",
  h1: 'Formation IA BTP dans le Val-d’Oise (95) — Qualiopi, finançable Constructys',
  metaTitle: "Formation IA BTP Val-d'Oise (95) | Laure Olivié Qualiopi",
  metaDescription:
    "Formation IA & ChatGPT BTP dans le Val-d'Oise : Cergy, Argenteuil, Sarcelles. Qualiopi, 4 h, finançable Constructys. Interventions en entreprise.",
  keywords: [
    "formation IA BTP 95",
    "formation ChatGPT Val-d'Oise",
    'Qualiopi 95',
    'formation IA Cergy',
    'formation IA Argenteuil',
  ],
  badgeLine: "Val-d'Oise (95) · Île-de-France · Qualiopi",
  cities: ['Cergy', 'Argenteuil', 'Sarcelles', 'Garges-lès-Gonesse', 'Franconville', 'Ermont', 'Bezons'],
  chefLieu: 'Cergy-Pontoise',
  perimetre:
    'pôles de Cergy et d’Argenteuil, tissu d’artisans et de PME du bâtiment, liaison avec le Grand Roissy et le nord francilien',
  axes: 'A15, A115, Francilienne nord',
  temoignageZone: "dans le Val-d'Oise",
});

/** URLs des 7 landings SEO « formation IA BTP » par département (sitemap, contrôle maillage). */
export const FORMATION_IA_BTP_DEPT_LANDING_PATHS = [
  FORMATION_IA_BTP_SEINE_ET_MARNE_77.path,
  FORMATION_IA_BTP_YVELINES_78.path,
  FORMATION_IA_BTP_ESSONNE_91.path,
  FORMATION_IA_BTP_HAUTS_DE_SEINE_92.path,
  FORMATION_IA_BTP_SEINE_SAINT_DENIS_93.path,
  FORMATION_IA_BTP_VAL_DE_MARNE_94.path,
  FORMATION_IA_BTP_VAL_DOISE_95.path,
] as const;
