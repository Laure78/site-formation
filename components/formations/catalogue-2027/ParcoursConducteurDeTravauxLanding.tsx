import Image from 'next/image';
import { SITE_FORMATION_MODALITE_ENCART } from '@/lib/site-config';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CalendarCheck,
  ChevronDown,
  Clock,
  Coins,
  Download,
  FileText,
  HardHat,
  Layers,
  MapPin,
  Package,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  formatPrixInterHt,
  getModuleByCode,
  getThematiquesForParcoursMetier,
  libelleJoursFormation,
  type ParcoursComputed,
} from '@/data/catalogue-2027';
import { libelleDisponibilite } from '@/lib/catalogue-2027/search-modules';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { FormateurCard } from '@/components/formateurs/FormateurCard';
import { getFormateursForMetier } from '@/lib/formateurs';
import { getModule2027IaUsage, labelOutil } from '@/lib/formation-ia';
import { FormationsContact2027 } from './FormationsContact2027';
import { ParcoursChoixModulesRdvCta } from './ParcoursChoixModulesRdvCta';
import { ParcoursEncadrerIaBlock } from '@/components/formations/ParcoursEncadrerIaBlock';
import { PageMaillageSection } from '@/components/maillage/PageMaillageSection';
import { buildParcoursPageMaillageBlocks } from '@/lib/page-maillage-blocks';
import { FinancementOpcoEtenduCourtBlock } from '@/components/financement/FinancementOpcoEtenduCourtBlock';
import { parcoursIdShowsFinancementOpcoEtendu } from '@/lib/financement-opco-etendu-config';
import { CtaVisio } from '@/components/CtaVisio';

const HERO_IMAGE = '/images/conducteur-de-travaux-photo-hero.webp';
const HERO_IMAGE_ALT =
  'Conducteur de travaux sur chantier, casqué, consultant une tablette devant une grue et un bâtiment en construction';
const PEDAGOGIE_BG = '/images/accueil/03-parcours-metiers-chantier.webp';
const MODULES_SECTION_ID = 'conducteur-parcours-modules';

type Props = {
  parcours: ParcoursComputed;
};

export function ParcoursConducteurDeTravauxLanding({ parcours: p }: Props) {
  const formateurs = getFormateursForMetier(p.metierId);
  const thematiquesChantier = getThematiquesForParcoursMetier(p.metierId);

  const programmeHref = catalogueDemandeHref({
    formationOuParcours: `Parcours ${p.titre}`,
    nature: 'choix-formation',
    metier: p.metierId,
  });
  const adaptHref = catalogueDemandeHref({
    formationOuParcours: `Parcours ${p.titre} — adaptation équipe`,
    nature: 'intra',
    metier: p.metierId,
  });

  const maillageBlocks = buildParcoursPageMaillageBlocks(p);

  const joursLabel =
    Number.isInteger(p.joursFormation) && p.joursFormation > 1
      ? `${p.joursFormation} jours`
      : libelleJoursFormation(p.joursFormation);

  const disponibiliteLabel = p.mentionDisponibilite ?? libelleDisponibilite(p.disponibilite);

  return (
    <div className="overflow-x-hidden bg-white pb-24 lg:pb-20">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-white" aria-labelledby="conducteur-travaux-hero-title">
        <div className="mx-auto max-w-[80rem] px-4 pt-4 sm:px-6 lg:px-8">
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
              <li>
                <Link
                  href={LINKS.parcoursMetiers}
                  className="underline decoration-slate-300 underline-offset-2 hover:text-[#377CF3]"
                >
                  Parcours métiers
                </Link>
              </li>
              <li className="text-slate-400" aria-hidden>
                /
              </li>
              <li className="font-medium text-[#101936]" aria-current="page">
                {p.titre}
              </li>
            </ol>
          </nav>
        </div>

        <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-14">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#377CF3]">
              Parcours métier · 2027
            </p>
            <h1 id="conducteur-travaux-hero-title" className="ofc-type-hero mt-4 text-balance text-[#101936]">
              {p.titre}
            </h1>
            <p className="ofc-type-lead mt-4 text-balance text-[#101936]">{p.benefice}</p>
            <p className="mt-3 text-base text-slate-600">
              Un parcours concret et modulable pour conducteurs, aides-conducteurs et chefs de chantier en
              évolution.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`#${MODULES_SECTION_ID}`}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
              >
                Choisir mes modules
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href={programmeHref}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Recevoir le programme
              </Link>
            </div>
          </div>

          <div className="relative min-h-0 w-full">
            <figure className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={HERO_IMAGE}
                  alt={HERO_IMAGE_ALT}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[80rem] space-y-14 px-4 sm:space-y-16 sm:px-6 lg:px-8">
        {/* Indicateurs */}
        <section aria-labelledby="conducteur-indicateurs-title" className="-mt-4 scroll-mt-24 pt-2 sm:pt-4">
          <h2 id="conducteur-indicateurs-title" className="sr-only">
            Informations clés du parcours
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            {[
              { icon: Layers, sub: `${p.moduleCount} modules` },
              { icon: Clock, sub: `${p.dureeHeures} h · ${joursLabel}` },
              { icon: Coins, sub: `${formatPrixInterHt(p.prixInterHt)} HT / participant` },
              { icon: MapPin, sub: SITE_FORMATION_MODALITE_ENCART },
              { icon: Calendar, sub: disponibiliteLabel },
            ].map((item) => (
              <div
                key={item.sub}
                className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <item.icon className="h-5 w-5 text-[#377CF3]" aria-hidden />
                <p className="text-sm font-semibold leading-snug text-[#101936]">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bénéfices */}
        <section aria-labelledby="conducteur-benefices-title">
          <h2 id="conducteur-benefices-title" className="ofc-type-h2 text-center text-[#101936] md:text-left">
            Un parcours adapté à votre rôle
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: BarChart3,
                titre: 'Préparer le chantier',
                texte:
                  'Anticiper la passation, l’ouverture et les points critiques avant démarrage.',
              },
              {
                icon: CalendarCheck,
                titre: 'Piloter l’exécution',
                texte: 'Planifier, coordonner les équipes et actualiser les délais.',
              },
              {
                icon: Sparkles,
                titre: 'Sécuriser la clôture',
                texte:
                  'Préparer la réception, les réserves, le DOE et le suivi de fin de chantier.',
              },
            ].map((card) => (
              <div
                key={card.titre}
                className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm ring-1 ring-slate-50 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="inline-flex rounded-xl bg-[#EFF6FF] p-2.5">
                  <card.icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#101936]">{card.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bandeau modularité */}
        <section
          aria-labelledby="conducteur-modularite-title"
          className="flex flex-col gap-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 md:flex-row md:items-center md:justify-between md:gap-8"
        >
          <div className="flex min-w-0 gap-4 md:max-w-[58%]">
            <Layers className="mt-0.5 h-8 w-8 shrink-0 text-[#1D4ED8]" aria-hidden />
            <div>
              <h2 id="conducteur-modularite-title" className="font-display text-lg font-semibold text-[#101936]">
                Parcours complet OU modules à la carte
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Vous pouvez suivre l&apos;ensemble du parcours ou choisir chaque module indépendamment, sous réserve
                des prérequis.
              </p>
            </div>
          </div>
          <Link
            href={`#${MODULES_SECTION_ID}`}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start px-6 py-3 md:self-center`}
          >
            Voir les modules
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </section>

        {/* Compétences visées */}
        <section aria-labelledby="competences-title">
          <h2 id="competences-title" className="ofc-type-h2 text-[#101936]">
            Compétences visées
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
            {p.competencesVisees.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {/* Modules */}
        <section
          id={MODULES_SECTION_ID}
          className="scroll-mt-24"
          aria-labelledby="conducteur-modules-title"
        >
          <h2 id="conducteur-modules-title" className="ofc-type-h2 text-[#101936]">
            Les 6 modules du parcours
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            Chaque bloc correspond à un module du catalogue : vous pouvez suivre le parcours complet ou ne retenir que
            certains modules — sous réserve des prérequis. Un cas pratique commun relie les étapes lorsque vous suivez le
            parcours entier ; les journées peuvent être espacées.
          </p>
          <div className="mt-6">
            <ParcoursChoixModulesRdvCta />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {p.etapes.map((etape, index) => {
              const mod = getModuleByCode(etape.moduleCode);
              const duree = etape.dureeHeuresOverride ?? mod?.dureeHeures ?? 0;
              const iaUsage = getModule2027IaUsage(etape.moduleCode);
              const moduleTitleId = `conducteur-module-${etape.moduleCode}-${index}`;
              const ficheHref =
                mod?.href ??
                catalogueDemandeHref({
                  formationOuParcours: `${etape.moduleCode} — ${mod?.titre ?? ''}`,
                  nature: 'choix-formation',
                });
              const numero = String(index + 1).padStart(2, '0');

              return (
                <article
                  key={`${etape.moduleCode}-${index}`}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-50 transition-shadow hover:shadow-md"
                  aria-labelledby={moduleTitleId}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#377CF3] text-sm font-bold text-white"
                      aria-hidden
                    >
                      {numero}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                      {etape.moduleCode} · {duree} h
                    </p>
                  </div>
                  <h3 id={moduleTitleId} className="mt-3 font-display text-base font-semibold leading-snug text-[#101936]">
                    {mod?.titre ?? etape.moduleCode}
                  </h3>
                  <div className="mt-3 flex gap-2 text-sm text-slate-600">
                    <Package className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                    <div>
                      <span className="font-medium text-[#101936]">Livrable : </span>
                      {etape.livrable}
                    </div>
                  </div>

                  <details className="group mt-4 rounded-xl border border-slate-100 bg-[#F8FAFC] text-sm open:bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 font-medium text-[#101936] marker:content-none [&::-webkit-details-marker]:hidden">
                      Programme détaillé et évaluation
                      <ChevronDown
                        className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                        aria-hidden
                      />
                    </summary>
                    <div className="space-y-3 border-t border-slate-100 px-3 py-3 text-slate-600">
                      <p>
                        Chaque module peut être suivi indépendamment, sous réserve des prérequis pédagogiques du module
                        {mod?.prerequis ? ` (${mod.prerequis})` : ''} et du positionnement du parcours.
                      </p>
                      {mod ? (
                        <div>
                          <p className="font-medium text-[#101936]">Objectifs pédagogiques</p>
                          <p className="mt-1">{mod.objectifPrincipal}</p>
                        </div>
                      ) : null}
                      <div>
                        <p className="font-medium text-[#101936]">Compétences développées</p>
                        <p className="mt-1">{etape.competence}</p>
                      </div>
                      <div>
                        <p className="font-medium text-[#101936]">Exercice professionnel (étape)</p>
                        <p className="mt-1">{etape.exercice}</p>
                      </div>
                      <div>
                        <p className="font-medium text-[#101936]">Livrable (étape)</p>
                        <p className="mt-1">{etape.livrable}</p>
                      </div>
                      {iaUsage ? (
                        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                          <p className="font-medium text-[#101936]">
                            Usage IA ({labelOutil(iaUsage.outil)})
                          </p>
                          <p className="mt-1">{iaUsage.tacheIa}</p>
                          <p className="mt-2">
                            <span className="font-medium text-[#101936]">Contrôle humain : </span>
                            {iaUsage.controlesHumains}
                          </p>
                          <p className="mt-1">
                            <span className="font-medium text-[#101936]">Évaluation : </span>
                            {iaUsage.critereEvaluation}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </details>

                  <Link
                    href={ficheHref}
                    className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[#377CF3] underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3] focus-visible:ring-offset-2"
                  >
                    Voir le module
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {/* Pédagogie — bandeau bleu marine */}
        <section aria-labelledby="conducteur-pedagogie-title" className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0" aria-hidden>
            <Image
              src={PEDAGOGIE_BG}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#0B1F4F]/92" />
          </div>
          <div className="relative px-6 py-10 text-white md:px-10 md:py-12">
            <h2 id="conducteur-pedagogie-title" className="ofc-type-h2 text-white">
              Une pédagogie ancrée dans la réalité du BTP
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: HardHat,
                  titre: 'Cas pratiques issus du terrain',
                  texte: 'Mises en situation sur des opérations de conduite de travaux.',
                },
                {
                  icon: FileText,
                  titre: 'Documents métier et exemples concrets',
                  texte: 'Passation, plannings, tableaux de suivi et pièces de clôture.',
                },
                {
                  icon: Layers,
                  titre: 'Livrables réutilisables sur chantier',
                  texte: 'Checklists, modèles et trames exploitables après la formation.',
                },
                {
                  icon: Shield,
                  titre: 'Validation humaine des propositions IA',
                  texte: 'Contrôle systématique des contenus sensibles et contractuels.',
                },
              ].map((item) => (
                <div key={item.titre} className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <item.icon className="h-7 w-7 text-white" aria-hidden />
                  <h3 className="mt-3 font-display text-base font-semibold text-white">{item.titre}</h3>
                  <p className="mt-2 text-sm text-white/85">{item.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {formateurs.length > 0 ? (
          <section
            className="scroll-mt-28"
            aria-labelledby={`formateurs-metier-${p.metierId}`}
          >
            <h2 id={`formateurs-metier-${p.metierId}`} className="ofc-type-h2 text-[#101936]">
              Les formateurs de ce domaine
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Intervenants associés aux domaines du parcours.
            </p>
            <ul className="mt-8 grid list-none gap-6 lg:grid-cols-2">
              {formateurs.map((f, index) => (
                <li key={f.id} className="min-w-0">
                  <div className="h-full rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:p-5">
                    <FormateurCard
                      formateur={f}
                      showFormations={false}
                      variant="catalogue-hub"
                      portraitPriority={index === 0}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              <Link href={LINKS.formateurs} className="font-semibold text-[#377CF3] underline underline-offset-2">
                Voir tous les formateurs
              </Link>
            </p>
          </section>
        ) : null}

        {/* CTA final */}
        <section
          aria-labelledby="conducteur-cta-parcours-title"
          className="rounded-2xl border border-slate-200 bg-[#F8FAFC] px-6 py-10 text-center md:px-10"
        >
          <h2 id="conducteur-cta-parcours-title" className="font-display text-2xl font-bold text-balance text-[#101936]">
            Construisons votre parcours sur mesure
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
            Échangeons sur vos objectifs, vos enjeux et la combinaison de modules la plus adaptée à votre entreprise.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <CtaVisio
              src="parcours-conducteur-de-travaux-final"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto"
              leadingAdornment={<Calendar className="h-4 w-4 shrink-0" aria-hidden />}
            />
            <Link
              href={programmeHref}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-3 sm:w-auto`}
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden />
              Demander le programme
            </Link>
          </div>
        </section>

        {/* Prérequis */}
        <section aria-labelledby="prerequis-title">
          <h2 id="prerequis-title" className="ofc-type-h2 text-[#101936]">
            Prérequis et positionnement
          </h2>
          <p className="mt-3 text-slate-600">{p.prerequis}</p>
          <p className="mt-2 text-sm text-slate-600">
            Un positionnement permet d’ajuster le parcours. L’évaluation des acquis est intégrée à la durée annoncée.
          </p>
          {p.varianteOptionnelle ? (
            <p className="mt-4 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 text-sm text-slate-600">
              {p.varianteOptionnelle.label} : {p.varianteOptionnelle.dureeHeures} h —{' '}
              {formatPrixInterHt(p.varianteOptionnelle.prixInterHt)} / participant. Ce retrait n’est pas automatique.
            </p>
          ) : null}
          {p.initiationComplementaire ? (
            <p className="mt-3 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 text-sm text-slate-600">
              {p.initiationComplementaire.label} : {p.initiationComplementaire.dureeHeures} h —{' '}
              {formatPrixInterHt(p.initiationComplementaire.prixInterHt)} / participant.
            </p>
          ) : null}
        </section>

        {thematiquesChantier.length > 0 ? (
          <section className="scroll-mt-24" aria-labelledby="thematiques-chantier-ia">
            <h2 id="thematiques-chantier-ia" className="ofc-type-h2 text-[#101936]">
              Organisation et prévention avec l’IA
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Ce parcours intègre les sujets des sous-domaines IA chantier du catalogue (modules existants — durées et
              tarifs inchangés).
            </p>
            <ul className="mt-4 space-y-4">
              {thematiquesChantier.map((t) => (
                <li
                  key={t.id}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 text-sm text-slate-600"
                >
                  <Link
                    href={`${LINKS.formations}#${t.slug}`}
                    className="font-semibold text-[#377CF3] underline"
                  >
                    {t.titre}
                  </Link>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {(t.integrationParcours[p.metierId] ?? []).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="methodes-title">
          <h2 id="methodes-title" className="ofc-type-h2 text-[#101936]">
            Méthodes et évaluation
          </h2>
          <p className="mt-3 text-slate-600">
            Présentiel, exercices sur cas professionnels, livrables réutilisables. Évaluation des acquis en fin de
            parcours, intégrée à la durée annoncée. Formations non certifiantes.
          </p>
        </section>

        <ParcoursEncadrerIaBlock />

        <section aria-labelledby="adaptation-title">
          <h2 id="adaptation-title" className="ofc-type-h2 text-[#101936]">
            Adaptation à l’entreprise
          </h2>
          <p className="mt-3 text-slate-600">
            Le parcours peut être adapté en intra : ordre des modules, documents d’entreprise, effectif et calendrier.
            Tarif intra : sur devis.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={programmeHref}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-5 py-3`}
            >
              Demander le programme
            </Link>
            <Link
              href={adaptHref}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3`}
            >
              <Users className="h-4 w-4 shrink-0" aria-hidden />
              Adapter ce parcours à mon équipe
            </Link>
          </div>
        </section>

        {parcoursIdShowsFinancementOpcoEtendu(p.id) ? (
          <FinancementOpcoEtenduCourtBlock />
        ) : null}

        <FormationsContact2027 formationHint={`Parcours ${p.titre}`} initialObjet="devis" />
      </div>

      <div className="mx-auto mt-16 max-w-[80rem] space-y-12 px-4 sm:px-6 lg:px-8">
        {maillageBlocks.map((block) => (
          <PageMaillageSection key={block.id} {...block} tone="white" className="!px-0" />
        ))}
      </div>

      {/* CTA mobile sticky */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[80rem] gap-2">
          <CtaVisio
            src="parcours-conducteur-de-travaux-sticky"
            variant="primary"
            className="inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm"
          />
          <Link
            href={programmeHref}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm`}
          >
            Programme
          </Link>
        </div>
      </div>
    </div>
  );
}
