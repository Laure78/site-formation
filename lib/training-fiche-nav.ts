/**
 * Sommaire fiches formation — ancres stables (Qualiopi / UX type catalogue).
 */
import type { CatalogueNavItem } from '@/lib/catalogue-formation-page-content';

export const TRAINING_ANCHOR = {
  presentation: 'presentation',
  objectifs: 'objectifs',
  publicPrerequis: 'public-prerequis',
  programme: 'programme',
  modalitesPedagogiques: 'modalites-pedagogiques',
  evaluation: 'evaluation',
  atouts: 'atouts',
  informationsPratiques: 'informations-pratiques',
  formateurs: 'formateurs',
  sessions: 'sessions',
  avis: 'avis',
  financement: 'financement',
  faq: 'faq',
  applicationsIa: 'applications-ia',
} as const;

export type TrainingFicheNavInput = {
  hasPresentation?: boolean;
  hasObjectifs?: boolean;
  hasPublicPrerequis?: boolean;
  hasProgramme?: boolean;
  hasModalites?: boolean;
  hasSessions?: boolean;
  hasAvis?: boolean;
  hasFinancementOpcoEtendu?: boolean;
  hasFaq?: boolean;
  hasApplicationsIa?: boolean;
  /** Sections hors sommaire principal (atouts, formateurs, infos pratiques…). */
  hasAtouts?: boolean;
  hasInformationsPratiques?: boolean;
  hasFormateurs?: boolean;
  hasEvaluation?: boolean;
  faqSectionId?: string;
  extraItems?: readonly CatalogueNavItem[];
};

/** Navigation principale — ordre maquette GERESO / fiche programme. */
export function buildTrainingFicheNavItems(input: TrainingFicheNavInput): CatalogueNavItem[] {
  const items: CatalogueNavItem[] = [];
  const push = (href: string, label: string) => items.push({ href: `#${href}`, label });

  if (input.hasPresentation !== false) push(TRAINING_ANCHOR.presentation, 'Présentation');
  if (input.hasObjectifs !== false) push(TRAINING_ANCHOR.objectifs, 'Objectifs');
  if (input.hasPublicPrerequis) push(TRAINING_ANCHOR.publicPrerequis, 'Public et prérequis');
  if (input.hasProgramme !== false) push(TRAINING_ANCHOR.programme, 'Programme');
  if (input.hasModalites) push(TRAINING_ANCHOR.modalitesPedagogiques, 'Modalités');
  if (input.hasSessions !== false) push(TRAINING_ANCHOR.sessions, 'Sessions');
  if (input.hasAvis) push(TRAINING_ANCHOR.avis, 'Avis');

  if (input.hasApplicationsIa) push(TRAINING_ANCHOR.applicationsIa, 'Usages IA');
  if (input.hasFinancementOpcoEtendu) push(TRAINING_ANCHOR.financement, 'Financement');
  if (input.hasFaq && input.faqSectionId) push(input.faqSectionId, 'FAQ');

  if (input.extraItems?.length) {
    for (const extra of input.extraItems) {
      if (!items.some((i) => i.href === extra.href)) items.push(extra);
    }
  }
  return items;
}
