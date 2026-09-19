-- ============================================================
-- Mon espace — événements agenda (vue semaine V1)
-- Isolation : owner_id = auth.uid()
-- ============================================================

create table if not exists public.workspace_events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  start_at timestamptz not null,
  end_at timestamptz not null,
  description text,
  category text not null default 'autre'
    check (category in (
      'formation',
      'administratif',
      'prospection',
      'contenu',
      'personnel',
      'autre'
    )),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workspace_events_end_after_start check (end_at > start_at)
);

create index if not exists idx_workspace_events_owner_range
  on public.workspace_events(owner_id, start_at, end_at);

create index if not exists idx_workspace_tasks_owner_due
  on public.workspace_tasks(owner_id, due_date)
  where due_date is not null;

alter table public.workspace_events enable row level security;

drop policy if exists "workspace_events: own rows" on public.workspace_events;
create policy "workspace_events: own rows" on public.workspace_events
  for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());
