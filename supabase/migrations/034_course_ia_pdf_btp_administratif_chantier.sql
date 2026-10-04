-- ============================================================
-- Formation LMS — L'IA au service de l'administratif & gestion de chantier
-- Client : PDF-BTP (Longjumeau) — 8 h / 2 sessions
-- Slug : ia-pdf-btp-administratif-chantier
-- Supports : /formations/ia-pdf-btp-administratif-chantier/*.pdf
-- ============================================================
-- Idempotent : crée ou met à jour le cours, recrée modules/leçons.
-- ============================================================

DO $$
DECLARE
  cid uuid;
  m0 uuid; m1 uuid; m2 uuid; m3 uuid; m4 uuid; m5 uuid; m6 uuid; m7 uuid;
BEGIN
  SELECT id INTO cid FROM public.courses WHERE slug = 'ia-pdf-btp-administratif-chantier';

  IF cid IS NULL THEN
    INSERT INTO public.courses (
      slug, title, description, objectifs, prerequis, programme,
      price, published, duration_hours, level, category
    ) VALUES (
      'ia-pdf-btp-administratif-chantier',
      'L''IA au service de l''administratif et de la gestion de chantier — PDF-BTP',
      'Formation intra-entreprise sur mesure pour PDF-BTP (Longjumeau) : 8 h en 2 sessions (4 h + 4 h). Session 1 : fondamentaux IA, administratif de chantier, exercices. Session 2 : Claude AI, skills PDF BTP, assistant personnalisé. Qualiopi — financement OPCO Constructys possible selon éligibilité.',
      'Utiliser de façon autonome ChatGPT, Claude et Gemini pour le BTP · Rédiger devis, plannings, courriers et CR de chantier · Produire PV de réception, rapports et bons de commande · Concevoir des prompts avancés par profil métier · Créer un assistant IA personnalisé PDF-BTP · Évaluer la fiabilité d''une réponse IA · Définir un plan d''action individuel',
      'Aucun prérequis technique. Ordinateur portable + accès internet le jour de la formation. Apporter des dossiers réels (devis, CR, courriers) pour les ateliers.',
      'Session 1 (4 h) — M1 Fondamentaux (45 min) · M2 Administratif chantier (2 h) · M3 Exercices & bilan S1 (1h15)
Session 2 (4 h) — Prompts avancés / Claude & skills · Assistant IA · Bilan & attestations
Lieu : PDF-BTP, 24 rue du Docteur Roux, 91160 Longjumeau · 7 participants.',
      1200,
      true,
      8,
      'débutant',
      'formation-ia-btp'
    )
    RETURNING id INTO cid;
  ELSE
    UPDATE public.courses SET
      title = 'L''IA au service de l''administratif et de la gestion de chantier — PDF-BTP',
      description = 'Formation intra-entreprise sur mesure pour PDF-BTP (Longjumeau) : 8 h en 2 sessions (4 h + 4 h). Session 1 : fondamentaux IA, administratif de chantier, exercices. Session 2 : Claude AI, skills PDF BTP, assistant personnalisé. Qualiopi — financement OPCO Constructys possible selon éligibilité.',
      objectifs = 'Utiliser de façon autonome ChatGPT, Claude et Gemini pour le BTP · Rédiger devis, plannings, courriers et CR de chantier · Produire PV de réception, rapports et bons de commande · Concevoir des prompts avancés par profil métier · Créer un assistant IA personnalisé PDF-BTP · Évaluer la fiabilité d''une réponse IA · Définir un plan d''action individuel',
      prerequis = 'Aucun prérequis technique. Ordinateur portable + accès internet le jour de la formation. Apporter des dossiers réels (devis, CR, courriers) pour les ateliers.',
      programme = 'Session 1 (4 h) — M1 Fondamentaux (45 min) · M2 Administratif chantier (2 h) · M3 Exercices & bilan S1 (1h15)
Session 2 (4 h) — Prompts avancés / Claude & skills · Assistant IA · Bilan & attestations
Lieu : PDF-BTP, 24 rue du Docteur Roux, 91160 Longjumeau · 7 participants.',
      price = 1200,
      duration_hours = 8,
      level = 'débutant',
      category = 'formation-ia-btp',
      published = true,
      updated_at = now()
    WHERE id = cid;
  END IF;

  DELETE FROM public.lessons WHERE module_id IN (SELECT id FROM public.modules WHERE course_id = cid);
  DELETE FROM public.modules WHERE course_id = cid;

  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Programme de formation (8 h)', 0) RETURNING id INTO m0;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 1 — Fondamentaux de l''IA générative', 1) RETURNING id INTO m1;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 2 — Administratif de chantier automatisé', 2) RETURNING id INTO m2;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 3 — Exercices pratiques & bilan session 1', 3) RETURNING id INTO m3;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 4 — Prompts avancés par profil métier', 4) RETURNING id INTO m4;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 5 — Créer votre assistant IA PDF-BTP', 5) RETURNING id INTO m5;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 6 — Bilan, plan d''action & attestations', 6) RETURNING id INTO m6;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Session 2 — Claude AI & skills PDF BTP', 7) RETURNING id INTO m7;

  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes) VALUES
    (m0, 'Programme officiel — administratif & gestion de chantier (PDF-BTP)', 'pdf',
     '/formations/ia-pdf-btp-administratif-chantier/01-programme-formation.pdf', null, 0, 10),

    (m1, 'Support Module 1 — Fondamentaux de l''IA générative', 'pdf',
     '/formations/ia-pdf-btp-administratif-chantier/02-module-1-fondamentaux-ia.pdf', null, 0, 45),

    (m2, 'Support Module 2 — Administratif de chantier automatisé', 'pdf',
     '/formations/ia-pdf-btp-administratif-chantier/03-module-2-administratif-chantier.pdf', null, 0, 120),

    (m3, 'Support Module 3 — Exercices pratiques & bilan session 1', 'pdf',
     '/formations/ia-pdf-btp-administratif-chantier/04-module-3-exercices-pratiques.pdf', null, 0, 75),

    (m4, 'Objectifs Module 4 — Prompts avancés par métier', 'texte', null,
     '<p><strong>1 h 30</strong> — Prompts avancés par profil.</p><ul><li><strong>Conducteur / chef de chantier</strong> : point hebdo, alerte MOE, ordre de service ST</li><li><strong>Bureau d''études / géomètre</strong> : analyse CCTP, variantes techniques, note client</li><li><strong>Direction / assistante</strong> : tableau de bord, offre d''emploi, dossier qualité</li></ul><p><strong>Livrable :</strong> guide de 10 prompts par profil.</p><p><em>Support PDF dédié non fourni dans le pack — contenu traité en session / à compléter en admin si besoin.</em></p>',
     0, 90),

    (m5, 'Support Module 5 — Créer un assistant IA personnalisé', 'pdf',
     '/formations/ia-pdf-btp-administratif-chantier/05-module-5-assistant-ia-personnalise.pdf', null, 0, 90),

    (m6, 'Objectifs Module 6 — Bilan & plan d''action', 'texte', null,
     '<p><strong>1 h</strong> — Évaluation des acquis, plan d''action 30 jours, attestations.</p><ul><li>Quiz de validation</li><li>3 actions concrètes par participant</li><li>Remise attestation + satisfaction à chaud</li></ul>',
     0, 60),

    (m7, 'Programme Session 2 — Claude AI & skills PDF BTP', 'pdf',
     '/formations/ia-pdf-btp-administratif-chantier/06-programme-session-2-claude.pdf', null, 0, 10),
    (m7, 'Support de formation — Maîtriser Claude AI pour le BTP (Chat, Cowork & Code)', 'pdf',
     '/formations/ia-pdf-btp-administratif-chantier/07-support-claude-ia-btp.pdf', null, 1, 180),
    (m7, 'Synthèse / replay Zoom', 'pdf',
     '/formations/ia-pdf-btp-administratif-chantier/08-synthese-replay-zoom.pdf', null, 2, 20);

  INSERT INTO public.enrollments (user_id, course_id, progress_percent)
  SELECT id, cid, 0
  FROM auth.users
  WHERE lower(email) = 'contact@laureolivie.fr'
  LIMIT 1
  ON CONFLICT (user_id, course_id) DO NOTHING;

  RAISE NOTICE 'Formation prête : ia-pdf-btp-administratif-chantier (id %)', cid;
END $$;
