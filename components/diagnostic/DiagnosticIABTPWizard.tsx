'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Send, Zap } from 'lucide-react';
import { submitDiagnosticAction } from '@/app/actions/diagnostic-ia-btp';
import type { DiagnosticAnswers } from '@/app/actions/diagnostic-ia-btp';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { RdvLink } from '@/components/RdvLink';

const QUESTIONS = [
  {
    key: 'metier' as const,
    label: 'Votre métier dans le BTP',
    options: [
      { value: 'professionnel_btp', label: 'Professionnel du BTP (électricien, plombier, maçon...)' },
      { value: 'conducteur_travaux', label: 'Conducteur de travaux' },
      { value: 'chef_entreprise', label: "Chef d'entreprise / dirigeant" },
      { value: 'assistant', label: 'Assistant(e) administratif(ve)' },
      { value: 'autre', label: 'Autre' },
    ],
  },
  {
    key: 'nb_personnes' as const,
    label: 'Nombre de personnes dans votre entreprise',
    options: [
      { value: '1-5', label: '1 à 5' },
      { value: '6-10', label: '6 à 10' },
      { value: '11-50', label: '11 à 50' },
      { value: '50+', label: 'Plus de 50' },
    ],
  },
  {
    key: 'tache_chronophage' as const,
    label: 'Votre tâche la plus chronophage ?',
    options: [
      { value: 'devis', label: 'Rédiger des devis' },
      { value: 'emails', label: 'Gérer les emails clients' },
      { value: 'appels_offres', label: "Répondre aux appels d'offres" },
      { value: 'admin', label: 'Administratif / facturation' },
      { value: 'autre', label: 'Autre' },
    ],
  },
  {
    key: 'ia_deja_utilisee' as const,
    label: "Utilisez-vous déjà l'IA (ChatGPT, Copilot...) ?",
    options: [
      { value: 'oui_quotidien', label: 'Oui, au quotidien' },
      { value: 'oui_parfois', label: 'Oui, de temps en temps' },
      { value: 'teste', label: "J'ai testé rapidement" },
      { value: 'non', label: 'Non, pas encore' },
    ],
  },
  {
    key: 'decouvrir_ia' as const,
    label: 'Ce que vous voulez découvrir en priorité',
    options: [
      { value: 'devis', label: 'Générer des devis plus vite' },
      { value: 'emails', label: 'Automatiser les emails' },
      { value: 'cr_chantier', label: 'Comptes-rendus de chantier' },
      { value: 'global', label: 'Tout ça !' },
    ],
  },
];

const TOTAL_ETAPES = QUESTIONS.length + 1;

function optionLabel<K extends (typeof QUESTIONS)[number]['key']>(key: K, value: string | undefined) {
  if (!value) return null;
  const q = QUESTIONS.find((x) => x.key === key);
  return q?.options.find((o) => o.value === value)?.label ?? null;
}

export function DiagnosticIABTPWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedLead, setCompletedLead] = useState<{ prenomNom: string } | null>(null);

  const isLeadStep = step >= QUESTIONS.length && !completedLead;
  const currentQuestion = QUESTIONS[step];

  const handleAnswer = (key: keyof DiagnosticAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => Math.min(prev + 1, QUESTIONS.length));
  };

  const handleBack = () => setStep((prev) => Math.max(0, prev - 1));

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const rgpd = (e.currentTarget.elements.namedItem('rgpd') as HTMLInputElement | null)?.checked;
    if (!rgpd) {
      setError('Veuillez accepter la politique de confidentialité pour continuer.');
      return;
    }
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const result = await submitDiagnosticAction({
      nom: (fd.get('nom') as string)?.trim() || '',
      entreprise: (fd.get('entreprise') as string)?.trim() || undefined,
      email: (fd.get('email') as string)?.trim() || '',
      telephone: (fd.get('telephone') as string)?.trim() || undefined,
      answers,
    });
    setSubmitting(false);
    if (result.ok) {
      const nom = (fd.get('nom') as string)?.trim() || '';
      setCompletedLead({ prenomNom: nom });
    } else {
      setError(result.error ?? 'Une erreur est survenue.');
    }
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]';
  const labelClass = 'block text-sm font-medium text-slate-700';

  return (
    <div className="py-12">
      {/* Hero */}
      <div className="text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
          <Zap size={28} className="text-[var(--accent)]" strokeWidth={1.5} />
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-900 md:text-3xl">
          Diagnostic IA BTP gratuit
        </h1>
        <p className="mt-3 text-slate-600">
          Évaluez en 60 secondes comment l&apos;IA peut vous faire gagner du temps.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
          {completedLead ? (
            <span>Diagnostic terminé — voici votre synthèse</span>
          ) : isLeadStep ? (
            <span>
              Étape {TOTAL_ETAPES} / {TOTAL_ETAPES} — Vos coordonnées
            </span>
          ) : (
            <span>
              Étape {step + 1} / {TOTAL_ETAPES}
            </span>
          )}
        </div>
      </div>

      {/* Preuve sociale — au-dessus du quiz */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-600 sm:text-sm">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
          <strong className="text-slate-900">{formatProfessionalsTrainedCount()}</strong> professionnels formés
        </span>
        <span className="text-slate-300">·</span>
        <span>
          <strong className="text-slate-900">{SOCIAL_PROOF.AVERAGE_RATING}</strong> de satisfaction
        </span>
        <span className="text-slate-300">·</span>
        <span>
          Certifié <strong className="text-slate-900">Qualiopi</strong>
        </span>
        <span className="text-slate-300">·</span>
        <span>
          100 % <strong className="text-slate-900">gratuit</strong>
        </span>
      </div>

      {/* Quiz (étapes 1–5), étape 6 — capture lead, puis résultat */}
      <div className="mt-10 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm md:p-8">
        {completedLead ? (
          <div className="space-y-5">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Merci{completedLead.prenomNom ? `, ${completedLead.prenomNom.split(/\s+/)[0]}` : ''} — votre diagnostic est
              enregistré
            </h2>
            <p className="text-sm text-slate-600">
              Voici la synthèse personnalisée basée sur vos réponses. Vos coordonnées sont enregistrées : Laure Olivié
              pourra vous recontacter sur votre email professionnel pour la suite du parcours.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
              {optionLabel('metier', answers.metier) && (
                <li>
                  <strong>Profil</strong> : {optionLabel('metier', answers.metier)}
                </li>
              )}
              {optionLabel('nb_personnes', answers.nb_personnes) && (
                <li>
                  <strong>Taille d&apos;entreprise</strong> : {optionLabel('nb_personnes', answers.nb_personnes)} — pour
                  l&apos;éligibilité et le plafond Constructys.
                </li>
              )}
              {optionLabel('tache_chronophage', answers.tache_chronophage) && (
                <li>
                  <strong>Levier prioritaire</strong> : {optionLabel('tache_chronophage', answers.tache_chronophage)} — un
                  des axes où l&apos;IA fait le plus gagner du temps (souvent 3 à 5 h/semaine une fois les bons prompts en
                  place).
                </li>
              )}
              {optionLabel('ia_deja_utilisee', answers.ia_deja_utilisee) && (
                <li>
                  <strong>Maturité IA</strong> : {optionLabel('ia_deja_utilisee', answers.ia_deja_utilisee)}
                </li>
              )}
              {optionLabel('decouvrir_ia', answers.decouvrir_ia) && (
                <li>
                  <strong>Priorité d&apos;apprentissage</strong> : {optionLabel('decouvrir_ia', answers.decouvrir_ia)}
                </li>
              )}
            </ul>
            <p className="text-sm text-slate-600">
              Prochaine étape : échangeons 15 minutes pour valider le programme adapté (débutant ou avancé) et le
              financement OPCO.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <RdvLink className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700">
                Prendre un rendez-vous découverte
              </RdvLink>
              <Link
                href={LINKS.formationIaBtp}
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 px-6 py-3 text-center font-semibold text-slate-800 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
              >
                Formation IA pour le BTP — présentation de l&apos;offre
              </Link>
            </div>
          </div>
        ) : !isLeadStep ? (
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">{currentQuestion.label}</h2>
            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleAnswer(currentQuestion.key, opt.value)}
                  className="flex w-full items-center justify-between rounded-xl border-2 border-slate-200 px-5 py-4 text-left font-medium transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                >
                  <span>{opt.label}</span>
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
                Retour
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Vos coordonnées pour recevoir le résultat
            </h2>
            <p className="text-sm text-slate-600">
              Étape 6 sur 6 : laissez votre email professionnel — après validation, vous verrez la synthèse personnalisée
              et les prochaines étapes.
            </p>
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="diag-nom" className={labelClass}>
                Nom et prénom *
              </label>
              <input
                id="diag-nom"
                name="nom"
                type="text"
                required
                autoComplete="name"
                placeholder="Jean Dupont"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="diag-entreprise" className={labelClass}>
                Entreprise
              </label>
              <input
                id="diag-entreprise"
                name="entreprise"
                type="text"
                autoComplete="organization"
                placeholder="Mon Entreprise BTP"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="diag-email" className={labelClass}>
                Email professionnel *
              </label>
              <input
                id="diag-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="jean@entreprise.fr"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="diag-telephone" className={labelClass}>
                Téléphone
              </label>
              <input
                id="diag-telephone"
                name="telephone"
                type="tel"
                autoComplete="tel"
                placeholder="06 12 34 56 78"
                className={inputClass}
              />
            </div>
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <input
                id="diag-rgpd"
                name="rgpd"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <label htmlFor="diag-rgpd" className="text-sm leading-relaxed text-slate-600">
                J&apos;accepte que mes données soient traitées pour être recontacté(e) dans le cadre de ce diagnostic, et
                j&apos;ai pris connaissance de la{' '}
                <Link
                  href={LINKS.politiqueConfidentialite}
                  className="font-medium text-[var(--accent)] underline underline-offset-2 hover:no-underline"
                >
                  politique de confidentialité
                </Link>
                . *
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(QUESTIONS.length - 1)}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <ChevronLeft size={18} />
                Modifier mes réponses
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="ml-auto inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-70"
              >
                {submitting ? (
                  'Envoi...'
                ) : (
                  <>
                    <Send size={18} />
                    Voir mon diagnostic
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
