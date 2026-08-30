import Link from 'next/link';
import { FooterTelOrMailLink } from '@/components/PublicPhoneCta';
import { ClipboardList, Map, Shield, TrendingUp } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { FAQSection } from '@/components/landing/FAQSection';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FormationCourseHero } from '@/components/formations/FormationCourseHero';
import {
  libelleTarifsDualCourt,
  libelleTarifsGrilleLigne,
} from '@/lib/tarifs-sessions';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { JsonLd } from '@/components/JsonLd';
import { MentionTVA } from '@/components/MentionTVA';
import { LINKS } from '@/lib/internal-links';
import { formationHref, getFormationByCode } from '@/data/formations';

const MAIL_PROGRAMME_PME =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Demande de programme — déployer l’IA PME BTP')}`;

const HERO_RESUME = [
  'Cartographier les usages IA utiles et construire une feuille de route de déploiement.',
  `Parcours 7 h ou 14 h — ${libelleTarifsDualCourt(7)} · ${libelleTarifsDualCourt(14)}.`,
  'Présentiel Île-de-France — organisme certifié Qualiopi, financement OPCO possible selon éligibilité.',
  'Charte IA, plan d’action 90 jours et indicateurs de suivi.',
];

const PAGE_META_DESCRIPTION =
  'Déployer l’IA dans une PME BTP : cartographie des usages, charte et plan 90 jours. Parcours 7 h ou 14 h, présentiel IDF, Qualiopi, financement OPCO selon éligibilité.';

export const metadata = createPageMetadata({
  title: 'Déployer l’IA dans une PME BTP',
  description: PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.formationPmeBtp,
  appendAuthorSuffix: false,
  keywords: [
    'déployer IA PME BTP',
    'formation IA entreprise bâtiment',
    'stratégie IA BTP',
    'charte IA BTP',
    'formation IA dirigeants BTP',
  ],
});

const LIVRABLES = [
  {
    icon: Map,
    titre: 'Cartographie des usages',
    desc: 'Tâches chronophages, opportunités IA, matrice besoin / outil.',
  },
  {
    icon: Shield,
    titre: 'Charte & gouvernance',
    desc: 'Règles d’utilisation, données sensibles, validation humaine.',
  },
  {
    icon: ClipboardList,
    titre: 'Plan d’action 90 jours',
    desc: 'Priorisation des workflows, indicateurs et accompagnement adoption.',
  },
  {
    icon: TrendingUp,
    titre: 'Suivi du ROI',
    desc: 'Grille de risques et tableau de bord pour mesurer les progrès.',
  },
] as const;

const FAQ_DEPLOYER = [
  {
    q: 'Quelle durée choisir — 7 h ou 14 h ?',
    a: `Le parcours <strong>7 h</strong> convient pour cadrer les usages prioritaires et produire une feuille de route. Le parcours <strong>14 h</strong> approfondit la charte, les workflows et le plan d’action avec plus de cas entreprise. Tarifs : ${libelleTarifsGrilleLigne(7)} · ${libelleTarifsGrilleLigne(14)}.`,
  },
  {
    q: 'Cette formation est-elle finançable par Constructys ou mon OPCO ?',
    a: 'Financement OPCO possible selon éligibilité (organisme certifié Qualiopi). Plafond pédagogique indicatif : 24 € HT/heure/stagiaire selon barèmes et dossier.',
  },
  {
    q: 'Faut-il déjà utiliser ChatGPT ou Claude en entreprise ?',
    a: `Recommandé d’avoir déjà testé l’IA sur quelques cas concrets. Pour les équipes qui débutent, commencer par la <a href="${formationHref(getFormationByCode('NIV-01')!)}">formation catalogue NIV-01</a> (4 h) reste le meilleur point d’entrée.`,
  },
];

export default function FormationDeployerIaPmeBtpPage() {
  const faqSchema = getFAQSchema(FAQ_DEPLOYER);

  return (
    <div>
      <JsonLd id="schema-faq-deployer-pme" schema={faqSchema} />

      <FormationCourseHero
        refLine="Gamme Déployer · Stratégie & adoption · Qualiopi"
        title="Déployer l’IA dans une PME du BTP"
        subtitle="Cartographie, charte interne et plan d’action à 90 jours"
        badges={['Dirigeants & managers', '7 h ou 14 h', 'Sur mesure entreprise']}
        summaryItems={[...HERO_RESUME]}
        ctas={
          <>
            <RdvLink
              campaign="formations-deployer-pme-hero"
              className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600"
            >
              Cadrer votre projet
            </RdvLink>
            <a
              href={MAIL_PROGRAMME_PME}
              className="rounded-xl border-2 border-slate-200 px-6 py-3.5 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Demander le programme
            </a>
          </>
        }
        footerLinks={
          <>
            <a href="#livrables" className="font-medium text-[var(--accent)] hover:underline">
              Livrables
            </a>
            <a href="#tarifs" className="font-medium text-[var(--accent)] hover:underline">
              Tarifs 7 h / 14 h
            </a>
            <Link
              href={LINKS.formations}
              className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline"
            >
              Catalogue
            </Link>
            <FooterTelOrMailLink className="font-medium text-slate-600 hover:text-[var(--accent)] hover:underline" />
          </>
        }
      >
        <p>
          Pour les <strong>dirigeants, managers et référents transformation</strong> : identifier les
          usages IA réellement utiles, définir les règles internes et construire un{' '}
          <strong>plan de déploiement structuré</strong> — sans promesse de transformation instantanée.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
      </FormationCourseHero>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <section id="livrables" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-slate-900">Livrables du parcours</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {LIVRABLES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.titre}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">{item.titre}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="tarifs" className="mt-14 scroll-mt-24 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">Tarifs 7 h / 14 h</h2>
          <p className="mt-3 text-sm text-slate-600">
            Forfait intra-entreprise ou tarif par participant en interentreprises — devis personnalisé
            selon effectif et niveau d’accompagnement.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li>
              <strong>7 heures :</strong> {libelleTarifsDualCourt(7)}.
            </li>
            <li>
              <strong>14 heures :</strong> {libelleTarifsDualCourt(14)}.
            </li>
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Grille complète (4 h catalogue Qualiopi inclus) :{' '}
            <Link href={`${LINKS.formations}#tarifs-formations-btp`} className="font-medium text-[var(--accent)] hover:underline">
              voir tous les tarifs
            </Link>
            .
          </p>
          <MentionTVA className="mt-4 max-w-3xl" />
        </section>

        <FAQSection
          items={FAQ_DEPLOYER}
          title="Questions fréquentes — Déployer l’IA en PME BTP"
          subtitle="Durée, financement, prérequis."
        />

        <div className="mt-10">
          <RdvLink className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white hover:bg-blue-700">
            Prendre RDV pour cadrer le parcours
          </RdvLink>
        </div>

        <div className="mt-12">
          <AllerPlusLoin
            links={[
              { href: LINKS.formations, label: 'Catalogue formations IA BTP' },
              { href: formationHref(getFormationByCode('NIV-01')!), label: 'Première étape — formation NIV-01 (4 h)' },
              { href: LINKS.formationCursorBtp, label: 'Créer ses outils métier avec Cursor' },
              { href: LINKS.financement, label: 'Financement Constructys' },
              { href: buildSiteCalendlyCtaUrl('formations-deployer-pme-footer'), label: 'Prendre rendez-vous' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
