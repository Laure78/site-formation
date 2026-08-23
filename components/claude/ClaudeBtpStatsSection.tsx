import { ClipboardList, FileSearch, Radar, Users } from 'lucide-react';
import { PillarStatGrid } from '@/components/pillar/PillarStatGrid';
import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';
import { SOCIAL_PROOF } from '@/lib/constants';

const STATS = [
  {
    label: 'Gain CR chantier',
    value: '−85 %',
    Icon: ClipboardList,
  },
  {
    label: 'Gain analyse DCE',
    value: '−85 %',
    Icon: FileSearch,
  },
  {
    label: 'Gain veille AO',
    value: '−100 %',
    Icon: Radar,
  },
  {
    label: 'Satisfaction (Qualiopi)',
    value: null as string | null,
    Icon: Users,
  },
] as const;

export function ClaudeBtpStatsSection() {
  return (
    <PillarStatGrid
      id="en-chiffres"
      titleId="en-chiffres-title"
      title="Claude AI dans le BTP — en chiffres (OFC 2026)"
      columns={4}
      items={STATS.map((row) => ({
        label: row.label,
        Icon: row.Icon,
        value:
          row.value === null ? (
            <span className="text-[#0F172A]">{formatNoteSatisfactionSur5()}</span>
          ) : (
            row.value
          ),
      }))}
      footnote={
        <>
          Source : mesures OFC sur 8 tâches, sessions FFB Grand Paris, FFB Île-de-France, CSFE —{' '}
          </>
      }
    />
  );
}
