import Link from 'next/link';
import { Quote } from 'lucide-react';

type Props = {
  paragraphs: readonly string[];
  quote: string;
  calendlyHref: string;
  formationsHref: string;
};

export function ApproachSection({ paragraphs, quote, calendlyHref, formationsHref }: Props) {
  return (
    <section id="methodologie" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#0F172A]">Mon approche</h2>
          <div className="mt-6 space-y-5 text-[17px] leading-[1.8] text-[#334155]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={formationsHref} className="rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(55,124,243,0.3)]">
              Voir les formations
            </Link>
            <a
              href={calendlyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[#377CF3] bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF]"
            >
              Réserver une visio
            </a>
          </div>
        </div>
        <aside className="rounded-3xl bg-gradient-to-br from-[#377CF3] to-[#1E40AF] p-10 text-white shadow-[0_14px_44px_rgba(15,23,42,0.18)] lg:col-span-2">
          <Quote className="h-14 w-14 opacity-30" />
          <p className="mt-6 text-xl font-medium italic leading-[1.6]">{quote}</p>
          <p className="mt-6 text-sm text-white/80">— Laure Olivié, formatrice OFC</p>
        </aside>
      </div>
    </section>
  );
}
