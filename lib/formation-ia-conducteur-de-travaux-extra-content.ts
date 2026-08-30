/**
 * Contenu complémentaire — landing `/formation-ia-conducteur-de-travaux`
 * (prompts, étude de cas, FAQ étendues).
 */

export const PROMPTS_SECTION_INTRO =
  'Remplacez les variables entre crochets, collez le prompt dans ChatGPT ou Claude, puis relisez et validez le résultat avant envoi ou diffusion sur le chantier.';

export const CONDUCTEUR_PROMPTS = [
  {
    title: 'CR de chantier depuis notes vocales',
    body: `Vous êtes conducteur de travaux pour [ENTREPRISE], chantier [CHANTIER].
Voici la transcription de mes notes vocales de la réunion du [DATE] :
[Collez la transcription ou vos notes brutes]

Rédigez un compte rendu de chantier structuré avec : participants, avancement par lot, points bloquants, actions (responsable + délai), réserves signalées et date de la prochaine réunion.
Ton professionnel, format CR BTP standard, une à deux pages maximum.
Relisez et validez chaque fait, chiffre et nom de participant avant diffusion au MOE.`,
  },
  {
    title: "Analyse d'un extrait de CCTP",
    body: `Vous êtes conducteur de travaux sur le chantier [CHANTIER], lot [LOT].
Voici un extrait du CCTP concernant [SUJET] :
[Collez l'extrait]

Identifiez les exigences techniques, les références normatives citées, les interfaces avec les autres lots et les points à clarifier avec le MOE.
Présentez le résultat en tableau : exigence / source / impact chantier / question ouverte.
Maximum 15 lignes, vocabulaire BTP, sans interprétation juridique.
Vérifiez chaque citation et chaque référence normative auprès du document original avant toute décision.`,
  },
  {
    title: 'Courrier de relance sous-traitant',
    body: `Vous êtes conducteur de travaux pour [ENTREPRISE], chantier [CHANTIER].
Le sous-traitant du lot [LOT] n'a pas répondu à [OBJET DE LA DEMANDE], relance n° [NUMERO], envoyée le [DATE].

Rédigez un courrier de relance formel rappelant l'engagement contractuel, le délai dépassé et les conséquences possibles sur le planning.
150 à 200 mots, ton ferme et factuel, avec demande de réponse sous [DELAI].
Format prêt à copier dans un mail ou courrier AR.
Relisez et adaptez les références contractuelles avant envoi ; la validation reste votre responsabilité.`,
  },
  {
    title: 'Tableau de suivi des réserves',
    body: `Vous êtes conducteur de travaux sur le chantier [CHANTIER].
Voici la liste actuelle des réserves (notes de visite, PV ou photos commentées) :
[Collez la liste brute]

Construisez un tableau de suivi avec colonnes : n° réserve, lot, localisation, description, responsable, date levée prévue, statut (ouverte / en cours / levée).
Classez par lot puis par priorité, une ligne par réserve.
Format markdown ou tableau prêt à intégrer dans votre outil de suivi.
Contrôlez chaque ligne sur le terrain et avec les entreprises concernées avant diffusion.`,
  },
  {
    title: 'Synthèse des causes de retard',
    body: `Vous êtes conducteur de travaux pour [ENTREPRISE], chantier [CHANTIER].
Retard constaté sur [LOT / PHASE] : [DESCRIPTION BRÈVE DU RETARD]
Causes identifiées (liste brute) : [intempéries, approvisionnement, sous-traitant, MOE, coactivité…]

Rédigez une synthèse des causes de retard pour le MOE : faits datés, impacts sur le planning, mesures de reprise proposées.
Format structuré, 250 mots maximum, ton factuel sans accusation.
Indiquez les pièces justificatives à joindre le cas échéant.
Vérifiez dates, causes et impacts avec vos notes de chantier avant envoi.`,
  },
  {
    title: 'Ordre du jour de réunion de chantier',
    body: `Vous êtes conducteur de travaux sur le chantier [CHANTIER], réunion prévue le [DATE].
Dossiers en cours : [LISTE DES SUJETS : lots, réserves, planning, sécurité, approvisionnements…]
Participants attendus : [LISTE]

Proposez un ordre du jour de réunion de chantier avec durée indicative par point, documents à préparer et décisions attendues.
Format numéroté, une page maximum, du plus urgent au plus informatif.
Précisez qui doit intervenir sur chaque point.
Validez l'ordre du jour avec les participants clés et ajustez les priorités selon l'état réel du chantier.`,
  },
  {
    title: 'Trame PPSPS',
    body: `Vous êtes conducteur de travaux pour [ENTREPRISE], chantier [CHANTIER].
Données : nature des travaux [NATURE], effectif moyen [EFFECTIF], durée [DUREE], lots principaux [LOTS], coordinateur SPS [NOM SI CONNU].

Proposez une trame PPSPS selon la structure réglementaire (8 chapitres R4532-56 à R4532-77) : organisation sécurité, accès et circulation, risques par phase, EPI, consignes urgence.
Indiquez [À COMPLÉTER] pour les zones à valider avec le coordinateur SPS.
Format titres et puces, sans inventer de mesures non justifiées par le chantier.
Ce document est une aide à la rédaction : faites-le relire et valider par votre référent SST avant diffusion sur le chantier.`,
  },
  {
    title: "Structuration d'un DOE",
    body: `Vous êtes conducteur de travaux pour [ENTREPRISE], marché [CHANTIER], réception prévue le [DATE].
Pièces disponibles : [LISTE : plans, PV essais, fiches techniques, attestations, notices…]

Structurez un DOE en chapitres types BTP. Pour chaque chapitre : documents attendus, statut (OK / manquant / à compléter), action corrective et responsable.
Format tableau markdown, synthèse sur deux pages maximum.
Signalez les pièces bloquantes pour la réception.
Contrôlez chaque pièce listée avec les entreprises et le MOE avant remise du dossier.`,
  },
] as const;

export const ETUDE_CAS_FFB_CSFE_PARAGRAPHS = [
  'Depuis 2024, OFC Création d\'Entreprise intervient auprès des fédérations FFB et CSFE pour sensibiliser les conducteurs de travaux et les équipes terrain à l\'usage responsable de l\'IA. Les sessions, organisées en présentiel au sein des délégations régionales ou en intra sur demande, s\'adressent à des profils variés : conducteurs de travaux, chefs de chantier, responsables QSE et dirigeants de PME du bâtiment.',
  'Le programme reprend les cas d\'usage identifiés sur le terrain : comptes rendus de chantier, analyse de CCTP, courriers MOE, suivi des réserves et préparation documentaire (PPSPS, DOE). Chaque module alterne démonstration et pratique sur des documents anonymisés, avec une charte d\'usage et des règles de relecture systématique avant diffusion.',
  'Les retours des participants mettent en avant le gain de temps sur l\'administratif quotidien et la montée en compétence progressive de toute l\'équipe travaux. Les prompts testés en session sont réutilisables dès le lendemain sur les dossiers internes, sous réserve d\'anonymisation et de validation humaine.',
  'Les fédérations proposent ces modules dans le cadre de leur offre de formation continue ; le financement OPCO reste soumis à l\'éligibilité de chaque adhérent. Pour le détail des parcours, des modules et des modalités d\'inscription, consultez l\'étude de cas complète via le lien ci-dessous.',
] as const;

export const CONDUCTEUR_FAQ_EXTRA = [
  {
    q: 'Faut-il un abonnement payant à ChatGPT ou Claude ?',
    a: 'Non, ce n\'est pas obligatoire. Les versions gratuites de ChatGPT et Claude suffisent pour démarrer sur des CR, courriers et synthèses courtes. Pour des documents longs (CCTP, DCE) ou un usage intensif en équipe, un abonnement professionnel peut être pertinent. La formation compare les deux outils et vous aide à choisir selon vos cas d\'usage, sans imposer de dépense mensuelle.',
  },
  {
    q: 'Que deviennent les documents de chantier envoyés à l\u2019IA ?',
    a: 'Les données transmises sont traitées selon les conditions de l\'outil utilisé (ChatGPT, Claude) et de votre paramétrage (compte personnel ou entreprise). En formation, nous travaillons sur des documents anonymisés et rappelons les bonnes pratiques : retirer noms, adresses et montants sensibles avant collage, vérifier la politique de confidentialité de votre éditeur, ne pas transmettre de pièces contractuelles non autorisées. La validation et la diffusion restent sous votre responsabilité.',
  },
  {
    q: 'L\u2019IA peut-elle rédiger un PPSPS conforme ?',
    a: 'L\'IA peut proposer une trame et un premier jet structuré selon le type de chantier, mais elle ne garantit pas la conformité réglementaire ni l\'adéquation aux risques réels du site. Le PPSPS doit être relu, complété et validé par votre référent SST ou coordinateur SPS avant mise en place. En formation, vous apprenez à utiliser l\'IA comme aide à la rédaction, pas comme substitut à l\'expertise sécurité.',
  },
] as const;
