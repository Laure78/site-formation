'use client';

import Link from 'next/link';
import { CtaVisio } from '@/components/CtaVisio';
import { ArrowRight, ClipboardList, GraduationCap, Search } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';

const STEPS = [
  {
    num: '01',
    title: 'Analyser vos besoins',
    body: 'Identifier les tâches, les objectifs et les compétences à développer.',
    Icon: Search,
  },
  {
    num: '02',
    title: 'Adapter la formation',
    body: 'Construire les exercices autour de situations et de documents professionnels autorisés.',
    Icon: ClipboardList,
  },
  {
    num: '03',
    title: 'Former vos équipes',
    body: 'Animer des sessions en présentiel avec des exercices pratiques et une validation humaine des productions IA.',
    Icon: GraduationCap,
  },
] as const;

export function FormationsCatalogueEntrepriseCompact() {
  return (
    <section
      id="plan-formation-entreprise"
      className="scroll-mt-28 rounded-2xl bg-[#EAF3FF] px-5 py-10 sm:px-8 md:py-12"
      aria-labelledby="catalogue-entreprise-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="catalogue-entreprise-title" className="font-display text-2xl font-bold text-[#101936] md:text-3xl">
          Former votre équipe sur vos propres documents
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Des formations pratiques, adaptées à vos métiers, à vos outils et à votre réalité terrain.
        </p>
      </div>

      <ol className="mx-auto mt-10 grid max-w-5xl list-none gap-6 md:grid-cols-3 md:gap-4">
        {STEPS.map(({ num, title, body, Icon }, index) => (
          <li key={num} className="relative flex flex-col items-center text-center">
            {index < STEPS.length - 1 ? (
              <span
                className="pointer-events-none absolute left-[calc(50%+2.5rem)] top-8 hidden h-0.5 w-[calc(100%-5rem)] bg-[#BFDBFE] md:block"
                aria-hidden
              />
            ) : null}
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#377CF3] shadow-sm">
              <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
            </span>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#377CF3]">{num}</p>
            <h3 className="mt-1 font-display text-base font-bold text-[#101936]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <CtaVisio
          src="catalogue-entreprise-compact"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-sm font-semibold"
        />
        <Link
          href={LINKS.formationIaIntraEntrepriseBtp}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-[#377CF3]/30 bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Découvrir l&apos;intra-entreprise
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
