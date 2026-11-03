import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { CONSTRUCTYS_SOURCES } from '@/lib/financement-constructys-page-config';
import {
  FINANCEMENT_OPCO_ATLAS,
  FINANCEMENT_OPCO_EP,
} from '@/lib/financement-opco-etendu-config';
import {
  formatContentUpdatedLabel,
  getPillarPageContentUpdatedAt,
} from '@/lib/content-updated-at';
import { FC_SECTION } from '@/lib/financement-constructys-ui';

const SOURCE_LINKS = [
  CONSTRUCTYS_SOURCES.conditionsPriseEnCharge2026,
  CONSTRUCTYS_SOURCES.dispositifTransitoirePaiement,
  CONSTRUCTYS_SOURCES.egestion,
  CONSTRUCTYS_SOURCES.modalites2026,
] as const;

export function FinancementSourcesSection() {
  const updatedAt = getPillarPageContentUpdatedAt('/financement-constructys-formation-ia-btp');

  return (
    <section aria-labelledby="sources-title" className={`${FC_SECTION} border-t border-[#D7E5F7] pt-8`}>
      <h2
        id="sources-title"
        className="font-display text-lg font-bold tracking-tight text-[#081943] md:text-xl"
      >
        Sources et références
      </h2>
      <p className="mt-1 text-xs text-ofc-ink-subtle">{formatContentUpdatedLabel(updatedAt)}</p>
      <ul className="mt-4 flex flex-col gap-2 text-sm">
        {SOURCE_LINKS.map((source) => (
          <li key={source.href}>
            <ExternalLinkAnchor
              href={source.href}
              className="font-medium text-[#377CF3] underline underline-offset-2"
            >
              {source.title}
            </ExternalLinkAnchor>
            <span className="text-ofc-ink-subtle"> — {source.org}</span>
          </li>
        ))}
        <li>
          <ExternalLinkAnchor
            href={FINANCEMENT_OPCO_ATLAS.href}
            className="font-medium text-[#377CF3] underline underline-offset-2"
          >
            {FINANCEMENT_OPCO_ATLAS.bouton}
          </ExternalLinkAnchor>
          <span className="text-ofc-ink-subtle"> — Atlas</span>
        </li>
        <li>
          <ExternalLinkAnchor
            href={FINANCEMENT_OPCO_EP.href}
            className="font-medium text-[#377CF3] underline underline-offset-2"
          >
            {FINANCEMENT_OPCO_EP.bouton}
          </ExternalLinkAnchor>
          <span className="text-ofc-ink-subtle"> — OPCO EP</span>
        </li>
      </ul>
    </section>
  );
}
