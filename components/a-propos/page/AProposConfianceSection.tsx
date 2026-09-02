import Link from 'next/link';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { getAProposConfianceItems } from '@/lib/a-propos-page-config';

export function AProposConfianceSection() {
  const items = getAProposConfianceItems();

  return (
    <section aria-labelledby="confiance-title">
      <h2
        id="confiance-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Repères de confiance
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.label}
            className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4"
          >
            <p className="font-semibold text-[#0F172A]">{item.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#475569]">{item.detail}</p>
            {item.href ? (
              <p className="mt-2 text-sm">
                {item.external ? (
                  <ExternalLinkAnchor href={item.href} className="font-medium text-[#377CF3] underline">
                    En savoir plus
                  </ExternalLinkAnchor>
                ) : (
                  <Link href={item.href} className="font-medium text-[#377CF3] underline">
                    En savoir plus
                  </Link>
                )}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
