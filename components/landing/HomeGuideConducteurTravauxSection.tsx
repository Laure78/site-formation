import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, FileText, HardHat } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { LINKS } from '@/lib/internal-links';
import { SKILL_IA_LEAD_MAGNET } from '@/lib/lead-magnet-skill-ia';
import { PHOTOS } from '@/lib/photos';
import { OFC_SEC } from '@/lib/ofc-section-classes';

const LIVRABLES = [
  { phase: 'Préparation', label: 'Analyse DCE Go / No Go' },
  { phase: 'Préparation', label: 'PPSPS structuré' },
  { phase: 'Chantier', label: 'Compte rendu de chantier' },
  { phase: 'Chantier', label: 'Constat de retard' },
  { phase: 'Livraison', label: 'PV levée des réserves' },
  { phase: 'Livraison', label: 'DOE livraison' },
] as const;

const STATS = [
  { value: '52 p.', label: 'guide PDF' },
  { value: '6', label: 'skills Claude' },
  { value: '0 €', label: 'sans inscription' },
] as const;

/**
 * Accueil — mise en avant du guide conducteur de travaux (lead magnet).
 */
export function HomeGuideConducteurTravauxSection() {
  const photo = PHOTOS.guideConducteurTravauxHero2026;

  return (
    <section
      id="guide-conducteur-travaux"
      aria-labelledby="home-guide-cdt-title"
      className={OFC_SEC.white}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-[#377CF3]/20 bg-gradient-to-br from-[#EFF6FF] via-white to-white shadow-[0_20px_50px_-24px_rgba(55,124,243,0.35)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
              <div className="flex flex-col p-6 md:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#377CF3]/25 bg-white px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-[#377CF3] sm:text-xs">
                    <HardHat className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                    Ressource gratuite
                  </span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-800 sm:text-xs">
                    PDF immédiat
                  </span>
                </div>

                <h2
                  id="home-guide-cdt-title"
                  className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-slate-900 md:text-3xl"
                >
                  Guide conducteur de travaux — 6 skills Claude pour piloter le chantier
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
                  DCE, PPSPS, CR, constats, PV réserves et DOE : méthodes, prompts à copier-coller et repères
                  métier terrain — un seul PDF à garder sous la main.
                </p>

                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Chiffres clés du guide">
                  {STATS.map(({ value, label }) => (
                    <li
                      key={label}
                      className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-center shadow-sm"
                    >
                      <span className="block font-display text-lg font-bold text-[#377CF3]">{value}</span>
                      <span className="text-[0.65rem] font-medium uppercase tracking-wide text-slate-500 sm:text-xs">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2" aria-label="Livrables couverts">
                  {LIVRABLES.map(({ phase, label }) => (
                    <li
                      key={label}
                      className="flex items-start gap-2 rounded-lg border border-slate-100 bg-white/80 px-3 py-2 text-sm text-slate-700"
                    >
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                      <span>
                        <span className="block text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400">
                          {phase}
                        </span>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    href={LINKS.guideConducteurTravauxIaBtp}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-[#377CF3]/25 transition hover:bg-[#2d66d6]"
                  >
                    Voir le guide et télécharger
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </Link>
                  <a
                    href={SKILL_IA_LEAD_MAGNET.pdfPublicPath}
                    download={SKILL_IA_LEAD_MAGNET.fileName}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#377CF3]/30 bg-white px-6 py-3.5 text-center text-sm font-semibold text-[#377CF3] transition hover:border-[#377CF3] hover:bg-[#EFF6FF]"
                  >
                    <Download className="h-4 w-4 shrink-0" aria-hidden />
                    PDF direct
                  </a>
                </div>
              </div>

              <Link
                href={LINKS.guideConducteurTravauxIaBtp}
                title="Guide conducteur de travaux BTP — 6 skills Claude, PDF gratuit"
                className="group relative min-h-[220px] border-t border-[#377CF3]/10 bg-slate-50 lg:min-h-0 lg:border-l lg:border-t-0"
              >
                <div className="relative aspect-[4/3] h-full min-h-[220px] w-full lg:absolute lg:inset-0 lg:aspect-auto">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition group-hover:opacity-95"
                    sizes="(max-width: 1024px) 100vw, 480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent lg:bg-gradient-to-l lg:from-slate-900/40 lg:via-transparent lg:to-transparent" />
                  <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white drop-shadow-sm">
                    Conducteur de travaux — prompts inclus · ~400 Ko
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
