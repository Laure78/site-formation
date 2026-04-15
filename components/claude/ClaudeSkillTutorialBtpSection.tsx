import { CopyPromptButton } from '@/components/CopyPromptButton';

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
    text: 'Indiquez la fonction et le périmètre : le modèle adapte le ton et les priorités (chantier vs bureau).',
    exemple:
      'Exemple BTP : « Conducteur de travaux TCE » pour structurer un CR avec réserves et planning ; « assistante PME » pour relances clients et devis.',
  },
  {
    title: 'Ajouter le contexte terrain',
    text: 'Décrivez l’entreprise, la zone, le chantier ou le dossier : l’IA évite les réponses génériques.',
    exemple:
      'Exemple BTP : « Rénovation copropriété Paris 15e, accès contraint, 3 sous-traitants » pour un compte rendu ou un email au syndic.',
  },
  {
    title: 'Formuler la mission',
    text: 'Une phrase sur le livrable attendu : ce que vous validerez ou enverrez tel quel après relecture.',
    exemple:
      'Exemple BTP : « Transformer des notes manuscrites en CR avec tableau d’actions et prochaine réunion ».',
  },
  {
    title: 'Fixer le format de sortie',
    text: 'Imposez la structure (puces, tableau, mail) : vous gagnez du temps à la relecture et en copier-coller.',
    exemple:
      'Exemple BTP : « Tableau Quoi | Qui | Délai | Statut + 5 puces synthèse » pour une réunion de chantier.',
  },
];

/**
 * Tutoriel : créer un skill Claude AI orienté BTP (section autonome, H2 unique dans l’article parent).
 */
export function ClaudeSkillTutorialBtpSection() {
  return (
    <section className="mt-14" aria-labelledby="tutoriel-skill-claude-btp" id="tutoriel-skill-claude-btp">
      <h2
        id="tutoriel-skill-claude-btp"
        className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
      >
        Créer un skill dans Claude AI (tutoriel BTP)
      </h2>

      <p className="mt-4 max-w-3xl text-slate-700 leading-relaxed">
        Un <strong>skill</strong> Claude, c’est une consigne enregistrée (rôle + contexte + mission) que vous réutilisez
        sans tout retaper. Pour le <strong>Claude AI BTP</strong>, ça sert surtout au quotidien chantier : comptes rendus,
        devis, emails — le même cadrage, des réponses homogènes. Apprendre à{' '}
        <strong>créer un skill Claude AI</strong> évite de recoller les mêmes prompts à chaque dossier.
      </p>

      <ol className="mt-8 list-none space-y-6 p-0">
        {steps.map((step, i) => (
          <li key={step.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Étape {i + 1}</p>
            <h3 className="mt-1 font-display text-lg font-bold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">{step.text}</p>
            <p className="mt-2 text-sm font-medium text-slate-800">{step.exemple}</p>
          </li>
        ))}
      </ol>

      <div className="relative mt-8 rounded-2xl border border-[var(--accent)]/25 bg-[#F2F4F8] p-4 shadow-sm md:p-5">
        <div className="absolute right-3 top-3">
          <CopyPromptButton text={SKILL_TEMPLATE} />
        </div>
        <p className="pr-14 font-display text-sm font-semibold text-slate-900">Modèle à copier (skill BTP)</p>
        <p className="mt-1 text-xs text-slate-600">
          Collez ce squelette dans votre skill ou projet Claude — adaptez les champs entre crochets.
        </p>
        <pre className="mt-4 whitespace-pre-wrap break-words border-l-4 border-[#377CF3] pl-3 font-mono text-xs leading-relaxed text-slate-800 md:text-sm">
          {SKILL_TEMPLATE}
        </pre>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/90 p-4 md:p-5">
        <h3 className="font-display text-lg font-bold text-slate-900">Exemple : compte rendu de chantier</h3>
        <p className="mt-2 max-w-3xl text-sm text-slate-700 leading-relaxed">
          Vous enregistrez un skill « CR chantier » avec votre rôle, le type de chantiers et le format tableau
          d’actions. Après la réunion, vous dictez ou collez des notes brutes : le skill applique la même structure à
          chaque fois — idéal pour l’<strong>IA chantier</strong> au quotidien.
        </p>
        <p className="mt-3 text-sm text-slate-700 leading-relaxed">
          <span className="font-semibold text-slate-900">Utilisation :</span> ouvrir la conversation ou le projet lié au
          skill → coller les notes → demander « applique le skill CR chantier » (ou l’équivalent dans votre interface).
        </p>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <h3 className="font-display text-lg font-bold text-slate-900">Pourquoi ça change tout dans le BTP</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 leading-relaxed">
          <li>
            <strong className="font-semibold text-slate-900">Temps :</strong> moins de reformulations, moins d’erreurs de
            structure entre deux chantiers.
          </li>
          <li>
            <strong className="font-semibold text-slate-900">Exploitation :</strong> livrables lisibles par l’équipe et
            les clients — même présentation du devis au compte rendu.
          </li>
        </ul>
      </div>
    </section>
  );
}
