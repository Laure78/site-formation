import { permanentRedirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Doorway métier thin → landing travaux publics. */
export default function FormationIaConducteurEnginsTpRedirect() {
  permanentRedirect(LINKS.formationIaTravauxPublics);
}
