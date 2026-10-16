/**
 * Intervenants confirmés — seuls profils exposés sur le site public.
 * Biographie Laure : reprendre exclusivement `lib/laure-olivie-profile` + photos officielles.
 */
import { LINKS } from '@/lib/internal-links';
import {
  LAURE_OLIVIE_BIO_REFERENCE,
  LAURE_OLIVIE_EXPERTISE_TAGLINE,
} from '@/lib/laure-olivie-profile';
import { PHOTOS } from '@/lib/photos';
import type { FormateurProfile } from '@/lib/formateurs/types';

const LAURE_PORTRAIT = PHOTOS.portraitPro2026;

/** Profil public confirmé — Laure Olivié (OFC). */
export const FORMATEUR_LAURE_OLIVIE: FormateurProfile = {
  id: 'laure-olivie',
  slug: 'laure-olivie',
  prenom: 'Laure',
  nom: 'Olivié',
  intitule: 'Formatrice IA spécialisée BTP',
  parcours: `${LAURE_OLIVIE_BIO_REFERENCE} ${LAURE_OLIVIE_EXPERTISE_TAGLINE}`,
  specialites: [
    'IA générative appliquée au BTP',
    'Devis, DCE et mémoires techniques',
    'Comptes rendus et documents de chantier',
    'Claude AI et ChatGPT pour les équipes BTP',
  ],
  domaineIds: [
    'direction',
    'commercial',
    'travaux',
    'management',
    'administration',
    'technique-qualite-prevention',
    'numerique-ia',
  ],
  formationCodes: [],
  animatesAllPublished: true,
  portrait: {
    kind: 'photo',
    src: LAURE_PORTRAIT.src,
    alt: LAURE_PORTRAIT.alt,
    width: LAURE_PORTRAIT.width,
    height: LAURE_PORTRAIT.height,
  },
  status: 'confirmed',
  profileHref: LINKS.aPropos,
};

/** Liste publique — ne jamais y ajouter de profils inventés. */
export const CONFIRMED_FORMATEURS: readonly FormateurProfile[] = [FORMATEUR_LAURE_OLIVIE];
