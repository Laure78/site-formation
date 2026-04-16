import {
  FormationIaBtpDepartementLanding,
  formationIaBtpDeptMetadata,
} from '@/components/formation-ia-btp/FormationIaBtpDepartementLanding';
import { FORMATION_IA_BTP_VAL_DE_MARNE_94 } from '@/lib/formation-ia-btp-departements-config';

export const metadata = formationIaBtpDeptMetadata(FORMATION_IA_BTP_VAL_DE_MARNE_94);

export default function FormationIaBtpValDeMarne94Page() {
  return <FormationIaBtpDepartementLanding config={FORMATION_IA_BTP_VAL_DE_MARNE_94} />;
}
