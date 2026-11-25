import Link from 'next/link';
import { EnBref } from '@/app/components/EnBref';
import { CtaDevis } from '@/components/CtaDevis';
import { CtaVisio } from '@/components/CtaVisio';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { FormateurIntervenantBlock } from '@/components/formateurs/FormateurIntervenantBlock';
import { FormationPartenairesMention } from '@/components/formations/FormationPartenairesMention';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import { CONDUCTEUR_TRAVAUX_HERO_PROOF_ITEMS, ProofStats } from '@/components/ProofStats';
import { ContentUpdatedLine } from '@/components/seo/ContentUpdatedLine';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import {
  getConducteurFormationChoix,
  CONDUCTEUR_IA_PHASE_ROWS,
  CONDUCTEUR_LANDING_FAQ,
  CONDUCTEUR_LANDING_MAILLAGE,
  CONDUCTEUR_LANDING_PAIN_POINTS,
  conducteurLandingEnBref,
  conducteurLieuFormationParagraph,
} from '@/lib/formation-ia-conducteur-de-travaux-b1-content';
import { buildFormationIaConducteurDeTravauxB1JsonLdGraph } from '@/lib/formation-ia-conducteur-de-travaux-b1-schema';
import {
  CONDUCTEUR_PROMPTS,
  ETUDE_CAS_FFB_CSFE_PARAGRAPHS,
  PROMPTS_SECTION_INTRO,
} from '@/lib/formation-ia-conducteur-de-travaux-extra-content';
import {
  FORMATION_IA_CONDUCTEUR_B1_DESCRIPTION,
  FORMATION_IA_CONDUCTEUR_B1_H1,
  FORMATION_IA_CONDUCTEUR_B1_TITLE,
  FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG,
  FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH,
} from '@/lib/formation-ia-conducteur-de-travaux-landing';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_TITLE = `${FORMATION_IA_CONDUCTEUR_B1_TITLE} | Laure Olivié`;

const GAINS_TACHES_ROWS = [
  ['CR de chantier', '1 h 30', '15 min'],
  ['PPSPS', '4 h', '45 min'],
  ['DUERP', '2 h', '30 min'],
  ['OS et réserves', '1 h', '10 min'],
  ['Relance sous-traitant', '20 min', '3 min'],
] as const;

const IA_PHASES = ['Préparer le chantier', 'Piloter l’exécution', 'Sécuriser la clôture'] as const;

const SOMMAIRE = [
  { href: '#temps-chantier', label: 'Où part votre temps sur chantier ?' },
  { href: '#ia-terrain', label: 'L’IA prépare, vous validez' },
  { href: '#choisir-formation', label: 'Choisir votre formation' },
  { href: '#lieu', label: 'Lieux de session en Île-de-France' },
  { href: '#qui-forme', label: 'Qui forme ?' },
  { href: '#faq', label: 'Questions fréquentes' },
  { href: '#approfondir', label: 'Pour approfondir' },
] as const;

export const metadata = createPageMetadata({
  title: FORMATION_IA_CONDUCTEUR_B1_TITLE,
  titleAbsolute: PAGE_TITLE,
  description: FORMATION_IA_CONDUCTEUR_B1_DESCRIPTION,
  descriptionFinal: true,
  path: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH,
  openGraphTitle: PAGE_TITLE,
  openGraphDescription: FORMATION_IA_CONDUCTEUR_B1_DESCRIPTION,
  keywords: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.seo.keywords,
  image: FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG.seo.image,
  appendAuthorSuffix: false,
});

function ConducteurApprofondirSections() {
  return (
    <>
      <section id="gains-taches" className="scroll-mt-24 mt-12">
        <h3 className="font-display text-xl font-semibold text-slate-900">
          Ce que l&apos;IA fait gagner, tâche par tâche
        </h3>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse border border-slate-200 text-left text-sm">
            <caption className="sr-only">
              Gains de temps IA pour conducteur de travaux — avant et après formation
            </caption>
            <thead>
              <tr className="bg-slate-100">
                <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">
                  Tâche
                </th>
                <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">
                  Sans IA
                </th>
                <th scope="col" className="border border-slate-200 p-3 font-semibold text-slate-900">
                  Avec IA
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {GAINS_TACHES_ROWS.map(([tache, sansIa, avecIa]) => (
                <tr key={tache}>
                  <td className="border border-slate-200 p-3">{tache}</td>
                  <td className="border border-slate-200 p-3">{sansIa}</td>
                  <td className="border border-slate-200 p-3 font-medium text-[#377CF3]">{avecIa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DisclaimerGains className="mt-4" />
      </section>

      <section id="prompts" className="scroll-mt-24 mt-12">
        <h3 className="font-display text-xl font-semibold text-slate-900">8 prompts prêts à l&apos;emploi</h3>
        <p className="mt-3 leading-relaxed text-slate-600">{PROMPTS_SECTION_INTRO}</p>
        {CONDUCTEUR_PROMPTS.map((prompt) => (
          <div key={prompt.title} className="mt-8">
            <h4 className="font-display text-lg font-semibold text-slate-900">{prompt.title}</h4>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
              {prompt.body}
            </pre>
          </div>
        ))}
      </section>

      <section id="etude-cas" className="scroll-mt-24 mt-12">
        <h3 className="font-display text-xl font-semibold text-slate-900">
          Étude de cas — sessions avec la FFB et la CSFE
        </h3>
        {ETUDE_CAS_FFB_CSFE_PARAGRAPHS.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="mt-4 leading-relaxed text-slate-600">
            {paragraph}
          </p>
        ))}
        <p className="mt-6">
          <Link href={LINKS.etudesCas} className="font-semibold text-[#377CF3] underline hover:no-underline">
            Lire l&apos;étude de cas FFB &amp; CSFE
          </Link>
        </p>
      </section>
    </>
  );
}

export default function FormationIaConducteurDeTravauxPage() {
  const jsonLdGraph = buildFormationIaConducteurDeTravauxB1JsonLdGraph();
  const intro = FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_CONFIG;

  return (
  <>
      <JsonLd id="jsonld-formation-ia-conducteur-de-travaux-graph" data={jsonLdGraph} />
      <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
        <article>
          <header>
            <MetierIdfPresentielLine className="mb-4" />
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-[1.75rem] lg:text-2xl lg:leading-tight">
              {FORMATION_IA_CONDUCTEUR_B1_H1}
            </h1>
            <ContentUpdatedLine
              date={getPillarPageContentUpdatedAt(FORMATION_IA_CONDUCTEUR_DE_TRAVAUX_PATH)}
            />
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{intro.subtitle}</p>

            <div className="mt-6">
              <ProofStats
                items={CONDUCTEUR_TRAVAUX_HERO_PROOF_ITEMS}
                className="overflow-hidden rounded-2xl border border-slate-200"
              />
            </div>

            <EnBref text={conducteurLandingEnBref()} className="mt-5" />

            <div className="mt-6 flex flex-wrap gap-3">
              <CtaVisio src="landing-conducteur-hero" variant="primary" />
              <CtaDevis variant="secondary" href={LINKS.contact} />
            </div>
          </header>

          <nav
            aria-label="Sommaire"
            className="mt-10 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-6"
          >
            <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
              {SOMMAIRE.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-[#377CF3] underline hover:no-underline">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section id="temps-chantier" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Où part votre temps sur chantier ?
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              {intro.introParagraphs[0]} En présentiel en Île-de-France, nous travaillons sur ces
              tâches avec ChatGPT et Claude — dossiers anonymisés, relecture obligatoire avant envoi.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {CONDUCTEUR_LANDING_PAIN_POINTS.map((point) => (
                <li
                  key={point.title}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="font-semibold text-slate-900">{point.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="ia-terrain" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              L&apos;IA prépare, vous validez sur le terrain
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Trois phases du chantier : l&apos;IA structure et propose ; vous contrôlez faits, montants
              et engagements avant toute signature ou diffusion.
            </p>
            {IA_PHASES.map((phase) => {
              const rows = CONDUCTEUR_IA_PHASE_ROWS.filter((r) => r.phase === phase);
              return (
                <div key={phase} className="mt-8">
                  <h3 className="font-display text-lg font-semibold text-slate-900">{phase}</h3>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse border border-slate-200 text-left text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th
                            scope="col"
                            className="border border-slate-200 p-3 font-semibold text-slate-900"
                          >
                            Tâche
                          </th>
                          <th
                            scope="col"
                            className="border border-slate-200 p-3 font-semibold text-slate-900"
                          >
                            Ce que l&apos;IA prépare
                          </th>
                          <th
                            scope="col"
                            className="border border-slate-200 p-3 font-semibold text-slate-900"
                          >
                            Ce que vous validez
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-700">
                        {rows.map((row) => (
                          <tr key={row.tache}>
                            <td className="border border-slate-200 p-3 font-medium">{row.tache}</td>
                            <td className="border border-slate-200 p-3">{row.iaPrepare}</td>
                            <td className="border border-slate-200 p-3">{row.vousValidez}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </section>

          <section
            id="cta-milieu"
            className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#377CF3] p-8 text-white"
          >
            <h2 className="font-display text-xl font-bold md:text-2xl">
              Prioriser vos usages conducteur de travaux
            </h2>
            <p className="mt-3 leading-relaxed text-blue-100">
              En visio découverte gratuite, nous cadrons CR, suivi sous-traitants ou réception — avant
              devis catalogue ou intra.
            </p>
            <div className="mt-6">
              <CtaVisio
                src="landing-conducteur"
                variant="primary"
                className="!bg-white !text-[#377CF3] hover:!bg-slate-50"
              />
            </div>
          </section>

          <section id="choisir-formation" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Quelle formation choisir selon votre niveau ?
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Niveau 1 pour démarrer, fiche NIV-03 pour le cœur chantier, parcours métier 2027 pour une
              montée en compétences modulaire. Toutes les sessions sont en présentiel en Île-de-France.
            </p>
            <ul className="mt-8 space-y-4">
              {getConducteurFormationChoix().map((item) => (
                <li
                  key={item.href}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-[#377CF3]">
                    {item.duree} · {item.tarifLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  <p className="mt-4">
                    <Link href={item.href} className="font-semibold text-[#377CF3] underline hover:no-underline">
                      {item.cta}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-600">
              Fiche catalogue officielle :{' '}
              <Link
                href={LINKS.formationConduiteTravauxSuiviChantier}
                className="font-medium text-[#377CF3] underline hover:no-underline"
              >
                programme IA suivi de chantier (NIV-03)
              </Link>
              .
            </p>
          </section>

          <section id="lieu" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Où se déroulent les sessions en Île-de-France ?
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">{conducteurLieuFormationParagraph()}</p>
            <p className="mt-4 text-sm text-slate-600">
              <Link href={LINKS.formations} className="font-medium text-[#377CF3] underline hover:no-underline">
                Catalogue formations IA BTP
              </Link>{' '}
              ·{' '}
              <Link href={LINKS.financement} className="font-medium text-[#377CF3] underline hover:no-underline">
                Financement Constructys
              </Link>
            </p>
          </section>

          <section id="qui-forme" className="scroll-mt-24 mt-14">
            <FormateurIntervenantBlock formationCode="NIV-03" title="Qui forme ?" />
            <FormationPartenairesMention className="mt-8" />
          </section>

          <section id="faq" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900">Questions fréquentes</h2>
            <dl className="mt-8 space-y-8">
              {CONDUCTEUR_LANDING_FAQ.map((item) => (
                <div key={item.q}>
                  <dt className="font-display text-lg font-semibold text-slate-900">{item.q}</dt>
                  <dd className="mt-2 leading-relaxed text-slate-600">
                    <FAQAnswer content={item.a} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="maillage" className="scroll-mt-24 mt-14 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-6">
            <h2 className="font-display text-lg font-bold text-slate-900">Aller plus loin</h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              {CONDUCTEUR_LANDING_MAILLAGE.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#377CF3] underline hover:no-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="cta-fin"
            className="scroll-mt-24 mt-14 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="font-display text-xl font-bold text-slate-900">
              Réserver votre visio découverte gratuite
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Session intra ou inter, équipe travaux ou conducteurs isolés — devis écrit sur demande.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaVisio src="landing-conducteur-fin" variant="primary" />
              <CtaDevis href={LINKS.contact} variant="secondary" />
            </div>
          </section>

          <section id="approfondir" className="scroll-mt-24 mt-14 border-t border-slate-200 pt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900">Pour approfondir</h2>
            <p className="mt-3 text-slate-600">
              Prompts terrain, repères de gain de temps et retours d&apos;expérience FFB / CSFE — à relire
              après la session.
            </p>
            <ConducteurApprofondirSections />
          </section>
        </article>
      </div>
    </>
  );
}