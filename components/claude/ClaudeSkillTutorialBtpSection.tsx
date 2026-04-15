import { CopyPromptButton } from '@/components/CopyPromptButton';
import { BookOpen, Compass, FileStack, LayoutList, Target } from 'lucide-react';

const SKILL_TEMPLATE = `ROLE
Tu es [conducteur de travaux | assistante administrative | chargé d’affaires] pour une entreprise BTP : [gros œuvre / second œuvre / TP / corps de métier].

CONTEXTE
Entreprise : [nom ou taille]. Zone : [départements]. Chantier / dossier : [type, client, délais]. Contraintes : [accès, météo, sous-traitants, confidentialité].

MISSION
Produire [livrable] : [objectif opérationnel précis — ex. CR de réunion, synthèse DCE, email MOA].

FORMAT
[puces | tableau Quoi/Qui/Délai | sections numérotées | email avec objet + corps, max X mots]

RÈGLES
- Rester factuel : ne pas inventer normes, prix ou engagements.
- Ton professionnel BTP ; vocabulaire chantier si pertinent.
- Si une information manque, poser les questions avant de rédiger.`;

const steps = [
  {
    title: 'Définir un rôle précis',
    text: 'Fonction et périmètre : le modèle adapte le ton (chantier vs bureau).',
    exemple:
      'Ex. : « Conducteur de travaux TCE » pour un CR avec réserves ; « assistante PME » pour relances et devis.',
    Icon: Target,
  },
  {
    title: 'Ajouter le contexte terrain',
    text: 'Entreprise, zone, dossier : l’IA évite les réponses génériques.',
    exemple:
      'Ex. : « Rénovation copropriété Paris 15e, accès contraint » pour un CR ou un email syndic.',
    Icon: Compass,
  },
  {
    title: 'Formuler la mission',
    text: 'Une phrase sur le livrable attendu — ce que vous validerez après relecture.',
    exemple:
      'Ex. : « Transformer des notes manuscrites en CR avec tableau d’actions et prochaine réunion ».',
    Icon: FileStack,
  },
  {
    title: 'Fixer le format de sortie',
    text: 'Structure imposée (puces, tableau, mail) : gain de temps à la relecture.',
    exemple:
      'Ex. : « Tableau Quoi | Qui | Délai | Statut + 5 puces synthèse » pour une réunion de chantier.',
    Icon: LayoutList,
  },
];

const stepCard =
  'rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_6px_24px_rgba(15,23,42,0.05)] transition duration-300 hover:border-slate-200 hover:shadow-[0_12px_36px_rgba(15,23,42,0.07)] motion-safe:hover:-translate-y-0.5 md:p-6';

/**
 * Tutoriel skill Claude BTP — cartes premium, H2 unique pour l’article parent.
 */
export function ClaudeSkillTutorialBtpSection() {
  return (
    <section className="scroll-mt-24" aria-labelledby="tutoriel-skill-claude-btp" id="tutoriel-skill-claude-btp">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 id="tutoriel-skill-claude-btp" className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Créer un skill dans Claude AI (tutoriel BTP)
        </h2>
        <p className="max-w-md text-sm text-slate-500">Rôle, contexte, mission — le même cadrage pour chaque dossier.</p>
      </div>

      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
        Un <strong className="font-semibold text-slate-800">skill</strong> Claude, c’est une consigne enregistrée que vous réutilisez sans tout retaper — idéal pour{' '}
        <strong className="font-semibold text-slate-800">CR, devis et emails</strong> au quotidien chantier.
      </p>

      <ol className="mt-10 grid list-none gap-4 p-0 md:grid-cols-2">
        {steps.map((step, i) => {
          const StepIcon = step.Icon;
          return (
          <li key={step.title} className={stepCard}>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-[var(--accent)]">
                <StepIcon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Étape {i + 1}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                <p className="mt-2 text-sm text-slate-700">{step.exemple}</p>
              </div>
            </div>
          </li>
          );
        })}
      </ol>

      <div className="relative mt-10 overflow-hidden rounded-2xl border border-[var(--accent)]/20 bg-gradient-to-br from-slate-50 to-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:p-7">
        <div className="absolute right-3 top-3">
          <CopyPromptButton text={SKILL_TEMPLATE} />
        </div>
        <div className="flex items-center gap-2 pr-14">
          <BookOpen className="h-5 w-5 text-[var(--accent)]" aria-hidden />
          <p className="font-display text-sm font-semibold text-slate-900">Modèle à copier (skill BTP)</p>
        </div>
        <p className="mt-1 text-xs text-slate-500">Adaptez les champs entre crochets — collez dans votre skill ou projet Claude.</p>
        <pre className="mt-4 whitespace-pre-wrap break-words border-l-[3px] border-[var(--accent)] pl-3 font-mono text-xs leading-relaxed text-slate-800 md:text-sm">
          {SKILL_TEMPLATE}
        </pre>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 md:p-6">
          <h3 className="font-display text-lg font-bold text-slate-900">Exemple : compte rendu de chantier</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Skill « CR chantier » avec rôle, type de chantiers et format tableau d’actions — vous collez les notes brutes,
            la structure reste homogène.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/80 p-5 md:p-6">
          <h3 className="font-display text-lg font-bold text-slate-900">Pourquoi c’est décisif</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <span className="font-semibold text-slate-800">Temps :</span> moins de reformulations entre chantiers.
            </li>
            <li>
              <span className="font-semibold text-slate-800">Livrables :</span> présentation cohérente du devis au CR.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
