import { ListChecks } from 'lucide-react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import { getMesListesBoard } from '@/lib/admin/mon-espace/listes';
import { MonEspaceSubnav } from '@/components/admin/mon-espace/MonEspaceSubnav';
import { MesListesBoard } from '@/components/admin/mon-espace/listes/MesListesBoard';
import { OrgPageHeader } from '@/components/admin/mon-espace/ui';

export default async function MesListesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspaceListes}`);
    }
    redirect('/admin?organisation=denied');
  }

  const params = await searchParams;
  const query = (params.q ?? '').trim();
  const supabase = await createClient();

  let migrationMissing = false;
  let categories: Awaited<ReturnType<typeof getMesListesBoard>>['categories'] =
    [];
  let favorites: Awaited<ReturnType<typeof getMesListesBoard>>['favorites'] =
    [];

  try {
    const board = await getMesListesBoard(supabase, access.userId, { query });
    categories = board.categories;
    favorites = board.favorites;
  } catch {
    migrationMissing = true;
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-9">
      <OrgPageHeader
        title="Mes listes"
        description="Checklists rapides : courses, idées, projets, achats…"
        icon={
          <ListChecks
            className="text-[#377CF3]"
            size={26}
            strokeWidth={1.75}
            aria-hidden
          />
        }
      />

      <MonEspaceSubnav pathname={LINKS.adminMonEspaceListes} />

      {migrationMissing ? (
        <div
          className="mt-6 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="status"
        >
          Tables Mes listes absentes. Appliquez{' '}
          <code className="rounded bg-amber-100 px-1 font-mono text-xs">
            053_workspace_mes_listes.sql
          </code>{' '}
          dans le SQL Editor Supabase, puis rechargez.
        </div>
      ) : (
        <div className="mt-7 max-w-6xl">
          <MesListesBoard
            categories={categories}
            favorites={favorites}
            query={query}
          />
        </div>
      )}
    </div>
  );
}
