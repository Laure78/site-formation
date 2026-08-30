import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { Check, Download } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { SESSION_DUREE_LIBELLE } from '@/lib/tarifs-sessions';
import { getFormationByCode, libelleDureeFormation, libelleEffectifMaxFormation } from '@/data/formations';
import { PREREQUIS_NIV06 } from '@/lib/infos-pratiques-catalogue';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { FormationCourseHero } from '@/components/formations/FormationCourseHero';
import { FormationCatalogueIndicateur1Suite } from '@/components/formations/FormationCatalogueIndicateur1Suite';
import { FormationCatalogueGeoSections } from '@/components/formations/FormationCatalogueGeoSections';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import {
  CURSOR_CAS_USAGE_AVANTAGE,
  CURSOR_FAQ,
  CURSOR_FORMATION_CHOICE,
  CURSOR_FORMATION_H1,
  CURSOR_FORMATION_PROMESSE,
  CURSOR_FORMATION_SUBTITLE,
  CURSOR_LIVRABLES,
  CURSOR_MAILLAGE,
  CURSOR_METHODE_PEDAGOGIQUE,
  CURSOR_PRUDENCE_FORMULATION,
  CURSOR_PROGRAMME_MODULES,
} from '@/lib/formation-cursor-btp-content';
import { buildCatalogueCourseCursorBtpNiv06JsonLd } from '@/lib/schema-catalogue-course-jsonld';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-06');
const FORMATION = getFormationByCode('NIV-06')!;
const PATH = LINKS.formationCursorBtp;
const PDF_HREF = FORMATION.pdfProgramme;
const PDF_DOWNLOAD_NAME = 'programme_OFC_Cursor_BTP_outils_metier.pdf';
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-06');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: PATH,
  keywords: [
    'formation Cursor BTP',
    'Cursor BTP',
    'créer outil métier BTP',
    'application interne BTP IA',
    'développement assisté IA BTP',
    'formation Cursor entreprise',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

export default function FormationCursorBtpPage() {
  const courseSchema = buildCatalogueCourseCursorBtpNiv06JsonLd();
  const faqSchema = getFAQSchema(CURSOR_FAQ);

  return (
    <div>
      <JsonLd id="schema-course-niv-06" schema={courseSchema} />
      <JsonLd id="schema-faq-cursor-btp" schema={faqSchema} />

      <FormationCourseHero
        catalogueRef="NIV-06"
        programmePdfAfterHero={false}
        refLine={`Intra-entreprise · présentiel · ${libelleDureeFormation(FORMATION)} · Atelier avancé · ${libelleEffectifMaxFormation(FORMATION)}`}
        title={CURSOR_FORMATION_H1}
        subtitle={CURSOR_FORMATION_SUBTITLE}
        badges={['Applications métier', 'Cursor & GitHub', 'Organisme Qualiopi']}
        summaryItems={['70 % pratique sur votre poste', 'Premier outil métier fonctionnel', 'Plan avant code']}
        ctas={
          <>
            <RdvLink
              campaign="formations-cursor-btp-hero"
              ctaPosition="hero"
              ctaId="hero"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600"
            >
              Parler de votre projet d&apos;outil
            </RdvLink>
            <a
              href={PDF_HREF}
              download={PDF_DOWNLOAD_NAME}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3.5 font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              <Download size={20} strokeWidth={1.5} />
              Télécharger le programme (PDF)
            </a>
          </>
        }
        footerLinks={
          <>
            <a href="#programme" className="font-medium text-[var(--accent)] hover:underline">
              Voir le programme détaillé
            </a>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          <strong>{CURSOR_FORMATION_PROMESSE}</strong> {CURSOR_PRUDENCE_FORMULATION}
        </p>
      </FormationCourseHero>

      <FormationCatalogueGeoSections catalogueRef="NIV-06" />

      <section id="programme" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">Programme détaillé</h2>
          <p className="mt-2 text-sm text-slate-600">{CURSOR_METHODE_PEDAGOGIQUE}</p>
          <div className="mt-8 space-y-8">
            {CURSOR_PROGRAMME_MODULES.map((module) => (
              <div key={module.heading} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-slate-900">{module.heading}</h3>
                  <span className="text-sm font-medium text-[var(--accent)]">{module.meta}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {module.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">Cas d&apos;usage BTP</h2>
          <p className="mt-2 text-sm text-slate-600">
            Exemples prioritaires — et d&apos;autres outils internes selon les besoins de votre entreprise.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {CURSOR_CAS_USAGE_AVANTAGE.map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">Livrables</h2>
          <ul className="mt-6 space-y-2">
            {CURSOR_LIVRABLES.map((item) => (
              <li key={item} className="flex gap-2 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-600">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
        </div>
      </section>

      <section id="quelle-formation" className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">Quelle formation choisir ?</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {CURSOR_FORMATION_CHOICE.map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl border p-5 ${'current' in item && item.current ? 'border-[var(--accent)] bg-[#EFF6FF]' : 'border-slate-200 bg-white'}`}
              >
                <h3 className="font-display font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                {'current' in item && item.current ? (
                  <p className="mt-3 text-xs font-semibold uppercase text-[var(--accent)]">Vous êtes ici</p>
                ) : (
                  <Link href={item.href} className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline">
                    Voir cette formation
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-xl font-bold text-slate-900">Formations complémentaires</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {CURSOR_MAILLAGE.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-medium text-[var(--accent)] hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm text-slate-700">
            <strong>Prérequis :</strong> {PREREQUIS_NIV06}
          </p>
        </div>
      </section>

      <FormationCatalogueIndicateur1Suite programmeRef="NIV-06" />

      <FAQSection items={CURSOR_FAQ} title="FAQ — formation Cursor BTP" />

      <section className="border-t border-slate-200 bg-white px-4 py-12 text-center">
        <RdvLink
          campaign="formations-cursor-btp-footer"
          ctaPosition="footer"
          ctaId="footer"
          className="inline-flex rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-600"
        >
          Parler de votre besoin — {SESSION_DUREE_LIBELLE}
        </RdvLink>
      </section>
    </div>
  );
}
