-- Recrutement formateurs BTP — pipeline entretiens / évaluations (admin + staff)

CREATE TABLE IF NOT EXISTS public.recruitment_candidats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  legal_status text CHECK (legal_status IS NULL OR legal_status IN ('micro_entreprise', 'societe', 'autre')),
  siret text,
  nda text,
  btp_background text,
  ai_usage text,
  source text CHECK (source IS NULL OR source IN (
    'site', 'malt', 'facebook', 'indeed', 'linkedin', 'estp_alumni'
  )),
  formations text[] NOT NULL DEFAULT '{}',
  stage smallint NOT NULL DEFAULT 1 CHECK (stage IN (1, 2)),
  interview_at timestamptz,
  interview_modality text CHECK (interview_modality IS NULL OR interview_modality IN ('presentiel_paris', 'visio_zoom')),
  zoom_link text,
  zoom_id text,
  zoom_passcode text,
  status text NOT NULL DEFAULT 'a_confirmer' CHECK (status IN (
    'a_confirmer', 'confirme', 'retenu_etape_2', 'retenu', 'a_revoir', 'non_retenu'
  )),
  last_contact_at timestamptz,
  career_application_id uuid REFERENCES public.career_applications(id) ON DELETE SET NULL,
  is_example boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_recruitment_candidats_interview_slot
  ON public.recruitment_candidats (interview_at)
  WHERE interview_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_recruitment_candidats_status ON public.recruitment_candidats (status);
CREATE INDEX IF NOT EXISTS idx_recruitment_candidats_stage ON public.recruitment_candidats (stage);
CREATE INDEX IF NOT EXISTS idx_recruitment_candidats_name ON public.recruitment_candidats (lower(last_name), lower(first_name));
CREATE INDEX IF NOT EXISTS idx_recruitment_candidats_interview_day ON public.recruitment_candidats ((interview_at AT TIME ZONE 'Europe/Paris'));

CREATE TABLE IF NOT EXISTS public.recruitment_candidat_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidat_id uuid NOT NULL REFERENCES public.recruitment_candidats(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_recruitment_notes_candidat ON public.recruitment_candidat_notes (candidat_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.recruitment_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidat_id uuid NOT NULL REFERENCES public.recruitment_candidats(id) ON DELETE CASCADE,
  stage smallint NOT NULL CHECK (stage IN (1, 2)),
  scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  strengths text,
  vigilance text,
  decision text CHECK (decision IS NULL OR decision IN (
    'retenu_etape_2', 'non_retenu', 'retenu', 'a_revoir'
  )),
  cas_pratique_subject text,
  evaluator_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (candidat_id, stage)
);

CREATE OR REPLACE FUNCTION public.recruitment_candidats_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_recruitment_candidats_updated ON public.recruitment_candidats;
CREATE TRIGGER trg_recruitment_candidats_updated
  BEFORE UPDATE ON public.recruitment_candidats
  FOR EACH ROW EXECUTE FUNCTION public.recruitment_candidats_set_updated_at();

DROP TRIGGER IF EXISTS trg_recruitment_evaluations_updated ON public.recruitment_evaluations;
CREATE TRIGGER trg_recruitment_evaluations_updated
  BEFORE UPDATE ON public.recruitment_evaluations
  FOR EACH ROW EXECUTE FUNCTION public.recruitment_candidats_set_updated_at();

ALTER TABLE public.recruitment_candidats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_candidat_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruitment candidats staff"
  ON public.recruitment_candidats FOR ALL
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Recruitment notes staff"
  ON public.recruitment_candidat_notes FOR ALL
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Recruitment evaluations staff"
  ON public.recruitment_evaluations FOR ALL
  USING (public.is_staff(auth.uid()))
  WITH CHECK (public.is_staff(auth.uid()));

-- Données fictives « Exemple » (9 nov. 2026 — journée type entretiens)
INSERT INTO public.recruitment_candidats (
  first_name, last_name, email, phone, city, legal_status, btp_background, ai_usage,
  source, formations, stage, interview_at, interview_modality, status, is_example
) VALUES
  (
    'Exemple', 'Martin (fictif)',
    'exemple.martin.recrutement@invalid.test',
    '06 00 00 00 01', 'Paris', 'micro_entreprise',
    'Conducteur de travaux TP — 8 ans. Exemple de parcours pour tests interface.',
    'ChatGPT et Claude pour CR chantier et mémos AO.',
    'linkedin', ARRAY['niv-03', 'niv-02'], 1,
    timestamptz '2026-11-09 10:00:00+01',
    'presentiel_paris', 'confirme', true
  ),
  (
    'Exemple', 'Bernard (fictif)',
    'exemple.bernard.recrutement@invalid.test',
    '06 00 00 00 02', 'Versailles', 'societe',
    'Chargé d''affaires bâtiment — animation ponctuelle de réunions chantier.',
    'Usages IA sur devis et courriers clients.',
    'malt', ARRAY['niv-01', 'niv-04'], 1,
    timestamptz '2026-11-09 10:30:00+01',
    'visio_zoom', 'a_confirmer', true
  ),
  (
    'Exemple', 'Petit (fictif)',
    'exemple.petit.recrutement@invalid.test',
    '06 00 00 00 03', 'Créteil', 'autre',
    'Assistant MOE — 5 ans, sensibilisation IA en autodidacte.',
    'Claude pour lecture CCTP et synthèses.',
    'site', ARRAY['niv-05', 'niv-10'], 2,
    timestamptz '2026-11-09 14:00:00+01',
    'visio_zoom', 'retenu_etape_2', true
  );
