import Link from 'next/link';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import {
  Download,
  Building2,
  AlertTriangle,
  Phone,
  CheckCircle,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { getFAQSchema } from '@/lib/seo';
import { FAQ_FINANCEMENT } from '@/lib/faq';

export const metadata = {
  title: 'Formation IA Constructys — Financement 100% | Laure Olivié',
  description:
    'Formation IA Constructys : 100% finançable. Modalités 2026, eGestion. Gagnez du temps sur devis et emails. Artisans, PME BTP.',
};

export default function FinancementConstructysPage() {
  const faqSchema = getFAQSchema(FAQ_FINANCEMENT);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Formation IA Constructys : financement 100%
          </h1>
          <p className="mt-2 font-display text-xl text-[var(--accent)]">
            de votre <Link href="/formations" className="underline hover:no-underline">Formation IA</Link>
          </p>
          <p className="mt-6 text-slate-300">
            Découvrez les modalités de prise en charge 2026 et faites votre
            demande de financement simplement
          </p>
        </div>
      </section>

      {/* Rappels importants */}
      <section className="border-b border-slate-200 bg-amber-50 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900">
            <AlertTriangle size={24} strokeWidth={1.5} className="text-amber-600" />
            Rappels importants — Modalités applicables dès le 1er janvier 2026
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex gap-3">
              <span className="text-amber-600">•</span>
              Les dossiers doivent parvenir complets à Constructys 15 jours
              calendaires avant le début de la formation
            </li>
            <li className="flex gap-3">
              <span className="text-amber-600">•</span>
              Vérifier que vous avez renseigné toutes les données de votre demande
              (coûts pédagogiques + autres dépenses)
            </li>
            <li className="flex gap-3">
              <span className="text-amber-600">•</span>
              Les dossiers envoyés après la date limite ne seront pas financés
            </li>
            <li className="flex gap-3">
              <span className="text-amber-600">•</span>
              La formation ne doit pas avoir déjà démarré avant la réception de la
              demande
            </li>
            <li className="flex gap-3">
              <span className="text-amber-600">•</span>
              Utilisation obligatoire de la plateforme eGestion
            </li>
          </ul>
        </div>
      </section>

      {/* Téléchargement */}
      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <a
            href="/documents/conditions-constructys-2026.pdf"
            download
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Download size={20} />
            Téléchargez les conditions de prise en charge Constructys 2026
          </a>
          <p className="mt-3 text-sm text-slate-600">
            Prenez connaissance des règles de prise en charge détaillées selon
            votre secteur d&apos;activité
          </p>
        </div>
      </section>

      {/* 3 secteurs */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Bâtiment',
                desc: 'Modalités secteur Bâtiment',
              },
              {
                title: 'Négoce des Matériaux',
                desc: 'Modalités secteur Négoce',
              },
              {
                title: 'Travaux Publics',
                desc: 'Modalités secteur TP',
              },
            ].map((secteur) => (
              <div
                key={secteur.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <Building2 size={32} strokeWidth={1.5} className="text-[var(--accent)]" />
                <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
                  {secteur.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{secteur.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modalités < 50 salariés */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Modalités de participation financière 2026
          </h2>
          <p className="mt-2 text-slate-600">
            Découvrez les conditions de prise en charge selon la taille de votre
            entreprise
          </p>

          <div className="mt-12 rounded-2xl border-2 border-[var(--accent-soft)] bg-[var(--accent-soft)] p-8">
            <h3 className="font-display text-xl font-bold text-slate-900">
              Entreprises de moins de 50 salariés
            </h3>
            <div className="mt-6 space-y-6">
              <div>
                <p className="font-semibold text-slate-900">Durée maximum</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>
                    Par action non qualifiante : maximum 300 heures / stagiaire
                  </li>
                  <li>
                    Par action qualifiante (qualification CCN Bâtiment /
                    certification RNCP / blocs / CQP) : maximum 1 200 heures /
                    stagiaire — Nombre max : 3 stagiaires / an / entreprise
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  Plafond coût pédagogique horaire
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  <li>Plafond standard : 24 € HT / heure / stagiaire</li>
                  <li>
                    Limite de 840 € HT / jour / groupe (session intra-entreprise)
                  </li>
                  <li>
                    Actions FEEBAT : coût selon modules — Contact équipes régions
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  Participation aux frais de salaires et frais annexes
                </p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>Moins de 11 salariés :</strong> 15 € HT / heure /
                    stagiaire (sauf FEEBAT : 100 € HT / jour / stagiaire)
                  </li>
                  <li>
                    <strong>11 à moins de 50 :</strong> 10 € HT / heure pour
                    actions qualifiantes ; 15 € HT / heure pour pérennisation
                    emplois et AFEST
                  </li>
                  <li>
                    <strong>Frais annexes</strong> (actions qualifiantes) : 8% des
                    coûts pédagogiques, limite 1 500 € HT / stagiaire
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financements complémentaires < 300 */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h3 className="font-display text-xl font-bold text-slate-900">
            Entreprises de moins de 300 salariés — Financements complémentaires
          </h3>
          <div className="mt-8 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-semibold text-slate-900">
                Actions de coaching (création / reprise / transmission)
              </p>
              <p className="mt-2 text-sm text-slate-600">
                125 € HT / heure / groupe — Max 5 000 € HT / an / entreprise.
                Délai de carence 1 an si 2 ans consécutifs.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-semibold text-slate-900">
                Actions pérennisation des emplois
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Plafond 24 € HT / heure / stagiaire
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-semibold text-slate-900">
                Actions Lean Management
              </p>
              <p className="mt-2 text-sm text-slate-600">
                1 000 € HT / jour — 2 jours diagnostic + 6 jours accompagnement
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="font-semibold text-slate-900">
                Diag Performance — RH / RH Numérique / RH Écologique (RSE)
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Phase transitoire 2026 — Plafond 1 000 € HT / jour — Contact
                équipes en région
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 50-300 salariés */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h3 className="font-display text-xl font-bold text-slate-900">
            Entreprises de 50 à moins de 300 salariés
          </h3>
          <p className="mt-4 text-slate-600">
            Participation aux coûts pédagogiques des actions du plan de
            développement des compétences. Budget entreprise : contactez vos
            interlocuteurs Constructys en région. Plafond : 24 € HT / heure /
            stagiaire.
          </p>
        </div>
      </section>

      {/* Ce qui est pris en charge + Documents */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Ce qui est pris en charge
              </h3>
              <ul className="mt-4 space-y-2">
                {[
                  'Coûts pédagogiques de la formation',
                  'Frais de salaires des participants',
                  'Frais annexes (selon conditions)',
                  'Accompagnement VAE et bilans',
                  'Évaluations CléA',
                  'Ingénierie AFEST',
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-slate-600">
                    <CheckCircle size={20} strokeWidth={1.5} className="shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Documents à prévoir
              </h3>
              <ul className="mt-4 space-y-2">
                {[
                  'Programme de formation détaillé',
                  'Devis du prestataire',
                  'Convention de formation',
                  'Liste des participants',
                  'Attestation FFB (si adhérent)',
                  "Justificatifs d'effectif",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-slate-600">
                    <FileText size={20} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        items={FAQ_FINANCEMENT}
        title="Questions fréquentes sur le financement Constructys"
        subtitle="Délais, plafonds, documents : tout ce qu'il faut savoir pour monter votre dossier."
      />

      {/* Faire une demande */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Faire une demande de prise en charge
          </h2>
          <p className="mt-4 text-slate-600">
            Vous êtes prêt à soumettre votre dossier ? Adressez votre demande
            directement à Constructys
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.constructys.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <ExternalLink size={20} strokeWidth={1.5} />
              Je réalise ma demande sur eGestion
            </a>
            <Link
              href="/prendre-rdv"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 px-8 py-4 font-semibold text-slate-800 transition-colors hover:bg-slate-50"
            >
              Je me fais accompagner
            </Link>
          </div>
        </div>
      </section>

      {/* Accompagnement Laure */}
      <section className="rounded-t-3xl bg-[var(--accent)] px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-2xl font-bold text-white">
            Une question sur les conditions de prise en charge ?
          </h2>
          <p className="mt-4 text-center text-blue-100">
            Notre équipe vous accompagne dans vos démarches de financement
            Constructys
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <Phone size={32} strokeWidth={1.5} className="mx-auto text-white" />
              <p className="mt-3 font-semibold text-white">
                Appelez le N° vert
              </p>
              <p className="mt-1 text-sm text-blue-100">
                Assistance téléphonique gratuite
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <Building2 size={32} className="mx-auto text-white" />
              <p className="mt-3 font-semibold text-white">
                Contact régional
              </p>
              <p className="mt-1 text-sm text-blue-100">
                Île-de-France & Grand Paris
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm">
              <CheckCircle size={32} strokeWidth={1.5} className="mx-auto text-white" />
              <p className="mt-3 font-semibold text-white">
                Accompagnement personnalisé
              </p>
              <p className="mt-1 text-sm text-blue-100">
                Je vous aide à monter votre dossier
              </p>
              <Link
                href="/prendre-rdv"
                className="mt-4 inline-block rounded-lg bg-white px-6 py-2 font-semibold text-[var(--accent)] hover:bg-blue-50"
              >
                Prendre RDV
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="text-[var(--accent)] font-medium hover:underline"
          >
            ← Retour à l&apos;accueil
          </Link>
          <div className="mt-8">
            <AllerPlusLoin />
          </div>
        </div>
      </div>
    </div>
  );
}
