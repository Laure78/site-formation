import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { LiensConnexes } from '@/components/LiensConnexes';
import { getLiensConnexesHrefs } from '@/lib/liens-connexes';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { getMetierLandingCoreLinks } from '@/lib/contextual-internal-links';
import { RdvLink } from '@/components/RdvLink';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { FormationMetierJsonLd } from '@/components/seo/FormationMetierJsonLd';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { SOCIAL_PROOF } from '@/lib/constants';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { RelatedLinks } from '@/components/RelatedLinks';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import { PreuveSociale } from '@/components/PreuveSociale';

type FAQItem = { question: string; answer: string };
type Step = { title: string; prompt: string };
type UseCase = { title: string; description: string };

type Props = {
  path: string;
  metierLabel: string;
  h1: string;
  heroParagraph: string;
  shortAnswer: string;
  problemBullets: string[];
  useCases: UseCase[];
  steps: Step[];
  faqItems: FAQItem[];
  level?: string;
  /** Lien interne vers une page sœur (anti-cannibalisation). */
  crossLink?: { href: string; label: string; before?: string };
};

export function FormationMetierB1Page({
  path,
  metierLabel,
  h1,
  heroParagraph,
  shortAnswer,
  problemBullets,
  useCases,
  steps,
  faqItems,
  level = 'Beginner',
  crossLink,
}: Props) {
  const courseName = `Formation IA ${metierLabel} — ChatGPT BTP`;
  const slugId = metierLabel.toLowerCase().replace(/\s+/g, '-');
  const slugFromPath = path.replace(/^\/+|\/$/g, '').replace(/\//g, '-');
  const allerPlusCalendlyHref = buildSiteCalendlyCtaUrl(`${slugFromPath}-aller-plus-loin`);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <FormationMetierJsonLd
        metierLabel={metierLabel}
        path={path}
        courseName={courseName}
        courseDescription={heroParagraph}
        duration="PT4H"
        price={TARIF_FORFAIT_DEBUTANT_HT}
        level={level}
        faqItems={faqItems}
        scriptId={`schema-formation-metier-${slugId}`}
        catalogueProgrammeRef="NIV-01"
      />

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{h1}</h1>
        <PreuveSociale className="mt-6" />
        <p className="mt-6 text-xl text-slate-600">
          Sessions en présentiel en Île-de-France — {heroParagraph}
        </p>
        {crossLink ? (
          <p className="mt-4 text-base text-slate-600">
            {crossLink.before ?? 'Page complémentaire :'}{' '}
            <Link href={crossLink.href} className="font-medium text-[var(--accent)] hover:underline">
              {crossLink.label}
            </Link>
            .
          </p>
        ) : null}

        <div className="mt-8">
          <ShortAnswerBlock>{shortAnswer}</ShortAnswerBlock>
        </div>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le problème : pourquoi ce métier perd du temps
          </h2>
          <ul className="mt-4 space-y-3">
            {problemBullets.map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l&apos;IA adaptée au métier
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {useCases.map((u) => (
              <div key={u.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-slate-900">{u.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{u.description}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Prendre rendez-vous</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            30 minutes pour analyser vos besoins et bâtir un plan de formation IA adapté à votre activité.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RdvLink
              campaign={`${slugFromPath}-visio-encart`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Prendre rendez-vous
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
          </div>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas avec prompts ChatGPT
          </h2>
          {steps.map((step) => (
            <div key={step.title}>
              <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">{step.title}</h3>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
                {step.prompt}
              </pre>
            </div>
          ))}
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Sans IA</th>
                  <th className="p-3 font-semibold text-slate-900">Avec IA</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Documents techniques</td>
                  <td className="p-3">1h à 3h</td>
                  <td className="p-3">15 à 30 min</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Comptes rendus</td>
                  <td className="p-3">45 min</td>
                  <td className="p-3">5 à 10 min</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Préparation réponse client</td>
                  <td className="p-3">Dispersée</td>
                  <td className="p-3">Structurée</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — questions fréquentes</h2>
          <div className="mt-8 space-y-6">
            {faqItems.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{question}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  <FAQAnswer content={answer} />
                </p>
              </div>
            ))}
          </div>
        </section>

        <LaureOlivieFormationPortrait showFullParcoursLink />

        <RenvoiFicheCatalogue
          programmeRef="NIV-01"
          contexte={`pour les ${metierLabel}`}
        />

        <RelatedLinks
          path={path}
          className="mt-14 !px-0"
          tone="transparent"
          excludeHrefs={getLiensConnexesHrefs(path)}
        />

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Passez à l&apos;action</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Prendre rendez-vous pour cadrer votre plan de formation IA.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink
              campaign={`${slugFromPath}-fin-rdv`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Réserver votre visio découverte
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
            <Link
              href={LINKS.contact}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
          </p>
        </section>

        <section className="mt-14">
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d&apos;Entreprise · Organisme certifié Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}
            {sitePhoneDisplaySuffix()}
          </p>
        </section>

        <div className="mt-14">
          <AuthorBio />
        </div>

        <ContextualLinksSection
          title="Catalogue et ressources"
          subtitle="Programmes catalogue — organisme certifié Qualiopi, financement Constructys, Claude AI et articles pratiques."
          links={getMetierLandingCoreLinks({ csfePartnership: false }).filter(
            (l) =>
              !getClusterRelatedHrefs(path).includes(l.href) &&
              !getLiensConnexesHrefs(path).includes(l.href),
          )}
          tone="muted"
          className="mt-14"
        />

        <LiensConnexes
          currentPath={path}
          excludeHrefs={[...getClusterRelatedHrefs(path), LINKS.financement]}
        />

        <AllerPlusLoin
          links={[
            { href: LINKS.financement, label: 'Financement Constructys' },
            { href: allerPlusCalendlyHref, label: 'Prendre rendez-vous' },
          ].filter((l) => !getLiensConnexesHrefs(path).includes(l.href))}
        />
      </article>
    </div>
  );
}
