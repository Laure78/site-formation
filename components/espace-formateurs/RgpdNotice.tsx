import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import { SITE } from '@/lib/site-config';

/** Information RGPD — collecte dossier formateur (art. 13). */
export function ExtranetRgpdNotice() {
  return (
    <p className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
      <strong className="font-semibold text-slate-800">Données personnelles.</strong> OFC Création
      d&apos;Entreprise (marque Laure Olivié) traite vos données pour la gestion de votre dossier
      d&apos;intervention, la conformité Qualiopi et la sous-traitance. Responsable :{' '}
      {SITE.raisonSociale} ({SITE.marque}).{' '}
      <a href={`mailto:${SCHEMA_CONTACT.email}`} className="font-medium text-[#377CF3] hover:underline">
        {SCHEMA_CONTACT.email}
      </a>
      . Conservation selon obligations légales et durée de la relation contractuelle ; archivage puis
      effacement sur demande lorsque le droit le permet.
    </p>
  );
}
