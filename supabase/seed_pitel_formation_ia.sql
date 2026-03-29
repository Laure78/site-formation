-- ============================================================
-- SEED : Formation IA — Sensibilisation à l'IA &
--        Assistants IA personnalisés (PITEL)
-- ============================================================
-- Prérequis : migrations LMS appliquées (courses, modules, lessons)
-- Fichiers statiques : public/formations/pitel-ia-sensibilisation-prompts-assistants/
-- ============================================================
-- Exécuter dans Supabase → SQL Editor → Run
-- ============================================================

DELETE FROM courses
WHERE slug = 'formation-ia-sensibilisation-prompt-engineering-assistants';

DO $$
DECLARE
  cid uuid;
  mid1 uuid;
  mid2 uuid;
  mid3 uuid;
BEGIN
  INSERT INTO courses (
    slug,
    title,
    description,
    objectifs,
    prerequis,
    programme,
    price,
    published,
    duration_hours,
    level,
    category
  )
  VALUES (
    'formation-ia-sensibilisation-prompt-engineering-assistants',
    'Formation IA : Sensibilisation à l''IA & Assistants IA Personnalisés',
    'Parcours en trois volets : sensibilisation à l''IA (supports modules 1 et 2), ressource opérationnelle « prompts par métier » au format Excel, puis conception d''assistants IA personnalisés (module 3).',
    'Comprendre les fondamentaux de l''IA générative appliquée au terrain · Savoir formuler des prompts efficaces · Disposer d''une banque de prompts par métier · Concevoir et paramétrer des assistants IA sur mesure',
    'Ordinateur avec connexion internet. Compte ChatGPT (ou équivalent) recommandé. Aucune compétence technique préalable requise.',
    'Partie 1 — Slides : modules 1 et 2 (sensibilisation à l''IA). Partie 2 — Ressource Excel : prompts par métier (v4). Partie 3 — Slides : module 3 (assistants IA personnalisés).',
    0,
    true,
    8,
    'intermediaire',
    'BTP'
  )
  RETURNING id INTO cid;

  INSERT INTO modules (course_id, title, order_index)
  VALUES (cid, 'Partie 1 — Modules 1 et 2 : sensibilisation à l''IA', 0)
  RETURNING id INTO mid1;

  INSERT INTO modules (course_id, title, order_index)
  VALUES (cid, 'Partie 2 — Ressource : prompts par métier', 1)
  RETURNING id INTO mid2;

  INSERT INTO modules (course_id, title, order_index)
  VALUES (cid, 'Partie 3 — Module 3 : assistants IA personnalisés', 2)
  RETURNING id INTO mid3;

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    mid1,
    'Slides — Formation IA (modules 1 et 2)',
    'pdf',
    '/formations/pitel-ia-sensibilisation-prompts-assistants/PITEL_Formation_IA_Modules1et2.pdf',
    NULL,
    0,
    120
  );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    mid2,
    'Tableur — Prompts par métier (v4)',
    'texte',
    NULL,
    '<p>Ressource complémentaire : tableau Excel des prompts adaptés par métier (version 4).</p><p><a href="/formations/pitel-ia-sensibilisation-prompts-assistants/PITEL_Prompts_ParMetier_v4.xlsx" download style="color:#377CF3;font-weight:600">Télécharger PITEL_Prompts_ParMetier_v4.xlsx</a></p>',
    0,
    45
  );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    mid3,
    'Slides — Assistants IA personnalisés (module 3)',
    'pdf',
    '/formations/pitel-ia-sensibilisation-prompts-assistants/PITEL_Module3_Assistants_IA.pdf',
    NULL,
    0,
    90
  );
END $$;
