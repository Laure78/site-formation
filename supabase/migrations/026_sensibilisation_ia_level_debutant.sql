-- BTP-05 : Sensibilisation LMS — niveau catalogue et LMS alignés sur débutant
update public.courses
set
  level = 'débutant',
  updated_at = now()
where slug = 'formation-ia-sensibilisation-prompt-engineering-assistants';
