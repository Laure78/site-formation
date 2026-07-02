import Link from 'next/link';
import { FormationCityPage } from '@/components/formations/FormationCityPage';
import { LONGJUMEAU } from '@/lib/formation-cities';
import { FAQ_FORMATION_VILLE } from '@/lib/faq';
import { createPageMetadata, getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';

export const revalidate = 3600;
// ISR : HTML mis en cache au edge et revalidé toutes les heures (3600 s)

export const metadata = createPageMetadata({
  title: 'Formation IA Longjumeau (91) — ChatGPT',
  description:
    'Formation IA pour le BTP à Longjumeau et en Essonne (91) : devis, emails, ChatGPT en 4h. Qualiopi, Constructys. Visio découverte gratuite.',
  path: '/formations/ia-btp-longjumeau',
  keywords: [
    'formation IA pour les pros du BTP Longjumeau',
    'formation ChatGPT BTP 91',
    'formation IA Essonne',
    'formation IA pour les pros du BTP Morangis',
    'formation IA appliquée au bâtiment Les Ulis',
    'OPCO Constructys Essonne',
    'Qualiopi formation IA bâtiment 91',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Formation IA pour le BTP à Longjumeau',
  description:
    "Formation IA pour entreprises du BTP à Longjumeau et en Essonne (91). Devis, emails, appels d'offres, administratif. Qualiopi · Constructys · Île-de-France.",
  path: '/formations/ia-btp-longjumeau',
  providerName: SITE_CONFIG.legalName,
  areaServed: LONGJUMEAU.areaServed,
});

const faqSchema = getFAQSchema(FAQ_FORMATION_VILLE);

export default function FormationIABTPLongjumeauPage() {
  return (
    <FormationCityPage
      config={LONGJUMEAU}
      courseSchema={courseSchema}
      faqSchema={faqSchema}
      faqItems={FAQ_FORMATION_VILLE}
      afterHero={
        <section className="border-b border-slate-200 bg-slate-50 px-4 py-8">
          <div className="mx-auto max-w-4xl text-center text-sm text-slate-700 md:text-base">
            Ville voisine :{' '}
            <Link href={LINKS.formationMorangis} className="font-semibold text-[var(--accent)] hover:underline">
              formation IA pour les pros du BTP à Morangis
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
