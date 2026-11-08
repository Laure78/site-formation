import Link from 'next/link';
import { Calculator, FileSearch, HelpCircle, Scale, Table2 } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { FormationCourseHero } from '@/components/formations/FormationCourseHero';
import { TrainingFormationBreadcrumb } from '@/components/formations/training/TrainingFormationBreadcrumb';
import { TrainingFormationHeroActions } from '@/components/formations/training/TrainingFormationHeroActions';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { CtaDevis } from '@/components/CtaDevis';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { FinancementOpcoEtenduCourtBlock } from '@/components/financement/FinancementOpcoEtenduCourtBlock';
import { isProgrammePdfObsoleteForLegacyCode } from '@/lib/catalogue-2027/pdf-programme';
import { getFormationByCode } from '@/data/formations';
import { trainingDevisHref } from '@/lib/training-page-helpers';
import {
  ETUDES_PRIX_CAS_USAGE,
  ETUDES_PRIX_EN_BREF,
  ETUDES_PRIX_FAQ,
  ETUDES_PRIX_MAILLAGE,
  ETUDES_PRIX_SEO,
  ETUDES_PRIX_CHIFFRAGE_PATH,
} from '@/lib/formation-ia-etudes-prix-chiffrage-btp-content';

const CAS_ICONS = [FileSearch, Table2, Scale, Calculator, HelpCircle] as const;

const BREADCRUMB_PAGE_TITLE = 'IA études de prix et chiffrage BTP';

const CATALOGUE_NIV02 = getFormationByCode('NIV-02')!;
const NIV02_PDF_HREF = isProgrammePdfObsoleteForLegacyCode('NIV-02')
  ? undefined
  : CATALOGUE_NIV02.pdfProgramme;

export const metadata = createPageMetadata({
  title: ETUDES_PRIX_SEO.title,
  description: ETUDES_PRIX_SEO.description,
  descriptionFinal: true,
  path: ETUDES_PRIX_CHIFFRAGE_PATH,
  appendAuthorSuffix: false,
  keywords: [
    'formation IA études de prix BTP',
    'formation IA chiffrage BTP',
    'IA métré économiste construction',
    'DPGF DQE BPU IA',
    'formation IA appels d’offres BTP',
  ],
  openGraphTitle: ETUDES_PRIX_SEO.openGraphTitle,
});

export default function FormationIaEtudesPrixChiffrageBtpPage() {
  const faqSchema = getFAQSchema([...ETUDES_PRIX_FAQ]);
  const devisHref = trainingDevisHref(CATALOGUE_NIV02.titre);

  return (
    <div>
      <JsonLd id="schema-faq-etudes-prix" schema={faqSchema} />

      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-[80rem] px-4 pt-4 sm:px-6 lg:px-8">
          <TrainingFormationBreadcrumb
            formationTitle={BREADCRUMB_PAGE_TITLE}
            formationPath={ETUDES_PRIX_CHIFFRAGE_PATH}
            jsonLdId="schema-breadcrumb-etudes-prix"
          />
        </div>
      </div>

      <FormationCourseHero
        refLine="Études de prix · Chiffrage · Présentiel IDF · Qualiopi"
        title={ETUDES_PRIX_SEO.h1}
        subtitle="DPGF, métrés, BPU et quantitatifs — l’IA assiste, le métreur valide"
        badges={['Métreurs & économistes', 'Bureaux d’études', 'Cas concrets']}
        summaryItems={[...ETUDES_PRIX_EN_BREF]}
        catalogueRef="NIV-02"
        programmePdfAfterHero={false}
        textLink={{
          href: LINKS.formationIaBureauEtudesBtp,
          label: 'Page métier — IA pour bureaux d’études et études de prix',
        }}
        ctas={
          <TrainingFormationHeroActions
            formationTitle={CATALOGUE_NIV02.titre}
            pdfHref={NIV02_PDF_HREF}
            className="w-full sm:flex-row"
          />
        }
        footerLinks={
          <>
            <a href="#cas-usage" className="font-medium text-[var(--accent)] hover:underline">
              Cas d&apos;usage
            </a>
            <Link
              href={LINKS.formationAO}
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              Fiche catalogue NIV-02 (appels d&apos;offres)
            </Link>
            <Link
              href={LINKS.formations}
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              Catalogue des formations
            </Link>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          Pour les <strong>chargés d&apos;études, métreurs, économistes et chargés d&apos;affaires</strong>,
          l&apos;IA accélère la structuration des quantitatifs, la relecture croisée CCTP/DPGF et les
          contrôles de bordereaux — sans remplacer votre responsabilité chiffrage.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
      </FormationCourseHero>

      <div className="ofc-page-article ofc-editorial">
        <section id="cas-usage" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Cas d&apos;usage : IA pour études de prix et chiffrage BTP
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {ETUDES_PRIX_CAS_USAGE.map((item, index) => {
              const Icon = CAS_ICONS[index] ?? Calculator;
              return (
                <div
                  key={item.titre}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">{item.titre}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <FinancementOpcoEtenduCourtBlock className="mt-14" />

        <FAQSection
          items={[...ETUDES_PRIX_FAQ]}
          title="Questions fréquentes — Études de prix et IA"
          subtitle="Responsabilité métier, fiche catalogue, financement."
        />

        <div className="mt-10 flex justify-center">
          <CtaDevis href={devisHref} className="inline-flex min-h-11 items-center justify-center px-8 py-3" />
        </div>

        <RenvoiFicheCatalogue
          programmeRef="NIV-02"
          contexte="pour les études de prix, le chiffrage assisté et les appels d’offres BTP"
        />

        <div className="mt-12">
          <AllerPlusLoin links={[...ETUDES_PRIX_MAILLAGE]} />
        </div>
      </div>
    </div>
  );
}
