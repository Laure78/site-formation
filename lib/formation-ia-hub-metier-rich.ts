/**
 * Pages hub `/formation-ia/[slug]` réécrites (structure métier longue) — indexables + sitemap.
 */
import type { FormationIaMetierDynamicConfig } from '@/lib/formation-ia-metier-dynamic-types';
import { formatAnneesExperienceBTP } from '@/lib/data/indicateurs-resultats';
import { LINKS } from '@/lib/internal-links';

const OFC = "OFC Création d'Entreprise";

const HUB_PLATRERIE: FormationIaMetierDynamicConfig = {
  slug: 'platrerie-cloisons-faux-plafonds',
  path: '/formation-ia/platrerie-cloisons-faux-plafonds',
  seoTitle: 'Formation IA plâtrerie BTP : cloisons, DTU 25',
  seoDescription:
    'Formation IA pour plâtrerie, cloisons et faux plafonds : DTU 25, métrés, CCTP, coordination lots. Qualiopi, présentiel Île-de-France, financement OPCO selon éligibilité.',
  keywords: [
    'formation IA plâtrerie BTP',
    'formation IA plaquiste',
    'ChatGPT cloisons plâtre',
    'DTU 25.1',
    'devis cloisons IA',
    'faux plafonds BTP',
    'Qualiopi second œuvre',
  ],
  breadcrumbMetierLabel: 'Formation IA plâtrerie & cloisons',
  breadcrumbMetierShort: 'Plâtrerie, cloisons & faux plafonds',
  h1MetierPluriel: 'plaquistes et plâtriers',
  h1Override:
    'Formation IA plâtrerie, cloisons et faux plafonds — DTU 25, métrés et coordination chantier',
  metierPlurielLower: 'plaquistes et équipes plâtrerie',
  heroIntro:
    'Ateliers sur vos devis linéaires, réservations réseaux et comptes rendus de coordination — avec relecture humaine avant tout envoi MOE ou client.',
  probleme: {
    titreH2: 'Le problème : cloisons, doublages et faux plafonds sous pression documentaire',
    paragraphes: [
      `Sur un lot plâtrerie–cloisons–faux plafonds, la journée se partage entre pose (ossatures métalliques, montants M48/M70, fourrures, suspentes, plaques BA13 ou hydrofuges, bandes à joint, enduits garnissants) et une couche administrative qui ne se voit pas sur le chantier mais bloque la trésorerie : métrés linéaires et surfaces à reprendre après chaque réunion de coordination, DPGF à aligner sur le CCTP lot cloisons, variantes acoustiques (DnTw, Rw) ou coupe-feu à clarifier avec le bureau de contrôle.`,
      `Le DTU 25.1 (ouvrages en plaques de plâtre) et les avis techniques du lot ne se « devinent » pas dans un assistant IA : une réponse générique peut mélanger doublage collé, cloison sur ossature ou contre-cloison, ou oublier les renforts pour charges suspendues (WC, radiateurs, écrans). Résultat : devis sous-estimés, réservations électriques ou CVC mal calées, reprises après passage du plombier ou de l’électricien, réserves au PV de réception.`,
      `En Île-de-France, les chantiers tertiaires, logements collectifs et réhabilitations en site occupé compressent les délais : le conducteur ou le chef d’équipe plâtrerie enchaîne les mails MOE, les demandes de précision sur trémies, les fiches de non-conformité et les relances sous-traitants peinture ou sols souples. Sans trame, on rédige le même courrier de demande de levée d’ambiguïté CCTP le soir, ou on copie-colle un ancien mémoire technique sans reprendre les critères du règlement de consultation.`,
      `Les entreprises de second œuvre que je forme (FFB, réseaux partenaires, TPE et PME du bâtiment) n’ont pas besoin d’un tutoriel « ChatGPT pour tous » : elles ont besoin de prompts qui parlent plaques, joints, ossatures, performances feu EI, isolation thermique par l’intérieur et interfaces lot électricité / plomberie / peinture — avec la règle non négociable : l’IA propose, le plâtrier ou le conducteur valide sur plans, métré et fascicule DTU.`,
      `La charge mentale vient aussi des DOE et des dossiers de fin de chantier : listes de produits, fiches techniques placo, attestations, plans de repérage des cloisons coupe-feu. Structurer ces livrables sans automatiser la conformité libère du temps pour le contrôle qualité sur site (aplomb, planéité, étanchéité à l’air des menuiseries intérieures en interface).`,
    ],
  },
  solution: {
    titreH2: 'Ce que change une formation IA cadrée pour le lot plâtrerie',
    intro: `${OFC} (organisme certifié Qualiopi) propose une session de 4 h en présentiel en Île-de-France : vous manipulez ChatGPT et Claude AI sur vos propres modèles — devis cloison, mails MOE, CR de réunion, check-list avant peinture — avec anonymisation, rappels RGPD et validation systématique. L’objectif n’est pas de « chiffrer à votre place » un métré linéaire, mais de réduire le temps de structuration et de limiter les oublis de postes (isolant, pare-vapeur, renforts, traitements pièces humides).`,
    casUsage: [
      'Structurer un devis par niveau ou par zone (doublage, cloison de distribution, habillage colonne, faux plafond dalles ou plaques) à partir d’une liste de pièces ou d’un extrait de plan — sans inventer de quantités.',
      'Préparer un mail de coordination électricité / CVC : réservations, hauteurs sous faux plafond, passages de gaines, calfeutrements coupe-feu à valider avec le SPS.',
      'Transformer des notes de réunion en CR avec décisions, points bloquants, qui fait quoi avant la prochaine visite MOE ou OPC.',
      'Lister les questions à poser au maître d’œuvre lorsque le CCTP est flou sur l’acoustique, l’humidité ou la classification des cloisons EI.',
      'Rédiger une check-list « prêt pour peinture » (ponçage, dépoussiérage, reprise de joints, humidité) pour limiter les réserves du lot finitions.',
    ],
  },
  methode: {
    titreH2: 'Méthode en atelier : trois prompts métier à réutiliser',
    intro:
      'Les trois modèles ci-dessous sont travaillés en session sur vos données réelles (anonymisées). Chaque sortie est relue avant envoi : prix, quantités, performances acoustiques ou feu restent sous votre responsabilité.',
    etapes: [
      {
        title: 'Métré narratif cloisons / doublages (structure sans prix)',
        prompt: `Tu es plâtrier / plaquiste en France, lot cloisons et doublages.
Données chantier : [TYPE DE PROJET — neuf / réhabilitation], [LISTE PIÈCES ou zones], hauteurs sous dalle/faux plafond : [COTES], types demandés : [doublage collé / cloison 72/98/120 / faux plafond].
Propose une STRUCTURE de métré (postes et sous-postes) : ossature, isolant, pare-vapeur si pertinent, plaques (BA13 / hydro / feu), joints, enduits, renforts, calfeutrements, échafaudage si besoin.
Unités : ml, m², u. Rappelle de croiser CCTP lot cloisons, DPGF et DTU 25.1.
Interdiction d’inventer des quantités chiffrées : marquer [à valider au métré] sur chaque ligne quantifiable.`,
        resultat:
          'Un tableau prêt à remplir dans Excel ou votre logiciel de devis, avec postes oubliés souvent repérés (renforts, traitements pièces humides, reprises après réseaux).',
      },
      {
        title: 'Mail MOE — précision acoustique, feu ou réservation réseau',
        prompt: `Rôle : chef d’équipe plâtrerie / conducteur travaux second œuvre.
Contexte : [CHANTIER, ville], problème : [ex. DnTw non précisé / classe EI incertaine / conflit réservation gaine vs faux plafond].
Rédige un mail court au maître d’œuvre ou à la MOE : rappel du lot, faits observés sur plans ou CCTP [CITER EXTRAIT], 3 à 5 questions fermées, demande de réponse écrite avant commande plaques ou lancement zone.
Ton : professionnel, factuel, sans engagement de prix ni de délai non confirmé.`,
        resultat:
          'Un courrier prêt à envoyer, qui évite les allers-retours téléphoniques non tracés et protège l’entreprise en cas de litige interface.',
      },
      {
        title: 'Compte rendu de coordination multi-lots (plâtrerie centrale)',
        prompt: `Notes brutes de réunion chantier : [COLLEZ NOTES — présents, sujets abordés].
Rédige un CR structuré : en-tête chantier, date, participants, points abordés par lot (plâtrerie, électricité, plomberie, peinture, CVC), décisions prises, réserves / actions, échéances, pièces à transmettre.
Mentionne explicitement les interfaces faux plafond / trémies / trappes de visite si présentes dans les notes.
Ne pas inventer de décisions absentes des notes : marquer [à confirmer] si besoin.`,
        resultat:
          'Un CR partageable au MOE et aux corps d’état, exploitable pour le planning semaine et la défense en cas de retard imputable à un autre lot.',
      },
    ],
  },
  resultats: {
    titreH2: 'Résultats observés après mise en pratique (indicateurs internes)',
    intro:
      'Les ordres de grandeur ci-dessous proviennent de retours de stagiaires (TPE et PME du bâtiment, second œuvre) après 4 à 8 semaines d’usage encadré — ils varient selon la maturité documentaire de l’entreprise. Ils ne remplacent pas une mesure formalisée sur votre propre organisation.',
    tableau: [
      {
        critere: 'Structuration devis cloison / faux plafond',
        avant: '1 à 2 h de mise en forme manuelle',
        apres: '20–40 min avec trame IA + relecture métré',
      },
      {
        critere: 'CR de réunion coordination',
        avant: '45–60 min le soir',
        apres: '15–25 min avec prompt CR + validation chef d’équipe',
      },
      {
        critere: 'Mails MOE (précisions CCTP)',
        avant: 'Rédaction « au feeling », risque d’oubli',
        apres: 'Liste de questions ciblée, ton homogène',
      },
      {
        critere: 'Confiance équipe dans l’IA',
        avant: 'Essais individuels, crainte d’erreur norme',
        apres: 'Cadre Qualiopi, règles de validation partagées',
      },
    ],
    temoignages: [
      {
        citation:
          '« On a enfin une trame pour les mails MOE sur l’acoustique des cloisions — moins de allers-retours, et le patron valide avant envoi. »',
        attribution: 'Chef d’équipe plâtrerie — petit collectif, Essonne (anonymisé)',
      },
    ],
  },
  faq: [
    {
      q: 'ChatGPT peut-il calculer mes m² de plaques à la place du métré ?',
      a: 'Non. Il peut proposer une structure de postes et des unités cohérentes ; le relevé de cotes, les réservations et le chiffrage définitif restent votre responsabilité ou celle de votre métreur.',
    },
    {
      q: 'Le DTU 25.1 peut-il être « tranché » par l’IA ?',
      a: 'Non. L’assistant aide à organiser une lecture ou une check-list ; la conformité se vérifie sur le fascicule DTU, les avis techniques et les plans contractuels.',
    },
    {
      q: 'Peut-on déposer un CCTP complet ou des plans dans ChatGPT ?',
      a: 'En session, nous cadrons l’anonymisation et les usages autorisés par votre entreprise. Évitez les données personnelles et les pièces sensibles non contrôlées dans un compte grand public.',
    },
    {
      q: 'Quelle différence avec la fiche catalogue BTP-01 ?',
      a: 'BTP-01 pose le socle commun (prompts, limites, financement). Cette page hub plâtrerie approfondit le vocabulaire cloisons, faux plafonds et coordination lots pour des ateliers plus immédiats.',
    },
    {
      q: 'Intervention en Île-de-France uniquement ?',
      a: 'Oui pour le présentiel intra ou inter : déplacements depuis Guyancourt (78). Visio découverte pour cadrer le besoin avant devis de session.',
    },
  ],
  courseName: 'Formation IA plâtrerie, cloisons et faux plafonds BTP',
  courseDescription:
    'Session Qualiopi 4 h : IA appliquée au lot plâtrerie — DTU 25, métrés, CCTP, coordination électricité/CVC/peinture. Présentiel Île-de-France.',
  courseTeaches: [
    'Prompts ChatGPT pour devis cloisons',
    'Lecture assistée CCTP lot plâtrerie',
    'Comptes rendus coordination chantier',
    'Garde-fous DTU 25 et confidentialité',
  ],
  bio: {
    titreH2: 'Laure Olivié — formatrice IA, terrain BTP',
    paragraphes: [
      `Je suis Laure Olivié, fondatrice de ${OFC}, organisme certifié Qualiopi. ${formatAnneesExperienceBTP()} comme ancienne dirigeante d'une entreprise de travaux publics (ALIA BTP), j’interviens auprès de dirigeants et d’équipes du bâtiment en Île-de-France : FFB, CSFE, CNAM Entreprise, Le Moniteur Formations.`,
      `Les sessions plâtrerie–cloisons s’appuient sur des cas réels : métrés linéaires, interfaces réseaux, reprises après lots techniques, relecture de productions IA avant envoi MOE. Je n’enseigne pas le geste de pose ; j’enseigne une méthode documentaire qui respecte le DTU et le contrat.`,
      `Intervenante LinkedIn Learning sur l’IA appliquée au BTP, je maintiens le même exigence de prudence sur les chiffres et les normes que sur le terrain chantier.`,
    ],
  },
  bioPhotoAlt: 'Laure Olivié, formatrice IA BTP Qualiopi — session plâtrerie et cloisons',
  ogImage: {
    url: '/images/formation-ia-intra-entreprise-batiment.webp',
    width: 1024,
    height: 571,
    alt: 'Formation IA plâtrerie et cloisons — session entreprise BTP, Laure Olivié',
  },
  maillageInterne: [
    {
      href: LINKS.formationIaBtp,
      label: 'Formation IA BTP — pilier devis, DCE et productivité chantier',
    },
    {
      href: LINKS.iaDevis,
      label: 'IA pour devis bâtiment — structurer postes et variantes sans oublier le métré',
    },
    {
      href: LINKS.iaCompteRenduChantier,
      label: 'IA compte rendu de chantier — modèle CR coordination multi-lots',
    },
  ],
};

const HUB_RICH_BY_SLUG: Record<string, FormationIaMetierDynamicConfig> = {
  'platrerie-cloisons-faux-plafonds': HUB_PLATRERIE,
};

/** Slugs hub `/formation-ia/[slug]` réécrits, indexables et listés au sitemap. */
export const FORMATION_IA_HUB_METIER_INDEXABLE_SLUGS = Object.freeze(
  Object.keys(HUB_RICH_BY_SLUG),
) as readonly string[];

export function getFormationIaHubMetierRichConfig(
  slug: string,
): FormationIaMetierDynamicConfig | null {
  return HUB_RICH_BY_SLUG[slug] ?? null;
}

export function getFormationIaHubMetierSitemapPaths(): string[] {
  return FORMATION_IA_HUB_METIER_INDEXABLE_SLUGS.map((slug) => `/formation-ia/${slug}`);
}
