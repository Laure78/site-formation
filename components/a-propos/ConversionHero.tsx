import { Phone } from 'lucide-react';

type Props = {
  calendlyHref: string;
  phoneDisplay: string;
  phoneHref: string;
};

export function ConversionHero({ calendlyHref, phoneDisplay, phoneHref }: Props) {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-[#1E40AF] to-[#377CF3] px-6 py-16 text-center text-white shadow-[0_14px_44px_rgba(15,23,42,0.18)] md:px-10 md:py-20">
        <div className="mx-auto inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
          Prêt à passer à l&apos;action ?
        </div>
        <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">Formons ensemble vos équipes BTP à l&apos;IA</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          Diagnostic 30 minutes gratuit en visio. On identifie ensemble la formation adaptée à votre entreprise, on
          cadre le financement Constructys, et vous recevez un devis personnalisé sous 24 heures.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={calendlyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#1E40AF] shadow-[0_14px_44px_rgba(15,23,42,0.25)] transition hover:scale-[1.02]"
          >
            Réserver ma visio →
          </a>
          <a
            href={phoneHref}
            className="inline-flex items-center gap-2 rounded-xl border border-white px-6 py-3 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" />
            {phoneDisplay}
          </a>
        </div>
        <p className="mt-6 text-sm text-white/70">✓ Qualiopi · ✓ 100% finançable Constructys · ✓ 1 592 pros formés · ✓ 4,85/5</p>
      </div>
    </section>
  );
}
