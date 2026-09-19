-- ============================================================
-- Organisation — Mes listes (checklists admin)
-- Isolation : owner_id = auth.uid()
-- Distinct de workspace_tasks (agenda) et notes/ressources
-- ============================================================

create table if not exists public.workspace_list_categories (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  icon text not null default '📋',
  color text not null default 'blue'
    check (color in (
      'blue', 'sky', 'amber', 'rose', 'violet', 'emerald', 'slate', 'orange'
    )),
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_workspace_list_categories_owner
  on public.workspace_list_categories(owner_id, position);

create table if not exists public.workspace_lists (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid not null references public.workspace_list_categories(id) on delete cascade,
  title text not null,
  is_favorite boolean not null default false,
  archived boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_workspace_lists_owner_cat
  on public.workspace_lists(owner_id, category_id, position);
create index if not exists idx_workspace_lists_owner_fav
  on public.workspace_lists(owner_id, is_favorite)
  where archived = false;

create table if not exists public.workspace_list_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  list_id uuid not null references public.workspace_lists(id) on delete cascade,
  title text not null,
  note text,
  completed boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_workspace_list_items_list
  on public.workspace_list_items(list_id, position);
create index if not exists idx_workspace_list_items_owner
  on public.workspace_list_items(owner_id);

alter table public.workspace_list_categories enable row level security;
alter table public.workspace_lists enable row level security;
alter table public.workspace_list_items enable row level security;

drop policy if exists "workspace_list_categories: own" on public.workspace_list_categories;
create policy "workspace_list_categories: own" on public.workspace_list_categories
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

drop policy if exists "workspace_lists: own" on public.workspace_lists;
create policy "workspace_lists: own" on public.workspace_lists
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

drop policy if exists "workspace_list_items: own" on public.workspace_list_items;
create policy "workspace_list_items: own" on public.workspace_list_items
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
