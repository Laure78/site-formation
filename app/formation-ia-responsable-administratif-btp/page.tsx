import Link from 'next/link';
import { Check } from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { PreuveSociale } from '@/components/PreuveSociale';
import { LiensConnexes } from '@/components/LiensConnexes';
import { RelatedLinks } from '@/components/RelatedLinks';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import {
  EFFECTIF_GROUPE_MAX,
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_DEBUTANT_HT,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import {
  FORMATION_IA_RESPONSABLE_ADMINISTRATIF_BTP_PATH,
  FORMATION_IA_RESPONSABLE_ADMINISTRATIF_BTP_SEO,
  PROMPT_CONTROLE_FACTURE_RAF,
  PROMPT_MAILS_RAF,
  RAF_BTP_EN_BREF,
  RAF_BTP_FAQ,
  RAF_BTP_OBJECTIFS,
  RAF_BTP_PREREQUIS,
  RAF_BTP_PROGRAMME,
  RAF_BTP_PUBLIC,
  RAF_BTP_USE_CASES,
  buildResponsableAdministratifBtpCourseJsonLd,
} from '@/lib/formation-ia-responsable-administratif-btp-landing';

import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';

export const revalidate = 3600;

export const metadata = createMetierBtpPageMetadata('responsable administratif', {
  title: FORMATION_IA_RESPONSABLE_ADMINISTRATIF_BTP_SEO.title,
  description: FORMATION_IA_RESPONSABLE_ADMINISTRATIF_BTP_SEO.description,
  path: FORMATION_IA_RESPONSABLE_ADMINISTRATIF_BTP_PATH,
  openGraphType: 'website',
  appendAuthorSuffix: false,
  descriptionFinal: true,
  keywords: [
    'formation IA responsable administratif BTP',
    'ChatGPT BTP admin',
    'IA devis factures mails BTP',
    'formation IA Île-de-France',
    'OPCO Constructys',
    'Qualiopi BTP',
  ],
});

const SOMMAIRE = [
  { href: '#cas-usage', label: 'Cas d’usage IA admin BTP' },
  { href: '#le-probleme', label: 'Pourquoi l’IA pour l’admin BTP' },
  { href: '#public', label: 'Public & prérequis' },
  { href: '#programme', label: 'Programme & objectifs' },
  { href: '#methode', label: 'Méthode + prompts concrets' },
  { href: '#financement', label: 'Financement Constructys' },
  { href: '#faq', label: 'FAQ' },
  { href: '#rdv', label: 'Visio découverte gratuite' },
];

const METHODE_ETAPES = [
  {
    title: 'Rassembler la matière brute',
    body: 'Mails, notes, devis, BL, factures, extraits Excel : l’IA part de vos documents, pas d’un modèle générique hors contexte BTP.',
  },
  {
    title: 'Structurer avec un prompt métier admin',
    body: 'Contexte entreprise, références chantier, ton attendu, format de sortie : le prompt cadré produit un brouillon exploitable.',
  },
  {
    title: 'Relire, corriger, valider',
    body: 'Quelques minutes de relecture avant envoi, signature ou archivage. Vous restez responsable du fond — l’IA n’est qu’un assistant.',
  },
];

export default function FormationIaResponsableAdministratifBtpPage() {
  const faqSchema = getFAQSchema([...RAF_BTP_FAQ]);
  const courseJsonLd = buildResponsableAdministratifBtpCourseJsonLd();
  const path = FORMATION_IA_RESPONSABLE_ADMINISTRATIF_BTP_PATH;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-slate-800 md:py-14">
      <JsonLd id="jsonld-course-responsable-administratif-btp" schema={courseJsonLd} />
      {faqSchema ? <JsonLd id="jsonld-faq-responsable-administratif-btp" schema={faqSchema} /> : null}

      <article>
        <header>
          <MetierIdfPresentielLine className="mb-4" />
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem] lg:leading-tight">
            {FORMATION_IA_RESPONSABLE_ADMINISTRATIF_BTP_SEO.h1}
          </h1>

          <PreuveSociale className="mt-6" />

          <EnBref>
            {RAF_BTP_EN_BREF.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </EnBref>

          <p className="mt-4 text-lg text-slate-600">
            Sessions en présentiel en Île-de-France — Laure Olivié · {SITE_CONFIG.legalName} · Qualiopi ·
            Financement OPCO possible selon éligibilité
          </p>

          <p className="mt-4 text-sm text-slate-600">
            Déjà {formatProfessionalsTrainedCount(SOCIAL_PROOF.PROFESSIONALS_TRAINED)}+ professionnels formés — sessions avec la FFB Île-de-France et partenaires BTP.
          </p>

          <div className="mt-8">
            <ShortAnswerBlock>
              Dans le BTP, le responsable administratif pilote devis, factures, mails, dossiers clients, relances et
              coordination avec le terrain. L’IA (ChatGPT, Claude…) accélère rédaction et synthèse — sans remplacer
              votre expertise ni votre validation. Pour le volet secrétariat / courriers au quotidien, voir aussi la{' '}
              <Link href={LINKS.formationIaAssistanteBtp} className="font-medium text-[#377CF3] hover:underline">
                formation IA assistante administrative BTP
              </Link>
              .
            </ShortAnswerBlock>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <RdvLink
              campaign="formation-ia-responsable-administratif-btp-hero"
              ctaPosition="hero"
              ctaId="hero"
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

        <section id="cas-usage" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Cas d&apos;usage concrets pour responsables administratifs BTP
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Remontés en tête de page : les situations que vous traitez au bureau — et que l’on travaille en session.
          </p>
          <ul className="mt-6 space-y-5">
            {RAF_BTP_USE_CASES.map((item) => (
              <li key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600">
            Session catalogue{' '}
            <strong>
              NIV-01 — L&apos;IA au service des pros du bâtiment et des travaux publics
            </strong>{' '}
            ({formatTarifHt(TARIF_FORFAIT_DEBUTANT_HT)} € HT · {EFFECTIF_GROUPE_MAX} participants max ·{' '}
            {SESSION_DUREE_LIBELLE}).
          </p>
        </section>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Pourquoi l&apos;IA est utile pour l&apos;admin BTP
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Une grande part du temps bureau sert à reformuler, relancer, classer et contrôler : mails, factures,
            dossiers clients, notes de frais, CR et coordination avec les chantiers. L&apos;IA accélère la
            préparation et la formalisation — elle ne signe pas à votre place.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Lors des sessions avec la <strong>FFB Île-de-France</strong> et les PME du bâtiment, les profils
            administratifs ciblent les mêmes usages : relances, synthèses de dossiers, contrôles documentaires et
            tableaux de suivi.
          </p>
          <ul className="mt-6 space-y-4 text-slate-700">
            {[
              'Rédiger plus vite mails, relances et courriers avec un ton adapté',
              'Synthétiser un dossier chantier pour la direction ou le conducteur',
              'Repérer des écarts devis / commande / BL / facture avant validation',
              'Structurer CR, procédures et notes de frais',
              'Organiser un suivi Excel (impayés, commandes, dossiers clients)',
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="public" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            À qui s&apos;adresse cette formation ?
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {RAF_BTP_PUBLIC.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">Prérequis</h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {RAF_BTP_PREREQUIS.map((line) => (
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
            {RAF_BTP_PROGRAMME.map((item) => (
              <li key={item.title}>
                <strong className="text-slate-900">{item.title}</strong>
                <p className="mt-2 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Objectifs en fin de formation
          </h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {RAF_BTP_OBJECTIFS.map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#377CF3] p-8 text-white">
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Visio découverte gratuite — 30 minutes
          </h2>
          <p className="mt-3 leading-relaxed text-blue-100">
            Échangeons sur vos mails, contrôles factures et dossiers clients : j&apos;identifie les usages IA qui
            vous feront gagner le plus de temps dès la première semaine.
          </p>
          <div className="mt-6">
            <RdvLink
              campaign="formation-ia-responsable-administratif-btp-milieu"
              ctaPosition="middle"
              className="inline-flex items-center rounded-lg bg-white px-5 py-3 font-semibold text-[#377CF3] hover:bg-slate-50"
            >
              Réserver ma visio gratuite →
            </RdvLink>
          </div>
        </section>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode en 3 étapes — avec 2 prompts admin BTP
          </h2>
          <ol className="mt-6 list-decimal space-y-6 pl-5 text-slate-700">
            {METHODE_ETAPES.map((step) => (
              <li key={step.title}>
                <strong className="text-slate-900">{step.title}</strong>
                <p className="mt-2 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Prompt 1 — mails de relance et coordination
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_MAILS_RAF}
          </pre>

          <h3 className="mt-10 font-display text-xl font-semibold text-slate-900">
            Prompt 2 — contrôle facture / BL vs devis
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
            {PROMPT_CONTROLE_FACTURE_RAF}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ordres de grandeur — temps de rédaction
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Indicatifs uniquement — <strong>variables</strong> selon le volume de dossiers et votre temps de
            relecture :
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse border border-slate-200 text-left text-sm">
              <caption className="sr-only">
                Temps indicatif avant / après usage de l’IA sur tâches admin BTP
              </caption>
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 font-semibold">Tâche</th>
                  <th className="border border-slate-200 p-3 font-semibold">Sans IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Avec IA</th>
                  <th className="border border-slate-200 p-3 font-semibold">Gain typique</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ['Mail / relance', 'Rédaction longue', 'Brouillon cadré', 'Important'],
                  ['Synthèse dossier', 'Lecture + reformulation', 'Plan + puces', 'Important'],
                  ['Contrôle facture / BL', 'Comparaison manuelle', 'Écarts listés', 'Modéré à fort'],
                  ['CR de réunion', 'Mise en forme lente', 'Structure prête', 'Important'],
                  ['Suivi Excel', 'Tableau à construire', 'Trame proposée', 'Modéré'],
                ].map(([doc, sans, avec, gain]) => (
                  <tr key={doc}>
                    <td className="border border-slate-200 p-3">{doc}</td>
                    <td className="border border-slate-200 p-3">{sans}</td>
                    <td className="border border-slate-200 p-3">{avec}</td>
                    <td className="border border-slate-200 p-3 font-medium text-[#377CF3]">{gain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DisclaimerGains className="mt-4" />
        </section>

        <section id="financement" className="scroll-mt-24 mt-14 rounded-2xl border border-slate-200 bg-[#F2F2F2] p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Financement Constructys — selon éligibilité
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            OFC Création d&apos;Entreprise est un organisme certifié Qualiopi. Un{' '}
            <strong>financement OPCO Constructys est possible selon éligibilité</strong> et constitution du dossier —
            jamais « garanti » a priori. Pour les plafonds, démarches eGestion et cas de figure (salarié, dirigeant),
            consultez le{' '}
            <Link href={LINKS.financement} className="font-semibold text-[#377CF3] underline hover:no-underline">
              guide financement Constructys formation IA BTP
            </Link>
            .
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — responsables administratifs BTP et IA
          </h2>
          <dl className="mt-8 space-y-8">
            {RAF_BTP_FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-slate-600">
                  <FAQAnswer content={item.a} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <RelatedLinks
          path={path}
          className="mt-14 !px-0"
          tone="transparent"
          excludeHrefs={[
            LINKS.formationIaAssistanteBtp,
            LINKS.formationIaBtpNiveau1BatimentTp,
            LINKS.financement,
          ]}
        />

        <LaureOlivieFormationPortrait />
        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/30 bg-[#F2F2F2] p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Réservez votre visio découverte gratuite — 30 min
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Identifions ensemble les tâches admin (mails, contrôles, dossiers, Excel) où l&apos;IA vous fera gagner
            le plus de temps. Gratuit, sans engagement — session catalogue finançable Constructys selon éligibilité.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <RdvLink
              campaign="formation-ia-responsable-administratif-btp-rdv-final"
              ctaPosition="footer"
              className="inline-flex items-center rounded-lg bg-[#377CF3] px-5 py-3 font-semibold text-white hover:bg-[#2d63c9]"
            >
              Prendre rendez-vous — visio gratuite 30 min
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-slate-50" />
            <Link
              href={LINKS.contact}
              className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-slate-50"
            >
              Contact
            </Link>
          </div>
        </section>

        <LiensConnexes
          currentPath={path}
          excludeHrefs={[
              ...getClusterRelatedHrefs(path),
              LINKS.formationIaAssistanteBtp,
              LINKS.formationIaBtpNiveau1BatimentTp,
              LINKS.financement,
              LINKS.contact,
            ]}
          />

        <AllerPlusLoin
          links={[
            { href: LINKS.formations, label: 'Catalogue formations IA pour les pros du BTP' },
            { href: LINKS.formationChargeAffairesBtp, label: 'Formation IA chargé d’affaires BTP' },
          ].filter((l) => !getClusterRelatedHrefs(path).includes(l.href))}
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
