-- FK optionnelles vers le cockpit formation (063) — uniquement si les tables existent déjà

DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'training_programs'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'extranet_programs_training_program_id_fkey'
  ) THEN
    ALTER TABLE public.extranet_programs
      ADD CONSTRAINT extranet_programs_training_program_id_fkey
      FOREIGN KEY (training_program_id) REFERENCES public.training_programs(id) ON DELETE SET NULL;
  END IF;
END $$;

DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'training_sessions'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'extranet_missions_training_session_id_fkey'
  ) THEN
    ALTER TABLE public.extranet_missions
      ADD CONSTRAINT extranet_missions_training_session_id_fkey
      FOREIGN KEY (training_session_id) REFERENCES public.training_sessions(id) ON DELETE SET NULL;
  END IF;
END $$;
