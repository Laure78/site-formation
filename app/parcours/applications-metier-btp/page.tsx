import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { ApplicationMetierLearningPath } from '@/components/formations/ApplicationMetierLearningPath';
import { ApplicationMetierParcoursTarifsSection } from '@/components/formations/ApplicationMetierParcoursTarifsSection';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK, OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import {
  APPLICATION_METIER_NIVEAUX,
  PARCOURS_APPLICATIONS_METIER,
  PARCOURS_CAS_USAGE_CARTES,
} from '@/lib/parcours-applications-metier-btp-content';
import { APPLICATION_METIER_PARCOURS_STEPS } from '@/lib/application-metier-btp-parcours-nav';
import { libelleTarifApplicationMetierBtpDureeSession } from '@/lib/tarifs-applications-metier-btp';
import { buildParcoursApplicationsMetierJsonLd } from '@/lib/schema-parcours-applications-metier';
import { MentionTvaAsterisque } from '@/components/MentionTVA';

export const metadata = createPageMetadata({
  title: PARCOURS_APPLICATIONS_METIER.metaTitle,
  description: PARCOURS_APPLICATIONS_METIER.metaDescription,
  descriptionFinal: true,
  path: LINKS.parcoursApplicationsMetierBtp,
  keywords: [
    'parcours formation applications métier BTP',
    'formation application métier BTP',
    'créer application BTP avec IA',
    'développement application BTP',
    'application métier bâtiment',
    'automatiser entreprise BTP',
    'développement assisté par IA',
  ],
});

export default function ParcoursApplicationsMetierBtpPage() {
  const faqSchema = getFAQSchema([...PARCOURS_APPLICATIONS_METIER.faq]);

  return (
    <div>
      <JsonLd id="schema-parcours-applications-metier" schema={buildParcoursApplicationsMetierJsonLd()} />
      {faqSchema ? <JsonLd id="schema-faq-parcours-applications-metier" schema={faqSchema} /> : null}

      <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            Parcours de formation — Déployer
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {PARCOURS_APPLICATIONS_METIER.h1}
          </h1>
          <p className="mt-6 text-lg font-medium text-slate-800">
            {PARCOURS_APPLICATIONS_METIER.messagePrincipal}
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
            {PARCOURS_APPLICATIONS_METIER.promesse}
          </p>
          <p className="mt-3 text-base text-slate-600">{PARCOURS_APPLICATIONS_METIER.sousPromesse}</p>
          <ApplicationMetierLearningPath className="mx-auto mt-10 max-w-4xl text-left" />
          <RdvLink
            className="mt-10"
            variant="primary"
            campaign="parcours-applications-metier-hero"
           />
        </div>
      </section>

      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl">
          <p className="text-base leading-relaxed text-slate-600 md:text-lg">
            {PARCOURS_APPLICATIONS_METIER.intro}
          </p>
          <p className="mt-4 text-slate-600">
            Transformez progressivement fichiers Excel, formulaires, procédures papier, tableaux de suivi,
            tâches répétitives, données dispersées et processus manuels en applications métier.
          </p>
        </div>
      </section>

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Quels outils pouvez-vous créer ?
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Exemples d&apos;applications possibles — la formation enseigne une méthode transversale,
            pas un cas d&apos;usage imposé.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PARCOURS_CAS_USAGE_CARTES.map((cas) => (
              <article
                key={cas.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{cas.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                  {cas.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[var(--accent)]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Trois niveaux — compétences transversales
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {APPLICATION_METIER_NIVEAUX.map((niveau) => {
              const step = APPLICATION_METIER_PARCOURS_STEPS.find((s) => s.ref === niveau.ref)!;
              return (
              <article
                key={niveau.ref}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                  {niveau.progressionLabel}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-slate-900">{step.cardTitle}</h3>
                <p className="mt-4 flex-1 text-sm text-slate-600">{step.cardTeaser}</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  {libelleTarifApplicationMetierBtpDureeSession('7 h', niveau.tarifKey)}
                  <MentionTvaAsterisque />
                </p>
                <Link
                  href={niveau.path}
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${OFC_LINK}`}
                >
                  {step.decouvrirCta}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </article>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <RdvLink variant="primary" campaign="parcours-applications-metier-apres-niveaux" />
          </div>
        </div>
      </section>

      <ApplicationMetierParcoursTarifsSection />

      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl">
          <Link href={LINKS.financement} className={`inline-block text-sm font-semibold ${OFC_LINK}`}>
            En savoir plus sur le financement Constructys →
          </Link>
        </div>
      </section>

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Compétences enseignées — indépendantes des outils
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              'Développement assisté par l’IA et cadrage métier',
              'Conception d’interfaces et structuration des données',
              'Connexion de services et automatisations',
              'Intégration de l’intelligence artificielle avec validation humaine',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQSection items={[...PARCOURS_APPLICATIONS_METIER.faq]} />

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-2xl rounded-2xl bg-[var(--accent-soft)] p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Discutons de votre projet d&apos;application métier
          </h2>
          <p className="mt-3 text-slate-600">
            Visio découverte de 30 minutes — sans engagement. Nous cadrons le niveau adapté à votre équipe.
          </p>
          <RdvLink
            className={`mt-8 ${OFC_CTA_PRIMARY}`}
            variant="primary"
            campaign="parcours-applications-metier-footer"
           />
        </div>
      </section>
    </div>
  );
}
