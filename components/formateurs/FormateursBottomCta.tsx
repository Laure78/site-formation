import Link from 'next/link';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

/** Bloc CTA final — contact direct + recrutement formateurs. */
export function FormateursBottomCta() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 id="formateurs-cta" className={OFC_TYPE_H2}>
        Quelle formation pour votre équipe&nbsp;?
      </h2>
      <p className="mt-4 text-base leading-relaxed text-ofc-ink-muted">
        Présentez vos besoins&nbsp;: devis, appels d’offres, conduite de travaux, gestion ou usages
        de l’IA. Échangeons sur le programme adapté à votre entreprise en présentiel en
        Île-de-France.
      </p>
      <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Link
          href={LINKS.contact}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-base`}
        >
          Échanger sur mon besoin
        </Link>
        <a
          href={`tel:${CONTACT.phone}`}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3 text-base`}
        >
          {CONTACT.phoneDisplay}
        </a>
      </div>
      <p className="mt-4 text-sm text-ofc-ink-muted">
        <a href={`mailto:${CONTACT.email}`} className={`${OFC_LINK} font-medium text-ofc-accent`}>
          {CONTACT.email}
        </a>
      </p>
      <p className="mt-6 text-sm text-ofc-ink-muted">
        <Link href={LINKS.rejoindreEquipe} className={`${OFC_LINK} text-ofc-ink-muted underline-offset-2`}>
          Vous êtes du BTP et voulez former&nbsp;? Rejoindre l’équipe
        </Link>
      </p>
    </div>
  );
}
