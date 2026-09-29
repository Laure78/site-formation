-- ============================================================
-- SEED : L'IA au service de l'administratif et de la gestion de chantier — PDF-BTP
-- ============================================================
-- Intra PDF-BTP (Longjumeau) — 8 h / 2 sessions
-- Supports : public/formations/ia-pdf-btp-administratif-chantier/
-- ============================================================

do $$
declare
  cid uuid;
  m0 uuid; m1 uuid; m2 uuid; m3 uuid; m4 uuid; m5 uuid; m6 uuid; m7 uuid;
begin
  delete from public.courses where slug = 'ia-pdf-btp-administratif-chantier';

  insert into public.courses (
    slug, title, description, objectifs, prerequis, programme,
    price, published, duration_hours, level, category
  ) values (
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
  returning id into cid;

  insert into public.modules (course_id, title, order_index) values (cid, 'Programme de formation (8 h)', 0) returning id into m0;
  insert into public.modules (course_id, title, order_index) values (cid, 'Module 1 — Fondamentaux de l''IA générative', 1) returning id into m1;
  insert into public.modules (course_id, title, order_index) values (cid, 'Module 2 — Administratif de chantier automatisé', 2) returning id into m2;
  insert into public.modules (course_id, title, order_index) values (cid, 'Module 3 — Exercices pratiques & bilan session 1', 3) returning id into m3;
  insert into public.modules (course_id, title, order_index) values (cid, 'Module 4 — Prompts avancés par profil métier', 4) returning id into m4;
  insert into public.modules (course_id, title, order_index) values (cid, 'Module 5 — Créer votre assistant IA PDF-BTP', 5) returning id into m5;
  insert into public.modules (course_id, title, order_index) values (cid, 'Module 6 — Bilan, plan d''action & attestations', 6) returning id into m6;
  insert into public.modules (course_id, title, order_index) values (cid, 'Session 2 — Claude AI & skills PDF BTP', 7) returning id into m7;

  insert into public.lessons (module_id, title, type, content_url, content_text, order_index, duration_minutes) values
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
    (m7, 'Synthèse de session', 'pdf',
     '/formations/ia-pdf-btp-administratif-chantier/08-synthese-session.pdf', null, 2, 20);

  insert into public.enrollments (user_id, course_id, progress_percent)
  select id, cid, 0
  from auth.users
  where lower(email) = 'laureolivie@yahoo.fr'
  limit 1
  on conflict (user_id, course_id) do nothing;

  raise notice 'Formation créée : ia-pdf-btp-administratif-chantier (id %)', cid;
end $$;
