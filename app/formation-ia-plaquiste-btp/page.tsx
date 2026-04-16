import {
  formationIaMetierBtpMetadata,
  FORMATION_IA_METIER_PLAQUISTE,
} from '@/lib/formation-ia-metier-btp-config';
import { FormationIaMetierBtpLanding } from '@/components/formation-ia-metier/FormationIaMetierBtpLanding';

export const metadata = formationIaMetierBtpMetadata(FORMATION_IA_METIER_PLAQUISTE);

export default function FormationIaPlaquisteBtpPage() {
  return <FormationIaMetierBtpLanding config={FORMATION_IA_METIER_PLAQUISTE} />;
}
