-- ============================================================
-- PATCH : Retirer les formations LMS « Formation IA BTP à Paris » et « IA pour PME du BTP »
-- ============================================================
-- Slugs : ia-btp-paris, ia-pme-btp
-- Exécuter une fois dans Supabase → SQL Editor (après déploiement du seed mis à jour si besoin)
-- Supprime le cours, modules, leçons, progression et inscriptions liées (CASCADE)
-- ============================================================

DELETE FROM courses
WHERE slug IN ('ia-btp-paris', 'ia-pme-btp');
