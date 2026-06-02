/**
 * Formation IA pour les pro du BTP — Yvelines (78). Contenu long (~1 200–1 800 mots), liens internes dans le composant.
 * Schémas : Course, Service, BreadcrumbList, FAQPage. CTA sticky via layout racine.
 */
import {
  FormationIaBtpDepartementLanding,
  formationIaBtpDeptMetadata,
} from '@/components/formation-ia-btp/FormationIaBtpDepartementLanding';
import { FORMATION_IA_BTP_YVELINES_78 } from '@/lib/formation-ia-btp-departements-config';

// ISR : HTML mis en cache au edge et revalidé toutes les heures (3600 s)
export const revalidate = 3600;

export const metadata = formationIaBtpDeptMetadata(FORMATION_IA_BTP_YVELINES_78);

export default function FormationIaBtpYvelines78Page() {
  return <FormationIaBtpDepartementLanding config={FORMATION_IA_BTP_YVELINES_78} />;
}
