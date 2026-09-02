import { A_PROPOS_METHODE, A_PROPOS_MODALITES_RESUME } from '@/lib/a-propos-page-config';

export function AProposMethodeSection() {
  return (
    <section aria-labelledby="methode-title">
      <h2
        id="methode-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Une méthode concrète et encadrée
      </h2>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#475569] sm:text-base">
        {A_PROPOS_METHODE.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-[#64748B]">
        {A_PROPOS_MODALITES_RESUME.replace(' : voir la page formations.', '.')}
      </p>
    </section>
  );
}
