import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  FINANCEMENT_MOEX_QUEL_OPCO,
  FINANCEMENT_OPCO_ATLAS,
  FINANCEMENT_OPCO_EP,
  FINANCEMENT_OPCO_ETENDU_PAGE_SECTION,
  FINANCEMENT_PRISE_EN_CHARGE_CONDITIONS_COMMUNES,
} from '@/lib/financement-opco-etendu-config';
import {
  OFC_CARD,
  OFC_CTA_PRIMARY,
  OFC_LINK,
  OFC_TYPE_H2,
  OFC_TYPE_H3,
} from '@/lib/ofc-interaction-classes';

export function FinancementOpcoEtenduSection() {
  return (
    <section
      id="financement-autres-opco"
      aria-labelledby="financement-autres-opco-title"
      className="scroll-mt-24"
    >
      <h2 id="financement-autres-opco-title" className={OFC_TYPE_H2}>
        {FINANCEMENT_OPCO_ETENDU_PAGE_SECTION.titre}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-ofc-ink-muted">
        {FINANCEMENT_OPCO_ETENDU_PAGE_SECTION.intro}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className={`${OFC_CARD} flex flex-col p-6 md:p-8`}>
          <h3 className={`${OFC_TYPE_H3} text-ofc-accent`}>{FINANCEMENT_OPCO_ATLAS.titre}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ofc-ink-muted md:text-base">
            {FINANCEMENT_OPCO_ATLAS.texte}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <ExternalLinkAnchor
              href={FINANCEMENT_OPCO_ATLAS.href}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-5 py-3 text-center text-sm md:text-base`}
              aria-label={`${FINANCEMENT_OPCO_ATLAS.bouton} (ouvre un nouvel onglet)`}
            >
              {FINANCEMENT_OPCO_ATLAS.bouton}
            </ExternalLinkAnchor>
            <ExternalLinkAnchor
              href={FINANCEMENT_OPCO_ATLAS.lienSecondaireHref}
              className={`${OFC_LINK} text-sm font-medium`}
              aria-label={`${FINANCEMENT_OPCO_ATLAS.lienSecondaireLabel} (ouvre un nouvel onglet)`}
            >
              {FINANCEMENT_OPCO_ATLAS.lienSecondaireLabel}
            </ExternalLinkAnchor>
          </div>
        </article>

        <article className={`${OFC_CARD} flex flex-col p-6 md:p-8`}>
          <h3 className={`${OFC_TYPE_H3} text-ofc-accent`}>{FINANCEMENT_OPCO_EP.titre}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ofc-ink-muted md:text-base">
            {FINANCEMENT_OPCO_EP.texte}
          </p>
          <div className="mt-6">
            <ExternalLinkAnchor
              href={FINANCEMENT_OPCO_EP.href}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-5 py-3 text-center text-sm md:text-base sm:w-auto`}
              aria-label={`${FINANCEMENT_OPCO_EP.bouton} (ouvre un nouvel onglet)`}
            >
              {FINANCEMENT_OPCO_EP.bouton}
            </ExternalLinkAnchor>
            <p className="mt-3 text-sm leading-relaxed text-ofc-ink-subtle">
              {FINANCEMENT_OPCO_EP.indicationSousBouton}
            </p>
          </div>
        </article>
      </div>

      <aside
        className="mt-8 rounded-2xl border border-ofc-border bg-ofc-accent-soft/40 p-6 md:p-8"
        aria-labelledby="moex-opco-title"
      >
        <h3 id="moex-opco-title" className={`${OFC_TYPE_H3} text-ofc-ink`}>
          {FINANCEMENT_MOEX_QUEL_OPCO.titre}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted md:text-base">
          {FINANCEMENT_MOEX_QUEL_OPCO.texte}
        </p>
      </aside>

      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ofc-ink-muted md:text-base">
        {FINANCEMENT_PRISE_EN_CHARGE_CONDITIONS_COMMUNES}
      </p>
    </section>
  );
}
