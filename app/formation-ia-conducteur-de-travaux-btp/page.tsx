import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Doublon — 301 vers le canon `/formation-ia-conducteur-de-travaux`. */
export default function FormationIaConducteurDeTravauxBtpLegacyRedirect() {
  redirect(LINKS.formationConducteurTravaux);
}
