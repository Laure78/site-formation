import { redirect } from 'next/navigation';

/** Ancienne URL — 308 via next.config ; filet côté page. */
export default function PrendreRdvLegacyRedirect() {
  redirect('/prendre-rendez-vous');
}
