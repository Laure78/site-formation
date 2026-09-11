-- =====================================================
-- Relance satisfaction J+1 — date de fin session + anti-doublon email
-- =====================================================

-- Date de fin de session (calendrier civil) + annulation session
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS session_ends_on date,
  ADD COLUMN IF NOT EXISTS session_cancelled boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.courses.session_ends_on IS
  'Date de fin de la session présentielle (Europe/Paris). Relance satisfaction à J+1.';
COMMENT ON COLUMN public.courses.session_cancelled IS
  'Session annulée : aucune relance satisfaction J+1.';

-- Statut inscription (soft cancel)
ALTER TABLE public.enrollments
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active';

DO $$ BEGIN
  ALTER TABLE public.enrollments
    ADD CONSTRAINT enrollments_status_check
    CHECK (status IN ('active', 'cancelled'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Événements email par inscription (unicité apprenant+session via enrollment)
CREATE TABLE IF NOT EXISTS public.enrollment_email_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  email_type text NOT NULL CHECK (email_type IN ('satisfaction_j1')),
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'sending', 'sent', 'failed')),
  scheduled_for date,
  sent_at timestamptz,
  last_error text,
  attempt_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (enrollment_id, email_type)
);

CREATE INDEX IF NOT EXISTS idx_enrollment_email_events_status
  ON public.enrollment_email_events (email_type, status);

CREATE INDEX IF NOT EXISTS idx_courses_session_ends_on
  ON public.courses (session_ends_on)
  WHERE session_ends_on IS NOT NULL AND session_cancelled = false;

ALTER TABLE public.enrollment_email_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enrollment email events: admin select" ON public.enrollment_email_events;
CREATE POLICY "Enrollment email events: admin select"
  ON public.enrollment_email_events
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'formateur')
    )
  );

-- Écritures réservées au service role (cron) — pas de policy INSERT/UPDATE pour les clients.
