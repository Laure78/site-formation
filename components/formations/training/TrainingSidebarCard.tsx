'use client';

import { TrainingFormatTabs } from '@/components/formations/training/TrainingFormatTabs';

type Props = {
  formationTitle: string;
  durationLabel: string;
  interPriceLabel: string;
  showTvaAsterisk?: boolean;
  effectifLabel: string;
  pdfHref?: string;
  showIntra?: boolean;
};

export function TrainingSidebarCard(props: Props) {
  return <TrainingFormatTabs {...props} />;
}
