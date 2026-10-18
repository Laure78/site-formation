import type { ReactNode } from 'react';
import { Settings2 } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { getInfosPratiquesForCatalogue } from '@/lib/infos-pratiques-catalogue';
import { LINKS } from '@/lib/internal-links';
import Link from 'next/link';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  programmeRef: string;
};

type ModalityTile = {
  title: string;
  body: ReactNode;
};

/** Modalités pédagogiques, évaluation, accès et accessibilité — bloc unique. */
export function TrainingModalitiesSection({ programmeRef }: Props) {
  const infos = getInfosPratiquesForCatalogue(programmeRef);

  const tiles: ModalityTile[] = [];

  if (infos.methodes?.length || infos.modalitePedagogique) {
    tiles.push({
      title: 'Méthodes pédagogiques',
      body: (
        <>
          {infos.modalitePedagogique ? (
            <p className="text-base leading-relaxed text-slate-700">{infos.modalitePedagogique}</p>
          ) : null}
          {infos.methodes?.length ? (
            <ul className={`space-y-2 ${infos.modalitePedagogique ? 'mt-4' : ''}`}>
              {infos.methodes.map((m) => (
                <li key={m} className="flex gap-2 text-base text-slate-800">
                  <span className="text-[#377CF3]" aria-hidden>
                    ·
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ),
    });
  }

  if (infos.modalitesEvaluation?.length) {
    tiles.push({
      title: 'Évaluation des acquis et satisfaction',
      body: (
        <ul className="space-y-2">
          {infos.modalitesEvaluation.map((line) => (
            <li key={line} className="text-base leading-relaxed text-slate-700">
              {line}
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (infos.modalitesAcces || infos.delaiAcces) {
    tiles.push({
      title: 'Modalités et délais d’accès',
      body: (
        <div className="space-y-3 text-base leading-relaxed text-slate-700">
          {infos.modalitesAcces ? <p>{infos.modalitesAcces}</p> : null}
          {infos.delaiAcces ? <p>{infos.delaiAcces}</p> : null}
        </div>
      ),
    });
  }

  if (infos.accessibiliteHandicap) {
    tiles.push({
      title: 'Accessibilité et handicap',
      body: (
        <p className="text-base leading-relaxed text-slate-700">{infos.accessibiliteHandicap}</p>
      ),
    });
  }

  if (tiles.length === 0) return null;

  return (
    <TrainingSection
      id={TRAINING_ANCHOR.modalitesPedagogiques}
      title="Modalités"
      tone="white"
      icon={Settings2}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <div
            key={tile.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"
          >
            <h3 className="font-display text-base font-semibold text-slate-900">{tile.title}</h3>
            <div className="mt-3">{tile.body}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-600">
        Informations réglementaires complètes :{' '}
        <a href={`#${TRAINING_ANCHOR.informationsPratiques}`} className={OFC_LINK}>
          voir le détail Qualiopi
        </a>{' '}
        ·{' '}
        <Link href={LINKS.accessibiliteHandicap} className={OFC_LINK}>
          Accessibilité
        </Link>
      </p>
    </TrainingSection>
  );
}
