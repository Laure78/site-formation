import type { Metadata } from 'next';
import { FormationIaDirigeantBtpLanding } from '@/components/formation-ia-dirigeant/FormationIaDirigeantBtpLanding';
import { formationIaDirigeantBtpMetadata } from '@/lib/formation-ia-dirigeant-btp-config';

export async function generateMetadata(): Promise<Metadata> {
  return formationIaDirigeantBtpMetadata();
}

export default function FormationIaDirigeantBtpPage() {
  return <FormationIaDirigeantBtpLanding />;
}
