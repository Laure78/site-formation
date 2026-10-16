export type {
  FormationIaApplicationsBundle,
  FormationIaNiveauPedagogique,
  FormationIaUsage,
  IaFonctionnaliteId,
  IaOutil,
} from '@/lib/formation-ia/types';
export {
  FORMATION_IA_CONFIDENTIALITE_NOTE,
  FORMATION_IA_METHOD_CYCLE,
  FORMATION_IA_METHOD_INTRO,
} from '@/lib/formation-ia/method-cycle';
export {
  getIaFonctionnalite,
  IA_FONCTIONNALITES_VERIFIEES,
  labelOutil,
} from '@/lib/formation-ia/features-verified';
export {
  getFormationIaApplications,
  listFormationIaApplicationCodes,
} from '@/lib/formation-ia/usages-catalogue';
export { getModule2027IaUsage } from '@/lib/formation-ia/usages-modules-2027';
