# Fix : Erreur « Could not find the 'meet_link' column »

Cette erreur apparaît lors de la prise de RDV quand la table `appointments` n'a pas les colonnes ajoutées par les migrations 019 et 020.

## Solution

1. Ouvrez **Supabase** (supabase.com) → votre projet
2. Allez dans **SQL Editor** → **New query**
3. Copiez-collez le code ci-dessous
4. Cliquez sur **Run**
5. Réessayez de prendre un RDV sur laureolivie.fr

```sql
-- Colonnes manquantes pour RDV visio / téléphone
alter table public.appointments add column if not exists type_rdv text default 'visio' check (type_rdv in ('telephone', 'visio'));
alter table public.appointments add column if not exists google_event_id text;
alter table public.appointments add column if not exists meet_link text;
```
