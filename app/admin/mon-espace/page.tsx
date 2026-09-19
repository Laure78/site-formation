import { LayoutDashboard } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';
import { getOrganisationDashboard } from '@/lib/admin/mon-espace/organisation-dashboard';
import { MonEspaceSubnav } from '@/components/admin/mon-espace/MonEspaceSubnav';
import { OrganisationDashboard } from '@/components/admin/mon-espace/OrganisationDashboard';
import { OrgPageHeader } from '@/components/admin/mon-espace/ui';

export default async function OrganisationPage() {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspace}`);
    }
    redirect('/admin?organisation=denied');
  }

  const supabase = await createClient();
  const data = await getOrganisationDashboard(supabase, access.userId);

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-9">
      <OrgPageHeader
        title="Organisation"
        description="Pilotage du jour : tâches, formations, échéances et relances."
        icon={
          <LayoutDashboard
            className="shrink-0 text-[#377CF3]"
            size={26}
            strokeWidth={1.75}
            aria-hidden
          />
        }
      />

      <MonEspaceSubnav pathname={LINKS.adminMonEspace} />

      <div className="mt-7 max-w-7xl">
        <OrganisationDashboard data={data} />
      </div>
    </div>
  );
}
