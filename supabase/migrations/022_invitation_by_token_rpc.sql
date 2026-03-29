-- ============================================================
-- Invitations : lecture par token pour visiteurs non connectés
-- ============================================================
-- Problème : RLS sur invitations n'autorisait le SELECT qu'aux admins.
-- Les liens /invitation/[token] renvoyaient donc 404 pour les apprenants.
-- Solution : fonction SECURITY DEFINER qui ne retourne qu'une ligne pour le token donné.
-- ============================================================

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
  SELECT i.id, i.email, i.course_id, i.expires_at, i.accepted_at
  FROM public.invitations i
  WHERE i.token = p_token
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_invitation_by_token(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_invitation_by_token(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_invitation_by_token(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_invitation_by_token(text) TO service_role;
