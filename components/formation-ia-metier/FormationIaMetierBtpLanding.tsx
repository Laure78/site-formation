import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import type { FormationIaMetierBtpConfig } from '@/lib/formation-ia-metier-btp-config';

const OFC = "OFC Création d'Entreprise";

const SOMMAIRE = [
  { href: '#probleme', label: 'Le problème : charge documentaire et normes' },
  { href: '#solution-ia', label: 'La solution IA : méthode et garde-fous' },
  { href: '#prompts', label: 'Prompts ChatGPT spécifiques métier' },
  { href: '#temoignage', label: 'Témoignage' },
  { href: '#faq', label: 'FAQ' },
  { href: '#liens-internes', label: 'Liens utiles' },
  { href: '#rdv-1', label: 'Prendre rendez-vous (Calendly)' },
];

function CalendlyBlock({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-[#377CF3] px-6 py-10 text-white shadow-sm md:px-10"
    >
      <h2 className="font-display text-xl font-bold md:text-2xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-blue-100 md:text-base">{subtitle}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#377CF3] hover:bg-blue-50">
          Ouvrir Calendly — rendez-vous découverte
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
        </RdvLink>
        <a
          href={CALENDLY_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-xl border-2 border-white/80 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
        >
          {CALENDLY_BOOKING_URL}
        </a>
      </div>
    </section>
  );
}

export function FormationIaMetierBtpLanding({ config }: { config: FormationIaMetierBtpConfig }) {
  const courseJson = getCourseSchema({
    name: config.courseName,
    description: config.courseDescription,
    path: config.path,
    providerName: SITE_CONFIG.legalName,
    instructorName: SITE_CONFIG.name,
    teaches: config.courseTeaches,
    educationalLevel: 'Professionnel',
    timeRequired: 'PT4H',
    areaServed: ['Île-de-France', 'France'],
  });

  const faqSchema = getFAQSchema(config.faq);

  return (
    <div className="bg-white text-slate-900">
      <JsonLd id={`schema-course-metier-${config.id}`} schema={courseJson} />
      <JsonLd id={`schema-faq-metier-${config.id}`} schema={faqSchema} />

      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <nav aria-label="Fil d&apos;Ariane" className="text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href={LINKS.home} className="text-[#377CF3] hover:underline">
                Accueil
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-slate-400" aria-hidden>
                /
              </span>
              <span className="font-medium text-slate-900">Formation IA {config.metierNomTitre} BTP</span>
            </li>
          </ol>
        </nav>

        <article className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
            {config.normeRef.replace(/^le |^la /i, '').trim()} · Qualiopi · Île-de-France
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
            {config.h1}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {OFC} — formation IA &amp; ChatGPT pour {config.metierNom} du BTP : devis, chantier, mémoires techniques.
            Sessions 4 h, certifiées Qualiopi, finançable Constructys selon dossier. Plus de{' '}
            <strong className="text-slate-800">{formatProfessionalsTrainedCount()} professionnels</strong> formés · note{' '}
            <strong className="text-slate-800">{SOCIAL_PROOF.AVERAGE_RATING}</strong>.
          </p>

          <div className="mt-8">
            <ShortAnswerBlock>
              L&apos;IA aide à structurer brouillons et tableaux à partir de vos données ; elle ne remplace ni la
              validation des normes ({config.normeRef}) ni la responsabilité professionnelle sur le chantier.
            </ShortAnswerBlock>
          </div>

          {config.csfePartnership && (
            <p className="mt-6 rounded-xl border border-blue-100 bg-[#F2F2F2] px-4 py-3 text-sm text-slate-700">
              <strong className="text-slate-900">Partenariat CSFE :</strong> {OFC} est partenaire officiel de la Chambre
              syndicale française de l&apos;étanchéité pour des actions de sensibilisation et de formation — un angle
              unique pour les équipes étanchéité. L&apos;étude de cas FFB &amp; CSFE est accessible via le lien unique dans
              la section « Liens utiles ».
            </p>
          )}

          <nav aria-label="Sommaire" className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
              {SOMMAIRE.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-[#377CF3] underline hover:no-underline">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section id="probleme" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Le problème des {config.metierNom} : la charge documentaire et les normes
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              {config.problemParagraphs.map((p, i) => (
                <p key={`pb-${i}`}>{p}</p>
              ))}
            </div>
          </section>

          <section id="solution-ia" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">La solution IA</h2>
            <p className="mt-6 text-slate-700 leading-relaxed">{config.solutionIntro}</p>
            <ul className="mt-6 space-y-3">
              {[
                'Ateliers sur vos documents réels (anonymisés si besoin)',
                'Relecture humaine systématique avant envoi client ou marché',
                'Rappels confidentialité : pas de données sensibles dans un outil grand public sans cadre',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12">
            <CalendlyBlock
              id="rdv-1"
              title="Premier rendez-vous — Calendly"
              subtitle="30 minutes pour cadrer votre besoin (intra, inter, distanciel) et voir si la formation IA BTP correspond à votre équipe."
            />
          </div>

          <section id="prompts" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Prompts ChatGPT — exemples pour {config.metierNomTitre} BTP
            </h2>
            <p className="mt-4 text-slate-600">
              À adapter à vos tarifs internes et à vos modèles. Toujours valider les sorties avec le référentiel
              technique ({config.normeRef}, notices, CCTP).
            </p>
            <div className="mt-8 space-y-10">
              {config.prompts.map((p, i) => (
                <div key={p.title} className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 md:p-6">
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {i + 1}. {p.title}
                  </h3>
                  <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-800 shadow-sm">
                    {p.body}
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section id="temoignage" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              {config.csfePartnership ? 'Témoignage — partenariat CSFE' : 'Témoignage'}
            </h2>
            <blockquote className="mt-6 rounded-2xl border-l-4 border-[#377CF3] bg-slate-50 p-6 md:p-8">
              <p className="text-slate-800 leading-relaxed italic">&laquo; {config.testimonialQuote} &raquo;</p>
              <footer className="mt-4 text-sm font-medium text-slate-600">{config.testimonialAttribution}</footer>
            </blockquote>
          </section>

          <section id="faq" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">FAQ</h2>
            <div className="mt-8 space-y-5">
              {config.faq.map((item) => (
                <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-slate-900">{item.q}</h3>
                  <div className="mt-2 text-slate-600 leading-relaxed">
                    <FAQAnswer content={item.a} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="liens-internes" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Liens utiles</h2>
            <p className="mt-4 text-slate-600">
              Catalogue des formations, retour d&apos;expérience étanchéité FFB/CSFE, et articles sur l&apos;IA dans le
              BTP.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-1">
              <li>
                <Link
                  href={LINKS.etudesCas}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 font-semibold text-[#377CF3] transition hover:border-[#377CF3]"
                >
                  <span className="text-slate-900">Étude de cas FFB &amp; CSFE</span>
                  <span className="mt-3 text-sm font-normal text-slate-600">
                    Étanchéité — retour d&apos;expérience et formation IA.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={LINKS.formations}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 font-semibold text-[#377CF3] transition hover:border-[#377CF3]"
                >
                  <span className="text-slate-900">Catalogue des formations</span>
                  <span className="mt-3 text-sm font-normal text-slate-600">
                    Modules BTP-01 à BTP-05, durées et objectifs Qualiopi.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={LINKS.blog}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 font-semibold text-[#377CF3] transition hover:border-[#377CF3]"
                >
                  <span className="text-slate-900">Blog IA &amp; BTP</span>
                  <span className="mt-3 text-sm font-normal text-slate-600">
                    Guides, cas d&apos;usage, bonnes pratiques.
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          <div className="mt-14">
            <CalendlyBlock
              id="rdv-2"
              title="Deuxième appel à l’action — Calendly"
              subtitle="Réservez un créneau pour une visio découverte gratuite : démonstration sur un cas type et questions financement (Constructys, OPCO)."
            />
          </div>

          <section className="mt-14 border-t border-slate-200 pt-10 text-sm text-slate-600">
            <p>
              <strong>{SITE_CONFIG.legalName}</strong> — SIRET {SITE_CONFIG.siret} · NDA 11788515078 · Certifiée Qualiopi
              · {SITE_CONFIG.email} ·{' '}
              <a href={SITE_CONFIG.url} className="text-[#377CF3] hover:underline">
                www.laureolivie.fr
              </a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
