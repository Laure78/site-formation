import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { LINKS } from '@/lib/internal-links';
import { EXTERNAL_AUTHORITY_LINKS } from '@/lib/seo-links';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { ANNUAIRE_ENTREPRISES_OFC_URL } from '@/lib/schema-constants';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { Breadcrumb } from '@/components/Breadcrumb';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: 'Organisme certifié Qualiopi — OFC Création d\'Entreprise',
  description:
    'Qualiopi OFC Création d’Entreprise : certificat actions de formation, NDA et preuve publique. Formation IA pour le BTP. Réservez votre visio découverte.',
  descriptionFinal: true,
  path: LINKS.qualiopi,
});

export default function QualiopiPage() {
  return (
    <div className="px-4 py-10 sm:px-6 md:py-12 lg:px-8">
      <div className={OFC_SECTION_INNER}>
        <Breadcrumb
          className="mb-6 text-sm"
          items={[
            { label: 'Accueil', href: LINKS.home },
            { label: 'Certification Qualiopi', href: LINKS.qualiopi },
          ]}
        />

        <div className="lg:grid lg:grid-cols-[minmax(220px,17rem)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(240px,19rem)_minmax(0,1fr)] xl:gap-14">
          <div className="flex justify-center lg:justify-start">
            <QualiopiBadge size="lg" />
          </div>

          <div className="min-w-0 mt-8 lg:mt-0">
            <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
              Notre certification Qualiopi
            </h1>

            <article className="mt-6 space-y-5 text-base leading-relaxed text-slate-700 md:mt-8">
              <p>
                {QUALIOPI_LEGAL.raisonSociale} ({QUALIOPI_LEGAL.formeJuridique}) est un organisme de
                formation professionnelle. La marque Qualiopi atteste de la conformité du process
                qualité pour la catégorie d’actions indiquée ci-dessous — elle ne constitue pas un
                agrément de l’État. Les formations IA pour le BTP d’OFC sont dispensées en présentiel
                en Île-de-France. Un financement OPCO est possible selon éligibilité.
              </p>

              <dl className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white text-sm">
                <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-semibold text-slate-900">Certificateur</dt>
                  <dd>{QUALIOPI_LEGAL.organismeCertificateur}</dd>
                </div>
                <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-semibold text-slate-900">N° de certificat</dt>
                  <dd>{QUALIOPI_LEGAL.certificatNumero}</dd>
                </div>
                <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-semibold text-slate-900">Dates de validité</dt>
                  <dd>{QUALIOPI_LEGAL.certificatValidite}</dd>
                </div>
                <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-semibold text-slate-900">Périmètre</dt>
                  <dd>{QUALIOPI_LEGAL.qualiopiCategoryMention}</dd>
                </div>
                <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-semibold text-slate-900">SIRET</dt>
                  <dd>{QUALIOPI_LEGAL.siret}</dd>
                </div>
                <div className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-semibold text-slate-900">NDA</dt>
                  <dd>{QUALIOPI_LEGAL.nda}</dd>
                </div>
              </dl>

              <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm italic text-slate-600">
                {QUALIOPI_LEGAL.ndaExactMention}
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
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
                  Indicateurs de résultats Qualiopi
                </Link>
              </div>

              <p className="text-sm leading-relaxed">
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
        </div>
      </div>
    </div>
  );
}
