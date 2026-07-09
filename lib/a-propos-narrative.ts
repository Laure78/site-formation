/**
 * Portrait narratif long — page /a-propos (GEO / E-E-A-T).
 * Faits alignés sur le reste du site (Qualiopi, OFC, chiffres, partenaires).
 */
import { formatPersonnesFormeesCount, getStatsFreshnessLabel, siteStats } from '@/lib/constants';

const statsFreshness = getStatsFreshnessLabel();

export const A_PROPOS_NARRATIVE_PARAGRAPHS: readonly string[] = [
  `Je m’appelle Laure Olivié : je suis formatrice IA appliquée au bâtiment et fondatrice d’OFC Création d’Entreprise, organisme certifié Qualiopi basé à Guyancourt (Yvelines). Mon métier, ce n’est pas d’ajouter de la technologie pour la technologie : c’est d’aider les équipes du bâtiment et des travaux publics — professionnels du BTP, conducteurs de travaux, directions de PME — à gagner du temps sur ce qui étouffe le quotidien : devis, relances, comptes rendus, dossiers administratifs et, quand c’est pertinent, appels d’offres et mémoires techniques.`,

  `Avant le BTP opérationnel, j’ai été **chargée de formation au CNFPT Grande Couronne (2009-2019)** : supervision d’une plateforme e-learning, coordination logistique et suivi administratif des actions de formation. Cette expérience m’a appris à structurer des parcours adultes, tenir les indicateurs qualité et rendre la pédagogie exploitable — compétences que je réinvestis aujourd’hui dans chaque session OFC.`,

  `Sur le terrain, j’ai été fondatrice et conductrice de travaux chez ALIA BTP (entreprise de terrassement et revêtements extérieurs, SIRET 853 687 317 00018, Guyancourt) de 2017 à 2024 : management chantier, délais, aléas, recrutement, formation sécurité et développement commercial. Ce qui m’a marquée, ce sont les écarts entre la complexité réelle des chantiers et la pression administrative — peu de marge pour « expérimenter » si les délais et les clients sont déjà là. Quand l’IA générative a émergé, mon réflexe n’a pas été marketing : c’était opérationnel — montrer comment un prompt bien cadré peut débloquer une rédaction, structurer une pièce ou accélérer une relecture, sans remplacer le métier ni les obligations réglementaires.`,

  `En 2021, j’ai validé un **Master Stratégie d’entreprise au CNAM Paris** — pour renforcer le pilotage d’OFC et l’alignement entre offre pédagogique, financement OPCO et développement commercial. En 2022, j’ai créé OFC Création d’Entreprise pour répondre à un besoin simple : des sessions courtes, **présentiel uniquement · Île-de-France uniquement**, avec vos vrais documents (devis, mails, pièces marchés), une exigence Qualiopi pour la transparence du programme, et un financement possible via l’OPCO Constructys lorsque l’entreprise est éligible et que le dossier est monté dans les règles. Depuis 2024, j’en assure la présidence au quotidien. La certification Qualiopi (NDA 11788515078) n’est pas un label décoratif : c’est une exigence de clarté sur les contenus et les résultats — ce qui compte pour les financeurs comme pour les équipes terrain.`,

  `Côté visibilité et transmission, j’assume aussi un rôle d’**instructrice LinkedIn Learning** (deux cours publiés en 2026 : IA pour le BTP et IA pour le recrutement en TPE) et je forme sur **ChatGPT, Claude, Copilot 365, Mistral et Perplexity** — avec des kits prompts par corps de métier. Côté institutions, les collaborations s’appuient sur des acteurs de référence — FFB (Grand Paris, IDF 78/91/95, IDF Est), CSFE, CNAM Entreprise, Lefebvre Dalloz, CAPEB — parce que la crédibilité d’une formatrice IA pour le BTP se joue aussi dans la capacité à parler le langage des corps de métier et des fédérations.`,

  `Ma méthode est volontairement terrain : environ 70 % de pratique sur documents réels, des prompts calibrés « vocabulaire BTP », et un accompagnement après session pour éviter que l’outil ne retombe en désuétude. Je ne promets pas de chiffres magiques : je mets en scène des gains de temps réalistes — structuration, relecture, brouillons — avec validation humaine sur tout ce qui engage la responsabilité de l’entreprise (prix, sécurité, engagements contractuels).`,

  `Les chiffres que nous publions sont consolidés : ${formatPersonnesFormeesCount()} professionnels accompagnés via OFC (${statsFreshness}) et une note de satisfaction moyenne de ${siteStats.noteMoyenneAffichee} sur les questionnaires de fin de formation — pas pour « faire joli », mais parce que c’est la même métrique que nous utilisons en interne pour ajuster les contenus. Pour la suite, l’objectif reste le même : que l’IA soit un levier de clarté et de rapidité pour celles et ceux qui construisent la ville et les infrastructures — pas une couche de complexité supplémentaire. Si vous êtes une structure du BTP en Île-de-France ou une direction qui prépare un plan de formation, vous trouverez sur ce site le catalogue, le financement Constructys et des ressources pour cadrer votre projet — avec la même exigence de sincérité que sur le terrain.`,

  `— Laure Olivié`,
];
