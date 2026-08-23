import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import {
  getRessourcesGuidesByFonction,
  type RessourceGuideEntry,
} from '@/lib/ressources-guides';

function GuideCard({ guide }: { guide: RessourceGuideEntry }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-[#377CF3]/40 hover:shadow-md">
      {guide.thumbnail ? (
        <Link href={guide.href} className="relative block aspect-video bg-[#F2F2F2]" tabIndex={-1}>
          <Image
            src={guide.thumbnail.src}
            alt={guide.thumbnail.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={70}
            loading="lazy"
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
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
            {guide.downloadLabel ?? 'PDF direct'}
          </a>
        </div>
      </div>
    </article>
  );
}

export function RessourcesGuidesSection() {
  const groups = getRessourcesGuidesByFonction();

  return (
    <section
      id="guides-pdf"
      aria-labelledby="ressources-guides-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-[#F8FAFC] py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-10 max-w-3xl">
          <h2 id="ressources-guides-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Guides &amp; fichiers à télécharger
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Classés par fonction dans l&apos;entreprise BTP — direction, appels d&apos;offres, conduite de
            travaux, chantier, maîtrise d&apos;œuvre, RH et outils transverses. PDF et Excel gratuits, sans
            inscription.
          </p>
        </header>

        <div className="space-y-12">
          {groups.map(({ fonction, guides }) => (
            <section
              key={fonction.id}
              id={`guides-${fonction.id}`}
              aria-labelledby={`guides-${fonction.id}-heading`}
              className="scroll-mt-28"
            >
              <header className="mb-5 max-w-3xl border-b border-slate-200 pb-4">
                <h3
                  id={`guides-${fonction.id}-heading`}
                  className="font-display text-xl font-bold text-slate-900 md:text-2xl"
                >
                  {fonction.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{fonction.description}</p>
              </header>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {guides.map((guide) => (
                  <GuideCard key={guide.href} guide={guide} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
