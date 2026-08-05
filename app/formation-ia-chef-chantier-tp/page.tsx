import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import {
  CHEF_CHANTIER_EN_BREF,
  CHEF_CHANTIER_FAQ,
  CHEF_CHANTIER_PREREQUIS,
  CHEF_CHANTIER_PROGRAMME,
  CHEF_CHANTIER_PUBLIC,
  CHEF_CHANTIER_USE_CASES,
  FORMATION_IA_CHEF_CHANTIER_TP_PATH,
  FORMATION_IA_CHEF_CHANTIER_TP_SEO,
  PROMPT_ALERTES_CHEF,
  PROMPT_EMAILS_CHEF,
  PROMPT_RAPPORT_CHEF,
  PROMPT_VARIATION_CHEF,
} from '@/lib/formation-ia-chef-chantier-tp-landing';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: FORMATION_IA_CHEF_CHANTIER_TP_SEO.title,
  description: FORMATION_IA_CHEF_CHANTIER_TP_SEO.description,
  path: FORMATION_IA_CHEF_CHANTIER_TP_PATH,
  descriptionFinal: true,
  keywords: [
    'formation IA chef de chantier TP',
    'ChatGPT rapport chantier',
    'coordination sous-traitants TP',
    'variation CCTP',
    'PPSPS chantier',
    'OPCO Constructys',
    'Qualiopi BTP',
    'travaux publics IA',
  ],
  openGraphType: 'website',
});

const SOMMAIRE = [
  { href: '#cas-usage', label: 'Cas d’usage IA chef de chantier TP' },
  { href: '#le-probleme', label: 'Coordination et documentation TP' },
  { href: '#public', label: 'Public & prérequis' },
  { href: '#programme', label: 'Ce que vous apprenez' },
  { href: '#methode', label: 'Méthode + prompts ChatGPT / Claude' },
  { href: '#resultats', label: 'Résultats concrets' },
  { href: '#faq', label: 'FAQ' },
  { href: '#rdv', label: 'Visio découverte gratuite' },
];

export default function FormationIaChefChantierTpPage() {
  const faqSchema = getFAQSchema([...CHEF_CHANTIER_FAQ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-slate-800">
      {faqSchema ? <JsonLd id="schema-faq-chef-chantier-tp" schema={faqSchema} /> : null}

      <nav className="mb-8 text-sm text-slate-600">
        <Link href={LINKS.home} className="text-[#377CF3] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href={LINKS.formations} className="text-[#377CF3] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA chef de chantier TP</span>
      </nav>

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {FORMATION_IA_CHEF_CHANTIER_TP_SEO.h1}
        </h1>
        <p className="mt-2 text-xl font-medium text-[#377CF3]">
          Gagnez du temps sur la coordination et la documentation
        </p>

        <EnBref>
          {CHEF_CHANTIER_EN_BREF.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </EnBref>

        <p className="mt-6 text-xl text-slate-600">
          Objectif : accélérer rapports, mails et dossiers pour passer plus de temps sur le terrain.{' '}
          <strong>Île-de-France</strong> &amp; <strong>Grand Paris</strong> — <strong>Qualiopi</strong> —
          financement OPCO possible selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA (ChatGPT, Claude) aide à structurer textes et tableaux ; les décisions de chantier, la sécurité et les
            engagements contractuels restent sous votre responsabilité et celles des personnes habilitées. Relisez
            toujours avant envoi.
          </ShortAnswerBlock>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <RdvLink
            campaign="formation-ia-chef-chantier-tp-hero"
            ctaPosition="hero"
            variant="primary"
            className="rounded-lg px-5 py-3"
          >
            Réserver une visio découverte gratuite
          </RdvLink>
          <Link
            href={LINKS.formationIaBtpNiveau1BatimentTp}
            className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:border-[#377CF3] hover:text-[#377CF3]"
          >
            Voir NIV-01 — Bâtiment &amp; TP
          </Link>
        </div>

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

        <section id="cas-usage" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Cas d&apos;usage concrets pour chefs de chantier TP
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Remontés en tête de page : les situations que vous traitez au quotidien sur chantiers eau, VRD et
            terrassement.
          </p>
          <ul className="mt-6 space-y-5">
            {CHEF_CHANTIER_USE_CASES.map((item) => (
              <li key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le problème : coordination et paperasse TP
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Vous êtes <strong>chef de chantier TP</strong> en Île-de-France ou Grand Paris : équipes, sous-traitants,
            sécurité, <strong>rapports d’avancement</strong>, CCTP, planning et relations avec le maître d’ouvrage.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">Sans aide à la rédaction, une part importante du temps part en :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Réunions et arbitrages du jour',
              'Coordination par courriels avec les entreprises',
              'Comptes rendus de chantier et suivi des écarts',
              'Demandes de variation et justification des délais',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-slate-600">
            L’objectif n’est pas de remplacer votre autorité terrain : c’est d’accélérer la mise en forme pour
            retrouver du temps sur le chantier — avec relecture systématique.
          </p>
        </section>

        <section id="public" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            À qui s&apos;adresse cette formation ?
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {CHEF_CHANTIER_PUBLIC.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">Prérequis</h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {CHEF_CHANTIER_PREREQUIS.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="programme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ce que vous apprenez pendant la formation
          </h2>
          <ol className="mt-6 list-decimal space-y-6 pl-5 text-slate-700">
            {CHEF_CHANTIER_PROGRAMME.map((item) => (
              <li key={item.title}>
                <strong className="text-slate-900">{item.title}</strong>
                <p className="mt-2 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[#377CF3] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour adapter ces usages à votre chantier TP.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas — prompts ChatGPT / Claude
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : rapport d’avancement quotidien
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_RAPPORT_CHEF}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : emails de coordination sous-traitants
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_EMAILS_CHEF}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : gestion d’une variation CCTP
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_VARIATION_CHEF}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : rappels sécurité (complément au PPSPS)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_ALERTES_CHEF}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Ordres de grandeur possibles — <strong>variables</strong> selon la taille du projet et votre temps de
            relecture :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Temps indicatif avant / après usage de l’IA sur la coordination chef de chantier TP
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Sans IA</th>
                  <th className="p-3 font-semibold text-slate-900">Avec IA</th>
                  <th className="p-3 font-semibold text-slate-900">Gain typique</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Rapport d’avancement</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Brouillon structuré</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mails sous-traitants</td>
                  <td className="p-3">Rédaction</td>
                  <td className="p-3">Textes cadrés</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Variation CCTP</td>
                  <td className="p-3">À monter de zéro</td>
                  <td className="p-3">Plan + chiffres indicatifs</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Rappels sécurité</td>
                  <td className="p-3">Dispersé</td>
                  <td className="p-3">Checklist</td>
                  <td className="p-3">Modéré</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Suivi planning</td>
                  <td className="p-3">Synthèse manuelle</td>
                  <td className="p-3">Tableaux si données fournies</td>
                  <td className="p-3">Modéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <DisclaimerGains className="mt-4" />

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="italic leading-relaxed text-slate-700">
              « J’avais moins de temps pour anticiper qu’écrire des mails. Les brouillons me font gagner du souffle sur
              la coordination — je reste le seul à valider ce qui part. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Chef de chantier TP, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — chefs de chantier TP et IA</h2>
          <div className="mt-8 space-y-6">
            {CHEF_CHANTIER_FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  <FAQAnswer content={a} />
                </p>
              </div>
            ))}
          </div>
        </section>

        <LaureOlivieFormationPortrait />
        <section
          id="rdv"
          className="scroll-mt-24 mt-14 rounded-2xl bg-[#377CF3] p-8 text-white md:p-10"
        >
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 leading-relaxed text-blue-100">
            Rapports, mails, variations : démonstration sur un cas type. Vous repartez avec des prompts à adapter à
            votre organisation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink
              campaign="formation-ia-chef-chantier-tp-rdv-final"
              ctaPosition="footer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#377CF3] hover:bg-blue-50"
            >
              Réserver votre visio découverte
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
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
          <h2 className="font-display text-lg font-bold text-slate-900">
            Formation IA chef de chantier TP — Île-de-France &amp; Grand Paris
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            OFC Création d’Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}
            {sitePhoneDisplaySuffix()}
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: LINKS.formations, label: 'Catalogue formations IA appliquées au bâtiment' },
            { href: LINKS.formationIaBtpNiveau1BatimentTp, label: 'NIV-01 — Bâtiment & travaux publics' },
            { href: LINKS.formationConducteurTravaux, label: 'Formation IA conducteur de travaux BTP' },
            { href: LINKS.formationIaConducteurEnginsTp, label: 'Formation IA conducteur d’engins TP' },
            { href: LINKS.financement, label: 'Financement Constructys' },
          ]}
        />
      </article>
    </div>
  );
}
