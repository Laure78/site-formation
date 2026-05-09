import Link from 'next/link';
import Image from 'next/image';
import { Download, ChevronRight, ArrowRight, Phone, Mail } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { CopyPromptButton } from '@/components/CopyPromptButton';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { SITE_CONFIG } from '@/lib/seo';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import type { TutoBlock, TutoData, TutoStep } from '@/lib/tutos/types';
import { computeHeroLearnAnchorIds } from '@/lib/tutos/hero-anchors';

const SITE_BASE = SITE_CONFIG.url.replace(/\/$/, '');

function pdfUrlFor(tuto: TutoData): string {
  return `/ressources/pdf/${tuto.pdfFile}`;
}

function pageUrlFor(tuto: TutoData): string {
  return `${SITE_BASE}/ressources/${tuto.slug}`;
}

/** Bloc générique — paragraphe, liste, sous-titre, callout, prompt, etc. */
function Block({ block }: { block: TutoBlock }) {
  switch (block.kind) {
    case 'paragraph':
      return <p className="mt-4 text-slate-700 leading-relaxed">{block.text}</p>;
    case 'h3':
      return (
        <h3 className="mt-8 font-display text-lg font-semibold text-slate-900 md:text-xl">
          {block.text}
        </h3>
      );
    case 'list':
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((it, idx) => (
            <li key={idx} className="flex gap-3 text-slate-700 leading-relaxed">
              <ChevronRight
                size={18}
                className="mt-1 shrink-0 text-[#377CF3]"
                strokeWidth={2.5}
                aria-hidden
              />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case 'numberedList':
      return (
        <ol className="mt-4 space-y-2 list-decimal pl-5 marker:font-semibold marker:text-[#377CF3]">
          {block.items.map((it, idx) => (
            <li key={idx} className="text-slate-700 leading-relaxed pl-1">
              {it}
            </li>
          ))}
        </ol>
      );
    case 'callout':
      return (
        <aside className="mt-6 rounded-xl border-l-4 border-[#377CF3] bg-[#F2F2F2] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
            {block.title}
          </p>
          <p className="mt-2 text-slate-800 leading-relaxed">{block.body}</p>
        </aside>
      );
    case 'highlight':
      return (
        <p className="mt-6 font-display text-lg font-bold text-[#377CF3] md:text-xl">
          {block.text}
        </p>
      );
    case 'prompt': {
      return (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
              {block.title}
            </p>
            <CopyPromptButton text={block.text} />
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-5 font-mono text-[0.85rem] leading-relaxed text-slate-800">
            {block.text}
          </pre>
        </div>
      );
    }
    default:
      return null;
  }
}

function StepBlock({ step }: { step: TutoStep }) {
  return (
    <article id={`etape-${step.number}`} className="mt-12 scroll-mt-28">
      <div className="flex items-stretch overflow-hidden rounded-2xl bg-[#377CF3] text-white shadow-md">
        <div className="flex w-20 shrink-0 items-center justify-center bg-white/10 sm:w-24">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl font-bold text-[#377CF3] sm:h-16 sm:w-16 sm:text-3xl">
            {step.number}
          </div>
        </div>
        <div className="flex-1 px-5 py-5 sm:px-7 sm:py-6">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/80">
            {step.eyebrow}
          </p>
          <h2 className="mt-1 font-display text-xl font-bold leading-tight md:text-2xl">
            {step.title}
          </h2>
        </div>
      </div>
      <div className="mt-6 px-1">
        {step.intro ? (
          <p className="text-slate-700 leading-relaxed">{step.intro}</p>
        ) : null}
        {step.blocks.map((b, idx) => (
          <Block key={idx} block={b} />
        ))}
      </div>
    </article>
  );
}

/** Bouton « Télécharger le PDF » primaire. */
function DownloadButton({
  href,
  variant = 'primary',
  label = 'Télécharger le PDF',
}: {
  href: string;
  variant?: 'primary' | 'onBlue' | 'outline';
  label?: string;
}) {
  const base =
    'inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[0.95rem] font-semibold shadow-sm transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]';
  const styles: Record<string, string> = {
    primary: 'bg-[#377CF3] text-white hover:bg-[#2d66d6]',
    onBlue: 'bg-white text-[#377CF3] hover:bg-[#F2F2F2]',
    outline:
      'border border-[#377CF3] bg-white text-[#377CF3] hover:bg-[#D4E3FC]/40',
  };
  return (
    <a href={href} download className={`${base} ${styles[variant]}`}>
      <Download size={18} aria-hidden />
      {label}
    </a>
  );
}

/** Carte chiffre clé du bloc CTA final */
function CtaStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-2xl font-bold text-[#377CF3] md:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-slate-600 md:text-sm">{label}</p>
    </div>
  );
}

/** Construit le `@graph` JSON-LD : Article + HowTo + FAQPage + BreadcrumbList. */
function buildJsonLdGraph(tuto: TutoData) {
  const url = pageUrlFor(tuto);
  const ogImageUrl = `${SITE_BASE}/og/ressources-${tuto.slug}.png`;
  const description = tuto.metaDescription;

  const article = {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: tuto.title,
    description,
    inLanguage: 'fr-FR',
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      url: `${SITE_BASE}/a-propos`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.legalName,
      logo: { '@type': 'ImageObject', url: `${SITE_BASE}/logo-lo.svg` },
    },
    datePublished: tuto.publishedAt,
    dateModified: tuto.updatedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: ogImageUrl,
  };

  const howTo = {
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: tuto.title,
    description,
    inLanguage: 'fr-FR',
    totalTime: `PT${tuto.totalTimeMinutes}M`,
    step: tuto.steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.number,
      name: s.title,
      text: s.intro ?? s.blocks.find((b) => b.kind === 'paragraph')?.text ?? s.title,
    })),
  };

  const faq = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: tuto.faq.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_BASE },
      { '@type': 'ListItem', position: 2, name: 'Ressources', item: `${SITE_BASE}/ressources` },
      { '@type': 'ListItem', position: 3, name: tuto.shortTitle, item: url },
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [article, howTo, faq, breadcrumb],
  };
}

/** Page complète d'un tuto Ressource — reproduit fidèlement la mise en page du PDF source. */
export function TutoPage({ tuto }: { tuto: TutoData }) {
  const pdfUrl = pdfUrlFor(tuto);
  const graph = buildJsonLdGraph(tuto);
  const heroAnchors = computeHeroLearnAnchorIds(tuto);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd id={`schema-tuto-${tuto.slug}`} schema={graph} />

      {/* Hero */}
      <section className="bg-white" aria-labelledby={`hero-${tuto.slug}`}>
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-8 md:pb-14 md:pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#377CF3]">
            {tuto.eyebrow}
          </p>
          <h1
            id={`hero-${tuto.slug}`}
            className="mt-3 font-display text-3xl font-bold leading-tight text-[#377CF3] md:text-4xl lg:text-[2.6rem]"
          >
            {tuto.title}
          </h1>
          <p className="mt-4 italic text-slate-700 md:text-lg">
            {tuto.subtitle}
          </p>

          {/* Encadré bleu plein "CE QUE TU VAS APPRENDRE" */}
          <div className="mt-8 rounded-2xl bg-[#377CF3] p-6 text-white shadow-lg md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
              Ce que tu vas apprendre
            </p>
            <ul className="mt-4 space-y-1">
              {tuto.heroLearnPoints.map((p, idx) => {
                const frag = heroAnchors[idx] ?? `intro-${tuto.slug}`;
                return (
                  <li key={`${frag}-${idx}`}>
                    <a
                      href={`#${frag}`}
                      className="group flex gap-3 rounded-lg px-1 py-1.5 text-white/95 leading-relaxed transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <ChevronRight
                        size={18}
                        className="mt-1 shrink-0 text-white transition-transform group-hover:translate-x-0.5"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span className="underline-offset-4 group-hover:underline">{p}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <DownloadButton href={pdfUrl} variant="primary" />
            <p className="text-sm text-slate-600">
              Tutoriel gratuit — sans inscription, format PDF.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-slate-200">
              <Image
                src={PHOTOS.siteAvatar.src}
                alt="Laure Olivié, formatrice IA × BTP, OFC Création d'Entreprise"
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-slate-900">Laure Olivié</p>
              <p className="text-slate-600">
                Formatrice IA × BTP — OFC Création d&apos;Entreprise
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section intro */}
      <section className="bg-[#F8FAFC] py-12 md:py-16" aria-labelledby={`intro-${tuto.slug}`}>
        <div className="mx-auto max-w-4xl px-4">
          <h2
            id={`intro-${tuto.slug}`}
            className="scroll-mt-28 font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            {tuto.introTitle}
          </h2>
          <div>
            {tuto.introBlocks.map((b, idx) => (
              <Block key={idx} block={b} />
            ))}
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section className="py-12 md:py-16" aria-label="Étapes du tutoriel">
        <div className="mx-auto max-w-4xl px-4">
          {tuto.steps.map((s) => (
            <StepBlock key={s.number} step={s} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-slate-200 bg-[#F8FAFC] py-12 md:py-16"
        aria-labelledby={`faq-${tuto.slug}`}
      >
        <div className="mx-auto max-w-4xl px-4">
          <h2
            id={`faq-${tuto.slug}`}
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            {tuto.faqTitle}
          </h2>
          <div className="mt-8 space-y-8">
            {tuto.faq.map((it, idx) => (
              <div key={idx} className="border-b border-slate-200 pb-6 last:border-b-0">
                <h3 className="font-display text-lg font-semibold text-slate-900 md:text-xl">
                  {it.q}
                </h3>
                <p className="mt-3 text-slate-700 leading-relaxed">{it.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section
        className="border-t border-slate-200 bg-white py-14 md:py-20"
        aria-labelledby={`cta-${tuto.slug}`}
      >
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#377CF3]">
            {tuto.cta.eyebrow}
          </p>
          <h2
            id={`cta-${tuto.slug}`}
            className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl"
          >
            {tuto.cta.title}
          </h2>
          <p className="mt-3 italic text-slate-700 md:text-lg">{tuto.cta.subtitle}</p>

          <div className="mt-8 rounded-2xl bg-[#377CF3] p-7 text-white shadow-lg md:p-9">
            <p className="font-display text-lg font-bold md:text-xl">
              {tuto.cta.programTitle}
            </p>
            <ul className="mt-4 space-y-2.5">
              {tuto.cta.programItems.map((p, idx) => (
                <li key={idx} className="flex gap-3 text-white/95 leading-relaxed">
                  <ChevronRight
                    size={18}
                    className="mt-1 shrink-0 text-white"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid gap-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="font-display text-xl font-bold text-[#377CF3]">Laure Olivié</h3>
              <p className="text-slate-700">Formatrice IA × BTP</p>
              <ul className="mt-3 space-y-1 text-sm">
                <li>
                  <Link
                    href={LINKS.home}
                    className="text-[#377CF3] hover:underline"
                  >
                    www.laureolivie.fr
                  </Link>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Mail size={14} aria-hidden className="text-slate-400" />
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:underline"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <Phone size={14} aria-hidden className="text-slate-400" />
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                    className="hover:underline"
                  >
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-1 md:gap-3">
              <CtaStat value={SOCIAL_PROOF.AVERAGE_RATING} label="Satisfaction" />
              <CtaStat
                value={formatProfessionalsTrainedCount()}
                label="Personnes formées"
              />
              <CtaStat value="100%" label="Finançable OPCO" />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3.5 text-[0.95rem] font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#2d66d6] active:scale-[0.98]"
            >
              Réserver un appel découverte
              <ArrowRight size={18} aria-hidden />
            </a>
            <DownloadButton
              href={pdfUrl}
              variant="outline"
              label="Re-télécharger le PDF"
            />
          </div>

          <p className="mt-8 text-sm text-slate-600">
            Atelier individuel ou en équipe — Qualiopi · finançable Constructys / OPCO ·{' '}
            <Link
              href={LINKS.financement}
              className="text-[#377CF3] hover:underline"
            >
              voir le financement
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
