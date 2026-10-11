import type { TutoData } from './types';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';

export const TUTO_SKILL_RECOUVREMENT_RG_OFC: TutoData = {
  slug: 'tuto-skill-recouvrement-rg-ofc',
  category: 'marches-et-veille',
  pdfFile: 'tuto-skill-recouvrement-rg-ofc.docx',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Recouvrement & retenue de garantie',
  shortTitle: 'Skill recouvrement & RG',
  subtitle:
    "Le tutoriel pas à pas pour transformer une facture impayée ou une retenue de garantie bloquée en dossier de relance argumenté — 15 minutes au lieu d'une demi-journée.",

  metaTitle: 'Tuto skill recouvrement RG : relances en 15 min',
  metaDescription:
    'Tuto skill recouvrement et retenue de garantie BTP : mise en demeure, art. 1799-1 et libération RG avec Claude. Formation IA pour le BTP — Word gratuit.',
  keywords: [
    'recouvrement BTP',
    'retenue de garantie',
    'libération retenue de garantie',
    'article 1799-1',
    'garantie de paiement',
    'mise en demeure facture',
    'impayés chantier',
    'pénalités de retard',
    'skill Claude recouvrement',
    'tuto recouvrement RG',
    'marché privé marché public',
    'sous-traitance action directe',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
  ],
  ogImageAlt: RESSOURCES_MINIATURES.tutoRecouvrementRg.alt,

  publishedAt: '2026-10-11',
  updatedAt: '2026-10-11',

  cardSummary:
    'Transforme une facture impayée ou une RG bloquée en dossier de relance argumenté : mise en demeure, garantie de paiement 1799-1 et libération de RG — 15 minutes au lieu d’une demi-journée.',

  totalTimeMinutes: 15,

  heroImage: RESSOURCES_MINIATURES.tutoRecouvrementRg,

  heroLearnPoints: [
    'Construire un assistant qui connaît tes propres contrats, CGV et marchés',
    "Maîtriser les textes qui sécurisent ton paiement, de l'article 1799-1 au Code de la commande publique",
    'Produire mise en demeure, demande de garantie de paiement et demande de libération de RG en quelques minutes',
    'Garder une trace écrite, datée et opposable pour chaque créance',
  ],

  introTitle: 'Pourquoi un skill recouvrement & retenue de garantie ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Dans le BTP, la marge se joue rarement sur le chiffrage : elle se joue sur la trésorerie. Deux mécanismes la rongent en silence. D'abord les impayés — situations de travaux réglées en retard par le client ou le maître d'ouvrage. Ensuite la retenue de garantie : 5 % de chaque marché immobilisés pendant un an, qui dorment souvent bien au-delà parce que personne n'a le temps de réclamer leur libération.",
    },
    {
      kind: 'paragraph',
      text:
        "Le problème n'est presque jamais juridique : le droit est largement de ton côté. Le problème est administratif. Relancer au bon moment, citer le bon texte, envoyer le bon courrier en recommandé, tracer chaque échéance — c'est du temps que le dirigeant ou le conducteur de travaux n'a pas. Résultat : des sommes importantes restent chez le client faute d'une relance écrite et argumentée.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        "Tu décris l'impayé en deux lignes, le skill rédige la mise en demeure, datée et chiffrée",
        "Il calcule les pénalités de retard et l'indemnité forfaitaire dues de plein droit",
        'Il distingue marché privé et marché public — les règles ne sont pas les mêmes',
        "Il sait préparer la demande de garantie de paiement, l'action directe du sous-traitant et la libération de RG",
        'Il tient un tableau de suivi de tes créances avec les prochaines actions et leurs échéances',
      ],
    },
    {
      kind: 'highlight',
      text:
        "Tu ne remplaces pas ton avocat. Tu arrêtes de lui confier — ou pire, d'abandonner — les relances que tu peux mener toi-même, vite et proprement.",
    },
    {
      kind: 'callout',
      title: "L'arme la plus sous-utilisée du bâtiment",
      body:
        "L'article 1799-1 du Code civil oblige le maître d'ouvrage professionnel à te fournir une garantie de paiement dès que le marché privé dépasse 12 000 € HT. C'est d'ordre public. Tant que cette garantie n'est pas fournie et que tu restes impayé, tu peux suspendre les travaux après une mise en demeure restée 15 jours sans effet.",
    },
  ],

  sommaireTable: {
    title: 'Ta boîte à outils réglementaire',
    intro:
      "Voici les textes à donner à ton skill pour qu'il raisonne juste. Charge-les (ou leurs références) dans ta compétence : c'est ce qui transforme un assistant bavard en assistant fiable. Chaque ligne = un besoin concret, le texte qui le fonde, et ce que tu peux exiger. Vérifie toujours les textes en vigueur avant envoi.",
    headers: ['Besoin', 'Texte de référence', 'Ce que tu peux exiger'],
    rows: [
      {
        piece: 'Être payé dans les délais',
        contenu: 'C. commerce, art. L441-10 et D441-5',
        qui: '30 j par défaut (60 j max) ; pénalités de plein droit dès J+1 + indemnité de 40 €/facture',
      },
      {
        piece: 'Sécuriser un marché privé',
        contenu: 'C. civil, art. 1799-1 + décret n° 99-658 du 30/07/1999',
        qui: 'Caution de paiement dès 12 000 € HT ; à défaut, suspension des travaux après MED de 15 j',
      },
      {
        piece: 'Être payé en sous-traitance',
        contenu: 'Loi n° 75-1334 du 31/12/1975',
        qui: "Action directe contre le MOA (privé) ; paiement direct par l'acheteur (public)",
      },
      {
        piece: 'Récupérer la RG — privé',
        contenu: 'Loi n° 71-584 du 16/07/1971 (ordre public)',
        qui: 'Libération 1 an après réception, sauf opposition par LRAR ; consignation chez un tiers',
      },
      {
        piece: 'Récupérer la RG — public',
        contenu: 'Code de la commande publique (art. R2191-32 et s.)',
        qui: "Remboursement sous 30 j après l'expiration du délai de garantie ; taux réduit pour les PME",
      },
      {
        piece: 'Être payé par un acheteur public',
        contenu: 'Décret n° 2013-269 du 29/03/2013',
        qui: '30 j (50 j hôpitaux, 60 j EPIC) ; intérêts moratoires + 40 € automatiques ; renonciation interdite',
      },
      {
        piece: "Agir avant qu'il soit trop tard",
        contenu: 'C. civil, art. 2224 (5 ans) ; loi n° 68-1250 (4 ans, public)',
        qui: 'Délai pour réclamer en justice ; point de départ = date de la facture',
      },
      {
        piece: 'Forcer le paiement',
        contenu: 'Injonction de payer / référé provision',
        qui: "Titre exécutoire rapide quand l'amiable a échoué (avocat ou commissaire de justice)",
      },
    ],
    downloadLabel: 'Télécharger le Word du tuto',
  },

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction Compétences dans Claude',
      intro:
        "Un skill (« compétence ») est un mode d'emploi permanent que tu donnes à Claude une fois pour toutes. Une fois activé, tu n'as plus à réexpliquer ton contexte à chaque relance : Claude sait déjà comment tu travailles. Les compétences sont disponibles sur toutes les offres Claude, y compris la gratuite. La limite du gratuit, c'est le volume : il plafonne vite dès que tu joins des pièces lourdes (contrats scannés, marchés, états de situation). Pour un usage professionnel quotidien, l'offre Pro reste recommandée — environ 21 € TTC/mois, ou environ 17,50 €/mois en paiement annuel.",
      blocks: [
        { kind: 'h3', text: "1. Active l'exécution de code (indispensable)" },
        {
          kind: 'list',
          items: [
            'Sur claude.ai : Paramètres → Capacités',
            'Active « Exécution de code et création de fichiers »',
          ],
        },
        {
          kind: 'callout',
          title: 'Sans cette option',
          body:
            'Sans cette option, les compétences restent grisées et Claude ne peut pas produire tes courriers en Word ou PDF.',
        },
        { kind: 'h3', text: '2. Ouvre ton espace Compétences' },
        {
          kind: 'list',
          items: [
            'Va dans Personnaliser → Compétences',
            'Le bouton « + » puis « Créer une compétence » te permet de la construire avec Claude ou de téléverser un fichier ZIP existant',
            "Chaque compétence s'active ou se désactive d'un simple interrupteur dans la liste",
          ],
        },
        {
          kind: 'callout',
          title: 'En équipe (offres Team et Enterprise)',
          body:
            "L'administrateur active les compétences dans Paramètres de l'organisation → Plugins et compétences. Tu peux ensuite partager ta compétence avec tes collègues (menu « ⋯ » → Partager) : toute l'équipe relance avec les mêmes courriers et les mêmes règles. L'interface évolue régulièrement : si un libellé a changé, cherche « Compétences » ou « Skills » dans les paramètres.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro:
        "Un skill juridique ne vaut que par les documents que tu lui donnes. L'objectif n'est pas que Claude récite la loi en général, mais qu'il applique TES contrats et TES habitudes. Réunis ces cinq éléments avant de lancer la conversation.",
      blocks: [
        {
          kind: 'numberedList',
          items: [
            'Tes deux ou trois derniers dossiers réglés — une mise en demeure déjà envoyée, une demande de libération de RG aboutie, un échange qui a débloqué un paiement. Claude calque le ton et le niveau de fermeté qui te ressemblent.',
            'Tes CGV, devis-types et marchés courants — le skill doit savoir si tes contrats prévoient une retenue de garantie, une garantie de paiement, quel taux de pénalité tu mentionnes, quels délais tu accordes.',
            'Ta boîte à outils réglementaire — donne-lui le tableau du tuto : article 1799-1 et décret de 1999, loi de 1971 sur la RG privée, Code de la commande publique et décret 2013-269 pour le public, loi de 1975 sur la sous-traitance, articles L441-10 / D441-5 du Code de commerce et 2224 du Code civil.',
            "L'historique de tes créances en cours — un tableau simple : client, montant, date de facture, date d'échéance, marché privé ou public, RG retenue ou non, garantie de paiement obtenue ou non.",
            "Tes modèles de courriers — si tu as déjà une trame de relance, de mise en demeure ou de demande de caution, donne-la. Sinon, le skill en construira une que tu valideras une fois pour toutes.",
          ],
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Ouvre une nouvelle conversation, joins ta matière première (contrats, CGV, boîte à outils, modèles, tableau de créances) puis colle le prompt ci-dessous. Adapte les passages entre crochets à ton entreprise.',
      blocks: [
        {
          kind: 'prompt',
          title: 'Prompt — initialisation du skill',
          text: `Tu es mon assistant recouvrement & retenue de garantie pour
[NOM ENTREPRISE], [activité BTP].

Ta mission : m'aider à récupérer les sommes dues — factures impayées,
garanties de paiement et retenues de garantie — en t'appuyant sur les
textes que je te fournis.

Tu connais et appliques :
- C. civil art. 1799-1 + décret 99-658 (garantie de paiement, 12 000 € HT) ;
- loi n° 71-584 du 16/07/1971 (RG marché privé) ;
- Code de la commande publique + décret 2013-269 (RG et délais public) ;
- loi n° 75-1334 du 31/12/1975 (action directe / paiement direct) ;
- C. commerce art. L441-10 et D441-5 (délais, pénalités, indemnité 40 €) ;
- C. civil art. 2224 (prescription 5 ans).

Pour chaque dossier que je te décris, tu :
1. identifies marché privé ou public, impayé / garantie / RG ;
2. vérifies les dates (échéance, réception) et la prescription ;
3. me dis l'action possible aujourd'hui et la date de la suivante ;
4. rédiges le courrier adapté, daté, chiffré, prêt à signer ;
5. me signales toujours quand le dossier relève d'un conseil.

Pose-moi tes questions s'il te manque une info.
Ne cite jamais un texte dont tu n'es pas sûr.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            "La dernière consigne — « ne cite jamais un texte dont tu n'es pas sûr » et « signale-moi quand ça relève d'un conseil » — est ce qui rend le skill fiable. Un assistant qui sait dire « là, il faut un avocat » vaut bien plus qu'un assistant qui invente un article de loi.",
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro: 'Claude te propose une première version. Avant de l’activer définitivement, vérifie ces points.',
      blocks: [
        { kind: 'h3', text: 'Ce que tu dois vérifier' },
        {
          kind: 'list',
          items: [
            'Le skill distingue bien marché privé et marché public dans ses réponses',
            'Il calcule correctement les échéances (J+1 pénalités, 1 an pour la RG privée, 30 j en public)',
            'Il pense à la garantie de paiement 1799-1 quand le marché privé dépasse 12 000 € HT',
            "Il chiffre les pénalités et ajoute systématiquement l'indemnité de 40 €",
            "Il vérifie que la créance n'est pas prescrite avant de proposer une action",
            "Il refuse d'inventer un article et te renvoie vers un conseil quand c'est justifié",
          ],
        },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Trois corrections :
1. Pour tout marché privé > 12 000 € HT, rappelle-moi de réclamer
la garantie de paiement de l'article 1799-1 dès la signature.
2. Pour la RG privée : libération un an après réception, sauf
opposition par LRAR.
3. Avant chaque relance, indique-moi la date de prescription du dossier.`,
        },
        { kind: 'h3', text: 'Transforme-le en compétence' },
        {
          kind: 'paragraph',
          text:
            "Quand le comportement te convient, demande : « Transforme ces consignes en compétence réutilisable ». Claude te livre un dossier de compétence (fichier SKILL.md + annexes). Téléverse-le dans Personnaliser → Compétences, puis active-le.",
        },
        {
          kind: 'callout',
          title: 'La description décide de tout',
          body:
            "Claude lit la description de ta compétence (200 caractères max) pour savoir quand la déclencher. Écris-la avec tes mots du quotidien, par exemple : « Relances d'impayés, mises en demeure, garantie de paiement 1799-1 et libération de retenue de garantie pour [ENTREPRISE] ». Si la compétence ne se déclenche pas quand tu parles d'une facture en retard, c'est la description qu'il faut reformuler. Range aussi le tableau réglementaire en fichier annexe de la compétence : Claude ne le lira que quand il en a besoin.",
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai dossier',
      intro:
        'Un skill ne se valide jamais sur un cas théorique. Prends une créance réelle qui traîne et déroule-la en entier.',
      blocks: [
        { kind: 'h3', text: 'Le test' },
        {
          kind: 'list',
          items: [
            'Choisis une facture en retard ou une RG non libérée depuis plus d’un an',
            'Décris le dossier au skill en quelques lignes (montant, dates, privé ou public)',
            "Vérifie que l'action proposée, le texte cité et le courrier sont justes",
            'Imprime, signe, envoie en recommandé — et note la date dans ton tableau de suivi',
            "Reviens vers le skill à l'échéance suivante pour l'étape d'après",
          ],
        },
        { kind: 'h3', text: 'Le bon prompt pour un usage quotidien' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Nouveau dossier à traiter :
- Client / MOA : [NOM]             - Marché : [privé / public]
- Montant dû : [€ TTC]             - Sous-traitance : [oui/non]
- Facture émise le : [date]        - Échéance : [date]
- Réception des travaux le : [date si applicable]
- Retenue de garantie : [oui/non, montant]
- Garantie de paiement 1799-1 obtenue : [oui/non]
- Historique : [relances déjà faites]

Dis-moi l'action à mener aujourd'hui, l'échéance suivante, le risque
de prescription, et rédige le courrier correspondant prêt à signer.`,
        },
        {
          kind: 'callout',
          title: 'Pour aller plus loin',
          body:
            "Crée un Projet Claude « Recouvrement » et dépose-y ton tableau de créances : chaque nouvelle conversation part de la même base. Si ta messagerie Gmail est connectée à Claude, il peut aussi préparer le brouillon de relance directement dans ta boîte — l'envoi reste ta décision.",
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            "Une créance relancée par écrit, datée et chiffrée, se règle très souvent avant toute procédure. L'arme la plus efficace n'est pas l'avocat : c'est la régularité. Le skill existe pour que cette régularité ne dépende plus de ton temps disponible.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Les courriers générés ont-ils une valeur juridique ?',
      a: "Une mise en demeure rédigée avec le skill, relue, datée, signée de ta main et envoyée en recommandé avec accusé de réception a la même valeur qu'un courrier que tu aurais écrit toi-même : c'est l'envoi et la signature qui comptent, pas l'outil. Le skill produit des relances amiables, pas des actes de procédure : dès qu'on passe à l'injonction de payer ou au référé provision, ou si le client conteste la dette, il te renvoie vers un conseil.",
    },
    {
      q: "Pourquoi la distinction public / privé est-elle si importante ?",
      a: "Ce sont deux régimes différents. En marché privé, la RG suit la loi de 1971 : consignée, libérée un an après réception sauf opposition. En marché public, c'est le Code de la commande publique : remboursement dans les 30 jours suivant l'expiration du délai de garantie, et des délais de paiement encadrés par le décret de 2013 avec intérêts moratoires automatiques. Mélanger les deux est l'erreur la plus fréquente.",
    },
    {
      q: 'Jusqu’à quand puis-je réclamer une créance ?',
      a: "Entre professionnels, l'action en paiement se prescrit par cinq ans (article 2224 du Code civil). Sur les créances détenues sur une personne publique, c'est une prescription quadriennale (loi du 31 décembre 1968). Le skill calcule cette échéance pour chaque dossier : c'est ce qui évite de laisser dormir une créance jusqu'à ce qu'elle devienne irrécouvrable.",
    },
    {
      q: "La garantie de paiement de l'article 1799-1, comment l'obtenir ?",
      a: "Sur un marché privé supérieur à 12 000 € HT, le maître d'ouvrage professionnel doit te fournir une garantie de paiement. Tu la réclames par écrit. Tant qu'elle n'est pas fournie et que tu restes impayé, tu peux suspendre les travaux après une mise en demeure restée 15 jours sans effet.",
    },
    {
      q: 'Je suis sous-traitant impayé : que faire ?',
      a: "La loi du 31 décembre 1975 protège le sous-traitant : paiement direct par l'acheteur en marché public, action directe contre le maître d'ouvrage en marché privé, après mise en demeure de l'entrepreneur principal restée sans effet un mois. Le skill rédige les courriers dans le bon ordre.",
    },
    {
      q: 'Et mes données clients, que deviennent-elles ?',
      a: "Avant de joindre contrats et factures, vérifie dans Paramètres → Confidentialité que l'option permettant d'utiliser tes conversations pour améliorer Claude est désactivée. Ne joins que ce qui sert au dossier, et préfère une offre Team ou Enterprise si toute l'équipe travaille sur des données clients.",
    },
    {
      q: 'Et si je veux le construire accompagné ?',
      a: "En formation, on construit le skill ensemble sur tes propres dossiers : tu repars avec une compétence opérationnelle et tes équipes savent s'en servir.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle:
      'Formation en présentiel en Île-de-France — prise en charge OPCO/Constructys selon éligibilité',
    programTitle: 'Formation « Maîtriser Claude pour le BTP — Projects, Cowork et Skills »',
    programItems: [
      'On construit ton skill recouvrement & RG sur tes propres contrats et dossiers',
      'On le calibre : privé / public, délais, pénalités, garantie de paiement, prescription',
      'Tu repars avec une compétence opérationnelle et des courriers prêts à signer',
      'Format : 4 h · intra-entreprise ou session inter · Organisme certifié Qualiopi',
    ],
  },
};
