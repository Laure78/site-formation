import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { BeworkHeroVideo } from '@/components/bework/BeworkHeroVideo';
import { LINKS } from '@/lib/internal-links';
import {
  TARIF_INTER_DEV_WEB_IA_HT,
} from '@/lib/formation-developpement-web-ia-content';
import { formatTarifHt } from '@/lib/tarifs-sessions';

const TRANSITION_STEPS = [
  'Se former à l’IA',
  'Identifier un besoin',
  'Créer son outil',
  'Première version',
] as const;

const EXEMPLES_PROJETS = [
  {
    titre: 'Application métier',
    description: 'Un outil simple adapté à un processus de votre entreprise.',
  },
  {
    titre: 'Outil de réservation',
    description: 'Un système permettant de gérer des demandes ou rendez-vous.',
  },
  {
    titre: 'CRM',
    description: 'Un outil simple pour organiser prospects, clients et actions commerciales.',
  },
  {
    titre: 'Espace client',
    description: 'Une interface permettant de centraliser des informations ou documents.',
  },
] as const;

const JOURNEE_ETAPES = [
  { label: '09h00', titre: 'Votre idée', detail: null },
  {
    label: 'Cadrer',
    titre: 'Définir précisément ce que vous voulez créer.',
    detail: null,
  },
  {
    label: 'Structurer',
    titre: 'Définir les fonctionnalités nécessaires.',
    detail: null,
  },
  {
    label: 'Créer',
    titre: 'Construire une première version avec l’IA.',
    detail: null,
  },
  {
    label: 'Tester',
    titre: 'Tester le fonctionnement.',
    detail: null,
  },
  {
    label: 'Améliorer',
    titre: 'Corriger et faire évoluer le projet.',
    detail: null,
  },
  { label: '17h00', titre: 'Votre premier prototype', detail: null },
] as const;

/**
 * Accueil — transition Formation IA BTP → création avec l’IA (NIV-10).
 * Un seul lien interne vers la fiche formation sur la page d’accueil.
 */
export function AccueilBeworkBandeau() {
  const tarifLabel = formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT);

  return (
    <>
      <section
        className="border-y border-ofc-border bg-ofc-canvas px-4 py-12 md:py-16"
        aria-labelledby="accueil-dev-web-ia-transition"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="accueil-dev-web-ia-transition"
            className="font-display text-2xl font-bold tracking-tight text-ofc-ink md:text-3xl"
          >
            Et si l’IA pouvait aussi vous aider à créer vos propres outils&nbsp;?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ofc-ink-muted md:text-lg">
            Utiliser ChatGPT ou Claude est une première étape.
          </p>
          <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted md:text-lg">
            Aujourd’hui, l’IA permet également de créer des sites, applications et outils métier
            sans être développeur.
          </p>
          <p className="mt-3 text-base font-medium text-ofc-ink md:text-lg">
            C’est précisément l’objectif de cette formation.
          </p>

          <ol className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-2">
            {TRANSITION_STEPS.map((step, index) => (
              <li key={step} className="flex items-center justify-center gap-2 sm:gap-2">
                <span
                  className={`rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] sm:text-[0.7rem] ${
                    index === TRANSITION_STEPS.length - 1
                      ? 'bg-[#377CF3] text-white'
                      : 'border border-ofc-border bg-white text-ofc-ink'
                  }`}
                >
                  {step}
                </span>
                {index < TRANSITION_STEPS.length - 1 ? (
                  <span className="hidden text-ofc-ink-subtle sm:inline" aria-hidden>
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="creation-avec-ia"
        className="scroll-mt-24 border-b border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE]/70 px-4 py-14 md:py-20"
        aria-labelledby="accueil-dev-web-ia"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#377CF3]">
                Aller plus loin avec l’IA
              </p>
              <h2
                id="accueil-dev-web-ia"
                className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl"
              >
                Vous avez une idée&nbsp;? Apprenez à la transformer en outil avec l’IA.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#475569] md:text-lg">
                Formation de Laure Olivié : créer un site, une application ou un outil métier avec
                l’intelligence artificielle, même sans savoir coder.
              </p>
              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                Vous partez d’une idée ou d’un besoin concret. Vous apprenez à le cadrer, créer une
                première version, la tester puis l’améliorer avec l’aide de l’IA.
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex gap-3 rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3 shadow-sm">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                  <div>
                    <p className="font-semibold text-[#0F172A]">
                      1 journée · 7 h · {tarifLabel} / participant
                    </p>
                    <p className="text-sm text-[#64748B]">
                      Inter-entreprises · Intra-entreprise sur devis
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 rounded-xl border border-[#BFDBFE] bg-white px-4 py-3 shadow-sm">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                  <div>
                    <p className="font-semibold text-[#0F172A]">70 % pratique · 6 à 8 participants</p>
                    <p className="text-sm text-[#64748B]">
                      Présentiel, classe virtuelle ou intra sur demande
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href={LINKS.formationDeveloppementWebIaSansCoder}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(55,124,243,0.18)] transition-colors hover:bg-[#2A6BD9]"
                >
                  Voir la formation
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                <p className="mt-3 text-sm font-medium text-[#377CF3]">
                  Créer avec l’IA sans savoir coder
                </p>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-[#64748B]">
                Prise en charge par un OPCO possible selon l’éligibilité de l’entreprise et du dossier.
              </p>
            </div>

            <div className="min-w-0">
              <BeworkHeroVideo />
              <p className="mt-3 text-center text-xs text-[#64748B]">
                Présentiel ou visio · Petit groupe · Première version, pas une app de production
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-[#BFDBFE]/80 pt-12">
            <h3 className="text-center font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
              Que pourriez-vous créer&nbsp;?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-[#64748B] md:text-base">
              Exemples de projets pouvant être réalisés pendant ou après la formation — pas des
              logiciels déjà développés pour vous.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {EXEMPLES_PROJETS.map((ex) => (
                <div
                  key={ex.titre}
                  className="rounded-xl border border-[#BFDBFE]/80 bg-white/90 px-4 py-5 shadow-sm"
                >
                  <p className="font-display text-base font-bold text-[#0F172A]">{ex.titre}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{ex.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-[#BFDBFE]/80 pt-12">
            <h3 className="text-center font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
              Une journée pour passer de l’idée au premier prototype
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-[#64748B] md:text-base">
              Parcours 7&nbsp;h : vous repartez avec une première version et une méthode pour
              continuer — pas une application complète prête pour la production.
            </p>
            <ol className="mx-auto mt-10 max-w-xl space-y-0">
              {JOURNEE_ETAPES.map((etape, index) => (
                <li key={`${etape.label}-${etape.titre}`} className="relative flex gap-4 pb-8 last:pb-0">
                  {index < JOURNEE_ETAPES.length - 1 ? (
                    <span
                      className="absolute left-[1.15rem] top-10 h-[calc(100%-1.5rem)] w-px bg-[#BFDBFE]"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#377CF3] text-[0.65rem] font-bold text-white">
                    {index === 0 || index === JOURNEE_ETAPES.length - 1 ? '●' : index}
                  </span>
                  <div className="min-w-0 pt-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">
                      {etape.label}
                    </p>
                    <p className="mt-1 text-base font-medium text-[#0F172A]">{etape.titre}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
