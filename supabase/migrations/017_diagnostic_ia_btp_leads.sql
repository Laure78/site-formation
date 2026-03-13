-- Diagnostic IA BTP gratuit — Leads conversion
-- Quiz 5 questions + formulaire contact pour génération leads qualifiés

create table if not exists public.diagnostic_ia_btp_leads (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  entreprise text,
  email text not null,
  telephone text,
  -- Réponses au quiz (JSON)
  reponses jsonb not null default '{}',
  -- Métadonnées
  date_creation timestamptz default now()
);

create index if not exists idx_diagnostic_ia_btp_email on public.diagnostic_ia_btp_leads(email);
create index if not exists idx_diagnostic_ia_btp_date on public.diagnostic_ia_btp_leads(date_creation);

alter table public.diagnostic_ia_btp_leads enable row level security;

create policy "DiagnosticIA: insert anonyme" on public.diagnostic_ia_btp_leads for insert with check (true);
create policy "DiagnosticIA: select admin" on public.diagnostic_ia_btp_leads for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);
create policy "DiagnosticIA: delete admin" on public.diagnostic_ia_btp_leads for delete using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);
