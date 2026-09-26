'use client';

import { ContactForm } from '@/components/contact/ContactForm';

type Props = {
  initialObjet?: string | null;
  formationHint?: string | null;
  /** Mise en page compacte — page Contact au-dessus du fold. */
  density?: 'default' | 'compact';
};

/** Formulaire contact — props serveur, sans Suspense / useSearchParams. */
export function ContactFormSection({ initialObjet, formationHint, density = 'default' }: Props) {
  const key = `${initialObjet ?? 'devis'}-${formationHint ?? ''}`;
  return (
    <ContactForm
      key={key}
      initialObjet={initialObjet}
      formationHint={formationHint}
      density={density}
    />
  );
}
