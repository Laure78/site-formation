-- ============================================================
-- Organisation — Suivi administratif (checklist configurable)
-- Ancre : courses.id (= session datée via session_ends_on)
-- Ne duplique pas satisfaction / émargement / LMS : couche d'état admin
-- ============================================================

create table if not exists public.admin_checklist_definitions (
  id uuid primary key default gen_random_uuid(),
  item_key text not null unique,
  label text not null,
  description text,
  phase text not null default 'avant'
    check (phase in ('avant', 'pendant', 'apres')),
  sort_order integer not null default 0,
  default_enabled boolean not null default true,
  is_active boolean not null default true,
  -- Si renseigné : le statut peut être dérivé des données existantes
  auto_source text
    check (auto_source is null or auto_source in ('satisfaction_surveys')),
  created_at timestamptz not null default now()
);

create table if not exists public.course_checklist_entries (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  definition_id uuid not null references public.admin_checklist_definitions(id) on delete cascade,
  enabled boolean not null default true,
  status text not null default 'todo'
    check (status in ('todo', 'waiting', 'done')),
  note text,
  due_date date,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (course_id, definition_id)
);

create index if not exists idx_course_checklist_entries_course
  on public.course_checklist_entries(course_id);

create index if not exists idx_course_checklist_entries_status
  on public.course_checklist_entries(status)
  where enabled = true;

alter table public.admin_checklist_definitions enable row level security;
alter table public.course_checklist_entries enable row level security;

-- Lecture / écriture réservées au rôle admin (section Organisation)
drop policy if exists "admin_checklist_definitions: staff all" on public.admin_checklist_definitions;
create policy "admin_checklist_definitions: admin all"
  on public.admin_checklist_definitions
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "course_checklist_entries: staff all" on public.course_checklist_entries;
create policy "course_checklist_entries: admin all"
  on public.course_checklist_entries
  for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Seed items (idempotent)
insert into public.admin_checklist_definitions
  (item_key, label, description, phase, sort_order, default_enabled, auto_source)
values
  ('convention', 'Convention / contrat', 'Convention de formation ou contrat signé', 'avant', 10, true, null),
  ('convocation', 'Convocation', 'Convocation envoyée aux participants', 'avant', 20, true, null),
  ('programme', 'Programme', 'Programme remis / disponible', 'avant', 30, true, null),
  ('questionnaire_prealable', 'Questionnaire préalable', 'Positionnement / besoins avant session', 'avant', 40, false, null),
  ('emargement', 'Feuille d''émargement', 'Émargement réalisé (print ou numérique)', 'pendant', 50, true, null),
  ('satisfaction', 'Questionnaire de satisfaction', 'Satisfaction à chaud (données plateforme si dispo)', 'apres', 60, true, 'satisfaction_surveys'),
  ('attestation', 'Attestation / certificat de réalisation', 'Remis aux participants', 'apres', 70, true, null),
  ('facture', 'Facture', 'Facture émise (OFC / OPCO)', 'apres', 80, true, null),
  ('reglement', 'Règlement', 'Paiement reçu ou OPCO validé', 'apres', 90, true, null),
  ('archivage', 'Archivage du dossier', 'Dossier session archivé', 'apres', 100, true, null)
on conflict (item_key) do update set
  label = excluded.label,
  description = excluded.description,
  phase = excluded.phase,
  sort_order = excluded.sort_order,
  auto_source = excluded.auto_source;
