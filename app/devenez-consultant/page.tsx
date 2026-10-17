import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CareerApplicationForm } from '@/components/career/CareerApplicationForm';
import { ConsultantCatalogueByLevel } from '@/components/career/ConsultantCatalogueByLevel';
import { LINKS } from '@/lib/internal-links';
import { PERIMETRE_FORMATIONS_COURT } from '@/lib/tarifs-sessions';
import { OFC_CTA_PRIMARY, OFC_EYEBROW, OFC_TYPE_HERO } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const SOURCE_PAGE = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.devenezConsultant}`;

export const metadata = createPageMetadata({
  title: 'Devenez consultant-formateur IA BTP',
  description:
    'Proposez votre expertise BTP et votre pratique de l’IA pour animer des formations en présentiel en Île-de-France. Formulaire de candidature consultant OFC.',
  path: LINKS.devenezConsultant,
  keywords: ['consultant formateur BTP', 'intervenant formation IA', 'formateur indépendant BTP'],
});

const EXPERTISE_ITEMS = [
  'Conduite de travaux et gestion de chantier',
  'Études de prix et réponses aux appels d’offres',
  'Bureau d’études et maîtrise d’œuvre',
  'Gestion administrative et commerciale',
  'Direction d’entreprise BTP',
] as const;

const COMPETENCES = [
  'Expérience professionnelle pertinente dans le bâtiment ou les travaux publics.',
  'Capacité à expliquer simplement et à animer des exercices pratiques.',
  'Pratique concrète de ChatGPT ou Claude dans votre activité.',
  'Adaptation des cas pratiques au public formé.',
  'Vérification systématique des productions de l’IA.',
  'Respect de la confidentialité des documents utilisés en formation.',
] as const;

export default function DevenezConsultantPage() {
  return (
    <div>
      <section className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false })}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <Breadcrumb
            className="mb-4 text-sm"
            items={[
              { label: 'Accueil', href: LINKS.home },
              { label: 'Devenez consultant', href: LINKS.devenezConsultant },
            ]}
          />
          <p className={OFC_EYEBROW}>Carrière</p>
          <h1 className={`${OFC_TYPE_HERO} mt-2`}>Devenez consultant-formateur en IA BTP</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
            Vous connaissez les réalités du bâtiment et des travaux publics et utilisez l’IA dans
            votre pratique professionnelle ? Présentez-nous votre expertise et vos propositions
            d’intervention.
          </p>
          <Link
            href="#candidature"
            className={`${OFC_CTA_PRIMARY} mt-6 inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-base font-semibold`}
          >
            Proposer mon expertise
          </Link>
        </div>
      </section>

      <section className={ofcSectionClasses({ tone: 'muted', size: 'default' })}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl space-y-12`}>
          <section aria-labelledby="expertise-metier-heading">
            <h2
              id="expertise-metier-heading"
              className="font-display text-xl font-bold text-slate-900 md:text-2xl"
            >
              Votre expertise métier
            </h2>
            <p className="mt-3 text-slate-600">
              Nous accueillons des propositions d’intervention sur les domaines suivants — ce ne
              sont pas des postes ouverts, mais des expertises que vous pouvez présenter.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              {EXPERTISE_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="sujets-intervention-heading">
            <h2
              id="sujets-intervention-heading"
              className="font-display text-xl font-bold text-slate-900 md:text-2xl"
            >
              Les sujets sur lesquels intervenir
            </h2>
            <p className="mt-3 text-slate-600">
              Formations du catalogue OFC — indiquez dans le formulaire celles sur lesquelles vous
              souhaitez intervenir.
            </p>
            <ConsultantCatalogueByLevel />
          </section>

          <section aria-labelledby="competences-heading">
            <h2
              id="competences-heading"
              className="font-display text-xl font-bold text-slate-900 md:text-2xl"
            >
              Les compétences attendues
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              {COMPETENCES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cadre-heading">
            <h2
              id="cadre-heading"
              className="font-display text-xl font-bold text-slate-900 md:text-2xl"
            >
              Le cadre des interventions
            </h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Les formations sont animées en présentiel — {PERIMETRE_FORMATIONS_COURT}. Les modalités
              d’intervention sont étudiées selon votre expertise, vos disponibilités et les besoins
              des formations.
            </p>
          </section>

          <p className="text-sm text-slate-600">
            Vous recherchez un emploi salarié ? Consultez la page{' '}
            <Link href={LINKS.emplois} className="font-medium text-[#377CF3] underline">
              Emplois
            </Link>
            .
          </p>
        </div>
      </section>

      <section
        id="candidature"
        className={`${ofcSectionClasses({ tone: 'white', size: 'default' })} scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]`}
        aria-labelledby="candidature-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="candidature-heading" className="font-display text-xl font-bold text-slate-900">
            Proposer mon expertise
          </h2>
          <div className="ofc-card mt-6 p-5 sm:p-8">
            <CareerApplicationForm
              kind="consultant"
              sourcePage={SOURCE_PAGE}
              submitLabel="Envoyer ma proposition"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
