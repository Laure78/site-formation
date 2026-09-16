import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Doublon SEO — 301 vers la fiche conducteur de travaux. */
export default function IaConducteurTravauxLegacyRedirect() {
  redirect(LINKS.formationConducteurTravaux);
}
