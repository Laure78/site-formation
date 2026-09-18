import type { FAQItem } from '@/lib/faq';
import { getCatalogueFormationsCount } from '@/lib/formations-catalogue-display';
import { isFormationCataloguePublished } from '@/lib/formation-catalogue-visibility';
import { LINKS } from '@/lib/internal-links';

/** FAQ — page pilier /formation-ia-btp (alignée JSON-LD FAQPage) */
export function getFaqFormationIaBtpPillar(at: Date = new Date()): FAQItem[] {
  const count = getCatalogueFormationsCount(at);
  const includeNiv03 = isFormationCataloguePublished('NIV-03', at);

  return [
    {
      q: 'Qu’est-ce qu’une formation IA BTP ?',
      a:
        `Une session professionnelle en présentiel, certifiée Qualiopi, pour apprendre à utiliser Claude AI et ChatGPT sur vos documents BTP : devis, DCE, CCTP, comptes rendus, courriers. Travail sur vos cas réels, relecture humaine obligatoire. Voir le <a href="${LINKS.formations}">catalogue des ${count} formations</a>.`,
    },
    {
      q: 'Qu’est-ce qu’une formation IA bâtiment ?',
      a:
        'C’est la même intention : une formation en intelligence artificielle appliquée aux métiers du bâtiment (et des travaux publics). Chez OFC, « formation IA BTP » et « formation IA bâtiment » désignent des sessions concrètes sur devis, chantiers et appels d’offres — pas un cours théorique sur l’IA en général.',
    },
    {
      q: 'Quelle différence entre une formation IA généraliste et une formation IA spécialisée BTP ?',
      a:
        'Une formation IA généraliste parle souvent marketing, productivité bureau ou code. Une formation IA spécialisée BTP part de vos pièces de marché (DCE, CCTP, CCAP), de vos devis, de vos CR chantier et de votre vocabulaire métier. Les exercices portent sur vos documents ; le jugement technique et la signature restent humains.',
    },
    {
      q: 'Comment utiliser l’intelligence artificielle dans une entreprise du bâtiment ?',
      a:
        'En ciblant d’abord les tâches répétitives à faible valeur : structurer un devis, synthétiser un CCTP, rédiger un CR à partir de notes, préparer un brouillon de mémoire technique, formuler un courrier MOA/MOE. L’IA accélère la rédaction ; le chiffrage, les métrés et la responsabilité chantier restent sous contrôle de l’équipe.',
    },
    {
      q: 'Quels métiers du BTP peuvent utiliser l’IA ?',
      a:
        'Dirigeants et artisans de TPE/PME, conducteurs de travaux, chargés d’affaires, métreurs, assistants administratifs et de gestion, responsables formation, équipes appels d’offres. Le prérequis est de savoir utiliser un ordinateur et le français écrit — pas d’être développeur.',
    },
    {
      q: 'Quelle formation IA pour un conducteur de travaux ?',
      a: includeNiv03
        ? `Priorité aux CR chantier, PPSPS, courriers de réserves et synthèse CCTP. Voir la page <a href="${LINKS.formationIaConducteurDeTravaux}">formation IA conducteur de travaux</a> et la fiche catalogue <a href="${LINKS.formationConduiteTravauxSuiviChantier}">NIV-03</a>.`
        : `Priorité aux CR chantier, PPSPS, courriers de réserves et synthèse CCTP. Voir la page <a href="${LINKS.formationIaConducteurDeTravaux}">formation IA conducteur de travaux</a> et le <a href="${LINKS.formations}">catalogue</a>.`,
    },
    {
      q: 'Comment utiliser l’IA pour analyser un DCE, un CCTP ou un CCAP ?',
      a:
        `Vous chargez (ou collez) les extraits pertinents, demandez une synthèse des exigences, délais, pénalités et clauses à risque, puis vous validez point par point. Méthode détaillée : <a href="${LINKS.iaAnalyseDce}">analyser un DCE avec l’IA</a> et <a href="${LINKS.formationIaAppelsOffresBtp}">formation IA appels d’offres BTP</a>.`,
    },
    {
      q: 'Comment utiliser l’IA pour préparer un mémoire technique ou un appel d’offres BTP ?',
      a:
        'L’IA aide à structurer les parties communes (présentation entreprise, moyens humains, QSE), à croiser le CCTP avec votre offre, et à produire un brouillon à retravailler. Le chiffrage et l’engagement contractuel restent sous relecture humaine. Voir aussi la fiche NIV-02 au catalogue.',
    },
    {
      q: 'Comment utiliser ChatGPT dans le bâtiment ?',
      a:
        `ChatGPT sert surtout à la rédaction et à la structuration : devis type, emails, CR, brouillons de mémoire. Formation dédiée : <a href="${LINKS.formationChatgptBtp}">formation ChatGPT BTP</a>. Toujours anonymiser les données sensibles avant envoi.`,
    },
    {
      q: 'Comment utiliser Claude dans le BTP ?',
      a:
        `Claude (outil principal en session chez OFC) est adapté aux documents longs (DCE, CCTP) et aux Projects / Skills pour industrialiser des prompts métier. Guide : <a href="${LINKS.claudeAiBtp}">Claude AI BTP</a> · formation catalogue : <a href="${LINKS.formationMaitriserClaudeAiBtp}">Maîtriser Claude pour le BTP</a>.`,
    },
    {
      q: 'Faut-il être bon en informatique pour suivre cette formation ?',
      a:
        'Non. Savoir naviguer sur internet et utiliser un ordinateur ou une tablette suffit. Les outils fonctionnent en français naturel — vous écrivez comme à un collègue. Aucun prérequis technique pour le niveau 1 du catalogue.',
    },
    {
      q: 'Où se déroulent les sessions ?',
      a:
        `Sessions intra-entreprise, dans vos locaux — présentiel uniquement · Île-de-France uniquement. Détail par département sur <a href="${LINKS.formationIleDeFrance}">formation IA BTP Île-de-France</a>.`,
    },
    {
      q: 'Comment financer avec Constructys ou mon OPCO ?',
      a:
        `Les formations Qualiopi OFC peuvent faire l’objet d’une prise en charge Constructys ou OPCO selon votre statut, branche et barèmes en vigueur — jamais garantie à 100 %. Guide : <a href="${LINKS.financement}">financement Constructys formation IA BTP</a>.`,
    },
    {
      q: 'Quelle formation choisir : devis, appels d’offres ou chantier ?',
      a: includeNiv03
        ? `NIV-01 pour débuter (devis, emails, CR) ; NIV-02 pour les appels d’offres et mémoires techniques ; NIV-03 pour la conduite de travaux ; NIV-04 pour Claude AI. Comparatif sur <a href="${LINKS.formations}">le catalogue formations</a>.`
        : `NIV-01 pour débuter (devis, emails, CR) ; NIV-02 pour les appels d’offres et mémoires techniques ; NIV-04 pour Claude AI ; NIV-05 pour la maîtrise d’œuvre. Comparatif sur <a href="${LINKS.formations}">le catalogue formations</a>.`,
    },
    {
      q: 'L’IA va-t-elle remplacer les conducteurs de travaux ou les équipes terrain ?',
      a:
        'Non. L’IA accélère la rédaction et la mise en forme (CR, emails, brouillons de mémoire). Le jugement technique, la signature des documents et la responsabilité chantier restent humains.',
    },
  ];
}

/** @deprecated Préférer getFaqFormationIaBtpPillar() */
export const FAQ_FORMATION_IA_BTP_PILLAR: FAQItem[] = getFaqFormationIaBtpPillar();
