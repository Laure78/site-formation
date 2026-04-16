import {
  formationIaMetierBtpMetadata,
  FORMATION_IA_METIER_MENUISIER,
} from '@/lib/formation-ia-metier-btp-config';
import { FormationIaMetierBtpLanding } from '@/components/formation-ia-metier/FormationIaMetierBtpLanding';

export const metadata = formationIaMetierBtpMetadata(FORMATION_IA_METIER_MENUISIER);

export default function FormationIaMenuisierBtpPage() {
  return <FormationIaMetierBtpLanding config={FORMATION_IA_METIER_MENUISIER} />;
}
