import {
  FormationIaBtpDepartementLanding,
  formationIaBtpDeptMetadata,
} from '@/components/formation-ia-btp/FormationIaBtpDepartementLanding';
import { FORMATION_IA_BTP_SEINE_SAINT_DENIS_93 } from '@/lib/formation-ia-btp-departements-config';

// ISR : HTML mis en cache au edge et revalidé toutes les heures (3600 s)
export const revalidate = 3600;

export const metadata = formationIaBtpDeptMetadata(FORMATION_IA_BTP_SEINE_SAINT_DENIS_93);

export default function FormationIaBtpSeineSaintDenis93Page() {
  return <FormationIaBtpDepartementLanding config={FORMATION_IA_BTP_SEINE_SAINT_DENIS_93} />;
}
