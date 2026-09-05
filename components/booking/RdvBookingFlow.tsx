'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createProspectAndAppointment } from '@/app/actions/prospects';
import type { RdvQualificationPayload } from '@/lib/rdv-qualification';
import {
  RDV_BESOINS,
  RDV_ECHEANCES,
  RDV_FONCTIONS,
  RDV_NIVEAUX_IA,
  RDV_PERSONNES,
  RDV_PRIORITE_AO,
  RDV_TAILLES,
  type RdvBesoin,
  type RdvFonction,
} from '@/lib/rdv-form-options';
import { LINKS } from '@/lib/internal-links';
import {
  getPagePath,
  sendGa4Event,
} from '@/lib/ga4-analytics';

const BookingCalendar = dynamic(
  () =>
    import('@/components/booking/BookingCalendar').then((m) => ({
      default: m.BookingCalendar,
    })),
  {
    ssr: false,
    loading: () => (
      <p className="text-sm text-slate-500" aria-busy="true">
        Chargement du calendrier…
      </p>
    ),
  },
);

const PrendreRdvAgenda = dynamic(
  () =>
    import('@/components/prendre-rendez-vous/PrendreRdvAgenda').then((m) => ({
      default: m.PrendreRdvAgenda,
    })),
  { ssr: false },
);
type Step = 1 | 2 | 3;

const chipBase =
  'min-h-11 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]';
const chipOff = `${chipBase} border-slate-200 bg-white text-slate-700 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]`;
const chipOn = `${chipBase} border-[var(--accent)] bg-[var(--accent)] text-white`;

function ChipGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
  multi = false,
}: {
  legend: string;
  options: readonly { value: T; label: string }[];
  value: T | T[] | '';
  onChange: (v: T | T[]) => void;
  multi?: boolean;
}) {
  const selected = multi ? (Array.isArray(value) ? value : []) : value;

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold text-slate-900">{legend}</legend>
      <div className="flex flex-wrap gap-2" role="group">
        {options.map((opt) => {
          const isOn = multi
            ? (selected as T[]).includes(opt.value)
            : selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={isOn}
              className={isOn ? chipOn : chipOff}
              onClick={() => {
                if (multi) {
                  const cur = selected as T[];
                  onChange(
                    cur.includes(opt.value)
                      ? cur.filter((x) => x !== opt.value)
                      : [...cur, opt.value],
                  );
                } else {
                  onChange(opt.value);
                }
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Progress({ step }: { step: Step }) {
  const items = [
    { n: 1 as const, label: 'Vous' },
    { n: 2 as const, label: 'Votre besoin' },
    { n: 3 as const, label: 'Rendez-vous' },
  ];
  return (
    <ol className="mb-8 flex items-center gap-1 text-xs sm:gap-2 sm:text-sm" aria-label="Progression">
      {items.map((item, i) => (
        <li key={item.n} className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              step >= item.n
                ? 'bg-[var(--accent)] text-white'
                : 'bg-slate-200 text-slate-600'
            }`}
            aria-current={step === item.n ? 'step' : undefined}
          >
            {item.n}
          </span>
          <span
            className={`truncate ${
              step === item.n ? 'font-semibold text-slate-900' : 'text-slate-500'
            }`}
          >
            {item.label}
          </span>
          {i < items.length - 1 && (
            <span className="mx-1 hidden h-px flex-1 bg-slate-200 sm:block" aria-hidden />
          )}
        </li>
      ))}
    </ol>
  );
}

function readUtm(): string {
  if (typeof window === 'undefined') return '';
  const p = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const parts = keys
    .map((k) => {
      const v = p.get(k);
      return v ? `${k}=${v}` : null;
    })
    .filter(Boolean);
  return parts.join('&');
}

function readFormationHint(): string {
  if (typeof window === 'undefined') return '';
  try {
    return sessionStorage.getItem('rdv_formation_hint') || '';
  } catch {
    return '';
  }
}

export function RdvBookingFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const trackedStartRef = useRef(false);
  const [formStartedAt] = useState(() => new Date().toISOString());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nativeSlotsOk, setNativeSlotsOk] = useState<boolean | null>(null);

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [fonction, setFonction] = useState<RdvFonction | ''>('');
  const [website, setWebsite] = useState(''); // honeypot

  const [besoins, setBesoins] = useState<RdvBesoin[]>([]);
  const [prioriteAo, setPrioriteAo] = useState('');
  const [taille, setTaille] = useState('');
  const [personnes, setPersonnes] = useState('');
  const [niveauIa, setNiveauIa] = useState('');
  const [echeance, setEcheance] = useState('');
  const [probleme, setProbleme] = useState('');
  const [typeRdv, setTypeRdv] = useState<'visio' | 'telephone'>('visio');

  useEffect(() => {
    try {
      const pre = sessionStorage.getItem('rdv_besoin_preselect');
      if (pre === 'outils-sur-mesure') {
        setBesoins((cur) => (cur.length ? cur : ['outils-sur-mesure']));
        sessionStorage.removeItem('rdv_besoin_preselect');
      }
    } catch {
      /* ignore */
    }
  }, []);

  const showPersonnes = besoins.includes('former-equipes');
  const showPrioriteAo = besoins.includes('appels-offres-dce');

  const qualification: RdvQualificationPayload = useMemo(
    () => ({
      prenom: prenom.trim(),
      nom: nom.trim(),
      email: email.trim(),
      telephone: telephone.trim() || undefined,
      entreprise: entreprise.trim(),
      fonction: fonction || undefined,
      besoins,
      priorite_ao: prioriteAo || undefined,
      taille_entreprise: taille || undefined,
      personnes_concernees: showPersonnes ? personnes || undefined : undefined,
      niveau_ia: niveauIa || undefined,
      echeance: echeance || undefined,
      probleme: probleme.trim() || undefined,
      type_rdv: typeRdv,
      website,
      source_page: typeof window !== 'undefined' ? window.location.href : '',
      utm: readUtm(),
      referer: typeof document !== 'undefined' ? document.referrer || '' : '',
      formation_consultee: readFormationHint(),
      form_started_at: formStartedAt,
    }),
    [
      prenom,
      nom,
      email,
      telephone,
      entreprise,
      fonction,
      besoins,
      prioriteAo,
      taille,
      personnes,
      niveauIa,
      echeance,
      probleme,
      typeRdv,
      website,
      showPersonnes,
      formStartedAt,
    ],
  );

  useEffect(() => {
    if (trackedStartRef.current) return;
    trackedStartRef.current = true;
    sendGa4Event('contact_form_started', { page_path: getPagePath(), form: 'rdv' });
  }, []);

  const validateStep1 = (): string | null => {
    if (!prenom.trim() || !nom.trim()) return 'Indiquez votre prénom et votre nom.';
    if (!entreprise.trim()) return 'Indiquez votre entreprise.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'Indiquez un email professionnel valide.';
    }
    return null;
  };

  const validateStep2 = (): string | null => {
    if (!besoins.length) return 'Sélectionnez au moins un sujet à améliorer.';
    if (!taille) return 'Indiquez la taille de l’entreprise.';
    if (!niveauIa) return 'Indiquez votre niveau d’usage de l’IA.';
    if (!echeance) return 'Indiquez votre échéance.';
    return null;
  };

  const goStep2 = () => {
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep(2);
  };

  const goStep3 = () => {
    const err = validateStep2();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep(3);
    sendGa4Event('contact_form_completed', { page_path: getPagePath(), form: 'rdv' });
  };

  const handleConfirmSlot = async (startIso: string, endIso: string) => {
    setSubmitting(true);
    setError(null);
    sendGa4Event('appointment_selected', { page_path: getPagePath() });

    const result = await createProspectAndAppointment({
      ...qualification,
      start_at: startIso,
      end_at: endIso,
    });

    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    sendGa4Event('appointment_confirmed', { page_path: getPagePath() });
    const params = new URLSearchParams({
      start: startIso,
      prenom: qualification.prenom,
    });
    if (result.manageToken) params.set('m', result.manageToken);
    router.push(`/merci-rdv?${params.toString()}`);
  };

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <Progress step={step} />

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">Parlons de votre besoin</h2>
            <p className="mt-1 text-sm text-slate-600">
              Quelques informations pour préparer notre échange.
            </p>
          </div>

          {/* honeypot */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label>
              Site web
              <input
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="rdv-prenom" className="mb-1.5 block text-sm font-semibold text-slate-900">
                Prénom *
              </label>
              <input
                id="rdv-prenom"
                name="given-name"
                autoComplete="given-name"
                required
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="min-h-12 w-full rounded-xl border border-slate-200 px-3 text-base text-slate-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
              />
            </div>
            <div>
              <label htmlFor="rdv-nom" className="mb-1.5 block text-sm font-semibold text-slate-900">
                Nom *
              </label>
              <input
                id="rdv-nom"
                name="family-name"
                autoComplete="family-name"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="min-h-12 w-full rounded-xl border border-slate-200 px-3 text-base text-slate-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
              />
            </div>
          </div>

          <div>
            <label htmlFor="rdv-entreprise" className="mb-1.5 block text-sm font-semibold text-slate-900">
              Entreprise *
            </label>
            <input
              id="rdv-entreprise"
              name="organization"
              autoComplete="organization"
              required
              value={entreprise}
              onChange={(e) => setEntreprise(e.target.value)}
              className="min-h-12 w-full rounded-xl border border-slate-200 px-3 text-base text-slate-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            />
          </div>

          <div>
            <label htmlFor="rdv-email" className="mb-1.5 block text-sm font-semibold text-slate-900">
              Email professionnel *
            </label>
            <input
              id="rdv-email"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-12 w-full rounded-xl border border-slate-200 px-3 text-base text-slate-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            />
          </div>

          <div>
            <label htmlFor="rdv-tel" className="mb-1.5 block text-sm font-semibold text-slate-900">
              Téléphone <span className="font-normal text-slate-500">(facultatif)</span>
            </label>
            <input
              id="rdv-tel"
              type="tel"
              name="tel"
              autoComplete="tel"
              inputMode="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="min-h-12 w-full rounded-xl border border-slate-200 px-3 text-base text-slate-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            />
          </div>

          <ChipGroup
            legend="Fonction"
            options={RDV_FONCTIONS}
            value={fonction}
            onChange={(v) => setFonction(v as RdvFonction)}
          />

          <button
            type="button"
            onClick={goStep2}
            className="mt-2 flex min-h-12 w-full items-center justify-center rounded-xl bg-[var(--accent)] px-6 text-base font-semibold text-white hover:bg-blue-700 sm:w-auto"
          >
            Continuer
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Que souhaitez-vous améliorer avec l&apos;IA ?
            </h2>
            <p className="mt-1 text-sm text-slate-600">Plusieurs réponses possibles.</p>
          </div>

          <ChipGroup
            legend="Besoins"
            options={RDV_BESOINS}
            value={besoins}
            multi
            onChange={(v) => setBesoins(v as RdvBesoin[])}
          />

          {showPrioriteAo && (
            <ChipGroup
              legend="Votre priorité sur les appels d’offres / DCE ?"
              options={RDV_PRIORITE_AO}
              value={prioriteAo}
              onChange={(v) => setPrioriteAo(v as string)}
            />
          )}

          <ChipGroup
            legend="Combien de personnes travaillent dans l’entreprise ?"
            options={RDV_TAILLES}
            value={taille}
            onChange={(v) => setTaille(v as string)}
          />

          {showPersonnes && (
            <ChipGroup
              legend="Combien de personnes seraient concernées ?"
              options={RDV_PERSONNES}
              value={personnes}
              onChange={(v) => setPersonnes(v as string)}
            />
          )}

          <ChipGroup
            legend="Votre équipe utilise déjà l’IA ?"
            options={RDV_NIVEAUX_IA}
            value={niveauIa}
            onChange={(v) => setNiveauIa(v as string)}
          />

          <ChipGroup
            legend="Quand souhaitez-vous avancer ?"
            options={RDV_ECHEANCES}
            value={echeance}
            onChange={(v) => setEcheance(v as string)}
          />

          <div>
            <label htmlFor="rdv-probleme" className="mb-1.5 block text-sm font-semibold text-slate-900">
              Quel est le principal problème que vous aimeriez résoudre ?{' '}
              <span className="font-normal text-slate-500">(facultatif)</span>
            </label>
            <textarea
              id="rdv-probleme"
              rows={3}
              maxLength={600}
              value={probleme}
              onChange={(e) => setProbleme(e.target.value)}
              placeholder="Ex. : nous passons trop de temps à analyser les DCE et rédiger nos mémoires techniques."
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            />
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-slate-900">Modalité préférée</legend>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={typeRdv === 'visio'}
                className={typeRdv === 'visio' ? chipOn : chipOff}
                onClick={() => setTypeRdv('visio')}
              >
                Visio
              </button>
              <button
                type="button"
                aria-pressed={typeRdv === 'telephone'}
                className={typeRdv === 'telephone' ? chipOn : chipOff}
                onClick={() => setTypeRdv('telephone')}
              >
                Téléphone
              </button>
            </div>
          </fieldset>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setStep(1);
              }}
              className="min-h-12 rounded-xl border border-slate-200 px-6 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Retour
            </button>
            <button
              type="button"
              onClick={goStep3}
              className="min-h-12 rounded-xl bg-[var(--accent)] px-6 text-base font-semibold text-white hover:bg-blue-700"
            >
              Choisir mon créneau
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">Choisissez votre créneau</h2>
            <p className="mt-1 text-sm text-slate-600">
              Laure préparera l’échange à partir des informations que vous venez de transmettre.
            </p>
          </div>

          <BookingCalendar
            mode="confirm"
            qualificationSummary={`${qualification.prenom} ${qualification.nom} · ${qualification.entreprise}`}
            submitting={submitting}
            onConfirmSlot={handleConfirmSlot}
            onAvailabilityState={setNativeSlotsOk}
          />

          {nativeSlotsOk === false && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
              <p className="font-semibold">Aucun créneau natif ouvert pour le moment.</p>
              <p className="mt-1">
                Vous pouvez réserver via l’agenda ci-dessous, ou nous écrire via la{' '}
                <Link href={LINKS.contact} className="font-medium text-[var(--accent)] underline">
                  page contact
                </Link>
                .
              </p>
              <div className="mt-4">
                <PrendreRdvAgenda />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setStep(2)}
            className="min-h-11 text-sm font-semibold text-slate-600 underline-offset-2 hover:underline"
          >
            Modifier mon besoin
          </button>
        </div>
      )}

      <p className="mt-8 text-xs leading-relaxed text-slate-500">
        Ces informations servent uniquement à préparer notre échange. Vos données ne sont pas
        transmises à des tiers à des fins commerciales.{' '}
        <Link href={LINKS.politiqueConfidentialite} className="text-[var(--accent)] underline">
          Politique de confidentialité
        </Link>
        .
      </p>
    </div>
  );
}
