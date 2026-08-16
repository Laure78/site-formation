-- ============================================================
-- SEED : Laure Olivié — admin + apprenant
-- ============================================================
-- Exécuter dans Supabase > SQL Editor
-- Prérequis : l'utilisateur contact@laureolivie.fr doit avoir créé un compte
--            (inscription sur le site ou création manuelle dans Auth > Users)
-- ============================================================

DO $$
DECLARE
  uid uuid;
  cid uuid;
BEGIN
  -- Récupérer l'ID de l'utilisateur par email
  SELECT id INTO uid FROM auth.users WHERE email = 'contact@laureolivie.fr' LIMIT 1;

  IF uid IS NULL THEN
    RAISE NOTICE 'Utilisateur contact@laureolivie.fr non trouvé. Inscrivez-vous d''abord sur le site ou créez l''utilisateur dans Supabase > Auth > Users.';
    RETURN;
  END IF;

  -- Mettre à jour le profil : rôle admin + nom complet
  UPDATE public.profiles
  SET role = 'admin', full_name = 'Laure Olivié', updated_at = now()
  WHERE id = uid;

  RAISE NOTICE 'Profil mis à jour : contact@laureolivie.fr est maintenant admin.';

  -- Inscrire en tant qu'apprenant sur toutes les formations publiées
  FOR cid IN SELECT id FROM public.courses WHERE published = true
  LOOP
    INSERT INTO public.enrollments (user_id, course_id, progress_percent)
    VALUES (uid, cid, 0)
    ON CONFLICT (user_id, course_id) DO NOTHING;
  END LOOP;

  RAISE NOTICE 'Inscriptions ajoutées à toutes les formations publiées.';
END $$;
