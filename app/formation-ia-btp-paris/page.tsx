import { permanentRedirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Alias Paris — 301 direct vers `/formation-ia-paris` (sans chaîne). */
export default function FormationIaBtpParisRedirect() {
  permanentRedirect(LINKS.formationIaParis);
}
