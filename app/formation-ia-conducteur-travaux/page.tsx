import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Ancienne URL — 301 vers le canon conducteur. */
export default function FormationIaConducteurTravauxLegacyRedirect() {
  redirect(LINKS.formationConducteurTravaux);
}
