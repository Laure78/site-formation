'use client';

import { ContactForm } from '@/components/contact/ContactForm';

type Props = {
  initialObjet?: string | null;
  formationHint?: string | null;
  initialMetier?: string | null;
  /** Mise en page compacte — page Contact au-dessus du fold. */
  density?: 'default' | 'compact';
};

/** Formulaire contact — props serveur, sans Suspense / useSearchParams. */
export function ContactFormSection({
  initialObjet,
  formationHint,
  initialMetier,
  density = 'default',
}: Props) {
  const key = `${initialObjet ?? 'devis'}-${formationHint ?? ''}-${initialMetier ?? ''}`;
  return (
    <ContactForm
      key={key}
      initialObjet={initialObjet}
      formationHint={formationHint}
      initialMetier={initialMetier}
      density={density}
    />
  );
}
