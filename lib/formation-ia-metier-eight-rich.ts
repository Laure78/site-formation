/**
 * Huit landings métier « riches » — vocabulaire, 5 cas d’usage, 5 prompts, 6 FAQ, maillage.
 */
import type { FAQItem } from '@/lib/faq';
import type { FormationIaMetierBtpConfig } from '@/lib/formation-ia-metier-btp-types';

const OFC = "OFC Création d'Entreprise";

const COVER = {
  url: '/images/formation-ia-btp-entreprise.png',
  width: 1024,
  height: 571,
  alt: 'Formation IA BTP en entreprise — Laure Olivié, OFC Qualiopi',
} as const;

function faqStandard(metierLabel: string): FAQItem[] {
  return [
    {
      q: 'Mes données chantier sont-elles protégées dans ChatGPT ?',
      a: `Évitez les plans nominatifs complets dans un outil grand public sans cadre entreprise. Anonymisez, utilisez des extraits ou des offres professionnelles sans entraînement — c’est un point clé des sessions ${OFC}.`,
    },
    {
      q: 'La formation est-elle finançable par Constructys ?',
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
  h1: 'Formation IA maçon BTP — gros œuvre, DTU 20 & Qualiopi',
  metaTitle: 'Formation IA maçon BTP — ChatGPT, métrés, mémoires',
  metaDescription:
    'Formation IA maçon BTP : béton, maçonnerie, DTU 20, phases gros œuvre, métrés, mémoires techniques. Qualiopi, Constructys.',
  keywords: [
    'formation IA maçon BTP',
    'ChatGPT gros œuvre',
    'DTU 20',
    'mémoire technique maçonnerie',
    'métrés maçonnerie IA',
    'Qualiopi maçon',
  ],
  metierNom: 'maçons',
  metierNomTitre: 'maçon',
  normeRef: 'le DTU 20',
  problemParagraphs: [
    `Les entreprises de gros œuvre enchaînent bétonnage, élévations, reprises en sous-œuvre et interfaces avec les autres lots : chaque dossier mobilise le ${'`'}DTU 20${'`'}, des plans de phasage et des quantitatifs à expliquer au client ou au maître d’ouvrage.`,
    `Le vocabulaire est dense : coffrage, béton dosé, chaînage, reprises, retrait deau, géotextile — sans parler des contrôles béton et des réserves en réception. Recopier à la main les mêmes explications épuise conducteurs et chefs de chantier.`,
    `Sur les marchés publics, les mémoires techniques attendent une méthode claire (moyens, phasage, coordination) ; une IA mal cadrée produit du texte « lisse » mais faux sur un dosage ou un délai technique.`,
    `L’objectif des sessions ${OFC} est de structurer brouillons et listes de contrôle tout en gardant la validation métier sur les plans et les engagements signés.`,
  ],
  solutionIntro: `Vous apprenez à utiliser ChatGPT comme assistant de brouillon sur vos cas réels (anonymisés) : métrés, synthèses de réunion, plans de réponse marché — avec relecture humaine et rappels sur le DTU 20.`,
  casUsageConcrets: [
    'Structurer un mémoire technique gros œuvre à partir d’un CCAP et de vos moyens réels (effectifs, matériel, références anonymisées).',
    'Transformer des notes de visite de chantier en compte rendu exploitable pour le client et les équipes.',
    'Proposer un plan de phasage indicatif (titres + jalons) à compléter avec votre planning interne.',
    'Lister les questions à poser au bureau de contrôle ou au MOE quand une pièce du CCTP est ambiguë sur le béton ou les reprises.',
    'Rédiger un courrier de synthèse après réunion de coordination (décisions, porteurs, risques) sans repartir d’une page blanche.',
  ],
  prompts: [
    {
      title: 'Métré gros œuvre — structure de postes (sans quantités définitives)',
      body: `Données : [TYPE OUVRAGE, cotes principales, reprises ou non].
Propose une STRUCTURE de métré (postes et sous-postes) pour un devis gros œuvre : déblais, fondations, élévations, reprises, interfaces. Rappelle : quantités définitives selon plans et DTU 20 — ne pas inventer de volumes chiffrés : [à mesurer].`,
    },
    {
      title: 'CR réunion — coordination gros œuvre / autres lots',
      body: `Notes brutes : [NOTES].
Rédige un compte rendu : décisions, interfaces coffrage / électricité / étanchéité, réserves, prochaines étapes. Ton factuel. Ne pas attribuer de faute sans élément.`,
    },
    {
      title: 'Plan de mémoire technique — marché public gros œuvre',
      body: `Critères notés : [LISTE]. Entreprise : [taille, moyens, chantiers de référence anonymisés].
Propose un plan (titres + 2 bullets par titre) : méthode, phasage, moyens humains et matériels, sécurité, environnement. Pas de copier-coller du CCAP.`,
    },
    {
      title: 'Questions MOE — extrait CCTP béton / maçonnerie',
      body: `Extrait anonymisé : [TEXTE].
Liste les exigences et 4–6 questions de clarification si le texte est flou. Renvoi DTU 20 — pas de conclusion de conformité.`,
    },
    {
      title: 'Mail client — délai ou sujet technique (ton professionnel)',
      body: `Contexte : [SUJET]. Objectif : [rappel délai / demande de pièce].
Rédige un mail court, clair, sans promettre un détail technique non validé en interne.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote:
    '« Les plans de mémoire et les CR de coordination sortent plus vite — le calcul des volumes et la signature, ça reste chez nous. »',
  testimonialAttribution: 'Conducteur de travaux gros œuvre — IDF (anonymisé)',
  faq: [
    {
      q: 'ChatGPT connaît-il le DTU 20 pour trancher à ma place ?',
      a: `Non : il peut proposer une structure ou des questions, mais il hallucine sur articles et exceptions. La conformité relève du fascicule officiel et de votre équipe. L’IA aide à organiser vos notes.`,
    },
    {
      q: 'Comment l’IA aide sur les métrés et quantitatifs maçonnerie ?',
      a: `À structurer des postes, lister ce qui manque pour chiffrer et préparer des questions — pas à remplacer le relevé ou le logiciel métier.`,
    },
    {
      q: 'L’IA peut-elle rédiger un mémoire technique complet pour un AO ?',
      a: `Elle peut fournir un brouillon et un plan à partir de vos données — la relecture, la cohérence avec votre offre de prix et la signature restent humaines.`,
    },
    ...faqStandard('maçon'),
  ],
  courseName: 'Formation IA maçon BTP — DTU 20, Qualiopi',
  courseDescription: `${OFC} : formation IA et ChatGPT pour maçons — gros œuvre, métrés, mémoires, réponses marchés. Session 4 h, Qualiopi, financement OPCO Constructys selon dossier.`,
  courseTeaches: [
    'ChatGPT pour maçons BTP',
    'DTU 20 — usage documentaire assisté',
    'Mémoires techniques et CCTP',
    'Comptes rendus et phasage (brouillons)',
    'Qualiopi — données chantier',
  ],
  ogImage: { ...COVER, alt: 'Formation IA BTP — maçonnerie et gros œuvre' },
  coverImage: { ...COVER, alt: 'Session formation IA pour équipes gros œuvre' },
  showAuthorBio: true,
  authorBioClosingLine:
    'Elle intervient auprès des équipes gros œuvre, charpente et second œuvre pour des usages IA concrets et encadrés.',
  relatedMetierLinks: [
    {
      href: '/formation-ia-charpentier-btp',
      title: 'Formation IA charpentier BTP',
      description: 'Structures bois, ossatures, mémoires techniques — même méthode Qualiopi.',
    },
    {
      href: '/formation-ia-couvreur-btp',
      title: 'Formation IA couvreur zingueur',
      description: 'Couverture, zinguerie, interfaces toiture après gros œuvre.',
    },
    {
      href: '/formation-ia-dirigeant-btp',
      title: 'Formation IA dirigeant BTP',
      description: 'ROI et pilotage du déploiement IA en PME bâtiment.',
    },
  ],
  liensUtilesIntro:
    'Métiers proches, catalogue Qualiopi, Claude AI BTP, financement Constructys et articles.',
};

export const FORMATION_IA_METIER_COUVREUR: FormationIaMetierBtpConfig = {
  id: 'couvreur',
  path: '/formation-ia-couvreur-btp',
  h1: 'Formation IA couvreur zingueur — DTU 40, toiture & Qualiopi',
  metaTitle: 'Formation IA couvreur zingueur — toiture, zinguerie',
  metaDescription:
    'Formation IA couvreur zingueur : ardoise, tuiles, zinc, zinguerie, DTU 40, métrés toiture, mémoires. Qualiopi, Constructys.',
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
  courseDescription: `${OFC} : formation IA pour couvreurs-zingueurs — DTU 40, métrés, zinguerie, mémoires. Session 4 h, Qualiopi, Constructys selon dossier.`,
  courseTeaches: [
    'ChatGPT pour couvreurs et zingueurs BTP',
    'DTU 40 — aide à la rédaction',
    'Métrés et descriptifs toiture',
    'Qualiopi — confidentialité',
  ],
  ogImage: { ...COVER, alt: 'Formation IA BTP — couverture et zinguerie' },
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
    'Formation IA peintre bâtiment : supports, finitions, devis par pièce, DTU 59, mémoires. Qualiopi, Constructys.',
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
  courseDescription: `${OFC} : formation IA pour peintres — DTU 59, devis, finitions, mémoires. Session 4 h, Qualiopi, Constructys.`,
  courseTeaches: ['ChatGPT pour peintres BTP', 'DTU 59', 'Devis et supports', 'Qualiopi'],
  ogImage: { ...COVER, alt: 'Formation IA BTP — peinture bâtiment' },
  coverImage: { ...COVER, alt: 'Peinture bâtiment — formation IA' },
  showAuthorBio: true,
  authorBioClosingLine: 'Elle accompagne les peintres et les entreprises de second œuvre sur des usages IA encadrés.',
  relatedMetierLinks: [
    { href: '/formation-ia-plaquiste-btp', title: 'Formation IA plaquiste plâtrier', description: 'Cloisons et préparation avant peinture.' },
    { href: '/formation-ia-carreleur-btp', title: 'Formation IA carreleur', description: 'Sol et murs — coordination finitions.' },
    { href: '/formation-ia-menuisier-btp', title: 'Formation IA menuisier bâtiment', description: 'Menuiseries et interfaces avec les lots peinture.' },
  ],
  liensUtilesIntro: 'Métiers proches, catalogue Qualiopi, Claude AI, financement, blog.',
};

export const FORMATION_IA_METIER_PLAQUISTE: FormationIaMetierBtpConfig = {
  id: 'plaquiste',
  path: '/formation-ia-plaquiste-btp',
  h1: 'Formation IA plaquiste plâtrier — cloisons, DTU 25 & Qualiopi',
  metaTitle: 'Formation IA plaquiste plâtrier — doublages, DTU 25',
  metaDescription:
    'Formation IA plaquiste plâtrier : cloisons, doublages, isolation, DTU 25, devis linéaires, coordination lots. Qualiopi, Constructys.',
  keywords: [
    'formation IA plaquiste plâtrier',
    'formation IA plaquiste BTP',
    'ChatGPT plaque de plâtre',
    'DTU 25',
    'devis cloisons IA',
    'Qualiopi plaquiste',
  ],
  metierNom: 'plaquistes',
  metierNomTitre: 'plaquiste',
  normeRef: 'le DTU 25',
  problemParagraphs: [
    `Les plaquistes gèrent linéaires de cloisons, doublages, détails acoustiques et passages de réseaux : le ${'`'}DTU 25${'`'} et les prescriptions acoustiques nourrissent les devis et les réponses techniques.`,
    `La coordination avec électricité, plomberie et peinture multiplie les mails et les CR de réunion — sans méthode, tout part en retard le soir.`,
    `L’IA sans cadre peut mélanger types de plaques ou performances acoustiques — la formation encadre relecture et sources.`,
    `L’objectif : gagner du temps sur quantitatifs, mails et plans de mémoire, en gardant la validation sur le chantier.`,
  ],
  solutionIntro: `Vous travaillez sur métrés linéaires, listes de pièces et demandes de précisions MOE — avec des prompts adaptés au vocabulaire plaque, ossatures et joints.`,
  casUsageConcrets: [
    'Structurer un devis cloison / doublage par niveau ou par zone à partir de plans ou de listes de pièces.',
    'Préparer un mail de coordination avec l’électricien ou le plombier (réservations, passages).',
    'Lister les questions à poser au MOE si l’acoustique ou les trémies sont mal décrites dans le CCTP.',
    'Rédiger un CR de réunion chantier avec décisions et points bloquants.',
    'Établir une check-list avant passage du peintre (ponçage joints, poussière, humidité).',
  ],
  prompts: [
    {
      title: 'Métré cloisons — structure de postes (linéaires / surfaces)',
      body: `Données : [PLAN ou liste pièces, hauteurs, types de cloisons].
Propose STRUCTURE de métré (postes) : doublages, cloisons, habillages, renforts, joints. Renvoi DTU 25 — pas de quantités inventées.`,
    },
    {
      title: 'Mail MOE — précision acoustique ou réservation',
      body: `Problème : [SUJET]. Mail court, liste de questions ciblées, ton professionnel.`,
    },
    {
      title: 'CR coordination — plusieurs lots',
      body: `Notes : [NOTES]. Compte rendu structuré : décisions, interfaces, délais, responsables.`,
    },
    {
      title: 'Devis détaillé par pièce — plâtre / cloisons',
      body: `Liste pièces : [LISTE]. Structure détaillée des postes pour chiffrage interne (sans prix).`,
    },
    {
      title: 'Réponse technique — CCTP cloison / doublage (questions)',
      body: `Extrait : [TEXTE]. Liste d’exigences et questions si ambiguïté. Pas de conclusion de conformité.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote: '« Les mails avec l’électricien et les quantitatifs cloison sont plus clairs depuis qu’on structure avec des prompts. »',
  testimonialAttribution: 'Plaquiste — 93 (anonymisé)',
  faq: [
    {
      q: 'L’IA peut-elle calculer les surfaces de plaque à la place du métré ?',
      a: `Non : elle peut aider à structurer un tableau à partir de vos cotes — le relevé et le chiffrage définitif restent à vous.`,
    },
    {
      q: 'Comment traiter l’acoustique dans les réponses aux MOE ?',
      a: `Lister des questions et renvoyer aux prescriptions et avis techniques — pas d’affirmation sans pièce justificative.`,
    },
    {
      q: 'DTU 25 : ChatGPT suffit pour trancher ?',
      a: `Non : l’IA peut proposer un plan de lecture ; la conformité relève du fascicule et de votre équipe.`,
    },
    ...faqStandard('plaquiste'),
  ],
  courseName: 'Formation IA plaquiste plâtrier BTP — Qualiopi',
  courseDescription: `${OFC} : formation IA pour plaquistes — DTU 25, cloisons, devis, coordination. Session 4 h, Qualiopi, Constructys.`,
  courseTeaches: ['ChatGPT pour plaquistes BTP', 'DTU 25', 'Devis cloisons', 'Qualiopi'],
  ogImage: { ...COVER, alt: 'Formation IA BTP — plaquiste et cloisons' },
  coverImage: { ...COVER, alt: 'Plaquiste — formation IA entreprise' },
  showAuthorBio: true,
  authorBioClosingLine: 'Elle forme les équipes plaque de plâtre et second œuvre sur des usages IA sécurisés.',
  relatedMetierLinks: [
    { href: '/formation-ia-peintre-btp', title: 'Formation IA peintre bâtiment', description: 'Finitions après plaquiste.' },
    { href: '/formation-ia-electricien-btp', title: 'Formation IA électricien BTP', description: 'Réservations et passages de lots.' },
    { href: '/formation-ia-macon-btp', title: 'Formation IA maçon BTP', description: 'Gros œuvre et interfaces structure.' },
  ],
  liensUtilesIntro: 'Métiers proches, catalogue, Claude AI BTP, financement, blog.',
};

export const FORMATION_IA_METIER_MENUISIER: FormationIaMetierBtpConfig = {
  id: 'menuisier',
  path: '/formation-ia-menuisier-btp',
  h1: 'Formation IA menuisier bâtiment — DTU 36, pose & Qualiopi',
  metaTitle: 'Formation IA menuisier bâtiment — fenêtres, portes, DTU 36',
  metaDescription:
    'Formation IA menuisier bâtiment : menuiseries extérieures et intérieures, DTU 36, devis, relevés, SAV. Qualiopi, Constructys.',
  keywords: [
    'formation IA menuisier bâtiment',
    'formation IA menuisier BTP',
    'ChatGPT menuiserie',
    'DTU 36',
    'devis fenêtres IA',
    'Qualiopi menuisier',
  ],
  metierNom: 'menuisiers',
  metierNomTitre: 'menuisier',
  normeRef: 'le DTU 36',
  problemParagraphs: [
    `Les menuisiers posent fenêtres, portes et ouvrants variés : le ${'`'}DTU 36${'`'}, les fiches fabricants et les prescriptions d’étanchéité et de désenfumage alourdissent les devis et les dossiers SAV.`,
    `Relevés de cotes, délais fournisseurs et interfaces avec le second œuvre génèrent des flux de mails que l’on traite souvent tard.`,
    `L’IA mal utilisée peut confondre typologie d’ouvrant ou performance thermique — d’où le cadre formation.`,
    `L’objectif : accélérer la structure des devis, courriers et CR, sans remplacer le geste de pose ni la garantie décennale.`,
  ],
  solutionIntro: `Vous apprenez à produire des brouillons de devis structurés, des relances fournisseurs claires et des comptes rendus de pose — avec validation métier systématique.`,
  casUsageConcrets: [
    'Monter la structure d’un devis menuiseries + pose (dépose, fourniture, accessoires, finitions).',
    'Rédiger une fiche de relevé de cotes (check-list) pour éviter les oublis en commande.',
    'Préparer un mail SAV client (jeu, étanchéité, quincaillerie) avec ton professionnel.',
    'Lister les questions à poser au MOE sur les performances thermiques ou les passages de réseaux.',
    'Synthétiser une réponse à un marché privé ou public (lot menuiseries) avec plan de méthode.',
  ],
  prompts: [
    {
      title: 'Devis menuiseries — structure fourniture + pose',
      body: `Données : [LISTE OUVRANTS, dimensions, finitions, dépose oui/non].
STRUCTURE de devis (postes) sans prix. Rappels DTU 36 et notices — [à compléter] pour références produits exactes.`,
    },
    {
      title: 'Fiche relevé de cotes — checklist',
      body: `Type de chantier : [NEUF / RÉNO]. Propose une checklist de mesures et points de vigilance (aplomb, rejingot, appui, évacuations).`,
    },
    {
      title: 'Mail fournisseur — délai ou relance commande',
      body: `Contexte : [COMMANDE, date, retard]. Mail ferme et cordial, demande de date ferme, sans engagement juridique automatique.`,
    },
    {
      title: 'CR pose — réserves et suites',
      body: `Notes : [NOTES]. Compte rendu : travaux réalisés, réserves, photos à prévoir, prochaines étapes.`,
    },
    {
      title: 'Mémoire technique — lot menuiseries',
      body: `Critères : [LISTE]. Plan (titres + bullets) : méthode, calendrier, coordination, sécurité.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote: '« Les devis menuiserie et les mails fournisseurs sont plus lisibles — on vérifie toujours les cotes. »',
  testimonialAttribution: 'Menuisier poseur — IDF (anonymisé)',
  faq: [
    {
      q: 'L’IA peut-elle dimensionner mes menuiseries à la place du relevé ?',
      a: `Non : le relevé et la validation restent terrain. L’IA aide à structurer les infos et les courriers.`,
    },
    {
      q: 'Comment gérer les SAV sans me tromper sur la garantie ?',
      a: `Utiliser l’IA pour le ton et la structure — les engagements précis viennent de vos contrats et notices.`,
    },
    {
      q: 'DTU 36 : puis-je demander à ChatGPT de trancher sur une pose ?',
      a: `Non pour une décision technique : il peut lister des points de vigilance à vérifier dans le fascicule.`,
    },
    ...faqStandard('menuisier'),
  ],
  courseName: 'Formation IA menuisier bâtiment BTP — Qualiopi',
  courseDescription: `${OFC} : formation IA pour menuisiers — DTU 36, devis, pose, SAV. Session 4 h, Qualiopi, Constructys.`,
  courseTeaches: ['ChatGPT pour menuisiers BTP', 'DTU 36', 'Devis et relevés', 'Qualiopi'],
  ogImage: { ...COVER, alt: 'Formation IA BTP — menuiserie' },
  coverImage: { ...COVER, alt: 'Menuisier bâtiment — formation IA' },
  showAuthorBio: true,
  authorBioClosingLine: 'Elle forme les poseurs et encadrants menuiserie sur l’IA au service du chiffrage et du relationnel client.',
  relatedMetierLinks: [
    { href: '/formation-ia-macon-btp', title: 'Formation IA maçon BTP', description: 'Appuis et interfaces gros œuvre.' },
    { href: '/formation-ia-electricien-btp', title: 'Formation IA électricien BTP', description: 'Réservations et passages.' },
    { href: '/formation-ia-plaquiste-btp', title: 'Formation IA plaquiste plâtrier', description: 'Cloisons et préparation des pièces.' },
  ],
  liensUtilesIntro: 'Métiers proches, catalogue, Claude AI, financement, blog.',
};

export const FORMATION_IA_METIER_CARRELEUR: FormationIaMetierBtpConfig = {
  id: 'carreleur',
  path: '/formation-ia-carreleur-btp',
  h1: 'Formation IA carreleur — pose collée, DTU 52 & Qualiopi',
  metaTitle: 'Formation IA carreleur — grands formats, joints, DTU 52',
  metaDescription:
    'Formation IA carreleur : métrés, découpes, délais de prise, joints, DTU 52, réception, devis. Qualiopi, Constructys.',
  keywords: [
    'formation IA carreleur',
    'formation IA carreleur BTP',
    'ChatGPT carrelage',
    'DTU 52',
    'devis pose carrelage IA',
    'Qualiopi carreleur',
  ],
  metierNom: 'carreleurs',
  metierNomTitre: 'carreleur',
  normeRef: 'le DTU 52',
  problemParagraphs: [
    `Les carreleurs enchaînent métrés, calepinages, choix de colle et de joints, grands formats et pièces d’eau : le ${'`'}DTU 52${'`'} et les notices fabricants encadrent la pose, tandis que les clients veulent des délais clairs entre chape, étanchéité et finitions.`,
    `Les imprévus (plans, niveaux, pentes d’évacuation gérées par d’autres lots) génèrent des mails et des CR de réunion le soir — sans méthode, tout repart en ressaisie manuelle.`,
    `L’IA sans cadre peut inventer des temps de prise ou des compatibilités colle / support : la formation apprend à cadrer les prompts et à valider sur le terrain.`,
    `L’objectif : accélérer la structure des devis, comptes rendus et réponses MOE, pas de remplacer le geste de pose.`,
  ],
  solutionIntro: `Ateliers sur métrés découpés, plannings indicatifs, mails clients sur joints ou choix de finition — avec rappel systématique : relecture humaine et fascicules à jour.`,
  casUsageConcrets: [
    'Structurer un devis carrelage sol / mur avec postes colle, joints, découpe, protection et reprise de plinthes.',
    'Préparer un compte rendu après réception de support (chape, planéité, humidité résiduelle) avec réserves factuelles.',
    'Lister les questions à poser au plombier ou au plaquiste si les pentes ou les cloisons ne sont pas alignées avec le calepinage.',
    'Rédiger un mail client sur le choix de couleur de joint ou de format — sans garantir un rendu à la place des échantillons.',
    'Monter un plan de mémoire technique pour un lot carrelage (méthode, délais, interfaces, déchets).',
  ],
  prompts: [
    {
      title: 'Devis carrelage — structure postes (sans prix)',
      body: `Données : [surfaces, formats, pièces d’eau oui/non, type de support].
Propose STRUCTURE de devis : préparation, mise en œuvre, joints, protections, reprises. Renvoi DTU 52 et notices — pas de quantités inventées.`,
    },
    {
      title: 'CR — visite support avant pose',
      body: `Notes : [NOTES]. Compte rendu : constats, zones à traiter, demandes aux autres corps d’état, suites.`,
    },
    {
      title: 'Questions MOE — CCTP carrelage ambigu',
      body: `Extrait : [TEXTE]. Liste d’exigences et questions. Pas de conclusion de conformité.`,
    },
    {
      title: 'Mail client — délai entre deux passes (ton pro)',
      body: `Contexte : [TEXTE]. Rédige un mail qui rappelle les contraintes de séchage / prise sans chiffrer à la place du fabricant.`,
    },
    {
      title: 'Mémoire technique — lot carrelage (plan)',
      body: `Critères : [LISTE]. Plan (titres + bullets) : méthode, phasage, coordination, sécurité, environnement.`,
    },
  ],
  csfePartnership: false,
  testimonialQuote: '« Les métrés structurés et les mails aux clients pour les joints sont moins longs à préparer. »',
  testimonialAttribution: 'Carreleur — petite couronne (anonymisé)',
  faq: [
    {
      q: 'L’IA peut-elle calculer mes découpes ou mes chutes à la place du chantier ?',
      a: `Non : elle peut aider à lister des postes à vérifier ; le relevé et le calepinage définitifs restent terrain.`,
    },
    {
      q: 'Comment parler des temps de séchage sans me tromper ?',
      a: `Renvoyer aux fiches produits et au planning réel du chantier — l’IA ne remplace pas la notice du fabricant.`,
    },
    {
      q: 'DTU 52 : ChatGPT peut-il trancher sur une pose en pièce d’eau ?',
      a: `Non pour une décision technique : il peut proposer un plan de lecture et des questions à vérifier dans le fascicule.`,
    },
    ...faqStandard('carreleur'),
  ],
  courseName: 'Formation IA carreleur BTP — Qualiopi',
  courseDescription: `${OFC} : formation IA pour carreleurs — DTU 52, métrés, joints, mémoires. Session 4 h, Qualiopi, Constructys.`,
  courseTeaches: ['ChatGPT pour carreleurs BTP', 'DTU 52', 'Devis et réception', 'Qualiopi'],
  ogImage: { ...COVER, alt: 'Formation IA BTP — carrelage et pose' },
  coverImage: { ...COVER, alt: 'Carreleur — formation IA entreprise' },
  showAuthorBio: true,
  authorBioClosingLine: 'Elle forme les équipes carrelage sur des usages IA responsables et alignés sur le terrain.',
  relatedMetierLinks: [
    { href: '/formation-ia-plombier-btp', title: 'Formation IA plombier BTP', description: 'Pièces d’eau, pentes, interfaces avant carrelage.' },
    { href: '/formation-ia-peintre-btp', title: 'Formation IA peintre bâtiment', description: 'Finitions et reprises après pose.' },
    { href: '/formation-ia-plaquiste-btp', title: 'Formation IA plaquiste plâtrier', description: 'Cloisons et supports avant métrés.' },
  ],
  liensUtilesIntro: 'Métiers proches, catalogue Qualiopi, Claude AI BTP, financement, blog.',
};

export const FORMATION_IA_METIER_CHARPENTIER: FormationIaMetierBtpConfig = {
  id: 'charpentier',
  path: '/formation-ia-charpentier-btp',
  h1: 'Formation IA charpentier — bois, DTU 31 & Qualiopi',
  metaTitle: 'Formation IA charpentier — ossatures, coupes, DTU 31',
  metaDescription:
    'Formation IA charpentier : ossature bois, nomenclatures, plans de phasage, DTU 31, mémoires, interfaces couverture. Qualiopi, Constructys.',
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
  courseDescription: `${OFC} : formation IA pour charpentiers — DTU 31, mémoires, coordination. Session 4 h, Qualiopi, Constructys.`,
  courseTeaches: ['ChatGPT pour charpentiers BTP', 'DTU 31', 'Mémoires et nomenclatures', 'Qualiopi'],
  ogImage: { ...COVER, alt: 'Formation IA BTP — charpente bois' },
  coverImage: { ...COVER, alt: 'Charpentier — formation IA' },
  showAuthorBio: true,
  authorBioClosingLine: 'Elle accompagne les équipes charpente et ossature bois sur une IA utile au bureau et au chantier.',
  relatedMetierLinks: [
    { href: '/formation-ia-couvreur-btp', title: 'Formation IA couvreur zingueur', description: 'Interface toiture après structure.' },
    { href: '/formation-ia-macon-btp', title: 'Formation IA maçon BTP', description: 'Appuis, plots et reprises gros œuvre.' },
    { href: '/formation-ia-menuisier-btp', title: 'Formation IA menuisier bâtiment', description: 'Ouvrants et percements avec le bois.' },
  ],
  liensUtilesIntro: 'Métiers proches, catalogue, Claude AI BTP, financement, blog.',
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
  courseDescription: `${OFC} : formation IA pour assistantes administratives du BTP — courriers, relances, suivi, dossiers. Session 4 h, Qualiopi, Constructys.`,
  courseTeaches: [
    'ChatGPT pour assistantes administratives BTP',
    'Courriers et relances (relecture humaine)',
    'Suivi chantier et tableaux',
    'Qualiopi — confidentialité',
  ],
  ogImage: { ...COVER, alt: 'Formation IA BTP — assistante administrative' },
  coverImage: { ...COVER, alt: 'Administratif BTP — formation IA' },
  showAuthorBio: true,
  authorBioClosingLine: 'Elle forme les fonctions support des entreprises du bâtiment sur une IA utile au quotidien, sans remplacer la validation métier.',
  relatedMetierLinks: [
    { href: '/formation-ia-charge-affaires-btp', title: 'Formation IA chargé d’affaires BTP', description: 'Appels d’offres et suivi commercial.' },
    { href: '/formation-ia-conducteur-travaux', title: 'Formation IA conducteur de travaux BTP', description: 'Pilotage de chantier et documentation.' },
    { href: '/formation-ia-dirigeant-btp', title: 'Formation IA dirigeant BTP', description: 'Pilotage et déploiement IA en entreprise.' },
  ],
  liensUtilesIntro: 'Métiers proches, catalogue Qualiopi, Claude AI BTP, financement, blog.',
};

