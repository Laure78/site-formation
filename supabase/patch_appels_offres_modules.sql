-- ============================================================
-- PATCH : Mettre à jour les modules de "Répondre aux Appels d'Offres BTP avec l'IA"
-- Structure alignée sur l'interface admin (Introduction + 4 modules)
-- ============================================================
-- Exécuter dans Supabase > SQL Editor
-- Ne modifie que cette formation, pas les autres
-- ============================================================

DO $$
DECLARE
  cid uuid;
BEGIN
  -- Récupérer l'ID du cours ou l'insérer s'il n'existe pas
  SELECT id INTO cid FROM courses WHERE slug = 'ia-appels-offre-btp';

  IF cid IS NULL THEN
    -- Créer la formation si elle n'existe pas
    INSERT INTO courses (slug, title, description, objectifs, prerequis, programme, price, published, duration_hours, level)
    VALUES (
      'ia-appels-offre-btp',
      'Répondre aux appels d''offres BTP avec l''IA',
      'Formation opérationnelle : analysez les DCE 5 fois plus vite, rédigez des mémoires techniques convaincants et optimisez vos chiffrages grâce à l''IA. Pour chargés d''affaires et bureaux d''études.',
      'Analyser un DCE en 30 min au lieu de 3h · Structurer mémoires techniques et chiffrages · Bibliothèque de prompts + templates par métier · Assistant IA personnalisé pour vos projets',
      'Connaissance du secteur BTP. Expérience en appels d''offres. Aucune compétence technique IA.',
      'Introduction — Analyse DCE avec NotebookLM — Décision Go/No Go + Rentabilité — Rédaction mémoire technique et relecture — Aide au chiffrage & contrôle de rentabilité',
      0,
      true,
      7,
      'intermediaire'
    ) RETURNING id INTO cid;
  ELSE
    -- Mettre à jour le programme et le niveau si la formation existe
    UPDATE courses SET
      programme = 'Introduction — Analyse DCE avec NotebookLM — Décision Go/No Go + Rentabilité — Rédaction mémoire technique et relecture — Aide au chiffrage & contrôle de rentabilité',
      level = 'intermediaire'
    WHERE id = cid;
  END IF;

  -- Supprimer les anciens modules
  DELETE FROM modules WHERE course_id = cid;

  -- Insérer la nouvelle structure
  INSERT INTO modules (course_id, title, order_index) VALUES
    (cid, 'Introduction', 0),
    (cid, 'MODULE 1 — Analyse DCE avec NotebookLM', 1),
    (cid, 'MODULE 2 — Décision Go/No Go + Rentabilité', 2),
    (cid, 'MODULE 3 — Rédaction mémoire technique et relecture', 3),
    (cid, 'MODULE 4 — Aide au chiffrage & contrôle de rentabilité', 4);

END $$;
