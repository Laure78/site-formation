import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { fetchTrainerDocuments } from '@/lib/extranet-formateurs/queries';
import { DocumentsPanel } from '@/components/espace-formateurs/DocumentsPanel';

export default async function EspaceFormateursDocumentsPage() {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return null;
  const docs = await fetchTrainerDocuments(access.trainer.id);
  return <DocumentsPanel trainer={access.trainer} docs={docs} />;
}
