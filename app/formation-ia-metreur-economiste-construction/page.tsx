import { CtaButton } from '@/components/CtaButton';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { getFAQSchema, SITE_CONFIG, buildMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { LiensConnexes } from '@/components/LiensConnexes';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { RelatedLinks } from '@/components/RelatedLinks';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { PreuveSociale } from '@/components/PreuveSociale';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import {
  FORMATION_IA_METREUR_ECONOMISTE_CONSTRUCTION_PATH,
  METREUR_ECONOMISTE_EN_BREF,
  METREUR_ECONOMISTE_FAQ,
  METREUR_ECONOMISTE_METHODE_ETAPES,
  METREUR_ECONOMISTE_RELATED,
  METREUR_ECONOMISTE_SEO,
  buildMetreurEconomisteConstructionCourseJsonLd,
  getMetreurEconomistePrompt,
} from '@/lib/formation-ia-metreur-economiste-construction-landing';

export const metadata = buildMetadata({
  title: METREUR_ECONOMISTE_SEO.title,
  description: METREUR_ECONOMISTE_SEO.description,
  descriptionFinal: true,
  path: FORMATION_IA_METREUR_ECONOMISTE_CONSTRUCTION_PATH,
  openGraphType: 'website',
  appendAuthorSuffix: true,
  openGraphTitle: METREUR_ECONOMISTE_SEO.openGraphTitle,
  image: {
    url: '/images/formation-ia-devis-chiffrage-btp.webp',
    width: 1024,
    height: 682,
    alt: 'Métreur et économiste de la construction — formation IA DPGF et quantitatifs, présentiel Île-de-France',
  },
});

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème du métier' },
  { href: '#la-solution-ia', label: 'La solution IA' },
  { href: '#methode', label: 'Méthode en 4 étapes + prompts' },
  { href: '#resultats', label: 'Tableau de gains' },
  { href: '#faq', label: 'FAQ' },
  { href: '#rdv', label: 'Visio découverte gratuite 30 min' },
];

export default function FormationIaMetreurEconomisteConstructionPage() {
  const faqSchema = getFAQSchema([...METREUR_ECONOMISTE_FAQ]);
  const courseJsonLd = buildMetreurEconomisteConstructionCourseJsonLd();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
      <JsonLd id="jsonld-course-metreur-economiste" schema={courseJsonLd} />
      {faqSchema ? <JsonLd id="jsonld-faq-metreur-economiste" schema={faqSchema} /> : null}

      <article>
        <header>
          <MetierIdfPresentielLine className="mb-4" />
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem] lg:leading-tight">
            {METREUR_ECONOMISTE_SEO.h1}
          </h1>

          <PreuveSociale className="mt-6" />

          <EnBref>
            {METREUR_ECONOMISTE_EN_BREF.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </EnBref>

          <p className="mt-4 text-lg text-slate-600">
            Sessions en présentiel uniquement — Laure Olivié · {SITE_CONFIG.legalName} · Qualiopi · Financement OPCO
            possible selon éligibilité
          </p>

          <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
            <span className="font-medium text-slate-900">Session catalogue liée :</span>{' '}
            <Link href={LINKS.formationAO} className="font-medium text-[#377CF3] hover:underline">
              Formation NIV-02 — IA appliquée aux appels d&apos;offres BTP
            </Link>{' '}
            (DCE, mémoire technique, Claude AI Pro). Cette page est un guide métier ; le programme détaillé est sur le
            catalogue.
          </p>

          <figure className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <Image
              src="/images/formation-ia-devis-chiffrage-btp.webp"
              alt="Économiste de la construction — DPGF, DQE et quantitatifs avec l'IA, formation présentiel Île-de-France"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              quality={75}
            />
          </figure>

          <div className="mt-8">
            <ShortAnswerBlock>
              Métreurs et économistes de la construction passent des heures sur DPGF, DQE, BPU, métrés et quantitatifs.
              L&apos;IA (ChatGPT, Claude) structure minutes de métré, contrôles de bordereaux et synthèses de ratio — vous
              validez unités et prix. Sessions{' '}
              <Link href={LINKS.formationIleDeFrance} className="font-medium text-[#377CF3] hover:underline">
                en présentiel en Île-de-France
              </Link>
              . Pour analyser un DCE en amont, voir aussi{' '}
              <Link href={LINKS.iaAnalyseDce} className="font-medium text-[#377CF3] hover:underline">
                la méthode IA analyse DCE BTP
              </Link>
              .
            </ShortAnswerBlock>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <CtaButton origin="formation-ia-metreur-economiste-construction-hero" className="px-5 py-3" />
            <Link
              href={LINKS.formationAO}
              className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:border-[#377CF3] hover:text-[#377CF3]"
            >
              Voir la formation NIV-02
            </Link>
          </div>
        </header>

        <nav aria-label="Sommaire" className="mt-10 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-6">
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

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Le problème du métier</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Entre relevés terrain, minutes de métré, décomposition DPGF, quantitatifs Excel, vérification de bordereaux
            BPU et sous-détail de prix, le métier cumule des tâches répétitives à forte responsabilité. Une erreur
            d&apos;unité, un ratio incohérent ou un poste oublié dans le DQE peut coûter des jours de reprise — avant
            même la négociation MOE ou la remise d&apos;offre.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Les bureaux d&apos;études et services chiffrage en Île-de-France font face aux mêmes goulots : croiser CCTP et
            DPGF sous délai, harmoniser des libellés BPU hétérogènes et documenter les hypothèses de quantitatif pour
            l&apos;équipe interne.
          </p>
          <ul className="mt-6 space-y-4 text-slate-700">
            {[
              'Métré et quantitatif : ressaisies, unités mixtes (m², ml, u), déductions d’ouvertures',
              'DPGF / DQE : décomposition, cohérence des postes, poids relatifs et ratios de contrôle',
              'BPU : vérification de bordereaux, sous-détail de prix matière / MO, libellés normalisés',
              'Relectures croisées CCTP ↔ quantitatif avant chiffrage ou validation MOE',
              'Synthèses internes et check-lists avant envoi — peu de temps pour la valeur ajoutée métier',
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="la-solution-ia" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">La solution IA</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            ChatGPT et Claude ne remplacent ni le relevé, ni le chiffrage, ni la signature de l&apos;économiste. Ils
            accélèrent la <strong>mise en forme</strong> : structurer une minute de métré en tableau quantitatif,
            signaler des incohérences DPGF/CCTP, préparer une relecture de BPU et produire une synthèse DQE avec ratios
            repère — toujours sous votre validation.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            En session présentiel uniquement, vous travaillez sur des cas anonymisés (extraits DCE, bordereaux, notes de
            métré). Vous repartez avec des prompts réutilisables et une méthode en quatre étapes alignée sur vos
            documents réels.
          </p>
          <ul className="mt-6 space-y-4 text-slate-700">
            {[
              'Structurer quantitatifs et minutes de métré à partir de notes brutes',
              'Croiser DPGF, DQE et extraits CCTP pour repérer oublis et doublons',
              'Contrôler cohérence BPU / sous-détail de prix / unités',
              'Synthétiser ratios et points d’arbitrage pour réunion interne',
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#377CF3] p-8 text-white">
          <h2 className="font-display text-xl font-bold md:text-2xl">Visio découverte gratuite — 30 minutes</h2>
          <p className="mt-3 leading-relaxed text-blue-100">
            Cadrons vos usages IA sur DPGF, métrés, DQE et BPU : je vous oriente vers la session catalogue adaptée (NIV-02
            appels d&apos;offres ou parcours sur mesure intra).
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <RdvLink
              campaign="formation-ia-metreur-economiste-construction-milieu"
              ctaPosition="middle"
              className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
            >
              Réserver ma visio gratuite →
            </RdvLink>
            <CtaButton
              origin="formation-ia-metreur-economiste-construction-milieu"
              className="inline-flex items-center rounded-lg border-2 border-white/80 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              variant="unstyled"
            />
          </div>
        </section>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode en 4 étapes — avec un prompt réel par étape
          </h2>
          <ol className="mt-6 list-decimal space-y-8 pl-5 text-slate-700">
            {METREUR_ECONOMISTE_METHODE_ETAPES.map((step) => (
              <li key={step.title}>
                <strong className="text-slate-900">{step.title}</strong>
                <p className="mt-2 leading-relaxed">{step.body}</p>
                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
                  {getMetreurEconomistePrompt(step.promptKey)}
                </pre>
              </li>
            ))}
          </ol>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Tableau de gains — formations OFC</h2>
          <p className="mt-4 text-slate-600">
            Ordres de grandeur observés en session avec des métreurs et économistes de la construction (relecture humaine
            incluse).
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse border border-slate-200 text-left text-sm">
              <caption className="sr-only">Gains de temps IA — métreur économiste construction</caption>
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Tâche</th>
                  <th className="border border-slate-200 p-3 font-semibold">Sans IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Avec IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Gain</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ['Minute de métré → quantitatif', '2 h', '25 min', '−79 %'],
                  ['Croisement DPGF / CCTP', '1 h 30', '20 min', '−78 %'],
                  ['Contrôle bordereau BPU', '45 min', '10 min', '−78 %'],
                  ['Sous-détail de prix (brouillon)', '1 h', '15 min', '−75 %'],
                  ['Synthèse DQE + ratios', '50 min', '12 min', '−76 %'],
                ].map(([doc, sans, avec, gain]) => (
                  <tr key={doc as string}>
                    <td className="border border-slate-200 p-3">{doc}</td>
                    <td className="border border-slate-200 p-3">{sans}</td>
                    <td className="border border-slate-200 p-3">{avec}</td>
                    <td className="border border-slate-200 p-3 font-medium text-[#377CF3]">{gain}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-semibold">
                  <td className="border border-slate-200 p-3">Semaine type (5 tâches)</td>
                  <td className="border border-slate-200 p-3">≈ 6 h 35</td>
                  <td className="border border-slate-200 p-3">≈ 1 h 22</td>
                  <td className="border border-slate-200 p-3 text-[#377CF3]">≈ 1 h/jour</td>
                </tr>
              </tbody>
            </table>
          </div>
          <DisclaimerGains className="mt-4" />
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — métreurs &amp; économistes</h2>
          <dl className="mt-8 space-y-8">
            {METREUR_ECONOMISTE_FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-slate-600">
                  <FAQAnswer content={item.a} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <RelatedLinks
          path={FORMATION_IA_METREUR_ECONOMISTE_CONSTRUCTION_PATH}
          className="mt-14 !px-0"
          tone="transparent"
          excludeHrefs={[LINKS.formationAO, LINKS.financement]}
        />

        <LaureOlivieFormationPortrait />

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#F2F2F2] p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Prendre rendez-vous — 30 min
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Identifions ensemble vos dossiers DPGF, DQE et métrés où l&apos;IA vous fera gagner le plus de temps.
            Gratuit, sans engagement — session catalogue finançable Constructys selon éligibilité.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <CtaButton origin="formation-ia-metreur-economiste-construction-rdv-final" />
            <PublicPhoneCta className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-slate-50" />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            <Link href={LINKS.formationAO} className="text-[#377CF3] underline">
              Programme NIV-02 — appels d&apos;offres BTP
            </Link>
            {' · '}
            <Link href={LINKS.financement} className="text-[#377CF3] underline">
              Financement Constructys
            </Link>
          </p>
        </section>

        <ContextualLinksSection
          title="Aller plus loin"
          subtitle="Catalogue, méthodes DCE et couverture Île-de-France."
          links={METREUR_ECONOMISTE_RELATED.map((l) => ({
            href: l.href,
            title: l.title,
            description: l.description,
          }))}
          tone="muted"
        />

        <LiensConnexes
          currentPath={FORMATION_IA_METREUR_ECONOMISTE_CONSTRUCTION_PATH}
          excludeHrefs={METREUR_ECONOMISTE_RELATED.map((l) => l.href)}
        />

        <RenvoiFicheCatalogue programmeRef="NIV-02" />

        <footer className="mt-14 border-t border-slate-200 pt-8 text-sm text-slate-500">
          <p>Laure Olivié — Formatrice IA pour les pros du BTP, OFC Création d&apos;Entreprise</p>
          <p>Organisme certifié Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078</p>
          <p>
            laureolivie@yahoo.fr ·{' '}
            <a href="/" className="underline">
              www.laureolivie.fr
            </a>
          </p>
        </footer>
      </article>
    </div>
  );
}
