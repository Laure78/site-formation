import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Rubrique Suivi admin retirée de Organisation — redirection. */
export default function SuiviAdministratifPage() {
  redirect(LINKS.adminMonEspace);
}
