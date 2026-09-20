import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Ancien pipeline → Prospection */
export default function PipelineRedirect() {
  redirect(LINKS.adminProspection);
}
