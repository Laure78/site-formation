import Link from 'next/link';
import { Check, Download, Sparkles } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ChecklistLeadMagnet } from '@/components/checklist/ChecklistLeadMagnet';
import { FAQSection } from '@/components/landing/FAQSection';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { JsonLd } from '@/components/JsonLd';
import { FAQ_CHECKLIST_IA_BTP } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import {
  buildMetadata,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

export const revalidate = 3600;

const PATH = LINKS.checklist;
const BASE = SITE_CONFIG.url.replace(/\/$/, '');
const CANONICAL = `${BASE}${PATH}`;

const META_TITLE = 'Checklist 10 prompts ChatGPT BTP gratuite';
const META_DESCRIPTION =
  'Checklist IA pour le BTP : 10 prompts ChatGPT gratuits (devis, emails, CR) par Laure Olivié. Qualiopi, présentiel IDF. Téléchargez et réservez une visio.';

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  keywords: [
    'checklist ChatGPT BTP',
    'prompts IA BTP',
    'prompts ChatGPT bâtiment',
    'formation IA pour le BTP',
    'ChatGPT devis BTP',
    'IA compte rendu chantier',
  ],
  openGraphType: 'website',
  image: {
    url: PHOTOS.formationSensibilisationAssistantsIaBtp2026.src,
    width: PHOTOS.formationSensibilisationAssistantsIaBtp2026.width,
    height: PHOTOS.formationSensibilisationAssistantsIaBtp2026.height,
    alt: PHOTOS.formationSensibilisationAssistantsIaBtp2026.alt,
  },
});

const PROMPT_THEMES = [
  { title: 'Emails & relances clients', desc: 'Réponses pro en moins d’une minute, ton métier BTP.' },
  { title: 'Devis & chiffrage', desc: 'Structurer un devis à partir d’un brief ou de notes terrain.' },
  { title: 'Comptes rendus de chantier', desc: 'Passer de notes brutes à un CR clair et actionnable.' },
  { title: 'Avis Google & LinkedIn', desc: 'Répondre aux avis et publier sans partir d’une page blanche.' },
] as const;

const faqSchema = getFAQSchema(FAQ_CHECKLIST_IA_BTP);

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${CANONICAL}#webpage`,
      url: CANONICAL,
      name: META_TITLE,
      description: META_DESCRIPTION,
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', name: SITE_CONFIG.name, url: BASE },
      about: { '@type': 'Thing', name: 'ChatGPT et IA générative pour le BTP' },
    },
    {
      '@type': 'LearningResource',
      '@id': `${CANONICAL}#resource`,
      name: 'Checklist gratuite — 10 prompts ChatGPT pour le BTP',
      description:
        'Liste de 10 prompts ChatGPT prêts à l’emploi pour devis, emails, comptes rendus de chantier et administratif — destinée aux professionnels du bâtiment et des travaux publics.',
      url: CANONICAL,
      inLanguage: 'fr-FR',
      learningResourceType: 'Checklist',
      isAccessibleForFree: true,
      educationalLevel: 'beginner',
      about: [
        { '@type': 'Thing', name: 'ChatGPT BTP' },
        { '@type': 'Thing', name: 'Formation IA pour le BTP' },
        { '@type': 'Thing', name: 'Productivité administrative chantier' },
      ],
      audience: {
        '@type': 'Audience',
        audienceType: 'Dirigeants PME BTP, conducteurs de travaux, fonctions support',
      },
      author: {
        '@type': 'Person',
        name: SITE_CONFIG.name,
        url: `${BASE}${LINKS.aPropos}`,
      },
      provider: {
        '@type': 'Organization',
        name: "OFC Création d'Entreprise",
        url: BASE,
      },
    },
  ],
};

export default function ChecklistIABTPPage() {
  return (
    <div className="min-h-[80vh] bg-[#F8FAFC]">
      <JsonLd id="schema-checklist-webpage" schema={pageJsonLd} />
      <JsonLd id="schema-checklist-faq" schema={faqSchema} />

      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8" aria-labelledby="checklist-ia-btp-h1">
        <div className="mx-auto max-w-5xl space-y-10">
          <ShortAnswerBlock>
            Oui — cette checklist gratuite regroupe <strong>10 prompts ChatGPT</strong> calibrés BTP
            (devis, emails, CR chantier, avis Google). Téléchargez-la, puis approfondissez avec une{' '}
            <strong>formation IA pour le BTP</strong> Qualiopi si vous voulez industrialiser les usages.
          </ShortAnswerBlock>

          <ChecklistLeadMagnet asPageHero />

          <section aria-labelledby="checklist-themes-h2">
            <h2 id="checklist-themes-h2" className="font-display text-2xl font-bold text-slate-900">
              Ce que couvrent les 10 prompts
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROMPT_THEMES.map((theme) => (
                <div
                  key={theme.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <Sparkles className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                  <h3 className="mt-3 font-display text-base font-bold text-slate-900">{theme.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{theme.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <h2 className="font-display text-2xl font-bold text-slate-900">Pourquoi cette checklist ?</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Les dirigeants de PME du BTP, conducteurs de travaux et fonctions support passent des
              heures sur des tâches répétitives : emails clients, avis Google, devis, publications
              LinkedIn. L&apos;IA générative accélère ces écrits — à condition d&apos;utiliser des
              prompts clairs, en vocabulaire chantier. Cette checklist vous donne{' '}
              <strong>10 trames prêtes à coller</strong> dans ChatGPT (ou Claude) pour gagner du temps
              dès aujourd&apos;hui.
            </p>
            <ul className="mt-6 space-y-2 text-slate-700">
              {[
                `${formatProfessionalsTrainedCount()}+ professionnels formés · note `,
                'Prompts conçus pour le terrain BTP (pas du jargon startup)',
                'Complément naturel d’une formation IA pour le BTP Qualiopi (Constructys selon éligibilité)',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" strokeWidth={2.5} aria-hidden />
                  <span className="text-sm leading-relaxed md:text-base">{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-8 md:p-10">
            <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Aller plus loin après la checklist
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Les prompts accélèrent le quotidien. Une session en présentiel vous apprend à les
              adapter à vos dossiers réels (DCE, CR, devis) et à sécuriser la relecture humaine.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={LINKS.formations}
                className="inline-flex items-center rounded-xl bg-[#377CF3] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2d66d6]"
              >
                Catalogue formation IA pour le BTP
              </Link>
              <Link
                href={LINKS.formationIaBtpNiveau1BatimentTp}
                className="inline-flex items-center rounded-xl border border-[#377CF3] bg-white px-5 py-3 text-sm font-semibold text-[#377CF3] hover:bg-white/80"
              >
                Formation niveau 1 — bâtiment &amp; TP
              </Link>
              <RdvLink className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                <Download size={16} strokeWidth={1.75} aria-hidden />
                Visio découverte gratuite
              </RdvLink>
            </div>
            <nav className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Maillage ressources">
              <Link href={LINKS.formationConducteurTravaux} className="font-medium text-[#377CF3] hover:underline">
                IA conducteur de travaux
              </Link>
              <Link href={LINKS.iaDevis} className="font-medium text-[#377CF3] hover:underline">
                IA devis bâtiment
              </Link>
              <Link href={LINKS.blog} className="font-medium text-[#377CF3] hover:underline">
                Blog IA &amp; ChatGPT BTP
              </Link>
              <Link href={LINKS.financement} className="font-medium text-[#377CF3] hover:underline">
                Financement Constructys
              </Link>
              <Link href={LINKS.aPropos} className="font-medium text-[#377CF3] hover:underline">
                Qui est Laure Olivié ?
              </Link>
            </nav>
          </section>

          <FAQSection
            items={FAQ_CHECKLIST_IA_BTP}
            title="Questions fréquentes — Checklist ChatGPT BTP"
            subtitle="Utilisation des prompts, outils IA et suite pédagogique Qualiopi."
          />

          <AllerPlusLoin
            variant="compact"
            links={[
              { href: LINKS.chatgptArtisans, label: 'ChatGPT pour entreprises BTP' },
              { href: LINKS.ressources, label: 'Ressources et tutos IA BTP' },
              { href: LINKS.outilsIaBtp, label: 'Outils IA pour le BTP' },
              { href: LINKS.contact, label: 'Contacter Laure Olivié' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
