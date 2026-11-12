-- Publication des sessions inter sur /dates-et-lieux
-- Étend training_sessions (cockpit existant) — pas de table parallèle.

ALTER TABLE public.training_sessions
  ADD COLUMN IF NOT EXISTS department_code text,
  ADD COLUMN IF NOT EXISTS listed_on_catalogue boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.training_sessions.department_code IS
  'Département IDF (75–95) — filtre public dates-et-lieux.';
COMMENT ON COLUMN public.training_sessions.listed_on_catalogue IS
  'Si true et statut confirmee : visible sur laureolivie.fr/dates-et-lieux (sessions inter uniquement).';

ALTER TABLE public.training_sessions
  DROP CONSTRAINT IF EXISTS training_sessions_status_check;

ALTER TABLE public.training_sessions
  ADD CONSTRAINT training_sessions_status_check CHECK (
    status IN (
      'brouillon', 'a_preparer', 'planifiee', 'confirmee', 'en_cours',
      'terminee', 'cloturee', 'annulee'
    )
  );

ALTER TABLE public.training_sessions
  DROP CONSTRAINT IF EXISTS training_sessions_department_code_check;

ALTER TABLE public.training_sessions
  ADD CONSTRAINT training_sessions_department_code_check CHECK (
    department_code IS NULL
    OR department_code ~ '^(75|77|78|91|92|93|94|95)$'
  );

-- Vue lecture anonyme — champs strictement publics (pas de notes internes).
CREATE OR REPLACE VIEW public.training_sessions_catalogue_public
WITH (security_barrier = true) AS
SELECT
  s.id,
  s.starts_on,
  s.ends_on,
  s.schedule_text,
  s.location_city,
  s.location_address,
  s.department_code,
  s.max_participants,
  p.catalogue_code,
  p.slug AS program_slug,
  p.title AS program_title,
  (
    SELECT count(*)::int
    FROM public.training_session_participants tsp
    WHERE tsp.session_id = s.id
      AND tsp.status NOT IN ('annule')
  ) AS enrolled_count
FROM public.training_sessions s
INNER JOIN public.training_programs p ON p.id = s.program_id
WHERE s.listed_on_catalogue = true
  AND s.company_id IS NULL
  AND s.modality = 'presentiel'
  AND s.status = 'confirmee'
  AND s.starts_on IS NOT NULL
  AND s.starts_on >= CURRENT_DATE
  AND s.archived_at IS NULL;

GRANT SELECT ON public.training_sessions_catalogue_public TO anon, authenticated;

COMMENT ON VIEW public.training_sessions_catalogue_public IS
  'Sessions inter confirmées listées sur /dates-et-lieux — lecture publique.';
