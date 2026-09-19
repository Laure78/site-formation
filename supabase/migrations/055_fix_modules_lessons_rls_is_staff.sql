-- ============================================================
-- Fix RLS modules / lessons / lesson_resources
-- Remplace les sous-requêtes profiles (récursion) par is_staff()
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

-- Modules
DROP POLICY IF EXISTS "Modules: admin et formateur gèrent tout" ON public.modules;
DROP POLICY IF EXISTS "Creators gèrent les modules" ON public.modules;
DROP POLICY IF EXISTS "Modules visibles si cours publié" ON public.modules;

CREATE POLICY "Modules visibles si cours publié ou staff" ON public.modules
  FOR SELECT
  USING (
    public.is_staff(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = modules.course_id AND c.published = true
    )
  );

CREATE POLICY "Modules: creators ou staff gèrent" ON public.modules
  FOR ALL
  USING (
    public.is_staff(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = modules.course_id AND c.creator_id = auth.uid()
    )
  )
  WITH CHECK (
    public.is_staff(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = modules.course_id AND c.creator_id = auth.uid()
    )
  );

-- Lessons
DROP POLICY IF EXISTS "Lessons: admin et formateur gèrent tout" ON public.lessons;
DROP POLICY IF EXISTS "Creators gèrent les lessons" ON public.lessons;
DROP POLICY IF EXISTS "Lessons visibles si cours publié" ON public.lessons;

CREATE POLICY "Lessons visibles si cours publié ou staff" ON public.lessons
  FOR SELECT
  USING (
    public.is_staff(auth.uid())
    OR EXISTS (
      SELECT 1
      FROM public.modules m
      JOIN public.courses c ON c.id = m.course_id
      WHERE m.id = lessons.module_id AND c.published = true
    )
  );

CREATE POLICY "Lessons: creators ou staff gèrent" ON public.lessons
  FOR ALL
  USING (
    public.is_staff(auth.uid())
    OR EXISTS (
      SELECT 1
      FROM public.modules m
      JOIN public.courses c ON c.id = m.course_id
      WHERE m.id = lessons.module_id AND c.creator_id = auth.uid()
    )
  )
  WITH CHECK (
    public.is_staff(auth.uid())
    OR EXISTS (
      SELECT 1
      FROM public.modules m
      JOIN public.courses c ON c.id = m.course_id
      WHERE m.id = lessons.module_id AND c.creator_id = auth.uid()
    )
  );

-- Lesson resources
DROP POLICY IF EXISTS "Resources: visible si inscrit ou admin" ON public.lesson_resources;
DROP POLICY IF EXISTS "Creators gèrent resources" ON public.lesson_resources;

CREATE POLICY "Resources: visible inscrit ou staff" ON public.lesson_resources
  FOR SELECT
  USING (
    public.is_staff(auth.uid())
    OR EXISTS (
      SELECT 1
      FROM public.lessons l
      JOIN public.modules m ON m.id = l.module_id
      JOIN public.enrollments e ON e.course_id = m.course_id AND e.user_id = auth.uid()
      WHERE l.id = lesson_resources.lesson_id
    )
  );

CREATE POLICY "Resources: creators ou staff gèrent" ON public.lesson_resources
  FOR ALL
  USING (
    public.is_staff(auth.uid())
    OR EXISTS (
      SELECT 1
      FROM public.lessons l
      JOIN public.modules m ON m.id = l.module_id
      JOIN public.courses c ON c.id = m.course_id
      WHERE l.id = lesson_resources.lesson_id AND c.creator_id = auth.uid()
    )
  )
  WITH CHECK (
    public.is_staff(auth.uid())
    OR EXISTS (
      SELECT 1
      FROM public.lessons l
      JOIN public.modules m ON m.id = l.module_id
      JOIN public.courses c ON c.id = m.course_id
      WHERE l.id = lesson_resources.lesson_id AND c.creator_id = auth.uid()
    )
  );
