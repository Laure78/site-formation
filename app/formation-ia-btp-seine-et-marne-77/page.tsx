import {
  FormationIaBtpDepartementLanding,
  formationIaBtpDeptMetadata,
} from '@/components/formation-ia-btp/FormationIaBtpDepartementLanding';
import { FORMATION_IA_BTP_SEINE_ET_MARNE_77 } from '@/lib/formation-ia-btp-departements-config';

export const metadata = formationIaBtpDeptMetadata(FORMATION_IA_BTP_SEINE_ET_MARNE_77);

export default function FormationIaBtpSeineEtMarne77Page() {
  return <FormationIaBtpDepartementLanding config={FORMATION_IA_BTP_SEINE_ET_MARNE_77} />;
}
