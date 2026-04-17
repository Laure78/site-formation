import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Check, Euro } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { FAQ_FORMATIONS } from '@/lib/faq';
import { PHOTOS } from '@/lib/photos';
import {
  libelleTarifParticipant,
  SESSION_DUREE_LIBELLE,
  ENCART_TARIFS_COMMERCIAUX,
  LIBELLE_EFFECTIF_GROUPE_COURT,
} from '@/lib/tarifs-sessions';
import { LINKS } from '@/lib/internal-links';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildFormationsPageUnifiedGraphJsonLd } from '@/lib/schema-formations-page-graph';

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

const OG_TITLE = 'Catalogue formation IA BTP — 6 formations Qualiopi 4 h';
const OG_DESCRIPTION =
  "6 formations IA BTP de 4 h finançables Constructys : bâtiment, TP, appels d'offres, RH, architecture, sensibilisation. Inter Île-de-France ou intra dans vos locaux.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Formation IA BTP : catalogue 6 formations Qualiopi | Laure Olivié',
    description:
      "Catalogue 6 formations IA BTP : ChatGPT bâtiment, travaux publics, appels d'offres, RH, architecture. 4 h, 100 ou 175 € HT/pers, finançable Constructys. Île-de-France.",
    path: '/formations',
    appendAuthorSuffix: false,
    openGraphTitle: OG_TITLE,
    openGraphDescription: OG_DESCRIPTION,
    keywords: [
      'catalogue formation IA BTP',
      'formation ChatGPT BTP',
      'formation IA bâtiment',
      'formation IA travaux publics',
      "formation IA appels d'offre BTP",
      'formation IA RH BTP',
      'formation IA architecte',
      'formation IA Qualiopi',
      'formation IA Constructys',
      'formation IA BTP Île-de-France',
    ],
    robots: { index: true, follow: true },
    image: {
      url: PHOTOS.formationIaBtpSalleInteractive2026.src,
      width: 1200,
      height: 630,
      alt:
        'Catalogue formation IA BTP — 6 formations Qualiopi de 4 h pour entreprises du bâtiment et travaux publics',
    },
  }),
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: `${baseUrl}/formations`,
    siteName: 'Laure Olivié — Formation IA BTP',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: `${baseUrl}${PHOTOS.formationIaBtpSalleInteractive2026.src}`,
        width: 1200,
        height: 630,
        alt:
          'Catalogue formation IA BTP — 6 formations Qualiopi de 4 h pour entreprises du bâtiment et travaux publics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description:
      "6 formations IA BTP finançables Constructys. Inter Île-de-France ou intra. Bâtiment, TP, appels d'offres, RH, architecture.",
    images: [`${baseUrl}${PHOTOS.formationIaBtpSalleInteractive2026.src}`],
  },
  alternates: {
    canonical: `${baseUrl}/formations`,
    languages: { 'fr-FR': `${baseUrl}/formations` },
  },
  other: {
    'geo.region': 'FR-IDF',
    'geo.placename': 'Guyancourt',
    'geo.position': '48.7713;2.0739',
    ICBM: '48.7713, 2.0739',
  },
};

/** Tri catalogue : dé puis avancé. */
const LEVEL_RANK: Record<string, number> = { DÉBUTANT: 0, AVANCÉ: 1 };

/** 6 formations catalogue Qualiopi — fiche complémentaire CCTP/DCE liée dans le corps de page. */
const FORMATIONS_UNSORTED = [
  {
    ref: 'BTP-01',
    level: 'DÉBUTANT' as const,
    title: "L'IA au service du bâtiment",
    href: '/formations/ia-au-service-du-batiment',
    visuel: PHOTOS.formationIABtpVisioBureau2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      "Identifier les usages IA utiles dans le BTP",
      "Accélérer la rédaction de devis et messages clients",
      "Structurer l'administratif (CR, relances, modèles)",
      "Repartir avec des trames et prompts prêts à l'emploi",
    ],
  },
  {
    ref: 'BTP-02',
    level: 'AVANCÉ' as const,
    title: "Répondre aux appels d'offre avec l'IA",
    href: '/formations/ia-appels-offre-btp',
    visuel: PHOTOS.btpFormationChantierPlans2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      "Analyser un DCE rapidement et structurer les critères d'évaluation",
      "Rédiger mémoires techniques et chiffrages avec méthode et assistant IA",
      "Bibliothèque de prompts et templates par métier pour les marchés BTP",
      "Créer et paramétrer un assistant IA DCE / mémoire adapté à votre entreprise",
      "Sécuriser le process : confidentialité, relecture humaine — Qualiopi, OPCO Constructys",
    ],
  },
  {
    ref: 'BTP-03',
    level: 'AVANCÉ' as const,
    title: "Formation IA pour la Fonction RH dans le BTP",
    href: '/formations/ia-rh-btp',
    visuel: PHOTOS.btpFormationBureauConseil2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      "Automatiser le recrutement et la sélection",
      "Piloter la GEPP et anticiper les compétences",
      "Créer des tableaux de bord RH opérationnels",
      "Construire un assistant IA RH sur-mesure",
    ],
  },
  {
    ref: 'BTP-04',
    level: 'DÉBUTANT' as const,
    title: "L'IA au service des Travaux Publics",
    href: '/formations/ia-travaux-publics',
    visuel: PHOTOS.btpFormationChantierEquipe2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      "Réponse aux consultations : DCE, trames, synthèses et check-lists",
      "Documents de chantier et reporting avec protocole de validation",
      "Templates TP, assistants par rôle et charte d'usage IA en entreprise",
    ],
  },
  {
    ref: 'BTP-05',
    level: 'DÉBUTANT' as const,
    title: "Sensibilisation à l'IA & Assistants IA personnalisés",
    href: '/formations/sensibilisation-ia-assistants-personnalises',
    visuel: PHOTOS.formationSensibilisationAssistantsIaBtp2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      "Sensibilisation à l'IA et usages terrain (supports PDF)",
      "Banque de prompts par métier (Excel)",
      "Concevoir des assistants IA personnalisés",
      "Ressources plateforme en prolongement — Qualiopi, OPCO Constructys",
    ],
  },
  {
    ref: 'BTP-06',
    level: 'AVANCÉ' as const,
    title: 'Architecte augmenté : Claude AI, DPGF, chantier et documents',
    href: '/formations/ia-architecture-claude-dpgf',
    visuel: PHOTOS.formationIABtpArchiClaudePresentielGroupe2026,
    duree: SESSION_DUREE_LIBELLE,
    effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
    objectifs: [
      'DPGF, métrés et planning GANTT avec Claude AI et Google Sheets',
      'CR de chantier, situations de travaux, PV de réception (Google Docs)',
      'Courriers et actes de marché via connecteur Google Drive',
      'Bibliothèque de prompts et flux opérationnels pour le cabinet',
    ],
  },
];

function refNum(ref: string) {
  return parseInt(ref.replace(/\D/g, ''), 10);
}

const FORMATIONS = [...FORMATIONS_UNSORTED].sort((a, b) => {
  const lr = LEVEL_RANK[a.level] - LEVEL_RANK[b.level];
  if (lr !== 0) return lr;
  return refNum(a.ref) - refNum(b.ref);
});

export default function FormationsPage() {
  return (
    <>
      <JsonLd id="schema-formations-page-graph" schema={buildFormationsPageUnifiedGraphJsonLd()} />
      <div className="mx-auto max-w-6xl px-4 py-16">
        <Breadcrumbs items={[{ label: 'Formations', href: '/formations' }]} />
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Catalogue formation IA BTP : 6 formations Qualiopi de 4 h, bâtiment et travaux publics
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Formations IA BTP finançables pour dirigeants,{' '}
            <strong className="font-semibold text-slate-800">professionnels du BTP</strong>, PME
            bâtiment et fonctions support : intelligence artificielle bâtiment, formation IA travaux
            publics et{' '}
            <Link
              href={LINKS.chatgptArtisans}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              ChatGPT pour entreprises BTP
            </Link>{' '}
            au service des devis, emails, comptes rendus de chantier et appels d&apos;offres.{' '}
            {ENCART_TARIFS_COMMERCIAUX} Méthode 100&nbsp;% terrain, orientée productivité — sessions en
            présentiel, inter en Île-de-France ou intra dans vos locaux.{' '}
            <RdvLink className="font-medium text-[var(--accent)] hover:underline">
              Prenez rendez-vous
            </RdvLink>{' '}
            pour un diagnostic personnalisé.
          </p>

          <div className="mt-8">
            <section
              className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-5 md:p-6"
              aria-label="Réponse synthétique"
              itemScope
              itemType="https://schema.org/Answer"
            >
              <p
                className="citation-sentence text-lg font-medium leading-relaxed text-slate-800 md:text-xl"
                data-citation="catalogue-formations-ia-btp-2026"
                itemProp="text"
              >
                Le catalogue OFC propose 6 formations IA BTP de 4 heures, certifiées Qualiopi et
                finançables par Constructys : L&apos;IA au service du bâtiment (BTP-01), des travaux
                publics (BTP-04), pour la fonction RH (BTP-03), pour l&apos;architecte (BTP-06), pour
                répondre aux appels d&apos;offre (BTP-02) et la sensibilisation aux assistants IA
                personnalisés (BTP-05). Tarifs : 100 € HT par participant en niveau débutant, 175 € HT
                en niveau avancé. Sessions en inter en Île-de-France ou en intra dans vos locaux, 12
                participants maximum.
              </p>
            </section>
          </div>

          <p className="mt-6 max-w-3xl text-sm text-slate-600">
            Pilier complémentaire (analyse CCTP / DCE, marchés publics) :{' '}
            <Link
              href={LINKS.formationIaCctpAnalyseDceBtp}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              formation IA analyse CCTP avec ChatGPT
            </Link>
            .
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FORMATIONS.map((cours) => {
            const visuel = cours.visuel;
            return (
              <Link
                key={cours.ref}
                href={cours.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-[var(--accent)] hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full shrink-0 bg-slate-100">
                  <Image
                    src={visuel.src}
                    alt={visuel.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-slate-500">RÉF: {cours.ref}</span>
                    <span className="rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                      {cours.level}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-semibold text-slate-900 group-hover:text-[var(--accent)]">
                    {cours.title}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-3 rounded-lg bg-slate-50 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock size={16} strokeWidth={1.5} />
                      {cours.duree}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} strokeWidth={1.5} />
                      {cours.effectif}
                    </span>
                    <span className="flex w-full items-center gap-2 text-sm font-semibold text-slate-800 sm:w-auto">
                      <Euro size={16} strokeWidth={1.75} className="text-[var(--accent)]" aria-hidden />
                      {libelleTarifParticipant(cours.level)}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">Objectifs pédagogiques</h3>
                  <ul className="mt-2 flex-1 space-y-2">
                    {cours.objectifs.map((obj) => (
                      <li key={obj} className="flex gap-2 text-sm text-slate-600">
                        <Check size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 block w-full rounded-xl bg-[var(--accent)] py-3 text-center font-semibold text-white transition-colors group-hover:bg-blue-700">
                    Voir le programme
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Pourquoi un catalogue de 6 formations spécialisées ?
          </h2>
          <p className="mt-3 text-slate-700">
            L&apos;IA générative ne se travaille pas de la même manière selon que vous chiffrez un
            appel d&apos;offre, animez un chantier, recrutez un compagnon ou produisez une DPGF. Plutôt
            qu&apos;une formation généraliste, OFC propose{' '}
            <strong>6 programmes ciblés métier</strong> — chacun avec ses prompts, ses cas
            d&apos;usage et ses livrables types issus de 10 ans de terrain BTP de la formatrice.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="font-semibold text-slate-900">3 formations débutant</p>
              <p className="mt-1 text-sm text-slate-600">
                BTP-01 (bâtiment), BTP-04 (TP), BTP-05 (sensibilisation) — 100 € HT/pers, pour
                démarrer en 4 h.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">3 formations avancées</p>
              <p className="mt-1 text-sm text-slate-600">
                BTP-02 (appels d&apos;offre), BTP-03 (RH), BTP-06 (architecte) — 175 € HT/pers, pour
                passer à la production.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">100 % finançable Constructys</p>
              <p className="mt-1 text-sm text-slate-600">
                Plafond pédagogique 24 € HT/h/stagiaire, demande à déposer 15 jours avant la
                session.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Une formation IA BTP pour gagner du temps sur devis, chantier et administratif ?
          </h2>
          <p className="mt-3 text-slate-700">
            Prenez rendez-vous pour échanger sur votre projet et recevoir un devis personnalisé.
          </p>
          <RdvLink className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700">
            Prendre rendez-vous pour un diagnostic
          </RdvLink>
        </section>

        <FAQSection
          items={FAQ_FORMATIONS}
          title="Questions fréquentes sur les formations IA BTP"
          subtitle="Vous avez des questions ? Voici les réponses aux interrogations les plus fréquentes."
        />

        <section className="mt-12 border-t border-slate-200 pt-12">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Formations IA BTP par métier, sujet et géographie
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Vous cherchez une formation IA BTP ciblée sur un métier précis, un département
            francilien ou un cas d&apos;usage opérationnel ? Voici les pages dédiées.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link href={LINKS.formationParis} className="text-[var(--accent)] hover:underline">
                Formation IA BTP Paris (75)
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationYvelines} className="text-[var(--accent)] hover:underline">
                Formation IA BTP Yvelines (78)
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.formationSaintQuentinYvelines}
                className="text-[var(--accent)] hover:underline"
              >
                Formation IA BTP Saint-Quentin-en-Yvelines
              </Link>
            </li>
            <li>
              <Link href={LINKS.chatgptArtisans} className="text-[var(--accent)] hover:underline">
                ChatGPT pour entreprises BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.iaDevis} className="text-[var(--accent)] hover:underline">
                IA pour les devis bâtiment
              </Link>
            </li>
            <li>
              <Link href={LINKS.iaCDT} className="text-[var(--accent)] hover:underline">
                IA pour conducteur de travaux
              </Link>
            </li>
            <li>
              <Link href={LINKS.claudeAiBtp} className="text-[var(--accent)] hover:underline">
                Claude AI pour le BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.financement} className="text-[var(--accent)] hover:underline">
                Financement Constructys 100 %
              </Link>
            </li>
            <li>
              <Link href={LINKS.etudesCas} className="text-[var(--accent)] hover:underline">
                Étude de cas FFB &amp; CSFE
              </Link>
            </li>
            <li>
              <Link href={LINKS.casUsage} className="text-[var(--accent)] hover:underline">
                10 cas d&apos;usage concrets IA BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.blog} className="text-[var(--accent)] hover:underline">
                Articles et guides
              </Link>
            </li>
            <li>
              <Link href={LINKS.aPropos} className="text-[var(--accent)] hover:underline">
                À propos de Laure Olivié
              </Link>
            </li>
          </ul>
        </section>

        <AllerPlusLoin
          links={[
            { href: LINKS.formationIaBtp, label: 'Formation IA BTP — page pilier' },
            { href: LINKS.diagnostic, label: 'Diagnostic IA BTP' },
            { href: LINKS.checklist, label: 'Checklist prompts ChatGPT BTP' },
            { href: LINKS.formationIleDeFrance, label: 'Formation IA BTP en Île-de-France' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </div>
    </>
  );
}
