-- ============================================================
-- SEED LMS — 5 formations catalogue officielles (/formations)
-- ============================================================
-- Aligné sur lib/formations-catalogue-display.ts (NIV-01 → NIV-05)
-- Exécuter dans Supabase → SQL Editor → Run (idempotent)
-- ============================================================

CREATE OR REPLACE FUNCTION public._ofc_seed_catalogue_course(
  p_slug text,
  p_title text,
  p_description text,
  p_objectifs text,
  p_prerequis text,
  p_programme text,
  p_level text,
  p_duration_hours numeric,
  p_category text DEFAULT 'BTP'
) RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  cid uuid;
BEGIN
  SELECT id INTO cid FROM public.courses WHERE slug = p_slug;
  IF cid IS NULL THEN
    INSERT INTO public.courses (
      slug, title, description, objectifs, prerequis, programme,
      price, published, duration_hours, level, category
    ) VALUES (
      p_slug, p_title, p_description, p_objectifs, p_prerequis, p_programme,
      0, true, p_duration_hours, p_level, p_category
    ) RETURNING id INTO cid;
  ELSE
    UPDATE public.courses SET
      title = p_title,
      description = p_description,
      objectifs = p_objectifs,
      prerequis = p_prerequis,
      programme = p_programme,
      duration_hours = p_duration_hours,
      level = p_level,
      category = p_category,
      published = true,
      updated_at = now()
    WHERE id = cid;
  END IF;

  DELETE FROM public.lessons WHERE module_id IN (
    SELECT id FROM public.modules WHERE course_id = cid
  );
  DELETE FROM public.modules WHERE course_id = cid;

  RETURN cid;
END;
$$;

DO $$
DECLARE
  cid uuid;
  m0 uuid;
  m1 uuid;
  m2 uuid;
  m3 uuid;
  m4 uuid;
BEGIN
  -- =========================================================
  -- NIV-01 — ia-batiment-travaux-publics
  -- =========================================================
  cid := public._ofc_seed_catalogue_course(
    'ia-batiment-travaux-publics',
    'L''IA au service des pros du bâtiment et des travaux publics',
    'Niveau 1 (4 h) : bases opérationnelles IA pour équipes bâtiment et travaux publics — devis, CR, emails, administratif. Qualiopi, présentiel Île-de-France.',
    'Comprendre les usages de l''IA générative utiles sur chantier et au bureau · Accélérer devis, comptes rendus, courriers et suivi client · Structurer l''administratif et repartir avec des prompts adaptés au BTP / TP',
    'Aucune compétence technique requise. Ordinateur + connexion internet. Comptes IA gratuits possibles (ChatGPT, Claude, Gemini).',
    'Module 1 — Devis et chiffrages · Module 2 — Emails et relation client · Module 3 — Comptes rendus et DOE · Module 4 — Gestion administrative',
    'débutant',
    4
  );

  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Programme & ressources', 0) RETURNING id INTO m0;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 1 — Devis et chiffrages', 1) RETURNING id INTO m1;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 2 — Emails et relation client', 2) RETURNING id INTO m2;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 3 — Comptes rendus et DOE', 3) RETURNING id INTO m3;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 4 — Gestion administrative', 4) RETURNING id INTO m4;

  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes) VALUES
    (m0, 'Programme officiel NIV-01 (PDF)', 'pdf', '/formations/pdf/programme-niveau-1-ia-batiment-travaux-publics.pdf', NULL, 0, 15),
    (m0, 'Objectifs et public', 'texte', NULL, '<p><strong>Niveau 1 — Débutant</strong> · 4 h · présentiel Île-de-France.</p><p>Public : dirigeants, conducteurs de travaux, fonctions support bâtiment / TP.</p><p>Cas d''usage : devis, CR, documents, terrain.</p>', 1, 10),
    (m1, 'Devis et chiffrages assistés par l''IA', 'texte', NULL, '<p>Structurer un devis à partir d''un brief, reformuler des postes, accélérer le chiffrage avec relecture humaine.</p><p><strong>Livrable :</strong> trames et prompts devis BTP.</p>', 0, 60),
    (m2, 'Emails et relation client', 'texte', NULL, '<p>Rédiger emails clients, relances, réponses fournisseurs — ton professionnel BTP.</p><p><strong>Livrable :</strong> modèles de relances et emails types.</p>', 0, 55),
    (m3, 'Comptes rendus et DOE', 'texte', NULL, '<p>CR de chantier, rapports d''avancement, premières briques DOE.</p><p><strong>Livrable :</strong> gabarit CR + check-list DOE.</p>', 0, 55),
    (m4, 'Gestion administrative', 'texte', NULL, '<p>Réclamations, courriers, organisation documentaire au quotidien.</p><p><strong>Livrable :</strong> pack prompts admin BTP.</p>', 0, 50);

  -- Alias legacy (dépublier si présent)
  UPDATE public.courses SET published = false, updated_at = now()
  WHERE slug = 'ia-au-service-du-btp';

  -- =========================================================
  -- NIV-02 — ia-appels-offre-btp
  -- =========================================================
  cid := public._ofc_seed_catalogue_course(
    'ia-appels-offre-btp',
    'L''IA appliquée aux appels d''offres BTP',
    'Niveau 2 (4 h) : Claude AI Pro, Cowork & Skills — analyse DCE, mémoire technique et assistants IA réutilisables.',
    'Paramétrer Claude AI Pro (Projects, instructions) et installer Cowork · Analyser un DCE complet via Cowork — 15 informations critiques, verdict Go / No Go · Structurer et rédiger un mémoire technique avec les skills Cowork · Créer des skills DCE / MT personnalisés',
    'Claude Pro + Cowork. DCE récent (RC + CCAP + CCTP) et 2–3 mémoires techniques. Niveau 1 ou bases IA ; expérience AO recommandée.',
    'Module 1 — Paramétrage Claude AI Pro & Cowork (60 min) · Module 2 — Analyse express de DCE avec Cowork (1 h 15) · Module 3 — Rédiger son mémoire technique avec Cowork (1 h 30)',
    'intermediaire',
    4
  );

  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Programme & ressources', 0) RETURNING id INTO m0;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 1 — Paramétrage Claude AI Pro & Cowork', 1) RETURNING id INTO m1;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 2 — Analyse express de DCE avec Cowork', 2) RETURNING id INTO m2;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 3 — Rédiger son mémoire technique avec Cowork', 3) RETURNING id INTO m3;

  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes) VALUES
    (m0, 'Programme officiel NIV-02 (PDF)', 'pdf', '/formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf', NULL, 0, 15),
    (m0, 'Kit 7 prompts AO BTP', 'texte', NULL, '<p><a href="/formations/ia-appels-offre-btp/Kit_IA_AO_BTP_7_prompts.html" target="_blank" rel="noopener noreferrer">Ouvrir le kit 7 prompts AO BTP</a></p>', 1, 10),
    (m0, 'Support complémentaire AO', 'pdf', '/formations/ia-appels-offre-btp/Support_complementaire_AO_BTP.pdf', NULL, 2, 10),
    (m1, 'Paramétrage Claude Pro, Projects et Cowork', 'texte', NULL, '<p><strong>60 min</strong> — compte Claude Pro, Projects, instructions, premier skill Cowork.</p><p><strong>Livrable :</strong> Project AO + Cowork installé + premier skill.</p>', 0, 60),
    (m1, 'Support Module 1 — Analyse DCE', 'pdf', '/formations/ia-appels-offre-btp/Module1_Analyse_DCE_NotebookLM.pdf', NULL, 1, 20),
    (m2, 'Skill Analyse DCE — Go / No Go', 'texte', NULL, '<p><strong>1 h 15</strong> — 15 infos critiques, CCAP, CCTP, verdict Go / No Go.</p><p><strong>Livrable :</strong> fiche synthèse DCE + skill d''analyse.</p>', 0, 75),
    (m2, 'Support Module 2 — Go / No Go', 'pdf', '/formations/ia-appels-offre-btp/Module2_GoNoGo_IA_BTP.pdf', NULL, 1, 20),
    (m3, 'Skill Mémoire Technique', 'texte', NULL, '<p><strong>1 h 30</strong> — plan MT, rédaction, export Word, anti-hallucination.</p><p><strong>Livrable :</strong> MT Word + skills MT / productivité.</p>', 0, 90),
    (m3, 'Support Module 3 — Mémoire technique', 'pdf', '/formations/ia-appels-offre-btp/Module3_Memoire_technique.pdf', NULL, 1, 20),
    (m3, 'Support Module 4 — Chiffrage IA', 'pdf', '/formations/ia-appels-offre-btp/Module4_Chiffrage_IA_BTP.pdf', NULL, 2, 15);

  -- =========================================================
  -- NIV-03 — ia-conduite-travaux-suivi-chantier
  -- =========================================================
  cid := public._ofc_seed_catalogue_course(
    'ia-conduite-travaux-suivi-chantier',
    'L''IA appliquée à la conduite de travaux',
    'Niveau 2 (4 h) : pilotez vos chantiers avec l''IA — bibliothèque de 20+ skills Claude, de l''analyse CCTP à la réception.',
    'Comprendre les skills Claude et accéder à la bibliothèque BTP · Préparer et démarrer un chantier (CCTP, DPGF, DTU, DICT, OS, planning) · Sécuriser (PPSPS, DUERP, SOGED) et piloter au quotidien · Gérer l''administratif jusqu''à la réception (situations, PV, DOE, litiges)',
    'Bases IA générative. Ordinateur + Claude Pro recommandé. Documents chantier anonymisés pour les ateliers.',
    'Module 1 — Installation & démarrage (60 min) · Module 2 — Sécurité (35 min) · Module 3 — Gestion de chantier (70 min) · Module 4 — Administratif de suivi (50 min)',
    'intermediaire',
    4
  );

  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Programme & ressources', 0) RETURNING id INTO m0;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 1 — Installation & démarrage de chantier', 1) RETURNING id INTO m1;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 2 — Sécurité de chantier', 2) RETURNING id INTO m2;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 3 — Gestion de chantier', 3) RETURNING id INTO m3;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 4 — Administratif de suivi de chantier', 4) RETURNING id INTO m4;

  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes) VALUES
    (m0, 'Programme officiel NIV-03 (PDF)', 'pdf', '/formations/ia-conduite-travaux-suivi-chantier/Programme_IA_Conduite_Travaux_OFC.pdf', NULL, 0, 15),
    (m1, 'Skills Analyse CCTP, DPGF, démarrage', 'texte', NULL, '<p><strong>60 min</strong> — bibliothèque 20+ skills, CCTP/DPGF/DTU, DICT, OS, planning.</p><p><strong>Livrable :</strong> fiche synthèse CCTP/DPGF + brouillon OS et planning.</p>', 0, 60),
    (m2, 'PPSPS, DUERP, SOGED', 'texte', NULL, '<p><strong>35 min</strong> — structures sécurité à compléter et signer (relecture QSE).</p><p><strong>Livrable :</strong> structures PPSPS / DUERP / SOGED.</p>', 0, 35),
    (m3, 'CR, approvisionnements, sous-traitants, coûts', 'texte', NULL, '<p><strong>70 min</strong> — CR, journal, bons de commande, DC4, métré, avenants, budget.</p><p><strong>Livrable :</strong> modèles CR, courriers ST, tableaux de suivi.</p>', 0, 70),
    (m4, 'Situations, réception, DOE, litiges', 'texte', NULL, '<p><strong>50 min</strong> — situations, PV de réserves, DOE, mise en demeure / mémoire (brouillons).</p><p><strong>Livrable :</strong> trames situations, PV, check-list DOE.</p>', 0, 50);

  -- =========================================================
  -- NIV-04 — maitriser-claude-ai-btp
  -- =========================================================
  cid := public._ofc_seed_catalogue_course(
    'maitriser-claude-ai-btp',
    'Maîtriser Claude AI pour le BTP',
    'Niveau 2 (4 h) : industrialisez l''IA — Projets, Skills, Cowork, connecteurs et Claude Code, sur vos cas réels.',
    'Structurer Claude avec Projets et Skills · Déléguer la production documentaire à Cowork · Connecter Gmail, Drive, agenda · Automatiser avec Claude Code · Fiabiliser et sécuriser les usages',
    'Claude Pro. Cas d''usage et fichiers entreprise anonymisés. Référents IA / dirigeants / CDT.',
    'Module 1 — Projets & Skills (60 min) · Module 2 — Cowork (55 min) · Module 3 — Connecteurs (55 min) · Module 4 — Claude Code (50 min)',
    'avance',
    4
  );

  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Programme & ressources', 0) RETURNING id INTO m0;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 1 — Projets & Skills', 1) RETURNING id INTO m1;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 2 — Cowork', 2) RETURNING id INTO m2;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 3 — Connecteurs', 3) RETURNING id INTO m3;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 4 — Claude Code', 4) RETURNING id INTO m4;

  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes) VALUES
    (m0, 'Programme officiel NIV-04 (PDF)', 'pdf', '/formations/maitriser-claude-ai-btp/Programme_Maitriser_Claude_BTP_OFC.pdf', NULL, 0, 15),
    (m1, 'Projets & Skills entreprise', 'texte', NULL, '<p><strong>60 min</strong> — Projects, base de connaissances, bibliothèque de skills, exécution de code.</p><p><strong>Livrable :</strong> Project configuré + 2 skills métier.</p>', 0, 60),
    (m2, 'Cowork — production documentaire', 'texte', NULL, '<p><strong>55 min</strong> — tâches agentiques supervisées, CR / mémoire / dossier, exports.</p><p><strong>Livrable :</strong> livrable documentaire validé + workflow Cowork.</p>', 0, 55),
    (m3, 'Connecteurs Gmail, Drive, agenda', 'texte', NULL, '<p><strong>55 min</strong> — cas BTP + checklist RGPD / marchés publics.</p><p><strong>Livrable :</strong> connecteurs paramétrés + checklist sécurité.</p>', 0, 55),
    (m4, 'Claude Code — automatisations', 'texte', NULL, '<p><strong>50 min</strong> — renommage, classement, documents en lot, petit outil métier.</p><p><strong>Livrable :</strong> automatisation testée + guide de reprise.</p>', 0, 50);

  -- =========================================================
  -- NIV-05 — ia-maitrise-oeuvre
  -- =========================================================
  cid := public._ofc_seed_catalogue_course(
    'ia-maitrise-oeuvre',
    'L''IA au service des maîtres d''œuvre',
    'Niveau 2 (4 h) : IA pour maîtres d''œuvre d''exécution — analyse DCE, CR chantier, OS, courriers et suivi des réserves.',
    'Choisir Claude ou ChatGPT selon le cas MOE · Analyser un DCE · Rédiger un CR en moins de 10 min · Produire courriers et OS · Organiser réserves, réception et suivi client',
    'Bases IA. Documents MOE anonymisés (CCTP, notes CR). Public : MOEX, CDT, OPC, BET, assistants gestion travaux.',
    'Module 0 — Introduction Claude · Module 1 — Analyse offres · Module 2 — CR chantier · Module 3 — Courriers & OS · Module 4 — Réserves & réception',
    'intermediaire',
    4
  );

  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Programme & ressources', 0) RETURNING id INTO m0;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 0 — Introduction à Claude', 1) RETURNING id INTO m1;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 1 — Analyse des offres et conformité', 2) RETURNING id INTO m2;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 2 — Comptes rendus de chantier', 3) RETURNING id INTO m3;
  INSERT INTO public.modules (course_id, title, order_index) VALUES (cid, 'Module 3 — Courriers, OS et actes', 4) RETURNING id INTO m4;
  INSERT INTO public.modules (course_id, title, order_index)
  VALUES (cid, 'Module 4 — Réserves, réception et suivi client', 5);

  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes) VALUES
    (m0, 'Programme officiel NIV-05 (PDF)', 'pdf', '/formations/ia-maitrise-oeuvre/programme_OFC_IA_MOE_4h.pdf', NULL, 0, 15),
    (m1, 'Écosystème Anthropic pour la MOE', 'texte', NULL, '<p><strong>30 min</strong> — Claude vs ChatGPT, Projets, Connecteurs, Skills, Cowork.</p><p><strong>Livrable :</strong> mémo « Claude pour la maîtrise d''œuvre ».</p>', 0, 30),
    (m2, 'Analyse DCE et conformité', 'texte', NULL, '<p><strong>50 min</strong> — CCTP, bordereau, alertes contractuelles.</p><p><strong>Livrable :</strong> fiche-type d''analyse DCE (30 points) + 10 prompts.</p>', 0, 50),
    (m3, 'CR de chantier en 10 minutes', 'texte', NULL, '<p><strong>50 min</strong> — notes vocales → CR structuré.</p><p><strong>Livrable :</strong> gabarit CR MOE + prompt transcription.</p>', 0, 50),
    (m4, 'Courriers, OS et actes administratifs', 'texte', NULL, '<p><strong>50 min</strong> — pack d''actes administratifs MOE.</p><p><strong>Livrable :</strong> 15 modèles d''actes.</p>', 0, 50);

  -- Module 5 lessons (last module)
  INSERT INTO public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  SELECT id, 'Réserves, réception et suivi client', 'texte', NULL,
    '<p><strong>50 min</strong> — suivi des réserves, réception, GPA.</p><p><strong>Livrable :</strong> modèle de suivi + tableau GPA + 8 prompts.</p>',
    0, 50
  FROM public.modules WHERE course_id = cid AND order_index = 5;

END $$;

DROP FUNCTION IF EXISTS public._ofc_seed_catalogue_course(text, text, text, text, text, text, text, numeric, text);
