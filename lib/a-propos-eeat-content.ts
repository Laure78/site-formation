/**
 * Contenu E-E-A-T — page /a-propos (Expertise, Expérience, Autorité, Trustworthiness).
 */
import { getStatsFreshnessLabel } from '@/lib/constants';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import {
  getLaureOlivieEeatIntro,
  LAURE_OLIVIE_CHATGPT_PRO_MODULES,
  LAURE_OLIVIE_CLIENT_REFERENCES,
  LAURE_OLIVIE_EXPERTISE_TAGLINE,
  LAURE_OLIVIE_FORMATION_THEMES,
  LAURE_OLIVIE_IA_TOOLS,
  LAURE_OLIVIE_PARCOURS_TIMELINE,
  LAURE_OLIVIE_PROMPTS_DELIVERY,
  LAURE_OLIVIE_USE_CASES,
} from '@/lib/laure-olivie-profile';

export const A_PROPOS_EEAT_INTRO = getLaureOlivieEeatIntro();

export const A_PROPOS_EXPERTISE_PARAGRAPHS = [
  LAURE_OLIVIE_EXPERTISE_TAGLINE,
  `Mon expertise combine **la direction d'entreprise BTP** (ALIA BTP, travaux publics et revêtements, 2017-2024), **la gestion de formations professionnelles** (CNFPT Grande Couronne, 2009-2019) et une **spécialisation IA générative** depuis 2022 (${LAURE_OLIVIE_IA_TOOLS.join(', ')}). J'accompagne conducteurs de travaux, dirigeants de PME, équipes support et bureaux d'études sur des problématiques réelles : structurer un devis, rédiger un CR, analyser un CCTP ou DCE, préparer un mémoire technique, un DOE ou un PPSPS.`,
  `En **2017-2018**, j'ai amorcé la transition vers la formation professionnelle en parallèle de la direction d'entreprise. **OFC Création d'Entreprise** a été structurée juridiquement en **2022** ; la certification **Qualiopi** (NDA ${SCHEMA_CONTACT.nda}) a été obtenue en **2023**, avec renouvellement valide **jusqu'en janvier 2028**. Les sujets couverts aujourd'hui : **devis et chiffrage**, **appels d'offres et DCE**, **administratif chantier** (CR, PPSPS, relances), **productivité IA** et **bonnes pratiques confidentialité** pour les données entreprise.`,
  `Contrairement à une formation « tech » généraliste, je parle le langage du chantier : lots, planning, sous-traitants, DPGF, mémoire technique, relances maître d'ouvrage. Chaque module est calibré sur des livrables que vous produisez déjà — pas sur des cas fictifs de startup. Les participants repartent avec des **prompts réutilisables**, une **check-list de relecture**, des **modèles de comptes rendus** adaptés à leur entreprise et ${LAURE_OLIVIE_PROMPTS_DELIVERY.toLowerCase()}`,
  `Mon rôle n'est pas de vendre un outil, mais de **sécuriser l'adoption** : quelles données anonymiser, quand passer en version Enterprise, comment documenter un usage interne pour la direction et les équipes terrain. C'est cette double compétence — métier BTP et pédagogie Qualiopi — qui fait la différence sur le taux d'application à J+30.`,
] as const;

export const A_PROPOS_OFFRE_FORMATIONS = LAURE_OLIVIE_FORMATION_THEMES;

export const A_PROPOS_OFFRE_OUTILS = LAURE_OLIVIE_IA_TOOLS;

export const A_PROPOS_OFFRE_CAS_USAGE = LAURE_OLIVIE_USE_CASES;

export const A_PROPOS_OFFRE_CLIENTS = LAURE_OLIVIE_CLIENT_REFERENCES;

export const A_PROPOS_TIMELINE = LAURE_OLIVIE_PARCOURS_TIMELINE;

export const A_PROPOS_AUTORITE_PARAGRAPHS = [
  `Parcours terrain BTP : conductrice de travaux et direction d'entreprise (ALIA BTP, 2017-2024), puis structuration d'**OFC Création d'Entreprise** en 2022 — organisme certifié **Qualiopi** (NDA ${SCHEMA_CONTACT.nda}, SIRET ${SCHEMA_CONTACT.siretFormatted}). Les sessions restent en **présentiel, Île-de-France uniquement**, sur documents réels (DCE, devis, CR, mémoire technique).`,
  `**Instructrice officielle LinkedIn Learning** — cours publics vérifiables sur ChatGPT et l'IA appliquée au bâtiment, complémentaires aux formations OFC sur site ou en salle partenaire.`,
  `Interventions et références auprès de **FFB Grand Paris**, **CSFE**, **UMB-FFB**, **CNAM Entreprise**, **Lefebvre Dalloz** et **CAPEB** — cadres de confiance pour des sessions finançables **Constructys** selon éligibilité.`,
  `Indicateurs consolidés (${getStatsFreshnessLabel()}) : **${formatNoteSatisfactionAffichageComplet()}**. Les retours portent sur le gain de temps administratif, la clarté des livrables et la montée en compétence sans jargon — preuve sociale alignée sur le profil LinkedIn public.`,
] as const;

export const A_PROPOS_CLIENTS_INTRO = `Mes clients et partenaires couvrent l'écosystème BTP francilien : fédérations professionnelles qui référencent l'organisme, OPCO qui instruisent les dossiers, PME qui montent en compétence en intra, et bureaux d'études qui cherchent à accélérer la production documentaire sans sacrifier la qualité technique. Chaque collaboration est construite sur des **objectifs pédagogiques explicites**.`;

export const A_PROPOS_MISSION = {
  mission: 'Transformer la productivité BTP par l\'IA opérationnelle',
  approach: '100 % terrain, zéro théorie inutile',
  philosophy: 'L\'IA pour laisser les professionnels du BTP et les équipes faire du métier',
  paragraphs: [
    `Ma mission : **transformer la productivité BTP par l'IA opérationnelle** — pas par des promesses marketing. Chaque session vise des gains mesurables sur CR, devis, mails et dossiers marchés, avec relecture humaine systématique.`,
    `Mon approche : **100 % terrain, zéro théorie inutile**. Environ 70 % de pratique sur vos documents réels. Vous repartez avec des prompts calibrés « vocabulaire BTP » et un protocole de relecture.`,
    `Ma philosophie : **l'IA pour laisser les professionnels du BTP faire du métier**. L'outil structure, reformule, accélère — il ne signe pas, ne constate pas sur le chantier et ne négocie pas à votre place.`,
    `Concrètement, une session type alterne démonstration, pratique guidée et plan d'action individuel. Je refuse les slides « histoire de l'IA » : on ouvre ChatGPT ou Claude, on charge un CCTP anonymisé, on produit un livrable, on le relit ensemble. C'est cette exigence qui explique le taux de recommandation élevé entre pairs BTP.`,
  ],
} as const;

export const A_PROPOS_CERTIFICATIONS_INTRO = `Transparence totale sur l'organisme et les labels : OFC Création d'Entreprise est une SASU immatriculée, déclarée auprès de la DREETS et certifiée Qualiopi. Les formations respectent le référentiel national qualité ; les participants reçoivent attestation, évaluation à chaud et supports réutilisables. Je maintiens une veille active auprès des éditeurs d'IA (OpenAI, Anthropic, Google, Mistral) pour intégrer les évolutions sans déstabiliser les équipes.`;

export const A_PROPOS_CONTACT_INTRO = `Pour un premier échange, réservez un créneau Calendly (visio 30 min, sans engagement) ou écrivez-moi directement. Je réponds sous 48 h ouvrées avec une proposition adaptée : session inter catalogue, intra sur site, ou parcours sur mesure pour votre métier (conducteur de travaux, dirigeant de TPE/PME, bureau d'études). Les dossiers Constructys peuvent être montés en amont si votre entreprise est éligible.`;

export const A_PROPOS_TRUST_PARAGRAPH = `Côté confiance (Trustworthiness) : pas de promesse de « remplacement du métier », pas de collecte de données chantier sensibles pendant les démos, et rappel systématique de la relecture humaine sur tout livrable contractuel. Les conventions précisent objectifs, durée, tarif et modalités d'évaluation — conformément au référentiel Qualiopi et aux règles de TVA applicables aux formations intra-entreprise (exonération art. 261-4-4° CGI).`;

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
    detail: 'Parcours OpenAI, Anthropic (Claude), Google, Mistral — veille continue',
  },
  {
    label: 'Master Stratégie d\'entreprise',
    detail: 'CNAM Paris — 2021',
  },
  {
    label: 'Formation ChatGPT Pro',
    detail: `${LAURE_OLIVIE_CHATGPT_PRO_MODULES.join(' · ')} (2024)`,
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
    items: ['FFB Grand Paris', 'FFB Île-de-France (78, 91, 95)', 'FFB Île-de-France Est', 'CAPEB', 'CSFE'],
  },
  {
    title: 'OPCO & financement',
    items: ['Constructys (BTP)', 'Dossiers eGestion', 'Sessions intra finançables selon éligibilité'],
  },
  {
    title: 'Entreprises du BTP',
    items: ['PME gros œuvre et second œuvre', 'TPE & PME spécialisées', 'Conducteurs de travaux et équipes support'],
  },
  {
    title: 'Bureaux d\'études & grands comptes formation',
    items: ['CNAM Entreprise (Île-de-France)', 'Lefebvre Dalloz', 'Bureaux d\'études structure et fluides'],
  },
] as const;
