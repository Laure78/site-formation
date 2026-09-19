import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import { getListDetail } from '@/lib/admin/mon-espace/listes';
import { MonEspaceSubnav } from '@/components/admin/mon-espace/MonEspaceSubnav';
import { ListeDetailView } from '@/components/admin/mon-espace/listes/ListeDetailView';

export default async function ListeDetailPage({
  params,
}: {
  params: Promise<{ listId: string }>;
}) {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspaceListes}`);
    }
    redirect('/admin?organisation=denied');
  }

  const { listId } = await params;
  const supabase = await createClient();

  let detail;
  try {
    detail = await getListDetail(supabase, access.userId, listId);
  } catch {
    redirect(LINKS.adminMonEspaceListes);
  }

  if (!detail) notFound();

  return (
    <div className="p-4 md:p-8 lg:p-10">
      <MonEspaceSubnav pathname={LINKS.adminMonEspaceListes} />
      <div className="mt-6">
        <ListeDetailView
          list={detail.list}
          category={detail.category}
          items={detail.items}
          categories={detail.categories}
        />
      </div>
    </div>
  );
}
