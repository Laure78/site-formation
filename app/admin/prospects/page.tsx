import { redirect } from 'next/navigation';

/** Prospects CRM retirés de l’admin pour simplifier l’interface. */
export default function AdminProspectsPage() {
  redirect('/admin');
}
