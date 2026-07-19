import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { RESSOURCES_GUIDES } from '@/lib/ressources-guides';

export function RessourcesGuidesSection() {
  return (
    <section
      id="guides-pdf"
      aria-labelledby="ressources-guides-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-[#F8FAFC] py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-8 max-w-3xl">
          <h2 id="ressources-guides-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Guides PDF
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Documents complets à télécharger — méthode, prompts et checklists pour assistants travaux, maîtrise
            d&apos;œuvre et conduite de travaux.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RESSOURCES_GUIDES.map((guide) => (
            <article
              key={guide.href}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#377CF3]/40 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">{guide.audience}</p>
              <h3 className="mt-2 font-display text-xl font-bold text-slate-900">{guide.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{guide.description}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={guide.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
                >
                  Voir le guide
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={guide.pdfHref}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#377CF3] hover:text-[#377CF3]"
                  download
                >
                  <Download className="h-4 w-4" aria-hidden />
                  PDF direct
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
