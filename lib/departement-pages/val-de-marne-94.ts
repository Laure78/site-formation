import { LINKS } from '@/lib/internal-links';
import type { DepartementPageData } from '@/lib/departement-pages/types';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';

export const DEPARTEMENT_VAL_DE_MARNE_94: DepartementPageData = {
  code: '94',
  nom: 'Val-de-Marne',
  article: 'le',
  prepositionLocative: 'dans le',
  path: '/formation-ia-btp-val-de-marne-94',
  slug: 'val-de-marne-94',
  accroche:
    "Formation IA pour le BTP en présentiel dans le Val-de-Marne (94), intra-entreprise, dans vos locaux. Le sud-est francilien est traversé par les nouvelles lignes du Grand Paris Express : beaucoup d'opérations à coordonner, de résidences denses et de marchés mixtes public-privé autour de Créteil, Vitry, Ivry et Vincennes.",
  villes: [
    'Créteil',
    'Vincennes',
    'Vitry-sur-Seine',
    'Fontenay-sous-Bois',
    'Saint-Maur-des-Fossés',
    'Champigny-sur-Marne',
    'Ivry-sur-Seine',
    'Maisons-Alfort',
    'Nogent-sur-Marne',
  ],
  tempsTrajetGuyancourt:
    "Depuis Guyancourt, Créteil est à environ une heure selon le trafic (temps indicatifs) ; Vitry, Ivry, Vincennes et le bord de Marne se planifient au devis après l'échange découverte. Saint-Maur, Champigny et Nogent suivent le même schéma — demi-journée ou journée selon l'agenda chantier.",
  tissuLocal:
    "Le 94 mêle résidentiel dense, tertiaire et opérations liées aux infrastructures (extensions Grand Paris Express), avec un tissu actif de PME du bâtiment et de la conduite de travaux. Lisière parisienne : rénovation urbaine, marchés publics locaux, site occupé fréquent autour de Créteil, Vitry, Ivry et du bord de Marne. Axes A4, A86, périphérique sud-est : la pression sur les délais et la traçabilité (CR, observations, réserves) est constante. Beaucoup d'équipes cumulent plusieurs opérations simultanées sans assistant dédié à la production écrite. La formation aligne prompts, relecture et partage d'équipe sur vos modèles. Objectif : réduire le temps perdu entre le terrain et le bureau sans fragiliser la conformité des pièces remises au maître d'œuvre — méthode courte, documents réels, validation humaine systématique.",
  casUsageLocaux: [
    "Piloter le suivi de chantier avec l'IA : comptes rendus, suivi des observations, relances entreprises — adapté aux densités du Val-de-Marne.",
    'Préparer la réception et le suivi des réserves de façon structurée et traçable — sans perdre la validation humaine.',
  ],
  faqLocale: [
    {
      q: 'Intervenez-vous à Créteil et alentours ?',
      a: 'Oui, en intra dans vos locaux, partout dans le Val-de-Marne — Vitry, Ivry, Vincennes, Champigny et Maisons-Alfort inclus. Les délais depuis Guyancourt se précisent au devis.',
    },
    {
      q: "La formation aide-t-elle un conducteur de travaux au quotidien ?",
      a: 'Oui — un parcours dédié couvre la conduite de travaux, du CCTP à la réception et aux réserves. Sur le dense 94, c’est souvent le premier besoin exprimé en session découverte.',
    },
    {
      q: 'Faut-il des prérequis techniques ?',
      a: "Non : les outils s'utilisent en français courant ; on part de vos documents (CR types, grilles de réserves, mails récurrents), avec relecture métier systématique.",
    },
  ],
  metierPertinent: {
    href: LINKS.formationConduiteTravauxSuiviChantier,
    label: 'IA conduite de travaux & suivi chantier',
    description: 'CCTP, CR, réception — prioritaire sur le dense Val-de-Marne.',
  },
  metaTitle: buildIdfDeptPageTitle('Val-de-Marne', '94'),
  metaDescription: buildDeptMetaDescription(
    'Val-de-Marne',
    '94',
    'Créteil, Vincennes et Vitry-sur-Seine',
  ),
  keywords: [
    'formation IA pour le BTP 94',
    'formation ChatGPT Val-de-Marne',
    'formation IA Créteil',
    'formation IA Vitry',
  ],
};
