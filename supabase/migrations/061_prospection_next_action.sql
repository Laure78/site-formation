-- next_action + segments enregistrés
ALTER TABLE public.prospects
  ADD COLUMN IF NOT EXISTS next_action text,
  ADD COLUMN IF NOT EXISTS next_action_type text,
  ADD COLUMN IF NOT EXISTS next_action_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_prospects_next_action_at
  ON public.prospects(next_action_at)
  WHERE next_action_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_prospects_sans_next_action
  ON public.prospects(id)
  WHERE next_action IS NULL AND prochaine_relance_at IS NULL;

CREATE TABLE IF NOT EXISTS public.prospecting_segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  filters jsonb NOT NULL DEFAULT '{}',
  is_preset boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

ALTER TABLE public.prospecting_segments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "prospecting_segments_staff" ON public.prospecting_segments;
CREATE POLICY "prospecting_segments_staff" ON public.prospecting_segments
  FOR ALL USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Backfill next_action depuis prochaine_relance / statut
UPDATE public.prospects
SET
  next_action = CASE
    WHEN prochaine_relance_at IS NOT NULL THEN coalesce(relance_motif, 'Relancer')
    WHEN statut = 'a_contacter' THEN 'Envoyer premier email'
    WHEN statut = 'email_envoye' THEN 'Relancer'
    WHEN statut = 'a_relancer' THEN 'Relancer'
    WHEN statut = 'reponse_recue' THEN 'Traiter la réponse'
    WHEN statut = 'rdv_prevu' THEN 'Préparer RDV'
    WHEN statut = 'opportunite' THEN 'Faire avancer l’opportunité'
    WHEN statut = 'proposition_envoyee' THEN 'Suivre la proposition'
    ELSE next_action
  END,
  next_action_type = CASE
    WHEN prochaine_relance_at IS NOT NULL OR statut IN ('email_envoye', 'a_relancer', 'relance') THEN 'relancer'
    WHEN statut = 'a_contacter' THEN 'envoyer_premier_email'
    WHEN statut = 'reponse_recue' THEN 'attendre_reponse'
    WHEN statut = 'rdv_prevu' THEN 'preparer_rdv'
    WHEN statut IN ('opportunite', 'proposition_envoyee') THEN 'envoyer_proposition'
    ELSE next_action_type
  END,
  next_action_at = coalesce(next_action_at, prochaine_relance_at)
WHERE next_action IS NULL
  AND coalesce(statut, '') NOT IN ('client', 'pas_interesse');
