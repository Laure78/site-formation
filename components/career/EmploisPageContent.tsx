import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  FileText,
  UserPlus,
} from 'lucide-react';
import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import { JobOffersSection } from '@/components/career/JobOffersSection';
import { NousRejoindreFormateurRecruitment } from '@/components/career/NousRejoindreFormateurRecruitment';
import { ScrollToHashOnLoad } from '@/components/navigation/ScrollToHashOnLoad';
import { NOUS_REJOINDRE_RECRUTEMENT_FAQ } from '@/lib/consultant-recruitment-content';
import { emploisRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { getPublishedJobOffers } from '@/lib/data/job-offers';
import { RECRUITMENT_PAGE_INNER } from '@/lib/devenez-consultant-layout';
import { LINKS } from '@/lib/internal-links';
import { OFC_TYPE_BODY } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';

export function EmploisPageContent() {
  const offers = getPublishedJobOffers();
  const hasOffers = offers.length > 0;

  return (
    <div className="emplois-page min-w-0">
      <ScrollToHashOnLoad />
      <NousRejoindreFormateurRecruitment />

      <section
        className={`${ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })} emplois-page__bottom`}
        aria-labelledby="recrutement-faq-title"
      >
        <div className={`${RECRUITMENT_PAGE_INNER} grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,22rem)] lg:gap-12 xl:gap-14`}>
          <FAQAccordion
            id="recrutement-faq"
            title="Questions fréquentes"
            subtitle="Missions indépendantes, sélection et candidatures formateur IA BTP."
            items={NOUS_REJOINDRE_RECRUTEMENT_FAQ}
          />

          <aside
            className="emplois-page__salarie min-w-0 space-y-4"
            aria-labelledby="emplois-salarie-heading"
          >
            <h2 id="emplois-salarie-heading" className="font-display text-xl font-bold text-slate-900">
              Emploi salarié et autres candidatures
            </h2>
            <p className={`${OFC_TYPE_BODY} max-w-none text-sm text-ofc-ink-muted`}>
              Distinct du recrutement de formateurs indépendants pour le catalogue 2027.
            </p>

            <div className="space-y-3">
              <EmploisPathCard
                href="#job-offers-heading"
                icon={Briefcase}
                title="Nos offres d’emploi"
                description={
                  hasOffers
                    ? 'Consultez les postes salariés publiés au sein de l’organisme.'
                    : 'Aucune offre salariée publiée pour le moment — contactez-nous ou déposez une candidature spontanée.'
                }
                linkLabel="Voir les offres"
              />
              <EmploisPathCard
                href={LINKS.candidaturesSpontanees}
                icon={UserPlus}
                title="Candidature spontanée"
                description="Vous recherchez un emploi salarié ? Présentez votre parcours et le type de poste visé."
                linkLabel="Envoyer une candidature"
              />
              <EmploisPathCard
                href={LINKS.devenezConsultant}
                icon={FileText}
                title="Formulaire formateur indépendant"
                description="Questionnaire de candidature consultant-formateur IA BTP (catalogue 2027)."
                linkLabel="Accéder au formulaire"
                external={false}
              />
            </div>

            <p className={`${OFC_TYPE_BODY} max-w-none pt-2 text-sm text-ofc-ink-muted`}>
              Emploi salarié :{' '}
              <a
                href={emploisRecruitmentMailtoHref()}
                className="break-all font-semibold text-[#377CF3] underline-offset-2 hover:underline"
              >
                {RECRUITMENT.email}
              </a>
            </p>
          </aside>
        </div>

        <div className={`${RECRUITMENT_PAGE_INNER} mt-10 min-w-0 border-t border-slate-200/80 pt-8`}>
          <JobOffersSection compactEmpty={!hasOffers} />
        </div>
      </section>
    </div>
  );
}

function EmploisPathCard({
  href,
  icon: Icon,
  title,
  description,
  linkLabel,
  external = false,
}: {
  href: string;
  icon: typeof Briefcase;
  title: string;
  description: string;
  linkLabel: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <Icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
      <h3 className="mt-3 font-display text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#377CF3]">
        {linkLabel}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </>
  );

  const className =
    'ofc-card flex flex-col rounded-xl border border-slate-200/90 bg-white p-5 motion-safe:transition-shadow motion-safe:duration-200 hover:shadow-md';

  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
