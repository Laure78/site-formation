import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CareerEncart } from '@/components/career/CareerEncart';
import { JobOffersSection } from '@/components/career/JobOffersSection';
import { LINKS } from '@/lib/internal-links';
import { OFC_EYEBROW, OFC_TYPE_HERO } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { createPageMetadata } from '@/lib/seo';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: 'Emplois — rejoindre Laure Olivié',
  description:
    'Offres d’emploi pour rejoindre l’équipe Laure Olivié : formation IA pour les professionnels du BTP en présentiel en Île-de-France. Candidature spontanée possible.',
  path: LINKS.emplois,
  keywords: ['emploi formation BTP', 'recrutement organisme formation', 'OFC Guyancourt'],
});

const HERO_SECTION = ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false, divide: false });

export default function EmploisPage() {
  return (
    <div>
      <section className={HERO_SECTION}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <Breadcrumb
            className="mb-4 text-sm"
            items={[
              { label: 'Accueil', href: LINKS.home },
              { label: 'Emplois', href: LINKS.emplois },
            ]}
          />
          <p className={OFC_EYEBROW}>Carrière</p>
          <h1 className={`${OFC_TYPE_HERO} mt-2`}>Rejoignez l’équipe Laure Olivié</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
            Contribuez à la formation des professionnels du bâtiment et des travaux publics aux
            usages concrets de l’intelligence artificielle.
          </p>
        </div>
      </section>

      <section className={ofcSectionClasses({ tone: 'muted', size: 'default' })}>
        <div className={`${OFC_SECTION_INNER} max-w-4xl`}>
          <JobOffersSection />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <CareerEncart
              title="Vous souhaitez intervenir comme consultant-formateur ?"
              buttonLabel="Proposer mon expertise"
              buttonHref={LINKS.devenezConsultant}
            >
              Présentez votre expertise BTP, votre pratique de l’IA et les sujets que vous
              souhaitez transmettre.
            </CareerEncart>
            <CareerEncart
              title="Candidature spontanée"
              buttonLabel="Envoyer une candidature spontanée"
              buttonHref={LINKS.candidaturesSpontanees}
            >
              Aucune offre ne correspond à votre profil ? Présentez votre parcours et le type de
              collaboration recherché.
            </CareerEncart>
          </div>

          <p className="mt-10 text-sm text-slate-600">
            Découvrez aussi le{' '}
            <Link href={LINKS.formations} className="font-medium text-[#377CF3] underline">
              catalogue des formations IA BTP
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
