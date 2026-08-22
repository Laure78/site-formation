import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { LINKS } from '@/lib/internal-links';
import { EXTERNAL_AUTHORITY_LINKS } from '@/lib/seo-links';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { ANNUAIRE_ENTREPRISES_OFC_URL } from '@/lib/schema-constants';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: 'Organisme certifié Qualiopi — OFC Création d\'Entreprise',
  description:
    'OFC Création d\'Entreprise certifié Qualiopi (actions de formation) par Certifopac. Certificat téléchargeable, NDA 11788515078.',
  path: '/qualiopi',
});

export default function QualiopiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
        Notre certification Qualiopi
      </h1>

      <div className="mt-10">
        <QualiopiBadge size="lg" />
      </div>

      <article className="mt-10 space-y-6 text-slate-700">
        <p>
          {QUALIOPI_LEGAL.raisonSociale} est certifié Qualiopi au titre de la catégorie{' '}
          <strong>Actions de formation</strong>. Certificat n° {QUALIOPI_LEGAL.certificatNumero} délivré par
          Certifopac, valable {QUALIOPI_LEGAL.certificatValidite}.
        </p>

        <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm italic text-slate-600">
          Organisme de formation enregistré sous le n° {QUALIOPI_LEGAL.nda} auprès du préfet de région
          Île-de-France. Cet enregistrement ne vaut pas agrément de l&apos;État.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href={QUALIOPI_LEGAL.certificatPdfHref}
            className="inline-flex rounded-xl bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2d66d6]"
            download
          >
            {QUALIOPI_LEGAL.certificatPdfLabel}
          </a>
          <Link
            href={LINKS.indicateursResultats}
            className="inline-flex rounded-xl border border-[#377CF3] px-5 py-3 text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF]"
          >
            Indicateurs de résultats
          </Link>
        </div>

        <p className="text-sm">
          <ExternalLinkAnchor
            href={ANNUAIRE_ENTREPRISES_OFC_URL}
            title="Fiche OFC — Annuaire des Entreprises"
            className="font-medium text-[#377CF3] hover:underline"
          >
            Vérifier l&apos;organisme sur l&apos;Annuaire des Entreprises
          </ExternalLinkAnchor>
          {' · '}
          <ExternalLinkAnchor
            href={EXTERNAL_AUTHORITY_LINKS.dataGouvQualiopi.href}
            title={EXTERNAL_AUTHORITY_LINKS.dataGouvQualiopi.title}
            className="font-medium text-[#377CF3] hover:underline"
          >
            Vérifier la certification Qualiopi
          </ExternalLinkAnchor>
        </p>
      </article>
    </div>
  );
}
