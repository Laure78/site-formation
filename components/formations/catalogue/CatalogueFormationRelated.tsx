import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { RelatedCatalogueFormation } from '@/lib/catalogue-formation-related';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export function CatalogueFormationRelated({
  items,
}: {
  items: readonly RelatedCatalogueFormation[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10" aria-labelledby="formations-complementaires">
      <div className="mx-auto max-w-4xl">
        <h2 id="formations-complementaires" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
          Formations complémentaires
        </h2>
        <p className="mt-2 text-base text-slate-600">
          Poursuivre le parcours pédagogique après cette session.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#377CF3]/35 hover:bg-white hover:shadow-sm"
              >
                <span className="font-display text-base font-semibold text-slate-900 group-hover:text-[#377CF3]">
                  {item.title}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.teaser}</span>
                <span className={`${OFC_LINK} mt-4 inline-flex items-center gap-1 text-sm font-semibold`}>
                  Voir la fiche
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
