import { redirect } from 'next/navigation';

/** Fiche prospect retirée de l’admin pour simplifier l’interface. */
export default function ProspectDetailPage() {
  redirect('/admin');
}
