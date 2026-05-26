/**
 * Landing `/formation-ia-conducteur-travaux` — métadonnées, FAQ, prompts, JSON-LD.
 */
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import {
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';

export const FORMATION_IA_CONDUCTEUR_TRAVAUX_PATH = '/formation-ia-conducteur-travaux' as const;

export const FORMATION_IA_CONDUCTEUR_TRAVAUX_SEO = {
  title: 'Formation IA conducteur de travaux BTP — Gain 5h/semaine',
  titleAbsolute: 'Formation IA conducteur de travaux BTP — Gain 5h/semaine',
  description:
    'Formation conducteurs travaux. Automatiser CR, PPSPS, suivi chantier. Qualiopi, Constructys. Découverte gratuite.',
  h1: "Formation IA pour conducteurs de travaux BTP — Gagnez 5h/semaine",
  calendlyCtaLabel: 'Visio découverte conducteur de travaux — 30 min gratuit',
} as const;

export const CONDUCTEUR_TRAVAUX_USE_CASES = [
  {
    title: 'Générer un CR depuis une dictée vocale',
    body: 'Dictez vos notes en quittant la réunion de chantier (app ChatGPT ou Claude sur smartphone). L’IA structure participants, avancement par lot, actions et réserves — 1 h 30 → 15 min.',
  },
  {
    title: 'Structurer un PPSPS ou un DUERP',
    body: 'À partir de vos données entreprise et du type de chantier, l’IA propose les 8 chapitres réglementaires du PPSPS ou les unités de travail DUERP — relecture SST obligatoire avant diffusion.',
  },
  {
    title: 'Rédiger des mails clients professionnels',
    body: 'Signalement d’aléa, demande de prolongation, réponse à une réclamation MOA/MOE : ton factuel, références contractuelles, demande de confirmation — 20 min → 3 min.',
  },
  {
    title: 'Analyser un avenant ou une clause CCTP',
    body: 'Extrayez en quelques minutes les impacts planning, financiers et interfaces lots sans relire 80 pages de DCE — utile avant réunion de cadrage ou négociation.',
  },
  {
    title: 'Créer un DOE assisté',
    body: 'Classez pièces par chapitre (8 lots types), détectez les manquants et générez la page de garde — le rangement physique et la validation MOE restent à votre charge.',
  },
  {
    title: 'Suivi matériel et outillage chantier',
    body: 'Tableaux de suivi engins, consommables et EPI à partir de vos listes Excel ou notes — relances sous-traitants et état des stocks en un prompt.',
  },
  {
    title: 'Rapports de réception et PV de réserves',
    body: 'Notes de visite ou photos commentées → PV structuré par lot, réserves datées, responsables et délais — 45 min → 10 min.',
  },
] as const;

export const PROMPT_CR = `Tu es conducteur de travaux sur un chantier de [type de chantier].

Voici mes notes brutes de la réunion du [date] (dictée vocale, abréviations acceptées) :
[Collez vos notes]

Rédige un CR de chantier structuré avec :
1. Participants
2. Avancement par lot
3. Points bloquants et actions (responsable + délai)
4. Réserves et non-conformités
5. Date de la prochaine réunion

Ton professionnel. Format standard CR de chantier BTP.`;

export const PROMPT_PPSPS = `Je suis conducteur de travaux pour [entreprise], chantier [nature] à [ville].

Données : [effectif moyen], [durée chantier], [lots principaux], [SST référent si connu].

Propose un plan PPSPS (8 chapitres réglementaires R4532-56 à R4532-77) adapté à ce chantier :
- organisation sécurité
- accès et circulation
- risques par phase de travaux
- EPI obligatoires
- consignes urgence

Format titres + puces. Indique [À COMPLÉTER] pour les zones à valider avec le coordinateur SPS.`;

export const PROMPT_EMAIL = `Tu es conducteur de travaux pour [entreprise],
marché [intitulé], maître d'ouvrage [nom].

Je dois signaler au maître d'œuvre :
[Décrivez l'aléa en 3 lignes : nature, date, impact planning]

Action attendue : [demande précise]

Rédige cet email en 150 à 200 mots. Ton professionnel et factuel. Demande de confirmation de lecture.`;

export const PROMPT_DOE = `Je suis conducteur de travaux — entreprise [nom], marché [intitulé], réception prévue [date].

Pièces disponibles : [liste : plans, PV essais, fiches techniques, DOE lots…]

Structure un DOE en 8 chapitres types BTP. Pour chaque chapitre :
- documents attendus
- statut (OK / manquant / à compléter)
- action corrective

Format tableau markdown. Maximum 2 pages.`;

export const CONDUCTEUR_TRAVAUX_FAQ = [
  {
    q: "L'IA peut-elle être utilisée depuis le chantier sur smartphone ?",
    a: "Oui. ChatGPT et Claude ont des applications iOS et Android. Cas d'usage le plus fréquent : dicter ses notes en route et envoyer le CR avant d'arriver au bureau.",
  },
  {
    q: 'Les CR et emails générés par l\'IA sont-ils valides contractuellement ?',
    a: "Ils ont la même valeur qu'un document rédigé par vous — après relecture et validation. La validation humaine reste indispensable sur tout document contractuel.",
  },
  {
    q: 'Peut-on former plusieurs CDT de la même entreprise en même temps ?',
    a: "Oui. Sessions intra jusqu'à 12 participants. Toute l'équipe partage les mêmes prompts et bonnes pratiques après la formation.",
  },
  {
    q: 'Faut-il déjà connaître ChatGPT ou Claude ?',
    a: "Non. La formation part de zéro. En 30 minutes, les participants comprennent le principe et testent sur leurs documents.",
  },
  {
    q: "L'IA comprend-elle le vocabulaire BTP (DTU, OS, DGD, CCTP…) ?",
    a: "Oui, avec le contexte métier dans le prompt — c'est ce que la formation enseigne systématiquement.",
  },
  {
    q: 'Combien de temps pour être opérationnel après la session ?',
    a: "Dès le lendemain. Les participants repartent avec prompts personnalisés ; la plupart produisent leur premier CR assisté dans la semaine.",
  },
  {
    q: 'La formation est-elle finançable Constructys ?',
    a: 'Oui, selon éligibilité et dossier eGestion (OFC certifié Qualiopi). Plafonds 24 € HT/h/participant, max 840 € HT/jour/groupe intra — détails dans la section financement ci-dessous.',
  },
] as const;

export function buildConducteurTravauxLandingJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const pageUrl = `${base}${FORMATION_IA_CONDUCTEUR_TRAVAUX_PATH}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${base}/#organization`,
        name: SCHEMA_ORGANIZATION_OFC.name,
        url: base,
      },
      {
        '@type': 'Person',
        '@id': `${base}/#person`,
        name: SCHEMA_PERSON_LAURE.name,
        jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
        url: base,
        sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
      },
      {
        '@type': 'Course',
        '@id': `${pageUrl}#course`,
        name: 'Formation IA pour conducteurs de travaux BTP',
        description:
          'Formation ChatGPT et Claude AI pour conducteurs de travaux : CR chantier, PPSPS, emails MOA/MOE, DOE, réception. Qualiopi. Financement possible selon éligibilité.',
        url: pageUrl,
        provider: { '@id': `${base}/#organization` },
        instructor: { '@id': `${base}/#person` },
        timeRequired: 'PT4H',
        educationalLevel: 'Beginner',
        offers: {
          '@type': 'Offer',
          price: String(TARIF_FORFAIT_DEBUTANT_HT),
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: buildSiteCalendlyCtaUrl('formation-ia-conducteur-travaux-schema-offer'),
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: ['onsite', 'online'],
          courseWorkload: 'PT4H',
          location: {
            '@type': 'Place',
            name: 'Île-de-France — intra ou inter, présentiel ou distanciel',
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'Île-de-France',
              addressCountry: 'FR',
            },
          },
        },
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'Conducteur de travaux BTP',
        },
      },
    ],
  };
}
