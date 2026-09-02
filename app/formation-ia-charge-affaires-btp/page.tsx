import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { PreuveSociale } from '@/components/PreuveSociale';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { EFFECTIF_GROUPE_MAX, TARIF_FORFAIT_AVANCE_HT, libelleTarifsDualCourt } from '@/lib/tarifs-sessions';
import { SOCIAL_PROOF, IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { LiensConnexes } from '@/components/LiensConnexes';
import { RelatedLinks } from '@/components/RelatedLinks';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';
import { buildFormationFicheCourseJsonLd } from '@/lib/schema-formation-course-jsonld';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';

import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';

export const revalidate = 3600;
const PATH = '/formation-ia-charge-affaires-btp';

const SEO_TITLE = "IA pour chargé d'affaires BTP IDF | Laure Olivié";

const BASE_URL = SITE_CONFIG.url.replace(/\/$/, '');

/** Course — GEO / rich results (complète la FAQ et le fil d’Ariane). */
const COURSE_JSON_LD: Record<string, unknown> = {
  ...buildFormationFicheCourseJsonLd({
    name: "Formation IA pour Chargé d'Affaires BTP",
    description:
      "Formation ChatGPT et Claude AI pour chargés d'affaires BTP : pré-chiffrage devis, mémoire technique, analyse DCE, relances prospects, argumentaires prix. Organisme certifié Qualiopi. Financement possible selon éligibilité. Présentiel Île-de-France.",
    path: PATH,
    educationalLevel: 'Advanced',
    organizationId: `${BASE_URL}/#organization`,
    instructorName: 'Laure Olivié',
  }),
  courseMode: 'onsite',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Île-de-France',
  },
  instructor: {
    '@type': 'Person',
    name: 'Laure Olivié',
    jobTitle: 'Formatrice IA pour le BTP',
    sameAs: SCHEMA_LINKEDIN_PROFILE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: String(TARIF_FORFAIT_AVANCE_HT),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: buildSiteCalendlyCtaUrl('formation-ia-charge-affaires-btp-schema-offer'),
  },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: "Chargé d'affaires BTP",
  },
};

export const metadata = createMetierBtpPageMetadata('chargé d\'affaires', {
  title: SEO_TITLE,
  description:
    "Formation IA pour chargés d'affaires BTP : chiffrage, DCE, mémoires techniques, relances. Présentiel Île-de-France — organisme certifié Qualiopi, Constructys possible. RDV gratuit.",
  path: PATH,
  keywords: [
    'formation IA chargé d\'affaires BTP',
    'ChatGPT devis BTP',
    'IA mémoire technique',
    'IA avant-vente bâtiment',
  ],
  openGraphType: 'website',
  appendAuthorSuffix: false,
  image: {
    url: '/images/og/formation-ia-charge-affaires-btp.webp',
    width: 1200,
    height: 630,
    alt: 'Formation IA chargé d\'affaires BTP — devis, AO et suivi client',
  },
});

const PROMPT_PRECHIFFRAGE = `Tu es chargé d'affaires pour une entreprise de [spécialité BTP] en France.
Voici le descriptif sommaire du client pour [type de chantier] :
[Collez le descriptif — même flou]
Génère un pré-chiffrage structuré avec :

Liste des postes à prévoir (DPGF sommaire par corps d'état)
Quantités estimées (unité + valeur indicative) avec hypothèses explicites
Prix unitaires moyens constatés en Île-de-France en 2026
Total HT approximatif, fourchette basse/haute
Liste des 5 questions à poser au client avant devis définitif

Format tableau. Précise toujours les hypothèses prises.`;

const PROMPT_MEMOIRE_AO = `Marché : [objet], maître d'ouvrage [nom], lot [numéro + intitulé].
Entreprise : [nom], [CA annuel], [effectif], [3 références comparables].
Génère la trame de mémoire technique en 5 sections :

Méthodologie d'exécution (phasage, points de vigilance)
Moyens humains affectés (profils, pas de noms)
Moyens matériels (liste, propres vs location)
Démarche QSE (PPSPS, PAQ, PAE sommaire)
Planning directeur Gantt à préciser

Pour chaque section, 200-300 mots exploitables.
Ton : professionnel, pas commercial. Pas de superlatifs.
Les critères d'attribution du marché sont : [lister critères DCE].
Oriente le contenu pour maximiser le score sur ces critères.`;

const PROMPT_RELANCE = `Prospect : [fonction] chez [entreprise BTP], rencontré le [date] au sujet de [projet].
Devis envoyé le [date], valeur [€ HT], aucun retour depuis [X jours].
Concurrence pressentie : [2-3 noms éventuels].
Rédige une séquence de 3 emails de relance espacés de 5-7 jours :
Email 1 (J+10) : relance douce, valeur ajoutée (ex : lien vers une ressource pertinente)
Email 2 (J+17) : relance ciblée, 1 question ouverte sur son hésitation
Email 3 (J+25) : break-up email pro (vous fermez le dossier sauf retour)
Chaque email : 80-120 mots max. Pas de "j'espère que vous allez bien".
Ton : direct, respectueux du temps du prospect, centré sur son intérêt.`;

const FAQ_ITEMS = [
  {
    q: "L'IA remplace-t-elle le chargé d'affaires ?",
    a: "Non. Elle assiste : elle accélère le chiffrage, l'analyse de DCE, la trame de mémoire technique et les relances. La décision commerciale, le prix et la responsabilité de l'offre restent humains.",
  },
  {
    q: 'Est-ce finançable par Constructys ?',
    a: FINANCEMENT_FORMULATION_PRUDENTE,
  },
  {
    q: 'La formation se fait-elle sur nos dossiers réels ?',
    a: "Oui. En intra-entreprise, dans vos locaux (présentiel Île-de-France), on travaille de préférence sur vos devis, DCE et mémoires — anonymisés si besoin — pour que les gains soient immédiatement applicables.",
  },
  {
    q: 'Où intervenez-vous en Île-de-France ?',
    a: `Présentiel uniquement : ${IDF_ZONE_INTERVENTION} — intra-entreprise, dans vos locaux.`,
  },
  {
    q: "Comment l'IA aide-t-elle un chargé d'affaires au quotidien ?",
    a: "Sur l'analyse DCE, le mémoire technique, le pré-chiffrage / devis et les séquences de relance — toujours avec validation métier avant envoi client ou maître d'ouvrage.",
  },
];

const SOMMAIRE = [
  { href: '#taches', label: "Les tâches du chargé d'affaires que l'IA accélère" },
  { href: '#goulot', label: 'Le chargé d\'affaires BTP est un goulot d\'étranglement commercial' },
  { href: '#cycle-vente', label: 'Ce que l\'IA fait dans un cycle de vente BTP' },
  { href: '#usages', label: 'Les 8 usages commerciaux les plus impactants' },
  { href: '#prompts', label: '3 prompts prêts à l\'emploi' },
  { href: '#resultats', label: 'Gains mesurés : taux de transformation et temps/AO' },
  { href: '#programme', label: 'Programme catalogue : BTP-02 (appels d\'offre, avancé)' },
  { href: '#financement', label: 'Financement Constructys 2026' },
  { href: '#faq', label: 'FAQ chargés d\'affaires' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
];

export default function FormationIaChargeAffairesBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd data={COURSE_JSON_LD} id="jsonld-course-charge-affaires" />
      {faqSchema ? <JsonLd data={faqSchema} id="jsonld-faq-charge-affaires" /> : null}

      <article>
        <MetierIdfPresentielLine className="mb-4 mt-6" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour les chargés d&apos;affaires du BTP en Île-de-France
        </h1>
        <PreuveSociale className="mt-6" />
        <p className="mt-4 text-lg text-slate-600">
          Le chargé d&apos;affaires jongle entre chiffrage, marchés et relation client ; l&apos;IA lui
          rend des heures, sous sa validation. Sessions présentiel IDF · organisme certifié Qualiopi ·{' '}
          {FINANCEMENT_FORMULATION_PRUDENTE}
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            Un chargé d&apos;affaires BTP consacre souvent une part importante de son temps à produire
            des devis et des mémoires techniques. Avec l&apos;IA, il accélère ces livrables — toujours
            avec relecture métier — pour se recentrer sur la décision commerciale. Formation dispensée par un organisme certifié{' '}
            <strong>Qualiopi</strong>, financement OPCO possible selon éligibilité.
          </ShortAnswerBlock>
          <DisclaimerGains className="mt-3" />
        </div>

        <p className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          <span className="font-medium text-slate-900">Ressource gratuite :</span>{' '}
          <Link href={LINKS.guideChargeAffairesOfc} className="font-medium text-[#377CF3] hover:underline">
            Guide du chargé d&apos;affaires BTP × IA
          </Link>{' '}
          — PDF (~30 pages) : 12 cas Claude du DCE au DGD, prompts à copier.
        </p>

        <section id="taches" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Les tâches du chargé d&apos;affaires que l&apos;IA accélère
          </h2>
          <ul className="mt-6 space-y-3 list-disc pl-6 text-slate-700 leading-relaxed">
            <li>
              <Link href={LINKS.iaAnalyseDce} className={OFC_LINK}>
                Analyser un DCE avec l&apos;IA
              </Link>{' '}
              — CCTP, CCAP, RC, scoring GO / NO GO.
            </li>
            <li>
              <Link href={LINKS.iaMemoireTechnique} className={OFC_LINK}>
                Rédiger un mémoire technique BTP avec l&apos;IA
              </Link>{' '}
              — plan aligné RC, moyens, références.
            </li>
            <li>
              <Link href={LINKS.iaCompteRenduChantier} className={OFC_LINK}>
                Rédiger un compte rendu de chantier avec l&apos;IA
              </Link>{' '}
              — notes ou dictée vers CR structuré.
            </li>
            <li>
              <Link href={LINKS.iaDevis} className={OFC_LINK}>
                Accélérer devis et chiffrage bâtiment
              </Link>{' '}
              — pré-chiffrage et descriptifs structurés.
            </li>
            <li>Relances prospects et argumentaires prix — sous validation commerciale.</li>
            <li>Comparatif d&apos;offres et préparation de RDV client.</li>
          </ul>
        </section>

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

        <section id="goulot" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le chargé d&apos;affaires BTP est un goulot d&apos;étranglement commercial
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Le chargé d&apos;affaires porte la pression du chiffre : devis, dossiers d&apos;appel
            d&apos;offres, relances et négociation. Sur une semaine de 40 h, il consacre souvent{' '}
            <strong>10 à 14 h à l&apos;avant-vente</strong> (production commerciale, pas l&apos;exécution
            chantier) — soit environ <strong>25 à 35 % du temps</strong> sur des livrables qui
            conditionnent directement le carnet de commandes.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Trois douleurs reviennent systématiquement en entreprise — et ce ne sont pas des sujets de
            compte rendu de réunion ou de CCTP opérationnel (réservés au conducteur de travaux sur le
            terrain) :
          </p>
          <ul className="mt-4 space-y-4 text-slate-700">
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>Devis quantitatifs.</strong> Chiffrer proprement avec DPGF et hypothèses claires
                prend souvent 2 à 4 h par dossier — alors que le client attend vite une fourchette ou une
                réponse à un AO.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>Mémoires techniques.</strong> Les plis publics ou exigeants absorbent 2 à 3 jours,
                et beaucoup de mémoires se ressemblent : peu différenciants au regard des critères de
                notation.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>Relances prospects.</strong> Faute de temps, les séquences de suivi ne partent pas —
                alors qu&apos;une partie du potentiel de CA se joue après le premier envoi, quand le
                prospect est encore chaud.
              </span>
            </li>
          </ul>
        </section>

        <section id="cycle-vente" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ce que l&apos;IA fait dans un cycle de vente BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            De la prospection au closing, l&apos;IA accélère la production de contenus structurés et la
            lecture de documents lourds — toujours sous votre validation.
          </p>
          <ul className="mt-6 space-y-3 list-disc pl-6 text-slate-700 leading-relaxed">
            <li>
              <strong>Prospection :</strong> qualifier un contact, rédiger un message LinkedIn ou un email
              froid adapté à un décideur BTP (chantier, contraintes, ton pro).
            </li>
            <li>
              <strong>Qualification :</strong> lire un CCTP ou un extrait de DCE et en tirer les trois
              points clés pour une décision GO / NO GO commerciale (charge, risques, positionnement prix).
            </li>
            <li>
              <strong>Chiffrage :</strong> produire une DPGF préremplie ou un pré-chiffrage à partir d&apos;un
              descriptif, avec hypothèses explicites et fourchettes.
            </li>
            <li>
              <strong>Mémoire technique :</strong> générer la trame et les sections attendues — méthode,
              moyens, références, QSE, planning — alignées sur les critères d&apos;attribution.
            </li>
            <li>
              <strong>Relance :</strong> enchaîner trois emails espacés adaptés au cycle long BTP, sans ton
              insistant ni formules creuses.
            </li>
            <li>
              <strong>Closing :</strong> répondre aux objections récurrentes (« c&apos;est trop cher », « on
              attend d&apos;autres devis ») avec un argumentaire court et des propositions d&apos;ajustement
              crédibles.
            </li>
          </ul>
          <blockquote className="mt-8 rounded-xl border-l-4 border-[#377CF3] bg-slate-50 p-6 text-slate-700">
            <p className="font-medium text-slate-900">
              Réservez votre diagnostic IA commercial gratuit — 30 minutes en visio.
            </p>
            <RdvLink
              origin="formation-ia-charge-affaires-btp-contact-rdv-page-calendly"
              variant="unstyled"
              className="mt-2 inline-block font-semibold text-[#377CF3] underline hover:no-underline"
             />
          </blockquote>
        </section>

        <section id="usages" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Les 8 usages commerciaux les plus impactants
          </h2>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-700 leading-relaxed">
            <li>
              <strong>Pré-chiffrage rapide</strong> à partir d&apos;un descriptif — 30 min → 5 min.
            </li>
            <li>
              <strong>Trame de mémoire technique personnalisée</strong> — 2 jours → 3 h.
            </li>
            <li>
              <strong>Analyse GO / NO GO d&apos;un DCE</strong> avec angle commercial : scoring de
              rentabilité et de charge vendable (vs faisabilité purement opérationnelle côté conducteur de
              travaux) — 1 h 30 → 10 min.
            </li>
            <li>
              <strong>Séquence de trois emails de relance</strong> — 30 min par séquence → 3 min.
            </li>
            <li>
              <strong>Lettre d&apos;offre commerciale structurée</strong> — 1 h → 10 min.
            </li>
            <li>
              <strong>Variante d&apos;optimisation technique</strong> (justification pour ajuster prix et
              marge) — 2 h → 20 min.
            </li>
            <li>
              <strong>Préparation d&apos;un RDV commercial</strong> (contexte prospect, questions à poser) —
              45 min → 10 min.
            </li>
            <li>
              <strong>Argumentaire de closing sur objection prix</strong> — 30 min → 5 min.
            </li>
          </ol>
        </section>

        <section id="prompts" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">3 prompts prêts à l&apos;emploi</h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 1 — Pré-chiffrage rapide à partir d&apos;un descriptif client
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_PRECHIFFRAGE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 2 — Trame de mémoire technique AO public BTP
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_MEMOIRE_AO}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 3 — Séquence de 3 emails de relance prospect BTP
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_RELANCE}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Gains mesurés — données formations OFC
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse border border-slate-200 text-left text-sm">
              <caption className="sr-only">Gains de temps IA pour chargé d&apos;affaires BTP</caption>
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Usage commercial</th>
                  <th className="border border-slate-200 p-3 font-semibold">Sans IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Avec IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Gain</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ['Pré-chiffrage devis', '2-3 h', '20-30 min', '−85 %'],
                  ['Mémoire technique complet', '2-3 jours', '3-4 h', '−85 %'],
                  ['Séquence de relances prospect', '30 min/email', '3 min/email', '−90 %'],
                  ['Analyse GO/NO GO (scoring rentabilité)', '1h30', '10 min', '−90 %'],
                  ['Lettre d\'offre commerciale', '1 h', '10 min', '−85 %'],
                  ['Variante d\'optimisation technique', '2 h', '20 min', '−85 %'],
                  ['Préparation RDV commercial', '45 min', '10 min', '−78 %'],
                  ['Argumentaire objection prix', '30 min', '5 min', '−85 %'],
                ].map(([u, sans, avec, gain]) => (
                  <tr key={u as string}>
                    <td className="border border-slate-200 p-3">{u}</td>
                    <td className="border border-slate-200 p-3">{sans}</td>
                    <td className="border border-slate-200 p-3">{avec}</td>
                    <td className="border border-slate-200 p-3 font-medium text-[#377CF3]">{gain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Au-delà du temps gagné, les chargés d&apos;affaires formés par OFC rapportent surtout des
            mémoires techniques plus homogènes, des réponses plus rapides aux demandes, et une
            systématisation des relances — autant de leviers pour améliorer le taux de transformation.
            Les gains varient selon l&apos;organisation, les outils en place et le niveau de pratique.
          </p>
        </section>

        <section id="programme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Programme catalogue : formation BTP-02
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Formation BTP-02 — IA et appels d&apos;offres BTP : avancé
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Référence : BTP-02 · Avancé · 4 h · {libelleTarifsDualCourt(4)} ·{' '}
            {EFFECTIF_GROUPE_MAX} participants max
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Axée sur les <strong>AO publics</strong> : analyse de DCE, lecture CCTP, mémoire technique,
            cohérence avec la DPGF et critères d&apos;attribution.
          </p>

          <p className="mt-6 font-medium text-slate-900">Les formations se déroulent exclusivement en présentiel intra-entreprise, dans vos locaux en Île-de-France.</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              Dans vos locaux ou sur site ({IDF_ZONE_INTERVENTION})
            </li>
          </ul>
          <p className="mt-6">
            <Link href={LINKS.formationAO} className="font-semibold text-[#377CF3] underline hover:no-underline">
              Programme appels d&apos;offres IA (niveau 2) →
            </Link>
          </p>
        </section>

        <section id="financement" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Financement Constructys 2026</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse border border-slate-200 text-left text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Entreprise</th>
                  <th className="border border-slate-200 p-3 font-semibold">Coût pédagogique</th>
                  <th className="border border-slate-200 p-3 font-semibold">Salaires</th>
                  <th className="border border-slate-200 p-3 font-semibold">Max intra/jour</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr>
                  <td className="border border-slate-200 p-3">&lt; 11 salariés</td>
                  <td className="border border-slate-200 p-3">24 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">15 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">840 € HT/groupe</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 p-3">11 à 50 salariés</td>
                  <td className="border border-slate-200 p-3">24 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">10 € HT/h/stagiaire</td>
                  <td className="border border-slate-200 p-3">840 € HT/groupe</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Condition :</strong> demande déposée sur eGestion (services.constructys.fr) au minimum
            15 jours avant la formation. OFC accompagne chaque client dans la constitution du dossier.
          </p>
          <p className="mt-4">
            <Link
              href={LINKS.financement}
              className="font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Guide complet du financement Constructys
            </Link>
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ chargés d&apos;affaires</h2>
          <dl className="mt-8 space-y-8">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-slate-600">
                  <FAQAnswer content={item.a} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <LaureOlivieFormationPortrait />
<section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-slate-900">Articles et pages liés</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              <Link href={LINKS.blogIaMemoireTechniqueAppelOffresGuide2026} className={OFC_LINK}>
                Mémoire technique BTP avec l&apos;IA — guide appels d&apos;offres 2026
              </Link>
            </li>
            <li>
              <Link href={LINKS.blogIaDevisBatimentChiffrageAutomatise} className={OFC_LINK}>
                IA devis bâtiment et chiffrage automatisé
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationIaDirigeantBtp} className={OFC_LINK}>
                Formation IA dirigeant BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationConducteurTravaux} className={OFC_LINK}>
                Formation IA conducteur de travaux BTP
              </Link>
            </li>
          </ul>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#F2F2F2] p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Réservez votre diagnostic IA commercial gratuit
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            30 minutes en visio pour identifier les leviers avant-vente (devis, AO, relances) qui
            augmenteront le plus votre taux de transformation. Gratuit, sans engagement.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <RdvLink className="inline-flex items-center rounded-lg bg-[#377CF3] px-5 py-3 font-semibold text-white hover:bg-[#2d63c9]" />
            <PublicPhoneCta className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-slate-50" />
          </div>
        </section>

        <RelatedLinks path={PATH} className="mt-14 !px-0" tone="transparent" />

        <LiensConnexes
          currentPath={PATH}
          excludeHrefs={[
              ...getClusterRelatedHrefs(PATH),
              LINKS.formations,
              LINKS.financement,
              LINKS.formationAO,
              LINKS.iaAnalyseDce,
              LINKS.iaMemoireTechnique,
              LINKS.iaCompteRenduChantier,
              LINKS.iaDevis,
              LINKS.formationConducteurTravaux,
              LINKS.formationIaDirigeantBtp,
              LINKS.blogIaMemoireTechniqueAppelOffresGuide2026,
              LINKS.blogIaDevisBatimentChiffrageAutomatise,
              '/formation-ia-assistante-gestion-btp',
            ]}
          />

        <RenvoiFicheCatalogue programmeRef="NIV-01" />

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
