-- ============================================================
-- Extranet formateurs — Phase 2 : programmes, supports, missions
-- Ressources formateurs ≠ ressources apprenants (indicateur Qualiopi 19)
-- ============================================================

-- --- Programmes pédagogiques formateurs ---

CREATE TABLE IF NOT EXISTS public.extranet_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  catalogue_code text,
  -- Lien optionnel cockpit /admin/sessions (063_training_ops) — pas de FK si non déployé
  training_program_id uuid,
  is_archived boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_programs_catalogue ON public.extranet_programs(catalogue_code);

CREATE TABLE IF NOT EXISTS public.extranet_program_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES public.extranet_programs(id) ON DELETE CASCADE,
  version_label text NOT NULL,
  objectives_md text NOT NULL DEFAULT '',
  audience text NOT NULL DEFAULT '',
  prerequisites text NOT NULL DEFAULT '',
  duration_hours numeric(6,2),
  schedule_md text NOT NULL DEFAULT '',
  methods_md text NOT NULL DEFAULT '',
  evaluation_md text NOT NULL DEFAULT '',
  adaptations_md text NOT NULL DEFAULT '',
  is_current boolean NOT NULL DEFAULT false,
  published_at timestamptz NOT NULL DEFAULT now(),
  published_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (program_id, version_label)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_extranet_program_one_current
  ON public.extranet_program_versions (program_id)
  WHERE is_current = true;

-- --- Supports formateurs (bibliothèque) ---

CREATE TABLE IF NOT EXISTS public.extranet_trainer_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid REFERENCES public.extranet_programs(id) ON DELETE SET NULL,
  title text NOT NULL,
  resource_type text NOT NULL CHECK (resource_type IN (
    'presentation',
    'guide',
    'exercise',
    'prompt',
    'metier_document',
    'case_study',
    'evaluation_grid',
    'correction',
    'other'
  )),
  description text,
  storage_path text NOT NULL,
  original_filename text NOT NULL,
  mime_type text,
  file_size_bytes bigint,
  version_label text NOT NULL DEFAULT '1.0',
  is_archived boolean NOT NULL DEFAULT false,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_resources_program ON public.extranet_trainer_resources(program_id);

-- --- Droits d'accès individuels ---

CREATE TABLE IF NOT EXISTS public.extranet_trainer_program_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  program_id uuid NOT NULL REFERENCES public.extranet_programs(id) ON DELETE CASCADE,
  granted_at timestamptz NOT NULL DEFAULT now(),
  granted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  UNIQUE (trainer_id, program_id)
);

CREATE TABLE IF NOT EXISTS public.extranet_trainer_resource_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES public.extranet_trainer_resources(id) ON DELETE CASCADE,
  granted_at timestamptz NOT NULL DEFAULT now(),
  granted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  UNIQUE (trainer_id, resource_id)
);

-- --- Missions / interventions ---

CREATE TABLE IF NOT EXISTS public.extranet_missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  program_version_id uuid NOT NULL REFERENCES public.extranet_program_versions(id) ON DELETE RESTRICT,
  training_session_id uuid,
  title text NOT NULL,
  status text NOT NULL DEFAULT 'assigned'
    CHECK (status IN (
      'draft',
      'assigned',
      'confirmed',
      'in_progress',
      'completed',
      'cancelled'
    )),
  modality text NOT NULL DEFAULT 'presentiel'
    CHECK (modality IN ('presentiel', 'distanciel', 'hybride')),
  starts_on date NOT NULL,
  ends_on date,
  schedule_text text,
  duration_hours numeric(6,2),
  location_name text,
  location_address text,
  location_city text,
  client_company_name text,
  pedagogical_brief text,
  administrative_brief text,
  preparation_confirmed_at timestamptz,
  mission_order_storage_path text,
  trainer_report text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_extranet_missions_trainer ON public.extranet_missions(trainer_id);
CREATE INDEX IF NOT EXISTS idx_extranet_missions_starts ON public.extranet_missions(starts_on);

CREATE TABLE IF NOT EXISTS public.extranet_mission_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id uuid NOT NULL REFERENCES public.extranet_missions(id) ON DELETE CASCADE,
  trainer_id uuid NOT NULL REFERENCES public.extranet_trainers(id) ON DELETE CASCADE,
  doc_kind text NOT NULL CHECK (doc_kind IN (
    'attendance_sheet',
    'learning_assessment',
    'trainer_report_file',
    'mission_order',
    'other'
  )),
  storage_path text NOT NULL,
  original_filename text NOT NULL,
  mime_type text,
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_extranet_mission_docs_mission ON public.extranet_mission_documents(mission_id);

-- --- RLS ---

ALTER TABLE public.extranet_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_program_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_trainer_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_trainer_program_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_trainer_resource_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extranet_mission_documents ENABLE ROW LEVEL SECURITY;

-- Programmes : staff ou formateur avec grant
CREATE POLICY "Extranet programs: staff all" ON public.extranet_programs
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet programs: trainer read granted" ON public.extranet_programs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.extranet_trainer_program_grants g
      WHERE g.program_id = extranet_programs.id
        AND g.trainer_id = public.extranet_trainer_id(auth.uid())
    )
  );

CREATE POLICY "Extranet program versions: staff all" ON public.extranet_program_versions
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet program versions: trainer read granted" ON public.extranet_program_versions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.extranet_trainer_program_grants g
      WHERE g.program_id = extranet_program_versions.program_id
        AND g.trainer_id = public.extranet_trainer_id(auth.uid())
    )
  );

-- Ressources
CREATE POLICY "Extranet resources: staff all" ON public.extranet_trainer_resources
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet resources: trainer read granted" ON public.extranet_trainer_resources
  FOR SELECT USING (
    is_archived = false
    AND EXISTS (
      SELECT 1 FROM public.extranet_trainer_resource_grants g
      WHERE g.resource_id = extranet_trainer_resources.id
        AND g.trainer_id = public.extranet_trainer_id(auth.uid())
    )
  );

-- Grants : staff manage ; trainer read own
CREATE POLICY "Extranet program grants: staff" ON public.extranet_trainer_program_grants
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet program grants: trainer read own" ON public.extranet_trainer_program_grants
  FOR SELECT USING (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet resource grants: staff" ON public.extranet_trainer_resource_grants
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet resource grants: trainer read own" ON public.extranet_trainer_resource_grants
  FOR SELECT USING (trainer_id = public.extranet_trainer_id(auth.uid()));

-- Missions
CREATE POLICY "Extranet missions: staff all" ON public.extranet_missions
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet missions: trainer read own" ON public.extranet_missions
  FOR SELECT USING (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet missions: trainer update prep" ON public.extranet_missions
  FOR UPDATE USING (trainer_id = public.extranet_trainer_id(auth.uid()))
  WITH CHECK (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet mission docs: staff all" ON public.extranet_mission_documents
  FOR ALL USING (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()));

CREATE POLICY "Extranet mission docs: trainer own" ON public.extranet_mission_documents
  FOR SELECT USING (trainer_id = public.extranet_trainer_id(auth.uid()));

CREATE POLICY "Extranet mission docs: trainer insert own" ON public.extranet_mission_documents
  FOR INSERT WITH CHECK (trainer_id = public.extranet_trainer_id(auth.uid()));

-- Storage : supports et missions (chemins resources/ et missions/)
DROP POLICY IF EXISTS "Extranet storage: staff write resources" ON storage.objects;
CREATE POLICY "Extranet storage: staff write resources" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'extranet-formateurs'
    AND (public.is_org_admin(auth.uid()) OR public.is_staff(auth.uid()))
    AND (
      (storage.foldername(name))[1] = 'resources'
      OR (storage.foldername(name))[1] = 'mission-orders'
    )
  );

DROP POLICY IF EXISTS "Extranet storage: trainer mission upload" ON storage.objects;
CREATE POLICY "Extranet storage: trainer mission upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'extranet-formateurs'
    AND (storage.foldername(name))[1] = public.extranet_trainer_id(auth.uid())::text
    AND (storage.foldername(name))[2] = 'missions'
  );

-- Étendre lecture storage pour resources/ si grant (via signed URL service role en pratique)
DROP POLICY IF EXISTS "Extranet storage: read resources staff" ON storage.objects;
CREATE POLICY "Extranet storage: read resources staff" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'extranet-formateurs'
    AND (
      public.is_org_admin(auth.uid())
      OR public.is_staff(auth.uid())
      OR (storage.foldername(name))[1] = public.extranet_trainer_id(auth.uid())::text
    )
  );

CREATE OR REPLACE FUNCTION public.extranet_missions_set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_extranet_missions_updated ON public.extranet_missions;
CREATE TRIGGER trg_extranet_missions_updated
  BEFORE UPDATE ON public.extranet_missions
  FOR EACH ROW EXECUTE FUNCTION public.extranet_missions_set_updated_at();
