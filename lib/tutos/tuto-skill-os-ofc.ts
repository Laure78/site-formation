import type { TutoData } from './types';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';

export const TUTO_SKILL_OS_OFC: TutoData = {
  slug: 'tuto-skill-os-ofc',
  category: 'chantier-livrables',
  pdfFile: 'tuto-skill-os-ofc.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Ordre de service',
  shortTitle: 'Skill ordre de service',
  subtitle:
    "Le tutoriel pas à pas pour décortiquer, contester et chiffrer un OS — 5 minutes au lieu d'une après-midi.",

  metaTitle: 'Tuto skill ordre de service : analyse en 5 min',
  metaDescription:
    'Tuto skill OS BTP : décortiquer un ordre de service, observations CCAG art. 3.8 et chiffrage avec Claude. Formation IA pour le BTP — PDF gratuit.',
  keywords: [
    'ordre de service',
    'OS marché public',
    'CCAG-Travaux art. 3.8',
    'observations ordre de service',
    'plus-value travaux',
    'délai 15 jours OS',
    'skill Claude OS',
    'tuto ordre de service',
    'conducteur de travaux',
    'forclusion OS',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
  ],
  ogImageAlt: RESSOURCES_MINIATURES.tutoOs.alt,

  publishedAt: '2026-10-11',
  updatedAt: '2026-10-11',

  cardSummary:
    'Décortique, conteste et chiffre un ordre de service : écarts au marché, courrier CCAG art. 3.8, fourchette et date butoir — 5 minutes au lieu d’une après-midi.',

  totalTimeMinutes: 5,

  heroImage: RESSOURCES_MINIATURES.tutoOs,

  heroLearnPoints: [
    'Décortiquer un OS reçu, écart par écart avec ton marché initial',
    "Rédiger un courrier d'observations conforme au CCAG-Travaux, prêt à signer",
    'Chiffrer la plus-value : déboursé sec, fourchette et impact planning',
    'Tenir systématiquement le délai de 15 jours',
    'Exploiter les nouveautés Claude 2026 : connecteurs mail, Projets, tâches planifiées',
  ],

  introTitle: 'Pourquoi un skill Ordre de service ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "L'ordre de service (OS) est la décision écrite par laquelle le maître d'œuvre ou le maître d'ouvrage te notifie une instruction, une modification ou une décision dans l'exécution du marché. En marché public, le CCAG-Travaux 2021 (art. 3.8.2) te laisse 15 jours à compter de sa réception pour notifier tes observations, sous peine de forclusion. Passé ce délai, il est trop tard pour contester — même quand l'OS modifie le marché sans contrepartie annoncée.",
    },
    {
      kind: 'paragraph',
      text:
        "Le piège est connu : un OS reçu entre deux réunions, sans chiffre, rangé « pour plus tard ». Trois mois après, la plus-value est présentée… et refusée. Ce n'est pas un problème de droit, c'est un problème de temps et de méthode.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Tu identifies en 2 minutes toutes les modifications par rapport au marché initial',
        "Tu génères un courrier d'observations conforme, prêt à signer",
        'Tu chiffres la plus-value : déboursé sec, fourchette basse / haute, impact planning',
        'Tu connais la date butoir dès la réception de l’OS',
        "Tu construis un historique d'OS classé par chantier et par maître d'œuvre",
      ],
    },
    {
      kind: 'highlight',
      text:
        'Analyse · Observations · Chiffrage · Délai — écarts listés, courrier motivé, fourchette + impact en jours, date butoir calculée.',
    },
    {
      kind: 'callout',
      title: 'Ce que dit le CCAG-Travaux 2021 (art. 3.8)',
      body:
        "Observations à notifier dans les 15 jours suivant la réception de l'OS, sous peine de forclusion · tu dois exécuter l'OS même si tu formules des observations, sauf exceptions (notamment un risque pour la sécurité ou la santé, ou une contrariété à une norme, qui suspend l'exécution) · un OS du maître d'œuvre qui modifie le délai, la durée ou le montant doit être validé au préalable par le maître d'ouvrage, sinon tu n'es pas tenu de l'exécuter.",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction Compétences dans Claude',
      intro:
        "Un skill (« compétence ») est un mode d'emploi permanent que tu donnes à Claude une fois pour toutes : ton marché type, tes seuils, ton modèle de courrier. Tu n'as plus à les réexpliquer à chaque OS. Les compétences sont disponibles sur toutes les offres Claude, y compris la gratuite. Mais un OS, un CCAP, un CCTP et une DPGF dans la même conversation consomment vite le quota gratuit : pour un usage professionnel, l'offre Pro reste recommandée — environ 21 € TTC/mois, ou environ 17,50 €/mois en annuel.",
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
            'Sans cette option, les compétences restent grisées et Claude ne peut pas te livrer le courrier en Word ni calculer les dates de façon fiable.',
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
            "L'administrateur active les compétences dans Paramètres de l'organisation → Plugins et compétences. Tu peux ensuite partager ton skill (menu « ⋯ » → Partager) : tous les conducteurs traitent les OS avec la même méthode et les mêmes seuils. L'interface évolue régulièrement : si un libellé a changé, cherche « Compétences » ou « Skills » dans les paramètres.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière',
      intro:
        'Un skill performant repose sur tes vraies données. Plus tu donnes de matière, plus il est calibré pour tes marchés et tes habitudes de réponse.',
      blocks: [
        {
          kind: 'numberedList',
          items: [
            'Tes 2 ou 3 derniers OS reçus — des OS variés : modification technique, décalage de planning, prescription administrative. Joins les courriers d’observations associés si tu en as fait, même partiels.',
            'Les pièces de 2 ou 3 marchés actifs — CCAP pour les délais et clauses, CCTP pour le périmètre, BPU ou DPGF pour les prix de référence. Sans marché de référence, Claude ne peut pas identifier ce qui est en plus ou en moins.',
            'Ta chaîne de validation — qui réceptionne les OS, qui chiffre, qui valide et signe le courrier, qui archive. Claude saura à qui adresser chaque étape.',
            'Tes règles internes de plus-value — seuil au-delà duquel tu envoies systématiquement un courrier, marge cible sur travaux supplémentaires, procédure d’escalade si le maître d’œuvre refuse. Écris-les noir sur blanc.',
            'Ton modèle de courrier d’observations — en-tête, références du marché et de l’OS, motifs, demande de réunion, signature. Claude s’en servira de patron.',
          ],
        },
        {
          kind: 'callout',
          title: 'Réflexe pro — données sensibles',
          body:
            'Pour créer le skill, la structure et la mécanique des OS suffisent : retire les noms et conditions financières confidentielles des exemples. Et vérifie dans Paramètres → Confidentialité si tes conversations peuvent servir à améliorer Claude.',
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Crée un Projet Claude « OS », dépose ta matière dans ses connaissances, ouvre une conversation dans ce Projet et colle ce prompt. Claude te proposera une structure : tu valides avant qu’il ne construise le skill.',
      blocks: [
        {
          kind: 'prompt',
          title: 'Prompt — création du skill',
          text: `Je veux créer un skill Claude « traitement-ordre-de-service ».

Mon métier : [gros œuvre / second œuvre / TCE / lot]
Mes marchés : [public / privé / mixte]
Référence : CCAG-Travaux 2021, art. 3.8 (en privé : mon contrat
et la norme NF P03-001 si elle est visée)
Seuil de courrier systématique : dès [X] € HT de plus-value
Marge cible sur travaux supplémentaires : [X] %
Délai cible : réponse sous 10 jours (forclusion à 15 jours)

Pour chaque OS, tu produis :
1. Les modifications par rapport au marché initial ;
2. Les postes générant une plus-value ou un impact planning ;
3. Un courrier d'observations motivé, prêt à signer ;
4. Un chiffrage fourchette basse / haute + impact en jours ;
5. La date butoir (réception + 15 jours, calculée par le code).

Signale-moi toujours si l'OS du maître d'œuvre modifie délai ou
montant sans validation du maître d'ouvrage. N'invente jamais un
article. Propose-moi la structure avant de créer le skill.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            'Ne saute pas « propose-moi la structure avant de créer le skill ». C’est ce qui te permet de valider la logique avant qu’elle soit figée. Compte 15 minutes de discussion : tu les regagnes sur chaque OS.',
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro:
        'Teste la structure proposée sur un OS déjà traité : la sortie ressemble-t-elle à un courrier que tu signerais en confiance ?',
      blocks: [
        {
          kind: 'list',
          items: [
            'Analyse — écart par écart, ligne par ligne du marché (pas un résumé global flou)',
            'Courrier — art. 3.8 cité, n° et date de réception de l’OS',
            'Chiffrage — fourchette + déboursé sec détaillé (pas un seul prix)',
            'Planning — décalage chiffré en jours',
            'Délai — date de réception + 15 jours calculée',
            'Ton — factuel, avec demande de réunion (pas de formulations agressives)',
          ],
        },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Sur ce test :
- le courrier ne cite pas la date de réception de l'OS ;
- le chiffrage donne un prix unique, pas de fourchette ;
- il manque la demande de réunion sous 8 jours.
Corrige ces 3 points dans le skill.`,
        },
        { kind: 'h3', text: 'Transforme-le en compétence' },
        {
          kind: 'paragraph',
          text:
            "Demande : « Transforme ces consignes en compétence réutilisable ». Téléverse le dossier livré dans Personnaliser → Compétences, puis active-le.",
        },
        {
          kind: 'callout',
          title: 'La description décide de tout',
          body:
            "La compétence se déclenche quand Claude reconnaît le sujet dans ta demande, d'après sa description (200 caractères max). Écris-la avec tes mots : « Analyse d'ordre de service, observations CCAG art. 3.8, plus-value, délai de 15 jours pour [ENTREPRISE] ».",
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai ordre de service',
      intro: 'Choisis un OS récent que tu as déjà traité — idéalement mal traité — et compare.',
      blocks: [
        {
          kind: 'list',
          items: [
            'Note la date de réception de l’OS (mail, courrier ou plateforme)',
            'Téléverse l’OS dans ton Projet « OS » avec le CCAP / CCTP du marché',
            'Vérifie l’extraction des modifications et le chiffrage',
            'Fais relire le courrier, signe, envoie de façon traçable sous 10 jours',
            'Archive dans le dossier chantier — et exécute l’OS, sauf exception prévue au CCAG',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt pour un usage quotidien' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Nouvel ordre de service à traiter :
- Chantier : [nom — maître d'ouvrage]   - Marché : [n° + lot]
- Émetteur : [maître d'œuvre / maître d'ouvrage]
- Date de réception : [JJ/MM/AAAA] — mode : [mail / RAR / plateforme]
[OS et CCAP / CCTP joints]

Sors-moi : les modifications, le courrier d'observations prêt à
signer, le chiffrage (fourchette + impact planning) et la date butoir.`,
        },
        {
          kind: 'callout',
          title: 'Extrait de sortie (exemple fictif)',
          body:
            'Lot 01 gros œuvre — CCTP art. 2.3 · Modification : profondeur des fondations 80 → 110 cm · Postes impactés : terrassement, armatures, béton, mise en œuvre · Plus-value estimée : 18 500 à 24 200 € HT · Impact : + 4 jours ouvrés · Réception de l’OS : 12/03/2026 · Date butoir : 27/03/2026',
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            'Ne laisse jamais filer un OS sans l’avoir analysé, même s’il paraît anodin. Les pertes les plus lourdes viennent souvent des OS « pas importants » reçus en sortie de réunion.',
        },
        { kind: 'h3', text: 'Les nouveautés Claude à exploiter' },
        {
          kind: 'paragraph',
          text:
            'Claude a beaucoup évolué en 2026. Voici les fonctions qui sécurisent le mieux tes OS — la disponibilité dépend de ton offre et le déploiement est parfois progressif.',
        },
        {
          kind: 'list',
          items: [
            'Projets — un Projet par chantier garde CCAP, CCTP, DPGF et l’historique des OS',
            'Connecteurs mail et agenda — repère les OS reçus, prépare le courrier en brouillon et pose un rappel avant la date butoir',
            'Tâches planifiées — chaque matin, point sur les OS reçus et dates butoirs qui approchent',
            'Claude Docs — courrier d’observations modifiable, exportable Word / PDF',
            'Modification ciblée — corrige un montant ou une phrase sans tout régénérer',
            'Mémoire — retient ton des courriers, seuils et interlocuteurs (Paramètres → Mémoire)',
          ],
        },
        {
          kind: 'prompt',
          title: 'Prompt — tâche planifiée du matin',
          text: `Chaque jour ouvré à 7 h : cherche dans mes mails des dernières
24 h tout ordre de service reçu, indique pour chacun le chantier,
la date de réception et la date butoir (réception + 15 jours),
et liste les OS dont la date butoir tombe dans moins de 5 jours.
N'envoie rien sans mon accord.`,
        },
        {
          kind: 'callout',
          title: 'Règle de prudence',
          body:
            'Claude prépare, tu vérifies et tu signes. La date de réception fait foi : contrôle-la toujours toi-même, c’est d’elle que dépend la forclusion.',
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Combien de temps pour créer le skill ?',
      a: 'Compte 1 h à 1 h 30 la première fois : 30 minutes pour la matière, 30 minutes de cadrage avec Claude, puis ajustements et premier test. Ensuite, un OS se traite en 5 à 10 minutes.',
    },
    {
      q: 'Le skill remplace-t-il le conducteur de travaux ?',
      a: "Non. Claude rédige et chiffre, mais c'est toi qui valides, signes et envoies : la responsabilité contractuelle reste la tienne. Le skill garantit surtout que rien n'est oublié.",
    },
    {
      q: "L'OS reçu n'a aucun chiffre : que faire ?",
      a: "C'est le piège classique. Le skill détecte la modification et propose une fourchette à partir de tes prix et déboursés ; tu corriges avec tes propres études. Un OS sans chiffre n'est jamais neutre.",
    },
    {
      q: 'Et en marché privé ?',
      a: "La méthode reste valable, mais c'est ton contrat qui fixe les règles : vérifie le délai et la forme des réserves dans le CCAP et, s'il y renvoie, dans la norme NF P03-001.",
    },
    {
      q: 'Comment être sûr de tenir les 15 jours ?',
      a: "Le délai court à compter de la réception de l'OS. Note toujours la date de réception, fais calculer la date butoir et pose-toi un rappel quelques jours avant. Avec une tâche planifiée, Claude te le rappelle chaque matin.",
    },
    {
      q: "Et si le maître d'œuvre ou le maître d'ouvrage rejette mes observations ?",
      a: "Si le désaccord persiste, le CCAG-Travaux prévoit une procédure de règlement des différends (art. 55) avec un mémoire en réclamation, dans des délais stricts, puis une saisine possible du comité consultatif de règlement amiable. Claude peut préparer les courriers ; fais-toi accompagner pour la suite.",
    },
    {
      q: 'Et si je veux le construire accompagné ?',
      a: 'En formation, on construit le skill ensemble sur tes propres marchés : tu repars avec une compétence opérationnelle.',
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle:
      'Formation en présentiel en Île-de-France — prise en charge OPCO/Constructys selon éligibilité',
    programTitle: 'Formation Niveau 2 — Conducteurs de travaux',
    programItems: [
      'On construit ton skill OS sur tes propres marchés et OS reçus',
      'On le calibre : écarts au marché, courrier, chiffrage, date butoir',
      'Tu repars avec une compétence opérationnelle et des courriers prêts à signer',
      'Format : 4 h · intra-entreprise ou session inter · Organisme certifié Qualiopi',
    ],
  },
};
