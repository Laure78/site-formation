import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

const PATH = '/formation-ia-conducteur-engins-tp';

export const metadata = createPageMetadata({
  title: 'Formation IA Conducteur Engins TP Île-de-France — Laure Olivié',
  description:
    'Automatisez vos fiches chantier, rapports d’activité, relances clients. Formation Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA conducteur engins',
    'ChatGPT fiche activité TP',
    'rapport chantier travaux publics',
    'conducteur pelle IA',
    'formation IA BTP',
    'OPCO Constructys',
    'Qualiopi BTP',
    'chef de chantier communication',
  ],
  openGraphType: 'article',
});

const NOTES_EXEMPLE = `Lundi 15 avril — Pelle CAT 320
- Zone A du chantier : creusement fondations, boue partout à cause pluie nuit
- Estimé 180m³ excavés (pile dans la prévision)
- Un arbre qu'on devait respecter : finalement faut le couper, demandé au chef
- Équipe : moi et apprenti Jean, bonne ambiance
- Fin 17h car pluie intensifiée
- Mercredi : même zone mais nettoyage de la zone + attendre livraison drain`;

const PROMPT_FICHE = `Rédige une fiche d'activité quotidienne pro avec ces notes brutes (chantier TP Grand Paris) :

${NOTES_EXEMPLE}

Fiche doit contenir :
- Date, heure début/fin
- Engin utilisé (modèle, numéro si vous l'avez)
- Zone de travail
- Tâches réalisées (description courte + volumétrie si applicable)
- Équipe présente
- Obstacles/incidents
- Prévisions demain

Format : clair, pro, lisible pour un chef de chantier. Pas de jargon inutile.

(Remplace le bloc « notes brutes » par les vôtres du jour.)`;

const PROMPT_HEBDO = `Crée un rapport d'activité hebdomadaire (semaine 15-19 avril) à partir de ces 5 fiches quotidiennes :
[Collez les 5 fiches]

Rapport doit contenir :
1. Résumé volumétrique : m³ total excavés, zones finalisées, avancement vs planning
2. Équipes : nombre de jours-hommes, niveau qualification
3. Incidents/obstacles : accès, météo, arbitrages demandés
4. Planning semaine suivante : prévisions tâches et engins
5. Points nécessitant décision du chef

Format : rapport structuré, 1-2 pages, avec tableaux si utile. Ton : objectif, pro, faits plutôt qu'opinions.`;

const PROMPT_EMAIL_CHEF = `Rédige un email au chef de chantier pour répondre à sa question "Où on en est zone A, planning tenu ?" :

Contexte : semaine 15-19 avril, on a fait 400m³ sur zone A, planification était 450m³. Zone A = fondations bâtiment A + bâtiment B. Pluie lundi/mardi ralenti, rattrapage mercredi-vendredi. Demain lundi météo ok.

Email doit contenir :
- Avancement (m³ faits, % planning)
- Raisons d’un écart éventuel (météo, terrain)
- Plan de rattrapage (fourchette réaliste)
- Demandes de décision (ex. arbre, délai supplémentaire)

Ton : factuel, clair sur le timing, sans dramatiser.`;

const PROMPT_LEGENDES = `Rédige des légendes pour ces photos de chantier (TP Grand Paris) :
- Photo 1 : vue d'ensemble zone A, pelle en action et fondations creusées
- Photo 2 : gros plan terrain argileux, un peu boueux
- Photo 3 : arbre en bordure nord, arbitrage demandé au chef

Pour chaque photo :
- 1-2 lignes de description (localisation, contexte, points remarquables)
- Date/heure/engin utilisé (si connus)
- Points d'attention pour le chef

Format : prêt à copier-coller dans l'album photos ou le rapport.`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT et sécurité TP (PPSPS, signalisation, zones) : que peut-on en attendre ?',
    a: "L'IA peut aider à structurer des comptes rendus ou des observations terrain. Les documents réglementaires (PPSPS, plans de prévention, consignes officielles) restent établis et validés par les personnes et organismes habilités.",
  },
  {
    q: "L'IA va-t-elle remplacer les conducteurs d'engins ?",
    a: "Non. L'IA peut accélérer la mise en forme de textes ; la conduite d'engins, la sécurité de l'opération et le jugement de terrain restent au conducteur et à l'équipe.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On peut dicter des notes brutes et demander un reformattage pro ; les prompts se réutilisent.",
  },
  {
    q: 'Comment financer la formation si je suis salarié ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de l'employeur et des règles du plan de développement des compétences — étude de dossier au cas par cas.",
  },
  {
    q: "ChatGPT peut-il structurer des fiches d'entretien ou de suivi d'engin ?",
    a: "Oui pour des trames et une mise en forme à partir de vos données (heures, interventions). Les relevés officiels et la conformité maintenance restent à votre processus et à la mécanique.",
  },
  {
    q: 'Volumétrie et avancement : l’IA calcule-t-elle à ma place ?',
    a: "Elle peut synthétiser et présenter des tableaux si vous fournissez les chiffres sources. Les mesures et la validation des quantités restent votre responsabilité.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : entre chantier et administratif' },
  { href: '#la-solution', label: 'La solution : l’IA pour structurer votre suivi' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des conducteurs d’engins sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaConducteurEnginsTpPage() {
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
        <span className="text-slate-900">Formation IA conducteur d’engins TP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour conducteurs d’engins TP —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur l’administratif</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 3 h par semaine</strong> sur fiches d’activité, rapports et mails.{' '}
          <strong>Île-de-France</strong> & <strong>Grand Paris</strong> — <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à reformater vos notes en textes lisibles ; les faits, volumes et décisions de sécurité restent sous
            votre responsabilité et celle du chef de chantier. Relisez toujours avant envoi.
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
            Le problème : entre chantier et paperasse
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>conducteur d’engins TP</strong> en Île-de-France ou Grand Paris : la majeure partie de la
            journée est sur la machine, mais il reste les <strong>fiches d’activité</strong>, les photos, les comptes rendus
            au <strong>chef de chantier</strong> et le suivi des heures.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Sans aide à la rédaction, on accumule souvent :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Temps en fin de journée pour formaliser ce qui s’est passé sur le terrain.',
              'Rapports hebdomadaires à reconstruire à partir de notes disparates.',
              'Mails ou messages peu clairs, qui génèrent des relances.',
              'Photos peu ou mal légendées pour la documentation chantier.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Beaucoup de conducteurs préfèrent le terrain au clavier — d’où l’intérêt de gagner en efficacité sur la mise en
            forme, sans changer le fond du métier.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA pour structurer votre suivi
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut aider à : transformer des notes brutes en fiche lisible, synthétiser une semaine en rapport,
            rédiger des mails factuels au chef, proposer des légendes pour photos — sous votre relecture.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Fiche d’activité</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Du « brut » (téléphone, cahier) à un document structuré pour la hiérarchie.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">2. Rapport hebdomadaire</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Vue d’ensemble : volumes, incidents, prévisions — à partir des fiches que vous collez.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Messages et photos</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Emails clairs et légendes prêtes à coller dans l’album chantier.
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
            Étape 1 : fiche d’activité quotidienne
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FICHE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : rapport hebdomadaire
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_HEBDO}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : email au chef de chantier
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_EMAIL_CHEF}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : documentation photo et légendes
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_LEGENDES}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles — <strong>variables</strong> selon l’exigence de votre entreprise et votre temps de
            relecture :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Temps indicatif avant / après usage de l’IA sur l’administratif conducteur d’engins
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
                  <td className="p-3">Fiche d’activité</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Brouillon structuré</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Rapport hebdo</td>
                  <td className="p-3">À recomposer</td>
                  <td className="p-3">Synthèse proposée</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mail au chef</td>
                  <td className="p-3">Rédaction</td>
                  <td className="p-3">Texte cadré</td>
                  <td className="p-3">Modéré</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Légendes photos</td>
                  <td className="p-3">Peu de texte</td>
                  <td className="p-3">Descriptifs proposés</td>
                  <td className="p-3">Modéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain en heures par semaine n’est garanti : tout dépend du nombre de comptes rendus et des exigences internes.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Les fiches du soir me prenaient la tête. Avec un brouillon propre, j’envoie plus vite et le chef a moins de
              questions — je garde le contrôle sur ce que j’ai vraiment fait sur le terrain. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Conducteur d’engins TP, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — conducteurs d’engins et IA</h2>
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
            Fiches, rapports hebdo, mails : démonstration sur un cas type. Vous repartez avec des prompts à adapter à votre
            entreprise.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50">
              Réserver votre visio découverte
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
          <h2 className="font-display text-lg font-bold text-slate-900">
            Formation IA conducteur d’engins TP — Île-de-France & Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email} · {SITE_CONFIG.phoneDisplay}
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formations/ia-travaux-publics', label: 'Formation IA travaux publics' },
            { href: '/formation-ia-conducteur-travaux-btp', label: 'Formation IA conducteur de travaux BTP' },
            { href: '/formation-ia-geometre-tp', label: 'Formation IA géomètre TP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
