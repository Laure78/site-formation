import { CONTACT_AFTER_SEND_STEPS } from '@/lib/contact-page-config';

export function ContactAfterSendInfo() {
  return (
    <section aria-labelledby="contact-after-send-title" className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
      <h2
        id="contact-after-send-title"
        className="font-display text-lg font-bold text-[#0F172A]"
      >
        Après l’envoi
      </h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[#475569]">
        {CONTACT_AFTER_SEND_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
