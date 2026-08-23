import { LINKS } from '@/lib/internal-links';
import type { DepartementPageData } from '@/lib/departement-pages/types';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';

export const DEPARTEMENT_SEINE_ET_MARNE_77: DepartementPageData = {
  code: '77',
  nom: 'Seine-et-Marne',
  article: 'la',
  prepositionLocative: 'en',
  path: '/formation-ia-btp-seine-et-marne-77',
  slug: 'seine-et-marne-77',
  accroche:
    "Formation IA pour le BTP en présentiel en Seine-et-Marne (77), intra-entreprise, dans vos locaux, sur vos devis et dossiers réels. Le 77 est le plus vaste département francilien : la session est pensée pour des équipes parfois dispersées entre l'ouest urbain (Marne-la-Vallée, Sénart, Melun, Meaux) et l'est plus étendu.",
  villes: [
    'Melun',
    'Meaux',
    'Chelles',
    'Pontault-Combault',
    'Champs-sur-Marne (Cité Descartes)',
    'Savigny-le-Temple (Sénart)',
    'Bussy-Saint-Georges (Marne-la-Vallée)',
  ],
  tempsTrajetGuyancourt:
    "Depuis Guyancourt, l'ouest du 77 (Marne-la-Vallée, Sénart, Melun, Meaux) est en général accessible sous 30 à 45 minutes selon le trafic ; l'est (Provins, Coulommiers, Fontainebleau, Nemours) mobilise plutôt une journée bloquée ou des demi-journées — temps indicatifs, confirmés au devis.",
  tissuLocal:
    "Territoire à deux visages : péri-urbain dense à l'ouest (Marne-la-Vallée / Val d'Europe, Sénart, Melun Val de Seine, Pays de Meaux) et plus rural à l'est. Forte présence du pavillonnaire, de la rénovation, de la logistique et des travaux publics / VRD liés à l'étalement et aux infrastructures. Les marchés publics des intercommunalités (Melun Val de Seine, Marne et Gondoire, Paris-Vallée de la Marne, Grand Paris Sud) pèsent sur la charge documentaire des PME. Axes A4, A5, A6, Francilienne (N104), RER A / D / E : les équipes jonglent entre chantier et bureau sur de longues distances. La session s'adapte à cette géographie : documents réels, validation métier, pas de modèle hors sol.",
  casUsageLocaux: [
    "Accélérer la rédaction de devis de maison individuelle et de rénovation (notes terrain → devis structuré, vous validez le chiffrage).",
    "Centraliser les comptes rendus de chantiers éloignés à partir de notes vocales, pour ne plus perdre l'information entre deux sites du 77.",
  ],
  faqLocale: [
    {
      q: "Vous déplacez-vous jusqu'à Melun, Meaux ou Marne-la-Vallée ?",
      a: "Oui, en intra dans vos locaux partout en Seine-et-Marne. Pour l'ouest du département (Sénart, Val d'Europe), la logistique est courante ; pour l'est (Provins, Coulommiers, Fontainebleau), on cadre souvent une journée dédiée ou des demi-journées.",
    },
    {
      q: 'Le 77 étant étendu, y a-t-il des frais de déplacement ?',
      a: 'Les modalités (déplacement, repas) sont précisées au devis après le RDV découverte — sans surprise, avant convention. L’est du département peut justifier une journée bloquée selon la distance depuis Guyancourt.',
    },
    {
      q: 'Combien de participants par session ?',
      a: "Jusqu'à 12 pour le niveau 1, effectifs réduits pour les niveaux avancés — selon le programme catalogue choisi. Idéal pour une équipe chantier + support d’une PME seine-et-marnaise.",
    },
  ],
  metierPertinent: {
    href: LINKS.iaDevis,
    label: 'IA devis bâtiment',
    description: 'Chiffrage et notes terrain — adapté au pavillonnaire et à la rénovation du 77.',
  },
  metaTitle: buildIdfDeptPageTitle('Seine-et-Marne', '77'),
  metaDescription: buildDeptMetaDescription('Seine-et-Marne', '77', 'Melun, Meaux'),
  keywords: [
    'formation IA appliquée au bâtiment 77',
    'formation ChatGPT Seine-et-Marne',
    'formation IA Melun',
    'formation IA Meaux',
  ],
};
