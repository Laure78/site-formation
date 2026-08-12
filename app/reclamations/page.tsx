import Link from 'next/link';
import { Mail } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_LEGAL, QUALIOPI_RECLAMATIONS } from '@/lib/qualiopi-info';
import { MediationCm2cBlock } from '@/components/qualiopi/MediationCm2cBlock';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: 'Réclamations & amélioration continue — OFC',
  description:
    'Procédure de réclamation OFC : accusé de réception, délai de réponse, médiation CM2C. Amélioration continue Qualiopi — formations IA BTP.',
  path: '/reclamations',
});

export default function ReclamationsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
        Réclamations et amélioration continue
      </h1>
      <p className="mt-4 text-slate-600">
        {QUALIOPI_LEGAL.raisonSociale} — organisme certifié Qualiopi (actions de formation).
      </p>

      <article className="mt-12 space-y-10 text-slate-700">
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Objet</h2>
          <p className="mt-4">
            Cette page décrit la procédure pour formuler une réclamation relative à une action de formation
            (contenu, déroulement, accueil, handicap, facturation, attestation, etc.) ou proposer une amélioration.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Comment formuler une réclamation</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5">
            <li>
              Envoyez un email détaillé à{' '}
              <a href={`mailto:${QUALIOPI_RECLAMATIONS.email}`} className="font-medium text-[#377CF3] hover:underline">
                {QUALIOPI_RECLAMATIONS.email}
              </a>{' '}
              avec l&apos;objet « Réclamation formation ».
            </li>
            <li>
              Indiquez : vos coordonnées, l&apos;intitulé et la date de la formation, la nature de la réclamation,
              les pièces utiles (convention, échanges, facture).
            </li>
          </ol>
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Mail className="h-5 w-5 text-[#377CF3]" aria-hidden />
            <a href={`mailto:${QUALIOPI_RECLAMATIONS.email}`} className="font-semibold text-[#377CF3] hover:underline">
              {QUALIOPI_RECLAMATIONS.email}
            </a>
          </div>
        </section>

        <section aria-labelledby="chronologie-reclamation">
          <h2 id="chronologie-reclamation" className="font-display text-xl font-bold text-slate-900">
            Chronologie du traitement
          </h2>
          <ol className="mt-6 space-y-4">
            <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Étape 1</p>
              <h3 className="mt-1 font-display text-lg font-bold text-slate-900">Accusé de réception</h3>
              <p className="mt-2">
                Sous <strong>{QUALIOPI_RECLAMATIONS.delaiAccuseReception}</strong> après réception de votre
                réclamation écrite.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Étape 2</p>
              <h3 className="mt-1 font-display text-lg font-bold text-slate-900">Instruction et réponse</h3>
              <p className="mt-2">
                Analyse par la direction et réponse motivée sous{' '}
                <strong>{QUALIOPI_RECLAMATIONS.delaiReponse}</strong>.
              </p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Étape 3</p>
              <h3 className="mt-1 font-display text-lg font-bold text-slate-900">Médiation</h3>
              <p className="mt-2">
                Si la réponse ne convient pas, vous pouvez saisir le médiateur de la consommation (CM2C), dans les
                conditions indiquées ci-dessous.
              </p>
              <MediationCm2cBlock className="mt-4" />
            </li>
          </ol>
          <p className="mt-4">
            Voir également l&apos;article 15 des{' '}
            <Link href={LINKS.cgv} className="font-medium text-[#377CF3] hover:underline">
              Conditions générales de vente
            </Link>{' '}
            et l&apos;article 14 du{' '}
            <Link href={LINKS.reglementInterieur} className="font-medium text-[#377CF3] hover:underline">
              règlement intérieur
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Traitement et amélioration continue</h2>
          <p className="mt-4">
            Chaque réclamation est enregistrée, analysée par la direction et, le cas échéant, intégrée au plan
            d&apos;amélioration continue (indicateur Qualiopi). Les actions correctives peuvent porter sur la
            pédagogie, l&apos;accueil, les supports ou les processus administratifs.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">Documents connexes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <Link href={LINKS.cgv} className="font-medium text-[#377CF3] hover:underline">
                CGV formation professionnelle
              </Link>
            </li>
            <li>
              <Link href={LINKS.reglementInterieur} className="font-medium text-[#377CF3] hover:underline">
                Règlement intérieur
              </Link>
            </li>
            <li>
              <Link href={LINKS.indicateursResultats} className="font-medium text-[#377CF3] hover:underline">
                Indicateurs de résultats
              </Link>
            </li>
            <li>
              <Link href={LINKS.accessibiliteHandicap} className="font-medium text-[#377CF3] hover:underline">
                Accessibilité &amp; handicap
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
