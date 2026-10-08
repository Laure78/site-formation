import { permanentRedirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/**
 * Ancienne landing BeWork — redirige vers la fiche catalogue OFC
 * NIV-10 — Créer des applications métier BTP avec l’IA.
 */
export default function BeworkRedirectPage() {
  permanentRedirect(LINKS.formationDeveloppementWebIaSansCoder);
}
