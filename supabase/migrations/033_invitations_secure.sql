-- ============================================================
-- Invitations sécurisées : token_hash, statut, sent_count, citext
-- Remplace le stockage du token en clair (011_qualiopi).
-- ============================================================

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

DO $$ BEGIN
  CREATE TYPE public.invitation_status AS ENUM ('pending', 'accepted', 'expired', 'revoked');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Statut compte apprenant (invité avant activation mot de passe)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS account_status text NOT NULL DEFAULT 'active';

DO $$ BEGIN
  ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_account_status_check
    CHECK (account_status IN ('invited', 'active', 'disabled'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Colonnes nouvelles
ALTER TABLE public.invitations
  ADD COLUMN IF NOT EXISTS token_hash text,
  ADD COLUMN IF NOT EXISTS status public.invitation_status,
  ADD COLUMN IF NOT EXISTS sent_count integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Migrer course_id → formation_id (nullable)
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'invitations' AND column_name = 'course_id'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'invitations' AND column_name = 'formation_id'
  ) THEN
    ALTER TABLE public.invitations RENAME COLUMN course_id TO formation_id;
  END IF;
END $$;

ALTER TABLE public.invitations
  ALTER COLUMN formation_id DROP NOT NULL;

-- Email citext
ALTER TABLE public.invitations
  ALTER COLUMN email TYPE citext USING lower(email::text)::citext;

-- Remplir token_hash / status : les anciens tokens en clair sont RÉVOQUÉS
-- (forcer un renvoi d’invitation — plus sûr que de conserver des liens déjà exposés)
UPDATE public.invitations
SET
  token_hash = encode(gen_random_bytes(32), 'hex'),
  status = CASE
    WHEN accepted_at IS NOT NULL THEN 'accepted'::public.invitation_status
    ELSE 'revoked'::public.invitation_status
  END
WHERE token_hash IS NULL;

-- Lignes encore sans status
UPDATE public.invitations
SET
  status = COALESCE(status, 'revoked'::public.invitation_status),
  token_hash = COALESCE(token_hash, encode(gen_random_bytes(32), 'hex'));

ALTER TABLE public.invitations
  ALTER COLUMN status SET NOT NULL,
  ALTER COLUMN status SET DEFAULT 'pending'::public.invitation_status;

-- Exiger token_hash pour les pending futurs ; anciennes accepted peuvent garder un hash
ALTER TABLE public.invitations
  ALTER COLUMN token_hash SET NOT NULL;

-- Supprimer le token en clair
ALTER TABLE public.invitations DROP COLUMN IF EXISTS token;

DROP INDEX IF EXISTS public.idx_invitations_token;
CREATE UNIQUE INDEX IF NOT EXISTS idx_invitations_token_hash ON public.invitations (token_hash);
CREATE INDEX IF NOT EXISTS idx_invitations_email_status ON public.invitations (email, status);

-- RPC : résolution par hash (jamais le token brut en SQL côté app après hashage)
CREATE OR REPLACE FUNCTION public.get_invitation_by_token_hash(p_token_hash text)
RETURNS TABLE (
  id uuid,
  email text,
  formation_id uuid,
  expires_at timestamptz,
  accepted_at timestamptz,
  status public.invitation_status,
  first_name text,
  last_name text,
  user_id uuid,
  sent_count integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    i.id,
    i.email::text,
    i.formation_id,
    i.expires_at,
    i.accepted_at,
    i.status,
    i.first_name,
    i.last_name,
    i.user_id,
    i.sent_count
  FROM public.invitations i
  WHERE i.token_hash = p_token_hash
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_invitation_by_token_hash(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_invitation_by_token_hash(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_invitation_by_token_hash(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_invitation_by_token_hash(text) TO service_role;

-- Ancienne RPC (token clair) : refuse toute résolution (tokens migrés révoqués)
CREATE OR REPLACE FUNCTION public.get_invitation_by_token(p_token text)
RETURNS TABLE (
  id uuid,
  email text,
  course_id uuid,
  expires_at timestamptz,
  accepted_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    i.id,
    i.email::text,
    i.formation_id AS course_id,
    i.expires_at,
    i.accepted_at
  FROM public.invitations i
  WHERE false;
$$;
