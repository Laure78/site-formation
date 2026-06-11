'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Check, Calendar } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import { SITE_CONFIG } from '@/lib/seo';
import { FooterTelOrMailLink, PublicPhoneCta } from '@/components/PublicPhoneCta';
import type { CityFormationConfig } from '@/lib/formation-cities';
import type { FAQItem } from '@/lib/faq';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';
import { SESSION_DUREE_LIBELLE, TARIF_FORFAIT_DEBUTANT_HT, MODALITE_FORMATIONS_STANDARD } from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';
import { StatCallout } from '@/components/readability/StatCallout';
import { KeyPoint } from '@/components/readability/KeyPoint';
import { COUNT_UP_PROS_PLUS, COUNT_UP_RATING, STATS_FRESHNESS_LABEL } from '@/lib/readability-presets';

interface FormationCityPageProps {
  config: CityFormationConfig;
  courseSchema: object;
  faqSchema?: object | null;
  faqItems?: readonly FAQItem[];
  /** Bloc SEO / conversion inséré entre le hero et la section « experte » */
  afterHero?: ReactNode;
}

export function FormationCityPage({
  config,
  courseSchema,
  faqSchema,
  faqItems,
  afterHero,
}: FormationCityPageProps) {
  const { ville, path, zones, regionLabel } = config;
  const cityCamp = path.replace(/^\/+|\/$/g, '').replace(/\//g, '-');
  const diagnosticUrl = buildSiteCalendlyCtaUrl(`${cityCamp}-aller-plus-loin-diagnostic`);
  const cityFinCtaCampaign = `${cityCamp}-fin-cta`;
  const mailRappelVille = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(`Être rappelé — formation IA appliquée au bâtiment ${ville}`)}`;
  const summaryVille = [
    `IA BTP à ${ville} — devis, emails, appels d'offres, admin.`,
    `Session ${SESSION_DUREE_LIBELLE} · ${TARIF_FORFAIT_DEBUTANT_HT} € HT (débutant) · Qualiopi.`,
    `Présentiel ${regionLabel} — intra ou inter selon convention.`,
    'Financement Constructys selon éligibilité.',
  ];
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {faqSchema && (
        <JsonLd id="schema-faq-page" schema={faqSchema} />
      )}
      <FormationCourseHero
        refLine={
          config.customHeroRefLine ??
          `Formation ${ville} & ${regionLabel} · Financement OPCO`
        }
        title={
          config.customHeroTitle ? (
            config.customHeroTitle
          ) : (
            <>
              Formation IA pour les entreprises du BTP à{' '}
              <span className="text-[var(--accent)]">{ville}</span>
            </>
          )
        }
        subtitle={
          config.customHeroSubtitle ??
          'Devis, emails, admin, appels d&apos;offres — présentiel Île-de-France'
        }
        badges={
          config.heroBadges ?? [
            'OPCO / plan de compétences',
            'Accessible débutant',
            'Cas terrain',
          ]
        }
        summaryItems={summaryVille}
        image={
          <FormationHeroPhoto
            src={PHOTOS.btpFormationSalleIntervention2026.src}
            alt={PHOTOS.btpFormationSalleIntervention2026.alt}
            width={PHOTOS.btpFormationSalleIntervention2026.width}
            height={PHOTOS.btpFormationSalleIntervention2026.height}
            priority
          />
        }
        ctas={
          <>
            <RdvLink campaign={`${cityCamp}-hero`} className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600">
              Échanger sur vos besoins
            </RdvLink>
            <a
              href="#zones"
              className="rounded-xl border-2 border-slate-200 px-6 py-3.5 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Zones d&apos;intervention
            </a>
            <a
              href={mailRappelVille}
              className="rounded-xl border-2 border-[var(--accent)] px-6 py-3.5 text-center font-semibold text-slate-900 hover:bg-[var(--accent-soft)]"
            >
              Être rappelé
            </a>
          </>
        }
        footerLinks={
          <>
            <a href="#zones" className="font-medium text-[var(--accent)] hover:underline">
              Voir les zones d&apos;intervention
            </a>
            <Link
              href={LINKS.formationIaBtpNiveau1BatimentTp}
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              Fiche formation catalogue (NIV-01)
            </Link>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        {config.customHeroIntro && config.customHeroIntro.length > 0 ? (
          <div className="space-y-4">
            {config.customHeroIntro.map((paragraph, i) => (
              <p key={`hero-intro-${i}`}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p>
            Formation IA pour les <strong>PME et pros du BTP</strong> à {ville} et alentours.{' '}
            <strong>ChatGPT</strong> pour devis, emails et relances. Appels d&apos;offres et admin
            accélérés — <strong>sans jargon</strong>, sur vos documents.
          </p>
        )}
      </FormationCourseHero>

      {afterHero}

      {/* Pourquoi cette formation est animée par une experte reconnue */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Une formatrice reconnue par le réseau pro
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Spécialiste IA générative pour le BTP. <strong className="text-slate-900">Formatrice LinkedIn Learning.</strong>{' '}
            Pédagogie concrète, adaptée aux entreprises du bâtiment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <StatCallout
              variant="inline"
              value={COUNT_UP_PROS_PLUS}
              label="pros BTP formés"
              freshnessLabel={STATS_FRESHNESS_LABEL}
            />
            <StatCallout
              variant="inline"
              value={COUNT_UP_RATING}
              label="note moyenne"
              freshnessLabel={STATS_FRESHNESS_LABEL}
            />
          </div>
          <Link
            href="/a-propos"
            className="mt-6 inline-flex font-medium text-[var(--accent)] hover:underline"
          >
            Profil Laure Olivié →
          </Link>
        </div>
      </section>

      {/* Pourquoi utiliser l'IA dans le BTP */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Pourquoi l&apos;IA dans le BTP à {ville}&nbsp;?
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Devis, appels d&apos;offres, emails : les PME du bâtiment à {ville} récupèrent plusieurs heures par
            semaine. L&apos;IA n&apos;est pas réservée aux grands groupes.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Devis et chiffrages accélérés',
              'Réponses aux appels d\'offres',
              'Emails et relances clients',
              'Organisation administrative',
              'Comptes rendus de chantier',
              'Gestion documentaire',
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <Check size={20} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section id="zones" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Zones d&apos;intervention autour de {ville}
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Formations disponibles à {ville} et dans les villes voisines. {MODALITE_FORMATIONS_STANDARD}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {zones.map((zone) => (
              <div
                key={`${zone.num}-${zone.nom}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold text-white">
                    {zone.num}
                  </span>
                  <h3 className="font-display font-semibold text-slate-900">
                    {zone.nom}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-slate-600">{zone.contenu}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h3 className="font-display text-xl font-bold text-slate-900">
              Votre ville n&apos;est pas listée&nbsp;?
            </h3>
            <p className="mt-4 text-slate-600">
              Interventions dans toute la {regionLabel}. Contactez-nous pour vérifier la disponibilité.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <RdvLink campaign={`${cityCamp}-zones-cta`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-600">
                <Calendar size={20} strokeWidth={1.5} />
                Échanger sur vos besoins
              </RdvLink>
              <PublicPhoneCta className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqItems && faqItems.length > 0 && (
        <section className="border-b border-slate-200 bg-white px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <FAQSection
              items={faqItems}
              title={`Questions fréquentes — Formation IA pour les pro du BTP à ${ville}`}
            />
          </div>
        </section>
      )}

      {/* Cas concrets */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Cas concrets — entreprises du bâtiment
          </h2>
          <p className="mt-3 text-slate-600">
            Des pros à {ville} gagnent déjà du temps avec l&apos;IA.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <KeyPoint label="Devis" subject="Un poste structuré" after="15 min" before="1 h en routine" />
            <KeyPoint label="DCE">
              Un CCTP décortiqué en{' '}
              <strong className="font-semibold text-[#377CF3]">30 min</strong> — relecture métier obligatoire.
            </KeyPoint>
            {[
              { titre: 'Emails pro', desc: 'Relances et réclamations : l\'IA rédige, vous validez.' },
              { titre: 'Admin allégée', desc: 'CR et comptes rendus : moins de saisie, plus de terrain.' },
            ].map(({ titre, desc }) => (
              <div key={titre} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">{titre}</h3>
                <p className="mt-2 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage interne */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Aller plus loin
          </h2>
          <p className="mt-2 text-slate-600">
            Paris, catalogue complet et articles pratiques.
          </p>
          <ul className="mt-6 flex flex-wrap gap-4">
            <li>
              <Link href="/formations/ia-btp-paris" className="font-medium text-[var(--accent)] hover:underline">
                Formation IA pour le BTP Paris
              </Link>
            </li>
            <li>
              <Link href="/formations" className="font-medium text-[var(--accent)] hover:underline">
                Catalogue des formations
              </Link>
            </li>
            <li>
              <Link href="/blog" className="font-medium text-[var(--accent)] hover:underline">
                Blog et ressources IA BTP
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-medium text-[var(--accent)] hover:underline">
                Contact
              </Link>
            </li>
          </ul>
          <div className="mt-8">
            <AllerPlusLoin
              links={[
                { href: '/formations', label: 'Formation IA pour les pro du BTP' },
                { href: '/formation-ia-artisans-btp', label: 'IA pour votre métier dans le bâtiment' },
                { href: diagnosticUrl, label: 'Échanger sur vos besoins (30 min)' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">
            Formation IA à {ville}
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Devis sous 24 h. Financement Constructys selon éligibilité.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink campaign={cityFinCtaCampaign} className="flex items-center gap-2 rounded-xl border-2 border-white/60 bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50">
              <Calendar size={20} strokeWidth={1.5} />
              Échanger sur vos besoins
            </RdvLink>
            <PublicPhoneCta className="flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white hover:bg-white/10" />
          </div>
        </div>
      </section>
    </div>
  );
}
