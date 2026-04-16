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

const PATH = '/formation-ia-conducteur-travaux-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Conducteur Travaux BTP Île-de-France — Laure Olivié',
  description:
    'Automatisez rapports chantier, coordination multiples lots, devis, suivi planning. Formation Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA conducteur de travaux',
    'ChatGPT coordination chantier BTP',
    'rapport avancement chantier IA',
    'formation IA Île-de-France',
    'coordination lots BTP',
    'OPCO Constructys conducteur travaux',
    'Qualiopi BTP',
    'planning chantier IA',
  ],
  openGraphType: 'article',
});

const PROMPT_RAPPORT_LOTS = `Crée un rapport d'avancement chantier immeuble collectif (Grand Paris, jour 23 sur 120) avec ces 8 lots :

État lots (notes brutes) :
- Maçonnerie (structure + cloisons) : 100% gros œuvre, 60% cloisons, OK planning
- Menuiseries : 50% fenêtres posées, retard 2j (fenêtre commandée tard)
- Électricité : 40% câblage RDC, 20% étage 1, OK timing
- Plomberie : 20% tuyauterie, 5% branchements, retard 3j (main-d'œuvre manquante)
- Carrelage salle d'eau : 0% (attend finition électricité/plomberie)
- Peinture : 0% (attend finition cloisons + carrelage)
- Chauffage climatisation : 10% livraison équipements repoussée 1 semaine
- Finitions/serrures : pas commencé, attendez autres lots

Délai théorique fin : semaine 17. Prévision actuelle avec retards : ?

Rapport doit contenir :
1. Tableau avancement par lot (% complété, délai théorique vs prédiction)
2. Lots en retard : raison, impact délai final
3. Lots critiques : ceux qui bloqueraient tout si tardent
4. Plan de rattrapage : actions proposées pour récupérer les 3-5j perdus
5. Planning semaine prochaine par lot (ordre optimal pour gérer les dépendances)

Format : 2-3 pages, avec tableaux, listes actions, schéma dépendances si utile.`;

const PROMPT_MAILS_ST = `Rédige 4 emails de coordination (chantier immeuble collectif Grand Paris, jour 23) :

Email 1 — Au plombier (retard 3j) :
Tu lui dis : "État des lieux : tuyauterie 20% seulement, on perd du temps. Le carreleur arrive mercredi, il a besoin que tu sois fini lundi RDC. Peux-tu ajouter 1 équipe ? Ou besoin de rallonger le planning ?"

Email 2 — À l'électricien (OK timing) :
Tu confirmes : "Bien vu sur les câblages, on suit le planning. Mercredi RDC doit être 100% (avant carreleur). Branchements à partir jeudi ?"

Email 3 — Au menuisier (retard 2j) :
Tu dis : "Fenêtres retardées, on comprend. Peux-tu livrer au moins la moitié cette semaine pour qu'on installe parallèle ? Ça libérerait les équipes cloisons."

Email 4 — À la peinture (pas commencé) :
Tu confirmes : "Peinture ne peut démarrer qu'après cloisons + carrelage, donc semaine prochaine jeudi. Je te réconfirme lundi. T'as les infos de couleurs client ?"

Pour chaque email :
- Ton pro mais collaboratif, pas d'ordre juste de la coordination
- Infos critiques (dates, obstacles, demandes)
- Questions sans ambiguïté

Format : prêt à copier-coller.`;

const PROMPT_VARIATIONS = `Maître d'ouvrage demande variation :
"On voudrait ajouter éclairage LED salle d'eau (prix + installation). Ça repousse le planning ? Coût estimé ?"

Contexte : chantier jour 23 sur 120, électricité actuellement 40% avancée. Éclairage salle d'eau = 8-10 points LED + câblage spécialisé.

Rédige pour moi :
1. Analyse impact : l'éclairage repousse-t-il l'électricité générale ? par combien ?
2. Calcul coût : points LED + câblage + main-d'œuvre = montant supplémentaire estimé
3. Impact planning final : fin chantier semaine 17 → 17.5 ? ou tenu ?
4. Document demande de variation : coût + délai + accord de principe
5. Email au MOA : propose les options (ajouter l'éclairage vs le repousser en phase 2)

Ton : factuel, propose des options, pas de jugement.`;

const PROMPT_PLANNING_HEBDO = `Crée un planning micro-chantier pour semaine 4 (immeuble collectif Grand Paris, chantier jour 29-35) basé sur ces infos :

Constraints :
- Maçonnerie : 100% finie
- Menuiseries : 75% (11 fenêtres restantes à poser lundi-mardi)
- Électricité : 50%, doit finir lundi/mardi avant carreleur mercredi
- Plomberie : 30%, rajouté 1 équipe, doit finir carrelage (mercredi-jeudi)
- Carrelage : peut démarrer mercredi si électricité + plomberie RDC 100%
- Peinture : toujours attendu semaine 5
- Chauffage : équipements arrive mardi, installation mercredi-jeudi

Planning optimal semaine 4 :
1. Lundi : menuiseries + électricité final RDC, plomberie continue
2. Mardi : menuiseries finish, électricité 100% RDC/étage 1, plomberie + carreleur arrive
3. Mercredi : carrelage démarre RDC, plomberie étages, chauffage commence
4. Jeudi : carrelage avance, chauffage avance, électricien branchements étage 1

Format : tableau jour/équipe/tâches, lisible pour tous les sous-traitants, distribué lundi matin.`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT comprend-il les dépendances entre lots (ex. électricité avant carrelage) ?',
    a: "Si vous les décrivez clairement dans le prompt, l'IA peut proposer des enchaînements logiques et des plannings cohérents. C'est une aide à la structuration : vous validez toujours les contraintes réelles et les engagements contractuels sur le terrain.",
  },
  {
    q: "L'IA va-t-elle remplacer les conducteurs de travaux ?",
    a: "Non. L'IA accélère la rédaction des rapports, mails et brouillons de planning ; le pilotage humain, les arbitrages et la relation avec les équipes restent centraux.",
  },
  {
    q: 'Comment financer la formation si je suis conducteur de travaux salarié ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de votre employeur, de la branche et des règles du plan de développement des compétences — aucune promesse de « zéro reste à charge » sans étude de dossier.",
  },
  {
    q: "ChatGPT peut-il m'aider avec les métrés et facturations d'avancement ?",
    a: "L'IA peut aider à structurer des synthèses et des tableaux à partir des pourcentages et des informations que vous fournissez. Les montants et les documents contractuels définitifs sont à valider avec votre entreprise et les outils métiers.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On travaille en français, avec des prompts et des trames que vous adaptez à vos chantiers.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : coordination tous les lots et paperasse' },
  { href: '#la-solution', label: 'La solution : l’IA pour coordonner sans se noyer' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des conducteurs de travaux sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaConducteurTravauxBtpPage() {
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
        <span className="text-slate-900">Formation IA conducteur de travaux BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour conducteurs de travaux —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur la coordination</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 6 h par semaine</strong> sur rapports, mails et plannings (lots
          multiples, sous-traitants, suivi). <strong>Île-de-France</strong> & <strong>Grand Paris</strong> —{' '}
          <strong>Qualiopi</strong>, finançable <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer rapports d’avancement, mails de coordination et brouillons de planning ; le conducteur
            de travaux reste responsable des décisions, des délais annoncés et de la conformité aux contrats et au
            chantier réel.
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
            Le problème : coordination de tous les lots et paperasse
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>conducteur de travaux</strong> en Île-de-France ou Grand Paris : polyvalence extrême,
            plusieurs lots et sous-traitants, planning global, interface MOA / MOE, variations et reporting.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Une journée type peut charger :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Réunions de chantier et passage des consignes entre corps de métier.',
              'Coordination mails et appels : suivi des lots, accès, livraisons, aléas.',
              'Rapports d’avancement : synthèse de l’état de chaque lot, retards, risques.',
              'Variations CCTP : lecture des demandes, impacts délai / coût à cadrer.',
              'Suivi administratif : MOE, documents, photos, mise à jour du planning.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Sans méthode, le temps de <strong>« papier » et de coordination écrite</strong> peut monter très haut — au
            détriment du terrain et de l’anticipation. D’où l’intérêt d’outils qui accélèrent la <strong>mise en forme</strong>,
            sans remplacer votre jugement.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA pour coordonner sans se noyer
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut servir d’assistant pour : rapports multi-lots structurés, brouillons de mails aux
            sous-traitants, analyses de variation (à valider avec votre hiérarchie et le contractuel), plannings
            hebdomadaires lisibles.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            1. Rapport d’avancement multi-lots
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vous collectez l’état des lots (notes, dictée) ; l’IA propose un tableau, des retards et des pistes de
            rattrapage — vous relisez et ajustez avant diffusion.
          </p>
          <aside className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 italic">
            Exemple (fictif) : jour 10 — maçonnerie 85 %, menuiseries en retard, plomberie en tension, etc. L’IA aide à
            structurer le compte rendu ; les décisions restent à vous.
          </aside>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            2. Mails de coordination aux sous-traitants
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Premiers jets de mails par lot, ton professionnel, points de vigilance et questions explicites — à personnaliser
            avant envoi.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            3. Variations et impacts délai / coût
          </h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Aide à structurer une analyse et un brouillon de demande de variation ; validation interne et contractuelle
            indispensable.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour voir comment adapter ces usages à votre coordination multi-lots.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas avec prompts ChatGPT
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : rapport d’avancement multi-lots
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_RAPPORT_LOTS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : mails de coordination aux sous-traitants
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_MAILS_ST}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : gestion des variations (délai / coût)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_VARIATIONS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : planning hebdomadaire ajusté
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_PLANNING_HEBDO}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles une fois les usages en place — <strong>fortement variables</strong> selon la taille
            du chantier et le temps de relecture que vous conservez :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps indicatif avant / après usage de l’IA sur tâches de coordination</caption>
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
                  <td className="p-3">Rapport multi-lots</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Structuration aidée</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mails coordination</td>
                  <td className="p-3">Dispersé</td>
                  <td className="p-3">Modèles par lot</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Variation / impact</td>
                  <td className="p-3">Rédaction lourde</td>
                  <td className="p-3">Plan de brouillon</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Planning hebdo</td>
                  <td className="p-3">Manuel</td>
                  <td className="p-3">Tableau proposé</td>
                  <td className="p-3">Modéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Les bilans « X heures par jour gagnées » du marketing ne sont pas garantis : tout dépend du nombre de lots, de
            l’urgence et de votre discipline de validation.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Je gagne du temps sur la rédaction des comptes rendus et des mails. J’ai plus de marge pour anticiper les
              aléas et verrouiller le planning avec les équipes — sous ma responsabilité. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Conducteur de travaux, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — conducteurs de travaux et IA</h2>
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
            <strong>Laure Olivié</strong> accompagne depuis <strong>2023</strong> conducteurs de travaux, artisans et
            dirigeants du BTP pour utiliser ChatGPT sur la productivité (rapports, coordination, appels d’offres).{' '}
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
            Voir comment structurer un rapport multi-lots, des mails de coordination et un planning hebdo — sans engagement.
            Vous repartez avec des idées de prompts à adapter à vos chantiers.
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
            Formation IA conducteur de travaux — Île-de-France & Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/ia-conducteur-travaux', label: 'IA conducteur de travaux (page dédiée)' },
            { href: '/formations/ia-travaux-publics', label: 'Formation IA travaux publics' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
