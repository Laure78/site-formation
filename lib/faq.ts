/**
 * FAQ partagée pour le composant UI et le schema FAQPage (GEO)
 */

import {
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
} from '@/lib/tarifs-sessions';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';

export type FAQItem = { q: string; a: string };

/**
 * FAQ page d'accueil — 6 questions alignées avec le JSON-LD FAQPage (app/page.tsx).
 */
export const FAQ_ITEMS_HOME: readonly FAQItem[] = [
  {
    q: 'Comment utiliser ChatGPT dans une entreprise du bâtiment ?',
    a:
      "On part de vos documents réels (devis, CR chantier, emails) : prompts adaptés au vocabulaire BTP, relecture humaine et bonnes pratiques confidentialité. La formation IA BTP donne des trames pour l'automatisation des devis, la gestion de chantier et l'administratif — sans prérequis technique.",
  },
  {
    q: "Comment gagner du temps administratif dans le BTP avec l'IA ?",
    a:
      "L'IA générative (ChatGPT, Claude AI) permet d'automatiser la rédaction des comptes rendus de chantier, des devis, des emails et des réponses aux appels d'offres. En moyenne, les artisans et conducteurs de travaux formés gagnent 3 à 5 heures par semaine dès la première utilisation.",
  },
  {
    q: 'La formation est-elle vraiment prise en charge à 100 % ?',
    a:
      'Oui, pour les entreprises du BTP de moins de 50 salariés éligibles au Plan de Développement des Compétences Constructys. Les coûts pédagogiques sont pris en charge à hauteur de 24 € HT/heure/stagiaire, et les salaires des participants sont remboursés pour les entreprises de moins de 11 salariés.',
  },
  {
    q: 'Faut-il des compétences techniques pour suivre cette formation IA BTP ?',
    a:
      "Non. La formation est conçue pour des professionnels du bâtiment sans formation informatique. Seuls prérequis : naviguer sur internet et disposer d'un ordinateur. Tout le reste est expliqué pas à pas, en travaillant sur vos propres documents de chantier.",
  },
  {
    q: 'Combien de temps dure la formation IA pour le BTP ?',
    a:
      'Le module standard est de 4 heures, en présentiel dans vos locaux ou en distanciel. Ce format est calibré pour s\'intégrer dans une journée de travail et maximiser la prise en charge Constructys.',
  },
  {
    q: 'Mes données BTP sont-elles sécurisées avec ChatGPT ?',
    a:
      'Pour les données non sensibles, ChatGPT est utilisable directement. Pour les documents confidentiels (marchés, données clients, données financières), on recommande ChatGPT Team ou des solutions européennes comme Mistral AI. La formation inclut un module sur les bonnes pratiques de confidentialité.',
  },
];

export const FAQ_ITEMS: readonly FAQItem[] = [
  {
    q: "Comment utiliser ChatGPT dans une entreprise du bâtiment ?",
    a: 'On part de vos documents réels (devis, CR chantier, emails) : prompts adaptés au vocabulaire BTP, relecture humaine et bonnes pratiques confidentialité. Le <a href="/formations">catalogue formations IA BTP</a> et la page <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a> vous donnent des trames pour l\'<a href="/ia-devis-batiment">IA devis bâtiment</a>, l\'<a href="/ia-conducteur-travaux">IA gestion chantier</a> et l\'automatisation administrative — sans prérequis technique.',
  },
  {
    q: "Comment gagner du temps administratif dans le BTP avec l'IA ?",
    a: 'En automatisant relances, modèles et brouillons (devis, courriers, synthèses) avec ChatGPT ou un outil équivalent, sous votre contrôle — voir aussi nos <a href="/blog">articles et guides IA BTP</a>. Les stagiaires constatent souvent 3 à 5 h gagnées par semaine sur l\'administratif — utile pour dirigeants, conducteurs de travaux et équipes support.',
  },
  {
    q: "La formation est-elle vraiment prise en charge à 100 % ?",
    a: 'Oui, pour les entreprises de moins de 50 salariés, la formation peut être prise en charge à 100 % par Constructys dans le cadre du Plan de Développement des Compétences. Détails sur le <a href="/financement-constructys-formation-ia-btp">financement 100 % IA BTP</a> et le <a href="/financement-constructys-formation-ia-btp">guide Constructys</a>. Le coût pédagogique est couvert jusqu\'à 24€ HT/heure/stagiaire.',
  },
  {
    q: "Faut-il des compétences techniques pour suivre cette formation ?",
    a: 'Non. La formation est conçue pour des professionnels du BTP sans prérequis technique. On travaille directement sur vos documents réels (devis, CR, emails). Zéro théorie, 100 % pratique — parcours décrit dans le <a href="/formations">catalogue des formations</a>.',
  },
  {
    q: "Combien de temps dure la formation IA pour le BTP ?",
    a: 'Toutes nos sessions sont proposées au format unique de 4 heures, en présentiel. Le contenu est adapté au niveau (débutant ou avancé) avec un forfait par participant — voir les programmes sur la page <a href="/formations">formations IA BTP</a>.',
  },
  {
    q: "La formation se fait-elle en présentiel ou en distanciel ?",
    a: 'Les formations catalogue se déroulent en présentiel : sessions inter en <a href="/formation-ia-btp-ile-de-france">Île-de-France</a> (<a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Melun, Saint-Denis, départements 75 à 95) ou intra dans vos locaux en Île-de-France. Nous nous adaptons à la taille de votre équipe ; pour un créneau, utilisez <a href="/prendre-rdv">prendre rendez-vous</a> ou la <a href="/contact">page contact</a>.',
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
    a: 'Les entreprises BTP de moins de 50 salariés peuvent financer à 100 % leur formation IA via Constructys : 24€ HT/heure/stagiaire pour le coût pédagogique, 15€ HT/heure pour les salaires (entreprises -11 salariés). Dossier à soumettre 15 jours avant via eGestion. Détails : <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA BTP</a>. OFC est certifié Qualiopi, éligible au financement.',
  },
  {
    q: "Qui forme les entreprises BTP à ChatGPT en Île-de-France ?",
    a: 'Laure Olivié (OFC Création d\'Entreprise) forme les entreprises BTP à ChatGPT en <a href="/formation-ia-btp-ile-de-france">Île-de-France</a> depuis Guyancourt (78). Programme « L\'IA au service du bâtiment » : session 4 h en présentiel. Interventions notamment à <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Évry-Courcouronnes, Melun, Saint-Denis, et dans l\'ensemble des départements 75, 77, 78, 91, 92, 93, 94, 95. <a href="/financement-constructys-formation-ia-btp">Financement 100 % Constructys</a>.',
  },
  {
    q: "Formation IA pour entreprises BTP : quelle durée et quel prix ?",
    a: `Sessions de 4 h avec forfait 100 € HT par participant (niveau débutant) ou 175 € HT par participant (niveau avancé). 100 % finançable OPCO Constructys selon barèmes en vigueur. Zéro prérequis technique pour le niveau débutant. Travail sur documents réels (devis, emails, CR chantier). Note ${SOCIAL_PROOF.AVERAGE_RATING} — voir les <a href="/formations">formations IA BTP</a>.`,
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
    q: "Quels résultats avec une formation IA BTP ?",
    a: `Résultats mesurés après formation IA BTP : devis divisé par 10 en temps, CR chantier automatisés (2h/jour gagnées), emails en quelques secondes. ${formatProfessionalsTrainedCount()} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}. ROI : 3 à 5h économisées par semaine. Suivi post-formation inclus — <a href="/blog">ressources IA BTP</a>.`,
  },
  {
    q: "Formation IA appels d'offres BTP : quel programme ?",
    a: `Formation <a href="/formations/ia-appels-offre-btp">IA appels d'offres BTP</a> (session 4 h, niveau avancé) : analyse DCE/CCTP, rédaction mémoires techniques, workflows de traitement. Public : chargés d'affaires, bureaux d'études. Financement 100 % Constructys selon éligibilité. Formatrice : Laure Olivié (${formatProfessionalsTrainedCount()} formés, note ${SOCIAL_PROOF.AVERAGE_RATING}). Programme certifié Qualiopi.`,
  },
];

/** FAQ par page — pour booster le SEO sur les pages clés */
export const FAQ_FORMATIONS: FAQItem[] = [
  {
    q: "Quelles formations IA BTP sont proposées ?",
    a: `Six sessions de 4 h, niveau débutant (forfait 100 € HT par participant) ou avancé (175 € HT par participant), groupe de 12 maximum : bâtiment, travaux publics, appels d&apos;offres, RH, sensibilisation & assistants, et parcours <a href="${LINKS.formationArchitecture}">architecte augmenté (Claude AI, DPGF, chantier)</a>. Selon le module, on travaille avec ChatGPT, Claude ou Gemini (comptes gratuits possibles au niveau débutant) — guide <a href="${LINKS.claudeAiBtp}">Claude AI BTP</a>. Pour les marchés publics : <a href="${LINKS.formationAO}">formation IA appels d&apos;offres</a>. Les fiches détaillées sont listées sur cette page (cartes ci-dessus).`,
  },
  {
    q: "Comment choisir ma formation IA BTP ?",
    a: `On part de votre métier et de votre niveau : les parcours débutants posent les bases (devis, administratif, sensibilisation) ; les parcours avancés ciblent les appels d&apos;offres, la fonction RH ou l&apos;architecture avec exigences outils plus poussées. Un échange permet d&apos;aligner le programme sur vos documents réels. Réservez un créneau sur la page <a href="${LINKS.prendreRdv}">prendre rendez-vous</a> ou écrivez-nous pour un <a href="${LINKS.contact}">devis personnalisé</a> sous 24 h.`,
  },
  {
    q: "Les formations sont-elles certifiées Qualiopi ?",
    a: `Oui. OFC Création d&apos;Entreprise est un organisme de formation certifié Qualiopi : processus d&apos;évaluation et traçabilité conformes aux exigences des financeurs. En savoir plus sur <a href="${LINKS.aPropos}">l&apos;organisme et la formatrice</a>.`,
  },
  {
    q: "Comment financer ma formation avec l'OPCO Constructys ?",
    a: `Les entreprises du BTP peuvent mobiliser leur plan de développement des compétences : plafonds pédagogiques et règles de dépôt (notamment délai avant le premier jour de session) sont détaillés sur la page <a href="${LINKS.financement}">financement Constructys formation IA BTP</a>. Nous vous aidons à cadrer le dossier avec votre interlocuteur habituel.`,
  },
  {
    q: "Où se déroulent les sessions en Île-de-France ?",
    a: `Les sessions inter ont lieu en présentiel dans des salles en Île-de-France (Paris, Yvelines, Essonne, SQY, départements 75 à 95 selon le calendrier). Des pages locales précisent le contexte : <a href="${LINKS.formationParis}">formation IA BTP Paris</a>, <a href="${LINKS.formationMorangis}">Morangis (91)</a>, <a href="${LINKS.formationLongjumeau}">Longjumeau (91)</a>, et une vue d&apos;ensemble sur la <a href="${LINKS.formationIleDeFrance}">formation IA BTP en Île-de-France</a>. L&apos;intra se fait dans vos locaux en Île-de-France sur devis.`,
  },
  {
    q: "Faut-il un abonnement payant (ChatGPT Plus, Claude Pro) ?",
    a: `${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} ${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Pour des trames prêtes à l&apos;emploi, voir aussi la <a href="${LINKS.checklist}">checklist prompts ChatGPT BTP</a>.`,
  },
];

export const FAQ_TARIFS: FAQItem[] = [
  {
    q: "Faut-il un abonnement Claude pour les formations niveau avancé ?",
    a: `${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Détails sur les <a href="/formations">formations IA BTP</a> et le <a href="/financement-constructys-formation-ia-btp">financement Constructys</a>.`,
  },
  {
    q: "Quels comptes IA pour les formations niveau débutant ?",
    a: `${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} Voir le <a href="/formations">catalogue</a> et la <a href="/checklist-ia-btp">checklist prompts ChatGPT BTP</a>.`,
  },
  {
    q: "Combien coûte une formation IA BTP ?",
    a: 'Nous proposons uniquement des sessions de 4 heures, en forfait par participant : 100 € HT (niveau débutant) ou 175 € HT (niveau avancé). Selon votre entreprise, le financement OPCO Constructys peut couvrir tout ou partie du coût — <a href="/financement-constructys-formation-ia-btp">guide financement</a> et <a href="/contact">accompagnement dossier</a>.',
  },
  {
    q: "Comment financer ma formation IA ?",
    a: 'Via l\'OPCO Constructys pour les entreprises du BTP. Le coût pédagogique est couvert jusqu\'à 24€ HT/heure/stagiaire. Les entreprises de moins de 11 salariés peuvent également bénéficier de la prise en charge des salaires (15€ HT/heure). Page dédiée : <a href="/financement-constructys-formation-ia-btp">financement 100 % IA BTP</a>.',
  },
  {
    q: "Faut-il avancer des frais ?",
    a: 'Non. Une fois votre dossier Constructys accepté, la formation est financée directement. Nous vous accompagnons pour monter le dossier et respecter les délais (15 jours avant le début de la formation) — <a href="/contact">nous contacter</a>.',
  },
];

export const FAQ_OFFRES: FAQItem[] = [
  {
    q: "Quels formats de formation proposez-vous ?",
    a: 'Sessions de 4 heures en présentiel (inter ou intra-entreprise). Tarif forfaitaire par participant selon le niveau (débutant ou avancé). Nous nous adaptons à la taille de votre groupe — parcours sur la page <a href="/formations">formations IA BTP</a>.',
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
    a: 'Le dossier doit parvenir complet à Constructys 15 jours calendaires avant le début de la formation. Les dossiers envoyés après la date limite ne seront pas financés. Utilisation obligatoire de la plateforme eGestion. Cadre détaillé sur <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA BTP</a>.',
  },
  {
    q: "Quel plafond pour les coûts pédagogiques ?",
    a: 'Plafond standard : 24€ HT/heure/stagiaire. Limite de 840€ HT/jour/groupe pour les sessions intra-entreprise. Pour les entreprises de moins de 11 salariés : 15€ HT/heure pour la prise en charge des salaires — voir aussi <a href="/financement-constructys-formation-ia-btp">financement 100 %</a>.',
  },
  {
    q: "Quels documents fournir pour le financement ?",
    a: 'Programme de formation détaillé, devis du prestataire, convention de formation, liste des participants, attestation FFB (si adhérent), justificatifs d\'effectif. Nous vous accompagnons pour monter le dossier : <a href="/contact">contact</a> ou <a href="/prendre-rdv">prise de rendez-vous</a>.',
  },
];

/** FAQ page financement Constructys formation IA BTP — schema.org FAQPage */
export const FAQ_FINANCEMENT_IA_BTP: FAQItem[] = [
  {
    q: "Ma formation IA est-elle éligible Constructys ?",
    a: 'Oui, si votre entreprise relève du secteur BTP (bâtiment, travaux publics, négoce de matériaux) et que la formation est inscrite au plan de développement des compétences. Les actions dispensées par un organisme certifié Qualiopi, comme OFC, répondent aux exigences OPCO pour la prise en charge — voir le <a href="/formations">catalogue formations IA BTP</a>.',
  },
  {
    q: "Quel est le montant maximum remboursé ?",
    a: 'Constructys applique un plafond de coûts pédagogiques de 24 € HT par heure et par participant. En session intra-entreprise, la prise en charge est plafonnée à 840 € HT par jour et par groupe. Le reste à charge dépend de la taille de l\'entreprise et des barèmes salaires et annexes en vigueur — synthèse sur <a href="/financement-constructys-formation-ia-btp">financement 100 % IA BTP</a>.',
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
    q: "Constructys finance-t-il les formations en distanciel ?",
    a: 'Les formations catalogue OFC se déroulent en présentiel. Pour toute question sur les règles Constructys et l\'éligibilité d\'une action au plan de développement des compétences, nous vous renseignons sur votre dossier (programme, évaluation, dépôt eGestion) — page <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA BTP</a>.',
  },
  {
    q: "Que se passe-t-il si ma demande est déposée en retard ?",
    a: 'Depuis le 1er janvier 2026, les demandes incomplètes ou reçues après la date limite ne sont plus financées. Il n\'y a pas d\'exception : anticipez le montage de dossier avec votre organisme de formation — <a href="/contact">nous écrire</a>.',
  },
  {
    q: "Comment savoir si mon OPCO est Constructys ?",
    a: 'Constructys est l\'OPCO du BTP : entreprises du bâtiment, des travaux publics et activités assimilées, négoce de matériaux. Si votre activité principale est dans ce périmètre, c\'est bien Constructys qui gère votre contribution et vos demandes de financement — voir aussi <a href="/formation-ia-travaux-publics">formation IA travaux publics</a>.',
  },
];

export const FAQ_A_PROPOS: FAQItem[] = [
  {
    q: "Où intervenez-vous pour les formations IA BTP ?",
    a: 'Basée à Guyancourt (78), j\'interviens en <a href="/formation-ia-btp-ile-de-france">Île-de-France</a> : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Évry-Courcouronnes, Melun, Saint-Denis, et l\'ensemble des départements 75, 77, 78, 91, 92, 93, 94, 95. Formations en présentiel (inter en salle ou intra-entreprise sur votre site).',
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
    a: `Vous réservez un créneau via <a href="${CALENDLY_BOOKING_URL}" rel="noopener noreferrer">Calendly</a> (agenda en ligne). L'échange se fait en visioconférence ou par téléphone selon ce que vous choisissez. À l'issue, vous recevez un devis détaillé avec les possibilités de financement Constructys — <a href="/financement-constructys-formation-ia-btp">guide OPCO</a>.`,
  },
  {
    q: "Que faire si aucun créneau ne me convient ?",
    a: 'Laissez vos coordonnées via le formulaire sur la page <a href="/contact">contact</a> ou <a href="/">accueil</a>. Nous vous recontactons rapidement pour convenir d\'un rendez-vous.',
  },
];

/** FAQ Formation IA BTP Paris / Île-de-France */
/** FAQ — page Formation IA BTP Yvelines (78) */
export const FAQ_IA_BTP_YVELINES: FAQItem[] = [
  {
    q: 'La formation se déroule-t-elle en présentiel à Versailles ou dans les Yvelines ?',
    a: 'Oui. Les sessions en présentiel ont lieu dans vos locaux dans tout le département des Yvelines (78), sans frais de déplacement supplémentaires pour les entreprises du 78. Les sessions inter du catalogue sont également en présentiel — voir <a href="/formation-ia-btp-ile-de-france">formation IA BTP Île-de-France</a> et le <a href="/formations">catalogue</a>. Pour des besoins spécifiques (intra, contraintes), le format se cadrage sur devis.',
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
    q: "La formation IA BTP est-elle finançable par Constructys dans les Yvelines ?",
    a: 'Oui. Les règles sont les mêmes pour les entreprises du BTP en Île-de-France : financement possible dans le cadre du plan de développement des compétences, selon votre éligibilité et les barèmes en vigueur. Détails sur <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA BTP</a> et <a href="/financement-constructys-formation-ia-btp">financement 100 % IA BTP</a>.',
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

/** FAQ — page Formation IA BTP Saint-Quentin-en-Yvelines (SQY, 78) */
export const FAQ_IA_BTP_SAINT_QUENTIN_YVELINES: FAQItem[] = [
  {
    q: 'Intervenez-vous dans toute la communauté d’agglomération de Saint-Quentin-en-Yvelines ?',
    a: 'Oui. Sessions en présentiel dans vos locaux ou sur chantier : Guyancourt, Montigny-le-Bretonneux, Trappes, Élancourt, Maurepas, La Verrière, Coignières, Magny-les-Hameaux, etc. Le siège OFC est à Guyancourt : pas de frais de déplacement supplémentaires pour les entreprises du 78. Pour le département tout entier, voir aussi la page <a href="/formations/ia-btp-yvelines-78">formation IA BTP Yvelines (78)</a> et le <a href="/formations">catalogue formations</a>.',
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
    q: "La formation IA BTP est-elle finançable par Constructys dans les Yvelines ?",
    a: 'Oui. Les règles sont les mêmes pour les entreprises du BTP en Île-de-France : financement possible dans le cadre du plan de développement des compétences, selon votre éligibilité et les barèmes en vigueur. Détails sur <a href="/financement-constructys-formation-ia-btp">financement Constructys formation IA BTP</a>.',
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
      "Oui. Les sessions se font en présentiel : dans vos locaux ou sur votre chantier dans tout le département des Yvelines (78). Je suis basée à Guyancourt (Saint-Quentin-en-Yvelines) : pour les entreprises du 78, il n'y a pas de frais de déplacement supplémentaires. Pour le détail des programmes, voir aussi la page <a href=\"/formations/ia-btp-yvelines-78\">formation IA BTP Yvelines (78)</a> et le <a href=\"/formations\">catalogue formations</a>.",
  },
  {
    q: 'La formation est-elle disponible le samedi ?',
    a:
      "Les créneaux les plus courants sont en semaine (journée ou demi-journée), pour s'aligner sur les habitudes des équipes terrain et du bureau d'études. Un samedi peut être étudié au cas par cas pour une session intra (contraintes d'atelier, planning chargé), sous réserve de disponibilité — le plus simple est d'en parler lors d'un <a href=\"/prendre-rdv\">rendez-vous découverte</a> ou via <a href=\"/contact\">contact</a>.",
  },
  {
    q: 'Y a-t-il des sessions inter-entreprises à Versailles ?',
    a:
      "Les sessions inter du catalogue ont lieu en présentiel en Île-de-France, avec des lieux qui peuvent inclure Versailles ou l'agglomération selon le calendrier et la session. Pour savoir quelle session correspond à votre secteur, consultez la page <a href=\"/formation-ia-btp-ile-de-france\">formation IA BTP Île-de-France</a> et le <a href=\"/formations\">catalogue</a>. Les entreprises des Yvelines peuvent aussi privilégier une session <strong>intra</strong> dans leurs locaux dans le 78.",
  },
];

export const FAQ_IA_BTP_PARIS: FAQItem[] = [
  {
    q: "Où se déroule la formation IA BTP à Paris ?",
    a: 'La formation se déroule en présentiel dans vos locaux ou en salle en Île-de-France : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Melun, Saint-Denis, et départements 75, 77, 78, 91, 92, 93, 94, 95. Nous nous adaptons à vos contraintes — voir aussi <a href="/formation-ia-btp-ile-de-france">formation IA BTP Île-de-France</a> et le <a href="/formations">catalogue</a>.',
  },
  {
    q: "La formation IA Paris est-elle finançable ?",
    a: 'Oui, 100 % finançable par l\'OPCO Constructys pour les entreprises du BTP de moins de 50 salariés. Le coût pédagogique est couvert jusqu\'à 24€ HT/heure/stagiaire — détails sur <a href="/financement-constructys-formation-ia-btp">financement 100 % IA BTP</a>.',
  },
  {
    q: "Quel est le format de la formation IA BTP Paris ?",
    a: 'Session de 4 h pratiques : ChatGPT pour devis, emails, relances clients. Travail sur vos vrais documents. Aucun prérequis technique pour le niveau débutant. Forfait par participant selon le niveau — parcours <a href="/formations/ia-au-service-du-batiment">L\'IA au service du bâtiment</a>.',
  },
];

/** FAQ Formation IA Appels d'offres BTP */
export const FAQ_APPELS_OFFRE: FAQItem[] = [
  {
    q: "Qui peut suivre la formation IA appels d'offres BTP ?",
    a: 'Chargés d\'affaires, bureaux d\'études, dirigeants d\'entreprises du BTP. Aucune compétence technique en IA requise. Connaissance du secteur BTP et expérience en appels d\'offres suffisantes — page <a href="/formations/ia-appels-offre-btp">formation IA appels d\'offres BTP</a>.',
  },
  {
    q: "Combien de temps dure la formation ?",
    a: 'Session unique de 4 heures, intensive et opérationnelle (niveau avancé). 100 % finançable OPCO Constructys selon éligibilité — voir <a href="/financement-constructys-formation-ia-btp">financement Constructys</a>.',
  },
  {
    q: "Quels livrables sont inclus ?",
    a: 'Bibliothèque de prompts spécialisés, templates de mémoires techniques, workflows de traitement DCE, guide RGPD, accès plateforme 1 an — complétez avec la <a href="/checklist-ia-btp">checklist prompts ChatGPT BTP</a>.',
  },
  {
    q: "Quel abonnement est requis pour le niveau avancé ?",
    a: `${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Indispensable pour les analyses de DCE et les brouillons de mémoires techniques.`,
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
      "Oui. La méthode est identique. Pour les marchés publics, l'analyse du Règlement de Consultation (RC) est particulièrement utile : l'IA extrait les critères de sélection et leurs pondérations, ce qui permet d'orienter précisément la rédaction du mémoire sur les points les mieux notés. Ressource : <a href=\"/blog/ia-btp-analyse-dce\">analyse DCE avec l'IA</a>.",
  },
  {
    q: "Faut-il avoir un compte ChatGPT payant pour suivre la formation ?",
    a:
      "Non. Des outils gratuits (ChatGPT gratuit, Claude gratuit, Mistral Le Chat, NotebookLM) suffisent pour découvrir la méthode. Pour un usage professionnel intensif sur des CCTP longs, les versions payantes (environ 20 €/mois) offrent des capacités supérieures. La formation présente les deux niveaux.",
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
      "BTP-02 couvre l'ensemble du processus de réponse à un AO, y compris l'analyse du BPU et du DQE avec l'IA. Le chiffrage proprement dit (calcul des prix, marges) fait l'objet d'un module spécifique qui peut être combiné selon vos besoins. Programme : <a href=\"/formations/ia-appels-offre-btp\">Répondre aux appels d'offres avec l'IA</a>.",
  },
];

/** FAQ Formation IA RH BTP */
export const FAQ_RH_BTP: FAQItem[] = [
  {
    q: "La formation IA RH BTP s'adresse à qui ?",
    a: `DRH, chargés de recrutement, responsables RH et assistants RH du secteur BTP. Aucune compétence technique requise. ${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Programme : <a href="/formations/ia-rh-btp">formation IA RH BTP</a>.`,
  },
  {
    q: "Quelle est la durée de la formation IA fonction RH ?",
    a: 'Session de 4 heures (niveau avancé). Automatisation recrutement, GEPP, tableaux de bord RH et création d\'assistants IA personnalisés — contenus condensés sur une demi-journée. Voir le <a href="/formations">catalogue</a>.',
  },
  {
    q: "Les données RH sont-elles sécurisées avec l'IA ?",
    a: 'Nous formons aux bonnes pratiques RGPD : ne pas saisir de données personnelles dans des outils non validés par votre organisation, anonymiser les exemples en session, et cadrer les usages avec votre direction ou votre référent conformité. Guide de sécurité inclus — <a href="/contact">contact</a> pour un cadrage entreprise.',
  },
];

/** FAQ — formation L'IA au service du bâtiment (BTP-01) */
export const FAQ_BATIMENT: FAQItem[] = [
  {
    q: "Quels comptes IA pour cette formation (niveau débutant) ?",
    a: `${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} Page formation : <a href="/formations/ia-au-service-du-batiment">L'IA au service du bâtiment</a>.`,
  },
  {
    q: "Qui peut suivre la formation « L'IA au service du bâtiment » ?",
    a: 'Artisans, dirigeants et équipes de PME du bâtiment, conducteurs et chargés d\'affaires, assistants administratifs. Aucun prérequis technique — nous partons de vos cas réels (devis, emails, CR). Complétez avec <a href="/ia-devis-batiment">IA devis bâtiment</a> et <a href="/formation-ia-artisans-btp">ChatGPT entreprises BTP</a>.',
  },
  {
    q: "Proposez-vous plusieurs durées de session ?",
    a: 'Non : toutes nos sessions d\'accompagnement catalogue sont calibrées sur 4 heures. La différence se joue sur le niveau (débutant ou avancé) et le forfait par participant, pas sur la durée — voir le <a href="/formations">catalogue</a>.',
  },
  {
    q: "La formation est-elle finançable ?",
    a: 'Oui, 100 % finançable par l\'OPCO Constructys (et autres OPCO selon éligibilité) pour les entreprises du BTP. Formation certifiée Qualiopi — attestation en fin de parcours. Détails : <a href="/financement-constructys-formation-ia-btp">financement 100 %</a>.',
  },
];

/** FAQ — formation L'IA au service des Travaux Publics */
/** FAQ landing SEO — formation IA travaux publics (page dédiée) */
export const FAQ_FORMATION_IA_TRAVAUX_PUBLICS_LANDING: FAQItem[] = [
  {
    q: "Pourquoi une formation « IA travaux publics » plutôt qu'une formation bâtiment générique ?",
    a: 'Les enjeux TP (VRD, terrassement, enrobés, ouvrages d\'art, maître d\'ouvrage public, marchés publics) ne sont pas ceux du gros œuvre ou de la second œuvre. Les documents, délais et interlocuteurs diffèrent : une formation dédiée aligne les cas d\'usage et les prompts sur vos chantiers routes et réseaux — voir <a href="/formations/ia-travaux-publics">catalogue TP</a> et la page <a href="/formation-ia-travaux-publics">formation IA travaux publics</a>.',
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
    a: 'Nous proposons une session unique de 4 heures (niveau débutant), avec forfait par participant. Le programme condense consultations / DCE, documents de chantier et bases d\'industrialisation (templates, assistants) — <a href="/formations/ia-travaux-publics">programme travaux publics</a>.',
  },
];

export const FAQ_TRAVAUX_PUBLICS: FAQItem[] = [
  {
    q: "Quels outils IA sont prévus pour le niveau débutant ?",
    a: `${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} Voir <a href="/formations/ia-travaux-publics">formation IA travaux publics</a>.`,
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
    q: "Où se déroule la formation IA BTP ?",
    a: 'En présentiel dans vos locaux ou en salle en Île-de-France : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Melun, Saint-Denis, et les départements 75, 77, 78, 91, 92, 93, 94, 95. Sessions adaptées à votre équipe — <a href="/formations">catalogue formations IA BTP</a> et <a href="/formation-ia-btp-ile-de-france">Île-de-France</a>.',
  },
  {
    q: "La formation est-elle finançable ?",
    a: 'Oui, 100 % finançable OPCO Constructys pour les entreprises du BTP. Devis personnalisé sous 24h — <a href="/financement-constructys-formation-ia-btp">financement 100 %</a> et <a href="/contact">contact</a>.',
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
    a: 'Copiez chaque prompt dans ChatGPT, remplacez les parties entre crochets par vos informations (métier, client, contexte). Les prompts sont prêts à l\'emploi pour devis, emails, CR chantier — prolongez avec une <a href="/formations">formation IA BTP</a> (Qualiopi).',
  },
  {
    q: "La formation IA BTP est-elle finançable ?",
    a: 'Oui, 100 % finançable par l\'OPCO Constructys pour les entreprises du BTP. Formation Qualiopi, devis personnalisé sous 24h — <a href="/financement-constructys-formation-ia-btp">guide Constructys</a>.',
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
    a: 'Oui. Les prompts sont conçus pour ChatGPT mais fonctionnent avec Mistral, Claude, Gemini ou Perplexity. La structure reste identique — voir aussi <a href="/formations/ia-architecture-claude-dpgf">IA architecture Claude & DPGF</a>.',
  },
  {
    q: "La formation est-elle finançable ?",
    a: `Oui. Formation IA BTP 100 % finançable Constructys. Prenez rendez-vous pour un devis personnalisé : <a href="${CALENDLY_BOOKING_URL}" rel="noopener noreferrer">Calendly</a> ou <a href="/contact">contact</a>.`,
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
    a: 'Basée à Guyancourt (78), j\'interviens en <a href="/formation-ia-btp-ile-de-france">Île-de-France</a> : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Évry-Courcouronnes, Melun, Saint-Denis, et l\'ensemble des départements 75, 77, 78, 91, 92, 93, 94, 95. Formations en présentiel (inter ou intra-entreprise).',
  },
  {
    q: "Comment financer ma formation IA BTP ?",
    a: '100 % finançable par l\'OPCO Constructys pour les entreprises du BTP. Nous vous accompagnons pour monter le dossier et respecter les délais — <a href="/financement-constructys-formation-ia-btp">financement 100 % IA BTP</a> et <a href="/formations">catalogue</a>.',
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
    a: 'Oui. OFC Création d\'Entreprise est certifié Qualiopi. Toutes nos formations IA BTP sont éligibles au financement OPCO Constructys — voir le <a href="/formations">catalogue formations</a>.',
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
    a: 'Oui, 100 % finançable OPCO Constructys pour les entreprises du BTP. Prenez rendez-vous pour un devis personnalisé — <a href="/prendre-rdv">prendre rendez-vous</a> et <a href="/formations">catalogue</a>.',
  },
  {
    q: "Comment accéder aux formations IA BTP ?",
    a: 'Catalogue des formations sur laureolivie.fr : page <a href="/formations">formations IA BTP</a>. Formations en présentiel en Île-de-France : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Melun, Saint-Denis, et les départements 75, 77, 78, 91, 92, 93, 94, 95 — voir <a href="/formation-ia-btp-ile-de-france">Île-de-France</a>. Devis personnalisé via <a href="/contact">contact</a>.',
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
    a: 'Île-de-France : <a href="/formations/ia-btp-paris">Paris</a>, Versailles, Nanterre, Créteil, Cergy-Pontoise, Évry-Courcouronnes, Melun, Saint-Denis, et l\'ensemble des départements 75, 77, 78, 91, 92, 93, 94, 95. Formations en présentiel (inter ou intra-entreprise) — <a href="/formations">catalogue</a> et <a href="/formation-ia-btp-ile-de-france">formation IA BTP Île-de-France</a>.',
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
    a: `Prenez rendez-vous pour un échange de 30 minutes : <a href="${CALENDLY_BOOKING_URL}" rel="noopener noreferrer">Calendly</a> ou <a href="/prendre-rdv">prendre rendez-vous</a>. Nous identifions ensemble vos besoins et vous envoyons un devis personnalisé sous 24h.`,
  },
  {
    q: "L'IA peut-elle vraiment m'aider sur mes devis et emails ?",
    a: 'Oui. Les professionnels du BTP gagnent en moyenne 3 à 5h/semaine en automatisant devis, emails, CR chantier et appels d\'offres avec ChatGPT — voir <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a> et <a href="/formations/ia-appels-offre-btp">appels d\'offres IA</a>.',
  },
];
