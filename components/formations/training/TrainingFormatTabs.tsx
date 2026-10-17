'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Mail, Users } from 'lucide-react';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export type TrainingFormatKind = 'inter' | 'intra';

type Props = {
  formationTitle: string;
  durationLabel: string;
  interPriceLabel: string;
  showTvaAsterisk?: boolean;
  effectifLabel: string;
  pdfHref?: string;
  /** Afficher l’onglet intra (défaut : true pour le catalogue présentiel). */
  showIntra?: boolean;
  onFormatChange?: (format: TrainingFormatKind) => void;
};

export function TrainingFormatTabs({
  formationTitle,
  durationLabel,
  interPriceLabel,
  showTvaAsterisk = true,
  effectifLabel,
  pdfHref,
  showIntra = true,
  onFormatChange,
}: Props) {
  const [format, setFormat] = useState<TrainingFormatKind>('inter');
  const baseId = useId();

  const set = (next: TrainingFormatKind) => {
    setFormat(next);
    onFormatChange?.(next);
  };

  const inscriptionHref = catalogueDemandeHref({
    formationOuParcours: formationTitle,
    nature: format === 'intra' ? 'intra' : 'devis',
    variante: format === 'inter' ? 'inter-entreprises' : 'intra-entreprise',
  });

  return (
    <div className="space-y-3">
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {showIntra ? (
        <div
          role="tablist"
          aria-label="Format de formation"
          className="mb-4 flex gap-1 rounded-xl bg-slate-100 p-1"
        >
          <button
            type="button"
            role="tab"
            id={`${baseId}-tab-inter`}
            aria-selected={format === 'inter'}
            aria-controls={`${baseId}-panel-inter`}
            onClick={() => set('inter')}
            className={`min-h-10 flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
              format === 'inter' ? 'bg-white text-[#377CF3] shadow-sm' : 'text-slate-600'
            }`}
          >
            Inter-entreprises
          </button>
          <button
            type="button"
            role="tab"
            id={`${baseId}-tab-intra`}
            aria-selected={format === 'intra'}
            aria-controls={`${baseId}-panel-intra`}
            onClick={() => set('intra')}
            className={`min-h-10 flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
              format === 'intra' ? 'bg-white text-[#377CF3] shadow-sm' : 'text-slate-600'
            }`}
          >
            Intra-entreprise
          </button>
        </div>
      ) : null}

      <div
        role="tabpanel"
        id={format === 'inter' ? `${baseId}-panel-inter` : `${baseId}-panel-intra`}
        aria-labelledby={format === 'inter' ? `${baseId}-tab-inter` : `${baseId}-tab-intra`}
      >
        {format === 'inter' ? (
          <>
            <p className="text-sm italic leading-relaxed text-slate-600">
              Session collective en présentiel en Île-de-France — places selon calendrier.
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="font-semibold text-slate-800">Durée</dt>
                <dd className="font-bold text-slate-900">{durationLabel}</dd>
              </div>
              <div>
                <a
                  href="#sessions"
                  className="inline-flex items-center gap-1 font-semibold text-[#377CF3] hover:underline"
                >
                  Voir les dates et lieux
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-t border-slate-100 pt-3">
                <dt className="text-slate-600">Tarif par participant</dt>
                <dd className="font-display text-lg font-bold text-slate-900">
                  {interPriceLabel}
                  {showTvaAsterisk ? <MentionTvaAsterisque /> : null}
                </dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-slate-500">{effectifLabel}</p>
          </>
        ) : (
          <>
            <p className="text-sm italic leading-relaxed text-slate-600">
              Formation dans vos locaux ou une salle adaptée — programme ajusté à votre équipe.
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="font-semibold text-slate-800">Durée</dt>
                <dd className="font-bold text-slate-900">{durationLabel}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-t border-slate-100 pt-3">
                <dt className="text-slate-600">Tarif groupe</dt>
                <dd className="font-display text-lg font-bold text-slate-900">Sur devis</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-slate-500">{effectifLabel}</p>
          </>
        )}

        <div className="mt-5 flex flex-col gap-2">
          {pdfHref ? (
            <a
              href={pdfHref}
              download
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-4 py-2.5 text-sm`}
            >
              Télécharger le programme
            </a>
          ) : (
            <Link
              href={catalogueDemandeHref({ formationOuParcours: formationTitle, nature: 'choix-formation' })}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-4 py-2.5 text-sm`}
            >
              Demander le programme
            </Link>
          )}
          <Link
            href={`${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-4 py-2.5 text-sm`}
          >
            Demander un devis
          </Link>
          <Link href={inscriptionHref} className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-4 py-2.5 text-sm`}>
            {format === 'intra' ? 'Demander un devis intra' : 'Demander une inscription'}
          </Link>
        </div>
      </div>
    </div>

    {showIntra ? (
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
        {format === 'inter' ? (
          <button
            type="button"
            onClick={() => set('intra')}
            className="flex min-h-11 w-full items-center justify-between gap-2 text-left text-sm font-semibold text-slate-800 hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[#377CF3]" aria-hidden />
              Cette formation en intra
            </span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => set('inter')}
            className="flex min-h-11 w-full items-center justify-between gap-2 text-left text-sm font-semibold text-slate-800 hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[#377CF3]" aria-hidden />
              Voir le format inter-entreprises
            </span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
          </button>
        )}
        <div className="border-t border-slate-100">
          <Link
            href={LINKS.contact}
            className="flex min-h-11 items-center justify-between gap-2 text-sm font-semibold text-slate-800 hover:text-[#377CF3]"
          >
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#377CF3]" aria-hidden />
              Nous contacter
            </span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    ) : null}
    </div>
  );
}
