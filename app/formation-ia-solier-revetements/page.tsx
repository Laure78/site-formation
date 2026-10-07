import { permanentRedirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Doorway métier thin → hub formation IA. */
export default function FormationIaSolierRevetementsRedirect() {
  permanentRedirect(LINKS.formationIaHub);
}
