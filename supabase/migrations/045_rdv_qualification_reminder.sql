-- Qualification RDV progressive + rappel J-1
-- Élargit prospects (sans casser les lignes existantes) et ajoute reminder_sent_at sur appointments.

alter table public.prospects drop constraint if exists prospects_secteur_check;
alter table public.prospects drop constraint if exists prospects_taille_entreprise_check;
alter table public.prospects drop constraint if exists prospects_niveau_ia_check;
alter table public.prospects drop constraint if exists prospects_objectif_check;
alter table public.prospects drop constraint if exists prospects_budget_check;

alter table public.prospects
  add column if not exists fonction text,
  add column if not exists besoins text[] default '{}',
  add column if not exists personnes_concernees text,
  add column if not exists echeance text,
  add column if not exists priorite_detail text,
  add column if not exists source_page text,
  add column if not exists utm text,
  add column if not exists meta jsonb default '{}'::jsonb;

alter table public.appointments
  add column if not exists reminder_sent_at timestamptz,
  add column if not exists manage_token uuid default gen_random_uuid();

-- Tokens de gestion (annulation / report) pour les lignes déjà créées
update public.appointments
set manage_token = gen_random_uuid()
where manage_token is null;

create unique index if not exists idx_appointments_manage_token
  on public.appointments (manage_token);

create index if not exists idx_appointments_reminder
  on public.appointments (start_at)
  where reminder_sent_at is null and status is distinct from 'annule';

comment on column public.appointments.reminder_sent_at is
  'Idempotence rappel client la veille à 15:00 Europe/Paris';

comment on column public.appointments.manage_token is
  'Jeton opaque pour annuler / reporter sans compte (liens email)';
