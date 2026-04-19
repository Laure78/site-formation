import {
  formationIaMetierBtpMetadata,
  FORMATION_IA_METIER_ASSISTANTE,
} from '@/lib/formation-ia-metier-btp-config';
import { FormationIaMetierBtpLanding } from '@/components/formation-ia-metier/FormationIaMetierBtpLanding';

export const metadata = formationIaMetierBtpMetadata(FORMATION_IA_METIER_ASSISTANTE);

export default function FormationIaAssistanteBtpPage() {
  return <FormationIaMetierBtpLanding config={FORMATION_IA_METIER_ASSISTANTE} />;
}
