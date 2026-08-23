import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Alias URL — canonique : `/indicateurs-resultats`. */
export default function IndicateursDeResultatsRedirectPage() {
  redirect(LINKS.indicateursResultats);
}
