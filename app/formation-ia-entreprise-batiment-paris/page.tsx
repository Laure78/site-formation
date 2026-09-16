import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Doublon Paris — 301 vers le pilier départemental. */
export default function FormationIaEntrepriseBatimentParisLegacyRedirect() {
  redirect(LINKS.formationIaBtpParis);
}
