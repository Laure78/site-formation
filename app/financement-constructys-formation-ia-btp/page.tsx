import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  Download,
  CheckCircle,
  FileText,
  ExternalLink,
  ListOrdered,
  AlertTriangle,
} from 'lucide-react';
import { createPageMetadata, getFAQSchema, getBreadcrumbSchema } from '@/lib/seo';
import { FAQ_FINANCEMENT_IA_BTP } from '@/lib/faq';
import { EXTERNAL_AUTHORITY_LINKS } from '@/lib/seo-links';

const CONSTRUCTYS_SITE = EXTERNAL_AUTHORITY_LINKS.constructys;

export const metadata = createPageMetadata({
  title: 'Financement formation IA OPCO Constructys — plafonds 2026 | Laure Olivié',
  description:
    "Financement formation IA OPCO Constructys : plafonds 24 €/h, 840 €/jour intra, délai eGestion 15 jours. Financer formation IA BTP, prise en charge, dossier Qualiopi — OFC.",
  path: '/financement-constructys-formation-ia-btp',
  keywords: [
    'financement formation IA OPCO Constructys',
    'Constructys formation IA',
    'financer formation IA BTP',
    'OPCO BTP formation ChatGPT',
    'prise en charge Constructys',
    'OPCO BTP',
    'eGestion Constructys',
  ],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  {
    name: 'Financement Constructys formation IA BTP',
    path: '/financement-constructys-formation-ia-btp',
  },
]);

export default function FinancementConstructysFormationIABTPPage() {
  const faqSchema = getFAQSchema(FAQ_FINANCEMENT_IA_BTP);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
            Constructys formation IA · OPCO BTP
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
            Comment financer votre formation IA BTP avec Constructys ? — Guide complet
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            En pratique, environ <strong className="text-white">neuf stagiaires sur dix</strong>{' '}
            qui suivent nos formations avec leur entreprise obtiennent une prise en charge via
            l&apos;OPCO Constructys. Ce guide vous aide à comprendre les règles, sans
            vous noyer dans le jargon administratif.
          </p>
          <p className="mt-6">
            <ExternalLinkAnchor
              href={CONSTRUCTYS_SITE.href}
              title={CONSTRUCTYS_SITE.title}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Site officiel Constructys (OPCO BTP)
              <ExternalLink size={16} strokeWidth={1.5} aria-hidden />
            </ExternalLinkAnchor>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-amber-50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900">
            <AlertTriangle size={24} strokeWidth={1.5} className="shrink-0 text-amber-600" />
            À retenir pour 2026 (demandes Constructys)
          </h2>
          <p className="mt-4 text-slate-700">
            Depuis le 1er janvier 2026, les règles sont claires : votre dossier doit être{' '}
            <strong>complet</strong>, déposé sur{' '}
            <strong>eGestion</strong>, et parvenu à Constructys au moins{' '}
            <strong>15 jours calendaires avant le premier jour de formation</strong>. Une demande
            incomplète, une pièce manquante ou un envoi après la date limite : la formation ne sera
            pas financée. Vérifiez aussi que vous avez bien saisi coûts pédagogiques et autres
            dépenses attendues. La formation ne doit pas avoir commencé avant la réception de la
            demande. Ce cadre strict, c&apos;est pour vous aussi une garantie : vous savez à quoi
            vous tenir dès que vous planifiez une session{' '}
            <strong>financer formation IA BTP</strong> avec votre équipe.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl prose prose-slate max-w-none">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Qu&apos;est-ce que Constructys ?
          </h2>
          <p className="mt-4 text-slate-700">
            <strong>Constructys</strong> est l&apos;OPCO — l&apos;opérateur de compétences — du
            secteur BTP. Concrètement : si vous travaillez dans le bâtiment, les travaux publics ou
            une activité proche (par exemple le négoce de matériaux), c&apos;est cet organisme qui
            collecte les contributions et qui peut <strong>participer au financement</strong> de
            vos formations dans le cadre du plan de développement des compétences. Vous n&apos;avez
            pas à &quot;négocier&quot; avec Constructys comme avec un client : vous montez un
            dossier conforme, avec un organisme certifié Qualiopi, et vous suivez les plafonds et
            les délais. Pour une <strong>Constructys formation IA</strong> ciblant ChatGPT et le
            gain de temps sur devis, emails ou suivi de chantier, la logique est la même que pour
            toute action éligible au plan de développement des compétences, avec une exigence
            renforcée depuis 2026 sur les <strong>dépôts dans les temps</strong>.
          </p>
          <p className="mt-4 text-slate-700">
            Côté artisan ou chef d&apos;entreprise, retenez surtout ceci : Constructys ne remplace
            pas votre décision de former quelqu&apos;un — il encadre un <strong>enveloppe</strong> de
            prise en charge dans le respect des barèmes. Une formation IA BTP (prompts, rédaction de
            mails, structuration de comptes rendus) est traitée comme une autre action de
            professionnalisation, à condition que le programme soit explicite et que le
            prestataire soit reconnu. C&apos;est pourquoi le couple <strong>Qualiopi + devis
            détaillé</strong> compte autant que le sujet &quot;IA&quot; lui-même.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Combien Constructys rembourse pour une formation IA ?
          </h2>
          <p className="mt-3 text-slate-600">
            Les montants ci-dessous reprennent les repères usuels pour les entreprises du BTP ; le
            détail peut varier selon votre taille et le type d&apos;action. Pour{' '}
            <strong>financer formation IA BTP</strong> ou une{' '}
            <strong>OPCO BTP formation ChatGPT</strong>, retenez surtout les plafonds pédagogiques
            et le plafond jour en intra.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[320px] text-left text-sm text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100">
                  <th className="px-4 py-3 font-semibold text-slate-900">Poste</th>
                  <th className="px-4 py-3 font-semibold text-slate-900">Repère 2026</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3">Coût pédagogique (plafond horaire)</td>
                  <td className="px-4 py-3 font-medium">24 € HT / h / participant</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3">Session intra-entreprise (plafond par jour)</td>
                  <td className="px-4 py-3 font-medium">840 € HT / jour / groupe</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3">Frais de salaires — TPE &lt; 11 salariés</td>
                  <td className="px-4 py-3 font-medium">15 € HT / h / stagiaire (sauf cas FEEBAT)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Dépôt du dossier</td>
                  <td className="px-4 py-3 font-medium">Plateforme eGestion, au moins 15 jours avant le début</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-slate-700">
            <strong>Reste à charge et coût réel</strong> : les plafonds ci-dessus indiquent ce que
            Constructys peut prendre en charge dans la limite des règles. Selon votre taille
            d&apos;entreprise, une participation peut aussi couvrir une partie des frais de salaires
            du temps passé en formation et, dans certains cas, des frais annexes. Le tableau
            généraliste ne remplace pas votre interlocuteur régional : il vous donne un ordre de
            grandeur pour budgétiser une{' '}
            <strong>OPCO BTP formation ChatGPT</strong> ou un atelier sur l&apos;IA appliquée à
            vos chantiers. Pour une session intra avec plusieurs personnes, le plafond journalier
            groupe (840 € HT) peut structurer votre choix de durée et de nombre de participants.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            <a
              href="/documents/conditions-constructys-2026.pdf"
              download
              className="inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
            >
              <Download size={16} strokeWidth={1.5} aria-hidden />
              Télécharger les conditions de prise en charge Constructys 2026 (PDF)
            </a>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900">
            <ListOrdered className="h-7 w-7 text-[var(--accent)]" strokeWidth={1.5} aria-hidden />
            Les étapes pour obtenir le financement
          </h2>
          <ol className="mt-8 space-y-6">
            {[
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
            ].map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{step.title}</p>
                  <p className="mt-1 text-slate-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[var(--accent-soft)] px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            OFC vous accompagne dans le montage du dossier
          </h2>
          <p className="mt-4 text-slate-700">
            <strong>OFC Création d&apos;Entreprise</strong> est certifié Qualiopi : c&apos;est une
            condition sérieuse pour rassurer les financeurs OPCO. Au-delà du certificat, nous vous
            aidons à aligner les intitulés, le programme et les heures avec les attentes de la{' '}
            <strong>prise en charge Constructys</strong>, pour éviter les allers-retours inutiles.
            Que vous visiez une formation courte sur ChatGPT ou un parcours plus large sur
            l&apos;IA au service du chantier, l&apos;objectif est le même : un dossier lisible,
            déposé dans les délais, pour que votre équipe se concentre sur le terrain.
          </p>
          <ul className="mt-6 space-y-2 text-slate-700">
            <li className="flex gap-2">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.5} />
              Programme et devis cohérents avec votre besoin
            </li>
            <li className="flex gap-2">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.5} />
              Rappels sur les délais eGestion et les pièces courantes
            </li>
            <li className="flex gap-2">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.5} />
              Point d&apos;étape avec votre référent formation si besoin
            </li>
          </ul>
          <p className="mt-6 text-slate-700">
            En pratique, vous n&apos;avez pas à deviner les intitulés : nous vous expliquons quoi
            envoyer, dans quel ordre, et comment éviter les oublis qui bloquent un dossier en
            ligne. L&apos;objectif est que la <strong>prise en charge Constructys</strong> soit une
            étape simple, pas un second métier. Si vous hésitez entre inter-entreprise et
            intra-entreprise, ou entre une demi-journée et une journée, nous pouvons vous aider à
            arbitrer en fonction des plafonds et de votre agenda chantier.
          </p>
        </div>
      </section>

      <FAQSection
        items={FAQ_FINANCEMENT_IA_BTP}
        title="Questions fréquentes — Constructys formation IA"
        subtitle="Réponses courtes pour avancer : éligibilité, plafonds, CPF, distanciel et retard de dossier."
      />

      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold">
            Demandez votre devis + accompagnement dossier gratuit
          </h2>
          <p className="mt-4 text-slate-300">
            Décrivez votre projet et recevez un devis adapté. Nous vous accompagnons pour le volet
            financement Constructys sans surcoût caché sur votre demande de prise en charge.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <FileText size={20} strokeWidth={1.5} className="mr-2" aria-hidden />
              Demander un devis
            </Link>
            <RdvLink className="inline-flex items-center justify-center rounded-xl border-2 border-white/70 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10">
              Réserver un rendez-vous
            </RdvLink>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="font-medium text-[var(--accent)] hover:underline">
            ← Retour à l&apos;accueil
          </Link>
          <div className="mt-8">
            <AllerPlusLoin
              links={[
                {
                  href: '/financement-constructys-100-ia-btp',
                  label: 'Financement Constructys 100% IA BTP',
                },
                { href: '/formations', label: 'Formation IA BTP' },
                { href: '/formation-ia-btp-paris-2026', label: 'Formation IA BTP Paris 2026' },
                { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
                { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
                { href: '/blog', label: 'Articles et guides' },
                { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
