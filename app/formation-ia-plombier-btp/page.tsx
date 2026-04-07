import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

const PATH = '/formation-ia-plombier-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Plombier Chauffagiste BTP Île-de-France — Laure Olivié',
  description:
    'Formation IA ChatGPT pour plombiers chauffagistes. Automatisez devis, diagnostic technique, SAV, mémoire technique. Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA plombier BTP',
    'ChatGPT devis plomberie chauffage',
    'IA mémoire technique AO',
    'diagnostic chauffage IA',
    'formation IA Île-de-France BTP',
    'SAV plombier ChatGPT',
    'OPCO Constructys plombier',
    'Qualiopi chauffagiste',
  ],
  openGraphType: 'article',
});

const PROMPT_DEVIS = `Tu es expert en devis plomberie chauffage. Voici mes tarifs indicatifs (à compléter avec mes grilles réelles) :

- Main-d’œuvre chauffagiste : [X €/h]
- Main-d’œuvre plombier : [X €/h]
- Déplacement : [X €]
- Fournitures types : [chaudière, radiateurs, PER, etc. — prix d’achat ou forfaits]

Zone : Île-de-France.

Quand je te décris les travaux, génère un brouillon de devis structuré :
1. En-tête (entreprise, date, objet — je complète coordonnées)
2. Description des travaux (lignes claires)
3. Fournitures (quantités indicatives si je les donne)
4. Main-d’œuvre (heures estimées × taux)
5. Frais annexes (déplacement, urgences si applicable)
6. Totaux HT / TVA selon mon régime — je valide
7. Délai d’intervention indicatif
8. Rappel CGV courtes si je les colle

Je reste responsable des prix, des quantités et de la conformité réglementaire (gaz, fluides, etc.).`;

const PROMPT_DIAGNOSTIC = `Tu es rédacteur pour un chauffagiste. Quand je te donne mes observations de visite (âge matériel, symptômes, équipements), tu produis un rapport de diagnostic structuré pour un propriétaire non expert :

1. Synthèse de l’installation actuelle
2. Problèmes constatés ou probables
3. Enjeux sécurité / confort / conformité (sans inventer de mesures réglementaires précises)
4. Recommandations hiérarchisées (urgent / à moyen terme / optionnel)
5. Pistes de budget ou de phasage si je fournis des ordres de grandeur

Ton : professionnel, pédagogique. Je valide tout contenu technique et chiffrage avant envoi au client.`;

const PROMPT_DCE = `Je vais coller des extraits d’un DCE ou d’un règlement de consultation (marché public ou privé).

Produis :
1. Résumé en une page : nature des travaux, lots pertinents plomberie/chauffage, budget si indiqué, délais, critères d’attribution
2. Exigences notables (qualifications, assurances, références)
3. Points de vigilance (zones floues dans le dossier)
4. Trois axes possibles pour une réponse « méthode » ou mémoire technique — à développer par mes soins

Je reste seul responsable du contenu du mémoire et du respect du règlement de la consultation.`;

const PROMPT_EMAIL_SAV = `Je suis plombier chauffagiste. Rédige des modèles d’emails courts (5–8 lignes), ton professionnel :

1. Proposition de diagnostic après appel client (ex. bruit radiateur)
2. Confirmation d’intervention urgente avec créneau
3. Envoi de devis suite à visite
4. Relance devis à J+7 (ferme mais courtois)
5. Demande d’avis après intervention

Je personnalise nom, adresse et montants avant envoi.`;

const PROMPT_FAQ_CLIENT = `Je suis plombier chauffagiste en Île-de-France. Voici des questions fréquentes. Pour chacune, réponse courte (50–100 mots), claire, sans promesse de prix précis si je ne les ai pas donnés :

1. Combien coûte une chaudière neuve ?
2. Interventions d’urgence (délais, majorations) ?
3. Garantie constructeur / entretien ?
4. Remplacer radiateurs en même temps que la chaudière ?
5. Pompe à chaleur vs chaudière gaz (principes, pas de conseil définitif sans visite)
6. Moyens de paiement
7. Meilleure période pour un remplacement ?
8. Travaux avec syndic / copropriété
9. Réduire la facture énergie (pistes générales)
10. Prise en charge MaPrimeRénov’ ou aides (renvoyer vers info officielle + étude de faisabilité par le pro)`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT peut-il vraiment rédiger mes devis plomberie / chauffage ?',
    a: "L'IA peut produire un brouillon structuré à partir de votre barème et de votre description de travaux. Vous contrôlez les quantités, les prix et les mentions légales : le devis signé engage votre entreprise — relisez toujours avant envoi.",
  },
  {
    q: 'L’IA comprend-elle gaz, condensation, PER, réglementation ?',
    a: "Elle connaît le vocabulaire courant et peut aider à structurer une liste d’étapes ou un texte. Elle ne remplace ni la visite, ni le calcul réglementaire, ni la qualification gaz/fluides : vous validez tout contenu technique et conformité.",
  },
  {
    q: 'Combien de temps pour être autonome avec ChatGPT ?',
    a: "Cela dépend de votre habitude du numérique. En formation, on part de cas réels (devis, mails, extraits de dossiers) pour monter en charge progressivement — pas besoin d’être informaticien pour les usages texte.",
  },
  {
    q: 'Comment financer la formation avec Constructys ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi ; le financement Constructys dépend de votre statut, de votre branche et des règles du plan de développement des compétences. Nous étudions votre dossier avec vous — aucun engagement de prise en charge à 100 % sans analyse d'éligibilité.",
  },
  {
    q: 'L’IA peut-elle rédiger un mémoire technique ou répondre à un appel d’offres à ma place ?',
    a: "Elle peut aider à résumer un DCE, proposer un plan, reformuler des paragraphes types — sous votre contrôle. Le mémoire final, les prix et les engagements restent votre responsabilité ; comptez une relecture juridique et technique selon l’enjeu du marché.",
  },
  {
    q: 'Vais-je devoir tout changer à mon organisation ?',
    a: "L’objectif est d’intégrer l’IA dans votre flux actuel (devis, mails, dossiers) pour gagner du temps sur la formulation — pas de remplacer votre CRM ou votre métier sur le terrain.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : trop de temps sur devis et administratif' },
  { href: '#la-solution', label: 'La solution : l’IA adaptée aux plombiers chauffagistes' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des plombiers sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaPlombierBtpPage() {
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
        <span className="text-slate-900">Formation IA plombier chauffagiste BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour plombiers chauffagistes —{' '}
          <span className="text-[var(--accent)]">gagnez environ 4 h par semaine</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Automatisez <strong>devis</strong>, <strong>diagnostics</strong>, <strong>SAV</strong> et brouillons de{' '}
          <strong>mémoires techniques</strong> avec ChatGPT — <strong>Île-de-France</strong>. Formation{' '}
          <strong>Qualiopi</strong>, finançable <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à formuler devis, comptes rendus et mails à partir de vos consignes ; elle ne remplace pas la visite,
            les qualifications gaz/fluides ni la relecture des marchés publics. Les engagements et prix restent sous votre
            responsabilité.
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
            Le problème : trop de temps sur les devis et l’administratif
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes plombier ou chauffagiste en Île-de-France. Chaque semaine, une partie du temps part sur la rédaction :
            devis détaillés, comptes rendus de visite, réponses clients, dossiers pour réponses à consultation — pendant ce
            temps, vous n’êtes pas sur chantier ni en dépannage prioritaire.
          </p>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-700 leading-relaxed">
            <li>
              <strong>Les devis absorbent du temps</strong> — pièces, main-d’œuvre, déplacements, lots (radiateurs, réseaux,
              réglages) : tout doit être présenté proprement.
            </li>
            <li>
              <strong>Les diagnostics se traduisent par de longs comptes rendus</strong> — pour que le client comprenne
              l’investissement sur une installation ou un remplacement.
            </li>
            <li>
              <strong>Les consultations (public ou privé) sont lourdes</strong> — DCE volumineux, mémoire technique,
              méthode : des heures de lecture et de rédaction.
            </li>
            <li>
              <strong>Le SAV multiplie les échanges</strong> — mails de relance, confirmations, devis de reprise : répétitif.
            </li>
            <li>
              <strong>Les mêmes questions reviennent</strong> — urgence, prix indicatifs, aides : des réponses à structurer
              sans les réécrire à chaque fois from scratch.
            </li>
          </ol>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Conséquence :</strong> l’administratif peut représenter de nombreuses heures par semaine non facturées au
            même titre que l’intervention, avec risque d’erreurs ou de retards sur les réponses.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA adaptée aux plombiers chauffagistes
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L’IA ne remplace ni le geste professionnel ni le diagnostic sur site — elle peut accélérer la{' '}
            <strong>mise en forme</strong> : devis, mails, plans de réponse, à partir de ce que vous saisissez.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>1. Brouillon de devis</strong> — vous décrivez les travaux et votre barème : structure de devis,
                libellés, lignes MO / fournitures — à valider avant signature.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>2. Diagnostic « vendeur »</strong> — à partir de notes brutes de visite, texte structuré pour le
                client — vous contrôlez le fond technique et les montants.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>3. Aide sur dossiers de consultation</strong> — synthèse d’extraits, plan de mémoire, formulations
                types — pas de remplacement de votre relecture complète du règlement.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>4. Mails SAV et relances</strong> — modèles à personnaliser pour gagner du temps sur les messages
                récurrents.
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
            — adaptation de ChatGPT à votre activité (devis, diagnostics, dossiers), financement Constructys.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : 5 étapes avec prompts ChatGPT
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : modèle de devis plomberie / chauffage
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : prompt de diagnostic technique
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DIAGNOSTIC}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : extraits DCE et appels d’offres
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DCE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : modèles d’emails SAV
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_EMAIL_SAV}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 5 : FAQ clients
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FAQ_CLIENT}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur observés en formation — variables selon le volume de devis et le temps de relecture :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
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
                  <td className="p-3">Devis complet</td>
                  <td className="p-3">~15–25 min</td>
                  <td className="p-3">~quelques min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Compte rendu diagnostic</td>
                  <td className="p-3">~30–45 min</td>
                  <td className="p-3">~10 min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Email client / SAV</td>
                  <td className="p-3">~10–15 min</td>
                  <td className="p-3">~3 min</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Lecture + synthèse extrait DCE</td>
                  <td className="p-3">Plusieurs h</td>
                  <td className="p-3">Réduit</td>
                  <td className="p-3">Variable</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mémoire technique (gros dossier)</td>
                  <td className="p-3">Plusieurs j</td>
                  <td className="p-3">Accéléré</td>
                  <td className="p-3">Variable (relecture obligatoire)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50 font-medium">
                  <td className="p-3">Synthèse hebdomadaire</td>
                  <td className="p-3">Plusieurs h</td>
                  <td className="p-3">Réduit</td>
                  <td className="p-3">Souvent ~4 h / sem. (indicatif)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain d’heures ou de chiffre d’affaires n’est garanti.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Les devis et les mails me prenaient une grosse partie du bureau. Avec un brouillon généré par ChatGPT que je
              retravaille, j’envoie plus vite — je garde la main sur les prix et sur le gaz. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Plombier chauffagiste, Île-de-France (témoignage de formation)
            </footer>
          </blockquote>

          <p className="mt-8 text-slate-600 leading-relaxed">
            <a href="#rdv" className="text-[var(--accent)] font-medium underline hover:no-underline">
              Réservez une visio découverte gratuite
            </a>{' '}
            pour voir des cas types adaptés à votre activité.
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — questions des plombiers sur l’IA
          </h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{a}</p>
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
            L’organisme a formé plus de <strong>{SITE_CONFIG.statsPersonnesFormees} professionnels</strong> du bâtiment
            (artisans, PME, encadrement). <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE, CAPEB, CNAM
            Entreprise, Lefebvre Dalloz, etc. <strong>Satisfaction moyenne :</strong> 4,85/5.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Les parcours s’appuient sur des cas concrets (devis, diagnostics, dossiers) — pas de théorie généraliste sans
            mise en pratique. Basée à {SITE_CONFIG.geo.city} ({SITE_CONFIG.geo.département}), elle intervient en Île-de-France
            et en présentiel / distanciel selon format.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Plombier ou chauffagiste en Île-de-France : voir comment structurer devis, diagnostics et dossiers plus vite —
            sans engagement.
          </p>
          <ul className="mt-6 space-y-2 text-blue-100">
            <li>Cas d’usage les plus rentables pour votre quotidien (devis, diagnostic, consultation)</li>
            <li>Démonstration sur un exemple proche de vos travaux</li>
            <li>Financement Constructys et formats 1 ou 2 jours (inter / intra)</li>
          </ul>
          <p className="mt-6 text-blue-100 text-sm">
            PME ou équipe :{' '}
            <a href={`tel:${SITE_CONFIG.phone}`} className="underline hover:text-white">
              {SITE_CONFIG.phoneDisplay}
            </a>{' '}
            ·{' '}
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
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              <Phone size={20} strokeWidth={1.5} />
              {SITE_CONFIG.phoneDisplay}
            </a>
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
            {SITE_CONFIG.email} · {SITE_CONFIG.phoneDisplay} ·{' '}
            <a href={SITE_CONFIG.url} className="text-[var(--accent)] hover:underline">
              www.laureolivie.fr
            </a>
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formation-ia-electricien-btp', label: 'Formation IA électricien BTP' },
            { href: '/formations/ia-appels-offre-btp', label: 'IA appels d’offres BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
