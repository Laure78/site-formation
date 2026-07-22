import type { Metadata } from 'next';
import {
  formationIaMetierBtpMetadata,
  FORMATION_IA_METIER_MACON,
} from '@/lib/formation-ia-metier-btp-config';
import { FormationIaMetierBtpLanding } from '@/components/formation-ia-metier/FormationIaMetierBtpLanding';

export const revalidate = 3600;
export async function generateMetadata(): Promise<Metadata> {
  return formationIaMetierBtpMetadata(FORMATION_IA_METIER_MACON);
}

export default function FormationIaMaconBtpPage() {
  return <FormationIaMetierBtpLanding config={FORMATION_IA_METIER_MACON} />;
}
