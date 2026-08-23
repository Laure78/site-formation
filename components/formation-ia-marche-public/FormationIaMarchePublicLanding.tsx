import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { FormationMetierJsonLd } from '@/components/seo/FormationMetierJsonLd';
import { Essentiel } from '@/components/readability/Essentiel';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { RelatedLinks } from '@/components/RelatedLinks';
import { LiensConnexes } from '@/components/LiensConnexes';
import { getLiensConnexesHrefs } from '@/lib/liens-connexes';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { LINKS } from '@/lib/internal-links';
import { SITE_CONFIG } from '@/lib/seo';
import { SOCIAL_PROOF } from '@/lib/constants';
import { TARIF_FORFAIT_AVANCE_HT } from '@/lib/tarifs-sessions';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { formatNoteSatisfactionSur5 , formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats'
import type { FormationIaMarchePublicConfig } from '@/lib/formation-ia-marche-public-types';

const OFC = "OFC Création d'Entreprise";

function CalendlyBlock({
  id,
  title,
  subtitle,
  campaign,
  showFinancementLink = false,
}: {
  id: string;
  title: string;
  subtitle: string;
  campaign: string;
  showFinancementLink?: boolean;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-[#377CF3] px-6 py-10 text-white shadow-sm md:px-10"
    >
      <h2 className="font-display text-xl font-bold md:text-2xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-blue-100 md:text-base">{subtitle}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <CalendlyEmbed
          type="link"
          variant="on-accent"
          ctaPosition="middle"
          campaign={campaign}
          className="gap-2 font-bold shadow-sm"
        >
          Prendre un rendez-vous découverte
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
        </CalendlyEmbed>
        {showFinancementLink ? (
          <Link
            href={LINKS.financement}
            className="inline-flex items-center rounded-xl border-2 border-white/80 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Financement Constructys (selon éligibilité)
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function sommaireFor(config: FormationIaMarchePublicConfig) {
  const items: { href: string; label: string }[] = [
    { href: '#en-bref', label: 'En bref' },
    { href: '#probleme', label: 'Le problème' },
    { href: '#solution-ia', label: 'Solution IA et garde-fous' },
    { href: '#methode', label: 'Méthode en 5 étapes' },
    { href: '#prompts', label: 'Prompts' },
  ];
  if (config.ccagSection) {
    items.push({ href: '#ccag-travaux', label: 'Repères CCAG-Travaux 2021' });
  }
  if (config.lotSpecificSections?.length) {
    items.push({ href: '#specifique-lot', label: 'Spécificités du lot' });
  }
  if (config.lots?.length) {
    items.push({ href: '#lots', label: 'Choisissez votre lot' });
  }
  items.push(
    { href: '#eeat', label: 'Références et partenaires' },
    { href: '#faq', label: 'FAQ' },
    { href: '#rdv-1', label: 'Calendly — rendez-vous (1)' },
    { href: '#rdv-2', label: 'Calendly — visio & financement (2)' },
    { href: '#rdv-3', label: 'Calendly — dernier rappel (3)' },
  );
  return items;
}

export function FormationIaMarchePublicLanding({
  config,
}: {
  config: FormationIaMarchePublicConfig;
}) {
  const sommaire = sommaireFor(config);
  const faqItems = config.faq.map((item) => ({
    question: item.q,
    answer: item.a,
  }));
  const utmBase = 'marche-public-travaux';
  const excludeRelated = config.inlineLinkHrefs ?? [];

  return (
    <div className="bg-white text-slate-900">
      <FormationMetierJsonLd
        metierLabel={config.pageLabel}
        path={config.path}
        courseName={config.courseName}
        courseDescription={config.courseDescription}
        duration="PT4H"
        price={TARIF_FORFAIT_AVANCE_HT}
        level="Advanced"
        teaches={config.courseTeaches}
        faqItems={faqItems}
        scriptId={`schema-formation-marche-public-${config.id}`}
        catalogueProgrammeRef="NIV-02"
      />

      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <article>
          <MetierIdfPresentielLine className="mb-3" />
          <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
            Commande publique · organisme certifié Qualiopi · Île-de-France
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
            {config.h1}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {config.introParagraph ?? (
              <>
                {OFC} — formation IA pour répondre et gérer un marché public de travaux : DCE, Go-NoGo, mémoire
                technique. Sessions en présentiel en Île-de-France (4&nbsp;h), dispensées par un organisme certifié Qualiopi. Financement
                Constructys possible selon éligibilité.{' '}
                <strong className="text-slate-800">{formatNoteSatisfactionAffichageComplet()}</strong>.
              </>
            )}
            {config.introParagraph ? (
              <>
                {' '}
                <strong className="text-slate-800">{formatNoteSatisfactionAffichageComplet()}</strong>.
              </>
            ) : null}
          </p>

          <div id="en-bref" className="mt-8 scroll-mt-24">
            <ShortAnswerBlock>{config.shortAnswer}</ShortAnswerBlock>
          </div>

          {config.essentielItems.length > 0 ? (
            <Essentiel
              className="mt-8"
              idPrefix={`marche-public-${config.id}`}
              items={config.essentielItems}
            />
          ) : null}

          <p className="mt-6 text-sm leading-relaxed text-slate-600">
            Programme, durée et tarif de la session catalogue :{' '}
            <Link href={LINKS.formationAO} className={OFC_LINK}>
              fiche NIV-02 — L&apos;IA appliquée aux appels d&apos;offres BTP
            </Link>
            . Cette page ne duplique pas le programme.
          </p>

          <nav aria-label="Sommaire" className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
              {sommaire.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-[#377CF3] underline hover:no-underline">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section id="probleme" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              {config.problemTitle}
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              {config.problemParagraphs.map((p, i) => (
                <p key={`pb-${i}`}>{p}</p>
              ))}
            </div>
          </section>

          <section id="solution-ia" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              La solution IA — méthode et garde-fous
            </h2>
            <p className="mt-6 text-slate-700 leading-relaxed">{config.solutionIntro}</p>
            <ul className="mt-6 space-y-3">
              {config.solutionGuards.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12">
            <CalendlyBlock
              id="rdv-1"
              campaign={`${utmBase}-rdv-1`}
              title="Premier rendez-vous — Calendly"
              subtitle="30 minutes pour cadrer votre besoin (intra ou inter, présentiel Île-de-France) et voir si l’angle marché public de travaux correspond à votre équipe."
            />
          </div>

          <section id="methode" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Méthode en 5 étapes
            </h2>
            <ol className="mt-8 list-decimal space-y-6 pl-5 text-slate-700 leading-relaxed">
              {config.methodSteps.map((step) => (
                <li key={step.title}>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="prompts" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Prompts — exemples cadrés
            </h2>
            <p className="mt-4 text-slate-600">
              À adapter à vos pièces et à vos modèles internes. Toujours valider les sorties avant dépôt.
            </p>
            <div className="mt-8 space-y-10">
              {config.prompts.map((p, i) => (
                <div key={p.title} className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 md:p-6">
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {i + 1}. {p.title}
                  </h3>
                  <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-800 shadow-sm">
                    {p.body}
                  </pre>
                </div>
              ))}
            </div>
          </section>

          {config.ccagSection ? (
            <section id="ccag-travaux" className="scroll-mt-24 mt-14">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Spécificités CCAG-Travaux 2021 — repères (pas un conseil juridique)
              </h2>
              <p className="mt-6 text-slate-700 leading-relaxed">{config.ccagSection.intro}</p>
              <ul className="mt-6 space-y-3">
                {config.ccagSection.bullets.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-700">
                {config.ccagSection.disclaimer}
              </p>
            </section>
          ) : null}

          {config.lotSpecificSections && config.lotSpecificSections.length > 0 ? (
            <section id="specifique-lot" className="scroll-mt-24 mt-14">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Contenu spécifique au lot
              </h2>
              <div className="mt-8 space-y-10">
                {config.lotSpecificSections.map((sec) => (
                  <div key={sec.title}>
                    <h3 className="font-display text-xl font-semibold text-slate-900">{sec.title}</h3>
                    <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
                      {sec.paragraphs.map((p, i) => (
                        <p key={`${sec.title}-${i}`}>{p}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {config.lots && config.lots.length > 0 ? (
            <section id="lots" className="scroll-mt-24 mt-14">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Choisissez votre lot
              </h2>
              <p className="mt-4 text-slate-600">
                Pages satellite par corps d&apos;état — même angle commande publique, vocabulaire métier distinct.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {config.lots.map((lot) => (
                  <li
                    key={lot.title}
                    className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5"
                  >
                    {lot.href && !lot.comingSoon ? (
                      <Link href={lot.href} className={`font-semibold ${OFC_LINK}`}>
                        {lot.title}
                      </Link>
                    ) : (
                      <span className="font-semibold text-slate-900">
                        {lot.title}
                        {lot.comingSoon ? (
                          <span className="ml-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                            Bientôt
                          </span>
                        ) : null}
                      </span>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{lot.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section id="eeat" className="scroll-mt-24 mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Références et partenaires
            </h2>
            <p className="mt-4 text-slate-700 leading-relaxed">{config.eeatParagraph}</p>
            <p className="mt-4 text-sm text-slate-600">
              <Link href={LINKS.aPropos} className={`font-medium ${OFC_LINK}`}>
                À propos de Laure Olivié
              </Link>
              {' · '}
              <Link href={LINKS.partenaires} className={`font-medium ${OFC_LINK}`}>
                Partenaires FFB, CSFE, UMB-FFB
              </Link>
            </p>
          </section>

          <div className="mt-12">
            <CalendlyBlock
              id="rdv-2"
              campaign={`${utmBase}-rdv-2`}
              showFinancementLink
              title="Deuxième appel — Calendly"
              subtitle="Visio découverte : cas type marché public, questions financement Constructys / OPCO selon éligibilité."
            />
          </div>

          <section id="faq" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">FAQ</h2>
            <div className="mt-8 space-y-5">
              {config.faq.map((item) => (
                <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-slate-900">{item.q}</h3>
                  <div className="mt-2 text-slate-600 leading-relaxed">
                    <FAQAnswer content={item.a} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {config.maillageLinks && config.maillageLinks.length > 0 ? (
            <section id="maillage-lot" className="scroll-mt-24 mt-14">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Pages liées
              </h2>
              <ul className="mt-6 space-y-4">
                {config.maillageLinks.map((l) => (
                  <li key={l.href} className="rounded-xl border border-slate-200 bg-white p-4">
                    <Link href={l.href} className={`font-semibold ${OFC_LINK}`}>
                      {l.label}
                    </Link>
                    <p className="mt-1 text-sm text-slate-600">{l.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <RelatedLinks
            path={config.path}
            className="mt-14 !px-0"
            tone="transparent"
            excludeHrefs={[...excludeRelated, ...getLiensConnexesHrefs(config.path)]}
          />

          <LiensConnexes currentPath={config.path} excludeHrefs={excludeRelated} />

          <RenvoiFicheCatalogue
            programmeRef="NIV-02"
            contexte="sur les marchés publics de travaux"
          />

          <div className="mt-14">
            <CalendlyBlock
              id="rdv-3"
              campaign={`${utmBase}-rdv-3`}
              title="Troisième appel — Calendly"
              subtitle="Dernière occasion de réserver un créneau : appel découverte formation IA marché public de travaux (30 min)."
            />
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            {SITE_CONFIG.name} · {OFC} · présentiel Île-de-France
          </p>
        </article>
      </div>
    </div>
  );
}
