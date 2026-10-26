import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CareerApplicationForm } from '@/components/career/CareerApplicationForm';
import {
  candidatureSpontaneeRecruitmentMailtoHref,
  RECRUITMENT,
} from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY, OFC_EYEBROW, OFC_TYPE_HERO } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const SOURCE_PAGE = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.candidaturesSpontanees}`;
const MAILTO_RECRUTEMENT = candidatureSpontaneeRecruitmentMailtoHref();

export const metadata = createPageMetadata({
  title: 'Candidature spontanée — Laure Olivié',
  description:
    'Déposez une candidature spontanée auprès de Laure Olivié : emploi, stage, alternance ou collaboration. Formation IA BTP en Île-de-France (employeur : OFC Création d’Entreprise).',
  path: LINKS.candidaturesSpontanees,
  keywords: ['candidature spontanée', 'recrutement organisme formation', 'OFC Guyancourt'],
});

export default function CandidaturesSpontaneesPage() {
  return (
    <div>
      <section className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false })}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <Breadcrumb
            className="mb-4 text-sm"
            items={[
              { label: 'Accueil', href: LINKS.home },
              { label: 'Candidature spontanée', href: LINKS.candidaturesSpontanees },
            ]}
          />
          <p className={OFC_EYEBROW}>Carrière</p>
          <h1 className={`${OFC_TYPE_HERO} mt-2`}>Présentez-nous votre candidature spontanée</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
            Vous souhaitez contribuer au développement de notre organisme ? Présentez votre
            parcours, vos compétences et le type de collaboration recherché. Vous pouvez aussi
            nous écrire à{' '}
            <a
              href={MAILTO_RECRUTEMENT}
              className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              {RECRUITMENT.email}
            </a>
            .
          </p>
          <p className="mt-4">
            <a
              href={MAILTO_RECRUTEMENT}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
              aria-label={`Envoyer une candidature spontanée par email à ${RECRUITMENT.email}`}
            >
              {RECRUITMENT.email}
            </a>
          </p>
        </div>
      </section>

      <section className={ofcSectionClasses({ tone: 'muted', size: 'default' })}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <p className="mb-5 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
            Complétez le formulaire ci-dessous ou envoyez votre CV et votre présentation à{' '}
            <a
              href={MAILTO_RECRUTEMENT}
              className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              {RECRUITMENT.email}
            </a>
            .
          </p>
          <div className="ofc-card p-5 sm:p-8">
            <CareerApplicationForm
              kind="spontaneous"
              sourcePage={SOURCE_PAGE}
              submitLabel="Envoyer ma candidature"
              showFormationCheckboxes={false}
            />
          </div>
          <p className="mt-8 text-sm text-slate-600">
            Voir aussi :{' '}
            <Link href={LINKS.emplois} className="font-medium text-[#377CF3] underline">
              Emplois
            </Link>
            {' · '}
            <Link href={LINKS.devenezConsultant} className="font-medium text-[#377CF3] underline">
              Devenez consultant
            </Link>
            {' · '}
            <Link href={LINKS.formations} className="font-medium text-[#377CF3] underline">
              Formations
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
