-- Retrait catalogue LMS : formation BTP-06 « Productivité chantier » (slug ia-productivite-chantier)
-- Modules, inscriptions, invitations : CASCADE depuis public.courses
DELETE FROM public.courses WHERE slug = 'ia-productivite-chantier';
