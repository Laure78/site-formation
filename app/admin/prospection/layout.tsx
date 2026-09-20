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
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
          Admin · Prospection
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Prospection
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Mini-CRM B2B : prospects, emails, relances — réservé administrateur.
        </p>
      </div>
      <ProspectionSubnavBridge />
      <div className="mt-6">{children}</div>
    </div>
  );
}
