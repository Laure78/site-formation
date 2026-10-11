import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { LINKS } from '@/lib/internal-links';
import { buildMetierAllerPlusLoinLinks } from '@/lib/metier-aller-plus-loin';
import { CTA_RDV_LABEL, CtaRdv } from '@/components/CtaRdv';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { PreuveSociale } from '@/components/PreuveSociale';
import { LiensConnexes } from '@/components/LiensConnexes';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { JsonLd } from '@/components/JsonLd';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';

import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';

export const revalidate = 3600;
const PATH = '/formation-ia-ferrailleur-btp';

export const metadata = createMetierBtpPageMetadata('ferrailleur', {
  title: 'IA ferrailleur : plans, devis et bons de commande',
  description:
    'Formation IA ferrailleur BTP : structurer plans, devis et bons de commande acier, sous relecture métier. Formation IA pour le BTP. Présentiel IDF, Qualiopi.',
  descriptionFinal: true,
  path: PATH,
  keywords: [
    'formation IA ferrailleur BTP',
    'ChatGPT ferraillage BTP',
    'IA devis ferraillage',
    'assistant IA armaturier',
    'formation IA Île-de-France BTP',
    'OPCO Constructys ferrailleur',
    'Qualiopi ferraillage',
  ],
  openGraphType: 'website',
});

/** Prompt documentaire — pas de calcul de tonnage ni de chutes inventées par l’IA. */
const PROMPT_FERRAILLAGE = `Tu es assistant documentaire pour un ferrailleur / armaturier BTP.
À partir des éléments que je décris (extrait de plan BET, notes chantier), tu structures un dossier de travail — tu ne calcules pas de tonnage, tu n’inventes pas de diamètres, d’espacements ni de chutes.

ÉLÉMENT / ZONE : [dalle, poutre, poteau, voile…]
SOURCE : [réf. plan BET / révision / date]
DONNÉES FOURNIES PAR MOI (recopier, ne pas compléter) :
- Diamètres / types : […]
- Espacements / nappes : […]
- Quantités ou tonnages déjà validés par moi ou le BET : […]
- Points d’attention chantier : […]

LIVRABLES (brouillon uniquement) :
1) Checklist des familles d’armatures à suivre (grille HA, chaînes, renforts…)
2) Tableau vide à remplir : famille | diamètre | quantité/tonnage (à saisir) | fournisseur | statut
3) Points de relecture avant commande (jonctions, surlongueurs, variantes)
4) Brouillon de message fournisseur (sans prix ni quantités inventées)

Rappel : tonnage, conformité Eurocode/DTU et engagement commercial = validation professionnelle / BET.`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT peut-il calculer le tonnage d’armatures à ma place ?',
    a: 'Non de façon fiable pour un engagement. L’IA peut structurer une checklist et un tableau à partir des données que vous saisissez ; le tonnage, les chutes et la conformité restent à votre charge ou à celle du BET.',
  },
  {
    q: 'À quoi sert l’IA pour un ferrailleur alors ?',
    a: 'À gagner du temps sur la mise en forme : synthèse de plan décrit, brouillon de devis à partir de vos lignes, bons de commande structurés, suivi des variantes — toujours sous relecture métier.',
  },
  {
    q: 'L’IA connaît les règles DTU / Eurocodes pour le ferraillage ?',
    a: 'Elle peut reformuler des rappels généraux. Toujours croiser avec les textes en vigueur et le plan de ferraillage validé : l’IA peut halluciner une règle.',
  },
  {
    q: 'Et si le plan de ferraillage change en cours de chantier ?',
    a: 'Vous mettez à jour votre dossier documentaire (prompt + tableaux) avec les nouvelles données validées. L’IA aide à reformuler l’avenant ou le bon de commande — pas à recalculer à l’aveugle.',
  },
  {
    q: 'Quelle formation si je suis plutôt gros œuvre que ferraillage pur ?',
    a: 'La formation IA gros œuvre BTP (lien en bas de page) couvre un angle plus large : béton, planning et documents de chantier. Ici l’angle reste ferraillage / armatures.',
  },
  {
    q: 'Ma formation IA est-elle finançable si je suis ferrailleur (OPCO BTP) ?',
    a: "OFC Création d'Entreprise est un organisme certifié Qualiopi ; le financement Constructys dépend de votre statut, de votre branche et des règles du plan de développement des compétences. Nous étudions votre dossier avec vous — aucune garantie de prise en charge intégrale sans analyse d'éligibilité.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : paperasse et plans à structurer' },
  { href: '#la-solution', label: 'La solution : l’IA documentaire pour ferrailleurs' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des ferrailleurs sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
];

export default function FormationIaFerrailleurBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd id="schema-faq-page" schema={faqSchema} />

      <nav className="mb-8 text-sm text-slate-600">
        <Link href={LINKS.home} className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href={LINKS.formations} className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA ferrailleur BTP</span>
      </nav>

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour ferrailleurs / armaturiers —{' '}
          <span className="text-[var(--accent)]">plans, devis et bons de commande</span>
        </h1>
        <PreuveSociale className="mt-6" />
        <p className="mt-6 text-xl text-slate-600">
          Structurez <strong>synthèses de plans</strong>, <strong>brouillons de devis</strong> et{' '}
          <strong>bons de commande</strong> acier avec ChatGPT — <strong>présentiel en Île-de-France</strong>. Formation
          dispensée par un organisme certifié <strong>Qualiopi</strong> — financement OPCO possible selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide les ferrailleurs à structurer dossiers, tableaux et devis à partir de vos données validées ; elle ne
            remplace ni le bureau d’études ni le calcul de tonnage engageant, ni la conformité Eurocodes / DTU. Gain de
            temps sur la mise en forme et les itérations — sous votre responsabilité technique.
          </ShortAnswerBlock>
        </div>

        <nav
          aria-label="Sommaire"
          className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
        >
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
            {SOMMAIRE.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-[var(--accent)] underline hover:no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le problème : paperasse et plans à structurer
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes ferrailleur, armaturier ou chef de ferraillage. Sur chantier, la précision est non négociable :
            diamètres, espacements, pliage, pose. Le tonnage engageant et la conformité restent du ressort du plan BET et
            de votre validation — pas d’un outil grand public.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            En parallèle, chaque semaine : <strong>lire les plans structure</strong> (PDF / DWG),{' '}
            <strong>mettre en forme devis et factures</strong>, <strong>préparer bons de commande</strong>,{' '}
            <strong>suivre variantes et avenants</strong> quand le plan évolue.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            C’est souvent ce travail documentaire — le soir après la pose — qui ralentit les dossiers, plus que la pose
            elle-même. Une synthèse mal structurée ou un devis incomplet fait perdre du temps à toute l’équipe.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            En Île-de-France et Grand Paris, les gros chantiers s’enchaînent. Sans trames stables, vous peinez à suivre
            plusieurs dossiers en parallèle sans vous noyer dans l’administratif.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>La solution ?</strong> Utiliser l’IA comme assistant documentaire pour structurer plans décrits,
            tableaux et brouillons de devis — tout en gardant le calcul de tonnage et la validation métier de votre côté.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA documentaire pour ferrailleurs
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT sert d’assistant pour organiser checklists, tableaux et brouillons à partir des paramètres que vous
            saisissez — pas pour se substituer au bureau d’études, ni pour inventer un tonnage ou des chutes.
          </p>
          <p className="mt-4 font-medium text-slate-900">Quatre cas d’usage concrets travaillés en formation :</p>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>1. Synthèse documentaire d’un plan de ferraillage</strong> — vous décrivez l’élément et les
                armatures lues sur le plan BET. L’IA propose une checklist par famille (grillage, chaînes, renforts) et un
                tableau à compléter avec vos quantités validées — à <strong>relire avant commande</strong>.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>2. Brouillon de devis à partir de vos lignes</strong> — vous fournissez tonnage / prix / postes déjà
                validés. L’IA met en page la ventilation (diamètres, matière, façonnage, pose) — sous votre validation
                commerciale et technique.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>3. Mise à jour de barème et reformulation</strong> — vous centralisez votre tarif kg dans un modèle
                réutilisable : quand le cours change, vous actualisez vos brouillons plus vite — sans oublier de revalider
                les hypothèses.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>4. Bons de commande structurés</strong> — à partir des quantités que vous avez validées, l’IA
                propose un document clair pour le fournisseur (diamètres, longueurs, quantités, délai), après relecture.
              </span>
            </li>
          </ul>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <CtaRdv variant="inline" origin="page-inline-rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline" />{' '}
            — Laure vous montre comment l’IA structure un dossier ferraillage et un devis sur un cas type, financement
            Constructys selon éligibilité, programme catalogue associé.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : structurer un dossier ferraillage avec l’IA
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : créer votre template documentaire (prompt réutilisable)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FERRAILLAGE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : récupérer le plan de ferraillage
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Plan du BET : généralement PDF ou DWG. Vous en tirez les éléments utiles à la description textuelle — sans
            demander à l’IA d’inventer ce qui n’est pas sur le plan.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : remplir le prompt section par section
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vous listez chaque élément (dalles, poutres, poteaux…) avec les armatures lues. Les quantités et tonnages
            restent ceux que vous (ou le BET) avez validés.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : générer checklist, tableau et brouillon de devis
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            L’IA produit des tableaux et un brouillon à <strong>vérifier systématiquement</strong> (unités, recoupements,
            surlongueurs, zones de jonction). Aucun total inventé ne doit partir tel quel en commande.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 5 : adapter, valider, signer
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vous intégrez la réalité terrain (variantes, avenants), vous exportez vers Word ou votre outil métier si besoin.
            Le devis signé engage votre entreprise : l’IA est un outil d’aide, pas une validation réglementaire automatique.
          </p>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Effets observés en formation avec des ferrailleurs en Île-de-France — variables selon l’entreprise et le volume
            de dossiers. L’IA accélère surtout la mise en forme ; le calcul engageant reste humain.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">Usages IA documentaires sur tâches ferraillage</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Rôle de l’IA</th>
                  <th className="p-3 font-semibold text-slate-900">Votre validation</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Synthèse plan de ferraillage</td>
                  <td className="p-3">Checklist et structure</td>
                  <td className="p-3">Lecture plan BET</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Tonnage / quantités</td>
                  <td className="p-3">Tableau à compléter</td>
                  <td className="p-3">Calcul métier / BET</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Brouillon devis ferraillage</td>
                  <td className="p-3">Mise en page des postes</td>
                  <td className="p-3">Prix, marges, engagement</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Bons de commande</td>
                  <td className="p-3">Document structuré</td>
                  <td className="p-3">Quantités et délais</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-3">Variantes / avenants</td>
                  <td className="p-3">Reformulation claire</td>
                  <td className="p-3">Impacts chantier</td>
                </tr>
              </tbody>
            </table>
          </div>
          <DisclaimerGains className="mt-4" />
          <p className="mt-6 text-slate-600 leading-relaxed">
            En libérant du temps sur la paperasse, certaines équipes suivent plus sereinement plusieurs dossiers en
            parallèle — à confirmer selon votre organisation. Aucun résultat CA ou marge n’est garanti.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Avant je perdais du temps à reformater plans et devis. Maintenant ChatGPT m’aide à structurer le dossier —
              le tonnage, je le valide toujours de mon côté. Sur l’administratif, la différence est nette. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Chef ferraillage, FFB Île-de-France (témoignage de formation)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — questions des ferrailleurs sur l’IA
          </h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed"><FAQAnswer content={a} /></p>
              </div>
            ))}
          </div>
        </section>

        <LaureOlivieFormationPortrait />
<section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Ferrailleur, armaturier ou chef de ferraillage en Île-de-France : vérifier si l’IA vous fait gagner du temps sur
            la structuration des plans, devis et bons de commande — sans engagement.
          </p>
          <ul className="mt-6 space-y-2 text-blue-100">
            <li>Comment ChatGPT structure un dossier ferraillage décrit en direct (checklist par famille d’armatures)</li>
            <li>Parcours type pour un brouillon de devis — toujours sous votre validation</li>
            <li>Financement Constructys selon éligibilité et format catalogue</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <RdvLink
              id="cta-calendly"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
             />
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
            <Link
              href={LINKS.contact}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-lg font-bold text-slate-900">OFC Création d’Entreprise</h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            SIRET {SITE_CONFIG.siret} · NDA 11788515078 · Organisme certifié Qualiopi · Financement OPCO Constructys selon éligibilité
            règles en vigueur · {SITE_CONFIG.geo.streetAddress}, {SITE_CONFIG.geo.postalCode} {SITE_CONFIG.geo.city} ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()} ·{' '}
            <a href={SITE_CONFIG.url} className="text-[var(--accent)] hover:underline">
              www.laureolivie.fr
            </a>
          </p>
        </section>

        <LiensConnexes
          currentPath={PATH}
          excludeHrefs={[
            LINKS.formations,
            LINKS.formationIaGrosOeuvreBtp,
            LINKS.formationIaMaconBtp,
            LINKS.financement,
          ]}
          />

        <AllerPlusLoin
          links={buildMetierAllerPlusLoinLinks(
            [
            { href: LINKS.formationIaGrosOeuvreBtp, label: 'Formation IA gros œuvre BTP' },
            { href: LINKS.formationIaMaconBtp, label: 'Formation IA maçon BTP' },
            ],
            { rdvLabel: CTA_RDV_LABEL },
          )}
        />

        <RenvoiFicheCatalogue programmeRef="NIV-01" />
      </article>
    </div>
  );
}
