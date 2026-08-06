import {
  DepartementPage,
  departementPageMetadata,
} from '@/components/formation-ia-btp/DepartementPage';
import { DEPARTEMENT_PARIS_75 } from '@/lib/departement-pages';

export const revalidate = 3600;

export const metadata = departementPageMetadata(DEPARTEMENT_PARIS_75);

export default function FormationIaBtpParisPage() {
  return <DepartementPage data={DEPARTEMENT_PARIS_75} />;
}
