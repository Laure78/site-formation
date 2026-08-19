/**
 * Visuels BeWork — page présentation laureolivie.fr/bework (site officiel : bework.fr).
 */

export type BeworkPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

/** Visuel hero — schéma plateforme centrale et connexion logiciels BTP */
export const BEWORK_PHOTO_HERO: BeworkPhoto = {
  src: '/images/bework/bework-plateforme-centrale-connecter-logiciels-btp.gif',
  alt: 'Schéma BeWork — plateforme BTP centrale reliant chantiers, GED, finance et logiciels existants',
  width: 800,
  height: 800,
  caption: 'Une plateforme centrale. Vos outils autour. Des informations qui circulent.',
};

/** Galerie — assistants travaux par usage métier */
export const BEWORK_GALLERY_SECTIONS: {
  id: string;
  title: string;
  intro: string;
  photos: BeworkPhoto[];
}[] = [
  {
    id: 'suivi-chantier',
    title: 'Suivi de chantier & coordination',
    intro:
      'Tableaux de bord, comptes rendus et tâches — dans un environnement conçu autour de vos méthodes.',
    photos: [
      {
        src: '/images/bework/assistante-suivi-chantier-tableau.png',
        alt: 'Assistante BeWork avec casque devant un tableau de suivi de chantier BTP',
        width: 768,
        height: 512,
        caption: 'Suivi de chantier — tâches, échéances et statuts',
      },
      {
        src: '/images/bework/assistante-suivi-chantier-casque.png',
        alt: 'Assistante BeWork au casque, prise de notes sur un suivi de chantier BTP',
        width: 1024,
        height: 682,
        caption: 'Coordination et reporting chantier',
      },
      {
        src: '/images/bework/assistante-suivi-chantier-notes.png',
        alt: 'Assistante BeWork avec casque micro, notes sur suivi de chantier BTP',
        width: 1024,
        height: 682,
        caption: 'Coordination documentaire sur la plateforme',
      },
    ],
  },
  {
    id: 'bureau-chantier',
    title: 'Bureau et chantier reliés',
    intro:
      'Plans, consignes et dossiers : solutions IA pour faire circuler l’information entre bureau et chantier.',
    photos: [
      {
        src: '/images/bework/assistante-plan-installation-chantier.png',
        alt: 'Assistante BeWork au bureau avec plan d’installation de chantier et consignes EPI BTP',
        width: 768,
        height: 512,
        caption: 'Plan d’installation de chantier & consignes sécurité',
      },
      {
        src: '/images/bework/assistante-rehabilitation-batiment.png',
        alt: 'Assistante BeWork devant affiche réhabilitation bâtiment, planning et coordination BTP',
        width: 768,
        height: 512,
        caption: 'Réhabilitation bâtiment — planning, sécurité, qualité',
      },
      {
        src: '/images/bework/assistante-rehabilitation-chantier-casque.png',
        alt: 'Assistante BeWork avec casque, affiche chantier réhabilitation bâtiment BTP',
        width: 1024,
        height: 682,
        caption: 'Coordination documentaire chantier',
      },
      {
        src: '/images/bework/assistante-regles-or-chantier.png',
        alt: 'Assistante BeWork au poste, règles d’or sécurité chantier et plateforme IA BTP',
        width: 768,
        height: 512,
        caption: 'Sécurité chantier & outils IA sur la plateforme',
      },
    ],
  },
  {
    id: 'planning-reporting',
    title: 'Planning & comptes rendus',
    intro:
      'Plannings, CR et reporting — outils simples, validés par vos équipes.',
    photos: [
      {
        src: '/images/bework/coordination-planning-chantier-bureau.png',
        alt: 'Assistante BeWork, planning chantier et coordination intervenants BTP au bureau',
        width: 1024,
        height: 576,
        caption: 'Planning chantier & gestion des intervenants',
      },
      {
        src: '/images/bework/coordination-planning-chantier-poste.png',
        alt: 'Assistante BeWork au casque, coordination planning et suivi échéances chantier BTP',
        width: 1024,
        height: 682,
        caption: 'Suivi des échéances et coordination',
      },
      {
        src: '/images/bework/coordination-reporting-comptes-rendus.png',
        alt: 'Assistante BeWork, coordination chantier et comptes rendus avec photos BTP',
        width: 1024,
        height: 576,
        caption: 'Suivi, reporting & comptes rendus',
      },
      {
        src: '/images/bework/planning-chantier-gantt.png',
        alt: 'BeWork — service planning de chantier BTP avec diagramme de Gantt et assistante',
        width: 1024,
        height: 682,
        caption: 'Planning de chantier — Gantt et organisation',
      },
    ],
  },
  {
    id: 'maitre-oeuvre',
    title: 'Maître d’œuvre & marchés travaux',
    intro:
      'Marchés publics, privés ou accords-cadres : analyse documentaire et suivi collaboratif selon votre besoin.',
    photos: [
      {
        src: '/images/bework/guide-maitre-oeuvre-moe.png',
        alt: 'BeWork guide maître d’œuvre MOE BTP, plateforme IA sur chantier',
        width: 1024,
        height: 576,
        caption: 'Guide maître d’œuvre — marchés travaux BTP',
      },
      {
        src: '/images/bework-relais-administratif-chantier-support.webp',
        alt: 'Collaboratrice BeWork au casque, plateforme interne marchés travaux BTP',
        width: 1024,
        height: 629,
        caption: 'Support déploiement plateforme',
      },
      {
        src: '/images/bework-hero-bureau-chantier-plans.png',
        alt: 'Collaboratrice BeWork au bureau avec plans et casque BTP, documents chantier',
        width: 1024,
        height: 576,
        caption: 'Bureau-chantier — plans et dossiers travaux',
      },
    ],
  },
];
