import Link from 'next/link';
import Image from 'next/image';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle,
  Download,
  ExternalLink,
  ListOrdered,
} from 'lucide-react';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { PHOTOS } from '@/lib/photos';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata } from '@/lib/seo';
import { FAQ_FINANCEMENT_IA_BTP } from '@/lib/faq';
import { EXTERNAL_AUTHORITY_LINKS } from '@/lib/seo-links';
import { LINKS } from '@/lib/internal-links';
import { getFinancementConstructysUnifiedJsonLd } from '@/lib/schema-financement-constructys-page';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_DEBUTANT_HT,
  TARIF_FORFAIT_AVANCE_HT,
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
  MODALITE_FORMATIONS_PRESENTIEL,

  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { FinancementConstructysHero } from '@/components/financement/FinancementConstructysHero';
import { SommaireAncre } from '@/components/readability/SommaireAncre';
import { PillarFaqAccordion } from '@/components/pillar/PillarFaqAccordion';
import { PillarConversionCta } from '@/components/pillar/PillarConversionCta';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';

const CONSTRUCTYS_SITE = EXTERNAL_AUTHORITY_LINKS.constructys;

const FINANCEMENT_HERO = PHOTOS.financementConstructysHero2026;

const FINANCEMENT_TOC = [
  { label: 'En résumé (TL;DR)', anchor: 'tldr' },
  { label: 'À retenir pour 2026', anchor: 'retenir-2026' },
  { label: 'Qu’est-ce que Constructys ?', anchor: 'quest-ce-que-constructys' },
  { label: 'Grille commerciale OFC', anchor: 'grille-ofc' },
  { label: 'Combien Constructys rembourse ?', anchor: 'combien-rembourse' },
  { label: 'Plafonds au 1ᵉʳ juin 2026', anchor: 'plafonds-juin-2026' },
  { label: 'Étapes du financement', anchor: 'etapes' },
  { label: 'Trouver son OPCO', anchor: 'trouver-opco' },
  { label: 'Mon cas : prise en charge', anchor: 'mon-cas' },
  { label: 'OFC vous accompagne', anchor: 'ofc-accompagne' },
  { label: 'Définitions clés', anchor: 'definitions' },
  { label: 'FAQ', anchor: 'faq' },
  { label: 'Sources officielles', anchor: 'sources' },
] as const;

const STEPS = [
  {
    title: 'Confirmer que vous êtes bien dans le périmètre BTP',
    text: "Construire, travaux publics, négoce de matériaux : si c'est votre cas, Constructys est votre OPCO.",
  },
  {
    title: 'Choisir une formation certifiée Qualiopi et demander un devis',
    text: "OFC délivre des programmes avec programme détaillé et devis — deux pièces que Constructys attend.",
  },
  {
    title: 'Réunir les pièces du dossier',
    text: "Convention de formation, liste des participants, justificatifs d'effectif. Si vous êtes adhérent FFB, prévoyez l'attestation demandée.",
  },
  {
    title: 'Déposer sur eGestion au moins 15 jours avant le premier jour',
    text: "Depuis le 1er janvier 2026, un dossier incomplet ou tardif n'est plus financé.",
  },
  {
    title: 'Attendre la validation avant de lancer la formation',
    text: "La formation ne doit pas avoir démarré avant la réception de votre demande par Constructys.",
  },
] as const;

const FINANCEMENT_META_TITLE = 'Financement Constructys — formation IA pour les pro du BTP 2026';
const FINANCEMENT_META_DESCRIPTION =
  'Financement formation IA appliquée au bâtiment Constructys 2026 : plafonds, délais eGestion, OFC Qualiopi. 1 592 pros formés. Visio gratuite.';

export const metadata = createPageMetadata({
  title: FINANCEMENT_META_TITLE,
  titleAbsolute: FINANCEMENT_META_TITLE,
  description: FINANCEMENT_META_DESCRIPTION,
  path: '/financement-constructys-formation-ia-btp',
  keywords: null,
  appendAuthorSuffix: false,
  openGraphTitle: FINANCEMENT_META_TITLE,
  openGraphDescription: FINANCEMENT_META_DESCRIPTION,
  openGraphType: 'article',
  article: {
    publishedTime: '2026-01-15',
    modifiedTime: '2026-06-01',
  },
  image: {
    url: FINANCEMENT_HERO.src,
    width: FINANCEMENT_HERO.width,
    height: FINANCEMENT_HERO.height,
    alt: 'Financement Constructys 2026 — formation IA pour le BTP, plafonds et OFC Qualiopi',
  },
});

const tableWrap =
  'overflow-x-auto rounded-xl border border-slate-200/90 bg-white shadow-sm';

export default function FinancementConstructysFormationIABTPPage() {
  const unifiedSchema = getFinancementConstructysUnifiedJsonLd();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JsonLd id="schema-financement-constructys-graph" schema={unifiedSchema} />

      <FinancementConstructysHero />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:pb-24 md:pt-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-8 xl:gap-10">
          <div className="mb-8 lg:mb-0">
            <SommaireAncre items={FINANCEMENT_TOC} instanceId="financement-constructys" />
          </div>

          <article className="min-w-0 space-y-12 md:space-y-14">
            <aside
              id="tldr"
              aria-labelledby="tldr-title"
              className="scroll-mt-24 rounded-xl border border-[#377CF3]/35 bg-[#EFF6FF]/80 p-4 shadow-sm md:p-5"
            >
              <h2 id="tldr-title" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#377CF3]">
                En résumé (TL;DR)
              </h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-snug text-slate-700">
                <li>
                  <strong>Qui peut financer ?</strong> Toute entreprise BTP adhérente Constructys
                </li>
                <li>
                  <strong>Combien ?</strong> 24 € HT/h (TPE &lt; 11 salariés) ou 19 € HT/h (11 à &lt; 50 salariés, depuis le 1<sup>er</sup> juin 2026) ; plafond jour/groupe intra 840 € / 665 € HT
                </li>
                <li>
                  <strong>Quand déposer ?</strong> 15 jours calendaires avant la formation via eGestion
                </li>
                <li>
                  <strong>Conditions ?</strong> Organisme certifié Qualiopi + programme détaillé + devis
                </li>
                <li>
                  <strong>Dossier rejeté si :</strong> retard, pièces manquantes, ou formation démarrée avant validation
                </li>
              </ul>
            </aside>

            <p className="text-sm text-[#64748B]">
              <ExternalLinkAnchor
                href={CONSTRUCTYS_SITE.href}
                title={CONSTRUCTYS_SITE.title}
                className="inline-flex items-center gap-2 font-semibold text-[#377CF3] underline-offset-2 hover:underline"
              >
                Site officiel Constructys (OPCO BTP)
                <ExternalLink size={16} strokeWidth={1.5} aria-hidden />
              </ExternalLinkAnchor>
            </p>

            <section id="retenir-2026" className="scroll-mt-24 rounded-xl border border-amber-200/70 bg-amber-50/80 px-4 py-5 md:px-5 md:py-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-slate-900 md:text-xl">
                <AlertTriangle size={20} strokeWidth={1.75} className="shrink-0 text-amber-600" aria-hidden />
                À retenir pour 2026 (demandes Constructys)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-[15px]">
                Depuis le 1er janvier 2026, les règles sont claires : votre dossier doit être{' '}
                <strong className="text-[#0F172A]">complet</strong>, déposé sur <strong className="text-[#0F172A]">eGestion</strong>, et parvenu à Constructys au moins{' '}
                <strong className="text-[#0F172A]">15 jours calendaires avant le premier jour de formation</strong>. Une demande incomplète, une pièce manquante ou un envoi après la date limite : la formation ne sera pas financée. Vérifiez aussi que vous avez bien saisi coûts pédagogiques et autres dépenses attendues. La formation ne doit pas avoir commencé avant la réception de la demande. Ce cadre strict, c&apos;est pour vous aussi une garantie : vous savez à quoi vous tenir dès que vous planifiez une session{' '}
                <strong className="text-[#0F172A]">financer formation IA pour les pro du BTP</strong> avec votre équipe — y compris pour une approche{' '}
                <Link href="/formation-ia-travaux-publics" className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
                  IA pour travaux publics
                </Link>
                .
              </p>
            </section>

            <section id="quest-ce-que-constructys" className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                Qu&apos;est-ce que Constructys ?
              </h2>
              <div className="prose-custom mt-5 max-w-3xl space-y-4 text-[15px] leading-relaxed text-slate-700 md:text-base">
                <p>
                  <strong>Constructys</strong> est l&apos;OPCO — l&apos;opérateur de compétences — du secteur BTP. Concrètement : si vous travaillez dans le bâtiment, les travaux publics ou une activité proche (par exemple le négoce de matériaux), c&apos;est cet organisme qui collecte les contributions et qui peut <strong>participer au financement</strong> de vos formations dans le cadre du plan de développement des compétences. Vous n&apos;avez pas à &quot;négocier&quot; avec Constructys comme avec un client : vous montez un dossier conforme, avec un organisme certifié Qualiopi, et vous suivez les plafonds et les délais. Pour une <strong>Constructys formation IA</strong> ciblant ChatGPT et le gain de temps sur devis, emails ou suivi de chantier, la logique est la même que pour toute action éligible au plan de développement des compétences, avec une exigence renforcée depuis 2026 sur les <strong>dépôts dans les temps</strong>.
                </p>
                <p>
                  Côté dirigeant BTP ou chef d&apos;entreprise, retenez surtout ceci : Constructys ne remplace pas votre décision de former quelqu&apos;un — il encadre un <strong>enveloppe</strong> de prise en charge dans le respect des barèmes. Une formation IA appliquée au bâtiment (prompts, rédaction de mails, structuration de comptes rendus) est traitée comme une autre action de professionnalisation, à condition que le programme soit explicite et que le prestataire soit reconnu. Pour aller plus loin sur la mise en pratique, voir aussi le guide{' '}
                  <Link href={LINKS.skillIaConducteurTravaux} className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
                    créer son 1<sup>er</sup> skill IA
                  </Link>
                  . C&apos;est pourquoi le couple <strong>Qualiopi + devis détaillé</strong> compte autant que le sujet &quot;IA&quot; lui-même.
                </p>
              </div>
            </section>

            <section id="grille-ofc" className="scroll-mt-24 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-5 md:px-5 md:py-6">
              <Reveal>
              <h2 className="font-display text-lg font-bold text-slate-900 md:text-xl">Grille commerciale OFC — sessions de formation</h2>
              <p className="mt-2 text-sm text-slate-700">
                L&apos;organisme propose un format unique : <strong>session de {SESSION_DUREE_LIBELLE}</strong>, avec un{' '}
                <strong>forfait par session</strong> (jusqu&apos;à 12 participants) selon le niveau pédagogique :
              </p>
              </Reveal>
              <RevealGroup className="mt-5 grid gap-3 sm:grid-cols-2" staggerMs={50}>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <span className="inline-flex rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#377CF3]">
                    4 h
                  </span>
                  <p className="mt-3 font-display text-2xl font-bold text-[#1E40AF] md:text-[1.75rem]">{formatTarifHt(TARIF_FORFAIT_DEBUTANT_HT)} € HT</p>
                  <p className="mt-1 text-sm font-semibold text-[#0F172A]">Niveau débutant (NIV-01)</p>
                  <p className="mt-3 text-sm text-[#64748B]">{COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <span className="inline-flex rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#377CF3]">
                    4 h
                  </span>
                  <p className="mt-3 font-display text-2xl font-bold text-[#1E40AF] md:text-[1.75rem]">{formatTarifHt(TARIF_FORFAIT_AVANCE_HT)} € HT</p>
                  <p className="mt-1 text-sm font-semibold text-[#0F172A]">Niveau avancé (NIV-02)</p>
                  <p className="mt-3 text-sm text-[#64748B]">{EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE}</p>
                </div>
              </RevealGroup>
              <Reveal>
              <p className="mt-4 text-xs text-slate-600">
                {MODALITE_FORMATIONS_PRESENTIEL}                 Le montant facturé par OFC peut ensuite être couvert en tout ou partie par votre OPCO (Constructys pour le BTP) dans la limite des plafonds et de votre éligibilité — voir le tableau ci-dessous.
              </p>
              </Reveal>
            </section>

            <section id="combien-rembourse" className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                Combien Constructys rembourse pour une formation IA ?
              </h2>
              <p className="mt-2 text-xs text-slate-600 md:text-sm">
                Les montants ci-dessous reprennent les repères usuels pour les entreprises du BTP ; le détail varie selon votre <strong>effectif</strong> et le type d&apos;action. Depuis le <strong>1<sup>er</sup> juin 2026</strong>, le plafond pédagogique horaire dépend de la taille de l&apos;entreprise (voir la section suivante). Pour <strong>financer formation IA pour le BTP</strong> ou une <strong>OPCO BTP formation ChatGPT</strong>, retenez surtout le plafond pédagogique et le plafond jour en intra.
              </p>
              <div className={`mt-5 ${tableWrap}`}>
                <table className="w-full min-w-[300px] border-collapse text-left text-sm">
                  <caption className="sr-only">Plafonds Constructys 2026 pour formation IA pour les pro du BTP, selon l’effectif de l’entreprise</caption>
                  <thead>
                    <tr className="bg-[#377CF3] text-white">
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider md:px-4 md:text-xs">Poste</th>
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider md:px-4 md:text-xs">Repère 2026</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="bg-white">
                      <th scope="row" className="px-3 py-2.5 text-left text-xs font-semibold text-slate-900 md:px-4 md:text-sm">
                        Coût pédagogique — entreprise &lt; 11 salariés
                      </th>
                      <td className="px-3 py-2.5 text-xs font-medium md:px-4 md:text-sm">24 € HT / h / stagiaire</td>
                    </tr>
                    <tr className="bg-slate-50/90">
                      <th scope="row" className="px-3 py-2.5 text-left text-xs font-semibold text-slate-900 md:px-4 md:text-sm">
                        Coût pédagogique — entreprise 11 à &lt; 50 salariés
                      </th>
                      <td className="px-3 py-2.5 text-xs font-medium md:px-4 md:text-sm">19 € HT / h / stagiaire <span className="text-[#377CF3]">(depuis le 1<sup>er</sup> juin 2026)</span></td>
                    </tr>
                    <tr className="bg-white">
                      <th scope="row" className="px-3 py-2.5 text-left text-xs font-semibold text-slate-900 md:px-4 md:text-sm">
                        Session intra — plafond jour / groupe (&lt; 11 salariés)
                      </th>
                      <td className="px-3 py-2.5 text-xs font-medium md:px-4 md:text-sm">840 € HT / jour / groupe</td>
                    </tr>
                    <tr className="bg-slate-50/90">
                      <th scope="row" className="px-3 py-2.5 text-left text-xs font-semibold text-slate-900 md:px-4 md:text-sm">
                        Session intra — plafond jour / groupe (11 à &lt; 50 salariés)
                      </th>
                      <td className="px-3 py-2.5 text-xs font-medium md:px-4 md:text-sm">665 € HT / jour / groupe</td>
                    </tr>
                    <tr className="bg-white">
                      <th scope="row" className="px-3 py-2.5 text-left text-xs font-semibold text-slate-900 md:px-4 md:text-sm">
                        Frais de salaires — TPE &lt; 11 salariés
                      </th>
                      <td className="px-3 py-2.5 text-xs font-medium md:px-4 md:text-sm">15 € HT / h / stagiaire (sauf cas FEEBAT)</td>
                    </tr>
                    <tr className="bg-slate-50/90">
                      <th scope="row" className="px-3 py-2.5 text-left text-xs font-semibold text-slate-900 md:px-4 md:text-sm">
                        Dépôt du dossier
                      </th>
                      <td className="px-3 py-2.5 text-xs font-medium md:px-4 md:text-sm">Plateforme eGestion, au moins 15 jours avant le début</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                <strong>Reste à charge et coût réel</strong> : les plafonds ci-dessus indiquent ce que Constructys peut prendre en charge dans la limite des règles. Selon votre taille d&apos;entreprise, une participation peut aussi couvrir une partie des frais de salaires du temps passé en formation et, dans certains cas, des frais annexes. Le tableau généraliste ne remplace pas votre interlocuteur régional : il vous donne un ordre de grandeur pour budgétiser une <strong>OPCO BTP formation ChatGPT</strong> ou un atelier sur l&apos;IA appliquée à vos chantiers. Pour une session intra avec plusieurs personnes, le plafond journalier groupe (<strong>840 € HT</strong> pour les TPE de moins de 11 salariés, <strong>665 € HT</strong> de 11 à moins de 50 salariés) peut structurer votre choix de durée et de nombre de participants.
              </p>
              <p className="mt-4 text-sm text-[#64748B]">
                <a
                  href="/documents/conditions-constructys-2026.pdf"
                  download
                  className="inline-flex items-center gap-2 font-medium text-[#377CF3] hover:underline"
                >
                  <Download size={16} strokeWidth={1.5} aria-hidden />
                  Télécharger les conditions de prise en charge Constructys 2026 (PDF)
                </a>
              </p>
            </section>

            <section id="plafonds-juin-2026" className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                Ce qui change au 1<sup>er</sup> juin 2026 : nouveaux plafonds Constructys (PDC Bâtiment)
              </h2>

              <div className="mt-4 rounded-xl border border-amber-200/70 bg-amber-50/80 px-4 py-5 md:px-5 md:py-6">
                <p className="flex items-start gap-2 text-sm leading-relaxed text-slate-800 md:text-[15px]">
                  <AlertTriangle size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-amber-600" aria-hidden />
                  <span>
                    En raison du nombre d&apos;engagements pris depuis le début 2026, Constructys <strong className="text-[#0F172A]">abaisse le plafond pédagogique horaire de 24 € à 19 € HT/heure/stagiaire</strong> pour <strong className="text-[#0F172A]">toutes les demandes de financement reçues à partir du 1<sup>er</sup> juin 2026</strong>. Cette baisse vise les <strong className="text-[#0F172A]">entreprises du Bâtiment de 11 à moins de 300 salariés</strong>. Les <strong className="text-[#0F172A]">TPE de moins de 11 salariés conservent le plafond de 24 € HT/heure</strong>.
                  </span>
                </p>
              </div>

              <div className="prose-custom mt-5 max-w-3xl space-y-4 text-[15px] leading-relaxed text-slate-700 md:text-base">
                <p>
                  Concrètement, la prise en charge du coût pédagogique se lit désormais selon votre effectif : <strong>24 € HT/h/stagiaire</strong> en dessous de 11 salariés (dans la limite de <strong>840 € HT/jour/groupe</strong> en intra), et <strong>19 € HT/h/stagiaire</strong> de 11 à moins de 50 salariés (dans la limite de <strong>665 € HT/jour/groupe</strong> en intra). Ce qui ne change pas : le dépôt sur eGestion <strong>au moins 15 jours avant</strong> le premier jour, la nécessité d&apos;un organisme certifié Qualiopi, et l&apos;interdiction de démarrer la formation avant la réception du dossier.
                </p>
                <p>
                  <strong>Exemple chiffré sur une session IA de 4 h.</strong> Une PME de 20 salariés qui forme 6 personnes en intra (niveau NIV-01) : coût pédagogique pris en charge jusqu&apos;à 19 € × 4 h × 6 = <strong>456 € HT</strong>, dans la limite de 665 € HT/jour/groupe. Une TPE de moins de 11 salariés sur la même session : jusqu&apos;à 24 € × 4 h × 6 = <strong>576 € HT</strong>, dans la limite de 840 € HT/jour/groupe. Au-delà de ces plafonds, la différence avec le forfait OFC (1 000 € HT en NIV-01, 1 200 € HT en NIV-02) reste à la charge de l&apos;entreprise — d&apos;où l&apos;intérêt d&apos;arbitrer le nombre de participants par session.
                </p>
              </div>

              <figure className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <Image
                  src="/images/constructys-plafonds-financement-pdc-batiment-juin-2026.png"
                  alt="Plafonds Constructys au 1er juin 2026 : coût pédagogique 24 € HT/h (moins de 11 salariés) ou 19 € HT/h (11 à moins de 50 salariés), session BTP"
                  width={1024}
                  height={768}
                  className="h-auto w-full"
                  sizes="(min-width: 768px) 720px, 100vw"
                />
                <figcaption className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500">
                  Source : Constructys — Plan de développement des compétences (PDC) du Bâtiment, modalités de participation financière applicables au 1<sup>er</sup> juin 2026.
                </figcaption>
              </figure>

              <h3 className="mt-8 font-display text-base font-bold text-slate-900 md:text-lg">
                Autres modalités du PDC Bâtiment 2026
              </h3>
              <ul className="mt-3 grid gap-2.5 text-sm leading-snug text-slate-700 sm:grid-cols-2">
                <li className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <strong className="text-slate-900">Durée maximum.</strong> 300 h/stagiaire pour une action non qualifiante ; jusqu&apos;à 1 200 h/stagiaire pour une action qualifiante (CCN Bâtiment, RNCP, blocs, CQP), dans la limite de 3 stagiaires/an/entreprise.
                </li>
                <li className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <strong className="text-slate-900">Frais de salaires.</strong> Moins de 11 salariés : 15 € HT/h/stagiaire (100 € HT/jour pour FEEBAT). De 11 à moins de 50 salariés : 10 € HT/h pour les actions qualifiantes, 15 € HT/h pour la pérennisation des emplois ou l&apos;AFEST.
                </li>
                <li className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <strong className="text-slate-900">Frais annexes.</strong> Uniquement pour les actions qualifiantes : 8 % des coûts pédagogiques financés, dans la limite de 1 500 € HT/stagiaire.
                </li>
                <li className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <strong className="text-slate-900">Financements spécifiques.</strong> VAE 2 000 € HT, bilan de compétences 2 000 € HT, CléA (évaluation préalable 500 € HT, fin de formation 250 € HT), ingénierie AFEST 900 € HT/jour (max 4 jours).
                </li>
              </ul>

              <p className="mt-4 rounded-lg bg-[#EFF6FF]/80 px-4 py-3 text-sm leading-relaxed text-slate-700">
                <strong>À noter pour nos formations IA.</strong> Nos sessions ChatGPT/Claude pour le BTP sont des <strong>actions non qualifiantes</strong> : c&apos;est le plafond pédagogique horaire (24 € ou 19 € HT/h selon l&apos;effectif) et le plafond jour/groupe en intra qui s&apos;appliquent — les frais annexes (8 %) réservés aux actions qualifiantes ne sont pas mobilisables. Ces modalités concernent les <strong>demandes reçues à partir du 1<sup>er</sup> juin 2026</strong>, pour une formation démarrant en 2026.
              </p>
            </section>

            <section id="etapes" className="scroll-mt-24">
              <h2 className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                <ListOrdered className="h-6 w-6 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                Les étapes pour obtenir le financement
              </h2>
              <ol className="mt-5 space-y-3">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#377CF3] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                      <p className="mt-0.5 text-sm leading-snug text-slate-600">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="trouver-opco" className="scroll-mt-24 rounded-xl border border-slate-200 bg-white px-4 py-5 md:px-5 md:py-6">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                Trouver son OPCO de rattachement (avant de déposer)
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
                Vous ne savez pas encore si votre entreprise dépend de Constructys ou d&apos;un autre OPCO ? Faites ce
                check rapide en 2 étapes : d&apos;abord récupérer vos données d&apos;entreprise officielles (SIRET complet,
                code APE, convention collective), puis comparer avec la liste officielle des OPCO.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <article className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#377CF3]">Étape 1</p>
                  <h3 className="mt-1.5 text-sm font-semibold text-slate-900">
                    Récupérer le SIRET complet (14 chiffres) et le code APE
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 md:text-sm">
                    Utilisez l&apos;annuaire officiel des entreprises. Ex. avec un SIREN comme{' '}
                    <strong>838 267 359</strong>, vous retrouvez le SIRET complet, le code APE officiel et la convention
                    collective applicable.
                  </p>
                  <a
                    href="https://annuaire-entreprises.data.gouv.fr/"
                    target="_blank"
                    rel="noopener nofollow"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#377CF3] hover:underline md:text-sm"
                  >
                    Annuaire des entreprises (data.gouv.fr)
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </article>
                <article className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#377CF3]">Étape 2</p>
                  <h3 className="mt-1.5 text-sm font-semibold text-slate-900">
                    Vérifier votre OPCO dans la liste officielle des 11 OPCO
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 md:text-sm">
                    Le Ministère du Travail publie la liste complète des OPCO. Comparez votre activité (code APE +
                    convention collective) pour confirmer votre organisme de rattachement.
                  </p>
                  <a
                    href="https://travail-emploi.gouv.fr/formation-professionnelle/acteurs-cadre-et-qualite-de-la-formation-professionnelle/liste-des-opco"
                    target="_blank"
                    rel="noopener nofollow"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#377CF3] hover:underline md:text-sm"
                  >
                    Liste officielle des OPCO (Ministère du Travail)
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </article>
              </div>
              <p className="mt-4 text-xs text-slate-600">
                Si vous êtes BTP, votre OPCO est généralement Constructys. En cas de doute, validez d&apos;abord ce point
                avant le dépôt eGestion pour éviter les erreurs de circuit.
              </p>
            </section>

            <section id="mon-cas" className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                Mon cas : quelle prise en charge Constructys espérer ?
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#377CF3]">TPE</p>
                  <p className="mt-2 text-xs leading-snug text-slate-700 md:text-sm">
                    <strong>Si vous êtes un professionnel du BTP seul (TPE &lt; 11 salariés) :</strong> Constructys couvre jusqu&apos;à 24 € HT/h pédagogique + 15 € HT/h pour les frais de salaires (sauf FEEBAT).
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#377CF3]">PME 11–50</p>
                  <p className="mt-2 text-xs leading-snug text-slate-700 md:text-sm">
                    <strong>Si vous êtes PME BTP 11–50 salariés :</strong> coût pédagogique pris en charge jusqu&apos;à 19 € HT/h/stagiaire (depuis le 1<sup>er</sup> juin 2026), plafond 665 € HT/jour/groupe en intra ; frais de salaires selon barèmes.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#377CF3]">Intra</p>
                  <p className="mt-2 text-xs leading-snug text-slate-700 md:text-sm">
                    <strong>Si vous formez toute l&apos;équipe en intra :</strong> plafond 840 € HT/jour/groupe (TPE &lt; 11 sal.) ou 665 € HT/jour/groupe (11–50 sal.) — à arbitrer selon le nombre de participants pour optimiser le coût par personne.
                  </p>
                </div>
                <div className="rounded-xl border border-red-200/90 bg-red-50/80 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-red-700">Retard dossier</p>
                  <p className="mt-2 text-xs leading-snug text-red-950/90 md:text-sm">
                    <strong>Si votre dossier arrive après J-15 :</strong> refus automatique depuis 2026. Aucune exception.
                  </p>
                </div>
              </div>
            </section>

            <section id="ofc-accompagne" className="scroll-mt-24">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                OFC vous accompagne dans le montage du dossier
              </h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:items-start">
                <div className="space-y-3 text-sm leading-relaxed text-slate-700">
                  <p>
                    <strong>OFC Création d&apos;Entreprise</strong> est certifié Qualiopi : c&apos;est une condition sérieuse pour rassurer les financeurs OPCO. Au-delà du certificat, nous vous aidons à aligner les intitulés, le programme et les heures avec les attentes de la <strong>prise en charge Constructys</strong>, pour éviter les allers-retours inutiles. Que vous visiez une formation courte sur ChatGPT ou un parcours plus large sur l&apos;IA au service du chantier, l&apos;objectif est le même : un dossier lisible, déposé dans les délais, pour que votre équipe se concentre sur le terrain.
                  </p>
                  <p>
                    En pratique, vous n&apos;avez pas à deviner les intitulés : nous vous expliquons quoi envoyer, dans quel ordre, et comment éviter les oublis qui bloquent un dossier en ligne. L&apos;objectif est que la <strong>prise en charge Constructys</strong> soit une étape simple, pas un second métier. Si vous hésitez entre inter-entreprise et intra-entreprise, ou entre une demi-journée et une journée, nous pouvons vous aider à arbitrer en fonction des plafonds et de votre agenda chantier.
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    'Programme et devis cohérents avec votre besoin',
                    'Rappels sur les délais eGestion et les pièces courantes',
                    "Point d'étape avec votre référent formation si besoin",
                  ].map((line) => (
                    <li key={line} className="flex gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={1.5} aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="definitions" className="scroll-mt-24" aria-labelledby="definitions-title">
              <h2 id="definitions-title" className="font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                Définitions clés
              </h2>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <dt className="text-sm font-bold text-[#377CF3]">Constructys</dt>
                  <dd className="mt-1.5 text-xs leading-snug text-slate-700 md:text-sm">
                    OPCO (Opérateur de Compétences) du secteur BTP, bâtiment et travaux publics : il encadre les contributions et les demandes de financement des actions de formation éligibles au plan de développement des compétences.
                  </dd>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <dt className="text-sm font-bold text-[#377CF3]">eGestion</dt>
                  <dd className="mt-1.5 text-xs leading-snug text-slate-700 md:text-sm">
                    Plateforme numérique de dépôt des dossiers de financement Constructys : c&apos;est par ce canal que votre demande doit être complète et dans les délais.
                  </dd>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <dt className="text-sm font-bold text-[#377CF3]">Qualiopi</dt>
                  <dd className="mt-1.5 text-xs leading-snug text-slate-700 md:text-sm">
                    Certification qualité obligatoire pour les organismes de formation dont les actions peuvent être prises en charge par les OPCO dans le cadre légal — gage de transparence sur le programme et les résultats attendus.
                  </dd>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <dt className="text-sm font-bold text-[#377CF3]">Plan de développement des compétences</dt>
                  <dd className="mt-1.5 text-xs leading-snug text-slate-700 md:text-sm">
                    Dispositif employeur encadrant les formations prises en charge pour les salariés : budget, éligibilité, et règles de co-financement selon la taille d&apos;entreprise et l&apos;OPCO.
                  </dd>
                </div>
              </dl>
            </section>

            <PillarFaqAccordion
              id="faq"
              headingId="faq-financement-title"
              title="Questions fréquentes — Constructys formation IA"
              subtitle="Réponses courtes pour avancer : éligibilité, plafonds, CPF et retard de dossier."
              items={FAQ_FINANCEMENT_IA_BTP}
            />

            <section id="sources" className="scroll-mt-24" aria-labelledby="sources-title">
              <h2 id="sources-title" className="font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                Sources et références officielles
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>
                  <a
                    href="https://www.constructys.fr/entreprises/nos-conditions-generales-de-prise-en-charge/"
                    rel="noopener nofollow"
                    target="_blank"
                    className="inline-flex items-center gap-1 font-medium text-[#377CF3] hover:underline"
                  >
                    Constructys — Conditions générales de prise en charge 2026 (officiel)
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.francecompetences.fr/"
                    rel="noopener nofollow"
                    target="_blank"
                    className="inline-flex items-center gap-1 font-medium text-[#377CF3] hover:underline"
                  >
                    France compétences — Régulation formation professionnelle
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </li>
                <li>
                  <a
                    href="https://travail-emploi.gouv.fr/formation-professionnelle/certification-qualite-qualiopi"
                    rel="noopener nofollow"
                    target="_blank"
                    className="inline-flex items-center gap-1 font-medium text-[#377CF3] hover:underline"
                  >
                    Ministère du Travail — Certification Qualiopi
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-xs text-slate-600">
                <em>
                  Page mise à jour le 1<sup>er</sup> juin 2026. Dernière vérification des plafonds Constructys sur le site
                  officiel : juin 2026 (baisse du plafond pédagogique de 24 € à 19 € HT/h pour les entreprises de 11 à moins de 300 salariés).
                </em>
              </p>
            </section>

            <PillarConversionCta
              variant="compact"
              titleId="financement-cta-fin"
              title="Demandez votre devis + accompagnement dossier gratuit"
              description="Décrivez votre projet et recevez un devis adapté. Nous vous accompagnons pour le volet financement Constructys sans surcoût caché sur votre demande de prise en charge."
              primaryCta={{ href: '/contact', label: 'Demander un devis', external: false }}
              secondaryCta={{ href: buildSiteCalendlyCtaUrl('financement-constructys-bloc-secondary-rdv'), label: 'Réserver un rendez-vous', external: true }}
            />
          </article>
        </div>
      </div>

      <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="font-medium text-[#377CF3] hover:underline">
            ← Retour à l&apos;accueil
          </Link>
          <div className="mt-8">
            <AllerPlusLoin
              links={[
                { href: '/formations', label: 'Catalogue des formations IA pour les pro du BTP' },
                { href: '/formations/ia-btp-paris', label: 'Formation IA appliquée au bâtiment Paris' },
                { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
                { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
                { href: '/formations/ia-appels-offre-btp', label: 'Programme IA appels d’offres BTP' },
                { href: '/formation-ia-travaux-publics', label: 'IA travaux publics' },
                { href: LINKS.skillIaConducteurTravaux, label: 'Guide Conducteur de travaux (PDF)' },
                { href: '/blog', label: 'Tous les articles' },
                { href: buildSiteCalendlyCtaUrl('financement-constructys-formation-ia-btp-footer-rdv'), label: 'Prendre rendez-vous' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
