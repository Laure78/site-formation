import { permanentRedirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Doublon — 301 vers le canon `/formation-ia-dirigeant-pme-btp`. */
export default function FormationIaPmeBtpLegacyRedirect() {
  permanentRedirect(LINKS.formationIaDirigeantPmeBtp);
}
