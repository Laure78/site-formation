-- Devis 60 secondes — Leads conversion
-- Formulaire rapide de demande de devis formation IA BTP

create table if not exists public.devis_60s_leads (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  prenom text not null,
  email text not null,
  telephone text,
  entreprise text,
  metier text check (metier in ('artisan', 'conducteur_travaux', 'bureau_etude', 'administratif', 'autre')),
  nb_salaries text check (nb_salaries in ('1-5', '6-10', '11-50', '50+')),
  problematique text check (problematique in (
    'automatiser_devis',
    'gain_temps_admin',
    'communication_client',
    'chatgpt_entreprise'
  )),
  date_creation timestamptz default now()
);

create index if not exists idx_devis_60s_email on public.devis_60s_leads(email);
create index if not exists idx_devis_60s_date on public.devis_60s_leads(date_creation);

alter table public.devis_60s_leads enable row level security;

create policy "Devis60s: insert anonyme" on public.devis_60s_leads for insert with check (true);
create policy "Devis60s: select admin" on public.devis_60s_leads for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);
create policy "Devis60s: delete admin" on public.devis_60s_leads for delete using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);
