-- Demandes de contact — page /contact (RGPD : conservation 3 ans — voir politique confidentialité)

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null,
  subject text not null,
  message text not null,
  phone text,
  participants text,
  participant_role text,
  location text,
  period text,
  formation_theme text,
  formation_hint text,
  source_page text,
  created_at timestamptz not null default now()
);

create index if not exists idx_contact_requests_email on public.contact_requests(email);
create index if not exists idx_contact_requests_created on public.contact_requests(created_at desc);

alter table public.contact_requests enable row level security;

create policy "Contact: insert anonyme" on public.contact_requests for insert with check (true);
create policy "Contact: select admin" on public.contact_requests for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);
