'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ContactForm } from '@/components/contact/ContactForm';

function ContactFormWithKey() {
  const searchParams = useSearchParams();
  const key = `${searchParams.get('objet') ?? 'devis'}-${searchParams.get('formation') ?? ''}`;
  return <ContactForm key={key} />;
}

export function ContactFormSection() {
  return (
    <Suspense fallback={<p className="text-sm text-[#64748B]">Chargement du formulaire…</p>}>
      <ContactFormWithKey />
    </Suspense>
  );
}
