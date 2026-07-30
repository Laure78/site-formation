import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { Essentiel } from '@/components/readability/Essentiel';
import { Citation } from '@/components/readability/Citation';
import { FormationMetierJsonLd } from '@/components/seo/FormationMetierJsonLd';
import { InfosQualiopiLanding } from '@/components/formation/InfosQualiopi';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { OfcPromoVideoEmbed } from '@/components/media/OfcPromoVideoEmbed';
import { createPageMetadata } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';
import { PROOF, formatProofFormes } from '@/lib/proof';
import {
  FORMATION_IA_GROS_OEUVRE_BTP_H1,
  FORMATION_IA_GROS_OEUVRE_BTP_META_DESCRIPTION,
  FORMATION_IA_GROS_OEUVRE_BTP_META_TITLE,
  FORMATION_IA_GROS_OEUVRE_BTP_PATH,
  FORMATION_IA_GROS_OEUVRE_CALENDLY_CAMPAIGN,
  GROS_OEUVRE_COURSE,
  GROS_OEUVRE_FAQ,
  GROS_OEUVRE_INTERNAL_LINKS,
  GROS_OEUVRE_KEYWORDS,
  GROS_OEUVRE_PROMPTS,
} from '@/lib/formation-ia-gros-oeuvre-btp-landing';

export const revalidate = 3600;

const PATH = FORMATION_IA_GROS_OEUVRE_BTP_PATH;
const CALENDLY_HREF = buildSiteCalendlyCtaUrl(FORMATION_IA_GROS_OEUVRE_CALENDLY_CAMPAIGN);
const OFC = "OFC Création d'Entreprise";

export const metadata: Metadata = createPageMetadata({
  title: FORMATION_IA_GROS_OEUVRE_BTP_META_TITLE,
  description: FORMATION_IA_GROS_OEUVRE_BTP_META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  keywords: [...GROS_OEUVRE_KEYWORDS],
  openGraphType: 'website',
  appendAuthorSuffix: false,
  image: {
    url: '/images/formation-ia-intra-entreprise-batiment.webp',
    width: 1024,
    height: 571,
    alt: 'Formation IA pour le gros œuvre — session Qualiopi, devis et suivi chantier',
  },
});

const SOMMAIRE = [
  { href: '#probleme', label: 'Le problème : charge documentaire du gros œuvre' },
  { href: '#solution', label: 'La solution IA : devis, DCE, suivi' },
  { href: '#methode', label: 'Méthode en 5 étapes avec prompts BTP' },
  { href: '#resultats', label: 'Résultats et preuves' },
  { href: '#faq', label: 'FAQ' },
  { href: '#a-propos', label: 'Laure Olivié — formatrice' },
  { href: '#cta-final', label: 'Réservez votre visio découverte gratuite' },
] as const;

const ESSENTIEL = [
  'Gros œuvre en Île-de-France : devis, DCE / CCTP lot 2, planning et CR — présentiel uniquement.',
  'Session 4 h Qualiopi : brouillons encadrés, relecture humaine — l’IA ne tranche pas la conformité.',
  `Déjà ${formatProofFormes(PROOF.formes)} professionnels formés · note ${PROOF.note} (questionnaires fin de session).`,
  'Financement OPCO Constructys possible selon éligibilité — pas de distanciel pour les sessions.',
] as const;

export default function FormationIaGrosOeuvreBtpPage() {
  const faqItems = GROS_OEUVRE_FAQ.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <div className="bg-white text-slate-900">
      <FormationMetierJsonLd
        metierLabel="Gros œuvre BTP"
        path={PATH}
        courseName={GROS_OEUVRE_COURSE.name}
        courseDescription={GROS_OEUVRE_COURSE.description}
        duration="PT4H"
        price={TARIF_FORFAIT_DEBUTANT_HT}
        level="Professionnel"
        teaches={[...GROS_OEUVRE_COURSE.teaches]}
        faqItems={faqItems}
        scriptId="schema-formation-metier-gros-oeuvre"
      />

      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <article>
          <MetierIdfPresentielLine className="mb-3" />
          <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
            DTU 20.1 · Qualiopi · Île-de-France
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
            {FORMATION_IA_GROS_OEUVRE_BTP_H1}
          </h1>

          <div className="mt-8">
            <OfcPromoVideoEmbed variant="heroColumn" />
          </div>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {OFC} — formation IA &amp; ChatGPT pour les entreprises de gros œuvre du BTP : devis, DCE, suivi de
            chantier. Sessions en <strong className="text-slate-800">présentiel uniquement</strong> en Île-de-France
            (4&nbsp;h), certifiées Qualiopi. Financement possible selon éligibilité. Plus de{' '}
            <strong className="text-slate-800">{formatProofFormes(PROOF.formes)} professionnels</strong> formés · note{' '}
            <strong className="text-slate-800">{PROOF.note}</strong>.
          </p>

          <Essentiel className="mt-8" idPrefix="metier-gros-oeuvre" items={[...ESSENTIEL]} />

          <div className="mt-8">
            <ShortAnswerBlock>
              L&apos;IA aide à structurer devis, lectures de DCE et comptes rendus à partir de vos données ; elle ne
              remplace ni le métré ni la validation des normes (DTU 20.1) ni la responsabilité sur le chantier.
            </ShortAnswerBlock>
          </div>

          <nav aria-label="Sommaire" className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
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

          <section id="probleme" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Le problème des entreprises de gros œuvre : charge documentaire et normes
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                Les entreprises de gros œuvre enchaînent bétonnage, coffrage, ferraillage, élévations et reprises : chaque
                dossier mobilise le DTU 20.1, le CCTP lot 2, le DPGF et un planning à tenir face aux aléas. Le devis doit
                traduire des quantités fiables et des interfaces avec terrassement, étanchéité ou charpente.
              </p>
              <p>
                Le temps part aussi en rédaction : structure de devis, lecture de DCE, comptes rendus de coulage, courriers
                de report, mémoires techniques. Sans méthode, on reformule tard le soir les mêmes postes de coffrage et de
                ferraillage.
              </p>
              <p>
                Sur les marchés, une IA mal cadrée invente des volumes, des dosages ou des références DTU. La formation
                Qualiopi pose le cadre — prompts, sources, mention [à valider par le métré], relecture et confidentialité —
                sans remplacer le géomètre-métré ni le fascicule.
              </p>
              <p>
                En Île-de-France, les délais clients et MOA sont souvent tendus : répondre vite avec un devis structuré
                permet de rester dans la course. L&apos;objectif des sessions {OFC} est de gagner du temps sur la mise en
                forme des documents, pas de chiffrer définitivement un ouvrage à la place d&apos;une personne compétente.
              </p>
            </div>
          </section>

          <section id="solution" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">La solution IA</h2>
            <p className="mt-6 text-slate-700 leading-relaxed">
              Les sessions combinent démonstration et ateliers sur vos cas anonymisés. Vous apprenez à produire des
              brouillons pour devis gros œuvre, synthèse de DCE / CCTP lot 2, CR de coordination et courriers de planning —
              toujours avec validation métier et croisement du DTU 20.1. Présentiel uniquement en Île-de-France.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Devis : structure de postes (fondations, élévations, reprises, interfaces) sans prix inventés',
                'DCE / CCTP : extraction des exigences et questions à poser au maître d’œuvre',
                'Suivi de chantier : CR, courriers de report, jalons lisibles pour client et interne',
                'Relecture humaine systématique avant envoi client ou marché',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="methode" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Méthode en 5 étapes — prompts ChatGPT pour le gros œuvre
            </h2>
            <p className="mt-4 text-slate-600">
              À adapter à vos tarifs internes et à vos modèles. Toujours valider les sorties avec le référentiel technique
              (DTU 20.1, notices, CCTP).
            </p>
            <ol className="mt-8 space-y-10">
              {GROS_OEUVRE_PROMPTS.map((p, i) => (
                <li
                  key={p.title}
                  className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 shadow-sm md:p-6"
                >
                  <p className="text-sm font-semibold text-[#377CF3]">
                    Étape {i + 1} sur {GROS_OEUVRE_PROMPTS.length}
                  </p>
                  <h3 className="font-display mt-2 text-lg font-semibold text-slate-900">{p.title}</h3>
                  <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-800 shadow-sm">
                    {p.body}
                  </pre>
                </li>
              ))}
            </ol>
          </section>

          <section id="resultats" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Résultats et preuves</h2>
            <p className="mt-6 text-slate-700 leading-relaxed">
              Indicateurs sourcés {OFC} : {formatProofFormes(PROOF.formes)} professionnels formés · note moyenne{' '}
              {PROOF.note} ({PROOF.mentionSource})
            </p>
            <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">
                  Ordres de grandeur observés en formation — mise en forme documentaire gros œuvre
                </caption>
                <thead className="bg-[#F2F2F2] text-slate-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Tâche</th>
                    <th className="px-4 py-3 font-semibold">Avant méthode</th>
                    <th className="px-4 py-3 font-semibold">Avec méthode OFC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium">Ossature de devis</td>
                    <td className="px-4 py-3">Longue mise en forme manuelle</td>
                    <td className="px-4 py-3">Brouillon structuré, relecture métier</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium">Lecture DCE / CCTP lot 2</td>
                    <td className="px-4 py-3">Notes éparses</td>
                    <td className="px-4 py-3">Tableau d’exigences + questions MOE</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium">CR / courrier de coordination</td>
                    <td className="px-4 py-3">Reformulation tardive</td>
                    <td className="px-4 py-3">Premier jet clair, validation humaine</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <DisclaimerGains className="mt-4" />
            <Citation
              className="mt-8"
              quote="« On a gagné en homogénéité entre le bureau et le chantier sur les CR. »"
              role="Conducteur de travaux, entreprise gros œuvre — Essonne (retour OFC, anonymisé)"
              variant="client"
            />
          </section>

          <section id="faq" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">FAQ</h2>
            <div className="mt-8 space-y-5">
              {GROS_OEUVRE_FAQ.map((item) => (
                <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-slate-900">{item.q}</h3>
                  <div className="mt-2 text-slate-600 leading-relaxed">
                    <FAQAnswer content={item.a} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="liens-internes" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Formations et pages proches
            </h2>
            <p className="mt-4 text-slate-600">
              Catalogue Qualiopi, couverture Île-de-France et métiers en interface avec le gros œuvre.
            </p>
            <ul className="mt-8 space-y-4">
              {GROS_OEUVRE_INTERNAL_LINKS.map((l) => (
                <li key={l.href} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <Link href={l.href} className="font-semibold text-[#377CF3] underline hover:no-underline">
                    {l.title}
                  </Link>
                  <p className="mt-1 text-sm text-slate-600">{l.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <InfosQualiopiLanding formationTitle={GROS_OEUVRE_COURSE.name} />

          <LaureOlivieFormationPortrait
            contextLine="Elle accompagne notamment les équipes de gros œuvre sur devis, DCE et suivi de chantier — en présentiel en Île-de-France."
            showFullParcoursLink={false}
          />

          <section
            id="cta-final"
            className="scroll-mt-24 mt-14 rounded-2xl border border-slate-200 bg-[#377CF3] px-6 py-10 text-white shadow-sm md:px-10"
          >
            <h2 className="font-display text-xl font-bold md:text-2xl">
              Prochaine étape : visio découverte gratuite
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-blue-100 md:text-base">
              30 minutes pour cadrer votre besoin gros œuvre (devis, DCE, suivi), le format présentiel en Île-de-France
              et le montage Constructys selon éligibilité — sans engagement.
            </p>
            <div className="mt-6">
              <a
                href={CALENDLY_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#377CF3] shadow-sm hover:bg-blue-50"
              >
                Réservez votre visio découverte gratuite
                <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
              </a>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
