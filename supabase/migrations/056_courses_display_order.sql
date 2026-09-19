-- ============================================================
-- Ordre d'affichage des formations (admin + catalogue LMS)
-- ============================================================

ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS display_order integer NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.courses.display_order IS
  'Ordre d''affichage admin / liste formations (0 = premier).';

-- Backfill : ordre actuel par date de création (plus récent en dernier / bas)
WITH ordered AS (
  SELECT
    id,
    (ROW_NUMBER() OVER (ORDER BY created_at ASC NULLS LAST, title ASC) - 1)::integer AS rn
  FROM public.courses
)
UPDATE public.courses c
SET display_order = ordered.rn
FROM ordered
WHERE c.id = ordered.id;

CREATE INDEX IF NOT EXISTS idx_courses_display_order
  ON public.courses (display_order, created_at DESC);
