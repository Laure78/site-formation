import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { BeworkHeroVideo } from '@/components/bework/BeworkHeroVideo';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';

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
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-[#BFDBFE] bg-white px-4 py-3 shadow-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#1D4ED8]" aria-hidden />
                <div>
                  <p className="font-semibold text-[#0F172A]">2 journées · 14 h · 600 €</p>
                  <p className="text-sm text-[#64748B]">Approfondir et construire plus loin</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={LINKS.bework}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(29,78,216,0.18)] transition-colors hover:bg-[#1E40AF]"
              >
                Découvrir BeWork
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <ExternalLinkAnchor
                href={EXTERNAL_SITE_URLS.beworkFormation}
                title="Sessions et inscription BeWork sur bework.fr (nouvel onglet)"
                className="inline-flex items-center justify-center rounded-lg border border-[#1D4ED8] bg-white px-5 py-3 text-sm font-semibold text-[#1D4ED8] transition-colors hover:bg-[#EFF6FF]"
              >
                Voir les sessions sur bework.fr
              </ExternalLinkAnchor>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[#64748B]">
              Offre distincte des formations IA BTP de l’organisme certifié Qualiopi OFC Création
              d’Entreprise — non éligible OPCO.
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
