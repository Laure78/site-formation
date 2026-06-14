import Link from 'next/link';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { Calendar, Check, Download, Users } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { getDedicatedFormationCoursePageJsonLd } from '@/lib/schema-course-formations';
import { PHOTOS } from '@/lib/photos';
import {
  FormationCourseHero,
  FormationHeroPhoto,
} from '@/components/formations/FormationCourseHero';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_AVANCE_HT,
  LIBELLE_EFFECTIF_GROUPE_COURT,
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,

  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import type { FAQItem } from '@/lib/faq';

const PATH = LINKS.formationIaCctpAnalyseDceBtp;

export const metadata = createPageMetadata({
  title: 'Formation IA CCTP & DCE BTP — Inter & Intra',
  description:
    'Formation IA analyse CCTP/DCE pour entreprises BTP : 4h en présentiel, inter ou intra. Qualiopi, financement possible selon éligibilité. RDV gratuit.',
  path: PATH,
  appendAuthorSuffix: false,
  keywords: [
    'formation IA CCTP',
    'analyse DCE BTP',
    'formation analyse CCTP',
    'ChatGPT CCTP',
    'Claude Pro CCTP',
    'mémoire technique IA BTP',
    'Qualiopi',
    'Constructys',
  ],
  image: {
    url: PHOTOS.btpFormationChantierPlans2026.src,
    width: PHOTOS.btpFormationChantierPlans2026.width,
    height: PHOTOS.btpFormationChantierPlans2026.height,
    alt: PHOTOS.btpFormationChantierPlans2026.alt,
  },
});

const formationCourseGraph = getDedicatedFormationCoursePageJsonLd(PATH);

const FAQ_ITEMS: FAQItem[] = [
  {
    q: 'Faut-il Claude Pro ou ChatGPT Plus ?',
    a: 'Les deux conviennent. Claude Pro est souvent plus confortable sur les PDF longs. ChatGPT Plus suffit si vous découpez bien les pièces. Je vous aide à trancher selon vos habitudes en session.',
  },
  {
    q: 'Constructys peut-il financer ma formation IA appliquée au bâtiment ?',
    a: 'Le financement dépend de votre éligibilité au Plan de Développement des Compétences et de la validation du dossier. OFC est certifié Qualiopi et référencé Constructys : nous préparons les pièces adaptées.',
  },
  {
    q: 'La formation est-elle adaptée aux marchés privés (pas que publics) ?',
    a: 'Oui. Les marchés privés utilisent souvent les mêmes familles de pièces. La méthode reste : lire le périmètre technique, croiser le bordereau, sécuriser le mémoire.',
  },
  {
    q: 'Comment se déroule une session intra ?',
    a: 'Je me déplace dans vos locaux, en présentiel (Île-de-France). Nous travaillons sur des extraits anonymisés de vos DCE pour ancrer la méthode.',
  },
  {
    q: 'Quel est le délai pour organiser une formation ?',
    a: 'Comptez en général trois à six semaines selon les disponibilités et le financement. Un échange de 15 minutes permet de caler une date.',
  },
];

const MODULES = [
  {
    titre: 'Module 1 — Comprendre l’IA appliquée aux CCTP : opportunités et limites',
    duree: '1 h',
    points: [
      'Ce que l’IA fait bien sur un CCTP : synthèse, grille de risques, questions ouvertes.',
      'Ce qu’elle ne fait pas : valider un DTU, signer une offre, remplacer le regard métier.',
      'Protocole anti-hallucination : sources, doubles lectures, traçabilité.',
    ],
  },
  {
    titre: 'Module 2 — Méthode d’analyse en 4 étapes : préparation, extraction, risques, croisement DPGF',
    duree: '1 h',
    points: [
      'Préparer et nommer les pièces : CCTP, RC, CCAP, DPGF.',
      'Extraire les exigences par lot avec références de paragraphes.',
      'Scanner les clauses pénalités, délais, interfaces entre lots.',
      'Croiser ligne à ligne avec le bordereau pour éviter les oublis de chiffrage.',
    ],
  },
  {
    titre: 'Module 3 — Atelier pratique sur vos CCTP réels',
    duree: '1 h',
    points: [
      'Application sur extraits anonymisés de vos marchés.',
      'Relecture croisée chargé d’affaires / conducteur de travaux.',
      'Liste des points à clarifier avec le maître d’œuvre avant offre.',
    ],
  },
  {
    titre: 'Module 4 — Industrialiser : créer vos GPTs et projets spécialisés',
    duree: '1 h',
    points: [
      'Modèles de prompts réutilisables par type de lot.',
      'Paramétrage de projets (Claude) ou GPTs (ChatGPT) pour votre vocabulaire.',
      'Charte interne : données sensibles, validation humaine, archivage.',
    ],
  },
];

const HERO_BULLETS = [
  'Qualiopi',
  'Finançable Constructys selon dossier',
  'Inter & intra (présentiel, Île-de-France)',
];

export default function FormationIaCctpAnalyseDceBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);
  const nPros = formatProfessionalsTrainedCount();

  return (
    <div>
      <JsonLd id="schema-formation-course" schema={formationCourseGraph} />
      <JsonLd id="schema-faq" schema={faqSchema} />

      <FormationCourseHero
        catalogueRef="NIV-02"
        refLine={`Visio ou présentiel · ${SESSION_DUREE_LIBELLE} · Niveau avancé`}
        title="Formation IA Analyse CCTP & DCE — Pour les entreprises BTP qui répondent aux appels d'offres"
        subtitle={`Analysez un DCE de 80 pages en 30 minutes. Méthode testée par ${nPros} pros BTP.`}
        badges={HERO_BULLETS}
        summaryItems={[
          `Note moyenne ${SOCIAL_PROOF.AVERAGE_RATING} sur les évaluations OFC.`,
          `Forfait catalogue niveau avancé : ${formatTarifHt(TARIF_FORFAIT_AVANCE_HT)} € HT / session (${SESSION_DUREE_LIBELLE}, jusqu'à 12 participants).`,
          `${LIBELLE_EFFECTIF_GROUPE_COURT}.`,
        ]}
        image={
          <FormationHeroPhoto
            src={PHOTOS.btpFormationChantierPlans2026.src}
            alt={PHOTOS.btpFormationChantierPlans2026.alt}
            width={PHOTOS.btpFormationChantierPlans2026.width}
            height={PHOTOS.btpFormationChantierPlans2026.height}
            priority
          />
        }
        ctas={
          <>
            <RdvLink className="rounded-lg bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600">
              Réserver un RDV visio gratuit (15 min)
            </RdvLink>
            <a
              href="mailto:laureolivie@yahoo.fr?subject=Programme%20PDF%20%E2%80%94%20formation%20IA%20CCTP%20%2F%20DCE"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-200 px-6 py-3.5 font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              <Download size={20} strokeWidth={1.5} />
              Télécharger le programme PDF
            </a>
          </>
        }
        footerLinks={
          <a href="#programme" className="font-medium text-[var(--accent)] hover:underline">
            Voir le programme détaillé
          </a>
        }
      >
        <p>
          Cette <strong>formation IA CCTP</strong> s’adresse aux équipes qui répondent aux marchés.
          Vous apprenez à analyser un <strong>DCE BTP</strong> sans vous noyer dans les pages.
          Le financement passe souvent par l’<strong>OPCO Constructys</strong> : je vous oriente sur les
          pièces utiles.
        </p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <section className="rounded-2xl border border-slate-200 bg-[#D4E3FC] p-6 md:p-8" style={{ borderLeftWidth: 4, borderLeftColor: '#377CF3' }}>
          <h2 className="font-display text-xl font-bold text-slate-900">
            Pour qui est cette formation ?
          </h2>
          <ul className="mt-4 space-y-2 text-slate-800">
            {[
              'Dirigeants de PME du bâtiment et des travaux publics',
              'Chargés d’affaires et responsables techniques',
              'Conducteurs de travaux impliqués dans les réponses',
              'Services appels d’offres et estimation',
              'Économistes de la construction sur le volet technique',
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2} />
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-700">
            Niveau requis : aucun prérequis IA. Il faut être à l’aise avec le bureautique courant et la lecture de
            pièces PDF.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ce que vous saurez faire à la fin de la formation
          </h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            {[
              'préparer un DCE pour l’IA sans mélanger les lots',
              'extraire les exigences techniques avec références de paragraphes',
              'repérer les clauses à risque avant le chiffrage',
              'croiser CCTP et DPGF pour éviter les oublis de périmètre',
              'produire un premier jet de mémoire technique aligné sur le CCTP',
              'configurer des prompts et assistants réutilisables pour vos prochains dossiers',
              'appliquer un protocole de relecture humaine aligné sur vos engagements Qualiopi',
            ].map((o) => (
              <li key={o} className="flex gap-2">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                <span>Vous serez capable de {o}.</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="programme" className="mt-12 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-slate-900">Programme détaillé (4 heures)</h2>
          <div className="mt-8 space-y-6">
            {MODULES.map((m) => (
              <div
                key={m.titre}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-slate-900">{m.titre}</h3>
                  <span className="text-sm font-medium text-[var(--accent)]">{m.duree}</span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  {m.points.map((p) => (
                    <li key={p}>▸ {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="font-display text-xl font-bold text-slate-900">Modalités pratiques</h2>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li className="flex gap-2">
              <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Format :</strong> présentiel ou visioconférence (Zoom).{' '}
                <strong>Durée :</strong> {SESSION_DUREE_LIBELLE} en demi-journée dense, ou journée complète possible en
                intra sur devis.
              </span>
            </li>
            <li className="flex gap-2">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Effectifs :</strong> 1 à 12 participants en intra, 6 à 15 en inter selon organisme.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>Lieux inter :</strong> sessions via partenaires (FFB Grand Paris, FFB Île-de-France, CSFE,
                CNAM Île-de-France, Lefebvre Dalloz) selon calendrier.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-slate-600">{EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Tarifs et financement</h2>
          <p className="mt-3 text-slate-700">
            <strong>Tarif intra indicatif :</strong> à partir de {formatTarifHt(TARIF_FORFAIT_AVANCE_HT)} € HT pour une session de{' '}
            {SESSION_DUREE_LIBELLE} (jusqu&apos;à 12 participants, selon cahier des charges).
          </p>
          <p className="mt-3 text-slate-700">
            <strong>Tarif inter :</strong> selon organisme partenaire et dispositif (FFB, CSFE, CNAM, etc.).
          </p>
          <p className="mt-3 text-slate-700">
            <strong>Constructys :</strong> plafond pédagogique 2026 — 24 € HT/h/participant dans le Bâtiment, dans
            la limite des règles du Plan de Développement des Compétences.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-3 py-2">Exemple</th>
                  <th className="px-3 py-2">Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-3 py-2">PME 8 salariés, intra 4 h (grille OFC)</td>
                  <td className="px-3 py-2">{formatTarifHt(TARIF_FORFAIT_AVANCE_HT)} € HT</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-3 py-2">Prise en charge illustrative Constructys (ex. 3 participants, 4 h)</td>
                  <td className="px-3 py-2">− 288 € HT</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-3 py-2 font-medium">Reste à charge indicatif</td>
                  <td className="px-3 py-2 font-medium">962 € HT</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Exemple non contractuel : le montant Constructys dépend de votre branche, de votre OPCO et de la
            validation du dossier.
          </p>
          <p className="mt-4">
            <Link
              href={LINKS.financement}
              className="font-medium text-[var(--accent)] underline hover:no-underline"
            >
              En savoir plus sur le financement Constructys formation IA pour le BTP
            </Link>
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Pourquoi me choisir comme formatrice ?</h2>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li>
              <strong>Expérience terrain :</strong> j’ai dirigé ALIA BTP (travaux publics) avant de créer OFC. Je
              parle le langage chantier et dossier.
            </li>
            <li>
              <strong>Réseau :</strong> interventions avec FFB Grand Paris, FFB Île-de-France, CSFE étanchéité, CNAM
              Île-de-France, Lefebvre Dalloz, LinkedIn Learning — selon calendriers.
            </li>
            <li>
              <strong>Résultats :</strong> {nPros} professionnels formés, satisfaction {SOCIAL_PROOF.AVERAGE_RATING}.
            </li>
            <li>
              <strong>Différence :</strong> je ne suis pas une consultante IA qui a « appris le BTP sur slides ». J’ai
              conduit des opérations, puis j’ai spécialisé mon pédagogie sur l’IA utile au terrain.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Témoignages clients</h2>
          <p className="mt-2 text-sm text-slate-600">
            Après les sessions inter et intra, les retours Qualiopi mettent souvent en avant trois thèmes : la
            clarté des garde-fous, le gain de temps sur la lecture de pièces, la meilleure coordination entre
            chiffrage et technique. Les évaluations agrégées OFC sont de {SOCIAL_PROOF.AVERAGE_RATING} sur les
            dossiers suivis.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
          <p className="mt-4 text-sm text-slate-600">
            Pour des cas d’étude documentés (FFB / CSFE), voir aussi la page{' '}
            <Link href={LINKS.etudesCas} className="font-medium text-[var(--accent)] hover:underline">
              étude de cas FFB &amp; CSFE
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Foire aux questions</h2>
          <div className="mt-6">
            <FAQSection items={FAQ_ITEMS} />
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-[var(--accent)] p-8 text-white">
          <h2 className="font-display text-2xl font-bold">
            Réserver un RDV gratuit pour discuter de votre besoin
          </h2>
          <p className="mt-3 text-blue-100">
            15 minutes pour cadrer votre volume de marchés, vos lots sensibles et le format intra ou inter.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <RdvLink className="rounded-lg bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50">
              Réserver mon créneau
            </RdvLink>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="rounded-lg border-2 border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Écrire à {SITE_CONFIG.email}
            </a>
          </div>
          <p className="mt-4 text-xs text-blue-200">
            Données utilisées uniquement pour répondre à votre demande — pas de revente. Vous pouvez exercer vos
            droits RGPD en écrivant à {SITE_CONFIG.email}.
          </p>
          <p className="mt-6 text-sm">
            <Link
              href={LINKS.blogFormationIaCctpAnalyseDceBtp}
              className="font-medium text-white underline hover:no-underline"
            >
              Lire l’article pilier : formation IA CCTP, analyser un DCE BTP en 30 minutes
            </Link>
          </p>
        </section>

        <section className="mt-12 flex flex-wrap gap-4 text-sm text-slate-600">
          <Link href={LINKS.formations} className="font-medium text-[var(--accent)] hover:underline">
            ← Retour au catalogue des formations
          </Link>
          <span aria-hidden className="text-slate-300">
            |
          </span>
          <a href={buildSiteCalendlyCtaUrl('formations-formation-ia-cctp-analyse-dce-btp-contact-rdv-page-calendly')} className="font-medium text-[var(--accent)] hover:underline">
            Calendly — prise de rendez-vous
          </a>
        </section>

        <div className="mt-12">
          <AllerPlusLoin
            links={[
              { href: LINKS.formationAO, label: 'Formation IA appels d’offres BTP (catalogue)' },
              { href: LINKS.formationIaAnalyseCctp, label: 'Page analyse CCTP — angle terrain' },
              { href: LINKS.blogFormationIaCctpAnalyseDceBtp, label: 'Article pilier formation IA CCTP' },
            ]}
          />
        </div>

        <p className="mt-8 text-sm text-slate-500">
          <FooterTelOrMailLink />
        </p>
      </div>
    </div>
  );
}
