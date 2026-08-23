import { LINKS } from '@/lib/internal-links';
import type { DepartementPageData } from '@/lib/departement-pages/types';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';

export const DEPARTEMENT_VAL_DOISE_95: DepartementPageData = {
  code: '95',
  nom: "Val-d'Oise",
  article: 'le',
  prepositionLocative: 'dans le',
  path: '/formation-ia-btp-val-doise-95',
  slug: 'val-doise-95',
  accroche:
    "Formation IA pour le BTP en présentiel dans le Val-d'Oise (95), intra-entreprise, dans vos locaux. Entre Cergy-Pontoise et le pôle aéroportuaire de Roissy, le nord-ouest francilien a ses propres logiques de chantier, de logistique et d'équipes parfois éloignées — la session s'appuie sur vos documents pour réduire le temps bureau.",
  villes: [
    'Cergy',
    'Pontoise',
    'Argenteuil',
    'Sarcelles',
    'Garges-lès-Gonesse',
    'Franconville',
    'Ermont',
    'Goussainville',
  ],
  tempsTrajetGuyancourt:
    "Depuis Guyancourt, Cergy-Pontoise est à environ 45 minutes à une heure selon le trafic (temps indicatifs) ; le secteur Roissy / Goussainville se cadre au devis, souvent en journée dédiée ou demi-journées. Argenteuil, Franconville et Ermont se planifient typiquement en demi-journée.",
  tissuLocal:
    "Le 95 associe un tissu de PME du bâtiment, des opérations résidentielles autour de Cergy-Pontoise et une forte composante logistique / aéroportuaire au nord, souvent synonyme de chantiers dispersés. Axes A15, A115, Francilienne nord : les conducteurs et le support jonglent entre sites, avec des trajets qui mangent déjà la journée. Beaucoup de structures n'ont pas de fonction admin dédiée et cherchent à industrialiser le récurrent (devis, relances, CR) sans recruter. Argenteuil, Sarcelles et le corridor Franconville–Ermont partagent les mêmes frictions bureau / terrain. La formation pose une méthode courte, Qualiopi, avec validation humaine systématique. Les exemples d'atelier s'ajustent au mix local — pavillonnaire, logements collectifs, équipements et contraintes de planning liées au Grand Roissy.",
  casUsageLocaux: [
    "Réduire le temps passé sur les devis et l'administratif pour les PME sans support dédié — besoin fréquent dans le Val-d'Oise.",
    "Coordonner l'information de chantiers éloignés (Cergy ↔ Roissy) via des CR générés depuis des notes vocales — relecture avant envoi.",
  ],
  faqLocale: [
    {
      q: 'Vous déplacez-vous à Cergy-Pontoise ou vers Roissy ?',
      a: "Oui, en intra dans vos locaux, partout dans le Val-d'Oise — Argenteuil, Sarcelles et Goussainville inclus. Le créneau et les frais éventuels se cadrent au devis.",
    },
    {
      q: 'Une PME sans service administratif peut-elle en tirer parti ?',
      a: "C'est précisément la cible : automatiser le récurrent pour libérer du temps bureau, sans perdre le contrôle des prix et des engagements. En 4 h, on pose des prompts sur vos modèles de devis et de relances.",
    },
    {
      q: 'La formation est-elle finançable ?',
      a: 'Possible via Constructys ou votre OPCO, selon votre statut et les conditions en vigueur — financement OPCO possible selon éligibilité, jamais présenté comme acquis.',
    },
  ],
  metierPertinent: {
    href: LINKS.iaDevis,
    label: 'IA devis bâtiment',
    description: "Devis et administratif PME — besoin fréquent dans le Val-d'Oise.",
  },
  metaTitle: buildIdfDeptPageTitle("Val-d'Oise", '95'),
  metaDescription: buildDeptMetaDescription("Val-d'Oise", '95', 'Cergy, Pontoise et Argenteuil'),
  keywords: [
    "formation IA pour les pros du BTP 95",
    "formation ChatGPT Val-d'Oise",
    'formation IA Cergy',
    'formation IA Argenteuil',
  ],
};
