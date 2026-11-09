import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Planning par créneaux retiré — dossiers entretiens sur la liste candidats. */
export default function AdminRecrutementPlanningRedirectPage() {
  redirect(LINKS.adminRecrutementCandidats);
}
