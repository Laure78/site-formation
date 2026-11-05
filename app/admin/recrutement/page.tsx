import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';
import { RECRUITMENT_DEFAULT_PLANNING_DATE } from '@/lib/recruitment/constants';

export default function AdminRecrutementIndexPage() {
  redirect(`${LINKS.adminRecrutementPlanning}?date=${RECRUITMENT_DEFAULT_PLANNING_DATE}`);
}
