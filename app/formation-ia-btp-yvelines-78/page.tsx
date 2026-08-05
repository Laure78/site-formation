import {
  DepartementPage,
  departementPageMetadata,
} from '@/components/formation-ia-btp/DepartementPage';
import { DEPARTEMENT_YVELINES_78 } from '@/lib/departement-pages';

export const revalidate = 3600;

export const metadata = departementPageMetadata(DEPARTEMENT_YVELINES_78);

export default function FormationIaBtpYvelines78Page() {
  return <DepartementPage data={DEPARTEMENT_YVELINES_78} />;
}
