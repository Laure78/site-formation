import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

/** Ancienne route CRM → nouveau module Prospection */
export default function AdminProspectsRedirect() {
  redirect(LINKS.adminProspectionProspects);
}
