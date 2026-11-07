import Link from 'next/link';
import { ArrowRight, BarChart3, Layers, Shield, Sparkles } from 'lucide-react';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';
import { RessourcesMaquetteSectionTitle } from '@/components/ressources/RessourcesMaquetteSectionTitle';

/** Blocs « prêtes à l'emploi » + bandeau bleu clair. */
export function RessourcesHubValueSections() {
  return (
    <div className="mx-auto max-w-[80rem] space-y-14 px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
      <section aria-labelledby="ressources-pretes-title">
        <RessourcesMaquetteSectionTitle
          id="ressources-pretes-title"
          title="Des ressources prêtes à l'emploi"
          description="Guides, prompts et méthodes pour gagner du temps sur vos documents BTP — avec validation humaine des livrables."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: BarChart3,
              titre: 'Guides métier concrets',
              texte:
                'Supports utiles pour les dirigeants, chargés d’affaires, conducteurs de travaux et chefs de chantier.',
            },
            {
              icon: Layers,
              titre: 'Prompts et méthodes',
              texte: 'Exemples directement utilisables pour gagner du temps sur les documents BTP.',
            },
            {
              icon: Sparkles,
              titre: 'IA maîtrisée',
              texte: 'Usages concrets avec contrôle humain et vérification des livrables.',
            },
          ].map((card) => (
            <div
              key={card.titre}
              className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm ring-1 ring-slate-50"
            >
              <span className="inline-flex rounded-xl bg-[#EFF6FF] p-2.5">
                <card.icon className="h-6 w-6 text-[#377CF3]" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-[#101936]">{card.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="ressources-packs-title"
        className="flex flex-col gap-5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 md:flex-row md:items-center md:justify-between md:gap-8"
      >
        <div className="flex min-w-0 gap-4 md:max-w-[58%]">
          <Shield className="mt-0.5 h-8 w-8 shrink-0 text-[#1D4ED8]" aria-hidden />
          <div>
            <h2 id="ressources-packs-title" className="font-display text-lg font-semibold text-[#101936]">
              Guides complets, tutoriels PDF et packs à télécharger
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Consultez en ligne ou téléchargez directement les ressources adaptées à votre métier.
            </p>
          </div>
        </div>
        <Link
          href="#guides-pdf"
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start px-6 py-3 md:self-center`}
        >
          Voir tous les contenus
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
