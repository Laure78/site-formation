-- ============================================================
-- Organisation — Ressources admin internes
-- Isolation : owner_id = auth.uid()
-- ============================================================

create table if not exists public.workspace_resources (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null default '',
  kind text not null default 'url'
    check (kind in (
      'url',
      'document',
      'prompt',
      'outil',
      'procedure',
      'modele',
      'ressource_formation'
    )),
  category text not null default 'autre'
    check (category in (
      'formation',
      'qualiopi',
      'prospection',
      'administratif',
      'ia',
      'communication',
      'site',
      'autre'
    )),
  link text,
  is_favorite boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_workspace_resources_owner
  on public.workspace_resources(owner_id, is_favorite desc, sort_order);

create index if not exists idx_workspace_resources_owner_category
  on public.workspace_resources(owner_id, category);

alter table public.workspace_resources enable row level security;

drop policy if exists "workspace_resources: own rows" on public.workspace_resources;
create policy "workspace_resources: own rows" on public.workspace_resources
  for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());
