-- ============================================================
-- SEED : NIVEAU 2 — IA appliquée aux AO — Assistant IA DCE & mémoire technique
-- ============================================================
-- Prérequis : migrations LMS (courses, modules, lessons)
-- Fichier statique : public/formations/ia-niveau2-assistant-ao-dce-memoire/Programme_Niveau2_IA_AO_Assistant_DCE_Memoire_Technique.pdf
-- Exécuter dans Supabase → SQL Editor → Run
-- Niveau : intermediaire (courses_level_check)
-- ============================================================

DELETE FROM courses WHERE slug = 'ia-niveau2-assistant-ao-dce-memoire';

DO $$
DECLARE
  cid uuid;
  m0 uuid;
  m1 uuid;
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
    'ia-niveau2-assistant-ao-dce-memoire',
    'NIVEAU 2 — L''IA appliquée aux AO : créer son assistant IA pour DCE et mémoire technique',
    'Parcours LMS niveau intermédiaire : concevoir un assistant IA pour analyser les DCE, structurer les réponses et accélérer la rédaction de mémoires techniques. Complément idéal après une sensibilisation IA ou la formation « Répondre aux appels d''offres avec l''IA ».',
    'Paramétrer un assistant IA métier pour dossiers de consultation · Structurer l''analyse DCE et critères d''évaluation · Accélérer la production de mémoires techniques · Intégrer l''IA dans le flux de réponse aux marchés',
    'Public : chargés d''affaires, bureau d''études, réponses marchés BTP. Avoir déjà une pratique des appels d''offres et une première sensibilisation à l''IA recommandée.',
    'Module 0 — Programme officiel (PDF). Module 1 — Mise en œuvre : assistant IA pour DCE et mémoire technique (contenus pédagogiques sur la plateforme).',
    0,
    true,
    7,
    'intermediaire',
    'BTP'
  )
  RETURNING id INTO cid;

  INSERT INTO modules (course_id, title, order_index)
  VALUES (cid, 'Programme officiel (PDF)', 0)
  RETURNING id INTO m0;

  INSERT INTO modules (course_id, title, order_index)
  VALUES (cid, 'Assistant IA pour DCE et mémoire technique', 1)
  RETURNING id INTO m1;

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m0,
    'Télécharger le programme de formation (niveau 2)',
    'pdf',
    '/formations/ia-niveau2-assistant-ao-dce-memoire/Programme_Niveau2_IA_AO_Assistant_DCE_Memoire_Technique.pdf',
    NULL,
    0,
    20
  );

  INSERT INTO lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  VALUES (
    m1,
    'Objectifs du parcours niveau 2',
    'texte',
    NULL,
    '<p>Ce parcours vous guide pour <strong>créer et utiliser un assistant IA</strong> dédié aux dossiers de consultation (DCE) et à la rédaction de <strong>mémoires techniques</strong>, en cohérence avec les exigences des marchés publics et privés du BTP.</p><p><strong>À retenir :</strong> ne jamais transmettre de données confidentielles sans validation interne ; respecter les règles de votre entreprise et du RGPD.</p>',
    0,
    60
  );
END $$;
