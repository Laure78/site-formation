import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { VoirAussi } from '@/components/VoirAussi';
import { voirAussiMetierProps } from '@/lib/voir-aussi';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { JsonLd } from '@/components/JsonLd';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';

export const revalidate = 3600;
const PATH = '/formation-ia-ferrailleur-btp';

export const metadata = createMetierBtpPageMetadata('ferrailleur', {
  title: 'Formation IA Ferrailleur BTP Île-de-France',
  description:
    'Optimisez calculs d\'armatures, factures et devis acier-béton avec ChatGPT. Formation IA Qualiopi pour le BTP. Visio découverte gratuite.',
  path: PATH,
  keywords: [
    'formation IA ferrailleur BTP',
    'ChatGPT armatures béton armé',
    'IA tonnage acier ferraillage',
    'devis ferraillage IA',
    'formation IA Île-de-France BTP',
    'armaturier assistant IA',
    'OPCO Constructys ferrailleur',
    'Qualiopi ferraillage',
  ],
  openGraphType: 'article',
});

const PROMPT_FERRAILLAGE = `"Calcule le tonnage d'armatures pour ce ferraillage béton :

DALLE / ÉLÉMENT : [description : dalle, poteau, poutre, voile...]
Dimensions : [longueur x largeur x épaisseur ou diamètre]

ARMATURES :
- Lit inférieur : [diamètre HA + espacement l/l et t/t]
- Lit supérieur : [diamètre HA + espacement l/l et t/t]
- Chaînes/renforts : [HA + espacement + dimensions]
- Armatures d'effort : [treillis ou armatures spéciales si applicable]

DONNÉES :
- Masse volumique acier : 7,85 kg/dm³
- Chutes estimées : 8% (scies, pliages) — à ajuster selon votre chantier
- Prix unitaire acier : [X € le kg] en Île-de-France

CALCULE :
1) Tonnage brut par type d'armature
2) Chutes appliquées
3) Tonnage net à commander
4) Coût matière total
5) Ajoute frais de façonnage : [Y € la tonne]
6) Devis final avec marge 25%

Rappel : tonnage et conformité réglementaire engageant la responsabilité = validation par le professionnel ou le BET selon le projet."`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT peut-il vraiment calculer le tonnage d’armatures sans erreur ?',
    a: "Si vous fournissez des paramètres complets et cohérents (diamètres, espacements, dimensions), l'IA peut produire un brouillon de calcul géométrique utile. Elle peut aussi se tromper ou simplifier à l'excès. Les cas complexes (torsion, renforts particuliers, zones sismiques) exigent votre expertise : relisez systématiquement avant commande ou engagement.",
  },
  {
    q: 'L’IA connaît les règles DTU / Eurocodes pour les espacements d’armatures ?',
    a: "Vous pouvez demander des rappels de principes et des références documentaires. Toujours croiser avec les textes en vigueur, les DTU / Eurocode 2 applicables et le plan de ferraillage validé. L'IA peut halluciner une règle : la validation par un professionnel reste obligatoire.",
  },
  {
    q: 'Comment gérer les chutes d’acier de façon réaliste ?',
    a: "Indiquez un pourcentage de chutes dans le prompt (souvent 7 à 10 % selon façonnage et chantier). Ajustez selon votre retour d'expérience : l'IA applique ce que vous lui donnez, pas la réalité terrain à votre place.",
  },
  {
    q: 'Et si le plan de ferraillage change en cours de chantier ?',
    a: "Vous mettez à jour le prompt avec les nouvelles données : l'IA recalcule un brouillon rapidement. Vous validez les impacts sur tonnage, délais et avenants avant signature.",
  },
  {
    q: 'Faut-il maîtriser la CAO ou le BIM pour utiliser l’IA ?',
    a: "Non pour les usages texte : vous lisez le plan PDF, identifiez les armatures et saisissez les dimensions. Avec un abonnement adapté, certaines interfaces permettent d'appuyer l'analyse sur une image — toujours sous votre contrôle.",
  },
  {
    q: 'Quel est le coût réel de ChatGPT pour un ferrailleur ?',
    a: "Il existe une offre gratuite (limitée) et des abonnements payants selon les besoins (dont vision / fichiers). Comparez le coût mensuel au temps gagné sur les quantitatifs et devis.",
  },
  {
    q: 'Ma formation IA est-elle finançable si je suis ferrailleur (OPCO BTP) ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi ; le financement Constructys dépend de votre statut, de votre branche et des règles du plan de développement des compétences. Nous étudions votre dossier avec vous — aucun engagement de prise en charge à 100 % sans analyse d'éligibilité.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : pourquoi les ferrailleurs perdent du temps' },
  { href: '#la-solution', label: 'La solution : l’IA adaptée aux ferrailleurs' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des ferrailleurs sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaFerrailleurBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd id="schema-faq-page" schema={faqSchema} />

      <nav className="mb-8 text-sm text-slate-600">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA ferrailleur BTP</span>
      </nav>

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour ferrailleurs / armaturiers —{' '}
          <span className="text-[var(--accent)]">gagnez environ 6 h par semaine</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Optimisez <strong>quantitatifs</strong>, <strong>factures</strong> et <strong>devis</strong> acier béton avec ChatGPT —{' '}
          <strong>présentiel en Île-de-France</strong>. Formation <strong>Qualiopi</strong> — financement possible selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide les ferrailleurs à structurer tonnages, tableaux et devis à partir de vos données ; elle ne remplace
            ni le bureau d’études ni la validation des plans et des règles de ferraillage (Eurocodes, DTU applicables).
            Temps gagné sur la mise en forme et les itérations — sous votre responsabilité technique.
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
            Le problème : pourquoi les ferrailleurs perdent du temps
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes ferrailleur, armaturier ou chef de ferraillage. Votre métier exige une grande précision : calcul du
            tonnage d’acier, dimensionnement des armatures (HA, treillis, cadres), respect des diamètres et espacements,
            pliage des barres, coupe d’armatures.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Mais chaque semaine, c’est aussi : <strong>analyser les plans structure</strong> (souvent en PDF ou DWG),{' '}
            <strong>calculer la quantité d’acier</strong> par niveau ou par élément, <strong>établir des factures et devis
            détaillés</strong>, <strong>gérer les variations de prix</strong> de l’acier.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Un ferrailleur passe souvent 7 à 10 heures par semaine</strong> sur les calculs quantitatifs et la
            documentation, souvent le soir après la pose sur chantier.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Le pire ? <strong>Erreurs de calcul = surcoûts ou retards.</strong> Mal estimer le tonnage de cadres pour une
            dalle, c’est soit sur-acheter, soit réapprovisionner en urgence. Un devis qui n’intègre pas les chutes (souvent 7
            à 10 % du tonnage brut selon chantier), c’est de la marge perdue.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            En Île-de-France et Grand Paris, les gros chantiers arrivent régulièrement. Mais entre l’analyse des plans, le
            calcul d’armatures et les factures à établir, vous ne pouvez parfois suivre que peu de gros dossiers en parallèle.{' '}
            <strong>Vous pouvez laisser de l’argent sur la table par manque de temps administratif.</strong>
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>La solution ?</strong> Utiliser l’IA comme assistant pour structurer tonnages, tableaux et devis plus
            vite qu’à la main — tout en gardant la validation métier et le respect du plan de ferraillage validé.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA adaptée aux ferrailleurs
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut servir d’assistant pour structurer quantitatifs, tonnages et brouillons de devis à partir des
            paramètres que vous saisissez — pas pour se substituer au bureau d’études ni à la note de ferraillage signée
            lorsque la réglementation l’exige.
          </p>
          <p className="mt-4 font-medium text-slate-900">Quatre cas d’usage concrets observés en formation :</p>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>1. Analyser un plan de ferraillage et en extraire les quantités</strong> — vous disposez du plan BET
                (PDF ou extrait). Vous décrivez l’élément : par exemple dalle 20 cm, 200 m², grillage HA10 espacé 20 cm en
                l/l et t/t, chaînage HA16, etc. L’IA peut proposer un découpage en tonnages par famille (grillage, chaînes,
                renforts) avec chutes indicatives (ex. 8 %) — à <strong>relire avant commande</strong>. Gain typique : environ
                1 h à 1 h 30 par analyse selon dossiers.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>2. Structurer un devis ferraillage avec tarif tonnage</strong> — vous entrez tonnage et prix du kg
                du jour. L’IA peut générer un brouillon : ventilation par diamètre (HA10, HA12, treillis…), coût matière,
                main-d’œuvre (façonnage + pose), accessoires de chantier, totaux HT/TTC avec marges — souvent en une
                quinzaine de minutes au lieu de plus d’une heure, sous votre validation.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>3. Suivre les variations de prix acier</strong> — vous centralisez votre tarif kg (ou barème) dans un
                prompt ou modèle réutilisable : quand le cours change, vous mettez à jour une fois et vous recalculez vos
                brouillons plus vite — sans oublier de revalider les hypothèses commerciales.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>4. Générer des bons de commande structurés</strong> — à partir du tonnage par type d’armature, l’IA
                peut proposer un document prêt à envoyer à votre fournisseur habituel (diamètres, longueurs, quantités,
                délai), en quelques minutes après relecture.
              </span>
            </li>
          </ul>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — Laure vous montre comment l’IA structure un quantitatif de ferraillage et un devis sur un cas type, financement
            Constructys, programme 1 ou 2 jours.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : automatiser le calcul d’armatures
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : créer votre template de calcul (prompt réutilisable)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FERRAILLAGE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : récupérer le plan de ferraillage
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Plan du BET : généralement PDF ou DWG avec les schémas par étage ou par élément. Vous en tirez les cotes et les
            nappes d’armatures utiles à la description textuelle.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : remplir le prompt section par section
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vous listez chaque élément (dalles, poutres, poteaux…) avec ses armatures. Comptez souvent 10 à 15 minutes pour un
            chantier simple — plus si le dossier est lourd.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : générer tonnage et brouillon de devis
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            L’IA produit des tableaux et des totaux à <strong>vérifier systématiquement</strong> (unités, recoupements,
            surlongueurs, zones de jonction).
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
            Ordres de grandeur observés en formation avec des ferrailleurs en Île-de-France — variables selon l’entreprise et
            le nombre de chantiers suivis :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps avant et après usage de l’IA sur tâches courantes</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Avant IA</th>
                  <th className="p-3 font-semibold text-slate-900">Après IA</th>
                  <th className="p-3 font-semibold text-slate-900">Gain indicatif</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Analyse plan de ferraillage</td>
                  <td className="p-3">~1 h 30</td>
                  <td className="p-3">~5 min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Calcul tonnage total</td>
                  <td className="p-3">~1 h</td>
                  <td className="p-3">~5 min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Génération devis ferraillage</td>
                  <td className="p-3">~1 h 30</td>
                  <td className="p-3">~15 min</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Approvisionnement (bons de commande)</td>
                  <td className="p-3">~1 h</td>
                  <td className="p-3">~10 min</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mise à jour prix sur anciens devis</td>
                  <td className="p-3">~45 min</td>
                  <td className="p-3">Quelques min</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50 font-medium">
                  <td className="p-3">Synthèse (ex. 3 à 4 chantiers / semaine)</td>
                  <td className="p-3">Plusieurs heures</td>
                  <td className="p-3">Réduit fortement</td>
                  <td className="p-3">Variable (souvent plusieurs h / sem.)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Les gains hebdomadaires dépendent du volume de dossiers et du temps de relecture que vous conservez. Aucun
            résultat chiffré (CA, marge) n’est garanti.
          </p>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Effet business possible (non garanti) :</strong> en libérant du temps sur le quantitatif et la paperasse,
            certaines équipes peuvent suivre davantage de chantiers en parallèle ou réallouer des heures sur la pose — à
            confirmer selon votre organisation.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Avant j’analysais les plans à la main, ça prenait des heures. Maintenant je structure le tonnage beaucoup plus
              vite avec ChatGPT — j’ai pu enchaîner deux gros dossiers sans me noyer dans l’administratif. La différence sur
              le temps passé, c’est très net. »
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
            plans et quantitatifs — sans engagement.
          </p>
          <ul className="mt-6 space-y-2 text-blue-100">
            <li>Comment ChatGPT peut structurer un plan de ferraillage décrit en direct (tonnage par famille d’armatures)</li>
            <li>Parcours type pour un brouillon de devis — toujours sous votre validation</li>
            <li>Financement Constructys et format (1 ou 2 jours, inter / intra)</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <RdvLink
              id="cta-calendly"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Réserver un créneau
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
            <Link
              href="/contact"
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
            SIRET {SITE_CONFIG.siret} · NDA 11788515078 · Certifiée Qualiopi · Finançable Constructys, FSE+, OPCO selon
            règles en vigueur · {SITE_CONFIG.geo.streetAddress}, {SITE_CONFIG.geo.postalCode} {SITE_CONFIG.geo.city} ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()} ·{' '}
            <a href={SITE_CONFIG.url} className="text-[var(--accent)] hover:underline">
              www.laureolivie.fr
            </a>
          </p>
        </section>

        <VoirAussi
          {...voirAussiMetierProps({
            currentPath: PATH,
            excludeHrefs: ['/formations', '/formation-ia-charpentier-btp', '/formation-ia-macon-btp', '/financement-constructys-formation-ia-btp'],
          })}
        />

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA pour les pros du BTP' },
            { href: '/formation-ia-charpentier-btp', label: 'Formation IA charpentier BTP' },
            { href: '/formation-ia-macon-btp', label: 'Formation IA maçon BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: buildSiteCalendlyCtaUrl('formation-ia-ferrailleur-btp-footer-rdv'), label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
