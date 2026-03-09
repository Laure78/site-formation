-- =====================================================
-- LMS EXTENDED — Paiements, quiz scores, ressources, commentaires
-- =====================================================

-- Étendre courses : durée, niveau, catégorie
alter table public.courses
  add column if not exists duration_hours numeric(5,1) default 4,
  add column if not exists level text default 'débutant' check (level in ('débutant', 'intermediaire', 'avance')),
  add column if not exists category text default 'BTP';

-- Paiements Stripe
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  course_id uuid references public.courses(id) on delete set null,
  stripe_payment_id text unique,
  stripe_session_id text,
  amount_cents int not null,
  currency text default 'eur',
  status text default 'pending' check (status in ('pending', 'succeeded', 'failed', 'refunded')),
  created_at timestamptz default now()
);

create index if not exists idx_payments_user on public.payments(user_id);
create index if not exists idx_payments_stripe on public.payments(stripe_payment_id);

-- Réponses quiz (score)
create table if not exists public.quiz_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  question_id uuid references public.quiz_questions(id) on delete cascade,
  selected_index int not null,
  is_correct boolean not null,
  created_at timestamptz default now()
);

create unique index if not exists idx_quiz_answers_unique on public.quiz_answers(user_id, question_id);

-- Ressources téléchargeables (liées à une leçon)
create table if not exists public.lesson_resources (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  title text not null,
  file_url text not null,
  file_type text,
  file_size int,
  order_index int default 0,
  created_at timestamptz default now()
);

-- Commentaires sous les leçons
create table if not exists public.lesson_comments (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- RLS
alter table public.payments enable row level security;
alter table public.quiz_answers enable row level security;
alter table public.lesson_resources enable row level security;
alter table public.lesson_comments enable row level security;

-- Policies
drop policy if exists "Payments: admin ou propre user" on public.payments;
create policy "Payments: admin ou propre user" on public.payments for select using (
  auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

drop policy if exists "Quiz answers: propre user" on public.quiz_answers;
create policy "Quiz answers: propre user" on public.quiz_answers for all using (auth.uid() = user_id);

drop policy if exists "Resources: visible si inscrit ou admin" on public.lesson_resources;
create policy "Resources: visible si inscrit ou admin" on public.lesson_resources for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
  or exists (
    select 1 from public.lessons l
    join public.modules m on m.id = l.module_id
    join public.enrollments e on e.course_id = m.course_id and e.user_id = auth.uid()
    where l.id = lesson_resources.lesson_id
  )
);

drop policy if exists "Creators gèrent resources" on public.lesson_resources;
create policy "Creators gèrent resources" on public.lesson_resources for all using (
  exists (
    select 1 from public.lessons l
    join public.modules m on m.id = l.module_id
    join public.courses c on c.id = m.course_id
    where l.id = lesson_resources.lesson_id and c.creator_id = auth.uid()
  )
);

drop policy if exists "Comments: lecture si inscrit" on public.lesson_comments;
create policy "Comments: lecture si inscrit" on public.lesson_comments for select using (
  exists (
    select 1 from public.lessons l
    join public.modules m on m.id = l.module_id
    join public.enrollments e on e.course_id = m.course_id and e.user_id = auth.uid()
    where l.id = lesson_comments.lesson_id
  ) or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

drop policy if exists "Comments: insert si inscrit" on public.lesson_comments;
create policy "Comments: insert si inscrit" on public.lesson_comments for insert with check (
  auth.uid() = user_id and exists (
    select 1 from public.lessons l
    join public.modules m on m.id = l.module_id
    join public.enrollments e on e.course_id = m.course_id and e.user_id = auth.uid()
    where l.id = lesson_comments.lesson_id
  )
);

-- Admin peut tout lire (enrollments, courses non publiés)
drop policy if exists "Enrollments: propre user" on public.enrollments;
create policy "Enrollments: propre user" on public.enrollments for all using (
  auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

-- Admin peut tout lire sur courses (y compris brouillons)
drop policy if exists "Courses publics en lecture si publiés" on public.courses;
create policy "Courses publics en lecture si publiés" on public.courses for select using (
  published = true or auth.uid() = creator_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

-- Adapter handle_new_user pour full_name
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'));
  return new;
end;
$$ language plpgsql security definer;
