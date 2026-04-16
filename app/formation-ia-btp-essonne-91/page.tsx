import {
  FormationIaBtpDepartementLanding,
  formationIaBtpDeptMetadata,
} from '@/components/formation-ia-btp/FormationIaBtpDepartementLanding';
import { FORMATION_IA_BTP_ESSONNE_91 } from '@/lib/formation-ia-btp-departements-config';

export const metadata = formationIaBtpDeptMetadata(FORMATION_IA_BTP_ESSONNE_91);

export default function FormationIaBtpEssonne91Page() {
  return <FormationIaBtpDepartementLanding config={FORMATION_IA_BTP_ESSONNE_91} />;
}
