import Link from 'next/link';
import { Calculator, FileSearch, Scale, Table2 } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { FormationCourseHero } from '@/components/formations/FormationCourseHero';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import {
  ETUDES_PRIX_CAS_USAGE,
  ETUDES_PRIX_EN_BREF,
  ETUDES_PRIX_FAQ,
  ETUDES_PRIX_MAILLAGE,
  ETUDES_PRIX_SEO,
  ETUDES_PRIX_CHIFFRAGE_PATH,
} from '@/lib/formation-ia-etudes-prix-chiffrage-btp-content';

const CAS_ICONS = [FileSearch, Table2, Scale, Calculator] as const;

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

  return (
    <div>
      <JsonLd id="schema-faq-etudes-prix" schema={faqSchema} />

      <FormationCourseHero
        refLine="Études de prix · Chiffrage · Présentiel IDF · Qualiopi"
        title={ETUDES_PRIX_SEO.h1}
        subtitle="DPGF, métrés, BPU et quantitatifs — l’IA assiste, le métreur valide"
        badges={['Métreurs & économistes', 'Chargés d’affaires', 'Cas concrets']}
        summaryItems={[...ETUDES_PRIX_EN_BREF]}
        ctas={
          <>
            <RdvLink
              campaign="formations-etudes-prix-hero"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600"
            >
              Prendre rendez-vous
            </RdvLink>
            <Link
              href={LINKS.formationAO}
              className="rounded-xl border-2 border-slate-200 px-6 py-3.5 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Voir la fiche NIV-02
            </Link>
          </>
        }
        footerLinks={
          <>
            <a href="#cas-usage" className="font-medium text-[var(--accent)] hover:underline">
              Cas d&apos;usage
            </a>
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

      <div className="mx-auto max-w-4xl px-4 py-16">
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

        <FAQSection
          items={[...ETUDES_PRIX_FAQ]}
          title="Questions fréquentes — Études de prix et IA"
          subtitle="Responsabilité métier, fiche catalogue, financement."
        />

        <div className="mt-10">
          <RdvLink className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white hover:bg-blue-700">
            Cadrer votre besoin en visio découverte
          </RdvLink>
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
