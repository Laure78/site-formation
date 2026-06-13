import Link from 'next/link';
import { ArrowRight, Check, ClipboardList, Download, FileText, MailCheck } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';

const SAMPLE_PROMPT = `ROLE
Tu es conducteur de travaux dans une PME BTP.

CONTEXTE
Je te donne des notes brutes de réunion de chantier.

MISSION
Transformer ces notes en compte rendu exploitable par l'équipe.

FORMAT
En-tête + points clés + tableau Quoi | Qui | Délai | Statut.

RÈGLES
Rester factuel, ne rien inventer, signaler les données manquantes.`;

const SKILLS = [
  {
    title: 'Compte rendu de chantier',
    description: 'CR structuré à partir de notes terrain en quelques minutes.',
    Icon: ClipboardList,
  },
  {
    title: 'Devis client',
    description: 'Brief brut transformé en proposition claire et professionnelle.',
    Icon: FileText,
  },
  {
    title: 'Réponse client',
    description: 'Emails rapides, cadrés et alignés sur votre activité.',
    Icon: MailCheck,
  },
];

const BENEFITS = [
  'Moins de temps sur l’administratif',
  'Livrables plus lisibles pour l’équipe',
  'Réponses clients accélérées',
  'Charge mentale réduite au quotidien',
];

export function ClaudeSkillsLeadMagnetSection() {
  return (
    <section
      className="rounded-[20px] border border-[#BFDBFE] bg-gradient-to-br from-[#EFF6FF] to-white p-6 shadow-[0_8px_40px_rgba(55,124,243,0.08)] md:p-10"
      aria-labelledby="lead-magnet-claude-skills"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[#377CF3]/30 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1E40AF]">
          Ressource gratuite
        </span>
        <span className="rounded-full border border-[#377CF3]/20 bg-[#377CF3]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1E40AF]">
          Accès immédiat
        </span>
      </div>

      <h2
        id="lead-magnet-claude-skills"
        className="mt-5 font-display text-[34px] font-bold leading-tight tracking-tight text-[#1E40AF] md:text-[34px]"
      >
        3 skills Claude AI BTP
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#475569]">
        Automatisez comptes rendus, devis et emails clients. Conçu pour l’IA chantier et l’automatisation BTP, sans
        complexité technique.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {SKILLS.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white/90 p-5 shadow-sm transition hover:border-[#BFDBFE] hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#377CF3]">
              <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
            </div>
            <h3 className="mt-4 font-display text-base font-bold text-[#0F172A]">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748B]">{description}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-[#64748B]">
        Fichier texte à intégrer dans vos projets Claude — un clic pour télécharger.
      </p>

      <Link
        href={LINKS.downloadClaudeSkillsBtp}
        download
        className="mt-4 inline-flex w-full max-w-xl items-center justify-center gap-2 rounded-2xl bg-[#377CF3] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#377CF3]/25 transition hover:scale-[1.02] hover:bg-[#2563eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] md:px-8"
      >
        <Download className="h-5 w-5 shrink-0" aria-hidden />
        Télécharger les 3 skills
        <ArrowRight className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
      </Link>

      <p className="mt-5 inline-flex rounded-full border border-[#BFDBFE] bg-white/90 px-4 py-2 text-sm text-[#475569]">
        Terrain BTP · prêt à copier dans Claude
      </p>

      <div className="mt-10">
        <h3 className="font-display text-lg font-bold text-[#0F172A] md:text-xl">Bénéfices immédiats</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {BENEFITS.map((line) => (
            <li
              key={line}
              className="flex items-start gap-3 rounded-xl border border-[#F1F5F9] bg-white px-4 py-3 text-sm text-[#334155]"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#377CF3]">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
              </span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 md:p-6">
        <h3 className="font-display text-lg font-bold text-[#0F172A]">Exemple de prompt inclus</h3>
        <pre className="mt-4 whitespace-pre-wrap break-words border-l-[3px] border-[#377CF3] pl-3 font-mono text-xs leading-relaxed text-[#334155] md:text-sm">
          {SAMPLE_PROMPT}
        </pre>
      </div>

      <div className="mt-8 rounded-2xl border border-[#BFDBFE] bg-white p-5 md:p-6">
        <h3 className="font-display text-lg font-bold text-[#0F172A]">Méthode terrain</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64748B]">
          Laure Olivié, formatrice BTP : cas d’usage concrets (devis, CR, emails) pour une mise en œuvre immédiate, testée
          avec des équipes chantier et fonctions support.
        </p>
      </div>
    </section>
  );
}
