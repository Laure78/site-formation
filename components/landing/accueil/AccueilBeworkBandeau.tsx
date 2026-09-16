import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { BeworkHeroVideo } from '@/components/bework/BeworkHeroVideo';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_BEWORK_DISTINCTION } from '@/config/qualiopi';

/**
 * Accueil — mise en avant BeWork (offre distincte des formations Qualiopi OFC).
 * Un seul lien interne vers `/bework` sur la page.
 */
export function AccueilBeworkBandeau() {
  return (
    <section
      id="bework"
      className="scroll-mt-24 border-y border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE]/70 px-4 py-14 md:py-20"
      aria-labelledby="accueil-bework"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1D4ED8]">
              BeWork · Apprendre aujourd’hui, créer demain
            </p>
            <h2
              id="accueil-bework"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl"
            >
              Sans savoir coder.
              <span className="mt-1 block text-[#1D4ED8]">Créez ce que vous imaginez.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569] md:text-lg">
              Formation progressive pour passer de l’idée à un premier projet numérique avec l’IA —
              sites, apps, outils métier. Aucun prérequis en programmation.
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex gap-3 rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3 shadow-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#1D4ED8]" aria-hidden />
                <div>
                  <p className="font-semibold text-[#0F172A]">1 journée · 7 h · 300 €</p>
                  <p className="text-sm text-[#64748B]">Apprendre à commencer et lancer un premier projet</p>
                  <a
                    href={LINKS.pdfProgrammeBework7h}
                    download="programme-bework-parcours-7h.pdf"
                    className="mt-1 inline-flex text-xs font-semibold text-[#1D4ED8] hover:underline"
                  >
                    Télécharger le programme PDF (7 h)
                  </a>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-[#BFDBFE] bg-white px-4 py-3 shadow-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#1D4ED8]" aria-hidden />
                <div>
                  <p className="font-semibold text-[#0F172A]">2 journées · 14 h · 600 €</p>
                  <p className="text-sm text-[#64748B]">Approfondir et construire plus loin</p>
                  <a
                    href={LINKS.pdfProgrammeBework14h}
                    download="programme-bework-parcours-14h.pdf"
                    className="mt-1 inline-flex text-xs font-semibold text-[#1D4ED8] hover:underline"
                  >
                    Télécharger le programme PDF (14 h)
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalLinkAnchor
                href={EXTERNAL_SITE_URLS.beworkParticiper}
                title="S’inscrire à une session BeWork sur bework.fr (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(29,78,216,0.18)] transition-colors hover:bg-[#1E40AF]"
              >
                S’inscrire
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </ExternalLinkAnchor>
              <Link
                href={LINKS.bework}
                className="inline-flex items-center justify-center rounded-lg border border-[#1D4ED8] bg-white px-5 py-3 text-sm font-semibold text-[#1D4ED8] transition-colors hover:bg-[#EFF6FF]"
              >
                Découvrir BeWork
              </Link>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[#64748B]">
              {QUALIOPI_BEWORK_DISTINCTION}
            </p>
          </div>

          <div className="min-w-0">
            <BeworkHeroVideo />
            <p className="mt-3 text-center text-xs text-[#64748B]">
              Présentiel ou visio · Petit groupe · Une méthode pour continuer après
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
