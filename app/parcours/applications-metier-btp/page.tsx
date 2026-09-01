import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK, OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import {
  APPLICATION_METIER_NIVEAUX,
  PARCOURS_APPLICATIONS_METIER,
  PARCOURS_CAS_USAGE_CARTES,
} from '@/lib/parcours-applications-metier-btp-content';
import {
  ECONOMIE_PARCOURS_APPLICATION_METIER_HT,
  FINANCEMENT_APPLICATION_METIER_BTP,
  FINANCEMENT_APPLICATION_METIER_BTP_DETAIL,
  TARIF_FORFAIT_INTRA_MENTION,
  libelleTarifApplicationMetierBtpCourt,
} from '@/lib/tarifs-applications-metier-btp';
import { buildParcoursApplicationsMetierJsonLd } from '@/lib/schema-parcours-applications-metier';
import { MentionTvaAsterisque } from '@/components/MentionTVA';

export const metadata = createPageMetadata({
  title: PARCOURS_APPLICATIONS_METIER.metaTitle,
  description: PARCOURS_APPLICATIONS_METIER.metaDescription,
  descriptionFinal: true,
  path: LINKS.parcoursApplicationsMetierBtp,
  keywords: [
    'formation application métier BTP',
    'créer application BTP avec IA',
    'développement application BTP',
    'application métier bâtiment',
    'créer logiciel métier BTP',
    'automatiser entreprise BTP',
    'outil interne BTP',
    'développement assisté par IA',
  ],
});

const TARIFS_PARCOURS = [
  {
    key: 'niveau-1' as const,
    duree: '7 h',
    tagline: 'Créer son premier prototype',
    href: LINKS.formationApplicationMetierBtpNiveau1,
  },
  {
    key: 'niveau-2' as const,
    duree: '7 h',
    tagline: 'Connecter son application',
    href: LINKS.formationApplicationMetierBtpNiveau2,
  },
  {
    key: 'niveau-3' as const,
    duree: '7 h',
    tagline: 'Intégrer IA et automatisations',
    href: LINKS.formationApplicationMetierBtpNiveau3,
  },
  {
    key: 'parcours-complet' as const,
    duree: '21 h · 3 journées',
    tagline: 'Parcours complet',
    href: LINKS.parcoursApplicationsMetierBtp,
    highlight: true,
  },
];

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
          <RdvLink
            className="mt-10"
            variant="primary"
            campaign="parcours-applications-metier-hero"
          >
            Réserver une visio découverte
          </RdvLink>
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
            {APPLICATION_METIER_NIVEAUX.map((niveau) => (
              <article
                key={niveau.ref}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                  {niveau.progressionLabel}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-slate-900">{niveau.h1}</h3>
                <p className="mt-2 text-sm font-medium text-slate-800">{niveau.progressionTagline}</p>
                <p className="mt-4 flex-1 text-sm text-slate-600">{niveau.positionnement}</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  {libelleTarifApplicationMetierBtpCourt(niveau.tarifKey)}
                  <MentionTvaAsterisque />
                </p>
                <Link
                  href={niveau.path}
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${OFC_LINK}`}
                >
                  Programme détaillé
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <RdvLink variant="primary" campaign="parcours-applications-metier-apres-niveaux">
              Réserver une visio découverte
            </RdvLink>
          </div>
        </div>
      </section>

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Tarifs</h2>
          <p className="mt-2 text-sm text-slate-600">{TARIF_FORFAIT_INTRA_MENTION}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TARIFS_PARCOURS.map((t) => (
              <div
                key={t.key}
                className={`rounded-2xl border p-5 ${
                  t.highlight
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)] shadow-md'
                    : 'border-slate-200 bg-slate-50/80'
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">{t.duree}</p>
                <p className="mt-2 text-sm text-slate-600">{t.tagline}</p>
                <p className="mt-4 font-display text-2xl font-bold text-slate-900">
                  {libelleTarifApplicationMetierBtpCourt(t.key)}
                  <MentionTvaAsterisque />
                </p>
                {t.href !== LINKS.parcoursApplicationsMetierBtp ? (
                  <Link href={t.href} className={`mt-4 inline-block text-sm font-semibold ${OFC_LINK}`}>
                    Voir le niveau →
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Économie de{' '}
            <strong>{new Intl.NumberFormat('fr-FR').format(ECONOMIE_PARCOURS_APPLICATION_METIER_HT)} € HT</strong>{' '}
            par rapport aux trois niveaux réservés séparément.
          </p>
          <p className="mt-4 text-sm text-slate-500">{PARCOURS_APPLICATIONS_METIER.parcoursCompletPrudence}</p>
        </div>
      </section>

      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">Financement</h2>
          <p className="mt-4 text-slate-600">{FINANCEMENT_APPLICATION_METIER_BTP}</p>
          <p className="mt-2 text-sm text-slate-500">{FINANCEMENT_APPLICATION_METIER_BTP_DETAIL}</p>
          <Link href={LINKS.financement} className={`mt-4 inline-block text-sm font-semibold ${OFC_LINK}`}>
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
          >
            Réserver une visio découverte
          </RdvLink>
        </div>
      </section>
    </div>
  );
}
