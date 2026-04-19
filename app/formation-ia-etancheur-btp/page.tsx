import type { Metadata } from 'next';
import {
  formationIaMetierBtpMetadata,
  FORMATION_IA_METIER_ETANCHEUR,
} from '@/lib/formation-ia-metier-btp-config';
import { FormationIaMetierBtpLanding } from '@/components/formation-ia-metier/FormationIaMetierBtpLanding';

export async function generateMetadata(): Promise<Metadata> {
  return formationIaMetierBtpMetadata(FORMATION_IA_METIER_ETANCHEUR);
}

export default function FormationIaEtancheurBtpPage() {
  return <FormationIaMetierBtpLanding config={FORMATION_IA_METIER_ETANCHEUR} />;
}
