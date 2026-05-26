-- ============================================================
-- OBSOLÈTE — utiliser le cours canonique `ia-appels-offre-btp`
-- ============================================================
-- Le slug ia-niveau2-assistant-ao-dce-memoire est redirigé (301) vers
-- /formations/ia-appels-offre-btp sur le site public.
-- Migration 028 dépublie ce cours s'il existe encore en base.
--
-- Pour (re)créer le parcours LMS NIV-02 :
--   supabase/migrations/028_course_ia_appels_offre_claude_cowork.sql
--   ou supabase/patch_appels_offres_modules.sql
-- ============================================================

UPDATE public.courses
SET published = false, updated_at = now()
WHERE slug = 'ia-niveau2-assistant-ao-dce-memoire';
