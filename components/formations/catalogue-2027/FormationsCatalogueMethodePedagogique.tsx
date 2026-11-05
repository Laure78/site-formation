import Image from 'next/image';
import { FileText, Laptop, BarChart3 } from 'lucide-react';
import { CATALOGUE_MAQUETTE_METHODE } from '@/lib/formations-catalogue-maquette';
import { PHOTOS } from '@/lib/photos';

const ICONS = {
  'cas-reels': FileText,
  pratique: Laptop,
  resultats: BarChart3,
} as const;

export function FormationsCatalogueMethodePedagogique() {
  const visual = PHOTOS.formationsCatalogueMethodePedagogique2026;

  return (
    <section aria-labelledby="catalogue-methode-title" className="scroll-mt-28">
      <div className="text-center">
        <h2 id="catalogue-methode-title" className="font-display text-2xl font-bold text-[#101936] md:text-3xl">
          Notre méthode pédagogique
        </h2>
        <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-[#377CF3]" aria-hidden />
      </div>

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="relative overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(16,25,54,0.12)] ring-1 ring-slate-200/80">
          <Image
            src={visual.src}
            alt={visual.alt}
            width={visual.width}
            height={visual.height}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 520px"
          />
        </div>

        <ul className="grid list-none gap-4">
          {CATALOGUE_MAQUETTE_METHODE.map((item) => {
            const Icon = ICONS[item.id as keyof typeof ICONS];
            return (
              <li
                key={item.id}
                className="flex gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#377CF3]">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-bold text-[#101936] md:text-lg">
                    {item.titre}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
