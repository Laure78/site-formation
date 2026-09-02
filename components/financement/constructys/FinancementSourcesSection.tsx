import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { CONSTRUCTYS_SOURCES } from '@/lib/financement-constructys-page-config';
import {
  formatContentUpdatedLabel,
  getPillarPageContentUpdatedAt,
} from '@/lib/content-updated-at';

export function FinancementSourcesSection() {
  const updatedAt = getPillarPageContentUpdatedAt('/financement-constructys-formation-ia-btp');

  return (
    <section aria-labelledby="sources-title" className="scroll-mt-24 border-t border-[#E2E8F0] pt-10">
      <h2
        id="sources-title"
        className="font-display text-xl font-bold tracking-tight text-[#0F172A] md:text-2xl"
      >
        Sources officielles
      </h2>
      <p className="mt-2 text-sm text-[#64748B]">{formatContentUpdatedLabel(updatedAt)}</p>
      <ul className="mt-4 space-y-3 text-sm">
        {Object.values(CONSTRUCTYS_SOURCES).map((source) => (
          <li key={source.href} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
            <ExternalLinkAnchor href={source.href} className="font-medium text-[#377CF3] underline">
              {source.title}
            </ExternalLinkAnchor>
            <span className="mt-1 block text-[#64748B]">{source.org}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
