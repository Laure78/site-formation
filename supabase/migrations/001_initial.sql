-- Profils utilisateurs (rôle : apprenant, formateur, admin)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text default 'apprenant' check (role in ('apprenant', 'formateur', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Formations
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  image_url text,
  price numeric(10,2) default 0,
  published boolean default false,
  creator_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Modules (dans un cours)
create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  order_index int default 0,
  created_at timestamptz default now()
);

-- Leçons (vidéo, pdf, texte, quiz)
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references public.modules(id) on delete cascade,
  title text not null,
  type text not null check (type in ('video', 'pdf', 'texte', 'quiz')),
  content_url text,
  content_text text,
  order_index int default 0,
  duration_minutes int,
  created_at timestamptz default now()
);

-- Questions de quiz
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  question text not null,
  options jsonb not null,
  correct_index int not null,
  order_index int default 0,
  created_at timestamptz default now()
);

-- Inscriptions (apprenant ↔ cours)
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  progress_percent int default 0,
  created_at timestamptz default now(),
  unique(user_id, course_id)
);

-- Progression par leçon
create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, lesson_id)
);

-- Trigger pour créer le profil à l'inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Permet de ré-exécuter le script sans erreur si le trigger existe déjà
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;

-- Policies (à affiner selon tes besoins) — drop if exists pour permettre de ré-exécuter le script
drop policy if exists "Profiles publics en lecture" on public.profiles;
drop policy if exists "Users peuvent mettre à jour leur profil" on public.profiles;
create policy "Profiles publics en lecture" on public.profiles for select using (true);
create policy "Users peuvent mettre à jour leur profil" on public.profiles for update using (auth.uid() = id);

drop policy if exists "Courses publics en lecture si publiés" on public.courses;
drop policy if exists "Creators peuvent tout faire sur leurs cours" on public.courses;
create policy "Courses publics en lecture si publiés" on public.courses for select using (published = true);
create policy "Creators peuvent tout faire sur leurs cours" on public.courses for all using (auth.uid() = creator_id);

drop policy if exists "Modules visibles si cours publié" on public.modules;
drop policy if exists "Creators gèrent les modules" on public.modules;
create policy "Modules visibles si cours publié" on public.modules for select using (
  exists (select 1 from public.courses c where c.id = modules.course_id and c.published)
);
create policy "Creators gèrent les modules" on public.modules for all using (
  exists (select 1 from public.courses c where c.id = modules.course_id and c.creator_id = auth.uid())
);

drop policy if exists "Lessons visibles si cours publié" on public.lessons;
drop policy if exists "Creators gèrent les lessons" on public.lessons;
create policy "Lessons visibles si cours publié" on public.lessons for select using (
  exists (select 1 from public.modules m join public.courses c on c.id = m.course_id where m.id = lessons.module_id and c.published)
);
create policy "Creators gèrent les lessons" on public.lessons for all using (
  exists (select 1 from public.modules m join public.courses c on c.id = m.course_id where m.id = lessons.module_id and c.creator_id = auth.uid())
);

drop policy if exists "Enrollments: propre user" on public.enrollments;
drop policy if exists "Lesson progress: propre user" on public.lesson_progress;
create policy "Enrollments: propre user" on public.enrollments for all using (auth.uid() = user_id);
create policy "Lesson progress: propre user" on public.lesson_progress for all using (auth.uid() = user_id);
