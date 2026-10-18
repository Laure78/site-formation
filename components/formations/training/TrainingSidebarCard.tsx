'use client';

import { TrainingFormatTabs } from '@/components/formations/training/TrainingFormatTabs';

type Props = {
  formationTitle: string;
  durationLabel: string;
  interPriceLabel: string;
  intraPriceLabel?: string;
  showTvaAsterisk?: boolean;
  effectifLabel: string;
  pdfHref?: string;
  showIntra?: boolean;
  interInscriptionHref?: string;
};

export function TrainingSidebarCard(props: Props) {
  return <TrainingFormatTabs {...props} />;
}
