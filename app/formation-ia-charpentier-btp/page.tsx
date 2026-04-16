import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { SOCIAL_PROOF } from '@/lib/constants';

const PATH = '/formation-ia-charpentier-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Charpentier BTP Île-de-France — Laure Olivié',
  description:
    'Optimisez vos calculs de structure, devis et planning charpente avec ChatGPT. Formation Qualiopi finançable Constructys. Gagnez 5h/semaine.',
  path: PATH,
  keywords: [
    'formation IA charpentier BTP',
    'ChatGPT charpente bois acier',
    'IA métré charpente',
    'devis charpente IA',
    'formation IA Île-de-France BTP',
    'DTU charpente assistant IA',
    'OPCO Constructys charpentier',
    'Qualiopi charpente',
  ],
  openGraphType: 'article',
});

const PROMPT_METRE = `"Calcule le métré de charpente pour cette structure bois/acier :

GÉOMÉTRIE :
- Type : [ferme trad, fermette, combles, structure acier, etc.]
- Portée : [X m], Hauteur : [Y m]
- Nombre de fermes : [N], espacement : [Z m]
- Pente : [angle]

SECTIONS (si bois) :
- Chevrons : [section cm x cm]
- Pannes : [section cm x cm]
- Tirants/liernes : [section cm x cm]
- Jambettes : [section cm x cm]

SECTIONS (si acier) :
- Fermes : [profil IPE, HEA, UAP...]
- Contreventements : [cornières, plats...]

CHARGES :
- Charge neige : [daN/m²] pour Île-de-France
- Charge vent : [daN/m²]
- Charge permanente : [tuiles, lattis, isolant...]

TARIFS (prix du jour Île-de-France) :
- Bois brut (si applicable) : [X € le m³]
- Acier laminé : [Y € le kg]
- Façonnage : [Z € l'heure]

CALCULE :
1) Mètres linéaires de chaque section
2) Chutes appliquées (5% bois, 8% acier)
3) Coût matière total
4) Coût façonnage
5) Devis final avec marge 30%

Rappel : métré et dimensionnement engageant la responsabilité = validation par le professionnel ou le BET selon le projet."`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT peut-il vraiment dimensionner une structure bois ou acier ?',
    a: "L'IA excelle surtout sur les métrés bruts (mètres linéaires par section, tableaux, brouillons de devis). Pour le dimensionnement structurel avancé (stabilité, déversement, vérifications acier selon Eurocodes), vous gardez le contrôle expert ou le bureau d'études. L'intérêt : réduire le temps répétitif, pas remplacer la validation signée.",
  },
  {
    q: "L'IA comprend les DTU bois et les charges de neige/vent en Île-de-France ?",
    a: "Vous pouvez demander des rappels de principes et des ordres de grandeur (zones climatiques, références documentaires). Toujours croiser avec les textes en vigueur, les DTU / Eurocodes applicables et le projet structurel validé. L'IA peut se tromper : la relecture par un professionnel reste obligatoire.",
  },
  {
    q: 'Comment adapter le calcul pour l’acier (profilés standards) ?',
    a: "Vous indiquez les profils (IPE, HEA, cornières, plats) et les données d'entrée : l'IA peut proposer des tableaux, des formulations ou des ordres de grandeur sur contraintes — à vérifier. Les propriétés mécaniques, coefficients et validation finale relèvent de votre expertise ou du BET.",
  },
  {
    q: 'Et si le plan change en cours de chantier ?',
    a: "Vous mettez à jour le prompt avec les nouvelles dimensions ou sections : l'IA recalcule un brouillon vite. Vous validez les impacts sur délais, métrés et avenants avant engagement.",
  },
  {
    q: 'Faut-il maîtriser la CAO pour utiliser l’IA ?',
    a: "Non pour les usages texte : vous décrivez le plan ou les cotes. Avec un abonnement adapté, certaines interfaces permettent aussi d'appuyer l'analyse sur une image de plan — toujours sous votre contrôle.",
  },
  {
    q: 'Quel est le coût de ChatGPT pour un charpentier ?',
    a: "Il existe une offre gratuite (limitée) et des abonnements payants selon les besoins (dont vision / fichiers). Comparez le coût mensuel au temps gagné sur les devis et métrés.",
  },
  {
    q: 'Ma formation IA est-elle finançable si je suis charpentier indépendant ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi ; le financement Constructys dépend de votre statut, de votre branche et des règles du plan de développement des compétences. Nous étudions votre dossier avec vous — aucun engagement de prise en charge à 100 % sans analyse d'éligibilité.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : pourquoi les charpentiers perdent du temps' },
  { href: '#la-solution', label: 'La solution : l’IA adaptée aux charpentiers' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des charpentiers sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaCharpentierBtpPage() {
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
        <span className="text-slate-900">Formation IA charpentier BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour charpentiers bois / métal —{' '}
          <span className="text-[var(--accent)]">gagnez environ 5 h par semaine</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Optimisez métrés, <strong>devis</strong> et <strong>planning</strong> charpente avec ChatGPT —{' '}
          <strong>Île-de-France</strong> et <strong>Grand Paris</strong>. Formation <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide les charpentiers à structurer métrés, tableaux et devis à partir de vos données ; elle ne remplace
            ni le bureau d’études ni la validation des charges et DTU/Eurocodes. Temps gagné sur la mise en forme et les
            itérations — sous votre responsabilité technique.
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
            Le problème : pourquoi les charpentiers perdent du temps
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes charpentier bois ou menuisier d’acier. Votre expertise est rare : dimensionnement de fermes, calcul
            de charges, respect des DTU (22.13 pour le bois, calcul de structures acier), lecture de plans de bureau
            d’études, gestion de métrés linéaires précis.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Mais chaque semaine, c’est aussi : <strong>analyser les plans</strong> fournis par l’architecte ou le BET,{' '}
            <strong>calculer les quantités</strong> de bois ou d’acier par type de section (poutres, chevrons, liernes),{' '}
            <strong>établir des devis détaillés</strong>, <strong>gérer les variations de prix</strong> du matériau.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Un charpentier passe souvent 6 à 9 heures par semaine</strong> sur le métré et la gestion
            administrative, généralement le soir après le chantier.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Le pire ? <strong>Une erreur de métré sur une charpente, c’est coûteux.</strong> Sous-estimez les chevrons ou
            les tirants : réapprovisionnement en urgence (coût et délai). Surestimez : marge perdue. Les DTU (charges de
            neige, charges de vent, déversement latéral pour le bois) demandent de la vérification.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            En Île-de-France et Grand Paris, les appels d’offres maison individuelle et collectif arrivent régulièrement.
            Mais entre l’analyse des plans, le calcul de charges et la rédaction du devis, vous n’avez parfois le temps de
            répondre qu’à peu d’appels par mois. <strong>Vous pouvez passer à côté de chantiers par manque de temps.</strong>
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>La solution ?</strong> Utiliser l’IA comme assistant pour structurer métrés, tableaux et devis — plus
            vite qu’à la main — tout en gardant la validation métier et, le cas échéant, le bureau d’études.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA adaptée aux charpentiers
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut servir d’assistant pour structurer métrés, tableaux et devis à partir des paramètres que vous
            saisissez — pas pour remplacer la note de calcul ou la validation réglementaire lorsque la réglementation
            l’exige.
          </p>
          <p className="mt-4 font-medium text-slate-900">Quatre cas d’usage concrets observés en formation :</p>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>1. Analyser rapidement un plan et en extraire les quantités</strong> — vous recevez le plan
                d’exécution du BET (échelle 1/50 ou 1/100). Vous décrivez la structure : par exemple ferme traditionnelle,
                portée 12 m, 8 fermes espacées 3 m, chevrons 8×18 cm, pannes 12×30 cm, liernes 10×12 cm, couverture tuile,
                charges neige et permanente selon le projet. L’IA peut proposer : mètres linéaires de chevrons, pannes,
                liernes et tirants, jambettes, volume de bois avec chutes (ex. 5 à 7 % indicatif pour le bois), total à
                commander — à <strong>relire avant commande</strong>. Gain typique : environ 1 h 30 à 2 h par plan selon
                dossiers.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>2. Structurer un devis charpente détaillé</strong> — vous entrez le métré et les tarifs bois/acier
                du jour. L’IA peut générer un brouillon : ventilation par section et type d’élément, coût matière, façonnage,
                mise en place (levage, boulonnage), connecteurs et quincaillerie, totaux HT/TTC et marges — souvent en
                environ 20 minutes au lieu de plusieurs heures, sous votre validation.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>3. Gérer les variantes et les calculs de charge</strong> — l’architecte demande une variante (ex.
                portée 12 m → 14 m). Vous mettez à jour le prompt : l’IA recalcule métrés et brouillon de devis en quelques
                minutes. Vous gardez le contrôle expert sur le dimensionnement et les hypothèses.
              </span>
            </li>
            <li className="flex gap-3 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
              <span>
                <strong>4. Générer des bons de commande structurés</strong> — à partir du métré par section, l’IA peut
                proposer un document prêt à envoyer à la scierie ou au marchand de fer, en quelques minutes, après relecture.
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
            — Laure vous montre comment l’IA structure un métré de charpente et un devis sur un cas type, financement
            Constructys, programme 1 ou 2 jours.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : automatiser le calcul de charpente
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : préparer votre template de calcul (prompt réutilisable)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_METRE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : récupérer le plan d’exécution
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Plan du BET ou du bureau d’études structure (PDF, extrait DWG). Vous en tirez les cotes et les sections
            utiles à la description textuelle.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : remplir le prompt avec les données du plan
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vous listez géométries, sections et charges. Comptez souvent une dizaine de minutes par plan simple — plus si le
            dossier est volumineux.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : générer métré et brouillon de devis
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            L’IA produit des tableaux et des totaux à <strong>vérifier systématiquement</strong> (cohérence des unités,
            relecture des hypothèses).
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 5 : adapter, valider, signer
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vous contrôlez les règles DTU / Eurocodes applicables, le contreventement, les points sensibles (déversement,
            appuis). Le devis signé engage votre entreprise : l’IA est un outil d’aide à la rédaction, pas une validation
            réglementaire automatique.
          </p>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur observés en formation avec des charpentiers en Île-de-France — variables selon l’entreprise et
            le nombre de dossiers traités :
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
                  <td className="p-3">Analyse plan de charpente</td>
                  <td className="p-3">~1 h 30</td>
                  <td className="p-3">~5 min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Calcul métré (chevrons, pannes, tirants)</td>
                  <td className="p-3">~1 h 30</td>
                  <td className="p-3">~5 min</td>
                  <td className="p-3">Fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Génération devis charpente</td>
                  <td className="p-3">~1 h 30</td>
                  <td className="p-3">~20 min</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Variantes (calcul + devis)</td>
                  <td className="p-3">~1 h</td>
                  <td className="p-3">~5 min</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Bons de commande</td>
                  <td className="p-3">~30 min</td>
                  <td className="p-3">~5 min</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50 font-medium">
                  <td className="p-3">Synthèse (ex. 2 à 3 devis / semaine)</td>
                  <td className="p-3">Plusieurs heures</td>
                  <td className="p-3">Réduit fortement</td>
                  <td className="p-3">Variable (souvent plusieurs h / sem.)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Les gains hebdomadaires dépendent du volume de devis et du temps de relecture que vous conservez. Aucun résultat
            chiffré (CA, marge) n’est garanti.
          </p>
          <p className="mt-6 text-slate-600 leading-relaxed">
            <strong>Effet business possible (non garanti) :</strong> en libérant du temps sur l’administratif, certaines
            équipes peuvent traiter davantage d’appels d’offres ou réallouer des heures sur la production — à confirmer selon
            votre organisation et votre relecture.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Je gérais peu d’appels d’offres à cause du calcul fastidieux. Avec l’IA, je structure métrés et devis bien
              plus vite — j’ai pu en traiter davantage et réallouer du temps sur la production plutôt que sur l’administratif.
              Ça a changé mon organisation. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Chef de projet charpente, FFB Grand Paris (témoignage de formation)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — questions des charpentiers sur l’IA
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
            <strong>Laure Olivié</strong>, formatrice IA et ChatGPT spécialisée BTP. L’organisme{' '}
            <strong>OFC Création d’Entreprise</strong> est certifié <strong>Qualiopi</strong> (NDA 11788515078) et a formé
            plus de <strong>{SITE_CONFIG.statsPersonnesFormees} professionnels</strong> du bâtiment : charpentiers,
            menuisiers, conducteurs de travaux, dirigeants — en Île-de-France et en France.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE,
            etc. <strong>Satisfaction moyenne :</strong> {SOCIAL_PROOF.AVERAGE_RATING}.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Elle a conçu cette approche parce qu’elle voit souvent des charpentiers très compétents passer trop de temps sur
            le calcul et le papier au détriment du chantier. L’objectif : libérer du temps pour le métier, avec des usages
            d’IA encadrés et une validation humaine systématique.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Charpentier bois ou acier, menuisier d’étude ou chef de projet charpente : vérifier si l’IA vous fait gagner du
            temps sur métrés et devis — sans engagement.
          </p>
          <ul className="mt-6 space-y-2 text-blue-100">
            <li>Comment ChatGPT peut structurer un plan de charpente décrit en direct (métré par section)</li>
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

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formation-ia-macon-btp', label: 'Formation IA maçon BTP' },
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
