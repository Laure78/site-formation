import { Library } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { requireOrganisationAdminAccess } from '@/lib/admin-access';
import { LINKS } from '@/lib/internal-links';
import {
  getResources,
  searchNotesAndResources,
} from '@/lib/admin/mon-espace/notes-ressources';
import {
  RESOURCE_CATEGORIES,
  type WorkspaceResourceCategory,
} from '@/lib/admin/mon-espace/types';
import { MonEspaceSubnav } from '@/components/admin/mon-espace/MonEspaceSubnav';
import {
  CrossSearchResults,
  OrganisationSearchBar,
} from '@/components/admin/mon-espace/OrganisationSearchBar';
import {
  ResourceCreateForm,
  ResourcesList,
} from '@/components/admin/mon-espace/ResourcesList';

const VALID_CAT = new Set(RESOURCE_CATEGORIES.map((c) => c.id));

export default async function OrganisationRessourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categorie?: string; favoris?: string }>;
}) {
  const access = await requireOrganisationAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect(`${LINKS.authConnexion}?next=${LINKS.adminMonEspaceRessources}`);
    }
    redirect('/admin?organisation=denied');
  }

  const params = await searchParams;
  const query = (params.q ?? '').trim();
  const favoritesOnly = params.favoris === '1';
  const category =
    params.categorie && VALID_CAT.has(params.categorie as WorkspaceResourceCategory)
      ? (params.categorie as WorkspaceResourceCategory)
      : 'all';

  const supabase = await createClient();

  let migrationMissing = false;
  let resources: Awaited<ReturnType<typeof getResources>> = [];
  let cross = {
    query: '',
    notes: [] as Awaited<ReturnType<typeof searchNotesAndResources>>['notes'],
    resources: [] as Awaited<ReturnType<typeof searchNotesAndResources>>['resources'],
  };

  try {
    resources = await getResources(supabase, access.userId, {
      category,
      favoritesOnly,
      query,
    });
    if (query) {
      cross = await searchNotesAndResources(supabase, access.userId, query);
    }
  } catch {
    migrationMissing = true;
  }

  function hrefWith(patch: Record<string, string | null>) {
    const next = new URLSearchParams();
    const q = patch.q !== undefined ? patch.q : query || null;
    const cat = patch.categorie !== undefined ? patch.categorie : category === 'all' ? null : category;
    const fav =
      patch.favoris !== undefined
        ? patch.favoris
        : favoritesOnly
          ? '1'
          : null;
    if (q) next.set('q', q);
    if (cat) next.set('categorie', cat);
    if (fav) next.set('favoris', fav);
    const qs = next.toString();
    return qs
      ? `${LINKS.adminMonEspaceRessources}?${qs}`
      : LINKS.adminMonEspaceRessources;
  }

  return (
    <div className="p-4 md:p-8 lg:p-10">
      <div className="max-w-3xl">
        <p className="text-sm text-slate-500">Organisation · admin uniquement</p>
        <h1 className="mt-1 flex items-center gap-2 font-display text-2xl font-bold text-slate-900 md:text-3xl">
          <Library className="text-[var(--accent)]" size={28} strokeWidth={1.75} />
          Ressources
        </h1>
        <p className="mt-2 text-slate-600">
          Bibliothèque interne : URL, documents, prompts, outils, procédures, modèles et
          ressources formation. Privé à votre compte admin.
        </p>
      </div>

      <MonEspaceSubnav pathname={LINKS.adminMonEspaceRessources} />

      {migrationMissing ? (
        <div
          className="mt-6 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="status"
        >
          Table ressources absente. Appliquez{' '}
          <code className="rounded bg-amber-100 px-1 font-mono text-xs">
            052_workspace_resources.sql
          </code>{' '}
          dans le SQL Editor Supabase, puis rechargez.
        </div>
      ) : (
        <div className="mt-6 max-w-3xl space-y-4">
          <OrganisationSearchBar
            basePath={LINKS.adminMonEspaceRessources}
            query={query}
            preserve={{
              categorie: category === 'all' ? undefined : category,
              favoris: favoritesOnly ? '1' : undefined,
            }}
          />

          <div className="flex flex-wrap gap-2">
            <Link
              href={hrefWith({ favoris: favoritesOnly ? null : '1' })}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                favoritesOnly
                  ? 'bg-amber-100 text-amber-900'
                  : 'border border-slate-200 bg-white text-slate-600'
              }`}
            >
              Favoris
            </Link>
            <Link
              href={hrefWith({ categorie: null })}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                category === 'all'
                  ? 'bg-[#377CF3] text-white'
                  : 'border border-slate-200 bg-white text-slate-600'
              }`}
            >
              Toutes
            </Link>
            {RESOURCE_CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={hrefWith({ categorie: c.id })}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  category === c.id
                    ? 'bg-[#377CF3] text-white'
                    : 'border border-slate-200 bg-white text-slate-600'
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>

          {query ? (
            <CrossSearchResults
              query={cross.query || query}
              notes={cross.notes}
              resources={cross.resources}
              current="ressources"
            />
          ) : null}

          <ResourceCreateForm />
          <ResourcesList resources={resources} />
        </div>
      )}
    </div>
  );
}
