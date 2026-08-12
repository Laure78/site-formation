/**
 * Cluster SEO — Formation IA marché public de travaux (pilier + lots).
 * Angle commande publique (RC, CCAG-Travaux, BPU/DPGF, dématérialisation, pénalités, DGD).
 * Conversion catalogue : fiche NIV-02 (`LINKS.formationAO`) — ne pas dupliquer programme/tarif.
 */
import { CSFE_NOM_LIBRE } from '@/lib/csfe';
import { UMB_FFB_NOM_LIBRE } from '@/lib/umb-ffb';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata } from '@/lib/seo';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import type { Metadata } from 'next';
import type { FormationIaMarchePublicConfig } from '@/lib/formation-ia-marche-public-types';

export type { FormationIaMarchePublicConfig } from '@/lib/formation-ia-marche-public-types';

const OFC = "OFC Création d'Entreprise";

export function formationIaMarchePublicMetadata(
  config: FormationIaMarchePublicConfig,
): Metadata {
  return createPageMetadata({
    title: config.metaTitle,
    description: config.metaDescription,
    descriptionFinal: true,
    path: config.path,
    keywords: config.keywords,
    appendAuthorSuffix: false,
    openGraphType: 'website',
    image: {
      url: '/images/laure-olivie-formatrice-ia-btp-qualiopi.webp',
      width: 1200,
      height: 630,
      alt: `${config.metaTitle} — Qualiopi, Laure Olivié`,
    },
  });
}

/** Page pilier — hub commande publique / marché public de travaux */
export const FORMATION_IA_MARCHE_PUBLIC_TRAVAUX: FormationIaMarchePublicConfig = {
  id: 'travaux',
  path: '/formation-ia-marche-public-travaux',
  variant: 'pillar',
  h1: "Formation IA marché public de travaux — répondre et gérer avec l'IA (présentiel Île-de-France)",
  metaTitle: 'Formation IA marché public de travaux',
  metaDescription:
    'Formation IA marché public de travaux : DCE, Go-NoGo, mémoire technique. Présentiel Île-de-France, Qualiopi. Financement Constructys selon éligibilité.',
  keywords: [
    'formation IA marché public de travaux',
    'IA marchés publics BTP',
    'DCE marché public IA',
    'mémoire technique marché public',
    'CCAG-Travaux IA',
    'formation IA pour le BTP',
    'Qualiopi Constructys',
  ],
  pageLabel: 'Marché public de travaux',
  courseName: "L'IA appliquée aux appels d'offres BTP — marché public de travaux",
  courseDescription:
    "Formation IA pour répondre et gérer un marché public de travaux : DCE, Go-NoGo, mémoire technique, CCAG-Travaux (repères). Session 4 h présentiel Île-de-France, Qualiopi — parcours catalogue NIV-02.",
  courseTeaches: [
    'Analyse DCE et RC de marché public de travaux',
    'Go-NoGo et lecture BPU / DPGF assistée par IA',
    'Structuration de mémoire technique (commande publique)',
    'Repères CCAG-Travaux 2021 — sans conseil juridique',
  ],
  shortAnswer:
    "L'IA accélère la lecture d'un DCE, le Go-NoGo et le brouillon de mémoire technique sur un marché public de travaux. Elle ne remplace ni le chiffrage, ni la validation métier, ni le conseil juridique. Sessions en présentiel en Île-de-France, Qualiopi, financement Constructys selon éligibilité.",
  essentielItems: [
    'Angle commande publique : RC, CCAG-Travaux, BPU/DPGF, dématérialisation, pénalités, DGD.',
    'Méthode en 5 étapes + prompts — relecture humaine obligatoire avant dépôt.',
    'Conversion catalogue : fiche NIV-02 appels d’offres (tarif et programme sur la fiche).',
    'Présentiel Île-de-France uniquement · Qualiopi · Constructys selon éligibilité.',
  ],
  problemTitle: 'Le problème : répondre et gérer un marché public de travaux sous contrainte',
  problemParagraphs: [
    `Sur un marché public de travaux, le dossier ne se limite pas au CCTP. Le règlement de la consultation (RC), le CCAG-Travaux, le BPU ou la DPGF, les délais de dématérialisation et les clauses de pénalités conditionnent la réponse. Les équipes de chargés d’affaires et de conducteurs de travaux passent des heures à croiser des pièces PDF sans méthode stable.`,
    `Le risque n’est pas seulement de « mal rédiger » : c’est de rater un Go-NoGo, d’oublier une pièce, ou de produire un mémoire technique générique qui ne répond pas aux critères notés. L’IA grand public hallucine sur les versions de CCAG et invente des références — sans cadre, elle aggrave le risque.`,
    `La charge documentaire continue après l’attribution : ordres de service, avenants, décomptes, DGD. Sans trames et sans relecture humaine, le bureau perd du temps pendant que le chantier avance.`,
  ],
  solutionIntro: `Chez ${OFC}, la formation IA pour le BTP sur l’angle marché public de travaux apprend à préparer, analyser et répondre avec des prompts cadrés — toujours avec validation métier. Le parcours catalogue associé est la fiche NIV-02 (appels d’offres) : programme, durée et tarif y sont détaillés, sans doublon sur cette page.`,
  solutionGuards: [
    'L’IA aide à préparer, analyser et répondre — elle ne remplace ni le chiffrage, ni la validation métier, ni le conseil juridique',
    'Sources : pièces du DCE fournies par vous ; jamais de conclusion de conformité normative ou contractuelle par l’outil seul',
    'Relecture humaine systématique avant dépôt électronique ou envoi au pouvoir adjudicateur',
    'Confidentialité : extraits anonymisés ; pas de données sensibles dans un outil grand public sans cadre entreprise',
  ],
  methodSteps: [
    {
      title: 'Inventaire du DCE et mapping des pièces',
      body: 'Lister RC, AE, CCAP / CCP, CCTP, BPU/DPGF, plans, annexes. L’IA propose une grille de lecture ; vous validez les pièces manquantes.',
    },
    {
      title: 'Go-NoGo assisté',
      body: 'Extraire délais, caution, critères, pénalités, sous-traitance. Décision humaine : répondre ou passer.',
    },
    {
      title: 'Analyse technique et prix',
      body: 'Structurer les exigences CCTP et croiser BPU/DPGF. L’IA aide au tableau ; le chiffrage reste interne.',
    },
    {
      title: 'Mémoire technique aligné sur les critères',
      body: 'Plan de mémoire + brouillons par critère noté, à partir de vos références réelles — jamais inventées.',
    },
    {
      title: 'Contrôle dépôt et suite d’exécution',
      body: 'Checklist pièces, format dématérialisé, puis trames OS / avenants / DGD une fois le marché attribué.',
    },
  ],
  prompts: [
    {
      title: 'Mapping DCE — marché public de travaux',
      body: `Voici la liste des fichiers de mon DCE (noms + extrait sommaire) : [LISTE].
Produis un tableau : pièce | rôle probable | questions à poser si absente | priorité lecture (1–5).
Ne conclue pas sur la conformité au Code de la commande publique. Indique [à vérifier] pour toute incertitude.`,
    },
    {
      title: 'Go-NoGo — critères et risques',
      body: `Extrait RC / CCAP : [COLLEZ].
Liste : délais de réponse, caution, critères pondérés, pénalités mentionnées, règles de sous-traitance, formes de groupement.
Propose 5 questions Go-NoGo pour le dirigeant. Rappel : décision humaine ; pas de conseil juridique.`,
    },
    {
      title: 'Plan de mémoire technique — critères notés',
      body: `Critères d’attribution : [LISTE]. Mon entreprise (anonymisé) : [MOYENS, RÉFÉRENCES].
Propose un plan de mémoire (titres H2 + 2 bullets) aligné sur chaque critère. Interdiction d’inventer des chantiers.`,
    },
    {
      title: 'BPU / DPGF — points de vigilance (sans chiffrage)',
      body: `Extrait BPU ou DPGF : [COLLEZ].
Repère unités, ouvrages ambigus, postes à clarifier avec la MOE. Ne propose aucun prix. Sortie : tableau ouvrage | ambiguïté | question à poser.`,
    },
    {
      title: 'Suite d’exécution — trame DGD / décompte (brouillon)',
      body: `Notes de chantier / décompte : [NOTES].
Propose une structure de courrier ou de DGD (titres uniquement) : faits, pièces jointes, montants [à compléter], demandes. Ton factuel. Pas de qualification juridique.`,
    },
  ],
  ccagSection: {
    intro:
      'Le CCAG-Travaux (édition 2021) fixe des repères fréquents sur les marchés publics de travaux (ordres de service, délais, réception, garanties). Ces points sont des rappels pédagogiques pour cadrer vos prompts — pas un conseil juridique ni une analyse de votre marché.',
    bullets: [
      'Ordres de service et délais : l’IA aide à reformuler un brouillon ; la date et la signature restent métier',
      'Réception et réserves : structurer un PV ou une liste de points — validation chef de chantier / CT',
      'Pénalités et avenants : repérer les clauses dans le CCAP / CCP ; ne jamais « calculer » une pénalité sans votre service',
      'Dématérialisation : checklist de pièces et formats — le dépôt reste sous votre responsabilité',
    ],
    disclaimer:
      'Repères uniquement. Pour toute interprétation contractuelle ou contentieuse, consultez un conseil compétent. L’IA ne se substitue pas au juriste ni au maître d’œuvre.',
  },
  lots: [
    {
      href: LINKS.formationIaMarchePublicEtancheite,
      title: 'Lot étanchéité',
      description:
        'DTU 43.x, toiture-terrasse, relevés, EPDM/bitume, note technique — angle CSFE et commande publique.',
    },
    {
      title: 'Lot gros œuvre',
      description: 'Béton, DTU 21 / 20.1, métré et mémoire — page à venir.',
      comingSoon: true,
    },
    {
      title: 'Lot terrassement / VRD',
      description: 'Terrassements, réseaux, CCTP TP — page à venir.',
      comingSoon: true,
    },
  ],
  eeatParagraph: `${OFC} a formé plus de ${formatProfessionalsTrainedCount()} professionnels (note ${SOCIAL_PROOF.AVERAGE_RATING}). Laure Olivié intervient notamment avec la FFB, la ${CSFE_NOM_LIBRE}, l’${UMB_FFB_NOM_LIBRE}, le CNAM Entreprise et Lefebvre Dalloz. Les sessions marché public de travaux restent en présentiel en Île-de-France, certifiées Qualiopi, avec financement OPCO Constructys possible selon éligibilité.`,
  faq: [
    {
      q: "Qu’est-ce qu’une formation IA marché public de travaux ?",
      a: 'C’est une session présentielle (Île-de-France) qui apprend à utiliser l’IA pour préparer et analyser un DCE de commande publique, structurer un Go-NoGo et un mémoire technique — sans remplacer chiffrage ni validation métier. Le programme catalogue associé est la fiche NIV-02 appels d’offres BTP (lien en tête de page).',
    },
    {
      q: 'L’IA peut-elle remplacer mon chiffrage BPU ou DPGF ?',
      a: 'Non. L’IA peut aider à lister des postes ambigus ou à préparer un tableau de contrôle. Les prix, ratios et engagements restent sous votre responsabilité professionnelle.',
    },
    {
      q: 'Le CCAG-Travaux 2021 est-il « enseigné » comme du droit ?',
      a: 'Non : j’utilise des repères pour cadrer la lecture des pièces et les prompts. Toute question juridique ou contentieuse relève d’un conseil compétent — pas de l’IA ni de la formation seule.',
    },
    {
      q: 'Où trouver le tarif et le programme détaillé ?',
      a: 'Sur la fiche catalogue NIV-02 « L’IA appliquée aux appels d’offres BTP » : durée, forfait session, prérequis Claude Pro, livrables. Cette page pilier pose l’angle commande publique ; elle ne duplique pas le programme.',
    },
    {
      q: 'Le financement Constructys est-il garanti ?',
      a: 'Non. Un financement OPCO Constructys est possible selon éligibilité (branche, disponibilité des fonds, dossier). Je vous oriente lors de l’appel découverte — sans promesse de prise en charge automatique.',
    },
    {
      q: 'La formation est-elle disponible hors Île-de-France ou en distanciel ?',
      a: 'Non pour le catalogue OFC actuel : présentiel uniquement · Île-de-France uniquement (inter en salle ou intra dans vos locaux franciliens).',
    },
  ],
  inlineLinkHrefs: [
    LINKS.formationAO,
    LINKS.formationIaMarchePublicEtancheite,
    LINKS.aPropos,
    LINKS.partenaires,
    LINKS.financement,
  ],
};

/** Lot test — étanchéité (CSFE, fort E-E-A-T) */
export const FORMATION_IA_MARCHE_PUBLIC_ETANCHEITE: FormationIaMarchePublicConfig = {
  id: 'etancheite',
  path: '/formation-ia-marche-public-etancheite',
  variant: 'lot',
  h1: "Formation IA marché public étanchéité — DCE, mémoire et DTU 43 (présentiel Île-de-France)",
  metaTitle: 'Formation IA marché public étanchéité',
  metaDescription:
    'Formation IA marché public étanchéité : DTU 43, toiture-terrasse, EPDM, note technique CSFE. Présentiel Île-de-France, Qualiopi, Constructys selon éligibilité.',
  keywords: [
    'formation IA marché public étanchéité',
    'IA DCE étanchéité',
    'mémoire technique étanchéité marché public',
    'DTU 43 marché public',
    'CSFE formation IA',
    'formation IA pour le BTP',
  ],
  pageLabel: 'Marché public étanchéité',
  courseName: "L'IA appliquée aux appels d'offres BTP — lot étanchéité",
  courseDescription:
    "Formation IA pour répondre à un marché public d’étanchéité : DCE, DTU 43.x (repères), toiture-terrasse, EPDM/bitume, note technique. 4 h présentiel Île-de-France, Qualiopi — parcours NIV-02.",
  courseTeaches: [
    'Analyse CCTP étanchéité en marché public',
    'Mémoire technique lot étanchéité / enveloppe',
    'Repères DTU 43.x, relevés, EEP — validation métier',
    'Note technique support et interfaces toiture-terrasse',
  ],
  shortAnswer:
    "Sur un marché public d’étanchéité, l’IA aide à cartographier le CCTP (toiture-terrasse, relevés, EPDM/bitume), à préparer la note technique et le mémoire — sans trancher la conformité DTU 43.x. Présentiel Île-de-France, Qualiopi, Constructys selon éligibilité. Partenariat pédagogique CSFE.",
  introParagraph:
    "OFC Création d'Entreprise — formation IA pour répondre à un marché public d’étanchéité : CCTP toiture-terrasse, relevés, EPDM/bitume, note technique et mémoire. Sessions en présentiel en Île-de-France (4 h), Qualiopi. Financement Constructys possible selon éligibilité. Partenariat pédagogique CSFE.",
  essentielItems: [
    'Lot étanchéité en commande publique : CCTP, interfaces gros œuvre, avis techniques, dépôt dématérialisé.',
    'Repères DTU 43.x, relevés, EEP, systèmes bitume / EPDM — jamais de validation normative par l’IA seule.',
    'Autorité : Laure Olivié a formé des équipes du réseau CSFE à l’usage responsable de l’IA.',
    'Conversion : fiche NIV-02 ; quotidien métier : page formation IA étancheur.',
  ],
  problemTitle: 'Le problème du lot étanchéité en marché public',
  problemParagraphs: [
    `Un DCE d’étanchéité cumule CCTP dense (systèmes, pentes, drainage), plans de détail, avis techniques et exigences de coordination avec le gros œuvre. Sur toiture-terrasse, les relevés, platines et points singuliers concentrent les réserves — et les contentieux.`,
    `Le mémoire technique doit parler le langage du lot : EPDM ou bitume, EEP, protections lourdes ou légères, végétalisation éventuelle, accès en hauteur. Un texte « générique enveloppe » ne convainc pas un jury de marché public.`,
    `Sans méthode, l’équipe reformule toute la nuit avant la date limite de dépôt. L’IA non cadrée invente des numéros de DTU 43.x ou des performances de système — inacceptable en commande publique.`,
  ],
  solutionIntro: `Cette page lot complète le hub « marché public de travaux » avec le vocabulaire étanchéité. La session catalogue reste la fiche NIV-02 (appels d’offres) : ici, je détaille les cas d’usage DCE / mémoire pour le lot, avec les garde-fous CSFE et DTU.`,
  solutionGuards: [
    'L’IA structure brouillons et tableaux à partir de vos pièces — elle ne valide pas un système ni un avis technique',
    'Toujours croiser fascicules DTU 43.x, CCTP et notices fabricants avant envoi',
    'Pas de chiffrage automatique des quantités toiture-terrasse sans vos ratios internes',
    'Pas de conseil juridique sur pénalités ou réception — repères de lecture uniquement',
  ],
  methodSteps: [
    {
      title: 'Cartographier le CCTP étanchéité',
      body: 'Zones, systèmes, interfaces (acrotères, lanterneaux, évacuations). Grille IA + relecture chef d’équipe.',
    },
    {
      title: 'Repères DTU 43.x et avis techniques',
      body: 'Lister les renvois du CCTP ; ouvrir les fascicules officiels. L’IA propose des questions — pas des verdicts.',
    },
    {
      title: 'Go-NoGo lot (accès, planning, garanties)',
      body: 'Contraintes de hauteur, phasage avec gros œuvre, responsabilités interfaces — décision dirigeant.',
    },
    {
      title: 'Note technique et mémoire',
      body: 'Plan de note technique support + sections mémoire alignées sur les critères notés, avec vos références.',
    },
    {
      title: 'Contrôle dépôt',
      body: 'Checklist pièces spécifiques étanchéité (AT, fiches, organigramme chantier) avant envoi dématérialisé.',
    },
  ],
  prompts: [
    {
      title: 'CCTP étanchéité — extraction exigences',
      body: `Extrait CCTP lot étanchéité : [COLLEZ].
Tableau : zone | système (bitume/EPDM/autre) | performances citées | interfaces | essais | questions MOE.
Ne cite un DTU 43.x que s’il apparaît dans l’extrait ; sinon [à vérifier sur fascicule].`,
    },
    {
      title: 'Toiture-terrasse — relevés et points singuliers',
      body: `Notes de plan : [NOTES].
Liste de contrôle : relevés, platines, chéneaux, joints, évacuations, protections. Pour chaque point : risque si omis + question à poser. Pas de dimensionnement.`,
    },
    {
      title: 'Note technique support — plan de rédaction',
      body: `Marché public étanchéité. Critères : [LISTE]. Moyens entreprise : [RÉSUMÉ].
Propose un plan de note technique (titres + bullets) : méthode, systèmes, contrôles, sécurité hauteur, planning. Interdiction d’inventer des AT ou des chantiers.`,
    },
    {
      title: 'Mémoire technique — lot étanchéité',
      body: `Critères notés : [LISTE]. Références anonymisées : [LISTE].
Plan de mémoire H2 aligné critères + 2 bullets. Section interfaces gros œuvre / étanchéité obligatoire si le CCTP le mentionne.`,
    },
    {
      title: 'EEP / réception — structure de compte rendu',
      body: `Notes d’essai d’étanchéité à l’eau ou de visite : [NOTES].
Structure CR : zones, observations factuelles, réserves, demandes de précision. Ne pas inventer de résultats d’essai.`,
    },
  ],
  lotSpecificSections: [
    {
      title: 'DTU 43.x et systèmes : bitume, EPDM, résines',
      paragraphs: [
        `Les marchés publics d’étanchéité renvoient souvent aux fascicules de la série DTU 43 (toitures-terrasses et toitures inclinées selon le contexte). L’IA peut vous aider à organiser une checklist de lecture à partir du CCTP, mais elle ne remplace pas l’ouverture du fascicule applicable ni l’avis technique du système retenu.`,
        `Bitume (SBS/APP, SEL selon prescriptions), membranes EPDM, résines : chaque famille impose un vocabulaire de pose, de joints et de protections. Vos prompts doivent imposer : « ne pas inventer de numéro de DTU ni de performance » et « signaler [à vérifier] ».`,
        `Sur les points singuliers (relevés d’acrotère, platines, lanterneaux), le jury attend une méthode claire — pas un paragraphe marketing. Structurez : interface → risque → contrôle → responsable.`,
      ],
    },
    {
      title: 'Toiture-terrasse, relevés, EEP',
      paragraphs: [
        `La toiture-terrasse concentre les exigences de pente, de drainage et de protection (lourde, légère, végétalisée). L’IA sert à transformer vos notes de visite ou d’extrait de plan en liste de contrôles — vous validez dimensions et systèmes.`,
        `Les relevés sont un point de friction classique avec le gros œuvre : hauteur, fixations, compatibilité support. Préparez avec l’IA un tableau « question MOE / pièce manquante » plutôt qu’un texte long.`,
        `L’essai d’étanchéité à l’eau (EEP) et les PV associés se prêtent à des trames de compte rendu. L’outil reformule vos observations ; il ne « valide » jamais un essai.`,
      ],
    },
    {
      title: 'Note technique et autorité CSFE',
      paragraphs: [
        `La note technique (ou mémoire de méthode) doit coller aux critères du RC : moyens humains, matériel, planning, contrôles qualité, sécurité en hauteur. Travaillez section par section avec vos données réelles.`,
        `${OFC} est partenaire de la ${CSFE_NOM_LIBRE} pour la sensibilisation et la formation. Laure Olivié a formé des équipes du réseau CSFE à l’usage responsable de l’IA — un repère E-E-A-T fort pour les entreprises d’étanchéité en Île-de-France.`,
        `Pour le quotidien hors marché public (devis, CR, PPSPS), voir la page métier étancheur. Pour le programme et le tarif de session, voir la fiche NIV-02 appels d’offres.`,
      ],
    },
  ],
  eeatParagraph: `Plus de ${formatProfessionalsTrainedCount()} professionnels formés · note ${SOCIAL_PROOF.AVERAGE_RATING}. Partenariat pédagogique avec la ${CSFE_NOM_LIBRE} ; interventions FFB, ${UMB_FFB_NOM_LIBRE}, CNAM Entreprise, Lefebvre Dalloz. Sessions Qualiopi en présentiel Île-de-France — financement Constructys selon éligibilité.`,
  faq: [
    {
      q: 'ChatGPT connaît-il le DTU 43 pour un marché public d’étanchéité ?',
      a: 'Pas de façon fiable pour trancher. Il peut proposer une structure de lecture ou un tableau d’exigences à partir de votre extrait CCTP. La conformité reste sur fascicule officiel, avis techniques et validation chef de travaux.',
    },
    {
      q: 'En quoi cette page diffère de la formation IA étancheur ?',
      a: 'La page métier étancheur couvre le quotidien (devis, CR, PPSPS). Ici, l’angle est la commande publique : DCE, mémoire, note technique, dépôt. Les deux se complètent ; la conversion catalogue reste la fiche NIV-02 appels d’offres.',
    },
    {
      q: 'Laure Olivié a-t-elle formé la CSFE ?',
      a: `Oui : des sessions IA ont été dispensées pour des équipes et le réseau de la ${CSFE_NOM_LIBRE}. Le dispositif reste Qualiopi ; les validations techniques restent en entreprise.`,
    },
    {
      q: 'L’IA peut-elle rédiger seule ma note technique étanchéité ?',
      a: 'Non. Elle accélère le plan et les brouillons à partir de vos moyens et références. Vous relisez, complétez les AT et engagez votre responsabilité avant dépôt.',
    },
    {
      q: 'Où se déroule la formation et comment la financer ?',
      a: 'Présentiel uniquement en Île-de-France. Financement OPCO Constructys possible selon éligibilité — jamais « garanti ». Tarif et programme : fiche NIV-02 ; hub cluster : formation IA marché public de travaux (liens dans le corps de page).',
    },
  ],
  inlineLinkHrefs: [
    LINKS.formationAO,
    LINKS.formationIaEtancheur,
    LINKS.formationIaMarchePublicTravaux,
    LINKS.aPropos,
    LINKS.partenaires,
    LINKS.financement,
  ],
  maillageLinks: [
    {
      href: LINKS.formationIaMarchePublicTravaux,
      label: 'Formation IA marché public de travaux',
      description: 'Hub commande publique — RC, CCAG-Travaux, méthode Go-NoGo.',
    },
    {
      href: LINKS.formationIaEtancheur,
      label: 'Formation IA étancheur',
      description: 'Quotidien métier : devis, CR, PPSPS, DTU 43 — hors angle marché public.',
    },
  ],
};
