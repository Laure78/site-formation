import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import {
  CAREER_FORM_SUCCESS,
  CAREER_FORM_SUCCESS_FOLLOWUP,
} from '@/lib/career-form-validation';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

const PAGE_PATH = LINKS.devenezConsultantMerci;
const PAGE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PAGE_PATH}`;

const BREADCRUMB_JSON_LD = [
  { name: 'Accueil', url: SITE_CONFIG.url },
  { name: 'Devenez consultant', url: `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.devenezConsultant}` },
  { name: 'Candidature envoyée', url: PAGE_URL },
] as const;

export const metadata = createPageMetadata({
  title: 'Candidature envoyée — consultant-formateur',
  description:
    'Votre proposition de collaboration consultant-formateur IA BTP a bien été transmise à OFC Création d’Entreprise.',
  path: PAGE_PATH,
  robots: { index: false, follow: false },
});

export default function DevenezConsultantMerciPage() {
  return (
    <div className="ofc-page-article ofc-page-article--narrow">
      <BreadcrumbJsonLd
        items={[...BREADCRUMB_JSON_LD]}
        id="schema-breadcrumb-devenez-consultant-merci"
      />

      <div
        className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 text-center sm:p-10"
        role="status"
      >
        <h1 className="font-display text-2xl font-bold text-slate-900 md:text-[1.75rem]">
          Candidature envoyée
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-slate-900">
          {CAREER_FORM_SUCCESS}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
          {CAREER_FORM_SUCCESS_FOLLOWUP}
        </p>
      </div>

      <p className="mt-10 text-center text-sm text-slate-600">
        <Link href={LINKS.devenezConsultant} className="font-medium text-[#377CF3] underline">
          Retour à la page consultant-formateur
        </Link>
        {' · '}
        <Link href={LINKS.nousRejoindre} className="font-medium text-[#377CF3] underline">
          Nous rejoindre
        </Link>
      </p>
    </div>
  );
}
