import {
  formationIaMetierBtpMetadata,
  FORMATION_IA_METIER_COUVREUR,
} from '@/lib/formation-ia-metier-btp-config';
import { FormationIaMetierBtpLanding } from '@/components/formation-ia-metier/FormationIaMetierBtpLanding';

export const revalidate = 3600;
export const metadata = formationIaMetierBtpMetadata(FORMATION_IA_METIER_COUVREUR);

export default function FormationIaCouvreurBtpPage() {
  return <FormationIaMetierBtpLanding config={FORMATION_IA_METIER_COUVREUR} />;
}
