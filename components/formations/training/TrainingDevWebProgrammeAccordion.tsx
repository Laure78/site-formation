'use client';

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
  DEV_WEB_IA_PDF_14H_HREF,
  DEV_WEB_IA_PROGRAMME_SECTION,
  PROGRAMME_PDF_14H,
} from '@/lib/formation-developpement-web-ia-content';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

/** Programme NIV-10 — parcours catalogue 14 h uniquement (2 × 7 h). */
export function TrainingDevWebProgrammeAccordion() {
  const modules14 = [
    ...DEV_WEB_IA_MODULES.map(mapDevWebProgrammeModuleToCatalogue),
    ...DEV_WEB_IA_MODULES_JOUR2.map(mapDevWebJour2ModuleToCatalogue),
  ];

  return (
    <div>
      <p className="text-base leading-relaxed text-slate-700">{DEV_WEB_IA_PROGRAMME_SECTION.disclaimer}</p>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        {DEV_WEB_IA_PARCOURS_14H_SECTION.intro}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-800">
        {DEV_WEB_IA_PARCOURS_14H_SECTION.jour1Label} ({DEV_WEB_IA_PARCOURS_14H_SECTION.jour1Duree}) puis{' '}
        {DEV_WEB_IA_PARCOURS_14H_SECTION.jour2Label} ({DEV_WEB_IA_PARCOURS_14H_SECTION.jour2Duree}).
      </p>

      <TrainingProgramAccordion modules={modules14} className="mt-6" />
      <p className="mt-6">
        <a
          href={DEV_WEB_IA_PDF_14H_HREF}
          download={PROGRAMME_PDF_14H}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 text-sm`}
        >
          <Download className="h-4 w-4" aria-hidden />
          Télécharger le programme 14 h (PDF)
        </a>
      </p>
    </div>
  );
}
