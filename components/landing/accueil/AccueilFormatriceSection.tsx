import Link from 'next/link';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { LINKS } from '@/lib/internal-links';
import { LAURE_OLIVIE_CLIENT_REFERENCES_SHORT } from '@/lib/laure-olivie-profile';
import {
  OFC_CTA_SECONDARY,
  OFC_LINK,
  OFC_TYPE_H2,
  OFC_TYPE_BODY,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Formatrice — portrait court, CTA vers À propos. */
export function AccueilFormatriceSection() {
  return (
    <section className={OFC_SEC.white} aria-labelledby="accueil-formatrice">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:items-start">
        <div className="w-full max-w-xs shrink-0 lg:max-w-sm">
          <ProfilePhoto title="Laure Olivié — formatrice IA BTP, OFC Création d'Entreprise" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 id="accueil-formatrice" className={OFC_TYPE_H2}>
            Une formatrice spécialisée dans les usages IA du BTP
          </h2>
          <p className={`${OFC_TYPE_BODY} mt-4 text-slate-600`}>
            Laure Olivié forme les équipes du bâtiment et des travaux publics depuis fin 2021, après
            plus de dix ans de terrain en conduite de travaux. Approche 100&nbsp;% opérationnelle :
            vos documents réels, des méthodes applicables dès le lendemain.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Références : {LAURE_OLIVIE_CLIENT_REFERENCES_SHORT}.
          </p>
          <Link
            href={LINKS.aPropos}
            className={`${OFC_CTA_SECONDARY} mt-6 inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Découvrir mon parcours
          </Link>
          <p className="mt-4 text-sm">
            <Link href={LINKS.formateurIaBtp} className={OFC_LINK}>
              Formateur IA pour le BTP — profil détaillé
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
