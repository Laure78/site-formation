import { permanentRedirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Alias URL — canonique : `/indicateurs-resultats`. */
export default function IndicateursDeResultatsRedirectPage() {
  permanentRedirect(LINKS.indicateursResultats);
}
