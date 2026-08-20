import Link from 'next/link';
import { FormationCityPage } from '@/components/formations/FormationCityPage';
import { MORANGIS } from '@/lib/formation-cities';
import { FAQ_FORMATION_VILLE } from '@/lib/faq';
import { createPageMetadata, getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { formationHref, getFormationByCode } from '@/data/formations';

export const revalidate = 3600;
// ISR : HTML mis en cache au edge et revalidé toutes les heures (3600 s)

const CATALOGUE_NIV01 = getFormationByCode('NIV-01')!;

export const metadata = createPageMetadata({
  title: 'Formation IA Morangis (91) — ChatGPT',
  description:
    'Formation IA pour le BTP à Morangis et en Essonne (91) : devis, emails, ChatGPT en 4h. Qualiopi, Constructys. Visio découverte gratuite.',
  path: '/formations/ia-btp-morangis',
  keywords: [
    'formation IA pour le BTP Morangis',
    'formation ChatGPT BTP 91',
    'formation IA Essonne',
    'formation IA pour les pros du BTP Les Ulis',
    'formation IA appliquée au bâtiment Longjumeau',
    'OPCO Constructys Essonne',
    'formation IA bâtiment — organisme certifié Qualiopi 91',
  ],
});

const courseSchema = getCourseSchema({
  name: CATALOGUE_NIV01.titre,
  description: CATALOGUE_NIV01.accroche,
  path: formationHref(CATALOGUE_NIV01),
  providerName: SITE_CONFIG.legalName,
  courseCode: CATALOGUE_NIV01.code,
  areaServed: MORANGIS.areaServed,
});

const faqSchema = getFAQSchema(FAQ_FORMATION_VILLE);

export default function FormationIABTPMorangisPage() {
  return (
    <FormationCityPage
      config={MORANGIS}
      courseSchema={courseSchema}
      faqSchema={faqSchema}
      faqItems={FAQ_FORMATION_VILLE}
      afterHero={
        <section className="border-b border-slate-200 bg-slate-50 px-4 py-8">
          <div className="mx-auto max-w-4xl text-center text-sm text-slate-700 md:text-base">
            Ville voisine :{' '}
            <Link href={LINKS.formationLongjumeau} className="font-semibold text-[var(--accent)] hover:underline">
              formation IA pour les pros du BTP à Longjumeau
            </Link>
            {' · '}
            <Link href={LINKS.claudeAiBtp} className="font-semibold text-[var(--accent)] hover:underline">
              guide Claude AI BTP
            </Link>
          </div>
        </section>
      }
    />
  );
}
