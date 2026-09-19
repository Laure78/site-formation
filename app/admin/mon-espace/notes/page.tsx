import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Rubrique Notes retirée de Organisation — redirection. */
export default function OrganisationNotesPage() {
  redirect(LINKS.adminMonEspace);
}
