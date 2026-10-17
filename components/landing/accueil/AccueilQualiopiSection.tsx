import Link from 'next/link';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { Section } from '@/components/ui/Section';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export function AccueilQualiopiSection() {
  return (
    <Section tone="canvas" aria-labelledby="accueil-qualiopi-title">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <QualiopiBadge size="lg" />
        <h2 id="accueil-qualiopi-title" className="mt-6 font-display text-2xl font-bold text-ofc-ink">
          Qualité certifiée Qualiopi
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ofc-ink-muted">
          {QUALIOPI_LEGAL.raisonSociale} est un organisme de formation professionnelle certifié
          Qualiopi pour la catégorie d’actions indiquée sur le certificat — la marque atteste du
          processus qualité, pas d’un agrément de l’État ni d’une garantie de financement.
        </p>
        <dl className="mt-6 w-full max-w-md rounded-xl border border-ofc-border bg-white px-5 py-4 text-left text-sm">
          <div className="flex justify-between gap-4 border-b border-ofc-border py-2">
            <dt className="font-semibold text-ofc-ink">Titulaire</dt>
            <dd className="text-ofc-ink-muted">{QUALIOPI_LEGAL.raisonSociale}</dd>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <dt className="font-semibold text-ofc-ink">Périmètre</dt>
            <dd className="text-ofc-ink-muted">{QUALIOPI_LEGAL.qualiopiCategoryMention}</dd>
          </div>
        </dl>
        <p className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <Link href={QUALIOPI_LEGAL.certificatPdfHref} className={`${OFC_LINK} font-semibold`}>
            Consulter notre certificat Qualiopi
          </Link>
          <Link href={LINKS.qualiopi} className={`${OFC_LINK} font-semibold`}>
            En savoir plus sur la certification
          </Link>
        </p>
      </div>
    </Section>
  );
}
