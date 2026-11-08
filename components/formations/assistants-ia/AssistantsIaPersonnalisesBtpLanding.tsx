import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Clock,
  Coins,
  Download,
  FileText,
  HardHat,
  Laptop,
  Layers,
  MapPin,
  Package,
  Shield,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';
import { CtaVisio } from '@/components/CtaVisio';
import {
  ASSISTANTS_IA_CREATIONS,
  ASSISTANTS_IA_MODULES,
  ASSISTANTS_IA_PROPOSITION_VALEUR,
} from '@/lib/formation-assistants-ia-personnalises-btp-content';
import { getFormationByCode } from '@/data/formations';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import {
  libelleTarifParticipantCatalogue,
  TARIF_PARTICIPANT_NIV09_HT,
} from '@/lib/tarifs-catalogue-participant';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { SITE_FORMATION_MODALITE_ENCART } from '@/lib/site-config';

const HERO_IMAGE = '/images/formations/assistants-ia-btp.webp';
const PEDAGOGY_BG = '/images/formation-ia-chantier-conducteur-travaux.webp';
const CAS_USAGE_SECTION_ID = 'assistants-metier';
const PROGRAMME_SECTION_ID = TRAINING_ANCHOR.programme;

const LIVRABLES_HERO = [
  {
    icon: Laptop,
    title: 'Un premier assistant métier personnalisé',
    text: 'Configuré et testé en formation sur un cas réel, avec protocole de relecture avant tout envoi.',
  },
  {
    icon: Layers,
    title: 'Des skills BTP et modèles réutilisables',
    text: 'Prompts, modèles et méthodes prêts à téléverser dans ChatGPT ou Claude, adaptables à votre entreprise.',
  },
  {
    icon: Shield,
    title: 'Un plan d’action de déploiement',
    text: 'Priorités sur 30 jours, règles de confidentialité, partage en équipe et validation humaine systématique.',
  },
] as const;

const PROGRAMME_CARDS = [
  {
    numero: '01',
    titre: 'Panorama outils, cadre d’usage et confidentialité',
    livrable: 'Fiche « avant d’envoyer un document à l’IA » + premier test sur extrait anonymisé.',
  },
  {
    numero: '02',
    titre: 'Concevoir un assistant aligné sur votre entreprise',
    livrable: 'Assistant prêt à être testé sur un document réel (hors données non autorisées).',
  },
  {
    numero: '03',
    titre: 'Skills et automatisation d’une tâche métier',
    livrable: 'Au moins un skill opérationnel ou brouillon validé pour finalisation en autonomie.',
  },
  {
    numero: '04',
    titre: 'Déploiement, évaluation et plan d’action',
    livrable: 'Plan d’action individuel et tableau de suivi des prochaines étapes.',
  },
] as const;

type Props = {
  h1Id: string;
};

export function AssistantsIaPersonnalisesBtpLanding({ h1Id }: Props) {
  const seo = getFormationCatalogueSeo('NIV-09');
  const formation = getFormationByCode('NIV-09')!;
  const tarifLabel = libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV09_HT);
  const effectifLabel = `${formation.effectifMin} à ${formation.effectifMax} participants`;
  const pdfHref = LINKS.pdfProgrammeAssistantsIaPersonnalisesBtp;
  const sessionsHref = `#${TRAINING_ANCHOR.sessions}`;

  const livrablesExtra = ASSISTANTS_IA_CREATIONS.slice(3);

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-white" aria-labelledby={h1Id}>
        <div className="mx-auto max-w-[75rem] px-4 pt-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-600" aria-label="Fil d'Ariane">
            <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
              <li>
                <Link href="/" className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]">
                  Accueil
                </Link>
              </li>
              <li className="text-slate-400" aria-hidden>
                /
              </li>
              <li>
                <Link
                  href={LINKS.formations}
                  className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]"
                >
                  Formations
                </Link>
              </li>
              <li className="text-slate-400" aria-hidden>
                /
              </li>
              <li className="font-medium text-[#101936]" aria-current="page">
                Assistants IA personnalisés BTP
              </li>
            </ol>
          </nav>
        </div>

        <div className="mx-auto grid max-w-[75rem] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[45fr_55fr] lg:gap-12 lg:px-8 lg:py-12">
          <div className="min-w-0">
            <p className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#377CF3]">
              Formation IA BTP · Niveau avancé
            </p>
            <h1 id={h1Id} className="ofc-type-hero mt-4 text-balance text-[#101936]">
              {seo.h1}
            </h1>
            <p className="ofc-type-lead mt-4 text-balance font-semibold text-[#101936]">
              Créez des assistants IA utiles pour vos devis, comptes rendus, relances et appels d&apos;offres.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {ASSISTANTS_IA_PROPOSITION_VALEUR.split('. ').slice(0, 2).join('. ')}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={sessionsHref}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
              >
                Voir les dates
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href={pdfHref}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Télécharger le programme
              </Link>
            </div>
          </div>

          <div className="relative min-h-0 w-full">
            <figure className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={HERO_IMAGE}
                  alt="Professionnelle du BTP configure un assistant IA sur ordinateur portable, plans et chantier en arrière-plan"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[75rem] space-y-14 px-4 pb-12 sm:space-y-16 sm:px-6 lg:px-8">
        {/* Indicateurs */}
        <section aria-labelledby="niv09-indicateurs-title" className="-mt-4 scroll-mt-24 pt-2 sm:pt-4">
            <h2 id="niv09-indicateurs-title" className="sr-only">
              Informations clés de la formation
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
              {[
                { icon: Clock, label: 'Durée', sub: '4 heures' },
                { icon: Coins, label: 'Tarif inter', sub: tarifLabel },
                { icon: MapPin, label: 'Format', sub: SITE_FORMATION_MODALITE_ENCART },
                { icon: Users, label: 'Effectif', sub: effectifLabel },
                { icon: BarChart3, label: 'Niveau', sub: 'Niveau avancé' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 shadow-sm"
                >
                  <item.icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{item.label}</p>
                  <p className="text-sm font-semibold leading-snug text-[#101936]">{item.sub}</p>
                </div>
              ))}
            </div>
        </section>

        {/* Livrables */}
        <section id="ce-que-vous-creez" className="scroll-mt-24"
            aria-labelledby="niv09-livrables-title"
          >
            <h2 id="niv09-livrables-title" className="ofc-type-h2 text-[#101936]">
              Ce que vous allez créer
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Résultats concrets de la demi-journée — premier assistant visé, skills et ressources pour la suite.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {LIVRABLES_HERO.map((card) => (
                <article
                  key={card.title}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6"
                >
                  <span className="inline-flex rounded-xl bg-[#EFF6FF] p-2.5">
                    <card.icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-[#101936]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.text}</p>
                </article>
              ))}
            </div>

            <details className="group mt-6 rounded-2xl border border-slate-200 bg-white text-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3.5 font-medium text-[#101936] marker:content-none [&::-webkit-details-marker]:hidden">
                Autres livrables et accès plateforme (1 an)
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="space-y-3 border-t border-slate-100 px-4 py-4 text-slate-700">
                <ul className="space-y-2">
                  {livrablesExtra.map((item) => (
                    <li key={item.title}>
                      <span className="font-medium text-[#101936]">{item.title}</span>
                      {' — '}
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
        </section>

        {/* Bandeau cas d&apos;usage */}
        <section
          aria-labelledby="niv09-cas-usage-bandeau-title"
          className="flex flex-col gap-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 md:flex-row md:items-center md:justify-between md:gap-8"
          >
            <div className="flex min-w-0 gap-4 md:max-w-[65%]">
              <Zap className="mt-0.5 h-8 w-8 shrink-0 text-[#1D4ED8]" aria-hidden />
              <div>
                <h2 id="niv09-cas-usage-bandeau-title" className="font-display text-lg font-semibold text-[#101936]">
                  Formation complète ou cas d&apos;usage ciblé
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Devis, comptes rendus de chantier, relances, analyse de DCE, trames DOE : approfondissez un ou deux
                  cas selon un questionnaire envoyé avant la session — pas les six familles le même jour.
                </p>
              </div>
            </div>
            <Link
              href={`#${CAS_USAGE_SECTION_ID}`}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start px-6 py-3 md:self-center`}
            >
              Explorer les cas d&apos;usage
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
        </section>

        {/* Programme — vue synthèse */}
        <section className="scroll-mt-24" aria-labelledby="niv09-programme-synthese-title">
            <h2 id="niv09-programme-synthese-title" className="ofc-type-h2 text-[#101936]">
              Le programme en 4 étapes
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              4 heures annoncées — 4 modules de 60 minutes de formation effective ; pauses courtes entre modules. Le
              détail pédagogique complet figure dans la section programme.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {PROGRAMME_CARDS.map((card, index) => {
                const module = ASSISTANTS_IA_MODULES[index];
                return (
                  <article
                    key={card.numero}
                    className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#377CF3] text-sm font-bold text-white"
                        aria-hidden
                      >
                        {card.numero}
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                        Module {card.numero} · 1 h
                      </p>
                    </div>
                    <h3 className="mt-3 font-display text-base font-semibold leading-snug text-[#101936]">
                      {card.titre}
                    </h3>
                    {module ? (
                      <div className="mt-3 flex gap-2 text-sm text-slate-600">
                        <Package className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                        <div>
                          <span className="font-medium text-[#101936]">Livrable — </span>
                          {card.livrable}
                        </div>
                      </div>
                    ) : null}
                    <Link
                      href={`#${PROGRAMME_SECTION_ID}`}
                      className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[#377CF3] underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3] focus-visible:ring-offset-2"
                    >
                      Programme détaillé
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </article>
                );
              })}
            </div>
        </section>

        {/* Pédagogie */}
        <section aria-labelledby="niv09-pedagogie-title" className="relative overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0">
              <Image
                src={PEDAGOGY_BG}
                alt=""
                fill
                className="object-cover object-center"
                sizes="100vw"
                aria-hidden
              />
              <div className="absolute inset-0 bg-[#0B1F4F]/88" aria-hidden />
            </div>
            <div className="relative px-6 py-10 text-white md:px-10 md:py-12">
              <h2 id="niv09-pedagogie-title" className="ofc-type-h2 text-white">
                Une pédagogie ancrée dans la réalité du BTP
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: HardHat, titre: '70 % de pratique', texte: 'Ateliers sur vos documents anonymisés et cas du groupe.' },
                  { icon: FileText, titre: 'Documents métier', texte: 'Devis, CR, courriers, DCE — formats concrets du quotidien BTP.' },
                  { icon: Layers, titre: 'Livrables réutilisables', texte: 'Skills, modèles et consignes exploitables après la session.' },
                  {
                    icon: ShieldCheck,
                    titre: 'Validation humaine',
                    texte: 'Contrôle systématique des sorties IA avant envoi client ou marché.',
                  },
                ].map((item) => (
                  <div key={item.titre} className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <item.icon className="h-7 w-7 text-white" aria-hidden />
                    <h3 className="mt-3 font-display text-base font-semibold text-white">{item.titre}</h3>
                    <p className="mt-2 text-sm text-white/80">{item.texte}</p>
                  </div>
                ))}
              </div>
            </div>
        </section>

        {/* CTA intermédiaire */}
        <section
          aria-labelledby="niv09-cta-mesure-title"
          className="rounded-2xl border border-slate-200 bg-[#F8FAFC] px-6 py-10 text-center md:px-10"
          >
            <h2 id="niv09-cta-mesure-title" className="font-display text-2xl font-bold text-balance text-[#101936]">
              Construisons votre assistant sur mesure
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
              Échangez sur vos cas d&apos;usage, le format inter ou intra et les abonnements ChatGPT / Claude requis avant
              la session.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CtaVisio
                src="catalogue-fiche-NIV-09-mid"
                variant="primary"
                className="inline-flex min-h-11 w-full items-center justify-center px-6 py-3 sm:w-auto"
              />
              <Link
                href={pdfHref}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Télécharger le programme
              </Link>
            </div>
        </section>
      </div>
    </div>
  );
}
