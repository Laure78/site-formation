import {
  DepartementPage,
  departementPageMetadata,
} from '@/components/formation-ia-btp/DepartementPage';
import { DEPARTEMENT_SEINE_ET_MARNE_77 } from '@/lib/departement-pages';

export const revalidate = 3600;

export const metadata = departementPageMetadata(DEPARTEMENT_SEINE_ET_MARNE_77);

export default function FormationIaBtpSeineEtMarne77Page() {
  return <DepartementPage data={DEPARTEMENT_SEINE_ET_MARNE_77} />;
}
