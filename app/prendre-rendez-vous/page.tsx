import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Ancienne URL — 301 via next.config ; filet côté page. */
export default function PrendreRendezVousLegacyRedirect() {
  redirect(LINKS.prendreRdv);
}
