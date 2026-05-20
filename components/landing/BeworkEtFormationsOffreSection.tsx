'use client';

import Link from 'next/link';
import { Building2, GraduationCap, ArrowUpRight, Check } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { RdvLink } from '@/components/RdvLink';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_SESSION_AVANCE_HT,
  TARIF_SESSION_DEBUTANT_HT,
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
} from '@/lib/tarifs-sessions';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { SITE_CONFIG, siteHasPublicPhone } from '@/lib/seo';

const BEWORK_PILOTES = [
  'Comptes rendus de chantier',
  'Analyse de DCE',
  'PPSPS',
  'Mémoire technique',
  'Chiffrage de devis',
  'Dossiers travaux',
  'Relances et suivi administratif',
] as const;

const CONCRET = [
  "Devis et chiffrage : description technique d’un poste en quelques minutes au lieu de près d’une heure en routine non structurée",
  'Appels d’offres : analyse DCE cadrée et rédaction de mémoires techniques assistée par IA — relecture métier indispensable',
  'Documents chantier : DOE, PV de réception, comptes rendus à partir de notes ou dictée — validation et signatures restent vos',
  'Visibilité locale : avant/après chantier, publications pro pour réseaux sociaux',
  'Assistants IA sur mesure : méthodes et prompts adaptés à vos process, documents et métiers',
] as const;

const POURQUOI = [
  `+ ${formatProfessionalsTrainedCount()} professionnels du BTP formés`,
  `${SOCIAL_PROOF.AVERAGE_RATING} de satisfaction en fin de formation`,
  'Plus de 10 ans de terrain (conductrice de travaux, dirigeante BTP)',
  'Organisme certifié Qualiopi — actions de formation déclarées',
  'Interventions et références : FFB Grand Paris, FFB Île-de-France, CSFE, CAPEB',
  'Instructrice LinkedIn Learning (parcours IA appliqués au BTP)',
] as const;

const POUR_QUI = [
  'Dirigeants de PME et ETI du BTP',
  'Chargés d’affaires, conducteurs de travaux, bureaux d’études',
  'Fonctions support : administratif, RH, communication',
  'Fédérations, OPCO et organismes du secteur BTP',
] as const;

/**
 * Accueil : pose la perte de temps admin, deux voies (BeWork vs formations OFC),
 * preuves et contact — tarifs alignés sur `lib/tarifs-sessions.ts`.
 */
export function BeworkEtFormationsOffreSection() {
  const telHref = siteHasPublicPhone()
    ? `tel:${String(SITE_CONFIG.phone).replace(/\s/g, '')}`
    : null;

  return (
    <section
      id="offre-bework-formations"
      aria-labelledby="offre-bework-formations-title"
      className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-12 md:space-y-14">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="offre-bework-formations-title"
            className="font-display text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-3xl lg:text-[2rem]"
          >
            Vous perdez 5 à 10 heures par semaine sur vos devis, appels d&apos;offres et tâches administratives&nbsp;?
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#5A5A5A] md:text-base">
            En pratique, la charge bureau retient souvent terrain et chantier&nbsp;: relances oubliées, dossiers AO lourds,
            pièces qui s&apos;accumulent. Ce n&apos;est pas un problème de volonté — c&apos;est un problème de bande passante.
          </p>
          <p className="mt-4 text-[15px] font-medium leading-relaxed text-[#1A1A1A] md:text-base">
            Deux directions possibles selon votre temps et votre priorité&nbsp;:{' '}
            <strong>déléguer le relais administratif avec BeWork</strong>, ou{' '}
            <strong>monter en compétence avec des formations IA BTP certifiées Qualiopi</strong>, éligibles à un financement auprès de
            votre OPCO (dont Constructys) lorsque les conditions sont remplies.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* BeWork */}
          <article className="flex flex-col rounded-xl border border-slate-200/90 bg-white p-6 shadow-[0_4px_16px_rgba(55,124,243,0.08)] md:p-8">
            <div className="flex items-start gap-4">
              <div
                className="flex shrink-0 items-center justify-center rounded-xl bg-white p-3 shadow-[0_4px_16px_rgba(55,124,243,0.08)] ring-1 ring-slate-100"
                aria-hidden
              >
                <Building2 className="h-10 w-10 text-[#377CF3]" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5A5A5A]">
                  Assistant de gestion travaux · Relais BTP
                </p>
                <p className="mt-1 text-sm font-medium text-[#377CF3]">
                  Boosté à l&apos;IA · note chantier
                </p>
                <h3 className="mt-4 border-b border-[#377CF3]/35 pb-2 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
                  BeWork — l&apos;assistant travaux
                </h3>
              </div>
            </div>
            <p className="mt-4 text-lg font-semibold leading-snug text-[#1A1A1A]">
              Un assistant travaux à vos côtés pour tenir le rythme du chantier.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#5A5A5A]">
              <span className="font-semibold text-[#334155]">BeWork</span> prend en charge les tâches les plus chronophages
              côté bureau — ce n&apos;est pas une formation&nbsp;: c&apos;est un{' '}
              <strong className="text-[#1A1A1A]">service de relais</strong> distinct des programmes OFC Qualiopi.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-sm text-[#1A1A1A]" aria-label="Missions types BeWork">
              {BEWORK_PILOTES.map((label) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#F2F2F2] bg-[#FAFBFD] px-2.5 py-1 font-medium text-[#334155]"
                >
                  <span className="font-bold text-[#377CF3]" aria-hidden>
                    ·
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base font-semibold italic text-[#1A1A1A]">
              On tient le bureau, vous tenez le chantier.
            </p>
            <div className="mt-6 mt-auto pt-2">
              <ExternalLinkAnchor
                href={EXTERNAL_SITE_URLS.bework}
                title="BeWork — site officiel bework.fr (nouvel onglet)"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9] sm:w-auto"
              >
                Découvrir BeWork sur bework.fr
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
              </ExternalLinkAnchor>
            </div>
          </article>

          {/* Formations OFC */}
          <article className="flex flex-col rounded-xl border border-slate-200/90 bg-white p-6 shadow-[0_4px_16px_rgba(55,124,243,0.08)] md:p-8">
            <div className="flex items-start gap-4">
              <div
                className="flex shrink-0 items-center justify-center rounded-xl bg-[#D4E3FC]/80 p-3 ring-1 ring-[#377CF3]/15"
                aria-hidden
              >
                <GraduationCap className="h-10 w-10 text-[#377CF3]" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#5A5A5A]">
                  OFC · Création d&apos;entreprise · Qualiopi
                </p>
                <h3 className="mt-2 border-b border-[#377CF3]/35 pb-2 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
                  Mes formations IA BTP
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#5A5A5A]">
              Former les dirigeants et équipes de PME BTP à utiliser l&apos;IA générative pour récupérer du temps — sans
              jargon inutile, avec des exercices sur vos vrais documents. Financement entreprise souvent mobilisable via
              votre OPCO (Constructys dans le périmètre BTP lorsque vous êtes éligible au plan de développement des
              compétences ou équivalent).
            </p>
            <div className="mt-6 space-y-6 text-sm leading-relaxed text-[#334155]">
              <div>
                <p className="font-semibold text-[#1A1A1A]">
                  <Link
                    href={LINKS.formationIaBtpNiveau1BatimentTp}
                    className="text-[#377CF3] underline-offset-2 hover:underline"
                  >
                    Niveau 1 — L&apos;IA au service des professionnels du BTP
                  </Link>
                  {` (${SESSION_DUREE_LIBELLE}, forfait ${TARIF_SESSION_DEBUTANT_HT} € HT / session groupe)`}
                </p>
                <p className="mt-1.5">
                  Fondamentaux de l&apos;IA générative appliqués au terrain&nbsp;: devis, documents réglementaires, mails,
                  communication. Démarche opérationnaire et prompts BTP pour repartir autonome.
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A]">
                  <Link href={LINKS.formationAO} className="text-[#377CF3] underline-offset-2 hover:underline">
                    Niveau 2 — IA et appels d&apos;offres (DCE et mémoire technique)
                  </Link>
                  {` (${SESSION_DUREE_LIBELLE}, forfait ${TARIF_SESSION_AVANCE_HT} € HT / session groupe)`}
                </p>
                <p className="mt-1.5">
                  Aller plus loin avec Claude&nbsp;: création de workflows et usages type Skills / Cowork selon vos comptes.{' '}
                  <span className="text-[#5A5A5A]">{EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE}</span>
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A]">Sur mesure</p>
                <p className="mt-1.5">
                  Webinaires, masterclasses et journées fil rouge pour fédérations, réseaux et directions — précisez votre
                  périmètre dans le message lorsque vous prenez le créneau découverte ci-dessous.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <Link
                href={LINKS.formations}
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#377CF3] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#377CF3] hover:bg-[#D4E3FC]/60"
              >
                Catalogue formations
              </Link>
              <Link
                href={LINKS.financement}
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-transparent bg-[#377CF3]/10 px-4 py-2.5 text-center text-sm font-semibold text-[#377CF3] hover:bg-[#D4E3FC]"
              >
                Financement OPCO&nbsp;: modalités Constructys
              </Link>
            </div>
          </article>
        </div>

        <div className="space-y-10 rounded-xl border border-slate-200 bg-white px-6 py-8 shadow-[0_4px_16px_rgba(55,124,243,0.06)] md:px-10 md:py-10">
          <div>
            <h3 className="border-l-4 border-[#377CF3] pl-3 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
              Ce que je fais concrètement
            </h3>
            <ul className="mt-4 space-y-3">
              {CONCRET.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-[#5A5A5A]">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="border-l-4 border-[#377CF3] pl-3 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
                Pourquoi faire appel à Laure Olivié
              </h3>
              <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-[#5A5A5A]">
                {POURQUOI.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="border-l-4 border-[#377CF3] pl-3 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
                Pour qui
              </h3>
              <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-[#5A5A5A]">
                {POUR_QUI.map((line) => (
                  <li key={line}>— {line}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-[#F2F2F2] pt-8">
            <h3 className="border-l-4 border-[#377CF3] pl-3 font-display text-lg font-bold text-[#1A1A1A] md:text-xl">
              Contact
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5A5A5A]">
              Présentiel prioritaire Île-de-France — autres régions&nbsp;: formations possibles aussi en visio selon programme
              et financement tel que défini lors du devis. Écrivez-moi ou prenez rendez-vous découverte.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-[15px] text-[#1A1A1A] sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
                {SITE_CONFIG.email}
              </a>
              {telHref ? (
                <a href={telHref} className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
                  {SITE_CONFIG.phoneDisplay}
                </a>
              ) : null}
              <span className="font-medium text-[#5A5A5A]" title="Ouvert via le bouton « Découvrir BeWork » dans la carte BeWork ci-dessus">
                bework.fr
              </span>
              <span className="font-semibold text-[#334155]">laureolivie.fr</span>
            </div>
            <div className="mt-6">
              <RdvLink
                page="/"
                ctaPosition="middle"
                campaign="home-offre-bework-formations-rdv"
                className="inline-flex items-center justify-center rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9]"
              >
                Prendre un rendez-vous découverte (formations IA BTP)
              </RdvLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
