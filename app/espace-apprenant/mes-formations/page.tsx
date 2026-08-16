import { redirect } from 'next/navigation';

/** Ancienne URL : le tableau de bord apprenant regroupe désormais les formations. */
export default function MesFormationsPage() {
  redirect('/espace-apprenant');
}
