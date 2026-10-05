import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { CtaRdv } from '@/components/CtaRdv';
import { IaDevisFaqAccordion } from '@/components/ia-devis-batiment/IaDevisFaqAccordion';
import { IaDevisHeroDemo } from '@/components/ia-devis-batiment/IaDevisHeroDemo';
import { IaDevisPromptsAccordion } from '@/components/ia-devis-batiment/IaDevisPromptsAccordion';
import { JsonLd } from '@/components/JsonLd';
import { PreuveSociale } from '@/components/PreuveSociale';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { CTASection } from '@/components/ui/CTASection';
import { Section } from '@/components/ui/Section';
import {
  IA_DEVIS_ALLER_PLUS_LOIN,
  IA_DEVIS_AVANT,
  IA_DEVIS_AVEC,
  IA_DEVIS_CHECKLIST,
  IA_DEVIS_DEMO_NOTES,
  IA_DEVIS_DEMO_POSTES,
  IA_DEVIS_ERREURS,
  IA_DEVIS_ETAPES,
  IA_DEVIS_FAQ,
  IA_DEVIS_FORMATION_FACTS,
  IA_DEVIS_FORMATION_HIGHLIGHTS,
  IA_DEVIS_FORMATION_HREF,
  IA_DEVIS_HERO_BENEFICES,
  IA_DEVIS_LIVRABLES,
  IA_DEVIS_NE_DOIT_PAS,
  IA_DEVIS_PATH,
  IA_DEVIS_PEUT,
  IA_DEVIS_PREUVES,
  IA_DEVIS_PROBLEMES,
  IA_DEVIS_REASSURANCE,
  IA_DEVIS_SEO,
} from '@/lib/ia-devis-batiment-content';
import { IA_DEVIS_PROMPTS_PAR_METIER } from '@/lib/ia-devis-batiment-prompts';
import { formatAnneesExperienceBTP } from '@/lib/data/indicateurs-resultats';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CARD,
  OFC_CTA_PRIMARY,
  OFC_CTA_SECONDARY,
  OFC_TYPE_H2,
  OFC_TYPE_H3,
} from '@/lib/ofc-interaction-classes';
import { createPageMetadata, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: IA_DEVIS_SEO.title,
  description: IA_DEVIS_SEO.description,
  descriptionFinal: true,
  path: IA_DEVIS_PATH,
  keywords: [
    'IA devis bâtiment',
    'IA devis BTP',
    'ChatGPT devis BTP',
    'formation IA devis BTP',
    'IA chiffrage bâtiment',
  ],
});

export default function IADevisBatimentPage() {
  const faqSchema = getFAQSchema([...IA_DEVIS_FAQ]);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: 'IA devis bâtiment', path: IA_DEVIS_PATH },
  ]);

  return (
    <>
      <JsonLd id="schema-faq-ia-devis" schema={faqSchema} />
      <JsonLd id="schema-breadcrumb-ia-devis" schema={breadcrumbSchema} />

      {/* 1. Hero */}
      <Section tone="soft" aria-labelledby="ia-devis-h1" className="!pt-10 md:!pt-14">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <p className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] ring-1 ring-[var(--accent)]/20">
              Formation IA BTP • Devis &amp; chiffrage
            </p>
            <h1
              id="ia-devis-h1"
              className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-900 text-balance md:text-4xl lg:text-[2.65rem] lg:leading-[1.15]"
            >
              {IA_DEVIS_SEO.h1}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              Apprenez à utiliser ChatGPT et l’IA pour préparer vos descriptifs, structurer vos
              postes, créer des variantes et accélérer la rédaction de vos devis — tout en gardant
              la maîtrise de vos prix et de vos marges.
            </p>
            <ul className="mt-6 space-y-2.5">
              {IA_DEVIS_HERO_BENEFICES.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm font-medium text-slate-800 md:text-base">
                  <span className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden>
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaRdv
                origin="ia-devis-hero"
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-12 items-center justify-center px-7 py-3`}
              />
              <Link
                href="#formation-ia-devis"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-12 items-center justify-center px-7 py-3`}
              >
                Découvrir la formation
              </Link>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-500">{IA_DEVIS_REASSURANCE}</p>
          </div>
          <div className="min-w-0 lg:sticky lg:top-24">
            <IaDevisHeroDemo />
          </div>
        </div>
      </Section>

      {/* 2. Barre de preuves */}
      <section
        className="border-y border-slate-200 bg-white"
        aria-label="Éléments de réassurance"
      >
        <div className="mx-auto grid max-w-[1400px] gap-px bg-slate-100 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-8">
          {IA_DEVIS_PREUVES.map((item) => (
            <div key={item.label} className="bg-white px-5 py-5 text-center sm:text-left">
              <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Problème métier */}
      <Section tone="white" aria-labelledby="ia-devis-probleme">
        <h2 id="ia-devis-probleme" className={OFC_TYPE_H2}>
          Pourquoi les devis prennent-ils autant de temps&nbsp;?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          Entre la visite chantier et l’envoi du document, la rédaction concentre une grande partie
          du temps : reprendre les notes, détailler les postes, reformuler, préparer des options.
          C’est précisément là que l’IA peut aider — sans remplacer votre expertise.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {IA_DEVIS_PROBLEMES.map((card) => (
            <article key={card.titre} className={`${OFC_CARD} rounded-2xl p-6`}>
              <h3 className={`${OFC_TYPE_H3} text-lg`}>→ {card.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.desc}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base leading-relaxed text-slate-700">
          L’IA ne remplace ni le métreur, ni le dirigeant, ni le logiciel de devis. Elle peut en
          revanche accélérer considérablement la préparation et la rédaction.
        </p>
      </Section>

      {/* 4. Avant / Avec l’IA */}
      <Section tone="soft" aria-labelledby="ia-devis-avant-apres">
        <h2 id="ia-devis-avant-apres" className={OFC_TYPE_H2}>
          Ce que l’IA change dans la préparation d’un devis
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Avant</p>
            <ul className="mt-5 space-y-3">
              {IA_DEVIS_AVANT.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700 md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--accent)]/30 bg-white p-6 md:p-8 shadow-[0_8px_24px_rgba(55,124,243,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              Avec l’IA
            </p>
            <ul className="mt-5 space-y-3">
              {IA_DEVIS_AVEC.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-medium text-slate-800 md:text-base">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 rounded-2xl border-2 border-[var(--accent)] bg-white px-5 py-4 text-center text-base font-semibold leading-relaxed text-slate-900 md:px-8">
          Les prix, quantités, marges, contraintes techniques et engagements contractuels restent
          sous la responsabilité de l’entreprise.
        </p>
      </Section>

      {/* 5. Méthode en 4 étapes */}
      <Section tone="white" aria-labelledby="ia-devis-methode">
        <h2 id="ia-devis-methode" className={OFC_TYPE_H2}>
          Comment préparer un devis BTP avec l’IA&nbsp;?
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {IA_DEVIS_ETAPES.map((etape) => (
            <li key={etape.n} className={`${OFC_CARD} relative rounded-2xl p-6`}>
              <span className="font-display text-3xl font-extrabold text-[var(--accent)]/25">
                {etape.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{etape.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{etape.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 6. Démonstration */}
      <Section tone="soft" aria-labelledby="ia-devis-demo">
        <h2 id="ia-devis-demo" className={OFC_TYPE_H2}>
          Exemple : passer de notes chantier à une trame de devis
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Notes chantier
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-700 md:text-base">
              {IA_DEVIS_DEMO_NOTES.map((note) => (
                <li key={note} className="flex gap-2.5">
                  <span className="text-[var(--accent)]" aria-hidden>
                    •
                  </span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--accent)]/25 bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              Devis structuré
            </p>
            <ol className="mt-5 space-y-2 text-sm text-slate-800 md:text-base">
              {IA_DEVIS_DEMO_POSTES.map((poste, i) => (
                <li key={poste}>
                  <span className="font-semibold text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}.
                  </span>{' '}
                  {poste}
                </li>
              ))}
            </ol>
            <dl className="mt-6 grid gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <div className="flex justify-between gap-3">
                <dt>PU HT</dt>
                <dd className="font-medium text-slate-800">[à compléter]</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Quantité</dt>
                <dd className="font-medium text-slate-800">[à vérifier]</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>TVA</dt>
                <dd className="font-medium text-slate-800">[à déterminer selon opération]</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      {/* 7. Peut / Ne doit pas */}
      <Section tone="white" aria-labelledby="ia-devis-limites">
        <h2 id="ia-devis-limites" className={OFC_TYPE_H2}>
          L’IA est un assistant. Pas un métreur automatique.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent-soft)]/50 p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-slate-900">Elle peut</h3>
            <ul className="mt-5 space-y-3">
              {IA_DEVIS_PEUT.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-slate-700 md:text-base">
                  <span className="shrink-0 font-semibold text-[var(--accent)]" aria-hidden>
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-slate-900">Elle ne doit pas</h3>
            <ul className="mt-5 space-y-3">
              {IA_DEVIS_NE_DOIT_PAS.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-slate-700 md:text-base">
                  <span className="shrink-0 font-semibold text-slate-500" aria-hidden>
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 8. Formation */}
      <Section
        id="formation-ia-devis"
        tone="soft"
        aria-labelledby="ia-devis-formation"
        className="scroll-mt-24"
      >
        <h2 id="ia-devis-formation" className={OFC_TYPE_H2}>
          Apprenez à utiliser l’IA sur vos propres devis BTP
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          La formation est conçue pour les professionnels du bâtiment qui souhaitent utiliser
          concrètement l’intelligence artificielle dans leur activité. Les exercices peuvent
          s’appuyer sur vos propres documents et vos situations métier.
        </p>

        <article className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
          <div className="border-b border-slate-100 bg-[var(--accent)] px-6 py-5 text-white md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
              Programme catalogue
            </p>
            <h3 className="mt-2 font-display text-xl font-bold md:text-2xl">
              {IA_DEVIS_FORMATION_FACTS.titre}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              {IA_DEVIS_FORMATION_FACTS.promesse}
            </p>
          </div>
          <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">Durée</dt>
                <dd className="mt-1 text-slate-900">{IA_DEVIS_FORMATION_FACTS.duree}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Modalité</dt>
                <dd className="mt-1 text-slate-900">{IA_DEVIS_FORMATION_FACTS.modalite}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Public</dt>
                <dd className="mt-1 text-slate-900">{IA_DEVIS_FORMATION_FACTS.public}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Prérequis</dt>
                <dd className="mt-1 text-slate-900">{IA_DEVIS_FORMATION_FACTS.prerequis}</dd>
              </div>
            </dl>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">Tarif</dt>
                <dd className="mt-1 text-slate-900">{IA_DEVIS_FORMATION_FACTS.tarif}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Financement</dt>
                <dd className="mt-1 text-slate-900">{IA_DEVIS_FORMATION_FACTS.financement}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Lieu</dt>
                <dd className="mt-1 text-slate-900">{IA_DEVIS_FORMATION_FACTS.lieu}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Effectif</dt>
                <dd className="mt-1 text-slate-900">{IA_DEVIS_FORMATION_FACTS.effectif}</dd>
              </div>
            </dl>
          </div>
          <ul className="grid gap-3 border-t border-slate-100 px-6 py-6 sm:grid-cols-2 md:px-8">
            {IA_DEVIS_FORMATION_HIGHLIGHTS.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm font-medium text-slate-800">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-6 sm:flex-row sm:flex-wrap md:px-8">
            <Link
              href={IA_DEVIS_FORMATION_HREF}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3`}
            >
              Voir le programme de la formation
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
            </Link>
            <CtaRdv
              origin="ia-devis-formation"
              variant="secondary"
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-12 items-center justify-center px-7 py-3`}
            />
          </div>
        </article>
      </Section>

      {/* 9. Livrables */}
      <Section tone="white" aria-labelledby="ia-devis-livrables">
        <h2 id="ia-devis-livrables" className={OFC_TYPE_H2}>
          À l’issue de la formation
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {IA_DEVIS_LIVRABLES.map((card) => (
            <article key={card.titre} className={`${OFC_CARD} rounded-2xl p-6`}>
              <h3 className="font-display text-lg font-bold text-slate-900">→ {card.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 10. Prompts SEO (descendu) */}
      <Section tone="soft" aria-labelledby="ia-devis-prompts">
        <h2 id="ia-devis-prompts" className={OFC_TYPE_H2}>
          Exemples de prompts IA pour les devis BTP
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          Des prompts prêts à adapter pour accélérer la rédaction et éviter de repartir d’une page
          blanche. L’IA structure le document ; vous restez seul juge des montants, quantités et
          mentions réglementaires.
        </p>
        <div className="mt-10">
          <IaDevisPromptsAccordion prompts={IA_DEVIS_PROMPTS_PAR_METIER} />
        </div>
      </Section>

      {/* 11. Checklist */}
      <Section tone="white" aria-labelledby="ia-devis-checklist">
        <h2 id="ia-devis-checklist" className={OFC_TYPE_H2}>
          Avant d’envoyer un devis préparé avec l’IA
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          L’IA accélère la préparation. La responsabilité du document signé reste entièrement la
          vôtre. Aucune règle fiscale n’est appliquée automatiquement : le taux de TVA dépend de
          l’opération.
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {IA_DEVIS_CHECKLIST.map((item) => (
            <li
              key={item}
              className="flex min-h-12 items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slate-300 bg-white text-[10px] text-slate-400"
                aria-hidden
              >
                □
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* 12. Erreurs */}
      <Section tone="soft" aria-labelledby="ia-devis-erreurs">
        <h2 id="ia-devis-erreurs" className={OFC_TYPE_H2}>
          Erreurs à éviter
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {IA_DEVIS_ERREURS.map((card) => (
            <article key={card.titre} className={`${OFC_CARD} rounded-2xl p-5`}>
              <h3 className="font-display text-base font-bold text-slate-900">→ {card.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 13. Expertise */}
      <Section tone="white" aria-labelledby="ia-devis-expertise">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12">
          <div className="mx-auto w-full max-w-[14rem] lg:mx-0">
            <div className="overflow-hidden rounded-xl p-1 ring-1 ring-slate-200">
              <ProfilePhoto title="Laure Olivié — formatrice IA pour le BTP" />
            </div>
          </div>
          <div className="min-w-0">
            <h2 id="ia-devis-expertise" className={OFC_TYPE_H2}>
              Une formation pensée pour les usages réels du BTP
            </h2>
            <p className="mt-4 text-lg font-semibold text-slate-900">Laure Olivié</p>
            <p className="mt-1 text-[var(--accent)] font-medium">
              Formatrice IA spécialisée BTP
            </p>
            <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-slate-600 md:text-base">
              <li>OFC Création d’Entreprise</li>
              <li>Organisme certifié Qualiopi</li>
              <li>Interventions en Île-de-France</li>
              <li>Ancienne dirigeante en travaux publics — {formatAnneesExperienceBTP()}</li>
            </ul>
            <div className="mt-8">
              <PreuveSociale />
            </div>
          </div>
        </div>
      </Section>

      {/* 14. FAQ */}
      <Section tone="soft" aria-labelledby="ia-devis-faq">
        <h2 id="ia-devis-faq" className={OFC_TYPE_H2}>
          Questions fréquentes — IA et devis BTP
        </h2>
        <div className="mt-10">
          <IaDevisFaqAccordion items={IA_DEVIS_FAQ} />
        </div>
      </Section>

      {/* 15. CTA final */}
      <CTASection
        eyebrow="Formation IA devis BTP"
        titleId="ia-devis-cta-final"
        origin="ia-devis-cta-final"
        title="Vous voulez gagner du temps sur vos devis avec l’IA ?"
        description="Présentez-moi votre organisation actuelle et vos besoins. Nous identifierons les usages de l’IA réellement utiles à votre entreprise."
        secondaryHref={LINKS.formations}
        secondaryLabel="Voir toutes les formations IA BTP"
      />

      {/* 16. Pour aller plus loin */}
      <Section tone="white" aria-labelledby="ia-devis-aller-plus-loin" className="!pt-8 !pb-16">
        <h2 id="ia-devis-aller-plus-loin" className="font-display text-xl font-bold text-slate-900">
          Pour aller plus loin
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {IA_DEVIS_ALLER_PLUS_LOIN.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`${OFC_CARD} group block rounded-2xl p-5 transition-colors hover:border-[var(--accent)]`}
            >
              <p className="font-semibold text-slate-900 group-hover:text-[var(--accent)]">
                {card.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
