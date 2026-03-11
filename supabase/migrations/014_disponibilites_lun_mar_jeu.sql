-- =====================================================
-- MISE À JOUR DISPONIBILITÉS
-- Lun, Mar, Jeu : 10h-12h
-- Créneaux : 30 min avec 5 min d'intervalle
-- =====================================================

delete from public.availabilities;

insert into public.availabilities (jour, heure_debut, heure_fin) values
  (1, '10:00'::time, '12:00'::time),  -- Lundi
  (2, '10:00'::time, '12:00'::time),  -- Mardi
  (4, '10:00'::time, '12:00'::time);  -- Jeudi
