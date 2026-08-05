import {
  DepartementPage,
  departementPageMetadata,
} from '@/components/formation-ia-btp/DepartementPage';
import { DEPARTEMENT_ESSONNE_91 } from '@/lib/departement-pages';

export const revalidate = 3600;

export const metadata = departementPageMetadata(DEPARTEMENT_ESSONNE_91);

export default function FormationIaBtpEssonne91Page() {
  return <DepartementPage data={DEPARTEMENT_ESSONNE_91} />;
}
