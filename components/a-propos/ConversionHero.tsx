import { Phone } from 'lucide-react';

type Props = {
  calendlyHref: string;
  phoneDisplay: string;
  phoneHref: string;
};

export function ConversionHero({ calendlyHref, phoneDisplay, phoneHref }: Props) {
  return (
    <section className="px-4 py-8 md:py-10" aria-labelledby="a-propos-conversion-title">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#1E40AF] via-[#377CF3] to-[#2563EB] px-5 py-8 text-white shadow-[0_10px_36px_-8px_rgba(30,64,175,0.35)] md:px-8 md:py-9">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:22px_22px]"
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="min-w-0 text-center lg:max-w-2xl lg:text-left">
            <div className="inline-flex rounded-full border border-white/28 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] md:text-[11px]">
              Prêt à passer à l&apos;action ?
            </div>
            <h2
              id="a-propos-conversion-title"
              className="mt-3 font-display text-xl font-bold leading-snug tracking-tight md:text-2xl lg:text-[1.65rem]"
            >
              Formons ensemble vos équipes BTP à l&apos;IA
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-[15px]">
              Diagnostic 30 minutes gratuit en visio. On identifie ensemble la formation adaptée à votre entreprise, on
              cadre le financement Constructys, et vous recevez un devis personnalisé sous 24 heures.
            </p>
            <p className="mt-3 text-xs leading-snug text-white/65 md:text-sm">
              ✓ Qualiopi · ✓ financement possible selon éligibilité · ✓ 1 592 pros formés · ✓ 4,85/5
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-2.5 sm:flex-row sm:justify-center lg:flex-col lg:items-stretch xl:flex-row xl:justify-end">
            <a
              href={calendlyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-white px-5 py-2.5 text-center text-sm font-semibold text-[#1E40AF] shadow-sm transition hover:bg-white/95"
            >
              Réserver ma visio →
            </a>
            <a
              href={phoneHref}
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-white/65 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-[2px] transition hover:bg-white/15"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              {phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
