import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';

const PATH = '/formation-ia-chef-chantier-tp';

export const metadata = createPageMetadata({
  title: 'Formation IA Chef Chantier TP Île-de-France — Laure Olivié',
  description:
    'Automatisez rapports chantier, coordination sous-traitants, PPSPS, planning. Formation Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA chef de chantier TP',
    'ChatGPT rapport chantier',
    'coordination sous-traitants TP',
    'variation CCTP',
    'PPSPS chantier',
    'OPCO Constructys',
    'Qualiopi BTP',
    'travaux publics IA',
  ],
  openGraphType: 'article',
});

const PROMPT_RAPPORT = `Crée un rapport d'avancement chantier TP pour ce jour (Grand Paris, marché public eau/TP) :

Notes brutes :
- Jour 10 de chantier
- Canalisation EU : posé 220m aujourd'hui (versus 180m prévu), gain de 40m
- Terrassement zone B : creusement 85% (avant ça traîner demain)
- Équipes : 2 canalisateurs expérience, 1 apprenti, 3 manœuvres, 1 chef de chantier (moi)
- Sécurité : pas d'incident. Rappel balisage zone croisement routes, bien respecté.
- Météo : pluie matin ralenti, rattrapage après-midi
- Obstacles : canalisation gaz trouvée lors creusement zone C, GrDF appelé, confirmation lundi
- Planning : demain creusement zone C ralenti (attendre confirmation gaz), mais canalisation restera à jour si zone B finalisée

Rapport doit contenir :
1. Résumé avancement (m³, linéaires, % completion vs planning)
2. Équipes présentes et qualification
3. Sécurité et incidents (ou pas d'incidents)
4. Obstacles rencontrés et solutions apportées
5. Planning demain (prévisions équipes/engins)
6. Points nécessitant décision/escalade (ex. canalisation gaz)

Format : pro, lisible pour maître d'ouvrage / maîtrise d'œuvre, 1-2 pages, avec tableau avancement.
(Remplace les notes par vos données réelles du jour.)`;

const PROMPT_EMAILS = `Rédige 3 emails de coordination (chantier TP Grand Paris, jour 10) :

Email 1 — Au canalisateur :
Tu lui dis : "250m de canalisation posés, bravo. Demain on finit zone A (50m). Zone C révélée canalisation gaz non prévue (GrDF confirmation lundi). Peux-tu attendre lundi matin ou dois-je appeler une 2e équipe pour démarrer zone B demain ?"

Email 2 — À l'électricien :
Tu lui dis : "Tes installations électriques zone A : commandes de puissance mal positionnées selon DTU (vérification demain matin avec le coordonnateur SPS). Tu peux commencer zone B en attendant ?"

Email 3 — Au terrassier :
Tu lui dis : "Zone B 85% finalisée demain. Zone C : terrain devrait être prêt mercredi. Tu as les engins nécessaires ou tu les charges lundi matin ?"

Pour chaque email :
- Ton professionnel mais cordial, coordination claire
- Informations critiques (dates, obstacle, demande d'action)
- Signature avec toi en tant que chef de chantier + numéro contact

Format : prêt à copier-coller dans la messagerie.`;

const PROMPT_VARIATION = `Maître d'ouvrage demande variation CCTP :
"Canalisation EU actuellement prévue 315mm PVC groupe I. On voudrait upgrade 400mm béton renforcé pour durabilité long terme. Quel est le surcoût ?"

Contexte : 450m de canalisation, coût unitaire m² prévu 45€ HT PVC, surcoût béton estimé 65€ HT/m.

Rédige pour moi :
1. Analyse technique indicative : avantages/inconvénients (à valider par le bureau d'études / MO)
2. Calcul surcoût indicatif : (450m × (65-45€)) = XX€ HT — à recalculer avec mes PU contractuels
3. Impact planning : hypothèses possibles
4. Brouillon de demande de variation pour maître d'ouvrage : justification technique + montant surcoût + accord de principe
5. Rappel : validation direction et méthode interne de votre entreprise

Ton : neutre, technique, pas de jugement, faits et hypothèses clairement séparés.`;

const PROMPT_ALERTES = `Crée une fiche de rappels sécurité quotidiens pour ce chantier TP (marché eau/TP Grand Paris) :

Contexte : canalisation 450m, terrassement 200m³, zone proximité route (RN7), arrivée gaz non prévue (GrDF jeudi).

Points à couvrir (rappels / checklist — complément aux documents officiels du chantier) :
1. Zone de croisement routes : balisage temporaire, signalisation (gilets, cônes, etc.)
2. Déviations éventuelles et circulation
3. Travaux en tranchée : aération, sorties, risques enfermement
4. Canalisation gaz : périmètre GrDF, consignes équipes
5. EPI : gilets, casques, chaussures, protections auditives engins, harnais si travail en hauteur

Pour chaque point :
- Description simple
- Qui contrôle / fréquence
- Rappel : non-respect = risque humain et sanction

Format : checklist 1 page, affichage chantier.
Ajoute : « Ce document ne remplace pas le PPSPS ni les plans de prévention ; il sert de mémo opérationnel. »`;

const FAQ_ITEMS = [
  {
    q: 'DTU, CCTP, marchés publics : que peut faire ChatGPT ?',
    a: "L'IA peut aider à structurer des textes, à partir des références que vous citez. La conformité technique et contractuelle reste validée par vous, le bureau d’études et les instances de la mission.",
  },
  {
    q: 'PPSPS et coordination sécurité : l’IA peut-elle les rédiger ?',
    a: "Les documents réglementaires (PPSPS, plans de prévention, consignes officielles) relèvent des rôles et habilitations prévus par la réglementation. L'IA peut aider à des brouillons de comptes rendus ou de checklists, pas à se substituer au responsable désigné.",
  },
  {
    q: "L'IA va-t-elle remplacer les chefs de chantier ?",
    a: "Non. L'IA accélère la rédaction et la structuration ; la décision, l'autorité de chantier et la responsabilité restent humaines.",
  },
  {
    q: 'Comment financer la formation si je suis salarié ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de l'employeur et des règles du plan de développement des compétences — étude de dossier au cas par cas.",
  },
  {
    q: 'Métrés et % avancement : ChatGPT calcule-t-il correctement ?',
    a: "Elle peut présenter des tableaux et des pourcentages à partir des chiffres que vous fournissez. Les relevés sources et la validation des quantités restent votre responsabilité.",
  },
  {
    q: 'Demandes de prolongation de délai : peut-on utiliser l’IA ?',
    a: "Oui pour structurer un courrier : faits, causes, impacts, pièces à joindre — à relire et à faire valider selon votre organisation.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On formule les demandes en français, avec des prompts que vous réutilisez et adaptez.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : coordination et paperasse TP' },
  { href: '#la-solution', label: 'La solution : l’IA pour structurer votre coordination' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des chefs de chantier TP sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaChefChantierTpPage() {
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
        <span className="text-slate-900">Formation IA chef de chantier TP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour chefs de chantier TP —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur la coordination et la documentation</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 5 h par semaine</strong> sur rapports, mails et dossiers.{' '}
          <strong>Île-de-France</strong> & <strong>Grand Paris</strong> — <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer textes et tableaux ; les décisions de chantier, la sécurité et les engagements contractuels
            restent sous votre responsabilité et celles des personnes habilitées. Relisez toujours avant envoi.
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
            Le problème : coordination et paperasse TP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>chef de chantier TP</strong> en Île-de-France ou Grand Paris : équipes, sous-traitants,
            sécurité, <strong>rapports d’avancement</strong>, CCTP, planning et relations avec le maître d’ouvrage.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Sans aide à la rédaction, une part importante du temps part en :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Réunions et arbitrages du jour.',
              'Coordination par courriels et échanges avec les entreprises.',
              'Comptes rendus de chantier et suivi des écarts.',
              'Demandes de variation et justification des délais.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Beaucoup de chefs de chantier cherchent à <strong>moins passer sur le clavier</strong> et plus sur le terrain
            — d’où l’intérêt d’accélérer la mise en forme avec des assistants IA encadrés.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA pour structurer votre coordination
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut aider à : produire des brouillons de rapports à partir de notes, rédiger des mails de coordination,
            structurer une analyse de variation CCTP, préparer des checklists de rappels sécurité — sous votre relecture et
            dans le respect des documents officiels du chantier.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Rapports d’avancement</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Synthèse factuelle : avancement, obstacles, planning, points à escalader.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">2. Coordination sous-traitants</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Courriers clairs, avec dates et demandes d’action explicites.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Variations et sécurité</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Brouillons de demandes de variation ; rappels de sécurité complémentaires au PPSPS — jamais substituts aux
            documents réglementaires.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour adapter ces usages à votre chantier TP.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Méthode pas à pas</h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : rapport d’avancement quotidien
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_RAPPORT}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : emails de coordination sous-traitants
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_EMAILS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : gestion d’une variation CCTP
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_VARIATION}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : rappels sécurité (complément au PPSPS)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_ALERTES}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles — <strong>variables</strong> selon la taille du projet et votre temps de relecture
            :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Temps indicatif avant / après usage de l’IA sur la coordination chef de chantier TP
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Sans IA</th>
                  <th className="p-3 font-semibold text-slate-900">Avec IA</th>
                  <th className="p-3 font-semibold text-slate-900">Gain typique</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Rapport d’avancement</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Brouillon structuré</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mails sous-traitants</td>
                  <td className="p-3">Rédaction</td>
                  <td className="p-3">Textes cadrés</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Variation CCTP</td>
                  <td className="p-3">À monter de zéro</td>
                  <td className="p-3">Plan + chiffres indicatifs</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Rappels sécurité</td>
                  <td className="p-3">Dispersé</td>
                  <td className="p-3">Checklist</td>
                  <td className="p-3">Modéré</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Suivi planning</td>
                  <td className="p-3">Synthèse manuelle</td>
                  <td className="p-3">Tableaux si données fournies</td>
                  <td className="p-3">Modéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain en heures par semaine n’est garanti : tout dépend du chantier et des exigences de votre entreprise.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « J’avais moins de temps pour anticiper qu’écrire des mails. Les brouillons me font gagner du souffle sur la
              coordination — je reste le seul à valider ce qui part. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Chef de chantier TP, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — chefs de chantier TP et IA</h2>
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
            <strong>Laure Olivié</strong> accompagne depuis <strong>2023</strong> artisans et équipes du BTP / TP pour
            utiliser ChatGPT sur la productivité (comptes rendus, communication, dossiers).{' '}
            <strong>OFC Création d’Entreprise</strong> est certifié <strong>Qualiopi</strong> ; plus de{' '}
            <strong>{SITE_CONFIG.statsPersonnesFormees} professionnels</strong> formés, satisfaction moyenne{' '}
            <strong>4,85/5</strong>.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE, CAPEB.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Rapports, mails, variations : démonstration sur un cas type. Vous repartez avec des prompts à adapter à votre
            organisation.
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
            Formation IA chef de chantier TP — Île-de-France & Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formations/ia-travaux-publics', label: 'Formation IA travaux publics' },
            { href: '/formation-ia-conducteur-travaux-btp', label: 'Formation IA conducteur de travaux BTP' },
            { href: '/formation-ia-conducteur-engins-tp', label: 'Formation IA conducteur d’engins TP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
