-- Rendez-vous / demandes de réservation (comme Calendly)
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  start_at timestamptz not null,
  end_at timestamptz not null,
  client_name text not null,
  client_email text not null,
  client_phone text,
  client_message text,
  status text default 'demande' check (status in ('demande', 'confirme', 'annule')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS : lecture publique pour vérifier les créneaux pris, insertion publique (anonyme)
alter table public.appointments enable row level security;

drop policy if exists "Lecture des rendez-vous" on public.appointments;
create policy "Lecture des rendez-vous" on public.appointments for select using (true);

drop policy if exists "Insertion rendez-vous (anonyme)" on public.appointments;
create policy "Insertion rendez-vous (anonyme)" on public.appointments for insert with check (true);

-- Index pour les requêtes par date
create index if not exists idx_appointments_start_at on public.appointments(start_at);
create index if not exists idx_appointments_status on public.appointments(status);
