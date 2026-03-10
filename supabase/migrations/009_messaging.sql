-- ============================================================
-- MESSAGING SYSTEM — Chat temps réel entre apprenants et formateurs
-- ============================================================
-- Conversations (cours ou privées), messages, pièces jointes, participants
-- Compatible Supabase Realtime
-- ============================================================

-- Types de conversation
-- 'course' = discussion de groupe liée à un cours (tous les inscrits)
-- 'direct' = conversation privée entre 2 utilisateurs

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('course', 'direct')),
  course_id uuid references public.courses(id) on delete cascade,
  title text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint course_or_direct check (
    (type = 'course' and course_id is not null) or
    (type = 'direct' and course_id is null)
  )
);

create index idx_conversations_course on public.conversations(course_id);
create index idx_conversations_type on public.conversations(type);

-- Participants à une conversation
create table if not exists public.conversation_participants (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text default 'member' check (role in ('member', 'instructor', 'admin')),
  joined_at timestamptz default now(),
  last_read_at timestamptz,
  muted_until timestamptz,
  banned boolean default false,
  banned_at timestamptz,
  banned_by uuid references auth.users(id) on delete set null,
  unique(conversation_id, user_id)
);

create index idx_participants_conversation on public.conversation_participants(conversation_id);
create index idx_participants_user on public.conversation_participants(user_id);

-- Messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  status text default 'sent' check (status in ('sending', 'sent', 'delivered', 'read', 'deleted')),
  pinned_by uuid references auth.users(id) on delete set null,
  pinned_at timestamptz,
  deleted_at timestamptz,
  deleted_by uuid references auth.users(id) on delete set null,
  reply_to_id uuid references public.messages(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_messages_conversation on public.messages(conversation_id);
create index idx_messages_sender on public.messages(sender_id);
create index idx_messages_created on public.messages(conversation_id, created_at desc);

-- Pièces jointes (un message peut avoir plusieurs fichiers)
create table if not exists public.message_attachments (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  file_url text not null,
  file_name text,
  file_type text,
  file_size int,
  created_at timestamptz default now()
);

create index idx_attachments_message on public.message_attachments(message_id);

-- Typing indicator (éphemère, nettoyé par cron ou TTL)
create table if not exists public.typing_indicators (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  updated_at timestamptz default now(),
  unique(conversation_id, user_id)
);

create index idx_typing_conversation on public.typing_indicators(conversation_id);

-- Compteur de messages non lus (denormalisé pour perf)
create table if not exists public.unread_counts (
  user_id uuid not null references auth.users(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  count int default 0,
  updated_at timestamptz default now(),
  primary key (user_id, conversation_id)
);

-- Activer Realtime pour les messages (nécessaire pour le chat temps réel)
-- À activer dans Supabase Dashboard > Database > Replication > supabase_realtime si la migration échoue
alter publication supabase_realtime add table public.messages;

-- RLS
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;
alter table public.message_attachments enable row level security;
alter table public.typing_indicators enable row level security;
alter table public.unread_counts enable row level security;

-- Helper: user is participant
create or replace function public.is_conversation_participant(conv_id uuid, uid uuid)
returns boolean as $$
  select exists (
    select 1 from public.conversation_participants
    where conversation_id = conv_id and user_id = uid and banned = false
  );
$$ language sql security definer stable;

-- Helper: user can access course conversation (enrolled or creator)
create or replace function public.can_access_course_conversation(cid uuid, uid uuid)
returns boolean as $$
  select exists (
    select 1 from public.enrollments e
    join public.conversations c on c.course_id = e.course_id and c.id = cid
    where e.user_id = uid
  ) or exists (
    select 1 from public.courses co
    join public.conversations c on c.course_id = co.id and c.id = cid
    where co.creator_id = uid
  );
$$ language sql security definer stable;

-- Helper: user can access course by course_id (for INSERT)
create or replace function public.can_access_course(course_uuid uuid, uid uuid)
returns boolean as $$
  select exists (select 1 from public.enrollments where course_id = course_uuid and user_id = uid)
  or exists (select 1 from public.courses where id = course_uuid and creator_id = uid)
  or exists (select 1 from public.profiles where id = uid and role in ('admin', 'formateur'));
$$ language sql security definer stable;

-- Conversations: lecture si participant (direct) ou accès cours (course)
drop policy if exists "Conversations: lecture participant" on public.conversations;
create policy "Conversations: lecture participant" on public.conversations for select using (
  (type = 'direct' and public.is_conversation_participant(id, auth.uid()))
  or (type = 'course' and public.can_access_course_conversation(id, auth.uid()))
  or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

-- Course: créable par user inscrit ou staff. Direct: tout user authentifié.
drop policy if exists "Conversations: insert" on public.conversations;
create policy "Conversations: insert" on public.conversations for insert with check (
  (type = 'course' and course_id is not null and public.can_access_course(course_id, auth.uid()))
  or (type = 'direct' and auth.uid() is not null)
);

drop policy if exists "Conversations: admin gère" on public.conversations;
create policy "Conversations: admin gère" on public.conversations for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Participants
drop policy if exists "Participants: lecture si conv visible" on public.conversation_participants;
create policy "Participants: lecture si conv visible" on public.conversation_participants for select using (
  (exists (select 1 from public.conversations c where c.id = conversation_id and c.type = 'direct')
   and public.is_conversation_participant(conversation_id, auth.uid()))
  or (exists (select 1 from public.conversations c where c.id = conversation_id and c.type = 'course')
      and public.can_access_course_conversation(conversation_id, auth.uid()))
  or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

-- Participants: admin/formateur pour course; tous pour direct (créateur de la conv)
drop policy if exists "Participants: insert par admin/formateur" on public.conversation_participants;
create policy "Participants: insert" on public.conversation_participants for insert with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
  or exists (select 1 from public.conversations c where c.id = conversation_id and c.type = 'direct' and c.created_by = auth.uid())
);

drop policy if exists "Participants: update par admin" on public.conversation_participants;
create policy "Participants: update par admin" on public.conversation_participants for update using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

-- Messages: lire si participant
drop policy if exists "Messages: lecture participant" on public.messages;
create policy "Messages: lecture participant" on public.messages for select using (
  (exists (select 1 from public.conversations c where c.id = conversation_id and c.type = 'direct')
   and public.is_conversation_participant(conversation_id, auth.uid()))
  or (exists (select 1 from public.conversations c where c.id = conversation_id and c.type = 'course')
      and public.can_access_course_conversation(conversation_id, auth.uid()))
  or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

drop policy if exists "Messages: insert si participant" on public.messages;
create policy "Messages: insert si participant" on public.messages for insert with check (
  auth.uid() = sender_id
  and (
    (exists (select 1 from public.conversations c where c.id = conversation_id and c.type = 'direct')
     and public.is_conversation_participant(conversation_id, auth.uid()))
    or (exists (select 1 from public.conversations c where c.id = conversation_id and c.type = 'course')
        and public.can_access_course_conversation(conversation_id, auth.uid()))
  )
);

drop policy if exists "Messages: update propre ou admin" on public.messages;
create policy "Messages: update propre ou admin" on public.messages for update using (
  auth.uid() = sender_id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
);

drop policy if exists "Messages: delete admin" on public.messages;
create policy "Messages: delete admin" on public.messages for delete using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Attachments
drop policy if exists "Attachments: lecture si message visible" on public.message_attachments;
create policy "Attachments: lecture si message visible" on public.message_attachments for select using (
  exists (
    select 1 from public.messages m
    where m.id = message_id and (
      public.is_conversation_participant(m.conversation_id, auth.uid())
      or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin', 'formateur'))
    )
  )
);

drop policy if exists "Attachments: insert avec message" on public.message_attachments;
create policy "Attachments: insert avec message" on public.message_attachments for insert with check (
  exists (
    select 1 from public.messages m
    where m.id = message_id and m.sender_id = auth.uid()
  )
);

-- Typing indicators
drop policy if exists "Typing: participant" on public.typing_indicators;
create policy "Typing: participant" on public.typing_indicators for all using (
  (exists (select 1 from public.conversations c where c.id = conversation_id and c.type = 'direct')
   and public.is_conversation_participant(conversation_id, auth.uid()))
  or (exists (select 1 from public.conversations c where c.id = conversation_id and c.type = 'course')
      and public.can_access_course_conversation(conversation_id, auth.uid()))
);

-- Unread counts
drop policy if exists "Unread: propre user" on public.unread_counts;
create policy "Unread: propre user" on public.unread_counts for all using (auth.uid() = user_id);

-- Trigger: créer conversation cours si pas encore créée
-- On créera les conversations cours via l'API au besoin

-- Trigger: last_read_at quand on lit les messages
-- Géré côté app
