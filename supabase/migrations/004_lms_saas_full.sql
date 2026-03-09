-- =====================================================
-- LMS SaaS FULL — Community, Gamification, Certificates, Moderator
-- =====================================================

-- Ajouter rôle moderator à profiles
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('apprenant', 'formateur', 'admin', 'moderator'));

-- Avatar URL pour profiles
alter table public.profiles add column if not exists avatar_url text;

-- Community : posts
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete set null,
  category text default 'general' check (category in ('general', 'course_questions', 'ai_tools')),
  title text not null,
  content text not null,
  is_pinned boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_community_posts_course on public.community_posts(course_id);
create index if not exists idx_community_posts_category on public.community_posts(category);

-- Community : commentaires sur posts
create table if not exists public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.community_posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now()
);

-- Community : likes
create table if not exists public.community_likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.community_posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

-- Gamification : points et badges
alter table public.profiles add column if not exists points int default 0;

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  icon_url text,
  points_required int default 0,
  created_at timestamptz default now()
);

create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  badge_id uuid references public.badges(id) on delete cascade not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

-- Certificats
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  pdf_url text,
  completed_at timestamptz default now(),
  unique(user_id, course_id)
);

-- Quiz results (résumé par tentative)
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  score_percent int not null,
  total_questions int not null,
  correct_count int not null,
  created_at timestamptz default now()
);

-- RLS
alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_likes enable row level security;
alter table public.user_badges enable row level security;
alter table public.certificates enable row level security;
alter table public.quiz_attempts enable row level security;

-- Community policies
create policy "Posts: lecture par inscrits au cours ou public" on public.community_posts for select using (
  course_id is null or exists (
    select 1 from public.enrollments e where e.course_id = community_posts.course_id and e.user_id = auth.uid()
  ) or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur', 'moderator'))
);

create policy "Posts: insert par user connecté" on public.community_posts for insert with check (auth.uid() = user_id);

create policy "Posts: update par auteur ou admin" on public.community_posts for update using (
  auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur', 'moderator'))
);

create policy "Comments: lecture si post visible" on public.community_comments for select using (
  exists (select 1 from public.community_posts cp where cp.id = community_comments.post_id)
);

create policy "Comments: insert par user" on public.community_comments for insert with check (auth.uid() = user_id);

create policy "Likes: all" on public.community_likes for all using (true);

-- Badges, certificates, quiz_attempts
create policy "User badges: lecture propre" on public.user_badges for select using (auth.uid() = user_id);
create policy "Certificates: lecture propre ou admin" on public.certificates for select using (
  auth.uid() = user_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);
create policy "Quiz attempts: propre user" on public.quiz_attempts for all using (auth.uid() = user_id);

-- Insérer badges par défaut
insert into public.badges (name, description, points_required) values
  ('Premier pas', 'Première leçon terminée', 10),
  ('Étudiant assidu', '5 leçons terminées', 50),
  ('Expert', 'Formation complétée à 100%', 200),
  ('Quiz master', 'Premier quiz réussi', 25)
on conflict (name) do nothing;
