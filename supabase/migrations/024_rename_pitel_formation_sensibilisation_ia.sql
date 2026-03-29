-- Renommage affichage LMS : titre et modules alignés sur « Sensibilisation à l'IA »
UPDATE public.courses
SET
  title = 'Formation IA : Sensibilisation à l''IA & Assistants IA Personnalisés',
  description = 'Parcours en trois volets : sensibilisation à l''IA (supports modules 1 et 2), ressource opérationnelle « prompts par métier » au format Excel, puis conception d''assistants IA personnalisés (module 3).',
  objectifs = 'Comprendre les fondamentaux de l''IA générative appliquée au terrain · Savoir formuler des prompts efficaces · Disposer d''une banque de prompts par métier · Concevoir et paramétrer des assistants IA sur mesure',
  prerequis = 'Ordinateur avec connexion internet. Compte ChatGPT (ou équivalent) recommandé. Aucune compétence technique préalable requise.',
  programme = 'Partie 1 — Slides : modules 1 et 2 (sensibilisation à l''IA). Partie 2 — Ressource Excel : prompts par métier (v4). Partie 3 — Slides : module 3 (assistants IA personnalisés).',
  updated_at = now()
WHERE slug = 'formation-ia-sensibilisation-prompt-engineering-assistants';

UPDATE public.modules
SET title = 'Partie 1 — Modules 1 et 2 : sensibilisation à l''IA'
WHERE course_id = (SELECT id FROM public.courses WHERE slug = 'formation-ia-sensibilisation-prompt-engineering-assistants')
  AND order_index = 0;

UPDATE public.modules
SET title = 'Partie 2 — Ressource : prompts par métier'
WHERE course_id = (SELECT id FROM public.courses WHERE slug = 'formation-ia-sensibilisation-prompt-engineering-assistants')
  AND order_index = 1;

UPDATE public.modules
SET title = 'Partie 3 — Module 3 : assistants IA personnalisés'
WHERE course_id = (SELECT id FROM public.courses WHERE slug = 'formation-ia-sensibilisation-prompt-engineering-assistants')
  AND order_index = 2;
