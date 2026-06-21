import Link from 'next/link';
import { OfcPromoVideoEmbed } from '@/components/media/OfcPromoVideoEmbed';
import { Poppins } from 'next/font/google';
import { Check } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import {
  breadcrumbItemsFromPaths,
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import type { FAQItem } from '@/lib/faq';
import {
  buildFormationIaCourseJsonLd,
  getFormationIleDeFrancePageLocalBusinessJsonLd,
} from '@/lib/seo-formation-ia-schemas';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { EFFECTIF_GROUPE_MAX, TARIF_FORFAIT_AVANCE_HT, TARIF_FORFAIT_DEBUTANT_HT ,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { buildIdfRegionalMetaDescription } from '@/lib/seo-geo-keywords';

export const revalidate = 3600;
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const PATH = '/formation-ia-btp-ile-de-france';

// ISR : HTML mis en cache au edge et revalidé toutes les heures (3600 s)

export const metadata = createPageMetadata({
  title: 'Formation IA bâtiment Île-de-France — BTP & TP | Qualiopi',
  description: `${buildIdfRegionalMetaDescription()} ${formatProfessionalsTrainedCount()} pros formés. Visio découverte gratuite.`,
  path: PATH,
  keywords: [
    'formation IA pour les pro du BTP Île-de-France',
    'formation IA Paris',
    'Qualiopi BTP',
    'Constructys formation IA',
    'ChatGPT bâtiment IDF',
    'formation présentiel Guyancourt',
    'OPCO Constructys Île-de-France',
  ],
  openGraphType: 'article',
  appendAuthorSuffix: false,
  article: {
    publishedTime: '2026-05-19',
    modifiedTime: '2026-05-19',
    author: 'Laure Olivié',
    section: 'Formation IA appliquée au bâtiment',
  },
  image: {
    url: '/images/laure-olivie-formatrice.png',
    width: 1200,
    height: 630,
    alt: 'Formation IA bâtiment et travaux publics en Île-de-France — Laure Olivié, OFC Qualiopi, Paris IDF',
  },
});

const COURSE_JSON_LD = buildFormationIaCourseJsonLd({
  name: 'Formation IA pour les pro du BTP Île-de-France — Qualiopi',
  description: `${SITE_CONFIG.legalName} : formations IA pour le BTP en Île-de-France (75 à 95, 77). Sessions 4 h intra ou inter, exclusivement en présentiel, certifiées Qualiopi. ${FINANCEMENT_FORMULATION_PRUDENTE} ChatGPT, Claude AI — devis, DCE, CCTP, appels d'offres, mémoires techniques, comptes rendus, relances clients.`,
  path: PATH,
  areaServed: ['Île-de-France', 'France'],
});

/** FAQ : texte exploitable par FAQPage (réponses sans HTML pour le schéma ; affichage identique). */
const FAQ_IDF: FAQItem[] = [
  {
    q: 'Les formations se font-elles uniquement en Île-de-France ?',
    a: "Oui. Les formations se déroulent exclusivement en présentiel, en Île-de-France : sessions inter en salle et sessions intra dans vos locaux. Laure Olivié, basée à Guyancourt (78), intervient sur l'ensemble de la région (75, 77, 78, 91, 92, 93, 94, 95).",
  },
  {
    q: 'Peut-on panacher plusieurs formations en une demi-journée ?',
    a: "Non. Chaque formation dure 4 heures complètes et couvre un thème spécifique. Il est possible d'organiser deux sessions en deux demi-journées consécutives sur des thèmes différents (ex. : NIV-01 le matin, NIV-02 l'après-midi) pour maximiser l'impact.",
  },
  {
    q: 'Les formations sont-elles disponibles en dehors des heures ouvrées ?',
    a: "Les sessions inter sont généralement organisées en journée. Les sessions intra peuvent être adaptées aux contraintes de l'entreprise (matin tôt, fin de journée) selon disponibilité.",
  },
  {
    q: 'Peut-on avoir un devis en moins de 48 heures ?',
    a: "Oui. Après le diagnostic téléphonique (30 min), un devis est transmis sous 24 heures avec la convention de formation pré-remplie et l'estimation de prise en charge Constructys.",
  },
  {
    q: 'Faut-il que tous les participants aient un ordinateur ?',
    a: "Idéalement oui — un ordinateur ou une tablette par participant pour travailler sur leurs propres documents. Pour les sessions avec partage d'écran uniquement, un setup binôme est possible.",
  },
  {
    q: "Les formations se déroulent-elles partout en Île-de-France ?",
    a: `Oui. Les sessions ont lieu exclusivement en présentiel, dans vos locaux (intra) ou en salle (inter), sur l'ensemble de l'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Basée à Guyancourt (78), j'interviens sur toute la région — note participants : ${SOCIAL_PROOF.AVERAGE_RATING}.`,
  },
];

const SOMMAIRE = [
  { href: '#contexte', label: "Pourquoi les entreprises BTP d'Île-de-France adoptent l'IA en formation courte" },
  { href: '#par-departement', label: 'Formation IA appliquée au bâtiment par département (77 à 95, 78)' },
  { href: '#formations', label: 'Les formations disponibles en Île-de-France' },
  { href: '#inter', label: 'Sessions inter : calendrier et lieux' },
  { href: '#intra', label: 'Sessions intra : dans vos locaux' },
  { href: '#financement', label: 'Financement Constructys par département' },
  { href: '#references', label: 'Références clients en Île-de-France' },
  { href: '#faq-idf', label: 'FAQ formation IA pour le BTP Île-de-France' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre diagnostic IA gratuit' },
];

export default function FormationIaBtpIleDeFrancePage() {
  const localBusinessSchema = getFormationIleDeFrancePageLocalBusinessJsonLd();
  const faqSchema = getFAQSchema(
    FAQ_IDF.map(({ q, a }) => ({ q, a }))
  );

  return (
    <div className={poppins.className}>
      <JsonLd id="schema-formation-idf-course" schema={COURSE_JSON_LD} />
      <JsonLd id="schema-formation-idf-localbusiness" schema={localBusinessSchema} />
      <JsonLd id="schema-formation-idf-faq" schema={faqSchema} />

      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumb
          items={breadcrumbItemsFromPaths([
            { name: 'Accueil', path: '/' },
            { name: 'Formation IA pour les pro du BTP Île-de-France', path: PATH },
          ])}
          showVisual
          className="mb-6"
        />
      </div>

      <section className="border-b border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:gap-12">
            <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
            Laure Olivié · OFC Création d&apos;Entreprise · Guyancourt (78) · Île-de-France
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[2.5rem]">
            Formation IA appliquée au bâtiment Île-de-France — Certifiée Qualiopi
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Formations courtes (4 h) pour <strong>artisans, TPE, PME</strong>, dirigeants, conducteurs de travaux,
            chargés d&apos;affaires et équipes administratives — sur vos documents réels (devis, DCE, CCTP, mémoires
            techniques, comptes rendus, relances). Intra ou inter, exclusivement en présentiel.{' '}
            <strong>+{formatProfessionalsTrainedCount()} professionnels</strong> formés · note{' '}
            <strong>{SOCIAL_PROOF.AVERAGE_RATING}</strong>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <RdvLink className="inline-flex rounded-full bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#2d6ae0]">
              Diagnostic IA gratuit — 30 min
            </RdvLink>
            <Link
              href="/formations"
              className="inline-flex items-center rounded-full border-2 border-[#377CF3] px-6 py-3 text-sm font-semibold text-[#377CF3] hover:bg-blue-50"
            >
              Catalogue formations
            </Link>
          </div>
            </div>
            <aside className="mx-auto w-full max-w-[320px] shrink-0 lg:mx-0 lg:max-w-none">
              <OfcPromoVideoEmbed variant="heroColumn" />
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-10">
        <div className="mx-auto max-w-4xl">
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
        </div>
      </section>

      <section id="contexte" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Pourquoi les entreprises BTP d&apos;Île-de-France adoptent l&apos;IA en formation courte
          </h2>
          <p className="mt-6 text-slate-700 leading-relaxed">
            L&apos;Île-de-France est la première région BTP de France par volume de marchés : Grand Paris Express,
            rénovation du parc de logements, marchés publics de collectivités et d&apos;établissements scolaires,
            chantiers tertiaires — la pression concurrentielle y est plus forte qu&apos;ailleurs. Pour répondre à plus
            d&apos;appels d&apos;offres avec les mêmes équipes, les PME du BTP francilien cherchent des gains de
            productivité opérationnels, pas des transformations numériques de 3 ans.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            C&apos;est exactement ce que proposent les formations IA appliquées au bâtiment d&apos;OFC Création d&apos;Entreprise :{' '}
            <strong>4 heures, sur vos documents réels, avec des résultats le lendemain.</strong>
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Depuis 2022, OFC forme les équipes BTP en Île-de-France en partenariat avec la{' '}
            <strong>FFB Grand Paris</strong>, la <strong>FFB Île-de-France (78/91/95)</strong>, la{' '}
            <strong>FFB IDF Est</strong>, la <strong>CSFE</strong> (étanchéité/bardage) et le{' '}
            <strong>CNAM Île-de-France</strong>. Plus de <strong>{formatProfessionalsTrainedCount()} professionnels</strong>{' '}
            formés — conducteurs de travaux, chargés d&apos;affaires, assistantes administratives, dirigeants de PME —
            avec une note de satisfaction de <strong>{SOCIAL_PROOF.AVERAGE_RATING}</strong>.
          </p>
        </div>
      </section>

      <section id="par-departement" className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Formation IA pour le BTP par département
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Pages dédiées Qualiopi et financement Constructys : problématiques locales, villes couvertes, FAQ
            géographique.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { href: LINKS.formationIaBtpSeineEtMarne77, label: 'Seine-et-Marne (77) — Melun, Meaux, Marne-la-Vallée' },
              { href: LINKS.formationIaBtpYvelines78, label: 'Yvelines (78)' },
              { href: LINKS.formationIaBtpEssonne91, label: 'Essonne (91)' },
              { href: LINKS.formationIaBtpHautsDeSeine92, label: 'Hauts-de-Seine (92)' },
              { href: LINKS.formationIaBtpSeineSaintDenis93, label: 'Seine-Saint-Denis (93)' },
              { href: LINKS.formationIaBtpValDeMarne94, label: 'Val-de-Marne (94)' },
              { href: LINKS.formationIaBtpValDoise95, label: "Val-d'Oise (95)" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-[#377CF3] shadow-sm hover:bg-blue-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="formations" className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Les formations disponibles en Île-de-France
          </h2>
          <div className="mt-10 space-y-10">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold text-slate-900">
                NIV-01 — L&apos;IA au service des pros du Bâtiment Travaux Publics
              </h3>
              <p className="mt-2 text-sm font-medium text-[#377CF3]">
                Niveau débutant · 4 h · {formatTarifHt(TARIF_FORFAIT_DEBUTANT_HT)} € HT/session · {EFFECTIF_GROUPE_MAX} participants max
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Devis, DCE, CCTP, comptes rendus de chantier, relances clients et documents administratifs — pour les
                équipes bâtiment et travaux publics qui démarrent avec l&apos;IA. Programme PDF sur la fiche catalogue.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold text-slate-900">
                NIV-02 — L&apos;IA au service des appels d&apos;offre BTP
              </h3>
              <p className="mt-2 text-sm font-medium text-[#377CF3]">
                Niveau avancé · 4 h · {formatTarifHt(TARIF_FORFAIT_AVANCE_HT)} € HT/session · {EFFECTIF_GROUPE_MAX} participants max
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Analyse DCE, mémoire technique, structuration de réponse marché. Pour les chargés d&apos;affaires et
                conducteurs de travaux qui répondent aux appels d&apos;offres. Programme PDF sur la fiche catalogue.
              </p>
            </article>
          </div>
          <p className="mt-8">
            <Link
              href={LINKS.formations}
              className="font-semibold text-[#377CF3] underline hover:no-underline"
            >
              Voir les programmes détaillés et télécharger les PDF →
            </Link>
          </p>
        </div>
      </section>

      <section id="inter" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Sessions inter en Île-de-France — lieux et fréquence
          </h2>
          <p className="mt-6 text-slate-700 leading-relaxed">
            Les sessions inter permettent à vos salariés de rejoindre un groupe mixte d&apos;entreprises BTP. Format
            idéal pour former 1 à 3 personnes sans organiser une session complète dans vos locaux.
          </p>
          <p className="mt-4 font-medium text-slate-900">Lieux des sessions inter :</p>
          <p className="mt-2 text-slate-700">
            Paris (75) · Versailles (78) · Nanterre (92) · Créteil (94) · Cergy-Pontoise (95) · Melun (77) · Évry (91) ·
            Saint-Denis (93)
          </p>
          <p className="mt-6 text-slate-700 leading-relaxed">
            <strong>Fréquence :</strong> sessions organisées en partenariat avec la FFB Grand Paris, la FFB
            Île-de-France (78/91/95) et le CNAM Île-de-France. Calendrier disponible sur demande.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            <strong>Avantage inter :</strong> vos salariés échangent avec des professionnels d&apos;autres entreprises BTP
            — les retours d&apos;expérience croisés sont l&apos;un des éléments les plus valorisés par les participants.
          </p>
        </div>
      </section>

      <section id="intra" className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Sessions intra — dans vos locaux en Île-de-France
          </h2>
          <p className="mt-6 text-slate-700 leading-relaxed">
            Les sessions intra permettent de former toute une équipe (jusqu&apos;à {EFFECTIF_GROUPE_MAX} participants)
            dans vos locaux, sur vos propres documents. C&apos;est le format le plus efficace pour une adoption rapide à
            l&apos;échelle de l&apos;entreprise.
          </p>
          <ul className="mt-6 space-y-4 text-slate-700">
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
              <span>
                <strong>Ce que vous préparez :</strong> une salle avec un vidéoprojecteur ou un grand écran, et Wi-Fi.
                Laure Olivié apporte le matériel pédagogique et les supports.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
              <span>
                <strong>Ce que vous apportez :</strong> vos documents réels — un DCE en cours, un devis type, un CR de
                chantier récent. La formation se déroule sur vos propres fichiers, pas sur des exemples fictifs.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
              <span>
                <strong>Zone d&apos;intervention intra :</strong> tous les départements d&apos;Île-de-France (75, 77, 78,
                91, 92, 93, 94, 95) sans frais de déplacement supplémentaires. Interventions en dehors d&apos;Île-de-France
                sur devis.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
              <span>
                <strong>Délai de mise en place :</strong> 10 à 15 jours ouvrés après validation du devis et de la
                convention de formation.
              </span>
            </li>
          </ul>
          <blockquote className="mt-8 rounded-xl border-l-4 border-[#377CF3] bg-white p-6 text-slate-700 shadow-sm">
            <p className="font-medium text-slate-900">Réservez une session intra pour votre équipe BTP.</p>
            <a
              href={buildSiteCalendlyCtaUrl('formation-ia-btp-ile-de-france-contact-rdv-page-calendly')}
              className="mt-2 inline-block font-semibold text-[#377CF3] underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prendre rendez-vous →
            </a>
          </blockquote>
        </div>
      </section>

      <section id="financement" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Financement Constructys par département d&apos;Île-de-France
          </h2>
          <p className="mt-6 text-slate-700 leading-relaxed">
            Toutes les formations OFC sont éligibles à une prise en charge Constructys (PDC 2026) pour les entreprises du
            bâtiment et des travaux publics relevant des conventions collectives BTP — selon statut, branche et conditions en vigueur.
          </p>
          <p className="mt-6 font-semibold text-slate-900">Plafonds 2026 :</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>Coût pédagogique : 24 € HT/heure/stagiaire</li>
            <li>Sessions intra : plafond 840 € HT/jour/groupe</li>
            <li>Salaires &lt;11 salariés : 15 € HT/heure/stagiaire</li>
            <li>Salaires 11-50 salariés : 10 € HT/heure/stagiaire (qualifiant)</li>
          </ul>
          <p className="mt-6 text-slate-700 leading-relaxed">
            <strong>La règle à ne pas oublier :</strong> la demande doit être déposée sur eGestion
            (services.constructys.fr) au minimum 15 jours avant la formation. OFC accompagne chaque client dans la
            constitution du dossier et peut facturer directement Constructys (subrogation possible selon dossier — sans garantie d'avance zéro).
          </p>
          <p className="mt-6 font-semibold text-slate-900">Délégations Constructys Île-de-France :</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              Paris / Hauts-de-Seine / Seine-Saint-Denis / Val-de-Marne : délégation Île-de-France Nord
            </li>
            <li>Yvelines / Essonne / Val-d&apos;Oise / Seine-et-Marne : délégation Île-de-France Sud-Ouest</li>
          </ul>
          <p className="mt-8">
            <Link href="/financement-constructys-formation-ia-btp" className="font-semibold text-[#377CF3] underline">
              Guide complet du financement Constructys
            </Link>
            {' · '}
            <Link href="/blog/dossier-constructys-2026-etapes" className="font-semibold text-[#377CF3] underline">
              Monter son dossier en 20 min
            </Link>
          </p>
        </div>
      </section>

      <section id="references" className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Références clients en Île-de-France
          </h2>
          <div className="mt-8 space-y-6 text-slate-700 leading-relaxed">
            <p>
              <strong>FFB Grand Paris</strong> — Sessions inter entreprises et conducteurs de travaux, Paris et petite
              couronne. Référence OFC : {formatProfessionalsTrainedCount()} professionnels formés, note{' '}
              {SOCIAL_PROOF.AVERAGE_RATING}.
            </p>
            <p>
              <strong>FFB Île-de-France (78/91/95)</strong> — Sessions inter en Yvelines, Essonne et Val-d&apos;Oise.
              Partenariat actif avec l&apos;IFRB 78/91/95.
            </p>
            <p>
              <strong>FFB IDF Est</strong> — Sessions inter Seine-et-Marne et Seine-Saint-Denis.
            </p>
            <p>
              <strong>CSFE</strong> (Chambre Syndicale Française de l&apos;Étanchéité) — Sessions intra pour entreprises
              d&apos;étanchéité et de bardage. Module spécifique DCE/mémoire technique étanchéité.
            </p>
            <p>
              <strong>CNAM Île-de-France</strong> — Formation continue intégrée aux parcours CNAM pour les professionnels
              du BTP en activité.
            </p>
            <p>
              <strong>Entreprises intra en Île-de-France :</strong> PITEL (Morangis, 200 salariés), LSR La Société des
              Revêtements (Neuilly-sur-Marne), CHAPELEC, TREBISOL, AXE ÉTANCHÉITÉ, SERBACO (sessions CSFE), et de
              nombreuses PME en direct via la FFB.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        id="faq-idf"
        title="FAQ — formation IA pour les pro du BTP en Île-de-France"
        subtitle="Modalités géographiques, inter/intra, devis et présentiel."
        items={FAQ_IDF}
      />

      <section id="a-propos" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Qui est Laure Olivié ?</h2>
          <p className="mt-6 text-slate-700 leading-relaxed">
            Laure Olivié est formatrice IA et ChatGPT pour les entreprises du bâtiment et des travaux publics. Basée à{' '}
            <strong>Guyancourt (Yvelines, 78)</strong>, elle intervient exclusivement en présentiel, sur l&apos;ensemble
            de l&apos;Île-de-France.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Son parcours est unique : après 7 ans à la tête d&apos;ALIA BTP (entreprise de travaux publics, Guyancourt),
            elle a créé OFC Création d&apos;Entreprise en 2022 pour accompagner les professionnels du BTP dans
            l&apos;intégration de l&apos;IA à leurs processus opérationnels. Elle est la seule formatrice IA
            spécialisée BTP avec une expérience de dirigeante de chantier.
          </p>
          <p className="mt-6 text-sm font-medium text-slate-800">
            +{formatProfessionalsTrainedCount()} professionnels formés · Note {SOCIAL_PROOF.AVERAGE_RATING} · Qualiopi ·
            Activateur France Num · Instructrice LinkedIn Learning · FFB Grand Paris · FFB Île-de-France · CSFE · CNAM
            IDF
          </p>
          <p className="mt-6">
            <Link href="/a-propos" className="font-semibold text-[#377CF3] underline hover:no-underline">
              Voir le parcours complet →
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-xl font-bold text-slate-900">Articles liés</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              <Link href="/blog/ia-analyse-cctp-methode" className="text-[#377CF3] underline">
                IA pour analyser un CCTP : méthode en 4 étapes
              </Link>
            </li>
            <li>
              <Link href="/blog/ia-conducteur-travaux-usages" className="text-[#377CF3] underline">
                IA pour conducteur de travaux : 8 usages terrain
              </Link>
            </li>
            <li>
              <Link href="/blog/dossier-constructys-2026-etapes" className="text-[#377CF3] underline">
                Constructys 2026 : monter son dossier en 20 min
              </Link>
            </li>
            <li>
              <Link href="/formations/ia-appels-offre-btp" className="text-[#377CF3] underline">
                Formation IA appels d&apos;offres BTP
              </Link>
            </li>
            <li>
              <Link href="/formations/ia-btp-paris" className="text-[#377CF3] underline">
                Formation IA appliquée au bâtiment Paris
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section id="rdv" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Réservez votre diagnostic IA BTP gratuit
          </h2>
          <p className="mt-6 text-slate-700 leading-relaxed">
            Un échange de 30 minutes pour identifier la formation la plus adaptée à votre équipe, estimer la prise en
            charge Constructys, et planifier une session dans vos locaux ou en inter.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <RdvLink className="inline-flex rounded-full bg-[#377CF3] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#2d6ae0]">
              Réserver mon diagnostic IA BTP
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 px-8 py-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-50" />
          </div>
          <p className="mt-8 text-sm text-slate-600">
            <a
              href="https://www.laureolivie.fr/formations"
              className="text-[#377CF3] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Catalogue des formations
            </a>
            {' · '}
            <Link href="/financement-constructys-formation-ia-btp" className="text-[#377CF3] underline">
              Financement Constructys
            </Link>
          </p>
        </div>
      </section>

      <footer className="bg-[#F2F2F2] px-4 py-10 text-center text-sm text-slate-500">
        <p>Laure Olivié — Formatrice IA pour le BTP, OFC Création d&apos;Entreprise</p>
        <p>Certifiée Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078 · Guyancourt (78)</p>
        <p>
          laureolivie@yahoo.fr ·{' '}
          <a href="https://www.laureolivie.fr" className="underline">
            www.laureolivie.fr
          </a>
        </p>
      </footer>
    </div>
  );
}
