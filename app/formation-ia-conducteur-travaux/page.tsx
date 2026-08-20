import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { EFFECTIF_GROUPE_MAX, TARIF_FORFAIT_DEBUTANT_HT ,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { PHOTOS } from '@/lib/photos';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { RelatedLinks } from '@/components/RelatedLinks';
import { LiensConnexes } from '@/components/LiensConnexes';
import { getLiensConnexesHrefs } from '@/lib/liens-connexes';
import {
  CONDUCTEUR_TRAVAUX_FAQ,
  CONDUCTEUR_TRAVAUX_USE_CASES,
  FORMATION_IA_CONDUCTEUR_TRAVAUX_PATH,
  FORMATION_IA_CONDUCTEUR_TRAVAUX_SEO,
  PROMPT_CR,
  PROMPT_DOE,
  PROMPT_EMAIL,
  PROMPT_PPSPS,
  buildConducteurTravauxLandingJsonLd,
} from '@/lib/formation-ia-conducteur-travaux-landing';

export const revalidate = 3600;
const CALENDLY_VISIO = buildSiteCalendlyCtaUrl('formation-ia-conducteur-travaux-visio-decouverte');

export const metadata = createPageMetadata({
  title: FORMATION_IA_CONDUCTEUR_TRAVAUX_SEO.title,
  titleAbsolute: FORMATION_IA_CONDUCTEUR_TRAVAUX_SEO.titleAbsolute,
  description: FORMATION_IA_CONDUCTEUR_TRAVAUX_SEO.description,
  path: FORMATION_IA_CONDUCTEUR_TRAVAUX_PATH,
  openGraphType: 'website',
  appendAuthorSuffix: false,
  openGraphTitle: FORMATION_IA_CONDUCTEUR_TRAVAUX_SEO.titleAbsolute,
  openGraphDescription: FORMATION_IA_CONDUCTEUR_TRAVAUX_SEO.description,
  image: {
    url: '/images/btp-conducteur-plans.png',
    width: 1200,
    height: 630,
    alt: 'Conducteur de travaux BTP avec plans — comptes rendus, PPSPS et suivi administratif',
  },
});

const SOMMAIRE = [
  { href: '#le-probleme', label: '2 à 3 h par jour sur l’administratif' },
  { href: '#la-solution', label: "Ce que l'IA automatise pour un CDT" },
  { href: '#usages', label: '7 cas d’usage concrets' },
  { href: '#prompts', label: '4 prompts prêts à copier-coller' },
  { href: '#temoignage', label: 'Retour d’expérience conducteur de travaux' },
  { href: '#resultats', label: 'Gains de temps mesurés' },
  { href: '#programme', label: 'Formation catalogue NIV-01' },
  { href: '#financement', label: 'Financement Constructys' },
  { href: '#faq', label: 'FAQ conducteurs de travaux' },
  { href: '#rdv', label: FORMATION_IA_CONDUCTEUR_TRAVAUX_SEO.calendlyCtaLabel },
];

export default function FormationIaConducteurTravauxPage() {
  const faqSchema = getFAQSchema([...CONDUCTEUR_TRAVAUX_FAQ]);
  const pageJsonLd = buildConducteurTravauxLandingJsonLd();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <JsonLd id="jsonld-conducteur-travaux-graph" schema={pageJsonLd} />
      {faqSchema ? <JsonLd id="jsonld-faq-conducteur-travaux" schema={faqSchema} /> : null}

      <article>
        <header>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem] lg:leading-tight">
            {FORMATION_IA_CONDUCTEUR_TRAVAUX_SEO.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Laure Olivié · {SITE_CONFIG.legalName} · organisme certifié Qualiopi · Finançable Constructys
          </p>

          <figure className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <Image
              src="/images/btp-conducteur-plans.png"
              alt="Conducteur de travaux BTP étudiant des plans sur chantier — comptes rendus et coordination"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </figure>

          <div className="mt-8">
            <ShortAnswerBlock>
              Automatisez CR, PPSPS, mails chantier et rapports de réception avec ChatGPT et Claude AI.
              Formation dispensée par un organisme certifié <strong>Qualiopi</strong>, éligible <strong>Constructys</strong> selon dossier —{' '}
              <strong>+{formatProfessionalsTrainedCount()} professionnels</strong> formés, note{' '}
              {SOCIAL_PROOF.AVERAGE_RATING}.
            </ShortAnswerBlock>
          </div>
        </header>

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

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Vous passez 2 à 3 h par jour sur l’administratif de chantier
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Comptes rendus, suivi administratif, coordination MOA/MOE, relances sous-traitants, mise à jour des
            tableaux d’avancement, préparation des réunions hebdomadaires : le conducteur de travaux est le pivot
            opérationnel du chantier — et personne d’autre ne peut produire ces documents à sa place.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Lors des sessions avec la <strong>FFB Grand Paris</strong> et la <strong>FFB Île-de-France</strong>, les
            conducteurs de travaux formés estiment consacrer <strong>35 à 40 % de leur temps</strong> à ces tâches.
            Sur 45 h hebdomadaires, cela représente <strong>16 à 18 h</strong> derrière un écran plutôt que sur le
            terrain — soit l’équivalent de <strong>2 à 3 h par jour ouvré</strong>.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Ces documents sont indispensables et contractuellement sensibles. Mais leur <em>rédaction</em> et leur{' '}
            <em>mise en forme</em> sont massivement automatisables par l’IA, sous réserve de votre relecture systématique
            (3 à 5 minutes par document).
          </p>
          <ul className="mt-6 space-y-4 text-slate-700">
            {[
              'CR hebdomadaire : 1 h 30 à 2 h → 15 min avec dictée + IA',
              'Email MOA/MOE sur aléa : 20 à 30 min → 3 min',
              'Extraction clause CCTP ou avenant : 45 min → 5 min',
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            L’IA automatise le CR, le PPSPS, les mails chantier et les rapports de réception
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            ChatGPT et Claude AI transforment vos notes brutes, dictées vocales ou listes Excel en documents
            structurés : compte rendu de chantier, plan PPSPS, email client, analyse d’avenant, dossier DOE, PV de
            réception. Vous gardez le jugement terrain, la décision technique et la signature.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            <strong>Ce que l’IA ne remplace pas :</strong> l’observation des malfaçons, la gestion des conflits avec
            les sous-traitants, la négociation des délais. <strong>Ce qu’elle accélère :</strong> tout ce qui part de
            l’information que vous possédez déjà et qui doit être mise en forme proprement.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            La formation <strong>L&apos;IA au service des professionnels du BTP (NIV-01)</strong> couvre ces usages en
            4 h pratiques, sur vos documents réels, dispensée par un organisme certifié Qualiopi — programme détaillé plus bas sur cette
            page.
          </p>

          <figure className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-slate-200">
            <Image
              src={PHOTOS.btpFormationChantierEquipe2026.src}
              alt="Réunion de chantier BTP avec plans — coordination des équipes sur le terrain"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </figure>
        </section>

        <section id="usages" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            7 cas d’usage concrets pour conducteurs de travaux
          </h2>
          <ol className="mt-6 list-decimal space-y-5 pl-5 leading-relaxed text-slate-700">
            {CONDUCTEUR_TRAVAUX_USE_CASES.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong> — {item.body}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-slate-600">
            Des articles détaillés et le guide PDF conducteur de travaux sont listés dans la section « Ressources liées
            » en fin de page.
          </p>
        </section>

        <section id="prompts" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            4 prompts ChatGPT / Claude prêts à copier-coller
          </h2>
          <p className="mt-3 text-slate-600">
            Remplacez les [crochets], collez dans ChatGPT ou Claude, relisez avant envoi ou diffusion.
          </p>

          {[
            { title: 'Prompt 1 — CR de chantier depuis dictée', body: PROMPT_CR },
            { title: 'Prompt 2 — Structure PPSPS chantier', body: PROMPT_PPSPS },
            { title: 'Prompt 3 — Email MOA / MOE (aléa)', body: PROMPT_EMAIL },
            { title: 'Prompt 4 — Dossier DOE assisté', body: PROMPT_DOE },
          ].map(({ title, body }) => (
            <div key={title} className="mt-8">
              <h3 className="font-display text-xl font-semibold text-slate-900">{title}</h3>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
                {body}
              </pre>
            </div>
          ))}
        </section>

        <section id="temoignage" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Témoignage — conducteur de travaux, PME gros œuvre (Yvelines)
          </h2>
          <blockquote className="mt-6 rounded-2xl border-l-4 border-[#377CF3] bg-slate-50 p-6 text-slate-700">
            <p className="text-lg leading-relaxed italic">
              « Avant la formation, je bloquais mes vendredis après-midi pour les CR et les mails au MOE. Depuis, je
              dicte en quittant le chantier : 15 minutes plus tard le CR est prêt. Sur les PPSPS de nos petits
              chantiers, je gagne au moins une demi-journée. Facilement{' '}
              <strong>4 à 5 h récupérées par semaine</strong>. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-800 not-italic">
              — Thomas R., conducteur de travaux, entreprise de 18 salariés (78), session intra mars 2026
            </footer>
          </blockquote>
          <p className="mt-4 text-sm text-slate-500">
            Retour recueilli en fin de formation (questionnaire Qualiopi). Prénom modifié, secteur et effectif
            conservés.
          </p>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Gains de temps mesurés — données formations OFC
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse border border-slate-200 text-left text-sm">
              <caption className="sr-only">Gains de temps IA pour conducteur de travaux</caption>
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Usage</th>
                  <th className="border border-slate-200 p-3 font-semibold">Sans IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Avec IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Gain</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ['CR de réunion chantier', '1 h 30 à 2 h', '15 à 20 min', '−85 %'],
                  ['PPSPS / trame DUERP', '1 à 2 jours', '2 à 4 h (+ relecture SST)', '−75 %'],
                  ['Email MOA/MOE', '20 à 30 min', '3 à 5 min', '−85 %'],
                  ['Analyse avenant / CCTP', '45 à 60 min', '5 min', '−90 %'],
                  ['DOE — structuration', '2 à 3 jours', '4 à 6 h', '−70 %'],
                  ['PV réception / réserves', '45 à 60 min', '8 à 10 min', '−85 %'],
                ].map(([u, sans, avec, gain]) => (
                  <tr key={u as string}>
                    <td className="border border-slate-200 p-3">{u}</td>
                    <td className="border border-slate-200 p-3">{sans}</td>
                    <td className="border border-slate-200 p-3">{avec}</td>
                    <td className="border border-slate-200 p-3 font-medium text-[#377CF3]">{gain}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-semibold">
                  <td className="border border-slate-200 p-3">Semaine type (5 usages)</td>
                  <td className="border border-slate-200 p-3">5 à 7 h</td>
                  <td className="border border-slate-200 p-3">45 à 60 min</td>
                  <td className="border border-slate-200 p-3 text-[#377CF3]">≈ 5 h/semaine</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="programme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Formation catalogue — NIV-01 (4 h, Qualiopi)
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Réf. NIV-01 · Débutant · {formatTarifHt(TARIF_FORFAIT_DEBUTANT_HT)} € HT/session · {EFFECTIF_GROUPE_MAX} participants max
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            <strong>L&apos;IA au service des professionnels du BTP</strong> : session de 4 h pour conducteurs de
            travaux, chefs de chantier et équipes support. Travail sur vos CR, mails, PPSPS et documents chantier
            réels. Intra ou inter, exclusivement en présentiel — Île-de-France.
          </p>
          <p className="mt-6">
            <Link
              href={LINKS.formationIaBtpNiveau1BatimentTp}
              className="inline-flex items-center rounded-lg bg-[#377CF3] px-5 py-3 font-semibold text-white hover:bg-[#2d63c9]"
            >
              Voir le programme NIV-01 →
            </Link>
            {' '}
            <Link href={LINKS.formations} className="font-semibold text-[#377CF3] underline">
              Catalogue formations
            </Link>
          </p>
        </section>

        <section id="financement" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Financement Constructys</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            OFC Création d&apos;Entreprise est certifié Qualiopi. Prise en charge possible via{' '}
            <strong>OPCO Constructys</strong> selon barèmes et éligibilité (plafonds 24 € HT/h/participant, max 840 €
            HT/jour/groupe intra). Dépôt dossier eGestion ≥ 15 jours avant la session.
          </p>
          <p className="mt-4">
            <Link href={LINKS.financement} className="font-semibold text-[#377CF3] underline">
              Guide financement Constructys formation IA appliquée au bâtiment
            </Link>
            {' · '}
            <Link
              href={LINKS.blogFinancerFormationIaBtpConstructys}
              className="font-semibold text-[#377CF3] underline"
            >
              Article : financer sa formation IA pour le BTP
            </Link>
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — conducteurs de travaux et IA</h2>
          <dl className="mt-8 space-y-8">
            {CONDUCTEUR_TRAVAUX_FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-slate-600">
                  <FAQAnswer content={item.a} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-display text-xl font-bold text-slate-900">Ressources liées</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              <Link href={LINKS.formationAO} className="text-[#377CF3] underline">
                Formation NIV-02 — IA appels d&apos;offres BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.blogIaConducteurTravauxUsages} className="text-[#377CF3] underline">
                IA conducteur de travaux : 8 usages terrain
              </Link>
            </li>
            <li>
              <Link href={LINKS.blogGuideSkillIaConducteurTravaux} className="text-[#377CF3] underline">
                Créer son skill IA conducteur de travaux
              </Link>
            </li>
            <li>
              <Link href={LINKS.guideConducteurTravauxIaBtp} className="text-[#377CF3] underline">
                Guide PDF conducteur de travaux — 6 tutos Claude
              </Link>
            </li>
            <li>
              <Link href={LINKS.tutoCrChantier} className="text-[#377CF3] underline">
                Tutoriel PDF — compte rendu de chantier avec l&apos;IA
              </Link>
            </li>
            <li>
              <Link href={LINKS.blogCommentIaGagne5hConducteursTravaux} className="text-[#377CF3] underline">
                Comment l&apos;IA fait gagner 5 h/semaine aux CDT
              </Link>
            </li>
          </ul>
        </section>

        <RelatedLinks
          path={LINKS.formationIaConducteurTravauxLanding}
          className="mt-14 !px-0"
          tone="transparent"
          excludeHrefs={getLiensConnexesHrefs(LINKS.formationIaConducteurTravauxLanding)}
        />
        <LiensConnexes currentPath={LINKS.formationIaConducteurTravauxLanding} />

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#F2F2F2] p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {FORMATION_IA_CONDUCTEUR_TRAVAUX_SEO.calendlyCtaLabel}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            30 minutes en visio pour identifier les 3 usages qui vous feront gagner le plus de temps cette semaine.
            Gratuit, sans engagement.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={CALENDLY_VISIO}
              className="inline-flex items-center rounded-lg bg-[#377CF3] px-5 py-3 font-semibold text-white hover:bg-[#2d63c9]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {FORMATION_IA_CONDUCTEUR_TRAVAUX_SEO.calendlyCtaLabel}
            </a>
            <RdvLink className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-white">
              Autre créneau Calendly
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-white" />
          </div>
        </section>

        <RenvoiFicheCatalogue programmeRef="NIV-01" contexte="pour les conducteurs de travaux" />

        <LaureOlivieFormationPortrait />
</article>
    </div>
  );
}
