import { permanentRedirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Redirection de secours — la 301 canonique est dans `next.config.ts`. */
export default function DevenezConsultantMerciRedirectPage() {
  permanentRedirect(LINKS.nousRejoindreMerci);
}
