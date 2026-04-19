'use client';

import Link from 'next/link';
import { Briefcase, Chrome, Code2, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { AnthropicAuthorityLinks } from '@/components/claude/AnthropicAuthorityLinks';
import { ClaudePromptBlock } from '@/components/claude/ClaudePromptBlock';

type Props = { promptProjet: string };

const TABS = [
  { id: 'chat' as const, label: 'Claude Chat', short: 'Chat & Projets', Icon: MessageSquare },
  { id: 'cowork' as const, label: 'Claude Cowork', short: 'Cowork', Icon: Briefcase },
  { id: 'code' as const, label: 'Claude Code', short: 'Code', Icon: Code2 },
  { id: 'chrome' as const, label: 'Claude Chrome', short: 'Chrome', Icon: Chrome },
];

/**
 * Ressources par interface — onglets desktop, accordéon mobile, texte inchangé.
 */
export function ClaudeBtpResourcesSection({ promptProjet }: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('chat');
  const [mobileOpen, setMobileOpen] = useState<string | null>('chat');

  const tabBtn =
    'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

  const panelChat = (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:p-8">
      <h3 className="font-display text-xl font-bold text-[#0F172A]">Claude Chat et Projets</h3>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Workflow</p>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748B]">
        Point d&apos;entrée pour débuter : les <strong className="font-semibold text-[#0F172A]">Projets</strong> stockent
        votre contexte entreprise (métier, zone, certifications) — injecté dans chaque conversation.
      </p>
      <p className="mt-3 max-w-3xl text-sm text-[#64748B]">
        Sans Projet : 5 à 8 minutes perdues à chaque session. Avec un Projet configuré : question opérationnelle directe.
      </p>
      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Exemple</p>
      <ClaudePromptBlock body={promptProjet} />
      <p className="mt-4 text-sm text-[#64748B]">
        <Link href="#cluster" className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
          Projects, Skills et contexte entreprise — ressource dédiée ci-dessous
        </Link>
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Documentation</p>
      <AnthropicAuthorityLinks />
    </div>
  );

  const panelCowork = (
    <div>
      <h3 className="font-display text-xl font-bold text-[#0F172A]">Claude Cowork — agent sur vos fichiers</h3>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Workflow</p>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#64748B]">
        Accès aux dossiers locaux, questions avant action, livrables dans un dossier de sortie — idéal pour volumes
        importants de tâches récurrentes.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          {
            t: 'Workflow DCE',
            d: 'Analyse + synthèse critères + Go/No-Go + plan mémoire — ~8 min vs 2–4 h à la main.',
          },
          {
            t: 'CR de chantier',
            d: 'Depuis notes brutes : en-tête, tableau Quoi/Qui/Délai, réserves — ~3 min.',
          },
          {
            t: 'Veille AO',
            d: 'Tâche planifiée (ex. 7h30), tableau dans le dossier de sortie — veille manuelle quasi nulle.',
          },
        ].map((c) => (
          <div
            key={c.t}
            className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition hover:border-[#BFDBFE] hover:bg-white"
          >
            <p className="font-display text-sm font-bold text-[#0F172A]">{c.t}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{c.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-[#64748B]">
        Workflows détaillés : section « Toutes nos ressources » ci-dessous.
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Documentation</p>
      <AnthropicAuthorityLinks />
    </div>
  );

  const panelCode = (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:p-8">
      <h3 className="font-display text-xl font-bold text-[#0F172A]">Claude Code — sans coder</h3>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Workflow</p>
      <p className="mt-2 max-w-3xl text-sm text-[#64748B]">
        PDF, calculateurs web, traitement Excel — à partir d&apos;une consigne en français.
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Exemple</p>
      <ul className="mt-4 grid gap-2 text-sm text-[#64748B] sm:grid-cols-2">
        <li className="flex gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2">
          <span className="text-[#377CF3]">→</span> Devis PDF depuis bon de mesurage
        </li>
        <li className="flex gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2">
          <span className="text-[#377CF3]">→</span> Calculateur métrés dans le navigateur
        </li>
        <li className="flex gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2">
          <span className="text-[#377CF3]">→</span> Relances impayés depuis Excel
        </li>
        <li className="flex gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2">
          <span className="text-[#377CF3]">→</span> Batch DCE → tableau comparatif Excel
        </li>
      </ul>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Documentation</p>
      <AnthropicAuthorityLinks />
    </div>
  );

  const panelChrome = (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 md:p-8">
      <h3 className="font-display text-xl font-bold text-[#0F172A]">Claude Chrome</h3>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Workflow</p>
      <p className="mt-2 max-w-3xl text-sm text-[#64748B]">
        L&apos;extension analyse les pages ouvertes — veille marchés publics sans télécharger le dossier complet.
      </p>
      <p className="mt-3 text-sm text-[#334155]">
        <strong className="font-semibold">Installation :</strong> Chrome Web Store → « Claude » (Anthropic) → Ajouter →
        connexion au compte.
      </p>
      <ul className="mt-4 space-y-2 text-sm text-[#64748B]">
        <li>• Fiche AO BOAMP — critères en ~30 s</li>
        <li>• DPGF PDF → tableau</li>
        <li>• Email dans Gmail sans changer d&apos;onglet</li>
      </ul>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">Documentation</p>
      <AnthropicAuthorityLinks />
    </div>
  );

  const panels: Record<(typeof TABS)[number]['id'], React.ReactNode> = {
    chat: panelChat,
    cowork: panelCowork,
    code: panelCode,
    chrome: panelChrome,
  };

  return (
    <section className="scroll-mt-24" aria-labelledby="ressources-interfaces">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <h2 id="ressources-interfaces" className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
          Ressources par interface
        </h2>
        <p className="max-w-md text-sm text-[#64748B]">Guides complets — à dérouler selon votre usage.</p>
      </div>

      <div className="mt-8 hidden flex-wrap gap-2 md:flex">
        {TABS.map((t) => {
          const Icon = t.Icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`${tabBtn} ${
                active
                  ? 'bg-[#377CF3] text-white shadow-md'
                  : 'border border-[#E2E8F0] bg-white text-[#377CF3] hover:bg-[#EFF6FF]'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 hidden md:block" role="tabpanel">
        {panels[tab]}
      </div>

      <div className="mt-8 space-y-3 md:hidden">
        {TABS.map((t) => {
          const Icon = t.Icon;
          const open = mobileOpen === t.id;
          return (
            <div key={t.id} className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setMobileOpen(open ? null : t.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                aria-expanded={open}
              >
                <span className="inline-flex items-center gap-2 font-display font-semibold text-[#0F172A]">
                  <Icon className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                  {t.label}
                </span>
                <span className="text-[#377CF3]">{open ? '−' : '+'}</span>
              </button>
              {open ? <div className="border-t border-[#F1F5F9] px-4 py-4">{panels[t.id]}</div> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
