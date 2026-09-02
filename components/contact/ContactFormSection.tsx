import { Suspense } from 'react';
import { ContactForm } from '@/components/contact/ContactForm';

export function ContactFormSection() {
  return (
    <Suspense fallback={<p className="text-sm text-[#64748B]">Chargement du formulaire…</p>}>
      <ContactForm />
    </Suspense>
  );
}
