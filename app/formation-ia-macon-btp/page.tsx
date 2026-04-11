import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';

const PATH = '/formation-ia-macon-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Maçon BTP Île-de-France — Laure Olivié',
  description:
    'Apprenez à automatiser vos devis, métré et administratif avec ChatGPT. Formation Qualiopi finançable Constructys. Gagnez 5h/semaine.',
  path: PATH,
  keywords: [
    'formation IA maçon',
    'ChatGPT devis maçonnerie',
    'DTU 20.1',
    'métré maçonnerie IA',
    'formation IA BTP',
    'OPCO Constructys',
    'Qualiopi BTP',
    'maçon Île-de-France',
  ],
  openGraphType: 'article',
});

const PROMPT_DEVIS = `Je dois établir un devis pour [description du chantier].
Surface : [X m²], type de travail : [maçonnerie générale / chaînage / poteaux / etc.],
références normatives à croiser : DTU 20.1, 20.11 ou 6.2 selon le cas (à valider sur le projet).

Ciment type : [32.5 ou 42.5], prix marché indicatif granulat : [X €/tonne],
coût main-d'œuvre en Île-de-France : [Y €/h],
TVA à appliquer : 20%.

Génère un devis détaillé avec quantitatif indicatif, prix unitaire à remplacer par mes barèmes, total HT et TTC.
Marge commerciale cible : [ex. 25%] — à ajuster selon ma politique.

Rappelle : chiffrage définitif et conformité sous ma responsabilité.`;

const PROMPT_RELANCE = `Rédige un email professionnel de relance au maître d'ouvrage :
- Chantier : [nom / lieu]
- Devis envoyé il y a [X] jours, pas de retour signé
- Ton : ferme mais courtois, proposer un créneau d'échange téléphonique
- Pas plus de 120 mots

Signature : [mon entreprise, téléphone].`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT peut-il calculer un métré béton ou maçonnerie « conforme aux normes » à ma place ?',
    a: "L'IA peut proposer des tableaux et des brouillons de calcul à partir de vos données. Les quantitatifs définitifs, la conformité aux DTU / normes en vigueur et la reprise sous garantie restent votre responsabilité — avec relecture et contrôle métier.",
  },
  {
    q: 'L’IA « connaît-elle » les DTU et les normes de maçonnerie ?',
    a: "Elle peut rappeler des principes généraux et structurer des textes en citant des références que vous demandez. Toujours vérifier avec les documents officiels, la notice produit et le projet, car les modèles peuvent se tromper ou être incomplets.",
  },
  {
    q: 'Comment suivre les variations de prix matière dans les prompts ?',
    a: "Vous mettez à jour les PU ou indices dans le prompt (ciment, granulat, main-d’œuvre). L’IA réapplique la structure ; les tarifs réels restent les vôtres.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On formule les demandes en français, avec des modèles de prompts réutilisables.",
  },
  {
    q: 'Quel budget pour ChatGPT (gratuit vs payant) ?',
    a: "Il existe une offre gratuite (limitée) et des abonnements payants selon les besoins (dont analyse de fichiers ou images selon l’offre). Comparez au temps gagné sur vos devis.",
  },
  {
    q: 'Comment financer la formation avec Constructys ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de votre situation et des règles du plan de développement des compétences — étude de dossier au cas par cas.",
  },
  {
    q: 'La formation est-elle adaptée aux petites équipes ?',
    a: "Oui : cas d’usage concrets (devis, mails, dossiers) pour artisans et petites équipes ; le programme est ajusté au niveau du groupe.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : pourquoi les maçons perdent du temps' },
  { href: '#la-solution', label: 'La solution : l’IA adaptée aux maçons' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des maçons sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaMaconBtpPage() {
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
        <span className="text-slate-900">Formation IA maçon BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour maçons —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur devis, métré et administratif</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 5 h par semaine</strong> sur l’administratif.{' '}
          <strong>Île-de-France</strong> & <strong>Grand Paris</strong> — <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer devis, tableaux et courriers à partir de vos données ; elle ne remplace pas le contrôle
            des quantités, des prix ni la conformité aux DTU et au CCTP. Toujours relire avant signature ou envoi client.
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
            Le problème : pourquoi les maçons perdent du temps
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>maçon</strong>, artisan ou <strong>conducteur de travaux</strong> en Île-de-France : le cœur
            du métier est le chantier, mais le soir ou entre deux interventions arrivent les{' '}
            <strong>devis</strong>, les <strong>métrés</strong>, les relances et les dossiers pour les maîtres d’ouvrage.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Sans outillage adapté, une part importante du temps part en :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Montage et recalcul de devis (quantités, prix matière, main-d’œuvre).',
              'Recherches et synthèses sur DTU / prescriptions (toujours à valider avec les textes officiels).',
              'Emails aux clients, fournisseurs et sous-traitants.',
              'Suivi des variations de prix et relecture des erreurs.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Beaucoup d’artisans cherchent à <strong>moins passer sur l’administratif</strong> pour garder du temps pour la
            prospection et le terrain — d’où l’intérêt d’utiliser ChatGPT comme assistant de mise en forme, encadré.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">La solution : l’IA adaptée aux maçons</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut aider à : structurer des <strong>devis</strong> et quantitatifs indicatifs, rédiger des brouillons de
            <strong> mémoires techniques</strong> ou de lots, accélérer les <strong>emails</strong> de relance, proposer des
            listes de points de contrôle normatifs — sous votre validation.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Métré et devis</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            À partir de vos dimensions et hypothèses : tableaux, lots, marges — vous contrôlez les chiffres et les unités.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">2. Dossiers et appels d’offres</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Plans de texte pour mémoires techniques ou descriptifs — à compléter avec vos références réelles et la
            conformité au DCE.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Communication</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Relances clients, coordination fournisseurs, ton professionnel adapté.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">4. Aide à la veille technique</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Questions de cadrage sur des points DTU ou normes : pistes à recouper systématiquement avec la documentation
            officielle et votre expérience.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour voir comment adapter ces usages à votre activité de maçonnerie en Île-de-France.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : maîtriser vos prompts
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : structurer votre devis en prompt réutilisable
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : plans et images (selon votre offre ChatGPT)
          </h3>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Certaines offres permettent d’ajouter une image de plan pour en extraire des dimensions indicatives. Les mesures
            contractuelles et le métré définitif restent à vérifier par vos soins ou votre métreur.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : produire le devis ou le document final
          </h3>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous exportez le texte vers Word, Google Docs ou votre logiciel métier pour la mise en page et le logo
            d’entreprise.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : relire et adapter le ton
          </h3>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Marché public, particulier ou client fidèle : vous ajustez le registre et validez les montants avant envoi.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 5 : archiver les prompts gagnants
          </h3>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Gardez les modèles qui fonctionnent pour les prochains dossiers similaires (même type d’ouvrage, même zone) — en
            mettant à jour les PU et les surfaces.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Exemple : email de relance
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_RELANCE}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles — <strong>variables</strong> selon le nombre de devis et votre temps de relecture
            :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps indicatif avant / après usage de l’IA — maçonnerie</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Activité</th>
                  <th className="p-3 font-semibold text-slate-900">Sans IA</th>
                  <th className="p-3 font-semibold text-slate-900">Avec IA</th>
                  <th className="p-3 font-semibold text-slate-900">Gain typique</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Devis détaillé</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Brouillon structuré</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Métré / recherches DTU</td>
                  <td className="p-3">Chronophage</td>
                  <td className="p-3">Pistes + tableaux</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Emails</td>
                  <td className="p-3">Rédaction</td>
                  <td className="p-3">Texte proposé</td>
                  <td className="p-3">Modéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain en heures ni en chiffre d’affaires n’est garanti : tout dépend de votre activité et de vos contrôles
            qualité.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Je passais moins de temps sur le terrain à cause des devis le soir. Avec des prompts réutilisables, je vais
              plus vite sur la forme — je garde la main sur les prix et les quantités. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Conducteur de travaux, témoignage de formation (FFB Grand Paris)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — maçons et IA</h2>
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
            <strong>Laure Olivié</strong> est formatrice IA et ChatGPT pour le BTP depuis <strong>2023</strong>. Son organisme{' '}
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
            Devis maçonnerie, gains de temps possibles, financement Constructys, programme de formation : échange sans
            engagement.
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
            Formation IA maçon — Île-de-France & Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formation-ia-charpentier-btp', label: 'Formation IA charpentier BTP' },
            { href: '/formation-ia-macon-paysagiste-btp', label: 'Formation IA maçon paysagiste BTP' },
            { href: '/formation-ia-conducteur-travaux-btp', label: 'Formation IA conducteur de travaux BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
