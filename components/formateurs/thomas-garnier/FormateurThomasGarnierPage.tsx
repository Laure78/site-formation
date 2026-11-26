import Link from 'next/link';
import { BriefcaseBusiness, Calculator, FileSearch, FileText, type LucideIcon } from 'lucide-react';
import { CtaDevis } from '@/components/CtaDevis';
import { CtaVisio } from '@/components/CtaVisio';
import { FormateurProfileExpertiseSection } from '@/components/formateurs/profile/FormateurProfileExpertiseSection';
import { FormateurProfileHeroSection } from '@/components/formateurs/profile/FormateurProfileHeroSection';
import { FormateurProfileModuleFormationsSection } from '@/components/formateurs/profile/FormateurProfileModuleFormationsSection';
import { FormateurProfileReassuranceStrip } from '@/components/formateurs/profile/FormateurProfileReassuranceStrip';
import {
  FORMATEUR_PROFILE_TIMELINE_DOT,
  FORMATEUR_PROFILE_TIMELINE_ITEM,
} from '@/components/formateurs/profile/formateur-profile-section-styles';
import { FAQSectionServer } from '@/components/landing/FAQSectionServer';
import { JsonLd } from '@/components/JsonLd';
import {
  getFormateurExplicitModuleLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import {
  getThomasGarnierFaqItems,
  THOMAS_CHARGEAFFAIRES_ACTIVITES,
  THOMAS_EXPERTISE_CARDS,
  THOMAS_FORMATIONS_OFC_LINKS,
  THOMAS_FORMATIONS_SECTION_ID,
  THOMAS_GARNIER_EN_BREF,
  THOMAS_GUIDES_LINKS,
  THOMAS_MODULE_FORMATION_CARDS,
  THOMAS_PROBLEMATIQUES,
  THOMAS_PUBLIC_CIBLE,
} from '@/lib/formateurs/thomas-garnier/thomas-garnier-content';
import { getThomasGarnierPageJsonLd } from '@/lib/formateurs/thomas-garnier/thomas-garnier-schema';
import { LINKS } from '@/lib/internal-links';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';
import { OFC_LINK, OFC_TYPE_BODY, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';
import { SITE_CONFIG } from '@/lib/seo';
import { MODALITE_POSITIONNEMENT } from '@/lib/tarifs-sessions';

const EXPERTISE_ICONS: Record<(typeof THOMAS_EXPERTISE_CARDS)[number]['key'], LucideIcon> = {
  devis: Calculator,
  dce: FileSearch,
  memoire: FileText,
  offres: BriefcaseBusiness,
};

const MODULE_META_LINES = [
  'Modalité : présentiel.',
  'Zone : Île-de-France.',
] as const;

type Props = {
  formateur: FormateurProfile;
};

export function FormateurThomasGarnierPage({ formateur }: Props) {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const parcoursVisible = isParcoursMetiers2027Visible();
  const moduleLinks = getFormateurExplicitModuleLinks(formateur);
  const hasModuleFormations = moduleLinks.length > 0;

  const reassuranceSecond = parcoursVisible
    ? '2 formations prévues en 2027'
    : 'Spécialiste devis et appels d’offres BTP';

  const heroPrimary = hasModuleFormations
    ? {
        href: `#${THOMAS_FORMATIONS_SECTION_ID}`,
        label: 'Découvrir ses formations',
      }
    : {
        href: LINKS.formations,
        label: 'Voir le catalogue des formations',
      };

  return (
    <main className="min-w-0">
      <JsonLd
        id="schema-thomas-garnier-profile"
        schema={getThomasGarnierPageJsonLd(formateur, base)}
      />

      <FormateurProfileHeroSection
        formateur={formateur}
        h1Id="thomas-garnier-h1"
        enBrefId="thomas-en-bref"
        enBrefText={THOMAS_GARNIER_EN_BREF}
        badge="Formateur — chiffrage et appels d’offres BTP"
        h1="Thomas Garnier — Formateur en devis, chiffrage et appels d’offres BTP"
        tagline="Chiffrez juste. Structurez vos offres. Démarquez-vous."
        introParagraphs={[
          "Fort de 12 ans d'expérience en tant que chargé d'affaires dans le bâtiment, Thomas Garnier accompagne les professionnels du BTP dans la construction de leurs devis, l'analyse des dossiers de consultation et la préparation de leurs réponses commerciales.",
          "Son approche s'appuie sur les réalités du métier : maîtrise des coûts, compréhension des exigences clients et structuration des offres techniques.",
        ]}
        primaryCta={heroPrimary}
        visioCta={
          <CtaVisio
            src="formateur-thomas-garnier-hero"
            variant="secondary"
            className="inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold"
            title="Échanger sur votre projet"
          />
        }
      />

      <FormateurProfileReassuranceStrip
        items={[
          "12 ans d'expérience en gestion d'affaires BTP",
          reassuranceSecond,
          'Présentiel en Île-de-France',
        ]}
      />

      <FormateurProfileExpertiseSection
        headingId="thomas-expertise-heading"
        title="Une expertise commerciale ancrée dans les réalités du BTP"
        intro="Dans une PME du BTP, la qualité du chiffrage et la pertinence des réponses commerciales sont déterminantes pour la rentabilité des chantiers et le développement de l'activité."
        cards={THOMAS_EXPERTISE_CARDS}
        icons={EXPERTISE_ICONS}
        cardsGridClassName="sm:grid-cols-2 lg:grid-cols-4"
      />

      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="thomas-problematiques-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="thomas-problematiques-heading" className={OFC_TYPE_H2}>
            Des formations conçues pour répondre aux enjeux des PME du BTP
          </h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-base text-slate-700">
            {THOMAS_PROBLEMATIQUES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={`${OFC_TYPE_BODY} mt-6 text-ofc-ink-muted`}>
            Les formations de Thomas Garnier visent à structurer les méthodes de travail et à
            renforcer la qualité des réponses commerciales des entreprises du BTP.
          </p>
        </div>
      </section>

      <FormateurProfileModuleFormationsSection
        sectionId={THOMAS_FORMATIONS_SECTION_ID}
        headingId="thomas-formations-heading"
        title="Les formations de Thomas Garnier pour les PME du BTP"
        tone="white"
        moduleLinks={moduleLinks}
        cardContentByCode={THOMAS_MODULE_FORMATION_CARDS}
        introNote={hasModuleFormations ? 'Ouverture prévue en 2027.' : undefined}
        extraMetaLines={MODULE_META_LINES}
      />

      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="thomas-parcours-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="thomas-parcours-heading" className={OFC_TYPE_H2}>
            12 ans au cœur de la gestion d&apos;affaires dans le bâtiment
          </h2>
          <ol className="relative mt-8 space-y-8 border-slate-200 pl-0">
            {formateur.experiences?.map((step, index) => {
              const isChargeAffaires = index === 0 && step.periode === '12 ans';
              return (
                <li key={step.titre} className={FORMATEUR_PROFILE_TIMELINE_ITEM}>
                  <span className={FORMATEUR_PROFILE_TIMELINE_DOT} aria-hidden />
                  <h3 className="font-display text-lg font-bold text-[#101936]">
                    {isChargeAffaires
                      ? `Chargé d’affaires BTP — ${step.periode}`
                      : step.periode
                        ? `${step.titre} — ${step.periode}`
                        : step.titre}
                  </h3>
                  {isChargeAffaires ? (
                    <>
                      <p className="mt-2 text-base leading-relaxed text-slate-600">
                        Expérience acquise au sein d&apos;entreprises du bâtiment :
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-slate-600">
                        {THOMAS_CHARGEAFFAIRES_ACTIVITES.map((label) => (
                          <li key={label}>{label}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="mt-2 text-base leading-relaxed text-slate-600">{step.detail}</p>
                  )}
                </li>
              );
            })}
          </ol>
          {formateur.formationsProfessionnelles &&
          formateur.formationsProfessionnelles.length > 0 ? (
            <div className="mt-8 rounded-lg border border-slate-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-[#101936]">Formations professionnelles</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {formateur.formationsProfessionnelles.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
        aria-labelledby="thomas-public-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="thomas-public-heading" className={OFC_TYPE_H2}>
            À qui s&apos;adressent les formations de Thomas Garnier ?
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {THOMAS_PUBLIC_CIBLE.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-slate-200/90 bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#101936]"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base text-slate-600">{MODALITE_POSITIONNEMENT}</p>
        </div>
      </section>

      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="thomas-maillage-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="thomas-maillage-heading" className={OFC_TYPE_H2}>
            Développez les compétences commerciales de votre équipe
          </h2>
          <p className={`${OFC_TYPE_BODY} mt-3 max-w-3xl text-ofc-ink-muted`}>
            Les modules de Thomas Garnier complètent le catalogue IA animé par l&apos;équipe Laure
            Olivié — formations distinctes, même organisme Qualiopi.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {THOMAS_FORMATIONS_OFC_LINKS.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm transition-colors hover:border-[#377CF3]/40"
                >
                  <span className="font-display text-base font-bold text-[#101936]">
                    {card.label}
                  </span>
                  <span className="mt-2 text-sm text-slate-600">{card.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <h3 className="font-display text-lg font-bold text-[#101936]">Guides et ressources</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {THOMAS_GUIDES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`${OFC_LINK} text-sm font-semibold`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQSectionServer
        id="thomas-faq"
        title="Questions fréquentes sur Thomas Garnier et ses formations BTP"
        items={getThomasGarnierFaqItems()}
        layout="wide"
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
      />

      <section
        className="bg-[#377CF3] py-10 md:py-12"
        aria-labelledby="thomas-cta-final-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl text-center text-white`}>
          <h2 id="thomas-cta-final-heading" className="font-display text-2xl font-bold text-pretty">
            Renforcez la performance commerciale de votre PME du BTP
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/95">
            Vous souhaitez structurer vos devis, améliorer vos mémoires techniques ou développer les
            compétences de vos chargés d&apos;affaires ? Échangeons sur les besoins de votre
            entreprise.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CtaDevis
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-2.5 text-base font-semibold text-[#377CF3] hover:bg-slate-50"
            />
            <CtaVisio
              src="formateur-thomas-garnier-fin"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-white px-6 py-2.5 text-base font-semibold text-white hover:bg-white/10"
              title="Échanger sur votre projet"
            />
          </div>
          <p className="mt-6">
            <Link
              href={LINKS.formateurs}
              className="text-sm font-medium text-white/90 underline-offset-2 hover:underline"
            >
              Découvrir tous nos formateurs
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}