/**
 * Visuels illustratifs hub `/ressources` — photos générées (public/images/ressources/*.webp).
 * Ne pas présenter comme des photos d’événements ou de chantiers Laure Olivié.
 */
import { LINKS } from '@/lib/internal-links';
import type { RessourceMiniature } from '@/lib/ressources-miniatures';

const BASE = '/images/ressources';

export const RESSOURCES_HUB_HERO_PHOTO: RessourceMiniature = {
  src: `${BASE}/ressources-hub-hero-2026.webp`,
  alt: 'Professionnel du BTP sur chantier avec ordinateur portable — ressources IA gratuites pour le bâtiment',
  width: 1600,
  height: 900,
};

export const RESSOURCES_HUB_CTA_FORMATIONS_PHOTO: RessourceMiniature = {
  src: `${BASE}/formations-ia-btp-cta.webp`,
  alt: 'Équipe BTP consultant une tablette sur chantier — formation IA BTP présentiel Île-de-France',
  width: 1600,
  height: 900,
};

/** Couvertures cartes guides — clé = href canonique du guide. */
export const RESSOURCES_HUB_GUIDE_COVERS: Partial<Record<string, RessourceMiniature>> = {
  [LINKS.guideRepondreAoBtpOfc2026]: {
    src: `${BASE}/guide-appel-offres-ia-btp.webp`,
    alt: 'Conducteur de travaux avec plans et ordinateur sur chantier — guide appels d’offres IA BTP',
    width: 1600,
    height: 900,
  },
  [LINKS.guideConducteurTravauxIaBtp]: {
    src: `${BASE}/guide-conducteur-travaux-ia.webp`,
    alt: 'Conducteur de travaux casque et gilet avec ordinateur sur chantier — guide IA conduite de travaux',
    width: 1600,
    height: 900,
  },
  [LINKS.skillsClaudeBtp]: {
    src: `${BASE}/skills-claude-btp.webp`,
    alt: 'Professionnel BTP au bureau avec plans et ordinateur — skills Claude assistants métier BTP',
    width: 1600,
    height: 900,
  },
  [LINKS.charteIaBtp]: {
    src: `${BASE}/charte-ia-pme-batiment.webp`,
    alt: 'Responsable PME bâtiment au bureau avec plans — modèle charte IA entreprise BTP',
    width: 1600,
    height: 900,
  },
  [LINKS.guideDirigeantBtpOfc]: {
    src: `${BASE}/guide-dirigeant-btp-ia.webp`,
    alt: 'Dirigeant BTP au bureau, vue chantier — guide IA pilotage PME bâtiment',
    width: 1600,
    height: 900,
  },
  [LINKS.guideAssistantsTravauxOfc]: {
    src: `${BASE}/guide-assistants-travaux-ia.webp`,
    alt: 'Professionnel BTP au bureau avec plans et ordinateur — guide assistants travaux IA',
    width: 1600,
    height: 900,
  },
};

export function getRessourcesHubGuideCover(href: string): RessourceMiniature | undefined {
  return RESSOURCES_HUB_GUIDE_COVERS[href];
}
