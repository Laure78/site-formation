import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import {
  createPageMetadata,
  getFAQSchema,
  SITE_CONFIG,
  siteHasPublicPhone,
  sitePhoneDisplaySuffix,
} from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { InlinePublicPhoneLink, PublicPhoneCta } from '@/components/PublicPhoneCta';

const PATH = '/formation-ia-plaquiste-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Plaquiste Plâtrier BTP Île-de-France — Laure Olivié',
  description:
    'Formation IA ChatGPT pour plaquistes. Automatisez devis doublage, cloisons BA13, métrages, plans de chantier. Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA plaquiste BTP',
    'ChatGPT devis BA13',
    'IA métrage doublage',
    'devis cloisons sèches IA',
    'formation IA Île-de-France BTP',
    'plaquiste plâtrier assistant IA',
    'OPCO Constructys plaquiste',
    'Qualiopi plaquisterie',
  ],
  openGraphType: 'article',
});

const PROMPT_BAREME = `Tu es expert plaquiste. Voici mon barème indicatif Île-de-France (à compléter avec mes prix d’achat réels) :

FOURNITURES (prix unitaire) :
- Plaque BA13 standard 1,20 × 2,50 m : [X €]
- Plaque haute dureté / phonique selon gamme : [X €]
- Isolant (laine minérale, etc.) : [X € / plaque ou m²]
- Ossature métallique (profilés) : [X € / m linéaire]
- Consommables (vis, bandes…) : selon chantier
- Enduit de joint + ponçage : [X € / m²] ou forfait

MAIN-D’ŒUVRE :
- Pose ossature + isolant : [X €/h]
- Pose plaques : [X €/h]
- Joints + enduit : [X €/h]
- Rendement indicatif : à ajuster selon complexité

FRAIS :
- Déplacement : [X €]

Quand je te donne surfaces et spécifications, génère un brouillon de devis (fournitures + MO + frais). Je valide quantités et montants avant envoi.`;

const PROMPT_PLAN_CHANTIER = `Quand je te donne les dimensions de pièce et le type de doublage / cloisonnement, produis une fiche chantier structurée (texte) :

1. Dimensions et surfaces à traiter
2. Surface totale de doublage / cloisons (hypothèses indiquées)
3. Ordre de grandeur de plaques (format standard 1,20 × 2,50 m) avec taux de chutes que je précise
4. Besoins isolant / ossature en ordre de grandeur si je les donne
5. Points de vigilance (ouvertures, zones humides, appareillages à prévoir)
6. Délai de pose indicatif

Rappel : pas de plan CAO — je valide sur place avec mes habitudes de pose et le DT/notice produits.`;

const PROMPT_TROIS_VARIANTES = `Je dois proposer 3 options pour un même chantier (surface [X] m² environ).

Option 1 : [gammes économiques]
Option 2 : [durabilité / usage courant]
Option 3 : [performance acoustique ou technique si besoin]

Génère 3 brouillons de devis comparatifs : écarts de prix indicatifs, avantages/inconvénients. Les montants reprennent mon barème si je l’ai fourni.`;

const PROMPT_FAQ_CLIENT = `Mes questions clients les plus fréquentes. Rédige une réponse courte (60–80 mots), professionnelle, sans prix chiffré si je ne les ai pas donnés :

1. Tarif au m² pour doublage ?
2. Durée pour traiter une pièce d’environ X m² ?
3. Finitions : peinture incluse ou non ?
4. BA13 et pièces humides (principes, renvoi vers étude sur place)
5. Performance acoustique des gammes « phoniques » (rappel général)
6. Déplacement d’appareillages électriques (préciser que c’est selon devis électricien ou coordination)
7. Support avant pose (papier peint, etc.)
8. Délai pour établir un devis ?`;

const PROMPT_RELEVE = `Après une visite, je te transmets cotes brutes et observations (état des murs, zones humides, accès).
Tu génères un brief chantier : surfaces estimées, besoins en plaques et accessoires en ordre de grandeur, heures de pose indicatives, points à clarifier avant signature.
Je reste seul responsable des mesures et du choix des systèmes (DTU, notices fabricants).`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT calcule-t-il correctement le métrage BA13 avec chutes et recouvrements ?',
    a: "Sur la base de ce que vous saisissez (dimensions, taux de chutes, formats de plaques), l'IA peut proposer un ordre de grandeur de quantités. Elle peut se tromper sur les découpes réelles ou oublier une réservation : relisez toujours avec votre méthode de pose et le chantier.",
  },
  {
    q: 'Comment gérer des contraintes de pose (linteaux, passages de portes) ?',
    a: "Vous intégrez ces contraintes dans le prompt : l'IA peut alors intégrer vos notes dans le descriptif ou le mémo. Le geste technique et la conformité restent votre expertise.",
  },
  {
    q: 'Comment financer la formation ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi ; le financement Constructys dépend de votre statut, de votre branche et des règles du plan de développement des compétences. Nous étudions votre dossier avec vous — aucun engagement de prise en charge à 100 % sans analyse d'éligibilité.",
  },
  {
    q: 'Mes clients verront-ils que j’utilise ChatGPT ?',
    a: "Non si vous reprenez le texte dans votre modèle de devis (logo, CGV). L'IA produit un brouillon : le document final doit refléter votre entreprise.",
  },
  {
    q: 'Et la confidentialité des tarifs ?',
    a: "Limitez les données sensibles dans les outils non maîtrisés ; préférez des comptes professionnels ou des barèmes arrondis dans les prompts si besoin.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : devis BA13 et métrages chronophages' },
  { href: '#la-solution', label: 'La solution : l’IA adaptée aux plaquistes' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des plaquistes sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaPlaquisteBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="mb-8 text-sm text-slate-600">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA plaquiste BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour plaquistes plâtriers —{' '}
          <span className="text-[var(--accent)]">gagnez environ 3 h par semaine</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Automatisez <strong>devis doublage</strong>, <strong>métrages BA13</strong> et <strong>briefs chantier</strong> avec
          ChatGPT — <strong>Île-de-France</strong>. Formation <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer devis, quantitatifs et réponses clients à partir de vos barèmes ; elle ne remplace pas la
            prise de cotes sur place ni le respect des DTU / notices et systèmes constructifs validés pour le projet.
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
            Le problème : devis BA13 et métrages mangent votre temps
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes plaquiste (plâtrier) en Île-de-France. Chaque semaine, une partie du temps part sur l’étude de prix et
            la rédaction plutôt que sur la pose.
          </p>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-700 leading-relaxed">
            <li>
              <strong>Devis doublage / cloisons</strong> — surfaces, types de plaques, isolant, ossatures, consommables,
              heures : tout doit être détaillé et présenté proprement.
            </li>
            <li>
              <strong>Métrages BA13</strong> — pièce par pièce, réservations, formats de plaques et chutes : fastidieux.
            </li>
            <li>
              <strong>Variantes</strong> — le client compare souvent plusieurs gammes : autant de brouillons à produire.
            </li>
            <li>
              <strong>Brief chantier</strong> — compte rendu structuré (dimensions, points d’attention, délais) pour
              l’équipe ou le donneur d’ordre.
            </li>
            <li>
              <strong>Questions récurrentes</strong> — prix au m², délais, pièces humides, finitions : les mêmes explications
              à reformuler.
            </li>
          </ol>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Conséquence :</strong> plusieurs heures par semaine sur l’administratif peuvent retarder les réponses et
            limiter le nombre de dossiers traités.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA adaptée aux plaquistes
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L’IA ne pose pas les plaques — elle peut accélérer la <strong>rédaction</strong> de devis, la{' '}
            <strong>structuration</strong> des quantitatifs et les <strong>variantes</strong> à partir de vos données.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>1. Brouillon de devis</strong> — vous décrivez surfaces, systèmes et barème : structure de devis
                fournitures + MO — à valider avant signature.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>2. Fiche chantier textuelle</strong> — dimensions et hypothèses : surfaces, ordre de grandeur de
                plaques, points de vigilance — pas de plan CAO : à croiser avec le relevé réel.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>3. Variantes comparées</strong> — une requête pour plusieurs gammes (standard, renforcé, phonique)
                avec écarts expliqués.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>4. Réponses types</strong> — base de textes courts pour les questions fréquentes, à personnaliser.
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
            — adaptation de ChatGPT au métier plaquiste (devis, métrages, briefs), financement Constructys.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : 5 étapes avec prompts ChatGPT
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : codifier votre barème BA13
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_BAREME}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : fiche « plan » chantier (texte structuré)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_PLAN_CHANTIER}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : trois variantes comparées
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_TROIS_VARIANTES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : réponses aux questions fréquentes
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FAQ_CLIENT}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 5 : relevé de visite → brief
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_RELEVE}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur observés en formation — variables selon le volume de devis et le temps de relecture :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps avant et après usage de l’IA</caption>
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
                  <td className="p-3">Devis doublage BA13</td>
                  <td className="p-3">~15–25 min</td>
                  <td className="p-3">~quelques min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Fiche chantier + métrage</td>
                  <td className="p-3">~30–40 min</td>
                  <td className="p-3">~5 min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">3 variantes</td>
                  <td className="p-3">~45–60 min</td>
                  <td className="p-3">~10 min</td>
                  <td className="p-3">Très fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Réponse type client</td>
                  <td className="p-3">~5–10 min</td>
                  <td className="p-3">~1 min</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50 font-medium">
                  <td className="p-3">Synthèse hebdomadaire</td>
                  <td className="p-3">Plusieurs h</td>
                  <td className="p-3">Réduit</td>
                  <td className="p-3">Souvent ~3 h / sem. (variable)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain d’heures ou de chiffre d’affaires n’est garanti.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Les devis doublage me prenaient trop de temps au bureau. Avec un brouillon ChatGPT que je corrige, j’envoie
              beaucoup plus vite — surtout quand le client veut comparer plusieurs gammes. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Plaquiste, Île-de-France (témoignage de formation)
            </footer>
          </blockquote>

          <p className="mt-8 text-slate-600 leading-relaxed">
            <a href="#rdv" className="text-[var(--accent)] font-medium underline hover:no-underline">
              Réservez une visio découverte gratuite
            </a>{' '}
            pour voir des cas types sur vos devis.
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — questions des plaquistes sur l’IA
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

        <section id="a-propos" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Qui est Laure Olivié ?</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Laure Olivié</strong> est formatrice IA et ChatGPT spécialisée <strong>BTP</strong>. Elle dirige{' '}
            <strong>OFC Création d’Entreprise</strong>, certifié <strong>Qualiopi</strong>, avec financements possibles{' '}
            <strong>Constructys</strong> et <strong>FSE+</strong> selon règles en vigueur.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L’organisme a formé plus de <strong>{SITE_CONFIG.statsPersonnesFormees} professionnels</strong> du bâtiment.{' '}
            <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE,
            etc. <strong>Satisfaction moyenne :</strong> 4,85/5.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Les parcours plaquisterie restent <strong>100 % pratiques</strong> sur cas réels — avec validation systématique des
            quantités et des systèmes par le professionnel.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Plaquiste en Île-de-France : voir comment structurer devis et métrages BA13 plus vite — sans engagement.
          </p>
          <ul className="mt-6 space-y-2 text-blue-100">
            <li>Démonstration : brouillon de devis doublage à partir de votre barème</li>
            <li>Les 5 prompts les plus utiles au quotidien</li>
            <li>Financement Constructys et formats 1 ou 2 jours (inter / intra)</li>
          </ul>
          <p className="mt-6 text-blue-100 text-sm">
            Équipe :{' '}
            <InlinePublicPhoneLink className="underline hover:text-white" />
            {siteHasPublicPhone() ? ' · ' : ''}
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RdvLink
              id="cta-calendly"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Choisir un créneau
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

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formation-ia-charpentier-btp', label: 'Formation IA charpentier BTP' },
            { href: '/formation-ia-plombier-btp', label: 'Formation IA plombier chauffagiste' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
