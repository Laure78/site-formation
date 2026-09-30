-- ============================================================
-- Automatisations LMS (invitations) + traçabilité invitations
-- ============================================================

CREATE TABLE IF NOT EXISTS public.lms_automation_settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  invitation_auto_enabled boolean NOT NULL DEFAULT true,
  satisfaction_j1_enabled boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

INSERT INTO public.lms_automation_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.lms_automation_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "LMS automation settings: staff select" ON public.lms_automation_settings;
CREATE POLICY "LMS automation settings: staff select"
  ON public.lms_automation_settings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'formateur')
    )
  );

ALTER TABLE public.invitations
  ADD COLUMN IF NOT EXISTS last_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS opened_at timestamptz;

COMMENT ON COLUMN public.invitations.last_sent_at IS
  'Dernier envoi effectif de l''email d''invitation (création ou renvoi).';
COMMENT ON COLUMN public.invitations.opened_at IS
  'Première ouverture de la page /invitation/[token] (lien consulté).';

UPDATE public.invitations
SET last_sent_at = COALESCE(last_sent_at, created_at)
WHERE last_sent_at IS NULL;
