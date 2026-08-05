import {
  DepartementPage,
  departementPageMetadata,
} from '@/components/formation-ia-btp/DepartementPage';
import { DEPARTEMENT_VAL_DOISE_95 } from '@/lib/departement-pages';

export const revalidate = 3600;

export const metadata = departementPageMetadata(DEPARTEMENT_VAL_DOISE_95);

export default function FormationIaBtpValDoise95Page() {
  return <DepartementPage data={DEPARTEMENT_VAL_DOISE_95} />;
}
