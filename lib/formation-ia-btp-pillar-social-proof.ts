import { LINKS } from '@/lib/internal-links';

/** Citations pilier — anonymisées ou institutionnelles vérifiables (pas de prénom inventé). */
export const FORMATION_IA_BTP_PILLAR_TESTIMONIALS = [
  {
    quote:
      '« Session très concrète : vocabulaire BTP, prompts réutilisables le lendemain sur les dossiers en cours — avec relecture humaine systématique. »',
    attribution: 'Participant — retour anonymisé (formation IA BTP, Île-de-France)',
  },
  {
    quote:
      '« Les équipes sont reparties avec une méthode partagée pour structurer devis, CR et courriers — sans promesse de gain chiffré garanti. »',
    attribution: 'Direction formation — partenaire fédération BTP (retour institutionnel)',
  },
] as const;

export const FORMATION_IA_BTP_PILLAR_ADMIN_TIME_LEAD =
  'D’après les retours en session, une part importante de la semaine de bureau part encore en tâches répétitives : comptes rendus, relances, préparation de devis, lecture de CCTP pour les appels d’offres. Un chargé d’affaires peut y consacrer plusieurs journées pour un seul mémoire technique — selon l’organisation et la complexité du marché.';

export const FORMATION_IA_BTP_PILLAR_RESULTS_TABLE_TITLE =
  'Gains observés en session (indicatifs)' as const;

export const FORMATION_IA_BTP_PILLAR_AVIS_CLIENTS_CTA = {
  href: LINKS.avisClients,
  label: 'Consulter les avis clients Google (formations IA BTP)',
} as const;
