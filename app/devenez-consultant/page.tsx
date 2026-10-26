import Link from 'next/link';
import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import { CareerApplicationForm } from '@/components/career/CareerApplicationForm';
import { ConsultantCompetenceSection } from '@/components/career/ConsultantCompetenceSection';
import { ConsultantExpertiseCards } from '@/components/career/ConsultantExpertiseCards';
import { ConsultantParcoursMetiersSection } from '@/components/career/ConsultantFormationsSection';
import { ConsultantRecruitmentHero } from '@/components/career/ConsultantRecruitmentHero';
import { ConsultantSelectionTimeline } from '@/components/career/ConsultantSelectionTimeline';
import { ConsultantWhyOfcSection } from '@/components/career/ConsultantWhyOfcSection';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { CONSULTANT_FAQ_ITEMS } from '@/lib/consultant-recruitment-content';
import { LINKS } from '@/lib/internal-links';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const SOURCE_PAGE = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.devenezConsultant}`;

const BREADCRUMB_JSON_LD = [
  { name: 'Accueil', url: SITE_CONFIG.url },
  { name: 'Devenez consultant', url: SOURCE_PAGE },
] as const;

export const metadata = createPageMetadata({
  title: 'Devenez consultant-formateur IA BTP',
  description:
    'Expert du BTP et utilisateur de l’IA ? Proposez votre expertise pour animer les parcours métiers IA en présentiel en Île-de-France. Formulaire en ligne.',
  path: LINKS.devenezConsultant,
  keywords: [
    'formateur indépendant IA BTP',
    'consultant-formateur IA BTP',
    'devenir formateur IA BTP',
    'formateur IA bâtiment',
    'formateur ChatGPT BTP',
    'collaboration formateur indépendant Île-de-France',
  ],
});

export default function DevenezConsultantPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[...BREADCRUMB_JSON_LD]} id="schema-breadcrumb-devenez-consultant" />

      <ConsultantRecruitmentHero />
      <ConsultantWhyOfcSection />
      <ConsultantExpertiseCards />
      <ConsultantCompetenceSection />
      <ConsultantParcoursMetiersSection />
      <ConsultantSelectionTimeline />

      <section
        id="candidature"
        className={`${ofcSectionClasses({ tone: 'white', size: 'compact' })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
        aria-labelledby="candidature-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-4xl`}>
          <h2 id="candidature-heading" className={OFC_TYPE_H2}>
            Présentez votre expertise à OFC
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Complétez ce formulaire pour nous présenter votre parcours et vos domaines
            d&apos;intervention. Vous pouvez aussi envoyer votre candidature à{' '}
            <a
              href={formateurRecruitmentMailtoHref()}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              {RECRUITMENT.email}
            </a>
            .
          </p>
          <div className="ofc-card mt-5 p-5 sm:p-6">
            <CareerApplicationForm
              kind="consultant"
              sourcePage={SOURCE_PAGE}
              submitLabel="Envoyer ma proposition"
              groupedLayout
            />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Vous recherchez un{' '}
            <Link href={LINKS.emplois} className="font-medium text-[#377CF3] underline">
              emploi salarié
            </Link>{' '}
            ou souhaitez une{' '}
            <Link
              href={LINKS.candidaturesSpontanees}
              className="font-medium text-[#377CF3] underline"
            >
              candidature spontanée
            </Link>{' '}
            ?
          </p>
        </div>
      </section>

      <section className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}>
        <div className={`${OFC_SECTION_INNER} max-w-4xl`}>
          <FAQAccordion
            title="Questions fréquentes — consultant-formateur IA BTP"
            subtitle="Réponses courtes pour préparer votre proposition."
            items={CONSULTANT_FAQ_ITEMS}
          />
        </div>
      </section>
    </div>
  );
}
