import {
  formationIaMetierBtpMetadata,
  FORMATION_IA_METIER_ELECTRICIEN,
} from '@/lib/formation-ia-metier-btp-config';
import { FormationIaMetierBtpLanding } from '@/components/formation-ia-metier/FormationIaMetierBtpLanding';

export const metadata = formationIaMetierBtpMetadata(FORMATION_IA_METIER_ELECTRICIEN);

export default function FormationIaElectricienBtpPage() {
  return <FormationIaMetierBtpLanding config={FORMATION_IA_METIER_ELECTRICIEN} />;
}
