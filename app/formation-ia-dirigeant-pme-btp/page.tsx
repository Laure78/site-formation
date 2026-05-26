import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, sitePhoneDisplaySuffix } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { JsonLd } from '@/components/JsonLd';

const PATH = '/formation-ia-dirigeant-pme-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Chef Entreprise BTP Île-de-France',
  description:
    'Automatisez devis, relances clients, communication, rapports, prospection. Formation Qualiopi. Financement possible selon éligibilité.',
  path: PATH,
  keywords: [
    'formation IA chef entreprise BTP',
    'IA dirigeant PME bâtiment',
    'ChatGPT devis BTP',
    'formation IA Île-de-France',
    'automatiser administratif BTP',
    'OPCO Constructys dirigeant',
    'Qualiopi formation BTP',
    'prospection IA BTP',
  ],
  openGraphType: 'article',
});

const PROMPT_DEVIS_EXPRESS = `Crée un devis pour ce client (PME BTP, Île-de-France) :
- Prestation : remplacement 5 radiateurs gaz par pompe à chaleur air-air (climatisation réversible)
- Surface : maison 120m², étage + RDC
- État : radiateurs gaz 30 ans, chaudière à remplacer aussi
- Marque proposée : Daikin ou Mitsubishi (tu décides)
- Pose : 2 jours (1j installation + 1j tests + mise en eau)
- Budget client max : 9 500€ TTC
- Délai : 2 semaines
- Ton : pro, rassurant, explique les avantages PAC vs gaz

Devis doit contenir :
1. Description travaux (dépose radiateurs gaz, pose unité intérieure/extérieure, électricité spécialisée)
2. Équipements (PAC modèle, radiateurs de remplacement ou conservation tuyauterie)
3. Main-d'œuvre (jours ouvriers, qualifications)
4. Fournitures (câbles, raccords, thermostat)
5. Conditions (délai, paiement 1/3 avance, 1/3 mi-parcours, 1/3 livraison, assurance RTI)
6. Avantages : économies énergie estimées, silence, climatisation été, garantie constructeur

Format : tableau, clair, professionnel, prêt à imprimer ou envoyer email.`;

const PROMPT_PROSPECTION = `Rédige 3 mails de prospection "soft" (PME plomberie chauffage, Île-de-France) :

Email 1 — À un bâtiment collectif (syndic) :
Tu as lu qu'ils vont remplacer le chauffage. Propose-leur : "Audit gratuit du chauffage, on vous calcule économies possible, zero engagement."

Email 2 — À une agence immobilière locale :
Propose-leur : "Vous recommandez des entreprises chauffage/plomberie à vos clients ? On peut être référent local, garantie 5 ans, devis rapide."

Email 3 — À un précédent client (chantier 3 ans ago) :
Relance soft : "Ça va depuis nos travaux ? On vous propose diagnostic gratuit annuel si vous le souhaitez + conseil économies énergie."

Pour chaque email :
- 3-4 paragraphes max
- Pas de "achète mon truc" lourd, juste propose une conversation
- Ton chaleureux mais pro
- CTA clair (appel, visio, rendez-vous)

Format : prêt à envoyer.`;

const PROMPT_REPONSES_CLIENTS = `Rédige des réponses types (PME plomberie chauffage) :

Q1 — Client demande : "Combien de temps durent les radiateurs électriques ? Ils sont cher à l'entretien ?"
Réponse : [...] (explique durée, maintenance, comparaison économies vs chauffage gaz)

Q2 — Client demande : "Quel délai de visite pour devis chauffage maison ?"
Réponse : [...] (proposer 3 slots cette semaine, explique déroulement visite, ce qu'on regardé)

Q3 — Client demande : "Vous faites crédit ou financement ? Quel coût ?"
Réponse : [...] (propose option crédit 0%, explique conditions, durée max 60 mois)

Q4 — Client demande après chantier (1 semaine) : "Ça marche bien mais j'ai une question sur thermostat"
Réponse : [...] (rassure, explique fonctionnement, rappelle garantie 5 ans + SAV gratuit an 1)

Pour chaque réponse :
- Directe et rassurante
- Pas de bla-bla, juste l'info utile
- CTA clair (rappel, visite, confirmation, etc.)

Format : prêt à copier-coller dans les mails.`;

const PROMPT_TABLEAU_BORD = `Crée un tableau de bord activité (PME chauffage 8 salariés, mois de mars) :

Données brutes :
- Chantier 1 : 4 200€ HT facturé, 3 jours ouvrier, 1 jour patron, 12h camion/matériel
- Chantier 2 : 1 800€ HT, 2 jours ouvrier (moins compliqué)
- Chantier 3 : 6 500€ HT, 5 jours ouvrier, 2 jours patron, appel d'offres compliqué
- Chantier 4 : 2 300€ HT (travail déjà commencé mois dernier, phase 2)
- Total : 14 800€ HT + travail en cours
- Coût moyen ouvrier : 35€/h net (coût patron-comptable : 55€/h)
- Coût matériel/camion : 5% du CA

Tableau doit contenir :
1. Revenu par chantier (HT)
2. Coût de réalisation (main-d'œuvre + matériel)
3. Marge par chantier et marge moyenne
4. Rentabilité horaire (CA/heures ouvrier vs coût ouvrier)
5. Tendance mois vs mois précédent
6. Points d'amélioration (quels chantiers moins rentables et pourquoi)

Format : 1 page Excel, lisible pour vous (pour vrai piloter l'activité).`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT comprend-il les marges et rentabilité BTP ?',
    a: "Oui pour structurer et synthétiser : coûts, revenus, marges indicatives à partir des données que vous fournissez. Pour la décision financière et la comptabilité, l'expert-comptable et vos outils métiers restent la référence.",
  },
  {
    q: "L'IA va-t-elle remplacer les chefs d'entreprise ?",
    a: "Non. L'IA accélère l'administratif et la mise en forme ; la vision, la négociation, le recrutement et le jugement stratégique restent à vous.",
  },
  {
    q: 'Comment financer la formation si je suis chef d’entreprise BTP ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de votre branche, de la taille de l'entreprise et des dispositifs (plan de développement des compétences, etc.). Nous étudions votre dossier avec vous.",
  },
  {
    q: "ChatGPT peut-il m'aider avec la paie et RH ?",
    a: "Pour des brouillons : modèles de texte, structuration de procédures, idées de suivi. La paie légale et les obligations sociales relèvent de votre expert-comptable ou de votre logiciel certifié — pas de validation automatique par l'IA.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On travaille en français, avec des prompts et des trames que vous adaptez. La formation vise l'autonomie sur les usages courants (devis, mails, synthèses).",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : du chantier à la paperasse BTP' },
  { href: '#la-solution', label: 'La solution : l’IA pour vos tâches administratives' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des chefs d’entreprise BTP sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaDirigeantPmeBtpPage() {
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
        <span className="text-slate-900">Formation IA dirigeant PME BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour chefs d’entreprise BTP —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur l’administratif</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 8 h par semaine</strong> sur l’administratif (devis, relances,
          communication, synthèses, prospection). <strong>Île-de-France</strong> & <strong>Grand Paris</strong> —{' '}
          <strong>Qualiopi</strong>, financement possible selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide les dirigeants de PME BTP à structurer devis, mails et tableaux de suivi ; vous restez responsable
            des prix signés, des engagements clients et des obligations légales (comptabilité, paie, assurances).
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
            Le problème : du chantier à la paperasse BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>chef d’entreprise BTP</strong> (professionnel devenu dirigeant) en Île-de-France ou Grand Paris :
            PME avec souvent plusieurs salariés et chantiers en parallèle — devis, facturation, coordination, RH,
            prospection.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Une semaine type peut charger :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Chantier : suivi des équipes et de la qualité.',
              'Devis et relances : demandes entrantes, visites, propositions, suivi.',
              'Coordination : planning, interfaces entre chantiers, imprévus.',
              'Administratif : facturation, relances, mails, dossiers.',
              'Prospection : souvent le parent pauvre faute de disponibilité.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Résultat fréquent : longues semaines, peu de temps pour vendre et piloter sereinement — d’où l’intérêt d’
            <strong>automatiser le rédactionnel</strong> sans déléguer votre jugement.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA adaptée aux chefs d’entreprise BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut servir d’assistant pour accélérer la mise en forme des devis, des mails et des synthèses — à partir
            des informations que vous fournissez et sous votre validation.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Devis structurés plus vite</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Après quelques questions cadrées sur le chantier, l’IA propose un premier jet de devis (postes, formulations) :
            vous ajustez prix, délais et clauses avant envoi.
          </p>
          <aside className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 italic">
            Exemple (fictif) : « Remplacement radiateurs gaz par PAC air-air, maison 120 m², budget cible, délai de pose »
            — l’IA aide à structurer le descriptif ; le chiffrage et la conformité restent votre ressort.
          </aside>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            2. Prospection et relances (ton professionnel)
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Brouillons de mails « soft », relances, rappels de valeur — à personnaliser avant envoi pour respecter le RGPD
            et votre image de marque.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Communication client</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Réponses types aux questions fréquentes (délais, garanties, financement) : vous gardez le dernier mot.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">4. Synthèses et pilotage</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            À partir de données que vous fournissez (CA chantiers, heures, coûts), l’IA peut proposer des tableaux et des
            indicateurs — à recouper avec votre comptabilité.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour voir comment adapter ces usages à votre PME BTP.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas avec prompts ChatGPT
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : devis express (exemple chauffage / PAC)
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Temps potentiellement gagné sur la mise en forme : significatif selon vos habitudes — toujours relire les
            montants et les conditions.
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS_EXPRESS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : prospection douce et relances
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_PROSPECTION}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : réponses types aux questions clients
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_REPONSES_CLIENTS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : tableau de bord rentabilité (données à fournir)
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            L’IA propose une structuration ; les taux horaires, charges réelles et résultats définitifs doivent être
            validés avec vos chiffres internes et votre comptable.
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_TABLEAU_BORD}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur observés en formation — <strong>variables</strong> selon votre organisation et le temps de
            relecture que vous conservez :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps avant et après usage de l’IA sur tâches administratives</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Avant</th>
                  <th className="p-3 font-semibold text-slate-900">Avec IA</th>
                  <th className="p-3 font-semibold text-slate-900">Gain indicatif</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Devis par dossier</td>
                  <td className="p-3">1 h 30 à 2 h</td>
                  <td className="p-3">~10 min + relecture</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Relances / prospection</td>
                  <td className="p-3">Plusieurs h/sem.</td>
                  <td className="p-3">Brouillons plus rapides</td>
                  <td className="p-3">Selon volume</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Questions clients</td>
                  <td className="p-3">Dispersé</td>
                  <td className="p-3">Modèles à adapter</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Synthèse mensuelle</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Structuration aidée</td>
                  <td className="p-3">Selon données</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Les bilans « X heures gagnées par semaine » sont des objectifs pédagogiques, pas une garantie de résultat.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Avant, j’étais trop pris par l’administratif pour vendre sereinement. Maintenant, je dégage du temps pour
              la prospection et le pilotage — avec des brouillons IA que je valide toujours avant envoi. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Dirigeant PME BTP, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — chefs d’entreprise BTP et IA</h2>
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
            <strong>Laure Olivié</strong> accompagne depuis <strong>2023</strong> les <strong>dirigeants et PME du BTP</strong>{' '}
            pour utiliser ChatGPT et l’IA sur la productivité (devis, communication, appels d’offres, prospection).{' '}
            <strong>OFC Création d’Entreprise</strong> est certifié <strong>Qualiopi</strong> ; plus de{' '}
            <strong>{formatProfessionalsTrainedCount()} professionnels</strong> formés, satisfaction moyenne{' '}
            <strong>{SOCIAL_PROOF.AVERAGE_RATING}</strong>.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE.
            Interventions en Île-de-France et sur toute la France selon les sessions.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Voir en direct comment structurer un devis, des mails de prospection et une synthèse d’activité — sans
            engagement. Vous repartez avec des idées de prompts à adapter à votre entreprise.
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
            Formation IA chef d’entreprise BTP — Île-de-France & Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA appliquées au bâtiment' },
            { href: '/formations/ia-pme-btp', label: 'Formation IA PME BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: '/formation-ia-electricien-btp', label: 'Formation IA électricien BTP' },
            { href: buildSiteCalendlyCtaUrl('formation-ia-dirigeant-pme-btp-footer-rdv'), label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
