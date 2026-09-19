-- ============================================================
-- Mon espace (admin) — productivité personnelle staff
-- Isolation stricte : owner_id = auth.uid() uniquement
-- Pas d'accès croisé admin ↔ formateur
-- ============================================================

-- Colonnes de l'agenda (mois, jours de semaine, listes libres)
create table if not exists public.workspace_columns (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  section text not null check (section in ('months', 'week', 'custom')),
  header_tone text not null default 'blue'
    check (header_tone in ('blue', 'yellow', 'green', 'gray', 'rose', 'violet')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_workspace_columns_owner
  on public.workspace_columns(owner_id, section, sort_order);

-- Tâches / checklist items
create table if not exists public.workspace_tasks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  column_id uuid references public.workspace_columns(id) on delete cascade,
  title text not null,
  done boolean not null default false,
  emphasis boolean not null default false,
  due_date date,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_workspace_tasks_owner
  on public.workspace_tasks(owner_id, done, sort_order);
create index if not exists idx_workspace_tasks_column
  on public.workspace_tasks(column_id, sort_order);

-- Notes texte normal
create table if not exists public.workspace_notes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Note',
  body text not null default '',
  pinned boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_workspace_notes_owner
  on public.workspace_notes(owner_id, pinned desc, sort_order);

-- Favoris (liens internes admin / catalogue)
create table if not exists public.workspace_favorites (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  href text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_workspace_favorites_owner
  on public.workspace_favorites(owner_id, sort_order);

-- RLS
alter table public.workspace_columns enable row level security;
alter table public.workspace_tasks enable row level security;
alter table public.workspace_notes enable row level security;
alter table public.workspace_favorites enable row level security;

drop policy if exists "workspace_columns: own rows" on public.workspace_columns;
create policy "workspace_columns: own rows" on public.workspace_columns
  for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

drop policy if exists "workspace_tasks: own rows" on public.workspace_tasks;
create policy "workspace_tasks: own rows" on public.workspace_tasks
  for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

drop policy if exists "workspace_notes: own rows" on public.workspace_notes;
create policy "workspace_notes: own rows" on public.workspace_notes
  for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

drop policy if exists "workspace_favorites: own rows" on public.workspace_favorites;
create policy "workspace_favorites: own rows" on public.workspace_favorites
  for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());
