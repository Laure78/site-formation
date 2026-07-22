import type { Metadata } from 'next';
import {
  formationIaMarchePublicMetadata,
  FORMATION_IA_MARCHE_PUBLIC_TRAVAUX,
} from '@/lib/formation-ia-marche-public-config';
import { FormationIaMarchePublicLanding } from '@/components/formation-ia-marche-public/FormationIaMarchePublicLanding';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return formationIaMarchePublicMetadata(FORMATION_IA_MARCHE_PUBLIC_TRAVAUX);
}

export default function FormationIaMarchePublicTravauxPage() {
  return <FormationIaMarchePublicLanding config={FORMATION_IA_MARCHE_PUBLIC_TRAVAUX} />;
}
