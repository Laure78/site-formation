-- Agent IA — Base vectorielle, conversations, prospects
-- pgvector pour RAG

create extension if not exists vector;

-- Chunks indexés pour RAG
create table if not exists public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  source_url text not null,
  source_title text,
  content text not null,
  embedding vector(1536),  -- OpenAI text-embedding-3-small
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create index if not exists idx_knowledge_chunks_embedding on public.knowledge_chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create index if not exists idx_knowledge_source on public.knowledge_chunks(source_url);

-- Conversations
create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  visitor_id text,  -- cookie/session anonyme
  metadata jsonb default '{}',  -- secteur, taille entreprise, etc.
  mode text default 'support' check (mode in ('support', 'commercial')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Messages
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.chat_conversations(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  sources jsonb,  -- liens cités
  created_at timestamptz default now()
);

create index if not exists idx_chat_messages_conv on public.chat_messages(conversation_id);

-- Prospects qualifiés (intérêt formations)
create table if not exists public.chat_prospects (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.chat_conversations(id) on delete set null,
  email text,
  phone text,
  name text,
  secteur text,
  taille_entreprise text,
  besoin_formation text,
  intent text check (intent in ('rdv', 'programme', 'recontact', 'info')),
  created_at timestamptz default now()
);

create index if not exists idx_chat_prospects_conv on public.chat_prospects(conversation_id);

-- RLS
alter table public.knowledge_chunks enable row level security;
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;
alter table public.chat_prospects enable row level security;

-- Lecture publique pour knowledge_chunks (RAG via service role)
create policy "Lecture knowledge" on public.knowledge_chunks for select using (true);

-- Chat : tout le monde peut créer conversations et messages
create policy "Insert conversations" on public.chat_conversations for insert with check (true);
create policy "Select own conversation" on public.chat_conversations for select using (true);
create policy "Update own conversation" on public.chat_conversations for update using (true);

create policy "Insert messages" on public.chat_messages for insert with check (true);
create policy "Select messages" on public.chat_messages for select using (true);

-- Prospects : admin only pour lire
create policy "Insert prospects" on public.chat_prospects for insert with check (true);
create policy "Admin read prospects" on public.chat_prospects for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','formateur'))
);

-- Fonction recherche vectorielle
create or replace function match_knowledge(query_embedding vector(1536), match_count int default 5)
returns table (id uuid, source_url text, source_title text, content text, similarity float)
language plpgsql
as $$
begin
  return query
  select
    k.id,
    k.source_url,
    k.source_title,
    k.content,
    1 - (k.embedding <=> query_embedding) as similarity
  from public.knowledge_chunks k
  where k.embedding is not null
  order by k.embedding <=> query_embedding
  limit match_count;
end;
$$;
