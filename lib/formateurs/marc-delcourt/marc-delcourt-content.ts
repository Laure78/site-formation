/**
 * Contenu éditorial — fiche `/formateurs/marc-delcourt` (vérifié, sans invention).
 */
import type { FAQItem } from '@/lib/faq';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import {
  filterLinksWhenParcoursMetiersHidden,
  isParcoursMetiers2027Visible,
} from '@/lib/parcours-metiers-2027-visibility';

export const MARC_DELCOURT_SLUG = 'marc-delcourt' as const;

export const MARC_DELCOURT_PATH = `/formateurs/${MARC_DELCOURT_SLUG}` as const;

export const MARC_DELCOURT_METADATA = {
  title: 'Marc Delcourt | Formateur gestion PME BTP – Île-de-France',
  description:
    'Marc Delcourt, ancien dirigeant de travaux publics pendant 15 ans. Formations gestion PME BTP, prix de revient et trésorerie en Île-de-France.',
} as const;

export const MARC_DELCOURT_EN_BREF =
  'Marc Delcourt est formateur pour OFC Création d’Entreprise (marque commerciale Laure Olivié), organisme certifié Qualiopi. Ancien dirigeant de travaux publics (15 ans), il accompagne les PME du bâtiment sur le prix de revient, les marges et la trésorerie — présentiel en Île-de-France.';

export const MARC_FORMATIONS_SECTION_ID = 'marc-formations' as const;

export const MARC_EXPERTISE_CARDS = [
  {
    key: 'prix',
    title: 'Prix de revient et chiffrage',
    body: 'Identifier les coûts directs et indirects, comprendre les composantes du prix de revient et construire des prix de vente cohérents.',
  },
  {
    key: 'marges',
    title: 'Rentabilité et pilotage des marges',
    body: 'Comprendre les écarts entre les coûts prévisionnels et les coûts réels afin de mieux éclairer les décisions de gestion.',
  },
  {
    key: 'tresorerie',
    title: 'Trésorerie et pilotage financier',
    body: 'Anticiper les décalages entre les dépenses de chantier et les encaissements clients.',
  },
] as const;

export const MARC_PUBLIC_CIBLE = [
  'Dirigeants de PME du bâtiment et des travaux publics',
  'Chargés d’affaires',
  'Responsables administratifs et financiers',
  'Responsables de gestion',
  'Collaborateurs amenés à participer au pilotage économique d’une PME du BTP',
] as const;

const MARC_MAILLAGE_ALL = [
  { href: LINKS.formateurs, label: 'Nos formateurs' },
  { href: LINKS.parcoursDirigeantPmeBtp, label: 'Parcours dirigeant de PME BTP' },
  { href: LINKS.iaDevis, label: 'Formation IA devis et chiffrage' },
  { href: LINKS.formations, label: 'Catalogue des formations' },
  { href: LINKS.financement, label: 'Financement Constructys' },
  { href: LINKS.aPropos, label: 'Présentation de l’organisme' },
] as const;

export const MARC_MAILLAGE = filterLinksWhenParcoursMetiersHidden(MARC_MAILLAGE_ALL);

export function getMarcDelcourtFaqItems(): readonly FAQItem[] {
  return [
    {
      q: 'Qui est Marc Delcourt ?',
      a: 'Marc Delcourt est un formateur spécialisé dans la direction et la gestion des PME du BTP. Ancien dirigeant d’une entreprise de travaux publics pendant 15 ans, il intervient notamment sur les problématiques de prix de revient, de marges et de trésorerie.',
    },
    {
      q: 'Quelles formations propose Marc Delcourt ?',
      a: isParcoursMetiers2027Visible()
        ? 'Deux formations sont prévues à l’ouverture 2027 : calculer ses prix de revient et fixer ses prix de vente (module DIR-01), ainsi qu’organiser sa trésorerie et anticiper ses besoins (module DIR-03).'
        : 'Marc Delcourt intervient sur les thématiques de gestion des PME du BTP : prix de revient, marges et trésorerie. Consultez le catalogue des formations ou échangez en visio pour cadrer votre besoin.',
    },
    {
      q: 'Pourquoi se former au calcul des prix de revient dans le BTP ?',
      a: 'Le calcul du prix de revient permet de mieux connaître les coûts d’une prestation ou d’un chantier, de construire un prix de vente cohérent et d’évaluer sa rentabilité prévisionnelle.',
    },
    {
      q: 'Où se déroulent les formations ?',
      a: 'Les formations sont prévues en présentiel en Île-de-France, en inter-entreprises et en intra-entreprise dans les locaux de l’entreprise.',
    },
    {
      q: 'Quel organisme propose ces formations ?',
      a: 'Les formations sont proposées par OFC Création d’Entreprise, dont Laure Olivié est la marque commerciale. L’organisme est certifié Qualiopi au titre des actions de formation.',
    },
    {
      q: 'Une prise en charge par Constructys est-elle possible ?',
      a: `${FINANCEMENT_FORMULATION_PRUDENTE} Voir le <a href="${LINKS.financement}">guide financement Constructys</a> pour les conditions applicables.`,
    },
  ];
}