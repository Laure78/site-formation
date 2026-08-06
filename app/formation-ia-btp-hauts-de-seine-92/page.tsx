import {
  DepartementPage,
  departementPageMetadata,
} from '@/components/formation-ia-btp/DepartementPage';
import { DEPARTEMENT_HAUTS_DE_SEINE_92 } from '@/lib/departement-pages';

export const revalidate = 3600;

export const metadata = departementPageMetadata(DEPARTEMENT_HAUTS_DE_SEINE_92);

export default function FormationIaBtpHautsDeSeine92Page() {
  return <DepartementPage data={DEPARTEMENT_HAUTS_DE_SEINE_92} />;
}
