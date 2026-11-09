import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

export default function AdminRecrutementIndexPage() {
  redirect(LINKS.adminRecrutementCandidats);
}
