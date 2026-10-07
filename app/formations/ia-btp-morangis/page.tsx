import { permanentRedirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Doorway ville → page département Essonne (91). */
export default function FormationIaBtpMorangisRedirect() {
  permanentRedirect(LINKS.formationIaBtpEssonne91);
}
