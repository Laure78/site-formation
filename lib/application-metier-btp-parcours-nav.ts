/**
 * Navigation et copy partagés — parcours « Applications métier BTP avec l’IA ».
 * Source unique pour fil d’Ariane, learning path et sections « Poursuivre le parcours ».
 */
import { LINKS } from '@/lib/internal-links';

export type ApplicationMetierStepIndex = 1 | 2 | 3;

export const APPLICATION_METIER_PARCOURS_MOTHER = {
  path: LINKS.parcoursApplicationsMetierBtp,
  backLabel: '← Voir le parcours complet',
  breadcrumbParcoursLabel: 'Parcours',
  breadcrumbMotherLabel: 'Applications métier BTP',
  linkCatalogueLabel: 'Voir le catalogue des formations IA BTP',
} as const;

export type ApplicationMetierParcoursStep = {
  step: ApplicationMetierStepIndex;
  ref: 'NIV-06' | 'NIV-07' | 'NIV-08';
  path: string;
  /** Ex. CONCEVOIR */
  shortLabel: string;
  /** Sous-titre learning path — ex. Créer le prototype */
  learningPathSubtitle: string;
  /** Ex. Niveau 1 sur 3 — CONCEVOIR */
  stepBadge: string;
  /** Titre carte page pilier */
  cardTitle: string;
  /** Texte carte page pilier */
  cardTeaser: string;
  /** CTA carte page pilier */
  decouvrirCta: string;
  /** Libellé fil d’Ariane — ex. Niveau 1 */
  breadcrumbLabel: string;
  /** Nav latérale précédente */
  prevNav?: { label: string; href: string; anchor: string };
  /** Nav latérale suivante */
  nextNav?: { label: string; href: string; anchor: string };
  /** Section fin de programme (niveaux 1 et 2) */
  poursuivre?: {
    title: string;
    text: string;
    primaryCta: string;
    primaryHref: string;
    primaryAnchor: string;
    secondaryCta: string;
    tertiaryLink?: { label: string; href: string; anchor: string };
  };
  /** Section fin de programme (niveau 3) */
  terminer?: {
    title: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    secondaryCampaign: string;
  };
};

export const APPLICATION_METIER_PARCOURS_STEPS: readonly ApplicationMetierParcoursStep[] = [
  {
    step: 1,
    ref: 'NIV-06',
    path: LINKS.formationApplicationMetierBtpNiveau1,
    shortLabel: 'CONCEVOIR',
    learningPathSubtitle: 'Créer le prototype',
    stepBadge: 'Niveau 1 sur 3 — CONCEVOIR',
    cardTitle: 'Créer sa première application métier BTP avec l’IA',
    cardTeaser: 'Transformer un besoin métier en prototype fonctionnel.',
    decouvrirCta: 'Découvrir le niveau 1 →',
    breadcrumbLabel: 'Niveau 1',
    nextNav: {
      label: 'Niveau 2 — Connecter →',
      href: LINKS.formationApplicationMetierBtpNiveau2,
      anchor: 'formation application métier BTP niveau 2',
    },
    poursuivre: {
      title: 'Poursuivre le parcours',
      text: 'Vous avez conçu votre prototype. L’étape suivante consiste à connecter les données, les utilisateurs et les services nécessaires au fonctionnement de votre application.',
      primaryCta: 'Passer au niveau 2 →',
      primaryHref: LINKS.formationApplicationMetierBtpNiveau2,
      primaryAnchor: 'développer une application métier BTP connectée',
      secondaryCta: 'Voir le parcours complet',
      tertiaryLink: {
        label: 'Découvrir le niveau 3',
        href: LINKS.formationApplicationMetierBtpNiveau3,
        anchor: 'application métier BTP avec intelligence artificielle',
      },
    },
  },
  {
    step: 2,
    ref: 'NIV-07',
    path: LINKS.formationApplicationMetierBtpNiveau2,
    shortLabel: 'CONNECTER',
    learningPathSubtitle: 'Connecter données et utilisateurs',
    stepBadge: 'Niveau 2 sur 3 — CONNECTER',
    cardTitle: 'Développer une application métier BTP connectée',
    cardTeaser:
      'Transformer le prototype en application connectée avec base de données, utilisateurs, workflows et services externes.',
    decouvrirCta: 'Découvrir le niveau 2 →',
    breadcrumbLabel: 'Niveau 2',
    prevNav: {
      label: '← Niveau 1 — Concevoir',
      href: LINKS.formationApplicationMetierBtpNiveau1,
      anchor: 'formation application métier BTP niveau 1',
    },
    nextNav: {
      label: 'Niveau 3 — Intégrer l’IA →',
      href: LINKS.formationApplicationMetierBtpNiveau3,
      anchor: 'application métier BTP avec intelligence artificielle',
    },
    poursuivre: {
      title: 'Poursuivre le parcours',
      text: 'Votre application dispose maintenant de données, d’utilisateurs et de workflows. Le niveau 3 permet d’y intégrer des fonctionnalités IA, des automatisations avancées et de préparer son déploiement.',
      primaryCta: 'Passer au niveau 3 →',
      primaryHref: LINKS.formationApplicationMetierBtpNiveau3,
      primaryAnchor: 'application métier BTP avec intelligence artificielle',
      secondaryCta: 'Voir le parcours complet',
    },
  },
  {
    step: 3,
    ref: 'NIV-08',
    path: LINKS.formationApplicationMetierBtpNiveau3,
    shortLabel: 'INDUSTRIALISER',
    learningPathSubtitle: 'Intégrer IA et automatisations',
    stepBadge: 'Niveau 3 sur 3 — INTÉGRER L’IA ET INDUSTRIALISER',
    cardTitle: 'Développer une application métier BTP avancée avec l’IA',
    cardTeaser:
      'Intégrer intelligence artificielle, automatisations, analyse documentaire et workflows métier.',
    decouvrirCta: 'Découvrir le niveau 3 →',
    breadcrumbLabel: 'Niveau 3',
    prevNav: {
      label: '← Revenir au niveau 2',
      href: LINKS.formationApplicationMetierBtpNiveau2,
      anchor: 'développer une application métier BTP connectée',
    },
    terminer: {
      title: 'Vous avez terminé les trois niveaux du parcours',
      text: 'Les trois niveaux permettent de passer progressivement du cadrage d’un besoin métier à une application connectée intégrant intelligence artificielle et automatisations.',
      primaryCta: 'Voir le parcours complet',
      secondaryCta: 'Échanger sur votre projet d’application métier',
      secondaryCampaign: 'application-metier-btp-niveau-3-parcours-termine',
    },
  },
] as const;

export function getApplicationMetierParcoursStepByRef(
  ref: 'NIV-06' | 'NIV-07' | 'NIV-08',
): ApplicationMetierParcoursStep {
  const found = APPLICATION_METIER_PARCOURS_STEPS.find((s) => s.ref === ref);
  if (!found) throw new Error(`Étape parcours inconnue: ${ref}`);
  return found;
}

export function getApplicationMetierParcoursStepByPath(path: string): ApplicationMetierParcoursStep | null {
  return APPLICATION_METIER_PARCOURS_STEPS.find((s) => s.path === path) ?? null;
}
