'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Send, Zap } from 'lucide-react';
import { submitDiagnosticAction } from '@/app/actions/diagnostic-ia-btp';
import type { DiagnosticAnswers } from '@/app/actions/diagnostic-ia-btp';

const QUESTIONS = [
  {
    key: 'metier' as const,
    label: 'Votre métier dans le BTP',
    options: [
      { value: 'artisan', label: 'Artisan (électricien, plombier, maçon...)' },
      { value: 'conducteur_travaux', label: 'Conducteur de travaux' },
      { value: 'chef_entreprise', label: 'Chef d\'entreprise / dirigeant' },
      { value: 'assistant', label: 'Assistant(e) administratif(ve)' },
      { value: 'autre', label: 'Autre' },
    ],
  },
  {
    key: 'nb_personnes' as const,
    label: "Nombre de personnes dans votre entreprise",
    options: [
      { value: '1-5', label: '1 à 5' },
      { value: '6-10', label: '6 à 10' },
      { value: '11-50', label: '11 à 50' },
      { value: '50+', label: 'Plus de 50' },
    ],
  },
  {
    key: 'tache_chronophage' as const,
    label: "Votre tâche la plus chronophage ?",
    options: [
      { value: 'devis', label: 'Rédiger des devis' },
      { value: 'emails', label: 'Gérer les emails clients' },
      { value: 'appels_offres', label: 'Répondre aux appels d\'offres' },
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
      { value: 'teste', label: 'J\'ai testé rapidement' },
      { value: 'non', label: 'Non, pas encore' },
    ],
  },
  {
    key: 'decouvrir_ia' as const,
    label: "Ce que vous voulez découvrir en priorité",
    options: [
      { value: 'devis', label: 'Générer des devis plus vite' },
      { value: 'emails', label: 'Automatiser les emails' },
      { value: 'cr_chantier', label: 'Comptes-rendus de chantier' },
      { value: 'global', label: 'Tout ça !' },
    ],
  },
];

export function DiagnosticIABTPWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isQuizComplete = step >= QUESTIONS.length;
  const currentQuestion = QUESTIONS[step];

  const handleAnswer = (key: keyof DiagnosticAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => Math.min(prev + 1, QUESTIONS.length));
  };

  const handleBack = () => setStep((prev) => Math.max(0, prev - 1));

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
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
      router.push(
        '/prendre-rdv?source=diagnostic&message=' +
          encodeURIComponent('Votre diagnostic est prêt. Réservez un créneau pour en discuter.')
      );
    } else {
      setError(result.error ?? 'Une erreur est survenue.');
    }
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]';
  const labelClass = 'block text-sm font-medium text-slate-700';

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
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
          <span>Question {Math.min(step + 1, QUESTIONS.length)} / {QUESTIONS.length}</span>
        </div>
      </div>

      {/* Quiz ou formulaire */}
      <div className="mt-10 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm md:p-8">
        {!isQuizComplete ? (
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">
              {currentQuestion.label}
            </h2>
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
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
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
                placeholder="06 12 34 56 78"
                className={inputClass}
              />
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
                    Voir mon diagnostic et prendre RDV
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
