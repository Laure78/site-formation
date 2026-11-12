import Link from 'next/link';
import { getFormationByCode } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  className?: string;
};

/** Ligne standard « Formation associée » — fiche catalogue NIV-05 (MOE). */
export function FormationAssocieeMoeLigne({ className }: Props) {
  const formation = getFormationByCode('NIV-05');
  const label = formation?.titre ?? 'Formation IA maîtrise d’œuvre BTP';

  return (
    <p className={className ?? 'mt-8 text-sm text-slate-600'}>
      Formation associée :{' '}
      <Link href={LINKS.formationIaMaitriseOeuvre} className={`font-medium ${OFC_LINK}`}>
        {label}
      </Link>
    </p>
  );
}
