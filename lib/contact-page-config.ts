/**
 * Page `/contact` — contenu UX (source unique).
 */
import { CONTACT, IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { MODALITE_FORMATIONS_PRESENTIEL } from '@/lib/tarifs-sessions';
import { LINKS } from '@/lib/internal-links';

export const CONTACT_PAGE_H1 = 'Parlons de votre projet de formation IA BTP' as const;

export const CONTACT_PAGE_SUBTITLE =
  'Décrivez les profils à former, les tâches concernées et vos contraintes. Vous recevrez une réponse adaptée à votre projet.' as const;

export const CONTACT_PAGE_PROOF_LINE =
  'OFC certifié Qualiopi · Formations pour les professionnels du BTP · Île-de-France' as const;

export const CONTACT_PAGE_META_TITLE = 'Contact et devis formation IA BTP | Laure Olivié' as const;

export const CONTACT_PAGE_META_DESCRIPTION =
  'Demandez un devis ou réservez un échange pour une formation IA dédiée aux entreprises du BTP en Île-de-France.' as const;

export const CONTACT_FORM_TITLE = 'Décrivez votre projet' as const;

export const CONTACT_FORM_NEED_PLACEHOLDER =
  'Exemple : 6 conducteurs de travaux à former sur les comptes rendus, les CCTP et les courriers de chantier, dans les Yvelines.' as const;

export const CONTACT_FORM_SENSITIVE_HINT =
  'Ne transmettez pas de document confidentiel ou de donnée personnelle sensible dans ce formulaire.' as const;

export const CONTACT_FORM_RGPD_NOTICE =
  'Les informations transmises sont utilisées uniquement pour répondre à votre demande.' as const;

export const CONTACT_FORM_SUCCESS =
  'Votre demande a bien été envoyée. Je reviendrai vers vous après lecture de votre projet.' as const;

export const CONTACT_FORM_SUCCESS_CALENDLY =
  'Vous pouvez aussi réserver un échange si vous préférez présenter votre besoin oralement.' as const;

export const CONTACT_AFTER_SEND_STEPS = [
  'Réception et lecture de votre demande.',
  'Demande éventuelle de précisions si nécessaire.',
  'Envoi d’une proposition, d’un programme ou orientation vers un échange selon le besoin.',
] as const;

export const CONTACT_CALENDLY_TITLE = 'Vous préférez en parler directement ?' as const;

export const CONTACT_CALENDLY_TEXT =
  'Choisissez un créneau de 30 minutes pour présenter votre contexte et identifier la suite pertinente.' as const;

export const CONTACT_COORDINATES_INTRO =
  `Si vous préférez un contact direct, voici les coordonnées professionnelles. Formations en présentiel — ${IDF_ZONE_INTERVENTION}.` as const;

export const CONTACT_MODALITES_RESUME = MODALITE_FORMATIONS_PRESENTIEL;

export const CONTACT_RECLAMATION_LINE =
  'Vous souhaitez déposer une réclamation ? Consultez la procédure dédiée.' as const;

export const CONTACT_PATH_CARDS = [
  {
    id: 'devis',
    title: 'Vous avez déjà défini votre besoin',
    text: 'Transmettez les informations essentielles pour recevoir un devis et un programme adaptés.',
    cta: 'Remplir le formulaire',
    href: '?objet=devis#contact-form',
  },
  {
    id: 'rdv',
    title: 'Vous souhaitez être conseillé',
    text: 'Réservez un échange de 30 minutes pour identifier le parcours pertinent.',
    cta: 'Voir les créneaux',
    href: '#contact-calendly',
  },
] as const;

/** Email principal — aligné `lib/constants.ts` (source unique projet). */
export const CONTACT_PRIMARY_EMAIL = CONTACT.email;

export const CONTACT_PHONE = CONTACT.phone;
export const CONTACT_PHONE_DISPLAY = CONTACT.phoneDisplay;

export const CONTACT_LOCATION_LABEL = 'Guyancourt · Île-de-France' as const;

export const CONTACT_FOOTER_LINKS = [
  { href: LINKS.formations, label: 'Catalogue des formations IA BTP' },
  { href: LINKS.financement, label: 'Financement OPCO Constructys' },
  { href: LINKS.aPropos, label: 'À propos de Laure Olivié' },
] as const;
