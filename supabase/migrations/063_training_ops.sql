-- ============================================================
-- Cockpit opérationnel des formations
-- Domaine distinct du LMS (courses) et du CRM (prospecting_*)
-- Hiérarchie : programme → session → entreprise → participants → docs
-- ============================================================

-- ---------- Entreprises clientes (dédiées, pas CRM) ----------
CREATE TABLE IF NOT EXISTS public.training_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  siret text,
  address text,
  city text,
  postal_code text,
  contact_name text,
  contact_email text,
  contact_phone text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_training_companies_name_lower
  ON public.training_companies (lower(name));

-- ---------- Personnes (indépendantes du compte Auth) ----------
CREATE TABLE IF NOT EXISTS public.training_people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  job_title text,
  department text,
  company_id uuid REFERENCES public.training_companies(id) ON DELETE SET NULL,
  profile_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_training_people_email_lower
  ON public.training_people (lower(email));

CREATE INDEX IF NOT EXISTS idx_training_people_company
  ON public.training_people (company_id);

-- ---------- Programmes opérationnels (catalogue NIV-xx / LMS optionnel) ----------
CREATE TABLE IF NOT EXISTS public.training_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  catalogue_code text,
  course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL,
  title text NOT NULL,
  slug text,
  default_duration_hours numeric(6,2),
  default_modality text NOT NULL DEFAULT 'presentiel'
    CHECK (default_modality IN ('presentiel', 'distanciel', 'hybride')),
  reference_prefix text NOT NULL DEFAULT 'IA-BTP',
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_training_programs_catalogue_code
  ON public.training_programs (catalogue_code)
  WHERE catalogue_code IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_training_programs_course
  ON public.training_programs (course_id);

-- ---------- Compteurs de référence session ----------
CREATE TABLE IF NOT EXISTS public.training_session_ref_counters (
  prefix text NOT NULL,
  year int NOT NULL,
  last_value int NOT NULL DEFAULT 0,
  PRIMARY KEY (prefix, year)
);

-- ---------- Sessions ----------
CREATE TABLE IF NOT EXISTS public.training_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE,
  program_id uuid NOT NULL REFERENCES public.training_programs(id) ON DELETE RESTRICT,
  company_id uuid REFERENCES public.training_companies(id) ON DELETE SET NULL,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'brouillon'
    CHECK (status IN (
      'brouillon', 'a_preparer', 'planifiee', 'en_cours',
      'terminee', 'cloturee', 'annulee'
    )),
  modality text NOT NULL DEFAULT 'presentiel'
    CHECK (modality IN ('presentiel', 'distanciel', 'hybride')),
  starts_on date,
  ends_on date,
  schedule_text text,
  duration_hours numeric(6,2),
  days_count numeric(4,1),
  location_address text,
  location_city text,
  meeting_url text,
  max_participants int,
  company_contact_name text,
  company_contact_email text,
  company_contact_phone text,
  internal_notes text,
  primary_trainer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  archived_at timestamptz,
  closed_at timestamptz,
  closed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  force_close_reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_training_sessions_program ON public.training_sessions (program_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_company ON public.training_sessions (company_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_status ON public.training_sessions (status);
CREATE INDEX IF NOT EXISTS idx_training_sessions_starts ON public.training_sessions (starts_on);
CREATE INDEX IF NOT EXISTS idx_training_sessions_trainer ON public.training_sessions (primary_trainer_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_archived
  ON public.training_sessions (archived_at)
  WHERE archived_at IS NOT NULL;

-- ---------- Co-formateurs ----------
CREATE TABLE IF NOT EXISTS public.training_session_trainers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  trainer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, trainer_id)
);

CREATE INDEX IF NOT EXISTS idx_training_session_trainers_trainer
  ON public.training_session_trainers (trainer_id);

-- ---------- Participants de session ----------
CREATE TABLE IF NOT EXISTS public.training_session_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  person_id uuid NOT NULL REFERENCES public.training_people(id) ON DELETE RESTRICT,
  job_title text,
  department text,
  status text NOT NULL DEFAULT 'inscrit'
    CHECK (status IN ('inscrit', 'confirme', 'annule', 'present', 'absent', 'partiel')),
  attendance_status text
    CHECK (attendance_status IS NULL OR attendance_status IN ('present', 'absent', 'partiel')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, person_id)
);

CREATE INDEX IF NOT EXISTS idx_training_session_participants_session
  ON public.training_session_participants (session_id);
CREATE INDEX IF NOT EXISTS idx_training_session_participants_person
  ON public.training_session_participants (person_id);

-- ---------- Supports modèle (programme) ----------
CREATE TABLE IF NOT EXISTS public.training_program_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES public.training_programs(id) ON DELETE CASCADE,
  title text NOT NULL,
  resource_type text NOT NULL DEFAULT 'autre'
    CHECK (resource_type IN (
      'support_principal', 'presentation', 'exercices', 'prompts',
      'cas_pratiques', 'pdf', 'excel', 'lien', 'video', 'autre'
    )),
  description text,
  storage_path text,
  external_url text,
  version_label text NOT NULL DEFAULT '1',
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_training_program_resources_program
  ON public.training_program_resources (program_id, sort_order);

-- ---------- Supports de session (copie indépendante) ----------
CREATE TABLE IF NOT EXISTS public.training_session_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  source_program_resource_id uuid REFERENCES public.training_program_resources(id) ON DELETE SET NULL,
  title text NOT NULL,
  resource_type text NOT NULL DEFAULT 'autre'
    CHECK (resource_type IN (
      'support_principal', 'presentation', 'exercices', 'prompts',
      'cas_pratiques', 'pdf', 'excel', 'lien', 'video', 'autre'
    )),
  description text,
  storage_path text,
  external_url text,
  version_label text NOT NULL DEFAULT '1',
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  is_hidden boolean NOT NULL DEFAULT false,
  customized boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_training_session_resources_session
  ON public.training_session_resources (session_id, sort_order);

-- Historique versions supports session
CREATE TABLE IF NOT EXISTS public.training_session_resource_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_resource_id uuid NOT NULL REFERENCES public.training_session_resources(id) ON DELETE CASCADE,
  version_label text NOT NULL,
  title text NOT NULL,
  storage_path text,
  external_url text,
  changed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ---------- Documents administratifs ----------
CREATE TABLE IF NOT EXISTS public.training_session_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  participant_id uuid REFERENCES public.training_session_participants(id) ON DELETE SET NULL,
  category text NOT NULL DEFAULT 'autre'
    CHECK (category IN (
      'convention', 'programme', 'convocation', 'emargement',
      'evaluation', 'bilan_formateur', 'attestation', 'certificat',
      'facture', 'document_client', 'autre'
    )),
  title text NOT NULL,
  storage_path text,
  external_url text,
  version_label text,
  status text NOT NULL DEFAULT 'brouillon'
    CHECK (status IN (
      'brouillon', 'a_generer', 'genere', 'a_envoyer', 'envoye',
      'telecharge', 'archive', 'non_applicable'
    )),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_training_session_documents_session
  ON public.training_session_documents (session_id, category);

-- ---------- Émargements ----------
CREATE TABLE IF NOT EXISTS public.training_attendance_sheets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  sheet_date date NOT NULL,
  label text NOT NULL,
  storage_path text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS public.training_attendance_rows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sheet_id uuid NOT NULL REFERENCES public.training_attendance_sheets(id) ON DELETE CASCADE,
  participant_id uuid NOT NULL REFERENCES public.training_session_participants(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'present'
    CHECK (status IN ('present', 'absent', 'partiel')),
  signed_at timestamptz,
  notes text,
  UNIQUE (sheet_id, participant_id)
);

-- ---------- Bilan formateur ----------
CREATE TABLE IF NOT EXISTS public.training_trainer_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL UNIQUE REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  deroulement text,
  participation_groupe text,
  objectifs_atteints text,
  difficultes text,
  adaptations text,
  points_ameliorer text,
  observations text,
  recommandations text,
  commentaires text,
  status text NOT NULL DEFAULT 'brouillon'
    CHECK (status IN ('brouillon', 'valide')),
  validated_at timestamptz,
  validated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------- Évaluations (architecture) ----------
CREATE TABLE IF NOT EXISTS public.training_session_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  participant_id uuid NOT NULL REFERENCES public.training_session_participants(id) ON DELETE CASCADE,
  eval_type text NOT NULL
    CHECK (eval_type IN ('avant', 'chaud', 'froid')),
  status text NOT NULL DEFAULT 'manquante'
    CHECK (status IN ('manquante', 'recue', 'non_applicable')),
  score numeric(5,2),
  received_at timestamptz,
  storage_path text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (participant_id, eval_type)
);

-- ---------- Attestations opérationnelles ----------
CREATE TABLE IF NOT EXISTS public.training_session_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  participant_id uuid NOT NULL REFERENCES public.training_session_participants(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'a_generer'
    CHECK (status IN ('a_generer', 'generee', 'telechargee', 'envoyee')),
  storage_path text,
  generated_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (participant_id)
);

-- ---------- Checklist session ----------
CREATE TABLE IF NOT EXISTS public.training_checklist_definitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_key text NOT NULL UNIQUE,
  label text NOT NULL,
  phase text NOT NULL DEFAULT 'avant'
    CHECK (phase IN ('avant', 'pendant', 'apres')),
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  auto_source text
);

CREATE TABLE IF NOT EXISTS public.training_session_checklist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  definition_id uuid NOT NULL REFERENCES public.training_checklist_definitions(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'a_faire'
    CHECK (status IN ('a_faire', 'en_attente', 'incomplet', 'complet', 'non_applicable')),
  note text,
  completed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id, definition_id)
);

INSERT INTO public.training_checklist_definitions
  (item_key, label, phase, sort_order, auto_source)
VALUES
  ('session_created', 'Session créée', 'avant', 10, 'session'),
  ('company_set', 'Entreprise renseignée', 'avant', 20, 'company'),
  ('dates_set', 'Dates validées', 'avant', 30, 'dates'),
  ('trainer_set', 'Formateur affecté', 'avant', 40, 'trainer'),
  ('participants_set', 'Participants inscrits', 'avant', 50, 'participants'),
  ('program_available', 'Programme disponible', 'avant', 60, null),
  ('supports_ready', 'Supports adaptés', 'avant', 70, 'supports'),
  ('convocations_generated', 'Convocations générées', 'avant', 80, 'convocations_gen'),
  ('convocations_sent', 'Convocations envoyées', 'avant', 90, 'convocations_sent'),
  ('presence', 'Participants présents', 'pendant', 100, 'attendance'),
  ('attendance_collected', 'Émargements récupérés', 'pendant', 110, 'attendance'),
  ('supports_shared', 'Supports transmis', 'pendant', 120, null),
  ('incidents', 'Incidents renseignés (si besoin)', 'pendant', 130, null),
  ('attendance_archived', 'Émargements archivés', 'apres', 140, 'attendance'),
  ('evaluations_collected', 'Évaluations récupérées', 'apres', 150, 'evaluations'),
  ('trainer_report', 'Bilan formateur complété', 'apres', 160, 'trainer_report'),
  ('certificates_generated', 'Attestations générées', 'apres', 170, 'certificates'),
  ('certificates_sent', 'Attestations transmises', 'apres', 180, 'certificates_sent'),
  ('docs_archived', 'Documents archivés', 'apres', 190, null),
  ('session_closed', 'Session clôturée', 'apres', 200, 'closed')
ON CONFLICT (item_key) DO UPDATE SET
  label = EXCLUDED.label,
  phase = EXCLUDED.phase,
  sort_order = EXCLUDED.sort_order,
  auto_source = EXCLUDED.auto_source;

-- ---------- Journal d'activité ----------
CREATE TABLE IF NOT EXISTS public.training_session_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_training_session_activity_session
  ON public.training_session_activity_log (session_id, created_at DESC);

-- ---------- Attribution référence (atomique) ----------
CREATE OR REPLACE FUNCTION public.allocate_training_session_reference(p_prefix text, p_year int)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  v_next int;
  v_ref text;
BEGIN
  INSERT INTO public.training_session_ref_counters (prefix, year, last_value)
  VALUES (p_prefix, p_year, 1)
  ON CONFLICT (prefix, year)
  DO UPDATE SET last_value = public.training_session_ref_counters.last_value + 1
  RETURNING last_value INTO v_next;

  v_ref := p_prefix || '-' || p_year::text || '-' || lpad(v_next::text, 3, '0');
  RETURN v_ref;
END;
$$;

-- ---------- RLS ----------
ALTER TABLE public.training_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_session_ref_counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_session_trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_program_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_session_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_session_resource_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_session_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_attendance_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_attendance_rows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_trainer_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_session_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_session_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_checklist_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_session_checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_session_activity_log ENABLE ROW LEVEL SECURITY;

-- Admin : accès total ; formateur : sessions assignées (policies ciblées plus bas)

CREATE OR REPLACE FUNCTION public.is_training_admin(uid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = uid AND p.role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_training_session_trainer(uid uuid, sid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.training_sessions s
    WHERE s.id = sid AND s.primary_trainer_id = uid
  ) OR EXISTS (
    SELECT 1 FROM public.training_session_trainers t
    WHERE t.session_id = sid AND t.trainer_id = uid
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_training_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_training_session_trainer(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.allocate_training_session_reference(text, int) TO service_role;

-- Policies admin (ALL) — formateurs via service role / actions serveur filtrées
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'training_companies',
    'training_people',
    'training_programs',
    'training_session_ref_counters',
    'training_sessions',
    'training_session_trainers',
    'training_session_participants',
    'training_program_resources',
    'training_session_resources',
    'training_session_resource_versions',
    'training_session_documents',
    'training_attendance_sheets',
    'training_attendance_rows',
    'training_trainer_reports',
    'training_session_evaluations',
    'training_session_certificates',
    'training_checklist_definitions',
    'training_session_checklist_items',
    'training_session_activity_log'
  ]
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS "training_ops_admin_all" ON public.%I',
      t
    );
    EXECUTE format(
      'CREATE POLICY "training_ops_admin_all" ON public.%I FOR ALL
       USING (public.is_training_admin(auth.uid()))
       WITH CHECK (public.is_training_admin(auth.uid()))',
      t
    );
  END LOOP;
END $$;

-- Formateur : lecture/écriture limitée sur ses sessions
DROP POLICY IF EXISTS "training_sessions_trainer_select" ON public.training_sessions;
CREATE POLICY "training_sessions_trainer_select" ON public.training_sessions
  FOR SELECT USING (public.is_training_session_trainer(auth.uid(), id));

DROP POLICY IF EXISTS "training_sessions_trainer_update" ON public.training_sessions;
CREATE POLICY "training_sessions_trainer_update" ON public.training_sessions
  FOR UPDATE USING (public.is_training_session_trainer(auth.uid(), id));

DROP POLICY IF EXISTS "training_participants_trainer" ON public.training_session_participants;
CREATE POLICY "training_participants_trainer" ON public.training_session_participants
  FOR ALL USING (public.is_training_session_trainer(auth.uid(), session_id))
  WITH CHECK (public.is_training_session_trainer(auth.uid(), session_id));

DROP POLICY IF EXISTS "training_resources_trainer" ON public.training_session_resources;
CREATE POLICY "training_resources_trainer" ON public.training_session_resources
  FOR SELECT USING (public.is_training_session_trainer(auth.uid(), session_id));

DROP POLICY IF EXISTS "training_docs_trainer" ON public.training_session_documents;
CREATE POLICY "training_docs_trainer" ON public.training_session_documents
  FOR SELECT USING (
    public.is_training_session_trainer(auth.uid(), session_id)
    AND category NOT IN ('facture', 'bilan_formateur')
  );

DROP POLICY IF EXISTS "training_attendance_trainer" ON public.training_attendance_sheets;
CREATE POLICY "training_attendance_trainer" ON public.training_attendance_sheets
  FOR ALL USING (public.is_training_session_trainer(auth.uid(), session_id))
  WITH CHECK (public.is_training_session_trainer(auth.uid(), session_id));

DROP POLICY IF EXISTS "training_attendance_rows_trainer" ON public.training_attendance_rows;
CREATE POLICY "training_attendance_rows_trainer" ON public.training_attendance_rows
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.training_attendance_sheets s
      WHERE s.id = sheet_id AND public.is_training_session_trainer(auth.uid(), s.session_id)
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.training_attendance_sheets s
      WHERE s.id = sheet_id AND public.is_training_session_trainer(auth.uid(), s.session_id)
    )
  );

DROP POLICY IF EXISTS "training_report_trainer" ON public.training_trainer_reports;
CREATE POLICY "training_report_trainer" ON public.training_trainer_reports
  FOR ALL USING (public.is_training_session_trainer(auth.uid(), session_id))
  WITH CHECK (public.is_training_session_trainer(auth.uid(), session_id));

COMMENT ON TABLE public.training_sessions IS
  'Sessions opérationnelles OFC — distinctes du LMS courses et du CRM prospection.';
COMMENT ON TABLE public.training_companies IS
  'Entreprises clientes formation — table dédiée (ne pas confondre avec prospecting_companies).';
