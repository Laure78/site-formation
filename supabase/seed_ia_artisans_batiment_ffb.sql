-- ============================================================
-- SEED : L'IA au service des artisans du bâtiment (session FFB)
-- ============================================================
-- Exécuter dans Supabase > SQL Editor
-- Supports : public/formations/ia-artisans-batiment-ffb/
-- ============================================================

do $$
declare
  cid uuid;
  m0 uuid;
  m1 uuid;
  m2 uuid;
  m3 uuid;
  m4 uuid;
begin
  delete from public.courses where slug = 'ia-artisans-batiment-ffb';

  insert into public.courses (
    slug, title, description, objectifs, prerequis, programme,
    price, published, duration_hours, level, category
  ) values (
    'ia-artisans-batiment-ffb',
    'L''IA au service des artisans du bâtiment',
    'Session FFB — artisans du bâtiment (tous corps d''état). Formation 4 h : fondamentaux IA, devis & chiffrage, gestion de chantier, visibilité en ligne (CapCut). Qualiopi — financement OPCO possible selon éligibilité.',
    'Comprendre les apports concrets de l''IA dans les métiers du BTP · Utiliser l''IA pour automatiser et accélérer les tâches administratives · Générer des devis, emails et comptes rendus grâce à l''IA · Créer du contenu efficace pour développer sa visibilité en ligne · Appliquer les bonnes pratiques de confidentialité et de sécurité',
    'Savoir utiliser un ordinateur et un smartphone (navigation web, traitement de texte). Bonne maîtrise du français écrit et oral. Aucun prérequis IA.',
    'Module 1 (60 min) — Fondamentaux de l''IA dans le BTP (outils, prompts, RGPD)
Module 2 (60 min) — Devis et chiffrage assistés par l''IA
Module 3 (60 min) — Gestion administrative du chantier (CR, DOE, planning)
Module 4 (60 min) — Visibilité en ligne et réseaux sociaux + tuto CapCut
Demi-journée 9h–13h · Présentiel ou distanciel · 12 participants max.',
    0,
    true,
    4,
    'débutant',
    'formation-ia-btp'
  )
  returning id into cid;

  insert into public.modules (course_id, title, order_index)
  values (cid, 'Programme de formation', 0)
  returning id into m0;

  insert into public.modules (course_id, title, order_index)
  values (cid, 'Module 1 — Les fondamentaux de l''IA dans le BTP', 1)
  returning id into m1;

  insert into public.modules (course_id, title, order_index)
  values (cid, 'Module 2 — Devis et chiffrage assistés par l''IA', 2)
  returning id into m2;

  insert into public.modules (course_id, title, order_index)
  values (cid, 'Module 3 — Gestion administrative du chantier', 3)
  returning id into m3;

  insert into public.modules (course_id, title, order_index)
  values (cid, 'Module 4 — Visibilité en ligne et réseaux sociaux', 4)
  returning id into m4;

  -- Programme PDF
  insert into public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  values (
    m0,
    'Programme officiel — L''IA au service des artisans du bâtiment',
    'pdf',
    '/formations/ia-artisans-batiment-ffb/programme-ia-artisans-batiment.pdf',
    null,
    0,
    5
  );

  insert into public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  values (
    m0,
    'Document complémentaire (Google Docs)',
    'lien',
    'https://docs.google.com/document/d/1NOi7_qq53dIo78zfVoMSGP5emTwy6vPDs2YQszoiSgU/edit?usp=sharing',
    'Ouvrez le document Google Docs, puis Fichier → Créer une copie pour l''éditer.',
    1,
    5
  );

  -- Module 1
  insert into public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  values
    (
      m1,
      'Support Module 1 — Fondamentaux de l''IA générative',
      'pdf',
      '/formations/ia-artisans-batiment-ffb/module-1-fondamentaux-ia-btp.pdf',
      null,
      0,
      45
    ),
    (
      m1,
      'Kit de prompts « BTP » + liste d''outils (Google Sheets / Excel)',
      'lien',
      'https://docs.google.com/spreadsheets/d/1hWdMYZRBtxiFvm2W77VcCPU2cwZzbEIy0SS91xNLl-w/edit?usp=sharing',
      'Livrable Module 1 : kit de prompts BTP prêts à l''emploi + liste des meilleurs outils IA. Ouvrez le tableau puis faites une copie (Fichier → Créer une copie).',
      1,
      15
    );

  -- Module 2
  insert into public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  values
    (
      m2,
      'Objectifs Module 2 — Devis & chiffrage',
      'texte',
      null,
      '<p><strong>60 min</strong> — Générer un devis complet, créer une grille tarifaire (déboursé + frais + marge), analyser la rentabilité.</p><ul><li>Structurer un devis par postes</li><li>Rédiger des libellés clairs et professionnels</li><li>Calculer son taux horaire d''entreprise</li><li>Détecter les postes sous-évalués</li></ul><p><strong>Livrable :</strong> Kit de prompts « Devis &amp; Chiffrage BTP » (lien Excel ci-dessous).</p>',
      0,
      45
    ),
    (
      m2,
      'Kit de prompts « Devis & Chiffrage BTP » (Google Sheets / Excel)',
      'lien',
      'https://docs.google.com/spreadsheets/d/1cXZhCiYd5ts_JXdCAQET2FdPGErD0nygz2MQeHLjkso/edit?usp=sharing',
      'Kit Devis & Chiffrage — ouvrez le tableau, puis Fichier → Créer une copie.',
      1,
      15
    );

  -- Module 3
  insert into public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  values
    (
      m3,
      'Objectifs Module 3 — CR, DOE, planning',
      'texte',
      null,
      '<p><strong>60 min</strong> — Rapport de fin de chantier, DOE, planning.</p><ul><li>Transformer des notes brutes en rapport structuré</li><li>Construire le sommaire DOE conforme au marché</li><li>Décomposer le chantier en tâches et jalons</li><li>Replanifier après un aléa</li></ul><p><strong>Livrable :</strong> Kit de prompts « Gestion de chantier » (CR, DOE, planning).</p>',
      0,
      45
    ),
    (
      m3,
      'Kit de prompts « Gestion de chantier » (Google Sheets / Excel)',
      'lien',
      'https://docs.google.com/spreadsheets/d/1lThW_X3k1YZXSh0Qdmh768zZMxjWmdU3nQdmA5gWVDk/edit?usp=sharing',
      'Kit Gestion de chantier (CR, DOE, planning) — ouvrez le tableau, puis Fichier → Créer une copie.',
      1,
      15
    );

  -- Module 4
  insert into public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes)
  values
    (
      m4,
      'Objectifs Module 4 — Contenu & réseaux sociaux',
      'texte',
      null,
      '<p><strong>60 min</strong> — Idées de contenu BTP, calendrier éditorial, posts engageants.</p><ul><li>Transformer un chantier réel en contenu</li><li>Définir piliers et rythme de publication</li><li>Hook, storytelling, appel à l''action</li><li>Droit à l''image et authenticité</li></ul><p><strong>Livrable :</strong> Kit « Réseaux Sociaux BTP » + kit multi-usages.</p>',
      0,
      30
    ),
    (
      m4,
      'Tuto CapCut — Modèles avant / après chantier',
      'pdf',
      '/formations/ia-artisans-batiment-ffb/tuto-modeles-capcut.pdf',
      null,
      1,
      20
    ),
    (
      m4,
      'Kit de prompts « Réseaux Sociaux BTP » (Google Sheets / Excel)',
      'lien',
      'https://docs.google.com/spreadsheets/d/1-PoS9GBl8irjYlbCgSPvvZw__hm8iXzZwGfv1darijU/edit?usp=sharing',
      'Kit Réseaux Sociaux BTP — ouvrez le tableau, puis Fichier → Créer une copie.',
      2,
      10
    );

  raise notice 'Formation créée : ia-artisans-batiment-ffb (id %)', cid;

  insert into public.enrollments (user_id, course_id, progress_percent)
  select id, cid, 0
  from auth.users
  where lower(email) = 'laureolivie@yahoo.fr'
  limit 1
  on conflict (user_id, course_id) do nothing;
end $$;
