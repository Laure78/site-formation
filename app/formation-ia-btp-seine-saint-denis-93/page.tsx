import {
  DepartementPage,
  departementPageMetadata,
} from '@/components/formation-ia-btp/DepartementPage';
import { DEPARTEMENT_SEINE_SAINT_DENIS_93 } from '@/lib/departement-pages';

export const revalidate = 3600;

export const metadata = departementPageMetadata(DEPARTEMENT_SEINE_SAINT_DENIS_93);

export default function FormationIaBtpSeineSaintDenis93Page() {
  return <DepartementPage data={DEPARTEMENT_SEINE_SAINT_DENIS_93} />;
}
