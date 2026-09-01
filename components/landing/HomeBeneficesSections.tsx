import Link from 'next/link';
import {
  FileText,
  Clock,
  Zap,
  Check,
  Mail,
  CircleDollarSign,
  Rocket,
  HeartHandshake,
  LineChart,
  Sparkles,
  ShieldCheck,
  ArrowDown,
  X,
} from 'lucide-react';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { KeyPoint } from '@/components/readability/KeyPoint';
import { Accordion } from '@/components/readability/Accordion';
import { RevealShell, RevealGroupShell } from '@/components/motion/RevealShell';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_LINK,
  OFC_BENEFIT_CARD,
  OFC_GAIN_CARD,
  OFC_PROBLEM_SOLUTION_CARD,
  OFC_HOWTO_STEP,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_INSET_PANEL, OFC_INNER_ACCENT_BAND } from '@/lib/ofc-section-classes';
import { DEVIS_GAIN_TEMPS_LIBELLE, GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';

const GAINS_CONCRETS_MERGES = [
  "Appels d'offres : analyse DCE et mémoire technique assistés — relecture métier obligatoire",
  'Chantier : DOE, PV, CR à partir de vos notes — vous validez et signez',
  'Communication : visuels avant/après et posts réseaux pour vos chantiers',
  'Prompts sur mesure : méthodes adaptées à vos documents et process',
] as const;

const GAINS_COMMERCIAUX_CARDS = [
  {
    icon: CircleDollarSign,
    title: 'Augmentez votre rentabilité',
    desc: "Réduisez le temps passé sur l'administratif et traitez davantage d'appels d'offres à effectif constant. Les gains varient selon l'organisation et le niveau de pratique.",
  },
  {
    icon: Rocket,
    title: 'Gagnez en réactivité commerciale',
    keyPoint: (
      <KeyPoint variant="inverse" label="Réactivité commerciale">
        {DEVIS_GAIN_TEMPS_LIBELLE}
      </KeyPoint>
    ),
    desc: 'Répondez plus vite aux demandes de devis — un délai de réponse court reste le premier levier de transformation.',
  },
  {
    icon: HeartHandshake,
    title: 'Fidélisez vos équipes',
    desc: "Libérez vos collaborateurs des tâches répétitives. Réduisez le turnover grâce à des conditions modernisées.",
  },
  {
    icon: LineChart,
    title: 'Développez votre CA sans embaucher',
    desc: 'Libérez du temps bureau pour absorber plus de chantiers à effectif constant, sans dégrader le suivi.',
  },
  {
    icon: Sparkles,
    title: 'Professionnalisez votre image',
    desc: "Démarquez-vous par votre rapidité. Proposez des documents ultra-professionnels.",
  },
  {
    icon: ShieldCheck,
    title: 'Sécurisez vos process',
    desc: "Standardisez vos documents. Assurez la traçabilité complète. Réduisez les litiges.",
  },
] as const;

export function HomeBeneficesSections() {
  return (
    <section
        className={OFC_SEC.whiteMesh}
        aria-labelledby="benefices-formation-ia-heading"
      >
        <div className="mx-auto max-w-7xl">
            <RevealShell className="text-center">
              <h2
                id="benefices-formation-ia-heading"
                className="font-display text-3xl font-bold text-slate-900 md:text-4xl"
              >
                Les bénéfices d&apos;une formation IA pour les pros du BTP et de la construction
              </h2>
            </RevealShell>
            <div className="mt-12">
              <RevealShell>
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                  <Zap size={16} strokeWidth={1.5} />
                  <span>GAINS CONCRETS</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 md:text-3xl">
                  Pourquoi l&apos;IA change le quotidien des entreprises du BTP
                </h3>
                <p className="mt-3 max-w-none text-base leading-relaxed text-slate-600 md:text-lg">
                  Une formation IA appliquée au bâtiment, sérieuse, automatise devis, emails et suivi administratif sans
                  remplacer le métier. Dans le secteur de la construction, les professionnels du BTP et conducteurs de
                  travaux gagnent en productivité et retrouvent du temps sur le chantier et les appels d&apos;offres.
                </p>
              </RevealShell>
              <RevealGroupShell
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                staggerMs={60}
              >
                {[
                  {
                    icon: Clock,
                    title: 'Trop de temps sur les devis',
                    keyPoint: (
                      <KeyPoint label="Gain constaté">
                        {DEVIS_GAIN_TEMPS_LIBELLE} L&apos;IA structure la trame ; vous validez prix et conditions.
                      </KeyPoint>
                    ),
                  },
                  {
                    icon: FileText,
                    title: "Les appels d'offres prennent des heures",
                    desc: "Un mémoire technique structuré à partir d'une trame plutôt que d'une page blanche — analyse DCE et rédaction sous votre validation métier.",
                  },
                  {
                    icon: FileText,
                    title: "Les comptes rendus ne sont jamais faits",
                    desc: "Des comptes rendus rédigés le jour même de la visite, à partir de vos notes vocales ou écrites.",
                  },
                  {
                    icon: Mail,
                    title: "Trop d'emails à gérer",
                    desc: "Moins de temps sur les relances et les courriers récurrents, avec le bon ton professionnel.",
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                  <div
                    key={card.title}
                    className={`${OFC_BENEFIT_CARD} h-full rounded-2xl border border-slate-200 bg-slate-50/50 p-6`}
                  >
                    <div className="ofc-benefit-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-blue-500/20">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h4 className="mt-4 font-semibold text-slate-900">{card.title}</h4>
                    {'keyPoint' in card && card.keyPoint ? (
                      <div className="mt-3">{card.keyPoint}</div>
                    ) : (
                      <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
                    )}
                  </div>
                  );
                })}
              </RevealGroupShell>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
            </div>

            <div className={OFC_INSET_PANEL} aria-labelledby="probleme-solution-heading">
              <RevealShell className="text-center">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Avant · Après
                </p>
                <h3
                  id="probleme-solution-heading"
                  className="mx-auto mt-4 max-w-4xl font-display text-2xl font-bold leading-[1.15] tracking-tight text-slate-900 md:text-3xl"
                >
                  Le BTP perd des heures sur des tâches que l&apos;IA{' '}
                  <span className="relative inline-block font-serif italic text-[var(--accent)]">
                    automatise
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 -z-10 h-2.5 rounded-md bg-blue-100/90"
                      aria-hidden
                    />
                  </span>
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-slate-600 md:text-base">
                  Trois freins fréquents sur chantier et au bureau — et ce que change une formation IA
                  BTP encadrée (toujours sous votre validation métier).
                </p>
              </RevealShell>
              <RevealGroupShell className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" staggerMs={50}>
                {[
                  {
                    problem: 'Mémoires techniques et dossiers chronophages',
                    solution: 'Trames et IA : rédigez l’essentiel en minutes, vous validez.',
                  },
                  {
                    problem: 'Analyse de CCTP / DCE fastidieuse',
                    solution: 'L’IA extrait critères et points clés pour structurer votre réponse.',
                  },
                  {
                    problem: 'Comptes rendus et emails répétitifs',
                    solution: 'Dictez ou notez : l’IA structure un CR ou un mail pro.',
                  },
                ].map(({ problem, solution }, index) => (
                  <article
                    key={problem}
                    className={`${OFC_PROBLEM_SOLUTION_CARD} group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.04] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-12px_rgba(37,99,235,0.14)] hover:ring-blue-500/10`}
                  >
                    <div className="relative border-b border-dashed border-slate-200/90 bg-gradient-to-br from-rose-50/90 via-white to-transparent px-5 pb-5 pt-6 sm:px-6">
                      <div className="absolute right-4 top-4 text-[0.65rem] font-bold tabular-nums text-rose-300/90">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="flex gap-4">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] ring-1 ring-rose-200/60"
                          aria-hidden
                        >
                          <X size={20} strokeWidth={2.25} />
                        </span>
                        <p className="pt-0.5 text-[0.9375rem] font-semibold leading-snug text-slate-800">
                          {problem}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex h-12 shrink-0 items-center justify-center bg-white/50">
                      <div className="absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden />
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white shadow-[0_4px_14px_-4px_rgba(37,99,235,0.35)] ring-4 ring-white">
                        <ArrowDown className="ofc-problem-arrow h-4 w-4 text-[var(--accent)]" strokeWidth={2.5} aria-hidden />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col bg-gradient-to-br from-[var(--accent-soft)]/40 via-white to-blue-50/30 px-5 pb-6 pt-1 sm:px-6">
                      <div className="flex gap-4">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-blue-600 text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.55)] ring-1 ring-white/30"
                          aria-hidden
                        >
                          <Check size={20} strokeWidth={2.25} />
                        </span>
                        <p className="pt-0.5 text-[0.9375rem] leading-relaxed text-slate-700">{solution}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </RevealGroupShell>
            </div>

            <div
              className="mt-16 rounded-2xl border border-slate-200 bg-[#eef2ff] px-4 py-12 md:px-8"
              itemScope
              itemType="https://schema.org/HowTo"
            >
              <RevealShell className="text-center">
                <h3
                  className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
                  itemProp="name"
                >
                  5 cas d&apos;usage concrets de l&apos;IA dans le{' '}
                  <span className="font-serif italic">BTP</span>
                </h3>
                <p
                  className="mx-auto mt-3 max-w-2xl text-slate-600"
                  itemProp="description"
                >
                  Méthodes éprouvées en formation IA pour le BTP avec des professionnels du BTP, conducteurs de travaux et
                  entreprises de construction : devis, chantier, appels d&apos;offres et productivité au
                  quotidien.
                </p>
              </RevealShell>
              <RevealGroupShell className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerMs={45}>
                {[
                  {
                    title: 'Mémoires techniques & dossiers',
                    desc: "Structurer et rédiger plus vite tout en gardant la validation métier.",
                  },
                  {
                    title: 'Analyse CCTP / DCE',
                    desc: 'Synthétiser des pièces longues et repérer les exigences clés.',
                  },
                  {
                    title: 'Comptes rendus de chantier',
                    desc: 'À partir de notes ou dictée : CR clair et professionnel.',
                  },
                  {
                    title: 'Devis et chiffrage',
                    desc: 'Mise en forme, variantes et relecture pour gagner du temps.',
                  },
                  {
                    title: 'Emails & administratif',
                    desc: 'Relances, courriers et priorités pour souffler sur la boîte mail.',
                  },
                ].map((c, idx) => (
                  <div
                    key={c.title}
                    className={`${OFC_HOWTO_STEP} rounded-2xl border border-white/80 bg-white p-6 shadow-sm`}
                    itemScope
                    itemProp="step"
                    itemType="https://schema.org/HowToStep"
                  >
                    <meta itemProp="position" content={String(idx + 1)} />
                    <h4 className="font-semibold text-slate-900" itemProp="name">
                      {c.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-600" itemProp="text">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </RevealGroupShell>
              <RevealShell className="mt-10 text-center">
                <Link
                  href={LINKS.casUsage}
                  className={`inline-flex items-center gap-2 ${OFC_LINK}`}
                  title="10 cas d’usage concrets de l’IA dans le BTP"
                >
                  Voir le détail des 10 cas d&apos;usage
                  <span aria-hidden>→</span>
                </Link>
              </RevealShell>
            </div>
        </div>
        <div className={OFC_INNER_ACCENT_BAND}>
          <div className="mx-auto max-w-7xl">
            <RevealShell>
              <h2
                id="gains-concrets-heading"
                className="font-display text-3xl font-bold text-white md:text-4xl"
              >
                Ce que vous gagnez concrètement
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-blue-100/95 md:text-lg">
                Après la formation : rentabilité, réactivité commerciale, fidélisation des équipes et image
                professionnelle — sans embaucher à tout prix.
              </p>
            </RevealShell>
            <RevealGroupShell className="mt-8 grid gap-6 sm:grid-cols-2" staggerMs={60}>
              {GAINS_COMMERCIAUX_CARDS.slice(0, 2).map((card) => {
                const Icon = card.icon;
                return (
                <div
                  key={card.title}
                  className={`${OFC_GAIN_CARD} group/card rounded-2xl border border-white/10 bg-white/[0.08] p-6 shadow-lg shadow-blue-950/20 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.14] hover:shadow-xl hover:shadow-blue-950/30`}
                >
                  <div className="relative flex h-[3.75rem] w-[3.75rem] items-center justify-center" aria-hidden>
                    <span className="benefit-icon-halo absolute -inset-1 z-0 rounded-2xl opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
                    <span className="benefit-icon-plate absolute inset-0 z-[1] rounded-2xl ring-1 ring-white/25" />
                    <Icon
                      size={26}
                      strokeWidth={1.6}
                      className="relative z-10 text-white drop-shadow-[0_2px_10px_rgba(56,189,248,0.45)] transition-transform duration-300 group-hover/card:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 font-semibold tracking-tight text-white">{card.title}</h3>
                  {'keyPoint' in card && card.keyPoint ? (
                    <>
                      <div className="mt-3">{card.keyPoint}</div>
                      {card.desc ? (
                        <p className="mt-2 text-sm leading-relaxed text-blue-100/95">{card.desc}</p>
                      ) : null}
                    </>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-blue-100/95">{card.desc}</p>
                  )}
                </div>
                );
              })}
            </RevealGroupShell>
            <ul className="mt-8 space-y-3 text-base leading-relaxed text-blue-100/95">
              {GAINS_CONCRETS_MERGES.map((line) => (
                <li key={line} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" strokeWidth={2} aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <DisclaimerGains className="mt-6 max-w-3xl text-blue-100/80" />
            <Accordion
              id="benefices-gains-commerciaux"
              variant="inverse"
              summaryLabel="Lire la suite — 4 autres bénéfices"
            >
              <RevealGroupShell className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerMs={45}>
                {GAINS_COMMERCIAUX_CARDS.slice(2).map((card) => {
                  const Icon = card.icon;
                  return (
                  <div
                    key={card.title}
                    className={`${OFC_GAIN_CARD} group/card rounded-2xl border border-white/10 bg-white/[0.08] p-6 shadow-lg shadow-blue-950/20 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.14] hover:shadow-xl hover:shadow-blue-950/30`}
                  >
                    <div className="relative flex h-[3.75rem] w-[3.75rem] items-center justify-center" aria-hidden>
                      <span className="benefit-icon-halo absolute -inset-1 z-0 rounded-2xl opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
                      <span className="benefit-icon-plate absolute inset-0 z-[1] rounded-2xl ring-1 ring-white/25" />
                      <Icon
                        size={26}
                        strokeWidth={1.6}
                        className="relative z-10 text-white drop-shadow-[0_2px_10px_rgba(56,189,248,0.45)] transition-transform duration-300 group-hover/card:scale-105"
                      />
                    </div>
                    <h3 className="mt-5 font-semibold tracking-tight text-white">{card.title}</h3>
                    {'keyPoint' in card && card.keyPoint ? (
                      <>
                        <div className="mt-3">{card.keyPoint}</div>
                        {card.desc ? (
                          <p className="mt-2 text-sm leading-relaxed text-blue-100/95">{card.desc}</p>
                        ) : null}
                      </>
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-blue-100/95">{card.desc}</p>
                    )}
                  </div>
                  );
                })}
              </RevealGroupShell>
            </Accordion>
          </div>
        </div>
      </section>
  );
}
