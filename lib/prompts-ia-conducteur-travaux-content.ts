/**
 * Contenu — page `/prompts-ia-conducteur-travaux`
 */

export const PROMPTS_IA_CONDUCTEUR_TRAVAUX_PATH = '/prompts-ia-conducteur-travaux' as const;

export const PROMPTS_IA_CONDUCTEUR_INTRO = [
  'Un conducteur de travaux consacre une part importante de sa semaine à transformer de l\'information brute en documents exploitables : comptes rendus, tableaux de suivi, courriers, trames réglementaires. Entre la réunion du matin, la visite de l\'après-midi et les relances en fin de journée, la rédaction finit souvent le soir ou le week-end.',
  'Ces vingt prompts fonctionnent avec ChatGPT ou Claude : remplacez les variables entre crochets, collez vos notes ou extraits, obtenez un premier jet structuré. L\'IA ne remplace pas votre jugement terrain — relisez, complétez et validez avant envoi ou archivage. Chaque prompt se termine par une consigne de contrôle humain.',
  'Organisés en quatre blocs (préparation, suivi quotidien, réglementaire, communication), ils couvrent les tâches les plus récurrentes en conduite de travaux. Anonymisez noms, adresses et montants sensibles avant collage dans un outil en ligne. Testez d\'abord sur un dossier non critique, puis réutilisez les trames sur vos chantiers en cours.',
] as const;

export type PromptSection = {
  id: string;
  title: string;
  prompts: readonly {
    title: string;
    body: string;
    outcome: string;
  }[];
};

export const PROMPTS_IA_CONDUCTEUR_SECTIONS: readonly PromptSection[] = [
  {
    id: 'preparation-chantier',
    title: 'Préparation de chantier',
    prompts: [
      {
        title: 'Synthèse CCTP avant réunion de lancement',
        body: `Vous êtes conducteur de travaux sur le chantier [CHANTIER], lot [LOT].
Voici un extrait du CCTP concernant [SUJET] :
[Collez l'extrait]

Identifiez les exigences techniques, références normatives, interfaces avec les autres lots et points à clarifier avec le MOE.
Présentez le résultat en tableau : exigence / source / impact chantier / question ouverte.
Relisez chaque citation avec le document original avant la réunion.`,
        outcome: 'Une grille de lecture prête pour la réunion de lancement, avec les questions MOE déjà formulées.',
      },
      {
        title: 'Plan de coordination des lots',
        body: `Vous êtes conducteur de travaux pour [ENTREPRISE], chantier [CHANTIER].
Lots présents : [LISTE DES LOTS]
Phases principales : [LISTE DES PHASES]
Contraintes connues : [ACCÈS, COACTIVITÉ, LIVRAISONS, HORAIRES…]

Proposez un plan de coordination des lots : séquencement par phase, interfaces critiques, points de contrôle communs.
Format tableau ou liste numérotée, une page maximum.
Validez les dates et interfaces avec les entreprises avant diffusion.`,
        outcome: 'Un canevas de coordination partagé avec les lots, repère pour les réunions hebdomadaires.',
      },
      {
        title: 'Check-list démarrage chantier',
        body: `Vous êtes conducteur de travaux sur [CHANTIER], démarrage prévu le [DATE].
Données : nature des travaux [NATURE], effectif moyen [EFFECTIF], durée [DUREE], entreprises titulaires [LISTE].

Générez une check-list de démarrage chantier : documents contractuels, autorisations, plans, PPSPS, brief sécurité, réunion de lancement, contrôles matériels.
Pour chaque item : statut (OK / en cours / manquant), responsable, échéance.
Contrôlez chaque ligne sur le terrain avant ouverture du chantier.`,
        outcome: 'Une check-list actionnable pour ne rien oublier les premiers jours de chantier.',
      },
      {
        title: 'Interfaces entre corps d\'état',
        body: `Vous êtes conducteur de travaux sur [CHANTIER].
Lots en interface : [LOT A] et [LOT B]
Zone concernée : [LOCALISATION]
Extrait CCTP ou note de réunion :
[Collez le texte]

Listez les interfaces techniques entre ces lots : qui fait quoi, dans quel ordre, avec quels contrôles communs.
Signalez les zones grises et les questions à trancher en réunion.
Vérifiez chaque interface sur plans et CCTP avant engagement des entreprises.`,
        outcome: 'Un mémo d\'interfaces clair pour éviter les reprises et les litiges entre lots.',
      },
      {
        title: 'Ordre du jour réunion de lancement',
        body: `Vous êtes conducteur de travaux sur [CHANTIER], réunion de lancement le [DATE].
Participants attendus : [LISTE MOE, MOA, ENTREPRISES, SST…]
Documents disponibles : [PLANS, CCTP, PLANNING, PPSPS…]

Rédigez un ordre du jour de réunion de lancement : points obligatoires, durée indicative, documents à projeter, décisions attendues.
Format numéroté, ton professionnel, une page maximum.
Validez l'ordre du jour avec le MOE avant envoi des convocations.`,
        outcome: 'Une réunion de lancement cadrée, sans oubli des sujets contractuels et sécurité.',
      },
    ],
  },
  {
    id: 'suivi-quotidien',
    title: 'Suivi quotidien',
    prompts: [
      {
        title: 'CR depuis notes vocales',
        body: `Vous êtes conducteur de travaux pour [ENTREPRISE], chantier [CHANTIER].
Voici la transcription de mes notes vocales de la réunion du [DATE] :
[Collez la transcription ou vos notes brutes]

Rédigez un compte rendu structuré : participants, avancement par lot, points bloquants, actions (responsable + délai), réserves, date prochaine réunion.
Ton professionnel, format CR BTP standard.
Relisez et validez chaque fait, chiffre et nom avant diffusion.`,
        outcome: 'Un CR prêt à envoyer en quinze minutes au lieu d\'une heure de retranscription manuelle.',
      },
      {
        title: 'Tableau de suivi des réserves',
        body: `Vous êtes conducteur de travaux sur [CHANTIER].
Liste actuelle des réserves (notes, PV ou photos commentées) :
[Collez la liste brute]

Construisez un tableau : n° réserve, lot, localisation, description, responsable, date levée prévue, statut (ouverte / en cours / levée).
Classez par lot puis par priorité.
Contrôlez chaque ligne sur le terrain et avec les entreprises avant diffusion.`,
        outcome: 'Un tableau de pilotage des réserves exploitable en réunion de chantier.',
      },
      {
        title: 'Synthèse des causes de retard',
        body: `Vous êtes conducteur de travaux pour [ENTREPRISE], chantier [CHANTIER].
Retard constaté sur [LOT / PHASE] : [DESCRIPTION BRÈVE]
Causes identifiées : [LISTE BRUTE : intempéries, approvisionnement, sous-traitant, MOE…]

Rédigez une synthèse pour le MOE : faits datés, impacts planning, mesures de reprise proposées.
250 mots maximum, ton factuel sans accusation.
Vérifiez dates et causes avec vos notes de chantier avant envoi.`,
        outcome: 'Un courrier ou mail MOE structuré pour documenter un aléa et proposer une reprise.',
      },
      {
        title: 'Point d\'avancement hebdomadaire',
        body: `Vous êtes conducteur de travaux sur [CHANTIER], semaine du [DATE DEBUT] au [DATE FIN].
Avancement constaté par lot :
[Collez vos notes ou pourcentages bruts]
Points bloquants : [LISTE]
Actions de la semaine prochaine : [LISTE]

Rédigez un point d'avancement hebdomadaire : synthèse par lot, écarts au planning, risques, décisions attendues.
Format court, prêt à intégrer dans un mail ou un CR.
Validez les pourcentages et dates avec vos relevés terrain.`,
        outcome: 'Un récapitulatif hebdomadaire lisible pour la direction et le MOE.',
      },
      {
        title: 'Relance interne — lot en retard',
        body: `Vous êtes conducteur de travaux sur [CHANTIER].
Le lot [LOT] est en retard sur [TÂCHE / PHASE], constaté le [DATE].
Engagement initial : [DESCRIPTION]
Situation actuelle : [DESCRIPTION]

Rédigez un mail interne de relance à l'entreprise du lot : rappel des engagements, écart constaté, action attendue sous [DELAI].
Ton ferme et factuel, 150 mots maximum.
Relisez les références contractuelles avant envoi ; pas de promesse de délai non validée.`,
        outcome: 'Une relance traçable, utile avant d\'escalader vers un courrier formel MOE.',
      },
    ],
  },
  {
    id: 'documents-reglementaires',
    title: 'Documents réglementaires',
    prompts: [
      {
        title: 'Trame PPSPS',
        body: `Vous êtes conducteur de travaux pour [ENTREPRISE], chantier [CHANTIER].
Données : nature [NATURE], effectif moyen [EFFECTIF], durée [DUREE], lots [LOTS], coordinateur SPS [NOM SI CONNU].

Proposez une trame PPSPS (8 chapitres R4532-56 à R4532-77) : organisation sécurité, accès, risques par phase, EPI, consignes urgence.
Indiquez [À COMPLÉTER] pour les zones à valider avec le coordinateur SPS.
Faites relire et valider par votre référent SST avant diffusion sur le chantier.`,
        outcome: 'Une base PPSPS structurée à compléter avec l\'équipe sécurité — pas un document conforme sans validation SST.',
      },
      {
        title: 'Extraction risques pour le DUERP',
        body: `Vous êtes conducteur de travaux sur [CHANTIER], entreprise [ENTREPRISE].
Activités et phases de travaux :
[Collez la liste des phases et tâches]

Identifiez les risques professionnels associés à chaque phase : danger, personnes exposées, mesures de prévention existantes ou à prévoir.
Format tableau : phase / risque / mesures / responsable.
Soumettez le tableau au référent SST ou direction pour intégration au DUERP — ne pas publier seul.`,
        outcome: 'Une matrice de risques chantier prête pour alimenter le DUERP avec l\'expert SST.',
      },
      {
        title: 'Fiche contrôle sécurité hebdomadaire',
        body: `Vous êtes conducteur de travaux sur [CHANTIER], semaine du [DATE].
Points observés en visite : [ACCÈS, EPI, SIGNALISATION, ORDRE, TRAVAUX EN COURS…]
Incidents ou quasi-accidents : [LISTE OU « AUCUN »]

Rédigez une fiche de contrôle sécurité hebdomadaire : constats, non-conformités, actions correctives (responsable + délai).
Ton factuel, sans minimiser ni dramatiser.
Validez chaque constat avec le coordinateur SPS ou référent SST avant archivage.`,
        outcome: 'Une trace hebdomadaire QSE pour le chantier et les réunions de coordination sécurité.',
      },
      {
        title: 'PV de réunion sécurité',
        body: `Vous êtes conducteur de travaux sur [CHANTIER], réunion sécurité du [DATE].
Participants : [LISTE]
Notes brutes :
[Collez vos notes]

Rédigez un procès-verbal de réunion sécurité : sujets abordés, décisions, actions (responsable + délai), prochaine date.
Format professionnel, une à deux pages maximum.
Relisez les noms, dates et mesures avec les participants avant diffusion.`,
        outcome: 'Un PV sécurité archivable, aligné sur vos obligations de traçabilité chantier.',
      },
      {
        title: 'Structuration d\'un DOE',
        body: `Vous êtes conducteur de travaux pour [ENTREPRISE], marché [CHANTIER], réception prévue le [DATE].
Pièces disponibles : [LISTE : plans, PV essais, fiches techniques, attestations…]

Structurez un DOE en chapitres types BTP. Pour chaque chapitre : documents attendus, statut (OK / manquant / à compléter), action corrective, responsable.
Format tableau, synthèse sur deux pages maximum.
Contrôlez chaque pièce avec les entreprises et le MOE avant remise du dossier.`,
        outcome: 'Une feuille de route DOE pour suivre les pièces manquantes avant réception.',
      },
    ],
  },
  {
    id: 'communication',
    title: 'Communication MOA / MOE / sous-traitants',
    prompts: [
      {
        title: 'Courrier de relance sous-traitant',
        body: `Vous êtes conducteur de travaux pour [ENTREPRISE], chantier [CHANTIER].
Le sous-traitant du lot [LOT] n'a pas répondu à [OBJET DE LA DEMANDE], relance n° [NUMERO], envoyée le [DATE].

Rédigez un courrier de relance formel : engagement rappelé, délai dépassé, conséquences possibles sur le planning, réponse attendue sous [DELAI].
150 à 200 mots, ton ferme et factuel.
Relisez les références contractuelles avant envoi ; la validation reste votre responsabilité.`,
        outcome: 'Un courrier AR ou mail formel pour relancer sans rédiger de zéro.',
      },
      {
        title: 'Email MOE — clarification CCTP',
        body: `Vous êtes conducteur de travaux sur [CHANTIER], lot [LOT].
Point à clarifier dans le CCTP : [SUJET]
Extrait concerné :
[Collez l'extrait]
Impact sur l'exécution : [DESCRIPTION BRÈVE]

Rédigez un email au MOE demandant une clarification écrite : contexte, citation, question précise, proposition de réponse attendue.
120 à 180 mots, ton professionnel.
Vérifiez la citation CCTP avant envoi ; n'interprétez pas seul une clause ambiguë.`,
        outcome: 'Une demande MOE claire pour trancher un point technique avant exécution.',
      },
      {
        title: 'Synthèse MOA — état d\'avancement',
        body: `Vous êtes conducteur de travaux pour [ENTREPRISE], chantier [CHANTIER].
Période couverte : [DATE DEBUT] au [DATE FIN]
Avancement global : [DESCRIPTION]
Points sensibles : [LISTE]
Prochaines échéances : [LISTE]

Rédigez une synthèse d'état d'avancement pour le MOA : faits, avancement par grand lot, points d'attention, besoins de décision.
300 mots maximum, ton rassurant et factuel — pas de langage commercial.
Validez les chiffres et dates avec votre suivi interne avant envoi.`,
        outcome: 'Un mail ou note MOA lisible pour un maître d\'ouvrage non technique.',
      },
      {
        title: 'Convocation réunion de chantier',
        body: `Vous êtes conducteur de travaux sur [CHANTIER].
Réunion prévue le [DATE] à [HEURE], lieu [LIEU OU VISIO].
Ordre du jour proposé : [LISTE NUMÉROTÉE]
Participants à convoquer : [LISTE]

Rédigez un mail de convocation : objet, date, lieu, ordre du jour, documents à préparer, délai de confirmation de présence.
Format prêt à envoyer, ton professionnel.
Vérifiez disponibilités des participants clés avant envoi massif.`,
        outcome: 'Une convocation complète en quelques minutes, avec ordre du jour joint.',
      },
      {
        title: 'Courrier réserves avant réception',
        body: `Vous êtes conducteur de travaux sur [CHANTIER], visite pré-réception le [DATE].
Réserves constatées :
[Collez la liste ou les notes de visite]

Rédigez un courrier de notification des réserves aux entreprises concernées : rappel du contexte, liste des réserves par lot, délais de levée proposés, conséquences en cas de non-traitement.
Ton formel et factuel, structuré par lot.
Contrôlez chaque réserve sur photos et PV avant envoi ; faites valider par le MOE si requis.`,
        outcome: 'Un courrier de réserves structuré pour lancer la phase de levée avant réception.',
      },
    ],
  },
] as const;
