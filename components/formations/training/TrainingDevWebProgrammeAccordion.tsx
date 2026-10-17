'use client';

import { useId, useState } from 'react';
import { Download } from 'lucide-react';
import { TrainingProgramAccordion } from '@/components/formations/training/TrainingProgramAccordion';
import {
  mapDevWebJour2ModuleToCatalogue,
  mapDevWebProgrammeModuleToCatalogue,
} from '@/lib/dev-web-catalogue-programme-modules';
import {
  DEV_WEB_IA_MODULES,
  DEV_WEB_IA_MODULES_JOUR2,
  DEV_WEB_IA_PARCOURS_14H_SECTION,
  DEV_WEB_IA_PARCOURS_7H_SECTION,
  DEV_WEB_IA_PDF_14H_HREF,
  DEV_WEB_IA_PDF_7H_HREF,
  DEV_WEB_IA_PROGRAMME_SECTION,
  PROGRAMME_PDF_14H,
  PROGRAMME_PDF_7H,
} from '@/lib/formation-developpement-web-ia-content';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type ParcoursId = '7h' | '14h';

/** Programme NIV-10 — onglets 7 h / 14 h + accordéon commun. */
export function TrainingDevWebProgrammeAccordion() {
  const [parcours, setParcours] = useState<ParcoursId>('7h');
  const baseId = useId();

  const modules7 = DEV_WEB_IA_MODULES.map(mapDevWebProgrammeModuleToCatalogue);
  const modules14 = [
    ...modules7,
    ...DEV_WEB_IA_MODULES_JOUR2.map(mapDevWebJour2ModuleToCatalogue),
  ];

  const intro =
    parcours === '7h' ? DEV_WEB_IA_PARCOURS_7H_SECTION.intro : DEV_WEB_IA_PARCOURS_14H_SECTION.intro;

  return (
    <div>
      <p className="text-base leading-relaxed text-slate-700">{DEV_WEB_IA_PROGRAMME_SECTION.disclaimer}</p>

      <div
        role="tablist"
        aria-label="Durée du parcours"
        className="mt-6 flex gap-1 rounded-xl bg-slate-100 p-1"
      >
        {(['7h', '14h'] as const).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`${baseId}-tab-${id}`}
            aria-selected={parcours === id}
            aria-controls={`${baseId}-panel-${id}`}
            onClick={() => setParcours(id)}
            className={`min-h-10 flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
              parcours === id ? 'bg-white text-[#377CF3] shadow-sm' : 'text-slate-600'
            }`}
          >
            {id === '7h' ? 'Parcours 7 h' : 'Parcours 14 h'}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${parcours}`}
        aria-labelledby={`${baseId}-tab-${parcours}`}
        className="mt-4"
      >
        <p className="text-sm leading-relaxed text-slate-600">{intro}</p>
        {parcours === '14h' ? (
          <p className="mt-2 text-sm font-medium text-slate-800">
            {DEV_WEB_IA_PARCOURS_14H_SECTION.jour1Label} ({DEV_WEB_IA_PARCOURS_14H_SECTION.jour1Duree}) puis{' '}
            {DEV_WEB_IA_PARCOURS_14H_SECTION.jour2Label} ({DEV_WEB_IA_PARCOURS_14H_SECTION.jour2Duree}).
          </p>
        ) : null}
        <TrainingProgramAccordion
          modules={parcours === '7h' ? modules7 : modules14}
          className="mt-6"
        />
        <p className="mt-6">
          <a
            href={parcours === '7h' ? DEV_WEB_IA_PDF_7H_HREF : DEV_WEB_IA_PDF_14H_HREF}
            download={parcours === '7h' ? PROGRAMME_PDF_7H : PROGRAMME_PDF_14H}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 text-sm`}
          >
            <Download className="h-4 w-4" aria-hidden />
            Télécharger le programme {parcours === '7h' ? '7 h' : '14 h'}
          </a>
        </p>
      </div>
    </div>
  );
}
