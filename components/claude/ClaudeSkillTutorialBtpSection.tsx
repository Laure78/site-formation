import Link from 'next/link';
import { BookOpen, Compass, FileStack, LayoutList, Target } from 'lucide-react';
import { CopyPromptButton } from '@/components/CopyPromptButton';
import { LINKS } from '@/lib/internal-links';

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

/**
 * Tutoriel skill Claude BTP — parcours 4 étapes + modèle à copier premium.
 */
export function ClaudeSkillTutorialBtpSection() {
  return (
    <section
      className="scroll-mt-24"
      aria-labelledby="tutoriel-skill-claude-btp-heading"
      id="tutoriel-skill-claude-btp"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2
          id="tutoriel-skill-claude-btp-heading"
          className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
        >
          Créer un skill dans Claude AI (tutoriel BTP)
        </h2>
        <p className="max-w-md text-sm text-[#64748B]">Rôle, contexte, mission — le même cadrage pour chaque dossier.</p>
      </div>

      <p className="mt-6 max-w-3xl text-lg italic leading-relaxed text-[#475569] md:text-xl">
        Un <strong className="font-semibold not-italic text-[#0F172A]">skill</strong> Claude, c’est une consigne
        enregistrée que vous réutilisez sans tout retaper — idéal pour{' '}
        <strong className="font-semibold not-italic text-[#0F172A]">CR, devis et emails</strong> au quotidien chantier.
      </p>

      {/* Desktop : 4 colonnes + connecteur horizontal */}
      <div className="relative mt-12 hidden lg:block">
        <div
          className="pointer-events-none absolute left-[6%] right-[6%] top-[28px] h-px bg-gradient-to-r from-[#BFDBFE] via-[#377CF3]/40 to-[#BFDBFE]"
          aria-hidden
        />
        <ol className="relative grid list-none grid-cols-4 gap-4 p-0">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col">
              <div className="flex justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#377CF3] text-lg font-bold text-white shadow-md">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-center font-display text-lg font-bold text-[#0F172A]">{step.title}</h3>
              <p className="mt-2 text-center text-[15px] leading-relaxed text-[#475569]">{step.text}</p>
              <div className="mt-3 rounded-xl border border-[#E2E8F0] border-l-[3px] border-l-[#377CF3] bg-[#F1F5F9] p-3 text-left text-sm leading-relaxed text-[#334155]">
                {step.exemple}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile / tablette : timeline verticale */}
      <ol className="relative mt-10 space-y-6 border-l-2 border-[#BFDBFE] pl-6 lg:hidden">
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <span className="absolute -left-[31px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#377CF3] text-sm font-bold text-white shadow-md">
              {i + 1}
            </span>
            <h3 className="font-display text-lg font-bold text-[#0F172A]">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#475569]">{step.text}</p>
            <div className="mt-3 max-w-xl rounded-xl border border-[#E2E8F0] border-l-[3px] border-l-[#377CF3] bg-[#F1F5F9] p-3 text-sm leading-relaxed text-[#334155]">
              {step.exemple}
            </div>
          </li>
        ))}
      </ol>

      <div className="relative mt-10 overflow-hidden rounded-2xl border border-[#377CF3]/25 bg-[#0F172A] p-5 shadow-[0_12px_40px_rgba(15,23,42,0.2)] md:p-7">
        <div className="absolute right-3 top-3 z-10">
          <CopyPromptButton
            text={SKILL_TEMPLATE}
            className="border-[#334155] bg-[#1E293B] text-[#E2E8F0] hover:bg-[#334155]"
          />
        </div>
        <div className="flex items-center gap-2 pr-20">
          <BookOpen className="h-5 w-5 shrink-0 text-[#60A5FA]" aria-hidden />
          <p className="font-display text-sm font-semibold text-white">Modèle à copier (skill BTP)</p>
        </div>
        <p className="mt-1 text-xs text-[#94A3B8]">Adaptez les champs entre crochets — collez dans votre skill ou projet Claude.</p>
        <pre className="mt-4 max-h-[min(70vh,520px)] overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-[#E2E8F0] md:text-sm">
          {SKILL_TEMPLATE}
        </pre>
      </div>

      <div className="mt-6 rounded-xl border-l-4 border-[#377CF3] bg-[#EFF6FF] p-4 md:p-5">
        <p className="font-display text-sm font-bold text-[#0F172A]">Guide offert pour aller plus loin</p>
        <p className="mt-2 text-sm leading-relaxed text-[#475569]">
          Le guide « Créez votre 1er Skill IA » — 8 pages, 5 cas d&apos;usage BTP, modèle universel à copier-coller.
        </p>
        <Link
          href={LINKS.skillIaConducteurTravaux}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2563eb]"
        >
          Télécharger le guide gratuit
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm md:p-6">
          <h3 className="font-display text-lg font-bold text-[#0F172A]">Exemple : compte rendu de chantier</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
            Skill « CR chantier » avec rôle, type de chantiers et format tableau d’actions — vous collez les notes brutes,
            la structure reste homogène.
          </p>
        </div>
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 md:p-6">
          <h3 className="font-display text-lg font-bold text-[#0F172A]">Pourquoi c’est décisif</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#64748B]">
            <li>
              <span className="font-semibold text-[#0F172A]">Temps :</span> moins de reformulations entre chantiers.
            </li>
            <li>
              <span className="font-semibold text-[#0F172A]">Livrables :</span> présentation cohérente du devis au CR.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
