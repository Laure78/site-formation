/**
 * FAQ par fiche parcours — complète le noyau commun sans dupliquer mot pour mot le hub.
 */
import type { ParcoursId } from '@/data/catalogue-2027';
import type { ParcoursComputed } from '@/data/catalogue-2027/parcours';
import { libellePrixParcoursCompletInter } from '@/lib/catalogue-2027/parcours-affichage';
import {
  PARCOURS_COMPLET_DISPONIBILITE_LIBELLE,
  PARCOURS_DISPONIBILITE_LIBELLE,
  PARCOURS_MODALITE_GEO,
} from '@/lib/catalogue-2027/parcours-commercial-copy';
import { PARCOURS_MODULARITE_DETAIL } from '@/lib/catalogue-2027/parcours-commercial-copy';
import { PARCOURS_TARIF_INTER_CALCULE_MENTION } from '@/lib/catalogue-2027/parcours-affichage';
import { TARIF_INTRA_LIBELLE } from '@/data/catalogue-2027/tarifs';

type FaqItem = { q: string; a: string };

const CORE: FaqItem[] = [
  {
    q: 'Quand ce parcours est-il disponible ?',
    a: `${PARCOURS_COMPLET_DISPONIBILITE_LIBELLE} ${PARCOURS_DISPONIBILITE_LIBELLE}`,
  },
  { q: 'Faut-il suivre tous les modules ?', a: PARCOURS_MODULARITE_DETAIL },
  { q: 'Où a lieu la formation ?', a: PARCOURS_MODALITE_GEO },
  {
    q: 'Comment est calculé le tarif ?',
    a: `Le tarif du parcours complet affiché en tête de fiche est la somme des modules obligatoires (120 €, 170 € ou 620 € HT / participant selon le niveau). Chaque carte module reprend son tarif unitaire. ${PARCOURS_TARIF_INTER_CALCULE_MENTION} Intra-entreprise : ${TARIF_INTRA_LIBELLE.toLowerCase()}.`,
  },
];

const METIER_FAQ: Record<ParcoursId, readonly FaqItem[]> = {
  'dirigeant-pme-btp': [
    {
      q: 'Quels sujets IA pour un dirigeant de PME BTP ?',
      a: 'Marges chantier, trésorerie, fixation des prix, relances et cadre d’usage de l’IA (données autorisées, validation des chiffres). Les modules DIR et COM/MAN du parcours couvrent ces priorités.',
    },
    {
      q: 'Ce parcours remplace-t-il un conseil en gestion ?',
      a: 'Non. Les ateliers sont des formations non certifiantes : vous produisez des grilles et outils de pilotage ; les décisions financières et juridiques restent de votre responsabilité.',
    },
  ],
  'charge-affaires-btp': [
    {
      q: 'L’IA peut-elle rédiger un mémoire technique à ma place ?',
      a: 'Elle aide à structurer et reformuler à partir de vos éléments ; vous validez le fond technique, les engagements et le prix. Les modules COM incluent mémoire technique, DCE et suivi d’affaires.',
    },
    {
      q: 'Ce parcours convient-il aux marchés publics de travaux ?',
      a: 'Oui pour l’analyse de DCE, la candidature et le mémoire technique — dans le respect de votre stratégie commerciale et sans promesse de gain d’appel d’offres.',
    },
  ],
  'conducteur-de-travaux': [
    {
      q: 'Quels livrables chantier sont travaillés ?',
      a: 'Planning, comptes rendus, préparation d’ouverture, coordination d’équipe et dossier de réception selon les modules choisis (codes TRA, AFF, etc.).',
    },
    {
      q: 'Peut-on ne prendre que le module planning ou CR ?',
      a: 'Oui, en module à la carte, sous réserve du positionnement indiqué sur la fiche module (souvent une initiation IA chantier préalable).',
    },
  ],
  'assistant-de-gestion-btp': [
    {
      q: 'Quels outils pour la facturation et les relances ?',
      a: 'Modèles de courriers, checklists et tableaux de suivi assistés par l’IA ; vous contrôlez les montants et les envois effectifs aux clients.',
    },
    {
      q: 'Y a-t-il un module Excel ou tableur ?',
      a: 'Les modules gestion incluent des exercices sur tableur et organisation documentaire ; le détail est précisé dans le programme de chaque carte module.',
    },
  ],
  'referent-ia-btp': [
    {
      q: 'Faut-il savoir coder pour le module application métier ?',
      a: 'Non pour l’usage courant : le module de prototype vise un livrable testé et documenté avec validation humaine, pas une mise en production sans accompagnement.',
    },
    {
      q: 'Claude ou ChatGPT : que couvre le parcours ?',
      a: 'Les modules NUM travaillent appels d’offres, Claude (projects/skills), et selon le module un prototype plus avancé. Les outils exacts sont indiqués dans chaque programme.',
    },
  ],
};

/** FAQ affichée + JSON-LD sur une fiche parcours. */
export function getParcoursMetierFaqForPage(
  id: ParcoursId,
  computed?: ParcoursComputed,
): readonly FaqItem[] {
  const core = CORE.map((item) => {
    if (item.q !== 'Comment est calculé le tarif ?' || !computed) return item;
    return {
      ...item,
      a: `Parcours complet sur cette fiche : ${libellePrixParcoursCompletInter(computed)}. ${item.a}`,
    };
  });
  return [...core, ...METIER_FAQ[id]];
}
