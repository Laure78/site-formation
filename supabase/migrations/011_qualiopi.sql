-- =====================================================
-- QUALIOPI — Traçabilité, satisfaction, émargement
-- =====================================================

-- Durée formation (pour attestations)
alter table public.courses add column if not exists duration_hours numeric(5,2);

-- Session logs (traçabilité des connexions)
create table if not exists public.session_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  started_at timestamptz default now() not null,
  ended_at timestamptz,
  duration_seconds int,
  ip_address text,
  user_agent text,
  modules_consulted jsonb default '[]', -- ["module_id1", "module_id2"]
  created_at timestamptz default now()
);

create index if not exists idx_session_logs_user on public.session_logs(user_id);
create index if not exists idx_session_logs_started on public.session_logs(started_at);

-- Évaluations de satisfaction (fin de formation)
create table if not exists public.satisfaction_surveys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  note_globale int check (note_globale >= 1 and note_globale <= 5),
  note_contenu int check (note_contenu >= 1 and note_contenu <= 5),
  note_utilite int check (note_utilite >= 1 and note_utilite <= 5),
  commentaire text,
  created_at timestamptz default now(),
  unique(user_id, course_id)
);

create index if not exists idx_satisfaction_course on public.satisfaction_surveys(course_id);

-- Feuilles d'émargement numériques
create table if not exists public.attendance_sheets (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade not null,
  session_date date not null,
  session_label text, -- "Session 1", "Module devis", etc.
  created_at timestamptz default now(),
  created_by uuid references auth.users(id) on delete set null
);

create table if not exists public.attendance_signatures (
  id uuid primary key default gen_random_uuid(),
  attendance_sheet_id uuid references public.attendance_sheets(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  signed_at timestamptz default now() not null,
  ip_address text,
  unique(attendance_sheet_id, user_id)
);

create index if not exists idx_attendance_sheet on public.attendance_signatures(attendance_sheet_id);

-- Invitations apprenants (liens sécurisés)
create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  token text unique not null,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  invited_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

create index if not exists idx_invitations_token on public.invitations(token);
create index if not exists idx_invitations_email on public.invitations(email);

-- RLS
alter table public.session_logs enable row level security;
alter table public.satisfaction_surveys enable row level security;
alter table public.attendance_sheets enable row level security;
alter table public.attendance_signatures enable row level security;
alter table public.invitations enable row level security;

-- session_logs: lecture par admin, insert par user connecté (pour ses propres logs)
create policy "Session logs: insert own" on public.session_logs for insert with check (auth.uid() = user_id);
create policy "Session logs: select own or admin" on public.session_logs for select using (
  auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

-- satisfaction_surveys: insert par user pour sa formation, lecture admin
create policy "Satisfaction: insert own" on public.satisfaction_surveys for insert with check (auth.uid() = user_id);
create policy "Satisfaction: select own or admin" on public.satisfaction_surveys for select using (
  auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

-- attendance: admin gère, apprenant signe
create policy "Attendance sheets: admin all" on public.attendance_sheets for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);
create policy "Attendance signatures: insert if enrolled" on public.attendance_signatures for insert with check (
  auth.uid() = user_id and exists (
    select 1 from public.attendance_sheets a
    join public.enrollments e on e.course_id = a.course_id
    where a.id = attendance_sheet_id and e.user_id = auth.uid()
  )
);
create policy "Attendance signatures: select admin or own" on public.attendance_signatures for select using (
  auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

-- invitations: admin gère, ou invité peut marquer accepté (email correspond)
create policy "Invitations: admin all" on public.invitations for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);
create policy "Invitations: invitee can update accepted_at" on public.invitations for update using (
  lower((select p.email from public.profiles p where p.id = auth.uid())) = lower(invitations.email)
);
