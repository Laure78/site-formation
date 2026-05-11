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
import { SESSION_DUREE_LIBELLE, TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';
import { PHOTOS } from '@/lib/photos';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';

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
  const mailRappelVille = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(`Être rappelé — formation IA BTP ${ville}`)}`;
  const summaryVille = [
    `Formation IA BTP à ${ville} — devis, emails, appels d'offres, administratif.`,
    `Session ${SESSION_DUREE_LIBELLE} — forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT/session (débutant) — Qualiopi.`,
    `Présentiel — ${regionLabel} : inter ou intra dans vos locaux selon convention.`,
    'Financement OPCO Constructys selon éligibilité.',
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
          'Devis, emails, administratif et appels d&apos;offres — présentiel'
        }
        badges={
          config.heroBadges ?? [
            'OPCO / plan de développement des compétences',
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
              Prendre rendez-vous
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
            Formation IA bâtiment adaptée aux <strong>professionnels du BTP et PME</strong> à {ville} et dans les
            environs. <strong>Productivité</strong> : ChatGPT pour <strong>devis, emails et relances</strong>.
            Automatisez vos <strong>appels d&apos;offres</strong> et votre gestion administrative —{' '}
            <strong>aucun jargon inutile</strong>.
          </p>
        )}
      </FormationCourseHero>

      {afterHero}

      {/* Pourquoi cette formation est animée par une experte reconnue */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Pourquoi cette formation est animée par une experte reconnue
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Formatrice spécialisée dans l&apos;intégration de l&apos;IA générative dans les entreprises du BTP.
            Intervenante et créatrice de contenus pédagogiques sur l&apos;IA.
            <strong className="text-slate-900"> Formatrice LinkedIn Learning.</strong>
            {' '}Cette expérience garantit une approche pédagogique concrète adaptée aux entreprises du bâtiment.
          </p>
          <Link
            href="/a-propos"
            className="mt-6 inline-flex font-medium text-[var(--accent)] hover:underline"
          >
            Découvrir le profil de Laure Olivié →
          </Link>
        </div>
      </section>

      {/* Pourquoi utiliser l'IA dans le BTP */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Pourquoi utiliser l&apos;IA dans le BTP à {ville} ?
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Les entreprises du bâtiment à {ville} et en {regionLabel} gagnent plusieurs heures par semaine
            en automatisant devis, appels d&apos;offres et emails clients. L&apos;IA générative n&apos;est pas
            réservée aux grands groupes : les PME du BTP en profitent déjà.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Automatisation des devis et chiffrages',
              'Analyse et réponse aux appels d\'offres',
              'Emails clients et relances',
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
            Formations disponibles à {ville} et dans les villes voisines. Sessions en présentiel
            dans vos locaux ou en salle.
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
              Votre ville n&apos;apparaît pas dans la liste ?
            </h3>
            <p className="mt-4 text-slate-600">
              Nous intervenons dans toute la {regionLabel}, y compris dans les
              villes non mentionnées ci-dessus. Contactez-nous pour vérifier la
              disponibilité dans votre secteur.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <RdvLink campaign={`${cityCamp}-zones-cta`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-600">
                <Calendar size={20} strokeWidth={1.5} />
                Prendre rendez-vous
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
              title={`Questions fréquentes — Formation IA BTP à ${ville}`}
            />
          </div>
        </section>
      )}

      {/* Cas concrets */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Cas concrets d&apos;utilisation de l&apos;IA pour les entreprises du bâtiment
          </h2>
          <p className="mt-3 text-slate-600">
            Professionnels du BTP et PME à {ville} utilisent déjà l&apos;IA pour gagner du temps.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              { titre: 'Devis en 15 minutes', desc: 'Un chargé d\'affaires génère un devis détaillé en quelques minutes au lieu de 2 heures.' },
              { titre: 'Analyse DCE accélérée', desc: 'Un conducteur de travaux analyse un cahier des charges en 30 min au lieu de 3h.' },
              { titre: 'Emails professionnels', desc: 'Relances clients, réponses aux réclamations : l\'IA rédige, vous validez.' },
              { titre: 'Administratif simplifié', desc: 'CR de chantier, comptes rendus de réunion : moins de saisie, plus de terrain.' },
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
            Découvrez aussi notre formation IA BTP à Paris, nos articles et notre catalogue complet.
          </p>
          <ul className="mt-6 flex flex-wrap gap-4">
            <li>
              <Link href="/formations/ia-btp-paris" className="font-medium text-[var(--accent)] hover:underline">
                Formation IA BTP Paris
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
                { href: '/formations', label: 'Formation IA BTP' },
                { href: '/formation-ia-artisans-btp', label: 'IA pour votre métier dans le bâtiment' },
                { href: diagnosticUrl, label: 'Prendre rendez-vous pour un diagnostic' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">
            Demander une formation IA BTP à {ville}
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Réservez votre formation IA. Devis personnalisé sous 24h.
            Financement OPCO Constructys 100% possible.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink campaign={cityFinCtaCampaign} className="flex items-center gap-2 rounded-xl border-2 border-white/60 bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50">
              <Calendar size={20} strokeWidth={1.5} />
              Réserver ma formation
            </RdvLink>
            <PublicPhoneCta className="flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white hover:bg-white/10" />
          </div>
        </div>
      </section>
    </div>
  );
}
