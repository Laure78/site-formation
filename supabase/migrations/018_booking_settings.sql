-- Paramètres du calendrier de prise de RDV
-- Fenêtre glissante + dates bloquées

-- Table des paramètres (singleton)
create table if not exists public.booking_settings (
  id text primary key default 'default',
  booking_window_days integer not null default 45 check (booking_window_days between 7 and 90),
  updated_at timestamptz default now()
);

insert into public.booking_settings (id, booking_window_days)
values ('default', 45)
on conflict (id) do nothing;

-- Dates bloquées (pas de réservation possible)
create table if not exists public.blocked_dates (
  id uuid primary key default gen_random_uuid(),
  date_blocked date not null unique,
  created_at timestamptz default now()
);

create index if not exists idx_blocked_dates_date on public.blocked_dates(date_blocked);

alter table public.booking_settings enable row level security;
alter table public.blocked_dates enable row level security;

-- Lecture publique pour le calendrier
create policy "BookingSettings: lecture publique" on public.booking_settings for select using (true);
create policy "BlockedDates: lecture publique" on public.blocked_dates for select using (true);

-- Écriture admin uniquement
create policy "BookingSettings: update admin" on public.booking_settings for update using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

create policy "BlockedDates: insert admin" on public.blocked_dates for insert with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

create policy "BlockedDates: delete admin" on public.blocked_dates for delete using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);
