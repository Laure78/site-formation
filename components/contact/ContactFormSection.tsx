'use client';

import { ContactForm } from '@/components/contact/ContactForm';

type Props = {
  initialObjet?: string | null;
  formationHint?: string | null;
};

/** Formulaire contact — props serveur, sans Suspense / useSearchParams. */
export function ContactFormSection({ initialObjet, formationHint }: Props) {
  const key = `${initialObjet ?? 'devis'}-${formationHint ?? ''}`;
  return <ContactForm key={key} initialObjet={initialObjet} formationHint={formationHint} />;
}
