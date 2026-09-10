import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { EventbriteCtaLink } from '@/components/evenements/EventbriteCtaLink';
import {
  EVENEMENT_AO_BTP,
  isEvenementAoBtpActif,
} from '@/lib/evenements/repondre-appel-offres-btp-5-etapes';
import { CONTACT } from '@/lib/constants';
import {
  buildEvenementAoBtpBreadcrumbJsonLd,
  buildEvenementAoBtpEventJsonLd,
} from '@/lib/schema-event-repondre-ao-btp';
import { buildMetadata, getFAQSchema } from '@/lib/seo';
import {
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_LINK,
  OFC_TYPE_H2,
  OFC_TYPE_HERO,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

const PATH = EVENEMENT_AO_BTP.path;
const event = EVENEMENT_AO_BTP;

const META_TITLE = 'Webinaire appels d’offres BTP – 5 novembre 2026';
const META_DESCRIPTION =
  'Le 5 novembre 2026, de 12 h à 13 h, découvrez les 5 étapes pour répondre à un appel d’offres BTP avec l’IA. Événement en ligne — formation IA pour le BTP.';

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'website',
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
  keywords: [
    'webinaire appels d’offres BTP',
    'répondre à un appel d’offres BTP avec l’IA',
    'méthode appels d’offres BTP',
    'analyse DCE avec l’IA',
    'mémoire technique avec l’IA',
    'événement Laure Olivié',
    'formation IA pour le BTP',
  ],
  image: {
    url: event.image.src,
    width: event.image.width,
    height: event.image.height,
    alt: 'Webinaire appels d’offres BTP : méthode en 5 étapes avec l’IA, Laure Olivié',
  },
  robots: {
    index: true,
    follow: true,
  },
});

const FAQ = [
  {
    q: 'Quand a lieu l’événement ?',
    a: 'Le jeudi 5 novembre 2026, de 12 h à 13 h, heure de Paris.',
  },
  {
    q: 'Où se déroule-t-il ?',
    a: 'En ligne. Consultez les modalités de participation sur Eventbrite.',
  },
  {
    q: 'À qui s’adresse-t-il ?',
    a: 'Aux artisans, dirigeants, conducteurs de travaux, chargés d’affaires et fonctions support du BTP.',
  },
  {
    q: 'Quel est le tarif ?',
    a: event.tarifFaq,
  },
  {
    q: 'Quelle place occupe l’IA ?',
    a: 'L’événement présente son utilisation pour analyser les exigences, préparer les contrôles du chiffrage et structurer un mémoire technique. Les résultats doivent être vérifiés.',
  },
  {
    q: 'Comment réserver ?',
    a: 'Cliquez sur « Je réserve ma place sur Eventbrite » et finalisez votre inscription sur la plateforme.',
  },
] as const;

const faqSchema = getFAQSchema(FAQ);
const eventJsonLd = buildEvenementAoBtpEventJsonLd();
const breadcrumbJsonLd = buildEvenementAoBtpBreadcrumbJsonLd();

export default function EvenementRepondreAoBtpPage() {
  const actif = isEvenementAoBtpActif();

  return (
    <div>
      <JsonLd id="schema-evenement-ao-btp-event" data={eventJsonLd} />
      <JsonLd id="schema-evenement-ao-btp-breadcrumb" data={breadcrumbJsonLd} />
      {faqSchema ? <JsonLd id="schema-evenement-ao-btp-faq" data={faqSchema} /> : null}

      {/* Hero */}
      <section className={`${OFC_SEC.hero} text-slate-900`} aria-labelledby="evenement-ao-h1">
        <div className={OFC_SECTION_INNER}>
          <p className="inline-flex rounded-md bg-[#377CF3]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
            {actif ? event.badge : 'Événement terminé'}
          </p>
          <h1 id="evenement-ao-h1" className={`${OFC_TYPE_HERO} mt-4 max-w-3xl`}>
            {event.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 md:text-lg">
            {event.intro}
          </p>

          <dl className="mt-8 grid gap-3 text-sm text-slate-800 sm:grid-cols-2 md:max-w-2xl">
            <div>
              <dt className="font-semibold text-slate-500">Date</dt>
              <dd>{event.dateLabel}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Horaires</dt>
              <dd>{event.timeLabel}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Format</dt>
              <dd>{event.formatLabel}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Animé par</dt>
              <dd>{event.host}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-slate-500">Tarif</dt>
              <dd>{event.tarifLibelle}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {actif ? (
              <>
                <EventbriteCtaLink
                  origin="evenement-ao-btp-hero"
                  className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
                />
                <a
                  href="#programme"
                  className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
                >
                  {event.ctaSecondary}
                </a>
              </>
            ) : (
              <Link
                href={event.related.formationAo}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
              >
                Découvrir la formation appels d’offres
              </Link>
            )}
          </div>
          {actif ? (
            <p className="mt-3 text-sm text-slate-600">{event.inscriptionMention}</p>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              Cet événement en ligne est terminé. La formation catalogue reste disponible en
              présentiel en Île-de-France.
            </p>
          )}
        </div>
      </section>

      {/* Résumé GEO */}
      <section className={`${OFC_SEC.whiteCompact}`} aria-labelledby="resume-geo">
        <div className={OFC_SECTION_INNER}>
          <h2 id="resume-geo" className={OFC_TYPE_H2}>
            En résumé
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">{event.geoSummary}</p>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className={`${OFC_SEC.muted}`} aria-labelledby="infos-pratiques">
        <div className={OFC_SECTION_INNER}>
          <h2 id="infos-pratiques" className={OFC_TYPE_H2}>
            Informations pratiques
          </h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="text-sm font-semibold text-slate-500">Date</dt>
              <dd className="mt-1 text-base text-slate-900">{event.dateLabel}</dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="text-sm font-semibold text-slate-500">Horaires</dt>
              <dd className="mt-1 text-base text-slate-900">{event.timeLabel}</dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="text-sm font-semibold text-slate-500">Format</dt>
              <dd className="mt-1 text-base text-slate-900">
                {event.formatLabel} · {event.durationLabel}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="text-sm font-semibold text-slate-500">Intervenante</dt>
              <dd className="mt-1 text-base text-slate-900">
                {event.host}, {event.hostRole}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
              <dt className="text-sm font-semibold text-slate-500">Tarif</dt>
              <dd className="mt-1 text-base text-slate-900">{event.tarifLibelle}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Pour qui */}
      <section className={`${OFC_SEC.white}`} aria-labelledby="pour-qui">
        <div className={OFC_SECTION_INNER}>
          <h2 id="pour-qui" className={OFC_TYPE_H2}>
            Pour qui ?
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">{event.pourQui}</p>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className={`${OFC_SEC.mutedMesh}`} aria-labelledby="programme-titre">
        <div className={OFC_SECTION_INNER}>
          <h2 id="programme-titre" className={OFC_TYPE_H2}>
            Le programme en 5 étapes
          </h2>
          <p className="mt-2 max-w-2xl text-base text-slate-700">
            Une méthode pour structurer votre réponse. Aucune promesse de remporter un marché ni de
            produire un dossier complet en une heure.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {event.etapes.map((etape, index) => (
              <li
                key={etape.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                  Étape {index + 1}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-slate-900">
                  {etape.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{etape.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ressources */}
      <section className={`${OFC_SEC.white}`} aria-labelledby="ressources-annoncees">
        <div className={OFC_SECTION_INNER}>
          <h2 id="ressources-annoncees" className={OFC_TYPE_H2}>
            Les ressources annoncées
          </h2>
          <ul className="mt-5 max-w-2xl list-disc space-y-2 pl-5 text-base text-slate-800">
            {event.ressources.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 max-w-2xl text-sm text-slate-600">
            Le{' '}
            <Link href={event.related.guide} className={OFC_LINK}>
              guide répondre à un appel d’offres BTP
            </Link>{' '}
            complète cette session. Bonus annoncé pour les inscrits : la{' '}
            <Link href={event.related.bibliothequePrompts} className={OFC_LINK}>
              bibliothèque de prompts BTP par métier
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Formatrice */}
      <section className={`${OFC_SEC.muted}`} aria-labelledby="formatrice">
        <div className={`${OFC_SECTION_INNER} grid gap-8 md:grid-cols-[auto_1fr] md:items-center`}>
          <Image
            src={event.portrait.src}
            alt="Laure Olivié, formatrice IA pour le BTP, webinaire appels d’offres"
            width={event.portrait.width}
            height={event.portrait.height}
            className="h-40 w-40 rounded-full object-cover ring-4 ring-white shadow-md md:h-48 md:w-48"
            title={event.portrait.title}
          />
          <div>
            <h2 id="formatrice" className={OFC_TYPE_H2}>
              Votre formatrice
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-700">
              {event.formatrice}
            </p>
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link href={event.related.formateur} className={OFC_LINK}>
                Présentation formateur IA BTP
              </Link>
              <Link href={event.related.aPropos} className={OFC_LINK}>
                À propos de Laure Olivié
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${OFC_SEC.white}`} aria-labelledby="faq-evenement">
        <div className={OFC_SECTION_INNER}>
          <h2 id="faq-evenement" className={OFC_TYPE_H2}>
            Questions fréquentes
          </h2>
          <dl className="mt-6 max-w-3xl space-y-5">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-slate-200 pb-5">
                <dt className="font-display text-lg font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-base leading-relaxed text-slate-700">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA final */}
      <section className={`${OFC_SEC.accent}`} aria-labelledby="cta-final">
        <div className={OFC_SECTION_INNER}>
          <h2 id="cta-final" className={`${OFC_TYPE_H2} text-white`}>
            {actif ? 'Réservez votre place' : 'Événement terminé'}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-white/90">
            {event.dateLabel} · {event.timeLabel} · {event.formatLabel}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {actif ? (
              <EventbriteCtaLink
                origin="evenement-ao-btp-final"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] transition hover:bg-slate-100"
              />
            ) : (
              <Link
                href={event.related.formationAo}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] transition hover:bg-slate-100"
              >
                Découvrir la formation appels d’offres
              </Link>
            )}
          </div>
          <p className="mt-4 text-sm text-white/80">
            Contact :{' '}
            <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-2">
              {CONTACT.email}
            </a>
            {' · '}
            <a href={`tel:${CONTACT.phone}`} className="underline underline-offset-2">
              {CONTACT.phoneDisplay}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
