import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const PATH = '/formation-ia-geometre-tp';

export const metadata = createPageMetadata({
  title: 'Formation IA Géomètre TP Île-de-France — Laure Olivié',
  description:
    'Automatisez rapports levés topographiques, devis, documentation technique. Formation Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA géomètre',
    'ChatGPT levé topographique',
    'rapport géomètre IA',
    'Lambert 93 documentation',
    'formation IA travaux publics',
    'OPCO Constructys',
    'Qualiopi BTP',
    'devis géomètre',
  ],
  openGraphType: 'article',
});

const PROMPT_RAPPORT = `Crée un rapport de levé topographique pro (chantier Grand Paris) à partir de ces notes brutes :

Données terrain :
- Surface : 1,5 hectares (environ 150m × 100m)
- Relief : pente ouest-est env 2,5% (altitude min 85m, max 88m)
- Type sol : argile-calcaire, bon drainage
- Altimétries relevées : point A 85.2m, point B 85.8m, point C 86.5m, point D 87.1m, point E 87.3m, point F 87.8m, point G 88.2m
- Obstacles : 1 bâtiment sud (28m × 12m), 2 arbres nord (épicéa ≈15m haut chacun), 1 canalisation eau 0,8m prof, 1 canalisation gaz approx 1m prof
- Accès : route nord facile, chemin privé est moyen accès (2m larg), façade sud sur propriété riverain (accès restreint)
- Végétation : herbe fauchée, quelques buissons

Rapport doit contenir :
1. Description générale du terrain (surface, relief, type sol, accès)
2. Tableau altimétries avec localisation précise
3. Cartographie obstacles (bâtiment, arbres, réseaux) et recommandations
4. Propositions de piquetage (indicatives — à valider par moi selon prescription et réglementation)
5. Contraintes identifiées (réseaux, arbres à préserver, accès)
6. Recommandations terrassement / assainissement (synthèse)

Format : 2-3 pages, avec tableaux et schémas texte, pro et technique.
Ajoute : « Les coordonnées et levés officiels font foi après validation métier et logiciels. »`;

const PROMPT_DEVIS = `Crée un devis pour ce levé topographique (client privé, Grand Paris) :
- Surface : 1,5ha
- Type levé : levé complet (planimétrie + altimétrie + obstacles)
- Plans CAO demandés : oui (1 plan de synthèse)
- Délai : 2 semaines
- Budget estimé : 1 800€ HT

Devis doit contenir :
1. Levé topographique 1,5ha (jours, coût)
2. Traitement données terrain (logiciels, temps)
3. Plan CAO (1 plan synthèse)
4. Rapport levé + analyse terrain
5. Frais déplacement si applicable
6. Conditions paiement (1/3 avance, 1/3 mi-parcours, 1/3 livraison) — à adapter à ma politique
7. Délai : 15 jours ouvrés (indicatif)

Format : tableau, clair, prêt à imprimer ou envoyer email.
Les montants sont indicatifs ; je remplace par mes barèmes réels.`;

const PROMPT_NOTES = `Crée des notes d'analyse terrain pour ce levé TP (futur chantier construction Île-de-France) :

Contexte : levé effectué, contraintes identifiées (pente 2,5%, obstacles, réseaux). Maître d'ouvrage veut comprendre les enjeux avant lancer chantier.

Notes doit couvrir :
1. Topographie et enjeux pente : implications terrassement, drainage, accès engins
2. Obstacles et solutions : arbres, réseaux, impacts sur terrassement
3. Accès chantier : analyse viabilité (route vs chemin privé), capacité engins
4. Synthèse géotechnique indicative (type sol = argile-calcaire — à croiser avec étude G2 si existante)
5. Assainissement : pente naturelle, opportunités gravitaires, zones à risque
6. Calendrier indicatif terrassement : séquence possible selon contraintes (à valider sur site)

Format : notes techniques 2-3 pages, langage pro mais accessible à client non technique. Recommandations claires.
Préciser : ce document est une aide à la synthèse, pas un rapport géotechnique signé.`;

const PROMPT_EMAIL = `Rédige un email au maître d'ouvrage pour présenter les résultats du levé topographique :
- Levé effectué le [date]
- Surface 1,5ha, relief pente 2,5%, obstacles identifiés
- Prochaines étapes : plans CAO, approbation, début terrassement
- Livraison prévue : [date]

Email doit contenir :
- Résumé résultats levé (ce qu'on a fait, ce qu'on a trouvé)
- Contraintes et enjeux identifiés (pente, obstacles, réseaux)
- Plan d'action suivant (approbation plan, coordination terrassement)
- Document joint : rapport levé + plan préliminaire

Ton : pro, rassurant, montre qu'on comprend les enjeux, prêt pour étape suivante.`;

const FAQ_ITEMS = [
  {
    q: 'Projections et coordonnées (Lambert 93, WGS84, etc.) : que peut faire ChatGPT ?',
    a: "L'IA peut rappeler des définitions générales ; les transformations, calculs et livrables officiels doivent être réalisés et contrôlés avec vos outils métier (logiciels, stations, etc.).",
  },
  {
    q: "L'IA peut-elle remplacer une étude géotechnique ?",
    a: "Non. Elle peut aider à structurer une synthèse à partir de vos observations. Les études de sol et la responsabilité technique relèvent de missions et compétences spécifiques.",
  },
  {
    q: 'Cadastre et limites de propriété : peut-on s’appuyer sur ChatGPT ?',
    a: "Pour les principes généraux seulement. Les décisions et les références juridiques passent par les documents officiels (cadastre, actes, géomètre-expert) — jamais par un modèle généraliste seul.",
  },
  {
    q: "L'IA va-t-elle remplacer les géomètres ?",
    a: "Non. L'IA accélère la rédaction et la structuration ; le relevé, la responsabilité et la validation des livrables restent au professionnel.",
  },
  {
    q: 'Comment financer la formation (salarié ou entreprise) ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de votre situation et des règles du plan de développement des compétences — étude de dossier au cas par cas.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On formule les demandes en français, avec des prompts que vous réutilisez et adaptez.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : levés topographiques et rapports longs' },
  { href: '#la-solution', label: 'La solution : l’IA pour structurer votre documentation' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des géomètres sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaGeometreTpPage() {
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
        <span className="text-slate-900">Formation IA géomètre TP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour géomètres (TP) —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur rapports, devis et documentation</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 4 h par semaine</strong> sur la rédaction et la structuration des
          dossiers. <strong>Île-de-France</strong> & <strong>Grand Paris</strong> — <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à rédiger et structurer des textes à partir de vos notes ; les coordonnées, plans, obligations
            légales et livrables signés restent sous votre responsabilité et vos outils métier. Toujours valider avant
            remise au client.
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
            Le problème : levés topographiques et rapports longs
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>géomètre</strong> (TP) en Île-de-France ou Grand Paris : relevés, piquetage, propriétés,
            plans. Le terrain, vous le maîtrisez ; la <strong>documentation</strong> (rapports, devis, mails) peut
            toutefois consommer une part importante du bureau.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Sans aide à la rédaction, le temps part souvent en :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Rédaction de rapports de levé, synthèses et analyses.',
              'Mise en forme de devis et conditions générales.',
              'Notes techniques pour le client ou les partenaires.',
              'Courriers de transmission et relances.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Beaucoup de géomètres souhaitent <strong>moins de temps à taper</strong> et plus pour l’analyse ou la
            prospection — d’où l’intérêt d’accélérer la mise en forme avec des assistants IA encadrés.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA pour structurer votre documentation
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut aider à : transformer des notes terrain en rapport structuré, produire des brouillons de devis,
            synthétiser des contraintes pour le maître d’ouvrage, rédiger des mails de transmission — sous votre relecture.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Rapports de levé</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Description, tableaux, obstacles, recommandations — à aligner sur vos standards et vos livrables.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">2. Devis et conditions</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Tableaux de lots et formulations types ; montants à remplacer par vos barèmes.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Notes et courriers</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Synthèses pour le client et emails de présentation des résultats.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour voir comment adapter ces usages à votre processus de levé.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Méthode pas à pas</h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : rapport de levé topographique
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_RAPPORT}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : devis et conditions client
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : notes d’analyse de terrain
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_NOTES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : email au maître d’ouvrage (transmission des résultats)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_EMAIL}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles — <strong>variables</strong> selon la taille du dossier et votre temps de
            contrôle :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Temps indicatif avant / après usage de l’IA sur la documentation géomètre
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
                  <td className="p-3">Rapport de levé</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Brouillon structuré</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Devis et conditions</td>
                  <td className="p-3">Rédaction</td>
                  <td className="p-3">Tableau proposé</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Notes d’analyse</td>
                  <td className="p-3">Mise en forme lourde</td>
                  <td className="p-3">Plan + texte</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Email de transmission</td>
                  <td className="p-3">À composer</td>
                  <td className="p-3">Brouillon</td>
                  <td className="p-3">Modéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain en heures par mois n’est garanti : tout dépend du nombre de dossiers et de la qualité de vos
            contrôles.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Le rapport et le mail au client me prenaient encore plus de temps que le terrain. Avec un brouillon structuré,
              je garde le contrôle sur le fond et je livre plus vite. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Géomètre TP, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — géomètres et IA</h2>
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
            <strong>Laure Olivié</strong> accompagne depuis <strong>2023</strong> artisans et dirigeants du BTP et des
            travaux publics pour utiliser ChatGPT sur la productivité (devis, communication, dossiers).{' '}
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
            Rapports de levé, devis, synthèses : démonstration sur un cas type. Vous repartez avec des prompts à adapter à vos
            modèles et à votre logiciel.
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
            Formation IA géomètre TP — Île-de-France & Grand Paris
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
            { href: '/formation-ia-charge-affaires-btp', label: 'Formation IA chargé d’affaires BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
