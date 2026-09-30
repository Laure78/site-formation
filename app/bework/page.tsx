import { permanentRedirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/**
 * Ancienne landing BeWork — redirige vers la fiche catalogue OFC
 * NIV-10 — outils de gestion BTP avec l’IA (sans coder).
 */
export default function BeworkRedirectPage() {
  permanentRedirect(LINKS.formationDeveloppementWebIaSansCoder);
}
