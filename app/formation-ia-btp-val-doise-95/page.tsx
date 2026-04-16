import {
  FormationIaBtpDepartementLanding,
  formationIaBtpDeptMetadata,
} from '@/components/formation-ia-btp/FormationIaBtpDepartementLanding';
import { FORMATION_IA_BTP_VAL_DOISE_95 } from '@/lib/formation-ia-btp-departements-config';

export const metadata = formationIaBtpDeptMetadata(FORMATION_IA_BTP_VAL_DOISE_95);

export default function FormationIaBtpValDoise95Page() {
  return <FormationIaBtpDepartementLanding config={FORMATION_IA_BTP_VAL_DOISE_95} />;
}
