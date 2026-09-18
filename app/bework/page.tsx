import { permanentRedirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/**
 * Ancienne URL /bework — redirige vers la fiche catalogue OFC
 * « Développement web avec l’IA — sans savoir coder » (NIV-10).
 */
export default function BeworkRedirectPage() {
  permanentRedirect(LINKS.formationDeveloppementWebIaSansCoder);
}
