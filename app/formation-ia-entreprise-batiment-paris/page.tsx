import { permanentRedirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Doublon Paris — 301 direct vers le canon (sans chaîne). */
export default function FormationIaEntrepriseBatimentParisLegacyRedirect() {
  permanentRedirect(LINKS.formationIaParis);
}
