-- =====================================================
-- LEADS CHECKLIST IA BTP
-- Capture emails pour le lead magnet PDF
-- =====================================================

create table if not exists public.leads_checklist (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  email text not null,
  entreprise text,
  secteur text,
  date_inscription timestamptz default now()
);

create index if not exists idx_leads_checklist_email on public.leads_checklist(email);
create index if not exists idx_leads_checklist_date on public.leads_checklist(date_inscription);

alter table public.leads_checklist enable row level security;

-- Insertion publique (formulaire anonyme)
create policy "Leads: insert anonyme" on public.leads_checklist for insert with check (true);

-- Lecture/admin seulement
create policy "Leads: select admin" on public.leads_checklist for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

create policy "Leads: delete admin" on public.leads_checklist for delete using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);
