/**
 * Contenu E-E-A-T — page /a-propos (Expertise, Expérience, Autorité, Trustworthiness).
 */
import { SOCIAL_PROOF, formatPersonnesFormeesCount, getStatsFreshnessLabel } from '@/lib/constants';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import {
  getLaureOlivieEeatIntro,
  LAURE_OLIVIE_CLIENT_REFERENCES,
  LAURE_OLIVIE_PARCOURS_TIMELINE,
} from '@/lib/laure-olivie-profile';

export const A_PROPOS_EEAT_INTRO = getLaureOlivieEeatIntro();

export const A_PROPOS_EXPERTISE_PARAGRAPHS = [
  `Mon expertise combine **la direction d'entreprise BTP** (ALIA BTP, travaux publics et revêtements, 2017-2024), **la gestion de formations professionnelles** (CNFPT Grande Couronne, 2009-2019) et une **spécialisation IA générative** depuis 2022 (ChatGPT, Claude, Copilot 365, Mistral, Perplexity). J'accompagne conducteurs de travaux, dirigeants de PME, équipes support et bureaux d'études sur des problématiques réelles : structurer un devis, rédiger un CR, analyser un CCTP ou DCE, préparer un mémoire technique, un DOE ou un PPSPS.`,
  `En **2017-2018**, j'ai amorcé la transition vers la formation professionnelle en parallèle de la direction d'entreprise. **OFC Création d'Entreprise** a été structurée juridiquement en **2022** ; la certification **Qualiopi** (NDA ${SCHEMA_CONTACT.nda}) a été obtenue en **2023**, avec renouvellement valide **jusqu'en janvier 2028**. Les sujets couverts aujourd'hui : **devis et chiffrage**, **appels d'offres et DCE**, **administratif chantier** (CR, PPSPS, relances), **productivité IA** et **bonnes pratiques confidentialité** pour les données entreprise.`,
  `Contrairement à une formation « tech » généraliste, je parle le langage du chantier : lots, planning, sous-traitants, DPGF, mémoire technique, relances maître d'ouvrage. Chaque module est calibré sur des livrables que vous produisez déjà — pas sur des cas fictifs de startup. Les participants repartent avec des **prompts réutilisables**, une **check-list de relecture** et des **modèles de comptes rendus** adaptés à leur entreprise.`,
  `Mon rôle n'est pas de vendre un outil, mais de **sécuriser l'adoption** : quelles données anonymiser, quand passer en version Enterprise, comment documenter un usage interne pour la direction et les équipes terrain. C'est cette double compétence — métier BTP et pédagogie Qualiopi — qui fait la différence sur le taux d'application à J+30.`,
] as const;

export const A_PROPOS_TIMELINE = LAURE_OLIVIE_PARCOURS_TIMELINE;

export const A_PROPOS_AUTORITE_PARAGRAPHS = [
  `OFC Création d'Entreprise est **organisme de formation référencé FFB Grand Paris** depuis 2020 et intervient régulièrement avec la **FFB Île-de-France**, la **CSFE** (Chambre Syndicale de l'Étanchéité), **CNAM Entreprise** et **Lefebvre Dalloz**. Ces partenariats ne sont pas des logos décoratifs : ce sont des cadres de confiance pour des sessions finançables **Constructys** selon éligibilité.`,
  `Les chiffres consolidés (${getStatsFreshnessLabel()}) : **${formatPersonnesFormeesCount()} professionnels formés**, note moyenne **${SOCIAL_PROOF.AVERAGE_RATING}** sur les questionnaires Qualiopi en fin de session. Je suis **instructrice officielle LinkedIn Learning** (cours IA BTP en français). Les retours **Google** et les réservations **Calendly** complètent cette preuve sociale — des dirigeants et conducteurs de travaux qui reviennent en intra ou recommandent la session à leur réseau.`,
  `Les retours les plus fréquents portent sur le **gain de temps immédiat** (5 à 8 h par semaine sur l'administratif), la **clarté des comptes rendus** et la **montée en compétence progressive** sans jargon. Les fédérations apprécient un contenu opérationnel, finançable et mesurable — critères que je documente dans chaque convention et bilan de fin de session.`,
  `En tant qu'**instructrice LinkedIn Learning**, mes cours en ligne sont publics, vérifiables et complètent les sessions OFC en présentiel. Cette double présence — plateforme internationale et terrain Île-de-France — renforce la crédibilité pour les entreprises qui hésitent encore entre « buzz IA » et outil utile au quotidien.`,
] as const;

export const A_PROPOS_CLIENTS_INTRO = `Mes clients et partenaires couvrent l'écosystème BTP francilien : fédérations professionnelles qui référencent l'organisme, OPCO qui instruisent les dossiers, PME qui montent en compétence en intra, et bureaux d'études qui cherchent à accélérer la production documentaire sans sacrifier la qualité technique. Chaque collaboration est construite sur des **objectifs pédagogiques explicites** et un **suivi post-formation** adapté au niveau du groupe.`;

export const A_PROPOS_MISSION = {
  mission: 'Transformer la productivité BTP par l\'IA opérationnelle',
  approach: '100 % terrain, zéro théorie inutile',
  philosophy: 'L\'IA pour laisser les artisans et les équipes faire du métier',
  paragraphs: [
    `Ma mission : **transformer la productivité BTP par l'IA opérationnelle** — pas par des promesses marketing. Chaque session vise des gains mesurables sur CR, devis, mails et dossiers marchés, avec relecture humaine systématique.`,
    `Mon approche : **100 % terrain, zéro théorie inutile**. Environ 70 % de pratique sur vos documents réels. Vous repartez avec des prompts calibrés « vocabulaire BTP » et un protocole de relecture.`,
    `Ma philosophie : **l'IA pour laisser les artisans faire du métier**. L'outil structure, reformule, accélère — il ne signe pas, ne constate pas sur le chantier et ne négocie pas à votre place.`,
    `Concrètement, une session type alterne démonstration, pratique guidée et plan d'action individuel. Je refuse les slides « histoire de l'IA » : on ouvre ChatGPT ou Claude, on charge un CCTP anonymisé, on produit un livrable, on le relit ensemble. C'est cette exigence qui explique la note **${SOCIAL_PROOF.AVERAGE_RATING}** et le taux de recommandation élevé entre pairs BTP.`,
  ],
} as const;

export const A_PROPOS_CERTIFICATIONS_INTRO = `Transparence totale sur l'organisme et les labels : OFC Création d'Entreprise est une SASU immatriculée, déclarée auprès de la DREETS et certifiée Qualiopi. Les formations respectent le référentiel national qualité ; les participants reçoivent attestation, évaluation à chaud et supports réutilisables. Je maintiens une veille active auprès des éditeurs d'IA (OpenAI, Anthropic, Google) pour intégrer les évolutions sans déstabiliser les équipes.`;

export const A_PROPOS_CONTACT_INTRO = `Pour un premier échange, réservez un créneau Calendly (visio 30 min, sans engagement) ou écrivez-moi directement. Je réponds sous 48 h ouvrées avec une proposition adaptée : session inter catalogue, intra sur site, ou parcours sur mesure pour votre métier (conducteur de travaux, artisan, bureau d'études). Les dossiers Constructys peuvent être montés en amont si votre entreprise est éligible.`;

export const A_PROPOS_TRUST_PARAGRAPH = `Côté confiance (Trustworthiness) : pas de promesse de « remplacement du métier », pas de collecte de données chantier sensibles pendant les démos, et rappel systématique de la relecture humaine sur tout livrable contractuel. Les conventions précisent objectifs, durée, tarif et modalités d'évaluation — conformément au référentiel Qualiopi et aux règles de TVA applicables aux formations (intra exonérée art. 261-4-4° CGI ; inter non applicable art. 293 B).`;

export const A_PROPOS_CERTIFICATIONS = [
  {
    label: 'Qualiopi',
    detail: 'Certification actions de formation — validité janvier 2028',
  },
  {
    label: 'SIRET OFC',
    detail: SCHEMA_CONTACT.siretFormatted,
  },
  {
    label: 'NDA',
    detail: SCHEMA_CONTACT.nda,
  },
  {
    label: 'Formations éditeurs IA',
    detail: 'Parcours OpenAI, Anthropic (Claude) et Google — veille continue',
  },
  {
    label: 'Master Stratégie d\'entreprise',
    detail: 'CNAM Paris — 2021',
  },
  {
    label: 'Formation ChatGPT Pro',
    detail: 'OpenAI — automatisation & contenu LinkedIn (2024)',
  },
  {
    label: 'LinkedIn Learning',
    detail: 'Instructrice officielle — 2 cours IA BTP publiés (2026)',
  },
  {
    label: 'Activateur France Num',
    detail: 'Accompagnement numérique TPE/PME',
  },
] as const;

export const A_PROPOS_CLIENTS_CATEGORIES = [
  {
    title: 'Fédérations BTP',
    items: ['FFB Grand Paris', 'FFB Île-de-France (78, 91, 95)', 'FFB Île-de-France Est', 'CSFE'],
  },
  {
    title: 'OPCO & financement',
    items: ['Constructys (BTP)', 'Dossiers eGestion', 'Sessions intra finançables selon éligibilité'],
  },
  {
    title: 'Entreprises du BTP',
    items: ['PME gros œuvre et second œuvre', 'Artisans spécialisés', 'Conducteurs de travaux et équipes support'],
  },
  {
    title: 'Bureaux d\'études & grands comptes formation',
    items: ['CNAM Entreprise', 'Lefebvre Dalloz', 'Bureaux d\'études structure et fluides'],
  },
] as const;
