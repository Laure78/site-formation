import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, sitePhoneDisplaySuffix } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { JsonLd } from '@/components/JsonLd';

const PATH = '/formation-ia-charge-affaires-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Chargé Affaires Métreur BTP Île-de-France',
  description:
    'Automatisez métrés, devis techniques, appels d’offres, rapports. Formation Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA chargé d’affaires BTP',
    'IA métreur BTP',
    'ChatGPT DCE mémoire technique',
    'métré appel d’offres IA',
    'formation IA Île-de-France',
    'chiffrage IA BTP',
    'OPCO Constructys',
    'Qualiopi BTP',
  ],
  openGraphType: 'article',
});

const PROMPT_DCE = `Analyse ce DCE et synthétise pour un chargé d'affaires BTP (Île-de-France) :

[Copie/colle le DCE ou les points clés : type travaux, localisation, lots identifiés, délai, conditions, exigences spéciales]

Synthèse doit contenir :
1. Résumé ouvrage (type, localisation, superficie, coût estimé)
2. Lots identifiés + évaluation pertinence pour nous (structure, électricité, plomberie : Nos compétences)
3. Exigences clés (normes, labels, certifications, assurance minimale, références)
4. Calendrier (démarrage, étapes clés, fin chantier)
5. Conditions de paiement et variantes
6. Risques/points d'attention identifiés
7. Questions à clarifier (si ambiguïtés)

Format : 1-2 pages, lisible pour directeur technique/patron.`;

const PROMPT_METRE = `Crée un tableau métré détaillé (DCE immeuble 5 étages Grand Paris, lot électricité) :

Spécifications :
- 5 étages, RDC + 4 étages
- Surface utile par étage : 800m² (4 000m² total)
- Installation électrique : distribution par étage, prises + éclairage
- Type installation : GTL 3 phases par étage, disjoncteurs différentiels, prises 2.5/4mm²
- Éclairage : LED encastré (type prise plafond), environ 1 point pour 10m²

Tableau métré doit contenir :
1. Distribution électrique : GTL par étage (nombre, type, coût)
2. Câblage : longueur câbles 2.5mm² et 4mm² (par étage + vertical)
3. Prises et interrupteurs : nombre détail (prises simples, doubles, éclairage spécialisé)
4. Appareillage : disjoncteurs, différentiels, compteurs
5. Éclairage : nombre points LED, spots, appliques (par zone : circulation, bureaux, sanitaires)
6. Main-d'œuvre : jours ouvriers pour installation complète

Format : tableau Excel-like, avec quantités précises et sous-totaux par catégorie.`;

const PROMPT_CHIFFRAGE = `Chiffre ce métré électricité avec ces paramètres (DCE Grand Paris) :

PU (prix unitaires HT) :
- GTL 3 phases : 280€ pièce
- Câble 2.5mm² : 0.15€/m
- Câble 4mm² : 0.25€/m
- Prises simples : 3€ pièce
- Prises doubles : 5€ pièce
- Points éclairage LED : 25€ pièce
- Disjoncteur : 12€ pièce
- Main-d'œuvre électricien : 45€/h

Métré recap (simplifié) :
- GTL : 5 pièces (1/étage)
- Câble 2.5mm² : 400m
- Câble 4mm² : 100m
- Prises simples : 150
- Prises doubles : 80
- Éclairage : 400 points
- Disjoncteurs : 30
- Main-d'œuvre : 350 heures

Chiffrage doit contenir :
1. Devis détaillé par catégorie (fournitures + main-d'œuvre)
2. Sous-totaux par lot
3. Total HT + TVA
4. Variante "low-cost" : matériaux moins chers (sous 20%)
5. Variante "premium" : matériaux quality + éclairage spécialisé
6. Marges standard (20-25%), variables selon risques

Format : tableau, clair, prêt à présenter direction.`;

const PROMPT_MEMOIRE = `Crée un mémoire technique (réponse DCE immeuble Grand Paris, lot électricité) :

Contexte :
- Lot : électricité complète 5 étages
- Entreprise : PME électricité 15 salariés, ISO 9001, assurance 1M€
- Références similaires : immeuble 3 étages 2022, hôpital extension 2023
- Délai : 8 semaines
- Budget : 145 000€ HT

MTD doit contenir :
1. Présentation entreprise : historique, taille, certifications, assurance
2. Savoir-faire : références similaires (2-3 projets clés), équipes dédiées (responsable, électriciens, apprentis)
3. Processus : phases installation (planning), contrôle qualité, essais conformité
4. Conformité normes : NF C15-100, DTU 55.2 (éclairage), respect DTU, tests de continuité
5. Planning détaillé : phase par phase, jalons clés, tests avant livraison
6. Sécurité : PPSPS application, prévention, formations équipes
7. SAV et garantie : durée garantie (5 ans matériel), support rapide, maintenance

Format : 3-4 pages, lisible, technique mais pro.`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT comprend-il les normes techniques (NF C 15-100, DTU) ?',
    a: "L'IA peut rappeler des principes et des formulations courantes : toujours vérifier avec les textes officiels, les fiches techniques et votre expertise. Pour les détails réglementaires ou locaux, croisez avec votre ingénieur ou votre référent technique.",
  },
  {
    q: "L'IA peut-elle vraiment calculer les métrés compliqués ?",
    a: "Elle peut proposer des quantités et des tableaux à partir des dimensions et hypothèses que vous indiquez. Pour les formes complexes, les exceptions et les cotes imprécises, vous contrôlez et corrigez manuellement — le résultat final engage votre entreprise.",
  },
  {
    q: 'ChatGPT va-t-il remplacer les chargés d’affaires ?',
    a: "Non. L'IA accélère la structuration des documents et des calculs ; le jugement commercial, la stratégie de prix, la négociation et la relation client restent humains.",
  },
  {
    q: 'Comment financer la formation si je suis chargé d’affaires salarié ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de votre employeur et des règles du plan de développement des compétences — aucune promesse de « zéro reste à charge » sans étude de dossier.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On travaille en français, avec des prompts et des trames que vous adaptez à vos DCE et à vos lots.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : métrés complexes et réponses d’AO lentes' },
  { href: '#la-solution', label: 'La solution : l’IA pour vos métrés et devis' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des chargés d’affaires sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaChargeAffairesBtpPage() {
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
        <span className="text-slate-900">Formation IA chargé d’affaires / métreur BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour chargés d’affaires / métreurs —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur les devis et les AO</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 4 h par semaine</strong> sur métrés, chiffrage et réponses
          marchés (DCE, mémoires techniques). <strong>Île-de-France</strong> & <strong>Grand Paris</strong> —{' '}
          <strong>Qualiopi</strong>, finançable <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à synthétiser les DCE, structurer des métrés et des brouillons de mémoire technique : vous restez
            responsable des prix, des quantités vérifiées et des engagements contractuels. Ne jamais envoyer de réponse
            sans relecture humaine — surtout sur les normes et les montants.
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
            Le problème : métrés complexes et réponses d’appels d’offres lentes
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>chargé d’affaires</strong> ou <strong>métreur</strong> en PME BTP en Île-de-France ou Grand
            Paris : analyser les DCE, cadrer les lots, faire les métrés, chiffrer, rédiger le mémoire technique et livrer
            la réponse dans les délais.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Une réponse à un marché peut mobiliser :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Lecture et analyse du DCE (critères, lots, risques).',
              'Métré détaillé : quantités, unités, reprises dans Excel ou outil métier.',
              'Chiffrage : PU, marges, variantes.',
              'Rédaction : mémoire technique, planning, pièces demandées.',
              'Relecture et validation avant envoi.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Sur plusieurs appels d’offres par mois, le volume « papier » peut empiéter sur l’analyse du risque et le
            temps commercial. D’où l’intérêt d’outils qui accélèrent la <strong>mise en forme</strong>, sous contrôle
            humain.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA pour vos métrés et devis
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut servir d’assistant pour : synthèse de DCE, tableaux métrés à partir de vos données, brouillons de
            chiffrage et de mémoire technique — à valider avec vos méthodes internes et les pièces du marché.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Analyse DCE</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Première lecture structurée : lots, exigences, calendrier, points d’attention — à partir du texte ou de notes
            que vous fournissez (respect de la confidentialité : pas de données sensibles dans des outils non adaptés).
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">2. Métré structuré</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Tableaux pré-formatés, catégories et sous-totaux — vous contrôlez les quantités et les unités.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Chiffrage et variantes</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Scénarios à partir de vos PU et hypothèses de marge — pas de substitution à votre politique commerciale.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">4. Mémoire technique</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Plan de rédaction aligné sur le RC, à compléter avec vos références réelles et preuves.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour voir comment adapter ces usages à votre processus d’appels d’offres.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas avec prompts ChatGPT
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : analyse DCE rapide
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DCE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : métré structuré (exemple lot électricité)
          </h3>
          <p className="mt-3 text-sm text-slate-500">
            Exemple pédagogique — adaptez les corps d’état et les cotes à vos réponses marchés.
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_METRE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : chiffrage et variantes
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_CHIFFRAGE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : mémoire technique et réponse AO
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_MEMOIRE}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles une fois les usages en place — <strong>variables</strong> selon la complexité du
            DCE et le temps de contrôle que vous conservez :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps indicatif par étape de réponse à un marché</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Sans IA (ordre de grandeur)</th>
                  <th className="p-3 font-semibold text-slate-900">Avec IA (brouillon + relecture)</th>
                  <th className="p-3 font-semibold text-slate-900">Gain typique</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Analyse DCE</td>
                  <td className="p-3">Longue</td>
                  <td className="p-3">Synthèse aidée</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Métré structuré</td>
                  <td className="p-3">Très chronophage</td>
                  <td className="p-3">Tableau proposé</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Chiffrage + variantes</td>
                  <td className="p-3">Itératif</td>
                  <td className="p-3">Scénarios à valider</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mémoire technique</td>
                  <td className="p-3">Rédaction lourde</td>
                  <td className="p-3">Plan + brouillon</td>
                  <td className="p-3">Important</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Les gains en heures par semaine ne sont pas garantis : ils dépendent du nombre de dossiers AO et de votre
            processus de validation.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Avant, une réponse AO me prenait une grosse journée de frappe. Maintenant, je structure beaucoup plus vite
              avec les brouillons IA — et je garde le temps pour le fond : risques, prix, stratégie. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Chargé d’affaires, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — chargés d’affaires BTP et IA</h2>
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
            <strong>Laure Olivié</strong> accompagne depuis <strong>2023</strong> chargés d’affaires, métreurs et équipes
            commerciales du BTP pour utiliser ChatGPT sur les tâches rédactionnelles et l’appel d’offres.{' '}
            <strong>OFC Création d’Entreprise</strong> est certifié <strong>Qualiopi</strong> ; plus de{' '}
            <strong>{formatProfessionalsTrainedCount()} professionnels</strong> formés, satisfaction moyenne{' '}
            <strong>{SOCIAL_PROOF.AVERAGE_RATING}</strong>.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Synthèse DCE, métré structuré, chiffrage — démonstration sur un cas type. Sans engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50">
              Réserver votre visio découverte
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
          <h2 className="font-display text-lg font-bold text-slate-900">
            Formation IA chargé d’affaires / métreur BTP — Île-de-France & Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formations/ia-appels-offre-btp', label: 'Répondre aux appels d’offres avec l’IA' },
            { href: '/formation-ia-dirigeant-pme-btp', label: 'Formation IA dirigeant PME BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
