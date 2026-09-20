import { redirect } from 'next/navigation';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import { ProspectionSubnavBridge } from '@/components/admin/prospection/ProspectionSubnavBridge';

export default async function ProspectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminProspection}`);
    }
    redirect('/admin?prospection=denied');
  }

  return (
    <div className="p-4 md:p-8">
      <ProspectionSubnavBridge />
      <div className="mt-4">{children}</div>
    </div>
  );
}
