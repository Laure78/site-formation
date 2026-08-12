-- ============================================================
-- Sécurité profiles + invitations
-- - Empêche l’escalade de privilèges (role / account_status)
-- - Restreint la lecture profiles (plus de SELECT anon global)
-- - Supprime UPDATE libre invitee sur invitations
-- - RPC hash : uniquement pending non expirées
-- ============================================================

-- Helper SECURITY DEFINER : évite la récursion RLS sur profiles
CREATE OR REPLACE FUNCTION public.is_staff(uid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = uid AND p.role IN ('admin', 'formateur', 'moderator')
  );
$$;

REVOKE ALL ON FUNCTION public.is_staff(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO service_role;

-- Empêche un utilisateur authentifié de s’auto-promouvoir admin
CREATE OR REPLACE FUNCTION public.prevent_profile_privilege_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  jwt_role text := coalesce(auth.jwt() ->> 'role', '');
BEGIN
  IF TG_OP <> 'UPDATE' THEN
    RETURN NEW;
  END IF;

  -- Service role (API serveur) : autorisé
  IF jwt_role = 'service_role' THEN
    RETURN NEW;
  END IF;

  -- Admin authentifié : autorisé
  IF public.is_staff(auth.uid()) AND EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
  ) THEN
    RETURN NEW;
  END IF;

  IF NEW.role IS DISTINCT FROM OLD.role THEN
    RAISE EXCEPTION 'Modification du rôle interdite';
  END IF;

  IF NEW.account_status IS DISTINCT FROM OLD.account_status THEN
    RAISE EXCEPTION 'Modification du statut de compte interdite';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_profile_privilege_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_profile_privilege_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_profile_privilege_escalation();

-- UPDATE profil : sa propre ligne uniquement (le trigger bloque role/status)
DROP POLICY IF EXISTS "Users peuvent mettre à jour leur profil" ON public.profiles;
CREATE POLICY "Users peuvent mettre à jour leur profil" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Lecture profiles : soi-même ou staff (plus de SELECT public pour anon)
DROP POLICY IF EXISTS "Profiles publics en lecture" ON public.profiles;
DROP POLICY IF EXISTS "Profiles : lecture soi ou staff" ON public.profiles;
DROP POLICY IF EXISTS "Profiles : lecture co-membres conversation" ON public.profiles;

CREATE POLICY "Profiles : lecture soi ou staff" ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id
    OR public.is_staff(auth.uid())
  );

-- Noms pour la messagerie entre co-participants
CREATE POLICY "Profiles : lecture co-membres conversation" ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.conversation_participants cp_self
      JOIN public.conversation_participants cp_other
        ON cp_other.conversation_id = cp_self.conversation_id
      WHERE cp_self.user_id = auth.uid()
        AND cp_other.user_id = profiles.id
        AND coalesce(cp_self.banned, false) = false
        AND coalesce(cp_other.banned, false) = false
    )
  );

-- Invitations : plus d’UPDATE libre côté invité (tout passe par service role / API)
DROP POLICY IF EXISTS "Invitations: invitee can update accepted_at" ON public.invitations;

-- RPC : ne révèle que les invitations encore utilisables
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
    AND i.status = 'pending'
    AND i.expires_at > now()
  LIMIT 1;
$$;
