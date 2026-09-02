import { A_PROPOS_APPORTS } from '@/lib/a-propos-page-config';

export function AProposApportsSection() {
  return (
    <section aria-labelledby="apports-title">
      <h2
        id="apports-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Ce que j’apporte aux entreprises
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {A_PROPOS_APPORTS.map((item) => (
          <li
            key={item.title}
            className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
          >
            <h3 className="font-semibold text-[#377CF3]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#475569]">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
