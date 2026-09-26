import { CONTACT_AFTER_SEND_STEPS } from '@/lib/contact-page-config';

type Props = { compact?: boolean; className?: string };

export function ContactAfterSendInfo({ compact = false, className = '' }: Props) {
  return (
    <section
      aria-labelledby="contact-after-send-title"
      className={`rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] ${compact ? 'p-4' : 'p-6'} ${className}`}
    >
      <h2
        id="contact-after-send-title"
        className={`font-display font-bold text-[#0F172A] ${compact ? 'text-base' : 'text-lg'}`}
      >
        Après l’envoi
      </h2>
      <ol
        className={`list-decimal pl-5 leading-relaxed text-[#475569] ${compact ? 'mt-2 space-y-1 text-xs' : 'mt-4 space-y-2 text-sm'}`}
      >
        {CONTACT_AFTER_SEND_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
