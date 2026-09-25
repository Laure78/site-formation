-- ============================================================
-- Satisfaction & Avis Google — sessions opérationnelles (training_ops)
-- Workflows distincts questionnaire / Google, envois idempotents, journalisation
-- ============================================================

-- ---------- Paramètres (singleton) ----------
CREATE TABLE IF NOT EXISTS public.training_satisfaction_settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  questionnaire_auto_enabled boolean NOT NULL DEFAULT true,
  questionnaire_first_send_days int NOT NULL DEFAULT 0,
  questionnaire_reminder_1_days int NOT NULL DEFAULT 3,
  questionnaire_reminder_2_days int NOT NULL DEFAULT 7,
  questionnaire_max_reminders int NOT NULL DEFAULT 2,
  google_auto_enabled boolean NOT NULL DEFAULT true,
  google_delay_after_complete_days int NOT NULL DEFAULT 1,
  google_reminder_days int NOT NULL DEFAULT 5,
  google_max_reminders int NOT NULL DEFAULT 1,
  google_review_url text NOT NULL DEFAULT 'https://maps.app.goo.gl/hUQhnvEERki5RjHw5',
  questionnaire_public_url text,
  email_from_name text NOT NULL DEFAULT 'Laure Olivié',
  email_from_address text,
  email_reply_to text NOT NULL DEFAULT 'contact@laureolivie.fr',
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

INSERT INTO public.training_satisfaction_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- ---------- Modèles d'emails ----------
CREATE TABLE IF NOT EXISTS public.training_satisfaction_email_templates (
  template_key text PRIMARY KEY CHECK (template_key IN (
    'questionnaire_initial',
    'questionnaire_reminder',
    'google_initial',
    'google_reminder'
  )),
  subject text NOT NULL,
  body_html text NOT NULL,
  body_text text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

INSERT INTO public.training_satisfaction_email_templates (template_key, subject, body_html, body_text)
VALUES
  (
    'questionnaire_initial',
    'Votre avis compte — questionnaire de satisfaction',
    '<p>{{prenom}} {{nom}},</p><p>Merci d''avoir suivi la formation « {{formation}} » ({{date_formation}}).</p><p><a href="{{lien_questionnaire}}">Répondre au questionnaire</a></p><p>{{organisme}}</p>',
    '{{prenom}} {{nom}}, merci pour la formation « {{formation}} » du {{date_formation}}. Questionnaire : {{lien_questionnaire}} — {{organisme}}'
  ),
  (
    'questionnaire_reminder',
    'Rappel — questionnaire de satisfaction',
    '<p>{{prenom}},</p><p>Petit rappel pour le questionnaire satisfaction (formation « {{formation}} »).</p><p><a href="{{lien_questionnaire}}">Répondre maintenant</a></p>',
    'Rappel questionnaire — {{formation}} : {{lien_questionnaire}}'
  ),
  (
    'google_initial',
    'Partagez votre expérience sur Google',
    '<p>{{prenom}},</p><p>Si vous le souhaitez, vous pouvez laisser un avis Google pour {{organisme}}.</p><p><a href="{{lien_google}}">Déposer un avis</a></p>',
    'Avis Google {{organisme}} : {{lien_google}}'
  ),
  (
    'google_reminder',
    'Rappel — avis Google',
    '<p>{{prenom}},</p><p>Rappel amical pour un avis Google si vous n''avez pas encore eu l''occasion.</p><p><a href="{{lien_google}}">Lien avis</a></p>',
    'Rappel avis Google : {{lien_google}}'
  )
ON CONFLICT (template_key) DO NOTHING;

-- ---------- Suivi par participant de session ----------
CREATE TABLE IF NOT EXISTS public.training_participant_satisfaction (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_participant_id uuid NOT NULL UNIQUE
    REFERENCES public.training_session_participants(id) ON DELETE CASCADE,
  session_id uuid NOT NULL REFERENCES public.training_sessions(id) ON DELETE CASCADE,
  session_ended_on date,
  questionnaire_status text NOT NULL DEFAULT 'a_envoyer'
    CHECK (questionnaire_status IN (
      'a_envoyer', 'programme', 'envoye', 'a_relancer',
      'relance_1_envoyee', 'relance_2_envoyee', 'complete',
      'sans_reponse', 'desactive', 'echec_envoi'
    )),
  questionnaire_reminder_count int NOT NULL DEFAULT 0,
  questionnaire_first_sent_at timestamptz,
  questionnaire_last_sent_at timestamptz,
  questionnaire_completed_at timestamptz,
  questionnaire_score numeric(3,2),
  questionnaire_next_action_at timestamptz,
  questionnaire_disabled boolean NOT NULL DEFAULT false,
  google_status text NOT NULL DEFAULT 'non_eligible'
    CHECK (google_status IN (
      'non_eligible', 'a_programmer', 'programme', 'envoye',
      'relance_envoyee', 'termine', 'desactive', 'echec_envoi'
    )),
  google_reminder_count int NOT NULL DEFAULT 0,
  google_first_sent_at timestamptz,
  google_last_sent_at timestamptz,
  google_completed_at timestamptz,
  google_next_action_at timestamptz,
  google_disabled boolean NOT NULL DEFAULT false,
  access_token uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tps_session ON public.training_participant_satisfaction (session_id);
CREATE INDEX IF NOT EXISTS idx_tps_questionnaire_next ON public.training_participant_satisfaction (questionnaire_next_action_at)
  WHERE questionnaire_status NOT IN ('complete', 'desactive', 'sans_reponse');
CREATE INDEX IF NOT EXISTS idx_tps_google_next ON public.training_participant_satisfaction (google_next_action_at)
  WHERE google_status NOT IN ('non_eligible', 'termine', 'desactive');

-- ---------- Envois (idempotence : un type d'email max par suivi) ----------
CREATE TABLE IF NOT EXISTS public.training_satisfaction_email_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_satisfaction_id uuid NOT NULL
    REFERENCES public.training_participant_satisfaction(id) ON DELETE CASCADE,
  email_kind text NOT NULL CHECK (email_kind IN (
    'questionnaire_initial', 'questionnaire_reminder_1', 'questionnaire_reminder_2',
    'google_initial', 'google_reminder_1'
  )),
  idempotency_key text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'sending', 'sent', 'failed')),
  to_email text NOT NULL,
  subject text NOT NULL,
  triggered_by text NOT NULL DEFAULT 'auto' CHECK (triggered_by IN ('auto', 'manual')),
  scheduled_for timestamptz,
  sent_at timestamptz,
  resend_message_id text,
  attempt_count int NOT NULL DEFAULT 0,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (participant_satisfaction_id, email_kind)
);

CREATE INDEX IF NOT EXISTS idx_tsed_status ON public.training_satisfaction_email_deliveries (status, scheduled_for);

-- ---------- Timeline / historique ----------
CREATE TABLE IF NOT EXISTS public.training_satisfaction_timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_satisfaction_id uuid NOT NULL
    REFERENCES public.training_participant_satisfaction(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_label text NOT NULL,
  origin text NOT NULL DEFAULT 'auto' CHECK (origin IN ('auto', 'manual', 'system')),
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tst_ps ON public.training_satisfaction_timeline (participant_satisfaction_id, created_at DESC);

-- ---------- RLS : lecture staff, écritures service role ----------
ALTER TABLE public.training_satisfaction_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_satisfaction_email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_participant_satisfaction ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_satisfaction_email_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_satisfaction_timeline ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Training satisfaction settings: staff select" ON public.training_satisfaction_settings;
CREATE POLICY "Training satisfaction settings: staff select"
  ON public.training_satisfaction_settings FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'formateur')));

DROP POLICY IF EXISTS "Training satisfaction templates: staff select" ON public.training_satisfaction_email_templates;
CREATE POLICY "Training satisfaction templates: staff select"
  ON public.training_satisfaction_email_templates FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'formateur')));

DROP POLICY IF EXISTS "Training participant satisfaction: staff select" ON public.training_participant_satisfaction;
CREATE POLICY "Training participant satisfaction: staff select"
  ON public.training_participant_satisfaction FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'formateur')));

DROP POLICY IF EXISTS "Training satisfaction deliveries: staff select" ON public.training_satisfaction_email_deliveries;
CREATE POLICY "Training satisfaction deliveries: staff select"
  ON public.training_satisfaction_email_deliveries FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'formateur')));

DROP POLICY IF EXISTS "Training satisfaction timeline: staff select" ON public.training_satisfaction_timeline;
CREATE POLICY "Training satisfaction timeline: staff select"
  ON public.training_satisfaction_timeline FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'formateur')));
