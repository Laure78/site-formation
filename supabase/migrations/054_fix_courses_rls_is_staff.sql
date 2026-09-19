-- ============================================================
-- Fix RLS courses : plus de sous-requête directe sur profiles
-- (récursion profiles ↔ courses → liste admin vide)
-- ============================================================

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
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO anon;

DROP POLICY IF EXISTS "Courses publics en lecture si publiés" ON public.courses;
CREATE POLICY "Courses publics en lecture si publiés" ON public.courses
  FOR SELECT
  USING (
    published = true
    OR auth.uid() = creator_id
    OR public.is_staff(auth.uid())
  );

-- Alignement écriture creators / staff
DROP POLICY IF EXISTS "Creators peuvent tout faire sur leurs cours" ON public.courses;
CREATE POLICY "Creators ou staff gèrent les cours" ON public.courses
  FOR ALL
  USING (
    auth.uid() = creator_id
    OR public.is_staff(auth.uid())
  )
  WITH CHECK (
    auth.uid() = creator_id
    OR public.is_staff(auth.uid())
  );
