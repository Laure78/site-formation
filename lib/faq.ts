/**
 * FAQ partagée pour le composant UI et le schema FAQPage (GEO)
 */

import {
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
  TARIF_SESSION_DEBUTANT_HT,
  TARIF_SESSION_AVANCE_HT,
  EFFECTIF_GROUPE_MAX,
  MODALITE_FORMATIONS_STANDARD,
} from '@/lib/tarifs-sessions';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import {
  FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT,
  FINANCEMENT_FORMULATION_PRUDENTE,
  FINANCEMENT_FORMULATION_COURTE,
  FINANCEMENT_PAGE_LINK_LABEL,
} from '@/lib/financement-copy';

export type FAQItem = { q: string; a: string };

/**
 * Intentions sectorielles BTP (chantier, devis / métrés, BIM, sécurité, administratif, professionnels du BTP & PME).
 * Réponses originales OFC — SEO / GEO ; pas de reprise de contenu tiers.
 */
export const FAQ_IA_BTP_METIERS_CHANTIER_SEO: readonly FAQItem[] = [
  {
    q: "L'IA peut-elle vraiment aider sur les chantiers ?",
    a:
      "Oui, en prolongement du terrain : la formation vise surtout à accélérer la rédaction et la coordination (comptes rendus, synthèses, consignes, mails) pour libérer du temps utile sur le chantier. L'IA ne remplace pas le jugement professionnel ni les obligations réglementaires — elle aide à structurer l'information et à réagir plus vite. Pour la coordination et le suivi écrit, voir aussi la page <a href=\"/ia-conducteur-travaux\">IA conducteur de travaux</a> et le <a href=\"/formations\">catalogue formations IA pour les pro du BTP</a>.",
  },
  {
    q: "Comment l'IA améliore-t-elle les devis et métrés ?",
    a:
      `Elle accélère la mise en forme, les relectures, les variantes de libellés et l'extraction de quantités à partir de notes ou de brouillons — avec validation humaine sur les prix, les unités et les hypothèses. L'objectif est de réduire le temps de rédaction et les erreurs de forme, pas de substituer votre expertise chiffrage. Approfondissement : <a href="/ia-devis-batiment">IA devis bâtiment</a> et formation <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">NIV-01 — L'IA au service des pros du Bâtiment Travaux Publics</a>.`,
  },
  {
    q: "La formation aborde-t-elle le BIM et l'IA ?",
    a:
      "La session NIV-01 « L'IA au service des pros du Bâtiment Travaux Publics » met l'accent sur l'IA générative (ChatGPT, Claude) pour les usages métiers et administratifs du bâtiment et des travaux publics. Le BIM n'est pas un module dédié dans cette session. Pour les documents longs (CCTP, DCE) et les réponses à marchés, le programme <a href=\"" +
      LINKS.formationAO +
      "\">NIV-02 — L'IA appliquée aux appels d'offres BTP</a> ou la page <a href=\"" +
      LINKS.formationClaudeAiBtp +
      "\">formation Claude AI BTP</a> complètent le parcours — le <a href=\"" +
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
      '">NIV-01</a>.',
  },
];

/**
 * FAQ page d'accueil — même source que l’accordion (`FAQAccordion`) et le JSON-LD FAQPage via
 * `<Script>` dans `app/page.tsx`.
 */
export const FAQ_ITEMS_HOME: readonly FAQItem[] = [
  {
    q: 'Comment utiliser ChatGPT dans une entreprise du bâtiment ?',
    a:
      "On part de vos documents réels (devis, comptes rendus de chantier, emails) avec des prompts adaptés au vocabulaire BTP. La formation IA pour le BTP de Laure Olivié donne des trames pour automatiser les devis, la gestion de chantier et l'administratif, sans aucun prérequis technique.",
  },
  {
    q: "Comment gagner du temps administratif dans le BTP avec l'IA ?",
    a:
      "L'IA générative (ChatGPT, Claude AI) permet d'automatiser la rédaction des comptes rendus de chantier, des devis, des emails et des réponses aux appels d'offres. En moyenne, les conducteurs de travaux et dirigeants BTP formés par Laure Olivié gagnent 3 à 5 heures par semaine dès la première semaine.",
  },
  {
    q: 'La formation IA pour les pro du BTP peut-elle être financée par Constructys ou mon OPCO ?',
    a: `${FINANCEMENT_FORMULATION_PRUDENTE} ${FINANCEMENT_CONSTRUCTYS_PLAFONDS_COURT}`,
  },
  {
    q: 'Faut-il des compétences techniques pour suivre cette formation IA appliquée au bâtiment ?',
    a:
      "Non. La formation est conçue pour des professionnels du bâtiment et des travaux publics sans formation informatique. Seuls prérequis : savoir naviguer sur internet et disposer d'un ordinateur. Tout le reste est expliqué pas à pas, en travaillant directement sur les documents réels de chantier.",
  },
  {
    q: 'Combien de temps dure la formation IA pour le BTP ?',
    a:
      "Le module standard est de 4 heures, exclusivement en présentiel dans vos locaux (intra) ou en salle en Île-de-France (inter). Ce format est calibré pour s'intégrer dans une demi-journée de travail et maximiser la prise en charge Constructys.",
  },
  {
    q: 'Mes données BTP confidentielles sont-elles sécurisées avec ChatGPT ?',
    a:
      'Pour les données non sensibles, ChatGPT et Claude AI sont utilisables directement. Pour les documents confidentiels (marchés, données clients, données financières), Laure Olivié recommande ChatGPT Team, Claude for Work ou les solutions européennes comme Mistral AI. La formation inclut systématiquement un module sur les bonnes pratiques de confidentialité.',
  },
  {
    q: 'Quels sont les principaux clients de Laure Olivié ?',
    a:
      'Laure Olivié forme principalement les adhérents et collaborateurs de la FFB Grand Paris, FFB Île-de-France (78, 91, 95), FFB IDF Est, CSFE (Chambre Syndicale Française de l\'Étanchéité), CAPEB, CNAM Île-de-France Entreprises et Lefebvre Dalloz.',
  },
  {
    q: "Quelle est la différence entre une formation IA pour le BTP en intra et en inter ?",
    a:
      "L'inter-entreprises regroupe plusieurs entreprises sur une session catalogue (idéal pour 1 à 3 collaborateurs). L'intra-entreprise est dédiée à votre seule équipe, sur vos documents et vos cas d'usage spécifiques (idéal à partir de 4 participants). Les deux formats durent 4 heures : forfait de session " +
      `${TARIF_SESSION_DEBUTANT_HT} € HT (niveau débutant) ou ${TARIF_SESSION_AVANCE_HT} € HT (niveau avancé), jusqu'à ${EFFECTIF_GROUPE_MAX} participants.` ,
  },
  ...FAQ_IA_BTP_METIERS_CHANTIER_SEO,
];

/** Texte utilisateur sans balises HTML (réponses riches en lien — JSON-LD `Answer.text`). */
export function faqAnswerPlainTextForJsonLd(htmlOrText: string): string {
  return htmlOrText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Toutes les questions/réponses visibles section « Questions fréquentes » accueil. */
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
    a: 'On part de vos documents réels (devis, CR chantier, emails) : prompts adaptés au vocabulaire BTP, relecture humaine et bonnes pratiques confidentialité. Le <a href="/formations">catalogue formations IA appliquées au bâtiment</a> et la page <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a> vous donnent des trames pour l\'<a href="/ia-devis-batiment">IA devis bâtiment</a>, l\'<a href="/ia-conducteur-travaux">IA gestion chantier</a> et l\'automatisation administrative — sans prérequis technique.',
  },
  {
    q: "Comment gagner du temps administratif dans le BTP avec l'IA ?",
    a: 'En automatisant relances, modèles et brouillons (devis, courriers, synthèses) avec ChatGPT ou un outil équivalent, sous votre contrôle — voir aussi nos <a href="/blog">articles et guides IA BTP</a>. Les stagiaires constatent souvent 3 à 5 h gagnées par semaine sur l\'administratif — utile pour dirigeants, conducteurs de travaux et équipes support.',
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
    a: `Toutes nos sessions sont proposées au format unique de 4 heures. ${MODALITE_FORMATIONS_STANDARD} Le contenu est adapté au niveau (débutant ou avancé) avec un forfait par session — voir les programmes sur la page <a href="/formations">formations IA pour le BTP</a>.`,
  },
  {
    q: "La formation se fait-elle en présentiel ?",
    a: `Oui, exclusivement en présentiel. Les formations catalogue se déroulent en inter (Île-de-France) ou en intra dans vos locaux. ${MODALITE_FORMATIONS_STANDARD} Lieux inter indicatifs : <a href="/formation-ia-btp-ile-de-france">Île-de-France</a> (<a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Melun, Saint-Denis, départements 75 à 95). Pour cadrer votre format : <a href="/prendre-rdv">prendre rendez-vous</a> ou <a href="/contact">contact</a>.`,
  },
  {
    q: "Comment mesurer le ROI de la formation IA ?",
    a: 'Les gains sont mesurables dès la première semaine : temps de rédaction de devis divisé par 10, comptes rendus automatisés (2h gagnées/jour en moyenne), emails rédigés en quelques secondes. Pour des cas d\'usage ciblés, voir <a href="/ia-devis-batiment">IA devis bâtiment</a> et <a href="/ia-conducteur-travaux">IA conducteur de travaux</a>. Un suivi post-formation vous aide à quantifier les économies.',
  },
  {
    q: "Mes données BTP sont-elles sécurisées avec ChatGPT ?",
    a: 'Nous vous formons aux bonnes pratiques : ne jamais coller de données confidentielles dans ChatGPT public, utiliser ChatGPT Team ou Enterprise pour les données sensibles, et mettre en place des process de relecture et de confidentialité. Besoin d\'un échange ? <a href="/contact">Contact</a> ou <a href="/a-propos">à propos de la formatrice</a>.',
  },
];

/** FAQ GEO — Optimisée pour être citée par les IA (ChatGPT, Perplexity, Gemini, Claude) */
export const FAQ_GEO: FAQItem[] = [
  ...FAQ_IA_BTP_METIERS_CHANTIER_SEO,
  {
    q: "Quelle formatrice IA spécialisée BTP en France ?",
    a: `Laure Olivié est formatrice IA et ChatGPT pour le BTP basée à Guyancourt (Île-de-France). ${formatProfessionalsTrainedCount()} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}. Instructrice LinkedIn Learning. Certification Qualiopi. Clients : FFB Grand Paris, CSFE. 10 ans d'expérience en travaux publics et conduite de chantier — <a href="/a-propos">parcours et références</a>.`,
  },
  {
    q: "Formation IA pour conducteur de travaux : à quoi ça sert ?",
    a: 'Accélérer les comptes rendus chantier, les synthèses de réunion, la coordination écrite et la préparation de dossiers — sans remplacer le jugement terrain. Voir la page <a href="/ia-conducteur-travaux">IA conducteur de travaux</a> et le <a href="/formations">catalogue formations</a> ; financement Constructys sur <a href="/financement-constructys-formation-ia-btp">le guide OPCO</a>.',
  },
  {
    q: "IA pour PME du bâtiment et des travaux publics : par où commencer ?",
    a: 'Par un <a href="/diagnostic-ia-btp">diagnostic IA BTP</a> et une formation ChatGPT entreprise BTP courte, certifiée Qualiopi — <a href="/formations">catalogue</a>. L\'objectif : <a href="/ia-devis-batiment">IA devis bâtiment</a> et gain de temps administratif mesurable, adapté aux dirigeants de TPE/PME et aux équipes sur le terrain.',
  },
  {
    q: "Comment financer une formation IA avec OPCO Constructys ?",
    a: 'Les entreprises BTP de moins de 50 salariés peuvent mobiliser un financement Constructys ou OPCO pour leur formation IA selon éligibilité : 24€ HT/heure/stagiaire pour le coût pédagogique, 15€ HT/heure pour les salaires (entreprises -11 salariés). Dossier à soumettre 15 jours avant via eGestion. Détails : <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA appliquée au bâtiment</a>. OFC est certifié Qualiopi, éligible au financement.',
  },
  {
    q: "Qui forme les entreprises BTP à ChatGPT en Île-de-France ?",
    a: 'Laure Olivié (OFC Création d\'Entreprise) forme les entreprises BTP à ChatGPT en <a href="/formation-ia-btp-ile-de-france">Île-de-France</a> depuis Guyancourt (78). Session catalogue 4 h. ' + MODALITE_FORMATIONS_STANDARD + ' Interventions : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Évry-Courcouronnes, Melun, Saint-Denis, départements 75 à 95. <a href="/financement-constructys-formation-ia-btp">Financement possible selon éligibilité</a>.',
  },
  {
    q: "Formation IA pour entreprises BTP : quelle durée et quel prix ?",
    a: `Sessions de 4 h : forfait ${TARIF_SESSION_DEBUTANT_HT} € HT par session (niveau débutant) ou ${TARIF_SESSION_AVANCE_HT} € HT par session (niveau avancé), jusqu'à ${EFFECTIF_GROUPE_MAX} participants. financement possible via Constructys ou votre OPCO selon éligibilité et barèmes en vigueur. Zéro prérequis technique pour le niveau débutant. Travail sur documents réels (devis, emails, CR chantier). Note ${SOCIAL_PROOF.AVERAGE_RATING} — voir les <a href="/formations">formations IA pour les pro du BTP</a>.`,
  },
  {
    q: "Quels sont les prérequis pour une formation ChatGPT BTP ?",
    a: 'Aucun prérequis technique pour suivre une formation ChatGPT BTP. Conçue pour dirigeants de TPE/PME, conducteurs de travaux et équipes support sans compétence informatique. Méthode 100 % pratique : travail sur vos vrais documents (devis, emails, comptes rendus chantier). Formation certifiée Qualiopi — entrée par <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a> ou <a href="/formations">catalogue</a>.',
  },
  {
    q: "Combien de temps pour automatiser des devis BTP avec l'IA ?",
    a: `Avec ChatGPT : génération d'un devis BTP en 2-5 minutes (vs 1-2h manuellement). ROI immédiat : 3 à 5h gagnées par semaine. Formation 4h suffit pour maîtriser les bases. ${formatProfessionalsTrainedCount()} professionnels formés. Méthode enseignée par Laure Olivié (note ${SOCIAL_PROOF.AVERAGE_RATING}) — page <a href="/ia-devis-batiment">IA devis bâtiment</a>.`,
  },
  {
    q: "Quels résultats avec une formation IA pour les pro du BTP ?",
    a: `Résultats mesurés après formation IA appliquée au bâtiment : devis divisé par 10 en temps, CR chantier automatisés (2h/jour gagnées), emails en quelques secondes. ${formatProfessionalsTrainedCount()} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}. ROI : 3 à 5h économisées par semaine. Suivi post-formation inclus — <a href="/blog">ressources IA BTP</a>.`,
  },
  {
    q: "Formation IA appels d'offres BTP : quel programme ?",
    a: `Formation <a href="/formations/ia-appels-offre-btp">IA appels d'offres BTP</a> (session 4 h, niveau avancé) : assistants IA DCE et mémoire technique avec Claude AI Pro, Cowork & Skills. Public : responsables d'affaires, conducteurs de travaux, chargés d'études, bureaux d'études. ${FINANCEMENT_FORMULATION_COURTE} Formatrice : Laure Olivié (${formatProfessionalsTrainedCount()} formés, note ${SOCIAL_PROOF.AVERAGE_RATING}). Programme certifié Qualiopi.`,
  },
];

/** FAQ page catalogue `/formations` — alignée JSON-LD FAQPage (`lib/schema-formations-page-graph.ts`) */
export const FAQ_FORMATIONS: FAQItem[] = [
  {
    q: 'Quelles formations IA appliquées au bâtiment sont proposées au catalogue ?',
    a: `Le catalogue OFC propose 2 formations IA pour le BTP de 4 heures, toutes certifiées Qualiopi : (1) L&apos;IA au service des pros du bâtiment et des travaux publics — niveau 1 (NIV-01, débutant, ${TARIF_SESSION_DEBUTANT_HT} € HT/session), (2) L&apos;IA appliquée aux appels d&apos;offres BTP — niveau 2 (NIV-02, avancé, ${TARIF_SESSION_AVANCE_HT} € HT/session). ${MODALITE_FORMATIONS_STANDARD} ${FINANCEMENT_FORMULATION_COURTE} Fiches détaillées : cartes ci-dessus ; complément marchés publics : <a href="${LINKS.formationIaCctpAnalyseDceBtp}">formation IA analyse CCTP &amp; DCE</a>.`,
  },
  {
    q: 'Comment choisir la bonne formation IA pour le BTP pour mon entreprise ?',
    a: `Le choix dépend de votre fonction et de votre niveau. L&apos;équipe débute ou couvre à la fois chantier bâtiment et travaux publics : niveau 1 (NIV-01). Pour la réponse aux marchés, mémoires techniques et DCE : niveau 2 (NIV-02). Un diagnostic gratuit de 30 minutes en visio permet de cibler le parcours — <a href="${LINKS.prendreRdv}">prendre rendez-vous</a> ou <a href="${LINKS.contact}">contact</a>.`,
  },
  {
    q: 'Combien coûte une formation IA pour les pro du BTP du catalogue ?',
    a: `Forfait par session : ${TARIF_SESSION_DEBUTANT_HT} € HT pour le niveau 1 (NIV-01 bâtiment &amp; travaux publics), et ${TARIF_SESSION_AVANCE_HT} € HT pour le niveau 2 (NIV-02 appels d&apos;offre). Chaque session dure 4 heures, avec un groupe de ${EFFECTIF_GROUPE_MAX} participants maximum. ${FINANCEMENT_FORMULATION_PRUDENTE} Plafond indicatif Constructys : 24 € HT/h/stagiaire. Détail : <a href="${LINKS.financement}">financement Constructys formation IA appliquée au bâtiment</a>.`,
  },
  {
    q: 'Les formations IA pour les pro du BTP sont-elles certifiées Qualiopi ?',
    a: `Oui. OFC Création d&apos;Entreprise est certifié Qualiopi (action de formation), certification valable jusqu&apos;en janvier 2028. Numéro de déclaration d&apos;activité : 11788515078. ${FINANCEMENT_FORMULATION_PRUDENTE} <a href="${LINKS.aPropos}">À propos de l&apos;organisme</a>.`,
  },
  {
    q: 'Les formations sont-elles disponibles en inter ou en intra ?',
    a: `Inter ou intra : ${MODALITE_FORMATIONS_STANDARD} En inter, sessions en Île-de-France (Paris, Versailles, Nanterre, Créteil, Cergy-Pontoise, Melun, Saint-Denis, départements 75 à 95). En intra, session dédiée à votre entreprise. Format : 4 heures, ${EFFECTIF_GROUPE_MAX} participants maximum, supports inclus. Vue d&apos;ensemble : <a href="${LINKS.formationIleDeFrance}">formation IA pour le BTP en Île-de-France</a>.`,
  },
  ...FAQ_IA_BTP_METIERS_CHANTIER_SEO,
];

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
    q: "Combien coûte une formation IA pour les pro du BTP ?",
    a: `Nous proposons uniquement des sessions de 4 heures, en forfait par session : ${TARIF_SESSION_DEBUTANT_HT} € HT (niveau débutant) ou ${TARIF_SESSION_AVANCE_HT} € HT (niveau avancé), jusqu'à ${EFFECTIF_GROUPE_MAX} participants. Selon votre entreprise, le financement OPCO Constructys peut couvrir tout ou partie du coût — <a href="/financement-constructys-formation-ia-btp">guide financement</a> et <a href="/contact">accompagnement dossier</a>.`,
  },
  {
    q: "Comment financer ma formation IA ?",
    a: 'Via l\'OPCO Constructys pour les entreprises du BTP. Le coût pédagogique est couvert jusqu\'à 24€ HT/heure/stagiaire. Les entreprises de moins de 11 salariés peuvent également bénéficier de la prise en charge des salaires (15€ HT/heure). Page dédiée : <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour le BTP</a>.',
  },
  {
    q: "Faut-il avancer des frais ?",
    a: 'Selon les modalités de votre dossier et de la convention signée, la prise en charge peut être mobilisée sans avance de trésorerie dans certains cas — nous vous accompagnons pour monter le dossier et respecter les délais (15 jours avant le début de la formation) — <a href="/contact">nous contacter</a>.',
  },
];

export const FAQ_OFFRES: FAQItem[] = [
  {
    q: "Quels formats de formation proposez-vous ?",
    a: `Sessions de 4 heures, inter ou intra. ${MODALITE_FORMATIONS_STANDARD} Forfait par session selon le niveau (débutant ou avancé), jusqu'à ${EFFECTIF_GROUPE_MAX} participants. Parcours sur la page <a href="/formations">formations IA appliquées au bâtiment</a>.`,
  },
  {
    q: "Comment accéder à l'espace apprenant ?",
    a: "Après inscription ou achat d'une formation, vous recevez un accès à l'espace apprenant. Vous y retrouvez vos cours, votre progression, les quiz et les certificats. Accès 24/7.",
  },
  {
    q: "Les formations sont-elles adaptées aux dirigeants et équipes du BTP ?",
    a: 'Oui. Nos formations sont conçues pour des professionnels du BTP sans prérequis technique. On travaille sur vos vrais documents : devis, emails, comptes rendus. Méthode 100 % pratique — voir <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a> et <a href="/ia-conducteur-travaux">IA conducteur de travaux</a>.',
  },
];

export const FAQ_FINANCEMENT: FAQItem[] = [
  {
    q: "Quel délai pour soumettre mon dossier Constructys ?",
    a: 'Le dossier doit parvenir complet à Constructys 15 jours calendaires avant le début de la formation. Les dossiers envoyés après la date limite ne seront pas financés. Utilisation obligatoire de la plateforme eGestion. Cadre détaillé sur <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour les pro du BTP</a>.',
  },
  {
    q: "Quel plafond pour les coûts pédagogiques ?",
    a: 'Plafond standard : 24€ HT/heure/stagiaire. Limite de 840€ HT/jour/groupe pour les sessions intra-entreprise. Pour les entreprises de moins de 11 salariés : 15€ HT/heure pour la prise en charge des salaires — voir aussi <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA appliquée au bâtiment</a>.',
  },
  {
    q: "Quels documents fournir pour le financement ?",
    a: 'Programme de formation détaillé, devis du prestataire, convention de formation, liste des participants, attestation FFB (si adhérent), justificatifs d\'effectif. Nous vous accompagnons pour monter le dossier : <a href="/contact">contact</a> ou <a href="/prendre-rdv">prise de rendez-vous</a>.',
  },
];

/** FAQ page financement Constructys formation IA appliquée au bâtiment — schema.org FAQPage */
export const FAQ_FINANCEMENT_IA_BTP: FAQItem[] = [
  {
    q: "Ma formation IA est-elle éligible Constructys ?",
    a: 'Oui, si votre entreprise relève du secteur BTP (bâtiment, travaux publics, négoce de matériaux) et que la formation est inscrite au plan de développement des compétences. Les actions dispensées par un organisme certifié Qualiopi, comme OFC, répondent aux exigences OPCO pour la prise en charge — voir le <a href="/formations">catalogue formations IA pour le BTP</a>.',
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
    q: "La formation IA est-elle éligible au CPF ?",
    a: 'L\'éligibilité au Compte personnel de formation dépend de l\'enregistrement de l\'action sur France compétences et du catalogue. Pour le volet entreprise et OPCO, c\'est la prise en charge Constructys qui s\'applique dans le cadre du plan de développement des compétences. Nous vous indiquons la bonne combinaison selon votre situation — <a href="/prendre-rdv">prendre rendez-vous</a>.',
  },
  {
    q: "Constructys finance-t-il les formations en présentiel ?",
    a: `Oui. Les formations catalogue OFC se déroulent exclusivement en présentiel, en intra dans vos locaux ou en inter en Île-de-France. ${FINANCEMENT_FORMULATION_PRUDENTE} Nous vous renseignons sur votre dossier (programme, évaluation, dépôt eGestion) — page <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour les pro du BTP</a>.`,
  },
  {
    q: "Que se passe-t-il si ma demande est déposée en retard ?",
    a: 'Depuis le 1er janvier 2026, les demandes incomplètes ou reçues après la date limite ne sont plus financées. Il n\'y a pas d\'exception : anticipez le montage de dossier avec votre organisme de formation — <a href="/contact">nous écrire</a>.',
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
    q: "Où intervenez-vous pour les formations IA pour les pro du BTP ?",
    a: `Basée à Guyancourt (78), j'interviens en <a href="/formation-ia-btp-ile-de-france">Île-de-France</a> : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Évry-Courcouronnes, Melun, Saint-Denis, et l'ensemble des départements 75, 77, 78, 91, 92, 93, 94, 95. ${MODALITE_FORMATIONS_STANDARD}`,
  },
  {
    q: "Quelle est votre expérience dans le BTP ?",
    a: 'Plus de 10 ans d\'expérience en formation professionnelle auprès de TPE, PME et équipes du BTP. Spécialisation métiers du bâtiment, travaux publics et génie civil. Méthode 100 % opérationnelle — <a href="/a-propos#clients-partenaires">clients et partenaires</a>, <a href="/blog">articles et ressources</a>.',
  },
  {
    q: "Proposez-vous un accompagnement post-formation ?",
    a: 'Oui. Support WhatsApp, accès 1 an aux ressources, suivi personnalisé. L\'objectif : que vous appliquiez les acquis dès le lendemain sur vos vrais documents — voir le <a href="/formations">catalogue formations</a>.',
  },
];

export const FAQ_PRENDRE_RDV: FAQItem[] = [
  {
    q: "Le rendez-vous est-il gratuit ?",
    a: 'Oui. L\'échange de 30 minutes est gratuit. Nous discutons de votre projet, identifions vos besoins et vous envoyons un devis personnalisé sous 24h — voir aussi la page <a href="/contact">contact</a> et le <a href="/formations">catalogue formations</a>.',
  },
  {
    q: "Comment se déroule le RDV ?",
    a: `Vous réservez un créneau via <a href="${buildSiteCalendlyCtaUrl('prendre-rdv-faq-calendly')}" rel="noopener noreferrer">Calendly</a> (agenda en ligne). L'échange se fait en visioconférence ou par téléphone selon ce que vous choisissez. À l'issue, vous recevez un devis détaillé avec les possibilités de financement Constructys — <a href="/financement-constructys-formation-ia-btp">guide OPCO</a>.`,
  },
  {
    q: "Que faire si aucun créneau ne me convient ?",
    a: 'Écrivez à Laure depuis la page <a href="/contact">contact</a> ou <a href="/">accueil</a> (e-mail et téléphone) ou réservez un créneau <a href="/prendre-rdv">prendre rendez-vous</a>. Nous vous recontactons rapidement si besoin.',
  },
];

/** FAQ Formation IA pour le BTP Paris / Île-de-France */
/** FAQ — page Formation IA pour les pro du BTP Yvelines (78) */
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
    a: 'Le format le plus courant est une session de 4 heures, adaptée au rythme des entreprises du BTP et aux règles de financement Constructys. Des formats de sensibilisation (2 h) ou d\'approfondissement peuvent être étudiés selon votre projet — <a href="/prendre-rdv">prendre rendez-vous</a>.',
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
    a: 'Oui. Sessions exclusivement en présentiel, en intra dans vos locaux ou sur chantier (Guyancourt, Montigny-le-Bretonneux, Trappes, Élancourt, Maurepas, La Verrière, Coignières, Magny-les-Hameaux, etc.). Le siège OFC est à Guyancourt : pas de frais de déplacement supplémentaires pour les entreprises du 78. Voir <a href="/formation-ia-btp-yvelines-78">formation IA pour les pro du BTP Yvelines (78)</a> et le <a href="/formations">catalogue formations</a>.',
  },
  {
    q: "Faut-il des compétences informatiques pour suivre cette formation ?",
    a: 'Non. La formation s\'adresse à des professionnels du BTP : savoir naviguer sur internet et utiliser un ordinateur ou une tablette suffit. Le reste est expliqué pas à pas sur vos documents réels.',
  },
  {
    q: "Combien de temps dure la formation ?",
    a: 'Le format le plus courant est une session de 4 heures, adaptée au rythme des entreprises du BTP et aux règles de financement Constructys. Des formats de sensibilisation (2 h) ou d\'approfondissement peuvent être étudiés selon votre projet — <a href="/prendre-rdv">prendre rendez-vous</a>.',
  },
  {
    q: "La formation IA pour les pro du BTP est-elle financement possible selon éligibilité (Constructys) dans les Yvelines ?",
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
      "Les créneaux les plus courants sont en semaine (journée ou demi-journée), pour s'aligner sur les habitudes des équipes terrain et du bureau d'études. Un samedi peut être étudié au cas par cas pour une session intra (contraintes d'atelier, planning chargé), sous réserve de disponibilité — le plus simple est d'en parler lors d'un <a href=\"/prendre-rdv\">rendez-vous découverte</a> ou via <a href=\"/contact\">contact</a>.",
  },
  {
    q: 'Y a-t-il des sessions inter-entreprises à Versailles ?',
    a:
      "Les sessions inter du catalogue ont lieu en Île-de-France (lieux selon calendrier : Versailles, Paris, etc.). En intra, " +
      MODALITE_FORMATIONS_STANDARD +
      ' Consultez <a href="/formation-ia-btp-ile-de-france">formation IA pour les pro du BTP Île-de-France</a> et le <a href="/formations">catalogue</a>.',
  },
];

export const FAQ_IA_BTP_PARIS: FAQItem[] = [
  {
    q: "Où se déroule la formation IA appliquée au bâtiment à Paris ?",
    a: `La formation se déroule exclusivement en présentiel, en intra dans vos locaux ou en salle en Île-de-France : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Melun, Saint-Denis, départements 75 à 95. ${MODALITE_FORMATIONS_STANDARD} Voir <a href="/formation-ia-btp-ile-de-france">formation IA appliquée au bâtiment Île-de-France</a> et le <a href="/formations">catalogue</a>.`,
  },
  {
    q: "La formation IA Paris est-elle finançable ?",
    a: 'Oui, éligible à une prise en charge par Constructys ou votre OPCO selon statut, branche et conditions en vigueur. Le coût pédagogique est couvert jusqu\'à 24€ HT/heure/stagiaire — détails sur <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour le BTP</a>.',
  },
  {
    q: "Quel est le format de la formation IA pour le BTP Paris ?",
    a: `Session de 4 h pratiques : ChatGPT pour devis, emails, relances clients. Travail sur vos vrais documents. Aucun prérequis technique pour le niveau débutant. Forfait ${TARIF_SESSION_DEBUTANT_HT} € HT ou ${TARIF_SESSION_AVANCE_HT} € HT par session selon le programme — parcours <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">NIV-01 — pros Bâtiment & travaux publics</a>.`,
  },
];

/** FAQ Formation IA Appels d'offres BTP */
export const FAQ_APPELS_OFFRE: FAQItem[] = [
  {
    q: "Qui peut suivre la formation IA appels d'offres BTP ?",
    a: 'Dirigeants, responsables d\'affaires, chargés d\'études, conducteurs de travaux, directeurs techniques TPE/PME BTP et bureaux d\'études. Prérequis : abonnement Claude Pro + Cowork installé, DCE complet récent et 2 à 3 mémoires techniques de l\'entreprise ; bases d\'une IA générative ou session niveau 1 — voir la <a href="/formations/ia-appels-offre-btp">fiche formation NIV-02</a>.',
  },
  {
    q: "Combien de temps dure la formation ?",
    a: 'Session unique de 4 heures, 75 % pratique (niveau avancé). Financement possible via Constructys ou votre OPCO selon éligibilité — voir <a href="/financement-constructys-formation-ia-btp">financement Constructys</a>.',
  },
  {
    q: "Quels livrables sont inclus ?",
    a: 'Compte Claude Pro configuré, Cowork installé avec skills opérationnels, bibliothèque de 30 prompts DCE/mémoire technique, template Word MT (3 modèles), skills Cowork personnalisés — accès aux supports sur la plateforme OFC selon convention. Voir aussi la <a href="/checklist-ia-btp">checklist prompts ChatGPT BTP</a>.',
  },
  {
    q: "Quel abonnement est requis pour le niveau avancé ?",
    a: `${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Indispensable pour configurer Cowork, analyser les DCE et rédiger les mémoires techniques.`,
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
      `${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Sur la session catalogue NIV-02, comptes gratuits insuffisants pour configurer Cowork et créer les skills DCE/mémoire technique ; voir la <a href="/formations/ia-appels-offre-btp">fiche formation appels d&apos;offres</a>. Pour une découverte générale de l&apos;IA hors ce parcours, des offres gratuites peuvent suffire — pas pour industrialiser la réponse aux AO.`,
  },
  {
    q: "La formation est-elle adaptée aux TPE (moins de 10 salariés) ?",
    a:
      "Oui. Les exemples et cas pratiques sont calibrés pour des PME de 5 à 50 salariés. Les participants de très petites entreprises apportent souvent leurs propres DCE en cours pour travailler directement sur leur situation réelle. Principe : 100 % pratique, zéro théorie inutile.",
  },
  {
    q: "Combien de temps après la formation peut-on appliquer la méthode ?",
    a:
      "Dès le lendemain. Les participants repartent avec leurs prompts personnalisés, leur bibliothèque structurée et un accès pendant 1 an aux ressources pédagogiques. Les entreprises formées avec la FFB Grand Paris ont généralement appliqué la méthode sur leur AO suivant dans la semaine.",
  },
  {
    q: "La formation couvre-t-elle uniquement les mémoires techniques ou aussi le chiffrage ?",
    a:
      "NIV-02 couvre l'analyse DCE, la structuration et la rédaction de mémoires techniques avec Claude AI Pro, Cowork & Skills. Les participants repartent avec des assistants IA réutilisables sur leurs futurs appels d'offres. Programme : <a href=\"/formations/ia-appels-offre-btp\">L'IA appliquée aux appels d'offres BTP</a>.",
  },
];

/** FAQ — formation NIV-01 (fusion bâtiment & TP) */
export const FAQ_BATIMENT: FAQItem[] = [
  ...FAQ_IA_BTP_METIERS_CHANTIER_SEO,
  {
    q: "Quels comptes IA pour cette formation (niveau débutant) ?",
    a: `${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} Page formation : <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">NIV-01 — L'IA au service des pros du Bâtiment Travaux Publics</a>.`,
  },
  {
    q: "Proposez-vous plusieurs durées de session ?",
    a: 'Non : toutes nos sessions d\'accompagnement catalogue sont calibrées sur 4 heures. La différence se joue sur le niveau (débutant ou avancé) et le forfait par session, pas sur la durée — voir le <a href="/formations">catalogue</a>.',
  },
  {
    q: "La formation est-elle finançable ?",
    a: 'Oui, éligible à une prise en charge par Constructys ou votre OPCO selon statut, branche et conditions en vigueur. Formation certifiée Qualiopi — attestation en fin de parcours. Détails : <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour les pro du BTP</a>.',
  },
];

/** FAQ — formation L'IA au service des Travaux Publics */
/** FAQ landing SEO — formation IA travaux publics (page dédiée) */
export const FAQ_FORMATION_IA_TRAVAUX_PUBLICS_LANDING: FAQItem[] = [
  {
    q: "Pourquoi une formation « IA travaux publics » plutôt qu'une formation bâtiment générique ?",
    a: `Les enjeux TP (VRD, terrassement, enrobés, ouvrages d'art, maître d'ouvrage public, marchés publics) diffèrent du seul gros œuvre : le niveau 1 du catalogue intègre désormais bâtiment et travaux publics dans une même session de 4 h, avec prompts et cas TP. Voir la fiche <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">NIV-01</a> et la page <a href="/formation-ia-travaux-publics">formation IA travaux publics</a> (SEO).`,
  },
  {
    q: "Les entreprises de terrassement, enrobés ou VRD sont-elles financées comme le reste du BTP ?",
    a: 'Si votre activité relève du périmètre BTP / travaux publics, les règles OPCO (notamment Constructys) s\'appliquent dans le cadre du plan de développement des compétences. Le montage de dossier et les plafonds dépendent de votre taille et du dispositif retenu — <a href="/financement-constructys-formation-ia-btp">guide financement Constructys</a> et <a href="/contact">contact</a> pour un devis.',
  },
  {
    q: "La formation couvre-t-elle à la fois les marchés publics et les dossiers privés ?",
    a: 'Oui : la logique de consultation, de structuration de réponse et de relecture s\'applique aux deux contextes. Les marchés publics ajoutent des contraintes de forme et de délais que nous intégrons dans les ateliers — voir aussi <a href="/formations/ia-appels-offre-btp">formation IA appels d\'offres BTP</a>.',
  },
  {
    q: "Quelle est la durée de la formation IA travaux publics ?",
    a: `Nous proposons une session unique de 4 heures (niveau débutant), avec forfait ${TARIF_SESSION_DEBUTANT_HT} € HT par session (jusqu'à ${EFFECTIF_GROUPE_MAX} participants). Le programme condense consultations / DCE, documents de chantier et bases d'industrialisation (templates, assistants) — <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">programme NIV-01 (PDF sur la fiche)</a>.`,
  },
];

export const FAQ_TRAVAUX_PUBLICS: FAQItem[] = [
  {
    q: "Quels outils IA sont prévus pour le niveau débutant ?",
    a: `${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} Voir <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">fiche NIV-01 — Bâtiment & travaux publics</a>.`,
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
    a: 'Oui, selon éligibilité auprès de l\'OPCO (Constructys, AKTO, OPCO EP). Session 4 h, attestation Qualiopi — <a href="/financement-constructys-formation-ia-btp">financement Constructys</a>.',
  },
];

/** FAQ Formation ville (pages Lyon, Bordeaux, Lille, Île-de-France — périmètre géographique : IDF dans les réponses) */
export const FAQ_FORMATION_VILLE: FAQItem[] = [
  {
    q: "Où se déroule la formation IA pour les pro du BTP ?",
    a: 'En présentiel uniquement, en intra dans vos locaux ou en salle en Île-de-France : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Melun, Saint-Denis, départements 75 à 95. Sessions adaptées à votre équipe — <a href="/formations">catalogue formations IA pour les pro du BTP</a> et <a href="/formation-ia-btp-ile-de-france">Île-de-France</a>.',
  },
  {
    q: "La formation est-elle finançable ?",
    a: 'Oui, financement possible via Constructys ou votre OPCO selon éligibilité. Devis personnalisé sous 24h — <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA appliquée au bâtiment</a> et <a href="/contact">contact</a>.',
  },
  {
    q: "Faut-il des compétences techniques ?",
    a: 'Non. La formation est conçue pour des professionnels du BTP sans prérequis. Travail sur vos vrais documents : devis, emails, CR chantier — voir <a href="/ia-devis-batiment">IA devis bâtiment</a> et <a href="/ia-conducteur-travaux">IA conducteur de travaux</a>.',
  },
];

/** FAQ Checklist IA BTP */
export const FAQ_CHECKLIST_IA_BTP: FAQItem[] = [
  {
    q: "Comment utiliser les prompts de la checklist ?",
    a: 'Copiez chaque prompt dans ChatGPT, remplacez les parties entre crochets par vos informations (métier, client, contexte). Les prompts sont prêts à l\'emploi pour devis, emails, CR chantier — prolongez avec une <a href="/formations">formation IA appliquée au bâtiment</a> (Qualiopi).',
  },
  {
    q: "La formation IA pour le BTP est-elle finançable ?",
    a: 'Oui, éligible à une prise en charge par Constructys ou votre OPCO selon statut, branche et conditions en vigueur. Formation Qualiopi, devis personnalisé sous 24h — <a href="/financement-constructys-formation-ia-btp">guide Constructys</a>.',
  },
  {
    q: "Puis-je personnaliser ces prompts ?",
    a: 'Oui. Les prompts sont des trames à adapter à votre métier (plombier, électricien, maçon...). La formation vous apprend à créer vos propres prompts — voir <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a>.',
  },
];

/** FAQ Checklist Prompts BTP */
export const FAQ_CHECKLIST_PROMPTS: FAQItem[] = [
  {
    q: "Comment personnaliser ces prompts ChatGPT ?",
    a: 'Remplacez les parties entre crochets : [VOTRE MÉTIER], [NOM], [DÉCRIRE LA SITUATION]... Adaptez le ton et les détails à votre activité — ressources sur le <a href="/blog">blog IA BTP</a>.',
  },
  {
    q: "Ces prompts fonctionnent-ils avec d'autres outils IA ?",
    a: `Oui. Les prompts sont conçus pour ChatGPT mais fonctionnent avec Mistral, Claude, Gemini ou Perplexity. La structure reste identique — voir le <a href="${LINKS.formations}">catalogue formations IA appliquées au bâtiment</a> et la page <a href="${LINKS.formationClaudeAiBtp}">formation Claude AI BTP</a>.`,
  },
  {
    q: "La formation est-elle finançable ?",
    a: `Oui. Formation IA pour les pro du BTP financement possible selon éligibilité. Prenez rendez-vous pour un devis personnalisé : <a href="${buildSiteCalendlyCtaUrl('faq-checklist-prompts-rdv')}" rel="noopener noreferrer">Calendly</a> ou <a href="/contact">contact</a>.`,
  },
];

/** FAQ Contact */
export const FAQ_CONTACT: FAQItem[] = [
  {
    q: "Quel délai pour une proposition ou un chiffrage ?",
    a: 'Après votre message par email ou votre prise de rendez-vous, nous vous répondons sous 24h avec une proposition détaillée et les possibilités de financement Constructys — <a href="/financement-constructys-formation-ia-btp">guide OPCO</a>.',
  },
  {
    q: "Où intervenez-vous pour les formations ?",
    a: 'Basée à Guyancourt (78), j\'interviens en <a href="/formation-ia-btp-ile-de-france">Île-de-France</a> : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Évry-Courcouronnes, Melun, Saint-Denis, départements 75 à 95. ' + MODALITE_FORMATIONS_STANDARD,
  },
  {
    q: "Comment financer ma formation IA appliquée au bâtiment ?",
    a: 'éligible à une prise en charge par Constructys ou votre OPCO selon statut, branche et conditions en vigueur. Nous vous accompagnons pour monter le dossier et respecter les délais — <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA pour le BTP</a> et <a href="/formations">catalogue</a>.',
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
    a: 'Contactez-nous pour discuter d\'un partenariat ou d\'une intervention en formation. Devis et programme sur mesure selon vos besoins — <a href="/contact">page contact</a>.',
  },
];

/** FAQ Blog */
export const FAQ_BLOG: FAQItem[] = [
  {
    q: "Quels sujets sont couverts dans les articles ?",
    a: 'ChatGPT et IA pour entreprises BTP, <a href="/ia-devis-batiment">IA devis bâtiment</a>, <a href="/financement-constructys-formation-ia-btp">financement Constructys</a>, automatisation administrative, <a href="/formations/ia-appels-offre-btp">appels d\'offres</a>, <a href="/ia-conducteur-travaux">gestion de chantier</a>. Guides pratiques et cas d\'usage.',
  },
  {
    q: "Les formations sont-elles finançables ?",
    a: 'Oui, financement possible via Constructys ou votre OPCO selon éligibilité. Prenez rendez-vous pour un devis personnalisé — <a href="/prendre-rdv">prendre rendez-vous</a> et <a href="/formations">catalogue</a>.',
  },
  {
    q: "Comment accéder aux formations IA pour le BTP ?",
    a: 'Catalogue des formations sur laureolivie.fr : page <a href="/formations">formations IA pour les pro du BTP</a>. ' + MODALITE_FORMATIONS_STANDARD + ' Île-de-France : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Melun, Saint-Denis, départements 75 à 95 — voir <a href="/formation-ia-btp-ile-de-france">Île-de-France</a>. Devis via <a href="/contact">contact</a>.',
  },
];

/** FAQ Auteur Laure Olivié */
export const FAQ_AUTEUR: FAQItem[] = [
  {
    q: "Quelle est votre expérience dans le BTP ?",
    a: 'Plus de 10 ans d\'expérience en formation professionnelle auprès de TPE, PME et équipes du BTP. Spécialisation métiers du bâtiment, travaux publics et génie civil — voir <a href="/a-propos">à propos</a> et <a href="/blog">articles</a>.',
  },
  {
    q: "Où intervenez-vous pour les formations ?",
    a: 'Île-de-France : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Évry-Courcouronnes, Melun, Saint-Denis, départements 75 à 95. ' + MODALITE_FORMATIONS_STANDARD + ' — <a href="/formations">catalogue</a> et <a href="/formation-ia-btp-ile-de-france">formation IA pour les pro du BTP Île-de-France</a>.',
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
    q: "Le diagnostic IA BTP est-il gratuit ?",
    a: 'Oui. Répondez à 5 questions en 60 secondes et recevez un résultat personnalisé sur votre potentiel de gain avec l\'IA — puis explorez le <a href="/formations">catalogue formations</a> et la page <a href="/ia-devis-batiment">IA devis bâtiment</a>.',
  },
  {
    q: "Que faire après le diagnostic ?",
    a: `Prenez rendez-vous pour un échange de 30 minutes : <a href="${buildSiteCalendlyCtaUrl('faq-diagnostic-apres')}" rel="noopener noreferrer">Calendly</a> ou <a href="/prendre-rdv">prendre rendez-vous</a>. Nous identifions ensemble vos besoins et vous envoyons un devis personnalisé sous 24h.`,
  },
  {
    q: "L'IA peut-elle vraiment m'aider sur mes devis et emails ?",
    a: 'Oui. Les professionnels du BTP gagnent en moyenne 3 à 5h/semaine en automatisant devis, emails, CR chantier et appels d\'offres avec ChatGPT — voir <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a> et <a href="/formations/ia-appels-offre-btp">appels d\'offres IA</a>.',
  },
];
