import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Calendar,
  Clock,
  Coins,
  FileText,
  HardHat,
  Layers,
  MapPin,
  Shield,
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
import {
  OFC_CTA_ON_ACCENT,
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
} from '@/lib/ofc-interaction-classes';
import { FormateursMetierSection } from '@/components/formateurs/FormateursDomaineSection';
import { getModule2027IaUsage, labelOutil } from '@/lib/formation-ia';
import { FormationsContact2027 } from './FormationsContact2027';
import { ParcoursChoixModulesRdvCta } from './ParcoursChoixModulesRdvCta';
import { PageMaillageSection } from '@/components/maillage/PageMaillageSection';
import { buildParcoursPageMaillageBlocks } from '@/lib/page-maillage-blocks';
import { FinancementOpcoEtenduCourtBlock } from '@/components/financement/FinancementOpcoEtenduCourtBlock';
import { parcoursIdShowsFinancementOpcoEtendu } from '@/lib/financement-opco-etendu-config';
import { CtaDevis } from '@/components/CtaDevis';

const IMG_BASE = '/images/parcours/referent-ia-btp';

const MODULE_ILLUSTRATIONS: Record<string, string> = {
  'NUM-02': `${IMG_BASE}/02-ia-appels-offres-dce-btp.webp`,
  'NUM-03': `${IMG_BASE}/03-maitriser-claude-ia-btp.webp`,
  'NUM-04': `${IMG_BASE}/04-creer-applications-metier-btp.webp`,
  'DIR-05': `${IMG_BASE}/05-piloter-ia-entreprise-btp.webp`,
};

type Props = {
  parcours: ParcoursComputed;
};

export function ParcoursReferentIaBtpLanding({ parcours: p }: Props) {
  const thematiquesChantier = getThematiquesForParcoursMetier(p.metierId);

  const devisHref = catalogueDemandeHref({
    formationOuParcours: `Parcours ${p.titre}`,
    nature: 'devis',
    metier: p.metierId,
  });
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

  return (
    <div className="overflow-x-hidden pb-24 lg:pb-20">
      {/* Section 1 — Hero */}
      <section
        className="border-b border-slate-100 bg-white"
        aria-labelledby="referent-ia-btp-hero-title"
      >
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
                Référent IA BTP
              </li>
            </ol>
          </nav>
        </div>

        <div className="mx-auto grid max-w-[80rem] items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-14">
          <div className="min-w-0">
            <p className="inline-flex rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#1E40AF]">
              Parcours métier · 2027
            </p>
            <h1 id="referent-ia-btp-hero-title" className="ofc-type-hero mt-4 text-balance text-[#101936]">
              {p.titre}
            </h1>
            <p className="ofc-type-lead mt-4 text-balance text-slate-600">{p.objectif}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={programmeHref}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 w-full items-center justify-center px-5 py-3 sm:w-auto`}
              >
                Demander le programme
              </Link>
              <Link
                href={adaptHref}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 py-3 sm:w-auto`}
              >
                <Users className="h-4 w-4 shrink-0" aria-hidden />
                Adapter à mon équipe
              </Link>
            </div>
          </div>

          <div className="relative min-h-0 w-full">
            <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={`${IMG_BASE}/01-referent-ia-btp-chantier-hero.webp`}
                  alt="Professionnel du BTP avec casque et gilet haute visibilité utilisant un ordinateur portable sur chantier — visuel d’illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <figcaption className="border-t border-slate-100 bg-white px-3 py-2 text-center text-xs text-slate-500">
                Visuels d’illustration (générés) — pas le reportage d’une session réelle.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[80rem] space-y-12 px-4 sm:px-6 lg:space-y-16 lg:px-8">
        {/* Section 2 — Indicateurs */}
        <section aria-labelledby="referent-indicateurs-title" className="scroll-mt-24">
          <h2 id="referent-indicateurs-title" className="sr-only">
            Informations clés
          </h2>
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:gap-4 md:grid-cols-4 md:p-6">
            <div className="flex gap-3 rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-slate-100">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Durée</p>
                <p className="text-sm font-semibold text-[#101936]">{p.dureeHeures} h</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-slate-100">
              <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Calendrier</p>
                <p className="text-sm font-semibold text-[#101936]">{joursLabel}</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-slate-100">
              <Coins className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Tarif inter</p>
                <p className="text-sm font-semibold leading-snug text-[#101936]">
                  {formatPrixInterHt(p.prixInterHt)} HT / participant
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-slate-100">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Lieu</p>
                <p className="text-sm font-semibold text-[#101936]">Présentiel · Île-de-France</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Parcours modulable */}
        <section
          aria-labelledby="referent-modulable-title"
          className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5 md:flex md:items-center md:justify-between md:gap-6 md:p-6"
        >
          <div className="flex gap-3 md:max-w-[42%]">
            <Calendar className="h-6 w-6 shrink-0 text-[#1D4ED8]" aria-hidden />
            <div>
              <h2 id="referent-modulable-title" className="font-display text-lg font-semibold text-[#101936]">
                Parcours modulable
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                {p.mentionDisponibilite ?? libelleDisponibilite(p.disponibilite)}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-800 md:mt-0 md:max-w-[52%] md:text-right">
            Vous pouvez dès à présent suivre les modules individuellement, selon vos besoins et votre rythme,
            sous réserve des prérequis et du positionnement.
          </p>
        </section>

        {/* Section 4 — Compétences développées */}
        <section aria-labelledby="referent-competences-title">
          <h2 id="referent-competences-title" className="ofc-type-h2 text-[#101936]">
            Les compétences développées
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: FileText,
                titre: 'Analyser les appels d’offres',
                texte: 'Structurer l’analyse DCE et les usages IA pour répondre aux marchés.',
              },
              {
                icon: Layers,
                titre: 'Créer des outils métier avec l’IA',
                texte: 'Prototyper et documenter un usage IA adapté à votre entreprise BTP.',
              },
              {
                icon: BarChart3,
                titre: 'Piloter les usages de l’IA',
                texte: 'Encadrer le déploiement : règles, validation humaine et feuille de route.',
              },
            ].map((card) => (
              <div
                key={card.titre}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-50"
              >
                <span className="hidden w-px shrink-0 bg-[#377CF3]/50 sm:block" aria-hidden />
                <div>
                  <card.icon className="h-8 w-8 text-[#377CF3]" aria-hidden />
                  <h3 className="mt-3 font-display text-lg font-semibold text-[#101936]">{card.titre}</h3>
                  <p className="mt-2 text-sm text-slate-600">{card.texte}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="mt-10 font-display text-xl font-semibold text-[#101936]">Détail des compétences et cas pratiques</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
            {p.competencesVisees.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        {/* Section 5 — Les quatre modules */}
        <section aria-labelledby="referent-modules-title">
          <h2 id="referent-modules-title" className="ofc-type-h2 text-[#101936]">
            Votre parcours en 4 modules
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-600">
            Chaque bloc correspond à un module du catalogue : vous pouvez suivre le parcours complet ou ne retenir
            que certains modules — sous réserve des prérequis. Un cas pratique commun relie les étapes lorsque vous
            suivez le parcours entier ; les journées peuvent être espacées.
          </p>
          <div className="mt-6">
            <ParcoursChoixModulesRdvCta />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {p.etapes.map((etape, index) => {
              const mod = getModuleByCode(etape.moduleCode);
              const duree = etape.dureeHeuresOverride ?? mod?.dureeHeures ?? 0;
              const iaUsage = getModule2027IaUsage(etape.moduleCode);
              const illustration = MODULE_ILLUSTRATIONS[etape.moduleCode] ?? `${IMG_BASE}/08-assistant-ia-btp-interface.webp`;
              const moduleTitleId = `referent-module-${etape.moduleCode}-${index}`;
              const ficheHref =
                mod?.href ??
                catalogueDemandeHref({
                  formationOuParcours: `${etape.moduleCode} — ${mod?.titre ?? ''}`,
                  nature: 'choix-formation',
                });

              return (
                <article
                  key={`${etape.moduleCode}-${index}`}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100 sm:flex-row"
                  aria-labelledby={moduleTitleId}
                >
                  <div className="relative aspect-[16/11] w-full shrink-0 sm:aspect-auto sm:h-auto sm:w-44 md:w-52">
                    <Image
                      src={illustration}
                      alt={`Illustration thématique pour le module ${etape.moduleCode} — usage pédagogique`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 208px"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col p-4 md:p-5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                        {String(index + 1).padStart(2, '0')} — {etape.moduleCode} · {duree} h
                      </p>
                      <Link
                        href={ficheHref}
                        className="shrink-0 rounded-lg p-1 text-[#377CF3] ring-offset-2 hover:bg-slate-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3]"
                        aria-label={`Voir la fiche du module ${mod?.titre ?? etape.moduleCode}`}
                      >
                        <ArrowUpRight className="h-5 w-5" aria-hidden />
                      </Link>
                    </div>
                    <h3 id={moduleTitleId} className="mt-2 font-display text-lg font-semibold text-[#101936]">
                      {mod?.titre ?? etape.moduleCode}
                    </h3>
                    {mod ? (
                      <p className="mt-2 text-sm text-slate-600">
                        <span className="font-medium text-[#101936]">Objectifs pédagogiques — </span>
                        {mod.objectifPrincipal}
                      </p>
                    ) : null}
                    <dl className="mt-3 space-y-2 text-sm text-slate-600">
                      <div>
                        <dt className="font-medium text-[#101936]">Compétences développées (étape)</dt>
                        <dd>{etape.competence}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-[#101936]">Exercice professionnel (étape)</dt>
                        <dd>{etape.exercice}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-[#101936]">Livrable (étape)</dt>
                        <dd>{etape.livrable}</dd>
                      </div>
                    </dl>
                    {iaUsage ? (
                      <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm">
                        <p className="font-medium text-[#101936]">
                          Usage IA ({labelOutil(iaUsage.outil)})
                        </p>
                        <p className="mt-1 text-slate-600">{iaUsage.tacheIa}</p>
                        <p className="mt-2 text-slate-600">
                          <span className="font-medium text-[#101936]">Contrôle humain : </span>
                          {iaUsage.controlesHumains}
                        </p>
                        <p className="mt-1 text-slate-600">
                          <span className="font-medium text-[#101936]">Évaluation : </span>
                          {iaUsage.critereEvaluation}
                        </p>
                      </div>
                    ) : null}
                    <p className="mt-2 text-xs text-slate-500">
                      Chaque module peut être suivi indépendamment, sous réserve des prérequis du module
                      {mod?.prerequis ? ` (${mod.prerequis})` : ''} et du positionnement du parcours.
                    </p>
                    <div className="mt-4">
                      <Link
                        href={ficheHref}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#377CF3] underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#377CF3] focus-visible:ring-offset-2"
                      >
                        Voir la fiche module
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 6 — Pédagogie */}
        <section aria-labelledby="referent-pedagogie-title">
          <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,320px)] lg:items-start">
            <div>
              <h2 id="referent-pedagogie-title" className="ofc-type-h2 text-[#101936]">
                Une pédagogie ancrée dans le terrain
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: HardHat,
                    titre: 'Cas réels BTP',
                    texte: 'Mises en situation et exercices sur documents métier anonymisés.',
                  },
                  {
                    icon: Layers,
                    titre: 'Livrables réutilisables',
                    texte: 'Modèles et méthodes que vous réinvestissez après la formation.',
                  },
                  {
                    icon: Shield,
                    titre: 'Confidentialité et contrôle humain',
                    texte: 'Validation humaine systématique des contenus sensibles ou contractuels.',
                  },
                ].map((item) => (
                  <div key={item.titre} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
                    <item.icon className="h-7 w-7 text-[#377CF3]" aria-hidden />
                    <h3 className="mt-3 font-display text-base font-semibold text-[#101936]">{item.titre}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.texte}</p>
                  </div>
                ))}
              </div>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={`${IMG_BASE}/06-pedagogie-formation-ia-btp.webp`}
                  alt="Animation de formation en salle sur l’IA appliquée au BTP — visuel d’illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 320px"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </section>

        {/* Section 7 — CTA */}
        <section
          aria-labelledby="referent-cta-parcours-title"
          className="rounded-2xl bg-[#101936] px-6 py-10 text-white md:px-10 md:py-12"
        >
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <Building2 className="h-10 w-10 shrink-0 text-white/90" aria-hidden />
              <div>
                <h2 id="referent-cta-parcours-title" className="font-display text-2xl font-bold text-balance md:text-3xl">
                  Construisons votre parcours IA BTP
                </h2>
                <p className="mt-3 max-w-xl text-sm text-white/80 md:text-base">
                  Un parcours modulable et opérationnel, pensé pour les entreprises du BTP en Île-de-France.
                </p>
              </div>
            </div>
            <CtaDevis
              href={devisHref}
              className={`${OFC_CTA_ON_ACCENT} inline-flex min-h-11 shrink-0 items-center justify-center px-6 py-3 text-base focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#101936]`}
            />
          </div>
        </section>

        {/* Section 8 — Prérequis et organisation */}
        <section aria-labelledby="referent-prerequis-title">
          <h2 id="referent-prerequis-title" className="ofc-type-h2 text-[#101936]">
            Prérequis et organisation
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
            <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={`${IMG_BASE}/07-collaboration-chantier-ia-btp.webp`}
                  alt="Collaboration sur chantier autour d’une tablette — visuel d’illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </figure>
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-[#101936]">
                  <FileText className="h-5 w-5 text-[#377CF3]" aria-hidden />
                  Prérequis et positionnement
                </h3>
                <p className="mt-3 text-sm text-slate-600">{p.prerequis}</p>
                <p className="mt-2 text-sm text-slate-600">
                  Un positionnement permet d’ajuster le parcours. L’évaluation des acquis est intégrée à la durée
                  annoncée.
                </p>
                {p.varianteOptionnelle ? (
                  <p className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">
                    {p.varianteOptionnelle.label} : {p.varianteOptionnelle.dureeHeures} h —{' '}
                    {formatPrixInterHt(p.varianteOptionnelle.prixInterHt)} / participant. Ce retrait n’est pas
                    automatique.
                  </p>
                ) : null}
                {p.initiationComplementaire ? (
                  <p className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">
                    {p.initiationComplementaire.label} : {p.initiationComplementaire.dureeHeures} h —{' '}
                    {formatPrixInterHt(p.initiationComplementaire.prixInterHt)} / participant.
                  </p>
                ) : null}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-[#101936]">
                  <Calendar className="h-5 w-5 text-[#377CF3]" aria-hidden />
                  Organisation
                </h3>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  <li>
                    {p.dureeHeures} h — {joursLabel}
                  </li>
                  <li>Présentiel en Île-de-France</li>
                  <li>Disponibilité : {p.mentionDisponibilite ?? libelleDisponibilite(p.disponibilite)}</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-[#101936]">
                  <Users className="h-5 w-5 text-[#377CF3]" aria-hidden />
                  Public concerné
                </h3>
                <p className="mt-3 text-sm text-slate-600">{p.publicCible}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sections existantes (contenu inchangé) */}
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

        <figure className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={`${IMG_BASE}/08-assistant-ia-btp-interface.webp`}
              alt="Interface stylisée d’assistants IA pour tâches BTP (DCE, compte rendu, prévention, dossier) — visuel d’illustration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              loading="lazy"
            />
          </div>
          <figcaption className="border-t border-slate-100 bg-white px-3 py-2 text-center text-xs text-slate-500">
            Représentation illustrative — pas une capture d’outil commercial.
          </figcaption>
        </figure>

        <FormationsContact2027 formationHint={`Parcours ${p.titre}`} initialObjet="devis" />
      </div>

      <FormateursMetierSection metierId={p.metierId} />

      <div className="mx-auto mt-16 max-w-[80rem] space-y-12 px-4 sm:px-6 lg:px-8">
        {maillageBlocks.map((block) => (
          <PageMaillageSection key={block.id} {...block} tone="white" className="!px-0" />
        ))}
      </div>

      {/* CTA mobile sticky — max 2 boutons conversion (charte) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[80rem] gap-2">
          <Link
            href={programmeHref}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm`}
          >
            Demander le programme
          </Link>
          <Link
            href={adaptHref}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 flex-1 items-center justify-center px-3 py-2 text-sm`}
          >
            Adapter
          </Link>
        </div>
      </div>
    </div>
  );
}
