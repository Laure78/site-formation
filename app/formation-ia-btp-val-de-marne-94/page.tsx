import {
  DepartementPage,
  departementPageMetadata,
} from '@/components/formation-ia-btp/DepartementPage';
import { DEPARTEMENT_VAL_DE_MARNE_94 } from '@/lib/departement-pages';

export const revalidate = 3600;

export const metadata = departementPageMetadata(DEPARTEMENT_VAL_DE_MARNE_94);

export default function FormationIaBtpValDeMarne94Page() {
  return <DepartementPage data={DEPARTEMENT_VAL_DE_MARNE_94} />;
}
