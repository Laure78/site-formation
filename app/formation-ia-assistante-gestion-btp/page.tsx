import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import {
  EFFECTIF_GROUPE_MAX,
  TARIF_FORFAIT_AVANCE_HT,
  TARIF_FORFAIT_DEBUTANT_HT,

  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { VoirAussi } from '@/components/VoirAussi';
import { RelatedLinks } from '@/components/RelatedLinks';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import { voirAussiMetierProps } from '@/lib/voir-aussi';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';
import { buildFormationFicheCourseJsonLd } from '@/lib/schema-formation-course-jsonld';

export const revalidate = 3600;
const PATH = '/formation-ia-assistante-gestion-btp';

const SEO_TITLE = 'Formation IA assistante gestion BTP — factures & relances impayés';

const BASE_URL = SITE_CONFIG.url.replace(/\/$/, '');

/** Course — GEO / rich results */
const COURSE_JSON_LD: Record<string, unknown> = {
  ...buildFormationFicheCourseJsonLd({
    name: 'Formation IA pour Assistante de Gestion BTP',
    description:
      "Formation ChatGPT et Claude AI pour assistantes de gestion BTP : facturation d'avancement, relances impayés, DC4, DGD, paie chantier, TVA autoliquidation. Qualiopi. Financement possible selon éligibilité.",
    path: PATH,
    educationalLevel: 'Advanced',
    organizationId: `${BASE_URL}/#organization`,
    instructorName: 'Laure Olivié',
  }),
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
    url: buildSiteCalendlyCtaUrl('formation-ia-assistante-gestion-btp-schema-offer'),
  },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'Assistante de gestion BTP',
  },
};

export const metadata = createMetierBtpPageMetadata('assistante gestion', {
  title: SEO_TITLE,
  description:
    'Formation ChatGPT et Claude AI pour assistantes de gestion BTP : facturation, relances impayés, DGD, sous-traitance. Qualiopi. RDV gratuit.',
  path: PATH,
  keywords: [
    'formation IA assistante de gestion BTP',
    'ChatGPT facturation BTP',
    'IA relance impayés BTP',
    'IA sous-traitance bâtiment',
  ],
  openGraphType: 'website',
  appendAuthorSuffix: false,
  image: {
    url: '/images/og/formation-ia-assistante-gestion-btp.webp',
    width: 1200,
    height: 630,
    alt: 'Formation IA assistante de gestion BTP — administratif et suivi dossier',
  },
});

const PROMPT_RELANCE = `Tu es assistante de gestion pour [nom de l'entreprise BTP].
Client débiteur : [raison sociale + secteur].
Facture n° [ref], datée du [date], montant [€ HT/TTC], échéance [date].
Retard actuel : [nombre] jours après échéance.
Historique relance : [aucune / 1 appel le X / 1 email le Y].
Contrat ou marché : [marché privé / marché public / bon de commande].
Rédige la relance adaptée au retard :

Retard 1-15 jours : email de rappel amiable, 80 mots, ton commercial
Retard 16-45 jours : courrier formel, 150 mots, évoque les conditions de paiement contractuelles
Retard 46+ jours : LRAR mise en demeure avec mention des intérêts de retard (taux BCE + 10 pts) et indemnité forfaitaire 40€ (article L441-10 du Code de commerce)

Inclure systématiquement : n° facture, montant, date d'échéance, coordonnées de règlement.
Sur les marchés publics : pas d'intérêts moratoires automatiques, mentionner l'article R2192 du CCP.`;

const PROMPT_DC4 = `Tu es assistante de gestion pour une entreprise BTP, entreprise principale sur un marché [public/privé].
Contrat de sous-traitance joint ci-dessous :
[Collez le contrat ou ses éléments clés]
Pré-remplis un formulaire DC4 (Acte Spécial de Sous-Traitance) avec les rubriques suivantes :
A. Identification entreprise principale
B. Identification sous-traitant (raison sociale, SIRET, adresse, n° URSSAF, assurance décennale, Probtp si BTP)
C. Nature des prestations sous-traitées (descriptif précis + lot concerné)
D. Montant TTC de la sous-traitance + taux TVA applicable (rappel : autoliquidation si sous-traitance BTP soumise au régime de l'article 283 du CGI)
E. Modalités de paiement (à signaler au pouvoir adjudicateur)
F. Modalités de règlement direct au sous-traitant si marché public
Préciser toutes les rubriques où des informations manquent au contrat.`;

const PROMPT_RECLAMATION = `Tu es assistante de gestion pour une entreprise BTP, titulaire d'un marché public.
Marché : [objet], MOA [nom], n° de marché [ref], montant initial [€ HT].
Motif de réclamation : [choisir : retard imputable au MOA / sujétion technique imprévue / ordre de service avec effet financier / prolongation de délai / aléa climatique exceptionnel].
Éléments factuels à ma disposition :
[Liste des pièces : CR chantier, OS, courriers, photos, etc.]
Préjudice chiffré demandé : [€ HT détaillé par poste : frais généraux prolongés, immobilisation matériel, intérimaires supplémentaires, etc.]
Rédige un mémoire de réclamation structuré en 5 parties :

Rappel contractuel (articles CCAG-Travaux et pièces du marché concernées)
Faits (chronologie précise, non polémique)
Analyse juridique (quel article CCAG fonde la réclamation : 30.3 / 20.2 / etc.)
Préjudice chiffré (tableau détaillé par poste)
Demande explicite (montant global + intérêts moratoires article R2192-31 CCP)

Ton : factuel, juridique, pas accusatoire. Pas de superlatifs.
Longueur cible : 3-5 pages exploitables.`;

const FAQ_ITEMS = [
  {
    q: "L'IA peut-elle rédiger des factures conformes à la TVA autoliquidation BTP ?",
    a: "Oui, à condition d'utiliser un prompt qui précise le régime (notamment article 283-2 nonies du CGI pour la sous-traitance BTP). La formation inclut les mentions légales et formulations à systématiser avant toute émission.",
  },
  {
    q: 'ChatGPT connaît-il les conventions collectives BTP (Bâtiment, TP) ?',
    a: "Oui pour les principes généraux et la structure des clauses. Pour les taux, barèmes et grilles 2026, on injecte dans le prompt les documents ou extraits à jour : l'IA ne doit pas inventer un taux.",
  },
  {
    q: 'Peut-on automatiser la vérification des attestations URSSAF/Probtp des sous-traitants ?',
    a: "L'IA ne se connecte pas aux bases URSSAF ou Probtp en temps réel. En revanche, à partir des PDF que vous fournissez, elle vérifie cohérence, dates d'expiration et complétude en quelques minutes au lieu d'une relecture ligne à ligne.",
  },
  {
    q: 'Comment former une assistante de gestion déjà experte Batigest / Sage / Onaya ?',
    a: "La formation complète l'ERP : l'IA intervient en amont ou en aval (rédaction de courriers, synthèses de rapports, préparation de pièces), pas à la place de la saisie métier dans le logiciel.",
  },
  {
    q: "L'IA peut-elle aider à monter un dossier Qualibat ou RGE ?",
    a: "Oui sur la partie rédactionnelle : structuration, formulation des moyens et des références, cohérence du dossier. Les pièces justificatives, attestations et chiffres officiels restent à votre charge.",
  },
  {
    q: 'Peut-on utiliser ChatGPT pour gérer des données RGPD sensibles (paie, contrats, clients) ?',
    a: "Avec ChatGPT Team ou Claude Enterprise, l'usage encadré est adapté au professionnel. Avec les offres gratuites grand public, non : la formation enseigne à anonymiser systématiquement avant tout envoi.",
  },
];

const SOMMAIRE = [
  {
    href: '#charge-administrative',
    label: '20 heures par semaine : la vraie charge administrative d\'une PME BTP',
  },
  { href: '#automatise', label: 'Ce que l\'IA automatise en back-office BTP (et ce qu\'elle ne peut pas faire)' },
  { href: '#usages', label: 'Les 8 usages gestion les plus impactants' },
  { href: '#prompts', label: '3 prompts prêts à l\'emploi' },
  { href: '#resultats', label: 'Gains mesurés : temps et DSO (délai de paiement)' },
  { href: '#specificites', label: 'Spécificités BTP : TVA, sous-traitance, paie chantier' },
  { href: '#programme', label: 'Programme catalogue : BTP-01 (IA au service du bâtiment)' },
  { href: '#financement', label: 'Financement Constructys 2026' },
  { href: '#faq', label: 'FAQ assistantes de gestion BTP' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre diagnostic IA back-office gratuit' },
];

export default function FormationIaAssistanteGestionBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd data={COURSE_JSON_LD} id="jsonld-course-assistante-gestion" />
      {faqSchema ? <JsonLd data={faqSchema} id="jsonld-faq-assistante-gestion" /> : null}

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA assistante de gestion BTP —{' '}
          <span className="text-[#377CF3]">facturation, relances impayés et DGD</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Sessions en présentiel en Île-de-France — cette page cible le <strong>back-office chiffré</strong> : factures d&apos;avancement, relances
          impayés, attestations sous-traitants et décomptes généraux définitifs — distinct de l&apos;administratif
          courrier/suivi chantier (voir la{' '}
          <Link href={LINKS.formationIaAssistanteBtp} className="font-medium text-[#377CF3] hover:underline">
            formation IA assistante administrative BTP
          </Link>
          ).
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            Une assistante de gestion BTP produit chaque semaine 20 à 30 documents administratifs :
            factures d&apos;avancement, relances, attestations sous-traitants, DGD, éléments variables de
            paie. L&apos;IA automatise 70 % de cette production répétitive, soit 6 à 8 heures libérées par
            semaine. Formation certifiée <strong>Qualiopi</strong>, financement possible selon éligibilité.
          </ShortAnswerBlock>
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

        <section id="charge-administrative" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            20 heures par semaine : la vraie charge administrative d&apos;une PME BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Dans une PME BTP d&apos;environ 15 salariés, l&apos;assistante de gestion cumule souvent la
            facturation, la paie chantier, le suivi des sous-traitants et l&apos;administratif du
            dirigeant. Les formations OFC mesurent en moyenne{' '}
            <strong>20 à 25 h par semaine</strong> consacrées à la production documentaire répétitive —
            courriers, relances, montage de dossiers, relectures croisées.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Trois situations reviennent sans cesse — et elles ne sont ni du pilotage de chantier (CDT), ni
            de l&apos;avant-vente (chargé d&apos;affaires) :
          </p>
          <ul className="mt-4 space-y-4 text-slate-700">
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>Relances impayés.</strong> Faute de temps, les relances graduées passent après tout
                le reste — le DSO (délai moyen de paiement) gonfle facilement vers 90 jours au lieu de
                rester sous contrôle autour de 60.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>Facturation d&apos;avancement.</strong> Une situation mensuelle mal cadrée peut
                absorber une journée entière alors qu&apos;avec les bons modèles et l&apos;IA, la même
                livraison devrait tenir en quelques heures.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
              <span>
                <strong>Sous-traitance.</strong> DC4, attestations URSSAF, Probtp, assurances : le casse-tête
                juridique et documentaire est chronophage — et une erreur bloque le paiement.
              </span>
            </li>
          </ul>
        </section>

        <section id="automatise" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ce que l&apos;IA automatise en back-office BTP (et ce qu&apos;elle ne peut pas faire)
          </h2>
          <p className="mt-4 font-semibold text-slate-900">Ce que l&apos;IA fait :</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700 leading-relaxed">
            <li>
              Rédiger courriers et emails de relance <strong>gradués</strong> selon l&apos;ancienneté du
              retard : rappel → mise en demeure → pré-contentieux.
            </li>
            <li>
              <strong>Pré-remplir les DC4</strong> à partir du contrat de sous-traitance et signaler les
              champs manquants.
            </li>
            <li>
              Générer des <strong>situations d&apos;avancement</strong> à partir des pourcentages par lot ou
              des données que vous fournissez.
            </li>
            <li>
              <strong>Synthétiser des relevés</strong> pour repérer les factures anciennes non soldées.
            </li>
            <li>
              Produire des <strong>DGD préformatés</strong> à partir des situations mensuelles et des
              pièces que vous joignez.
            </li>
          </ul>
          <p className="mt-6 font-semibold text-slate-900">Ce que l&apos;IA ne fait pas :</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700 leading-relaxed">
            <li>
              Accès direct à votre logiciel de gestion (Batigest, Sage, Onaya, Cegid, etc.) — vous restez
              l&apos;opératrice qualifiée de la saisie et des validations.
            </li>
            <li>Signature juridique d&apos;aucun document.</li>
            <li>
              Décision sur les litiges : un DGD contesté ou un impayé litigieux reste un arbitrage humain.
            </li>
            <li>
              Connexion en temps réel aux données URSSAF, DSN ou Probtp — l&apos;IA travaille sur les
              documents que vous lui fournissez.
            </li>
          </ul>
          <blockquote className="mt-8 rounded-xl border-l-4 border-[#377CF3] bg-slate-50 p-6 text-slate-700">
            <p className="font-medium text-slate-900">
              Réservez votre diagnostic IA back-office gratuit — 30 minutes en visio.
            </p>
            <a
              href={buildSiteCalendlyCtaUrl('formation-ia-assistante-gestion-btp-contact-rdv-page-calendly')}
              className="mt-2 inline-block font-semibold text-[#377CF3] underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prendre rendez-vous →
            </a>
          </blockquote>
        </section>

        <section id="usages" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Les 8 usages gestion les plus impactants
          </h2>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-700 leading-relaxed">
            <li>
              <strong>Relance impayé gradée</strong> (rappel amiable → LRAR mise en demeure → pré-contentieux)
              — 30 min → 3 min.
            </li>
            <li>
              <strong>Facturation d&apos;avancement mensuelle</strong> à partir d&apos;un tableau de % — 1
              jour → 2 h.
            </li>
            <li>
              <strong>Pré-remplissage d&apos;un DC4</strong> à partir du contrat — 45 min → 10 min.
            </li>
            <li>
              <strong>Synthèse des attestations</strong> sous-traitants (URSSAF, Probtp, assurance décennale)
              — 30 min → 5 min par sous-traitant.
            </li>
            <li>
              <strong>Rédaction d&apos;un DGD</strong> à partir des situations mensuelles — 1 jour → 3 h.
            </li>
            <li>
              <strong>Éléments variables de paie BTP</strong> (heures sup., IH, paniers, déplacements) depuis
              relevés chantier — 3 h → 30 min.
            </li>
            <li>
              <strong>Mémoire de réclamation financière</strong> sur marché public — 2 jours → 4 h.
            </li>
            <li>
              <strong>Montage dossier Qualibat / RGE</strong> — 1 semaine → 2 jours.
            </li>
          </ol>
        </section>

        <section id="prompts" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">3 prompts prêts à l&apos;emploi</h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 1 — Relance impayé gradée BTP
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_RELANCE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 2 — Pré-remplissage DC4 depuis contrat de sous-traitance
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_DC4}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Prompt 3 — Mémoire de réclamation financière marché public
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_RECLAMATION}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Gains mesurés — données formations OFC
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse border border-slate-200 text-left text-sm">
              <caption className="sr-only">
                Gains de temps et efficacité cash — assistante de gestion BTP
              </caption>
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Usage back-office BTP</th>
                  <th className="border border-slate-200 p-3 font-semibold">Sans IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Avec IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Gain</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ['Relance impayé gradée', '30 min', '3 min', '−90 %'],
                  ['Facturation d\'avancement mensuelle', '1 jour', '2 h', '−75 %'],
                  ['Pré-remplissage DC4 sous-traitant', '45 min', '10 min', '−78 %'],
                  ['Synthèse attestations sous-traitants', '30 min/ST', '5 min/ST', '−83 %'],
                  ['DGD fin de chantier', '1 jour', '3 h', '−62 %'],
                  ['Variables paie chantier mensuelle', '3 h', '30 min', '−83 %'],
                  ['Mémoire de réclamation marché public', '2 jours', '4 h', '−75 %'],
                  ['Dossier qualification Qualibat/RGE', '1 semaine', '2 jours', '−60 %'],
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
            Au-delà du temps, les assistantes formées à l&apos;IA systématisent les relances clients —
            résultat : le DSO (Days Sales Outstanding, délai moyen de paiement) des PME BTP formées baisse
            en moyenne de <strong>15 à 25 jours en 6 mois</strong>. Sur un CA annuel de 2 M€, c&apos;est
            l&apos;équivalent de <strong>80 000 à 140 000 € de trésorerie récupérée</strong>.
          </p>
        </section>

        <section id="specificites" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Spécificités BTP : TVA, sous-traitance, paie chantier
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Parce qu&apos;il y a des règles BTP que l&apos;IA doit connaître pour être réellement utile au
            quotidien :
          </p>
          <ul className="mt-4 space-y-3 text-slate-700 leading-relaxed">
            <li>
              <strong>Autoliquidation TVA sous-traitance BTP</strong> (article 283-2 nonies du CGI) : le
              sous-traitant BTP ne facture pas la TVA comme en général ; c&apos;est l&apos;entreprise
              principale qui l&apos;autoliquide. Un prompt mal cadré produit une facture ou une mention
              invalide.
            </li>
            <li>
              <strong>Caisse congés payés BTP (CNETP / CIBTP)</strong> : les congés payés ne sont pas
              provisionnés comme dans tous les secteurs ; les cotisations passent par les caisses
              professionnelles — la paie BTP en tient compte.
            </li>
            <li>
              <strong>Probtp</strong> : retraite et prévoyance obligatoires BTP, avec cotisations spécifiques.
            </li>
            <li>
              <strong>Intempéries (IH)</strong> : indemnité spécifique pour les ouvriers en cas d&apos;arrêt
              de chantier — à distinguer des autres primes.
            </li>
            <li>
              <strong>Heures supplémentaires BTP</strong> : la convention collective Bâtiment fixe des
              majorations propres — à injecter dans le prompt quand vous demandez des simulations.
            </li>
            <li>
              <strong>Retenue de garantie</strong> : 5 % sur les marchés publics, libérée en deux tranches
              (50 % à la réception, 50 % au DGD).
            </li>
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            La formation OFC intègre <strong>toutes ces spécificités</strong> dans les prompts fournis —
            c&apos;est la différence entre une formation IA généraliste et une formation IA spécialisée BTP.
          </p>
        </section>

        <section id="programme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Programme catalogue : formation BTP-01
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Formation BTP-01 — L&apos;IA au service du bâtiment : débutant
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Référence : BTP-01 · Débutant · 4 h · {formatTarifHt(TARIF_FORFAIT_DEBUTANT_HT)} € HT/session ·{' '}
            {EFFECTIF_GROUPE_MAX} participants max
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Premiers pas sur ChatGPT / Claude : devis, emails, relances et comptes rendus — base idéale pour une
            équipe support avant d&apos;aborder des modules plus avancés (appels d&apos;offres, etc.).
          </p>

          <p className="mt-6 font-medium text-slate-900">Les formations se déroulent exclusivement en présentiel, en Île-de-France :</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              En <strong>intra</strong> dans vos locaux (Île-de-France)
            </li>
            <li>
              En <strong>inter</strong> en Île-de-France (Paris, Versailles, Nanterre, Créteil)
            </li>
          </ul>
          <p className="mt-6">
            <a
              href="https://www.laureolivie.fr/formations"
              className="font-semibold text-[#377CF3] underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir les programmes détaillés →
            </a>
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
              href="/financement-constructys-formation-ia-btp"
              className="font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Guide complet du financement Constructys
            </Link>
            {' · '}
            <Link
              href="/blog/dossier-constructys-2026-etapes"
              className="font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Monter son dossier en 20 min
            </Link>
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ assistantes de gestion BTP</h2>
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
          <h2 className="font-display text-xl font-bold text-slate-900">Articles liés</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              <Link href="/blog/dossier-constructys-2026-etapes" className="text-[#377CF3] underline">
                Monter son dossier Constructys 2026 — étapes
              </Link>
            </li>
            <li>
              <Link href="/blog/automatiser-emails-clients-btp-ia" className="text-[#377CF3] underline">
                Automatiser ses emails clients avec l&apos;IA (relances, confirmations)
              </Link>
            </li>
            <li>
              <Link href="/blog/7-taches-ia-automatiser-batiment" className="text-[#377CF3] underline">
                7 tâches que l&apos;IA peut automatiser dans le bâtiment
              </Link>
            </li>
            <li>
              <Link href="/formation-ia-conducteur-de-travaux-btp" className="text-[#377CF3] underline">
                Formation IA conducteur de travaux BTP
              </Link>
            </li>
            <li>
              <Link href="/formation-ia-charge-affaires-btp" className="text-[#377CF3] underline">
                Formation IA chargé d&apos;affaires BTP
              </Link>
            </li>
          </ul>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#F2F2F2] p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Réservez votre diagnostic IA back-office gratuit
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            30 minutes en visio pour cibler relances, facturation et sous-traitance sur vos documents réels.
            Gratuit, sans engagement.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <RdvLink className="inline-flex items-center rounded-lg bg-[#377CF3] px-5 py-3 font-semibold text-white hover:bg-[#2d63c9]">
              Réserver mon diagnostic IA back-office
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-slate-50" />
          </div>
          <p className="mt-6 text-sm text-slate-600">
            <Link href={LINKS.formationIaAssistanteBtp} className="text-[#377CF3] underline">
              Formation IA assistante administrative BTP
            </Link>
            {' · '}
            <Link href={LINKS.financement} className="text-[#377CF3] underline">
              Financement Constructys
            </Link>
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-[#377CF3]/25 bg-[#F8FAFC] p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">Guide PDF gratuit</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            Pour outiller le bureau sur un marché de travaux (situations, CR, DOE, DGD), téléchargez le{' '}
            <Link href={LINKS.guideAssistantsTravauxOfc} className="font-semibold text-[#377CF3] underline-offset-2 hover:underline">
              Guide des Assistants Travaux
            </Link>{' '}
            — 12 missions classées IA / mixte / humain, prompts Claude inclus.
          </p>
        </section>

        <RelatedLinks
          path={PATH}
          className="mt-14 !px-0"
          tone="transparent"
          excludeHrefs={[LINKS.formationIaAssistanteBtp]}
        />

        <VoirAussi
          {...voirAussiMetierProps({
            currentPath: PATH,
            excludeHrefs: [
              ...getClusterRelatedHrefs(PATH),
              LINKS.formationIaAssistanteBtp,
              LINKS.formationIaResponsableAdministratifBtp,
              LINKS.financement,
              LINKS.formations,
            ],
          })}
        />

        <footer className="mt-14 border-t border-slate-200 pt-8 text-sm text-slate-500">
          <p>Laure Olivié — Formatrice IA pour les pros du BTP, OFC Création d&apos;Entreprise</p>
          <p>Certifiée Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078</p>
          <p>
            contact@laureolivie.fr ·{' '}
            <a href="https://www.laureolivie.fr" className="underline">
              www.laureolivie.fr
            </a>
          </p>
        </footer>
      </article>
    </div>
  );
}
