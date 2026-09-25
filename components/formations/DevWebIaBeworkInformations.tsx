import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { BEWORK_PARCOURS_LIST } from '@/lib/bework-programmes';
import {
  BEWORK_CLOSING_LINE,
  BEWORK_COMPETENCES_REPARTIE,
  BEWORK_FAQ,
  BEWORK_HERO_PILLARS,
  BEWORK_IA_ETAPES,
  BEWORK_JOUR1_FLOW,
  BEWORK_JOUR2_FLOW,
  BEWORK_JOURNEE_PRATIQUE,
  BEWORK_METIERS_IDEES,
  BEWORK_PROJECT_EXAMPLES,
} from '@/lib/bework-formation-marketing';
import {
  BEWORK_HERO_INTRO,
  BEWORK_LOGO,
  BEWORK_SUBTAGLINE,
  BEWORK_TAGLINE,
} from '@/lib/bework-brand';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_BEWORK_DISTINCTION } from '@/config/qualiopi';
import { formatTarifHt } from '@/lib/tarifs-sessions';
import {
  OFC_CTA_SECONDARY,
  OFC_EYEBROW,
  OFC_LINK,
  OFC_TYPE_H2,
  OFC_TYPE_H3,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

/** Bloc BeWork — contenu aligné bework.fr, charte sections OFC (fiche NIV-10). */
export function DevWebIaBeworkInformations() {
  return (
    <>
      <section className={OFC_SEC.mutedMesh} aria-labelledby="bework-marque-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <ExternalLinkAnchor
                href={EXTERNAL_SITE_URLS.bework}
                title="BeWork — site officiel (nouvel onglet)"
                className="inline-block rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-sm transition hover:border-[#1D4ED8]/30"
              >
                <Image
                  src={BEWORK_LOGO.src}
                  alt={BEWORK_LOGO.alt}
                  width={BEWORK_LOGO.width}
                  height={BEWORK_LOGO.height}
                  className="h-10 w-auto max-w-[min(100%,220px)] object-contain object-left md:h-12"
                />
              </ExternalLinkAnchor>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#1D4ED8]">
                {BEWORK_SUBTAGLINE}
              </p>
              <h2 id="bework-marque-title" className={`${OFC_TYPE_H2} mt-3`}>
                {BEWORK_TAGLINE}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
                {BEWORK_HERO_INTRO}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ofc-ink-muted">
                <li>
                  <strong className="font-semibold text-ofc-ink">1 journée (7 h)</strong> — apprendre à
                  commencer et lancer un premier projet.
                </li>
                <li>
                  <strong className="font-semibold text-ofc-ink">2 journées (14 h)</strong> — approfondir
                  et construire plus loin.
                </li>
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ofc-ink-muted">{QUALIOPI_BEWORK_DISTINCTION}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ExternalLinkAnchor
                  href={EXTERNAL_SITE_URLS.beworkParticiper}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e40af]"
                >
                  S&apos;inscrire sur bework.fr
                  <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                </ExternalLinkAnchor>
                <ExternalLinkAnchor
                  href={EXTERNAL_SITE_URLS.beworkFormation}
                  className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center gap-2 px-5 py-3`}
                >
                  Voir le détail sur bework.fr
                </ExternalLinkAnchor>
              </div>
            </div>
            <ul className="grid w-full max-w-md gap-3 sm:grid-cols-1 lg:shrink-0">
              {BEWORK_HERO_PILLARS.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,0.04)]"
                >
                  <p className="font-display text-base font-bold text-ofc-ink">{item.title}</p>
                  <p className="mt-1 text-sm text-ofc-ink-muted">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={OFC_SEC.white} aria-labelledby="bework-exemples-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <p className={OFC_EYEBROW}>Pendant la formation</p>
          <h2 id="bework-exemples-title" className={`${OFC_TYPE_H2} mt-2`}>
            Ce que vous pourrez créer
          </h2>
          <p className="mt-3 max-w-2xl text-base text-ofc-ink-muted">
            Des projets utiles et concrets, guidés pas à pas — interfaces et données présentées à titre
            illustratif.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BEWORK_PROJECT_EXAMPLES.map((demo) => (
              <li
                key={demo.title}
                className="rounded-2xl border border-slate-200/80 bg-[#F2F2F2]/60 p-5"
              >
                <h3 className={OFC_TYPE_H3}>{demo.title}</h3>
                <p className="mt-2 text-sm text-ofc-ink-muted">{demo.desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base font-semibold text-ofc-ink">
            Et si l&apos;outil qui manque à votre métier était celui que vous alliez créer ?
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {BEWORK_METIERS_IDEES.map((metier) => (
              <li
                key={metier}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-ofc-ink"
              >
                {metier}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={OFC_SEC.mutedCompact} aria-labelledby="bework-ia-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="bework-ia-title" className={OFC_TYPE_H2}>
            Les bonnes intelligences, au bon moment
          </h2>
          <p className="mt-3 max-w-3xl text-base text-ofc-ink-muted">
            Chaque étape mobilise une expertise différente : concevoir, structurer, créer, vérifier et
            améliorer — sans transformer la formation en cours technique.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {BEWORK_IA_ETAPES.map((ia) => (
              <li
                key={ia.step}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1D4ED8]">
                  {ia.step}
                </p>
                <h3 className={`${OFC_TYPE_H3} mt-2`}>{ia.title}</h3>
                <p className="mt-2 text-sm text-ofc-ink-muted">{ia.desc}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {ia.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-[#1D4ED8]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={OFC_SEC.white} aria-labelledby="bework-journee-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="bework-journee-title" className={OFC_TYPE_H2}>
            Pas une journée à écouter. Une journée à créer.
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {BEWORK_JOURNEE_PRATIQUE.map((item) => (
              <li key={item.title} className="flex gap-3 rounded-xl border border-slate-200/80 p-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                <div>
                  <p className="font-semibold text-ofc-ink">{item.title}</p>
                  <p className="mt-1 text-sm text-ofc-ink-muted">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-[#F2F2F2]/50 p-6">
              <h3 className={OFC_TYPE_H3}>Jour 1 · Commencer</h3>
              <p className="mt-4 text-sm font-medium text-ofc-ink">
                {BEWORK_JOUR1_FLOW.join(' → ')}
              </p>
            </div>
            <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF]/50 p-6">
              <h3 className={OFC_TYPE_H3}>Jour 2 · Construire plus loin</h3>
              <p className="mt-4 text-sm font-medium text-ofc-ink">
                {BEWORK_JOUR2_FLOW.join(' → ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={OFC_SEC.mutedMesh} aria-labelledby="bework-competences-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="bework-competences-title" className={OFC_TYPE_H2}>
            Vous ne repartirez pas développeur. Vous repartirez avec les bases pour commencer.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-ofc-ink-muted">
            Une journée ne fait pas de vous un expert technique : repères, méthode et bons réflexes pour
            transformer une idée en premier projet.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BEWORK_COMPETENCES_REPARTIE.map((item, index) => (
              <li
                key={item.title}
                className="rounded-2xl border border-slate-200/90 bg-white p-5"
              >
                <p className="text-xs font-bold text-[#377CF3]">{String(index + 1).padStart(2, '0')}</p>
                <h3 className={`${OFC_TYPE_H3} mt-1`}>{item.title}</h3>
                <p className="mt-2 text-sm text-ofc-ink-muted">{item.desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-display text-lg font-bold text-ofc-ink">
            Vous n&apos;apprenez pas à tout savoir. Vous apprenez à savoir commencer.
          </p>
        </div>
      </section>

      <section className={OFC_SEC.white} aria-labelledby="bework-tarifs-title">
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="bework-tarifs-title" className={OFC_TYPE_H2}>
            Un même point de départ. À vous de choisir jusqu&apos;où aller.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-ofc-ink-muted">
            Commencez tous par la même première journée, puis poursuivez si vous souhaitez approfondir.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {BEWORK_PARCOURS_LIST.map((parcours) => (
              <article
                key={parcours.id}
                className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
                  {parcours.joursLabel} · {parcours.dureeLabel}
                </p>
                <h3 className={`${OFC_TYPE_H3} mt-2`}>
                  {parcours.id === '7h' ? 'Apprendre à commencer' : 'Construire plus loin'}
                </h3>
                <p className="mt-3 font-display text-2xl font-bold text-ofc-ink">
                  {formatTarifHt(parcours.tarifHt)} € HT
                  <span className="ml-1 text-base font-semibold text-ofc-ink-muted">/ participant</span>
                </p>
                <p className="mt-1 text-sm text-ofc-ink-muted">{parcours.effectif}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {parcours.highlights.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-ofc-ink-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold text-ofc-ink">{parcours.outcome}</p>
                <Link
                  href={parcours.pdfHref}
                  download={parcours.pdfDownloadName}
                  className={`${OFC_LINK} mt-4 inline-flex text-sm font-semibold`}
                >
                  Télécharger le programme BeWork ({parcours.dureeLabel}) PDF
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-ofc-ink-muted">
            Commencez par la première journée à 300 € HT. Pour prolonger, ajoutez le deuxième jour (300 € HT
            supplémentaires). Financement OPCO possible selon éligibilité.
          </p>
        </div>
      </section>

      <section className={OFC_SEC.mutedCompact} aria-labelledby="bework-modalites-title">
        <div className={`${OFC_SECTION_INNER} max-w-4xl`}>
          <h2 id="bework-modalites-title" className={OFC_TYPE_H2}>
            Modalités de participation
          </h2>
          <p className="mt-3 text-base text-ofc-ink-muted">
            Présentiel uniquement · Île-de-France · inter ou intra sur devis.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            <li className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className={OFC_TYPE_H3}>Inter-entreprises</h3>
              <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">Sessions programmées en petit groupe, présentiel en Île-de-France.</p>
            </li>
            <li className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className={OFC_TYPE_H3}>Intra-entreprise</h3>
              <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">Session dédiée sur devis, dans vos locaux en Île-de-France.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className={OFC_SEC.soft} aria-labelledby="bework-faq-title">
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="bework-faq-title" className={OFC_TYPE_H2}>
            Questions fréquentes — parcours BeWork
          </h2>
          <dl className="mt-8 space-y-6">
            {BEWORK_FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-ofc-ink">{item.q}</dt>
                <dd className="mt-2 text-base leading-relaxed text-ofc-ink-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6">
            <ExternalLinkAnchor href={EXTERNAL_SITE_URLS.beworkFaq} className={OFC_LINK}>
              Voir toute la FAQ sur bework.fr
            </ExternalLinkAnchor>
          </p>
        </div>
      </section>

      <section className={OFC_SEC.heroWhite} aria-labelledby="bework-cta-title">
        <div className={`${OFC_SECTION_INNER} max-w-3xl text-center`}>
          <ExternalLinkAnchor
            href={EXTERNAL_SITE_URLS.bework}
            title="BeWork — site officiel"
            aria-label="BeWork — site officiel bework.fr"
            className="mx-auto inline-block"
          >
            <Image
              src={BEWORK_LOGO.src}
              alt=""
              width={BEWORK_LOGO.width}
              height={BEWORK_LOGO.height}
              aria-hidden
              className="mx-auto h-9 w-auto max-w-[200px] object-contain opacity-95"
            />
          </ExternalLinkAnchor>
          <h2 id="bework-cta-title" className={`${OFC_TYPE_H2} mt-6`}>
            {BEWORK_CLOSING_LINE}
          </h2>
          <p className="mt-4 text-base text-ofc-ink-muted">
            Choisissez le parcours qui vous correspond aujourd&apos;hui. Vous pourrez toujours décider
            d&apos;aller plus loin ensuite.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ExternalLinkAnchor
              href={EXTERNAL_SITE_URLS.beworkParticiper}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1e40af]"
            >
              Demander une place
              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
            </ExternalLinkAnchor>
            <Link href={LINKS.contact} className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 px-6 py-3`}>
              Contacter OFC (devis / intra)
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
