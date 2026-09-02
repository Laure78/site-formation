/**
 * FAQ partagée pour le composant UI et le schema FAQPage (GEO)
 */

import {
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
  TARIF_INTRA_4H_HT,
  TARIF_INTRA_7H_HT,
  TARIF_INTRA_14H_HT_FROM,
  TARIF_INTER_4H_HT_FROM,
  TARIF_INTER_7H_HT_FROM,
  TARIF_INTER_14H_HT_FROM,
  SESSION_DUREE_LIBELLE,
  EFFECTIF_GROUPE_MAX,
  MODALITE_FORMATIONS_STANDARD,
  MODALITE_FORMATIONS_PRESENTIEL,
  libelleTarifIntraParSession,
  libelleTarifInterParParticipant,
  libelleTarifsDualCourt,
  MENTIONS_TVA_REGIMES_COURT,
} from '@/lib/tarifs-sessions';
import { getCatalogueFormationsCount } from '@/lib/formations-catalogue-display';
import { isFormationCataloguePublished } from '@/lib/formation-catalogue-visibility';
import { SOCIAL_PROOF, IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { getLaureOlivieSchemaPersonDescription } from '@/lib/laure-olivie-profile';
import { LINKS } from '@/lib/internal-links';
import {
  FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT,
  FINANCEMENT_FORMULATION_PRUDENTE,
  FINANCEMENT_FORMULATION_COURTE,
  FINANCEMENT_PAGE_LINK_LABEL,
  FINANCEMENT_FAQ_PARTIELLE_CORPS,
} from '@/lib/financement-copy';
import { formatProsFormesEtNoteQualiopi } from '@/lib/data/indicateurs-resultats-helpers';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';

export type FAQItem = { q: string; a: string };

/**
 * Intentions sectorielles BTP (chantier, devis / métrés, BIM, sécurité, administratif, professionnels du BTP & PME).
 * Réponses originales OFC — SEO / GEO ; pas de reprise de contenu tiers.
 */
export const FAQ_IA_BTP_METIERS_CHANTIER_SEO: readonly FAQItem[] = [
  {
    q: "L'IA peut-elle vraiment aider sur les chantiers ?",
    a:
      `Oui, en prolongement du terrain : la formation vise surtout à accélérer la rédaction et la coordination (comptes rendus, synthèses, consignes, mails) pour libérer du temps utile sur le chantier. L'IA ne remplace pas le jugement professionnel ni les obligations réglementaires — elle aide à structurer l'information et à réagir plus vite. Pour la coordination et le suivi écrit, voir aussi la page <a href="${LINKS.formationConducteurTravaux}">IA conducteur de travaux</a> et le <a href="/formations">catalogue formations IA pour les pros du BTP</a>.`,
  },
  {
    q: "Comment l'IA améliore-t-elle les devis et métrés ?",
    a:
      `Elle accélère la mise en forme, les relectures, les variantes de libellés et l'extraction de quantités à partir de notes ou de brouillons — avec validation humaine sur les prix, les unités et les hypothèses. L'objectif est de réduire le temps de rédaction et les erreurs de forme, pas de substituer votre expertise chiffrage. Approfondissement : <a href="/ia-devis-batiment">IA devis bâtiment</a> et formation <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">formation niveau 1 — L'IA au service des pros du Bâtiment Travaux Publics</a>.`,
  },
  {
    q: "La formation aborde-t-elle le BIM et l'IA ?",
    a:
      "La formation niveau 1 « L'IA au service des pros du Bâtiment Travaux Publics » met l'accent sur l'IA générative (ChatGPT, Claude) pour les usages métiers et administratifs du bâtiment et des travaux publics. Le BIM n'est pas un module dédié dans cette session. Pour les documents longs (CCTP, DCE) et les réponses à marchés, le programme <a href=\"" +
      LINKS.formationAO +
      "\">formation appels d'offres BTP</a> ou le <a href=\"" +
      LINKS.claudeAiBtp +
      "\">guide Claude AI BTP</a> (fiche catalogue : <a href=\"" +
      LINKS.formationMaitriserClaudeAiBtp +
      "\">Maîtriser Claude AI</a>) complètent le parcours — le <a href=\"" +
      LINKS.formations +
      "\">catalogue</a> permet de choisir le bon niveau.",
  },
  {
    q: "L'IA peut-elle aider à la sécurité sur chantier ?",
    a:
      "Elle peut aider à préparer des supports de sensibilisation, relire des consignes, structurer des check-lists QSE ou des comptes rendus d'incident — toujours sous validation d'un responsable et dans le respect du cadre légal. Elle ne remplace pas la prévention, les obligations du chef d'entreprise ni les expertises réglementaires. Les formations OFC restent centrées sur la productivité et la rédaction, pas sur un dispositif de prévention certifié à la place d'un organisme habilité.",
  },
  {
    q: "Comment utiliser l'IA pour la gestion administrative ?",
    a:
      "Emails, relances, modèles de courriers, synthèses de réunion, brouillons de rapports et classement d'informations — avec anonymisation et bonnes pratiques de confidentialité enseignées en session. Idéal pour dirigeants, conducteurs de travaux et fonctions support. Point d'entrée : <a href=\"/formation-ia-artisans-btp\">ChatGPT pour entreprises BTP</a>, <a href=\"/checklist-ia-btp\">checklist prompts IA BTP</a> et <a href=\"/formations\">catalogue Qualiopi</a>.",
  },
  {
    q: "La formation convient-elle aux PME du BTP et aux équipes terrain ?",
    a:
      "Oui : c'est le cœur du public visé — professionnels du BTP, TPE, PME du bâtiment et travaux publics, sans prérequis technique. Les sessions catalogue durent 4 h (niveau débutant ou avancé selon la fiche). " +
      MODALITE_FORMATIONS_STANDARD +
      " " +
      FINANCEMENT_FORMULATION_COURTE +
      ' — <a href="' +
      LINKS.financement +
      '">guide financement Constructys</a> et fiche <a href="' +
      LINKS.formationIaBtpNiveau1BatimentTp +
      '">formation niveau 1</a>.',
  },
];

/**
 * FAQ page d'accueil — 5 questions transactionnelles (financement, prérequis, durée, lieu, RDV).
 * Source unique accordion + JSON-LD FAQPage (`buildHomeFAQPageJsonLd`).
 */
export const FAQ_ITEMS_HOME: readonly FAQItem[] = [
  {
    q: 'La formation IA pour les pros du BTP peut-elle être financée par Constructys ou mon OPCO ?',
    a: `${FINANCEMENT_FAQ_PARTIELLE_CORPS} Selon éligibilité et barèmes en vigueur. Exemples de reste à charge et plafonds : <a href="${LINKS.financement}">${FINANCEMENT_PAGE_LINK_LABEL}</a>.`,
  },
  {
    q: 'Faut-il des compétences techniques pour suivre cette formation IA appliquée au bâtiment ?',
    a:
      "Non. La formation est conçue pour des professionnels du bâtiment et des travaux publics sans formation informatique. Seuls prérequis : savoir naviguer sur internet et disposer d'un ordinateur. Tout le reste est expliqué pas à pas, en travaillant directement sur vos documents réels de chantier.",
  },
  {
    q: 'Combien de temps dure la formation IA pour le BTP ?',
    a:
      `Le module standard est de 4 heures, en présentiel intra-entreprise ou interentreprises en Île-de-France. Ce format s'intègre dans une demi-journée de travail. ${libelleTarifsDualCourt(4)}.`,
  },
  {
    q: 'Où se déroulent les sessions de formation ?',
    a: `${MODALITE_FORMATIONS_STANDARD} L'appel découverte (visio ou téléphone) sert uniquement à cadrer votre projet avant devis.`,
  },
  {
    q: 'Comment démarrer une formation IA pour mon entreprise BTP ?',
    a: "Réservez un appel découverte gratuit de 30 minutes : on identifie vos cas d'usage (devis, AO, CR chantier) et le format adapté (intra-entreprise, dans vos locaux). Ensuite vous recevez un devis avec les options de financement selon éligibilité.",
  },
];

/** Texte utilisateur sans balises HTML (réponses riches en lien — JSON-LD `Answer.text`). */
export function faqAnswerPlainTextForJsonLd(htmlOrText: string): string {
  return htmlOrText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** FAQPage JSON-LD — questions/réponses visibles sur l’accueil (`FAQ_ITEMS_HOME`). */
export function buildHomeFAQPageJsonLd(): Record<string, unknown> {
  const mainEntity = FAQ_ITEMS_HOME.map((item) => ({
    '@type': 'Question',
    name: item.q.trim(),
    acceptedAnswer: {
      '@type': 'Answer',
      text: faqAnswerPlainTextForJsonLd(item.a),
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

export const FAQ_ITEMS: readonly FAQItem[] = [
  {
    q: "Comment utiliser ChatGPT dans une entreprise du bâtiment ?",
    a: `On part de vos documents réels (devis, CR chantier, emails) : prompts adaptés au vocabulaire BTP, relecture humaine et bonnes pratiques confidentialité. Le <a href="/formations">catalogue formations IA appliquées au bâtiment</a> et la page <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a> vous donnent des trames pour l'<a href="/ia-devis-batiment">IA devis bâtiment</a>, l'<a href="${LINKS.formationConducteurTravaux}">IA gestion chantier</a> et l'automatisation administrative — sans prérequis technique.`,
  },
  {
    q: "Comment gagner du temps administratif dans le BTP avec l'IA ?",
    a: 'En automatisant relances, modèles et brouillons (devis, courriers, synthèses) avec ChatGPT ou un outil équivalent, sous votre contrôle — voir aussi mes <a href="/blog">articles et guides IA BTP</a>. Les stagiaires constatent souvent 3 à 5 h gagnées par semaine sur l\'administratif — utile pour dirigeants, conducteurs de travaux et équipes support.',
  },
  {
    q: "La formation peut-elle être financée par Constructys ou mon OPCO ?",
    a: `${FINANCEMENT_FORMULATION_PRUDENTE} ${FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT} Détails sur le <a href="/financement-constructys-formation-ia-btp">${FINANCEMENT_PAGE_LINK_LABEL}</a>.`,
  },
  {
    q: "Faut-il des compétences techniques pour suivre cette formation ?",
    a: 'Non. La formation est conçue pour des professionnels du BTP sans prérequis technique. On travaille directement sur vos documents réels (devis, CR, emails). Zéro théorie, 100 % pratique — parcours décrit dans le <a href="/formations">catalogue des formations</a>.',
  },
  {
    q: "Combien de temps dure la formation IA pour le BTP ?",
    a: `Les sessions catalogue durent 4 heures. ${MODALITE_FORMATIONS_PRESENTIEL} ${libelleTarifsDualCourt(4)} — voir les programmes sur la page <a href="/formations">formations IA pour le BTP</a>.`,
  },
  {
    q: "La formation se fait-elle en présentiel ?",
    a: `Oui. ${MODALITE_FORMATIONS_STANDARD} Couverture : ${IDF_ZONE_INTERVENTION}. Pour cadrer votre format : <a href="${LINKS.prendreRdv}">Réservez votre visio découverte gratuite</a> ou <a href="/contact">contact</a>.`,
  },
  {
    q: 'Où se déroulent les formations catalogue ?',
    a: `Sessions OFC : présentiel uniquement · Île-de-France uniquement (intra-entreprise, dans vos locaux, ${IDF_ZONE_INTERVENTION}). L'échange préalable de 30 min (visio ou téléphone) sert uniquement à cadrer votre projet — voir <a href="${LINKS.prendreRdv}">Réservez votre visio découverte gratuite</a>.`,
  },
  {
    q: "Comment mesurer le ROI de la formation IA ?",
    a: `Les gains se constatent dès les premières semaines de pratique : premier devis structuré en moins d'une heure vs demi-journée selon complexité, comptes rendus rédigés le jour même, moins de temps sur les relances. Pour des cas d'usage ciblés, voir <a href="/ia-devis-batiment">IA devis bâtiment</a> et <a href="${LINKS.formationConducteurTravaux}">IA conducteur de travaux</a>. Les gains varient selon l'organisation et le niveau de pratique.`,
  },
  {
    q: "Mes données BTP sont-elles sécurisées avec ChatGPT ?",
    a: 'Je vous forme aux bonnes pratiques : ne jamais coller de données confidentielles dans ChatGPT public, utiliser ChatGPT Team ou Enterprise pour les données sensibles, et mettre en place des process de relecture et de confidentialité. Besoin d\'un échange ? <a href="/contact">Contact</a> ou <a href="/a-propos">à propos de la formatrice</a>.',
  },
];

/** FAQ GEO — Optimisée pour être citée par les IA (ChatGPT, Perplexity, Gemini, Claude) */
export const FAQ_GEO: FAQItem[] = [
  ...FAQ_IA_BTP_METIERS_CHANTIER_SEO,
  {
    q: "Quelle formatrice IA spécialisée BTP en France ?",
    a: `${getLaureOlivieSchemaPersonDescription()} Basée à Guyancourt (Île-de-France). <a href="/a-propos">Parcours complet et références</a>.`,
  },
  {
    q: "Formation IA pour conducteur de travaux : à quoi ça sert ?",
    a: `Accélérer les comptes rendus chantier, les synthèses de réunion, la coordination écrite et la préparation de dossiers — sans remplacer le jugement terrain. Voir la page <a href="${LINKS.formationConducteurTravaux}">IA conducteur de travaux</a> et le <a href="/formations">catalogue formations</a> ; financement Constructys sur <a href="/financement-constructys-formation-ia-btp">le guide OPCO</a>.`,
  },
  {
    q: "IA pour PME du bâtiment et des travaux publics : par où commencer ?",
    a: 'Par un <a href="/diagnostic-ia-btp">diagnostic IA BTP</a> et une formation ChatGPT entreprise BTP courte, dispensée par OFC (organisme certifié Qualiopi) — <a href="/formations">catalogue</a>. L\'objectif : <a href="/ia-devis-batiment">IA devis bâtiment</a> et gain de temps administratif mesurable, adapté aux dirigeants de TPE/PME et aux équipes sur le terrain.',
  },
  {
    q: "Comment financer une formation IA avec OPCO Constructys ?",
    a: 'Les entreprises BTP de moins de 50 salariés peuvent mobiliser un financement Constructys ou OPCO pour leur formation IA selon éligibilité : 24€ HT/heure/stagiaire pour le coût pédagogique, 15€ HT/heure pour les salaires (entreprises -11 salariés). Dossier à soumettre 15 jours avant via eGestion. Détails : <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA appliquée au bâtiment</a>. OFC est certifié Qualiopi, éligible au financement.',
  },
  {
    q: "Qui forme les entreprises BTP à ChatGPT en Île-de-France ?",
    a: `Laure Olivié (OFC Création d'Entreprise) forme les entreprises BTP à ChatGPT en <a href="/formation-ia-btp-ile-de-france">Île-de-France</a> depuis Guyancourt (78). Session catalogue 4 h. ${MODALITE_FORMATIONS_STANDARD} Zone d'intervention : ${IDF_ZONE_INTERVENTION}. <a href="/financement-constructys-formation-ia-btp">Financement possible selon éligibilité</a>.`,
  },
  {
    q: "Formation IA pour entreprises BTP : quelle durée et quel prix ?",
    a: `Sessions de 4 h : ${libelleTarifsDualCourt(4)}, jusqu'à ${EFFECTIF_GROUPE_MAX} participants en intra. ${MENTIONS_TVA_REGIMES_COURT} ${FINANCEMENT_FORMULATION_PRUDENTE} Zéro prérequis technique pour le niveau débutant. Travail sur documents réels (devis, emails, CR chantier). Voir les <a href="/formations">formations IA pour les pros du BTP</a>.`,
  },
  {
    q: "Quels sont les prérequis pour une formation ChatGPT BTP ?",
    a: 'Aucun prérequis technique pour suivre une formation ChatGPT BTP. Conçue pour dirigeants de TPE/PME, conducteurs de travaux et équipes support sans compétence informatique. Méthode 100 % pratique : travail sur vos vrais documents (devis, emails, comptes rendus chantier). Action de formation OFC — organisme certifié Qualiopi — entrée par <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a> ou <a href="/formations">catalogue</a>.',
  },
  {
    q: "Combien de temps pour automatiser des devis BTP avec l'IA ?",
    a: `Avec ChatGPT : génération d'un devis BTP en 2-5 minutes (vs 1-2h manuellement). ROI immédiat : 3 à 5h gagnées par semaine. Formation 4h suffit pour maîtriser les bases. $Méthode enseignée par Laure Olivié (${formatNoteSatisfactionAffichageComplet()}) — page <a href="/ia-devis-batiment">IA devis bâtiment</a>.`,
  },
  {
    q: "Quels résultats avec une formation IA pour les pros du BTP ?",
    a: `Après formation IA appliquée au bâtiment : devis structurés sans page blanche, CR chantier plus réguliers, emails et relances plus fluides. ${formatProsFormesEtNoteQualiopi()} Gains variables selon l'organisation, les outils en place et le niveau de pratique.`,
  },
  {
    q: "Formation IA appels d'offres BTP : quel programme ?",
    a: `Formation <a href="/formations/ia-appels-offre-btp">IA appels d'offres BTP</a> (session 4 h, niveau avancé) : assistants IA DCE et mémoire technique avec Claude AI Pro, Cowork & Skills. Public : responsables d'affaires, conducteurs de travaux, chargés d'études, bureaux d'études. ${FINANCEMENT_FORMULATION_COURTE} Formatrice : Laure Olivié (${formatProsFormesEtNoteQualiopi()}). Programme certifié Qualiopi.`,
  },
];

/** FAQ page catalogue `/formations` — alignée JSON-LD FAQPage (`lib/schema-formations-page-graph.ts`) */
export const FAQ_FORMATIONS: FAQItem[] = [
  {
    q: 'Le tarif est-il calculé par participant ou par entreprise ?',
    a: 'Cela dépend du format choisi. En intra-entreprise, le tarif est forfaitaire pour l\'ensemble de la session et du groupe. En interentreprises, le tarif est calculé par participant. Le devis précise systématiquement le format, l\'effectif, la durée et le montant total.',
  },
  {
    q: 'Combien coûte une formation IA pour le BTP ?',
    a: `Catalogue Qualiopi 4 h : intra ${libelleTarifIntraParSession(TARIF_INTRA_4H_HT)} · inter ${libelleTarifInterParParticipant(TARIF_INTER_4H_HT_FROM)}. Parcours déploiement 7 h : intra ${libelleTarifIntraParSession(TARIF_INTRA_7H_HT, true)} · inter ${libelleTarifInterParParticipant(TARIF_INTER_7H_HT_FROM)}. Parcours 14 h : intra ${libelleTarifIntraParSession(TARIF_INTRA_14H_HT_FROM, true)} · inter ${libelleTarifInterParParticipant(TARIF_INTER_14H_HT_FROM)}. Voir la <a href="${LINKS.formations}#tarifs-formations-btp">grille tarifaire</a>.`,
  },
  {
    q: 'La formation peut-elle être financée par Constructys ?',
    a: `${FINANCEMENT_FORMULATION_PRUDENTE} La demande doit être validée par l'OPCO avant le début de la formation. Guide : <a href="${LINKS.financement}">${FINANCEMENT_PAGE_LINK_LABEL}</a>.`,
  },
  {
    q: 'Quelles formations IA appliquées au bâtiment sont proposées au catalogue ?',
    a: `Notre catalogue de formations IA pour le BTP comprend des sessions de 4 h (devis, appels d&apos;offres, chantier, Claude, maîtrise d&apos;œuvre) et un <a href="${LINKS.parcoursApplicationsMetierBtp}">parcours applications métier BTP avec l&apos;IA</a> en 3 niveaux de 7 h. Toutes les actions sont dispensées par OFC Création d&apos;Entreprise, organisme certifié Qualiopi. ${MODALITE_FORMATIONS_PRESENTIEL} ${FINANCEMENT_FORMULATION_COURTE} Fiches détaillées : cartes ci-dessus.`,
  },
  {
    q: 'Comment choisir la bonne formation IA pour le BTP pour mon entreprise ?',
    a: `Le choix dépend de votre fonction et de votre niveau. L&apos;équipe débute ou couvre à la fois chantier bâtiment et travaux publics : <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">L&apos;IA au service des pros du bâtiment et des travaux publics</a>. Pour la réponse aux marchés, mémoires techniques et DCE : <a href="${LINKS.formationAO}">L&apos;IA appliquée aux appels d&apos;offres BTP</a>. Pour piloter vos chantiers (CCTP, CR, PPSPS, réception) : <a href="${LINKS.formationConduiteTravauxSuiviChantier}">L&apos;IA appliquée à la conduite de travaux</a>. Pour industrialiser Claude (Projets, Skills, Cowork, connecteurs, Claude Code) et installer des skills métier sur les appels d&apos;offres, le chantier ou le juridique : <a href="${LINKS.formationMaitriserClaudeAiBtp}">Maîtriser Claude AI pour le BTP — Chat, Cowork &amp; Code</a>. Pour la maîtrise d&apos;œuvre d&apos;exécution (DCE, CR, OS, réserves) : <a href="${LINKS.formationIaMaitriseOeuvre}">L&apos;IA au service des maîtres d&apos;œuvre</a>. Pour transformer vos processus en applications métier : <a href="${LINKS.parcoursApplicationsMetierBtp}">parcours applications métier BTP avec l&apos;IA</a>. Un diagnostic gratuit de 30 minutes en visio permet de cibler le parcours — <a href="${LINKS.prendreRdv}">Réservez votre visio découverte gratuite</a> ou <a href="${LINKS.contact}">contact</a>.`,
  },
  {
    q: 'Qu\'apporte la formation Maîtriser Claude AI pour le BTP (niveau 2) ?',
    a: `Cette formation cible les profils qui maîtrisent déjà Claude Pro : structurer l&apos;usage en entreprise (Projets, bibliothèque de Skills), installer des skills métier (appels d&apos;offres RC/DCE, chantier CCTP/CR/réserves, juridique marché de travaux — l&apos;IA n&apos;est pas un avocat), déléguer la production documentaire via Cowork, connecter Gmail/Drive/agenda en sécurisant les données, et automatiser avec Claude Code. Session de 4 h le matin (9h00–13h00), 8 participants max, ${libelleTarifsDualCourt(4)}. Fiche : <a href="${LINKS.formationMaitriserClaudeAiBtp}">Maîtriser Claude AI pour le BTP — Chat, Cowork &amp; Code</a>.`,
  },
  {
    q: 'Combien coûte une formation IA pour les pros du BTP du catalogue ?',
    a: `Intra-entreprise (4 h) : ${libelleTarifIntraParSession(TARIF_INTRA_4H_HT)}. Interentreprises (4 h) : ${libelleTarifInterParParticipant(TARIF_INTER_4H_HT_FROM)}. ${MENTIONS_TVA_REGIMES_COURT} ${FINANCEMENT_FORMULATION_PRUDENTE}`,
  },
  {
    q: 'Les formations IA pour les pros du BTP peuvent-elles être financées par Constructys ou mon OPCO ?',
    a: `${FINANCEMENT_FAQ_PARTIELLE_CORPS} Selon éligibilité. Le détail des barèmes et exemples (niveau 1 / niveau 2) est sur la page <a href="${LINKS.financement}">${FINANCEMENT_PAGE_LINK_LABEL}</a>.`,
  },
  {
    q: 'Faut-il un abonnement payant pour suivre la formation ?',
    a: `${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} L&apos;abonnement Claude AI Pro (niveaux 2) est à souscrire par l&apos;entreprise avant la session — non inclus dans le forfait catalogue.`,
  },
  {
    q: 'Les formations IA pour les pros du BTP sont-elles certifiées Qualiopi ?',
    a: `Oui. OFC Création d&apos;Entreprise est certifié Qualiopi (action de formation), certification valable jusqu&apos;en janvier 2028. Numéro de déclaration d&apos;activité : 11788515078. ${FINANCEMENT_FORMULATION_PRUDENTE} <a href="${LINKS.aPropos}">À propos de l&apos;organisme</a>.`,
  },
  {
    q: 'Les formations sont-elles disponibles en intra-entreprise ?',
    a: `${MODALITE_FORMATIONS_STANDARD} Format : 4 heures, ${EFFECTIF_GROUPE_MAX} participants maximum, supports inclus. Vue d&apos;ensemble : <a href="${LINKS.formationIleDeFrance}">formation IA pour le BTP en Île-de-France</a>.`,
  }, ...FAQ_IA_BTP_METIERS_CHANTIER_SEO,
];

/** FAQ catalogue `/formations` — masque NIV-03 tant que non publiée. */
export function getFaqFormations(at: Date = new Date()): FAQItem[] {
  if (isFormationCataloguePublished('NIV-03', at)) {
    return FAQ_FORMATIONS;
  }

  const count = getCatalogueFormationsCount(at);

  return FAQ_FORMATIONS.map((item) => {
    if (item.q === 'Quelles formations IA appliquées au bâtiment sont proposées au catalogue ?') {
      return {
        ...item,
        a: `Notre catalogue de formations IA pour le BTP comprend des sessions de 4 h (devis, appels d&apos;offres, Claude, maîtrise d&apos;œuvre${count > 4 ? ', conduite de travaux' : ''}) et un <a href="${LINKS.parcoursApplicationsMetierBtp}">parcours applications métier BTP avec l&apos;IA</a> en 3 niveaux de 7 h. Toutes les actions sont dispensées par OFC Création d&apos;Entreprise, organisme certifié Qualiopi. ${MODALITE_FORMATIONS_PRESENTIEL} ${FINANCEMENT_FORMULATION_COURTE} Fiches détaillées : cartes ci-dessus.`,
      };
    }
    if (item.q === 'Comment choisir la bonne formation IA pour le BTP pour mon entreprise ?') {
      const conduiteLink = ` Pour piloter vos chantiers (CCTP, CR, PPSPS, réception) : <a href="${LINKS.formationConduiteTravauxSuiviChantier}">L&apos;IA appliquée à la conduite de travaux</a>.`;
      return {
        ...item,
        a: item.a.replace(conduiteLink, ''),
      };
    }
    return item;
  });
}

export const FAQ_TARIFS: FAQItem[] = [
  {
    q: "Faut-il un abonnement Claude pour les formations niveau avancé ?",
    a: `${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Détails sur les <a href="/formations">formations IA pour le BTP</a> et le <a href="/financement-constructys-formation-ia-btp">financement Constructys</a>.`,
  },
  {
    q: "Quels comptes IA pour les formations niveau débutant ?",
    a: `${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} Voir le <a href="/formations">catalogue</a> et la <a href="/checklist-ia-btp">checklist prompts ChatGPT BTP</a>.`,
  },
  {
    q: 'Combien coûte une formation IA pour les pros du BTP ?',
    a: `Une formation intra-entreprise de 4 heures coûte ${libelleTarifIntraParSession(TARIF_INTRA_4H_HT)}. Une session interentreprises de 4 heures est proposée ${libelleTarifInterParParticipant(TARIF_INTER_4H_HT_FROM)}. ${MENTIONS_TVA_REGIMES_COURT} ${FINANCEMENT_FORMULATION_PRUDENTE} — <a href="/financement-constructys-formation-ia-btp">guide financement</a> et <a href="/contact">accompagnement dossier</a>.`,
  },
  {
    q: "Comment financer ma formation IA ?",
    a: 'Via l\'OPCO Constructys pour les entreprises du BTP, selon éligibilité. 100 % de prise en charge possible selon dossier (plafond pédagogique indicatif : 24 € HT/heure/stagiaire, soit 96 € HT pour 4 h). Les entreprises de moins de 11 salariés peuvent également bénéficier d\'une prise en charge partielle des salaires (15 € HT/heure). Page dédiée : <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour le BTP</a>.',
  },
  {
    q: "Faut-il avancer des frais ?",
    a: 'Selon les modalités de votre dossier et de la convention signée, la prise en charge peut être mobilisée sans avance de trésorerie dans certains cas — je vous accompagne pour monter le dossier et respecter les délais (15 jours avant le début de la formation) — <a href="/contact">me contacter</a>.',
  },
];

export const FAQ_OFFRES: FAQItem[] = [
  {
    q: "Quels formats de formation proposez-vous ?",
    a: `Sessions de 4 heures. ${MODALITE_FORMATIONS_PRESENTIEL} ${libelleTarifsDualCourt(4)}, jusqu'à ${EFFECTIF_GROUPE_MAX} participants en intra. Parcours sur la page <a href="/formations">formations IA appliquées au bâtiment</a>.`,
  },
  {
    q: "Comment accéder à l'espace apprenant ?",
    a: "Après inscription ou achat d'une formation, vous recevez un accès à l'espace apprenant. Vous y retrouvez vos cours, votre progression, les quiz et les certificats. Accès 24/7.",
  },
  {
    q: "Les formations sont-elles adaptées aux dirigeants et équipes du BTP ?",
    a: `Oui. Mes formations sont conçues pour des professionnels du BTP sans prérequis technique. On travaille sur vos vrais documents : devis, emails, comptes rendus. Méthode 100 % pratique — voir <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a> et <a href="${LINKS.formationConducteurTravaux}">IA conducteur de travaux</a>.`,
  },
];

export const FAQ_FINANCEMENT: FAQItem[] = [
  {
    q: "Quel délai pour soumettre mon dossier Constructys ?",
    a: 'Le dossier doit parvenir complet à Constructys 15 jours calendaires avant le début de la formation. Les dossiers envoyés après la date limite ne seront pas financés. Utilisation obligatoire de la plateforme eGestion. Cadre détaillé sur <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour les pros du BTP</a>.',
  },
  {
    q: "Quel plafond pour les coûts pédagogiques ?",
    a: 'Plafond standard : 24€ HT/heure/stagiaire. Limite de 840€ HT/jour/groupe pour les sessions intra-entreprise. Pour les entreprises de moins de 11 salariés : 15€ HT/heure pour la prise en charge des salaires — voir aussi <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA appliquée au bâtiment</a>.',
  },
  {
    q: "Quels documents fournir pour le financement ?",
    a: 'Programme de formation détaillé, devis du prestataire, convention de formation, liste des participants, attestation FFB (si adhérent), justificatifs d\'effectif. Je vous accompagne pour monter le dossier : <a href="/contact">contact</a> ou <a href="${LINKS.prendreRdv}">Réservez votre visio découverte gratuite</a>.',
  },
];

/** FAQ page financement Constructys formation IA appliquée au bâtiment — schema.org FAQPage */
export const FAQ_FINANCEMENT_IA_BTP: FAQItem[] = [
  {
    q: "Ma formation IA peut-elle être financée par Constructys ?",
    a: `${FINANCEMENT_FORMULATION_PRUDENTE} Voir le <a href="/formations">catalogue formations IA pour le BTP</a>.`,
  },
  {
    q: "Quel est le montant maximum remboursé ?",
    a: 'Le plafond pédagogique dépend de l\'effectif depuis le 1er juin 2026 : 24 € HT/heure/stagiaire pour les entreprises de moins de 11 salariés (limite 840 € HT/jour/groupe en intra) et 19 € HT/heure/stagiaire de 11 à moins de 50 salariés (limite 665 € HT/jour/groupe). Le reste à charge dépend de la taille de l\'entreprise et des barèmes salaires en vigueur — synthèse sur <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour le BTP</a>.',
  },
  {
    q: "Le plafond Constructys a-t-il changé en 2026 ?",
    a: 'Oui. Pour toutes les demandes de financement reçues à partir du 1er juin 2026, Constructys abaisse le plafond pédagogique horaire de 24 € à 19 € HT/heure/stagiaire pour les entreprises du Bâtiment de 11 à moins de 300 salariés. Les entreprises de moins de 11 salariés conservent 24 € HT/heure. Le dépôt eGestion reste exigé au moins 15 jours avant le début — détails sur <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour le BTP</a>.',
  },
  {
    q: "Combien de temps avant la formation faut-il déposer le dossier ?",
    a: 'Le dossier complet doit parvenir à Constructys au moins 15 jours calendaires avant le premier jour de formation, via la plateforme eGestion. La formation ne doit pas avoir commencé avant la réception de la demande. Besoin d\'aide : <a href="/contact">contact</a>.',
  },
  {
    q: "Mon entreprise de moins de 11 salariés a-t-elle droit au financement ?",
    a: "Oui, les très petites entreprises sont éligibles. La participation aux frais de salaires suit un barème spécifique (par exemple 15 € HT par heure et par stagiaire hors cas particuliers). Les plafonds pédagogiques restent alignés sur les règles Constructys 2026.",
  },
  {
    q: "Constructys finance-t-il les formations en présentiel ?",
    a: `Oui. Les formations catalogue OFC se déroulent exclusivement en présentiel intra-entreprise, dans vos locaux en Île-de-France. ${FINANCEMENT_FORMULATION_PRUDENTE} Je vous fournis le programme détaillé et le devis nécessaires à votre demande de prise en charge — page <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour les pros du BTP</a>.`,
  },
  {
    q: "Que se passe-t-il si ma demande est déposée en retard ?",
    a: 'Depuis le 1er janvier 2026, les demandes incomplètes ou reçues après la date limite ne sont plus financées. Il n\'y a pas d\'exception : anticipez votre demande : demandez le devis et le programme suffisamment tôt pour déposer avant J-15 — <a href="/contact">m\'écrire</a>.',
  },
  {
    q: "Comment savoir si mon OPCO est Constructys ?",
    a: 'Constructys est l\'OPCO du BTP : entreprises du bâtiment, des travaux publics et activités assimilées, négoce de matériaux. Si votre activité principale est dans ce périmètre, c\'est bien Constructys qui gère votre contribution et vos demandes de financement — voir aussi <a href="/formation-ia-travaux-publics">formation IA travaux publics</a>.',
  },
  {
    q: "Comment retrouver mon OPCO de rattachement si je ne suis pas sûr ?",
    a: 'Faites un contrôle en 2 temps : (1) récupérez votre SIRET complet (14 chiffres), code APE et convention collective via l\'annuaire officiel <a href="https://annuaire-entreprises.data.gouv.fr/" rel="noopener nofollow" target="_blank">annuaire-entreprises.data.gouv.fr</a> ; (2) comparez ensuite avec la liste officielle des 11 OPCO du Ministère du Travail <a href="https://travail-emploi.gouv.fr/formation-professionnelle/acteurs-cadre-et-qualite-de-la-formation-professionnelle/liste-des-opco" rel="noopener nofollow" target="_blank">liste des OPCO</a>. Si votre activité est BTP, votre OPCO est généralement Constructys.',
  },
];

export const FAQ_A_PROPOS: FAQItem[] = [
  {
    q: "Où intervenez-vous pour les formations IA pour les pros du BTP ?",
    a: `Basée à Guyancourt (78), j'interviens en <a href="/formation-ia-btp-ile-de-france">Île-de-France</a> — ${IDF_ZONE_INTERVENTION}. ${MODALITE_FORMATIONS_STANDARD}`,
  },
  {
    q: "Quelle est votre expérience dans le BTP ?",
    a: 'Formatrice IA spécialisée BTP depuis 2022, avec 10 ans de terrain BTP (conductrice de travaux) auprès de TPE, PME et équipes du bâtiment et des travaux publics. Méthode 100 % opérationnelle — <a href="/a-propos#clients-partenaires">clients et partenaires</a>, <a href="/blog">articles et ressources</a>.',
  },
];

export const FAQ_PRENDRE_RDV: FAQItem[] = [
  {
    q: "Le rendez-vous est-il gratuit ?",
    a: 'Oui. L\'échange de 30 minutes est gratuit. J\'échange avec vous sur votre projet, j\'identifie vos besoins et vous envoie un devis personnalisé sous 24h — voir aussi la page <a href="/contact">contact</a> et le <a href="/formations">catalogue formations</a>.',
  },
  {
    q: "Comment se déroule le RDV ?",
    a: `Vous réservez un créneau via <a href="${LINKS.prendreRdv}">Réservez votre visio découverte gratuite</a>. L'échange se fait en visioconférence ou par téléphone selon ce que vous choisissez. À l'issue, vous recevez un devis détaillé avec les possibilités de financement OPCO — <a href="/financement-constructys-formation-ia-btp">guide Constructys</a>.`,
  },
  {
    q: 'La formation se déroule-t-elle en visio ?',
    a: 'Non pour la session catalogue : présentiel uniquement · Île-de-France uniquement (intra-entreprise, dans vos locaux). Le RDV de cadrage préalable se fait en visio ou par téléphone.',
  },
  {
    q: "Que faire si aucun créneau ne me convient ?",
    a: `Écrivez à Laure depuis la page <a href="/contact">contact</a> ou <a href="/">accueil</a> (e-mail et téléphone) ou réservez un créneau <a href="${LINKS.prendreRdv}">Réservez votre visio découverte gratuite</a>. Je vous recontacte rapidement si besoin.`,
  },
];

/** FAQ Formation IA pour le BTP Paris / Île-de-France */
/** FAQ — page Formation IA pour les pros du BTP Yvelines (78) */
export const FAQ_IA_BTP_YVELINES: FAQItem[] = [
  {
    q: 'La formation se déroule-t-elle en présentiel à Versailles ou dans les Yvelines ?',
    a: 'Oui. Sessions exclusivement en présentiel, en intra dans vos locaux ou sur chantier dans les Yvelines (78). Le siège OFC est à Guyancourt : pas de frais de déplacement supplémentaires pour les entreprises du 78. Voir <a href="/formation-ia-btp-ile-de-france">formation IA appliquée au bâtiment Île-de-France</a> et le <a href="/formations">catalogue</a>.',
  },
  {
    q: "Faut-il des compétences informatiques pour suivre cette formation ?",
    a: 'Non. La formation s\'adresse à des professionnels du BTP : savoir naviguer sur internet et utiliser un ordinateur ou une tablette suffit. Le reste est expliqué pas à pas sur vos documents réels.',
  },
  {
    q: "Combien de temps dure la formation ?",
    a: 'Le format le plus courant est une session de 4 heures, adaptée au rythme des entreprises du BTP et aux règles de financement Constructys. Des formats de sensibilisation (2 h) ou d\'approfondissement peuvent être étudiés selon votre projet — <a href="${LINKS.prendreRdv}">Réservez votre visio découverte gratuite</a>.',
  },
  {
    q: "La formation IA appliquée au bâtiment est-elle financement possible selon éligibilité (Constructys) dans les Yvelines ?",
    a: 'Oui. Les règles sont les mêmes pour les entreprises du BTP en Île-de-France : financement possible dans le cadre du plan de développement des compétences, selon votre éligibilité et les barèmes en vigueur. Détails sur <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour le BTP</a>.',
  },
  {
    q: "Quelle différence avec une formation généraliste sur ChatGPT ?",
    a: 'La formation est calibrée pour le BTP : vocabulaire du bâtiment (CCTP, DTU, mémoire technique, comptes rendus de chantier), exercices sur vos vrais documents, méthodes éprouvées avec des entreprises du secteur. Voir aussi <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a>.',
  },
  {
    q: "Puis-je former plusieurs personnes en même temps ?",
    a: 'Oui. Le format intra-entreprise convient à des groupes de plusieurs personnes ; au-delà d\'une dizaine, il est souvent préférable de diviser en deux groupes pour garder du temps d\'exercice. Le financement Constructys s\'applique par stagiaire, dans les limites des plafonds en vigueur.',
  },
];

/** FAQ — page Formation IA pour le BTP Saint-Quentin-en-Yvelines (SQY, 78) */
export const FAQ_IA_BTP_SAINT_QUENTIN_YVELINES: FAQItem[] = [
  {
    q: 'Intervenez-vous dans toute la communauté d’agglomération de Saint-Quentin-en-Yvelines ?',
    a: 'Oui. Sessions exclusivement en présentiel, en intra dans vos locaux ou sur chantier (Guyancourt, Montigny-le-Bretonneux, Trappes, Élancourt, Maurepas, La Verrière, Coignières, Magny-les-Hameaux, etc.). Le siège OFC est à Guyancourt : pas de frais de déplacement supplémentaires pour les entreprises du 78. Voir <a href="/formation-ia-btp-yvelines-78">formation IA pour les pros du BTP Yvelines (78)</a> et le <a href="/formations">catalogue formations</a>.',
  },
  {
    q: "Faut-il des compétences informatiques pour suivre cette formation ?",
    a: 'Non. La formation s\'adresse à des professionnels du BTP : savoir naviguer sur internet et utiliser un ordinateur ou une tablette suffit. Le reste est expliqué pas à pas sur vos documents réels.',
  },
  {
    q: "Combien de temps dure la formation ?",
    a: 'Le format le plus courant est une session de 4 heures, adaptée au rythme des entreprises du BTP et aux règles de financement Constructys. Des formats de sensibilisation (2 h) ou d\'approfondissement peuvent être étudiés selon votre projet — <a href="${LINKS.prendreRdv}">Réservez votre visio découverte gratuite</a>.',
  },
  {
    q: "La formation IA pour les pros du BTP est-elle financement possible selon éligibilité (Constructys) dans les Yvelines ?",
    a: 'Oui. Les règles sont les mêmes pour les entreprises du BTP en Île-de-France : financement possible dans le cadre du plan de développement des compétences, selon votre éligibilité et les barèmes en vigueur. Détails sur <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA appliquée au bâtiment</a>.',
  },
  {
    q: "Quelle différence avec une formation généraliste sur ChatGPT ?",
    a: 'La formation est calibrée pour le BTP : vocabulaire du bâtiment (CCTP, DTU, mémoire technique, comptes rendus de chantier), exercices sur vos vrais documents, méthodes éprouvées avec des entreprises du secteur. Voir aussi <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a>.',
  },
  {
    q: "Puis-je former plusieurs personnes en même temps ?",
    a: 'Oui. Le format intra-entreprise convient à des groupes de plusieurs personnes ; au-delà d\'une dizaine, il est souvent préférable de diviser en deux groupes pour garder du temps d\'exercice. Le financement Constructys s\'applique par stagiaire, dans les limites des plafonds en vigueur.',
  },
];

/** FAQ — page piliers /formation-ia-btp-yvelines (questions ciblées SEO local 78) */
export const FAQ_FORMATION_IA_BTP_YVELINES_LANDING: FAQItem[] = [
  {
    q: 'Vous intervenez à domicile dans le 78 ?',
    a:
      "Oui. Les sessions se déroulent exclusivement en présentiel, en intra dans vos locaux ou sur votre chantier dans tout le département des Yvelines (78). Je suis basée à Guyancourt (Saint-Quentin-en-Yvelines) : pour les entreprises du 78, il n'y a pas de frais de déplacement supplémentaires. Voir <a href=\"/formation-ia-btp-yvelines\">formation IA pour le BTP Yvelines (78)</a> et le <a href=\"/formations\">catalogue formations</a>.",
  },
  {
    q: 'La formation est-elle disponible le samedi ?',
    a:
      `Les créneaux les plus courants sont en semaine (journée ou demi-journée), pour s'aligner sur les habitudes des équipes terrain et du bureau d'études. Un samedi peut être étudié au cas par cas pour une session intra (contraintes d'atelier, planning chargé), sous réserve de disponibilité — le plus simple est d'en parler lors d'un <a href="${LINKS.prendreRdv}">Réservez votre visio découverte gratuite</a> ou via <a href="/contact">contact</a>.`,
  },
  {
    q: 'Comment se déroule une session intra-entreprise à Versailles ?',
    a:
      'Les sessions ont lieu en intra-entreprise, dans vos locaux en Île-de-France (Yvelines, Paris, etc.). Format : 4 h sur vos documents réels — devis, CCTP, courriers. ' +
      MODALITE_FORMATIONS_STANDARD +
      ' Consultez <a href="/formation-ia-btp-ile-de-france">formation IA pour les pros du BTP Île-de-France</a> et le <a href="/formations">catalogue</a>.',
  },
];

export const FAQ_IA_BTP_PARIS: FAQItem[] = [
  {
    q: "Où se déroule la formation IA appliquée au bâtiment à Paris ?",
    a: `La formation se déroule exclusivement en présentiel intra-entreprise, dans vos locaux — ${IDF_ZONE_INTERVENTION}. ${MODALITE_FORMATIONS_STANDARD} Voir <a href="/formation-ia-btp-ile-de-france">formation IA appliquée au bâtiment Île-de-France</a> et le <a href="/formations">catalogue</a>.`,
  },
  {
    q: "La formation IA Paris est-elle finançable ?",
    a: 'Financement partiel possible via Constructys ou votre OPCO selon statut, branche et conditions en vigueur. Plafond pédagogique indicatif : 24 € HT/heure/stagiaire — détails sur <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour le BTP</a>.',
  },
  {
    q: "Quel est le format de la formation IA pour le BTP Paris ?",
    a: `Session de 4 h pratiques : ChatGPT pour devis, emails, relances clients. Travail sur vos vrais documents. Aucun prérequis technique pour le niveau débutant. ${libelleTarifsDualCourt(4)} — parcours <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">formation niveau 1 — Bâtiment & travaux publics</a>.`,
  },
];

/** FAQ Formation Maîtriser Claude AI — NIV-04 */
export const FAQ_MAITRISER_CLAUDE_NIV04: FAQItem[] = [
  {
    q: 'On utilise déjà Claude au bureau : cette formation m\'apporte quoi de plus ?',
    a: `Il structure l'usage en entreprise : Projets partagés, bibliothèque de skills, Cowork supervisé, connecteurs messagerie/drive/agenda et premières automatisations Claude Code. En 4 h le matin, vous repartez avec des workflows réutilisables — pas seulement des prompts isolés. Public : référents IA, dirigeants, responsables digitaux, chargés d'affaires et conducteurs de travaux déjà à l'aise avec Claude Pro. Voir le <a href="${LINKS.claudeAiBtp}">guide Claude AI BTP</a>.`,
  },
  {
    q: 'Pourquoi la formation Maîtriser Claude est-elle le matin uniquement ?',
    a: `La session dure 4 h (9h00–13h00) pour enchaîner accueil, 4 modules techniques et clôture sans couper la concentration. Format présentiel en Île-de-France, intra-entreprise, dans vos locaux — formation catalogue niveau avancé.`,
  },
  {
    q: 'Cowork et Claude Code : est-ce que l\'IA envoie des mails ou des docs sans mon accord ?',
    a: `Non : Cowork et Claude Code fonctionnent en mode supervisé — vous validez chaque livrable avant envoi client ou marché. La session intègre une checklist RGPD, marchés publics et données clients. Les connecteurs (messagerie, drive, agenda) sont paramétrés avec ces garde-fous.`,
  },
  {
    q: 'Quelle différence entre Maîtriser Claude AI et la formation appels d\'offres ?',
    a: `La <a href="${LINKS.formationAO}">formation appels d'offres</a> cible DCE et mémoires techniques. Maîtriser Claude AI industrialise Claude dans toute l'entreprise : gouvernance, connecteurs outils, production documentaire et automatisation — complément naturel après la formation appels d'offres ou la <a href="${LINKS.formationConduiteTravauxSuiviChantier}">formation conduite de travaux</a>.`,
  },
  {
    q: 'Combien coûte Maîtriser Claude AI en 2026 et est-ce finançable OPCO ?',
    a: `${libelleTarifsDualCourt(4)} (8 participants max en intra). ${FINANCEMENT_FORMULATION_PRUDENTE} Organisme certifié Qualiopi. L'abonnement Claude Pro n'est pas inclus. Détails : <a href="${LINKS.financement}">financement Constructys formation IA BTP</a>.`,
  },
  {
    q: 'Faut-il activer l\'option « Exécution de code » sur Claude Pro ?',
    a: `Oui, c'est un prérequis pour tester les skills avancés et Claude Code en session. Il faut aussi un abonnement Claude Pro actif et une utilisation régulière de Claude avant cette formation — sinon, commencer par la <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">formation niveau 1</a> ou le <a href="${LINKS.claudeAiBtp}">guide Claude AI BTP</a>.`,
  },
  {
    q: 'Quels skills Claude sont abordés pendant la formation ?',
    a: `Selon vos besoins et dossiers réels : la session installe une bibliothèque de skills BTP réutilisables (Projet chantier, dossier d'AO, suivi de travaux, automatisation administrative). Chaque skill est créé, testé et partagé sur les postes pendant la <a href="${LINKS.formationMaitriserClaudeAiBtp}">formation Maîtriser Claude AI pour le BTP — Chat, Cowork & Code</a>.`,
  },
];

/** FAQ Formation IA conduite de travaux — NIV-03 */
export const FAQ_CONDUITE_TRAVAUX_NIV03: FAQItem[] = [
  {
    q: 'Je suis conducteur de travaux : quels documents puis-je vraiment accélérer avec l\'IA ?',
    a: `Les CR de réunion, synthèses CCTP/DPGF, brouillons PPSPS, courriers sous-traitants (DC4), PV de réserves et trames DOE — avec relecture humaine avant diffusion. Cette session (${SESSION_DUREE_LIBELLE}) travaille ces livrables sur vos documents anonymisés. Complément : page <a href="${LINKS.formationConducteurTravaux}">formation IA conducteur de travaux</a>.`,
  },
  {
    q: 'Les skills Claude remplacent-ils mon logiciel de gestion de chantier ?',
    a: `Non : ils accélèrent la rédaction et la structuration, pas le suivi financier ni le planning temps réel. L'IA prépare des brouillons et des check-lists ; vous gardez la validation métier, QSE et juridique. Objectif : libérer du temps sur l'écrit, pas changer d'ERP.`,
  },
  {
    q: 'Faut-il avoir fait le niveau 1 avant la formation conduite de travaux ?',
    a: `Oui, c'est le parcours recommandé : avoir suivi la <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">formation niveau 1</a> ou pratiquer déjà une IA générative. Un compte Claude Pro est recommandé. Sans ces bases, les skills chantier sont difficiles à paramétrer correctement.`,
  },
  {
    q: 'Un PPSPS généré par l\'IA est-il directement utilisable sur chantier ?',
    a: `Non sans relecture QSE : l'IA propose une structure et des formulations, jamais la conformité réglementaire à votre place. En session, on cadre la méthode et les points de contrôle obligatoires avant signature du responsable sécurité.`,
  },
  {
    q: 'Combien coûte la formation conduite de travaux IA en 2026 ?',
    a: `${libelleTarifsDualCourt(4)} (${SESSION_DUREE_LIBELLE}, 8 participants max en intra). ${FINANCEMENT_FORMULATION_PRUDENTE} <a href="${LINKS.financement}">Guide financement</a>. Un rendez-vous visio J+30 est inclus pour ancrer les skills.`,
  },
  {
    q: 'Que contient la bibliothèque de 20+ skills Claude BTP ?',
    a: `Des assistants préconfigurés pour analyse CCTP/DPGF, sécurité chantier (PPSPS, DUERP, SOGED), CR, approvisionnements, sous-traitants (DC4), métré, situations, réception, DOE et assistant juridique — personnalisables en atelier. Vous repartez avec les skills activés et classés par phase de chantier.`,
  },
];

/** FAQ Formation IA Appels d'offres BTP — NIV-02 */
export const FAQ_APPELS_OFFRE: FAQItem[] = [
  {
    q: "L'IA peut-elle rédiger mon mémoire technique sur un marché public ?",
    a: `Elle structure et rédige à partir de vos références réelles — pas à votre place sur le fond technique. Dans cette formation, vous créez des skills Cowork pour analyser le DCE et produire un MT aligné sur les critères pondérés, avec relecture experte obligatoire. L'IA ne peut pas inventer vos chantiers ni vos effectifs.`,
  },
  {
    q: 'Faut-il payer Claude Pro pour suivre la formation appels d\'offres ?',
    a: `Oui. ${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Cowork doit être installé sur le poste — comptes gratuits insuffisants pour cette session. Prévoir aussi un DCE complet récent et 2 à 3 mémoires techniques de votre entreprise.`,
  },
  {
    q: 'Combien de temps pour analyser un DCE avec Cowork après la formation ?',
    a: `Les participants visent une fiche synthèse (15 infos critiques, verdict Go/No Go) en une fraction du temps d'une lecture manuelle complète — le gain dépend du volume de pièces. En session, le module 2 (1 h 15) est entièrement dédié à cette méthode sur votre AO réel.`,
  },
  {
    q: 'Une TPE qui répond seule aux AO est-elle au bon niveau ?',
    a: `Oui si vous répondez déjà à des marchés et maîtrisez les bases de l'IA (ou la <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">formation niveau 1</a>). La session est calibrée 8 à 12 participants, 75 % pratique sur vos dossiers — pas de théorie inutile.`,
  },
  {
    q: 'La formation appels d\'offres est-elle finançable Constructys en 2026 ?',
    a: `Oui, selon éligibilité : organisme Qualiopi, session ${SESSION_DUREE_LIBELLE}, ${libelleTarifsDualCourt(4)}. ${FINANCEMENT_FORMULATION_PRUDENTE} Dépôt dossier eGestion au moins 15 jours avant — <a href="${LINKS.financement}">financement Constructys formation IA BTP</a>.`,
  },
  {
    q: 'Quels livrables je repars avec après les 4 heures ?',
    a: `Compte Claude Pro configuré, Project AO, Cowork avec 8 assistants IA opérationnels (analyse DCE, CCTP, contrôle DPGF, chiffrage, devis, mémoire technique, contrôle avant dépôt), trames DCE/chiffrage/MT, bibliothèque de prompts AO BTP et supports plateforme selon convention. Kit complémentaire : <a href="/checklist-ia-btp">checklist prompts IA BTP</a>.`,
  },
  {
    q: 'La formation couvre-t-elle le chiffrage et les devis, ou seulement le mémoire technique ?',
    a: `Les deux. Analyse DCE complète (RC, CCTP, CCAP, DPGF, BPU), comparaison CCTP/DPGF, checklist de chiffrage, comparaison avec un ancien devis, désignations d'ouvrages et structuration de devis — puis mémoire technique et contrôle final. L'IA assiste l'analyse et facilite le contrôle ; le chiffrage final reste à valider par votre équipe.`,
  },
];

/** FAQ landing SEO — formation IA appels d'offres BTP (page dédiée maillage) */
export const FAQ_FORMATION_IA_APPELS_OFFRES_LANDING: FAQItem[] = [
  {
    q: "L'IA peut-elle rédiger un mémoire technique de A à Z sans intervention humaine ?",
    a:
      "Non, et ce n'est pas l'objectif. L'IA structure et rédige à partir du contenu que vous lui fournissez — vos références réelles, vos effectifs, vos moyens. Elle ne peut pas inventer vos chantiers ni connaître vos spécificités d'entreprise. En revanche, elle réduit considérablement le temps de mise en forme et de structuration. Le résultat est votre mémoire, pas celui de l'IA. Voir aussi la <a href=\"/formations/ia-appels-offre-btp\">fiche formation BTP-02</a>.",
  },
  {
    q: "Les maîtres d'ouvrage peuvent-ils détecter qu'un mémoire a été rédigé avec l'IA ?",
    a:
      "Un mémoire bien travaillé avec l'IA, alimenté de données réelles et relu par un professionnel, ne se distingue pas d'un mémoire rédigé manuellement. Le risque est inverse : un mémoire générique copié-collé d'un précédent AO sans personnalisation se détecte facilement. L'IA, utilisée correctement, améliore la personnalisation — elle ne la remplace pas.",
  },
  {
    q: "Comment gérer la confidentialité des données DCE dans ChatGPT ?",
    a:
      "Pour les marchés sensibles : (1) désactiver l'utilisation des données dans les paramètres ChatGPT, ou (2) utiliser ChatGPT Team ou Enterprise qui garantissent contractuellement la non-utilisation des données pour l'entraînement. Claude Pro (Anthropic) offre également des garanties similaires. Ces points sont traités en <a href=\"/formations/ia-appels-offre-btp\">formation BTP-02</a>.",
  },
  {
    q: "Peut-on utiliser l'IA pour les marchés publics comme pour les marchés privés ?",
    a:
      "Oui. La méthode est identique. Pour les marchés publics, l'analyse du Règlement de Consultation (RC) est particulièrement utile : l'IA extrait les critères de sélection et leurs pondérations, ce qui permet d'orienter précisément la rédaction du mémoire sur les points les mieux notés. Ressource : <a href=\"/blog/analyse-dce-notebooklm-claude-btp\">analyse DCE avec l'IA (NotebookLM & Claude)</a>.",
  },
  {
    q: "Faut-il avoir un compte ChatGPT payant pour suivre la formation ?",
    a:
      `${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Sur la formation appels d'offres, comptes gratuits insuffisants pour configurer Cowork et créer les skills DCE/mémoire technique ; voir la <a href="/formations/ia-appels-offre-btp">fiche formation appels d&apos;offres</a>. Pour une découverte générale de l&apos;IA hors ce parcours, des offres gratuites peuvent suffire — pas pour industrialiser la réponse aux AO.`,
  },
  {
    q: "La formation est-elle adaptée aux TPE (moins de 10 salariés) ?",
    a:
      "Oui. Les exemples et cas pratiques sont calibrés pour des PME de 5 à 50 salariés. Les participants de très petites entreprises apportent souvent leurs propres DCE en cours pour travailler directement sur leur situation réelle. Principe : 100 % pratique, zéro théorie inutile.",
  },
  {
    q: "Combien de temps après la formation peut-on appliquer la méthode ?",
    a:
      "Dès le lendemain. Les participants repartent avec leurs prompts personnalisés et leur bibliothèque structurée. Les entreprises formées avec la FFB Grand Paris ont généralement appliqué la méthode sur leur AO suivant dans la semaine.",
  },
  {
    q: "La formation couvre-t-elle uniquement les mémoires techniques ou aussi le chiffrage ?",
    a:
      "Les deux. Analyse DCE avec IA (RC, CCTP, CCAP, DPGF, BPU), comparaison CCTP/DPGF, checklist de chiffrage assisté, comparaison avec un ancien devis, désignations d'ouvrages, structuration de devis, mémoire technique aligné critères RC et 8 assistants IA réutilisables. L'IA ne garantit pas l'exhaustivité du chiffrage — validation métier obligatoire. Programme : <a href=\"/formations/ia-appels-offre-btp\">L'IA appliquée aux appels d'offres BTP</a>.",
  },
];

/** FAQ — formation NIV-01 (bâtiment & TP) — page pilier catalogue */
export const FAQ_BATIMENT: FAQItem[] = [
  {
    q: 'Je suis artisan du bâtiment sans compétence informatique : cette formation est-elle faisable ?',
    a: `Oui : la formation niveau 1 part de zéro prérequis technique et se déroule en ${SESSION_DUREE_LIBELLE} de présentiel. Vous travaillez sur vos devis, emails et comptes rendus réels avec des trames guidées — pas besoin de savoir « coder ». Seuls prérequis : ordinateur, smartphone, connexion internet et bonne maîtrise du français. Aucun abonnement IA payant requis : les versions gratuites suffisent.`,
  },
  {
    q: 'Combien coûte la formation IA niveau 1 et est-ce finançable OPCO en 2026 ?',
    a: `${libelleTarifsDualCourt(4)} (${SESSION_DUREE_LIBELLE}, jusqu'à ${EFFECTIF_GROUPE_MAX} participants en intra). ${FINANCEMENT_FORMULATION_PRUDENTE} Organisme Qualiopi. Guide : <a href="${LINKS.financement}">financement Constructys formation IA BTP</a>.`,
  },
  {
    q: 'Faut-il payer ChatGPT ou Claude pour suivre la formation niveau 1 ?',
    a: `Non : aucun prérequis IA ni abonnement payant pour le niveau 1 — les versions gratuites de ChatGPT, Claude AI, Gemini ou Perplexity suffisent. Un compte payant (Claude Pro, ChatGPT Plus) est seulement recommandé pour aller plus loin ensuite. Pour les marchés publics ou l'industrialisation Claude, voir la <a href="${LINKS.formationAO}">formation appels d'offres</a> ou le <a href="${LINKS.formationMaitriserClaudeAiBtp}">parcours Claude AI BTP</a>.`,
  },
  {
    q: 'On perd combien de temps sur l\'administratif qu\'on pourrait récupérer ?',
    a: `Les stagiaires constatent souvent 3 à 5 h gagnées par semaine sur devis, relances et CR — selon volume et discipline de relecture. La formation enseigne la méthode et les garde-fous (données sensibles, chiffres à vérifier), pas une promesse automatique. Voir aussi <a href="/ia-devis-batiment">IA devis bâtiment</a>.`,
  },
  {
    q: 'Qu\'est-ce que je repars concrètement après 4 heures ?',
    a: `Trames de devis et emails, bibliothèque de prompts par type de tâche, check-lists de relecture et certificat de réalisation. Objectifs détaillés sur la fiche <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">formation niveau 1 bâtiment & travaux publics</a> et le <a href="/formations">catalogue formations</a>.`,
  },
  {
    q: 'La formation couvre-t-elle les appels d\'offres et le CCTP ?',
    a: `La formation niveau 1 pose les bases (lecture aidée, plan de réponse, formulations). Pour analyser un DCE complet et rédiger un mémoire technique avec Cowork, le parcours dédié est la <a href="${LINKS.formationAO}">formation appels d'offres BTP</a>.`,
  },
];

/** FAQ — formation L'IA au service des Travaux Publics */
/** FAQ landing SEO — formation IA travaux publics (page dédiée) */
export const FAQ_FORMATION_IA_TRAVAUX_PUBLICS_LANDING: FAQItem[] = [
  {
    q: "Pourquoi une formation « IA travaux publics » plutôt qu'une formation bâtiment générique ?",
    a: `Les enjeux TP (VRD, terrassement, enrobés, ouvrages d'art, maître d'ouvrage public, marchés publics) diffèrent du seul gros œuvre : le niveau 1 du catalogue intègre désormais bâtiment et travaux publics dans une même session de 4 h, avec prompts et cas TP. Voir la fiche <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">formation niveau 1</a> et la page <a href="/formation-ia-travaux-publics">formation IA travaux publics</a> (SEO).`,
  },
  {
    q: "Les entreprises de terrassement, enrobés ou VRD sont-elles financées comme le reste du BTP ?",
    a: 'Si votre activité relève du périmètre BTP / travaux publics, les règles OPCO (notamment Constructys) s\'appliquent dans le cadre du plan de développement des compétences. Le montage de dossier et les plafonds dépendent de votre taille et du dispositif retenu — <a href="/financement-constructys-formation-ia-btp">guide financement Constructys</a> et <a href="/contact">contact</a> pour un devis.',
  },
  {
    q: "La formation couvre-t-elle à la fois les marchés publics et les dossiers privés ?",
    a: 'Oui : la logique de consultation, de structuration de réponse et de relecture s\'applique aux deux contextes. Les marchés publics ajoutent des contraintes de forme et de délais que j\'intègre dans les ateliers — voir aussi <a href="/formations/ia-appels-offre-btp">formation IA appels d\'offres BTP</a>.',
  },
  {
    q: "Quelle est la durée de la formation IA travaux publics ?",
    a: `Je propose une session de 4 heures (niveau débutant), ${libelleTarifsDualCourt(4)} (jusqu'à ${EFFECTIF_GROUPE_MAX} participants en intra). Le programme condense consultations / DCE, documents de chantier et bases d'industrialisation (templates, assistants) — <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">programme niveau 1 (PDF sur la fiche)</a>.`,
  },
];

export const FAQ_TRAVAUX_PUBLICS: FAQItem[] = [
  {
    q: "Quels outils IA sont prévus pour le niveau débutant ?",
    a: `${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} Voir <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">formation niveau 1 — Bâtiment & travaux publics</a>.`,
  },
  {
    q: "Qui peut suivre la formation « L'IA au service des Travaux Publics » ?",
    a: 'Conducteurs et chefs de travaux, bureaux d\'études et méthodes, QSE, assistants travaux, achats, dirigeants et managers TP. Aucun prérequis technique — page <a href="/formation-ia-travaux-publics">IA travaux publics</a>.',
  },
  {
    q: "Quels cas d'usage IA sont couverts ?",
    a: 'Consultations et appels d\'offres (DCE, trames, synthèses), documents de chantier et reporting, QSE, puis industrialisation : templates TP, assistants par rôle, charte et validation « anti-erreurs » — <a href="/formations/ia-appels-offre-btp">appels d\'offres IA</a>.',
  },
  {
    q: "La formation est-elle finançable ?",
    a: 'Oui, selon éligibilité auprès de l\'OPCO (Constructys, AKTO, OPCO EP). Session 4 h, certificat de réalisation — <a href="/financement-constructys-formation-ia-btp">financement Constructys</a>.',
  },
];

/** FAQ Formation ville / Île-de-France — périmètre géographique : IDF uniquement dans les réponses */
export const FAQ_FORMATION_VILLE: FAQItem[] = [
  {
    q: "Où se déroule la formation IA pour les pros du BTP ?",
    a: `En présentiel uniquement, intra-entreprise dans vos locaux — ${IDF_ZONE_INTERVENTION}. Sessions adaptées à votre équipe — <a href="/formations">catalogue formations IA pour les pros du BTP</a> et <a href="/formation-ia-btp-ile-de-france">Île-de-France</a>.`,
  },
  {
    q: "La formation est-elle finançable ?",
    a: 'Oui, financement possible via Constructys ou votre OPCO selon éligibilité. Devis personnalisé sous 24h — <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA appliquée au bâtiment</a> et <a href="/contact">contact</a>.',
  },
  {
    q: "Faut-il des compétences techniques ?",
    a: `Non. La formation est conçue pour des professionnels du BTP sans prérequis. Travail sur vos vrais documents : devis, emails, CR chantier — voir <a href="/ia-devis-batiment">IA devis bâtiment</a> et <a href="${LINKS.formationConducteurTravaux}">IA conducteur de travaux</a>.`,
  },
];

/** FAQ Checklist IA BTP */
export const FAQ_CHECKLIST_IA_BTP: FAQItem[] = [
  {
    q: 'À quoi sert la checklist 10 prompts ChatGPT BTP ?',
    a: `C’est une ressource gratuite pour accélérer devis, emails clients, comptes rendus de chantier, avis Google et publications LinkedIn. Chaque prompt est une trame métier à coller dans ChatGPT — complémentaire d’une <a href="${LINKS.formations}">formation IA pour le BTP</a> Qualiopi.`,
  },
  {
    q: 'Comment utiliser les prompts de la checklist ?',
    a: `Copiez chaque prompt dans ChatGPT (ou Claude), remplacez les parties entre crochets par vos informations (métier, client, contexte chantier). Relisez toujours les sorties avant envoi client — prolongez avec une <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">formation IA appliquée au bâtiment</a>.`,
  },
  {
    q: 'Ces prompts fonctionnent-ils avec Claude AI ou ChatGPT ?',
    a: `Oui. Les prompts sont conçus pour ChatGPT mais fonctionnent aussi avec Claude AI — la structure (rôle, contexte BTP, format attendu) reste identique. Pour Claude en contexte appels d’offres, voir aussi la <a href="${LINKS.formationMaitriserClaudeAiBtp}">formation Claude IA BTP</a>.`,
  },
  {
    q: 'Puis-je personnaliser ces prompts pour mon métier ?',
    a: `Oui. Les prompts sont des trames à adapter (plombier, électricien, maçon, conducteur de travaux…). Une session pédagogique vous apprend à créer vos propres prompts — voir <a href="${LINKS.chatgptArtisans}">ChatGPT pour entreprises BTP</a>.`,
  },
  {
    q: 'La formation IA pour le BTP est-elle finançable ?',
    a: `${FINANCEMENT_FORMULATION_PRUDENTE} Actions de formation OFC (organisme certifié Qualiopi), devis personnalisé sous 24h — <a href="${LINKS.financement}">${FINANCEMENT_PAGE_LINK_LABEL}</a>.`,
  },
];

/** FAQ Checklist Prompts BTP */
export const FAQ_CHECKLIST_PROMPTS: FAQItem[] = [
  {
    q: "Comment personnaliser ces prompts ChatGPT ?",
    a: 'Remplacez les parties entre crochets : [VOTRE MÉTIER], [NOM], [DÉCRIRE LA SITUATION], ... Adaptez le ton et les détails à votre activité — ressources sur le <a href="/blog">blog IA BTP</a>.',
  },
  {
    q: "Ces prompts fonctionnent-ils avec d'autres outils IA ?",
    a: `Oui. Les prompts sont conçus pour ChatGPT mais fonctionnent aussi avec Claude AI — la structure (rôle, contexte BTP, format attendu) reste identique. Voir le <a href="${LINKS.formations}">catalogue formations IA appliquées au bâtiment</a> et la page <a href="${LINKS.formationMaitriserClaudeAiBtp}">formation Claude AI BTP</a>.`,
  },
  {
    q: "La formation est-elle finançable ?",
    a: `Oui. Formation IA pour les pros du BTP financement possible selon éligibilité. Prenez rendez-vous pour un devis personnalisé : <a href="${LINKS.prendreRdv}">Réservez votre visio découverte gratuite</a> ou <a href="/contact">contact</a>.`,
  },
];

/** FAQ Contact */
export const FAQ_CONTACT: FAQItem[] = [
  {
    q: "Quel délai pour une proposition ou un chiffrage ?",
    a: 'Après votre message par email ou votre prise de rendez-vous, je vous réponds sous 24h avec une proposition détaillée et les possibilités de financement Constructys — <a href="/financement-constructys-formation-ia-btp">guide OPCO</a>.',
  },
  {
    q: "Où intervenez-vous pour les formations ?",
    a: `Basée à Guyancourt (78), j'interviens en <a href="/formation-ia-btp-ile-de-france">Île-de-France</a> — ${IDF_ZONE_INTERVENTION}. ${MODALITE_FORMATIONS_STANDARD}`,
  },
  {
    q: "Comment financer ma formation IA appliquée au bâtiment ?",
    a: 'éligible à une prise en charge par Constructys ou votre OPCO selon statut, branche et conditions en vigueur. Je vous accompagne pour monter le dossier et respecter les délais — <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour le BTP</a> et <a href="/formations">catalogue</a>.',
  },
];

/** FAQ Clients & Partenaires */
export const FAQ_CLIENTS_PARTENAIRES: FAQItem[] = [
  {
    q: "Quels organismes sont partenaires ?",
    a: 'FFB, CSFE, LinkedIn Learning, OPCO Constructys. Organisme de formation référencé FFB Grand Paris — détail sur la page <a href="/a-propos#clients-partenaires">clients et partenaires</a>.',
  },
  {
    q: "Les formations sont-elles certifiées Qualiopi ?",
    a: `Oui. OFC Création d'Entreprise est certifié Qualiopi. ${FINANCEMENT_FORMULATION_COURTE} — voir le <a href="/formations">catalogue formations</a>.`,
  },
  {
    q: "Comment devenir partenaire ?",
    a: 'Contactez-moi pour discuter d\'un partenariat ou d\'une intervention en formation. Devis et programme sur mesure selon vos besoins — <a href="/contact">page contact</a>.',
  },
];

/** FAQ Blog */
export const FAQ_BLOG: FAQItem[] = [
  {
    q: "Quels sujets sont couverts dans les articles ?",
    a: `ChatGPT et IA pour entreprises BTP, <a href="/ia-devis-batiment">IA devis bâtiment</a>, <a href="/financement-constructys-formation-ia-btp">financement Constructys</a>, automatisation administrative, <a href="/formations/ia-appels-offre-btp">appels d'offres</a>, <a href="${LINKS.formationConducteurTravaux}">gestion de chantier</a>. Guides pratiques et cas d'usage.`,
  },
  {
    q: "Les formations sont-elles finançables ?",
    a: 'Oui, financement possible via Constructys ou votre OPCO selon éligibilité. Prenez rendez-vous pour un devis personnalisé — <a href="${LINKS.prendreRdv}">Réservez votre visio découverte gratuite</a> et <a href="/formations">catalogue</a>.',
  },
  {
    q: "Comment accéder aux formations IA pour le BTP ?",
    a: `Catalogue des formations sur laureolivie.fr : page <a href="/formations">formations IA pour les pros du BTP</a>. ${MODALITE_FORMATIONS_STANDARD} Île-de-France : ${IDF_ZONE_INTERVENTION} — voir <a href="/formation-ia-btp-ile-de-france">Île-de-France</a>. Devis via <a href="/contact">contact</a>.`,
  },
];

/** FAQ Auteur Laure Olivié */
export const FAQ_AUTEUR: FAQItem[] = [
  {
    q: "Quelle est votre expérience dans le BTP ?",
    a: 'Formatrice IA spécialisée BTP depuis 2022 · 10 ans de terrain BTP (conducteurs de travaux, TPE/PME bâtiment et TP) — voir <a href="/a-propos">à propos</a> et <a href="/blog">articles</a>.',
  },
  {
    q: "Où intervenez-vous pour les formations ?",
    a: `Île-de-France : ${IDF_ZONE_INTERVENTION}. ${MODALITE_FORMATIONS_STANDARD} — <a href="/formations">catalogue</a> et <a href="/formation-ia-btp-ile-de-france">formation IA pour les pros du BTP Île-de-France</a>.`,
  },
  {
    q: "Proposez-vous des formations LinkedIn Learning ?",
    a: 'Oui. Intervenante LinkedIn Learning : « <a href="https://www.linkedin.com/learning/l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers" target="_blank" rel="noopener noreferrer">L\'IA pour le BTP, des solutions concrètes pour vos chantiers</a> » et « <a href="https://www.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement" target="_blank" rel="noopener noreferrer">L\'IA pour les artisans et TPE : Recruter sa main-d\'œuvre efficacement</a> ». Formations complémentaires au <a href="/formations">catalogue OFC</a>.',
  },
];

/** FAQ Install PWA */
export const FAQ_INSTALL_PWA: FAQItem[] = [
  {
    q: "L'application est-elle gratuite ?",
    a: "Oui. L'installation est gratuite, sans app store. Accédez à vos formations depuis l'écran d'accueil de votre téléphone.",
  },
  {
    q: "Mes données sont-elles stockées sur l'appareil ?",
    a: "Aucune donnée personnelle stockée sur l'appareil. Connexion internet requise pour accéder aux formations.",
  },
  {
    q: "Comment désinstaller l'application ?",
    a: "Sur Android : Paramètres → Applications → laureolivie.fr → Désinstaller. Sur iPhone : maintenir l'icône → Supprimer l'app.",
  },
];

/** FAQ Diagnostic IA BTP */
export const FAQ_DIAGNOSTIC: FAQItem[] = [
  {
    q: "Qu'est-ce qu'un diagnostic IA BTP ?",
    a: 'Un questionnaire guidé (environ 2 minutes) qui identifie votre profil métier, vos tâches chronophages, votre maturité IA et vos priorités d\'automatisation — avec une recommandation de parcours de formation du <a href="/formations">catalogue OFC</a>.',
  },
  {
    q: 'Quels métiers du BTP peuvent utiliser l\'IA ?',
    a: 'Conducteurs de travaux, chargés d\'affaires, dirigeants, études de prix, assistants travaux, MOE/MOEX, fonctions administratives et commerciales — le diagnostic adapte les priorités à votre rôle.',
  },
  {
    q: 'Peut-on utiliser l\'IA pour analyser un CCTP ?',
    a: 'Oui, avec validation métier obligatoire. Le diagnostic oriente vers les usages DCE/CCTP et la <a href="/formations/ia-appels-offre-btp">formation IA appels d\'offres BTP</a> si c\'est votre priorité.',
  },
  {
    q: 'Peut-on utiliser l\'IA pour les comptes rendus de chantier ?',
    a: 'Oui — structuration, reformulation et modèles réutilisables. Voir la <a href="/formations/ia-conduite-travaux-suivi-chantier">formation IA conduite de travaux</a> pour un parcours complet.',
  },
  {
    q: "L'IA peut-elle aider à répondre à un appel d'offres ?",
    a: 'Pour la lecture du DCE, la préparation du chiffrage et du mémoire technique — jamais en substitution de la validation humaine sur les prix et engagements.',
  },
  {
    q: 'Comment sécuriser les données utilisées avec une IA ?',
    a: 'Règles de confidentialité, validation humaine, périmètre documentaire et outils adaptés — le diagnostic signale si vos usages actuels méritent d\'être structurés avant d\'automatiser davantage.',
  },
  {
    q: 'Le diagnostic IA BTP est-il gratuit ?',
    a: 'Oui. Vous obtenez une synthèse à l\'écran sans carte bancaire. Laisser votre email est optionnel pour recevoir le récapitulatif et être recontacté.',
  },
];
