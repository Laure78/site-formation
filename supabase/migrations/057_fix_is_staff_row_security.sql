-- ============================================================
-- Fix récursion RLS profiles (bloque la connexion admin)
-- Causes :
-- 1) Policy "lecture co-membres" → conversation_participants
--    → sous-requête profiles → récursion
-- 2) is_staff en LANGUAGE sql était inliné dans les policies
--    (perd SECURITY DEFINER / BYPASSRLS)
-- ============================================================

CREATE OR REPLACE FUNCTION public.is_staff(uid uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = uid
      AND p.role IN ('admin', 'formateur', 'moderator')
  );
END;
$$;

ALTER FUNCTION public.is_staff(uuid) OWNER TO postgres;

REVOKE ALL ON FUNCTION public.is_staff(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO anon;

-- Lecture profiles : soi OU staff (plus de policy co-membres récursive)
DROP POLICY IF EXISTS "Profiles : lecture soi ou staff" ON public.profiles;
DROP POLICY IF EXISTS "Profiles : lecture soi" ON public.profiles;
DROP POLICY IF EXISTS "Profiles : lecture staff" ON public.profiles;
DROP POLICY IF EXISTS "Profiles : lecture co-membres conversation" ON public.profiles;

CREATE POLICY "Profiles : lecture soi" ON public.profiles
  FOR SELECT
  USING ((SELECT auth.uid()) = id);

CREATE POLICY "Profiles : lecture staff" ON public.profiles
  FOR SELECT
  USING (public.is_staff((SELECT auth.uid())));

-- conversation_participants : remplacer sous-requêtes profiles par is_staff
DROP POLICY IF EXISTS "Participants: lecture si conv visible" ON public.conversation_participants;
CREATE POLICY "Participants: lecture si conv visible" ON public.conversation_participants
  FOR SELECT
  USING (
    (
      EXISTS (
        SELECT 1 FROM public.conversations c
        WHERE c.id = conversation_participants.conversation_id
          AND c.type = 'direct'
      )
      AND public.is_conversation_participant(conversation_id, auth.uid())
    )
    OR (
      EXISTS (
        SELECT 1 FROM public.conversations c
        WHERE c.id = conversation_participants.conversation_id
          AND c.type = 'course'
      )
      AND public.can_access_course_conversation(conversation_id, auth.uid())
    )
    OR public.is_staff(auth.uid())
  );

DROP POLICY IF EXISTS "Participants: update par admin" ON public.conversation_participants;
CREATE POLICY "Participants: update par admin" ON public.conversation_participants
  FOR UPDATE
  USING (public.is_staff(auth.uid()));
