-- Lead magnet — Guide Skill IA conducteur de travaux (capture email)

create table if not exists public.leads_lead_magnet (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  email text not null,
  company text,
  role text not null,
  tag text not null default 'leadmagnet-skill-ia-conducteur-travaux',
  consent_rgpd boolean not null default true,
  created_at timestamptz default now()
);

create index if not exists idx_leads_lead_magnet_email on public.leads_lead_magnet(email);
create index if not exists idx_leads_lead_magnet_tag on public.leads_lead_magnet(tag);
create index if not exists idx_leads_lead_magnet_created on public.leads_lead_magnet(created_at);

alter table public.leads_lead_magnet enable row level security;

create policy "Lead magnet: insert anonyme" on public.leads_lead_magnet for insert with check (true);

create policy "Lead magnet: select admin" on public.leads_lead_magnet for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

create policy "Lead magnet: delete admin" on public.leads_lead_magnet for delete using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);
