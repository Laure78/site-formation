import {
  formationIaMetierBtpMetadata,
  FORMATION_IA_METIER_CHARPENTIER,
} from '@/lib/formation-ia-metier-btp-config';
import { FormationIaMetierBtpLanding } from '@/components/formation-ia-metier/FormationIaMetierBtpLanding';

export const metadata = formationIaMetierBtpMetadata(FORMATION_IA_METIER_CHARPENTIER);

export default function FormationIaCharpentierBtpPage() {
  return <FormationIaMetierBtpLanding config={FORMATION_IA_METIER_CHARPENTIER} />;
}
