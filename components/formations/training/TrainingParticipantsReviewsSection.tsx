'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { Info, MessageSquareQuote } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import {
  getFormationParticipantReviews,
  type FormationReviewCriterion,
  type FormationReviewWave,
} from '@/lib/formation-participant-reviews';
import {
  formatNoteSatisfactionSur5,
  formatPeriodeReferenceAffichage,
  indicateursResultats,
} from '@/lib/data/indicateurs-resultats';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  programmeRef: FormationCatalogueCode;
};

function CriterionBar({ criterion }: { criterion: FormationReviewCriterion }) {
  const pct = Math.min(100, Math.max(0, (criterion.value / criterion.scaleMax) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-medium text-slate-800">{criterion.label}</span>
        <span className="tabular-nums text-slate-600">
          {criterion.value.toFixed(2).replace('.', ',')}/{criterion.scaleMax}
        </span>
      </div>
      <div
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200"
        role="img"
        aria-label={`${criterion.label} : ${criterion.value} sur ${criterion.scaleMax}`}
      >
        <div
          className="h-full rounded-full bg-[#377CF3]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function WavePanel({ wave, label }: { wave: FormationReviewWave; label: string }) {
  const mid = Math.ceil(wave.criteria.length / 2);
  const colA = wave.criteria.slice(0, mid);
  const colB = wave.criteria.slice(mid);

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold tabular-nums text-slate-900">
        {wave.globalRating.toFixed(2).replace('.', ',')}/5
      </p>
      <p className="mt-1 text-sm text-slate-600">
        {wave.respondents} répondant{wave.respondents > 1 ? 's' : ''} · {wave.periodLabel}
      </p>
      <p className="mt-1 text-xs text-slate-500">Résultats propres à cette formation.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {colA.map((c) => (
            <CriterionBar key={c.id} criterion={c} />
          ))}
        </div>
        <div className="space-y-4">
          {colB.map((c) => (
            <CriterionBar key={c.id} criterion={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TrainingParticipantsReviewsSection({ programmeRef }: Props) {
  const data = getFormationParticipantReviews(programmeRef);
  const baseId = useId();
  const hasChaud = data.status === 'published' && Boolean(data.chaud);
  const hasFroid = data.status === 'published' && Boolean(data.froid);
  const defaultTab = hasChaud ? 'chaud' : hasFroid ? 'froid' : 'chaud';
  const [tab, setTab] = useState<'chaud' | 'froid'>(defaultTab);
  const [explainOpen, setExplainOpen] = useState(false);

  const showTabs = hasChaud && hasFroid;

  return (
    <TrainingSection
      id={TRAINING_ANCHOR.avis}
      title="Avis des participants"
      tone="muted"
      icon={MessageSquareQuote}
    >
      {data.status === 'published' && (hasChaud || hasFroid) ? (
        <>
          {showTabs ? (
            <div
              role="tablist"
              aria-label="Période d’évaluation"
              className="mb-6 inline-flex gap-1 rounded-xl bg-slate-200/80 p-1"
            >
              {hasChaud ? (
                <button
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-chaud`}
                  aria-selected={tab === 'chaud'}
                  aria-controls={`${baseId}-panel-chaud`}
                  onClick={() => setTab('chaud')}
                  className={`min-h-10 rounded-lg px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                    tab === 'chaud' ? 'bg-white text-[#377CF3] shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Avis à chaud
                </button>
              ) : null}
              {hasFroid ? (
                <button
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-froid`}
                  aria-selected={tab === 'froid'}
                  aria-controls={`${baseId}-panel-froid`}
                  onClick={() => setTab('froid')}
                  className={`min-h-10 rounded-lg px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                    tab === 'froid' ? 'bg-white text-[#377CF3] shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Avis à froid
                </button>
              ) : null}
            </div>
          ) : null}

          <div
            role="tabpanel"
            id={tab === 'chaud' ? `${baseId}-panel-chaud` : `${baseId}-panel-froid`}
            aria-labelledby={tab === 'chaud' ? `${baseId}-tab-chaud` : `${baseId}-tab-froid`}
            className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"
          >
            {tab === 'chaud' && data.chaud ? (
              <WavePanel wave={data.chaud} label="Avis à chaud" />
            ) : null}
            {tab === 'froid' && data.froid ? (
              <WavePanel wave={data.froid} label="Avis à froid" />
            ) : null}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <p className="text-base text-slate-700">
            Les résultats de satisfaction consolidés par programme ne sont pas encore publiés sur
            cette fiche. L’indicateur global de l’organisme ({formatNoteSatisfactionSur5()},{' '}
            {indicateursResultats.nombreRepondants} répondants, période{' '}
            {formatPeriodeReferenceAffichage()}) concerne l’ensemble des actions OFC — pas cette
            formation seule.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href={LINKS.indicateursResultats} className={`${OFC_LINK} font-semibold`}>
                Comprendre nos indicateurs de résultats (organisme)
              </Link>
            </li>
            <li>
              <Link href={LINKS.avisClients} className={`${OFC_LINK} font-semibold`}>
                Voir les avis Google et témoignages publiés
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setExplainOpen((v) => !v)}
          aria-expanded={explainOpen}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-[#377CF3] hover:bg-[#377CF3]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          <Info className="h-4 w-4" aria-hidden />
          Comprendre nos évaluations
        </button>
        {explainOpen ? (
          <div className="mt-3 max-w-3xl rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700">
            <p>
              {indicateursResultats.sourceLabel} Les notes par critère n’apparaissent sur une fiche
              formation que lorsqu’un volume suffisant de questionnaires est consolidé pour ce
              programme. L’évaluation des acquis (livrables, remédiation) est distincte de la
              satisfaction.
            </p>
            <p className="mt-2">
              <Link href={LINKS.indicateursResultats} className={OFC_LINK}>
                Méthode de calcul et périmètre publiés
              </Link>
            </p>
          </div>
        ) : null}
      </div>
    </TrainingSection>
  );
}
