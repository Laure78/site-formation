import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import { BIBLIOTHEQUE_BEWORK_COUNT, BIBLIOTHEQUE_SKILLS_COUNT, BIBLIOTHEQUE_TUTO_COUNT } from '@/lib/bibliotheque-skills';
import { LINKS } from '@/lib/internal-links';

export function RessourcesSkillsSection() {
  return (
    <section
      id="bibliotheque-skills"
      aria-labelledby="ressources-skills-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-white py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">Nouveau · BeWork</p>
          <h2 id="ressources-skills-heading" className="font-display mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
            Bibliothèque skills Claude BTP
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            {BIBLIOTHEQUE_BEWORK_COUNT} skills BeWork (.skill) + {BIBLIOTHEQUE_TUTO_COUNT} tutos OFC pour créer les
            tiens — CR, DCE, mémoire technique, PPSPS, DOE…
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { icon: Package, title: 'Format .skill', desc: 'Archive prête pour Claude.ai ou Claude Code.' },
            {
              icon: ArrowRight,
              title: 'Tutoriel en 3 étapes',
              desc: 'Télécharger → Importer → Utiliser. Sans prise de tête.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5">
              <Icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
              <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
            </div>
          ))}
        </div>

        <Link
          href={LINKS.bibliothequeSkills}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
        >
          Ouvrir la bibliothèque complète
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
